import React, { Suspense } from "react";

import {
  NFTDetails,
  TokenDetails,
  TokensList,
  NFTList,
  TokenMetrics,
  NFTMetrics,
  Navigation,
} from "@/app/components";
import { FungibleToken, NonFungibleToken } from "@/app/types";

interface PortfolioPageProps {
  searchParams: { view: string; details: string; tokenDetails: string };
  params: { walletAddress: string };
}

const PortfolioPage = async ({ searchParams, params }: PortfolioPageProps) => {
  // Fetch both fungible and non-fungible token data
  const { fungibleTokens, nonFungibleTokens } = await getAllAssets(
    params.walletAddress,
  );

  return (
    <div className="h-screen bg-radial-gradient">
      <div className="lg:pl-20">
        {/* Navigation (Mobile / Side / Primary) */}
        <Navigation searchParams={searchParams} params={params} />

        {/* Main area */}
        <main>
          <div className="px-6 py-6">
            {/* Tokens */}
            <div>
              {searchParams.tokenDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-700 bg-opacity-70">
                  <div className="h-4/5 w-10/12 sm:w-2/3">
                    <TokenDetails
                      tokenData={fungibleTokens.filter(
                        (item) => item.id === searchParams.tokenDetails,
                      )}
                      searchParams={searchParams}
                      walletAddress={params.walletAddress}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* NFTS */}
            <div>
              {searchParams.details && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-700 bg-opacity-70">
                  <div className="h-4/5 w-10/12 sm:w-2/3">
                    <NFTDetails
                      nftData={nonFungibleTokens.filter(
                        (item) => item.id === searchParams.details,
                      )}
                      searchParams={"view=" + searchParams.view}
                      walletAddress={params.walletAddress}
                    />
                  </div>
                </div>
              )}
            </div>

            <div
              className={`${
                searchParams.details
                  ? "flex h-screen flex-col overflow-hidden"
                  : ""
              }${
                searchParams.tokenDetails
                  ? "flex h-screen flex-col overflow-hidden"
                  : ""
              }`}
            >
              <Suspense
                fallback={<div>Loading...</div>}
                key={searchParams.view}
              >
                <div>
                  {searchParams.view === "tokens" && (
                    <>
                      {/* Token Metrics */}
                      <TokenMetrics fungibleTokens={fungibleTokens} />

                      {/* Tokens List */}
                      <TokensList
                        tokens={fungibleTokens}
                        searchParams={searchParams.toString()}
                        walletAddress={params.walletAddress}
                      />
                    </>
                  )}
                  {searchParams.view === "nfts" && (
                    <>
                      {/* NFTs Metrics */}
                      <NFTMetrics nonFungibleTokens={nonFungibleTokens} />

                      {/* NFTs List */}
                      <NFTList
                        tokens={nonFungibleTokens}
                        searchParams={searchParams.toString()}
                        walletAddress={params.walletAddress}
                      />
                    </>
                  )}
                </div>
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const getAllAssets = async (walletAddress: string) => {
  const url = process.env.NEXT_PUBLIC_HELIUS_RPC_URL;

  if (!url) {
    throw new Error("NEXT_PUBLIC_HELIUS_RPC_URL is not set");
  }

  const response = await fetch(url, {
    next: { revalidate: 5 },
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
        tokenType: "all", // Changed to "all" to fetch both types
        displayOptions: {
          showNativeBalance: true,
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
  const items: (FungibleToken | NonFungibleToken)[] = data.result.items;

  // Split the items into fungible and non-fungible tokens
  let fungibleTokens: FungibleToken[] = items.filter(
    (item): item is FungibleToken =>
      item.interface === "FungibleToken" || item.interface === "FungibleAsset",
  );
  // Hardcoding the image for USDC
  fungibleTokens = fungibleTokens.map((item) => {
    if (item.id === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") {
      return {
        ...item,
        content: {
          ...item.content,
          files: [
            {
              uri: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
              cdn_uri: "", // Assuming this is correct
              mime: "image/png",
            },
          ],
          links: {
            image:
              "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          },
        },
      };
    } else if (item.id === "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1") {
      return {
        ...item,
        content: {
          ...item.content,
          files: [
            {
              uri: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1/logo.png",
              cdn_uri: "", // Assuming this is correct
              mime: "image/png",
            },
          ],
          links: {
            image:
              "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1/logo.png",
          },
        },
      };
    }
    return item;
  });
  const nonFungibleTokens: NonFungibleToken[] = items.filter(
    (item): item is NonFungibleToken =>
      !["FungibleToken", "FungibleAsset"].includes(item.interface),
  );

  // Calculate SOL balance from lamports
  const solBalance = data.result.nativeBalance.lamports;
  //console.log(data.result);

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
      owner: nonFungibleTokens[0]?.ownership.owner,
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
    fungibleTokens.push(solToken);
  }

  return { fungibleTokens, nonFungibleTokens };
};
export default PortfolioPage;
