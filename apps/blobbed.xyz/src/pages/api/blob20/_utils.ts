import { createBlobsHandler, inscribeBlob } from '../_utils';

// burner wallet
// address = 0xd86de9d1774c27b1583db97b511fe1ecde1c84a8
// mnemonic = wait assault dry extend chronic noise bird snap blur sock leaf lunch
const PLATFORM_CREATOR_PRIVATE_KEY = `0x67c7cb1a4c38e69d7dd79a310134882f0d021f10767570b1500b2d9bcafbd4c2`;

export async function operationWrapper(opFn, request: Request) {
  try {
    const data = await request.json();

    const blobFile = opFn(data.token);
    const formData = new FormData();
    formData.append('files', blobFile);

    const resp = await createBlobsHandler(formData);

    if (resp.error) {
      return resp;
    }

    const creatorPrivateKey = PLATFORM_CREATOR_PRIVATE_KEY; // service internal private key, if they dont provide one

    const result = await inscribeBlob({ creatorPrivateKey, ...data, blobs: resp.data[0].blobs });

    return result;
  } catch (e: any) {
    return {
      error: {
        message: e?.message || 'unknown error thrown on operationWrapper',
        status: 500,
      },
    };
  }
}

export function tokenDeployOp({ ticker, max_supply, max_per_mint_limit, decimals }) {
  if (!ticker || !max_supply || !max_per_mint_limit) {
    throw new Error('All fields are required: ticker, max_supply, max_per_mint_limit');
  }

  const dec = decimals || 8;

  if (dec > 8) {
    throw new Error('Decimals must be less than or equal to 8');
  }

  return new File(
    [
      new TextEncoder().encode(
        JSON.stringify({
          protocol: 'blob20',
          token: {
            operation: 'deploy',
            ticker,
            max_supply,
            max_per_mint_limit,
            decimals: dec,
          },
        }),
      ),
    ],
    'some-blob20-token-deploy.json',
    { type: 'application/json' },
  );
}

export function tokenMintOp({ ticker, amount }) {
  if (!ticker || !amount) {
    throw new Error('Ticker and amount are required');
  }

  return new File(
    [
      new TextEncoder().encode(
        JSON.stringify({
          protocol: 'blob20',
          token: {
            operation: 'mint',
            ticker,
            amount,
          },
        }),
      ),
    ],
    'some-blob20-token-mint.json',
    { type: 'application/json' },
  );
}

export function tokenTransferOp({ ticker, transfers }: { ticker: string; transfers?: any[] }) {
  if (!ticker || !transfers || (transfers && transfers.length === 0)) {
    throw new Error('Ticker and transfers are required');
  }

  return new File(
    [
      new TextEncoder().encode(
        JSON.stringify({
          protocol: 'blob20',
          token: {
            operation: 'transfer',
            ticker,
            transfers: transfers || [
              { to: '0x0123...4444', amount: 50_444 },
              { to: '0x45b1...a1e2', amount: 11_444 },
              { to: '0x0531...4fc3', amount: 0.5435 },
            ],
          },
        }),
      ),
    ],
    'some-blob20-token-transfer.json',
    { type: 'application/json' },
  );
}
