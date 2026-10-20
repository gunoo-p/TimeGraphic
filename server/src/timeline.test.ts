import assert from 'node:assert/strict'
import { test } from 'node:test'
import { parseMemberFile, parseProjectFile } from './timeline.js'

test('팀원 파일: 날짜·유형·내용·커밋을 읽는다', () => {
  const { activities, errors } = parseMemberFile(
    'gunoo-p',
    `# gunoo-p
### 2026-10-19 (월)
- 추가: 로그인 추가 | a1b2c3d
- 재결정: 기간 표시 방식 변경

### 날짜 미상
- 수정: 초기 설정`,
  )
  assert.deepEqual(errors, [])
  assert.deepEqual(
    activities.map(({ date, type, content, commit }) => [date, type, content, commit]),
    [
      ['2026-10-19', '추가', '로그인 추가', 'a1b2c3d'],
      ['2026-10-19', '재결정', '기간 표시 방식 변경', null],
      [null, '수정', '초기 설정', null],
    ],
  )
  assert.equal(activities[0].member, 'gunoo-p')
  assert.equal(activities[0].line, 3)
})

test('미지정 파일: 커밋 뒤 git 작성자를 읽는다', () => {
  const { activities } = parseMemberFile('_unassigned', '### 2026-10-19\n- 추가: 초기 설정 | a1b2c3d | Hong Gil')
  assert.equal(activities[0].commit, 'a1b2c3d')
  assert.equal(activities[0].gitAuthor, 'Hong Gil')
})

test('내용에 | 가 있어도 커밋으로 오인하지 않는다', () => {
  const { activities } = parseMemberFile('a', '### 2026-10-19\n- 수정: A | B 정리')
  assert.equal(activities[0].content, 'A | B 정리')
  assert.equal(activities[0].commit, null)
})

test('잘못된 줄은 줄 번호와 함께 오류로 모은다', () => {
  const { activities, errors } = parseMemberFile(
    'a',
    `- 추가: 날짜 전
### 2026-02-30 (월)
### 2026/10/19
### 2026-10-19
- 삭제: 없는 유형
- 추가: 정상`,
  )
  assert.deepEqual(
    errors.map((e) => e.line),
    [1, 2, 3, 5],
  )
  assert.equal(activities.length, 1)
})

test('프로젝트 파일: 이름·개요·기간을 읽는다', () => {
  const { project, errors } = parseProjectFile(`# TimeGraphic
## 개요
프로젝트 Timeline.md 시각화 앱
두 번째 줄

## 기간
- 시작: 2026-10-19
- 종료: 미정`)
  assert.deepEqual(errors, [])
  assert.deepEqual(project, {
    name: 'TimeGraphic',
    overview: '프로젝트 Timeline.md 시각화 앱\n두 번째 줄',
    start: '2026-10-19',
    end: null,
  })
})

test('프로젝트 파일: 값이 없거나 잘못되면 확정하지 않는다', () => {
  const { project, errors } = parseProjectFile('# X\n## 기간\n- 시작: 10월 19일')
  assert.equal(project.overview, null)
  assert.equal(project.start, null)
  assert.equal(errors[0].line, 3)
})
