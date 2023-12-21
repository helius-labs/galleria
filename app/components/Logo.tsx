"use client";

import React, { useState } from "react";

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <a
        href="/"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative inline-block w-10 cursor-pointer md:w-3/8"
      >
        <picture>
          {/* Mobile logo: shown on screens smaller than 768px */}
          <source
            media="(max-width: 767px)"
            srcSet="/helius-logos/desktop-logo.svg"
          />

          {/* Default logo: shown on larger screens */}
          <img
            src="/helius-logos/desktop-logo.svg"
            alt="Helius Logo"
            className={`transition-opacity duration-200 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src="/helius-logos/desktop-logo-hover.svg"
            alt="Helius Hover Logo"
            className={`absolute left-0 top-0 transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </picture>
      </a>
    </>
  );
};

export default Logo;