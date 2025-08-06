import React from 'react';
import { Romaneio } from '../types';
import './RomaneioCard.css';

interface RomaneioCardProps {
  romaneio: Romaneio;
  onApontarCarregamento: (romaneio: Romaneio) => void;
}

const RomaneioCard: React.FC<RomaneioCardProps> = ({ romaneio, onApontarCarregamento }) => {
  const getStatusColor = (status: string) => {
    return status === 'pendente' ? 'var(--color-warning)' : 'var(--color-success)';
  };

  const getStatusText = (status: string) => {
    return status === 'pendente' ? 'Aguardando Carregamento' : 'Liberado';
  };

  return (
    <div className="romaneio-card">
      <div className="romaneio-header">
        <div className="romaneio-codigo">
          <span className="label">Romaneio:</span>
          <span className="value">{romaneio.codRomaneio}</span>
        </div>
        <div 
          className="status-badge"
          style={{ backgroundColor: getStatusColor(romaneio.status) }}
        >
          {getStatusText(romaneio.status)}
        </div>
      </div>

      <div className="romaneio-content">
        <div className="info-row">
          <div className="info-item">
            <span className="label">Cliente:</span>
            <span className="value">{romaneio.cliente}</span>
          </div>
          <div className="info-item">
            <span className="label">Placa:</span>
            <span className="value">{romaneio.placaVeiculo}</span>
          </div>
        </div>

        <div className="info-row">
          <div className="info-item">
            <span className="label">Produto:</span>
            <span className="value">{romaneio.produto}</span>
          </div>
          <div className="info-item">
            <span className="label">Capacidade Veículo:</span>
            <span className="value">{romaneio.capacidadeVeiculo} {romaneio.un}</span>
          </div>
        </div>

        <div className="info-row">
          <div className="info-item">
            <span className="label">Massa Específica a 20°:</span>
            <span className="value">{romaneio.massaEspec20}</span>
          </div>
          <div className="info-item">
            <span className="label">Temp. Tanque:</span>
            <span className="value">{romaneio.temperaturaTanque}°C</span>
          </div>
        </div>

        <div className="info-row">
          <div className="info-item">
            <span className="label">Densidade Tanque:</span>
            <span className="value">{romaneio.densidadeTanque}</span>
          </div>
        </div>
      </div>

      {romaneio.status === 'pendente' && (
        <div className="romaneio-actions">
          <button
            className="apontar-button"
            onClick={() => onApontarCarregamento(romaneio)}
          >
            Apontar Carregamento
          </button>
        </div>
      )}
    </div>
  );
};

export default RomaneioCard; 