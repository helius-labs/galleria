import React from "react";
import NFTCard from "../components/NFTCard";
import { Token } from "../types/token";
const PortfolioPage = async () => {
  const url = `https://glori-cpoxlw-fast-mainnet.helius-rpc.com/`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "my-id",
      method: "searchAssets",
      params: {
        ownerAddress: "EKkuHmMoKsLqCu4sHw4L3EZeXxD78rpe3CFNXTKLPUM2",
        tokenType: "fungible",
      },
    }),
  });
  const data = await response.json();
  const tokens: Token[] = data.result.items;
  console.log("Search Assets: ", JSON.stringify(data.result, null, 2));

  return (
    <>
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
    </>
  );
};

export default PortfolioPage;
