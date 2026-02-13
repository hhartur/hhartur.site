# 🌍 Guia Completo de Internacionalização (i18n)

## Visão Geral

O portfolio usa **next-intl**, a biblioteca mais recomendada para internacionalização no Next.js 15 com App Router. O sistema oferece:

- ✅ Detecção automática de idioma baseada no navegador
- ✅ URLs localizadas (`/pt-br` e `/en`)
- ✅ Troca de idioma sem reload
- ✅ TypeScript com autocompleção de traduções
- ✅ Server e Client Components suportados

## Como Funciona

### 1. Estrutura de Rotas

```
app/
└── [locale]/              # Segmento dinâmico de locale
    ├── layout.tsx         # Layout raiz com NextIntlClientProvider
    ├── page.tsx           # Página inicial
    └── contact/
        └── page.tsx       # Página de contato
```

### 2. Middleware de Detecção

O arquivo `middleware.ts` intercepta todas as requisições:

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);
```

**O que ele faz:**
1. Detecta o idioma preferido do navegador via header `Accept-Language`
2. Se o usuário acessa `/`, redireciona para `/pt-br` ou `/en` automaticamente
3. Mantém o locale nas navegações subsequentes

### 3. Configuração de Routing

Arquivo: `i18n/routing.ts`

```typescript
export const routing = defineRouting({
  locales: ['en', 'pt-br'],      // Idiomas suportados
  defaultLocale: 'pt-br',        // Idioma padrão
  localePrefix: 'always'         // Sempre mostrar prefixo na URL
});
```

### 4. Arquivos de Tradução

Estrutura JSON simples em `messages/`:

```json
// messages/pt-br.json
{
  "Header": {
    "home": "Início",
    "contact": "Contato"
  },
  "Hero": {
    "title": "Desenvolvedor Full Stack"
  }
}

// messages/en.json
{
  "Header": {
    "home": "Home",
    "contact": "Contact"
  },
  "Hero": {
    "title": "Full Stack Developer"
  }
}
```

### 5. Usando Traduções nos Componentes

#### Server Components

```tsx
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('Hero');
  
  return <h1>{t('title')}</h1>;
}
```

#### Client Components

Mesma API! Use `"use client"` e `useTranslations`:

```tsx
"use client";

import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('Header');
  
  return <nav>{t('home')}</nav>;
}
```

### 6. Links Internacionalizados

Use o componente `Link` da configuração de routing:

```tsx
import { Link } from '@/i18n/routing';

// Mantém o locale automaticamente
<Link href="/contact">Contact</Link>

// Se estiver em /pt-br, vai para /pt-br/contact
// Se estiver em /en, vai para /en/contact
```

### 7. Navegação Programática

```tsx
import { useRouter } from '@/i18n/routing';

