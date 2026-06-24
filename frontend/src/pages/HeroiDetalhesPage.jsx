import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlocks'
import {
  useAtualizarHeroiMutation,
  useAtualizarMissaoStatusMutation,
  useCriarMissaoMutation,
  useHeroi,
  useRemoverMissaoMutation,
  useLevelUpHeroiMutation,
} from '../hooks/usePortalApi'

const classes = ['Mago', 'Guerreiro', 'Arqueiro', 'Ladino']
const inputClass =
  'mt-2 w-full rounded-md border border-[#1E1E1E] bg-[#2a2a2a] px-4 py-3 text-[#E0E0E0] outline-none transition focus:border-[#7C4DFF] focus:ring-2 focus:ring-[#7C4DFF]/20'

const HeroiDetalhesPage = () => {
  const { id } = useParams()
  const missaoFormRef = useRef(null)
  const heroiQuery = useHeroi(id)
  const atualizarHeroiMutation = useAtualizarHeroiMutation(id)
  const criarMissaoMutation = useCriarMissaoMutation(id)
  const atualizarMissaoStatusMutation = useAtualizarMissaoStatusMutation(id)
  const removerMissaoMutation = useRemoverMissaoMutation(id)
  const levelUpHeroiMutation = useLevelUpHeroiMutation(id)
  const [pendingMissaoId, setPendingMissaoId] = useState(null)
  const [pendingDeleteId, setPendingDeleteId] = useState(null)
  const [pendingLevelUp, setPendingLevelUp] = useState(false)

  if (heroiQuery.isLoading) {
    return (
      <PageTransition>
        <LoadingState label="Carregando herói..." />
      </PageTransition>
    )
  }

  if (heroiQuery.isError) {
    return (
      <PageTransition>
        <ErrorState message={heroiQuery.error.message} />
      </PageTransition>
    )
  }

  const heroi = heroiQuery.data
  const isHeroiMaximo = heroi.nivel_poder >= 100
  const proximoCusto = heroi.nivel_poder < 100 ? (heroi.nivel_poder + 1) * 10 : null

  const handleAtualizarHeroi = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    atualizarHeroiMutation.mutate({
      nome: formData.get('nome'),
      classe: formData.get('classe'),
      nivel_poder: Number(formData.get('nivel_poder')),
    })
  }

  const handleCriarMissao = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    criarMissaoMutation.mutate(
      {
        descricao: formData.get('descricao'),
        status: 'Em andamento',
        recompensa_ouro: Number(formData.get('recompensa_ouro')),
      },
      {
        onSuccess: () => missaoFormRef.current?.reset(),
      }
    )
  }

  const handleAtualizarStatusMissao = async (missaoId, status) => {
    setPendingMissaoId(missaoId)
    atualizarMissaoStatusMutation.mutate(
      { missaoId, status },
      {
        onSettled: () => setPendingMissaoId(null),
      }
    )
  }

  const handleLevelUpHeroi = () => {
    setPendingLevelUp(true)
    levelUpHeroiMutation.mutate(undefined, {
      onSettled: () => setPendingLevelUp(false),
    })
  }

  const handleRemoverMissao = (missaoId) => {
    setPendingDeleteId(missaoId)
    removerMissaoMutation.mutate(missaoId, {
      onSettled: () => setPendingDeleteId(null),
    })
  }

  return (
    <PageTransition>
      <section className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <img
            src={heroi.avatar_url}
            alt={heroi.nome}
            className="aspect-square w-full rounded-md border border-[#1E1E1E] object-cover"
          />

          <div className={`rounded-md border border-[#1E1E1E] p-5 bg-[#3f3f3f]`}>
            <p className={`text-sm font-medium `}>{heroi.guilda_nome}</p>
            <h1 className={`mt-2 text-3xl font-semibold`}>{heroi.nome}</h1>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-[#1E1E1E] bg-[#1E1E1E]/60 p-4">
                <p className="text-sm text-[#E0E0E0]/70">Classe</p>
                <p className="mt-1 text-lg font-semibold text-[#E0E0E0]">{heroi.classe}</p>
              </div>
              <div className="rounded-md border border-[#1E1E1E] bg-[#1E1E1E]/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-[#E0E0E0]/70">Nível de Poder</p>
                    <p className="mt-1 text-lg font-semibold text-[#FFD700]">{heroi.nivel_poder}</p>
                  </div>
                  <button
                    type="button"
                    disabled={pendingLevelUp || isHeroiMaximo}
                    onClick={handleLevelUpHeroi}
                    className={`flex items-center cursor-pointer rounded-md border px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${isHeroiMaximo ? 'border-[#1E1E1E] bg-[#ffffff] text-[#1E1E1E]' : 'border-[#FFD700]/40 bg-[#2a2a2a] text-[#FFD700] hover:bg-[#FFD700]/10'}`}
                  >
                    {isHeroiMaximo ? 'Nível Máximo' : pendingLevelUp ? 'Upar...' : 'Upar'}
                  </button>
                </div>
                <p className="mt-3 text-xs text-[#E0E0E0]/70">
                  Custo:{' '}
                  <span className="font-semibold text-[#FFD700]">
                    {proximoCusto !== null ? `${proximoCusto} coins` : '—'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <form
            key={heroi.updated_at}
            onSubmit={handleAtualizarHeroi}
            className="flex flex-col justify-between space-y-5 rounded-md border border-[#1E1E1E] bg-[#3f3f3f] p-5"
          >
            <h2 className="text-xl font-semibold text-[#E0E0E0]">Atualizar Herói</h2>

            <label className="block text-sm font-medium text-[#ffffff]">
              Nome
              <input
                className={inputClass}
                type="text"
                name="nome"
                minLength="3"
                defaultValue={heroi.nome}
                required
              />
            </label>

            <label className="block text-sm font-medium text-[#ffffff]">
              Classe
              <select className={inputClass} name="classe" defaultValue={heroi.classe} required>
                {classes.map((classe) => (
                  <option key={classe} value={classe}>
                    {classe}
                  </option>
                 ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-[#ffffff]">
              Nível de Poder
              <input
                className={inputClass}
                type="number"
                name="nivel_poder"
                min="0"
                max="100"
                defaultValue={heroi.nivel_poder}
                required
              />
            </label>

            {atualizarHeroiMutation.isError && (
              <ErrorState message={atualizarHeroiMutation.error.message} />
            )}

            <button
              type="submit"
              disabled={atualizarHeroiMutation.isPending}
              className="flex w-fit cursor-pointer rounded-md px-5 py-3 font-semibold text-[#2a2a2a] transition bg-[#f3c600] hover:bg-[#bd9a00] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {atualizarHeroiMutation.isPending ? 'Atualizando...' : 'Atualizar'}
            </button>
          </form>

          <form
            ref={missaoFormRef}
            onSubmit={handleCriarMissao}
            className="space-y-5 rounded-md border border-[#1E1E1E] bg-[#3f3f3f] p-5"
          >
            <h2 className="text-xl font-semibold text-[#E0E0E0]">Nova Missão</h2>

            <label className="block text-sm font-medium text-[#ffffff]">
              Descrição
              <input className={inputClass} type="text" name="descricao" minLength="3" required />
            </label>

            <label className="block text-sm font-medium text-[#ffffff]">
              Recompensa em ouro
              <input
                className={inputClass}
                type="number"
                name="recompensa_ouro"
                min="0"
                defaultValue="0"
                required
              />
            </label>

            <p className="text-sm text-[#E0E0E0]/80">
              Status padrão: <span className="font-semibold text-[#E0E0E0]">Em andamento</span>
            </p>

            {criarMissaoMutation.isError && <ErrorState message={criarMissaoMutation.error.message} />}

            <button
              type="submit"
              disabled={criarMissaoMutation.isPending}
              className="flex items-center cursor-pointer rounded-md px-5 py-3 font-semibold text-[#2a2a2a] transition bg-[#f3c600] hover:bg-[#bd9a00] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {criarMissaoMutation.isPending ? 'Enviando...' : 'Enviar para Missão'}
            </button>
          </form>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#E0E0E0]">Histórico de Missões</h2>

          {atualizarMissaoStatusMutation.isError && (
            <ErrorState message={atualizarMissaoStatusMutation.error?.message || 'Falha ao atualizar o status da missão.'} />
          )}

          {heroi.missoes.length === 0 ? (
            <EmptyState title="Nenhuma missão registrada." />
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              className="grid gap-4 md:grid-cols-2"
            >
              {heroi.missoes.map((missao) => (
                <motion.article
                  key={missao.id}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="rounded-md border border-[#1E1E1E] bg-[#3f3f3f] p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="max-w-full wrap-break-word font-semibold text-[#E0E0E0]">
                      {missao.descricao}
                    </h3>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`rounded-md border px-3 py-1 text-xs font-medium ${missao.status === 'Concluída' ? 'text-[#4CAF50] border-[#4CAF50]/30' : missao.status === 'Falhou' ? 'text-[#ff0000] border-[#ff0000]/30' : 'text-[#ffffff] border-[#ffffff]/30'}`}>
                        {missao.status}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-[#FFD700]">
                    {missao.recompensa_ouro} ouro
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={pendingMissaoId === missao.id || missao.status !== 'Em andamento'}
                      className="flex items-center cursor-pointer rounded-md border border-[#4CAF50]/40 px-4 py-2 text-sm font-medium text-[#4CAF50] transition hover:bg-[#4CAF50]/10 disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={() => handleAtualizarStatusMissao(missao.id, 'Concluída')}
                    >
                      Concluir
                    </button>
                    <button
                      type="button"
                      disabled={pendingMissaoId === missao.id || missao.status !== 'Em andamento'}
                      className="flex items-center cursor-pointer rounded-md border border-[#ff0000]/40 px-4 py-2 text-sm font-medium text-[#ff0000] transition hover:bg-[#ff0000]/10 disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={() => handleAtualizarStatusMissao(missao.id, 'Falhou')}
                    >
                      Falhar
                    </button>
                    <button
                        type="button"
                        disabled={pendingDeleteId === missao.id}
                        className="text-xs text-[#ff4d4f] hover:underline disabled:opacity-60 ml-auto mr-2 cursor-pointer"
                        onClick={() => handleRemoverMissao(missao.id)}
                      >
                        Excluir
                      </button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      </PageTransition>
    )
}

export default HeroiDetalhesPage
