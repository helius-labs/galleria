"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import NFTCard from "./NFTCard";
import { NonFungibleToken } from "../types/nonFungibleToken";
import { useParams } from "next/navigation";

const NFTTable = ({
  walletAddress,
  nftDataArray,
}: {
  walletAddress: string;
  nftDataArray: NonFungibleToken[];
}) => {
  const searchParams = useSearchParams();
  const collectionFilter = searchParams.get("collection");

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [groupedNFTs, setGroupedNFTs] = useState<
    Map<string, NonFungibleToken[]>
  >(new Map());

  useEffect(() => {
    // Group NFTs by their collection
    const grouped = new Map<string, NonFungibleToken[]>();
    nftDataArray.forEach((nft) => {
      const collectionKey =
        nft.grouping.find((g) => g.group_key === "collection")?.group_value ||
        "Unknown";
      if (!grouped.has(collectionKey)) {
        grouped.set(collectionKey, []);
      }
      grouped.get(collectionKey)?.push(nft);
    });
    setGroupedNFTs(grouped);
  }, [nftDataArray]);

  // Filter grouped NFTs based on the collection query parameter
  const filteredNFTs = collectionFilter
    ? groupedNFTs.get(collectionFilter) || []
    : Array.from(groupedNFTs.values()).flat();

  const totalItems = filteredNFTs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNFTs.slice(indexOfFirstItem, indexOfLastItem);
  const MemoizedNFTCard = React.memo(NFTCard);
  const searchPar = useSearchParams();
  const param = useParams();

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="flex w-full flex-wrap justify-center gap-4">
        {currentItems.map((nftData) => (
          <MemoizedNFTCard
            key={nftData.id}
            nftData={nftData}
            walletAddress={walletAddress}
            searchParams={searchPar.toString()}
          />
        ))}
      </div>

      <div className="flex justify-center p-4">
        <div className="join">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="btn join-item btn-neutral text-white opacity-60 disabled:bg-neutral disabled:text-gray-500 disabled:opacity-30"
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className="bg-neutral px-2 text-white opacity-60">
            Page {currentPage}
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="btn join-item btn-neutral text-white opacity-60 disabled:bg-neutral disabled:text-gray-500 disabled:opacity-30"
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
