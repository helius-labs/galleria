import Image from "next/image";
import Link from "next/link";
import WalletInput from "./components/WalletInput";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-base-100">
      <div className="min-h-1/4 w-2/5 rounded-lg p-10 text-center">
        <h1 className="m-4 text-8xl font-bold">Galleria</h1>
        <p className="mb-4 text-2xl">
          A Portfolio Viewer from{" "}
          <span className="font-bold text-primary">Helius Labs</span>
        </p>
        <WalletInput />
      </div>
    </main>
  );
}
