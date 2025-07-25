"use server";

import { getVideosDatabase } from "@/lib/mongodb";
import { z } from "zod";
import { videoSchema } from "../components/Form";

export async function sendVideoAction(formData: unknown) {
  try {
    // Sunucu tarafı validasyon
    const validatedData = videoSchema().parse(formData);

    const collection = await getVideosDatabase();

    const result = await collection.insertOne({
      title: validatedData.title.trim(),
      description: validatedData.description.trim(),
      youtubeId: validatedData.youtubeId.trim(),
      createdAt: new Date().toISOString(),
    });

    return { success: true, id: result.insertedId.toString() };
  } catch (error: any) {
    console.error("Video ekleme hatası:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Geçersiz form verisi",
        details: error.flatten(),
      };
    }

    return { success: false, error: "Bir hata oluştu." };
  }
}
