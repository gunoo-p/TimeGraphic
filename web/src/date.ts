// 날짜는 'YYYY-MM-DD' 문자열로 다룬다. 달력은 월요일부터.
const DOW = ['월', '화', '수', '목', '금', '토', '일']

const toDate = (s: string) => new Date(`${s}T00:00:00`)

const pad = (n: number) => String(n).padStart(2, '0')

export const isoDate = (y: number, m0: number, d: number) => `${y}-${pad(m0 + 1)}-${pad(d)}`

export const dayOfMonth = (s: string) => Number(s.slice(8, 10))

export const weekday = (s: string) => DOW[(toDate(s).getDay() + 6) % 7]

export const shortDate = (s: string) => `${Number(s.slice(5, 7))}월 ${dayOfMonth(s)}일`

export const dayLabel = (s: string) => `${shortDate(s)} (${weekday(s)})`

export const longDate = (s: string) => `${s.slice(0, 4)}년 ${Number(s.slice(5, 7))}월 ${dayOfMonth(s)}일`

// 한 달을 주 단위로 나눈다. 그 달이 아닌 칸은 null.
export function monthWeeks(year: number, m0: number): (string | null)[][] {
  const first = (new Date(year, m0, 1).getDay() + 6) % 7
  const last = new Date(year, m0 + 1, 0).getDate()
  const cells: (string | null)[] = Array(first).fill(null)
  for (let d = 1; d <= last; d++) cells.push(isoDate(year, m0, d))
  while (cells.length % 7) cells.push(null)
  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

export function addDays(s: string, n: number) {
  const d = toDate(s)
  d.setDate(d.getDate() + n)
  return isoDate(d.getFullYear(), d.getMonth(), d.getDate())
}
