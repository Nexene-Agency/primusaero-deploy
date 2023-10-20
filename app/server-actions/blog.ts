"use server";
import {
  asDatabaseEntries2,
  asSingleDatabaseEntry2,
  ConverterFunction,
  DatabaseEntry,
} from "@framework/firebase.utils";
import {
  BlogPost,
  BLOGPOST_REFERENCES_COLLECTION,
  BlogPostReference,
  BLOGPOSTS_COLLECTION,
  BlogResponse,
  SimilarBlogPostReference,
} from "@components/dashboard/blogs/model";
import { Like, LIKES_COLLECTION } from "@components/likes/model";
import {
  CommentsCounter,
  COUNTERS_COLLECTION,
  idByParent,
  PENDING_COMMENTS_ID,
  PendingCommentsCounter,
} from "@app/api/counters/model";
import { getFirestoreInstance } from "@app/api/utils";

const similarConverter: ConverterFunction<SimilarBlogPostReference> = (
  data
) => {
  return {
    title: data.title,
    description: data.description,
    coverPicPreview: data.coverPicPreview,
  };
};

export async function getBlog(id: string): Promise<BlogResponse> {
  console.log("should load blog", id);

  const db = getFirestoreInstance();

  const response: BlogResponse = {
    blogPost: undefined,
    comments: 0,
    canComment: false,
    likes: 0,
    related: [],
  };

  const blog = await db
    .collection(BLOGPOSTS_COLLECTION)
    .doc(id)
    .get()
    .then((doc) => asSingleDatabaseEntry2<BlogPost>(doc));

  // if (!blog || !blog.data.published) {
  if (!blog || !blog.data.published || !blog.data.valid) {
    return Promise.resolve(response);
  }

  response.blogPost = blog!;

  // load the comment count
  const commentsTotal: DatabaseEntry<CommentsCounter> | undefined = await db
    .collection(COUNTERS_COLLECTION)
    .doc(idByParent(BLOGPOSTS_COLLECTION, id))
    .get()
    .then((found) =>
      asSingleDatabaseEntry2<CommentsCounter>(found, {
        comments: 0,
        pending: 0,
      })
    );

  const pendingCommentsTotal:
    | DatabaseEntry<PendingCommentsCounter>
    | undefined = await db
    .collection(COUNTERS_COLLECTION)
    .doc(PENDING_COMMENTS_ID)
    .get()
    .then((found) =>
      asSingleDatabaseEntry2<PendingCommentsCounter>(found, { pending: 0 })
    );

  const like: DatabaseEntry<Like> | undefined = await db
    .collection(LIKES_COLLECTION)
    .doc(idByParent(BLOGPOSTS_COLLECTION, id))
    .get()
    .then((found) =>
      asSingleDatabaseEntry2<Like>(found, {
        parent: BLOGPOSTS_COLLECTION,
        parentId: id,
        likes: {},
      })
    );
  console.log("LIKE IS", like);

  const similarPosts: DatabaseEntry<SimilarBlogPostReference>[] = await db
    .collection(BLOGPOSTS_COLLECTION)
    .where("topic", "==", blog.data.topic)
    .limit(16)
    .get()
    .then((hits) => {
      return asDatabaseEntries2<SimilarBlogPostReference>(
        hits,
        similarConverter
      );
    });

  response.comments = commentsTotal!.data.comments ?? 0;
  response.likes = Reflect.ownKeys(like!.data.likes).length;
  response.related = similarPosts;

  const maxPendingComments = parseInt(
    process.env.NEXT_MAX_PENDING_COMMENTS ?? "50"
  );
  response.canComment = pendingCommentsTotal!.data.pending < maxPendingComments;

  return Promise.resolve(response);
}

export async function getBlogs(): Promise<DatabaseEntry<BlogPostReference>[]> {
  console.log("loading blogs");

  const db = getFirestoreInstance();

  return new Promise((resolve) => {
    db.collection(BLOGPOST_REFERENCES_COLLECTION)
      .where("valid", "==", true)
      .where("published", "==", true)
      .limit(100) // FIXME: load more
      .orderBy("publishedAt", "desc")
      .get()
      .then((hits) => {
        resolve(asDatabaseEntries2<BlogPostReference>(hits));
      });
  });
}
