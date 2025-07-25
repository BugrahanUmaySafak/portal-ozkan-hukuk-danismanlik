import VideoList from "../components/VideoList";
import { useVideolarimiz } from "../hooks/useVideolarimiz";

export default async function VideoListWrapper() {
  const videos = await useVideolarimiz();

  return (
    <>
      <VideoList videos={videos} />
    </>
  );
}
