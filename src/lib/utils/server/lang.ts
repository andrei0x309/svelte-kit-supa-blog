import { config } from '#/lib/config/index.ts';

export const getLangFromPath = (path: string): string => {
  const { supportedLanguages, preferredLanguage } = config;
  let lang = path.split('/')[0];
  if (supportedLanguages.includes(lang)) {
    return preferredLanguage.replace('en', 'en-US');
  }
  return preferredLanguage.replace('en', 'en-US');
};

export const isSupportedLang = (lang: string): boolean => {
  const { supportedLanguages } = config;
  return supportedLanguages.includes(lang);
};
