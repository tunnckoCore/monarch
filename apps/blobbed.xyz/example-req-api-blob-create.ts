import fs from 'node:fs/promises';
import { decode } from 'cborg';
import { bytesToString, fromBlobs } from 'viem';

// import { createBlobscription, inscribeBlobscription } from './src/pages/api/blob20/_utils.ts';

// import { parseInputData } from './blob-decode-blobscan-trpc';

const RECEIVER = '0xA20C07F94A127fD76E61fbeA1019cCe759225002';
const CREATOR_PRIV_KEY = '0x67c7cb1a4c38e69d7dd79a310134882f0d021f10767570b1500b2d9bcafbd4c2'; // burner

// ok file: modcatshop-unsplash.jpg

// const API_URL = `https://blobbed.wgw.lol`;

const API_URL = `http://localhost:4321/api`;
// const CONTENT = 'data:,hey world! this is a blob; follow for more: https://twitter.com/wgw_eth';

// const x = 'jiu_umbrella.e2594ee5_Zlwl9x.webp';
// const file = await fs.readFile(`./${filename}`);
// const fileBytes = new Uint8Array(file.buffer);
// const gzipBytes = gzipSync(fileBytes);
// const CONTENT = bytesToHex(gzipBytes);

// console.log('    File Size:', fileBytes.length, 'gzip:', gzipBytes.length);

// console.log('    imgmin:', file.length, new Uint8Array((await imageminWebp()(file)).buffer));

// const fileBuf = await fs.readFile(`./kate-stone-matheson-uy5t-CJuIK4-unsplash.jpg`);
// const fileBytes = new Uint8Array(fileBuf.buffer);
// // const gzipBytes = gzipSync(fileBytes);
// const file = new File([fileBytes], 'kate-stone-matheson-uy5t-CJuIK4-unsplash.jpg', {
//   type: 'image/jpeg',
// });

// const resp = await fetch(API_URL + '/blob20/mint', {
//   method: 'POST',
//   body: JSON.stringify({
//     token: {
//       operation: 'mint', // 'deploy',
//       ticker: '... ticker ...',
//       amount: 1000,
//     },
//     initialOwnerAddress: LOGGED_USER_ADDRESS,
//     creatorPrivateKey: LOGGED_USER_PRIVATE_KEY,
//   }),
//   headers: { 'Content-Type': 'application/json' },
// });

// console.log(await resp.json());

// const blobsData = fromBlobs({ blobs: [getBlobData() as any], to: 'bytes' });
// const decodedCbor = decode(blobsData);

// console.log(decodedCbor);
// console.log(bytesToString(decodedCbor.content));

// function getBlobData() {
//   const blobdata;
//   return blobdata;
// }
