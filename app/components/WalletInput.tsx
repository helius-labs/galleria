"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const WalletInput = () => {
  const searchParams = useSearchParams();
  const [walletAddress, setWalletAddress] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const currentView = searchParams.get("view") || "nfts";
    console.log(currentView);

    // Navigate to the portfolio page with the wallet address and view parameter
    router.push(
      `/portfolio/${encodeURIComponent(walletAddress)}?view=${currentView}`,
    );
    setWalletAddress("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-control">
      <div className="flex justify-center gap-2">
        <input
          type="text"
          placeholder="Wallet Address"
          className="w-full max-w-sm rounded-lg border-2 border-black bg-white text-center text-black focus:border-2 focus:border-black focus:outline-none"
          value={walletAddress}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="rounded-lg border-2 border-black bg-primary p-1 hover:bg-accent"
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
    </form>
  );
};

export default WalletInput;
