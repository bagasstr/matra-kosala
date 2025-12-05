import Image from "next/image";

export default function TentangKami() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Gambar */}
          <div className="w-full md:w-2/5">
            <div className="mx-auto flex justify-center items-center">
              <div className="relative w-full h-[300px] md:h-[490px]">
                <figure className="relative w-full h-full bg-primary-dark">
                  <span className="absolute inset-0 -translate-x-2 -translate-y-2 border-2 border-accent-light">
                    <Image
                      src="/kantor.png"
                      alt="Gedung Matrakosala Digdaya"
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover object-top"
                    />
                  </span>
                </figure>
              </div>
            </div>
          </div>

          {/* Konten */}
          <div className="w-full md:w-1/2 flex flex-col gap-8">
            {/* Tentang Perusahaan */}
            <div>
              <h2 className="text-xl font-medium text-primary-dark uppercase">
                Tentang Matrakosala Digdaya
              </h2>
              <p className="md:text-base text-sm font-normal leading-relaxed my-2">
                PT Matra Kosala Digdaya adalah Perusahaan Swasta yang berdiri
                sejak tahun 2009, berdomisili di Jakarta Barat, dan bergerak
                sebagai perusahaan Jasa Kontraktor Umum (General Contractor).
              </p>
              <p className="md:text-base text-sm font-normal leading-relaxed my-2">
                Dengan pengalaman aktif selama 15 tahun, kami bersedia melayani
                kebutuhan konstruksi untuk client Perseorangan, Perusahaan
                Swasta, dan Pemerintahan.
              </p>
            </div>

            {/* visi Kami */}
            <div>
              <h3 className="text-xl font-medium text-primary-dark  mb-2 uppercase">
                Visi Kami
              </h3>
              <ul className="space-y-4">
                <li className="bg-primary-dark text-white p-4 shadow-sm">
                  Menjadi perusahaan kontraktor yang amanah, terkemuka serta
                  selalu berinovasi untuk dapat memberikan pelayanan yang
                  terbaik, terpercaya dan berkualitas
                </li>
                <li className="bg-primary-dark text-white p-4 shadow-sm">
                  Menjaga siklus pelatihan yang berkelanjutan bagi aset
                  terpenting perusahaan, yaitu karyawan kami untuk memastikan
                  pertumbuhan perusahaan yang kontinyu.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
