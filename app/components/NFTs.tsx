import React from "react";
import { NonFungibleToken } from "../types/nonFungibleToken";
import NFTTable from "./NFTTable";

const NFTs = ({
  searchParams,
  walletAddress,
  tokens,
}: {
  searchParams: { view: string };
  walletAddress: string;
  tokens: NonFungibleToken[];
}) => {
  if (!tokens) {
    return <div>Loading...</div>;
  }
  return (
    <div className="rounded-lg bg-neutral">
      <div className="p-5">
        <h1 className=" text-xl font-bold">NFTs</h1>
        <NFTTable
          nftDataArray={tokens}
          searchParams={searchParams}
          walletAddress={walletAddress}
        />
      </div>
    </div>
  );
};

export default NFTs;
