import {
  createContext,
  useState,
  ReactNode,
  useEffect
} from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
// import 'dayjs/locale/ru';
import i18n from './i18n';

export interface LanguageContextProps {
  locale: string;
  changeLanguage: (newLocale: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [locale, setLocale] = useState<string>(localStorage.getItem('locale') || 'en');
  // const { i18n } = useTranslation();
  // i18n



  useEffect(() => {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale) {
      i18n.changeLanguage(storedLocale);
      dayjs.locale(storedLocale);
    } else {
      i18n.changeLanguage('en');
      dayjs.locale('en');
    }
  }, []);

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale) {
      i18n.changeLanguage(storedLocale);
      dayjs.locale(storedLocale);
    } else {
      i18n.changeLanguage('uk');
      dayjs.locale('uk');
    }
  }, [i18n]);

  const changeLanguage = async (newLocale: string) => {
    await i18n.changeLanguage(newLocale);
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    dayjs.locale(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext };
