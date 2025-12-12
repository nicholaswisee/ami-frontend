import { useParams } from "react-router";

export default function AcaraPage() {
  const { name } = useParams<{ name?: string }>();

  return (
    <section>
      <h1>Acara: {name ?? "Nama acara"}</h1>
      {/* TODO: Lengkapi detail acara sesuai nama. */}
    </section>
  );
}
