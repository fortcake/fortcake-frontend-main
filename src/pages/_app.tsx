import React from 'react'

import { ResetCSS } from 'fortcake-uikit-v2'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { NextPage } from 'next'

import { useStore, persistor } from 'state'

import { PersistGate } from 'redux-persist/integration/react'

import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import useUserAgent from 'hooks/useUserAgent'
import useScrollOnRouteChange from 'hooks/useScrollOnRouteChange'
import useClickyAnalytics from 'hooks/useClickyAnalytics'
import { usePollBlockNumber } from 'state/block/hooks'
// import { usePollCoreFarmData } from "state/farms/hooks";
// import { useFetchProfile } from "state/profile/hooks";
import { useFetchGames } from 'state/games/hooks'
import { useShowCookiesNotice } from 'state/user/hooks'
import Menu from '../components/Menu'
import Providers from '../Providers'
import GlobalStyle from '../style/Global'

import { Updaters, Blocklist } from '../index'

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

function GlobalHooks() {
  usePollBlockNumber()
  useEagerConnect()
  useScrollOnRouteChange()
  useUserAgent()
  useFetchGames()
  useShowCookiesNotice()
  useClickyAnalytics()

  return null
}

function MyApp(props: AppProps) {
  const { pageProps } = props
  const store = useStore(pageProps.initialReduxState)

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Cheaper and faster than Uniswap? Discover PancakeSwap, the leading DEX on BNB Smart Chain (BSC) with the best farms in DeFi and a lottery for CAKE."
        />
        <meta name="theme-color" content="#1FC7D4" />
        <meta name="twitter:image" content="https://pancakeswap.finance/images/hero.png" />
        <meta
          name="twitter:description"
          content="The most popular AMM on BSC! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="🥞 PancakeSwap - A next evolution DeFi exchange on BNB Smart Chain (BSC)" />
        <title>Fortcake</title>
      </Head>
      <Providers store={store}>
        <Blocklist>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalHooks />
            <ResetCSS />
            <GlobalStyle />
            <Updaters />
            <App {...props} />
          </PersistGate>
        </Blocklist>
      </Providers>
    </>
  )
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available

  return (
    <Menu>
      <Component {...pageProps} />
    </Menu>
  )
}

export default MyApp
