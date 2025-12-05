"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const VisiMisi = () => {
  return (
    <div className="py-10 overflow-x-hidden">
      <div className="container mx-auto md:max-w-2xl lg:max-w-5xl px-4">
        <div className="flex justify-center items-center space-x-4 text-center mb-10 ">
          <h1 className="text-2xl font-bold bg-primary-light w-full p-2 mx-auto text-white uppercase">
            visi , misi , & value kami
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4  w-full mx-auto">
          {/* Gambar */}
          <div className="space-y-4">
            <motion.div
              style={{ willChange: "transform, opacity" }}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative aspect-square"
            >
              <Image
                src="/value-2.png"
                alt="Gedung Matrakosala Digdaya"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              style={{ willChange: "transform, opacity" }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8 w-full bg-primary-content p-4 md:h-[450px]"
            >
              <div className="space-y-1">
                <p className="text-white text-xl font-semibold">VISI</p>
                <p className="text-white font-normal md:text-base text-paragraph">
                  Kami ingin menjadi mitra konstruksi yang selalu Anda andalkan.
                  Kami berkomitmen untuk memberikan solusi konstruksi yang
                  inovatif dan berkualitas tinggi, serta terus mengembangkan
                  kemampuan karyawan kami untuk masa depan yang lebih cerah.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-white font-semibold text-xl">MISI</p>
                <p className="text-white font-normal md:text-base text-paragraph">
                  Kami membangun lebih dari sekadar bangunan. Kami membangun
                  kepercayaan dan hubungan jangka panjang dengan setiap klien.
                  Dengan tim yang solid dan berpengalaman, kami berkomitmen
                  untuk memberikan solusi konstruksi yang terbaik, tepat waktu,
                  dan sesuai dengan kebutuhan Anda.
                </p>
              </div>
            </motion.div>
          </div>
          <div className="space-y-4 pt-10 md:pt-0">
            <motion.div
              style={{ willChange: "transform, opacity" }}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative aspect-square"
            >
              <Image
                src="/value-1.png"
                alt="Gedung Matrakosala Digdaya"
                fill
                className="object-cover w-full h-full"
              />
            </motion.div>

            {/* Teks yang Bergerak Bersama Carousel */}
            <motion.div
              style={{ willChange: "transform, opacity" }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-4 w-full bg-primary-dark p-4 md:h-[450px] "
            >
              <p className="text-white font-bold text-center text-xl">
                VALUE KAMI
              </p>
              <div className="">
                <p className="text-white font-semibold text-lg">Integritas</p>
                <p className="text-white font-normal md:text-base text-paragraph">
                  Selalu menjunjung tinggi kejujuran dan keterbukaan dalam
                  setiap tindakan.
                </p>
              </div>
              <div className="">
                <p className="text-white font-semibold text-lg">
                  Profesionalisme
                </p>
                <p className="text-white font-normal md:text-base text-paragraph">
                  Bekerja dengan standar yang tinggi dan selalu mengutamakan
                  kualitas.
                </p>
              </div>
              <div className="">
                <p className="text-white font-semibold text-lg">Inovasi</p>
                <p className="text-white font-normal md:text-base text-paragraph">
                  Terus mencari solusi baru dan lebih baik untuk setiap
                  tantangan.
                </p>
              </div>
              <div className="">
                <p className="text-white font-semibold text-lg">
                  Kualitas & Ketepatan Waktu
                </p>
                <p className="text-white font-normal md:text-base text-paragraph">
                  Menjamin hasil kerja yang terbaik dan Menyelesaikan proyek
                  tepat waktu
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisiMisi;
