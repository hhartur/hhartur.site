# Instruções de Instalação e Execução

## Pré-requisitos
- Node.js 18.17 ou superior
- npm, yarn ou pnpm

## Instalação

1. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

## Executar em Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

O projeto estará disponível em `http://localhost:3000`

## Build para Produção

```bash
npm run build
npm start
# ou
yarn build
yarn start
# ou
pnpm build
pnpm start
```

## Estrutura de Pastas

```
portfolio/
├── app/                    # Rotas e páginas (App Router)
│   ├── contact/           # Página de contato
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Button, Tabs, etc)
│   ├── animated-background.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── hero-section.tsx
│   ├── skills-section.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/                   # Funções utilitárias
│   └── utils.ts
└── public/               # Arquivos estáticos
```

## Personalização

### Cores
Edite as variáveis CSS em `app/globals.css` para alterar o tema de cores:
- `--primary`: Cor principal (azul)
- `--background`: Cor de fundo
- `--foreground`: Cor do texto

### Conteúdo
- Informações pessoais: Edite `components/hero-section.tsx`
- Habilidades: Edite `components/skills-section.tsx`
- Contato: Edite `app/contact/page.tsx`

## Funcionalidades

- ✅ Tema claro/escuro com animação suave
- ✅ Background animado com orbs flutuantes
- ✅ Navegação com dropdowns
- ✅ Seções animadas com scroll
- ✅ Tabs para organizar habilidades
- ✅ Página de contato dedicada
- ✅ Footer com links sociais
- ✅ 100% responsivo
- ✅ SEO otimizado

## Tecnologias Principais

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI
- Lucide Icons
- next-themes

## Dicas

1. **Performance**: O projeto usa Turbopack para builds mais rápidos
2. **Animações**: Customize em cada componente via Framer Motion
3. **Componentes**: Todos os componentes UI estão em `components/ui/`
4. **Tema**: O sistema de temas usa next-themes com suporte a sistema

## Deploy

O projeto está pronto para deploy em:
- Vercel (recomendado)
- Netlify
- Cloudflare Pages
- Qualquer plataforma que suporte Next.js

Para deploy na Vercel:
```bash
vercel
```

## Suporte

Para dúvidas ou problemas, entre em contato:
- Email: artur.carmello0@gmail.com
- Discord: dsc.gg/hhartur
