"use server";
import {asDatabaseEntries2, DatabaseEntry,} from "@framework/firebase.utils";
import {getFirestoreInstance} from "@app/api/utils";
import {TestimonialReference, TESTIMONIALS_COLLECTION} from "@components/dashboard/testimonials/model";

export async function getTestimonials(): Promise<DatabaseEntry<TestimonialReference>[]> {
  console.log("loading testimonials");

  const db = getFirestoreInstance();

  return new Promise<DatabaseEntry<TestimonialReference>[]>((resolve) => {
    db.collection(TESTIMONIALS_COLLECTION)
      .where("valid", "==", true)
      .limit(1) // this is loading just the first one for the initial rendering
      .orderBy("author", "asc")
      .get()
      .then((hits) => {
        resolve(asDatabaseEntries2<TestimonialReference>(hits));
      });
  });
}
