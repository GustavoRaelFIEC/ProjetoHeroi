import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import CadastroPage from './pages/CadastroPage'
import DashboardPage from './pages/DashboardPage'
import HeroiDetalhesPage from './pages/HeroiDetalhesPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import PerfilPage from './pages/PerfilPage'
import RecrutamentoPage from './pages/RecrutamentoPage'
import ProtectedRoute from './routes/ProtectedRoute'

const App = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/recrutar" element={<RecrutamentoPage />} />
            <Route path="/heroi/:id" element={<HeroiDetalhesPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
