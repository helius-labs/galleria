import React from "react";

const Tabs = () => {
  return (
    <div className=" flex  items-center justify-center ">
      <nav className="flex w-full">
        <div className="mr-4 flex-1 rounded-lg bg-neutral px-4 py-2 text-center font-bold text-white hover:bg-neutral-500">
          Overview
        </div>
        <div className=" mx-4 flex-1 rounded-lg bg-neutral px-4 py-2 text-center font-bold text-white hover:bg-neutral-500">
          Tokens
        </div>
        <div className="ml-4 flex-1 rounded-lg bg-neutral px-4 py-2 text-center font-bold text-white hover:bg-neutral-500">
          NFTs
        </div>
      </nav>
    </div>
  );
};

export default Tabs;
