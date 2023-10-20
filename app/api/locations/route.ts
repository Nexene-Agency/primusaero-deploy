// This is an example of how to access a session from an API route
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { nextOkResponse } from "@app/api/utils";
import { ListContent } from "@/framework/list/list.definition";

const appId = process.env.ALGOLIA_APP;
const apiKey = process.env.ALGOLIA_KEY;

// please note, this is an unsecured endpoint
// FIXME: maybe we can add some security? same-origin?
const getHandler = async (
  req: NextRequest,
  res: NextResponse
): Promise<any> => {
  const url = new URL(req.url);
  const text = url.searchParams.get("text") ?? "*";
  const types = url.searchParams.get("types") ?? "";

  console.log("searching for", text, types);

  // const db = getFirestoreInstance();
  //
  // return db
  //   .collection(LOCATIONS_COLLECTION)
  //   .where("name", ">=", text)
  //   .where("name", "<=", text + "\uf8ff")
  //   .where("type", "array-contains-any", types.split(","))
  //   .orderBy("name", "asc")
  //   .get()
  //   .then((hits) => {
  //     return asDatabaseEntries2<Location>(hits);
  //   })
  //   .then((data) => {
  //     return nextOkResponse({
  //       data,
  //       pageSize: data.length,
  //     } as ListContent<any>);
  //   })
  //   .catch((error) => {
  //     console.error(`cannot search locations`, error);
  //     return nextOkResponse({
  //       data: [],
  //       pageSize: 0,
  //     } as ListContent<any>);
  //   });

  const searchTypes = types
    .split(",")
    .map((type) => `type:${type}`)
    .join(" OR ");
  const query = {
    query: text,
    filters: `valid:true AND (${searchTypes})`,
    attributesToHighlight: [],
    hitsPerPage: 100,
  };

  console.log("will search", JSON.stringify(query));

  return axios
    .post(
      `https://${appId}-dsn.algolia.net/1/indexes/vlz_locations/query`,
      query,
      {
        headers: {
          "X-Algolia-Application-Id": appId,
          "X-Algolia-API-Key": apiKey,
        },
      }
    )
    .then((response) => {
      console.log("got response", response.data);
      const hits: any[] = response.data.hits;
      return hits.map((hit) => ({
        id: hit.objectID,
        data: {
          name: hit.name,
          description: hit.description,
          text: hit.text,
          imageTag: hit.imageTag,
          signaturePicture: hit.signaturePicture,
          signaturePreview: hit.signaturePreview,
          address: hit.address,
          valid: hit.valid,
          expires: hit.expires,
          type: hit.type,
        },
      }));
    })
    .then((data) => {
      return nextOkResponse({
        data,
        pageSize: data.length,
      } as ListContent<any>);
    })
    .catch((error) => {
      console.error(`cannot search locations`, error);
      return nextOkResponse({
        data: [],
        pageSize: 0,
      } as ListContent<any>);
    });
};

export { getHandler as GET };
