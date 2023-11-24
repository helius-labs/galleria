import Image from "next/image";
import Link from "next/link";
import WalletInput from "./components/WalletInput";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-base-100">
      <div className="min-h-1/4 w-2/5 rounded-lg  border-2 border-black bg-neutral p-10 text-center">
        <h1 className="m-4 text-5xl font-bold">Highlights</h1>
        <p className="mb-4 text-lg">A Portfolio Viewer from Helius Labs</p>
        <WalletInput />
      </div>
    </main>
  );
}
