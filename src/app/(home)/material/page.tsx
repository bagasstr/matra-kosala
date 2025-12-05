import BuyerSection from "@/components/commingsoon/buyer-section";
import ComingSoon from "@/components/commingsoon/comming-soon";
import PartnerBrands from "@/components/commingsoon/partner-brand";

export default function ComingSoonPage() {
  return (
    <>
      <ComingSoon />
      <div className="border-b border-2 border-primary-light max-w-[1250px] mx-auto "></div>
      <BuyerSection />
      <PartnerBrands />
    </>
  );
}
