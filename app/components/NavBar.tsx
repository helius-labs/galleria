import React from "react";
import WalletInput from "./WalletInput";

const NavBar = () => {
  return (
    <div className="navbar bg-black bg-opacity-50 md:h-20">
      <div className="ml-3 flex-1 md:ml-10">
        <a className="p-1" href="/">
          <picture>
            {/* Mobile logo: shown on screens smaller than 768px */}
            <source media="(max-width: 767px)" srcSet="/smallLogo.svg" />
            {/* Default logo: shown on larger screens */}
            <img
              src="/fullLogo.svg"
              alt="Logo"
              className="h-auto w-10 md:h-auto md:w-48" // Adjust these classes as needed for size
            />
          </picture>
        </a>
      </div>
      <div className="mr-5 w-8/12 md:mr-10 md:w-3/12 md:flex-none">
        <WalletInput />
      </div>
    </div>
  );
};

export default NavBar;
