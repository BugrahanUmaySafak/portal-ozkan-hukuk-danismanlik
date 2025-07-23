import { getIletisimMessagesCollection } from "@/lib/mongodb";
import { Messages } from "../types";

export async function useContactMessages(): Promise<Messages[]> {
  try {
    const collection = await getIletisimMessagesCollection();
    const messages = await collection.find({}).sort({ date: -1 }).toArray();

    return messages.map((msg) => ({
      _id: msg._id.toString(),
      name: msg.name ?? "",
      email: msg.email ?? "",
      phone: msg.phone ?? "",
      title: msg.title ?? "",
      content: msg.content ?? "",
      date:
        typeof msg.date === "string"
          ? msg.date
          : msg.date?.toISOString?.() ?? "",
    }));
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}
