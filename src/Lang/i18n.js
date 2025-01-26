import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Подключение переводов
import translationEN from './en/translation.json';
import translationRU from './ru/translation.json';
import translationUZ from './uz/translation.json'

i18n
    .use(initReactI18next) // передаем i18next в React
    .init({
        resources: {
            en: {
                translation: translationEN
            },
            ru: {
                translation: translationRU
            },
            uz: {
                translation: translationUZ
            },

        },
        lng: "ru", // язык по умолчанию
        fallbackLng: "en", // язык по умолчанию, если перевод не найден
        interpolation: {
            escapeValue: false // для React не нужно экранировать
        }
    });

export { i18n };
