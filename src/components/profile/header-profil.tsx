"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeaderProfil() {
  const [current, setCurrent] = useState(0); // Slide aktif

  const handleDotClick = (index: number) => {
    setCurrent(index); // Perbarui indeks slide aktif
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-0 md:max-w-2xl lg:max-w-5xl">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="relative group">
            {/* Elemen sebelum hover */}
            <div className="flex justify-start items-start mb-10 w-full">
              <h1 className="text-2xl font-bold bg-accent-light p-2 w-full lg:w-1/2 text-primary-dark uppercase text-center">
                15 tahun melayani
              </h1>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-4 block">
              <div className="relative aspect-square w-full">
                <Image
                  src="/profile-1.png"
                  alt="Construction Site"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Right Column */}
            <div className="lg:ml-8 mt-10 md:mt-0">
              <div className="text-base md:text-base lg:text-base font-normal space-y-6 md:space-y-3 lg:space-y-3">
                <p className="">
                  15 tahun kami melayani, selama itu juga kami telah menjadi
                  bagian dari keberhasilan proyek yang beragam, hingga menjadi
                  bukti eksistensi kami di industri konstruksi Indonesia.
                </p>
                <p className=" text-primary-dark font-medium">
                  Setiap proyek adalah sebuah tantangan yang memotivasi kami
                  untuk terus berinovasi demi memberikan persembahan konstruksi
                  yang terbaik.
                </p>
                <p className="">
                  Mulai dari bangunan rusun yaang nyaman, hingga pabrik yang
                  efisien. Setiap proyek adalah sebuah kisah yang menginspirasi
                  dan menjadi bagian dari warisan kami.
                </p>
              </div>

              <div className="mt-10 md:mt-5">
                <div className=" flex justify-end md:justify-start lg:justify-start items-center pt-5">
                  <Link href={{ pathname: "/portofolio", query: { page: 1 } }}>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 border-2 hover:bg-accent-light border-primary-dark hover:text-primary-dark font-semibold bg-primary-dark text-white"
                    >
                      <span>Portofolio Lengkap</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                {/* Navigasi Dots */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
