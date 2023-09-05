export const formatNumberHelper = (count: number): string | number => {
  if (count / 1000 < 1) return count;
  return `${count / 1000}k`;
};
