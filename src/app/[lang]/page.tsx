import Header from '@/components/header'
import { getDictionary } from '@/lib/i18n'
import { Locale } from '../../../i18n.config'
import StoreProvider from '@/components/store-provider'
import { useGlobalStore } from '@/lib/stores/store'

export type LocaleType = Awaited<ReturnType<typeof getDictionary>>

export default async function Home({ params }: { params: { lang: Locale } }) {
  const { header }: LocaleType = await getDictionary(params.lang)

  return (
    <>
      {useGlobalStore.getState().lang ? <></> :
        <StoreProvider store={{ lang: params.lang }} store_type='global' />}
      <Header header={header} />
      <main className="w-full h-full bg-background">
      </main>
    </>

  )
}
