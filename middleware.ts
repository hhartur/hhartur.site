import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // todas as rotas exceto API, arquivos internos e estáticos (ex.: /projects redireciona para /pt-br/projects)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
