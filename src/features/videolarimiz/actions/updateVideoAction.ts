// features/videolarimiz/actions/updateVideoAction.ts
"use server";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function updateVideoAction(
  id: string,
  data: {
    title: string;
    description: string;
    youtubeId: string;
  }
) {
  const client = await clientPromise;
  const db = client.db("videolarimiz");
  const collection = db.collection("media");

  await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title: data.title,
        description: data.description,
        youtubeId: data.youtubeId,
      },
    }
  );

  revalidatePath(`/videolarimiz/${id}`);
}
