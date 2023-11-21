// This is an example of how to access a session from an API route
import {NextRequest, NextResponse} from "next/server";
import {getFirestoreInstance, nextOkResponse} from "@app/api/utils";
import {ListContent} from "@/framework/list/list.definition";
import {TestimonialReference, TESTIMONIALS_COLLECTION} from "@components/dashboard/testimonials/model";
import {asDatabaseEntries2} from "@framework/firebase.utils";

// please note, this is an unsecured endpoint
// FIXME: maybe we can add some security? same-origin?
const getHandler = async (
  req: NextRequest,
  res: NextResponse
): Promise<any> => {
  console.log("loading all testimonials");

  const db = getFirestoreInstance();

  return db
    .collection(TESTIMONIALS_COLLECTION)
    .where("valid", "==", true)
    .orderBy("author", "asc")
    .limit(100)
    .get()
    .then((hits) => {
      return asDatabaseEntries2<TestimonialReference>(hits);
    })
    .then((data) => {
      return nextOkResponse({
        data,
        pageSize: data.length,
      } as ListContent<any>);
    })
    .catch((error) => {
      console.error("cannot load all testimonials", error);
      return nextOkResponse({
        data: [],
        pageSize: 0,
      } as ListContent<any>);
    });

};

export {getHandler as GET};
