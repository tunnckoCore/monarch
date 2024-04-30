import { decode as decodeCbor } from 'cborg';
import { bytesToString, fromBlobs, hexToBytes, hexToString } from 'viem';

const BLOB_CACHE = {};

async function* fetchBlob20txs(logging = false) {
  const apiUrl = `https://api.blobscan.com/transactions?expand=block,blob&startBlock=19526126&sort=asc&page=`;
  let page = 1;
  let nextUrl = apiUrl;
  let processed = 0;

  while (nextUrl) {
    const result = await fetch(nextUrl).then((x) => x.json());

    if (result.transactions.length === 0) {
      console.log('no more pages / transactions (we are at the head of the chain)', page);
      break;
    }

    console.log('page:', page);

    page += 1;
    nextUrl = apiUrl + page;

    // emit only blob transactions that are not from a Rollup,
    // and have only one blob in the transaction (that guarantees it's a blob20 transaction)
    const blob20txs = result.transactions.filter((x) => x.rollup === null && x.blobs.length === 1);

    const txs = [] as any;

    for (const tx of blob20txs) {
      const meta = tx.blobs[0];

      const blob_ref = meta.dataStorageReferences.find(
        (x) => x.blobStorage === 'google',
      ).dataReference;

      const blob = {
        hash: meta.versionedHash,
        commitment: meta.commitment,
        proof: meta.proof,
      };

      const blob_storage = {
        google: `https://storage.googleapis.com/blobscan-production/` + blob_ref,
        blockscout: `https://eth.blockscout.com/api/v2/blobs/` + meta.versionedHash,
      };

      let decodedEsip8data;

      if (!BLOB_CACHE[blob.hash]) {
        const blobData = await fetch(blob_storage.google).then((x) => x.text());
        const blobBytes = fromBlobs({ blobs: [blobData.trim() as `0x${string}`], to: 'bytes' });
        logging && console.log('fetching blob', blob.hash);

        try {
          const decoded = decodeCbor(blobBytes);

          if (
            decoded.content &&
            decoded.contentType &&
            (decoded.contentType === 'text/plain' || decoded.contentType === 'application/json')
          ) {
            decodedEsip8data = decoded;
            BLOB_CACHE[blob.hash] = decodedEsip8data;
            logging && console.log('cache miss', tx.hash, blob.hash);
          } else {
            logging &&
              console.info('Invalid BLOB-20 blob', tx.hash, blob.hash, decoded.contentType);
            continue;
          }
        } catch (e) {
          logging && console.info('Failed to decode ESIP-8 blob', blob.hash);
          continue;
        }
      } else {
        logging && console.log('cache hit', tx.hash, blob.hash);
        decodedEsip8data = BLOB_CACHE[blob.hash];
      }

      if (!decodedEsip8data) {
        logging && console.error('No decoded data for blob', blob.hash);
        continue;
      }

      const res = await fetch(`https://eth.blockscout.com/api/v2/transactions/` + tx.hash).then(
        (x) => x.json(),
      );

      const item = {
        from_address: tx.from,
        to_address: tx.to,

        blob,
        blob_storage,
        transaction: {
          hash: tx.hash,
          fee: res.fee.value,
          burnt_fee: res.tx_burnt_fee,
          value: res.value,
          nonce: res.nonce,
          index: res.position,
        },
        block: {
          timestamp: tx.block.timestamp,
          hash: tx.blockHash,
          number: tx.blockNumber,
          slot: tx.block.slot,
        },
        fees: {
          gas_used: res.gas_used,
          gas_price: res.gas_price,
          blob_gas_price: res.blob_gas_price,
          priority_fee: res.priority_fee,
          max_priority_fee: res.max_priority_fee,
          base_fee_per_gas: res.base_fee_per_gas,
          max_fee_per_gas: res.max_fee_per_gas,
          max_fee_per_blob_gas: res.max_fee_per_blob_gas,
        },
      };

      try {
        // ? INFO: handle gzipped `content` and cbor?! Nope, ban that on BLOB-20 spec doc.

        const strJson =
          typeof decodedEsip8data.content === 'string'
            ? decodedEsip8data.content
            : bytesToString(decodedEsip8data.content);

        const blob20content = JSON.parse(strJson);

        if (blob20content.protocol.toLowerCase() === 'blob20' && blob20content.token) {
          // @ts-ignore bruh
          item.blob20 = blob20content.token;
        } else {
          logging &&
            console.info('Invalid BLOB-20 protocol token', item.transaction.hash, item.blob.hash);
          continue;
        }
      } catch (e) {
        logging &&
          console.error(
            'Invalid/unparseable/malformed BLOB-20 json',
            item.transaction.hash,
            item.blob.hash,
          );
        continue;
      }

      processed += 1;
      yield item;

      console.log('processed:', processed);
      // txs.push(item);
    }

    // processed += txs.length;

    // yield txs;
  }
}

