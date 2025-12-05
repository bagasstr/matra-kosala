import Image from "next/image";

export default function Sertifikat() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-medium text-primary-dark mb-6 uppercase">
            Sertifikat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center ">
            {/* Gambar 1 */}
            <div className="flex flex-col items-center">
              <figure className="relative w-40 h-14">
                <Image
                  src="/sertifikat1.png"
                  alt="ISO 9001:2015"
                  fill
                  className="object-cover"
                />
              </figure>
              <figcaption className="text-xs md:text-sm text-gray-600  text-center">
                ISO 9001:2015
              </figcaption>
            </div>

            {/* Gambar 2 */}
            <div className="flex flex-col items-center">
              <figure className="relative w-40 h-14">
                <Image
                  src="/sertifikat1.png"
                  alt="ISO 14001:2015"
                  fill
                  className="object-cover"
                />
              </figure>
              <figcaption className="text-xs md:text-sm text-gray-600  text-center">
                ISO 14001:2015
              </figcaption>
            </div>

            {/* Gambar 3 */}
            <div className="flex flex-col items-center">
              <figure className="relative  w-40 h-14">
                <Image
                  src="/sertifikat1.png"
                  alt="OHSAS 18001:2007"
                  fill
                  className="object-cover"
                />
              </figure>
              <figcaption className="text-xs md:text-sm text-gray-600  text-center">
                OHSAS 18001:2007
              </figcaption>
            </div>

            {/* Gambar 4 (SMK3) */}
            <div className="flex flex-col items-center">
              <figure className="relative w-28 h-[70px]">
                <Image
                  src="/sertifikat3.png"
                  alt="SMK3"
                  fill
                  className="object-contain"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
