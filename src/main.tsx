import { createRoot } from "react-dom/client";
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { ProtectedRoute } from "./utils/protectedRoute";
import App from "./App";
import AuthPage from "./pages/Auth";
import AcaraPage from "./pages/Acara";
import HomePage from "./pages/Home";
import ItbDayPage from "./pages/ItbDay";
import OleatPage from "./pages/Oleat";
import ProfilePage from "./pages/Profile";
import RsvpPage from "./pages/Rsvp";
import Faq from "./pages/Faq";
import NotFoundPage from "./pages/NotFound";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="itb-day" element={<ItbDayPage />} />
        <Route path="acara/:name" element={<AcaraPage />} />
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
        <Route path="faq" element={<Faq />} />
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
  </BrowserRouter>,
);
