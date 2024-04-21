import type { APIRoute } from 'astro';

import { optimizeFiles } from './_utils.ts';

export const POST: APIRoute = async function optimizeFilesHandler({ request }) {
  const formData = await request.formData();
  const files = formData.getAll('files') as File[] | Blob[];

  if (files.length === 0) {
    // @ts-ignore bruh
    return Response.json({ error: 'the `files` field is required' }, { status: 400 });
  }

  const options = [...formData.entries()].reduce((acc: any, [key, value]) => {
    if (key === 'files') {
      return acc;
    }
    if (key === 'gzip') {
      acc.gzip = value === 'true';
    }
    if (key === 'optimize') {
      acc.optimize = value === 'true';
    }

    return acc;
  }, {});

  const contents = await optimizeFiles(files, options);

  // @ts-ignore bruh
  return Response.json(contents, { status: 200 });
};
