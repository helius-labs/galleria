import React from "react";
import { FungibleToken } from "../types/fungibleToken";
import TokenTable from "./TokenTable";

const Tokens = ({
  searchParams,
  walletAddress,
  tokens,
}: {
  searchParams: string;
  walletAddress: string;
  tokens: FungibleToken[];
}) => {
  if (!tokens) {
    return <div>Loading...</div>;
  }
  return (
    <div className="rounded-lg bg-black bg-opacity-50 ">
      <div className="p-3 sm:p-5">
        <TokenTable
          tokens={tokens}
          source="tokenPage"
          walletAddress={walletAddress}
        />
      </div>
    </div>
  );
};

export default Tokens;
