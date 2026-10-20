// timeline/ 폴더 파일 파서. 형식은 docs/기능명세서.md "Timeline 파일 구조" 기준.

export type ActivityType = '추가' | '수정' | '재결정'

export type Activity = {
  member: string
  date: string | null // null = 날짜 미상
  type: ActivityType
  content: string
  commit: string | null // null = 수동 활동
  gitAuthor: string | null // _unassigned.md 전용
  line: number
}

export type ParseError = { line: number; message: string }

export type Project = {
  name: string | null
  overview: string | null
  start: string | null
  end: string | null // 미정이거나 기록 없음
}

const DATE_HEADING = /^### (\d{4}-\d{2}-\d{2})(?: \([월화수목금토일]\))?$/
const ACTIVITY = /^- (추가|수정|재결정): (.+?)(?: \| ([0-9a-f]{7,40})(?: \| (.+))?)?$/

// 2026-02-30 같은 없는 날짜를 거른다. 요일은 날짜에서 계산되므로 검사하지 않는다.
function isValidDate(s: string): boolean {
  const d = new Date(`${s}T00:00:00Z`)
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s
}

export function parseMemberFile(member: string, text: string) {
  const activities: Activity[] = []
  const errors: ParseError[] = []
  let date: string | null | undefined // undefined = 아직 날짜 제목 없음

  text.split(/\r?\n/).forEach((raw, i) => {
    const line = i + 1
    const s = raw.trim()
    if (!s || /^# /.test(s)) return

    if (s === '### 날짜 미상') {
      date = null
      return
    }
    const heading = DATE_HEADING.exec(s)
    if (heading) {
      if (isValidDate(heading[1])) date = heading[1]
      else errors.push({ line, message: `없는 날짜: ${heading[1]}` })
      return
    }

    const m = ACTIVITY.exec(s)
    if (!m) {
      errors.push({ line, message: '형식에 맞지 않는 줄' })
      return
    }
    if (date === undefined) {
      errors.push({ line, message: '날짜 제목 없이 나온 활동' })
      return
    }
    activities.push({
      member,
      date,
      type: m[1] as ActivityType,
      content: m[2],
      commit: m[3] ?? null,
      gitAuthor: m[4] ?? null,
      line,
    })
  })

  return { activities, errors }
}

export function parseProjectFile(text: string) {
  const project: Project = { name: null, overview: null, start: null, end: null }
  const errors: ParseError[] = []
  const overview: string[] = []
  let section = ''

  text.split(/\r?\n/).forEach((raw, i) => {
    const line = i + 1
    const s = raw.trim()
    if (/^# /.test(s)) {
      project.name = s.slice(2).trim() || null
      return
    }
    if (/^## /.test(s)) {
      section = s.slice(3).trim()
      return
    }
    if (section === '개요') {
      if (s) overview.push(s)
      return
    }
    if (section === '기간' && s) {
      const m = /^- (시작|종료): (.+)$/.exec(s)
      if (!m) {
        errors.push({ line, message: '형식에 맞지 않는 줄' })
        return
      }
      const value = m[2].trim()
      if (m[1] === '종료' && value === '미정') return
      if (!isValidDate(value)) {
        errors.push({ line, message: `지원하지 않는 날짜: ${value}` })
        return
      }
      if (m[1] === '시작') project.start = value
      else project.end = value
    }
  })

  project.overview = overview.length ? overview.join('\n') : null
  return { project, errors }
}
