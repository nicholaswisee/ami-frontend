import { createRoot } from "react-dom/client";
import "./style.css";
import "./lib/auth-client";
import { BrowserRouter, Route, Routes } from "react-router";
import { SessionProvider } from "@hono/auth-js/react";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ProtectedRoute } from "./utils/protectedRoute";
import { ScannerRoute } from "./utils/scannerRoute";
import App from "./App";
import AuthPage from "./pages/Auth";
import AcaraPage from "./pages/Acara";
import HomePage from "./pages/Home";
import ItbDayPage from "./pages/ItbDay";
import OleatPage from "./pages/Oleat";
import ProfilePage from "./pages/Profile";
import RsvpPage from "./pages/Rsvp";
import ScannerPage from "./pages/Scanner";
import NotFoundPage from "./pages/NotFound";
import FaqPage from "./pages/Faq";
import LostNFoundPage from "./pages/LostNFound";
import LostNFoundAdminPage from "./pages/LostNFoundAdmin";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && typeof error === "object" && "status" in error) {
          const status = error.status as number;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 2;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes default
      gcTime: 10 * 60 * 1000, // 10 minutes default
    },
    mutations: {
      retry: 1,
    },
  },
});

// Cleanup old cache
try {
  const REACT_QUERY_OFFLINE_CACHE = "REACT_QUERY_OFFLINE_CACHE";
  const cached = window.localStorage.getItem(REACT_QUERY_OFFLINE_CACHE);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (parsed.clientState?.queries) {
      // Remove scanner-related queries from cache
      parsed.clientState.queries = parsed.clientState.queries.filter(
        (query: any) => {
          const queryKey = query?.queryKey?.[0];
          return queryKey !== "scannerAccess" && queryKey !== "scannerUsers";
        },
      );
      window.localStorage.setItem(
        REACT_QUERY_OFFLINE_CACHE,
        JSON.stringify(parsed),
      );
    }
  }
} catch (error) {
  console.debug("Could not clean up cached scanner data:", error);
}

// Create persister for localStorage
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById("root")!).render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{
      persister,
      dehydrateOptions: {
        shouldDehydrateQuery: (query) => {
          if (query.queryKey[0] === "scannerAccess") return false;
          if (query.queryKey[0] === "scannerUsers") return false;
          return true;
        },
      },
    }}
  >
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="itb-day" element={<ItbDayPage />} />
            <Route path="acara" element={<AcaraPage />} />
            <Route path="oleat" element={<OleatPage />} />
            <Route
              path="rsvp"
              element={
                <ProtectedRoute>
                  <RsvpPage />
                </ProtectedRoute>
              }
            />
            <Route path="auth" element={<AuthPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="lostnfound" element={<LostNFoundPage />} />
            <Route
              path="lostnfound/admin"
              element={
                <ScannerRoute>
                  <LostNFoundAdminPage />
                </ScannerRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="scanner"
              element={
                <ScannerRoute>
                  <ScannerPage />
                </ScannerRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <ScannerRoute>
                  <Dashboard />
                </ScannerRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  </PersistQueryClientProvider>,
);
