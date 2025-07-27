import { z } from "zod";

export const videoSchema = () =>
  z.object({
    title: z
      .string()
      .min(3, { message: "Başlık en az 3 karakter olmalı" })
      .max(150, { message: "Başlık en fazla 150 karakter olabilir" })
      .trim(),
    description: z
      .string()
      .min(10, { message: "Açıklama en az 10 karakter olmalı" })
      .max(1000, { message: "Açıklama en fazla 1000 karakter olabilir" })
      .trim(),
    youtubeId: z
      .string()
      .min(5, { message: "Geçerli bir YouTube ID girin" })
      .max(30, { message: "YouTube ID çok uzun" })
      .regex(/^[a-zA-Z0-9_-]{5,30}$/, {
        message: "Geçerli bir YouTube video ID girin",
      })
      .trim(),
  });

const schemaInstance = videoSchema();
export type VideoFormSchema = z.infer<typeof schemaInstance>;
