import React from "react";
import NavBar from "../components/NavBar";
import Tabs from "../components/Tabs";
import Overview from "../components/Overview";
import { Token } from "../types/token";

export default async function PortfolioPage() {
  const tokenData: Token[] = await getData();
  return (
    <div>
      <div className="m-5 mb-10">
        <NavBar />
      </div>
      <div className="mx-5 my-4">
        <Tabs />
      </div>
      <div className="mx-5 my-4">
        <Overview tokens={tokenData} />
      </div>
    </div>
  );
}

async function getData() {
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
  if (!response.ok) {
    throw new Error(`Failed to fetch data`);
  }
  const data = await response.json();
  const tokens: Token[] = data.result.items;

  return tokens;
}
