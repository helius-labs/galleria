import React from "react";
import { Token } from "../types/token";
import TokenTable from "./TokenTable";

const Tokens = ({ tokens }: { tokens: Token[] }) => {
  if (!tokens) {
    return <div>Loading...</div>;
  }
  return <TokenTable tokens={tokens} />;
};

export default Tokens;
