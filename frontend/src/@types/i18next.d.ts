import en from "./locales/en.json";

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
        en: typeof en;
    }
  }
}
