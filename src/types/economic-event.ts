export type EconomicEvent = {
  time: string;
  country: string;
  event: string;
  importance?: "Low" | "Medium" | "High";
  actual: string | null;
  previous: string | null
  forecast: string | null
}
