import React from "react";
import { Token } from "../types/fungibleToken";
import NFTTable from "./NFTTable";

const NFTs = ({ tokens }: { tokens: Token[] }) => {
  if (!tokens) {
    return <div>Loading...</div>;
  }
  return (
    <div className="rounded-lg bg-neutral">
      <div className="p-5">
        <h1 className=" text-xl font-bold">NFTs</h1>
        <NFTTable nftDataArray={tokens} />
      </div>
    </div>
  );
};

export default NFTs;
