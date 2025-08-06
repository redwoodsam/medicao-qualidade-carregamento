# Sistema de Medição de Qualidade de Etanol

Uma aplicação ReactJS moderna para medição de qualidade de etanol carregado, com interface intuitiva e responsiva.

## 🚀 Funcionalidades

### Autenticação
- Sistema de login com JWT
- Proteção de rotas
- Gerenciamento de sessão

### Gestão de Romaneios
- Lista de romaneios pendentes de medição
- Filtros por status (Aguardando carregamento / Liberados)
- Paginação infinita por rolagem
- Cards informativos com dados completos

### Apontamento de Carregamento
- Modal com formulário de medição
- Dados de conferência não editáveis
- Campos para temperatura e densidade aferidas
- Seleção de lado da plataforma
- Tela de confirmação antes do envio
- Cálculo automático do fator de correção

## 🛠️ Tecnologias Utilizadas

- **React 18** com TypeScript
- **React Router DOM** para navegação
- **Axios** para requisições HTTP
- **CSS3** com design responsivo
- **Context API** para gerenciamento de estado

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ProtectedRoute.tsx
│   ├── RomaneioCard.tsx
│   ├── ApontarCarregamentoModal.tsx
│   └── *.css
├── contexts/            # Contextos React
│   └── AuthContext.tsx
├── pages/              # Páginas da aplicação
│   ├── Login.tsx
│   ├── Romaneios.tsx
│   └── *.css
├── services/           # Serviços de API
│   └── api.ts
├── types/              # Definições TypeScript
│   └── index.ts
└── App.tsx            # Componente principal
```

## 🔧 Instalação e Execução

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone <repository-url>
cd etanol-quality-app

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm start
```

A aplicação estará disponível em `http://localhost:3000`

### Build para Produção
```bash
npm run build
```

## 🔌 Configuração da API

A aplicação espera uma API REST com os seguintes endpoints:

### Autenticação
- `POST /api/auth/login` - Login do usuário

### Romaneios
- `GET /api/romaneios` - Listar romaneios (com paginação)
- `GET /api/romaneios/:codRomaneio` - Detalhes do romaneio
- `POST /api/romaneios/apontar-carregamento` - Apontar carregamento

### Configuração da URL da API
Defina a variável de ambiente `REACT_APP_API_URL` ou a aplicação usará `http://localhost:3001/api` como padrão.

## 📱 Design Responsivo

A aplicação é totalmente responsiva e funciona em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🎨 Características do Design

- **Interface Moderna**: Gradientes, sombras e animações suaves
- **UX Intuitiva**: Navegação clara e feedback visual
- **Acessibilidade**: Foco em elementos interativos e contraste adequado
- **Performance**: Lazy loading e otimizações de renderização

## 🔐 Segurança

- Autenticação JWT
- Interceptors para renovação automática de token
- Redirecionamento automático em caso de token expirado
- Validação de formulários

## 📊 Funcionalidades Principais

### Tela de Login
- Formulário simples de usuário e senha
- Validação de campos obrigatórios
- Feedback de erro em tempo real
- Design moderno com gradiente

### Lista de Romaneios
- Cards informativos com dados completos
- Filtros por status com contadores
- Paginação infinita por rolagem
- Estados de loading e erro
- Estado vazio com mensagem informativa

### Modal de Apontamento
- Dados de conferência não editáveis
- Formulário para medições
- Cálculo automático do fator de correção
- Tela de confirmação antes do envio
- Validação de campos obrigatórios

## 🚀 Deploy

A aplicação pode ser facilmente deployada em qualquer serviço de hospedagem estática:

- **Netlify**: Conecte o repositório e configure o build
- **Vercel**: Deploy automático com preview
- **GitHub Pages**: Configure o workflow de deploy
- **AWS S3**: Upload dos arquivos buildados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos issues do repositório.
