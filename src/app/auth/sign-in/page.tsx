'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Icons } from '@/components/icons'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignIn() {
  const router = useRouter()

  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSignIn({ email, password }: SignInForm) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error('Não foi possível fazer login')
      return
    }

    router.push('/')
  }

  return (
    <div className="p-8 h-[600px] w-[400px] rounded-md flex flex-col justify-center gap-4">
      <h1 className="text-xl font-semibold tracking-tight text-center">
        Entre com sua conta
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
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
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && (
            <Icons.spinner className="mr-2 size-4 animate-spin" />
          )}
          Entrar
        </Button>

        <div className="text-center">
          <Link
            href="/auth/sign-up"
            className={buttonVariants({ variant: 'link' })}
          >
            Criar uma conta
          </Link>
        </div>
      </form>
    </div>
  )
}
