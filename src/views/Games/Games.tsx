import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Heading, RowType, Text, Flex, useMatchBreakpoints } from 'fortcake-uikit-v2'
import Page from 'components/Layout/Page'
import { useGames } from 'state/games/hooks'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { useTranslation } from 'contexts/Localization'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import LoadingSkeleton from './components/Loading'
import Table from './components/GameTable/GameTable'
import { RowProps } from './components/GameTable/Row'
import { DesktopColumnSchema } from './components/types'
import LogoCake from '../../assets/images/logo/logo_cake_lookingdown_green.png'
import useTheme from '../../hooks/useTheme'
import { H2, LandingText, ControlContainer, LabelWrapper, FilterContainer, StyledImage } from './styles'

const NUMBER_OF_GAMES_VISIBLE = 12

const Games: React.FC = () => {
  const { isDark } = useTheme()
  const { t } = useTranslation()
  const { isLoading, data: games, userDataLoaded } = useGames()
  const [query, setQuery] = useState('')
  const { account } = useWeb3React()
  const [numberOfGamesVisible, setNumberOfGamesVisible] = useState(NUMBER_OF_GAMES_VISIBLE)
  const [sortOption, setSortOption] = useState('hot')
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const chosenGames = useRef(0)
  const { isMobile } = useMatchBreakpoints()

  const userDataReady = !account || (!!account && userDataLoaded)

  useEffect(() => {
    if (isIntersecting) {
      setNumberOfGamesVisible((gamesCurrentlyVisible) => {
        if (gamesCurrentlyVisible <= chosenGames.current) {
          return gamesCurrentlyVisible + NUMBER_OF_GAMES_VISIBLE
        }
        return gamesCurrentlyVisible
      })
    }
  }, [isIntersecting])

  const searchGame = useCallback(
    (gamesList) => {
      if (!query) return gamesList
      const lowercaseQuery = query.toLowerCase()
      const gamesToDisplay = gamesList.filter((game) => game.title.toLowerCase().includes(lowercaseQuery))
      return gamesToDisplay
    },
    [query],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const chosenGamesMemoized = useMemo(() => {
    let activeGames = games

    if (sortOption !== 'hot') {
      activeGames = activeGames.filter((game) => game.chain.some(({ chain }) => chain === sortOption) && game)
    }

    return searchGame(activeGames).slice(0, numberOfGamesVisible)
  }, [games, numberOfGamesVisible, sortOption, searchGame])

  chosenGames.current = chosenGamesMemoized.length

  const rowData = chosenGamesMemoized.map((game) => {
    const { title, subtitle, logo, cta, symbol, votes, chain } = game

    const row: RowProps = {
      game: {
        title,
        subtitle,
        logo,
        cta,
        symbol,
        votes,
        chain,
      },
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    const columnSchema = DesktopColumnSchema
    const columns = columnSchema.map((column) => ({
      id: column.id,
      name: column.name,
      label: column.label,
      sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
        switch (column.name) {
          case 'game':
            return b.id - a.id
          default:
            return 1
        }
      },
      sortable: column.sortable,
    }))

    return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const mobileHeaderStyle = isMobile
    ? {
        fontSize: '44px',
        marginRight: '10px',
      }
    : {}

  return (
    <>
      <PageHeader background="transparent" mt={!isMobile && '5vh'}>
        <Flex justifyContent="space-between">
          <LandingText>
            <Flex alignItems="center" justifyContent="space-between" mb={isMobile ? '30px' : '20px'}>
              <div>
                <Heading as="h2" scale="lg" color="secondary" mt="42px">
                  Welcome to
                </Heading>
                <Heading
                  as="h1"
                  scale="xxl"
                  color="secondary"
                  style={{
                    ...mobileHeaderStyle,
                    textShadow: isDark
                      ? '3px -2px 1px rgb(25 159 125), -3px 3px 1px rgb(33 229 180)'
                      : '#f1afc2 3px -2px 1px, #bb5768 -3px 3px 1px',
                  }}
                >
                  FORTCAKE
                </Heading>
              </div>
              <StyledImage src={LogoCake} width={100} height={78} mt="60px" loading="lazy" className="showOnMobile" />
            </Flex>
            <H2 as="h2" override>
              Find PLAY-TO-EARN games, Swap tokens, Earn rewards, Trade NFT`s and Join our community! Featuring our most
              upvoted crypto games all in one place...
            </H2>
          </LandingText>
          <StyledImage src={LogoCake} width={430} height={336} mt="20px" loading="lazy" />
        </Flex>
      </PageHeader>
      <Page>
        <ControlContainer>
          <FilterContainer>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Sort by')}</Text>
              <Select
                options={[
                  {
                    label: t('Hot'),
                    value: 'hot',
                  },
                  {
                    label: t('BSC'),
                    value: 'BSC',
                  },
                  {
                    label: t('ETH'),
                    value: 'ETH',
                  },
                  {
                    label: t('POL'),
                    value: 'POL',
                  },
                ]}
                onOptionChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text textTransform="uppercase">{t('Search')}</Text>
              <SearchInput onChange={handleChangeQuery} placeholder="Search Games" />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
        {isLoading ? <LoadingSkeleton /> : renderContent()}
        <div ref={observerRef} />
      </Page>
    </>
  )
}

export default Games
