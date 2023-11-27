"use client";
import React, { useState } from "react";
import { FungibleToken } from "../types/fungibleToken";

const TokenTable = ({ tokens }: { tokens: FungibleToken[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust the number of items per page as needed

  if (!tokens) {
    return <div>Loading...</div>;
  }

  const indexOfLastToken = currentPage * itemsPerPage;
  const indexOfFirstToken = indexOfLastToken - itemsPerPage;
  const currentTokens = tokens.slice(indexOfFirstToken, indexOfLastToken);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(tokens.length / itemsPerPage);

  return (
    <div className="rounded-lg bg-neutral">
      <div className="p-5">
        <h1 className="text-xl font-bold">Tokens</h1>
        <div className="relative overflow-x-hidden shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-neutral-800 text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Profile
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
                  className="border-b border-neutral-800 bg-neutral-500 text-white hover:bg-neutral-400"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          {/* <img
                            src="https://quei6zhlcfsxdfyes577gy7bkxmuz7qqakyt72xlbkyh7fysmoza.arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I"
                            alt="Avatar"
                          /> */}
                          <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {token.token_info.symbol || token.id}
                  </td>
                  <td className="px-6 py-4">{token.token_info.balance}</td>
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
      <div className="flex justify-center p-4">
        <div className="join">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="btn btn-primary join-item text-white disabled:bg-primary disabled:text-white disabled:opacity-30"
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className=" bg-primary px-2 text-white">
            Page {currentPage}
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="btn btn-primary join-item text-white disabled:bg-primary disabled:text-white disabled:opacity-30"
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
