import axios, { AxiosError } from "axios";

const INDEXER_URL =
  "https://service:a1f42cfd-5d62-4b29-bdff-a171794e96dd@vanlifezone-search.es.northeurope.azure.elastic-cloud.com";
const READER_URL = process.env.NEXT_ELASTIC_READER_URL;

export interface DatabaseEntry<T> {
  id?: string;
  data: T;
}

interface IndexingResult {
  _index: string;
  _id: string;
  _version: number;
  result: string; //'created',
  _shards: { total: number; successful: number; failed: number };
  _seq_no: number;
  _primary_term: number;
}

export const indexDocument = <T>(
  indexName: string,
  document: DatabaseEntry<T>,
  as: "search" | "web" | "data" = "data"
): Promise<DatabaseEntry<T>> => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${INDEXER_URL}/${as}-${indexName}/_doc/${document.id}`,
        document.data
      )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const getDocument = <T>(
  indexName: string,
  id: string,
  as: "search" | "web" | "data" = "data"
): Promise<DatabaseEntry<T> | undefined> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${INDEXER_URL}/${as}-${indexName}/_doc/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        console.log("data is", data);
        if (data.found) {
          resolve({ id: data._id, data: data._source });
        } else {
          resolve(undefined);
        }
      })
      .catch((err) => reject(err));
  });
};

interface ElasticQuery {
  query: any;
  sort: any;
  from: number;
  size: number;
  _source: string[];
}

interface ElasticHit {
  _index: string;
  _id: string;
  _score?: number;
  _source: any;
  sort?: number[];
}

interface ElasticResult {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: { value: number; relation: string };
    max_score?: number;
    hits: ElasticHit[];
  };
}

const testQuery: ElasticQuery = {
  query: {
    wildcard: { key: "value01*" },
  },
  sort: { key2: "desc" },
  from: 2,
  size: 3,
  _source: ["key"],
};

interface ElasticList<T> {
  items: DatabaseEntry<T>[];
  total: number;
  query: ElasticQuery;
}

export const listDocuments = <T>(
  indexName: string,
  query: ElasticQuery,
  as: "search" | "web" | "data" = "data"
): Promise<ElasticList<T>> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${INDEXER_URL}/${as}-${indexName}/_search`, query, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        const result: ElasticList<T> = {
          items: data.hits.hits.map(
            (hit: ElasticHit) =>
              ({
                id: hit._id,
                data: hit._source as T,
              } as DatabaseEntry<T>)
          ),
          total: data.hits.total.value,
          query,
        };
        resolve(result);
      })
      .catch((err: AxiosError) => {
        reject({ status: err.status, message: err.message });
      });
  });
};

// indexDocument("test", {
//   id: "test001",
//   data: { key: "value11", key2: "value22" },
// })
//   .then((res) => console.log("success", res))
//   .catch((err) => console.log("error", err));

// for (let i = 0; i < 100; i++) {
indexDocument("test", {
  id: `test999`,
  data: { key: `value999`, key2: 999 },
})
  .then((res) => console.log("success", res))
  .catch((err) => console.log("error", err));
// }

// getDocument("test", "test001")
//   .then((res) => console.log("success", res))
//   .catch((err) => console.log("error", err));

// listDocuments("test", testQuery)
//   .then((res) => console.log("success", res))
//   .catch((err) => console.log("error", err));
