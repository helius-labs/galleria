import React, { Suspense } from "react";
import Link from "next/link";
import { LinkIcon } from "@heroicons/react/24/outline";

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

  const tokenDetails = [
    { type: "Mint", value: mint },
    { type: "Owner", value: ownerAddress },
  ];

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-clip rounded-xl bg-black/90 p-2 text-white shadow-xl backdrop-blur-md sm:p-2">
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
      <section>
        <div className="mx-4 flex flex-col justify-evenly gap-x-4 break-words sm:flex-row">
          <div className="sm:w-1/2">
            <Suspense
              fallback={<div>Loading...</div>}
              key={searchParams.details}
            >
              <a href={imageSrc} target="_blank" rel="noopener noreferrer">
                <img src={imageSrc} alt={title} className={`rounded-xl`} />
              </a>
            </Suspense>
          </div>
          <div className="w-full sm:w-1/2">
            <div className="break-words">
              <p className="mb-4 border-b border-white/50 pb-1 text-2xl font-bold">
                Details
              </p>
              <ul>
                {/* Flex container for each detail item with content justified between */}
                {tokenDetails.map((detail) => (
                  <li
                    key={detail.type}
                    className="my-1 flex items-center justify-between"
                  >
                    <p className="text-lg font-bold">{detail.type}</p>
                    {/* JavaScript slice method to show only the first 3 and last 4 characters of the ownerAddress */}
                    <a
                      href={`https://xray.helius.xyz/${
                        detail.type === "Mint" ? "token" : "account"
                      }/${detail.value}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary transition-colors duration-200 ease-in-out hover:text-white"
                    >
                      {`${detail.value.slice(0, 3)}...${detail.value.slice(
                        -4,
                      )}`}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-1 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
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
      </section>
    </div>
  );
};

export default TokenDetails;
