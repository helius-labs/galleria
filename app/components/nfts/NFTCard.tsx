"use client";

import React, { useState } from "react";

import { NonFungibleToken } from "@/app/types";

interface NFTCardProps {
  walletAddress: string;
  nftData: NonFungibleToken;
  searchParams: string;
}

const NFTCard = ({ walletAddress, nftData, searchParams }: NFTCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageSrc = nftData.content.links.image;
  const title = nftData.content.metadata.name;
  const mint = nftData.id;

  const handleImageLoaded = () => setIsLoaded(true);
  const handleImageError = () => setIsLoaded(false); // Optional: handle image load error

  return (
    <div className="group w-full max-w-xs rounded-lg bg-gray-800/10 bg-opacity-20 p-3 ring-1 ring-white/10 transition duration-200 ease-in-out hover:bg-gray-800/20 hover:ring-white/30">
      <a href={`/portfolio/${walletAddress}?${searchParams}&details=${mint}`}>
        <div className="rounded-lg p-3 pb-0 flex flex-col justify-between">
          <div className="flex-grow">
            <div className="h-48 overflow-hidden rounded-lg sm:h-64">
              {!isLoaded && (
                <div className="skeleton-seconda skeleton h-full w-full"></div>
              )}{" "}
              {/* Skeleton Loader */}
              <img
                src={imageSrc}
                alt={title}
                className={`h-[270px] w-[270px] rounded-xl object-cover ${
                  !isLoaded ? "hidden" : ""
                }`}
                onLoad={handleImageLoaded}
                onError={handleImageError} // Optional: handle image load error
              />
            </div>
          </div>
          <figure className="mt-6 flex items-center justify-center">
            <h2 className="w-60 rounded-lg bg-indigo-100/5 py-1 text-center text-sm font-semibold leading-6 text-white ring-1 ring-inset ring-white/10 transition duration-200 ease-in-out group-hover:ring-white/30">
              {title}
            </h2>
          </figure>
        </div>
      </a>
    </div>
  );
};

export default NFTCard;
