"use client";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { FungibleToken } from "../types/fungibleToken";
import { NonFungibleToken } from "../types/nonFungibleToken";
import NFTTable from "./NFTTable";
import TokenTable from "./TokenTable";

const Overview = ({
  searchParams,
  walletAddress,
  nonFungibleTokens,
  fungibleTokens,
}: {
  searchParams: string;
  walletAddress: string;
  nonFungibleTokens: NonFungibleToken[];
  fungibleTokens: FungibleToken[];
}) => {
  let datasets: { data: number[]; backgroundColor: string[] }[] = [];
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
  }>({ labels: [], datasets: [] });
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (fungibleTokens) {
      const data = fungibleTokens.map(
        (token) => token.token_info.price_info?.total_price,
      );
      const labels = fungibleTokens.map(
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

      const total = fungibleTokens.reduce(
        (acc, token) => acc + (token.token_info.price_info?.total_price || 0),
        0,
      );
      setTotalValue(total);
    }
  }, [fungibleTokens]);

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

  if (!nonFungibleTokens) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-lg bg-black bg-opacity-50">
      <div className="p-5">
        <h1 className="text-xl font-bold">Tokens:</h1>
        <hr className="my-2 border-gray-600" />
        <div className="flex flex-col p-2 md:flex-row">
          <div className="mb-4 px-2 md:mb-0 md:w-1/4">
            <h2 className="font-bold">
              Total Token Value:
              <span className="font-bold text-primary">
                {" "}
                {totalValue.toFixed(2)} USDC
              </span>
            </h2>
            {totalValue !== 0 && (
              <div>
                <h1 className="py-3 font-bold">Token Value Distribution:</h1>
                <div className="p-2">
                  <Pie data={chartData} options={options} />
                </div>
              </div>
            )}
          </div>
          <div className="px-2 md:w-3/4">
            <TokenTable
              tokens={fungibleTokens}
              walletAddress={walletAddress}
              source="overview"
            />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold">NFTs:</h1>
          <hr className="my-2 border-gray-600" />
          <div className="p-2">
            <NFTTable
              nftDataArray={nonFungibleTokens}
              walletAddress={walletAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
