export const numberToCurrencyString = (number: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LKR",
  });

  const parts = formatter.formatToParts(number);
  const currencyPart = parts.find((part) => part.type === "currency")?.value;
  const numberPart = parts
    .filter((part) => part.type !== "currency")
    .map((part) => part.value)
    .join("");

  return `${numberPart} ${currencyPart}`;
};
