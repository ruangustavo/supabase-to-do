'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

type MarkTaskAsDone = {
  id: string
  isDone: boolean
}

export async function markTaskAsDone({ id, isDone }: MarkTaskAsDone) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('tasks')
    .update({
      done_at: !isDone ? new Date().toISOString() : null,
    })
    .eq('id', id)

  revalidatePath('/')
  return { data, error }
}
