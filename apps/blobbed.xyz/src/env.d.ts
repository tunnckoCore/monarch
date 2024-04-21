/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly RPC_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
