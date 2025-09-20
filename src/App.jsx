import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { WagmiProvider } from "wagmi";
import { store, persistor } from "./store";
import { config } from "./components/wallet/config";
import PortfolioCard from "./components/portfolio/PortfolioCard";
import WatchlistTable from "./components/portfolio/WatchlistTable";
import RefreshButton from "./components/portfolio/RefreshButton";
import WalletConnection from "./components/wallet/WalletConnection";
import LoadingSpinner from "./components/common/LoadingSpinner";
import AddTokenModal from "./components/modals/AddTokenModal";
import logo from "./assets/logo.png";
import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

const queryClient = new QueryClient();

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const TokenPortfolioLogo = () => (
    <img
      src={logo}
      alt="Token Portfolio Logo"
      className="w-10 h-10 rounded-xl object-cover"
    />
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Provider store={store}>
            <PersistGate
              loading={<LoadingSpinner text="Loading portfolio..." />}
              persistor={persistor}
            >
              <div className="min-h-screen bg-dark-bg dark">
                {/* Header */}
                <header className="bg-dark-bg ">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                      <div className="flex items-center space-x-3">
                        <TokenPortfolioLogo />
                        <h1 className="text-2xl font-semibold text-dark-text-primary">
                          Token Portfolio
                        </h1>
                      </div>
                      <WalletConnection />
                    </div>
                  </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="space-y-6">
                    {/* Portfolio Summary */}
                    <PortfolioCard />

                    {/* Action Bar */}
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-8 h-8 text-lime-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-dark-text-primary">
                          Watchlist
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-3 ml-auto">
                        <RefreshButton />
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-dark-bg bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Add Token
                        </button>
                      </div>
                    </div>

                    {/* Watchlist */}
                    <WatchlistTable />
                  </div>
                </main>

                {/* Add Token Modal */}
                <AddTokenModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              </div>
            </PersistGate>
          </Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
