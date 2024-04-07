'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

type DeleteTask = {
  taskId: string
}

export async function deleteTask({ taskId }: DeleteTask) {
  const supabase = createClient()

  const { data, error } = await supabase.from('tasks').delete().eq('id', taskId)

  revalidatePath('/')
  return { data, error }
}
