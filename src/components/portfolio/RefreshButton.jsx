import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshTokenData } from "../../store/slices/portfolioSlice";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const RefreshButton = () => {
  const dispatch = useDispatch();
  const { tokens, loading, lastUpdated } = useSelector(
    (state) => state.portfolio
  );

  const handleRefresh = () => {
    if (tokens.length > 0) {
      const tokenIds = tokens.map((token) => token.id);
      dispatch(refreshTokenData(tokenIds));
    }
  };

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return "Never";

    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="flex items-center gap-3">
      {lastUpdated && (
        <span className="text-xs text-dark-text-muted">
          Updated {getTimeAgo(lastUpdated)}
        </span>
      )}
      <button
        onClick={handleRefresh}
        disabled={loading || tokens.length === 0}
        className="inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        title="Refresh prices"
      >
        <ArrowPathIcon
          className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
        />
        {loading ? "Refreshing..." : "Refresh Prices"}
      </button>
    </div>
  );
};

export default RefreshButton;
