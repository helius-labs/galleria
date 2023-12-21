"use client";

import React, { useState, useEffect } from "react";
import { FungibleToken } from "@/app/types";

import { DynamicTokenRow } from "@/app/components";

interface TokenTableProps {
  source: string;
  tokens: FungibleToken[];
  walletAddress: string;
  perPage: number;
}

const TokenTable = ({
  source,
  tokens,
  walletAddress,
  perPage,
}: TokenTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedTokens, setSortedTokens] = useState<FungibleToken[]>([]);
  const itemsPerPage = perPage || 8; // Adjust the number of items per page as needed

  useEffect(() => {
    // Sort tokens by total value in descending order
    const sorted = [...tokens].sort(
      (a, b) =>
        (b.token_info.price_info?.total_price || 0) -
        (a.token_info.price_info?.total_price || 0),
    );
    setSortedTokens(sorted);
  }, [tokens]);

  if (!sortedTokens) {
    return <div>Loading...</div>;
  }

  const indexOfLastToken = currentPage * itemsPerPage;
  const indexOfFirstToken = indexOfLastToken - itemsPerPage;
  const currentTokens = sortedTokens.slice(indexOfFirstToken, indexOfLastToken);

  const paginate = (pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedTokens.length / itemsPerPage);

  return (
    <div>
      {/* Token Table */}
      <div className="overflow-x-auto rounded-lg bg-opacity-60 -m-3">
        <table className="w-full whitespace-nowrap text-left">
          {/* Table Body */}
          <colgroup>
            <col className="w-32" />
            <col className="w-32" />
            <col className="w-32" />
            <col className="w-32" />
            <col className="w-32" />
          </colgroup>

          {/* Table Head */}
          <thead className="border-b border-white/10 text-sm leading-6 text-white">
            <tr>
              <th
                scope="col"
                className=" py-2 pl-4 pr-8 font-semibold  sm:pl-6 lg:pl-8"
              >
                ICON
              </th>
              <th scope="col" className=" py-2 pl-0 pr-8 font-semibold ">
                SYMBOL
              </th>
              <th
                scope="col"
                className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
              >
                BALANCE
              </th>
              <th
                scope="col"
                className=" py-2 pl-0 pr-8 font-semibold  lg:pr-20"
              >
                PRICE
              </th>
              <th
                scope="col"
                className=" py-2 pl-0 pr-4 text-right font-semibold  sm:pr-6 lg:pr-8"
              >
                VALUE
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {currentTokens.map((token) => (
              <DynamicTokenRow
                key={token.id}
                token={token}
                walletAddress={walletAddress}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-14 mb-4 flex justify-center">
        <div className="join flex items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="h-8 w-8 rounded-full bg-indigo-100/5 text-white bg-opacity-50 ring-1 ring-inset ring-white/10 disabled:cursor-not-allowed disabled:bg-neutral"
            disabled={currentPage === 1}
          >
            «
          </button>

          <span className="mx-6 flex h-8 w-20 items-center justify-center rounded-full bg-indigo-100/5 text-sm font-semibold leading-6 text-white ring-1 ring-inset ring-white/10 transition duration-200 ease-in-out">
            Page {currentPage}
          </span>

          <button
            onClick={() => paginate(currentPage + 1)}
            className="h-8 w-8 rounded-full bg-indigo-100/5 text-white bg-opacity-50 ring-1 ring-inset ring-white/10 disabled:cursor-not-allowed disabled:bg-neutral"
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenTable;
