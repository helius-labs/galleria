import React, { Suspense, use } from "react";
import NavBar from "../../components/NavBar";
import Tabs from "../../components/Tabs";
import Overview from "../../components/Overview";
import { Token } from "../../types/token";
import NFTs from "@/app/components/NFTs";
import Tokens from "@/app/components/Tokens";

export default async function PortfolioPage({
  searchParams,
  params,
}: {
  searchParams: { view: string };
  params: { walletAddress: string };
}) {
  const tokenData: Token[] = await getData();
  console.log(searchParams.view);
  return (
    <div>
      <div className="m-10">
        <div className="m-5 mb-10">
          <NavBar />
        </div>
        <div className="mx-5 my-4">
          <Tabs searchParams={searchParams} params={params} />
        </div>
        <Suspense fallback={<div>Loading...</div>} key={searchParams.view}>
          <div className="mx-5 my-4">
            {searchParams.view === "overview" && (
              <Overview tokens={tokenData} />
            )}
            {searchParams.view === "tokens" && <Tokens tokens={tokenData} />}
            {searchParams.view === "nfts" && <NFTs tokens={tokenData} />}
          </div>
        </Suspense>
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
  console.log(JSON.stringify(data.result, null, 2));
  const tokens: Token[] = data.result.items;

  return tokens;
}
