import { TYPE_LABEL, type ActivityType } from '../../types'

// 유형은 색이 아니라 글자와 기호로 구분한다 (색은 팀원 몫).
export function TypeBadge({ type }: { type: ActivityType }) {
  return <span className="badge">{TYPE_LABEL[type]}</span>
}
