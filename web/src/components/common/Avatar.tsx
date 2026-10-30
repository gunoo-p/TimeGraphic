import type { Member } from '../../types'
import './Avatar.css'

type Props = { member: Member; size?: 'sm' | 'md' | 'lg' }

// 색은 보조 수단이라 이름과 함께 쓴다. 혼자 쓸 땐 부모가 이름을 보여 준다.
export function Avatar({ member, size = 'md' }: Props) {
  if (!member.color) {
    return (
      <span className={`avatar avatar-${size} avatar-unknown`} aria-hidden="true">
        ?
      </span>
    )
  }
  return (
    <span className={`avatar avatar-${size}`} style={{ background: member.color }} aria-hidden="true">
      {member.initial}
    </span>
  )
}
