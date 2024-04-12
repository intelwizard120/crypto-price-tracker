import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// 1. Get projectId

const projectId = "6fadb3cd60a1a14ff379f875a0f3e917";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

// 3. Create a metadata object
const metadata = {
  name: "CoinWatch",
  description: "CryptoCurrency Wallet Tracker",
  url: "https://coinwatch.com", // origin must match your domain & subdomain
  icons: ["https://avatars.coinwatch.com/"],
};

// 4. Create Ethers config
export const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  //defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
export const createMyWeb3Modal = () => {
    createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    });
}

