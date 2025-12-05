"use client";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  PhoneCall,
} from "lucide-react";
import Image from "next/image";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Footer() {
  const router = usePathname();
  const hideFooter = [
    "/artikel",
    "/form-penawaran",
    "/form-penawaran/step2",
    "/form-penawaran/step3",
  ];
  return (
    <>
      {!hideFooter.includes(router) && (
        <footer className="w-full bg-primary-content pt-20 pb-10 border-t text-white">
          <div className="container px-4 md:max-w-2xl lg:max-w-5xl mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
              {/* Contact Information */}
              <div className="lg:col-span-2 space-y-4 ">
                <Link href="/">
                  <Image
                    src="/Logo.png"
                    alt="Matra Kosala"
                    width={150}
                    height={100}
                  />
                </Link>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaWhatsapp className="h-4 w-4 " />{" "}
                    {/* Message icon, often used for WhatsApp */}
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Whatsapp</p>
                      <p className="text-sm ">0856-9709-3044</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 " />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Call Center</p>
                      <p className="text-sm ">(021) 2253 7845</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 " />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm ">matrakosala@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4  mt-1" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Alamat</p>
                      <p className="text-sm ">
                        Jl. Raya Kb. Jeruk No.10 4,
                        <br />
                        Kb. Jeruk, Kota Jakarta Barat
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Umum */}
              <div className="space-y-4  mt-6 ">
                <h3 className="font-medium">Umum</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/artikel" className="text-sm ">
                      Berita Matra Kosala
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile" className="text-sm">
                      Profil Perusahaan
                    </Link>
                  </li>
                  <li>
                    <Link href="/jasakonstruksi" className="text-sm">
                      Layanan Kami
                    </Link>
                  </li>
                  <li>
                    <Link href="/material" className="text-sm">
                      Pengadaan Material <br />{" "}
                      <span className="font-medium">(segera)</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Informasi */}
              <div className="space-y-4  mt-6 ">
                <h3 className="font-medium">Informasi</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#faq" className="text-sm">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://wa.me/6285697093044?text=Halo,%20saya%20tertarik%20untuk%20membahas%20kemitraan%20dengan%20Matra%20Kosala.%20Bisakah%20saya%20mendapatkan%20informasi%20lebih%20lanjut?"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Kemitraan
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Ketentuan & Social Media */}
              <div className="space-y-4 mt-6 ">
                <div className="space-y-4">
                  <h3 className="font-medium">Ikuti Kami di</h3>
                  <div className="flex space-x-4">
                    <Link
                      href="https://www.instagram.com/matrakosala.id/"
                      className="/70"
                    >
                      <Instagram className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="/70">
                      <Facebook className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="/70">
                      <Linkedin className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="/70">
                      <FaTiktok className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-8 text-center">
              <p className="text-sm ">
                © 2024 PT. Matrakosala Digdaya. All Rights Reserved
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
