import type { Metadata } from "next";
import { Cairo, Amiri } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-sans",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "كشك النهاردة | Koshk El-Naharda",
  description:
    "كشكك الرقمي المصري - أخبار، نكت، أمثال شعبية، وميمز كل يوم الصبح",
  keywords: ["كشك", "مصر", "نكت", "أمثال", "ميمز", "أخبار"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-[var(--color-koshk-cream)]">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
