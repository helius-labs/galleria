import React from "react";

import { WalletInput } from "@/app/components";

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
              <div
                className="flex items-center font-semibold text-accent"
              >
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
          <h1 className="bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-7xl/none">
            Galleria
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Introducing the Helius Digital Asset Standard (DAS) API — the
            easiest and fastest way to query token and NFT data on Solana
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <WalletInput source={"hero"} />
          </div>

          {/* Helius hyperlink section */}
          <div className="mt-16">
            <a
              href="https://www.helius.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex space-x-6"
            >
              <span className="rounded-full bg-indigo-100/5 px-3 py-1 text-sm font-semibold leading-6 text-accent ring-1 ring-inset ring-accent/10 transition duration-200 ease-in-out group-hover:ring-accent/30">
                What&apos;s Helius?
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300 transition duration-200 ease-in-out group-hover:text-white">
                <span>Learn More</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-300 transition duration-200 ease-in-out group-hover:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    );
};

export default Hero;