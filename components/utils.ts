export const addDays = (date: Date | string, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const formatDate = (date: Date | string): string =>
  new Date(date).toISOString().substring(0, 10);

export const joinDates = (dates: { date: Date | string }[]): string =>
  dates.map(d => formatDate(d.date)).join(', ');
