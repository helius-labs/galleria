import React from "react";
import { NonFungibleData } from "../types/nonFungibleData";

const NFTCard = ({ nftData }) => {
  // Extracting the relevant information from nftData
  const imageSrc = nftData.content.links.image;
  const title = nftData.content.metadata.name;
  const description = nftData.content.metadata.description;

  return (
    <div className="card w-72 bg-base-100 shadow-xl">
      <figure>
        <div className="h-72 w-72 overflow-hidden rounded-t-lg">
          {/* Link to the image */}
          <a href={imageSrc} target="_blank" rel="noopener noreferrer">
            <img
              src={imageSrc} // Use the image source from the data
              className="h-full w-full object-cover"
              alt={description}
            />
          </a>
        </div>
      </figure>
      <div className="card-body">
        {/* Name of the NFT */}
        <h2 className="card-title">{title}</h2>
        {/* Description of the NFT */}
        <p>{description}</p>
      </div>
    </div>
  );
};

export default NFTCard;
