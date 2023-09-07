"use client"

import { useRef } from "react"
import { useGlobalStore } from "@/lib/stores/store"
import type { GlobalStoreType } from "@/lib/stores/store"

type StoreType = {
    store: GlobalStoreType
    store_type: "global"
}

export default function StoreProvider({ store, store_type }: StoreType) {
    const initialized = useRef(false)
    if (!initialized.current) {

        if (store_type === "global") {
            useGlobalStore.setState(store)
        }

        initialized.current = true
    }
    return null
}
