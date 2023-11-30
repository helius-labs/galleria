import React from "react";
import { NonFungibleToken } from "../types/nonFungibleToken";
import NFTTable from "./NFTTable";
import NFTFilters from "./NFTFilters";

const NFTs = ({
  searchParams,
  walletAddress,
  tokens,
}: {
  searchParams: string;
  walletAddress: string;
  tokens: NonFungibleToken[];
}) => {
  if (!tokens) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col rounded-lg bg-black bg-opacity-50 lg:flex-row">
      {/* NFT Filter Component */}
      <div className="mx-auto w-full  p-3 sm:w-3/12">
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
