'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Task as ITask } from '@/types/task'
import { markTaskAsDone } from '../actions/mark-task-as-done'
import { cn } from '@/lib/utils'

type TaskProps = {
  task: ITask
}

export function Task({ task }: TaskProps) {
  const isDone = task.done_at !== null

  return (
    <li>
      <div className="flex items-center gap-4">
        <Checkbox
          checked={isDone}
          onCheckedChange={() =>
            markTaskAsDone({
              id: task.id,
              isDone,
            })
          }
        />
        <div className="space-y-2">
          <h1
            className={cn(
              'text-lg font-medium tracking-tight',
              isDone && 'line-through text-muted-foreground',
            )}
          >
            {task.title}
          </h1>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>
      </div>
    </li>
  )
}
