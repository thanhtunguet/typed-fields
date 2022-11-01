import type { InitOptions, TFunction } from 'i18next';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

export class Localization {
  public readonly useTranslation = useTranslation;

  private translateFunction?: TFunction;

  public async initialize(
    options: InitOptions & { languages?: Record<string, any> } = {},
  ): Promise<void> {
    const { languages, ...initOptions } = options;

    this.translateFunction = await i18next
      //
      .use(initReactI18next)
      .init({
        ns: '',
        defaultNS: '',
        interpolation: {
          prefix: '{{',
          suffix: '}}',
        },
        keySeparator: '.',
        nsSeparator: ':',
        resources: {},
        ...initOptions,
      });
    if (languages) {
      Object.entries(languages).forEach(([language, resource]) => {
        this.addLanguage(language, resource);
      });
    }
  }

  /**
   * Translate function outside the component
   *
   * @param key
   * @param params
   */
  public translate(
    key: string,
    params: Record<string, string | number>,
  ): string {
    if (typeof this.translateFunction === 'function') {
      return this.translateFunction(key, params);
    }
    return i18next.t(key, params);
  }

  public readonly changeLanguage = async (lang: string): Promise<TFunction> => {
    return i18next.changeLanguage(lang);
  };

  public addLanguage(lang: string, resources: any): Localization {
    i18next.addResources(lang, '', resources);
    return this;
  }
}

export const localization: Localization = new Localization();
