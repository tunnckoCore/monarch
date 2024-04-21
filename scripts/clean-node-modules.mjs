import fs from 'node:fs/promises';
import path from 'node:path';
import fastGlob from 'fast-glob';

const stream = fastGlob.stream(['**/node_modules/**'], {
  onlyDirectories: true,
});

for await (const entry of stream) {
  await fs.rm(path.resolve(entry), { recursive: true, force: true });
}
