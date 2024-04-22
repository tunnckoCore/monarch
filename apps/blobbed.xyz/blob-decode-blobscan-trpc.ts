// import { decode as cborXdecode } from 'cbor-x';
// import { gunzipSync } from 'fflate';
// import { bytesToString, hexToBytes, sha256 } from 'viem';

// // https://sepolia.blobscan.com/api/trpc/tx.getByHashFull?input={"json":{"hash":"0x1060b08c38c84b64331e467dd92cac3a21769ee63a2ad536dd0ac7367ca28497"}}

// export const chainToApi = {
//   '1': {
//     blobscan: 'blobscan.com',
//     blockscout: 'eth.blockscout.com',
//   },
//   '11155111': {
//     blobscan: 'sepolia.blobscan.com',
//     blockscout: 'eth-sepolia.blockscout.com',
//   },
// };

// export function fromTxBlobs(blobs) {
//   if (blobs.length === 0) return '';

//   const concatenatedHex = blobs
//     .map((blob) => {
//       const hexBlob = blob.replace(/^0x/, '');

//       const sections = hexBlob.match(/.{64}/gm);

//       if (sections === null) {
//         return;
//       }

//       const lastNonEmptySectionIndex = sections.reduceRight((acc, section, i) => {
//         if (acc === null && section !== '00'.repeat(32)) {
//           return i;
//         }
//         return acc;
//       });

//       const nonEmptySections = sections.slice(0, lastNonEmptySectionIndex + 1);

//       const lastNonEmptySection = nonEmptySections.at(-1);

//       if (lastNonEmptySection === `0080${'00'.repeat(30)}`) {
//         nonEmptySections.pop();
//       } else {
//         nonEmptySections[nonEmptySections.length - 1] = lastNonEmptySection.replace(/80(00)*$/, '');
//       }

//       const nonEmptySectionsJoined = nonEmptySections
//         .map((section) => {
//           if (!section.startsWith('00')) {
//             throw new Error('Expected the first byte to be zero');
//           }

//           return section.replace(/^00/, '');
//         })
//         .join('');

//       return nonEmptySectionsJoined;
//     })
//     .filter(Boolean)
//     .join('');

//   return concatenatedHex;
// }

// export async function getBlob(blobHash, options = {}) {
//   const opts = { chainId: 11_155_111, withoutBlobData: false, ...options };
//   const { blobscan, blockscout } = chainToApi[opts.chainId];

//   const resp = await fetch(
//     `https://${blobscan}/api/trpc/blob.getByBlobIdFull?input=${JSON.stringify({
//       json: { id: blobHash },
//     })}`,
//   ).then((x) => x.json());

//   if (resp.error) {
//     return {
//       error: { message: resp.error.json.message, code: resp.error.json.code },
//     };
//   }

//   const blobData = resp.result.data.json.data;
//   const blob = { blobData, ...resp.result.data.json };
//   const txs = blob.transactionsWithBlocks;

//   if (opts.withoutBlobData) {
//     delete blob.blob_data;
//   }

//   delete blob.size;
//   delete blob.data;
//   delete blob.transactionsWithBlocks;

//   const firstTx = txs[0];
//   const duplicates = txs.slice(1);

//   let transaction;
//   let block;

//   try {
//     transaction = await fetch(`https://${blockscout}/api/v2/transactions/${firstTx.txHash}`).then(
//       (x) => x.json(),
//     );
//   } catch {}
//   try {
//     block = await fetch(`https://${blockscout}/api/v2/blocks/${firstTx.blockNumber}`).then((x) =>
//       x.json(),
//     );
//   } catch {}

//   const data = { block, transaction, blob, duplicates };

//   return { data };
// }

// export async function getBlobscription(txHash, options = {}) {
//   const opts = { chainId: 11_155_111, ...options };
//   const { blobscan } = chainToApi[opts.chainId];

//   const txresp = await fetch(
//     `https://${blobscan}/api/trpc/tx.getByHashFull?input=${JSON.stringify({
//       json: { hash: txHash },
//     })}`,
//   ).then((x) => x.json());

