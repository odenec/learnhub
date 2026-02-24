import InputWithButton from "@/components/features/search/InputWithButton";
import TextBox from "@/components/features/outputSearch/TextBox";

export default function Home() {
  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>
        🎉 Моё первое Next.js приложение
      </h1>
      <InputWithButton />
      <TextBox />
    </main>
  );
}
