import { readdir } from 'node:fs/promises';

// const files = await readdir('./txs/wgw');

// for (const fpath of files.sort()) {
//   console.log(fpath.replace('.json', ''));
// }

const blobTxnsFile = Bun.file('./blob20-wgw-txns.txt');
const blobtxs = await blobTxnsFile.text();
const txs = blobtxs.split('\n').filter(Boolean);

const data = [] as any;

// console.log('start:', txs.length);

for (const txRow of txs) {
  const [block_number, transaction_index, op, transaction_hash] = txRow.split('-');
  const file = Bun.file('./txs/wgw/' + txRow + '.json');
  const tx = await file.json();

  const item = {
    ...tx,
    block_number,
    transaction_index,
    transaction_hash,
  };

  data.push(item);
}

let supply = 0;

// sort by block_number ascending AND transaction_index ascending
const sorted = data
  .sort((a, b) => {
    if (a.block_number !== b.block_number) {
      return a.block_number - b.block_number;
    }

    return a.transaction_index - b.transaction_index;
  })
  .map((x) => {
    supply += x.blob20.token.amount || 0;

    console.log(
      [
        x.block_number,
        x.transaction_index,
        x.blob20.token.operation,
        x.transaction_hash,
        x.blob20.token.amount || 0,
        supply,
      ].join(','),
    );
  });

// // console.log(sorted.filter((x) => x.block_number === '19528327'));
// console.log(
//   sorted.find(
//     (x) =>
//       (x.transaction_hash = '0x361e346a1b3af11bdf87307204aa4076cac2b744311ac04368f9ebdaeb5b20aa'),
//   ),
// );
