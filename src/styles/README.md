# Tema da Aplicação - Etanol Quality App

Este diretório contém os arquivos de estilo e tema da aplicação, implementando um design branco com detalhes em verde escuro, similar ao PO-UI da TOTVS.

## Arquivos

### `theme.css`
Contém as variáveis CSS que definem o tema da aplicação:
- **Cores principais**: Azul TOTVS (`#0c9abe`) e verde escuro (`#2e7d32`)
- **Cores neutras**: Escala de cinzas para textos e fundos
- **Cores de estado**: Sucesso, aviso, erro e informação
- **Espaçamentos**: Sistema de espaçamento consistente
- **Tipografia**: Família de fontes e tamanhos
- **Sombras**: Sistema de sombras para profundidade
- **Bordas arredondadas**: Sistema de raios de borda
- **Transições**: Animações suaves

### `utilities.css`
Classes utilitárias para uso rápido:
- Classes de cores de texto e fundo
- Classes de bordas e sombras
- Classes de espaçamento
- Classes de tipografia
- Classes de transições e estados hover
- Classes de gradientes

## Cores do Tema

### Cores Principais
- **Primary**: `#0c9abe` (Azul TOTVS)
- **Primary Dark**: `#0a7a94`
- **Primary Light**: `#0dc2f0`

### Cores de Destaque (Verde Escuro)
- **Accent**: `#2e7d32` (Verde escuro)
- **Accent Dark**: `#1b5e20`
- **Accent Light**: `#4caf50`

### Cores Neutras
- **White**: `#ffffff`
- **Gray 50**: `#fafafa`
- **Gray 100**: `#f5f5f5`
- **Gray 200**: `#eeeeee`
- **Gray 300**: `#e0e0e0`
- **Gray 400**: `#bdbdbd`
- **Gray 500**: `#9e9e9e`
- **Gray 600**: `#757575`
- **Gray 700**: `#616161`
- **Gray 800**: `#424242`
- **Gray 900**: `#212121`

### Cores de Estado
- **Success**: `#4caf50`
- **Warning**: `#ff9800`
- **Error**: `#f44336`
- **Info**: `#2196f3`

## Uso

### Variáveis CSS
```css
.my-component {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}
```

### Classes Utilitárias
```html
<div class="bg-white p-lg rounded-lg shadow-md">
  <h2 class="text-primary text-xl">Título</h2>
  <p class="text-secondary">Descrição</p>
</div>
```

## Responsividade

O tema inclui breakpoints para dispositivos móveis:
- **768px**: Tablets
- **480px**: Smartphones

## Acessibilidade

- Contraste adequado entre texto e fundo
- Estados de foco visíveis
- Transições suaves para melhor UX
- Suporte a leitores de tela

## Compatibilidade

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Suporte a CSS Custom Properties
- Fallbacks para navegadores mais antigos 