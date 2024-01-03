"use server";
import {asDatabaseEntries2,} from "@framework/firebase.utils";
import {getFirestoreInstance} from "@app/api/utils";
import {Testimonial, TESTIMONIALS_COLLECTION} from "@components/dashboard/testimonials/model";
import {ListContent} from "@framework/list/list.definition";

export async function getTestimonials(): Promise<ListContent<Testimonial>> {
  console.log("loading testimonials");

  const db = getFirestoreInstance();

  return new Promise<ListContent<Testimonial>>((resolve) => {
    db.collection(TESTIMONIALS_COLLECTION)
      .where("valid", "==", true)
      .limit(1) // this is loading just the first one for the initial rendering
      .orderBy("author", "asc")
      .get()
      .then((hits) => {
        return asDatabaseEntries2<Testimonial>(hits);
      }).then((data) => {
      resolve({
        data,
        pageSize: data.length,
      } as ListContent<Testimonial>);
    });
  });
}

export async function getAllTestimonials(): Promise<ListContent<Testimonial>> {
  console.log("loading all testimonials");

  const db = getFirestoreInstance();

  return new Promise<ListContent<Testimonial>>((resolve) => {
    db.collection(TESTIMONIALS_COLLECTION)
      .where("valid", "==", true)
      // .limit(1) // need all testimonials
      .orderBy("author", "asc")
      .get()
      .then((hits) => {
        return asDatabaseEntries2<Testimonial>(hits);
      }).then((data) => {
      resolve({
        data,
        pageSize: data.length,
      } as ListContent<Testimonial>);
    });
  });
}
