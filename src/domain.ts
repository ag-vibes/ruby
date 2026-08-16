export type Indicator = { id: string; name: string; unit: string; order: number; showOnHome: boolean };
export type Result = { id: string; indicatorId: string; date: string; value: number };
export type Course = { id: string; indicatorId: string; startDate: string; plannedEndDate?: string; actualEndDate?: string; days?: number };
export type AppData = { version: 1; indicators: Indicator[]; results: Result[]; courses: Course[]; lastBackupDate?: string };

export const uid = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
export const initialIndicators: Indicator[] = [
  ["hemoglobin", "гемоглобин", "г/л"],
  ["ferritin", "ферритин", "мкг/л"],
  ["iron", "железо", "мкмоль/л"],
  ["vitamin-d", "витамин D", "нг/мл"],
  ["folic-acid", "фолиевая кислота", "нг/мл"],
].map(([id, name, unit], order) => ({ id, name, unit, order, showOnHome: true }));

export const emptyData = (): AppData => ({ version: 1, indicators: initialIndicators.map((x) => ({ ...x })), results: [], courses: [] });
export const normalizeData = (value: unknown): AppData => {
  if (!value || typeof value !== "object") return emptyData();
  const data = value as Partial<AppData>;
  return {
    version: 1,
    indicators: Array.isArray(data.indicators) ? data.indicators : initialIndicators.map((x) => ({ ...x })),
    results: Array.isArray(data.results) ? data.results.filter((x) => Number.isFinite(x.value)) : [],
    courses: Array.isArray(data.courses) ? data.courses : [],
    lastBackupDate: data.lastBackupDate,
  };
};
export const validBackup = (value: unknown) => {
  if (!value || typeof value !== "object") return false;
  const x = value as Partial<AppData>;
  return Array.isArray(x.indicators) && Array.isArray(x.results) && Array.isArray(x.courses);
};
export const parseDecimal = (value: string) => Number(value.trim().replace(/\s/g, "").replace(",", "."));
export const formatDecimal = (value: number) => new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 4 }).format(value);
export const addDays = (date: string, days: number) => {
  const value = new Date(`${date}T12:00:00`);
  value.setDate(value.getDate() + days);
  return value.toISOString().slice(0, 10);
};
export const formatDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString("ru-RU");
export const sortedIndicators = (data: AppData) => [...data.indicators].sort((a, b) => a.order - b.order);
