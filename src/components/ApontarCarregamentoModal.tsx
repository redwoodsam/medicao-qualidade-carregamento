import React, { useState, useEffect } from 'react';
import { Romaneio, RomaneioDetails, RomaneioFormData } from '../types';
import { romaneioService } from '../services/api';
import './ApontarCarregamentoModal.css';

interface ApontarCarregamentoModalProps {
  romaneio: Romaneio | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError?: (errorMessage: string) => void;
}

const ApontarCarregamentoModal: React.FC<ApontarCarregamentoModalProps> = ({
  romaneio,
  isOpen,
  onClose,
  onSuccess,
  onError,
}) => {
  const [romaneioDetails, setRomaneioDetails] = useState<RomaneioDetails | null>(null);
  const [formData, setFormData] = useState<RomaneioFormData>({
    codRomaneio: '',
    placaVeiculo: '',
    temperaturaMedida: 0,
    densidadeAferida: 0,
    fatorCorrecao: 0,
    ladoPlataforma: 'E',
    dataCarregamento: '',
    horaCarregamento: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRomaneioDetails = async () => {
      if (!romaneio) return;
      
      try {
        setIsLoading(true);
        const details = await romaneioService.getRomaneioDetails(romaneio.codRomaneio);
        setRomaneioDetails(details);
      } catch (err: any) {
        const errorMessage = 'Erro ao carregar detalhes do romaneio';
        setError(errorMessage);
        onError?.(errorMessage);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && romaneio) {
      loadRomaneioDetails();
      setFormData({
        codRomaneio: romaneio.codRomaneio,
        placaVeiculo: romaneio.placaVeiculo,
        temperaturaMedida: 0,
        densidadeAferida: 0,
        fatorCorrecao: 0,
        ladoPlataforma: 'E',
        dataCarregamento: new Date().toISOString().split('T')[0],
        horaCarregamento: new Date().toTimeString().split(' ')[0],
      });
      setShowConfirmation(false);
      setError('');
    }
  }, [isOpen, romaneio, onError]);

  const handleInputChange = (field: keyof RomaneioFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateFatorCorrecao = () => {
    if (formData.temperaturaMedida && formData.densidadeAferida) {
      // Cálculo simplificado do fator de correção
      const tempDiff = formData.temperaturaMedida - 20;
      const fator = 1 + (tempDiff * 0.0001);
      return parseFloat(fator.toFixed(4));
    }
    return 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.temperaturaMedida || !formData.densidadeAferida) {
      const errorMessage = 'Preencha todos os campos obrigatórios';
      setError(errorMessage);
      onError?.(errorMessage);
      return;
    }

    const fatorCorrecao = calculateFatorCorrecao();
    setFormData(prev => ({ ...prev, fatorCorrecao }));
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await romaneioService.apontarCarregamento(formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao apontar carregamento';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !romaneio) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Apontar Carregamento</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!showConfirmation ? (
          <form onSubmit={handleSubmit} className="modal-form">
            {romaneioDetails && (
              <div className="romaneio-details">
                <h3>Dados do Romaneio</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="label">Código:</span>
                    <span className="value">{romaneioDetails.codRomaneio}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Cliente:</span>
                    <span className="value">{romaneioDetails.cliente}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Placa:</span>
                    <span className="value">{romaneioDetails.placaVeiculo}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Produto:</span>
                    <span className="value">{romaneioDetails.produto}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Capacidade:</span>
                    <span className="value">{romaneioDetails.capacidadeVeiculo} {romaneioDetails.un}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Massa Específica:</span>
                    <span className="value">{romaneioDetails.massaEspec20}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Temp. Tanque:</span>
                    <span className="value">{romaneioDetails.temperaturaTanque}°C</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Densidade Tanque:</span>
                    <span className="value">{romaneioDetails.densidadeTanque}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="form-section">
              <h3>Dados de Medição</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="temperaturaMedida">Temperatura Aferida (°C) *</label>
                  <input
                    type="number"
                    id="temperaturaMedida"
                    step="0.1"
                    value={formData.temperaturaMedida}
                    onChange={(e) => handleInputChange('temperaturaMedida', parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="densidadeAferida">Densidade Aferida *</label>
                  <input
                    type="number"
                    id="densidadeAferida"
                    step="0.001"
                    value={formData.densidadeAferida}
                    onChange={(e) => handleInputChange('densidadeAferida', parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ladoPlataforma">Lado da Plataforma</label>
                  <select
                    id="ladoPlataforma"
                    value={formData.ladoPlataforma}
                    onChange={(e) => handleInputChange('ladoPlataforma', e.target.value as 'E' | 'D')}
                  >
                    <option value="E">Lado Esquerdo</option>
                    <option value="D">Lado Direito</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="dataCarregamento">Data do Carregamento</label>
                  <input
                    type="date"
                    id="dataCarregamento"
                    value={formData.dataCarregamento}
                    onChange={(e) => handleInputChange('dataCarregamento', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="horaCarregamento">Hora do Carregamento</label>
                  <input
                    type="time"
                    id="horaCarregamento"
                    value={formData.horaCarregamento}
                    onChange={(e) => handleInputChange('horaCarregamento', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Processando...' : 'Apontar Carregamento'}
              </button>
            </div>
          </form>
        ) : (
          <div className="confirmation-section">
            <h3>Confirmação dos Dados</h3>
            <div className="confirmation-data">
              <div className="confirmation-item">
                <span className="label">Código do Romaneio:</span>
                <span className="value">{formData.codRomaneio}</span>
              </div>
              <div className="confirmation-item">
                <span className="label">Placa do Veículo:</span>
                <span className="value">{formData.placaVeiculo}</span>
              </div>
              <div className="confirmation-item">
                <span className="label">Temperatura Medida:</span>
                <span className="value">{formData.temperaturaMedida}°C</span>
              </div>
              <div className="confirmation-item">
                <span className="label">Densidade Aferida:</span>
                <span className="value">{formData.densidadeAferida}</span>
              </div>
              <div className="confirmation-item">
                <span className="label">Fator de Correção:</span>
                <span className="value">{formData.fatorCorrecao}</span>
              </div>
              <div className="confirmation-item">
                <span className="label">Lado da Plataforma:</span>
                <span className="value">{formData.ladoPlataforma === 'E' ? 'Esquerdo' : 'Direito'}</span>
              </div>
              <div className="confirmation-item">
                <span className="label">Data do Carregamento:</span>
                <span className="value">{formData.dataCarregamento}</span>
              </div>
              <div className="confirmation-item">
                <span className="label">Hora do Carregamento:</span>
                <span className="value">{formData.horaCarregamento}</span>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="cancel-button" 
                onClick={() => setShowConfirmation(false)}
              >
                Voltar
              </button>
              <button 
                type="button" 
                className="confirm-button" 
                onClick={handleConfirm}
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApontarCarregamentoModal; 