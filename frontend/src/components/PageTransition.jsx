import { motion } from 'framer-motion'

const PageTransition = ({ children }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="w-full"
    >
      {children}
    </motion.main>
  )
}

export default PageTransition
