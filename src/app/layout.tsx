import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Matra Kosala",
  description:
    "Website resmi Matra Kosala yang menyediakan layanan konstruksi dan arsitektur terpercaya di Indonesia.",
  keywords: [
    "Matra Kosala",
    "Konstruksi",
    "Arsitektur",
    "Jasa Bangun Rumah",
    "Kontraktor Indonesia",
  ],
  authors: [{ name: "Matra Kosala", url: "https://matrakosala.com" }],
  openGraph: {
    title: "Matra Kosala",
    description:
      "Solusi terbaik untuk konstruksi dan arsitektur profesional di Indonesia.",
    url: "https://matrakosala.com",
    siteName: "Matra Kosala",
    images: [
      {
        url: "https://matrakosala.comhttps://matrakosala.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo.c9671336.png&w=1920&q=75", // Ganti dengan URL gambar OG sebenarnya
        width: 1200,
        height: 630,
        alt: "Matra Kosala - Layanan Konstruksi & Arsitektur",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  metadataBase: new URL("https://matrakosala.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
