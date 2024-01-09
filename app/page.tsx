"use client";
import { sendToNative } from "@/utils/platform";
import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";

const Standings = dynamic(() => import("./components/Standings"), {
  ssr: false,
});

export default function Home() {
  const [test, setTest] = useState(0);

  useEffect(() => {
    setTest(10000);
    sendToNative({
      method: "showToast",
      data: {
        content: "showToast",
        type: 1,
      },
    });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Script
        src="https://unpkg.com/vconsole/dist/vconsole.min.js"
        onLoad={() => {
          if (typeof window !== undefined) new (window as any).VConsole();
        }}
      />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
      </div>
      {typeof window !== undefined ? <div>is window {window ? 1 : 0}</div> : <div>not window</div>}
      <Button
        onClick={() => {
          setTest(test + 1);
          sendToNative({
            method: "showToast",
            data: {
              content: "showToast",
              type: 1,
            },
          });
        }}
      >
        Click me
      </Button>
      <Standings></Standings>
      <div>{test}</div>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert" src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
      </div>
    </main>
  );
}
