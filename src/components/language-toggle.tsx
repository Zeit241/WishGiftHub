"use client"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { redirect, usePathname, useRouter } from "next/navigation"
import { i18n } from "@/../i18n.config"
import { Locale } from "@/../i18n.config"
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useGlobalStore } from "@/lib/stores/store"

export default function LanguageToggle({ }) {
    const pathname = usePathname()
    const router = useRouter()
    const { lang, change_lang } = useGlobalStore()
    const changeLocale = (locale: Locale) => {
        change_lang!(locale)
        const segments = pathname.split('/')
        segments[1] = locale
        router.replace(segments.join('/'))
    }
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="flex flex-row gap-3">
                <span className={`fi fi-${lang === "en" ? "us" : lang}`} />
                <span>{lang.toUpperCase()}</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            {
                i18n.locales.map(lang =>
                    <DropdownMenuItem className="flex flex-row gap-3 p-2" onClick={() => changeLocale(lang)} key={lang}>
                        <span className={`fi fi-${lang === "en" ? "us" : lang}`} />
                        <span>{lang.toUpperCase()}</span>
                    </DropdownMenuItem>)
            }
        </DropdownMenuContent>
    </DropdownMenu>
}