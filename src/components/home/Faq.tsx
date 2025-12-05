"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Headset, Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Faq() {
  const [open, setOpen] = useState<string>("");
  const handleAcordion = (value: string) => {
    setOpen(open === value ? "" : value);
  };
  return (
    <section
      id="faq"
      className="py-24 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/bg-faq.png')", // Ganti dengan path gambar Anda
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto md:max-w-2xl lg:max-w-5xl px-4 relative z-10">
        {/* Judul */}
        <div className="relative group mb-8 hidden lg:block">
          {/* Elemen sebelum hover */}
          <div className="flex items-center space-x-4">
            <div className="w-2 h-12 bg-primary-content transition-transform duration-500 group-hover:translate-x-2" />
            <h1 className="text-3xl font-bold text-accent-light uppercase transition-transform duration-500 group-hover:translate-x-4">
              Faq
            </h1>
          </div>

          {/* Elemen saat hover */}
          <h1 className="absolute inset-0 flex items-center justify-center text-3xl font-bold bg-accent-light w-full p-2 mx-auto text-primary-dark uppercase opacity-0 group-hover:opacity-100 group-hover:animate-slide-in-center transition-opacity duration-500">
            Faq
          </h1>
        </div>
        <div className="lg:hidden mb-10">
          <h1 className="text-3xl font-bold text-center bg-primary-accent w-full p-2 mx-auto text-primary-dark uppercase">
            faq
          </h1>
        </div>

        {/* Layout Konten */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Bagian Kiri - Accordion */}
          <Card className="basis-2/3 bg-transparent shadow-none border-none">
            <h3 className="font-semibold text-3xl mb-4 md:block hidden">
              Mulai Proyek Impian Anda dengan Tenang
            </h3>
            <p className="mb-6 md:block hidden">
              Membangun gedung atau proyek konstruksi lainnya adalah keputusan
              besar. Itu sebabnya kami hadir untuk memberikan Anda ketenangan
              pikiran. Tim ahli kami siap menjawab semua pertanyaan Anda.
            </p>

            <Accordion type="single" collapsible>
              {/* Item Accordion 1 */}
              <AccordionItem value="item-1" className="mb-4">
                <AccordionTrigger
                  onClick={() => handleAcordion("item-1")}
                  className={`p-4 flex items-center justify-start transition-all ${
                    open === "item-1"
                      ? "bg-accent-light text-black"
                      : "bg-primary-content text-white"
                  } hover:bg-primary-content/80 hover:text-white`}
                >
                  <span
                    className={`mr-2 flex items-center justify-center w-4 h-4 border-2 ${
                      open === "item-1" ? "border-black" : "border-white"
                    } rounded`}
                  >
                    {/* Conditionally render Plus or Minus based on the open/closed state */}
                    {open === "item-1" ? (
                      <Minus className="h-4 w-4 text-black transition-transform duration-200" />
                    ) : (
                      <Plus className="h-4 w-4 text-white transition-transform duration-200" />
                    )}
                  </span>

                  <span
                    className={`font-normal text-base ${open === "item-1" ? "text-black" : "text-white"}`}
                  >
                    Jasa apa yang ditawarkan oleh Matra Kosala ?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 bg-accent-light text-paragraph md:font-normal font-light">
                  Sebagai General Contractor, kami ahli dalam membangun berbagai
                  jenis bangunan, mulai dari rusun yang nyaman hingga pabrik
                  yang efisien. Kami juga menyediakan jasa desain arsitektur
                  yang disesuaikan dengan kebutuhan Anda, sehingga bangunan Anda
                  tidak hanya kokoh, tapi juga estetik. Konsultasikan kebutuhan
                  Anda segera !
                </AccordionContent>
              </AccordionItem>

              {/* Item Accordion 2 */}
              <AccordionItem value="item-2" className="mb-4">
                <AccordionTrigger
                  onClick={() => handleAcordion("item-2")}
                  className={`p-4 flex items-center justify-start transition-all ${
                    open === "item-2"
                      ? "bg-accent-light text-black"
                      : "bg-primary-content text-white"
                  } hover:bg-primary-content/80 hover:text-white`}
                >
                  <span
                    className={`mr-2 flex items-center justify-center w-4 h-4 border-2 ${
                      open === "item-2" ? "border-black" : "border-white"
                    } rounded`}
                  >
                    {/* Conditionally render Plus or Minus based on the open/closed state */}
                    {open === "item-2" ? (
                      <Minus className="h-4 w-4 text-black transition-transform duration-200" />
                    ) : (
                      <Plus className="h-4 w-4 text-white transition-transform duration-200" />
                    )}
                  </span>

                  <span className="font-normal text-base">
                    Bagaimana cara mendapatkan penawaran harga?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-accent-light text-paragraph">
                  Anda bisa menghubungi kami melalui, whatsapp, telepon atau
                  email yang tertera. Kami akan senang untuk mengatur pertemuan
                  (online atau offline) dengan Anda untuk membahas proyek Anda
                  lebih lanjut.
                </AccordionContent>
              </AccordionItem>

              {/* Item Accordion 3 */}
              <AccordionItem value="item-3" className="mb-4">
                <AccordionTrigger
                  onClick={() => handleAcordion("item-3")}
                  className={`p-4 flex items-center justify-start transition-all ${
                    open === "item-3"
                      ? "bg-accent-light text-black"
                      : "bg-primary-content text-white"
                  } hover:bg-primary-content/80 hover:text-white`}
                >
                  <span
                    className={`mr-2 flex items-center justify-center w-4 h-4 border-2 ${
                      open === "item-3" ? "border-black" : "border-white"
                    } rounded`}
                  >
                    {/* Conditionally render Plus or Minus based on the open/closed state */}
                    {open === "item-3" ? (
                      <Minus className="h-4 w-4 text-black transition-transform duration-200" />
                    ) : (
                      <Plus className="h-4 w-4 text-white transition-transform duration-200" />
                    )}
                  </span>

                  <span className="font-normal text-base">
                    Proses kerja seperti apa yang ditawarkan oleh Matra Kosala ?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-accent-light text-paragraph">
                  Proses kerja kami sangat transparan. Mulai dari konsultasi
                  awal, perencanaan, hingga pelaksanaan, kami akan selalu
                  melibatkan Anda. Kami juga akan memberikan laporan berkala
                  agar Anda dapat memantau perkembangan proyek
                </AccordionContent>
              </AccordionItem>
              {/* <AccordionItem value="item-4" className="mb-4">
                <AccordionTrigger
                  onClick={() => handleAcordion("item-4")}
                  className="bg-primary-content text-white p-4 flex items-center justify-start hover:bg-primary-content/80 transition-all"
                >
                  <span className="mr-2">
                    {open === "item-4" ? (
                      <Minus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 text-white" />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 text-white" />
                    )}
                  </span>
                  <span className="font-normal">
                    Bagaimana metode estimasi biaya dan juga tata cara
                    pembayaran untuk proyek Saya ?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-accent-light text-paragraph">
                  Kami akan memberikan estimasi biaya yang jelas dan terperinci
                  setelah melakukan survei lokasi dan mendengarkan kebutuhan
                  Anda. Kami juga menawarkan berbagai opsi pembayaran yang
                  fleksibel.
                </AccordionContent>
              </AccordionItem> */}
              {/* Item Accordion 3 */}
              <AccordionItem value="item-5" className="mb-4">
                <AccordionTrigger
                  onClick={() => handleAcordion("item-5")}
                  className={`p-4 flex items-center justify-start transition-all ${
                    open === "item-5"
                      ? "bg-accent-light text-black"
                      : "bg-primary-content text-white"
                  } hover:bg-primary-content/80 hover:text-white`}
                >
                  <span
                    className={`mr-2 flex items-center justify-center w-4 h-4 border-2 ${
                      open === "item-5" ? "border-black" : "border-white"
                    } rounded`}
                  >
                    {/* Conditionally render Plus or Minus based on the open/closed state */}
                    {open === "item-5" ? (
                      <Minus className="h-4 w-4 text-black transition-transform duration-200" />
                    ) : (
                      <Plus className="h-4 w-4 text-white transition-transform duration-200" />
                    )}
                  </span>

                  <span className="font-normal text-base">
                    Seperti apa Kualitas Konstruksi dan juga Garansi yang akan
                    Saya dapatkan ?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-accent-light text-paragraph">
                  Kami sangat memperhatikan kualitas setiap pekerjaan yang ada,
                  sehingga keseluruhan hasil konstruksi memiliki kualitas yang
                  baik (didukung dengan material unggulan dan tenaga kerja yang
                  berpengalaman). Anda juga bisa semakin tenang karena kami juga
                  memberikan garansi pemeliharaan untuk proyek Anda.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          {/* Bagian Kanan - Informasi Tambahan */}
          <div className="basis-1/3">
            <div className=" p-6 ">
              <h4 className="text-primary-content  text-2xl font-bold mb-4">
                Butuh Bantuan ?
              </h4>

              {/* Layanan Teknis */}
              <div className="mb-6">
                <h5 className=" text-lg font-normal mb-2">Pertanyaan Teknis</h5>
                <ul className="list-disc list-inside text-paragraph text-[#475569] space-y-1">
                  <li>Cakupan Layanan</li>
                  <li>Diagnosa dan Solusi Masalah</li>
                  <li>Bantuan Jarak Jauh</li>
                  <li>Kunjungan Lokasi</li>
                  <li>Layanan Pemeliharaan</li>
                  <li>Dokumentasi & Pelatihan</li>
                  <li>Pengadaan Material</li>
                </ul>
              </div>

              {/* Layanan Pelanggan */}
              <div className="mb-6">
                <h5 className="text-primarybg-primary-content text-lg font-normal mb-2">
                  Layanan Pelanggan
                </h5>
                <ul className="list-disc list-inside text-paragraph text-[#475569] space-y-1">
                  <li>Bantuan Personalisasi</li>
                  <li>Respon Tepat Waktu</li>
                  <li>Komunikasi Jelas</li>
                  <li>Penyelesaian Masalah</li>
                  <li>Pengumpulan Masukan</li>
                  <li>Garansi Kepuasan</li>
                </ul>
              </div>

              {/* Tombol Bantuan */}
              <div className="flex justify-start">
                <Button
                  className="group bg-primary-dark text-white hover:bg-accent-light hover:text-primary-dark font-medium border-2 border-transparent hover:border-primary-dark transition-colors duration-300"
                  asChild
                >
                  <Link
                    href="https://wa.me/6285697093044?text=saya%20ingin%20tahu%20lebih%20detail%20mengenai%20layanan%20Matra%20Kosala."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Headset className="ml-2 h-4 w-4" />
                    CS Matra Kosala
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
