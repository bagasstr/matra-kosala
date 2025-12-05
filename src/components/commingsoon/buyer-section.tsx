"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { translateX } from "@/lib/variant";
import { forwardRef, memo } from "react";
const BuyerSection = () => {
  const MotionCard = motion(Card);
  return (
    <section className="py-10 overflow-x-hidden">
      <div className="container mx-auto px-4 py-8  md:max-w-5xl w-full">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-primary-dark p-4 text-accent-light uppercase mb-10">
            Sebagai Pembeli
          </h1>
        </div>
        {/* Question */}
        <h3 className="text-2xl font-semibold mb-8">
          Apa saja yang bisa Anda temukan di sini?
        </h3>
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 w-[80%] lg:w-full mx-auto gap-6 mb-8">
          <MotionCard
            style={{ willChange: "transform, opacity" }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#EEF2FF] px-8 py-8"
          >
            <CardHeader>
              <CardTitle className="text-primary-dark mb-2 text-lg ">
                Beragam Pilihan Material
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-base">
                Mulai dari material alam seperti kayu dan batu alam, material
                konstruksi seperti besi dan beton, hingga material MEP.
              </p>
            </CardContent>
          </MotionCard>
          <MotionCard
            style={{ willChange: "transform, opacity" }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#EEF2FF] px-8 py-8"
          >
            <CardHeader>
              <CardTitle className="text-primary-dark mb-2 text-lg ">
                Opsi Harga dan Spesifikasi Sesuai Kebutuhan Anda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-base">
                Bandingkan harga dan spesifikasi berbagai produk sebelum
                memutuskan.
              </p>
            </CardContent>
          </MotionCard>
          <MotionCard
            style={{ willChange: "transform, opacity" }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#EEF2FF] px-8 py-8"
          >
            <CardHeader>
              <CardTitle className="text-primary-dark mb-2 text-lg ">
                Cari Dengan Mudah
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-base">
                Temukan material yang Anda butuhkan dengan cepat dan mudah
                melalai fitur pencarian dan basis dataterperdu.
              </p>
            </CardContent>
          </MotionCard>
          <MotionCard
            style={{ willChange: "transform, opacity" }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#EEF2FF] px-8 py-8"
          >
            <CardHeader>
              <CardTitle className="text-primary-dark mb-2 text-lg ">
                Saran dari Ahli Material Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-base">
                Dapatkan saran dari ahli material kami untuk proyek Anda.
              </p>
            </CardContent>
          </MotionCard>
        </div>
        {/* Info Text */}
        <div className="flex justify-center flex-col items-center mt-20 md:flex-row md:justify-between">
          <div className="md:w-[60%]">
            <p className="mb-4 text-base leading-relaxed">
              Platform kami masih dalam tahap pengembangan, tapi jangan
              khawatir! Kami akan segera meluncurkannya.
            </p>
            <p className="mb-4 text-base leading-relaxed font-medium text-primary-dark">
              Sementara itu, jika Anda memiliki kebutuhan material mendesak,
              jangan ragu untuk{" "}
              <span className="font-semibold">
                menghubungi kami melalui WhatsApp
              </span>
              .
            </p>
            <p className="font-medium text-base leading-relaxed">
              Tim kami siap membantu Anda menemukan material yang Anda butuhkan.
            </p>
          </div>

          {/* WhatsApp Button */}
          <div className="mt-24">
            <Button
              className="group text-white bg-primary-light border hover:border-primary-light hover:bg-white hover:text-primary-light w-fit font-medium"
              asChild
            >
              <Link
                href="https://wa.me/6285697093044?text=saya%20ingin%20tahu%20lebih%20detail%20mengenai%20layanan%20Matra%20Kosala."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-4 w-4" />
                Terhubung via WA
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyerSection;
