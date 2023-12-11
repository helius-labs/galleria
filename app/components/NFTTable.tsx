"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { NonFungibleToken } from "@/app/types";
import { NFTCard } from "@/app/components";

interface NFTTableProps {
  walletAddress: string;
  nftDataArray: NonFungibleToken[];
}

const NFTTable = ({
  walletAddress,
  nftDataArray,
}: NFTTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const collectionFilter = searchParams.get("collection");
  const typeFilter = searchParams.get("type");

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredNFTs, setFilteredNFTs] = useState<NonFungibleToken[]>([]);

  const categorizeNFT = (nft: NonFungibleToken) => {
    if (nft.compression && nft.compression.compressed) return "CompressedNFT";
    if (nft.inscription) return "Inscription";
    if (nft.spl20) return "SPL20";
    return "StandardNFT";
  };

  useEffect(() => {
    let filtered = nftDataArray.map((nft) => ({
      ...nft,
      type: categorizeNFT(nft),
    }));

    if (collectionFilter) {
      filtered = filtered.filter(
        (nft) =>
          nft.grouping.find((g) => g.group_key === "collection")
            ?.group_value === collectionFilter,
      );
    }

    if (typeFilter) {
      filtered = filtered.filter((nft) => nft.type === typeFilter);
    }

    setFilteredNFTs(filtered);
  }, [nftDataArray, collectionFilter, typeFilter]);

  const totalItems = filteredNFTs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNFTs.slice(indexOfFirstItem, indexOfLastItem);
  const MemoizedNFTCard = React.memo(NFTCard);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const clearFilters = () => {
    // Create a new instance of URLSearchParams
    const newSearchParams = new URLSearchParams(searchParams);
    // Delete the 'collection' parameter
    newSearchParams.delete("collection");
    newSearchParams.delete("type");

    // Navigate to the updated URL
    const newURL = `${pathname}?${newSearchParams.toString()}`;
    router.push(newURL);
  };

  return (
    <div className="flex flex-col items-center justify-center  px-4">
      {currentItems.length > 0 ? (
        <>
          <div className="flex w-full flex-wrap justify-center gap-4">
            {currentItems.map((nftData) => (
              <MemoizedNFTCard
                key={nftData.id}
                nftData={nftData}
                walletAddress={walletAddress}
                searchParams={searchParams.toString()}
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
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center p-10 text-center text-lg font-semibold">
          <h1 className="text-2xl">No NFTs Found</h1>
          {(collectionFilter || typeFilter) && (
            <button
              className="btn btn-neutral m-5 bg-opacity-60 text-base text-white "
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NFTTable;
