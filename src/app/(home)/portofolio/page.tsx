// import PagePortofolio from '@/components/portofolio/PagePortofolio'
import { portfolioFetch } from "@/app/actions/fetchAction";
import PortofolioList from "@/components/portogfolioList";
import { Suspense } from "react";

export default async function Portofolio() {
  const { result, error } = await portfolioFetch();

  return (
    <>
      {/* <PagePortofolio /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <PortofolioList initialData={result} />
      </Suspense>
    </>
  );
}
