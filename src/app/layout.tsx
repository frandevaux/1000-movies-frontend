import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Button, ButtonGroup, Divider } from "@nextui-org/react";
import { Providers } from "./Providers";
import { IoIosStar } from "react-icons/io";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Cartelera",
  description: "1000 pelis para ver antes de morir",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon512_maskable.png",
  },
};
export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>1000 Películas</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </Head>
      <html
        lang="en"
        className="fixed h-[100vh] w-screen overflow-hidden overscroll-none"
      >
        <body>
          <Providers>
            <main className="min-h-screen flex justify-between flex-col dark text-xl  ">
              {children}
            </main>
          </Providers>
        </body>
      </html>
    </>
  );
}
