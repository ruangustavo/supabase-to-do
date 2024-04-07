'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Icons } from '@/components/icons'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
  })

type SignUpForm = z.infer<typeof signUpSchema>

export default function SignUp() {
  const router = useRouter()

  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function handleSignUp({ email, password }: SignUpForm) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/auth/callback',
      },
    })

    if (error) {
      toast.error('Não foi possível criar sua conta, tente novamente.')
      return
    }

    router.push('/auth/sign-in')
  }

  return (
    <div className="p-8 w-full rounded-md flex flex-col justify-center gap-4">
      <h1 className="text-xl font-semibold tracking-tight text-center">
        Crie sua conta
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
        <div className="space-y-2">
          <Label htmlFor="email">Seu e-mail</Label>
          <Input
            type="email"
            placeholder="Digite seu e-mail"
            {...register('email')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Sua senha</Label>
          <Input
            type="password"
            placeholder="Digite sua senha"
            {...register('password')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Confirme sua senha</Label>
          <Input
            type="password"
            placeholder="Digite sua senha novamente"
            {...register('confirmPassword')}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && (
            <Icons.spinner className="mr-2 size-4 animate-spin" />
          )}
          Criar conta
        </Button>
      </form>
    </div>
  )
}
