import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Proficiency from "@/components/Proficiency";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Articles from "@/components/Articles";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Proficiency />
        <Marquee />
        <Projects />
        <Articles />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
