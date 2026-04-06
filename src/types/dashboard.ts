export type RiskLevel = 'P0' | 'P1' | 'P2' | 'P3'
export type EventStatus = '待研判' | '已告警' | '处理中' | '已关闭'
export type ScenarioType = 'chain' | 'beverage' | 'packaged_food'
export type Platform = 'weibo' | 'douyin' | 'xiaohongshu' | 'dianping' | 'meituan' | 'zhihu' | 'news' | 'other'

export interface SummaryMetrics {
  newMentionsToday: number
  highRiskEvents: number
  pendingEvents: number
  closedRate: string
  newMentionsTrend: number
  highRiskTrend: number
  pendingTrend: number
  closedRateTrend: number
}

export interface TrendDataPoint {
  date: string
  total: number
  highRisk: number
}

export interface PlatformDistribution {
  name: string
  value: number
  color: string
}

export interface RiskTypeItem {
  name: string
  value: number
  color: string
}

export interface FeedItem {
  id: string
  time: string
  platform: Platform
  platformLabel: string
  riskLevel: RiskLevel
  summary: string
  keywords: string[]
  author?: string
  sourceUrl?: string
}

export interface RiskEvent {
  id: string
  title: string
  riskLevel: RiskLevel
  status: EventStatus
  platforms: Platform[]
  targetStore?: string
  targetProduct?: string
  targetSku?: string
  firstDetected: string
  lastUpdated: string
  owner: string
  mentionCount: number
  heatScore: number
  summary: string
}

export interface TimelineEntry {
  time: string
  event: string
  type: 'detect' | 'alert' | 'respond' | 'update' | 'resolve'
}

export interface EventDetail {
  eventId: string
  title: string
  riskLevel: RiskLevel
  status: EventStatus
  brandName: string
  storeName?: string
  productName?: string
  skuName?: string
  firstDetected: string
  lastUpdated: string
  owner: string
  summary: string
  timeline: TimelineEntry[]
  platformDistribution: PlatformDistribution[]
  resonanceSummary: string
  aiSuggestion: string
  statusLog: { time: string; action: string; operator: string }[]
}

export interface KeywordItem {
  word: string
  count: number
  trend: 'up' | 'down' | 'stable'
  level: RiskLevel | 'normal'
}

export interface ResonanceComment {
  id: string
  platform: Platform
  content: string
  author: string
  likes: number
  time: string
  sentiment: 'positive' | 'negative' | 'neutral'
}

export interface RankingItem {
  rank: number
  name: string
  value: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  riskLevel: RiskLevel
}

export interface AiAssessment {
  overallRisk: string
  riskScore: number
  keyFindings: string[]
  suggestedActions: string[]
  prediction: string
}

export interface AiBriefing {
  date: string
  brandName: string
  executiveSummary: string
  topEvents: {
    rank: number
    title: string
    level: RiskLevel
    summary: string
  }[]
  platformSpread: { platform: string; count: number; trend: string }[]
  suggestedActions: string[]
}

export interface ScenarioData {
  brandName: string
  brandLogo: string
  summaryMetrics: SummaryMetrics
  trendData: TrendDataPoint[]
  platformDistribution: PlatformDistribution[]
  riskTypeDistribution: RiskTypeItem[]
  realtimeFeed: FeedItem[]
  riskEvents: RiskEvent[]
  keywordCloud: KeywordItem[]
  resonanceComments: ResonanceComment[]
  rankingList: RankingItem[]
  detailByEventId: Record<string, EventDetail>
  aiBriefing: AiBriefing
  aiAssessment: AiAssessment
}

export interface AppMeta {
  name: string
  version: string
  scenarios: {
    chain: { label: string; icon: string }
    beverage: { label: string; icon: string }
    packaged_food: { label: string; icon: string }
  }
}

export interface MockData {
  appMeta: AppMeta
  scenarios: {
    chain: ScenarioData
    beverage: ScenarioData
    packaged_food: ScenarioData
  }
}
