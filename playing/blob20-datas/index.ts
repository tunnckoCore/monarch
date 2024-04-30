import { ge } from '@xata.io/client';

import { getXataClient } from './src/xata.ts';

const xata = getXataClient();

const page = await xata.db.blob20_transactions
  .filter('ticker', 'blob')
  .filter('is_valid', true)
  // .filter('operation', 'mint')
  .sort('block_number', 'asc')
  .sort('transaction_index', 'asc')
  .select([
    'block_number',
    'block_hash',
    'transaction_burnt_fee',
    'transaction_fee',
    'transaction_hash',
    'transaction_index',
    'from_address',
    'to_address',
    'is_valid',
    'operation',
    'blob20',
  ])
  .getIterator();

const tickersMap = {
  blobbed: {
    supply: 0,
    deploy_block: 19526126,
    max_per_mint: 10_000,
    max_supply: 6_900_000,
  },
  blob: {
    supply: 0,
    deploy_block: 19526198,
    max_per_mint: 1000,
    max_supply: 69_000_000,
  },
  wgw: {
    supply: 0,
    deploy_block: 19526617,
    max_per_mint: 100,
    max_supply: 69_000,
  },
};

for await (const [record] of page) {
  if (!record) break;

  const ticker = record.blob20.token.ticker.toLowerCase();
  const token = tickersMap[ticker];

  const filepath = `./txs/${ticker}/${record.block_number}-${record.transaction_index}-${record.blob20.token.operation}-${record.transaction_hash}.json`;
  const file = Bun.file(filepath);

  if (await file.exists()) {
    console.log('Record exists', record.transaction_hash);
    continue;
  }

  if ((record.block_number || 0) < token.deploy_block) {
    console.log('mint before valid deploy, ignored', record);
    continue;
  }
  if (record.blob20.token.operation === 'deploy') {
    if ((record.block_number || 0) > token.deploy_block) {
      console.log('deploy after valid deploy, ignored', record);
      continue;
    }
  }
  if (record.blob20.token.operation === 'mint' && record.blob20.token.amount > token.max_per_mint) {
    console.log('Amount exceeds max per mint', record);
    continue;
  }

  if (record.blob20.token.operation === 'mint') {
    token.supply += record.blob20.token.amount;
  }

  console.log(token.supply, filepath.replace('./', '').replace('.json', ''));

  await Bun.write(
    filepath,
    JSON.stringify(
      {
        blob20: record.blob20,
        block_hash: record.block_hash,
        // block_number: record.block_number,
        from_address: record.from_address,
        to_address: record.to_address,
        transaction_burnt_fee: record.transaction_burnt_fee,
        transaction_fee: record.transaction_fee,
        // transaction_hash: record.transaction_hash,
        // transaction_index: record.transaction_index,
      },
      null,
      2,
    ),
  );

  if (token.supply >= token.max_supply) {
    console.log('Supply exceeds max supply', record);
    break;
  }
}

// .getPaginated({
//   pagination: {
//     size: 15,
//   },
// });

// console.log(page.records);
