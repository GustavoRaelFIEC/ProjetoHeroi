import { Navigate, Link, useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { useAuth } from '../contexts/AuthContext'
import { useLoginMutation } from '../hooks/usePortalApi'

const inputClass =
  'mt-2 w-full rounded-md border border-[#1E1E1E] bg-[#2a2a2a] px-4 py-3 text-[#E0E0E0] outline-none transition focus:border-[#7C4DFF] focus:ring-2 focus:ring-[#7C4DFF]/20'

const LoginPage = () => {
  const { autenticado } = useAuth()
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()

  if (autenticado) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    loginMutation.mutate(
      {
        email: formData.get('email'),
        senha: formData.get('senha'),
      },
      {
        onSuccess: () => navigate('/dashboard', { replace: true }),
      }
    )
  }

  return (
    <PageTransition>
      <section className="grid min-h-screen place-items-center px-4 py-10">
        <div className="w-full max-w-md rounded-md border border-[#1E1E1E] bg-[#3f3f3f] p-6 shadow-2xl shadow-[#1E1E1E]/50">
          <div className="mb-8">
            <p className="text-sm font-medium text-[#7C4DFF]">Portal de Heróis</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#E0E0E0]">Acesso do Recrutador</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-medium text-[#ffffff]">
              Email
              <input className={inputClass} type="email" name="email" required />
            </label>

            <label className="block text-sm font-medium text-[#ffffff]">
              Senha
              <input className={inputClass} type="password" name="senha" required />
            </label>

            {loginMutation.isError && (
              <p className="rounded-md border border-[#7C4DFF]/40 bg-[#1E1E1E]/70 px-4 py-3 text-sm text-[#E0E0E0]">
                {loginMutation.error.message}
              </p>
            )}

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="flex w-full items-center justify-center cursor-pointer rounded-md bg-[#f3c600] hover:bg-[#bd9a00] px-4 py-3 font-semibold text-[#2a2a2a] transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="mt-6 text-sm text-[#E0E0E0]">
            Novo recrutador?{' '}
            <Link className="cursor-pointer font-medium text-[#7C4DFF] hover:text-[#9a6cff]" to="/cadastro">
              Criar cadastro
            </Link>
          </p>
        </div>
      </section>
    </PageTransition>
  )
}

export default LoginPage
