export const metadata = {
  title: "Matra Kosala | Material",
  description:
    "Penyedia material konstruksi berkualitas tinggi dari PT Matra Kosala Digdaya — mendukung setiap proyek dengan bahan terbaik dan terpercaya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
