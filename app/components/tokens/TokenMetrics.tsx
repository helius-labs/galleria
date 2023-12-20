"use client";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

import { FungibleToken } from "@/app/types";

interface TokenMetricsProps {
    fungibleTokens: FungibleToken[];
}

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

const TokenMetrics = ({ fungibleTokenData }: TokenMetricsProps) => {
    const [totalTokens, setTotalTokens] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: { data: number[]; backgroundColor: string[] }[];
    }>({ labels: [], datasets: [] });

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

    return (
        <>
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
        </>
    );
};

export default TokenMetrics;