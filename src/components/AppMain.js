"use client";

import { usePathname } from "next/navigation";

export default function AppMain({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main className={isHome ? undefined : "with-header-offset"}>
      {children}
    </main>
  );
}
