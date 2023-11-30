"use client";
import React, { useState, useEffect } from "react";
import { FungibleToken } from "../types/fungibleToken";
import { useRouter } from "next/navigation";

const TokenTable = ({
  tokens,
  walletAddress,

  searchParams,
}: {
  tokens: FungibleToken[];
  walletAddress: string;

  searchParams: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedTokens, setSortedTokens] = useState<FungibleToken[]>([]);
  const itemsPerPage = 8; // Adjust the number of items per page as needed
  const router = useRouter();

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
    <div className="rounded-lg bg-black bg-opacity-50 ">
      <div className="p-3 sm:p-5">
        <div className="relative m-2 overflow-x-auto rounded-lg bg-opacity-60">
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
                      `/portfolio/${walletAddress}?${searchParams}&tokenDetails=${token.id}`,
                    )
                  }
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-circle h-12 w-12">
                          {token.content.links.image ? (
                            <img
                              src={token.content.links.image}
                              alt="Token Icon"
                            />
                          ) : (
                            <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
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
                    {token.token_info.price_info?.price_per_token || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {token.token_info.price_info?.total_price || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center pb-2 sm:pb-4">
        <div className="join">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="btn join-item btn-neutral text-white opacity-60 disabled:bg-neutral disabled:text-gray-500 disabled:opacity-30"
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className=" bg-neutral bg-opacity-60 px-2 text-white">
            Page {currentPage}
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="btn join-item  btn-neutral text-white opacity-60 disabled:bg-neutral disabled:text-gray-500 disabled:opacity-30"
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
