import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const WalletConnection = () => {
  return (
    <div className="flex items-center">
      <ConnectButton
        chainStatus="icon"
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
        showBalance={{
          smallScreen: false,
          largeScreen: true,
        }}
      />
    </div>
  );
};

export default WalletConnection;
