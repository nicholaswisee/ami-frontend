import { authConfigManager, signIn, signOut, useSession } from "@hono/auth-js/react";
import { env } from "../env";

authConfigManager.setConfig({
  baseUrl: env.API_URL,
  basePath: "/auth",
  credentials: "include",
});

export const authClient = {
  signIn,
  signOut,
  useSession,
};
