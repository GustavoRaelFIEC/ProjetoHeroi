import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'portal-herois-auth'

const carregarSessao = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { token: null, usuario: null }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return { token: null, usuario: null }
  }
}

export const AuthProvider = ({ children }) => {
  const [sessao, setSessao] = useState(carregarSessao)

  const login = useCallback(({ token, usuario }) => {
    const novaSessao = { token, usuario }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novaSessao))
    setSessao(novaSessao)
  }, [])

  const atualizarUsuario = useCallback((usuario) => {
    setSessao((atual) => {
      const novaSessao = { ...atual, usuario }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novaSessao))
      return novaSessao
    })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setSessao({ token: null, usuario: null })
  }, [])

  const value = useMemo(
    () => ({
      token: sessao.token,
      usuario: sessao.usuario,
      autenticado: Boolean(sessao.token),
      atualizarUsuario,
      login,
      logout,
    }),
    [atualizarUsuario, login, logout, sessao]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.')
  }

  return context
}
