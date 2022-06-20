import React, { useEffect, useState } from 'react'
import { GetStaticPaths } from 'next'
import { Game } from 'state/types'
import { Box, Button, Flex, Heading, Image as ImgComponent, Text } from 'fortcake-uikit-v2'
import GameImage from 'components/GameImage'
import { PlatformIcon } from 'views/Games/components/GameTable/Actions/ActionPanel'
import styled from 'styled-components'
import axios from 'axios'

/* 
address: "0x1633b7157e7638c4d6593436111bf125ee74703f"
category: "Card Game"
chain: "BNB"
cta: "https://splinterlands.com/"
discord: "https://discord.com/invite/splinterlands"
logo: "https://dl.airtable.com/.attachments/9d116440ef02fd1b0c14d99aa1efc8e5/002e6aff/2022-04-2702.21.55.png?ts=1655721336&userId=usrYUVcuuWEh2nY0T&cs=f3b904cfdf8fffb2"
platform: ['Web']
subtitle: "Earn unique NFT cards online, from anywhere in the world. Splinterlands is a free to play blockchain trading card game."
symbol: "SPS"
title: "Splinterlands"
twitter: "https://twitter.com/splinterlands"
votes: 59.05
*/

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
  }
`

const Card = styled(Flex)`
  /* background: #333; */
  width: min(33%, 200px);
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`

const ContentWrapper = styled(Flex)`
  width: 100%;
`

const DetailsWrapper = styled(Flex)`
  justify-content: space-around;
  /* gap: 40px; */
`

const Game = (props: Game) => {
  const { platform, symbol, category, logo, title, subtitle, votes } = props
  const [base64, setBase64] = useState('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')

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
        <ContentWrapper mt={10} flexDirection="column">
          <Button variant="light" scale="xs" style={{ marginInline: 'auto' }}>
            {category}
          </Button>
          {/* <Text textAlign="center">{category}</Text> */}
          <DetailsWrapper mt={50}>
            <Card>
              <Heading scale="lg">{symbol}</Heading>
              <Text fontSize="14px">Currency</Text>
            </Card>
            <Card>
              <Flex>
                {platform.map((p) => (
                  <PlatformIcon key={p} platform={p} width="32px" mr={platform.length > 1 ? 2 : 0} />
                ))}
              </Flex>
              <Text fontSize="14px">Platform</Text>
            </Card>
            <Card>
              <Heading scale="lg">{votes} %</Heading>
              <Text fontSize="14px">Votes</Text>
            </Card>
          </DetailsWrapper>
        </ContentWrapper>
        <Box mt={80}>
          <Box>
            <Heading scale="md">{subtitle}</Heading>
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
        </Box>
        <Box mt={120} width="100%">
          <Heading scale="lg" textAlign="left">
            Similar Games
          </Heading>
          <Flex style={{ gap: 4 }} justifyContent="space-between" mt={10}>
            <ImgComponent src="https://via.placeholder.com/240x240.png" alt="" height={240} width={240} />
            <ImgComponent src="https://via.placeholder.com/240x240.png" alt="" height={240} width={240} />
            <ImgComponent src="https://via.placeholder.com/240x240.png" alt="" height={240} width={240} />
          </Flex>
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
  const props = Games.find((game) => game.title.toLowerCase().replaceAll(' ', '') === title)
  return {
    props,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://api.fortcake.io/games')
  const Games: Game[] = await res.json()
  const paths = Games.map((game) => ({
    params: {
      title: game.title.toLowerCase().replaceAll(' ', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}
