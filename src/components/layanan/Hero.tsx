import { CheckCircle } from "lucide-react";
import Client from "../home/Client";
import Image from "next/image";

export default function HeroLayanan() {
  const points = [
    "Rekam Jejak Keberhasilan yang Terbukti",
    "Tim yang Berpengalaman dan Terampil",
    "Solusi yang Komprehensif dan Disesuaikan",
    "Teknologi dan Peralatan Mutakhir",
    "Layanan dan Dukungan Pelanggan yang Luar Biasa",
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto container px-4">
        {/* Title */}
        <h2 className="text-xl font-medium text-primary-dark uppercase my-4">
          Pembeda Utama dan Proposisi Nilai
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Points Section */}
          <div>
            {points.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-4 mb-4  leading-relaxed"
              >
                <CheckCircle className="text-green-500 mt-1" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          {/* Images Section */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <figure className="bg-primary-dark">
                <span className="block -translate-x-2 -translate-y-2 w-full h-full border-2 border-accent-light">
                  <Image
                    src="/keahlian.jpg" // Ganti dengan path gambar Anda
                    alt="Deskripsi gambar 1"
                    width={500}
                    height={200}
                    className="object-cover w-full"
                  />
                </span>
              </figure>
            </div>
            <div className="w-1/2">
              <figure className="bg-primary-dark">
                <span className="block -translate-x-2 -translate-y-2 w-full h-full border-2 border-accent-light">
                  <Image
                    src="/human.jpg" // Ganti dengan path gambar Anda
                    alt="Deskripsi gambar 2"
                    width={300}
                    height={200}
                    className="object-cover w-full"
                  />
                </span>
              </figure>
            </div>
          </div>
        </div>

        {/* Logos Section */}
        <div className="flex justify-center gap-6">
          <Client />
        </div>
        <div className="border-b w-full border-gray-200 shadow"></div>
      </div>
    </section>
  );
}
