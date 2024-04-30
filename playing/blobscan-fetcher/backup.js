/*

- https://api.blobscan.com/transactions/:hash?expand=block,blob,blob_data
- https://api.blobscan.com/transactions?expand=block,transaction&startBlock=19526126&ps=2000


hash	"0x4a2984e01e2cea4e4cc057…c5f9ac7b1e8280c64958f0b"
blockNumber	19526198
blockHash	"0xc23bbee3496b650b140850…db003c60bb8b0da3c8b7587"
from	"0x90b1c352e0c498358fbf1fc2a71a27e510b9775c"
to	"0x90b1c352e0c498358fbf1fc2a71a27e510b9775c"
maxFeePerBlobGas	"5000000000"
blobAsCalldataGasUsed	"526136"
rollup	null
blobs
0
versionedHash	"0x011d49120d3dc2e816693682ae4701e6026fe4725f65c297a45d1c958986c351"
index	0
data	"0x00a267636f6e74656e7458717b2270726f746f636f6c223a22626c6f62323022002c22746f6b656e223a7b226f7065726174696f6e223a226465706c6f79222c00227469636b6572223a22424c4f42222c22737570706c79223a3639303030300030302c226c696d6974223a313030302c22646563696d616c73223a31387d7d006b636f6e74656e7454797065706170706c69636174696f6e2f6a736f6e80000"
commitment	"0x801f48796893688b273861…af37a2e50a7a204a35bfbca"
proof	"0x82171f82d8a7380501a543…652fc7b6c2a5a2f1b35fa8a"
size	131072
dataStorageReferences
0
blobStorage	"google"
dataReference	"1/01/1d/49/011d49120d3dc…297a45d1c958986c351.txt"
1	{…}
block
blobGasUsed	"131072"
blobAsCalldataGasUsed	"526136"
blobGasPrice	"1"
excessBlobGas	"0"
hash	"0xc23bbee3496b650b140850…db003c60bb8b0da3c8b7587"
timestamp	"2024-03-27T14:19:23.000Z"
slot	8727095
blobAsCalldataGasFee	"29133088764054808"
blobGasBaseFee	"131072"
blobGasMaxFee	"655360000000000"
blobGasUsed	"131072"


- https://api.blobscan.com/transactions?expand=block,transaction&startBlock=19526126&ps=2000
const txs = [
  {
    hash: '0x8bb5a7e220f2e5c809b7a611756d5ff35f3fb0c0e21659f144089331e9f7278c',
    blockNumber: 19692096,
    blockHash: '0x286686b7ec2ba38ad59311b6fabd5344675b789c4f8ba3e10347cab3b1012b53',
    from: '0x5050f69a9786f081509234f1a7f4684b5e5b76c9',
    to: '0xff00000000000000000000000000000000008453',
    maxFeePerBlobGas: '1000000000',
    blobAsCalldataGasUsed: '12463044',
    rollup: 'base',
    blobs: [
      {
        versionedHash: '0x01bef754cea53d7fa29616266e4b6e7e1bb1049144e9baf10002e14f33d0d057',
        index: 0,
        commitment:
          '0x88155e0c98137c4c18986c431e626c76deb6c6be8f35c29890e9fee0854f114661ddb2eaf411139f4af4970cb4aefbce',
        proof:
          '0x8ff9a8ebdd8fc0d6c5414e690a5d0fbfd1123357bf4cc987610a573ccaaf9ac9d891721c895e39b05c8f2bb7f786ffce',
        size: 131072,
        dataStorageReferences: [
          {
            blobStorage: 'google',
            dataReference:
              '1/01/be/f7/01bef754cea53d7fa29616266e4b6e7e1bb1049144e9baf10002e14f33d0d057.txt',
          },
        ],
      },
      {
        versionedHash: '0x01f7cc9250f3017eed649c90fd769a79e14c49a80b4230e8b443be799f697d11',
        index: 1,
        commitment:
          '0x8c1fc8525ff2b4f543306c2a17cecdc0e7015f1a601f56095e51ff18ed22ece2de1bb17c4f3bd22abecad8da5a6f6bfd',
        proof:
          '0x91f5eda1053aec9ab2ddb57f79e36dd6bd3f17aa31358ff0b02bbfcfadfdd492e8037ca87dd6d01e669792f65a3a108d',
        size: 131072,
        dataStorageReferences: [
          {
            blobStorage: 'google',
            dataReference:
              '1/01/f7/cc/01f7cc9250f3017eed649c90fd769a79e14c49a80b4230e8b443be799f697d11.txt',
          },
        ],
      },
      {
        versionedHash: '0x01b7e1fb1786341996a7a041280ae2fee4fb27b299ea7c36c1f14df1696686bf',
        index: 2,
        commitment:
          '0xac6a0f025877da8cc6df1b72f55805e7f75b42aa1a1707c3b4ccdedd5b28e9e2e220be125792903f74deffbf9ed97b00',
        proof:
          '0x985bc1bff5fed06133acad759d3ad10dde66649fff11a113dd79033613f44613c5f5901e4d0630394ae55607242cb882',
        size: 131072,
        dataStorageReferences: [
          {
            blobStorage: 'google',
            dataReference:
              '1/01/b7/e1/01b7e1fb1786341996a7a041280ae2fee4fb27b299ea7c36c1f14df1696686bf.txt',
          },
        ],
      },
      {
        versionedHash: '0x01ef2925dbec891f4a40428fae533df8cc65afc143e64fbd2a5919f639be8913',
        index: 3,
        commitment:
          '0x87448ec568970a4cb7fa90dbb4e3800075bfd941386548df8c2e001cc6fa2adcf9d02003810fecb728be0b5dfc334500',
        proof:
          '0xb2d2d04ddd4a3f3665acb7936e0fd068088cd768e6016fa8ac4a7790c7f17d058502be175c09ce4d6e72c808fcc2eb50',
        size: 131072,
        dataStorageReferences: [
          {
            blobStorage: 'google',
            dataReference:
              '1/01/ef/29/01ef2925dbec891f4a40428fae533df8cc65afc143e64fbd2a5919f639be8913.txt',
          },
        ],
      },
      {
        versionedHash: '0x0188cccb73507071ff25ac33962d361dbddf72b5ccad6d9b4d0b1015ca3c8b34',
        index: 4,
        commitment:
          '0xa59d5056febde5c70fa9b2664713c015d8d2493a61ee7366d3102ff282e70439f8ed504246421d5959947cc6b2490e23',
        proof:
          '0xa2a31285d8a87c5b368de3111214d04c986a04741b0833b991724b878145cb71a5189e931a9f4043489088670fe91dae',
        size: 131072,
        dataStorageReferences: [
          {
            blobStorage: 'google',
            dataReference:
              '1/01/88/cc/0188cccb73507071ff25ac33962d361dbddf72b5ccad6d9b4d0b1015ca3c8b34.txt',
          },
        ],
      },
      {
        versionedHash: '0x01d96fb00a45d43e833863704141283e903730e5be364299ee61d3631e75c523',
        index: 5,
        commitment:
          '0xabeb251d169579ff2306fd87d4f7c103620d5e9898e5407aa56216494cdd6136deb5f5a6adfefceaace7f02515c2570f',
        proof:
          '0xac42b634eced2a45db21aade19a8edb9742999d36490dfb902db2ddcfb6a327f1ffa776953c972073398a875133134ba',
        size: 131072,
        dataStorageReferences: [
          {
            blobStorage: 'google',
            dataReference:
              '1/01/d9/6f/01d96fb00a45d43e833863704141283e903730e5be364299ee61d3631e75c523.txt',
          },
        ],
      },
    ],
    block: {
      blobGasUsed: '786432',
      blobAsCalldataGasUsed: '12463044',
      blobGasPrice: '1',
      excessBlobGas: '0',
      hash: '0x286686b7ec2ba38ad59311b6fabd5344675b789c4f8ba3e10347cab3b1012b53',
      timestamp: '2024-04-19T21:15:47.000Z',
      slot: 8894777,
    },
    blobAsCalldataGasFee: '125049703467888540',
    blobGasBaseFee: '786432',
    blobGasMaxFee: '786432000000000',
    blobGasUsed: '786432',
  },
];

- https://api.blobscan.com/blobs?expand=block,transaction&startBlock=19526126&sort=asc&ps=2000

const blobitem = {
  commitment:
    '0x98c20562607516c946e2ca59201fd7aec5ac0d071bac56d55c344325a1cae68151fbe8508f60900ce4d57297190e3aa0',
  proof:
    '0xa62d7f93ae5e419309a9b2601b13ea7e35427fc92499776d7015e11cc523ae1a2d3c9fa8f80af7bf05cf858536869017',
  size: 131072,
  versionedHash: '0x01e5e58af1ebde823c80d14f858abbce13ed17ed7b8875ffe2ce0dbd2dc5b237',
  dataStorageReferences: [
    {
      blobStorage: 'google',
      dataReference:
        '1/01/e5/e5/01e5e58af1ebde823c80d14f858abbce13ed17ed7b8875ffe2ce0dbd2dc5b237.txt',
    },
    {
      blobStorage: 'swarm',
      dataReference: '4eca94212622d0175b754e4f58f9b99d1a59954713b29f58e02f0a9492f95a2e',
    },
  ],
  index: 0,
  txHash: '0x68bc52102567423fa79cf3cb09a42b26b940ee128025b0dd8e7613ad7be06cdb',
  blockNumber: 19526126,
  block: {
    blobGasUsed: '131072',
    blobAsCalldataGasUsed: '526172',
    blobGasPrice: '1',
    excessBlobGas: '0',
    hash: '0x4e04b902d83f8ed0fde9984d579c0033bef0e5dceb5900cfdc3ce1ce6b04a6f7',
    timestamp: '2024-03-27T14:04:35.000Z',
    slot: 8727021,
  },
  transaction: {
    from: '0x90b1c352e0c498358fbf1fc2a71a27e510b9775c',
    to: '0x3e7a28d96f19b65676f4309531418a03039ee5b5',
    maxFeePerBlobGas: '5000000000',
    blobAsCalldataGasUsed: '526172',
  },
};

- $WGW only - https://api.blobscan.com/transactions?expand=block,blob&startBlock=19529462&endBlock=19579510&sort=asc&ps=10&p=1

  - CF R2 - https://f325c3bb3718fb825ad87cbdd88768f5.eu.r2.cloudflarestorage.com

  tx/:txhash - value, tx data
  account/tx/:account/:ticker/:txhash - value, true
  account/balance/:account/:ticker - value, account balance count

  tokens/info/:ticker - value, deploy data
  tokens/tx/:ticker/:txhash - value, true

  stats/tokens - value, deploys counter, similar to calling all of `tokens/info`, but without pagination needed
  stats/accounts - value, users counter
  stats/transactions - value, tx counter

*/

// import {
//   GetObjectCommand,
//   ListBucketsCommand,
//   ListObjectsV2Command,
//   PutObjectCommand,
//   S3Client,
// } from '@aws-sdk/client-s3';

// const s3 = new S3Client({
//   region: 'auto',
//   endpoint: `https://${ACCOUNT_ID}.eu.r2.cloudflarestorage.com`,
//   credentials: {
//     accessKeyId: ACCESS_KEY_ID,
//     secretAccessKey: SECRET_ACCESS_KEY,
//   },
// });

// console.log(await s3.send(new PutObjectCommand({ Bucket: 'blob20' })));
