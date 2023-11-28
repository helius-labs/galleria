import React from "react";
import WalletInput from "./WalletInput";

const NavBar = () => {
  return (
    <div className="navbar rounded-lg  p-2 md:p-4">
      <div className="flex-1">
        <a className="p-1" href="/">
          <img src="/logo.png" alt="Logo" className="w-24 md:w-48" />
        </a>
      </div>
      <div className="w-2/12 flex-1 md:w-4/12 md:flex-none">
        <WalletInput />
      </div>
    </div>
  );
};

export default NavBar;
