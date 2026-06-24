import PageTransition from '../components/PageTransition'
import { ErrorState, LoadingState } from '../components/StateBlocks'
import { useCriarHeroiMutation, useGuildas } from '../hooks/usePortalApi'

const classes = ['Mago', 'Guerreiro', 'Arqueiro', 'Ladino']
const inputClass =
  'mt-2 w-full rounded-md border border-[#1E1E1E] bg-[#2a2a2a] px-4 py-3 text-[#ffffff] outline-none transition focus:border-[#7C4DFF] focus:ring-2 focus:ring-[#7C4DFF]/20'

const RecrutamentoPage = () => {
  const guildasQuery = useGuildas()
  const criarHeroiMutation = useCriarHeroiMutation()

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    criarHeroiMutation.mutate(
      {
        nome: formData.get('nome'),
        classe: formData.get('classe'),
        nivel_poder: Number(formData.get('nivel_poder')),
        avatar_url: formData.get('avatar_url'),
        guilda_id: Number(formData.get('guilda_id')),
      },
      {
        onSuccess: () => form.reset(),
      }
    )
  }

  return (
    <PageTransition>
      <section className="space-y-8">
        <div>
          <p className="text-sm font-medium text-[#7C4DFF]">Recrutamento</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#ffffff]">Novo Herói</h1>
        </div>

        {guildasQuery.isLoading && <LoadingState label="Carregando guildas..." />}
        {guildasQuery.isError && <ErrorState message={guildasQuery.error.message} />}
        {criarHeroiMutation.isError && <ErrorState message={criarHeroiMutation.error.message} />}

        {guildasQuery.data && (
          <form
            onSubmit={handleSubmit}
            className="grid gap-5 rounded-md border border-[#1E1E1E] bg-[#3f3f3f] p-5 md:grid-cols-2"
          >
            <label className="block text-md font-medium text-[#ffffff]">
              Nome
              <input className={inputClass} type="text" name="nome" minLength="3" required />
            </label>

            <label className="block text-md font-medium text-[#ffffff]">
              Classe
              <select className={inputClass} name="classe" required defaultValue="">
                <option value="" disabled>
                  Selecione
                </option>
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
                required
              />
            </label>

            <label className="block text-sm font-medium text-[#ffffff]">
              Avatar
              <input className={inputClass} type="url" name="avatar_url" required />
            </label>

            <label className="block text-sm font-medium text-[#ffffff] md:col-span-2">
              Guilda
              <select className={inputClass} name="guilda_id" required defaultValue="">
                <option value="" disabled>
                  Selecione
                </option>
                {guildasQuery.data.map((guilda) => (
                  <option key={guilda.id} value={guilda.id}>
                    {guilda.nome}
                  </option>
                ))}
              </select>
            </label>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={criarHeroiMutation.isPending}
                className="flex items-center cursor-pointer rounded-md px-5 py-3 font-semibold text-[black] transition bg-[#f3c600] hover:bg-[#bd9a00] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {criarHeroiMutation.isPending ? 'Recrutando...' : 'Recrutar Herói'}
              </button>
            </div>
          </form>
        )}
      </section>
    </PageTransition>
  )
}

export default RecrutamentoPage
