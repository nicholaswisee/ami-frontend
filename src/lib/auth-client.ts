import {
  authConfigManager,
  signIn,
  signOut,
  useSession,
} from "@hono/auth-js/react";
import { env } from "../env";

const apiUrl = new URL(env.API_URL);
const apiBasePath = apiUrl.pathname.replace(/\/$/, "");
const authBasePath = `${apiBasePath}/auth`;

authConfigManager.setConfig({
  baseUrl: apiUrl.origin,
  basePath: authBasePath.length ? authBasePath : "/auth",
  credentials: "include",
});

export const authClient = {
  signIn,
  signOut,
  useSession,
};
