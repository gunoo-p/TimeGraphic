// shortcut: 화면 목업용 가짜 데이터, /api 연결할 때 서버 응답으로 바꾼다.
import type { Activity, Member, Project } from './types'

export const TODAY = '2026-10-28'

export const PROJECT: Project = {
  name: 'TimeGraphic',
  overview: 'GitHub에 남은 기록으로 팀원별 타임라인을 만들어 보여 주는 웹 앱이에요.',
  start: '2026-10-19',
  end: null,
}

export const MEMBERS: Member[] = [
  { id: 'gunoo-p', name: 'gunoo-p', initial: '건', color: 'var(--m1)' },
  { id: 'honggildong', name: 'honggildong', initial: '홍', color: 'var(--m2)' },
  { id: '_unassigned', name: '누가 했는지 모름', initial: '?', color: null },
]

export const ACTIVITIES: Activity[] = [
  { id: 'a1', member: 'gunoo-p', date: '2026-10-19', type: '추가', content: '프로젝트 기본 틀을 만들었어요', commit: 'a1b2c3d' },
  { id: 'a2', member: 'honggildong', date: '2026-10-20', type: '추가', content: 'GitHub 계정으로 로그인하는 기능을 만들었어요', commit: 'b2c3d4e' },
  { id: 'a3', member: 'gunoo-p', date: '2026-10-21', type: '추가', content: '저장된 기록을 불러오는 기능을 만들었어요', commit: 'c3d4e5f' },
  {
    id: 'a4',
    member: 'honggildong',
    date: '2026-10-22',
    type: '수정',
    content: '두 사람이 동시에 고쳐도 내용이 사라지지 않게 했어요',
    detail: '한 사람이 고치는 동안 다른 사람이 먼저 저장하면, 뒤에 저장한 내용이 앞의 내용을 덮어쓰지 않고 두 내용을 비교해서 고를 수 있게 했어요.',
    commit: 'd4e5f6a',
  },
  { id: 'a5', member: '_unassigned', date: '2026-10-23', type: '수정', content: '안내 글의 오타를 고쳤어요', commit: 'e5f6a7b' },
  { id: 'a6', member: 'gunoo-p', date: '2026-10-24', type: '재결정', content: '화면 색과 글씨 기준을 다시 정했어요', commit: null },
  { id: 'a7', member: 'honggildong', date: '2026-10-25', type: '추가', content: '기록을 자동으로 써 주는 기능을 만들었어요', commit: 'f6a7b8c' },
  { id: 'a8', member: 'gunoo-p', date: '2026-10-27', type: '수정', content: '작업 안내 문서를 주제별로 정리했어요', commit: 'a7b8c9d' },
  { id: 'a9', member: 'gunoo-p', date: '2026-10-28', type: '추가', content: '화면을 만들 때 지킬 규칙을 정했어요', commit: 'b8c9d0e' },
  { id: 'a10', member: 'honggildong', date: null, type: '수정', content: '설정을 정리했어요', commit: null },
]

export type ProjectSummary = {
  name: string
  lastActive: string | null
  canEdit: boolean
  members: Member[]
  activityCount: number
  recentDays: boolean[] // 최근 14일, 마지막이 오늘
}

export const OTHER_PROJECTS: ProjectSummary[] = [
  {
    name: '졸업 작품',
    lastActive: '3일 전',
    canEdit: false,
    members: [
      { id: 'gunoo-p', name: 'gunoo-p', initial: '건', color: 'var(--m1)' },
      { id: 'minji', name: 'minji', initial: '민', color: 'var(--m2)' },
      { id: 'seo', name: 'seo', initial: '서', color: 'var(--m3)' },
    ],
    activityCount: 14,
    recentDays: [1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0].map(Boolean),
  },
  {
    name: '스터디 사이트',
    lastActive: null,
    canEdit: true,
    members: [],
    activityCount: 0,
    recentDays: Array(14).fill(false),
  },
]
