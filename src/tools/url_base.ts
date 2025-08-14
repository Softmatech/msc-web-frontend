const baseApiUrl = "http://localhost:2222/api"; // Replace with your API base URL

export default baseApiUrl;

export const formatStringNumber = (stringNumber) => {
  const number = Number(stringNumber);
  return isNaN(number)
    ? "0.00"
    : new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 2, // Ensures at least 2 decimal places
        maximumFractionDigits: 2, // Limits to 2 decimal places
      }).format(number);
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
