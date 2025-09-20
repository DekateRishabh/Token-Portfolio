import React from "react";
import { useSelector } from "react-redux";
import { formatCurrency, formatTimestamp } from "../../utils/formatters";
import DonutChart from "./DonutChart";
import { CHART_COLORS } from "./DonutChart";

const PortfolioCard = () => {
  const { tokens, lastUpdated, totalValue } = useSelector(
    (state) => state.portfolio
  );

  const portfolioData = tokens.filter((token) => token.holdings > 0);

  // Percentage holdings
  const holdingsPercentages = portfolioData.map((token) => {
    const price = token.current_price || 0;
    const value = token.holdings * price;
    const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;
    return {
      ...token,
      value,
      percentage,
    };
  });

  return (
    <div className="bg-dark-card shadow-dark-card rounded-xl p-4 border border-dark-border">
      {/* Mobile Layout: Stack everything vertically */}
      <div className="block lg:hidden">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-dark-text-muted">
            Portfolio Total
          </h2>
          <div className="text-4xl font-bold text-dark-text-primary mt-3">
            {formatCurrency(totalValue)}
          </div>
          <div className="text-sm mt-3 text-dark-text-muted">
            Last updated: {formatTimestamp(lastUpdated)}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-dark-text-muted">
            Portfolio Total
          </h3>
        </div>

        <div className="flex justify-center mb-6">
          <DonutChart data={portfolioData} />
        </div>

        <div className="space-y-3 mb-6">
          {holdingsPercentages.map((token, index) => (
            <div
              key={token.symbol}
              className="flex justify-between items-center text-sm"
            >
              <span
                className="font-medium"
                style={{ color: CHART_COLORS[index % CHART_COLORS.length] }}
              >
                {token.name} ({token.symbol.toUpperCase()})
              </span>
              <span className="text-dark-text-secondary">
                {token.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout: Keep your original layout */}
      <div className="hidden lg:block">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-dark-text-muted">
              Portfolio Total
            </h2>
            <div className="text-6xl font-bold text-dark-text-primary mt-3">
              {formatCurrency(totalValue)}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center">
            <div className="flex-1"></div>

            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-dark-text-muted">
                Portfolio Total
              </h3>
              <div className="flex-shrink-0">
                <DonutChart data={portfolioData} />
              </div>
            </div>

            {/* Holdings Percentages */}
            <div className="flex flex-col justify-center text-sm space-y-4 ml-6">
              {holdingsPercentages.map((token, index) => (
                <div
                  key={token.symbol}
                  className="flex justify-between gap-x-64 text-dark-text-secondary"
                >
                  <span
                    className="font-medium"
                    style={{ color: CHART_COLORS[index % CHART_COLORS.length] }}
                  >
                    {token.name} ({token.symbol.toUpperCase()})
                  </span>
                  <span>{token.percentage.toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <span className="text-sm text-dark-text-muted">
          Last updated: {formatTimestamp(lastUpdated)}
        </span>
      </div>
    </div>
  );
};

export default PortfolioCard;
