"use client";
import PaginationPage from "@/components/Pagination";
import PortofolioCard from "@/components/PortofolioCard";
import { useFetchPorto } from "@/hooks/fetchPorto";
import { categoryAtom, itemsAtom, page } from "@/hooks/jotaiHooks";
import type { IPortfolio, IPortfolioResponse } from "@/types/type";
import { useAtom } from "jotai";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { use, useCallback, useEffect, useMemo, useState } from "react";

const PortofolioList = ({
  initialData,
}: {
  initialData: IPortfolioResponse | null;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useAtom(categoryAtom);
  const [activePage, setActivePage] = useAtom(page);

  useEffect(() => {
    const categoryParams = searchParams.get("category") || "semua";
    const pageParams = Number(searchParams.get("page") || "1");
    setActiveCategory(categoryParams);
    setActivePage(pageParams);
  }, [searchParams, setActiveCategory, setActivePage]);

  useEffect(() => {
    let newParams = new URLSearchParams();
    newParams.set("category", activeCategory);
    newParams.set("page", activePage.toString());
    if (activeCategory !== "semua") {
      router.replace(`?${newParams.toString()}`, { scroll: false });
    } else {
      router.replace(`/portofolio?page=${activePage.toString()}`, {
        scroll: false,
      });
    }
  }, [activeCategory, activePage, router]);

  const pathname = usePathname();
  useEffect(() => {
    const isActive = localStorage.getItem("isActive");
    if (isActive && pathname !== isActive) {
      router.replace(`${isActive}`);
    }
  }, []);

  const { data, isLoading, isError } = useFetchPorto(initialData);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-0 md:max-w-5xl ">
        <div className="flex justify-center items-center lg:justify-start space-x-4 text-center mb-10">
          <h1 className="text-4xl font-bold bg-primary-dark w-full p-2 mx-auto text-white uppercase lg:w-[50%] lg:mx-0">
            Portofolio
          </h1>
        </div>
        <div className="space-y-4">
          <p className=" text-start text-2xl md:text-3xl font-semibold">
            Dari Konsep ke Kenyataan
          </p>
          <p className="  text-start leading-relaxed md:text-base text-paragraph opacity-90">
            Konsep Anda, realisasi kami. Dengan pengalaman dan keahlian yang
            luas, kami telah membantu banyak klien mewujudkan proyek impian
            mereka.{" "}
          </p>
          <p className=" text-start md: text-base text-paragraph text-primary-dark leading-relaxed font-medium">
            Jelajahi proyek-proyek kami dan temukan inspirasi untuk proyek Anda
            berikutnya.
          </p>
          <div className="border-t-2 border-black/80">
            <h2 className=" text-start lg:text-xl text-xl font-medium my-8">
              Jelajahi Kategori
            </h2>
            <PortofolioCard
              data={data?.data || []}
              withTabs={true}
              isError={isError instanceof Error && isError.message}
              isLoading={isLoading}
            />
          </div>
          <div className="flex justify-center items-center pt-20">
            <PaginationPage totalPages={data?.totalPage || 0} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortofolioList;
