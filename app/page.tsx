import { apiClient } from '@/lib/api-client';
import { IVideo } from '@/models/Video';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([])
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data as IVideo[])
      } catch (error) {
        console.log("Error fetching videos", error)
      }
    }
  }, [])
  return (
    <div className=''>
      <h1>Welcome to Instagram</h1>
    </div>
  );
}
