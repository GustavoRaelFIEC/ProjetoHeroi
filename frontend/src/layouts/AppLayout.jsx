import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { usePerfil } from '../hooks/usePortalApi'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/recrutar', label: 'Recrutar Herói' },
  { to: '/perfil', label: 'Perfil' },
]

const AppLayout = () => {
  const { logout, usuario } = useAuth()
  const perfilQuery = usePerfil()
  const navigate = useNavigate()
  const coins = perfilQuery.data?.coins ?? usuario?.coins ?? 0

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-[#1E1E1E] bg-[#1E1E1E]/90">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-[#7C4DFF]">Portal de Heróis</p>
            <p className="mt-1 text-sm text-[#E0E0E0]">{usuario?.email}</p>
            <p className="mt-1 text-sm text-[#E0E0E0]">Coins: <span className="font-semibold text-[#FFD700]">{coins}</span></p>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm border font-medium transition ${
                    isActive
                      ? 'bg-[#1E1E1E] text-[#FFD700]'
                      : 'text-[#E0E0E0] hover:bg-[#1E1E1E] hover:text-[#7C4DFF]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center cursor-pointer rounded-md border border-[#7C4DFF]/40 px-3 py-2 text-sm font-medium text-[#7C4DFF] transition hover:bg-[#7C4DFF]/10"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
