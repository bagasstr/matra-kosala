import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { portofolio } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import type { IPortfolio, PortofolioContentProps } from "@/types/type";
import { Button } from "../ui/button";
import PortofolioCard from "../PortofolioCard";
import { portfolioFetch } from "@/app/actions/fetchAction";

export default async function PortofolioContent({
  children,
}: PortofolioContentProps) {
  const { result, error } = await portfolioFetch();
  const limitedPortofolio = (result?.data as IPortfolio[])?.slice(0, 4);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:max-w-2xl lg:max-w-5xl">
        <div className="flex justify-center items-center space-x-4 text-center mb-10 ">
          <h1 className="text-3xl font-bold bg-primary-dark w-full p-2 mx-auto text-white uppercase">
            Portofolio
          </h1>
        </div>
        <p className="text-center text-2xl md:text-3xl font-semibold">
          Dari Konsep ke Kenyataan
        </p>
        <div className="mb-14 mt-4 space-y-4">{children}</div>
        <div className="">
          <PortofolioCard
            isError={error}
            key={limitedPortofolio?.[0]?.id}
            data={limitedPortofolio || []}
            withTabs={false}
          />
        </div>
        <div className="flex justify-center">
          <Link href={{ pathname: "/portofolio", query: { page: 1 } }}>
            <Button className="bg-primary-dark hover:bg-primary-accent text-white hover:text-primary-dark font-semibold text-sm hover:ring-2 hover:ring-inset hover:ring-primary-dark mt-12">
              Portofolio Lengkap <ArrowRight className="scale-125" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
