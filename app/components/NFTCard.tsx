import React, { useState } from "react";
import { NonFungibleToken } from "../types/nonFungibleToken";

const NFTCard = ({
  walletAddress,
  nftData,
}: {
  walletAddress: string;
  nftData: NonFungibleToken;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageSrc = nftData.content.links.image;
  const title = nftData.content.metadata.name;
  const mint = nftData.id;

  const handleImageLoaded = () => setIsLoaded(true);
  const handleImageError = () => setIsLoaded(false); // Optional: handle image load error

  return (
    <div className="w-full max-w-xs p-3">
      <a href={`/portfolio/${walletAddress}?view=nfts&details=${mint}`}>
        <div className="flex flex-col rounded-lg bg-neutral bg-opacity-50 p-2 hover:bg-neutral-500 hover:bg-opacity-60 ">
          <div className="flex-grow">
            <div className="h-48 overflow-hidden rounded-lg sm:h-64">
              {!isLoaded && (
                <div className="skeleton-seconda skeleton h-full w-full"></div>
              )}{" "}
              {/* Skeleton Loader */}
              <img
                src={imageSrc}
                alt={title}
                className={`h-full w-full rounded-xl object-cover ${
                  !isLoaded ? "hidden" : ""
                }`}
                onLoad={handleImageLoaded}
                onError={handleImageError} // Optional: handle image load error
              />
            </div>
          </div>
          <figure className="mt-3 flex items-center justify-center">
            <h2 className="truncate text-lg font-medium text-white sm:text-xl">
              {title}
            </h2>
          </figure>
        </div>
      </a>
    </div>
  );
};

export default NFTCard;
