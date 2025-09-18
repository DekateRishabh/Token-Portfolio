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
import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

const queryClient = new QueryClient();

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                        <h1 className="text-2xl font-bold text-dark-text-primary">
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
                    <div className="flex flex-col sm:flex-row  items-start sm:items-center gap-4">
                      <h3 className="text-xl font-semibold text-dark-text-primary">
                        ⭐ Watchlist
                      </h3>

                      <div className="flex flex-wrap gap-3 ml-auto">
                        <RefreshButton />
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-dark-bg bg-yellow-300 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
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
