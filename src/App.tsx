import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Navbar />
      <Toaster
        toastOptions={{
          style: {
            background: 'url("/background/bg01.webp")',
            stroke: "#302a77",
            color: "#ffdb8c",
          },
        }}
        closeButton={true}
        position="bottom-right"
      />
      <main className="*:min-h-lvh *:pt-18">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
