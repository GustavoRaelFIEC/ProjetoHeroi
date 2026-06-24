import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HeroCard = ({ heroi, onRemover, removendo }) => {
  const isHeroiMaximo = heroi.nivel_poder >= 100
  return (
    <motion.article
      layout
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0 },
      }}
      exit={{ opacity: 0, scale: 0.96, y: -10 }}
      className={`flex min-h-56 flex-col justify-between rounded-md border border-[#1E1E1E] bg-[#3f3f3f] p-5 shadow-xl shadow-[#1E1E1E]/30 ${isHeroiMaximo ? 'bg-[#daa516]' : ''} `}
    >
      <div className={`flex items-start gap-4`}>
        <img
          src={heroi.avatar_url}
          alt={heroi.nome}
          className="h-16 w-16 rounded-md border border-[#1E1E1E] object-cover"
        />
        <div className="min-w-0">
          <h3 className={`truncate text-lg font-semibold ${isHeroiMaximo ? 'text-[#000000]' : 'text-[#E0E0E0]'}`}>{heroi.nome}</h3>
          <p className={`text-sm ${isHeroiMaximo ? 'text-[#000000]' : 'text-[#d8d8d8ad]'}`}>{heroi.classe}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md border border-[#1E1E1E] bg-[#1E1E1E]/60 p-3">
          <p className="text-[#E0E0E0]/80">Poder</p>
          <p className={`mt-1 text-xl font-semibold ${isHeroiMaximo ? 'text-[#ffffffe0]' : 'text-[#FFD700]'}`}>{heroi.nivel_poder}</p>
        </div>
        <div className="rounded-md border border-[#1E1E1E] bg-[#1E1E1E]/60 p-3">
          <p className="text-[#E0E0E0]/80">Guilda</p>
          <p className="mt-1 truncate font-medium text-[#ffffff]">{heroi.guilda_nome}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to={`/heroi/${heroi.id}`}
          className={`flex items-center cursor-pointer rounded-md border px-4 py-2 text-sm text-align font-medium transition ${isHeroiMaximo ? 'text-[#000000e0] hover:bg-[#000000]/20' : 'text-[#FFD700] hover:bg-[#FFD700]/10'}`}
        >
          Detalhes
        </Link>
        <button
          type="button"
          disabled={removendo}
          onClick={() => onRemover(heroi.id)}
          className={`cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${isHeroiMaximo ? 'text-[#000000e0] hover:bg-[#000000]/20' : 'text-[#ff0000] hover:bg-[#ff0000]/10'}`}
        >
          {removendo ? 'Dispensando...' : 'Dispensar Herói'}
        </button>
      </div>
    </motion.article>
  )
}

export default HeroCard
