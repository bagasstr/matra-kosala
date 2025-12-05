import "@/app/globals.css";
export const metadata = {
  title: "Matra Kosala | Artikel ",
  description:
    "Artikel dan informasi terkini dari PT Matra Kosala Digdaya — Konsultan perencanaan, kontraktor, dan pengembangan SDM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
