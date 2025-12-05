"use client";
import { imageProfile, imageshubungi, textshubungi } from "@/lib/data";
import React, { useRef, useState } from "react";
import { ImageCarousel } from "../image-carousel";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react"; // Swiper React components
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Swiper modules
import "swiper/css"; // Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const PerjalananProfil = () => {
  const swiperRef1 = useRef<SwiperRef>(null);
  const swiperRef2 = useRef<SwiperRef>(null);
  const [current1, setCurrent1] = useState(0);
  const [current2, setCurrent2] = useState(0);
  const handlePagination1 = (index: number) => {
    if (swiperRef1.current && swiperRef1.current.swiper) {
      swiperRef1.current.swiper.slideTo(index);
      setCurrent1(index);
    }
  };
  const handlePagination2 = (index: number) => {
    if (swiperRef2.current && swiperRef2.current.swiper) {
      swiperRef2.current.swiper.slideTo(index);
      setCurrent1(index);
    }
  };

  return (
    <div className="py-10">
      <div className="container mx-auto md:max-w-2xl lg:max-w-5xl px-4">
        <div className="flex justify-start items-center space-x-4 mb-10 md:bg-primary-accent">
          <h1 className="md:text-2xl text-xl font-bold lg:bg-accent-light p-2 mx-auto text-primary-dark uppercase">
            perjalanan penuh makna
          </h1>
        </div>
        <div className="space-y-20 md:space-y-0 grid grid-cols-1 md:grid-cols-9 gap-x-4">
          <div className="md:col-span-4">
            <Swiper
              key={"carousel1"}
              ref={swiperRef1}
              onSlideChange={(swiper: any) => {
                setCurrent1(swiper.realIndex);
              }}
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides={false}
              style={{ margin: "0 0" }}
              className=""
              loop
              autoplay={{ reverseDirection: true }}
            >
              {imageProfile.carousel1.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative aspect-square">
                    <Image
                      src={image}
                      fill
                      alt={image}
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="mt-4">
              <div className="flex items-center justify-center">
                {imageProfile.carousel1.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      "size-[6px] rounded-full mx-[.15rem] ",
                      index === current1 ? "bg-primary" : "bg-gray-300"
                    )}
                    onClick={() => handlePagination1(index)}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mt-10">
              <div className=" mx-auto space-y-4">
                <p className="text-start text-base font-normal">
                  Mulai dari sebuah ruko sewaan yang sederhana, kami memulai
                  perjalanan konstruksi dengan semangat pantang menyerah. Setiap
                  proyek adalah sebuah petualangan baru, penuh tantangan dan
                  kejutan.
                </p>
                <p className="text-start text-base font-normal">
                  Kami ingat saat pertama kali menerima kunci kantor baru,
                  rasanya seperti mimpi yang menjadi kenyataan. Ini adalah hasil
                  dari kerja keras seluruh tim dan dukungan dari klien setia
                  Matra Kosala.
                </p>
                <p className="text-start text-base text-primary-dark font-medium">
                  Kami percaya bahwa setiap bangunan adalah sebuah karya seni
                  yang dapat mengubah kehidupan banyak orang. Mari bersama-sama
                  membangun masa depan yang lebih baik.
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-5">
            <Swiper
              key={"carousel2"}
              ref={swiperRef2}
              onSlideChange={(swiper: any) => {
                setCurrent2(swiper.realIndex);
              }}
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides={false}
              //  navigation
              style={{ margin: "0 0" }}
              className=""
              loop
              autoplay={true}
            >
              {imageProfile.carousel2.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative aspect-square">
                    <Image
                      src={image}
                      fill
                      alt={image}
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="mt-4">
              <div className="flex items-center justify-center">
                {imageProfile.carousel2.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      "size-[6px] rounded-full mx-[.15rem] ",
                      index === current2 ? "bg-primary" : "bg-gray-300"
                    )}
                    onClick={() => handlePagination2(index)}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mt-10">
              <div className=" mx-auto space-y-4">
                <p className="text-start text-base font-normal">
                  Sejak Matra Kosala berdiri, kami telah berkomitmen untuk
                  memberikan layanan terbaik untuk setiap klien. Kami pecaya
                  jika kesempatan yang kami terima adalah amanah yang harus
                  diselesaikan dengan penuh tanggungjawab.
                </p>
                <p className="text-start text-base text-primary-dark font-medium">
                  Semakin banyak proyek yang kami selesaikan, semakin kami yakin
                  bahwa kepuasan klien adalah penghargaan tertinggi bagi kami.
                  Komitmen ini telah menjadi landasan bagi kami dalam merumuskan
                  visi, misi, dan nilai-nilai perusahaan yang akan terus kami
                  junjung tinggi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerjalananProfil;
