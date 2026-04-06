import { useState } from 'react'
import { mockData } from './data/mock-data'
import type { ScenarioType } from './types/dashboard'
import TopNav from './components/TopNav'
import SummaryCards from './components/SummaryCards'
import TrendChartCard from './components/TrendChartCard'
import PlatformDistributionCard from './components/PlatformDistributionCard'
import RiskTypeDistributionCard from './components/RiskTypeDistributionCard'
import RealtimeFeedCard from './components/RealtimeFeedCard'
import RiskEventListCard from './components/RiskEventListCard'
import KeywordCloudCard from './components/KeywordCloudCard'
import ResonanceCommentsCard from './components/ResonanceCommentsCard'
import RankingCard from './components/RankingCard'
import AiAssessmentCard from './components/AiAssessmentCard'
import EventDetailDrawer from './components/EventDetailDrawer'
import AiBriefingModal from './components/AiBriefingModal'

function App() {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('chain')
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [showBriefing, setShowBriefing] = useState(false)

  const scenarioMap: Record<ScenarioType, 'chain' | 'beverage' | 'packaged_food'> = {
    chain: 'chain',
    beverage: 'beverage',
    packaged_food: 'packaged_food',
  }
  const data = mockData.scenarios[scenarioMap[activeScenario]]

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <TopNav
        activeScenario={activeScenario}
        onScenarioChange={setActiveScenario}
        onOpenBriefing={() => setShowBriefing(true)}
      />

      <main className="max-w-[1440px] mx-auto px-6 py-4 space-y-4">
        <SummaryCards metrics={data.summaryMetrics} />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <TrendChartCard data={data.trendData} />
          </div>
          <div className="col-span-4 grid grid-rows-2 gap-4">
            <PlatformDistributionCard data={data.platformDistribution} />
            <RiskTypeDistributionCard data={data.riskTypeDistribution} />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <RealtimeFeedCard feedItems={data.realtimeFeed} />
          </div>
          <div className="col-span-7">
            <RiskEventListCard
              events={data.riskEvents}
              onSelectEvent={setSelectedEventId}
            />
          </div>
        </div>

       <div className="grid grid-cols-12 gap-4">
  <div className="col-span-5 space-y-4">
    <KeywordCloudCard keywords={data.keywordCloud} />
    <ResonanceCommentsCard data={data.resonanceComments} />
  </div>
  <div className="col-span-7 space-y-4">
    <RankingCard data={data.rankingList} />
    <AiAssessmentCard data={data.aiAssessment} />
  </div>
</div>
</main>

      {selectedEventId && data.detailByEventId[selectedEventId] && (
        <EventDetailDrawer
          event={data.detailByEventId[selectedEventId]}
          isOpen={true}
          onClose={() => setSelectedEventId(null)}
        />
      )}

      {showBriefing && (
        <AiBriefingModal
          data={data.aiBriefing}
          isOpen={true}
          onClose={() => setShowBriefing(false)}
        />
      )}
    </div>
  )
}

export default App
