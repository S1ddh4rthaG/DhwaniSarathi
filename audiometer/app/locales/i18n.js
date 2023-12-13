import i18n from 'i18next'; 
import {initReactI18next} from 'react-i18next'; 
import en from './en.json'; 
import hi from './hi.json'; 
import { useTranslation } from 'react-i18next';  
i18n.use(initReactI18next).init({ 
  lng: 'hi', 
  compatibilityJSON: 'v3',
  fallbackLng: 'hi', 
  resources: { 
    en: en, 
    hi: hi, 
  }, 
  interpolation: { 
    escapeValue: false // react already safes from xss 
  } 
}); 
  
export default i18n; 