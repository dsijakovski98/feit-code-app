/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY: string;
  readonly VITE_DRIZZLE_DATABASE_URL: string;

  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_DATABASE_URL: string;

  readonly VITE_WEBSITE_URL: string;
  readonly VITE_CODE_RUNNER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
