import { useState } from 'react'
import { Avatar } from '../components/common/Avatar'
import { Icon } from '../components/common/Icon'
import { TypeBadge } from '../components/common/TypeBadge'
import { FilterChip } from '../components/history/FilterChip'
import { addDays, dayLabel, shortDate } from '../date'
import { findMember } from '../members'
import { TYPE_LABEL, type Activity, type ActivityType, type Member } from '../types'
import './HistoryScreen.css'

type Props = {
  activities: Activity[]
  members: Member[]
  today: string
  since: string | null
  onAdd: () => void
  onSelect: (a: Activity) => void
}

const TYPES = Object.keys(TYPE_LABEL) as ActivityType[]

export function HistoryScreen({ activities, members, today, since, onAdd, onSelect }: Props) {
  const [who, setWho] = useState('all')
  const [type, setType] = useState<ActivityType | 'all'>('all')
  const [q, setQ] = useState('')

  const query = q.trim()
  const match = (a: Activity, useWho: boolean, useType: boolean) =>
    (!useWho || who === 'all' || a.member === who) &&
    (!useType || type === 'all' || a.type === type) &&
    (!query || a.content.includes(query))

  // 최신 날짜가 위, 날짜 미상은 맨 아래
  const rows = activities
    .filter((a) => match(a, true, true))
    .sort((x, y) => (y.date ?? '').localeCompare(x.date ?? ''))
  const groups: { date: string | null; rows: Activity[] }[] = []
  for (const a of rows) {
    const g = groups[groups.length - 1]
    if (g && g.date === a.date) g.rows.push(a)
    else groups.push({ date: a.date, rows: [a] })
  }

  const label = (date: string) =>
    dayLabel(date) + (date === today ? ' · 오늘' : date === addDays(today, -1) ? ' · 어제' : '')

  const reset = () => {
    setWho('all')
    setType('all')
    setQ('')
  }

  return (
    <>
      <header className="page-header">
        <div>
          <h1 className="page-title">전체 기록</h1>
          <p className="page-sub">
            {since ? `${shortDate(since)}부터 ` : ''}지금까지 {activities.length}가지 일 · 보이는 것 {rows.length}가지
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          + 한 일 적기
        </button>
      </header>

      <section className="filters card" aria-label="거르기">
        <label className="filters-search">
          <Icon name="search" />
          <input
            type="search"
            aria-label="기록 찾기"
            placeholder="찾고 싶은 말을 적어 보세요 (예: 로그인)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <div className="filters-row">
          <span className="filters-label">누가</span>
          <FilterChip label="모두" count={activities.filter((a) => match(a, false, true)).length} selected={who === 'all'} onClick={() => setWho('all')} />
          {members.map((m) => (
            <FilterChip
              key={m.id}
              label={m.color ? m.name : '모름'}
              icon={<Avatar member={m} size="sm" />}
              count={activities.filter((a) => a.member === m.id && match(a, false, true)).length}
              selected={who === m.id}
              onClick={() => setWho(m.id)}
            />
          ))}
        </div>
        <div className="filters-row">
          <span className="filters-label">어떤 일</span>
          <FilterChip label="모두" count={activities.filter((a) => match(a, true, false)).length} selected={type === 'all'} onClick={() => setType('all')} />
          {TYPES.map((t) => (
            <FilterChip
              key={t}
              label={TYPE_LABEL[t]}
              count={activities.filter((a) => a.type === t && match(a, true, false)).length}
              selected={type === t}
              onClick={() => setType(t)}
            />
          ))}
        </div>
      </section>

      {rows.length === 0 ? (
        <div className="history-empty card">
          <strong>맞는 기록이 없어요</strong>
          <span>다른 말로 찾거나 거르기를 풀어 보세요</span>
          <button type="button" className="btn btn-secondary" onClick={reset}>
            거르기 모두 풀기
          </button>
        </div>
      ) : (
        <div className="history-groups">
          {groups.map((g) => (
            <section key={g.date ?? 'none'} className="history-group">
              <h2 className="history-date">{g.date ? label(g.date) : <span className="unsure">날짜 미상</span>}</h2>
              {g.rows.map((a) => {
                const m = findMember(members, a.member)
                return (
                  <button key={a.id} type="button" className="history-row" onClick={() => onSelect(a)}>
                    <Avatar member={m} />
                    <span className="history-text">
                      <span className="history-content">{a.content}</span>
                      <span className="history-who">{m.name}</span>
                    </span>
                    <TypeBadge type={a.type} />
                  </button>
                )
              })}
            </section>
          ))}
        </div>
      )}
    </>
  )
}
