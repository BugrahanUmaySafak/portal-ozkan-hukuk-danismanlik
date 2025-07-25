import VideoListWrapper from "@/features/videolarimiz/containers/VideoListWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Özkan Hukuk Danışmanlık - Videolarımız",
  description:
    "Özkan Hukuk Danışmanlık tarafından hazırlanan bilgilendirici videoları izleyin. Hukuki konularda farkındalık kazanın ve uzman görüşlerinden yararlanın.",
};

export default function Videos() {
  return <VideoListWrapper />;
}
