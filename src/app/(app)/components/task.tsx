'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Task as ITask } from '@/types/task'
import { markTaskAsDone } from '../actions/mark-task-as-done'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, RefreshCw, Trash } from 'lucide-react'
import { UpdateTaskDialog } from './update-task-dialog'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { deleteTask } from '../actions/delete-task'
import { Credenza, CredenzaTrigger } from '@/components/ui/credenza'

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
                <time className="text-xs text-muted-foreground sr-only md:not-sr-only">
                  Adicionada {formatDate(task.created_at)}
                </time>
              )}

              {task.done_at !== null && (
                <time className="text-xs text-muted-foreground sr-only md:not-sr-only">
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
        <Credenza open={isUpdateTaskOpen} onOpenChange={setIsUpdateTaskOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <CredenzaTrigger>
                  <span className="inline-flex items-center">
                    <RefreshCw className="mr-2 size-4" />
                    Atualizar
                  </span>
                </CredenzaTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button
                  className="inline-flex items-center text-rose-500"
                  onClick={() => deleteTask({ taskId: task.id })}
                >
                  <Trash className="mr-2 size-4" />
                  Excluir
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UpdateTaskDialog task={task} onOpenChange={setIsUpdateTaskOpen} />
        </Credenza>
      </div>
    </li>
  )
}
