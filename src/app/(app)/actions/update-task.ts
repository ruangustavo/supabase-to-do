'use server'

import { createClient } from '@/lib/supabase/server'
import { Task } from '@/types/task'
import { revalidatePath } from 'next/cache'

type UpdateTask = Pick<Task, 'id' | 'title' | 'description'>

export async function updateTask({ id, title, description }: UpdateTask) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('tasks')
    .update({
      title,
      description,
    })
    .eq('id', id)
    .select()

  revalidatePath('/')
  return { data, error }
}
