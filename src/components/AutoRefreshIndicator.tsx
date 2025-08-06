import React from 'react';
import './AutoRefreshIndicator.css';

interface AutoRefreshIndicatorProps {
  isActive: boolean;
  lastUpdate: Date | null;
}

const AutoRefreshIndicator: React.FC<AutoRefreshIndicatorProps> = ({ isActive, lastUpdate }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={`auto-refresh-indicator ${isActive ? 'active' : ''}`}>
      <div className="indicator-content">
        <div className="indicator-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4V10H7M23 20V14H17M20.49 9A9 9 0 0 0 5.64 5.64L1 10M3.51 15A9 9 0 0 0 18.36 18.36L23 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="indicator-text">
          <span className="indicator-label">
            {isActive ? 'Auto-refresh ativo' : 'Auto-refresh inativo'}
          </span>
          {lastUpdate && (
            <span className="last-update">
              Última atualização: {formatTime(lastUpdate)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoRefreshIndicator; 