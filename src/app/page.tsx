"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/movies");
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);
}
