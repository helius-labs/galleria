import React from "react";

import { NonFungibleToken } from "@/app/types";
import { NFTTable, NFTFilters } from "@/app/components";

interface NFTsProps {
  searchParams: string;
  walletAddress: string;
  tokens: NonFungibleToken[];
}

const NFTs = ({ searchParams, walletAddress, tokens }: NFTsProps) => {
  if (!tokens) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col rounded-lg bg-black bg-opacity-50 lg:flex-row">
      {/* NFT Filter Component */}
      <div className="mx-auto w-full  p-3 lg:w-3/12">
        <NFTFilters nftDataArray={tokens} />
      </div>

      {/* NFT Table */}
      <div className=" sm:w-full">
        <div className="flex-grow py-5">
          <NFTTable nftDataArray={tokens} walletAddress={walletAddress} />
        </div>
      </div>
    </div>
  );
};

export default NFTs;
