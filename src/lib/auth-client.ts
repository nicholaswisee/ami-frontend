import { createAuthClient } from "better-auth/react";
import { env } from "../env";

console.log("[AUTH CLIENT] Initializing with baseURL:", env.API_URL);

export const authClient = createAuthClient({
  baseURL: env.API_URL,
  basePath: "/auth", // Explicitly set the auth path
});

console.log("[AUTH CLIENT] Auth client created");
