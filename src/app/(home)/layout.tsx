// import '@/app/globals.css'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
