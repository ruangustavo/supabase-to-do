import { createClient } from '@/lib/supabase/server'
import { Header } from './components/header'
import { redirect } from 'next/navigation'
import { CreateTaskForm } from './components/create-task-form'
import { getTasks } from './actions/get-tasks'

export default async function Home() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/auth/sign-in')
  }

  const tasks = await getTasks()

  return (
    <>
      <Header />
      <main className="flex-1 pt-4 container space-y-8">
        <CreateTaskForm />
        <ul className="list-disc space-y-4">
          {tasks &&
            tasks.map((task) => (
              <li key={task.id}>
                <h1 className="text-lg font-medium tracking-tight">
                  {task.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {task.description}
                </p>
              </li>
            ))}
        </ul>
      </main>
    </>
  )
}
