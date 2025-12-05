import { Check } from "lucide-react";
import Image from "next/image";

export default function Keahlian() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Bagian Kanan */}

          <div className="relative w-full md:w-1/2 flex items-start pt-8 md:px-8  md:h-[600px] h-[400px]">
            <figure className="relative w-full h-full bg-primary-dark">
              {/* Gambar */}
              <span className="absolute inset-0 -translate-x-2 -translate-y-2 border-2 border-accent-light">
                <Image
                  src="/keahlian.jpg"
                  alt="Gedung Matrakosala Digdaya"
                  fill
                  className="object-cover"
                />
                {/* Teks Overlay */}
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-start items-start p-6 text-white space-y-4">
                  <h2 className="md:text-4xl text-2xl font-normal text-white">
                    50,000 +
                  </h2>
                  <p className="text-white mt-2">Satisfied Clients</p>
                </div>
              </span>
            </figure>
          </div>

          {/* Bagian Kiri */}
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-medium text-primary-dark uppercase ">
              Keahlian
            </h2>
            <h2 className="md:text-2xl text-xl text-primary font-medium mt-4">
              Menghadirkan Keahlian <br /> untuk Setiap Proyek
            </h2>
            <p className="font-normal text-muted-foreground mt-4">
              Dengan tiga divisi utama: Desain Perencanaan, Kontraktor
              Pembangunan, dan Manajemen Konstruksi, kami siap memenuhi
              kebutuhan Anda di berbagai bidang, termasuk desain
              interior/eksterior, renovasi, pembangunan rumah tinggal, masjid,
              rumah susun, perkantoran, gudang, serta pengawasan konstruksi.
            </p>

            {/* List Divisi */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4 bg-primary-dark p-4 w-72 shadow-md">
                <Check className="w-6 h-6 text-green-500" />
                <span className="text-white font-medium">
                  Desain & Perancangan
                </span>
              </div>
              <div className="flex items-center gap-4 bg-primary-dark p-4 w-72  shadow-md">
                <Check className="w-6 h-6 text-green-500" />
                <span className="text-white font-medium">
                  Kontraktor Pembangunan
                </span>
              </div>
              <div className="flex items-center gap-4 bg-primary-dark p-4 w-72  shadow-md">
                <Check className="w-6 h-6 text-green-500" />
                <span className="text-white font-medium">
                  Manajemen Konstruksi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
