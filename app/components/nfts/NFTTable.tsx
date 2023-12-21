"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { NonFungibleToken } from "@/app/types";
import { NFTCard } from "@/app/components";

interface NFTTableProps {
  walletAddress: string;
  nftDataArray: NonFungibleToken[];
}

const NFTTable = ({ walletAddress, nftDataArray }: NFTTableProps) => {
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
    if (nft.interface === "ProgrammableNFT") return "ProgrammableNFT";
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
    <div className="flex flex-col items-center justify-center">
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

          {/* Pagination */}
          <div className="mb-4 mt-14 flex justify-center">
            <div className="join flex items-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                className="h-8 w-8 rounded-full bg-indigo-100/5 bg-opacity-50 text-white ring-1 ring-inset ring-white/10 disabled:cursor-not-allowed disabled:bg-neutral"
                disabled={currentPage === 1}
              >
                «
              </button>

              <span className="mx-6 flex h-8 w-20 items-center justify-center rounded-full bg-indigo-100/5 text-sm font-semibold leading-6 text-white ring-1 ring-inset ring-white/10 transition duration-200 ease-in-out">
                Page {currentPage}
              </span>

              <button
                onClick={() => paginate(currentPage + 1)}
                className="h-8 w-8 rounded-full bg-indigo-100/5 bg-opacity-50 text-white ring-1 ring-inset ring-white/10 disabled:cursor-not-allowed disabled:bg-neutral"
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
