import React from "react";
import NFTCard from "./NFTCard";
import { NonFungibleToken } from "../types/nonFungibleToken";

const NFTTable = ({ nftDataArray }: { nftDataArray: NonFungibleToken[] }) => {
  return (
    <div className="p-2">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {nftDataArray.map((nftData: NonFungibleToken, index) => (
          <NFTCard key={index} nftData={nftData} />
        ))}
      </div>
    </div>
  );
};

export default NFTTable;
