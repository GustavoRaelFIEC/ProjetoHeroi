import { Navigate, Link, useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { useAuth } from '../contexts/AuthContext'
import { useCadastroMutation } from '../hooks/usePortalApi'

const inputClass =
  'mt-2 w-full rounded-md border border-[#1E1E1E] bg-[#2a2a2a] px-4 py-3 text-[#E0E0E0] outline-none transition focus:border-[#7C4DFF] focus:ring-2 focus:ring-[#7C4DFF]/20'

const CadastroPage = () => {
  const { autenticado } = useAuth()
  const navigate = useNavigate()
  const cadastroMutation = useCadastroMutation()

  if (autenticado) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    cadastroMutation.mutate(
      {
        nome: formData.get('nome'),
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
            <h1 className="mt-2 text-3xl font-semibold text-[#E0E0E0]">Cadastro de Recrutador</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-medium text-[#ffffff]">
              Nome completo
              <input className={inputClass} type="text" name="nome" minLength="3" required />
            </label>

            <label className="block text-sm font-medium text-[#ffffff]">
              Email
              <input className={inputClass} type="email" name="email" required />
            </label>

            <label className="block text-sm font-medium text-[#ffffff]">
              Senha
              <input className={inputClass} type="password" name="senha" required />
            </label>

            {cadastroMutation.isError && (
              <p className="rounded-md border border-[#7C4DFF]/40 bg-[#1E1E1E]/70 px-4 py-3 text-sm text-[#E0E0E0]">
                {cadastroMutation.error.message}
              </p>
            )}

            <button
              type="submit"
              disabled={cadastroMutation.isPending}
              className="flex w-full items-center cursor-pointer rounded-md bg-[#FFD700] px-4 py-3 font-semibold text-[#2a2a2a] transition hover:bg-[#e6c700] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cadastroMutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <p className="mt-6 text-sm text-[#E0E0E0]">
            Já tem cadastro?{' '}
            <Link className="cursor-pointer font-medium text-[#7C4DFF] hover:text-[#9a6cff]" to="/login">
              Entrar
            </Link>
          </p>
        </div>
      </section>
    </PageTransition>
  )
}

export default CadastroPage
