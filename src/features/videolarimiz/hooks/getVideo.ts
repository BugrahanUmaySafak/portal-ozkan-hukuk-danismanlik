// features/videolarimiz/hooks/getVideo.ts
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Video } from "../types";

export async function getVideo(id: string): Promise<Video | null> {
  const client = await clientPromise;
  const db = client.db("videolarimiz");
  const collection = db.collection("media");

  const video = await collection.findOne({ _id: new ObjectId(id) });

  if (!video) return null;

  return {
    _id: video._id.toString(),
    title: video.title,
    description: video.description,
    youtubeId: video.youtubeId,
    createdAt: video.createdAt,
  };
}
