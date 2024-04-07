'use server'

import { createClient } from '@/lib/supabase/server'
import { Task } from '@/types/task'
import { revalidatePath } from 'next/cache'

type CreateTask = Pick<Task, 'title' | 'description'>

export async function createTask({ title, description }: CreateTask) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('tasks')
    .insert({
      title,
      description,
    })
    .select()

  revalidatePath('/')
  return { data, error }
}
