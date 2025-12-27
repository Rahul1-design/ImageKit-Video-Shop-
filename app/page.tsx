"use client";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed";
import { useNotification } from "./components/Notification";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data as IVideo[]);
      } catch (error) {
        console.error("Error fetching videos", error);
        showNotification("Failed to load videos", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos(); // ← CALL THE FUNCTION!
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Video Shop</h1>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <VideoFeed videos={videos} />
      )}
    </div>
  );
}