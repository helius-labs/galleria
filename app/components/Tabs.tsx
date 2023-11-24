"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Tabs = ({
  searchParams,
  walletAddress,
}: {
  searchParams: { view: string };
  walletAddress: string;
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <nav className="flex w-full">
        <Link
          href={`/portfolio/${walletAddress}?view=overview`}
          className={` flex-1 rounded-lg bg-neutral px-4 py-2 text-center font-bold hover:bg-neutral-500 ${
            searchParams.view === "overview" ? "text-primary" : "text-white"
          }`}
        >
          Overview
        </Link>
        <Link
          href={`/portfolio/${walletAddress}?view=tokens`}
          className={`mx-4 flex-1 rounded-lg bg-neutral px-4 py-2 text-center font-bold hover:bg-neutral-500 ${
            searchParams.view === "tokens" ? "text-primary" : "text-white"
          }`}
        >
          Tokens
        </Link>
        <Link
          href={`/portfolio/${walletAddress}?view=nfts`}
          className={` flex-1 rounded-lg bg-neutral px-4 py-2 text-center font-bold hover:bg-neutral-500 ${
            searchParams.view === "nfts" ? "text-primary" : "text-white"
          }`}
        >
          NFTs
        </Link>
      </nav>
    </div>
  );
};

export default Tabs;
