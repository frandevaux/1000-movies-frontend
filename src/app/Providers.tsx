"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <SessionProvider>{children}</SessionProvider>
    </NextUIProvider>
  );
}
