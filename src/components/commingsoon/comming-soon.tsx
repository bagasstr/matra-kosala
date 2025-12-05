"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface ComingSoonProps {
  title: string;
  heading: string;
  description: string[];
}

function ComingSoon({ title, heading, description }: ComingSoonProps) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="w-full md:max-w-5xl mx-auto space-y-10">
          {/* Header Section */}
          <div className="text-center md:w-[48%]">
            <h1 className="text-3xl font-bold bg-accent-light p-4 text-primary-dark uppercase ">
              {title}
            </h1>
          </div>

          {/* Main Content */}
          <Card className="border-none shadow-none">
            <CardContent className="p-0 grid md:grid-cols-2 gap-8">
              {/* Illustration */}
              <div className="relative w-full aspect-square md:aspect-auto">
                <Image
                  src="/coming-soon.png"
                  alt="Platform Illustration"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Text Content */}
              <div className="space-y-6">
                <h2 className="text-xl md:text-3xl font-bold text-gray-800">
                  {heading}
                </h2>
                <div className="space-y-4 text-gray-800">
                  {description.map((text, index) => (
                    <p
                      key={index}
                      className={` text-base ${index === 1 ? "text-primary-dark font-medium" : ""}`}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const comingSoonData: ComingSoonProps = {
    title: "SEGERA HADIR",
    heading: "Ekosistem Material Terlengkap untuk Semua Kebutuhan Anda!",
    description: [
      "Pernah kebingungan mencari material bangunan yang tepat? Kami punya kabar baik!",
      "Kami sedang membangun sebuah platform yang akan memudahkan Anda menemukan berbagai macam material, mulai dari kayu hingga besi, dari batu alam hingga keramik.",
      "Bayangkan, semua kebutuhan material Anda bisa terpenuhi hanya dalam satu tempat!",
    ],
  };

  return <ComingSoon {...comingSoonData} />;
}
