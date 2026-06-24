import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '../api/client'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

export const queryKeys = {
  guildas: ['guildas'],
  herois: ['herois'],
  heroi: (id) => ['heroi', id],
  metricas: ['metricas'],
  perfil: ['perfil'],
}

export const useLoginMutation = () => {
  const { login } = useAuth()

  return useMutation({
    mutationFn: (dados) => apiRequest('/auth/login', { method: 'POST', body: dados }),
    onSuccess: (data) => login(data),
  })
}

export const useCadastroMutation = () => {
  const { login } = useAuth()

  return useMutation({
    mutationFn: (dados) => apiRequest('/auth/cadastro', { method: 'POST', body: dados }),
    onSuccess: (data) => login(data),
  })
}

export const useMetricas = () => {
  const { token } = useAuth()

  return useQuery({
    queryKey: queryKeys.metricas,
    queryFn: () => apiRequest('/dashboard/metricas', { token }),
    enabled: Boolean(token),
  })
}

export const useHerois = () => {
  const { token } = useAuth()

  return useQuery({
    queryKey: queryKeys.herois,
    queryFn: () => apiRequest('/herois', { token }),
    enabled: Boolean(token),
  })
}

export const useHeroi = (id) => {
  const { token } = useAuth()

  return useQuery({
    queryKey: queryKeys.heroi(id),
    queryFn: () => apiRequest(`/herois/${id}`, { token }),
    enabled: Boolean(token && id),
  })
}

export const useGuildas = () => {
  const { token } = useAuth()

  return useQuery({
    queryKey: queryKeys.guildas,
    queryFn: () => apiRequest('/guildas', { token }),
    enabled: Boolean(token),
  })
}

export const usePerfil = () => {
  const { token } = useAuth()

  return useQuery({
    queryKey: queryKeys.perfil,
    queryFn: () => apiRequest('/perfil', { token }),
    enabled: Boolean(token),
  })
}

export const useCriarHeroiMutation = () => {
  const { token } = useAuth()
  const queryClient = useQueryClient()
  const { adicionarToast } = useToast()

  return useMutation({
    mutationFn: (dados) => apiRequest('/herois', { method: 'POST', body: dados, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.herois })
      queryClient.invalidateQueries({ queryKey: queryKeys.metricas })
      adicionarToast('Herói criado.')
    },
  })
}

export const useAtualizarHeroiMutation = (id) => {
  const { token } = useAuth()
  const queryClient = useQueryClient()
  const { adicionarToast } = useToast()

  return useMutation({
    mutationFn: (dados) => apiRequest(`/herois/${id}`, { method: 'PUT', body: dados, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.heroi(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.herois })
      queryClient.invalidateQueries({ queryKey: queryKeys.metricas })
      adicionarToast('Herói atualizado.')
    },
  })
}

export const useRemoverHeroiMutation = () => {
  const { token } = useAuth()
  const queryClient = useQueryClient()
  const { adicionarToast } = useToast()

  return useMutation({
    mutationFn: (id) => apiRequest(`/herois/${id}`, { method: 'DELETE', token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.herois })
      queryClient.invalidateQueries({ queryKey: queryKeys.metricas })
      adicionarToast('Herói removido.')
    },
  })
}

export const useCriarMissaoMutation = (heroiId) => {
  const { token } = useAuth()
  const queryClient = useQueryClient()
  const { adicionarToast } = useToast()

  return useMutation({
    mutationFn: (dados) =>
      apiRequest(`/herois/${heroiId}/missoes`, { method: 'POST', body: dados, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.heroi(heroiId) })
      adicionarToast('Missão criada.')
    },
  })
}

export const useAtualizarMissaoStatusMutation = (heroiId) => {
  const { token } = useAuth()
  const queryClient = useQueryClient()
  const { adicionarToast } = useToast()

  return useMutation({
    mutationFn: ({ missaoId, status }) =>
      apiRequest(`/herois/${heroiId}/missoes/${missaoId}/status`, {
        method: 'PUT',
        body: { status },
        token,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.heroi(heroiId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.perfil })
      adicionarToast('Status da missão atualizado.')
    },
    onError: (error) => {
      adicionarToast(error.message || 'Falha ao atualizar status da missão.', 'error')
    },
  })
}

export const useRemoverMissaoMutation = (heroiId) => {
  const { token } = useAuth()
  const queryClient = useQueryClient()
  const { adicionarToast } = useToast()

  return useMutation({
    mutationFn: (missaoId) => apiRequest(`/herois/${heroiId}/missoes/${missaoId}`, { method: 'DELETE', token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.heroi(heroiId) })
      adicionarToast('Missão removida.')
    },
    onError: (error) => {
      adicionarToast(error.message || 'Falha ao remover missao.', 'error')
    },
  })
}

export const useLevelUpHeroiMutation = (id) => {
  const { token } = useAuth()
  const queryClient = useQueryClient()
  const { adicionarToast } = useToast()

  return useMutation({
    mutationFn: () => apiRequest(`/herois/${id}/level-up`, {
      method: 'POST',
      token,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.heroi(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.herois })
      queryClient.invalidateQueries({ queryKey: queryKeys.metricas })
      queryClient.invalidateQueries({ queryKey: queryKeys.perfil })
      adicionarToast('Herói upar com sucesso.')
    },
    onError: (error) => {
      adicionarToast(error.message || 'Falha ao upar herói.', 'error')
    },
  })
}

export const useAtualizarPerfilMutation = () => {
  const { atualizarUsuario, token } = useAuth()
  const queryClient = useQueryClient()
  const { adicionarToast } = useToast()

  return useMutation({
    mutationFn: (dados) => apiRequest('/perfil', { method: 'PUT', body: dados, token }),
    onSuccess: (usuario) => {
      atualizarUsuario(usuario)
      queryClient.invalidateQueries({ queryKey: queryKeys.perfil })
      adicionarToast('Perfil atualizado.')
    },
  })
}
