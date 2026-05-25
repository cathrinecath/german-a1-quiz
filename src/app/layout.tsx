import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "@/styles/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "German A1 Quiz",
  description: "Learn basic German vocabulary through a focused quiz.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="bg-bg-app text-text-body font-sans min-h-screen flex justify-center">
        <main className="w-full max-w-[390px] px-5 py-6 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
