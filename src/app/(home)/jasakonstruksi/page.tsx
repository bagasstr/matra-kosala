import React from "react";
import HeaderLayanan from "@/components/jasakontruksi/layanan-artikel";
import Portofolio from "@/components/home/Portofolio";
import Testimoni from "@/components/home/Testimoni";

const layanan = () => {
  return (
    <>
      <HeaderLayanan />
      <div className="border-b border-2 border-primary-light max-w-[1250px] mx-auto "></div>
      <Portofolio />
      <div className="border-b border-2 border-primary-light max-w-[1250px] mx-auto "></div>
      <Testimoni />
    </>
  );
};

export default layanan;
