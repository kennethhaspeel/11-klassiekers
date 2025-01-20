import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, getPermissions } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  const auths = await getPermissions();
  return (
    <html lang="nl-be" suppressHydrationWarning>
      <body className={`${inter.className} `}>
        <Providers>
          <div className="h-dvh bg-home-img bg-cover bg-center">
            <div className="flex flex-col w-full lg:max-w-7xl mx-auto h-full">
              <Header authenticated={authenticated}
                rechten={auths?.permissions}/>
              <div className="flex grow px-2 py-2 my-2 bg-white/40 rounded-xl text-black dark:bg-black/40 dark:text-white">{children}</div>

              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
