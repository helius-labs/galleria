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

  const nftDetails = [
    { type: "Mint", value: mint },
    { type: "Owner", value: ownerAddress },
    { type: "Royalty", value: royaltyPercentage },
  ];

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-clip rounded-xl bg-black/90 p-2 text-white shadow-xl backdrop-blur-md sm:p-2">
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
        <div className="mx-4 flex flex-col justify-evenly gap-x-4 break-words sm:flex-row">
          <div className="w-full sm:w-1/2">
            <Suspense fallback={<div>Loading...</div>} key={searchParams}>
              <a href={imageSrc} target="_blank" rel="noopener noreferrer">
                <img src={imageSrc} alt={title} className={`rounded-xl`} />
              </a>
            </Suspense>
          </div>
          <div className="w-full sm:w-1/2">
            {description && (
              <div className="mt-10">
                <p className="mb-4 border-b border-white/50 pb-1 text-2xl font-bold">
                  Description:
                </p>
                <p className="text-lg">{description}</p>
              </div>
            )}
            <div className="mt-10 break-words">
              <p className="mb-4 border-b border-white/50 pb-1 text-2xl font-bold">
                Details:
              </p>

              {/* Flex container for each detail item with content justified between */}
              <ul>
                {nftDetails.map((detail) => (
                  <li
                    key={detail.type}
                    className="my-1 flex items-center justify-between"
                  >
                    <p className="text-lg font-bold">{detail.type}</p>
                    {/* JavaScript slice method to show only the first 3 and last 4 characters of the ownerAddress */}
                    {detail.type !== "Royalty" ? (
                      <a
                        href={`https://xray.helius.xyz/${
                          detail.type === "Mint" ? "token" : "account"
                        }/${detail.value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary transition-colors duration-200 ease-in-out hover:text-white"
                      >
                        {`${detail.value
                          .toString()
                          .slice(0, 3)}...${detail.value.toString().slice(-4)}`}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          //dataslot="icon"
                          className="ml-1 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                          />
                        </svg>
                      </a>
                    ) : (
                      <span>{detail.value}%</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full p-3">
            {/* Creators */}
            {nftData[0].creators.length > 0 && (
              <div className="mt-10">
                <p className="mb-4 border-b border-white/50 pb-1 text-xl font-bold">
                  Creators:
                </p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {nftData[0].creators.map((creator, index) => (
                    // console.log("CREATOR", creator);
                    <div
                      key={index}
                      className="rounded-lg bg-gray-700/5 px-2 ring-1 ring-inset ring-white/30"
                    >
                      {Object.entries(creator).map(([key, value]) => {
                        return (
                          <div
                            key={key}
                            className="col-span-1 my-2 w-full overflow-hidden rounded-lg bg-gray-700/20 p-4 shadow ring-1 ring-inset ring-white/30"
                          >
                            <dt className="truncate text-sm font-semibold text-gray-300">
                              {(typeof value === "string" && "Address") ||
                                (typeof value === "number" && "Share") ||
                                (typeof value === "boolean" && "Verified")}
                            </dt>

                            <dd className="font-base mt-2 text-xl tracking-tight text-white">
                              {value !== (null || undefined) ? (
                                typeof value === "string" ? (
                                  <a
                                    href={`https://xray.helius.xyz/acount/${value}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-primary transition-colors duration-200 ease-in-out hover:text-white"
                                  >
                                    {`${value.toString().slice(0, 3)}...${value
                                      .toString()
                                      .slice(-4)}`}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      //dataSlot="icon"
                                      className="ml-1 w-4"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                                      />
                                    </svg>
                                  </a>
                                ) : (
                                  <span>{value.toString()}</span>
                                )
                              ) : (
                                `N/A`
                              )}
                            </dd>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attributes */}
            {nftData[0].content.metadata?.attributes?.length > 0 && (
              <div className="mt-10">
                <p className="mb-4 border-b border-white/50 pb-1 text-xl font-bold">
                  Attributes:
                </p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {nftData[0].content.metadata?.attributes?.length > 0 ? (
                    nftData[0].content.metadata?.attributes?.map(
                      ({ trait_type, value }, index) => {
                        return (
                          <>
                            {value !== null && value !== undefined && (
                              <div className="col-span-1 w-full overflow-hidden rounded-lg bg-gray-700/20 p-4 shadow ring-1 ring-inset ring-white/30">
                                <dt className="truncate text-sm font-semibold text-gray-300">
                                  {trait_type}
                                </dt>
                                <dd className="font-base mt-2 text-xl tracking-tight text-white">
                                  {value}
                                </dd>
                              </div>
                            )}
                          </>
                        );
                      },
                    )
                  ) : (
                    <p>No NFT Attributes</p>
                  )}
                </div>
              </div>
            )}

            {/* Compression Details */}
            {nftData[0].compression.compressed && (
              <div className="mt-10">
                <p className="mb-4 border-b border-white/50 pb-1 text-xl font-bold">
                  Compression Details:
                </p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {Object.entries(nftData[0].compression).map(
                    ([key, value]) => {
                      return (
                        <>
                          {value !== null && value !== undefined && (
                            <div className="col-span-1 w-full overflow-hidden rounded-lg bg-gray-700/20 p-4 shadow ring-1 ring-inset ring-white/30">
                              <dt className="truncate text-sm font-semibold text-gray-300">
                                {key}
                              </dt>
                              <dd className="font-base mt-2 text-xl tracking-tight text-white overflow-x-scroll">
                                {value}
                              </dd>
                            </div>
                          )}
                        </>
                      );
                    },
                  )}
                </div>
              </div>
            )}

            {/* SPL20 Details */}
            {nftData[0].spl20 && (
              <div className="mt-10">
                <p className="mb-4 border-b border-white/50 pb-1 text-xl font-bold">
                  SPL20 Details:
                </p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {Object.entries(nftData[0].spl20).map(([key, value]) => {
                    return (
                      <>
                        {value !== null && value !== undefined && (
                          <div className="col-span-1 w-full overflow-hidden rounded-lg bg-gray-700/20 p-4 shadow ring-1 ring-inset ring-white/30">
                            <dt className="truncate text-sm font-semibold text-gray-300">
                              {key}
                            </dt>
                            <dd className="font-base mt-2 text-xl tracking-tight text-white">
                              {value}
                            </dd>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Inscription Details */}
            {nftData[0].inscription && (
              <div className="mt-10">
                <p className="mb-4 border-b border-white/50 pb-1 text-xl font-bold">
                  Inscription Details:
                </p>
                <hr className="my-2 border-gray-600" />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {Object.entries(nftData[0].inscription).map(
                    ([key, value]) => {
                      return (
                        <>
                          {value !== null && value !== undefined && (
                            <div className="col-span-1 w-full overflow-hidden rounded-lg bg-gray-700/20 p-4 shadow ring-1 ring-inset ring-white/30">
                              <dt className="truncate text-sm font-semibold text-gray-300">
                                {key}
                              </dt>
                              <dd className="font-base mt-2 text-xl tracking-tight text-white">
                                {value !== (null || undefined) ? (
                                  key === "authority" ||
                                  key == "inscriptionDataAccount" ? (
                                    <a
                                      href={`https://xray.helius.xyz/acount/${value}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center text-primary transition-colors duration-200 ease-in-out hover:text-white"
                                    >
                                      {`${value
                                        .toString()
                                        .slice(0, 3)}...${value
                                        .toString()
                                        .slice(-4)}`}
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
                                  ) : (
                                    <span>{value.toString()}</span>
                                  )
                                ) : (
                                  `N/A`
                                )}
                              </dd>
                            </div>
                          )}
                        </>
                      );
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
