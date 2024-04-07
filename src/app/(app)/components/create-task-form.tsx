'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { createTask } from '../actions/create-task'

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

type CreateTaskFormValues = z.infer<typeof createTaskSchema>

export function CreateTaskForm() {
  const { register, handleSubmit, reset } = useForm<CreateTaskFormValues>({
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: zodResolver(createTaskSchema),
  })

  async function handleCreateNewTask({
    title,
    description,
  }: CreateTaskFormValues) {
    const { data, error } = await createTask({ title, description })

    if (error) {
      toast.error('Aconteceu um erro ao criar a tarefa')
      return
    }

    if (data) {
      toast.success('Tarefa criada com sucesso!')
      reset()
    }
  }

  return (
    <form
      className="flex items-center gap-4 p-4 border rounded-md"
      onSubmit={handleSubmit(handleCreateNewTask)}
    >
      <div className="flex items-center gap-2.5 ">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          placeholder="Digite sua nova tarefa aqui..."
          className="h-8 w-[150px]"
          {...register('title')}
        />
      </div>

      <div className="flex items-center gap-2.5 flex-grow">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          placeholder="Digite a descrição da sua nova tarefa aqui..."
          className="h-8 "
          {...register('description')}
        />
      </div>
      <Button type="submit" size="sm" className="px-2 ">
        Adicionar
      </Button>
    </form>
  )
}
