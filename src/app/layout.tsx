import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | 11 Klassiekers",
    default: "11 Klassiekers",
  },
  description: "wielerpronostiek voor 11 voorjaarsklassiekers",
  applicationName: "11 klassiekers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-be" suppressHydrationWarning>
      <body className={`${inter.className} `}>
        <Providers>
          <div className="h-dvh bg-home-img bg-cover bg-center">
            <div className="flex flex-col w-full lg:max-w-7xl mx-auto h-full">
              <Header />
              <div className="flex grow px-2 py-2 my-2 bg-white/40 rounded-xl text-black dark:bg-black/40 dark:text-white">{children}</div>

              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
