"use client";
import React, { useState } from "react";
import { NonFungibleToken } from "../types/nonFungibleToken";
import { useSearchParams } from "next/navigation";

const NFTCard = ({
  searchParams,
  walletAddress,
  nftData,
}: {
  searchParams: { view: string };
  walletAddress: string;
  nftData: NonFungibleToken;
}) => {
  const [isLoaded, setIsLoaded] = useState(false); // state to track image loading

  // console.log(searchParams);
  // Extracting the relevant information from nftData
  const imageSrc =
    nftData.content.files[0]?.cdn_uri || nftData.content.links.image;
  const title = nftData.content.metadata.name;
  const description = nftData.content.metadata.description;
  const mint = nftData.id;

  const handleImageLoaded = () => setIsLoaded(true); // handler for image load

  return (
    <div className="w-full max-w-sm p-4">
      <a href={`/portfolio/${walletAddress}?view=nfts&details=${mint}`}>
        <div className="flex h-full flex-col rounded-lg bg-neutral-500 p-6 hover:bg-neutral-400 ">
          <div className="flex-grow">
            <div className="h-48 w-full overflow-hidden rounded-lg sm:h-72">
              <img
                src={imageSrc}
                alt={title}
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          </div>
          <figure className="mt-3 flex items-center justify-center">
            <h2 className="text-lg font-medium text-white sm:text-lg">
              {title}
            </h2>
          </figure>
        </div>
      </a>
    </div>
  );
};

export default NFTCard;
