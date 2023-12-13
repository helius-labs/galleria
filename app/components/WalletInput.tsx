"use client";

import React, { useState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { toast } from "react-toastify";

import Button from "../components/Button";

const WalletInput = ({ source }: { source: string }) => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false); // New loading state

  let id = useId();
  const router = useRouter();
  const searchParams = useSearchParams();

  const validateSolanaPublicKey = async (address: string): Promise<boolean> => {
    if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
      return true;
    } else {
      const response = await fetch(
        `https://sns-sdk-proxy.bonfida.workers.dev/resolve/${address?.toLowerCase()}`,
      );
      const data = await response.json();

      if (data.s === "ok") {
        console.log("Wallet:", data.result);
        setWalletAddress(data.result);
        return true;
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true); // Start loading
    setIsValid(await validateSolanaPublicKey(walletAddress));

    if (!isValid) {
      console.log("Invalid Solana public key");
      toast.error("Invalid Solana public key");
      setWalletAddress(""); // Reset the input field to an empty string
      return;
    }

    const currentView = searchParams.get("view") || "overview";

    try {
      await router.push(
        `/portfolio/${encodeURIComponent(walletAddress)}?view=${currentView}`,
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false); // Stop loading regardless of the result
      setWalletAddress("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative isolate flex h-12 w-80 items-center pr-1.5"
    >
      <label htmlFor={id} className="sr-only">
        Solana Wallet Address
      </label>
      <input
        required
        type="text"
        autoComplete="off"
        name="walletAddress"
        id={id}
        placeholder="Solana Wallet Address"
        className="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-[0.8125rem]/6"
        value={walletAddress} // set the value to the state
        onChange={(e) => setWalletAddress(e.target.value)} // update the state when the input changes
      />
      <Button
        type="submit"
        isLoading={isLoading}
        disabled={!isValid || isLoading}
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
