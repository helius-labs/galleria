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
  const imageSrc =
    nftData[0].content.files[0]?.cdn_uri || nftData[0].content.links.image;
  const title = nftData[0].content.metadata.name;
  const description = nftData[0].content.metadata.description;
  const mint = nftData[0].id;
  //   const grouping = nftData[0].grouping[0].group_key;
  //   const grouping_value = nftData[0].grouping[0].group_value;
  const ownerAddress = nftData[0].ownership.owner;

  return (
    <div className="m-4 h-full w-full overflow-x-auto overflow-y-auto rounded-lg bg-neutral-800 p-5 text-white">
      <div className="flex justify-between">
        <h1 className=" mx-4 px-3 text-xl font-bold">{title}</h1>
        <Link href={`/portfolio/${walletAddress}?view=nfts`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className=" h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>
      </div>
      <div>
        <div className="m-4 flex justify-evenly">
          <div className="w-1/2 p-3">
            <Suspense
              fallback={<div>Loading...</div>}
              key={searchParams.details}
            >
              <a href={imageSrc} target="_blank" rel="noopener noreferrer">
                <img src={imageSrc} alt={title} className={`rounded-xl`} />
              </a>
            </Suspense>
          </div>
          <div className="w-1/2 p-3">
            <div>
              <p className="text-lg font-bold">Description:</p>
              <p className="text-lg">{description}</p>
            </div>
            <div className="mt-5">
              <p className="text-xl font-bold">Details:</p>
              {/* Adding collection details */}
              {/* <p className=" text-base">{`${
                grouping.charAt(0).toUpperCase() +
                grouping.slice(1).toLowerCase()
              }: ${grouping_value}`}</p> */}
              <p className=" text-base">{`Owner: ${ownerAddress}`}</p>
              <div>
                <p className="text-base font-bold">Creators:</p>
                {nftData[0].creators.map((creator, index) => (
                  <div key={index}>
                    <p className="text-base">Address: {creator.address}</p>
                    <p className="text-base">Share: {creator.share}</p>
                    <p className="text-base">
                      Verified: {creator.verified ? "Yes" : "No"}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href={"https://xray.helius.xyz/token/" + mint}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex justify-normal">
                  <p className="text-base font-bold">
                    Mint:
                    <span className="font-normal text-blue-500">{` ${mint}`}</span>
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mx-4 w-full p-3">
            <div className="my-3">
              <p className="text-xl font-bold">Attributes:</p>
              {nftData[0].content.metadata?.attributes &&
              nftData[0].content.metadata.attributes.length > 0 ? (
                nftData[0].content.metadata.attributes.map(
                  (attribute, index) => (
                    <div key={index}>
                      <p className="text-base">
                        {attribute.trait_type}: {attribute.value}
                      </p>
                    </div>
                  ),
                )
              ) : (
                <p>No attributes available.</p>
              )}
            </div>
            {nftData[0].compression.compressed && (
              <div className="my-3">
                <p className="text-xl font-bold">Compression Details:</p>
                <p>Data Hash: {nftData[0].compression.data_hash}</p>
                <p>Creator Hash: {nftData[0].compression.creator_hash}</p>
                <p>Asset Hash: {nftData[0].compression.asset_hash}</p>
                <p>Tree: {nftData[0].compression.tree}</p>
                <p>Seq: {nftData[0].compression.seq}</p>
                <p>Leaf ID: {nftData[0].compression.leaf_id}</p>
              </div>
            )}
            {nftData[0].spl20 && (
              <div className="my-3">
                <p className="text-xl font-bold">SPL20 Details:</p>
                <p>SPL-20: {nftData[0].spl20.p}</p>
                <p>Operation: {nftData[0].spl20.op}</p>
                <p>Ticker: {nftData[0].spl20.tick}</p>
                <p>Amount: {nftData[0].spl20.amt}</p>
              </div>
            )}

            {nftData[0].inscription && (
              <div className="my-3">
                <p className="text-xl font-bold">Inscription Details:</p>
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
