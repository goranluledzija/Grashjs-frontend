export interface WoOverviewStats {
  total: number;
  complete: number;
  compliant: number;
  avgCycleTime: number;
}

interface BasicStats {
  count: number;
  estimatedHours: number;
}
export interface WOStatsByPriority {
  none: BasicStats;
  high: BasicStats;
  medium: BasicStats;
  low: BasicStats;
}