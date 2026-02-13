import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Lista de locales suportados
  locales: ['en', 'pt-br'],

  // Locale padrão
  defaultLocale: 'pt-br',

  // Prefixo de locale
  localePrefix: 'always'
});

// Navegação tipada
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
