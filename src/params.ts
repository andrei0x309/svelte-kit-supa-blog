import { defineParams } from '@sveltejs/kit/params';

const matchDotwn = (param: string) => {
  return /^(\.well-known)$/.test(param);
};

const matchLang = (param: string) => {
  return /^(ro)$/.test(param);
};

const matchNum = (param: string) => {
  return /^\d+$/.test(param);
};

const matchPage = (param: string) => {
  return /^page$/.test(param);
};

export const params = defineParams({
  dotwn: (param) => (matchDotwn(param) ? param : undefined),
  lang: (param) => (matchLang(param) ? param : undefined),
  num: (param) => (matchNum(param) ? param : undefined),
  page: (param) => (matchPage(param) ? param : undefined)
});
