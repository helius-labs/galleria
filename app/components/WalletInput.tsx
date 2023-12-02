"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const WalletInput = ({ source }: { source: string }) => {
  const searchParams = useSearchParams();
  const [walletAddress, setWalletAddress] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const router = useRouter();

  useEffect(() => {
    console.log("isLoading state is now:", isLoading);
  }, [isLoading]); // This effect will run whenever isLoading changes

  const validateSolanaPublicKey = (address: string): boolean => {
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
    setIsValid(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidAddress = validateSolanaPublicKey(walletAddress);
    setIsValid(isValidAddress);

    if (!isValidAddress) {
      console.log("Invalid Solana public key");
      return;
    }

    setIsLoading(true); // Start loading

    const currentView = searchParams.get("view") || "overview";

    try {
      await router.push(
        `/portfolio/${encodeURIComponent(walletAddress)}?view=${currentView}`,
      );
    } finally {
      //setIsLoading(false); // Stop loading regardless of the result
    }

    setWalletAddress("");
  };

  return (
    <div className="h-full w-full">
      {!isLoading ? (
        <form onSubmit={handleSubmit} className="form-control">
          <div className="flex w-full justify-center">
            <input
              type="text"
              placeholder="Wallet Address"
              className={` rounded-lg border-2 border-white bg-transparent p-2 placeholder:text-gray-400 focus:shadow-glow ${
                isValid
                  ? ""
                  : "border-4 border-red-500 focus:border-4 focus:border-red-500"
              } w-9/12 text-center text-white focus:border-2  focus:outline-none`}
              value={walletAddress}
              onChange={handleInputChange}
            />
            {source == "landingPage" && (
              <button
                type="submit"
                className="mx-2 rounded-lg border-2 border-white bg-primary p-1 hover:bg-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-8 w-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="flex justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default WalletInput;
