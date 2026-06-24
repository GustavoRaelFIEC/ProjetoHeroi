import { AnimatePresence, motion } from 'framer-motion'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const removerToast = useCallback((id) => {
    setToasts((atuais) => atuais.filter((toast) => toast.id !== id))
  }, [])

  const adicionarToast = useCallback(
    (mensagem, tipo = 'sucesso') => {
      const id = crypto.randomUUID()
      setToasts((atuais) => [...atuais, { id, mensagem, tipo }])
      window.setTimeout(() => removerToast(id), 3200)
    },
    [removerToast]
  )

  const value = useMemo(() => ({ adicionarToast }), [adicionarToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              className={`rounded-md border px-4 py-3 text-sm shadow-2xl ${
                toast.tipo === 'erro'
                  ? 'border-[#7C4DFF]/50 bg-[#2a2a2a]/95 text-[#E0E0E0]'
                  : 'border-[#7C4DFF]/50 bg-[#2a2a2a]/95 text-[#E0E0E0]'
              }`}
            >
              {toast.mensagem}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast deve ser usado dentro de ToastProvider.')
  }

  return context
}
