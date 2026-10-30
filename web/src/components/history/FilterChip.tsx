import type { ReactNode } from 'react'

type Props = {
  label: string
  count: number
  selected: boolean
  icon?: ReactNode
  onClick: () => void
}

export function FilterChip({ label, count, selected, icon, onClick }: Props) {
  return (
    <button type="button" className="filter-chip" aria-pressed={selected} onClick={onClick}>
      {icon}
      {label}
      <span className="filter-chip-count">{count}</span>
    </button>
  )
}