//   if (txresp.error) {
//     return {
//       error: {
//         message: txresp.error.json.message,
//         code: txresp.error.json.code,
//       },
//     };
//   }

//   const txBlobs = txresp.result.data.json.blobs as { blobHash: string }[];
//   const blobCombinedData = (
//     await Promise.all(
//       txBlobs.map(async (blob) => {
//         try {
//           return (await getBlob(blob.blobHash, opts)).data?.blob.blob_data;
//         } catch {
//           console.log(
//             'some error occurred while fetching blob data:',
//             blob.blobHash,
//             'tx hash:',
//             txHash,
//           );
//         }
//       }),
//     )
//   )
//     .filter(Boolean)
//     .join('');

//   const blobs = blobCombinedData.split('0x').map((x) => `0x${x}`) as `0x${string}`[];

//   let inputData: null | `0x${string}`;

//   try {
//     inputData = `0x${fromTxBlobs(blobs)}` as `0x${string}`;
//   } catch {
//     return { error: 'error while converting blobs to hex data' };
//   }

//   return parseInputData(inputData, txHash);
// }

// export function tryUngzip(data) {
//   const u8data = new Uint8Array(data);

//   let decompressedContentU8: Uint8Array | null = null;
//   if (u8data.length > 0 && u8data[0] === 31 && u8data[1] === 139 && u8data[2] === 8) {
//     decompressedContentU8 = gunzipSync(u8data);
//   }

//   return decompressedContentU8 || u8data;
// }

// // 0xa267636f6e7465
// // 0xa267636f6e7465

// export function parseInputData(inputHex, txHash) {
//   const inputData = inputHex;
//   const inputBytes = tryUngzip(hexToBytes(inputData));
//   const data =
//     inputData.startsWith('0xb90002') || inputData.startsWith('0xa26763')
//       ? cborXdecode(inputBytes)
//       : { content: hexToBytes(inputData) };

//   const { content, mimetype } = data;
//   const contentU8 = new Uint8Array(content);

//   if (data.content) {
//     console.log({ data1: data });

//     data.content = tryUngzip(contentU8);
//     data.size = data.content.length;

//     console.log({ data2: data });

//     let rawJson;
//     try {
//       const str = bytesToString(data.content);

//       rawJson = JSON.parse(str.startsWith('data:') ? str.slice(str.indexOf(',') + 1) : str);
//       data.mimetype = 'application/json';
//       data.content_json = rawJson;
//     } catch {}

//     if (
//       !rawJson &&
//       data.mimetype &&
//       data.mimetype.includes('application/') &&
//       data.mimetype.includes('json')
//     ) {
//       try {
//         data.content_json = JSON.parse(bytesToString(data.content));
//       } catch {}
//     }
//   }

//   data.sha = `0x${calculateSha(content, mimetype)}`;
//   data.transaction_hash = txHash;

//   return data;
// }

// export function calculateSha(content: string | Uint8Array, mimetype: string) {
//   // echo 'foo' | sha256sum = b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c
//   const contentSha = sha256(content).slice(2); // non 0x-ed
//   // echo 'bar' | sha256sum = 7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730
//   const mimeSha = sha256(mimetype).slice(2); // non 0x-ed

//   // echo 'b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730' | sha256sum
//   // = ca76adad5fce9485c5ce1523e21f227b4ab8e68e96d656b09672a0febff0240d
//   const str = contentSha + mimeSha; // non 0x-ed

//   // viem's SHA256 returns 0x-ed, but it's safe to just remove `0x`
//   // and it will equal the `str`

//   // echo 'ca76adad5fce9485c5ce1523e21f227b4ab8e68e96d656b09672a0febff0240d' | sha256sum
//   // = 3dea0c435baa6f3240e8e883a729f3b0513778ed2845c288a2afb0c9340d7378
//   return sha256(str as `0x${string}`).slice(2);
// }

// // - ESIP-9 - api & indexer standardization (useful for recursion) - github.com/ethscriptions-protocol/ESIP-Discussion/issues/18
// // - ESIP-10 - blobs-based collections standard - github.com/ethscriptions-protocol/ESIP-Discussion/issues/19
// // - ESIP-11 - transferring (bulk and not) through blobs - github.com/ethscriptions-protocol/ESIP-Discussion/issues/20

