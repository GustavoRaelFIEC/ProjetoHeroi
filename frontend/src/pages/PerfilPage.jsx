import PageTransition from '../components/PageTransition'
import { ErrorState, LoadingState } from '../components/StateBlocks'
import { useAuth } from '../contexts/AuthContext'
import { useAtualizarPerfilMutation, usePerfil } from '../hooks/usePortalApi'

const inputClass =
  'mt-2 w-full rounded-md border border-[#1E1E1E] bg-[#2a2a2a] px-4 py-3 text-[#E0E0E0] outline-none transition focus:border-[#7C4DFF] focus:ring-2 focus:ring-[#7C4DFF]/20'

const PerfilPage = () => {
  const { usuario } = useAuth()
  const perfilQuery = usePerfil()
  const atualizarPerfilMutation = useAtualizarPerfilMutation()
  const perfil = perfilQuery.data || usuario

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const novaSenha = formData.get('nova_senha')
    const senhaAtual = formData.get('senha_atual')
    const dados = {
      nome: formData.get('nome'),
      email: formData.get('email'),
    }

    if (novaSenha) {
      dados.senha_atual = senhaAtual
      dados.nova_senha = novaSenha
    }

    atualizarPerfilMutation.mutate(dados)
  }

  return (
    <PageTransition>
      <section className="space-y-8">
        <div>
          <p className="text-sm font-medium text-[#7C4DFF]">Perfil</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#E0E0E0]">Dados do Recrutador</h1>
        </div>

        {perfilQuery.isLoading && <LoadingState label="Carregando perfil..." />}
        {perfilQuery.isError && <ErrorState message={perfilQuery.error.message} />}
        {atualizarPerfilMutation.isError && (
          <ErrorState message={atualizarPerfilMutation.error.message} />
        )}

        {perfil && (
          <>
            <div className="mb-4 rounded-md border border-[#1E1E1E] bg-[#2a2a2a] p-4 text-[#E0E0E0]">
              <p className="text-sm text-[#E0E0E0]/80">Saldo de Coins</p>
              <p className="mt-1 text-2xl font-semibold text-[#FFD700]">{perfil.coins ?? 0}</p>
            </div>
            <form
              key={perfil.updated_at || perfil.email}
              onSubmit={handleSubmit}
              className="grid gap-5 rounded-md border border-[#1E1E1E] bg-[#3f3f3f] p-5 md:grid-cols-2"
            >
              <label className="block text-sm font-medium text-[#ffffff]">
                Nome
                <input
                  className={inputClass}
                  type="text"
                  name="nome"
                  minLength={3}
                  defaultValue={perfil.nome}
                  required
                />
              </label>

              <label className="block text-sm font-medium text-[#ffffff]">
                Email
                <input
                  className={inputClass}
                  type="email"
                  name="email"
                  defaultValue={perfil.email}
                  required
                />
              </label>

              <label className="block text-sm font-medium text-[#ffffff]">
                Senha atual
                <input
                  className={inputClass}
                  type="password"
                  name="senha_atual"
                />
              </label>

              <label className="block text-sm font-medium text-[#ffffff]">
                Nova senha
                <input
                  className={inputClass}
                  type="password"
                  name="nova_senha"
                />
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={atualizarPerfilMutation.isPending}
                  className="flex items-center cursor-pointer rounded-md bg-[#f3c600] hover:bg-[#bd9a00] px-5 py-3 font-semibold text-[#2a2a2a] transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {atualizarPerfilMutation.isPending ? 'Atualizando...' : 'Atualizar Perfil'}
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </PageTransition>
  )
}

export default PerfilPage
