import axios from 'axios';
import { LoginCredentials, LoginResponse, Romaneio, RomaneioFormData, RomaneioDetails } from '../types';
import { mockRomaneios, mockRomaneioDetails, mockLoginResponse } from './mockData';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Para demonstração, aceita qualquer usuário/senha
    if (credentials.username && credentials.password) {
      return mockLoginResponse;
    }
    
    throw new Error('Credenciais inválidas');
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const romaneioService = {
  getRomaneios: async (page: number = 1, limit: number = 10, status?: string): Promise<Romaneio[]> => {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredRomaneios = mockRomaneios;
    
    if (status && status !== 'todos') {
      filteredRomaneios = mockRomaneios.filter(r => r.status === status);
    }
    
    // Simular paginação
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredRomaneios.slice(startIndex, endIndex);
  },

  getRomaneioDetails: async (codRomaneio: string): Promise<RomaneioDetails> => {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const details = mockRomaneioDetails[codRomaneio];
    if (!details) {
      throw new Error('Romaneio não encontrado');
    }
    
    return details;
  },

  apontarCarregamento: async (data: RomaneioFormData): Promise<void> => {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Dados enviados para API:', data);
    
    // Simular sucesso
    return Promise.resolve();
  },
};

export default api; 