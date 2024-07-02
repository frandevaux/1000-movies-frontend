"use client";

import { useRouter } from "next/navigation";
import { Cartelera } from "../components/cartelera";
import { OptionButtonGroup } from "../components/optionButtonGroup";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <>
      {children}

      <OptionButtonGroup router={router} />
    </>
  );
}
