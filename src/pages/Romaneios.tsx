import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Romaneio } from '../types';
import { romaneioService } from '../services/api';
import RomaneioCard from '../components/RomaneioCard';
import ApontarCarregamentoModal from '../components/ApontarCarregamentoModal';
import SearchBar from '../components/SearchBar';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import './Romaneios.css';

const Romaneios: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast, showSuccess, showError, hideToast } = useToast();
  const [romaneios, setRomaneios] = useState<Romaneio[]>([]);
  const [filteredRomaneios, setFilteredRomaneios] = useState<Romaneio[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'todos' | 'pendente' | 'liberado'>('pendente');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRomaneio, setSelectedRomaneio] = useState<Romaneio | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<NodeJS.Timeout | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const loadRomaneios = useCallback(async (pageNum: number = 1, append: boolean = false, silent: boolean = false) => {
    try {
      if (!silent) {
        const loadingState = pageNum === 1 ? setIsLoading : setIsLoadingMore;
        loadingState(true);
      }
      setError('');

      const newRomaneios = await romaneioService.getRomaneios(pageNum, 10);
      
      if (append) {
        setRomaneios(prev => [...prev, ...newRomaneios]);
      } else {
        setRomaneios(newRomaneios);
      }

      setHasMore(newRomaneios.length === 10);
      setPage(pageNum);
      setLastUpdate(new Date());
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar romaneios';
      setError(errorMessage);
      if (!silent) {
        showError(errorMessage);
      }
      console.error('Erro ao carregar romaneios:', err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [showError]);

  // Carregamento inicial
  useEffect(() => {
    loadRomaneios(1, false);
  }, [loadRomaneios]);

  // Auto-refresh a cada 10 minutos (600000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      // Só faz auto-refresh se estiver no filtro "pendente" ou "todos" e se o modal não estiver aberto
      if ((selectedFilter === 'pendente' || selectedFilter === 'todos') && !isModalOpen) {
        loadRomaneios(1, false, true);
      }
    }, 600000); // 10 minutos

    setAutoRefreshInterval(interval);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [selectedFilter, loadRomaneios, isModalOpen]);

  // Limpar intervalo quando mudar de página
  useEffect(() => {
    return () => {
      if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
      }
    };
  }, [autoRefreshInterval]);

  useEffect(() => {
    // Filtrar romaneios baseado no filtro selecionado e termo de pesquisa
    let filtered = romaneios;

    // Aplicar filtro de status
    if (selectedFilter !== 'todos') {
      filtered = filtered.filter(r => r.status === selectedFilter);
    }

    // Aplicar filtro de pesquisa
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(r => 
        r.codRomaneio.toLowerCase().includes(searchLower)
      );
    }

    setFilteredRomaneios(filtered);
  }, [romaneios, selectedFilter, searchTerm]);

  const handleScroll = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 100) {
      setIsLoadingMore(true);
      loadRomaneios(page + 1, true);
    }
  }, [isLoadingMore, hasMore, page, loadRomaneios]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleApontarCarregamento = (romaneio: Romaneio) => {
    setSelectedRomaneio(romaneio);
    setIsModalOpen(true);
  };

  const handleModalSuccess = () => {
    // Recarregar romaneios após apontamento
    loadRomaneios(1, false);
    showSuccess('Apontamento realizado com sucesso!');
  };

  const handleModalError = (errorMessage: string) => {
    showError(errorMessage);
  };

  const handleLogout = () => {
    logout();
  };

  const getFilterCount = (status: 'pendente' | 'liberado') => {
    return romaneios.filter(r => r.status === status).length;
  };

  if (isLoading && page === 1) {
    return (
      <div className="romaneios-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando romaneios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="romaneios-container">
      <header className="romaneios-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Romaneios</h1>
            <p className="header-subtitle">Sistema de Medição de Qualidade de Etanol</p>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span>Olá, {user?.name}</span>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="romaneios-content">
        <div className="search-section">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Pesquisar por número do romaneio..."
          />
        </div>

        <div className="filters-section">
          <div className="filter-buttons">
            <button
              className={`filter-button ${selectedFilter === 'pendente' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('pendente')}
            >
              Aguardando Carregamento ({getFilterCount('pendente')})
            </button>
            <button
              className={`filter-button ${selectedFilter === 'liberado' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('liberado')}
            >
              Liberados ({getFilterCount('liberado')})
            </button>
            <button
              className={`filter-button ${selectedFilter === 'todos' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('todos')}
            >
              Todos ({romaneios.length})
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="romaneios-list">
          {filteredRomaneios.length === 0 && !isLoading ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>Nenhum romaneio encontrado</h3>
              <p>
                {searchTerm 
                  ? `Nenhum romaneio encontrado para "${searchTerm}".`
                  : selectedFilter === 'todos' 
                    ? 'Não há romaneios disponíveis no momento.'
                    : `Não há romaneios ${selectedFilter === 'pendente' ? 'aguardando carregamento' : 'liberados'} no momento.`
                }
              </p>
            </div>
          ) : (
            <>
              {filteredRomaneios.map((romaneio) => (
                <RomaneioCard
                  key={romaneio.id}
                  romaneio={romaneio}
                  onApontarCarregamento={handleApontarCarregamento}
                />
              ))}
              
              {isLoadingMore && (
                <div className="loading-more">
                  <div className="loading-spinner"></div>
                  <p>Carregando mais romaneios...</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ApontarCarregamentoModal
        romaneio={selectedRomaneio}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRomaneio(null);
        }}
        onSuccess={handleModalSuccess}
        onError={handleModalError}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={5000}
      />
    </div>
  );
};

export default Romaneios; 