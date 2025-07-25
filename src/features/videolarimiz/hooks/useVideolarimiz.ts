import { getVideosDatabase } from "@/lib/mongodb";
import { Video } from "../types";

export async function useVideolarimiz(): Promise<Video[]> {
  try {
    const collection = await getVideosDatabase();
    const videos = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return videos.map((video) => ({
      _id: video._id.toString(),
      title: video.title ?? "",
      description: video.description ?? "",
      youtubeId: video.youtubeId ?? "",
      createdAt: video.createdAt ?? "",
    }));
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}
