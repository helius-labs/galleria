"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { Grouping, NonFungibleToken } from "../types/nonFungibleToken";

const NFTFilters = ({ nftDataArray }: { nftDataArray: NonFungibleToken[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [collections, setCollections] = useState<Grouping[]>([]);

  useEffect(() => {
    // Extract unique collection values from nftDataArray
    const collectionMap = new Map<string, Grouping>();
    nftDataArray.forEach((nft) => {
      const collection = nft.grouping.find((g) => g.group_key === "collection");
      if (collection && collection.collection_metadata) {
        collectionMap.set(collection.group_value, collection);
      }
    });
    setCollections(Array.from(collectionMap.values()));
  }, [nftDataArray]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleCollectionFilter = (collection: string) => {
    const queryString = createQueryString("collection", collection);
    router.push(`${pathname}?${queryString}`);
  };

  const handleNoFilter = () => {
    // Create a new instance of URLSearchParams
    const newSearchParams = new URLSearchParams(searchParams);

    // Delete the 'collection' parameter
    newSearchParams.delete("collection");

    // Navigate to the updated URL
    const newURL = `${pathname}?${newSearchParams.toString()}`;
    router.push(newURL);
  };

  return (
    <div className="flex w-full flex-col items-center px-4 py-2">
      <h1 className="p-1 text-lg font-bold">Filters</h1>
      <ul className="menu w-full rounded-box bg-neutral bg-opacity-50">
        <li>
          <details>
            <summary className="text-base">Choose collection</summary>
            <ul className="max-h-60 overflow-y-auto">
              {/* Scrollable list */}
              {/* No Filter Option */}
              <li
                onClick={handleNoFilter}
                className="w-full hover:bg-neutral-500 hover:bg-opacity-60"
              >
                <a className="block px-4 py-2 text-sm text-white">No Filter</a>
              </li>
              {/* Collection Filters */}
              {collections.map((collection) =>
                collection.collection_metadata ? (
                  <li
                    key={collection.group_value}
                    onClick={() =>
                      handleCollectionFilter(collection.group_value)
                    }
                    className="w-full hover:bg-neutral-500 hover:bg-opacity-60"
                  >
                    <a className="block px-4 py-2 text-sm text-white">
                      {collection.collection_metadata.name}
                    </a>
                  </li>
                ) : null,
              )}
            </ul>
          </details>
        </li>
      </ul>
    </div>
  );
};

export default NFTFilters;
