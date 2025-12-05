"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Building, Phone } from "lucide-react";

import { useState } from "react";
import Link from "next/link";

interface IHarapanMasaDepan {
  id: number;
  image: string;
  title: string;
  value: string;
  desc: string[];
  realisasi: { title: string; desc: string }[];
}

const dataHarapanMasaDepan: IHarapanMasaDepan[] = [
  {
    id: 0,
    image: "/Material Ramah Lingkungan.png",
    title: "Material Non-Emisi",
    value: "item-1",
    desc: [
      "Menuju dunia konstruksi yang tidak hanya kokoh dan indah, tetapi juga ramah lingkungan.",

      // ini text warna
      "Dengan menggunakan material konstruksi non-emisi, kami berkomitmen untuk mengurangi jejak karbon dan menciptakan lingkungan hidup yang lebih sehat untuk generasi mendatang.",
    ],
    realisasi: [
      {
        title: "Kemitraan dengan Supplier",
        desc: "Bekerja sama dengan supplier yang memproduksi material ramah lingkungan dan memiliki sertifikasi yang relevan.",
      },
      {
        title: "Edukasi Klien",
        desc: "Memberikan edukasi kepada klien tentang pentingnya menggunakan material ramah lingkungan dan manfaatnya bagi lingkungan.",
      },
    ],
  },
  {
    id: 1,
    image: "/Material Ramah Lingkungan-2.png",
    title: "Teknologi Konstruksi Terintegrasi",
    value: "item-2",
    desc: [
      "Teknologi konstruksi yang saling terintegrasi memungkinkan kami dalam meningkatkan efisiensi pekerjaan hingga biaya, sehingga kami bisa merealisasikan bangunan yang lebih berkualitas juga akurat.",

      // ini text warna
      "Dengan memilih kami, Anda akan mendapatkan proyek yang selesai tepat waktu dan sesuai dengan standar yang tinggi.",
    ],
    realisasi: [
      {
        title: "Implementasi BIM (Building Information Modeling)",
        desc: "Menggunakan perangkat lunak BIM untuk perencanaan, desain, dan konstruksi yang lebih efisien.",
      },
      {
        title: "Adopsi Teknologi Konstruksi Modern",
        desc: "Menerapkan teknologi seperti drone, dan pencetakan 3D untuk meningkatkan produktivitas dan kualitas.",
      },
      {
        title: "Kolaborasi Efisien Cloud Data-Server ",
        desc: "Teknologi cloud terpusat yang membantu efisiensi administasi proyek secara kolaboratif sehingga mampu membuat keputusan yang lebih cepat dan akurat.",
      },
    ],
  },
  {
    id: 2,
    image: "/Material Ramah Lingkungan-1.png",
    title: "Pemberdayaan Sosial",
    value: "item-3",
    desc: [
      "Dengan pemberdayaan masyarakat sekitar, kami berharap dapat menciptakan lingkungan yang lebih baik dan berkelanjutan.",

      "Implementasi proyek konstruksi yang menghasilkan bangunan sebagai karya,  juga menciptakan lapangan kerja, serta meningkatkan kesejahteraan masyarakat.",

      // ini text warna
      "Dengan memilih kami, Anda turut berkontribusi dalam membangun komunitas yang lebih kuat.",
    ],
    realisasi: [
      {
        title: "Program CSR",
        desc: "Melaksanakan program Corporate Social Responsibility (CSR) yang berfokus pada pendidikan, kesehatan, dan pemberdayaan masyarakat.",
      },
      {
        title: "Pemberdayaan UKM Lokal",
        desc: "Memberikan kesempatan kepada UMKM lokal untuk terlibat dalam proyek konstruksi.",
      },
      {
        title: "Pelatihan Tenaga Kerja",
        desc: "Melaksanakan pelatihan untuk meningkatkan keterampilan tenaga kerja lokal.",
      },
    ],
  },
];

