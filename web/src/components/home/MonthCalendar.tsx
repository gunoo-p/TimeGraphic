import { dayOfMonth } from '../../date'
import { findMember } from '../../members'
import type { Activity, Member } from '../../types'
import { Avatar } from '../common/Avatar'
import './MonthCalendar.css'

type Props = {
  title: string
  weeks: (string | null)[][]
  activities: Activity[]
  members: Member[]
  today: string
  onOpenWeek: (index: number) => void
}

const HEADS = ['월', '화', '수', '목', '금', '토', '일']

function cellKind(day: string | null, today: string, busy: boolean) {
  if (!day) return 'blank'
  if (day === today) return 'today'
  if (day > today) return 'future'
  return busy ? 'busy' : 'idle'
}

export function MonthCalendar({ title, weeks, activities, members, today, onOpenWeek }: Props) {
  const legend = members.filter((m) => activities.some((a) => a.member === m.id))

  return (
    <section className="month card zoom-in" aria-label={`${title} 달력`}>
      <div className="month-head">
        <h2>{title}</h2>
        <span>보고 싶은 주를 눌러 보세요</span>
      </div>
      <div className="month-grid month-heads" aria-hidden="true">
        {HEADS.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>
      {weeks.map((days, wi) => {
        const real = days.filter((d): d is string => d !== null)
        return (
          <button
            key={wi}
            type="button"
            className="month-grid month-week"
            aria-label={`${dayOfMonth(real[0])}일부터 ${dayOfMonth(real[real.length - 1])}일까지 자세히 보기`}
            onClick={() => onOpenWeek(wi)}
          >
            {days.map((day, di) => {
              const who = [...new Set(activities.filter((a) => a.date === day).map((a) => a.member))]
              return (
                <span key={di} className={`month-cell ${cellKind(day, today, who.length > 0)}`}>
                  <span className="month-num">{day && (day === today ? `${dayOfMonth(day)} 오늘` : dayOfMonth(day))}</span>
                  <span className="month-chips">
                    {who.map((id) => (
                      <Avatar key={id} member={findMember(members, id)} size="sm" />
                    ))}
                  </span>
                </span>
              )
            })}
          </button>
        )
      })}
      <div className="month-legend">
        {legend.map((m) => (
          <span key={m.id}>
            <Avatar member={m} size="sm" />
            {m.name}
          </span>
        ))}
      </div>
    </section>
  )
}
