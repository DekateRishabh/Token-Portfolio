import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { addToken } from "../../store/slices/portfolioSlice";
import { searchTokens, getTrendingTokens } from "../../services/coingecko";
import { StarIcon } from "@heroicons/react/24/solid";

const AddTokenModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trendingTokens, setTrendingTokens] = useState([]);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("trending");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      loadTrendingTokens();
      setSearchResults([]);
      setSearchQuery("");
      setSelectedTokens([]);
      setActiveTab("trending");
    }
  }, [isOpen]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
        setActiveTab("search");
      } else {
        setSearchResults([]);
        setActiveTab("trending");
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const loadTrendingTokens = async () => {
    try {
      setLoading(true);
      const trending = await getTrendingTokens();
      setTrendingTokens(trending);
    } catch (error) {
      console.error("Error loading trending tokens:", error);
      setTrendingTokens([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const results = await searchTokens(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching tokens:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTokenSelect = (token) => {
    const isSelected = selectedTokens.some((t) => t.id === token.id);
    if (isSelected) {
      setSelectedTokens(selectedTokens.filter((t) => t.id !== token.id));
    } else {
      setSelectedTokens([...selectedTokens, token]);
    }
  };

  const handleAddToWatchlist = () => {
    selectedTokens.forEach((token) => {
      dispatch(addToken(token));
    });
    setSelectedTokens([]);
    onClose();
  };

  const currentTokens = activeTab === "search" ? searchResults : trendingTokens;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
      />

      <div className="relative bg-[#1e1e1e] text-gray-200 w-[620px] rounded-xl shadow-xl overflow-hidden z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="p-3 border-b border-gray-700">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tokens (e.g., ETH, SOL)…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2a2a2a] rounded-lg py-2 pl-10 pr-3 text-sm outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="px-3 py-2 text-xs text-gray-400 font-semibold">
          {activeTab === "search" ? "Search Results" : "Trending"}
        </div>

        {/* Tokens list */}
        <div className="max-h-[300px] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center py-10 text-gray-400">
              Loading...
            </div>
          ) : currentTokens.length > 0 ? (
            <ul>
              {currentTokens.map((token) => {
                const isSelected = selectedTokens.some(
                  (t) => t.id === token.id
                );
                return (
                  <li
                    key={token.id}
                    onClick={() => handleTokenSelect(token)}
                    className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors duration-200 ${
                      isSelected
                        ? "bg-lime-900/20 hover:bg-lime-900/30"
                        : "hover:bg-lime-900/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={token.image}
                        alt={token.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm">
                        {token.name} ({token.symbol?.toUpperCase()})
                      </span>
                    </div>
                    <div className="flex items-center gap-5">
                      {isSelected && (
                        <StarIcon className="w-4 h-4 text-lime-400 fill-lime-400" />
                      )}
                      {isSelected ? (
                        <div className="w-4 h-4 bg-lime-400 rounded-full flex items-center justify-center">
                          <CheckIcon className="w-4 h-4 text-black stroke-1" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center py-10 text-gray-500 text-sm">
              {activeTab === "search"
                ? "No tokens found."
                : "No trending tokens available."}
            </div>
          )}
        </div>

        <div className="p-3 flex justify-end">
          <button
            onClick={handleAddToWatchlist}
            disabled={selectedTokens.length === 0}
            className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-colors duration-200 ${
              selectedTokens.length === 0
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-lime-400 text-black hover:bg-lime-500"
            }`}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTokenModal;
