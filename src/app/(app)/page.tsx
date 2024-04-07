import { createClient } from '@/lib/supabase/server'
import { Header } from './components/header'
import { redirect } from 'next/navigation'
import { CreateTaskForm } from './components/create-task-form'
import { getTasks } from './actions/get-tasks'
import { Task } from './components/task'

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
        <ul className="space-y-4">
          {tasks && tasks.map((task) => <Task key={task.id} task={task} />)}
        </ul>
      </main>
    </>
  )
}
