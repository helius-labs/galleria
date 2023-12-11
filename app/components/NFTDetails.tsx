"use server";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { NonFungibleToken } from "@/app/types";

interface NFTImageProps {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface NFTDetails {
  searchParams: string;
  walletAddress: string;
  nftData: NonFungibleToken[];
}

const NFTImage = ({ src, width, height, alt }: NFTImageProps) => {
  const loader = () => src;

  return (
    <a href={src} target="_blank" rel="noopener noreferrer">
      <Image
        loader={loader}
        src={src}
        width={width}
        height={height}
        alt={alt}
        className="rounded-xl"
      />
    </a>
  );
};

const NFTDetails = ({ searchParams, walletAddress, nftData }: NFTDetails) => {
  const imageSrc = nftData[0]?.content?.links?.image || "/noImg.svg";
  const title = nftData[0].content.metadata.name;
  const description = nftData[0].content.metadata.description;
  const mint = nftData[0].id;
  const ownerAddress = nftData[0].ownership.owner;
  const royaltyPercentage = nftData[0].royalty.percent;

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
              {/* <a href={imageSrc} target="_blank" rel="noopener noreferrer">
                <img
                  // loader={loader}
                  src={imageSrc}
                  // width="90"
                  // height="90"
                  alt={title}
                  className={`rounded-xl`}
                />
              </a> */}
              <NFTImage
                src={imageSrc}
                width={200}
                height={200}
                alt={title}
              />
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
                  href={"https://xray.helius.xyz/token/" + mint}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <p className="text-base">{`${ownerAddress.slice(
                    0,
                    3,
                  )}...${ownerAddress.slice(-4)}`}</p>
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
                  <p className="font-normal text-blue-500">{` ${mint.slice(
                    0,
                    3,
                  )}...${mint.slice(-4)}`}</p>
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
            <div className="mt-5 break-words">
              <div className="mt-2 space-y-2">
                <p className="text-lg font-bold">Creators:</p>
                <hr className="my-2 border-gray-600" />
                {nftData[0].creators.map((creator, index) => (
                  <div key={index} className="rounded-lg bg-neutral-700 p-4">
                    <p className="flex items-center text-base">
                      <span className="font-bold">Address:</span>
                      <a
                        href={`https://xray.helius.xyz/token/${creator.address}?network=mainnet`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="ml-2 transition-colors duration-200 ease-in-out hover:text-primary"
                      >
                        <div className="flex items-center">
                          <span className="mr-1">{creator.address}</span>
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
                    </p>
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
            <div className="my-3">
              <p className="text-xl font-bold">Attributes:</p>
              <hr className="my-2 border-gray-600" />
              <div className="grid auto-rows-auto grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {nftData[0].content.metadata?.attributes &&
                nftData[0].content.metadata.attributes.length > 0 ? (
                  nftData[0].content.metadata.attributes.map(
                    (attribute, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center rounded-lg bg-neutral-700 p-4"
                      >
                        <p className="break-words text-sm font-semibold">
                          {attribute.trait_type}
                        </p>
                        <div className=" w-full overflow-x-auto break-words">
                          <p className="break-words text-center text-lg">
                            {attribute.value}
                          </p>
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <p>No attributes available.</p>
                )}
              </div>
            </div>

            {nftData[0].compression.compressed && (
              <div className="my-3 break-words">
                <p className="text-xl font-bold">Compression Details:</p>
                <hr className="my-2  border-gray-600" />
                <p>Data Hash: {nftData[0].compression.data_hash}</p>
                <p>Creator Hash: {nftData[0].compression.creator_hash}</p>
                <p>Asset Hash: {nftData[0].compression.asset_hash}</p>
                <p>Tree: {nftData[0].compression.tree}</p>
                <p>Seq: {nftData[0].compression.seq}</p>
                <p>Leaf ID: {nftData[0].compression.leaf_id}</p>
              </div>
            )}
            {nftData[0].spl20 && (
              <div className="my-3 break-words">
                <p className="text-xl font-bold">SPL20 Details:</p>
                <hr className="my-2 border-gray-600" />
                <p>SPL-20: {nftData[0].spl20.p}</p>
                <p>Operation: {nftData[0].spl20.op}</p>
                <p>Ticker: {nftData[0].spl20.tick}</p>
                <p>Amount: {nftData[0].spl20.amt}</p>
              </div>
            )}

            {nftData[0].inscription && (
              <div className="my-3 break-words">
                <p className="text-xl font-bold">Inscription Details:</p>
                <hr className="my-2 border-gray-600" />
                <p>Order: {nftData[0].inscription.order}</p>
                <p>Size: {nftData[0].inscription.size}</p>
                <p>Content Type: {nftData[0].inscription.contentType}</p>
                <p>Encoding: {nftData[0].inscription.encoding}</p>
                <p>Validation Hash: {nftData[0].inscription.validationHash}</p>
                <p>
                  Inscription Data Account:{" "}
                  {nftData[0].inscription.inscriptionDataAccount}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetails;
