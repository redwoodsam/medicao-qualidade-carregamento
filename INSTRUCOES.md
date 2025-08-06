# Instruções de Uso - Sistema de Medição de Qualidade de Etanol

## 🚀 Como Executar

### 1. Instalação
```bash
# Navegar para o diretório do projeto
cd etanol-quality-app

# Instalar dependências
npm install
```

### 2. Executar em Desenvolvimento
```bash
npm start
```
A aplicação estará disponível em: http://localhost:3000

### 3. Build para Produção
```bash
npm run build
```

## 🔐 Login de Demonstração

Para testar a aplicação, use qualquer combinação de usuário e senha:
- **Usuário**: qualquer texto
- **Senha**: qualquer texto

Exemplo:
- Usuário: `admin`
- Senha: `123456`

## 📱 Funcionalidades da Aplicação

### Tela de Login
- Formulário simples com usuário e senha
- Design moderno com gradiente
- Validação de campos obrigatórios
- Feedback visual durante o login

### Tela de Romaneios
- **Header**: Informações do usuário logado e botão de logout
- **Filtros**: 
  - Todos os romaneios
  - Aguardando carregamento (pendentes)
  - Liberados
- **Lista de Cards**: Cada romaneio exibe:
  - Código do romaneio
  - Cliente
  - Placa do veículo
  - Status (com badge colorido)
  - Produto
  - Capacidade
  - Massa específica
  - Temperatura do tanque
  - Densidade do tanque

### Apontamento de Carregamento
1. **Clique em "Apontar Carregamento"** em qualquer romaneio pendente
2. **Modal abre** com dados de conferência (não editáveis)
3. **Preencha os campos**:
   - Temperatura aferida (°C)
   - Densidade aferida
   - Lado da plataforma (Esquerdo/Direito)
   - Data do carregamento
   - Hora do carregamento
4. **Clique em "Apontar Carregamento"**
5. **Confirme os dados** na tela de confirmação
6. **Clique em "Confirmar"** para enviar

## 🎨 Características do Design

### Responsividade
- **Desktop**: Layout completo com cards lado a lado
- **Tablet**: Layout adaptado para telas médias
- **Mobile**: Layout otimizado para telas pequenas

### Elementos Visuais
- **Gradientes**: Cabeçalho e botões principais
- **Sombras**: Cards e modais com profundidade
- **Animações**: Transições suaves em hover e focus
- **Cores**: Paleta moderna com azul como cor principal

### Estados da Interface
- **Loading**: Spinner durante carregamentos
- **Error**: Mensagens de erro em vermelho
- **Empty**: Estado vazio com ícone e mensagem
- **Success**: Feedback visual após ações

## 🔧 Configuração da API

### Para Usar com Backend Real
1. Configure a variável de ambiente `REACT_APP_API_URL`
2. Ou modifique o arquivo `src/services/api.ts`
3. Remova os dados mock e descomente as chamadas reais da API

### Endpoints Esperados
```
POST /api/auth/login
GET /api/romaneios?page=1&limit=10&status=pendente
GET /api/romaneios/:codRomaneio
POST /api/romaneios/apontar-carregamento
```

## 📊 Dados de Demonstração

A aplicação inclui 5 romaneios de exemplo:
- **3 pendentes** (aguardando carregamento)
- **2 liberados**

Cada romaneio tem dados completos para demonstração.

## 🚀 Deploy

### Netlify
1. Conecte o repositório ao Netlify
2. Configure o build command: `npm run build`
3. Configure o publish directory: `build`

### Vercel
1. Conecte o repositório ao Vercel
2. Deploy automático configurado

### GitHub Pages
1. Adicione `"homepage": "https://seu-usuario.github.io/seu-repo"` ao package.json
2. Configure o workflow de deploy

## 🐛 Solução de Problemas

### Erro de Compilação
```bash
# Limpar cache
npm run build -- --reset-cache
```

### Dependências
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Porta Ocupada
```bash
# Usar porta diferente
PORT=3001 npm start
```

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique o console do navegador (F12)
2. Verifique os logs do terminal
3. Consulte a documentação do React
4. Abra um issue no repositório

## 🎯 Próximos Passos

Para integrar com um backend real:
1. Implemente os endpoints da API
2. Configure autenticação JWT
3. Ajuste os tipos de dados conforme necessário
4. Teste todas as funcionalidades
5. Configure variáveis de ambiente para produção 