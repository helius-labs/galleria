"use client";

import React, { useState } from "react";
import { PhotoIcon, StopCircleIcon } from "@heroicons/react/24/outline";

import { HeaderNavigation, MobileNavigation, SidebarNavigation } from "..";

interface NavigationProps {
  searchParams: {
    view: string;
  };
  params: {
    walletAddress: string;
  };
}

const navigation = [
  { name: "Tokens", href: "tokens", icon: StopCircleIcon },
  { name: "NFTs", href: "nfts", icon: PhotoIcon },
];

const Navigation = ({
    params,
    searchParams
}: NavigationProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
      <>
        {/* Mobile navigation */}
        <MobileNavigation
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigation}
          searchParams={searchParams}
          params={params}
        />

        {/* Sidebar navigation */}
        <SidebarNavigation
          navigation={navigation}
          searchParams={searchParams}
          params={params}
        />

        {/* Navbar */}
        <HeaderNavigation setSidebarOpen={setSidebarOpen} />
      </>
    );
};

export default Navigation;