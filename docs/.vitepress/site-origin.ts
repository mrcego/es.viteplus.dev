export function resolveDocsSiteOrigin(env: NodeJS.ProcessEnv = process.env): string | undefined {
  if (env.DOCS_SITE_ORIGIN) {
    return env.DOCS_SITE_ORIGIN.replace(/\/+$/, '');
  }
  return undefined;
}
