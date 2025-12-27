"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload";
import { apiClient, VideoFormData } from "@/lib/api-client";
import { useNotification } from "./Notification";

export default function VideoUploadForm() {
    const router = useRouter();
    const { showNotification } = useNotification();

    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");

    // Upload progress state
    const [videoProgress, setVideoProgress] = useState(0);
    const [thumbnailProgress, setThumbnailProgress] = useState(0);

    // Loading state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle video upload success
    const handleVideoSuccess = (res: any) => {
        setVideoUrl(res.url);
        showNotification("Video uploaded successfully!", "success");
    };

    // Handle thumbnail upload success
    const handleThumbnailSuccess = (res: any) => {
        setThumbnailUrl(res.url);
        showNotification("Thumbnail uploaded successfully!", "success");
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!title || !description) {
            showNotification("Please fill in all fields", "error");
            return;
        }

        if (!videoUrl) {
            showNotification("Please upload a video", "error");
            return;
        }

        if (!thumbnailUrl) {
            showNotification("Please upload a thumbnail", "error");
            return;
        }

        setIsSubmitting(true);

        try {
            const videoData: VideoFormData = {
                title,
                description,
                videoUrl,
                thumbnailUrl,
                controls: true,
                transformation: {
                    height: 1920,
                    width: 1080,
                    quality: 100,
                },
            };

            await apiClient.createVideo(videoData);

            showNotification("Video created successfully!", "success");

            // Redirect to home page after short delay
            setTimeout(() => {
                router.push("/");
            }, 1500);

        } catch (error) {
            console.error("Error creating video:", error);
            showNotification("Failed to create video", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Title</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter video title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            {/* Description Input */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Description</span>
                </label>
                <textarea
                    placeholder="Enter video description"
                    className="textarea textarea-bordered w-full h-24"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            {/* Video Upload */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Video</span>
                </label>
                <FileUpload
                    onSuccess={handleVideoSuccess}
                    onProgress={setVideoProgress}
                    fileType="video"
                />
                {videoProgress > 0 && videoProgress < 100 && (
                    <progress
                        className="progress progress-primary w-full mt-2"
                        value={videoProgress}
                        max="100"
                    />
                )}
                {videoUrl && (
                    <div className="alert alert-success mt-2">
                        <span>Video uploaded successfully!</span>
                    </div>
                )}
            </div>

            {/* Thumbnail Upload */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Thumbnail</span>
                </label>
                <FileUpload
                    onSuccess={handleThumbnailSuccess}
                    onProgress={setThumbnailProgress}
                    fileType="image"
                />
                {thumbnailProgress > 0 && thumbnailProgress < 100 && (
                    <progress
                        className="progress progress-primary w-full mt-2"
                        value={thumbnailProgress}
                        max="100"
                    />
                )}
                {thumbnailUrl && (
                    <div className="alert alert-success mt-2">
                        <span>Thumbnail uploaded successfully!</span>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting || !videoUrl || !thumbnailUrl}
            >
                {isSubmitting ? (
                    <>
                        <span className="loading loading-spinner"></span>
                        Creating Video...
                    </>
                ) : (
                    "Create Video"
                )}
            </button>
        </form>
    );
}