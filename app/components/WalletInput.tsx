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
    <div className="h-full w-full">
      <form onSubmit={handleSubmit} className="form-control">
        <input
          type="text"
          placeholder="Wallet Address"
          className={`rounded-lg border-2 border-white bg-transparent p-2 placeholder:text-gray-400 ${
            isValid
              ? ""
              : "border-4 border-red-500 focus:border-4 focus:border-red-500"
          } text-center text-white focus:border-2 focus:border-white focus:outline-none`}
          value={walletAddress}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default WalletInput;
