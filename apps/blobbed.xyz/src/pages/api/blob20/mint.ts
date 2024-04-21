import type { APIRoute } from 'astro';

import { operationWrapper, tokenMintOp } from './_utils';

export const POST: APIRoute = async ({ request }) => {
  const result = await operationWrapper(tokenMintOp, request);

  // @ts-ignore yeah sure, but .json exists
  return Response.json(result, {
    status: result.error ? result.error.status : 200,
  });
};
