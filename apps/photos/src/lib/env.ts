import { cleanEnv, str, url } from 'envalid';

export const env = cleanEnv(process.env, {
  API_URL: url({ default: 'https://api.pexels.com/v1/search' }),
  API_KEY: str({ desc: 'Pexels API key' }),
  NEXTAUTH_SECRET: str({ desc: 'NextAuth secret for JWT encryption' }),
});
