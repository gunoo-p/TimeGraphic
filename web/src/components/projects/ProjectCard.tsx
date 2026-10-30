import type { ProjectSummary } from '../../mock'
import { Avatar } from '../common/Avatar'

type Props = {
  project: ProjectSummary
  onOpen: () => void
  onAutoFill: () => void
}

function Strip({ days }: { days: boolean[] }) {
  const worked = days.filter(Boolean).length
  return (
    <div className="project-strip" role="img" aria-label={`최근 2주 중 일한 날 ${worked}일`}>
      {days.map((on, i) => (
        <span key={i} className={`project-day${on ? ' on' : ''}${i === days.length - 1 ? ' now' : ''}`} />
      ))}
    </div>
  )
}

export function ProjectCard({ project, onOpen, onAutoFill }: Props) {
  const badge = <span className="badge">{project.canEdit ? '고칠 수 있음' : '보기만'}</span>

  if (project.activityCount === 0) {
    return (
      <div className="project-card card is-empty">
        <div className="project-card-top">
          <span className="project-card-name">
            <strong>{project.name}</strong>
            <span className="project-card-sub">아직 정리한 기록이 없어요</span>
          </span>
          {badge}
        </div>
        <Strip days={project.recentDays} />
        {project.canEdit && (
          <button type="button" className="btn btn-primary" onClick={onAutoFill}>
            자동으로 채우기
          </button>
        )}
      </div>
    )
  }

  return (
    <button type="button" className="project-card card" onClick={onOpen}>
      <span className="project-card-top">
        <span className="project-card-name">
          <strong>{project.name}</strong>
          <span className="project-card-sub">마지막으로 한 일 · {project.lastActive}</span>
        </span>
        {badge}
      </span>
      <Strip days={project.recentDays} />
      <span className="project-card-bottom">
        <span className="project-avatars">
          {project.members.map((m) => (
            <Avatar key={m.id} member={m} size="sm" />
          ))}
        </span>
        <span className="project-card-sub">
          {project.members.length}명 · {project.activityCount}가지 일
        </span>
      </span>
    </button>
  )
}
