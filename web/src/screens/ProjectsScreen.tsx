import { Avatar } from '../components/common/Avatar'
import { Icon } from '../components/common/Icon'
import { ProjectCard } from '../components/projects/ProjectCard'
import { addDays, shortDate } from '../date'
import type { ProjectSummary } from '../mock'
import type { Activity, Member, Project } from '../types'
import './ProjectsScreen.css'

type Props = {
  me: Member
  project: Project
  activities: Activity[]
  members: Member[]
  others: ProjectSummary[]
  today: string
  onOpen: () => void
  onAutoFill: () => void
}

export function ProjectsScreen({ me, project, activities, members, others, today, onOpen, onAutoFill }: Props) {
  const recent = Array.from({ length: 14 }, (_, i) => addDays(today, i - 13))
  const latest = activities.reduce<string | null>((max, a) => (a.date && (!max || a.date > max) ? a.date : max), null)
  const current: ProjectSummary = {
    name: project.name,
    lastActive: latest === today ? '오늘' : latest && shortDate(latest),
    canEdit: true,
    members: members.filter((m) => m.color),
    activityCount: activities.length,
    recentDays: recent.map((d) => activities.some((a) => a.date === d)),
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">내 프로젝트</h1>
          <p className="page-sub">최근 2주 동안 일한 날을 함께 보여 드려요</p>
        </div>
        <span className="projects-me">
          <Avatar member={me} size="sm" />
          {me.name}
        </span>
      </header>

      <div className="projects-grid">
        {/* shortcut: 다른 프로젝트도 같은 가짜 데이터를 연다. /api 연결 때 프로젝트별로. */}
        {[current, ...others].map((p) => (
          <ProjectCard key={p.name} project={p} onOpen={onOpen} onAutoFill={onAutoFill} />
        ))}
        <button type="button" className="projects-new" onClick={onAutoFill}>
          <span aria-hidden="true">
            <Icon name="plus" size={22} />
          </span>
          새 프로젝트 연결하기
        </button>
      </div>

      <div className="projects-legend">
        <span>
          <span className="project-day on" />
          일한 날
        </span>
        <span>
          <span className="project-day" />
          쉰 날
        </span>
        <span>
          <span className="project-day now" />
          오늘
        </span>
      </div>
    </main>
  )
}
