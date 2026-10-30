// server/src/timeline.ts 의 Activity 와 같은 모양. 화면용으로 id·detail 을 더했다.
export type ActivityType = '추가' | '수정' | '재결정'

export type Member = {
  id: string // 파일 이름 (GitHub 아이디, 미지정은 _unassigned)
  name: string
  initial: string
  color: string | null // null = 누가 했는지 모름
}

export type Activity = {
  id: string
  member: string
  date: string | null // null = 날짜 미상
  type: ActivityType
  content: string
  detail?: string
  commit: string | null // null = 직접 적은 기록
}

export type Project = {
  name: string
  overview: string | null
  start: string | null
  end: string | null // null = 미정
}

// 화면에는 쉬운 말로 보여준다. 파일 형식은 그대로 추가/수정/재결정.
export const TYPE_LABEL: Record<ActivityType, string> = {
  추가: '+ 추가',
  수정: '✎ 수정',
  재결정: '↺ 다시 결정',
}
