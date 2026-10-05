import LandingHero from "../components/landing/LandingHero";
import LandingTimeSection from "../components/landing/LandingTimeSection";
import "../styles/landing.css";

function LandingPage() {
  return (
    <main className="landing-page">
      <LandingHero />
      <LandingTimeSection />
    </main>
  );
}

export default LandingPage;