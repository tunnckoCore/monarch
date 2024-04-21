import type { APIRoute } from 'astro';

import { inscribeBlob } from '../_utils.ts';

export const POST: APIRoute = async function inscribeBlobsHandler({ request }) {
  const json = await request.json();
  const result = await inscribeBlob(json);

  if (result.error) {
    // @ts-ignore bruh
    return Response.json(result, { status: result.error.status });
  }

  // @ts-ignore bruh
  return Response.json(result);
};
