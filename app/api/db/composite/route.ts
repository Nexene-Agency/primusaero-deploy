import {NextRequest} from "next/server";
import {ListContent} from "@framework/list/list.definition";
import {getFirestoreInstance, getSessionAndUser, nextAccessDeniedResponse, nextOkResponse,} from "@app/api/utils";
import {safeParse} from "secure-json-parse";
import {QueryParameters} from "@framework/query.builder";
import {checkRole2} from "@framework/api/utils";

function queryFrom2(
  collectionReference: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
  params: QueryParameters
) {
  let q = collectionReference.limit(params.limit);
  params.filter.forEach((current) => {
    q = q.where(current.field, current.op, current.value);
  });
  params.order.forEach((current) => {
    q = q.orderBy(current.field, current.direction);
  });
  if (params.startAfter) {
    q = q.startAfter(params.startAfter);
  }
  return q;
}

const postHandler = async (
  req: NextRequest,
  {params}: { params: { table: string } }
) => {
  const auth = await getSessionAndUser(req);
  const payload = safeParse(await req.text()) as QueryParameters;

  if (!auth.user) {
    return nextAccessDeniedResponse();
  }

  const db = getFirestoreInstance();

  console.log("querying: ", payload);
  const q = queryFrom2(db.collection(params.table), payload);

  return checkRole2(auth.user!.id, ["user"])
    .then(() => {
      return q.get();
    })
    .then((hits) => {
      const data: any[] = [];
      // console.log("got hits: ", hits.size);
      hits.forEach((doc) => {
        data.push({id: doc.id, data: doc.data()});
      });
      // console.log("dataloaded: ", data);
      return nextOkResponse({
        data,
        pageSize: payload.limit,
      } as ListContent<any>);
    })
    .catch((error) => {
      return nextOkResponse({
        data: [],
        pageSize: payload.limit,
        error,
      } as ListContent<any>);
    });
};

export {postHandler as POST};
