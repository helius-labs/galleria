import React from "react";
import WalletInput from "./WalletInput";

const NavBar = () => {
  return (
    <div className="navbar rounded-lg bg-neutral ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Helius</a>
      </div>
      <div className="flex-none gap-2">
        <WalletInput />
      </div>
    </div>
  );
};

export default NavBar;
