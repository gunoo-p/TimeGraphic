import { longDate } from '../../date'
import type { Project } from '../../types'
import './ProjectOverview.css'

// 기능명세 1.1: 모르는 값은 확정된 값처럼 보이지 않게 점선으로.
export function ProjectOverview({ project }: { project: Project }) {
  return (
    <dl className="overview card">
      <dt>개요</dt>
      <dd>{project.overview ?? <span className="unsure">개요 없음</span>}</dd>
      <dt>기간</dt>
      <dd className="overview-period">
        {project.start ? longDate(project.start) : <span className="unsure">시작일 모름</span>}
        <span aria-hidden="true">~</span>
        {project.end ? longDate(project.end) : <span className="unsure">미정</span>}
      </dd>
    </dl>
  )
}
