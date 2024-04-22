# blobbed.xyz

Website source code of https://blobbed.xyz - the official site for all things
[ESIP-8](https://docs.ethscriptions.com/esips/esip-8-ethscription-attachments-aka-blobscriptions) -
regular [Blobscriptions](https://github.com/tunnckoCore/blobscriptions) and
[Blob-20](https://github.com/tunnckoCore/blobscriptions/blob/master/blob20.md) tokens.

## API

Currently, for more info see the endpoints at `src/pages/api/`. You can create any ESIP-8
Blobscriptions with it, including optimizing of images if you want. You can also deploy, mint, and
transfer Blob-20 tokens.

```
- GET /api/blobs/decode?hash=:tx_hash or comma separated blob_versioned_hashes
- POST /api/blobs/create
- POST /api/blobs/inscribe

- POST /api/blob20/deploy
- POST /api/blob20/mint
- POST /api/blob20/transfer

- GET /api/generate-wallet
- POST /api/optimize-files
```
