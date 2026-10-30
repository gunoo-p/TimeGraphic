import { useState } from 'react'
import type { Activity, ActivityType, Member } from '../types'
import { Avatar } from './common/Avatar'
import { Dialog } from './common/Dialog'
import { Icon } from './common/Icon'
import './AddActivityDialog.css'

type Props = {
  members: Member[]
  today: string
  onSave: (a: Activity) => void
  onClose: () => void
}

const TYPES: { value: ActivityType; symbol: string; label: string; hint: string }[] = [
  { value: '추가', symbol: '+', label: '추가', hint: '없던 걸 새로' },
  { value: '수정', symbol: '✎', label: '수정', hint: '있던 걸 바꿈' },
  { value: '재결정', symbol: '↺', label: '다시 결정', hint: '회의·결정' },
]

export function AddActivityDialog({ members, today, onSave, onClose }: Props) {
  const people = members.filter((m) => m.color)
  const [member, setMember] = useState(people[0]?.id ?? '')
  const [date, setDate] = useState(today)
  const [noDate, setNoDate] = useState(false)
  const [type, setType] = useState<ActivityType>('추가')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)

  const missing = !member ? '누가 했는지 골라 주세요' : !noDate && !date ? '날짜를 고르거나 "날짜를 몰라요"를 눌러 주세요' : !content.trim() ? '무엇을 했는지 적어 주세요' : null

  const save = () => {
    if (missing || saving) return // 여러 번 눌러도 한 번만 저장
    setSaving(true)
    // shortcut: 저장 API 없음, 잠깐 기다린 척만 한다. /api 연결 때 실패 처리와 함께 바꾼다.
    setTimeout(() => {
      onSave({ id: crypto.randomUUID(), member, date: noDate ? null : date, type, content: content.trim(), commit: null })
    }, 600)
  }

  return (
    <Dialog variant="center" labelledBy="add-title" onClose={onClose}>
      <div className="add-top">
        <h1 id="add-title">한 일 적기</h1>
        <button type="button" className="icon-btn" aria-label="닫기" onClick={onClose}>
          <Icon name="close" size={20} />
        </button>
      </div>

      <fieldset className="add-field">
        <legend>누가 했나요?</legend>
        <div className="add-options">
          {people.map((m) => (
            <label key={m.id} className="add-opt">
              <input type="radio" name="who" checked={member === m.id} onChange={() => setMember(m.id)} />
              <Avatar member={m} size="sm" />
              {m.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="add-field">
        <label htmlFor="add-date" className="add-label">
          언제 했나요?
        </label>
        <div className="add-date-row">
          <input id="add-date" type="date" value={date} disabled={noDate} onChange={(e) => setDate(e.target.value)} />
          <label className="add-check">
            <input type="checkbox" checked={noDate} onChange={(e) => setNoDate(e.target.checked)} />
            날짜를 몰라요
          </label>
        </div>
      </div>

      <fieldset className="add-field">
        <legend>어떤 일인가요?</legend>
        <div className="add-types">
          {TYPES.map((t) => (
            <label key={t.value} className="add-opt add-type">
              <input type="radio" name="type" checked={type === t.value} onChange={() => setType(t.value)} />
              <span aria-hidden="true" className="add-type-symbol">
                {t.symbol}
              </span>
              <strong>{t.label}</strong>
              <small>{t.hint}</small>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="add-field">
        <label htmlFor="add-content" className="add-label">
          무엇을 했나요?
        </label>
        <textarea id="add-content" rows={3} value={content} onChange={(e) => setContent(e.target.value)} />
        <span className="add-hint">다른 사람이 읽고 바로 알 수 있게 한 문장으로 적어 주세요</span>
      </div>

      <div className="add-actions">
        <span className="add-hint" aria-live="polite">
          {missing ?? '저장하면 팀원 모두에게 보여요'}
        </span>
        <div className="add-buttons">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            취소
          </button>
          <button type="button" className="btn btn-primary" disabled={!!missing || saving} onClick={save}>
            {saving ? (
              <>
                <span className="spinner" />
                저장하는 중…
              </>
            ) : (
              '저장하기'
            )}
          </button>
        </div>
      </div>
    </Dialog>
  )
}
