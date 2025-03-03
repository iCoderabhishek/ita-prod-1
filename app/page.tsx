import Hero from "@/components/Hero";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <MaxWidthWrapper>
        <Hero />
      </MaxWidthWrapper>
    </div>
  );
}
