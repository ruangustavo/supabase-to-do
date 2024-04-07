'use client'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Task } from '@/types/task'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateTask } from '../actions/update-task'
import { toast } from 'sonner'

type UpdateTaskDialogProps = {
  task: Task
  onOpenChange: (open: boolean) => void
}

const updateTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

type UpdateTaskFormValues = z.infer<typeof updateTaskSchema>

export function UpdateTaskDialog({
  task,
  onOpenChange,
}: UpdateTaskDialogProps) {
  const { register, handleSubmit } = useForm<UpdateTaskFormValues>({
    values: {
      title: task.title,
      description: task.description,
    },
    resolver: zodResolver(updateTaskSchema),
  })

  async function handleUpdateTask({
    title,
    description,
  }: UpdateTaskFormValues) {
    const { data, error } = await updateTask({
      id: task.id,
      title,
      description,
    })

    if (error) {
      toast.error('Aconteceu um erro ao criar a tarefa')
      return
    }

    if (data) {
      toast.success('Tarefa criada com sucesso!')
      onOpenChange(false)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Atualizar tarefa</DialogTitle>
      </DialogHeader>

      <form className="space-y-4" onSubmit={handleSubmit(handleUpdateTask)}>
        <div className="space-y-2">
          <Label>Título</Label>
          <Input {...register('title')} />
        </div>
        <div className="space-y-2">
          <Label>Descrição</Label>
          <Input {...register('description')} />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button type="submit" variant="success">
            Atualizar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
