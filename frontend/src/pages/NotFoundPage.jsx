import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

const NotFoundPage = () => (
  <PageTransition>
    <section className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <p className="text-sm font-medium text-[#7C4DFF]">404</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#E0E0E0]">Rota não encontrada</h1>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center cursor-pointer rounded-md bg-[#FFD700] px-5 py-3 font-semibold text-[#2a2a2a] transition hover:bg-[#e6c700]"
        >
          Voltar
        </Link>
      </div>
    </section>
  </PageTransition>
)

export default NotFoundPage
