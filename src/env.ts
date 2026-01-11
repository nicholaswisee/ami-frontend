const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as
  | string
  | undefined;
const API_URL = import.meta.env.VITE_API_URL as string | undefined;

if (!API_URL) {
  throw new Error("VITE_API_URL is not defined");
}

export const env = {
  API_URL,
  CLOUDINARY_CLOUD_NAME,
};
