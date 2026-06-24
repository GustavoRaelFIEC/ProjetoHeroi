import { AnimatePresence, motion } from 'framer-motion'
import HeroCard from '../components/HeroCard'
import MetricCard from '../components/MetricCard'
import PageTransition from '../components/PageTransition'
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlocks'
import { useAuth } from '../contexts/AuthContext'
import { useHerois, useMetricas, useRemoverHeroiMutation } from '../hooks/usePortalApi'

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const DashboardPage = () => {
  const { usuario } = useAuth()
  const metricasQuery = useMetricas()
  const heroisQuery = useHerois()
  const removerHeroiMutation = useRemoverHeroiMutation()

  const carregando = metricasQuery.isLoading || heroisQuery.isLoading
  const erro = metricasQuery.error || heroisQuery.error || removerHeroiMutation.error

  return (
    <PageTransition>
      <section className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-[#7C4DFF]">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#E0E0E0] sm:text-4xl">
              Bem-vindo, Recrutador {usuario?.nome}
            </h1>
          </div>

        </div>

        {carregando && <LoadingState />}
        {erro && <ErrorState message={erro.message} />}

        {metricasQuery.data && (
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Total de Heróis Recrutados" value={metricasQuery.data.total_herois} />
            <MetricCard
              label="Média de Poder da Equipe"
              value={Number(metricasQuery.data.media_poder).toFixed(1)}
              accent="amber"
            />
            <MetricCard
              label="Guilda Mais Forte"
              value={metricasQuery.data.guilda_mais_forte || 'Sem guilda'}
              accent="pink"
            />
          </div>
        )}
        {!carregando && heroisQuery.data && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#ffffff]">Heróis Recrutados</h2>

            {heroisQuery.data.length === 0 ? (
              <EmptyState title="Nenhum herói encontrado." />
            ) : (
              <motion.div
                variants={gridVariants}
                initial="hidden"
                animate="show"
                className={`grid gap-4 md:grid-cols-2 xl:grid-cols-3`}
              >
                <AnimatePresence>
                  {heroisQuery.data.map((heroi) => (
                    <HeroCard
                      key={heroi.id}
                      heroi={heroi}
                      removendo={removerHeroiMutation.isPending}
                      onRemover={(id) => removerHeroiMutation.mutate(id)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        )}
      </section>
    </PageTransition>
  )
}

export default DashboardPage
