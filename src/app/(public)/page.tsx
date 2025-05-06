import CardSection from "./components/cardsection";
import Footer from "./components/footer";
import Free from "./components/free";
import Hero from "./components/hero";
import Join from "./components/join";
import Navbar from "./components/navbar";
import ServiceShow from "./components/serviceshow";
import Testimonial from "./components/testimonial";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen w-full flex  py-2 flex-col">
        <Hero />
        <ServiceShow />
        <CardSection />
        <Testimonial />
        <Free />
        <Join />
      </main>
      <Footer />
    </div>
  );
}
