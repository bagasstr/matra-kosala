export const metadata = {
  title: "Matra Kosala | Profile",
  description:
    "Profil PT Matra Kosala Digdaya — perusahaan yang bergerak di bidang perencanaan wilayah, konstruksi, dan pengembangan SDM dengan komitmen terhadap kualitas dan profesionalisme.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
