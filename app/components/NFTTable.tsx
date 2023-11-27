"use client";
import React, { useState } from "react";
import NFTCard from "./NFTCard";
import { NonFungibleToken } from "../types/nonFungibleToken";

const NFTTable = ({
  searchParams,
  walletAddress,
  nftDataArray,
}: {
  searchParams: { view: string };
  walletAddress: string;
  nftDataArray: NonFungibleToken[];
}) => {
  const itemsPerPage = 12;
  const [displayedItems, setDisplayedItems] = useState(
    nftDataArray.slice(0, itemsPerPage),
  );

  const loadMore = () => {
    const nextItems = nftDataArray.slice(
      0,
      displayedItems.length + itemsPerPage,
    );
    setDisplayedItems(nextItems);
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <div className="flex w-full flex-wrap justify-center">
        {displayedItems.map((nftData: NonFungibleToken, index) => (
          <NFTCard
            key={index}
            nftData={nftData}
            walletAddress={walletAddress}
            searchParams={searchParams}
          />
        ))}
      </div>
      {displayedItems.length < nftDataArray.length && (
        <button className="btn btn-primary mt-4 text-white" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default NFTTable;
