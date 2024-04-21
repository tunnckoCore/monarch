import { loadKZG } from 'kzg-wasm';
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';

const privkey = '';

const chain = sepolia;
const client = createPublicClient({
  chain,
  transport: http('https://1rpc.io/sepolia'),
});

async function unstuck(privateKey) {
  const privKey = ('0x' + privateKey.replace(/^0x/, '')) as `0x${string}`;
  const account = privateKeyToAccount(privKey);

  const wallet = createWalletClient({
    account,
    chain,
    transport: http('https://1rpc.io/sepolia'),
  });

  const kzg = await loadKZG();
  const fees = await client.estimateFeesPerGas();
  console.log(fees);
  console.log(
    'account:',
    account.address,
    'balance:',
    await client.getBalance({ address: account.address }),
  );
  console.log(
    'account nonce',
    await client.getTransactionCount({ address: account.address, blockTag: 'pending' }),
  );

  // console.log(
  //   'tx',
  //   await client.getTransaction({
  //     hash: '0x4163cf88e5d28ced2a8cc72e4781864e7c20f216274fcc59d6f46410821addb8',
  //   }),
  // );

  try {
    // const hash = await wallet.sendTransaction({
    //   account,
    //   kzg,
    //   blobs: toBlobs({
    //     data: encode({
    //       content: new TextEncoder().encode('hello world'),
    //       contentType: 'text/plain',
    //     }),
    //   }),
    //   from: account.address,
    //   to: account.address,
    //   value: 0n,
    //   data: stringToHex('data:;rule=esip6,hi'),
    //   // nonce: 12,
    //   type: 'eip4844',
    //   maxFeePerGas: parseGwei('1.5'),
    //   maxPriorityFeePerGas: parseGwei('1'),
    //   maxFeePerBlobGas: parseGwei('2'),
    // });
    // console.log(`transaction sent: ${hash}`);
  } catch (e) {
    console.log('fail', e);
  }
}

unstuck(privkey).catch(console.error);
