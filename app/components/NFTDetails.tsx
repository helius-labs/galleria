import React, { Suspense } from "react";
import { NonFungibleToken } from "../types/nonFungibleToken";
import Link from "next/link";

const NFTDetails = ({
  searchParams,
  walletAddress,
  nftData,
}: {
  searchParams: { view: string; details: string };
  walletAddress: string;
  nftData: NonFungibleToken[];
}) => {
  console.log(nftData);
  const imageSrc = nftData[0]?.content?.links?.image || "/noImg.svg";
  const title = nftData[0].content.metadata.name;
  const description = nftData[0].content.metadata.description;
  const mint = nftData[0].id;
  //   const grouping = nftData[0].grouping[0].group_key;
  //   const grouping_value = nftData[0].grouping[0].group_value;
  const ownerAddress = nftData[0].ownership.owner;

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-clip rounded-lg bg-neutral-800 p-2 text-white sm:p-2">
      <div className="relative">
        <Link href={`/portfolio/${walletAddress}?view=nfts`}>
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
        <h1 className="m-2 p-3 text-xl font-bold">{title}</h1>
      </div>

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
          <div className="w-full p-3 sm:w-1/2">
            <div>
              <p className="text-lg font-bold">Description:</p>
              <hr className="my-2 border-gray-600" />
              <p className="text-lg">{description}</p>
            </div>
            <a
              href={"https://xray.helius.xyz/token/" + mint}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="pt-3">
                <p className="text-lg font-bold">Mint:</p>
                <hr className="my-2 border-gray-600" />
                <p className="font-normal text-blue-500">{` ${mint}`}</p>
              </div>
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mx-4 w-full p-3">
            <div className="mt-5 break-words">
              <p className="text-xl font-bold">Details:</p>
              <hr className="my-2 border-gray-600" />

              <div className="">
                <p className="text-base font-bold">Owner:</p>
                <p className="text-base">{ownerAddress}</p>
              </div>

              <div className="mt-2 space-y-2">
                <p className="text-lg font-bold">Creators:</p>
                <hr className="my-2 border-gray-600" />
                {nftData[0].creators.map((creator, index) => (
                  <div key={index} className="rounded-lg bg-neutral-700 p-4">
                    <p className="text-base">
                      <span className="font-bold">Address:</span>
                      <span className="ml-2">{creator.address}</span>
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
