# Portfolio hhartur

Portfolio pessoal minimalista construído com Next.js 15, React 19, TypeScript, Tailwind CSS e Framer Motion com suporte completo a internacionalização (i18n).

## ✨ Características

- 🎨 Design minimalista em preto e branco com detalhes em azul
- 🌓 Tema claro/escuro com transições suaves
- 🌍 **i18n com detecção automática de idioma (Português BR e Inglês)**
- ⚡ Next.js 15 com App Router e Turbopack
- 🎭 Animações fluidas com Framer Motion
- 🎯 Componentes UI com Radix UI
- 📱 100% Responsivo
- 🔍 SEO otimizado
- ♿ Acessível (WCAG)

## 🌍 Internacionalização (i18n)

O portfolio suporta **português brasileiro** e **inglês** com:

- ✅ Detecção automática do idioma do navegador
- ✅ URLs localizadas (`/pt-br` e `/en`)
- ✅ Troca de idioma sem reload da página
- ✅ Todas as interfaces traduzidas

### Acessar em diferentes idiomas:

```
Português: http://localhost:3000/pt-br
Inglês: http://localhost:3000/en
```

O sistema detecta automaticamente o idioma preferido do navegador e redireciona para a versão apropriada.

## 🚀 Tecnologias

### Frontend
- **Next.js 15** - Framework React
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **next-themes** - Gerenciamento de tema
- **next-intl** - Internacionalização

### Ferramentas que utilizo
- Next.js, Nuxt.js, React, Angular, Vue
- Vite, NestJS, Fastify, Express

### Atualmente aprendendo
- Java, C++, C#

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## 🏗️ Estrutura do Projeto

```
portfolio/
├── app/                    # App Router do Next.js
│   └── [locale]/          # Rotas internacionalizadas
│       ├── contact/       # Página de contato
│       ├── layout.tsx     # Layout com i18n
│       ├── page.tsx       # Página inicial
│       └── globals.css    # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes UI base
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── tabs.tsx
│   ├── animated-background.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── hero-section.tsx
│   ├── language-switcher.tsx  # Seletor de idioma
│   ├── skills-section.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── i18n/                  # Configuração de i18n
│   ├── routing.ts         # Rotas e locales
│   └── request.ts         # Server-side config
├── messages/              # Traduções
│   ├── pt-br.json        # Português brasileiro
│   └── en.json           # Inglês
├── lib/                   # Utilitários
│   └── utils.ts
├── middleware.ts          # Middleware de i18n
├── public/               # Arquivos estáticos
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## 🎨 Paleta de Cores

### Tema Claro
- Background: `#FFFFFF` (branco quase puro)
- Foreground: `#0D0D0D` (preto quase puro)
- Primary: `#3B82F6` (azul)

### Tema Escuro
- Background: `#080808` (preto quase puro)
- Foreground: `#FAFAFA` (branco quase puro)
- Primary: `#3B82F6` (azul)

## 🎯 Funcionalidades

- ✅ Header fixo com navegação e dropdowns
- ✅ Toggle de tema animado
- ✅ **Seletor de idioma (PT-BR/EN) com detecção automática**
- ✅ Hero section com animações
- ✅ Seção de skills com tabs
- ✅ Página de contato dedicada
- ✅ Footer com links e redes sociais
- ✅ Background animado com orbs flutuantes
- ✅ Transições suaves entre páginas
- ✅ **Rotas localizadas (/pt-br e /en)**

## 🌐 Como Adicionar Novas Traduções

1. **Adicionar novo locale** em `i18n/routing.ts`:
```typescript
export const routing = defineRouting({
  locales: ['en', 'pt-br', 'es'], // Adicione 'es' para espanhol
  defaultLocale: 'pt-br',
  localePrefix: 'always'
});
```

2. **Criar arquivo de tradução** em `messages/es.json`:
```json
{
  "Header": {
    "home": "Inicio",
    "about": "Acerca de",
    ...
  }
}
```

3. **Atualizar middleware** em `middleware.ts`:
```typescript
export const config = {
  matcher: ['/', '/(pt-br|en|es)/:path*']
};
```

4. **Adicionar bandeira** em `components/language-switcher.tsx`:
```typescript
const languages = [
  { code: "pt-br", name: "Português (BR)", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];
```

## 📝 Personalização

### Alterar cores
Edite o arquivo `tailwind.config.ts` e `app/globals.css`

### Adicionar novas páginas
Crie arquivos em `app/` seguindo a estrutura do App Router

### Modificar componentes
Todos os componentes estão em `components/` e são totalmente customizáveis

## 📄 Licença

© 2026 hhartur. Todos os direitos reservados.

## 📧 Contato

- Email: artur.carmello0@gmail.com
- Discord: dsc.gg/hhartur
