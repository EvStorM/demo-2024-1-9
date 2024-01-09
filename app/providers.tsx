// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import Script from "next/script";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Script
        src="https://unpkg.com/vconsole/dist/vconsole.min.js"
        onLoad={() => {
          if (typeof window !== undefined) new (window as any).VConsole();
        }}
      />
      {children}
    </NextUIProvider>
  );
  // return <>{children}</>;
}
