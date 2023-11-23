import React from "react";

import { Token } from "../types/token";

const Overview = ({ tokens }: { tokens: Token[] }) => {
  if (!tokens) {
    return <div>Loading...</div>;
  }
  return (
    <div className="rounded-lg bg-neutral">
      <div className="p-2">
        <h1 className=" text-xl font-bold">Overview</h1>
        <div className="">
          <h1>Tokens</h1>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Balance</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token) => (
                <tr key={token.id}>
                  <td>{token.token_info.symbol}</td>
                  <td>{token.token_info.balance}</td>
                  <td>{token.token_info.price_info?.total_price || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
