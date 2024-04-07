import { createClient } from '@/lib/supabase/server'
import { Header } from './components/header'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/auth/sign-in')
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-4 container space-y-8">
        <h1>hello world</h1>
      </main>
    </>
  )
}
