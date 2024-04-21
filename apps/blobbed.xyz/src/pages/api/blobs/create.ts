import type { APIRoute } from 'astro';

import { createBlobsHandler } from '../_utils.ts';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const resp = await createBlobsHandler(formData);

  if (resp.error) {
    // @ts-ignore bruh
    return Response.json(resp, { status: resp.status });
  }

  // @ts-ignore bruh
  return Response.json(resp, { status: 201 });
};
