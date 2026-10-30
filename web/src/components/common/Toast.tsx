import { useEffect } from 'react'
import './Toast.css'

type Props = { message: string; onDone: () => void }

export function Toast({ message, onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [message, onDone])

  return (
    <div className="toast" role="status">
      <span aria-hidden="true">✓</span>
      {message}
    </div>
  )
}
