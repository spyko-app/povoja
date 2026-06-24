import { CheckoutProvider } from "./components/Checkout";
import Header from "./components/Header";
import Hero, { Marquee } from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Products from "./components/Products";
import Kits from "./components/Kits";
import Strategy from "./components/Strategy";
import Coverage from "./components/Coverage";
import Stats from "./components/Stats";
import Community from "./components/Community";
import Mission from "./components/Mission";
import Brand from "./components/Brand";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <CheckoutProvider>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <Products />
        <Kits />
        <Strategy />
        <Coverage />
        <Stats />
        <Community />
        <Mission />
        <Brand />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </CheckoutProvider>
  );
}
