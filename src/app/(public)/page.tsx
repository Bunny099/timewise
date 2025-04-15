import Footer from "./components/footer";
import Hero from "./components/hero";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen w-full flex items-center justify-center flex-col">
        <Hero/>
      </main>
      
      <Footer />
    </div>
  );
}
