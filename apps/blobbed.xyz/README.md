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
- POST /api/blobs/create - normalize and generate blob data
- POST /api/blobs/inscribe - send transaction with generated blobs

- POST /api/blob20/deploy - deploy a new token
- POST /api/blob20/mint - mint amount of token
- POST /api/blob20/transfer - transfer tokens

- GET /api/generate-wallet - generated ones are not written anywhere

// can be used for any ethscriptions, it uses imagemin-webp
- POST /api/optimize-files - optimize files, using gzip / converting to webp (if image)
```
