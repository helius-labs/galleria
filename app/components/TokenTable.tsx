"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FungibleToken } from "@/app/types";

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
  const router = useRouter();
  const searchParams = useSearchParams();

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
      <div className="overflow-x-auto rounded-lg bg-opacity-60">
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
            {currentTokens.map((token) => {
              const tokenImage = token.content.links.image;
              const tokenSymbol =
                token.token_info.symbol ||
                token.content.metadata.symbol ||
                token.id;
              const tokenBalance = (
                token.token_info.balance /
                Math.pow(10, token.token_info.decimals)
              ).toFixed(5);
              const tokenPrice =
                token.token_info.price_info?.price_per_token || "N/A";
              const tokenValue =
                token.token_info.price_info?.total_price?.toFixed(2) || "N/A";

              return (
                <tr
                  key={token.id}
                  onClick={() =>
                    router.push(
                      `/portfolio/${walletAddress}?${searchParams.toString()}&tokenDetails=${
                        token.id
                      }`,
                    )
                  }
                  className="group hover:cursor-pointer"
                >
                  {/* ICON */}
                  <td className="  py-4 pl-4  sm:pl-6 lg:pl-7">
                    <div className="flex items-center gap-x-4">
                      {tokenImage ? (
                        <img
                          src={tokenImage}
                          alt="Token Icon"
                          className="h-12 w-12 rounded-full bg-gray-800 ring-1 ring-white ring-opacity-0 ring-offset-1 transition-all duration-200 ease-in-out group-hover:ring-opacity-100"
                        />
                      ) : (
                        <div className="skeleton h-12 w-12 shrink-0 rounded-full" />
                      )}
                    </div>
                  </td>

                  {/* SYMBOL */}
                  <td className=" py-4 pl-0 pr-4  sm:pr-8">
                    <div className="flex gap-x-3">
                      <div className="rounded-md bg-gray-700/40 px-3 py-1.5 text-sm font-medium text-gray-400 ring-1 ring-inset ring-white/10 transition-all duration-200 ease-in-out group-hover:bg-gray-700/60 group-hover:text-white">
                        {tokenSymbol}
                      </div>
                    </div>
                  </td>

                  {/* BALANCE */}
                  <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                    <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                      <div className="text-gray-400 group-hover:text-white">
                        {tokenBalance}
                      </div>
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className=" py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 transition-all duration-200 ease-in-out group-hover:text-white  lg:pr-20">
                    {typeof tokenPrice === "number"
                      ? `$${tokenPrice}`
                      : tokenPrice}
                  </td>

                  {/* VALUE */}
                  <td className=" py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 transition-all duration-200 ease-in-out group-hover:text-white  sm:pr-6 lg:pr-8">
                    {tokenValue}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <div className="join">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="btn join-item btn-neutral text-white opacity-60 disabled:cursor-not-allowed disabled:bg-neutral disabled:text-gray-500 disabled:opacity-30"
            disabled={currentPage === 1}
          >
            «
          </button>

          <span className="flex items-center justify-center bg-neutral bg-opacity-60 px-2 text-white">
            Page {currentPage}
          </span>

          <button
            onClick={() => paginate(currentPage + 1)}
            className="btn join-item  btn-neutral text-white opacity-60 disabled:cursor-not-allowed disabled:bg-neutral disabled:text-gray-500 disabled:opacity-30"
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

{
  /* <div>
  <div className="relative mb-2 overflow-x-auto rounded-lg bg-opacity-60">
    <table className="min-w-full text-xs text-white sm:text-sm">
      <thead className=" border-b border-gray-500 bg-neutral bg-opacity-60 text-sm uppercase text-white">
        <tr>
          <th scope="col" className="px-6 py-3">
            Icon
          </th>
          <th scope="col" className="px-6 py-3">
            Symbol
          </th>
          <th scope="col" className="px-6 py-3">
            Balance
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        {currentTokens.map((token) => (
          <tr
            key={token.id}
            className="border-b border-neutral-600 bg-neutral bg-opacity-60 text-center text-white hover:bg-neutral-600 hover:bg-opacity-60"
            onClick={() =>
              router.push(
                `/portfolio/${walletAddress}?${searchParams.toString()}&tokenDetails=${
                  token.id
                }`,
              )
            }
          >
            <td className="px-6 py-3">
              <div className="flex items-center justify-center gap-3">
                <div className="avatar">
                  <div className="mask mask-circle h-12 w-12">
                    {token.content.links.image ? (
                      <img src={token.content.links.image} alt="Token Icon" />
                    ) : (
                      <div className="skeleton h-12 w-12 shrink-0 rounded-full" />
                    )}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              {token.token_info.symbol ||
                token.content.metadata.symbol ||
                token.id}
            </td>
            <td className="px-6 py-4">
              {(
                token.token_info.balance /
                Math.pow(10, token.token_info.decimals)
              ).toFixed(2)}
            </td>
            <td className="px-6 py-4">
              ${token.token_info.price_info?.price_per_token || "N/A"}
            </td>
            <td className="px-6 py-4">
              ${token.token_info.price_info?.total_price?.toFixed(2) || "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div> */
}
