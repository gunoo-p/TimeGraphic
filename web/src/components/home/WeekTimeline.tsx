import { dayLabel, dayOfMonth, shortDate, weekday } from '../../date'
import type { Activity, Member } from '../../types'
import { Avatar } from '../common/Avatar'
import { Icon } from '../common/Icon'
import { ActivityCard } from './ActivityCard'
import './WeekTimeline.css'

type Props = {
  days: (string | null)[]
  activities: Activity[]
  members: Member[]
  today: string
  projectStart: string | null
  hasPrev: boolean
  hasNext: boolean
  onBack: () => void
  onPrev: () => void
  onNext: () => void
  onSelect: (a: Activity) => void
}

const pct = (n: number) => `${((n * 100) / 7).toFixed(2)}%`

// 부모가 key 로 주마다 새로 그려서, 주를 바꿀 때마다 선이 그려지는 애니메이션이 다시 나온다.
export function WeekTimeline(props: Props) {
  const { days, activities, members, today, projectStart, onSelect } = props
  const idx = days.flatMap((d, i) => (d ? [i] : []))
  const first = idx[0]
  const last = idx[idx.length - 1]
  const todayIdx = days.indexOf(today)
  const end = todayIdx >= 0 ? todayIdx : last
  const items = activities.filter((a) => a.date && days.includes(a.date))
  const people = new Set(items.filter((a) => a.member !== '_unassigned').map((a) => a.member)).size

  return (
    <section className="week card zoom-in" aria-label="한 주 자세히">
      <div className="week-head">
        <button type="button" className="btn btn-text" onClick={props.onBack}>
          <Icon name="back" />
          달력으로
        </button>
        <div className="week-nav">
          <button type="button" className="week-nav-btn" onClick={props.onPrev} disabled={!props.hasPrev} aria-label="지난주">
            <Icon name="back" />
          </button>
          <div className="week-title">
            <h2>
              {shortDate(days[first]!)} ~ {dayOfMonth(days[last]!)}일
            </h2>
            <span>{items.length ? `${items.length}가지 일 · ${people}명` : '기록 없음'}</span>
          </div>
          <button type="button" className="week-nav-btn" onClick={props.onNext} disabled={!props.hasNext} aria-label="다음 주">
            <Icon name="next" />
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="week-empty rise">
          <strong>이 주에는 기록이 없어요</strong>
          {projectStart && <span>프로젝트는 {shortDate(projectStart)}에 시작했어요</span>}
        </div>
      ) : (
        <>
          <div className="week-scroll">
            <div className="week-board">
              <div className="week-row">
                <span className="week-who" />
                <div className="week-heads">
                  {days.map((d, i) => (
                    <span key={i} className={d === today ? 'is-today' : undefined}>
                      {d ? (d === today ? '오늘' : `${dayOfMonth(d)} ${weekday(d)}`) : ''}
                    </span>
                  ))}
                </div>
              </div>
              {members.map((m) => {
                const unknown = !m.color
                return (
                  <div key={m.id} className="week-row week-lane">
                    <span className="week-who">
                      <Avatar member={m} />
                      {m.name}
                    </span>
                    <div className="week-track">
                      <span
                        className={`week-line ${unknown ? 'dashed fade' : 'grow'}`}
                        style={{ left: pct(first + 0.5), width: pct(end - first), background: unknown ? undefined : m.color! }}
                      />
                      {todayIdx >= 0 && todayIdx < last && (
                        <span className="week-line future fade" style={{ left: pct(todayIdx + 0.5), width: pct(last - todayIdx) }} />
                      )}
                      {days.map((d, i) => {
                        const mine = items.filter((a) => a.date === d && a.member === m.id)
                        if (!mine.length) return null
                        return (
                          <button
                            key={i}
                            type="button"
                            className="week-dot-hit"
                            style={{ left: pct(i + 0.5) }}
                            aria-label={`${dayLabel(d!)} ${m.name}: ${mine.map((a) => a.content).join(', ')}`}
                            onClick={() => onSelect(mine[0])}
                          >
                            {d === today && <span className="week-ring" />}
                            <span
                              className={`week-dot pop ${unknown ? 'unknown' : ''} ${d === today ? 'now' : ''}`}
                              style={{ background: unknown ? undefined : m.color!, animationDelay: `${0.3 + i * 0.15}s` }}
                            />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="week-cards">
            {items.map((a, i) => (
              <ActivityCard key={a.id} activity={a} members={members} onSelect={onSelect} delay={`${1.4 + i * 0.12}s`} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
