import React from "react";
import { Token } from "../types/token";

const Tokens = ({ tokens }: { tokens: Token[] }) => {
  if (!tokens) {
    return <div>Loading...</div>;
  }
  return (
    <div className="rounded-lg bg-neutral">
      <div className="p-5">
        <h1 className=" text-xl font-bold">Overview</h1>
        <div className="">
          <h1>Tokens</h1>
          <div className="relative overflow-x-hidden shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="bg-neutral-800 text-xs uppercase text-white ">
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
                {tokens.map((token) => (
                  <tr
                    key={token.id}
                    className=" border-b border-neutral-800 bg-neutral-500 text-white hover:bg-neutral-400 "
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src="https://quei6zhlcfsxdfyes577gy7bkxmuz7qqakyt72xlbkyh7fysmoza.arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I"
                              alt="Avatar"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{token.token_info.symbol}</td>
                    <td className="px-6 py-4">{token.token_info.balance}</td>
                    <td className="px-6 py-4">
                      {token.token_info.price_info?.total_price || "N/A"}
                    </td>
                    <td className="px-6 py-4">{token.value || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokens;
