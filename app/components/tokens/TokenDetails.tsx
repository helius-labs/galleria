import React, { Suspense } from "react";
import Link from "next/link";

import { FungibleToken, MintExtensions } from "@/app/types";

type MintExtensionValue = string | number | boolean | NestedMintExtensionObject;

interface NestedMintExtensionObject {
  [key: string]: MintExtensionValue;
}

interface TokenDetailsProps {
  searchParams: { view: string; details: string };
  walletAddress: string;
  tokenData: FungibleToken[];
}

const TokenDetails = ({
  searchParams,
  walletAddress,
  tokenData,
}: TokenDetailsProps) => {
  const imageSrc = tokenData[0]?.content?.links?.image || "/noImg.svg";
  const title = tokenData[0]?.content?.metadata.name;
  const mint = tokenData[0].id;
  const ownerAddress = tokenData[0].ownership.owner;

  const renderMintExtensionDetails = (
    mintExtension: MintExtensions,
    indentLevel = 0,
  ) => {
    if (!mintExtension) return null;

    const renderValue = (value: any, key: string, indent: number) => {
      if (typeof value === "object" && value !== null) {
        if (indent === 0) {
          return (
            <div className="w-full border-gray-600">
              <p className="bg-gray-700/20px-3 flex w-40 justify-center rounded-md py-1.5 text-sm font-medium text-gray-300 ring-1 ring-inset ring-white/30">
                {key}
              </p>
              <div className="mt-2 border-l border-dashed border-gray-600">
                {Object.entries(value).map(([innerKey, innerValue]) =>
                  renderValue(innerValue, innerKey, indent + 1),
                )}
              </div>
            </div>
          );
        } else {
          return (
            <div
              className="mt-4 w-full  border-gray-600"
              style={{ paddingLeft: `${indent * 20}px` }}
            >
              <p className="w-40 flex justify-center rounded-md bg-gray-700/20px-3 py-1.5 text-sm font-medium text-gray-300 ring-1 ring-inset ring-white/30">
                {key}
              </p>
              <div className="mt-2 border-l border-dashed border-gray-600">
                {Object.entries(value).map(([innerKey, innerValue]) =>
                  renderValue(innerValue, innerKey, indent + 1),
                )}
              </div>
            </div>
          );
        }
      } else {
        return (
          <p
            className="flex w-full items-center overflow-scroll py-1 leading-7"
            style={{ paddingLeft: `${indent * 20}px` }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-1 h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            <span className="font-base text-sm text-gray-400">{key}:</span>
            <span className="ml-1 text-sm font-normal">{` ${value}`}</span>
          </p>
        );
      }
    };

    return Object.entries(mintExtension).map(([key, value]) =>
      renderValue(value, key, indentLevel),
    );
  };

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-clip rounded-lg bg-neutral-800 p-2 text-white sm:p-2">
    {/* <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"> */}
      {/* Header */}
      <div className="relative">
        <Link href={`/portfolio/${walletAddress}?view=${searchParams.view}`}>
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

      {/* Body */}
      <div>
        <div className="flex flex-col justify-evenly break-words sm:flex-row">
          <div className="w-full p-3 sm:w-1/2">
            <Suspense
              fallback={<div>Loading...</div>}
              key={searchParams.details}
            >
              <a href={imageSrc} target="_blank" rel="noopener noreferrer">
                <img src={imageSrc} alt={title} className={`rounded-xl`} />
              </a>
            </Suspense>
          </div>
          <div className="w-full px-3 py-2 sm:w-1/2">
            <div className="mt-5 break-words">
              <p className="py-2 text-2xl font-bold">Details</p>
              <hr className="my-2 border-gray-600" />

              {/* Flex container for each detail item with content justified between */}
              <div className="my-1 flex items-center justify-between">
                <p className="text-lg font-bold">Owner</p>
                {/* JavaScript slice method to show only the first 3 and last 4 characters of the ownerAddress */}
                <a
                  href={"https://xray.helius.xyz/account/" + ownerAddress}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <p className="text-base text-blue-500">{`${ownerAddress.slice(
                    0,
                    3,
                  )}...${ownerAddress.slice(-4)}`}</p>
                </a>
              </div>

              {/* Flex container for each detail item with content justified between */}
              <div className="my-1 flex items-center justify-between">
                <p className=" text-lg font-bold">Mint</p>
                {/* Anchor tag is kept within the flex container for layout purposes */}
                <a
                  href={"https://xray.helius.xyz/token/" + mint}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  {/* JavaScript slice method to show only the first 3 and last 4 characters of the mint */}
                  <p className="font-normal text-blue-500">{` ${mint.slice(
                    0,
                    3,
                  )}...${mint.slice(-4)}`}</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Token 22 Details */}
        <div className="flex justify-center">
          <div className="mx-4 w-full p-3">
            {tokenData[0].mint_extensions && (
              <div className="my-3 break-words">
                <p className="text-2xl font-bold">Token2022 Extensions</p>
                <hr className="my-2 border-gray-600" />
                {renderMintExtensionDetails(tokenData[0].mint_extensions)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