export function MyComponent() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/contact'); // Mantém locale automaticamente
  };
}
```

## Componente Language Switcher

O seletor de idioma usa um dropdown elegante:

```tsx
// components/language-switcher.tsx
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();          // Locale atual
  const router = useRouter();
  const pathname = usePathname();       // Path sem locale
  
  const changeLanguage = (newLocale: string) => {
    // Navega para mesma página em outro idioma
    router.replace(pathname, { locale: newLocale });
  };
}
```

## Detecção Automática de Idioma

### Como funciona:

1. **Primeira visita ao site** (`/`):
   - Middleware lê header `Accept-Language` do navegador
   - Se `pt-BR`, redireciona para `/pt-br`
   - Se `en`, redireciona para `/en`
   - Caso contrário, usa `defaultLocale` (pt-br)

2. **Navegação direta** (`/en/contact`):
   - Middleware valida que `en` é um locale suportado
   - Carrega traduções de `messages/en.json`
   - Renderiza página em inglês

3. **Troca manual de idioma**:
   - Usuário clica no LanguageSwitcher
   - Router navega para mesma rota com novo locale
   - Sem reload, transição instantânea

## Adicionando Novos Idiomas

### Passo 1: Configurar locale

```typescript
// i18n/routing.ts
export const routing = defineRouting({
  locales: ['en', 'pt-br', 'es'], // ✅ Adicionar 'es'
  defaultLocale: 'pt-br',
  localePrefix: 'always'
});
```

### Passo 2: Criar arquivo de tradução

```json
// messages/es.json
{
  "Header": {
    "home": "Inicio",
    "about": "Acerca de",
    "contact": "Contacto"
  }
}
```

### Passo 3: Atualizar middleware

```typescript
// middleware.ts
export const config = {
  matcher: ['/', '/(pt-br|en|es)/:path*'] // ✅ Adicionar 'es'
};
```

### Passo 4: Adicionar ao switcher

```tsx
// components/language-switcher.tsx
const languages = [
  { code: "pt-br", name: "Português (BR)", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" }, // ✅ Novo
];
```

## Boas Práticas

### 1. Organização de Traduções

Agrupe por contexto/componente:

```json
{
  "Header": { ... },
  "Footer": { ... },
  "Hero": { ... },
  "Contact": { ... }
}
```

### 2. Chaves Descritivas

❌ Ruim:
```json
{
  "title1": "Hello",
  "btn": "Click"
}
```

✅ Bom:
```json
{
  "Hero": {
    "greeting": "Hello",
    "contactButton": "Get in Touch"
  }
}
```

### 3. Namespaces

Use namespaces para evitar conflitos:

```tsx
const t = useTranslations('Hero');
t('title'); // Busca em Hero.title

const tHeader = useTranslations('Header');
tHeader('title'); // Busca em Header.title
```

### 4. Valores Dinâmicos

```json
{
  "welcome": "Welcome, {name}!"
}
```

```tsx
t('welcome', { name: 'Arthur' }); // "Welcome, Arthur!"
```

### 5. Pluralização

```json
{
  "items": "{count, plural, =0 {No items} =1 {One item} other {# items}}"
}
```

```tsx
t('items', { count: 0 }); // "No items"
t('items', { count: 1 }); // "One item"
t('items', { count: 5 }); // "5 items"
```

## Troubleshooting

### Problema: Tradução não aparece

**Solução:**
1. Verifique se a chave existe no JSON
2. Confirme que o namespace está correto
3. Reinicie o servidor de desenvolvimento

### Problema: Redirecionamento infinito

**Solução:**
1. Verifique o `matcher` no middleware
2. Certifique-se de que `/` não está em `[locale]`
3. Limpe cache do navegador

### Problema: TypeScript não autocompleta

**Solução:**
1. Reinicie o TypeScript server (VS Code: Cmd+Shift+P → Restart TS Server)
2. Verifique se os tipos estão sendo gerados corretamente

## Performance

### Server-Side Rendering

- Traduções são carregadas no servidor
- Primeira renderização já vem traduzida
- Sem flash de conteúdo não traduzido

### Code Splitting

- Cada locale tem seu próprio bundle de traduções
- Apenas o idioma ativo é baixado
- Troca de idioma carrega novo bundle sob demanda

### Caching

- Next.js cacheia traduções automaticamente
- Mudanças em JSON requerem rebuild em produção
- Em dev, hot reload funciona normalmente

## SEO

### Metadata Localizada

```tsx
// app/[locale]/layout.tsx
export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  return {
    title: locale === 'en' 
      ? 'hhartur - Full Stack Developer'
      : 'hhartur - Desenvolvedor Full Stack',
  };
}
```

### Hreflang Tags

Para múltiplos idiomas, adicione:

```tsx
<link rel="alternate" hreflang="en" href="https://site.com/en" />
<link rel="alternate" hreflang="pt-BR" href="https://site.com/pt-br" />
<link rel="alternate" hreflang="x-default" href="https://site.com/pt-br" />
```

## Recursos

- [next-intl Docs](https://next-intl.dev/)
- [Next.js i18n Guide](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [ICU Message Format](https://formatjs.io/docs/core-concepts/icu-syntax/)

## Resumo

✅ **O que está configurado:**
- Detecção automática de idioma
- PT-BR e EN completos
- Seletor de idioma no header
- Todas as páginas traduzidas
- URLs localizadas
- Links e navegação automáticos

✅ **Pronto para:**
- Adicionar novos idiomas
- Escalar traduções
- Deploy em produção
- SEO multilíngue
