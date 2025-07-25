"use server";

import { getVideosDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function deleteVideoAction(id: string) {
  try {
    const collection = await getVideosDatabase();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return { success: true };
    } else {
      return { success: false, error: "Video bulunamadı veya silinemedi." };
    }
  } catch (error) {
    console.error("Video silme hatası:", error);
    return { success: false, error: "Bir hata oluştu." };
  }
}
