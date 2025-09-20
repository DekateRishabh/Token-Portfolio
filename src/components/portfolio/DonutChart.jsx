import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Exact colors from your screenshot
export const CHART_COLORS = [
  "#22c55e", // Green
  "#a855f7", // Purple
  "#3b82f6", // Blue
  "#06b6d4", // Cyan
  "#f97316", // Orange
  "#ef4444", // Red
];

const DonutChart = ({ data }) => {
  const chartData = data
    .map((token, index) => ({
      name: token.symbol?.toUpperCase() || token.name,
      value: (token.holdings || 0) * (token.current_price || 0),
      color: CHART_COLORS[index % CHART_COLORS.length],
      holdings: token.holdings || 0,
      price: token.current_price || 0,
      fullName: token.name,
    }))
    .filter((item) => item.value > 0);

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalValue) * 100).toFixed(1);
      return (
        <div className="bg-dark-card border border-white-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-dark-text-primary">{data.fullName}</p>
          <p className="text-sm text-dark-text-secondary">{data.name}</p>
          <p className="text-teal-400 font-medium">
            {formatCurrency(data.value)} ({percentage}%)
          </p>
          <p className="text-xs text-dark-text-muted">
            {data.holdings.toFixed(4)} @ {formatCurrency(data.price)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="w-64 h-64 flex items-center justify-center bg-dark-surface rounded-lg border border-dark-border">
        <p className="text-dark-text-muted">No holdings to display</p>
      </div>
    );
  }

  return (
    <div className="w-64 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={100}
            dataKey="value"
            stroke="#ffffff"
            strokeWidth={1}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) return "$0.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default DonutChart;
