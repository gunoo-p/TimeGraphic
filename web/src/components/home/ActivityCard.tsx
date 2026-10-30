import { dayLabel } from '../../date'
import { findMember } from '../../members'
import type { Activity, Member } from '../../types'
import { Avatar } from '../common/Avatar'
import { TypeBadge } from '../common/TypeBadge'
import './ActivityCard.css'

type Props = {
  activity: Activity
  members: Member[]
  onSelect: (a: Activity) => void
  delay?: string
}

export function ActivityCard({ activity, members, onSelect, delay }: Props) {
  const member = findMember(members, activity.member)
  return (
    <button type="button" className="activity-card rise" style={{ animationDelay: delay }} onClick={() => onSelect(activity)}>
      <Avatar member={member} size="lg" />
      <span className="activity-card-text">
        <span className="activity-card-meta">
          {activity.date ? dayLabel(activity.date) : '날짜 미상'} · {member.name}
        </span>
        <span className="activity-card-title">{activity.content}</span>
        <TypeBadge type={activity.type} />
      </span>
    </button>
  )
}
