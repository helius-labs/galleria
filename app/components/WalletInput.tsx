"use client";

import React, { useState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/app/components";

const WalletInput = ({ source }: { source: string }) => {
  const [inputValue, setInputValue] = useState<string>(""); // State for the input field value
  const [resolvedAddress, setResolvedAddress] = useState<string>(""); // New state for the resolved address
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let id = useId();
  const router = useRouter();
  const searchParams = useSearchParams();

  const validateSolanaPublicKey = async (
    address: string,
  ): Promise<string | null> => {
    if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
      return address;
    } else {
      const response = await fetch(
        `https://sns-sdk-proxy.bonfida.workers.dev/resolve/${address?.toLowerCase()}`,
      );
      const data = await response.json();
      if (data.s == "ok") {
        return data.result;
      }
      return null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update the inputValue state
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const resolvedAddr = await validateSolanaPublicKey(inputValue);
    if (!resolvedAddr) {
      console.log("Invalid Solana public key");
      toast.error("Invalid Solana public key");
      setInputValue(""); // Reset the input field to an empty string
      setIsLoading(false);

      return;
    }

    setIsValid(true); // Assuming the address is valid if it's resolved
    const currentView = searchParams.get("view") || "tokens";

    try {
      await router.push(
        `/portfolio/${encodeURIComponent(resolvedAddr)}?view=${currentView}`,
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
    }
  };

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
        value={inputValue}
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
