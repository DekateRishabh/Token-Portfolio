import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, mainnet, optimism, polygon } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Token Portfolio",
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum],
});
