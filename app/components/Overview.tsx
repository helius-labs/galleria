import React from "react";

import { Token } from "../types/fungibleToken";

const Overview = ({ tokens }: { tokens: Token[] }) => {
  if (!tokens) {
    return <div>Loading...</div>;
  }
  return (
    <div className="rounded-lg bg-neutral">
      <div className="p-5">
        <h1 className=" text-xl font-bold">Overview</h1>
      </div>
    </div>
  );
};

export default Overview;
