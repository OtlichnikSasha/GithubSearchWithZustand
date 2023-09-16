export const formatNumberHelper = (count: number): number | string => {
  if (count / 1000 < 1) return count;
  return `${(count / 1000).toFixed(2)}k`;
};
