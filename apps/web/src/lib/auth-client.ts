import { createAuthClient } from "better-auth/react";
import { env } from "@silver-bridge-hackaton/env/web";

export const authClient = createAuthClient({
	baseURL: env.VITE_SERVER_URL,
});
