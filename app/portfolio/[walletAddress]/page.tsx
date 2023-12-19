"use client";

import React, { Suspense, Fragment, useState, useEffect } from "react";
import {
  Bars3Icon,
  PhotoIcon,
  StopCircleIcon,
} from "@heroicons/react/24/outline";

import {
  NFTDetails,
  NavBarV2,
  WalletInput,
  Logo,
  TokenDetails,
  Overview,
  Tokens,
  NFTs,
} from "@/app/components";
import { FungibleToken, NonFungibleToken } from "@/app/types";
import { classNames } from "@/app/utils";

const navigation = [
  { name: "Tokens", href: "#", icon: PhotoIcon, current: true },
  { name: "NFTs", href: "#", icon: StopCircleIcon, current: false },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

interface PortfolioPageProps {
  searchParams: { view: string; details: string; tokenDetails: string };
  params: { walletAddress: string };
}

const PortfolioPage = ({ searchParams, params }: PortfolioPageProps) => {
  // const fungibleTokenData: FungibleToken[] = await getFungibleData(
  //   params.walletAddress,
  // );

  const [fungibleTokenData, setFungibleTokenData] = useState<FungibleToken[]>([]);
  const [nonFungibleTokenData, setNonFungibleTokenData] = useState<NonFungibleToken[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [NFTData, setNFTData] = useState<NonFungibleToken[]>([]);

  useEffect(() => {
    const fetchNonFungibleData = async () => {
      try {
        const data = await getNonFungibleData(params.walletAddress);
        setNonFungibleTokenData(data);
      } catch (error) {
        console.error("Failed to fetch non-fungible token data:", error);
      }
    };

    const fetchFungibleData = async () => {
      try {
        const data = await getFungibleData(params.walletAddress);
        setFungibleTokenData(data);
      } catch (error) {
        console.error("Failed to fetch fungible token data:", error);
      }
    }

    fetchNonFungibleData();
    fetchFungibleData();

    console.log("fungibleTokenData", fungibleTokenData);
    console.log("nonFungibleTokenData", nonFungibleTokenData);
  }, [params.walletAddress]);

  return (
    <div className="h-screen bg-radial-gradient">
      <div>
        <NavBarV2
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigation}
        />

        {/* Static sidebar for desktop */}
        <div className="hidden bg-black bg-opacity-40 lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:pb-4">
          <div className="flex h-16 shrink-0 items-center justify-center">
            <Logo />
          </div>
          <nav className="mt-8">
            <ul role="list" className="flex flex-col items-center space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-black bg-opacity-50 text-white"
                        : "bg-opacity-50 text-gray-400 hover:bg-black hover:bg-opacity-20 hover:text-white",
                      "group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6",
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Navbar */}
        <div className="lg:pl-20">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-black backdrop-blur-md bg-opacity-40 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex w-full items-center justify-between self-stretch">
              {/* Wallet Input */}
              <WalletInput source="navBar" />

              <div className="flex items-center gap-x-2 lg:gap-x-4">
                {/* Heluis.dev button */}
                <a
                  className="hidden rounded-full bg-indigo-100/5 px-3 py-1 text-sm font-semibold leading-6 text-accent ring-1 ring-inset ring-accent/10 transition duration-200 ease-in-out hover:ring-accent/30 sm:block"
                  href="https://helius.dev"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Go Helius
                </a>

                {/* Separator */}
                <div
                  className="block h-6 w-px lg:bg-gray-300/40"
                  aria-hidden="true"
                />

                {/* View docs button */}
                <a
                  className="hidden rounded-full bg-indigo-100/5 px-3 py-1 text-sm font-semibold leading-6 text-white ring-1 ring-inset ring-white/10 transition duration-200 ease-in-out hover:ring-white/30 sm:block"
                  href="https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  View Docs
                </a>
              </div>
            </div>
          </div>

          {/* Main area */}
          <main>
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              {/* Content goes here */}

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
                  searchParams.details
                    ? "flex h-screen flex-col overflow-hidden"
                    : ""
                }${
                  searchParams.tokenDetails
                    ? "flex h-screen flex-col overflow-hidden"
                    : ""
                }`}
              >
                {/* <div className="mb-8">
                  <NavBar />
                </div>
                <div className="mx-10 my-4">
                  <Tabs
                    searchParams={searchParams}
                    walletAddress={params.walletAddress}
                  />
                </div> */}
                <Suspense
                  fallback={<div>Loading...</div>}
                  key={searchParams.view}
                >
                  <div className={`mx-10 my-4 pb-4 `}>
                    {searchParams.view === "overview" && (
                      <Overview
                        nonFungibleTokens={nonFungibleTokenData}
                        fungibleTokens={fungibleTokenData}
                        searchParams={searchParams.toString()}
                        walletAddress={params.walletAddress}
                      />
                    )}
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
          </main>
        </div>
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
