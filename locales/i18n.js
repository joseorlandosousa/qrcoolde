import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import ptBR from './pt-BR'
import en from './en'

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: en,
  'pt-BR': ptBR
};

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

/**
 * Default t() function with configs
 * @param {String} key
 */
export default function t(key){
    return i18n.t(key)
}