import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section>
      <h1>404</h1>
      <p>Halaman yang kamu cari tidak ditemukan.</p>
      <Link to="/">Kembali ke beranda</Link>
    </section>
  );
}
