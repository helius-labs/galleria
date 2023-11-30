import React, { Suspense, use } from "react";
import NavBar from "../../components/NavBar";
import Tabs from "../../components/Tabs";
import Overview from "../../components/Overview";
import { FungibleToken } from "../../types/fungibleToken";
import NFTs from "@/app/components/NFTs";
import Tokens from "@/app/components/Tokens";
import { NonFungibleToken } from "@/app/types/nonFungibleToken";
import NFTDetails from "@/app/components/NFTDetails";

export default async function PortfolioPage({
  searchParams,
  params,
}: {
  searchParams: { view: string; details: string };
  params: { walletAddress: string };
}) {
  const fungibleTokenData: FungibleToken[] = await getFungibleData(
    params.walletAddress,
  );
  const nonFungibleTokenData: NonFungibleToken[] = await getNonFungibleData(
    params.walletAddress,
  );

  //console.log(params.walletAddress);
  return (
    <div className="bg-radial-gradient h-screen">
      <div>
        {searchParams.details && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-600 bg-opacity-70">
            <div className="h-4/5 w-10/12 sm:w-2/3">
              <NFTDetails
                nftData={nonFungibleTokenData.filter(
                  (item) => item.id === searchParams.details,
                )}
                searchParams={searchParams}
                walletAddress={params.walletAddress}
              />
            </div>
          </div>
        )}
      </div>
      <div
        className={`${
          searchParams.details ? "flex h-screen flex-col overflow-hidden" : ""
        }`}
      >
        <div className="mb-8">
          <NavBar />
        </div>
        <div className="mx-10 my-4">
          <Tabs
            searchParams={searchParams}
            walletAddress={params.walletAddress}
          />
        </div>
        <Suspense fallback={<div>Loading...</div>} key={searchParams.view}>
          <div className={`mx-10 my-4 pb-4 `}>
            {searchParams.view === "overview" && (
              <Overview tokens={nonFungibleTokenData} />
            )}
            {searchParams.view === "tokens" && (
              <Tokens tokens={fungibleTokenData} />
            )}
            {searchParams.view === "nfts" && (
              <NFTs
                tokens={nonFungibleTokenData}
                searchParams={searchParams}
                walletAddress={params.walletAddress}
              />
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
}

async function getFungibleData(walletAddress: string) {
  const url = `https://glori-cpoxlw-fast-mainnet.helius-rpc.com/`;

  const response = await fetch(url, {
    next: { revalidate: 30 },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "my-id",
      method: "searchAssets",
      params: {
        ownerAddress: walletAddress,
        tokenType: "fungible",
        displayOptions: {
          showNativeBalance: true,
        },
      },
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch data`);
  }
  const data = await response.json();
  // console.log(JSON.stringify(data.result, null, 2));

  const tokens: FungibleToken[] = data.result.items;

  // Calculate SOL balance from lamports
  const solBalance = data.result.nativeBalance.lamports;

  // console.log("SOLAMIS:" + solBalance.lamports);

  // Create SOL token object
  const solToken = {
    interface: "FungibleAsset",
    id: "So11111111111111111111111111111111111111112", // Mint address as ID
    content: {
      $schema: "https://schema.metaplex.com/nft1.0.json",
      json_uri: "",
      files: [
        {
          uri: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
          cdn_uri: "", // Assuming this is correct
          mime: "image/png",
        },
      ],
      metadata: {
        description: "Solana Token",
        name: "Wrapped SOL",
        symbol: "SOL",
        token_standard: "Native Token",
      },
      links: {
        image:
          "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
      },
    },
    authorities: [], // Assuming empty for SOL
    compression: {
      eligible: false,
      compressed: false,
      data_hash: "",
      creator_hash: "",
      asset_hash: "",
      tree: "",
      seq: 0,
      leaf_id: 0,
    },
    grouping: [], // Assuming empty for SOL
    royalty: {
      royalty_model: "", // Fill as needed
      target: null,
      percent: 0,
      basis_points: 0,
      primary_sale_happened: false,
      locked: false,
    },
    creators: [], // Assuming empty for SOL
    ownership: {
      frozen: false,
      delegated: false,
      delegate: null,
      ownership_model: "token",
      owner: "", // Fill with appropriate owner address
    },
    supply: null, // Assuming null for SOL
    mutable: true, // Assuming true for SOL
    burnt: false, // Assuming false for SOL

    token_info: {
      symbol: "SOL",
      balance: solBalance,
      supply: 0, // Assuming null for SOL
      decimals: 9,
      token_program: "", // Fill as needed
      associated_token_address: "", // Fill as needed
      price_info: {
        price_per_token: 50, // Fill with actual price if available
        total_price: 50 * (solBalance / 1e9), // Fill with actual total price if available
        currency: "", // Fill as needed
      },
    },
  };

  // Add SOL token to the tokens array
  tokens.push(solToken);

  return tokens;
}
async function getNonFungibleData(walletAddress: string) {
  const url = `https://glori-cpoxlw-fast-mainnet.helius-rpc.com/`;

  const response = await fetch(url, {
    next: { revalidate: 30 },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "my-id",
      method: "searchAssets",
      params: {
        ownerAddress: walletAddress,
        tokenType: "nonFungible",
        displayOptions: {
          showInscription: true,
          showCollectionMetadata: true,
        },
      },
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch data`);
  }
  const data = await response.json();
  // console.log(JSON.stringify(data.result, null, 2));
  const tokens: NonFungibleToken[] = data.result.items;
  // console.log(JSON.stringify(tokens, null, 2));
  return tokens;
}
