import 'server-only'
import type { Locale } from "@/../i18n.config"

const dictionaries = {
    en: () => import('@/lib/dictionaries/en-US.json').then(module => module.default),
    ru: () => import('@/lib/dictionaries/ru-RU.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()