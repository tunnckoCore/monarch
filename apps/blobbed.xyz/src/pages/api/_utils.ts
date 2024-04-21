import { Buffer } from 'node:buffer';
import { encode as encodeCborg } from 'cborg';
import { gzipSync } from 'fflate';
import imageminWebp from 'imagemin-webp';
import { loadKZG } from 'kzg-wasm';
import {
  blobsToCommitments,
  bytesToHex,
  createPublicClient,
  createWalletClient,
  extractChain,
  hexToBytes,
  http,
  parseGwei,
  sha256,
  toBlobs,
  type PrivateKeyAccount,
} from 'viem';
import {
  generateMnemonic,
  generatePrivateKey,
  mnemonicToAccount,
  privateKeyToAccount,
  english as viemEnglishMnemonics,
} from 'viem/accounts';
import * as chains from 'viem/chains';

export type CustomFile = {
  gzip?: boolean;
  name?: string;
  size: number;
  type: string;
  optimize?: boolean;
  arrayBuffer: () => Promise<ArrayBuffer>;
};

// export const runtimeEnv = import.meta.env || process?.env;
// export const runtimeEnv = import.meta.env;

export async function optimizeFiles(files: File[] | Blob[] | CustomFile[], options = {}) {
  const opts = { optimize: false, gzip: false, ...options };
  const toWebp = imageminWebp(opts as any);

  const contents = await Promise.all(
    files.map(async (file) => {
      const u8 = new Uint8Array(await file.arrayBuffer());
      const isOptimize = file.optimize || opts.optimize;
      const data =
        isOptimize && file.type.startsWith('image') && !file.type.includes('svg')
          ? new Uint8Array(await toWebp(Buffer.from(u8)))
          : u8;

      const output = bytesToHex(opts.gzip ? gzipSync(data) : data);

      return {
        gzip: file.gzip || opts.gzip,
        filename: file.name || '',
        mimetype: isOptimize ? 'image/webp' : file.type,
        inputSize: file.size,
        outputSize: (output.length - 2) / 2, // divide by 2 because it's a hex string
        output,
      };
    }),
  );

  return contents;
}

export function generateAccount(seed = '') {
  const mnemonic = seed || generateMnemonic(viemEnglishMnemonics);
  const account = mnemonicToAccount(mnemonic);

  const hdkey = account.getHdKey();

  // const privKey = bytesToHex(hdkey.privKeyBytes);

  // @ts-ignore shut up, it exists
  const privKey = hdkey.privKey.toString(16);

  return {
    mnemonic,
    address: account.address.toLowerCase(),
    publicKey: account.publicKey,
    privateKey: `0x${privKey}`,
  };
}

export function contentToBlobs(content: string | Uint8Array, kzg: any) {
  const contentBuffer = typeof content === 'string' ? new TextEncoder().encode(content) : content;

  const contentBlobs = toBlobs({ data: contentBuffer, to: 'hex' });
  const contentCommitments = blobsToCommitments({ blobs: contentBlobs, kzg });

  return {
    content,
    buffer: contentBuffer,
    blobs: contentBlobs,
    commitments: contentCommitments,
    versionedHashes: contentCommitments.map((x) => `0x01${sha256(x).slice(4)}`),
    toBlobHash: (x: any) => `0x01${sha256(x).slice(4)}`,
  };
}

export async function inscribeBlob(options = {}) {
  const {
    initialOwnerAddress,
    chainId,
    customCalldataUri,
    rpcUrl,
    blobs,
    creatorPrivateKey,
    ...restOptions
  }: any = { ...options };

  if (!initialOwnerAddress || !blobs) {
    console.log('failure: no owner of blobs');
    return { error: { message: '`blobs` and `initialOwnerAddress` are required', status: 400 } };
  }

  const kzg = await loadKZG();

  const chain = extractChain({
    id: chainId || Number('11155111'),
    chains: Object.values(chains) as chains.Chain[],
  }) as chains.Chain;

  const transport = http(rpcUrl || 'https://1rpc.io/sepolia');
  const calldata = await handleCalldata(customCalldataUri || '');

  let privateKey: `0x${string}`;
  let account: PrivateKeyAccount;

  try {
    privateKey = creatorPrivateKey || generatePrivateKey();
    account = privateKeyToAccount(`0x${privateKey.replace(/^0x/i, '')}` as `0x${string}`);
  } catch (e) {
    return { error: { message: 'failed to create accoount from private key', status: 500 } };
  }

  const pubClient = createPublicBlobClient({ chain });
  const wallet = createWalletClient({ account, chain, transport });

  try {
    const fees = await pubClient.estimateFeesPerGas();

    const hash = await wallet.sendTransaction({
      kzg,
      blobs,
      account,
      maxFeePerGas: restOptions.maxFeePerGas || fees.maxFeePerGas! * 2n,
      maxFeePerBlobGas: restOptions.maxFeePerBlobGas || calculateMaxBlobGas(fees),
      maxPriorityFeePerGas: restOptions.maxPriorityFeePerGas || calculateMaxPriorityFee(fees),
      to: initialOwnerAddress,
      value: 0n,
      data: calldata,
      type: 'eip4844',
    });

    return {
      data: {
        chainId,
        blobs,
        blobTxHash: hash,
        creatorAddress: account.address,
        creatorPrivateKey: privateKey, // NOTE: it's okay, cuz that is one-time use key
      },
    };
  } catch (e) {
    return { error: { message: 'failed to send blob transaction, try again', status: 500 } };
  }
}

