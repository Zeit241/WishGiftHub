import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Locale } from '../../../i18n.config'
import { i18n } from "@/../i18n.config"

export interface GlobalStoreType {
    lang: Locale,
    change_lang?: (new_lang: Locale) => void
}

export const useGlobalStore = create<GlobalStoreType>()(
    devtools(
        persist(
            (set) => ({
                lang: i18n.defaultLocale,
                change_lang: (new_lang) => set(() => ({ lang: new_lang })),
            }),
            { name: 'globalStore' }
        )
    )
)