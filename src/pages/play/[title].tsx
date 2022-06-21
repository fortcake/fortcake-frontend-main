import React, { useEffect, useState } from 'react'
import { GetStaticPaths } from 'next'
import { Game } from 'state/types'
import {
  Box,
  Button,
  Flex,
  Heading,
  Image as ImgComponent,
  Text,
  TwitterIcon,
  TelegramIcon,
  DiscordIcon,
} from 'fortcake-uikit-v2'
import GameImage from 'components/GameImage'
import { PlatformIcon } from 'views/Games/components/GameTable/Actions/ActionPanel'
import styled from 'styled-components'
import axios from 'axios'
import { useGames } from 'state/games/hooks'
import Link from 'components/NextLink'

const Banner = styled(Box)<{ bgImg?: string }>`
  min-height: 24vh;
  background-image: url('${({ bgImg }) => bgImg}');
  background-size: contain;
  background-position: center;
  background-color: #000;
  ${({ theme }) => theme.mediaQueries.md} {
    min-height: 40vh;
  }
`

const Container = styled(Flex)`
  width: min(100% - 48px, 1200px);
  margin-inline: auto;
  min-height: 70vh;
  padding: 0 0 40px;
  position: relative;
  top: -110px;
  flex-direction: column;
  align-items: center;
`

const TokenWrapper = styled(Box)`
  width: 220px;
`

const Image = styled(GameImage)`
  img {
    z-index: 8;
    padding: 20px;
  }
  &::before {
    background-color: #000;
    border-color: #ccc;
    border-width: 3px;
  }
`

const Card = styled(Flex)`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`

const ContentWrapper = styled(Flex)`
  width: 100%;
  flex-direction: column;
`

const DetailsWrapper = styled(Flex)`
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: space-evenly;
  }
`

const SimilarGamesWrapper = styled(Flex)`
  justify-content: 'flex-start';
  flex-direction: column;
  gap: 10px;
  width: min(100%, 800px);
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const SimilarGames = styled(Flex)`
  border: 1px solid #333;
  background-color: #222;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  min-height: 240px;
  width: min(450px, 100%);
  transition: all ease 0.2s;
  &:hover {
    background-color: transparent;
  }
`

const Game = (props: Game) => {
  const { platform, symbol, category, logo, title, subtitle, votes, discord, telegram, twitter } = props
  const [base64, setBase64] = useState('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')
  const { data } = useGames()
  const [similarGames, setSimilarGames] = useState([] as typeof data)

  useEffect(() => {
    let games = data.filter((game) => game.title !== title && game.category === category)
    games = games.length > 4 ? games.splice(0, 4) : games
    setSimilarGames(games)
  }, [data, category, title])

  useEffect(() => {
    const controller = new AbortController()
    const fetchImg = async () => {
      try {
        const response = await axios.get(logo, {
          responseType: 'arraybuffer',
          signal: controller.signal,
        })
        const b64 = Buffer.from(response.data, 'binary').toString('base64')
        const src = `data:image/png;base64,${b64}`
        setBase64(src)
      } catch (e) {
        console.info(e)
      }
    }

    fetchImg()

    return () => {
      controller.abort()
    }
  }, [logo])

  return (
    <Box>
      <Banner bgImg="https://via.placeholder.com/1600x200.png" />
      <Container>
        <TokenWrapper>
          <Image image={base64} width={220} height={220} alt="Token" />
        </TokenWrapper>
        <Heading scale="xl" textAlign="center" mt={40}>
          {title}
        </Heading>
        <ContentWrapper mt={10}>
          <Button variant="light" scale="xs" style={{ marginInline: 'auto' }}>
            {category}
          </Button>
          <DetailsWrapper mt={50}>
            <Card>
              <Heading height="30px" scale="lg">
                {symbol}
              </Heading>
              <Text py={1} fontSize="14px">
                Currency
              </Text>
            </Card>
            <Card>
              <Flex height="30px">
                {platform.map((p) => (
                  <PlatformIcon key={p} platform={p} width="21px" mr={platform.length > 1 ? 2 : 0} />
                ))}
              </Flex>
              <Text py={1} fontSize="14px">
                Platform
              </Text>
            </Card>
            <Card>
              <Heading height="30px" scale="lg">
                {votes} %
              </Heading>
              <Text py={1} fontSize="14px">
                Votes
              </Text>
            </Card>
            <Card>
              <Flex height="30px">
                {twitter && (
                  <a href={twitter} target="_blank" rel="noreferrer">
                    <TwitterIcon height={21} mr={2} />
                  </a>
                )}
                {telegram && (
                  <a href={telegram} target="_blank" rel="noreferrer">
                    <TelegramIcon height={21} mr={2} />
                  </a>
                )}
                {discord && (
                  <a href={discord} target="_blank" rel="noreferrer">
                    <DiscordIcon height={21} mr={2} />
                  </a>
                )}
              </Flex>
              <Text py={1} fontSize="14px">
                Socials
              </Text>
            </Card>
          </DetailsWrapper>
        </ContentWrapper>
        <ContentWrapper mt={80}>
          <Box>
            <Heading scale="md" style={{ lineHeight: '1.8rem' }}>
              {subtitle}
            </Heading>
          </Box>
          <Box mt={80} width="100%">
            <Heading scale="lg" textAlign="left">
              Media
            </Heading>
            <Flex style={{ gap: 4 }} justifyContent="space-between" mt={10}>
              <ImgComponent src="https://via.placeholder.com/240x240.png" alt="" height={240} width={240} />
              <ImgComponent src="https://via.placeholder.com/240x240.png" alt="" height={240} width={240} />
              <ImgComponent src="https://via.placeholder.com/240x240.png" alt="" height={240} width={240} />
              <ImgComponent src="https://via.placeholder.com/240x240.png" alt="" height={240} width={240} />
            </Flex>
          </Box>
        </ContentWrapper>
        <Box mt={120} width="100%">
          <Heading scale="lg" textAlign="left">
            Similar Games
          </Heading>
          <SimilarGamesWrapper mt={20}>
            {similarGames.map((cat) => (
              <SimilarGames key={cat.title} p={2}>
                <Link to={`/play/${cat.title.toLowerCase().replace(/ /g, '')}`} style={{ width: '100%' }}>
                  <ImgComponent src={cat.logo} alt="" height={180} width={180} mx="auto" />
                  {/* <Heading style={{ fontSize: '16px' }} textAlign="center" py={2}>
                    {cat.title}
                  </Heading> */}
                </Link>
              </SimilarGames>
            ))}
          </SimilarGamesWrapper>
        </Box>
      </Container>
    </Box>
  )
}

export default Game

export const getStaticProps = async ({ params }) => {
  const { title } = params
  const res = await fetch('https://api.fortcake.io/games')
  const Games: Game[] = await res.json()
  const props = Games.find((game) => game.title.toLowerCase().replace(/ /g, '') === title)
  return {
    props,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://api.fortcake.io/games')
  const Games: Game[] = await res.json()
  const paths = Games.map((game) => ({
    params: {
      title: game.title.toLowerCase().replace(/ /g, ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}
