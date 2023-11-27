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
    <div className="max-w-sm p-4">
      <a href={`/portfolio/${walletAddress}?view=nfts&details=${mint}`}>
        <div className="flex h-full flex-col rounded-lg bg-neutral-500 p-8 hover:bg-neutral-400 ">
          <figure className="mb-3 flex items-center">
            <h2 className="text-lg font-medium text-white dark:text-white">
              {title}
            </h2>
          </figure>
          <div className="flex-grow">
            <div className="h-72 w-72 overflow-hidden rounded-lg">
              {/* {!isLoaded && <div className=" skeleton h-72 w-72"></div>}{" "} */}
              {/* Skeleton Loader */}
              <img
                src={imageSrc}
                alt={title}
                className={`rounded-xl`} // Hide image until loaded
                // onLoad={handleImageLoaded} // Event when image is loaded
              />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default NFTCard;
