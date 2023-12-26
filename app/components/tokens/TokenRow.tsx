import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from "next/navigation";

import { FungibleToken } from "@/app/types";

interface TokenRowProps {
    token: FungibleToken;
    walletAddress: string;
}

const TokenRow = ({ token, walletAddress }: TokenRowProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const tokenImage = token.content.links.image;
    const tokenSymbol =
      token.token_info.symbol || token.content.metadata.symbol || token.id;
    const tokenBalance = (
      token.token_info.balance / Math.pow(10, token.token_info.decimals)
    ).toFixed(5);
    const tokenPrice = token.token_info.price_info?.price_per_token || "N/A";
    const tokenValue =
      token.token_info.price_info?.total_price?.toFixed(2) || "N/A";

    return (
      <>
        <tr
          key={token.id}
          onClick={() =>
            router.push(
              `/portfolio/${walletAddress}?${searchParams.toString()}&tokenDetails=${
                token.id
              }`,
            )
          }
          className="group hover:cursor-pointer"
        >
          {/* ICON */}
          <td className="  py-4 pl-4  sm:pl-6 lg:pl-7">
            <div className="flex items-center gap-x-4">
              {tokenImage ? (
                <img
                  src={tokenImage}
                  alt="Token Icon"
                  className="h-12 w-12 rounded-full bg-gray-800 ring-1 ring-white ring-opacity-0  transition-all duration-200 ease-in-out group-hover:ring-opacity-100"
                />
              ) : (
                <div className="skeleton h-12 w-12 shrink-0 rounded-full" />
              )}
            </div>
          </td>

          {/* SYMBOL */}
          <td className=" py-4 pl-0 pr-4  sm:pr-8">
            <div className="flex gap-x-3">
              <div className="w-24 rounded-md bg-indigo-100/5 py-1 text-center text-sm font-semibold leading-6 text-gray-400 ring-1 ring-inset ring-white/10 transition duration-200 ease-in-out group-hover:ring-white/30 group-hover:text-white">
                {tokenSymbol.toString().length > 8
                  ? `${tokenSymbol.slice(0, 3)}...${tokenSymbol.slice(-3)}`.toUpperCase()
                  : tokenSymbol.slice(0, 8).toUpperCase()}
              </div>
            </div>
          </td>

          {/* BALANCE */}
          <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
            <div className="flex items-center justify-end gap-x-2 sm:justify-start">
              <div className="text-gray-400 group-hover:text-white">
                {tokenBalance}
              </div>
            </div>
          </td>

          {/* PRICE */}
          <td className=" py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 transition-all duration-200 ease-in-out group-hover:text-white  lg:pr-20">
            {typeof tokenPrice === "number" ? `$${tokenPrice}` : tokenPrice}
          </td>

          {/* VALUE */}
          <td className=" py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 transition-all duration-200 ease-in-out group-hover:text-white  sm:pr-6 lg:pr-8">
            ${tokenValue}
          </td>
        </tr>
      </>
    );
};

const DynamicTokenRow = dynamic(() => Promise.resolve(TokenRow), {
    ssr: true,
});

export default DynamicTokenRow;