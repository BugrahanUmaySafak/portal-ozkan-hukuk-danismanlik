// app/videolarimiz/[id]/page.tsx
import { getVideo } from "@/features/videolarimiz/hooks/getVideo";
import EditVideoForm from "@/features/videolarimiz/components/EditVideoForm";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function VideoDetailPage({ params }: Props) {
  const video = await getVideo(params.id);

  if (!video) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Video Güncelle</h1>
      <EditVideoForm video={video} />
    </div>
  );
}
