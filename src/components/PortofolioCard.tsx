"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  CATEGORY_DATA,
  type IPortfolio,
  type IPortfolioResponse,
} from "@/types/type";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { categoryAtom, page } from "@/hooks/jotaiHooks";
import { clientEnv } from "@/lib/client";
import { error } from "console";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  data: IPortfolio[];
  withTabs?: boolean;
  isError?: string | boolean | null | undefined;
  isLoading?: boolean;
}

const PortofolioCard = ({
  data,
  withTabs,
  isError,
  isLoading,
}: PortfolioCardProps) => {
  const [activeCategory, setActiveCategory] = useAtom(categoryAtom);
  const [, setActivePage] = useAtom(page);

  const handleCategoryChange = (cate: string) => {
    setActiveCategory(cate);
    setActivePage(1);
  };

  const categoryList = useMemo(() => {
    return CATEGORY_DATA.map((item, index) => (
      <button
        key={index}
        className={`text-sm font-medium py-2 ${
          activeCategory === item.value
            ? "bg-primary-dark text-white"
            : "bg-primary-accent text-primary-dark"
        }`}
        onClick={() => handleCategoryChange(item.value)}
      >
        {item.label}
      </button>
    ));
  }, [activeCategory]);

  console.log(data, isError, isLoading);
  return (
    <section className="">
      <div className="">
        <div className="">
          {withTabs && (
            <div className="grid grid-cols-2 gap-2 lg:gap-4 bg-transparent lg:grid-cols-3 mb-20 text-sm">
              {categoryList}
            </div>
          )}
          {/* {isLoading && (
            <div className='flex items-center justify-center h-60'>
              <p>Loading...</p>
            </div>
          )} */}
          {/* {!data ||
            (data.length === 0 && (
              <div className='flex items-center justify-center h-60'>
                <p>Data not found</p>
              </div>
            ))} */}
          {isError ? (
            <p className={cn("text-center")}>Tidak ada data</p>
          ) : (
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
              {data?.map((data: any, index: number) => (
                <Card
                  key={index}
                  className="w-full md:aspect-[4/3] aspect-square overflow-hidden"
                >
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="relative w-full h-3/4">
                      <Image
                        src={`${clientEnv.IMAGE_URL}/${data?.thumbnail}`}
                        alt={data.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col">
                        <div className="relative group">
                          <h3 className="text-lg font-semibold text-center transition-colors duration-500 group-hover:text-white py-3">
                            {data.title}
                          </h3>
                          <div
                            className="h-2 mt-2 w-full absolute bottom-0 left-0 bg-black transition-all duration-500 group-hover:h-full"
                            style={{
                              backgroundColor: "#22579D",
                              zIndex: -1,
                            }}
                          />
                        </div>
                        <p className="mt-2">{data.lokasi},</p>
                        <div className="flex justify-between items-center">
                          <p className="mt-2">{data.tanggalPelaksanaan}</p>
                          <div className="flex items-center text-primary-dark font-medium hover:bg-accent-light p-2 transition-colors duration-300 hover:border-primary-dark hover:text-primary-dark border-2 border-transparent">
                            <Link
                              href={`/portofolio/${data?.slug}`}
                              className="flex items-center"
                            >
                              <span>Lihat Detail</span>
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PortofolioCard;
