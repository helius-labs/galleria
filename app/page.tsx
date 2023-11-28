import Image from "next/image";
import Link from "next/link";
import WalletInput from "./components/WalletInput";

export default function Home() {
  return (
    <main className="bg-radial-gradient flex h-screen items-center justify-center p-4 md:p-10">
      <div className="w-full rounded-lg text-center md:w-2/5">
        <h1 className="m-4 text-4xl font-bold md:text-8xl">Galleria</h1>
        <p className="mb-4 text-xl md:text-2xl">
          A Portfolio Viewer from{" "}
          <span className="font-bold text-primary">Helius Labs</span>
        </p>
        <WalletInput />
      </div>
    </main>
  );
}
