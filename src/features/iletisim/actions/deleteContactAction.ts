"use server";

import { getIletisimMessagesCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function deleteContactAction(id: string) {
  try {
    const collection = await getIletisimMessagesCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return { success: true };
    }

    return { success: false, error: "Silme işlemi başarısız." };
  } catch (error) {
    return {
      success: false,
      error: "Sunucu hatası: " + (error as Error).message,
    };
  }
}
