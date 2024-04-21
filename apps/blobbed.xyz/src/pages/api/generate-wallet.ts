import type { APIRoute } from 'astro';

import { generateAccount } from './_utils';

export const GET: APIRoute = async () => {
  try {
    const resp = generateAccount();

    // @ts-ignore bruh
    return Response.json({ data: resp }, { status: 200 });
  } catch (e: any) {
    // @ts-ignore bruh
    return Response.json({ error: e.message }, { status: 500 });
  }
};
