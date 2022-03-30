import React from 'react'
import { Text, Button, Flex, dark, useMatchBreakpoints } from 'fortcake-uikit-v2'
import { Socials } from '../../components/Menu/config/config'
import useTheme from '../../hooks/useTheme'
import { PageMeta } from '../../components/Layout/Page'

// Images

import CakeImage from '../../assets/images/logo/logo_cake1.png'
import {
  Swap,
  Dao,
  Earn,
  Play,
  SocialIg,
  SocialMedium,
  SocialTwitter,
  SocialDiscord,
  BscScan,
  CoinGecko,
  PancakeSwap,
} from '../../assets/images/home/svg'
import Token from '../../assets/images/home/token.png'
import Tokenomics from '../../assets/images/home/tokenomics.png'
import GamePreview from '../../assets/images/home/gamepreview-noshadow.png'
import SwapPreview from '../../assets/images/home/gamepreviewhq.png'
import {
  Heading,
  Section,
  SectionFlex,
  Features,
  LazyImage,
  SocialLink,
  ListItems,
  ListWrapper,
  PageHeader,
} from './styles'

const [Twitter, Discord, Instagram, Medium, BscScanHref, PancakeSwapHref, CoinGeckoHref] = Socials

const Home: React.FC = () => {
  const { isDark } = useTheme()
  const { isMobile } = useMatchBreakpoints()
  const ParticipateSection = React.useRef<HTMLDivElement>(null)
  const scrollToParticipate = (): void => {
    ParticipateSection.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  const mobileHeaderStyle = isMobile
    ? {
        fontSize: '38px',
        marginRight: '10px',
      }
    : {}

  return (
    <>
      <PageMeta />
      <Section className="landingSection">
        <SectionFlex className="grid">
          <PageHeader>
            <Flex alignItems="center" mb={isMobile ? '40px' : '20px'} justifyContent="space-between">
              <Heading
                as="h1"
                scale="xxl"
                style={{
                  ...mobileHeaderStyle,
                  textShadow: isDark
                    ? '3px -2px 1px rgb(25 159 125), -3px 3px 1px rgb(33 229 180)'
                    : '#f1afc2 3px -2px 1px, #bb5768 -3px 3px 1px',
                }}
              >
                THE FUTURE {isMobile && <br />} IS HERE
              </Heading>
              <LazyImage src={CakeImage} width={100} height={78} className="imgShowOnMobile" />
            </Flex>
            <Heading as="h4" scale="md" override>
              FORTCAKE is a community driven crypto gaming platform built on the Binance Smart Chain. The goal is
              simple; introduce the world to PLAY-TO-EARN.
            </Heading>
            <Flex className="socialLinks">
              <SocialLink href={Discord.href}>
                <SocialDiscord width={56} height={56} fill={isDark ? dark.colors.secondary : dark.colors.primary} />
              </SocialLink>
              <SocialLink href={Twitter.href}>
                <SocialTwitter width={56} height={56} fill={isDark ? dark.colors.secondary : dark.colors.primary} />
              </SocialLink>
              <SocialLink href={Instagram.href}>
                <SocialIg width={56} height={56} fill={isDark ? dark.colors.secondary : dark.colors.primary} />
              </SocialLink>
              <SocialLink href={Medium.href}>
                <SocialMedium width={56} height={56} fill={isDark ? dark.colors.secondary : dark.colors.primary} />
              </SocialLink>
            </Flex>
            <Flex className="cta">
              <Button variant="primary" as="a" mr="40px" href="https://fortcake.gitbook.io/fortcake/">
                White Paper
              </Button>
              <Button variant="secondary" as="button" onClick={scrollToParticipate}>
                Learn More
              </Button>
            </Flex>
          </PageHeader>
          <LazyImage src={CakeImage} width={430} height={336} className="imgHideOnMobile" />
        </SectionFlex>
        <SectionFlex className="address">
          <SocialLink href={BscScanHref.href}>
            <BscScan lightLogo={isDark} width={190} height={60} />
          </SocialLink>
          <SocialLink href={CoinGeckoHref.href}>
            <CoinGecko lightLogo={isDark} width={190} height={60} />
          </SocialLink>
          <SocialLink href={PancakeSwapHref.href}>
            <PancakeSwap lightLogo={isDark} width={190} height={60} />
          </SocialLink>
        </SectionFlex>
      </Section>

      <Section className="featuresSection">
        <SectionFlex justifyContent="space-between" alignItems="top" className="features">
          <Features>
            <Play width={90} height={90} fill={isDark ? dark.colors.secondary : dark.colors.primary} />
            <Heading as="h4">Play</Heading>
            <Text>Find PLAY-TO-EARN games, Featuring top crypto games all in one place...</Text>
          </Features>
          <Features>
            <Swap width={90} height={90} fill={isDark ? dark.colors.secondary : dark.colors.primary} />
            <Heading as="h4">Swap</Heading>
            <Text>FORTCAKE allows users to trade tokens without the need for centralized exchanges.</Text>
          </Features>
          <Features>
            <Earn width={90} height={90} fill={isDark ? dark.colors.secondary : dark.colors.primary} />
            <Heading as="h4">Earn</Heading>
            <Text>Earn tokens and rewards on FORTCAKE by joining & more.</Text>
          </Features>
          <Features>
            <Dao width={90} height={90} fill={isDark ? dark.colors.secondary : dark.colors.primary} />
            <Heading as="h4">DAO</Heading>
            <Text>More than a platform, FORTCAKE is a community DAO. (Decentralized autonomous organization)</Text>
          </Features>
        </SectionFlex>
        <SectionFlex className="participate" ref={ParticipateSection}>
          <Heading as="h2" scale="xl">
            How to Participate
          </Heading>
          <Heading as="h4" scale="lg" override>
            $FORTCAKE is coming soon to PancakeSwap, and will be found on launchpads as well as a future list of
            exchanges. $FORTCAKE is a cryptocurrency gaming token and, as such, we always encourage the use of
            decentralized exchanges.
          </Heading>
        </SectionFlex>
      </Section>

      <Section>
        <SectionFlex className="grid tokenomics small">
          <LazyImage src={Token} width={400} height={326} />
          <div>
            <Heading as="h2" scale="xl">
              Quick Start Guide
            </Heading>
            <ListWrapper>
              <ListItems>
                <Heading as="h4" scale="lg">
                  1. Create Trust wallet
                </Heading>
                <Text>
                  Create a Trust Wallet using an iOS/Android mobile device. This will allow you to buy, sell, send, and
                  receive cryptocurrency tokens.
                </Text>
              </ListItems>
              <ListItems>
                <Heading as="h4" scale="lg">
                  2. Send BNB to your wallet
                </Heading>
                <Text>
                  Create a Trust Wallet using an iOS/Android mobile device. This will allow you to buy, sell, send, and
                  receive cryptocurrency tokens.
                </Text>
              </ListItems>
              <ListItems>
                <Heading as="h4" scale="lg">
                  3. Connect wallet to PancakeSwap
                </Heading>
                <Text>
                  Create a Trust Wallet using an iOS/Android mobile device. This will allow you to buy, sell, send, and
                  receive cryptocurrency tokens.
                </Text>
              </ListItems>
              <ListItems>
                <Heading as="h4" scale="lg">
                  4. Swap BNB for FORTCAKE
                </Heading>
                <Text>
                  You can start swapping as soon as you have BNB available! Press ‘Select a token’ and enter the token
                  address `&quot;`0x2f477a472f4657f7917126a663b5affe94d5a2b6`&quot;` and search for
                  `&quot;`FORTCAKE`&quot;` on the tokens list.
                </Text>
              </ListItems>
            </ListWrapper>
          </div>
        </SectionFlex>
      </Section>
      <Section>
        <SectionFlex className="grid tokenomics">
          <div>
            <Heading as="h2" scale="xl">
              Tokenomics
            </Heading>
            <Text>
              <div>
                <p>
                  FORTCAKE is a BEP-20 cryptocurrency governance token that can be traded on the Binance Smart Chain
                  (BSC). FORTCAKE is both a platform and currency used as an independent store of value for gamers and
                  enthusiasts alike.{' '}
                </p>
              </div>
              <div style={{ marginTop: '40px' }}>
                <p>Total Supply: 203,009,146 FORTCAKE</p>
              </div>
            </Text>
          </div>
          <LazyImage src={Tokenomics} width={500} height={374} />
        </SectionFlex>
        <SectionFlex className="grid tokenomics reversed">
          <LazyImage src={GamePreview} width={480} height={359} />
          <div>
            <Heading as="h2" scale="xl">
              PLAY-TO-EARN
            </Heading>
            <Text>
              FORTCAKE is the future of play-to-earn blockchain based games. Our aim is high, more than a platform, more
              than a community, FORTCAKE is a movement, ten years from now, we will have just begun, blockchain games
              are here to stay.
            </Text>
          </div>
        </SectionFlex>
        <SectionFlex className="grid tokenomics">
          <div>
            <Heading as="h2" scale="xl">
              Swap
            </Heading>
            <Text>
              <div>
                <p>
                  FORTCAKE&apos;s built in Swap feature, Trade your favorite game tokens, No registration, no problem.
                  Connect your wallet, and exchange any token on the Binance, Ethereum or Polygon blockchain in seconds.
                </p>
              </div>
            </Text>
          </div>
          <LazyImage src={SwapPreview} width={500} height={374} />
        </SectionFlex>
      </Section>
    </>
  )
}

export default Home
