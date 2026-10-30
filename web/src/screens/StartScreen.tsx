import { Icon } from '../components/common/Icon'
import './StartScreen.css'

const STEPS = [
  { title: '프로젝트를 골라요', text: '내가 참여한 GitHub 저장소 중에서 하나를 고르면 돼요.' },
  { title: '자동으로 정리돼요', text: '쌓여 있던 기록을 쉬운 말로 바꿔서 사람별로 나눠 둬요.' },
  { title: '한눈에 봐요', text: '달력에서 주를 누르면 누가 무엇을 했는지 펼쳐져요.' },
]

export function StartScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <main className="start">
      <div className="start-hero">
        <span className="start-logo" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M6 12h24M6 24h24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity=".55" />
            <circle cx="11" cy="12" r="3.5" fill="#fff" />
            <circle cx="23" cy="12" r="3.5" fill="#fff" />
            <circle cx="17" cy="24" r="3.5" fill="#fff" />
            <circle cx="28" cy="24" r="3.5" fill="#fff" />
          </svg>
        </span>
        <h1>
          우리 팀이 한 일을
          <br />
          한눈에
        </h1>
        <p>GitHub에 남아 있는 기록을 읽어서, 누가 언제 무엇을 했는지 달력과 타임라인으로 정리해 드려요.</p>
        {/* shortcut: GitHub 로그인 없음, 누르면 바로 내 프로젝트로. 서버 OAuth 붙일 때 바꾼다. */}
        <button type="button" className="btn btn-primary start-login" onClick={onLogin}>
          <Icon name="login" size={20} />
          GitHub 계정으로 시작하기
        </button>
        <span className="start-note">비밀번호는 저장하지 않아요</span>
      </div>

      <ol className="start-steps">
        {STEPS.map((s, i) => (
          <li key={s.title} className="card">
            <span className="start-step-no">{i + 1}단계</span>
            <strong>{s.title}</strong>
            <span>{s.text}</span>
          </li>
        ))}
      </ol>

      <p className="start-note">GitHub에서 고칠 수 있는 사람은 기록도 고칠 수 있고, 볼 수만 있는 사람은 보기만 할 수 있어요.</p>
    </main>
  )
}
