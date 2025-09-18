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

  //24h change
  // const totalChange24h = portfolioData.reduce((sum, token) => {
  //   const holdings = token.holdings || 0;
  //   const price = token.current_price || 0;
  //   const pctChange = token.price_change_percentage_24h || 0;
  //   const change = holdings * price * (pctChange / 100);
  //   return sum + change;
  // }, 0);

  // const isPositive = totalChange24h >= 0;

  return (
    <div className="bg-dark-card shadow-dark-card rounded-xl p-6 border border-dark-border">
      <div className="flex items-start justify-between ">
        <div>
          <h2 className="text-lg font-semibold text-dark-text-muted">
            Portfolio Total
          </h2>
          <div className="text-6xl font-bold text-dark-text-primary mt-3">
            {formatCurrency(totalValue)}
          </div>
          <div className="text-m text-dark-text-primary mt-3">
            {portfolioData.length} tokens in portfolio
          </div>

          {/* If want 24h percent change
          <div className="text-m text-dark-text-muted mt-10">24h Change</div>
          <div
            className={`text-lg font-semibold ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {formatCurrency(totalChange24h)}
          </div> */}
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center mt-4">
          <div className="flex-1"></div>

          <div className="flex items-center">
            <div className="flex-shrink-0 ">
              <DonutChart data={portfolioData} />
            </div>
          </div>

          {/* Holdings Percentages */}
          <div className="flex flex-col justify-center text-sm space-y-2">
            {holdingsPercentages.map((token, index) => (
              <div
                key={token.symbol}
                className="flex justify-between gap-x-24 text-dark-text-secondary"
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

      <span className="text-sm text-dark-text-secondary">
        Last updated: {formatTimestamp(lastUpdated)}
      </span>
    </div>
  );
};

export default PortfolioCard;
