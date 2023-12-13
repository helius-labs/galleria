import React, { Suspense } from "react";

import {
  NavBar,
  Tabs,
  NFTs,
  Tokens,
  NFTDetails,
  TokenDetails,
} from "@/app/components";
import { FungibleToken, NonFungibleToken } from "@/app/types";

interface PortfolioPageProps {
  searchParams: { view: string; details: string; tokenDetails: string };
  params: { walletAddress: string };
}

const PortfolioPage = async ({ searchParams, params }: PortfolioPageProps) => {
  const fungibleTokenData: FungibleToken[] = await getFungibleData(
    params.walletAddress,
  );
  const nonFungibleTokenData: NonFungibleToken[] = await getNonFungibleData(
    params.walletAddress,
  );

  return (
    <div className="h-screen bg-radial-gradient">
      <div>
        {searchParams.details && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-700 bg-opacity-70">
            <div className="h-4/5 w-10/12 sm:w-2/3">
              <NFTDetails
                nftData={nonFungibleTokenData.filter(
                  (item) => item.id === searchParams.details,
                )}
                searchParams={"view=" + searchParams.view}
                walletAddress={params.walletAddress}
              />
            </div>
          </div>
        )}
      </div>
      <div>
        {searchParams.tokenDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-700 bg-opacity-70">
            <div className="h-4/5 w-10/12 sm:w-2/3">
              <TokenDetails
                tokenData={fungibleTokenData.filter(
                  (item) => item.id === searchParams.tokenDetails,
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
        }${
          searchParams.tokenDetails
            ? "flex h-screen flex-col overflow-hidden"
            : ""
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
            {/* {searchParams.view === "overview" && (
              <Overview
                nonFungibleTokens={nonFungibleTokenData}
                fungibleTokens={fungibleTokenData}
                searchParams={searchParams.toString()}
                walletAddress={params.walletAddress}
              />
            )} */}
            {searchParams.view === "tokens" && (
              <Tokens
                tokens={fungibleTokenData}
                searchParams={searchParams.toString()}
                walletAddress={params.walletAddress}
              />
            )}
            {searchParams.view === "nfts" && (
              <NFTs
                tokens={nonFungibleTokenData}
                searchParams={searchParams.toString()}
                walletAddress={params.walletAddress}
              />
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

const getFungibleData = async (walletAddress: string) => {
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

  const tokens: FungibleToken[] = data.result.items;

  // Calculate SOL balance from lamports
  const solBalance = data.result.nativeBalance.lamports;

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
      owner: tokens[0]?.ownership.owner,
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
        price_per_token: data.result.nativeBalance.price_per_sol, // Fill with actual price if available
        total_price: data.result.nativeBalance.total_price, // Fill with actual total price if available
        currency: "", // Fill as needed
      },
    },
  };

  // Add SOL token to the tokens array
  if (solBalance > 0) {
    tokens.push(solToken);
  }

  return tokens;
};

const getNonFungibleData = async (walletAddress: string) => {
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
  const tokens: NonFungibleToken[] = data.result.items;

  return tokens;
};

export default PortfolioPage;
