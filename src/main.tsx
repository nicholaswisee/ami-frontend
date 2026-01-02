import { createRoot } from "react-dom/client";
import "./style.css";
import "./lib/auth-client";
import { BrowserRouter, Route, Routes } from "react-router";
import { SessionProvider } from "@hono/auth-js/react";
import { ProtectedRoute } from "./utils/protectedRoute";
import App from "./App";
import AuthPage from "./pages/Auth";
import AcaraPage from "./pages/Acara";
import HomePage from "./pages/Home";
import ItbDayPage from "./pages/ItbDay";
import OleatPage from "./pages/Oleat";
import ProfilePage from "./pages/Profile";
import RsvpPage from "./pages/Rsvp";
import NotFoundPage from "./pages/NotFound";
import FaqPage from "./pages/Faq";

createRoot(document.getElementById("root")!).render(
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
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </SessionProvider>,
);
