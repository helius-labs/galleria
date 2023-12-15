"use client";

import React, { Suspense } from "react";
import Link from "next/link";

import { NonFungibleToken } from "@/app/types";

interface NFTDetails {
  searchParams: string;
  walletAddress: string;
  nftData: NonFungibleToken[];
}

const NFTDetails = ({ searchParams, walletAddress, nftData }: NFTDetails) => {
  const imageSrc = nftData[0]?.content?.links?.image || "/noImg.svg";
  const title = nftData[0].content.metadata.name;
  const description = nftData[0].content.metadata.description;
  const mint = nftData[0].id;
  const ownerAddress = nftData[0].ownership.owner;
  const royaltyPercentage = nftData[0].royalty.percent;

  React.useEffect(() => {
    console.log(nftData[0].compression);
  }, []);

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-clip rounded-lg bg-neutral-800 p-2 text-white shadow-glow sm:p-2">
      <div className="relative">
        <Link href={`/portfolio/${walletAddress}?${searchParams.toString()}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="absolute right-0 top-0 h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>
        <h1 className="m-2 p-3 text-3xl font-bold">{title}</h1>
      </div>

      <div>
        <div className="flex flex-col justify-evenly break-words sm:flex-row">
          <div className="w-full p-3 sm:w-1/2">
            <Suspense fallback={<div>Loading...</div>} key={searchParams}>
              <a href={imageSrc} target="_blank" rel="noopener noreferrer">
                <img src={imageSrc} alt={title} className={`rounded-xl`} />
              </a>
            </Suspense>
          </div>
          <div className="mx-2 w-full p-3 sm:w-1/2">
            <div>
              <p className="text-2xl font-bold">Description:</p>
              <hr className="my-2 border-gray-600" />
              <p className="text-lg">{description}</p>
            </div>
            <div className="mt-5 break-words">
              <p className="py-1 text-2xl font-bold">Details:</p>
              <hr className="my-1 border-gray-600" />

              {/* Flex container for each detail item with content justified between */}
              <div className="my-1 flex items-center justify-between">
                <p className="text-lg font-bold">Owner:</p>
                {/* JavaScript slice method to show only the first 3 and last 4 characters of the ownerAddress */}
                <a
                  href={"https://xray.helius.xyz/account/" + ownerAddress}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500"
                >
                  <p className="mr-1 text-base ">{`${ownerAddress.slice(
                    0,
                    3,
                  )}...${ownerAddress.slice(-4)}`}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                </a>
              </div>

              {/* Flex container for each detail item with content justified between */}
              <div className="my-1 flex items-center justify-between">
                <p className="text-lg font-bold">Mint:</p>
                {/* Anchor tag is kept within the flex container for layout purposes */}
                <a
                  href={"https://xray.helius.xyz/token/" + mint}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500"
                >
                  {/* JavaScript slice method to show only the first 3 and last 4 characters of the mint */}
                  <p className="mr-1 font-normal text-blue-500">{` ${mint.slice(
                    0,
                    3,
                  )}...${mint.slice(-4)}`}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                </a>
              </div>
              <div className="my-1 flex items-center justify-between">
                <p className="text-lg font-bold">Royalties:</p>
                <p className="font-normal text-white">
                  {royaltyPercentage * 100}%
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mx-4 w-full p-3">
            {/* Creators */}
            <div className="mt-5 break-words">
              <div className="mt-2 space-y-2">
                <p className="text-lg font-bold">Creators:</p>
                <hr className="my-2 border-gray-600" />

                {nftData[0].creators.map((creator, index) => (
                  <div key={index} className="rounded-lg bg-neutral-700 p-4">
                    <div className="flex items-center text-base">
                      <span className="font-bold">Address:</span>
                      <a
                        href={`https://xray.helius.xyz/account/${creator.address}?network=mainnet`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="ml-2 transition-colors duration-200 ease-in-out hover:text-primary"
                      >
                        <div className="flex items-center  text-blue-500">
                          <p className="mr-1 text-base ">{`${creator.address.slice(
                            0,
                            3,
                          )}...${creator.address.slice(-4)}`}</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                            />
                          </svg>
                        </div>
                      </a>
                    </div>
                    <p className="text-base">
                      <span className="font-bold">Share:</span>
                      <span className="ml-2">{creator.share}</span>
                    </p>
                    <p className="text-base">
                      <span className="font-bold">Verified:</span>
                      <span className="ml-2">
                        {creator.verified ? "Yes" : "No"}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Attributes */}
            <div className="my-3">
              <p className="text-xl font-bold">Attributes:</p>
              <hr className="my-2 border-gray-600" />

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {nftData[0].content.metadata?.attributes.map(({ trait_type, value }, index) => {
                  if (value !== null && value !== undefined && value !== "") {
                    return (
                      <>
                        <div className="col-span-1 w-full overflow-hidden rounded-lg bg-gray-700/20 p-4 shadow ring-1 ring-inset ring-white/30">
                          <dt className="truncate text-sm font-semibold text-gray-300">
                            {trait_type}
                          </dt>
                          <dd className="font-base mt-2 text-xl tracking-tight text-white">
                            {value}
                          </dd>
                        </div>
                      </>
                    );
                  }
                })}
              </div>
            </div>

            {/* Compression Details */}
            {nftData[0].compression.compressed && (
              <div className="my-3 overflow-x-scroll break-words">
                <p className="text-xl font-bold">Compression Details:</p>
                <hr className="my-2  border-gray-600" />

                {Object.entries(nftData[0].compression).map(([key, value]) => {
                  if (value !== null && value !== undefined && value !== "") {
                    return (
                      <div key={key} className="flex items-center py-2">
                        <p className="flex items-center justify-center rounded-md bg-gray-700/20 px-3 py-2 text-sm font-medium text-gray-300 ring-1 ring-inset ring-white/30">
                          {key}
                        </p>
                        <p className="ml-2">{value}</p>
                      </div>
                    );
                  }
                })}
              </div>
            )}

            {/* SPL20 Details */}
            {nftData[0].spl20 && (
              <div className="my-3 break-words">
                <p className="text-xl font-bold">SPL20 Details:</p>
                <hr className="my-2 border-gray-600" />

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {Object.entries(nftData[0].spl20).map(([key, value]) => {
                    if (value !== null && value !== undefined && value !== "") {
                      return (
                        <>
                          <div className="col-span-1 w-full overflow-hidden rounded-lg bg-gray-700/20 p-4 shadow ring-1 ring-inset ring-white/30">
                            <dt className="truncate text-sm font-semibold text-gray-300">
                              {key}
                            </dt>
                            <dd className="font-base mt-2 text-xl tracking-tight text-white">
                              {value}
                            </dd>
                          </div>
                        </>
                      );
                    }
                  })}
                </div>
              </div>
            )}

            {/* Inscription Details */}
            {nftData[0].inscription && (
              <div className="my-3 break-words">
                <p className="text-xl font-bold">Inscription Details:</p>
                <hr className="my-2 border-gray-600" />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {Object.entries(nftData[0].inscription).map(
                    ([key, value]) => {
                      if (
                        value !== null &&
                        value !== undefined &&
                        value !== ""
                      ) {
                        return (
                          <>
                            <div className="col-span-1 w-full overflow-hidden rounded-lg bg-gray-700/20 p-4 shadow ring-1 ring-inset ring-white/30">
                              <dt className="truncate text-sm font-semibold text-gray-300">
                                {key}
                              </dt>
                              <dd className="font-base mt-2 text-xl tracking-tight text-white">
                                {value}
                              </dd>
                            </div>
                          </>
                        );
                      }
                    },
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetails;
