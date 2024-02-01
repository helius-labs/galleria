import React from "react";

import { WalletInput } from "@/app/components";
import { classNames } from "@/app/utils";

const Hero = () => {
  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <a
        href="https://github.com/helius-labs/galleria"
        target="_blank"
        rel="noopener noreferrer"
        className="group mb-8 flex justify-center"
      >
        <div className="relative flex items-center rounded-full border border-white border-opacity-20 bg-opacity-25 px-4 py-1 text-xs leading-6 text-white transition-all duration-200 ease-in-out hover:bg-black/10 group-hover:border-opacity-60 group-hover:bg-opacity-75 sm:px-3 sm:text-sm">
          Read the open source code{" "}
          <span className="mx-2 h-4 border-l border-white/20" />
          <div className="flex items-center font-semibold text-accent">
            <span className="absolute inset-0" aria-hidden="true" />
            View Source
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 30 30"
              style={{ fill: "#ffffff" }}
              className="ml-2 h-5 w-5"
            >
              <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
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
            className="group inline-flex items-center gap-x-3 rounded-full bg-indigo-100/5 px-3 py-1 text-sm font-semibold leading-6 text-accent ring-1 ring-inset ring-accent/10 transition duration-200 ease-in-out hover:ring-accent/30"
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
