import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "virtual:svg-icons-register";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

import { ClerkProvider } from "@clerk/clerk-react";
import { NextUIProvider } from "@nextui-org/react";

import "@/styles/global.css";

import AppRouter from "@/AppRouter";

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_KEY) {
  throw new Error("Missing Clerk publishable key!");
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" themes={["dark", "light"]}>
          <ClerkProvider publishableKey={CLERK_KEY} afterSignOutUrl="/">
            <AppRouter />
            <Toaster
              toastOptions={{
                position: "bottom-right",
                className: "bg-background text-foreground",
              }}
            />
          </ClerkProvider>
        </ThemeProvider>
      </NextUIProvider>
    </QueryClientProvider>
  </StrictMode>,
);
