"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useAtom } from "jotai";
import { buttonCompro } from "@/hooks/jotaiHooks";
import { ArrowDown, ArrowDownToLineIcon } from "lucide-react";
import { clientEnv } from "@/lib/client";

interface FormData {
  name: string;
  institution: string;
  whatsapp: string;
  email: string;
}

export default function ModalCompro() {
  const [isOpen, setIsOpen] = useAtom(buttonCompro);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    institution: "",
    whatsapp: "",
    email: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    }

    if (!formData.institution.trim()) {
      newErrors.institution = "Instansi wajib diisi";
    }

    const whatsappRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (!whatsappRegex.test(formData.whatsapp.replace(/[- .]/g, ""))) {
      newErrors.whatsapp = "Format nomor WhatsApp tidak valid";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowThankYou(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch(`${clientEnv.API_URL}/modal/compro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Gagal mengirimkan data");
        }
      }
      // Show thank you modal
      setIsOpen(false);
      setShowThankYou(true);

      // Set flag in localStorage
      localStorage.setItem("modalShown", "true");
    } catch (error: any) {
      console.error("Terjadi kesalahan:", error.message);
      alert("Gagal mengirim data. Silakan coba lagi.");
    }
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) handleClose();
          setIsOpen(open);
        }}
      >
        <DialogContent className="max-w-sm w-full rounded-sm h-[80vh] my-auto overflow-y-scroll lg:max-w-xl">
          <DialogHeader className="">
            <DialogTitle className="text-center bg-primary-light text-white text-2xl py-2 rounded-sm uppercase">
              Kuota Terbatas!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center bg-primary-accent py-4 px-2 text-primary-dark space-y-4">
            <p className="text-xs">
              Unduh Company Profile kami untuk akses informasi lebih detail, dan
              dapatkan bonus eksklusif berupa konsultasi gratis selama 30 menit.
            </p>
            <p className="text-xs">
              Dengan informasi yang komprehensif dan up-to-date, Anda akan lebih
              siap untuk memulai proyek pertama Anda bersama kami
            </p>
          </div>
          <h4 className="font-medium text-center text-sm">
            Terbatas untuk 100 unduhan pertama, Slot Konsultasi Gratis selama 30
            menit !
          </h4>
          <p className="opacity-80 text-sm text-center">
            Isi form di bawah ini untuk mengakses company profile kami secara
            eksklusif !
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mt-10">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
                placeholder="Masukkan nama lengkap"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="institution">Instansi</Label>
              <Input
                id="institution"
                name="institution"
                type="text"
                required
                value={formData.institution}
                onChange={handleChange}
                className={errors.institution ? "border-red-500" : ""}
                placeholder="Masukkan nama instansi"
              />
              {errors.institution && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.institution}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                value={formData.whatsapp}
                onChange={handleChange}
                className={errors.whatsapp ? "border-red-500" : ""}
                placeholder="Contoh: 08123456789"
              />
              {errors.whatsapp && (
                <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
                placeholder="Masukkan alamat email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex justify-end lg:justify-center gap-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="border-2 border-primary-dark text-primary-dark bg-opacity-50 hover:bg-primary-content hover:border-primary-content hover:text-white font-medium rounded-sm"
                onClick={handleClose}
              >
                Tutup
              </Button>
              <Button
                type="submit"
                className="bg-primary-dark font-medium hover:bg-primary-content rounded-sm"
              >
                <ArrowDownToLineIcon />
                Download Compro
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Thank you modal */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="max-w-sm w-full rounded-sm h-[80vh] my-auto overflow-y-scroll lg:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-center bg-primary-accent text-primary-dark text-2xl py-2 rounded-sm uppercase">
              PERMINTAAN TERKIRIM
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="w-[80%] mx-auto">
              <Image
                src="/Union.svg"
                alt="Union"
                width={100}
                className="py-8"
                height={100}
              />
            </div>
            <p className="text-primary-light text-xl font-bold">
              PERJALANAN ANDA DIMULAI
            </p>
            <div className="bg-primary-accent p-4 space-y-4 font-normal text-sm text-primary-dark leading-relaxed subpixel-antialiased">
              <p className="">
                Permintaan Anda telah masuk kedalam sistem kami.{" "}
                <span className="font-semibold">
                  Dalam waktu 24 jam ke depan
                </span>
                , salah satu konsultan kami akan menghubungi Anda melalui
                WhatsApp untuk menjadwalkan{" "}
                <span className="font-semibold">konsultasi gratis</span>.
              </p>
              <p className="">
                Selama menunggu, Anda dapat melihat-lihat berbagai proyek yang
                telah kami kerjakan di
                <Link
                  href={"/portofolio"}
                  className="font-semibold decoration-solid decoration-primary-dark underline underline-offset-2 decoration-2"
                >
                  [link ke portofolio]
                </Link>
                .
              </p>
              <p className="">
                Kami akan mendengarkan visi Anda, memberikan saran yang sesuai,
                dan menyusun rencana proyek yang detail.{" "}
              </p>
            </div>
            <h3 className="text-sm font-bold antialiased opacity-95">
              TERIMAKASIH, SEMOGA SUKSES SELALU MENYERTAI ANDA
            </h3>
          </div>
          <Button
            type="button"
            variant="outline"
            className="border-2 bg-transparent border-primary-dark text-primary-dark hover:bg-primary-content hover:border-primary-content hover:text-white font-medium rounded-sm w-fit mx-auto"
            onClick={handleClose}
          >
            Tutup
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
