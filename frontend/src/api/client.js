const API_URL = import.meta.env.VITE_API_URL

export const apiRequest = async (path, options = {}) => {
  const { body, method = 'GET', token } = options
  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (response.status === 204) {
    return null
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(data?.erro || 'Nao foi possivel completar a requisicao.')
    error.detalhes = data?.detalhes
    throw error
  }

  return data
}