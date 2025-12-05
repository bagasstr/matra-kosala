import { notFound } from "next/navigation";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { User, Building2, MapPin, ChevronLeft } from "lucide-react";
import { portofolio } from "@/lib/data";
import type { Portofolio } from "@/types/type";
import CollectionGallery from "@/components/CollectionGallery";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NextSeo } from "next-seo";
import type { Metadata } from "next";
import UseableSwiper from "@/components/UseableSwiper";
import StartYouProject from "@/components/StartYouProject";
import { serverEnv } from "@/lib/server";

interface IPortofolioDetail {
  id: number;
  title: string;
  mitraKlien: string;
  ringkasan: string;
  tipeBangunan: string;
  tanggalPelaksanaan: string;
  thumbnail: string;
  lokasi: string;
  gambarProyek: TGambarProyek;
}

type TGambarProyek = {
  id: number;
  url: string;
  portfolioProyekId: number;
};
const fetchPortfolioById = async (param: string) => {
  try {
    const res = await fetch(`${serverEnv.API_URL}/portfolio/${param}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const metadata = await fetchPortfolioById(params.slug);
  return {
    title: metadata.data.title,
    keywords: metadata.data.title,
    description: metadata.data.ringkasan,
    openGraph: {
      images: metadata.data.thumbnail,
      title: metadata.data.title,
      description: metadata.data.ringkasan,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.data.title,
      description: metadata.data.ringkasan,
      images: metadata.data.thumbnail,
    },
  };
}
export default async function PortfolioDetail({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetchPortfolioById(params.slug);

  const {
    id,
    title,
    mitraKlien,
    ringkasan,
    tipeBangunan,
    tanggalPelaksanaan,
    thumbnail,
    lokasi,
    gambarProyek,
  } = data.data as IPortofolioDetail;

  return (
    <>
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 lg:px-0 md:max-w-2xl lg:max-w-5xl">
          <div className="flex items-center gap-x-2">
            <Link href={`/portofolio`}>
              <div className="bg-primary-dark rounded-sm p-1 w-fit">
                <ChevronLeft className="size-12 text-white" />
              </div>
            </Link>
            <div className="bg-primary-accent w-full rounded-sm">
              <h1 className="text-primary-dark uppercase text-center font-bold text-2xl py-3">
                Portofolio Detail
              </h1>
            </div>
          </div>
          <div className="mt-4">
            <div className="border-b-2 lg:pb-2 border-primary-light">
              <h1 className="font-medium text-lg tracking-wider text-secondary-foreground lg:text-2xl lg:font-semibold">
                {title}
              </h1>
            </div>
            <div className="block lg:grid lg:grid-cols-2 lg:gap-x-20">
              <div className="">
                <div className="my-8 lg:mb-4">
                  <h2 className="text-center lg:text-start lg:text-lg text-primary-dark font-semibold">
                    Data Proyek
                  </h2>
                </div>
                <div className="">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <h3 className="bg-primary-dark px-3 text-sm font-medium text-primary-accent py-2 w-full">
                        Mitra Klien
                      </h3>
                      <h3 className="bg-primary-accent text-sm text-primary-dark px-3 py-2 w-full">
                        {mitraKlien}
                      </h3>
                    </div>
                    <div className="flex items-center w-full justify-center gap-x-2">
                      <h3 className="bg-primary-dark px-3 text-sm font-medium text-primary-accent py-2 w-full">
                        Tipe Bangunan
                      </h3>
                      <h3 className="bg-primary-accent text-sm text-primary-dark px-3 py-2 w-full">
                        {tipeBangunan
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())
                          .replace(/Dan/g, "&")}
                      </h3>
                    </div>
                    <div className="flex items-center w-full justify-center gap-x-2">
                      <h3 className="bg-primary-dark px-3 text-sm font-medium text-primary-accent py-2 w-full">
                        Lokasi
                      </h3>
                      <h3 className="bg-primary-accent text-sm text-primary-dark px-3 py-2 w-full">
                        {lokasi}
                      </h3>
                    </div>
                    <div className="flex items-center w-full justify-center gap-x-2">
                      <h3 className="bg-primary-dark px-3 text-sm font-medium text-primary-accent py-2 w-full">
                        Tanggal Pelaksanaan
                      </h3>
                      <h3 className="bg-primary-accent text-sm text-primary-dark px-3 py-2 w-full">
                        {tanggalPelaksanaan}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="my-8 lg:mb-4">
                  <h2 className="text-center lg:text-start lg:text-lg text-primary-dark font-semibold">
                    Ringkasan
                  </h2>
                </div>
                <div className="">
                  <p className="text-xs px-4 py-2 bg-primary-accent text-primary-dark font-medium lg:text-sm lg:py-8 lg:px-5">
                    {ringkasan}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 w-full">
            <h2 className="bg-primary-dark text-center text-2xl uppercase py-3 text-primary-accent font-bold lg:w-1/2">
              progress 100%
            </h2>
            {/* <UseableSwiper slides={gambarProyek} alt={title} /> */}
            <div className="relative aspect-[16/9] mt-8 ring-2 ring-primary-accent">
              <Image
                src={`${serverEnv.IMAGE_URL}/${thumbnail}`}
                alt={title}
                quality={100}
                fill
                className="object-fill"
              />
            </div>
          </div>
          <div className="py-20 w-full border-b-2 border-primary-light">
            <h2 className="bg-primary-dark text-center text-2xl uppercase py-3 text-primary-accent font-bold lg:w-1/2">
              dokumentasi
            </h2>
            <h2 className="text-center lg:text-start lg:text-lg text-primary-dark mt-8 font-semibold">
              Proses Pengerjaan
            </h2>
            <div className="mt-8">
              <CollectionGallery images={gambarProyek} />
            </div>
          </div>
          <div className="py-20 w-full lg:hidden">
            <StartYouProject />
          </div>
          <div className="py-20 w-full hidden md:hidden lg:block">
            <div className="w-1/2 space-y-8">
              <h2 className="text-primary-dark text-xl font-semibold">
                Mulai Pertualangan Proyek Anda
              </h2>
              <div className="bg-primary-accent text-primary-dark p-4">
                <p className="">
                  Setiap proyek adalah sebuah petualangan. Kami mengajak Anda
                  untuk menjadi bagian dari petualangan kami.
                </p>
                <p className="">
                  Mari wujudkan bersama ruang yang menginspirasi dan fungsional.
                </p>
                <p className="">
                  Hubungi kami untuk konsultasi gratis dan langkah pertama
                  menuju proyek impian Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
