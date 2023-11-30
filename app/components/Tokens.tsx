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
    <TokenTable
      tokens={tokens}
      walletAddress={walletAddress}
      searchParams={searchParams}
    />
  );
};

export default Tokens;
