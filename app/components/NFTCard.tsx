import React from "react";
import { NonFungibleData } from "../types/nonFungibleData";

const NFTCard = ({ nftData }: NonFungibleData) => {
  // Extracting the relevant information from nftData
  const imageSrc = nftData.content.links.image;
  const title = nftData.content.metadata.name;
  const description = nftData.content.metadata.description;

  return (
    <div className="max-w-sm p-4">
      <div className="flex h-full flex-col rounded-lg bg-neutral-500 p-8 hover:bg-neutral-400 ">
        <figure className="mb-3 flex items-center">
          <h2 className="text-lg font-medium text-white dark:text-white">
            {title}
          </h2>
        </figure>
        <div className="flex-grow">
          <div className="h-72 w-72 overflow-hidden rounded-lg">
            <img src={imageSrc} alt={title} className="rounded-xl" />
          </div>

          {/* Link (update href accordingly) */}
          {/* <a
            href="#"
            className="mt-3 inline-flex items-center text-black hover:text-accent dark:text-white"
          >
            Learn More
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="ml-2 h-4 w-4"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
