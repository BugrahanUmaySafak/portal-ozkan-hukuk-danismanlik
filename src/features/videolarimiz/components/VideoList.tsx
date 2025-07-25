"use client";

import VideoCard from "@/features/videolarimiz/components/VideoCard";
import { Video } from "../types";

interface Props {
  videos: Video[];
}

export default function VideoList({ videos }: Props) {
  if (!videos?.length) {
    return (
      <div className="text-center py-16 text-gray-500">
        Gösterilecek video bulunamadı.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <VideoCard key={video._id} {...video} />
        ))}
      </div>
    </div>
  );
}
