"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendVideoAction } from "../actions/sendVideoAction";
import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import VideoCardPreview from "./VideoCardPreview";
import { VideoFormSchema, videoSchema } from "./Form";

export default function VideoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VideoFormSchema>({
    resolver: zodResolver(videoSchema()),
    defaultValues: {
      title: "",
      description: "",
      youtubeId: "",
    },
  });

  const { watch } = form;

  const onSubmit = async (values: VideoFormSchema) => {
    setIsSubmitting(true);
    try {
      const result = await sendVideoAction(values);
      if (result.success) {
        toast.success("Video başarıyla eklendi!");
        form.reset();
      } else {
        toast.error(result.error || "Video eklenemedi.");
      }
    } catch (error: any) {
      toast.error(error.message || "Bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <Card className="p-6 shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Başlığı *</FormLabel>
                  <FormControl>
                    <Input placeholder="Video başlığı" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Açıklaması *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Açıklama" {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtubeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube Video ID *</FormLabel>
                  <FormControl>
                    <Input placeholder="Örn: dQw4w9WgXcQ" {...field} />
                  </FormControl>
                  <p className="text-xs text-gray-500 mt-1">
                    YouTube bağlantısındaki v= parametresinden sonraki kısmı
                    girin.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> Videoyu Kaydet
                </>
              )}
            </Button>
          </form>
        </Form>
      </Card>

      {/* Preview */}
      <Card className="p-6 shadow-lg bg-white">
        <h2 className="text-lg font-semibold mb-4">Canlı Önizleme</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Girdiğiniz bilgiler burada anlık olarak gösterilir.
        </p>
        <VideoCardPreview
          title={watch("title") || "Video başlığı buraya gelecek..."}
          description={
            watch("description") || "Video açıklaması buraya gelecek..."
          }
          youtubeId={watch("youtubeId") || "hxHU9CVImVk"}
          createdAt={new Date().toISOString()}
        />
      </Card>
    </div>
  );
}
