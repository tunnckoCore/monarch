export interface Resp {
  result: Ethscription[];
  pagination: Pagination;
}

export interface Pagination {
  page_key: string;
  has_more: boolean;
}

export interface Ethscription {
  id: string;
  transaction_hash: string;
  block_number: string;
  transaction_index: string;
  block_timestamp: string;
  block_blockhash: string;
  event_log_index?: number | null;
  ethscription_number: string;
  creator: string;
  initial_owner: string;
  current_owner: string;
  previous_owner: string;
  content_uri: string;
  content_sha: string;
  esip6: boolean;
  mimetype: string;
  media_type: string;
  mime_subtype: string;
  gas_price: string;
  gas_used: string;
  transaction_fee: string;
  value: string;
  created_at: string;
  updated_at: string;
  attachment_sha: `0x${string}`;
  attachment_content_type: string;
  attachment_path?: string | null;
}

const allResults = [] as any[];
let page = 0;

type BlobTokenProtocol = {
  protocol: string;
  token: {
    operation: string;
    ticker: string;
  };
};

function isBlobToken(x) {
  return (
    x.attachment_content_type === 'text/plain' || x.attachment_content_type === 'application/json'
  );
}

async function getBlob20s(resp: Resp) {
  const filtered = resp.result.filter(isBlobToken);
  // allResults.push(...resp.result.filter(isBlobToken));

  const items = await Promise.all(
    filtered
      .map(async (x) => {
        const resp = await fetch(`https://api-v2.ethscriptions.com` + x.attachment_path).then((x) =>
          x.text(),
        );
        let content: BlobTokenProtocol;

        try {
          content = JSON.parse(resp);

          if (content && content.protocol === 'blob20') {
            console.log('Blobscription Blob tokens', x.transaction_hash, content);
            return { ...x, blob20: content };
          }

          return null;
        } catch (e) {
          console.error('Error parsing JSON for "%s" blobscrition', x.transaction_hash, e);
          return null;
        }
      })
      .filter(Boolean),
  );

  return items;
}

async function fetchPage() {
  let resp = await getResp();

  const items = await getBlob20s(resp);

  allResults.push(...items);

  while (resp && resp.pagination && resp.pagination.has_more) {
    resp = await getResp(resp.pagination.page_key);

    const eths = await getBlob20s(resp);

    allResults.push(...eths);
  }

  const timeOrdered = allResults.reverse();
}

async function getResp(page_key?: string): Promise<Resp> {
  const baseUrl = `https://api-v2.ethscriptions.com/ethscriptions?attachment_present=true`;
  let resp = await fetch(page_key ? baseUrl + '&page_key=' + page_key : baseUrl).then((x) =>
    x.json(),
  );

  return resp;
}

await fetchPage();
