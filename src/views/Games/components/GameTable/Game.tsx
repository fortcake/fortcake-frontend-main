import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import {
  Skeleton,
  Text,
  Flex,
  Button,
  Image as Img,
  ChevronUpIcon,
  ChevronDownIcon,
  useMatchBreakpoints,
  BinanceIcon,
} from 'fortcake-uikit-v2'
import axios from 'axios'
import GameImage from 'components/GameImage'
// import Link from "next/link";
import Link from 'components/NextLink'
import useTheme from 'hooks/useTheme'
import { GameProps, ChainProps } from '../types'
// import Select from '../Select'

import green from '../../../../assets/images/gamelist/greenfortcakesize.png'
import orange from '../../../../assets/images/gamelist/orangefortcakesize.png'
import red from '../../../../assets/images/gamelist/redfortcakesize.png'
import yellow from '../../../../assets/images/gamelist/yellowfortcakesize.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
  width: 100%;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0 0 0 16px;
    flex-direction: row;
  }
`

const TokenWrapper = styled.div`
  width: 100px;
  align-self: flex-end;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-right: 12px;
    align-self: center;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 18px;
  }
`

const CurrencyText = styled(Text)`
  color: ${({ theme }) => (theme.isDark ? 'lightblue' : '#4fa6c3')};
`

const Image = styled(GameImage)`
  width: 90px;
`

const FlexButton = styled(Flex)`
  margin-left: 4px;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-start;
  }
  &.links {
    margin-top: 20px;
    a:first-child {
      margin-right: 20px;
    }
  }
`

const FlexMobileContentWrapper = styled(Flex)`
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: row;
  }
`

const Rating: React.FC<{ votes: number }> = ({ votes }) => {
  const { isMobile } = useMatchBreakpoints()

  let ratingIcon: string

  if (votes > 24 && votes < 50) {
    ratingIcon = orange.src
  } else if (votes > 49 && votes < 75) {
    ratingIcon = yellow.src
  } else if (votes > 74) {
    ratingIcon = green.src
  } else {
    ratingIcon = red.src
  }

  return (
    <Flex alignItems="center" justifyContent="flex-end" width={isMobile ? '100%' : ''}>
      <Img src={ratingIcon} width={18} height={18} mr="8px" style={{ width: '18px' }} />
      <Text color="text" fontSize="1" fontWeight="bold" as="h3">
        {votes} %
      </Text>
    </Flex>
  )
}

const ChainAddress: React.FC<{ chain: ChainProps[] }> = ({ chain }) => {
  const url = `/swap?outputCurrency=${chain[0].address}`

  return (
    <FlexButton className="chainAdress">
      <Button
        className="externalLinks"
        variant="primary"
        scale="sm"
        mr="20px"
        as={Link}
        to={url}
        onClick={(e) => e.stopPropagation()}
      >
        Swap
      </Button>
      {/* <Select options={options} onOptionChange={handleOptionChange} mr="20px" /> */}
    </FlexButton>
  )
}

const Game: React.FunctionComponent<GameProps & { actionPanelOpen: boolean }> = ({
  title,
  subtitle,
  logo,
  votes,
  cta,
  chain,
  actionPanelOpen,
  price,
  category,
}) => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  const [base64, setBase64] = useState('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')
  const [imgLoading, setImgLoading] = useState(true)
  const { isDark } = useTheme()

  const categoryBtnStyle = {
    backgroundColor: !isDark && '#a9a9a9',
  }

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
        setImgLoading(false)
      } catch (e) {
        console.info(e)
      }
    }

    fetchImg()

    return () => {
      controller.abort()
    }
  }, [logo])

  const renderContent = () => {
    if (isMobile) {
      return (
        <>
          <FlexMobileContentWrapper justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
            <TokenWrapper>
              {imgLoading ? (
                <Skeleton variant="circle" animation="waves" width={90} height={90} />
              ) : (
                <Image image={base64} width={120} height={120} ml="10px" />
              )}
            </TokenWrapper>
            <Flex flexDirection="column" alignItems="flex-end" style={{ width: '100%' }}>
              <Flex flexDirection="column">
                <Rating votes={votes} />
                <Text color="secondary" bold textTransform="uppercase" textAlign="right">
                  {title}
                </Text>
                <Flex>
                  <Flex mr="10px">
                    <BinanceIcon mr="5px" width="15px" />
                    <Text color="warning" bold fontSize="1">
                      {price.bnb}
                    </Text>
                  </Flex>
                  <Flex>
                    <CurrencyText bold fontSize="1" mr="5px">
                      USD
                    </CurrencyText>
                    <CurrencyText bold fontSize="1">
                      {price.usd.toFixed(price.usd > 1 ? 2 : 4)}
                    </CurrencyText>
                  </Flex>
                </Flex>
              </Flex>
              <Flex mt="20px" flexDirection="column">
                <Text textAlign="right">{subtitle}</Text>
                <Flex justifyContent="flex-end" mt="4">
                  <Button variant="light" scale="xs" style={categoryBtnStyle}>
                    {category}
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </FlexMobileContentWrapper>
          <Flex justifyContent="flex-end" mt="20px" style={{ width: '100%' }}>
            <ChainAddress chain={chain} />
            <Button
              className="externalLinks"
              as="a"
              variant="secondary"
              href={cta}
              scale="sm"
              onClick={(e) => e.stopPropagation()}
            >
              Play
            </Button>
          </Flex>
          <Flex justifyContent="center" mt="18px" mb="10px" style={{ width: '100%' }}>
            {!actionPanelOpen ? (
              <ChevronDownIcon width={25} color="tertiary" />
            ) : (
              <ChevronUpIcon width={25} color="tertiary" />
            )}
          </Flex>
        </>
      )
    }

    return (
      <Flex style={{ width: '100%' }}>
        <TokenWrapper>
          {imgLoading ? (
            <Skeleton variant="circle" animation="waves" width={90} height={90} />
          ) : (
            <Image image={base64} width={90} height={90} />
          )}
        </TokenWrapper>
        <Flex justifyContent="space-between" style={{ width: '100%' }}>
          <Flex flexDirection="column" style={{ width: '65%' }}>
            <Flex alignItems="center">
              <Text color="secondary" fontSize={isTablet ? '16px' : '12px'} bold textTransform="uppercase" mr="2">
                {title}
              </Text>
              <Button variant="light" scale="xs" style={categoryBtnStyle}>
                {category}
              </Button>
            </Flex>
            <Flex justifyContent="space-between">
              <Text bold>{subtitle}</Text>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between" mt="20px" ml="4px">
              <Flex>
                <ChainAddress chain={chain} />
                <Button className="externalLinks" as="a" variant="secondary" href={cta} scale="sm">
                  Play
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDirection="column" justifyContent="center">
            <Rating votes={votes} />
            <Flex flexDirection="column">
              <Flex justifyContent="space-between">
                <BinanceIcon mr="10px" />
                <Text color="warning" bold textAlign="right">
                  {price.bnb}
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <CurrencyText bold>USD</CurrencyText>
                <CurrencyText bold>{price.usd.toFixed(price.usd > 1 ? 2 : 4)}</CurrencyText>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    )
  }

  return <Container>{renderContent()}</Container>
}

export default Game
