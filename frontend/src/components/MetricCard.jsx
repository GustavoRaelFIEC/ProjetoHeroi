const MetricCard = ({ label, value, accent = 'cyan' }) => {
  const color = {
    amber: 'text-[#FFD700] border-[#FFD700]/30',
    cyan: 'text-[#fff] border-[#fff]/60',
    pink: 'text-[#fff] border-[#fff]/60',
  }[accent]

  return (
    <div className={`min-h-32 rounded-md border bg-[#3f3f3f] p-5 ${color}`}>
      <p className="text-sm font-medium text-[#E0E0E0]">{label}</p>
      <p className="mt-4 wrap-break-word text-3xl font-semibold tracking-normal">{value}</p>
    </div>
  )
}

export default MetricCard