export default function HarapanProfile() {
  const [show, setShow] = useState(false);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 lg:px-0 md:max-w-2xl lg:max-w-5xl">
        {/* Header */}
        <div className="flex justify-center items-center space-x-4 text-center">
          <h1 className="md:text-2xl text-xl font-bold bg-primary-light w-full p-2 mx-auto text-white uppercase">
            harapan untuk masa depan
          </h1>
        </div>
        {/* Services Grid */}
        <div className="md:my-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dataHarapanMasaDepan.map(
              (item: IHarapanMasaDepan, index: number) => (
                <Card className="border-b-2 border-black md:border-none py-20 md:py-0">
                  <CardTitle className="text-center mb-4 text-xl">
                    {item.title}
                  </CardTitle>
                  <CardContent className="">
                    <div className="group relative">
                      <div
                        className={`relative aspect-square md:group-hover:brightness-50`}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        <span className="md:absolute md:inset-0 md:flex md:items-center md:justify-center text-sm font-semibold md:group-hover:opacity-0 md:text-white">
                          Lihat Disini
                        </span>
                      </div>
                      <CardDescription
                        className={`space-y-4  mx-auto md:absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center md:z-50 md:bottom-0 md:top-0 md:left-4 md:right-0 mt-8 md:mt-0  md:opacity-0 md:group-hover:opacity-100`}
                      >
                        {item.desc.map((text, idx) => (
                          <p
                            key={idx}
                            className={`text-base md:text-sm md:text-white ${idx === item.desc.length - 1 ? "text-primary-dark font-medium md:text-white" : ""}`}
                          >
                            {text}
                          </p>
                        ))}
                      </CardDescription>
                    </div>
                    <div className="hidden md:block md:mt-4">
                      <div className="space-y-4">
                        {item.realisasi.map((item, idx) => (
                          <div className="space-y-2">
                            <h5 className="text-lg font-semibold">
                              {item.title}
                            </h5>
                            <p className="text-base">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="md:hidden">
                      <AccordionComponent item={item} />
                    </div>
                  </CardContent>
                </Card>
              )
            )}
            <div className="hidden md:block space-y-10 mt-20">
              <h3 className="uppercase text-3xl font-bold text-primary-dark md:mb-8">
                mulai proyek anda
              </h3>
              <Link
                href="https://wa.me/6285697093044?text=saya%20ingin%20tahu%20lebih%20detail%20mengenai%20layanan%20Matra%20Kosala."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="font-semibold bg-primary-light hover:ring-2 ring-primary-light hover:text-primary-light ring-inset hover:bg-transparent">
                  <Phone className="" />
                  Terhubung Via WA
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const AccordionComponent = ({ item }: { item: IHarapanMasaDepan }) => {
  const [open, setOpen] = useState("");
  const handleOpenAccordion = (value: string) => {
    setOpen(open === value ? "" : value);
  };
  return (
    <div className="mt-10">
      <h3
        className={`text-lg font-semibold  mb-2 transition-all duration-200 ${open === item?.value ? "translate-x-[30%]" : "translate-x-0"}`}
      >
        Realisasi Program
      </h3>
      <Accordion type="single" value={open} collapsible onValueChange={setOpen}>
        <AccordionItem value={item?.value} className="">
          <AccordionTrigger
            onClick={() => handleOpenAccordion(item?.value)}
            className="bg-primary-accent h-0 px-4 py-5"
          >
            <span
              className={`text-primary-dark text-base font-semibold ${open === item?.value ? "text-opacity-0" : "opacity-100"}`}
            >
              Lihat Detail
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-8 space-y-8 bg-primary-accent text-base">
            {item.realisasi.map((item, idx) => (
              <div className="space-y-2">
                <h5 className="text-lg font-semibold text-primary-dark">
                  {item.title}
                </h5>
                <p className="md:text-base text-paragraph">{item.desc}</p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
