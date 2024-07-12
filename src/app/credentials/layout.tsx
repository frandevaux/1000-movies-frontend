"use client";

import { Viewport } from "next";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="fixed h-screen overflow-scroll overscroll- ">
      {children}
    </div>
  );
}
