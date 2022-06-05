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
          name="description"
          content="FORTCAKE is a community driven crypto gaming platform built on the Binance Smart Chain. The goal is simple; introduce the world to PLAY-TO-EARN."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#f18d9e" />
        <meta
          name="twitter:image"
          content="https://uploads-ssl.webflow.com/61c92e9a7277eb346ebc5846/61c92e9a7277ebe1d2bc58e4_6152a6202777e51341d66152%3A6173959e4184c1858af43bcf_fortcake-neonglow-v1.png"
        />
        <meta
          name="twitter:description"
          content="Find PLAY-TO-EARN games, Swap tokens, Earn rewards, Trade NFT's and Join our community! Featuring our most upvoted crypto games all in one place."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="🎂 FortCake - Find PLAY-TO-EARN games, Swap tokens, Earn rewards, Trade NFT's and Join our community! Featuring our most upvoted crypto games all in one place."
        />
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
