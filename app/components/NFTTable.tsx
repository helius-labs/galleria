"use client";
import React, { useState } from "react";
import NFTCard from "./NFTCard";
import { NonFungibleToken } from "../types/nonFungibleToken";

const NFTTable = ({
  searchParams,
  walletAddress,
  nftDataArray,
}: {
  searchParams: { view: string };
  walletAddress: string;
  nftDataArray: NonFungibleToken[];
}) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(nftDataArray.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nftDataArray.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className=" flex flex-col items-center justify-center px-4">
      <div className="flex w-full flex-wrap justify-center gap-4">
        {currentItems.map((nftData: NonFungibleToken, index) => (
          <NFTCard
            key={index}
            nftData={nftData}
            walletAddress={walletAddress}
            searchParams={searchParams}
          />
        ))}
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

export default NFTTable;
