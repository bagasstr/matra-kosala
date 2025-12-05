import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="bg-[#668BBB] py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="text-xl md:text-3xl  font-medium text-white">
            Hubungi Tim Kami 24/7
          </h2>
          <div className="flex justify-end items-end md:justify-start md:items-start">
            <Button
              variant="secondary"
              className="bg-white text-primary font-normal hover:bg-white/90 md:w-full w-fit"
            >
              Contact Our Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
