'use server'

import { createClient } from '@/lib/supabase/server'

export async function getTasks() {
  const supabase = createClient()

  const { data } = await supabase
    .from('tasks')
    .select('*')
    .order('done_at', { ascending: false })

  return data
}
