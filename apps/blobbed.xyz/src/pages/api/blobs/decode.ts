import type { APIRoute } from 'astro';
import { decode as decodeCbor } from 'cborg';
import { fromBlobs } from 'viem';

export const GET: APIRoute = async function decodeHashes({ request }) {
  const url = new URL(request.url);
  const hash = url.searchParams.get('hash') as `0x${string}` | undefined;

  if (!hash) {
    // @ts-ignore bruh
    return Response.json({ error: { message: 'Missing hash' } }, { status: 400 });
  }

  const isHash = hash.startsWith('0x') && hash.length === 66;
  const isBlobVersionedHash = isHash && hash.startsWith('0x01');

  if (!isHash || !isBlobVersionedHash) {
    // @ts-ignore bruh
    return Response.json(
      { error: { message: 'Invalid hash: should be transaction hash or blob versioned hash' } },
      { status: 400 },
    );
  }

  if (isBlobVersionedHash) {
    const blobVersionedHashes = hash.split(',') as `0x01${string}`[];
    const decodedBytes = fromBlobs({ blobs: blobVersionedHashes, to: 'bytes' });
    const cbor = decodeCbor(decodedBytes);

    // @ts-ignore bruh
    return Response.json({ data: cbor });
  }

  // TODO: decode from transaction hash

  // @ts-ignore bruh
  return Response.json({ error: { message: 'Not implemented' } }, { status: 501 });
};
