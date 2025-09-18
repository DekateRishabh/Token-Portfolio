export const formatCurrency = (amount, currency = "USD") => {
  if (amount === null || amount === undefined || isNaN(amount)) return "$0.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: amount < 1 ? 6 : 2,
  }).format(amount);
};

export const formatPercentage = (value) => {
  if (value === null || value === undefined || isNaN(value)) return "0.00%";

  const sign = value >= 0 ? "+" : "";
  return `${sign}${parseFloat(value).toFixed(2)}%`;
};

export const formatTimestamp = (timestamp) => {
  if (!timestamp) return "Never";
  return new Date(timestamp).toLocaleString();
};

export const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "0";

  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toFixed();
};

export const truncateAddress = (address, chars = 4) => {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
};
