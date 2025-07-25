"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Calendar, Play, Eye } from "lucide-react";

type Props = {
  title: string;
  description: string;
  youtubeId: string;
  createdAt: string;
};

export default function VideoCardPreview({
  title,
  description,
  youtubeId,
  createdAt,
}: Props) {
  const [open, setOpen] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const checkScrollable = () => {
    if (dialogRef.current) {
      const el = dialogRef.current;
      const hasScroll = el.scrollHeight > el.clientHeight;
      setIsScrollable(hasScroll);
    }
  };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => checkScrollable(), 100);
      const resizeObserver = new ResizeObserver(checkScrollable);
      dialogRef.current && resizeObserver.observe(dialogRef.current);
      return () => {
        clearTimeout(timer);
        resizeObserver.disconnect();
      };
    } else {
      setIsScrollable(false);
    }
  }, [open]);

  const isValidYouTubeId = /^[a-zA-Z0-9_-]{5,30}$/.test(youtubeId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-gray-200">
        <div className="relative aspect-video w-full bg-gray-100 rounded-t-lg overflow-hidden">
          {isValidYouTubeId ? (
            <LiteYouTubeEmbed
              id={youtubeId}
              title={title}
              noCookie
              poster="hqdefault"
              adNetwork={false}
              wrapperClass="yt-lite w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center text-gray-500">
                <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Video önizlemesi</p>
              </div>
            </div>
          )}
        </div>

        <DialogTrigger asChild>
          <div
            className="flex flex-col text-left cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            role="button"
            tabIndex={0}
            aria-label={`Videoyu detaylı görüntüle: ${title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setOpen(true);
              }
            }}
          >
            <CardHeader className="pb-3">
              <CardTitle
                className="text-lg font-semibold line-clamp-2 text-gray-900"
                title={title}
              >
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <CardDescription
                className="text-sm text-gray-600 line-clamp-3 leading-relaxed"
                title={description}
              >
                {description}
              </CardDescription>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  {new Date(createdAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <Badge variant="secondary" className="text-xs">
                  Video
                </Badge>
              </div>

              <Button
                variant="default"
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Detayları Görüntüle
              </Button>
            </CardContent>
          </div>
        </DialogTrigger>
      </Card>

      <DialogContent
        className="w-full max-w-4xl mx-auto rounded-lg p-0 max-h-[90vh]"
        aria-labelledby="title"
        aria-describedby="description"
      >
        <div ref={dialogRef} className="overflow-y-auto max-h-[90vh] p-6">
          <div className="relative w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden">
            {isValidYouTubeId ? (
              <LiteYouTubeEmbed
                id={youtubeId}
                title={title}
                noCookie
                poster="maxresdefault"
                adNetwork={false}
                wrapperClass="yt-lite w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg">
                <div className="text-center text-gray-500">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Geçerli bir YouTube ID girin</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <DialogTitle className="text-2xl font-bold text-gray-900 leading-tight">
              {title}
            </DialogTitle>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(createdAt).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <Badge variant="outline">YouTube Video</Badge>
            </div>

            <DialogDescription className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
              {description}
            </DialogDescription>
          </div>
        </div>

        {isScrollable && (
          <div className="sticky bottom-0 bg-white text-center text-sm text-blue-600 py-3 border-t">
            Devamı için aşağı kaydırın ↓
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
