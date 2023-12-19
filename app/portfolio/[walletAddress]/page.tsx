"use client";

import React, { Suspense, Fragment, useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  PhotoIcon,
  StopCircleIcon,
} from "@heroicons/react/24/outline";

import {
  NFTDetails,
  WalletInput,
  Logo,
  TokenDetails,
  Tokens,
  NFTs,
} from "@/app/components";
import { FungibleToken, NonFungibleToken } from "@/app/types";
import { Calistoga } from "next/font/google";

const navigation = [
  { name: "Tokens", href: "tokens", icon: StopCircleIcon },
  { name: "NFTs", href: "nfts", icon: PhotoIcon },
];

const options = {
  plugins: {
    legend: {
      display: false, // Hides the chart legends
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          let label = "";

          if (context.parsed !== null) {
            label += `$${context.parsed.toFixed(2)}`; // Adds '$' symbol
          }
          return label;
        },
      },
    },
  },
};

interface PortfolioPageProps {
  searchParams: { view: string; details: string; tokenDetails: string };
  params: { walletAddress: string };
}

const PortfolioPage = ({ searchParams, params }: PortfolioPageProps) => {
  const [fungibleTokenData, setFungibleTokenData] = useState<FungibleToken[]>([]);
  const [nonFungibleTokenData, setNonFungibleTokenData] = useState<NonFungibleToken[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navState, setNavState] = useState("tokens");
  
  const [totalValue, setTotalValue] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
  }>({ labels: [], datasets: [] });

  const [totalNFTs, setTotalNFTs] = useState(0);
  const [totalcNFTs, setTotalcNFTs] = useState(0);
  const [totalpNFTs, setTotalpNFTs] = useState(0);

  useEffect(() => {
    if (fungibleTokenData) {
      const data = fungibleTokenData.map(
        (token) => token.token_info.price_info?.total_price,
      );
      const labels = fungibleTokenData.map(
        (token) => token.content.metadata.symbol || "Unknown Token",
      );
      const backgroundColors = labels.map(
        (_, index) => `hsl(${(index * 35) % 360}, 70%, 50%)`,
      );

      setChartData({
        labels,
        datasets: [
          {
            data,
            backgroundColor: backgroundColors,
          },
        ],
      });

      const total = fungibleTokenData.reduce(
        (acc, token) => acc + (token.token_info.price_info?.total_price || 0),
        0,
      );
      const totalTokens = fungibleTokenData.length;

      setTotalValue(total);
      setTotalTokens(totalTokens);
    }
  }, [fungibleTokenData]);

  useEffect(() => {
    console.log("NFT stuff", nonFungibleTokenData);
    const totalNFTs = nonFungibleTokenData.length;
    const totalcNFTs = nonFungibleTokenData.filter(
      (token) => token.compression.eligible === true,
    ).length;
    const totalpNFTs = nonFungibleTokenData.filter(
      (token) => token.compression.eligible === false,
    ).length;

    setTotalNFTs(totalNFTs);
    setTotalcNFTs(totalcNFTs);
    setTotalpNFTs(totalpNFTs);

  }, [nonFungibleTokenData]);

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
        {/* Navbar */}
        <div className="">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-black bg-opacity-40 px-4 shadow-sm backdrop-blur-md sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex w-full items-center justify-between self-stretch">
              <div className="flex items-center">
                <div className="mr-10">
                  <Logo />
                </div>

                {/* Wallet Input */}
                <WalletInput source="navBar" />
              </div>

              <div className="hidden items-center gap-x-2 sm:flex lg:gap-x-4">
                {/* Heluis.dev button */}
                <a
                  className="rounded-full bg-indigo-100/5 px-3 py-1 text-sm font-semibold leading-6 text-accent ring-1 ring-inset ring-accent/10 transition duration-200 ease-in-out hover:ring-accent/30"
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
                  className="rounded-full bg-indigo-100/5 px-3 py-1 text-sm font-semibold leading-6 text-white ring-1 ring-inset ring-white/10 transition duration-200 ease-in-out hover:ring-white/30"
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
            <div className="px-6 py-6">
              {/* Tokens */}
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

              {/* NFTS */}
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

              <div
                className={`${searchParams.details
                    ? "flex h-screen flex-col overflow-hidden"
                    : ""
                  }${searchParams.tokenDetails
                    ? "flex h-screen flex-col overflow-hidden"
                    : ""
                  }`}
              >
                <Suspense
                  fallback={<div>Loading...</div>}
                  key={searchParams.view}
                >
                  <div className={``}>
                    {searchParams.view === "tokens" && (
                      <>
                        {/* Token Metrics */}
                        <div className="mb-6">
                          <dl className="grid grid-cols-1 gap-5 shadow-sm sm:grid-cols-2">
                            <div className="grid grid-rows-3 gap-y-5 shadow-sm">
                              <div className="overflow-hidden rounded-lg bg-black bg-opacity-60 px-4 py-5 shadow sm:p-6">
                                <dt className="truncate text-sm font-medium text-gray-300">
                                  Total Tokens
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
                                  {totalTokens}
                                </dd>
                              </div>

                              <div className="overflow-hidden rounded-lg bg-black bg-opacity-60 px-4 py-5 shadow sm:p-6">
                                <dt className="truncate text-sm font-medium text-gray-300">
                                  Total Value
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
                                  ${totalValue.toFixed(2)}
                                </dd>
                              </div>

                              <div className="overflow-hidden rounded-lg bg-black bg-opacity-60 px-4 py-5 shadow sm:p-6">
                                <dt className="truncate text-sm font-medium text-gray-300">
                                  Average Value
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
                                  ${(totalValue / totalTokens).toFixed(2)}
                                </dd>
                              </div>
                            </div>

                            <div className="overflow-hidden rounded-lg bg-black bg-opacity-60 px-4 py-5 shadow sm:p-6">
                              <dt className="truncate text-sm font-medium text-gray-300">
                                Value Distribution
                              </dt>
                              <div className="flex h-full w-full items-center justify-center">
                                <dd className="mt-1 flex w-40 items-center justify-center sm:w-56">
                                  <Pie data={chartData} options={options} />
                                </dd>
                              </div>
                            </div>
                          </dl>
                        </div>

                        <Tokens
                          tokens={fungibleTokenData}
                          searchParams={searchParams.toString()}
                          walletAddress={params.walletAddress}
                        />
                      </>
                    )}
                    {searchParams.view === "nfts" && (
                      <>
                        {/* NFTs Metrics */}
                        <div className="mb-6">
                          <dl className="grid grid-cols-1 gap-5 shadow-sm sm:grid-cols-3">
                            <div className="overflow-hidden rounded-lg bg-black bg-opacity-60 px-4 py-5 shadow sm:p-6">
                              <dt className="truncate text-sm font-medium text-gray-300">
                                Total NFTs
                              </dt>
                              <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
                                {totalNFTs}
                              </dd>
                            </div>

                            <div className="overflow-hidden rounded-lg bg-black bg-opacity-60 px-4 py-5 shadow sm:p-6">
                              <dt className="truncate text-sm font-medium text-gray-300">
                                Total cNFTs
                              </dt>
                              <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
                                {totalcNFTs}
                              </dd>
                            </div>

                            <div className="overflow-hidden rounded-lg bg-black bg-opacity-60 px-4 py-5 shadow sm:p-6">
                              <dt className="truncate text-sm font-medium text-gray-300">
                                Total pNFTs
                              </dt>
                              <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
                                {totalpNFTs}
                              </dd>
                            </div>
                          </dl>
                        </div>

                        <NFTs
                          tokens={nonFungibleTokenData}
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
