// Generated by Xata Codegen 0.29.4. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "blob20_transactions",
    columns: [
      { name: "block_number", type: "int" },
      { name: "block_hash", type: "string" },
      { name: "block_timestamp", type: "int" },
      { name: "transaction_hash", type: "string" },
      { name: "transaction_index", type: "int" },
      { name: "transaction_fee", type: "int" },
      { name: "transaction_burnt_fee", type: "int" },
      { name: "from_address", type: "string" },
      { name: "to_address", type: "string" },
      { name: "is_valid", type: "bool" },
      { name: "operation", type: "string" },
      { name: "ticker", type: "string" },
      { name: "amount", type: "float" },
      { name: "attachment_sha", type: "string" },
      { name: "attachment_content_type", type: "string" },
      { name: "gas_price", type: "int" },
      { name: "gas_used", type: "int" },
      { name: "timestamp", type: "datetime" },
      { name: "blob20", type: "json" },
      { name: "transaction_value", type: "int" },
      { name: "blob_versioned_hash", type: "string" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Blob20Transactions = InferredTypes["blob20_transactions"];
export type Blob20TransactionsRecord = Blob20Transactions & XataRecord;

export type DatabaseSchema = {
  blob20_transactions: Blob20TransactionsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Charlike-Mike-Reagent-s-workspace-s3arm9.eu-central-1.xata.sh/db/blobbed_blob20",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
