import { Benefits } from "@/components/sections/Benefits";
import { CommonProblems } from "@/components/sections/CommonProblems";
import { ComputerServices } from "@/components/sections/ComputerServices";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { PhoneServices } from "@/components/sections/PhoneServices";
import { Pricing } from "@/components/sections/Pricing";
import { Realizations } from "@/components/sections/Realizations";
import { RepairProcess } from "@/components/sections/RepairProcess";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { FaultStory } from "@/components/sections/FaultStory";
import { ServiceSelector } from "@/components/sections/ServiceSelector";
import { JsonLd, localBusinessJsonLd } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <main>
      <JsonLd data={localBusinessJsonLd()} />
      <Hero />
      <ServiceSelector />
      <FaultStory />
      <ComputerServices />
      <PhoneServices />
      <CommonProblems />
      <RepairProcess />
      <Pricing />
      <Realizations />
      <Benefits />
      <ServiceArea />
      <Reviews />
      <FAQ />
      <ContactCTA />
    </main>
  );
}