/*

const record = {
  from_address: "0x90b1c352e0c498358fbf1fc2a71a27e510b9775c",
  to_address: "0x3e7a28d96f19b65676f4309531418a03039ee5b5",
  blob: {
    hash: "0x01e5e58af1ebde823c80d14f858abbce13ed17ed7b8875ffe2ce0dbd2dc5b237",
    commitment: "0x98c20562607516c946e2ca59201fd7aec5ac0d071bac56d55c344325a1cae68151fbe8508f60900ce4d57297190e3aa0",
    proof: "0xa62d7f93ae5e419309a9b2601b13ea7e35427fc92499776d7015e11cc523ae1a2d3c9fa8f80af7bf05cf858536869017",
  },
  blob_storage: {
    google: "https://storage.googleapis.com/blobscan-production/1/01/e5/e5/01e5e58af1ebde823c80d14f858abbce13ed17ed7b8875ffe2ce0dbd2dc5b237.txt",
    blockscout: "https://eth.blockscout.com/api/v2/blobs/0x01e5e58af1ebde823c80d14f858abbce13ed17ed7b8875ffe2ce0dbd2dc5b237",
  },
  transaction: {
    hash: "0x68bc52102567423fa79cf3cb09a42b26b940ee128025b0dd8e7613ad7be06cdb",
    burnt_fee: "1489711008116728",
    value: "0",
    nonce: 39,
    index: 122,
  },
  block: {
    timestamp: "2024-03-27T14:04:35.000Z",
    hash: "0x4e04b902d83f8ed0fde9984d579c0033bef0e5dceb5900cfdc3ce1ce6b04a6f7",
    number: 19526126,
    slot: 8727021,
  },
  fees: {
    gas_used: "21368",
    gas_price: "69726913521",
    blob_gas_price: "1",
    priority_fee: "213680000000",
    max_priority_fee_per_gas: "10000000",
    base_fee_per_gas: "69716913521",
    max_fee_per_gas: "72470619036",
    max_fee_per_blob_gas: "5000000000",
  },
  blob20: {
    ...
  },
}

*/

let counter = 0;

for await (const record of fetchBlob20txs()) {
  if (counter >= 20) {
    break;
  }

  console.log(record);
  counter += 1;
}

// console.log(hexToString('0x646174613a746578742f706c61696e3b6261736536342c697374656374'));

// blocks/by_hash/:block_hash - value, block data
// blocks/by_number/:block_number - value, link to by_hash (block_hash)

// blobs/by_hash/:blob_hash - value, blob data + blob_storage
// blobs/by_commitment/:commitment_hash - value, link to by_hash (blob_hash)
// blobs/by_txhash/:tx_hash - value, link to by_hash (blob_hash)

// fees/:txhash - value, tx fees data

// rows/:txhash - value, full tx data

// account/tx/:account/:ticker/:txhash - value, link to rows/:txhash
// account/balance/:account/:ticker - value, account balance count

// tokens/info/:ticker - value, deploy data
// tokens/tx/:ticker/:txhash - value, link to rows/:txhash

// stats/tokens - value, deploys counter, similar to calling all of `tokens/info`, but without pagination needed
// stats/accounts - value, users counter
// stats/transactions - value, tx counter
// stats/transactions - value, tx counter
