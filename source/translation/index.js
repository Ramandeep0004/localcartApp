import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import hi from './hi.json';
import bn from './bn.json';
import te from './te.json';

export const changeLanguages = lang => {
  if (lang) {
    i18n.changeLanguage(lang);
  } else {
    i18n.changeLanguage('en');
  }
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    hi: {
      translation: hi,
    },
    bn: {
      translation: bn,
    },
    te: {
      translation: te,
    },
  },
  lng: i18n.language,
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  react: {
    bindI18n: 'languageChanged', // i am changing this as I dont wanna any flickering on language change
  },
  // interpolation: {
  //   escapeValue: false, // react already safes from xss
  // },
});

export default i18n;
