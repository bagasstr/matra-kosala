// components/PartnerBrands.tsx
"use client";
import Image from "next/image";
import React from "react";

const PartnerBrands: React.FC = () => {
  const brands = [
    { name: "APLUS", logo: "/1.png" },
    { name: "LS", logo: "/2.png" },
    { name: "PHILIPS", logo: "/3.png" },
    { name: "Panasonic", logo: "/4.png" },
    { name: "SHARP", logo: "/5.png" },
    { name: "PowerBlock", logo: "/6.png" },
    { name: "American Standard", logo: "/7.png" },
    { name: "TOTO", logo: "/8.png" },
    { name: "Roman", logo: "/9.png" },
    { name: "Indogress", logo: "/10.png" },
    { name: "Rucika", logo: "/11.png" },
    { name: "Vinilon", logo: "/12.png" },
    { name: "Simetri", logo: "/13.png" },
    { name: "Kabelindo", logo: "/14.png" },
    { name: "Schneider Electric", logo: "/15.png" },
    { name: "BOSS", logo: "/16.png" },
    { name: "Spindo", logo: "/17.png" },
    { name: "Propan", logo: "/18.png" },
    { name: "Jotun", logo: "/19.png" },
    { name: "Kooseki", logo: "/20.png" },
    { name: "Additional Brand", logo: "/21.png" },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto md:max-w-2xl lg:max-w-5xl px-4">
        <div className="bg-primary-content text-white font-bold text-center py-4 ">
          +100 Mitra Partner Brand
        </div>
        <div className="gap-6 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 mt-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center border p-2 shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <Image
                src={brand.logo}
                alt={"image"}
                width={100}
                height={100}
                className="text-center w-20 h-4 object-fill"
                // onError={(e) =>
                //   (e.currentTarget.src = "/default-logo.png") // Fallback logo
                // }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerBrands;
