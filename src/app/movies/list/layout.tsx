"use client";

import { Cartelera } from "@/app/components/cartelera";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return <>{children}</>;
}
