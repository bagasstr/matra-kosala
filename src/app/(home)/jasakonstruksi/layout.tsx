import "@/app/globals.css";
export const metadata = {
  title: "Matra Kosala | Jasa Konstruksi",
  description:
    "Layanan jasa konstruksi profesional dari PT Matra Kosala Digdaya — perencanaan, pembangunan, dan pengawasan proyek terpercaya.",
};

export default function JasaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
