"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/Logo.png";

import { Button } from "@/components/ui/button";
import { BookText, Menu, X } from "lucide-react";
import { useAtom } from "jotai";
import { buttonPenawaran } from "@/hooks/jotaiHooks";
import ModalPenawaran from "./modalPenawaran";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isActive, setActive] = React.useState<string | null>(null);
  const [Open, setOpen] = useAtom(buttonPenawaran);
  const router = usePathname();

  // Sync localStorage value to state on mount
  React.useEffect(() => {
    const currentUrl = localStorage.getItem("isActive");
    if (currentUrl) {
      setActive(currentUrl);
    }
  }, []);

  const hideNavbar = [
    "/form-penawaran",
    "/form-penawaran/step2",
    "/form-penawaran/step3",
  ].includes(router);

  const handleActive = (url: string) => {
    setActive(url);
    localStorage.setItem("isActive", url);
    setMobileMenuOpen(false); // Close mobile menu after selecting
  };

  const menuItems = [
    { label: "beranda", href: "/" },
    { label: "jasa konstruksi", href: "/jasakonstruksi" },
    { label: "material", href: "/material" },
    // { label: 'portofolio', href: '/portofolio' },
    { label: "profil kami", href: "/profile" },
    { label: "artikel", href: "/artikel" },
  ];

  return (
    <>
      {Open && (
        <ModalPenawaran Open={Open} setOpen={setOpen} submit="Coba Gratis" />
      )}
      {!hideNavbar && (
        <header className="bg-primary-dark fixed top-0 z-50 w-screen">
          <div className="py-4 lg:max-w-5xl mx-auto px-4 max-w-2xl">
            <div className="flex justify-between items-center">
              <Link href={"/"} className="lg:w-[20%] md:w-[40%] w-[60%]">
                <Image src={Logo} alt="Matra Kosala" priority />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex">
                <div className="flex gap-x-2 items-center">
                  {menuItems.map((item) => (
                    <Link
                      href={item.href}
                      onClick={() => handleActive(item.href)}
                      key={item.label}
                      className={`${
                        isActive === item.href
                          ? "underline decoration-primary-accent underline-offset-8 decoration-2 capitalize "
                          : ""
                      } text-white hover:underline hover:decoration-primary-accent hover:underline-offset-8 hover:decoration-2 px-2 capitalize`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Desktop Consult Button */}
              <div className="hidden lg:flex">
                <Button
                  onClick={() => setOpen(true)}
                  className="text-white bg-primary-light border hover:bg-white hover:text-primary-light"
                >
                  <BookText />
                  Penawaran
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="flex lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-2xl focus:outline-none transition-transform duration-300"
                >
                  {isMobileMenuOpen ? (
                    <X className="transform rotate-180 transition-transform duration-300 text-white" />
                  ) : (
                    <Menu className="transform rotate-0 transition-transform duration-300 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`lg:hidden bg-primary-dark shadow-lg border-t border-gray-200 transition-all duration-300 overflow-hidden ${
              isMobileMenuOpen
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <nav className="flex flex-col px-4 space-y-5 py-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${
                    isActive === item.href
                      ? "underline decoration-primary-accent underline-offset-8 decoration-2 capitalize"
                      : ""
                  } text-primary-accent hover:underline hover:decoration-primary-accent hover:underline-offset-8 hover:decoration-2 px-2 capitalize`}
                  onClick={() => handleActive(item.href)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex lg:hidden pt-4">
                <Button
                  onClick={() => setOpen(true)}
                  className="text-white bg-primary-light border hover:bg-white hover:text-primary-light"
                >
                  <BookText />
                  Penawaran
                </Button>
              </div>
            </nav>
          </div>
        </header>
      )}
    </>
  );
}
