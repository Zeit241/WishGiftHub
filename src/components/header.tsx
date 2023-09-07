"use client"

import LanguageToggle from "./language-toggle"
import ThemeToggle from "./theme-toggle"
import { Button } from "./ui/button"
import type { LocaleType } from "@/app/[lang]/page"


export default function Header({ header }: LocaleType): JSX.Element {
    const { navigation, buttons, theme } = header
    return <header className="w-full bg-background flex items-center justify-center">
        <nav className="flex flex-row gap-4 rounded-xl bg-[#242424]">
            <a href="#home">{navigation.home}</a>
            <a href="#about">{navigation.about}</a>
            <a href="#ideas">{navigation.ideas}</a>
            <a href="#popular">{navigation.popular}</a>
            <a href="#create">{navigation.create}</a>
            <a href="#reviews">{navigation.reviews}</a>
        </nav>
        <div className="flex flex-row gap-4">
            {/* <ThemeToggle theme={theme} />
            <LanguageToggle />
            <Button variant={"secondary"}>{buttons.singin}</Button>
            <Button >{buttons.singup}</Button> */}
        </div>
    </header>
}