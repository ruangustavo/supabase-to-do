'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Task as ITask } from '@/types/task'
import { markTaskAsDone } from '../actions/mark-task-as-done'
import { cn } from '@/lib/utils'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, RefreshCw } from 'lucide-react'
import { UpdateTaskDialog } from './update-task-dialog'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type TaskProps = {
  task: ITask
}

export function Task({ task }: TaskProps) {
  const isDone = task.done_at !== null

  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState(false)

  function formatDate(date: string) {
    return formatDistanceToNow(new Date(date), {
      locale: ptBR,
      addSuffix: true,
    })
  }

  return (
    <li>
      <div className="flex items-center justify-between">
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
            <div className="flex items-center gap-2">
              <h1
                className={cn(
                  'text-lg font-medium tracking-tight',
                  isDone && 'line-through text-muted-foreground',
                )}
              >
                {task.title}
              </h1>

              {!isDone && (
                <time className="text-xs text-muted-foreground">
                  Adicionada {formatDate(task.created_at)}
                </time>
              )}

              {task.done_at !== null && (
                <time className="text-xs text-muted-foreground">
                  Concluída {formatDate(task.done_at)}
                </time>
              )}
            </div>
            <p
              className={cn(
                'text-sm',
                isDone && 'line-through text-muted-foreground',
              )}
            >
              {task.description}
            </p>
          </div>
        </div>
        <Dialog open={isUpdateTaskOpen} onOpenChange={setIsUpdateTaskOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <DialogTrigger>
                  <span className="inline-flex items-center">
                    <RefreshCw className="mr-2 size-4" />
                    Atualizar
                  </span>
                </DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UpdateTaskDialog task={task} onOpenChange={setIsUpdateTaskOpen} />
        </Dialog>
      </div>
    </li>
  )
}
