import React from "react";

import { WalletInput } from "@/app/components";
import { classNames } from "@/app/utils";

const Hero = () => {
  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <a
        href="https://github.com/owenventer/galleria"
        target="_blank"
        rel="noopener noreferrer"
        className="group mb-8 flex justify-center"
      >
        <div className="relative flex items-center rounded-full border border-white border-opacity-20 bg-opacity-25 px-3 py-1 text-sm leading-6 text-white transition-all duration-200 ease-in-out hover:bg-black/10 group-hover:border-opacity-60 group-hover:bg-opacity-75">
          Read the open source repository{" "}
          <span className="mx-2 h-4 border-l border-white/20" />
          <div className="flex items-center font-semibold text-accent">
            <span className="absolute inset-0" aria-hidden="true" />
            View GitHub
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-1 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </div>
        </div>
      </a>

      <div className="text-center">
        <h1 className="bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-5xl font-bold tracking-tighter text-transparent sm:text-7xl/none">
          Galleria
        </h1>
        <p className="mt-6 text-base leading-8 text-gray-300 sm:text-lg">
          Introducing the Helius Digital Asset Standard (DAS) API — the easiest
          and fastest way to query token and NFT data on Solana
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <WalletInput source={"hero"} />
        </div>

        {/* Helius hyperlink section */}
        <div className="mt-16">
          <a
            href="https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-x-3 rounded-full bg-indigo-100/5 px-3 py-1 text-sm font-semibold leading-6 text-accent ring-1 ring-inset ring-accent/10 transition duration-200 ease-in-out group-hover:ring-accent/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4 opacity-80 transition-all duration-200 ease-in-out group-hover:opacity-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>

            <span className="opacity-80 transition-all duration-200 ease-in-out group-hover:opacity-100">
              What&apos;s DAS API?
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-1 h-3 w-3 opacity-80 transition-all duration-200 ease-in-out group-hover:opacity-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const DASHyperLink = ({ className }: { className?: string }) => {
  return (
    <>
      <div className="group hidden sm:block">
        <a
          href="https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api"
          target="_blank"
          rel="noopener noreferrer"
          className={classNames(
            "flex h-[30px] items-center rounded-full border border-white border-opacity-20 bg-opacity-25 px-2 transition-all duration-200 ease-in-out hover:bg-black/25 group-hover:border-opacity-60 group-hover:bg-opacity-75",
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

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-1 h-3 w-3 opacity-70 transition-all duration-200 ease-in-out group-hover:opacity-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </a>
      </div>
    </>
  );
};

export default Hero;
