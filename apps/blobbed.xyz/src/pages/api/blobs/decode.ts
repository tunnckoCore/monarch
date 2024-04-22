import type { APIRoute } from 'astro';
import { decode as decodeCbor } from 'cborg';
import pMap from 'p-map';
import { bytesToHex, fromBlobs, hexToString } from 'viem';

import { tryUngzip } from '../_utils';

export const GET: APIRoute = async function decodeHashes({ request }) {
  const url = new URL(request.url);
  let cbor;

  try {
    let hash = url.searchParams.get('hash') as `0x${string}` | undefined;
    const chainId = (url.searchParams.get('chainId') as string | undefined) || '11155111';

    if (!hash) {
      // @ts-ignore bruh
      return Response.json({ error: { message: 'Missing hash', status: 400 } }, { status: 400 });
    }

    const isHash = hash.startsWith('0x') && hash.length === 66;
    let isBlobVersionedHash = isHash && hash.startsWith('0x01');

    if (!isHash && !isBlobVersionedHash) {
      // @ts-ignore bruh
      return Response.json(
        {
          error: {
            message: 'Invalid hash: should be transaction hash or blob versioned hash',
            status: 400,
          },
        },
        { status: 400 },
      );
    }

    // TODO: decode from transaction hash
    if (isHash && hash) {
      const apiUrl =
        chainId === '11155111'
          ? `https://sepolia.blobscan.com/api/trpc/tx.getByHash?input={%22json%22:{%22hash%22:%22${hash}%22}}`
          : `https://api.blobscan.com/transactions/${hash}`;

      const resp = await fetch(apiUrl).then((x) => x.json());
      const res = chainId === '11155111' ? resp?.result?.data?.json : resp;

      hash = res?.blobs.map((x) => x.versionedHash).join(',');
      isBlobVersionedHash = true;
    }

    if (isBlobVersionedHash && hash) {
      const blobVersionedHashes = hash.split(',') as `0x01${string}`[];

      const blobs = await pMap(
        blobVersionedHashes,
        async (hash) => {
          const apiUrl =
            chainId === '11155111'
              ? `https://sepolia.blobscan.com/api/trpc/blob.getByBlobId?input={%22json%22:{%22id%22:%22${hash}%22}}`
              : `https://api.blobscan.com/blobs/${hash}`;

          const resp = await fetch(apiUrl).then((x) => x.json());
          const res = chainId === '11155111' ? resp?.result?.data?.json : resp;

          if (res) return res.data;
        },
        { concurrency: 2 },
      );

      const decodedBytes = fromBlobs({ blobs: blobs.filter(Boolean), to: 'bytes' });
      cbor = decodeCbor(decodedBytes);

      cbor.contentType = cbor.contentType || cbor.mimetype || cbor.type || cbor.mimeType;

      delete cbor.mimeType;
      delete cbor.mimetype;
      delete cbor.type;

      cbor.contentType = cbor.contentType?.startsWith('0x')
        ? hexToString(cbor.contentType)
        : cbor.contentType;

      cbor.content = tryUngzip(cbor.content);
      cbor.content = bytesToHex(cbor.content);

      if (cbor.contentType === 'text/plain' || cbor.contentType === 'application/json') {
        cbor.content = hexToString(cbor.content);
      }
    }
  } catch (e) {
    // @ts-ignore bruh
    return Response.json({ error: { message: e?.message, status: 500 } }, { status: 500 });
  }

  if (!cbor) {
    // @ts-ignore bruh
    return Response.json({ error: { message: 'No data found', status: 404 } }, { status: 404 });
  }

  // @ts-ignore bruh
  return Response.json({ data: cbor });
};
