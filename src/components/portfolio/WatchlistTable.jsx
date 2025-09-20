import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHoldings, removeToken } from "../../store/slices/portfolioSlice";
import { formatCurrency, formatPercentage } from "../../utils/formatters";
import Pagination from "../common/Pagination";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Menu } from "@headlessui/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const EditableCell = ({
  tokenId,
  value,
  onSave,
  editingTokenId,
  setEditingTokenId,
}) => {
  const [editValue, setEditValue] = useState(value);

  const isEditing = editingTokenId === tokenId;

  return isEditing ? (
    <div className="flex items-center space-x-2">
      <input
        type="number"
        step="0.1000"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        className="w-20 px-2 py-1 bg-dark-surface border border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-dark-text-primary"
      />
      <button
        onClick={() => {
          onSave(editValue);
          setEditingTokenId(null);
        }}
        className="w-16 h-8 px-2 py-1 bg-lime-400 text-dark-bg text-xs font-medium rounded hover:bg-lime-600 transition"
      >
        Save
      </button>
    </div>
  ) : (
    <span className="text-dark-text-primary">{value}</span>
  );
};

const WatchlistTable = () => {
  const dispatch = useDispatch();
  const { tokens, loading } = useSelector((state) => state.portfolio);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editingTokenId, setEditingTokenId] = useState(null);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTokens = tokens.slice(startIndex, endIndex);
  const totalPages = Math.ceil(tokens.length / itemsPerPage);

  const handleUpdateHoldings = (tokenId, newHoldings) => {
    dispatch(updateHoldings({ tokenId, holdings: newHoldings }));
  };

  const handleRemoveToken = (tokenId) => {
    if (
      window.confirm(
        "Are you sure you want to remove this token from your watchlist?"
      )
    ) {
      dispatch(removeToken(tokenId));
    }
  };

  if (loading) {
    return (
      <div className="bg-dark-card shadow-dark-card rounded-xl border border-dark-border">
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
            <span className="text-dark-text-secondary">Loading tokens...</span>
          </div>
        </div>
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="bg-dark-card shadow-dark-card rounded-xl border border-dark-border">
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-dark-text-muted mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-dark-text-primary mb-2">
            No tokens in your watchlist
          </h3>
          <p className="text-dark-text-secondary mb-4">
            Add some tokens to start tracking your portfolio
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-card shadow-dark-card rounded-xl overflow-hidden border border-dark-border">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-dark-border">
          <thead className="bg-dark-surface">
            <tr>
              <th className="px-6 py-3 text-left text-s font-normal text-dark-text-muted tracking-wider">
                Token
              </th>
              <th className="px-6 py-3 text-left text-s font-normal text-dark-text-muted tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-s font-normal text-dark-text-muted tracking-wider">
                24h %
              </th>
              <th className="px-6 py-3 text-left text-s font-normal text-dark-text-muted tracking-wider">
                Sparkline (7d)
              </th>
              <th className="px-6 py-3 text-left text-s font-normal text-dark-text-muted  tracking-wider">
                Holdings
              </th>
              <th className="px-6 py-3 text-left text-s font-normal text-dark-text-muted  tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-s font-normal text-dark-text-muted tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-dark-card">
            {currentTokens.map((token) => (
              <tr
                key={token.id}
                className="hover:bg-dark-surface transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={token.image}
                      alt={token.name}
                      className="h-8 w-8 rounded-full mr-3"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNjY2MiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjwvc3ZnPg==";
                      }}
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-normal text-dark-text-primary">
                        {token.name}
                      </span>
                      <span className="text-sm font-normal text-dark-text-muted">
                        ({token.symbol.toUpperCase()})
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm font-medium text-dark-text-muted">
                    {formatCurrency(token.current_price)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`text-sm font-medium ${
                      (token.price_change_percentage_24h || 0) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatPercentage(token.price_change_percentage_24h)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 h-8">
                    {token.sparkline_in_7d?.price ? (
                      <Sparklines
                        data={token.sparkline_in_7d?.price || []}
                        width={96}
                        height={32}
                      >
                        <SparklinesLine
                          style={{
                            stroke:
                              (token.price_change_percentage_24h_in_currency ||
                                0) >= 0
                                ? "#10b981"
                                : "#ef4444",
                            fill: "none",
                            strokeWidth: 1,
                          }}
                        />
                      </Sparklines>
                    ) : (
                      <div className="w-24 h-8 bg-dark-surface rounded flex items-center justify-center border border-dark-border">
                        <span className="text-xs text-dark-text-muted">
                          No data
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <EditableCell
                    tokenId={token.id}
                    value={token.holdings || 0}
                    onSave={(value) => handleUpdateHoldings(token.id, value)}
                    editingTokenId={editingTokenId}
                    setEditingTokenId={setEditingTokenId}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-normal text-dark-text-primary">
                    {formatCurrency(
                      (token.holdings || 0) * (token.current_price || 0)
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="p-2 text-dark-text-secondary hover:text-teal-400">
                      ...
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-36 bg-dark-surface border border-dark-border rounded-md shadow-lg focus:outline-none z-10">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => setEditingTokenId(token.id)} // trigger editing
                              className={`${
                                active
                                  ? "bg-dark-hover text-white"
                                  : "text-gray-300"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <PencilSquareIcon className="h-4 w-4 mr-2" />
                              Edit Holdings
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handleRemoveToken(token.id)}
                              className={`group flex w-full items-center rounded-md px-2 py-2 text-sm ${
                                active
                                  ? "bg-dark-card text-red-400"
                                  : "text-red-500"
                              }`}
                            >
                              <TrashIcon className="h-4 w-4 mr-2" />
                              Remove
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={tokens.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default WatchlistTable;
