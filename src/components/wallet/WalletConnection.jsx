

import { WalletIcon } from "@heroicons/react/24/solid";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const WalletConnection = () => {
  return (
    <div className="flex items-center">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      className="flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-black font-semibold px-2 py-2 rounded-3xl shadow-md"
                      type="button"
                    >
                      <WalletIcon className="w-5 h-5" />
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl"
                      type="button"
                    >
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div className="flex gap-3">
                    <button
                      onClick={openChainModal}
                      className="flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-black px-3 py-2 rounded-xl shadow"
                      type="button"
                    >
                      {chain.hasIcon && (
                        <img
                          alt={chain.name ?? "Chain icon"}
                          src={chain.iconUrl}
                          className="w-5 h-5"
                        />
                      )}
                      {chain.name}
                    </button>

                    <button
                      onClick={openAccountModal}
                      className="flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-black px-3 py-2 rounded-xl shadow"
                      type="button"
                    >
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default WalletConnection;
