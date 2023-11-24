import React from "react";
import { FungibleToken } from "../types/fungibleToken";
import TokenTable from "./TokenTable";

const Tokens = ({ tokens }: { tokens: FungibleToken[] }) => {
  if (!tokens) {
    return <div>Loading...</div>;
  }
  return <TokenTable tokens={tokens} />;
};

export default Tokens;
