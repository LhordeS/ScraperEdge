import { EconomicEvent } from "../types/economic-event.js"
import { scrapeTradingEconomics } from "../scrapers/tradingeconomics.js"

export function getCalendarEvents(): Promise<EconomicEvent[]> {
  return scrapeTradingEconomics()
}