export async function createBlobsHandler(formData) {
  const files = formData.getAll('files') as File[] | Blob[] | CustomFile[];

  if (files.length === 0) {
    return { error: { message: 'the `files` field is required', status: 400 } };
  }

  const options = [...formData.entries()].reduce((acc: any, [key, value]) => {
    if (key === 'files') {
      return acc;
    }
    if (key === 'gzip') {
      acc.gzip = value === 'true';
    }
    if (key === 'optimize') {
      acc.optimize = value === 'true';
    }

    return acc;
  }, {});

  const items = await createBlobs(files, options);

  return { data: items };
}

export async function createBlobs(files: File[] | Blob[] | CustomFile[], options = {}) {
  const contents = await optimizeFiles(files, options);
  const outputs = contents.map((out) => {
    if (!out.gzip) {
      return out;
    }

    const u8 = hexToBytes(out.output);
    const ratio = u8.length / out.outputSize;

    if (ratio > 10) {
      return { ...out, ratio, skip: true, gzipBomb: true };
    }

    return out;
  });

  const cbors = outputs.map((out: any) => {
    if (out.skip) {
      return out;
    }

    const u8 = hexToBytes(out.output);
    const cbor = encodeCborg({ content: u8, contentType: out.mimetype });

    return { ...out, cbor };
  });

  const kzg = await loadKZG();

  const items = cbors.map((out: any) => {
    if (out.skip) {
      return out;
    }

    try {
      const { blobs, commitments, versionedHashes, buffer } = contentToBlobs(out.cbor, kzg);

      return {
        ...out,
        cbor: bytesToHex(out.cbor),
        blobs,
        commitments,
        versionedHashes,
        blobData: bytesToHex(buffer),
      };
    } catch {
      return {
        ...out,
        cbor: bytesToHex(out.cbor),
        error: {
          code: 'FILE_TOO_BIG_FOR_BLOBS',
          message: 'The file is too big to be converted to blobs',
        },
      };
    }
  });

  return items;
}

export async function handleCalldata(
  customCalldataUri: string | Uint8Array,
): Promise<`0x${string}`> {
  const defaultCalldata = '0x646174613a3b72756c653d65736970362c6973626c6f62';

  if (customCalldataUri instanceof Uint8Array && customCalldataUri.length > 3) {
    return bytesToHex(customCalldataUri);
  }

  if (customCalldataUri && typeof customCalldataUri === 'string') {
    if (customCalldataUri.startsWith('0x')) {
      return customCalldataUri as `0x${string}`;
    }
    if (customCalldataUri.startsWith('data:')) {
      let data;

      try {
        data = await (await fetch(customCalldataUri)).arrayBuffer();
        return bytesToHex(new Uint8Array(data));
      } catch (e) {
        return defaultCalldata;
      }
    }
  }

  return defaultCalldata;
}

export function createPublicBlobClient({
  chain,
  transport,
}: {
  chain: chains.Chain;
  transport?: any;
}) {
  return createPublicClient({ chain, transport: transport || http('https://1rpc.io/eth') });
}

export function calculateMaxPriorityFee(fees: any) {
  const avgGood = parseGwei('1');

  if (!fees.maxPriorityFeePerGas) {
    return avgGood;
  }
  const calculated = fees.maxPriorityFeePerGas * 2n;
  return calculated > avgGood ? calculated : avgGood;
}

export function calculateMaxBlobGas(fees: any) {
  const avgGood = parseGwei('20');
  if (!fees.maxFeePerBlobGas) {
    return avgGood;
  }

  const half = fees.maxFeePerBlobGas / 2;
  const calculated = fees.maxFeePerBlobGas + half;
  return calculated > avgGood ? calculated : avgGood;
}
