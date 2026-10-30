import { useEffect, useRef, type ReactNode } from 'react'
import './Dialog.css'

type Props = {
  variant: 'center' | 'side'
  labelledBy: string
  onClose: () => void
  children: ReactNode
}

// 브라우저 기본 <dialog> 로 포커스 가두기·Esc 닫기를 얻는다. 열려 있을 때만 그린다.
export function Dialog({ variant, labelledBy, onClose, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (el && !el.open) el.showModal()
  }, [])

  return (
    <dialog
      ref={ref}
      className={`dialog dialog-${variant}`}
      aria-labelledby={labelledBy}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose() // 바깥 어두운 곳 클릭
      }}
    >
      <div className="dialog-body">{children}</div>
    </dialog>
  )
}
