import React from "react";

import WalletInput from "./WalletInput";

const NavBar = () => {
  return (
    <>
      <nav className="flex w-full items-center justify-between bg-black bg-opacity-50 px-4 py-2 sm:px-10 md:h-20">
        <a href="/">
          <picture>
            {/* Mobile logo: shown on screens smaller than 768px */}
            <source media="(max-width: 767px)" srcSet="/smallLogo.svg" />
            {/* Default logo: shown on larger screens */}
            <img
              src="/fullLogo.svg"
              alt="Logo"
              className="h-auto w-10 md:h-auto md:w-48"
            />
          </picture>
        </a>
        <WalletInput source={"navBar"} />
      </nav>
    </>
  );
};

export default NavBar;
