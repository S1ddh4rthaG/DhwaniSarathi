import i18 from 'i18next'; 
import {initReactI18next} from 'react-i18next'; 
import en from './en.json'; 
import hi from './hi.json'; 
import {i18nBackend} from 'i18next-http-backend' ; 
i18. use(initReactI18next).init({ 
  lng: 'hi', 
  compatibilityJSON: 'v3',
  fallbackLng: 'hi', 
  resources: { 
    en: en, 
    hi: hi, 
  }, 
  react:{
    useSuspense: false, 
  }, 
  interpolation: {  
    escapeValue: false // react already safes from xss 
  }  
}); 
  
export default i18; 