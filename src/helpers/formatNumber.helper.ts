export const formatNumberHelper = (count: number, word?: string): string | number => {
  if (count / 1000 < 1) return `${count}${word ? ` ${word}` : ''}`;
  return `${(count / 1000).toFixed(2)}k${word ? ` ${word}` : ''}`;
};
