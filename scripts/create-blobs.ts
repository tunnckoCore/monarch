// import type { APIRoute } from 'astro';
// import { encode as encodeCborg } from 'cborg';
// import { loadKZG } from 'kzg-wasm';
// // import { encode as cborXencode, decode as cborXdecode } from 'cbor-x';

// import { blobsToCommitments, bytesToHex, hexToBytes, sha256, toBlobs } from 'viem';

// import { optimizeFiles } from './utils.ts';

// type CustomFile = {
//   gzip?: boolean;
//   name?: string;
//   size: number;
//   type: string;
//   arrayBuffer: () => Promise<ArrayBuffer>;
// };

// export const POST: APIRoute = async ({ request }) => {
//   const formData = await request.formData();
//   const files = formData.getAll('files') as File[] | Blob[] | CustomFile[];

//   if (files.length === 0) {
//     return Response.json({ error: 'the `files` field is required' }, { status: 400 });
//   }

//   const options = [...formData.entries()].reduce(
//     (acc, [key, value]) => {
//       if (key === 'files') {
//         return acc;
//       }
//       if (key === 'gzip') {
//         acc.gzip = value === 'true';
//       }

//       return acc;
//     },
//     { gzip: true, foo: 123 },
//   );

//   const contents = await optimizeFiles(files, options);
//   const outputs = contents.map((out) => {
//     if (!out.gzip) {
//       return out;
//     }

//     const u8 = hexToBytes(out.output);
//     const ratio = u8.length / out.outputSize;

//     if (ratio > 10) {
//       return { ...out, ratio, skip: true, gzipBomb: true };
//     }

//     return out;
//   });

//   const cbors = outputs.map((out) => {
//     const u8 = hexToBytes(out.output);
//     const cbor = encodeCborg({ content: u8, mimetype: out.mimetype });

//     return { ...out, cbor };
//   });

//   const kzg = await loadKZG();
//   const items = cbors.map((out) => {
//     try {
//       const { blobs, commitments, versionedHashes, buffer } = contentToBlobs(out.cbor, kzg);

//       return {
//         ...out,
//         cbor: bytesToHex(out.cbor),
//         blobs,
//         commitments,
//         versionedHashes,
//         blobData: bytesToHex(buffer),
//       };
//     } catch {
//       return {
//         ...out,
//         cbor: bytesToHex(out.cbor),
//         error: {
//           code: 'FILE_TOO_BIG_FOR_BLOBS',
//           message: 'The file is too big to be converted to blobs',
//         },
//       };
//     }
//   });

//   return Response.json(items, {
//     status: 200,
//   });
// };

// function contentToBlobs(content: string | Uint8Array, kzg: any) {
//   const contentBuffer = typeof content === 'string' ? new TextEncoder().encode(content) : content;

//   const contentBlobs = toBlobs({ data: contentBuffer, to: 'hex' });
//   const contentCommitments = blobsToCommitments({ blobs: contentBlobs, kzg });

//   return {
//     content,
//     buffer: contentBuffer,
//     blobs: contentBlobs,
//     commitments: contentCommitments,
//     versionedHashes: contentCommitments.map((x) => `0x01${sha256(x).slice(4)}`),
//     toBlobHash: (x: any) => `0x01${sha256(x).slice(4)}`,
//   };
// }
