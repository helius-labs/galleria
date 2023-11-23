"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const WalletInput = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const handleSubmit = () => {
    // Navigate to the portfolio page with the wallet address as a query parameter
    router.push(
      `/portfolio/${encodeURIComponent(walletAddress)}?view=overview`,
    );
  };

  return (
    <div className="form-control">
      <div className="flex justify-center gap-2">
        <input
          type="text"
          placeholder="wallet address"
          className="w-full max-w-sm rounded-lg border-2 border-black bg-white text-center text-black focus:border-black focus:outline-none"
          value={walletAddress}
          onChange={handleInputChange} // Update the state with the input value
        />
        <button
          className="rounded-lg border-2 border-black bg-primary p-1 hover:bg-accent"
          onClick={handleSubmit} // Call the navigation function when clicked
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="black"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WalletInput;
