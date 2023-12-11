"use client";

import React, { useState } from "react";

import { WalletInput } from "@/app/components";
import { classNames } from "@/app/utils";

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <a
        href="/"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative inline-block w-10 cursor-pointer md:w-1/3"
      >
        <picture>
          {/* Mobile logo: shown on screens smaller than 768px */}
          <source
            media="(max-width: 767px)"
            srcSet="/helius-logos/mobile-logo.svg"
          />

          {/* Default logo: shown on larger screens */}
          <img
            src="/helius-logos/desktop-logo.svg"
            alt="Helius Logo"
            className={`transition-opacity duration-200 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src="/helius-logos/desktop-logo-hover.svg"
            alt="Helius Hover Logo"
            className={`absolute left-0 top-0 transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </picture>
      </a>
    </>
  );
};

const DASHyperLink = ({ className }: { className: string; }) => {
  return (
    <>
      <div className="group hidden sm:block">
        <a
          href="https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api"
          target="_blank"
          rel="noopener noreferrer"
          className={classNames(
            "flex h-[30px] items-center rounded-full border border-white border-opacity-20 bg-opacity-25 px-3 transition-all duration-200 ease-in-out hover:bg-black/25 group-hover:border-opacity-60 group-hover:bg-opacity-75",
            className,
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 opacity-70 transition-all duration-200 ease-in-out group-hover:opacity-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>

          <span className="ml-2 text-sm font-light text-white opacity-70 transition-all duration-200 ease-in-out group-hover:opacity-100">
            Powered by DAS API
          </span>
        </a>
      </div>
    </>
  );
};

const NavBar = () => {
  return (
    <>
      <nav className="flex w-full items-center justify-between bg-black bg-opacity-50 px-4 py-4 sm:px-10 md:h-20">
        <div className="flex items-center">
          <Logo />
          <DASHyperLink className="ml-6" />
        </div>

        <div className="flex items-center">
          <WalletInput source={"navBar"} />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
