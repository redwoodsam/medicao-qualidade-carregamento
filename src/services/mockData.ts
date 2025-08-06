import { Romaneio, RomaneioDetails, LoginResponse } from '../types';

// Dados mock para demonstração
export const mockRomaneios: Romaneio[] = [
  {
    id: '1',
    codRomaneio: '000075',
    cliente: 'Postos Prime',
    placaVeiculo: 'KYY0504',
    status: 'pendente',
    produto: 'Etanol Etilico Hidratado',
    capacidadeVeiculo: 60,
    un: 'L',
    massaEspec20: 0.810,
    temperaturaTanque: 27,
    densidadeTanque: 0.810
  },
  {
    id: '2',
    codRomaneio: '000076',
    cliente: 'Combustíveis ABC',
    placaVeiculo: 'ABC1234',
    status: 'pendente',
    produto: 'Etanol Etilico Hidratado',
    capacidadeVeiculo: 45,
    un: 'L',
    massaEspec20: 0.815,
    temperaturaTanque: 25,
    densidadeTanque: 0.815
  },
  {
    id: '3',
    codRomaneio: '000077',
    cliente: 'Distribuidora XYZ',
    placaVeiculo: 'XYZ9876',
    status: 'liberado',
    produto: 'Etanol Etilico Hidratado',
    capacidadeVeiculo: 50,
    un: 'L',
    massaEspec20: 0.808,
    temperaturaTanque: 26,
    densidadeTanque: 0.808
  },
  {
    id: '4',
    codRomaneio: '000078',
    cliente: 'Postos Prime',
    placaVeiculo: 'KYY0505',
    status: 'pendente',
    produto: 'Etanol Etilico Hidratado',
    capacidadeVeiculo: 55,
    un: 'L',
    massaEspec20: 0.812,
    temperaturaTanque: 28,
    densidadeTanque: 0.812
  },
  {
    id: '5',
    codRomaneio: '000079',
    cliente: 'Combustíveis ABC',
    placaVeiculo: 'ABC5678',
    status: 'liberado',
    produto: 'Etanol Etilico Hidratado',
    capacidadeVeiculo: 40,
    un: 'L',
    massaEspec20: 0.806,
    temperaturaTanque: 24,
    densidadeTanque: 0.806
  }
];

export const mockRomaneioDetails: Record<string, RomaneioDetails> = {
  '000075': {
    codRomaneio: '000075',
    cliente: 'Postos Prime',
    placaVeiculo: 'KYY0504',
    status: 'pendente',
    produto: 'Etanol Etilico Hidratado',
    capacidadeVeiculo: 60,
    un: 'L',
    massaEspec20: 0.810,
    temperaturaTanque: 27,
    densidadeTanque: 0.810
  },
  '000076': {
    codRomaneio: '000076',
    cliente: 'Combustíveis ABC',
    placaVeiculo: 'ABC1234',
    status: 'pendente',
    produto: 'Etanol Etilico Hidratado',
    capacidadeVeiculo: 45,
    un: 'L',
    massaEspec20: 0.815,
    temperaturaTanque: 25,
    densidadeTanque: 0.815
  },
  '000077': {
    codRomaneio: '000077',
    cliente: 'Distribuidora XYZ',
    placaVeiculo: 'XYZ9876',
    status: 'liberado',
    produto: 'Etanol Etilico Hidratado',
    capacidadeVeiculo: 50,
    un: 'L',
    massaEspec20: 0.808,
    temperaturaTanque: 26,
    densidadeTanque: 0.808
  },
  '000078': {
    codRomaneio: '000078',
    cliente: 'Postos Prime',
    placaVeiculo: 'KYY0505',
    status: 'pendente',
    produto: 'Etanol Etilico Hidratado',
    capacidadeVeiculo: 55,
    un: 'L',
    massaEspec20: 0.812,
    temperaturaTanque: 28,
    densidadeTanque: 0.812
  },
  '000079': {
    codRomaneio: '000079',
    cliente: 'Combustíveis ABC',
    placaVeiculo: 'ABC5678',
    status: 'liberado',
    produto: 'Etanol Etilico Hidratado',
    capacidadeVeiculo: 40,
    un: 'L',
    massaEspec20: 0.806,
    temperaturaTanque: 24,
    densidadeTanque: 0.806
  }
};

export const mockLoginResponse: LoginResponse = {
  token: 'mock-jwt-token-123456789',
  user: {
    id: '1',
    name: 'João Silva',
    username: 'joao.silva'
  }
}; 