// const esip8docs = `0x5d04d632d3affef95b0ae141f2b5b5af474ab80a24925672bdd551637990054b`;
// const sep20tx = `0x68266d76349ba4145889a521ae4b787e90b7c791eaa847b4fa1f92e6f45d4446`;
// const rawBlobErc20 = `0x2ac09f7de0affbec6c588f5269db9821d6a2a4de8274e40add7bcdc8c1df84a9`;
// const elmoCborTx = `0x6e76db77963458c145ae89b34f322638ced3d961c20a7efe4c3c8003f56180ef`;
// const elmoBlobTx = `0x519379f640c964ba9517a49a38acf34062fedcda256861f71f120c9217b0b507`;
// const a530kbTx = `0x17ff287203687b9667eacd3473ae9d22946ca3a06c67573403e2718a164a270f`;
// const nonCborTx = `0x7cd4325a34e934e227a5539c8467c363ab4236c8b469e5bfd8be45c918218ce3`;
// const budiez3tx = `0x228c0ecfe26a43e89411bafd04f10286cbf245108821e0eb597abefe8e3acb0b`;
// const top5geckoTx = `0x8b5953eb496dee0075a71155678d45385d21ff410683f889ab507282a8e2ebc5`;
// const shallbeEncipherTx = `0x53bb90b706f6fcbec44aade06ebc7205aeb7aec2a879d922b6875d4365968b9a`;
// const pepescription1255tx = `0xeff1839d9883f067cd5e87a8186c4609eaf45c0f7aa4344afefbbe6b1fad8826`;
// const someImgTx = `0x7b75b8c3368001566c5fef518c10167e71ef5b45c53d38f5c89e537c4e0a1d3c`;
// const unsupTx = `0x36c575094c3ee59ca931ccb58ac08242c491b2c8aa6db588c6914f4d4a358d19`;

// // await getBlobscription(sep20tx);
// // await getBlobscription(elmoCborTx);
// // await getBlobscription(a530kbTx);
// // await getBlobscription(unsupTx);
// // await getBlobscription(nonCborTx, { chainId: 1 });
// // await getBlobscription(budiez3tx, { chainId: 1 });
// // await getBlobscription(top5geckoTx, { chainId: 1 });
// // await getBlobscription(shallbeEncipherTx, { chainId: 1 });
// // await getBlobscription(pepescription1255tx, { chainId: 1 });
// // await getBlobscription(elmoBlobTx, { chainId: 1 });
// // await getBlobscription(someImgTx, { chainId: 1 });
// // await getBlobscription(rawBlobERC20, { chainId: 1 });
// // await getBlobscription(`0x44cb8e91e0453e128ffac33db54a8951ca49a4df5a5e59b02b8fec989eeafd77`, { chainId: 1 });

// // await getBlobscription(sep20tx);
// // await getBlobscription(elmoTx);
// // await getBlobscription(a530kbTx);

// // const res = await getBlob(sep20ticker_blob, { withoutBlobData: false });
// // console.log(res);

// // await getBlobData(res.data.blob.blob_data);

// /*

//   def self.from_blobs(blobs)
//     return if blobs.blank?

//     concatenated_hex = blobs.map do |blob|
//       hex_blob = blob["blob"].sub(/\A0x/, '')

//       sections = hex_blob.scan(/.{64}/m)

//       last_non_empty_section_index = sections.rindex { |section| section != '00' * 32 }
//       non_empty_sections = sections.take(last_non_empty_section_index + 1)

//       last_non_empty_section = non_empty_sections.last

//       if last_non_empty_section == "0080" + "00" * 30
//         non_empty_sections.pop
//       else
//         last_non_empty_section.gsub!(/80(00)*\z/, '')
//       end

//       non_empty_sections = non_empty_sections.map do |section|
//         unless section.start_with?('00')
//           raise InvalidInputError, "Expected the first byte to be zero"
//         end

//         section.delete_prefix("00")
//       end

//       non_empty_sections.join
//     end.join
//   end

// */

// // convert above ruby to javascript
