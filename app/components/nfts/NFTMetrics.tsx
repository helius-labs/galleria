"use client";

import React, { useEffect, useState } from "react";

import { NonFungibleToken } from "@/app/types";

interface NFTMetricsProps {
  nonFungibleTokens: NonFungibleToken[];
}

const NFTMetrics = ({ nonFungibleTokens }: NFTMetricsProps) => {
  const [totalNFTs, setTotalNFTs] = useState(0);
  const [totalcNFTs, setTotalcNFTs] = useState(0);
  const [totalpNFTs, setTotalpNFTs] = useState(0);

  useEffect(() => {
    const totalNFTs = nonFungibleTokens.length;
    const totalcNFTs = nonFungibleTokens.filter(
      (token) => token.compression.compressed === true,
    ).length;
    const totalpNFTs = nonFungibleTokens.filter(
      (token) => token.interface === "ProgrammableNFT",
    ).length;

    setTotalNFTs(totalNFTs);
    setTotalcNFTs(totalcNFTs);
    setTotalpNFTs(totalpNFTs);
  }, [nonFungibleTokens]);

  return (
    <>
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
    </>
  );
};

export default NFTMetrics;
