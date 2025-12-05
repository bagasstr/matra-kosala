"use client";
import { LatestArtikel } from "@/components/artikel/LatestArtikel";
import PopularArtikel from "@/components/artikel/PopularArtikel";
import HeaderArtikel from "@/components/HeaderArtikel";
import { Button } from "@/components/ui/button";
import { fetchArtikel } from "@/hooks/fetchArtikel";
import debounce from "debounce";
import { categoryAtomArtikel, pageArtikel } from "@/hooks/jotaiHooks";
import { clientEnv } from "@/lib/client";
import type { IArtikel } from "@/types/type";
import { useAtom } from "jotai";
import { ChevronRightIcon, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { mutate } from "swr";
import { Badge } from "../ui/badge";
import { DisplayCardContentArtikel } from "../DisplayContent";
import { toast } from "sonner";

enum EnumCategory {
  MatraKosala = "matrakosala",
  SeputarKonstruksi = "seputar_konstruksi",
  TipsDanPedoman = "tips_dan_pedoman",
}

interface ICategoriesEnum {
  key: string;
  label: string;
}
const CATEGORY_ENUM = [
  { key: "matra_kosala", label: "Matra Kosala" },
  { key: "seputar_konstruksi", label: "Seputar Konstruksi" },
  { key: "tips_dan_pedoman", label: "Tips & Pedoman" },
] as ICategoriesEnum[];

const PageArtikel = () => {
  const router = useRouter();
  const pathname = usePathname();
  const observerRef = useRef<any | null>(null);
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useAtom(pageArtikel);
  const [activeCategory, setActiveCategory] = useAtom(categoryAtomArtikel);

  const { artikel, debouncedLoadMore, hashMore, error, size, setSize } =
    fetchArtikel();

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (activeCategory !== category) {
      setSize(1);
    } else {
      router.replace(`?category=${category}`, { scroll: true });
    }
  };

  useEffect(() => {
    const categoryParams = searchParams.get("category") || "matra_kosala";
    const pageParams = searchParams.get("page") || "1";
    setActiveCategory(categoryParams);
    setActivePage(Number(pageParams));
  }, [searchParams, setActiveCategory, setActivePage]);

  useEffect(() => {
    let newParams = new URLSearchParams();
    newParams.set("category", activeCategory);
    newParams.set("page", size.toString());
    router.replace(`?${newParams.toString()}`, { scroll: false });
  }, [activeCategory, router, size]);
  const errors = (e: unknown) =>
    toast.error(e instanceof Error ? e.message : "Tidak ada artikel");

  return (
    <>
      <section className="pt-24 md:py-10 md:pt-24">
        <div className="mx-auto px-4 lg:px-4 md:max-w-2xl lg:max-w-5xl">
          <div className="flex justify-center items-center lg:justify-start space-x-4 text-center mb-10">
            <h1 className="text-3xl font-bold bg-primary-light w-full p-2 mx-auto text-white uppercase lg:w-[50%] lg:mx-0">
              Berita & Artikel
            </h1>
          </div>
          <div className="">
            <div className="">
              <h4 className="font-medium text-lg lg:text-xl md:text-lg">
                Kategori
              </h4>
            </div>

            <div className="flex items-center gap-x-2 mt-4 overflow-x-scroll no-scrollbar sticky top-14 z-10 bg-white py-4">
              {CATEGORY_ENUM.map((item) => (
                <Button
                  onClick={() => handleCategoryChange(item.key)}
                  key={item.key}
                  className={`w-full bg-primary-accent px-2 font-medium text-sm text-primary-dark ${activeCategory === item.key && "bg-primary-dark text-white"} hover:bg-primary-dark hover:text-primary-accent`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            <div className="mt-4 md:mt-8 pb-10">
              {error ? (
                <div className="flex items-center justify-center text-foreground/70">
                  {/* {errors(error)} */}
                  Artikel tidak ada
                </div>
              ) : (
                <InfiniteScroll
                  dataLength={artikel.length}
                  next={debouncedLoadMore}
                  hasMore={hashMore}
                  style={{ overflow: "visible" }}
                  loader={
                    <div className="flex items-center justify-center mt-10">
                      <div className="animate-spin">
                        <Loader />
                      </div>
                    </div>
                  }
                  endMessage={
                    <p className="text-center mt-10 opacity-70 font-normal">
                      Artikel sudah habis
                    </p>
                  }
                >
                  <div className="md:space-y-8 space-y-4 lg:space-y-3">
                    {artikel.map((item: IArtikel, index: number) => (
                      <Link
                        href={`/artikel/${item.slug}`}
                        key={index}
                        className="grid grid-cols-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto lg:grid-cols-12 gap-4"
                      >
                        <div className="relative aspect-square lg:col-span-3 col-span-3">
                          <Image
                            src={`${clientEnv.IMAGE_URL}/${item.thumbnail}`}
                            alt={item.title}
                            fill
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <div className="md:mt-6 mt-2 lg:mt-1 lg:col-span-8 col-span-5">
                          <h2 className="text-lg font-semibold line-clamp-1 md:text-2xl">
                            {item.title}
                          </h2>

                          <p className="line-clamp-3 md:line-clamp-4 lg:line-clamp-5 opacity-75 text-sm md:text-lg lg:text-base md:leading-relaxed md:my-4 lg:my-2 my-2">
                            <DisplayCardContentArtikel
                              htmlContent={item.seo.metaDescription}
                            />
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge className="bg-primary-light hover:bg-primary-light">
                              {item.category.replace(/_/g, " ")}
                            </Badge>
                            <div className="opacity-90 md:text-sm">
                              <span className="text-sm opacity-85 md:text-sm lg:text-base md:font-medium font-medium">
                                {new Date(item.createdAt).toLocaleString(
                                  "id-ID",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </InfiniteScroll>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PageArtikel;
