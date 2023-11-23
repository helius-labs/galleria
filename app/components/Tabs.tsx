"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Tabs = () => {
  const router = useRouter();

  const handleTabClick = (tabName: string) => {
    window.location.hash = tabName.toLowerCase();
  };

  return (
    <div className="flex items-center justify-center">
      <nav className="flex w-full">
        <div
          onClick={() => handleTabClick("Overview")}
          className="mr-4 flex-1 cursor-pointer rounded-lg bg-neutral px-4 py-2 text-center font-bold text-white hover:bg-neutral-500"
        >
          Overview
        </div>
        <div
          onClick={() => handleTabClick("Tokens")}
          className="mx-4 flex-1 cursor-pointer rounded-lg bg-neutral px-4 py-2 text-center font-bold text-white hover:bg-neutral-500"
        >
          Tokens
        </div>
        <div
          onClick={() => handleTabClick("NFTs")}
          className="ml-4 flex-1 cursor-pointer rounded-lg bg-neutral px-4 py-2 text-center font-bold text-white hover:bg-neutral-500"
        >
          NFTs
        </div>
      </nav>
    </div>
  );
};

export default Tabs;
