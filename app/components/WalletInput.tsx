"use client";

import React, { useState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { Button } from "@/app/components";

const WalletInput = ({ source }: { source: string }) => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // New loading state

  let id = useId();
  const router = useRouter();
  const searchParams = useSearchParams();

  const validateSolanaPublicKey = (address: string): boolean => {
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
    setIsValid(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true); // Start loading

    if (!isValid) {
      console.log("Invalid Solana public key");
      toast.error("Invalid Solana public key");
      setWalletAddress(""); // Reset the input field to an empty string
      return;
    }

    const currentView = searchParams.get("view") || "tokens";

    try {
      await router.push(
        `/portfolio/${encodeURIComponent(walletAddress)}?view=${currentView}`,
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false); // Stop loading regardless of the result
      setWalletAddress(""); // Reset state of input field
    }
  };

  // New useEffect to validate the wallet address on every change to the input field
  useEffect(() => {
    setIsValid(validateSolanaPublicKey(walletAddress));
    console.log("isValid state is now:", isValid);
  }, [isValid, walletAddress]);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative isolate flex h-12 w-60 items-center pr-1.5 sm:w-80"
    >
      <label htmlFor={id} className="sr-only">
        Solana Wallet Address
      </label>
      <input
        required
        type="walletAddress"
        autoComplete="walletAddress"
        name="walletAddress"
        id={id}
        placeholder="Solana Wallet Address"
        className="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-[0.8125rem]/6"
        value={walletAddress}
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        isLoading={isLoading}
        disabled={!isValid || isLoading} // Disable the button if the input is invalid or if the form is loading
        arrow
      >
        Submit
      </Button>
      <div className="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-secondary" />
      <div className="bg-white/2.5 absolute inset-0 -z-10 rounded-lg ring-1 ring-white/50 transition peer-focus:ring-accent" />
    </form>
  );
};

export default WalletInput;
