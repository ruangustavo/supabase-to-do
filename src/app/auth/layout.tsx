import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 grid grid-cols-2">
      <div className="p-8 bg-muted">
        <h1 className="text-xl font-semibold tracking-tight">To-do app</h1>
      </div>
      <div className="p-8 flex items-center justify-center">{children}</div>
    </div>
  )
}
