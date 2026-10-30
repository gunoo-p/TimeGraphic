import { dayLabel, dayOfMonth } from '../date'
import { findMember } from '../members'
import type { Activity, Member } from '../types'
import { Avatar } from './common/Avatar'
import { Dialog } from './common/Dialog'
import { Icon } from './common/Icon'
import { TypeBadge } from './common/TypeBadge'
import './ActivityDetail.css'

type Props = {
  activity: Activity
  activities: Activity[]
  members: Member[]
  onSelect: (a: Activity) => void
  onClose: () => void
}

// 같은 주 = 같은 월요일에서 시작하는 7일
function sameWeek(a: string, b: string) {
  const monday = (s: string) => {
    const d = new Date(`${s}T00:00:00`)
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7))
    return d.getTime()
  }
  return monday(a) === monday(b)
}

export function ActivityDetail({ activity, activities, members, onSelect, onClose }: Props) {
  const member = findMember(members, activity.member)
  const count = activities.filter((a) => a.member === activity.member).length
  const date = activity.date
  const nearby = date ? activities.filter((a) => a.id !== activity.id && a.date && sameWeek(a.date, date)) : []

  return (
    <Dialog variant="side" labelledBy="detail-title" onClose={onClose}>
      <div className="detail-top">
        {date ? <span>{dayLabel(date)}</span> : <span className="unsure">날짜 미상</span>}
        <button type="button" className="icon-btn" aria-label="닫기" onClick={onClose}>
          <Icon name="close" size={20} />
        </button>
      </div>

      <div className="detail-head">
        <TypeBadge type={activity.type} />
        <h1 id="detail-title">{activity.content}</h1>
        <div className="detail-who">
          <Avatar member={member} size="lg" />
          <span>
            <strong>{member.name}</strong>
            <small>이 프로젝트에서 {count}가지 일</small>
          </span>
        </div>
      </div>

      {activity.detail && (
        <section className="detail-more">
          <span>무슨 일이었나요?</span>
          <p>{activity.detail}</p>
        </section>
      )}

      <details className="detail-dev">
        <summary>개발자용 정보 보기</summary>
        <dl>
          <dt>원래 기록</dt>
          <dd>{activity.commit ? <code>{activity.commit}</code> : '직접 적은 기록이에요'}</dd>
          <dt>파일</dt>
          <dd>
            <code>timeline/{activity.member}.md</code>
          </dd>
        </dl>
      </details>

      {nearby.length > 0 && (
        <section className="detail-nearby">
          <span>같은 주에 한 일</span>
          {nearby.map((a) => (
            <button key={a.id} type="button" onClick={() => onSelect(a)}>
              <Avatar member={findMember(members, a.member)} size="sm" />
              <span className="detail-nearby-text">{a.content}</span>
              <small>{dayOfMonth(a.date!)}일</small>
            </button>
          ))}
        </section>
      )}
    </Dialog>
  )
}
