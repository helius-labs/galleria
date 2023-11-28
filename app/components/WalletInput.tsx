"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const WalletInput = () => {
  const searchParams = useSearchParams();
  const [walletAddress, setWalletAddress] = useState("");
  const [isValid, setIsValid] = useState(true); // State to track validity
  const router = useRouter();

  const validateSolanaPublicKey = (address: string): boolean => {
    // Simple check: length and allowed characters
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
    setIsValid(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidAddress = validateSolanaPublicKey(walletAddress);
    setIsValid(isValidAddress);

    if (!isValidAddress) {
      console.log("Invalid Solana public key");
      return;
    }

    const currentView = searchParams.get("view") || "nfts";
    console.log(currentView);

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
          className={`h-12 w-full max-w-sm rounded-lg border-2 ${
            isValid
              ? "bg-white"
              : "outline-4 outline-red-500 focus:outline-4 focus:outline-red-500"
          }  text-center text-black focus:border-2 focus:border-black focus:outline-none`}
          value={walletAddress}
          onChange={handleInputChange}
        />
        {/* <button
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
        </button> */}
      </div>
    </form>
  );
};

export default WalletInput;
