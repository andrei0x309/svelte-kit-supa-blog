import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
  SECRET_AUTH_SESSION: { static: true },
  SECRET_CRON_PASS: { static: true },
  SECRET_SUPA_TOKEN: { static: true }
});
