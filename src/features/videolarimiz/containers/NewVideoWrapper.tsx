"use client";

import VideoFormFields from "../components/VideoForm";

export default function NewVideoWrapper() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl font-bold mb-6">Yeni Video Ekle</h1>
      <VideoFormFields />
    </div>
  );
}
