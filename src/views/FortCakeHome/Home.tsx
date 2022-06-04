import React from "react";
import {
  Box,
  Button,
  Flex,
  dark,
  useMatchBreakpoints,
} from "fortcake-uikit-v2";
import { NextLinkFromReactRouter } from "components/NextLink";
import AddressComponent from "./components/CopyAddress";
import { Socials } from "../../components/Menu/config";
import useTheme from "../../hooks/useTheme";
import { PageMeta } from "../../components/Layout/Page";

// Images

import {
  Swap,
  Dao,
  Earn,
  Staking,
  Play,
  SocialIg,
  SocialMedium,
  SocialTwitter,
  SocialDiscord,
  BscScan,
  CoinGecko,
  PancakeSwap,
  Token,
  Tokenomics,
  GamePreview,
  SwapPreview,
  CakeImage,
} from "./assets";
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
  ExternalLink,
  StyledText as Text,
} from "./styles";
import RoadMap from "./components/roadMap";

const [
  Twitter,
  Discord,
  Instagram,
  Medium,
  BscScanHref,
  PancakeSwapHref,
  CoinGeckoHref,
] = Socials;
const FORTCAKE_ADDRESS = "0x2f477a472f4657f7917126a663b5affe94d5a2b6";

const Home: React.FC = () => {
  const { isDark } = useTheme();
  const { isMobile } = useMatchBreakpoints();
  const ParticipateSection = React.useRef<HTMLDivElement>(null);
  const scrollToParticipate = (): void => {
    ParticipateSection.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const mobileHeaderStyle = isMobile
    ? {
        fontSize: "38px",
        marginRight: "10px",
      }
    : {};

  return (
    <Box overflowX="hidden" position="relative">
      <PageMeta />
      <Section className="landingSection">
        <SectionFlex className="grid">
          <PageHeader>
            <Flex
              alignItems="center"
              mb={isMobile ? "40px" : "20px"}
              justifyContent="space-between"
            >
              <Heading
                as="h1"
                scale="xxl"
                style={{
                  ...mobileHeaderStyle,
                  textShadow: isDark
                    ? "3px -2px 1px rgb(25 159 125), -3px 3px 1px rgb(33 229 180)"
                    : "#f1afc2 3px -2px 1px, #bb5768 -3px 3px 1px",
                }}
              >
                THE FUTURE {isMobile && <br />} IS HERE
              </Heading>
              <div className="imgShowOnMobile">
                <LazyImage src={CakeImage} width={100} height={78} />
              </div>
            </Flex>
            <Heading as="h4" scale="md" override>
              FORTCAKE is a community driven crypto gaming platform built on the
              Binance Smart Chain. The goal is simple; introduce the world to
              PLAY-TO-EARN.
            </Heading>
            <Box width="100%" mt={20}>
              <Text mb={2} fontSize="14px" ml="4px">
                FORTCAKE Contract Address:
              </Text>
              <AddressComponent address={FORTCAKE_ADDRESS} />
            </Box>
            <Flex className="socialLinks">
              <SocialLink href={Discord.href}>
                <SocialDiscord
                  width={56}
                  height={56}
                  fill={isDark ? dark.colors.secondary : dark.colors.primary}
                />
              </SocialLink>
              <SocialLink href={Twitter.href}>
                <SocialTwitter
                  width={56}
                  height={56}
                  fill={isDark ? dark.colors.secondary : dark.colors.primary}
                />
              </SocialLink>
              <SocialLink href={Instagram.href}>
                <SocialIg
                  width={56}
                  height={56}
                  fill={isDark ? dark.colors.secondary : dark.colors.primary}
                />
              </SocialLink>
              <SocialLink href={Medium.href}>
                <SocialMedium
                  width={56}
                  height={56}
                  fill={isDark ? dark.colors.secondary : dark.colors.primary}
                />
              </SocialLink>
            </Flex>
            <Flex className="cta">
              <Button
                variant="primary"
                as="a"
                mr="40px"
                href="https://fortcake.gitbook.io/fortcake/"
              >
                White Paper
              </Button>
              <Button
                variant="secondary"
                as="button"
                onClick={scrollToParticipate}
              >
                Learn More
              </Button>
            </Flex>
          </PageHeader>
          <div className="imgHideOnMobile">
            <LazyImage src={CakeImage} width={460} height={360} />
          </div>
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
        <SectionFlex
          justifyContent="space-between"
          alignItems="top"
          className="features"
        >
          <Features>
            <NextLinkFromReactRouter to="/play">
              <Play
                width={90}
                height={90}
                fill={isDark ? dark.colors.secondary : dark.colors.primary}
              />
              <Heading as="h4">Play</Heading>
            </NextLinkFromReactRouter>
            <Text>
              Find PLAY-TO-EARN games, Featuring top crypto games all in one
              place.
            </Text>
          </Features>
          <Features>
            <NextLinkFromReactRouter to="/swap">
              <Swap
                width={90}
                height={90}
                fill={isDark ? dark.colors.secondary : dark.colors.primary}
              />
              <Heading as="h4">Swap</Heading>
            </NextLinkFromReactRouter>
            <Text>
              FORTCAKE allows users to trade tokens without the need for
              centralized exchanges.
            </Text>
          </Features>
          <Features>
            <a
              href="https://fortcake.gitbook.io/fortcake/3.-core-features"
              target="_blank"
              rel="noreferrer"
            >
              <Earn
                width={90}
                height={90}
                fill={isDark ? dark.colors.secondary : dark.colors.primary}
              />
              <Heading as="h4">Earn</Heading>
            </a>
            <Text>Earn $FORTCAKE by staking.</Text>
          </Features>
          <Features>
            <a
              href="https://fortcake.gitbook.io/fortcake/3.-core-features"
              target="_blank"
              rel="noreferrer"
            >
              <Dao
                width={90}
                height={90}
                fill={isDark ? dark.colors.secondary : dark.colors.primary}
              />
              <Heading as="h4">DAO</Heading>
            </a>
            <Text>
              More than a platform, FORTCAKE is a community DAO. (Decentralized
              autonomous organization)
            </Text>
          </Features>
        </SectionFlex>
      </Section>

      <Section>
        <Box width="100%">
          <Heading as="h2" scale="xl" mb={[0, 0, 0, 60]} textAlign="center">
            Roadmap
          </Heading>
        </Box>
        <RoadMap />
      </Section>

      <Section>
        <SectionFlex className="participate" ref={ParticipateSection}>
          <Heading as="h2" scale="xl">
            How to Participate
          </Heading>
          <Heading as="h4" scale="lg" override>
            $FORTCAKE is coming soon to PancakeSwap, and will be found on
            launchpads as well as a future list of exchanges.
          </Heading>
        </SectionFlex>
      </Section>

      <Section>
        <SectionFlex className="grid tokenomics small">
          <LazyImage src={Token} width={460} height={460} />
          <Box>
            <Heading as="h2" scale="xl">
              Quick Start Guide
            </Heading>
            <Heading
              as="h4"
              scale="lg"
              override
              style={{ fontWeight: "normal" }}
              mb={30}
              width="100%"
            >
              Follow these guides to get started using FORTCAKE
            </Heading>
            <ListWrapper>
              <ListItems>
                <Heading as="h4" scale="lg">
                  1. Create your wallet
                </Heading>
                <Text>
                  To get started on FORTCAKE, the first thing you&#39;ll need is
                  to set up a wallet that supports BNB Smart Chain (BSC).
                  Wallets are available both on desktop computers and on
                  smartphone devices. You&#39;ll need to choose the wallet that
                  fits your needs best. Follow &nbsp;
                  <ExternalLink href="https://fortcake.gitbook.io/fortcake/get-started/create-a-wallet">
                    this guide
                  </ExternalLink>
                  &nbsp; to create a new wallet.
                </Text>
              </ListItems>
              <ListItems>
                <Heading as="h4" scale="lg">
                  2. Get BEP-20 tokens
                </Heading>
                <Text>
                  The native tokens of BNB Smart Chain (BSC) are BEP-20 tokens.
                  Follow&nbsp;
                  <ExternalLink href="https://fortcake.gitbook.io/fortcake/get-started/get-bep20-tokens">
                    this guide
                  </ExternalLink>
                  &nbsp;to get BEP-20 Tokens or to convert to them.
                </Text>
              </ListItems>
              <ListItems>
                <Heading as="h4" scale="lg">
                  3. Connect your wallet to FORTCAKE
                </Heading>
                <Text>
                  You&#39;ve made a wallet and gotten your BEP-20 tokens, now
                  you just need to connect your wallet with FORTCAKE and
                  you&#39;re good to go! Follow&nbsp;
                  <ExternalLink href="https://fortcake.gitbook.io/fortcake/get-started/connect-your-wallet-to-fortcake">
                    this guide
                  </ExternalLink>
                  &nbsp;to connect your wallet.
                </Text>
              </ListItems>
            </ListWrapper>
          </Box>
        </SectionFlex>
      </Section>
      <Section>
        <SectionFlex className="grid tokenomics">
          <Box>
            <Heading as="h2" scale="xl">
              Tokenomics
            </Heading>
            <Text>
              <Box>
                <Text>
                  FORTCAKE is a BEP-20 cryptocurrency governance token that can
                  be traded on the Binance Smart Chain (BSC). FORTCAKE is both a
                  platform and currency used as an independent store of value
                  for gamers and enthusiasts alike.
                </Text>
              </Box>
              <Box style={{ marginTop: "40px" }}>
                <Text>Total Supply: 203,009,146 FORTCAKE</Text>
              </Box>
            </Text>
          </Box>
          <LazyImage src={Tokenomics} width={500} height={374} />
        </SectionFlex>
        <SectionFlex className="grid tokenomics reversed">
          <LazyImage src={GamePreview} width={410} height={310} />
          <Box>
            <Heading as="h2" scale="xl">
              Play
            </Heading>
            <Text>
              Featuring the top Binance Smartchain (BNB) play to earn games.
              Each game is connected to our built in swap feature, where you can
              choose any game you like and swap with a click of a button. By
              default each game is sorted and rated with an algorithmically
              calculated real time technology that we developed called the
              “FORTCAKE Score Meter” All the games are rated fairly based on
              Coingecko score, Community score, Liquidity score.
            </Text>
          </Box>
        </SectionFlex>
        <SectionFlex className="grid tokenomics">
          <Box>
            <Heading as="h2" scale="xl">
              Swap
            </Heading>
            <Text>
              <Box>
                <Text>
                  FORTCAKE&apos;s built in Swap feature, Trade your favorite
                  game tokens, No registration, no problem. Connect your wallet,
                  and exchange any token on the Binance blockchain in seconds.
                </Text>
              </Box>
            </Text>
          </Box>
          <LazyImage src={SwapPreview} width={450} height={316} />
        </SectionFlex>
        <SectionFlex className="grid tokenomics reversed">
          <LazyImage src={Staking} width={400} height={320} />
          <Box>
            <Heading as="h2" scale="xl">
              Earn (Coming Soon)
            </Heading>
            <Text>
              <Box>
                <Text>
                  Participants will soon be able to earn $FORTCAKE by staking,
                  the more you stake the more you earn!
                </Text>
              </Box>
            </Text>
          </Box>
        </SectionFlex>
      </Section>
    </Box>
  );
};

export default Home;
