export const LoadingState = ({ label = 'Carregando...' }) => (
  <div className="rounded-md border border-[#1E1E1E] bg-[#3f3f3f] px-5 py-6 text-sm text-[#E0E0E0]">
    {label}
  </div>
)

export const ErrorState = ({ message = 'Nao foi possivel carregar os dados.' }) => (
  <div className="rounded-md border border-[#7C4DFF]/40 bg-[#1E1E1E]/70 px-5 py-6 text-sm text-[#E0E0E0]">
    {message}
  </div>
)

export const EmptyState = ({ title }) => (
  <div className="rounded-md border border-dashed border-[#1E1E1E] bg-[#3f3f3f] px-5 py-8 text-center text-sm text-[#E0E0E0]">
    {title}
  </div>
)
