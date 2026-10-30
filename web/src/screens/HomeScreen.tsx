import { useState } from 'react'
import { ActivityCard } from '../components/home/ActivityCard'
import { MonthCalendar } from '../components/home/MonthCalendar'
import { ProjectOverview } from '../components/home/ProjectOverview'
import { WeekTimeline } from '../components/home/WeekTimeline'
import { monthWeeks } from '../date'
import type { Activity, Member, Project } from '../types'

type Props = {
  project: Project
  activities: Activity[]
  members: Member[]
  today: string
  onAdd: () => void
  onSelect: (a: Activity) => void
}

export function HomeScreen({ project, activities, members, today, onAdd, onSelect }: Props) {
  const [week, setWeek] = useState<number | null>(null) // null = 달력
  const year = Number(today.slice(0, 4))
  const m0 = Number(today.slice(5, 7)) - 1
  const weeks = monthWeeks(year, m0)
  const monthPrefix = today.slice(0, 7)
  const inMonth = activities.filter((a) => a.date?.startsWith(monthPrefix))
  const workedDays = new Set(inMonth.map((a) => a.date)).size
  const people = new Set(inMonth.filter((a) => a.member !== '_unassigned').map((a) => a.member)).size
  const undated = activities.filter((a) => a.date === null)

  return (
    <>
      <header className="page-header">
        <div>
          <h1 className="page-title">{project.name}</h1>
          <p className="page-sub">
            {m0 + 1}월에 일한 날 {workedDays}일 · {people}명이 함께
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          + 한 일 적기
        </button>
      </header>

      <ProjectOverview project={project} />

      {week === null ? (
        <>
          <MonthCalendar
            title={`${year}년 ${m0 + 1}월`}
            weeks={weeks}
            activities={activities}
            members={members}
            today={today}
            onOpenWeek={setWeek}
          />
          {undated.length > 0 && (
            <section className="undated" aria-label="날짜를 모르는 일">
              <h2 className="undated-title">
                <span className="unsure">날짜 미상</span> {undated.length}가지
              </h2>
              {undated.map((a) => (
                <ActivityCard key={a.id} activity={a} members={members} onSelect={onSelect} />
              ))}
            </section>
          )}
        </>
      ) : (
        <WeekTimeline
          key={week}
          days={weeks[week]}
          activities={activities}
          members={members}
          today={today}
          projectStart={project.start}
          hasPrev={week > 0}
          hasNext={week < weeks.length - 1}
          onBack={() => setWeek(null)}
          onPrev={() => setWeek(week - 1)}
          onNext={() => setWeek(week + 1)}
          onSelect={onSelect}
        />
      )}
    </>
  )
}
