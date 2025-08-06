export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
}

export interface Romaneio {
  id: string;
  codRomaneio: string;
  cliente: string;
  placaVeiculo: string;
  status: 'pendente' | 'liberado';
  produto: string;
  capacidadeVeiculo: number;
  un: string;
  massaEspec20: number;
  temperaturaTanque: number;
  densidadeTanque: number;
}

export interface RomaneioFormData {
  codRomaneio: string;
  placaVeiculo: string;
  temperaturaMedida: number;
  densidadeAferida: number;
  fatorCorrecao: number;
  ladoPlataforma: 'E' | 'D';
  dataCarregamento: string;
  horaCarregamento: string;
}

export interface RomaneioDetails {
  codRomaneio: string;
  cliente: string;
  placaVeiculo: string;
  status: string;
  produto: string;
  capacidadeVeiculo: number;
  un: string;
  massaEspec20: number;
  temperaturaTanque: number;
  densidadeTanque: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
} 