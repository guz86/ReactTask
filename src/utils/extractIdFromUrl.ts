export const extractIdFromUrl = (url: string): string => {
  const match = url.match(/\/(\d+)\/$/);
  return match ? match[1] : 'Unknown';
};
