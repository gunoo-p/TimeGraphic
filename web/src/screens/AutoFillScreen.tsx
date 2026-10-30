import { useEffect, useState } from 'react'
import { Avatar } from '../components/common/Avatar'
import { Icon } from '../components/common/Icon'
import type { Member } from '../types'
import './AutoFillScreen.css'

type Props = {
  projectName: string
  onBack: () => void
  onSave: () => void
}

// shortcut: 진행률과 결과 모두 가짜. 서버의 커밋 가져오기·AI 작성이 생기면 그 응답으로 바꾼다.
const TOTAL = 340
const SKIPPED = 12
const RESULT: { member: Member; count: number; samples: string[] }[] = [
  {
    member: { id: 'gunoo-p', name: 'gunoo-p', initial: '건', color: 'var(--m1)' },
    count: 18,
    samples: ['+ 회원 가입 화면을 만들었어요 · 10월 2일', '✎ 첫 화면 글씨를 키웠어요 · 10월 5일'],
  },
  {
    member: { id: 'teammate', name: '[팀원 아이디]', initial: '팀', color: 'var(--m2)' },
    count: 9,
    samples: ['+ 스터디 일정표를 만들었어요 · 10월 3일', '↺ 모임 요일을 화요일로 다시 정했어요 · 10월 8일'],
  },
]

const STEPS = [
  { title: 'GitHub에서 기록 가져오기', sub: (fetched: number) => `${fetched} / ${TOTAL}개` },
  { title: '쉬운 말로 바꾸기', sub: () => '"fix typo" → "오타를 고쳤어요"' },
  { title: '사람별로 나누기', sub: () => '누가 했는지 모르면 따로 모아 둬요' },
]

export function AutoFillScreen({ projectName, onBack, onSave }: Props) {
  const [pct, setPct] = useState(0)
  const [run, setRun] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setPct((p) => (p >= 100 ? 100 : p + 1)), 50)
    return () => clearInterval(iv)
  }, [run])

  const done = pct >= 100
  const phase = pct < 40 ? 0 : pct < 75 ? 1 : 2
  const fetched = Math.min(TOTAL, Math.round((pct / 40) * TOTAL))

  return (
    <main className="page autofill">
      <header className="autofill-head">
        <button type="button" className="btn btn-text autofill-back" onClick={onBack}>
          <Icon name="back" />
          {projectName}
        </button>
        <h1 className="page-title">{done ? '이렇게 정리했어요' : '기록을 정리하고 있어요'}</h1>
      </header>

      {!done ? (
        <section className="autofill-progress card" aria-live="polite">
          <div className="autofill-bar-wrap">
            <div className="autofill-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="진행">
              <div style={{ width: `${pct}%` }} />
            </div>
            <span>{pct}% 진행</span>
          </div>
          <ol className="autofill-steps">
            {STEPS.map((s, k) => (
              <li key={s.title} className={k > phase ? 'is-todo' : undefined}>
                {k < phase ? (
                  <span className="autofill-ic is-done">✓</span>
                ) : k === phase ? (
                  <span className="autofill-ic">
                    <span className="spinner" />
                  </span>
                ) : (
                  <span className="autofill-ic is-todo" />
                )}
                <span>
                  <strong>{s.title}</strong>
                  <small>{s.sub(fetched)}</small>
                </span>
              </li>
            ))}
          </ol>
          <span className="autofill-note">창을 닫아도 계속 진행돼요. 끝나면 알려 드릴게요.</span>
        </section>
      ) : (
        <div className="autofill-result">
          <div className="autofill-warn rise" role="status">
            <span aria-hidden="true">!</span>
            <span className="autofill-warn-text">
              기록 {TOTAL}개 중 {SKIPPED}개는 무슨 일인지 알기 어려워서 빼 두었어요.
            </span>
            <button type="button" className="btn btn-text">
              빼 둔 것 보기
            </button>
          </div>

          {RESULT.map((r, i) => (
            <article key={r.member.id} className="autofill-person card rise" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
              <div className="autofill-person-head">
                <Avatar member={r.member} />
                <strong>{r.member.name}</strong>
                <span>{r.count}가지 일</span>
              </div>
              <ul>
                {r.samples.map((s) => (
                  <li key={s}>{s}</li>
                ))}
                <li className="autofill-more">{r.count - r.samples.length}가지 더 보기</li>
              </ul>
            </article>
          ))}

          <article className="autofill-person card is-unknown rise" style={{ animationDelay: '0.3s' }}>
            <div className="autofill-person-head">
              <Avatar member={{ id: '_unassigned', name: '', initial: '?', color: null }} />
              <span>누가 했는지 모르는 일 2가지 · 나중에 사람을 정할 수 있어요</span>
            </div>
          </article>

          <div className="autofill-actions rise" style={{ animationDelay: '0.4s' }}>
            <span className="autofill-note">아직 저장하지 않았어요. 확인한 뒤 저장해 주세요.</span>
            <div>
              <button type="button" className="btn btn-secondary" onClick={() => {
                  setPct(0)
                  setRun(run + 1)
                }}
              >
                다시 하기
              </button>
              <button type="button" className="btn btn-primary" onClick={onSave}>
                이대로 저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
