import type { Member } from './types'

const UNKNOWN: Member = { id: '_unassigned', name: '누가 했는지 모름', initial: '?', color: null }

// 목록에 없는 아이디도 다른 팀원으로 섞지 않고 "모름"으로 보여 준다.
export const findMember = (members: Member[], id: string) => members.find((m) => m.id === id) ?? UNKNOWN
