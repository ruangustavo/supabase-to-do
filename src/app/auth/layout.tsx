import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 grid sm:grid-cols-1 md:grid-cols-2">
      <div className="p-8 bg-muted hidden md:block">
        <h1 className="text-xl font-semibold tracking-tight">To-do app</h1>
      </div>
      <div className="p-8 flex items-center justify-center">{children}</div>
    </div>
  )
}
