import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="bg-slate-800 min-h-screen">
      <Header />
      <Container />
      <Footer />
    </div>
  );
}
