import { useState, useCallback } from "react";
import { env } from "@/env";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

export function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = useCallback(
    async (file: File): Promise<string | null> => {
      if (!env.CLOUDINARY_CLOUD_NAME) {
        setError("Cloudinary configuration is missing");
        return null;
      }

      setUploading(true);
      setError(null);

      try {
        // Get signature from backend
        const sigResponse = await fetch(`${env.API_URL}/upload/signature`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ folder: "lostnfound" }),
        });

        if (!sigResponse.ok) {
          throw new Error("Failed to get upload signature");
        }

        const sigData = await sigResponse.json();

        // Upload to Cloudinary with signature
        const formData = new FormData();
        formData.append("file", file);
        formData.append("timestamp", sigData.timestamp);
        formData.append("signature", sigData.signature);
        formData.append("api_key", sigData.apiKey);
        formData.append("folder", sigData.folder);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data: CloudinaryUploadResult = await response.json();
        return data.secure_url;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        return null;
      } finally {
        setUploading(false);
      }
    },
    [],
  );

  return { uploadImage, uploading, error };
}
