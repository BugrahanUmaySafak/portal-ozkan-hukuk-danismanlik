// features/videolarimiz/components/EditVideoForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateVideoAction } from "../actions/updateVideoAction";
import { Video } from "../types";
import { useTransition } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { VideoFormSchema, videoSchema } from "./Form";

type Props = {
  video: Video;
};

export default function EditVideoForm({ video }: Props) {
  const form = useForm<VideoFormSchema>({
    resolver: zodResolver(videoSchema()),
    defaultValues: {
      title: video.title,
      description: video.description,
      youtubeId: video.youtubeId,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: VideoFormSchema) => {
    startTransition(() => {
      updateVideoAction(video._id, values);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <Label>Başlık</Label>
              <FormControl>
                <Input placeholder="Video başlığı" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Label>Açıklama</Label>
              <FormControl>
                <Textarea placeholder="Video açıklaması" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* YouTube ID */}
        <FormField
          control={form.control}
          name="youtubeId"
          render={({ field }) => (
            <FormItem>
              <Label>YouTube Video ID</Label>
              <FormControl>
                <Input placeholder="Örn: hxHU9CVImVk" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Güncelleniyor..." : "Güncelle"}
        </Button>
      </form>
    </Form>
  );
}
