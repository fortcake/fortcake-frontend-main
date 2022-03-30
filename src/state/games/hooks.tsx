import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { State, Game } from '../types'
import { GameProps } from '../../views/Games/components/types'

const url = `https://api.fortcake.io/games`

const deserializeGame = (game: Game) => {
  const { title, subtitle, logo, cta, symbol, votes } = game
  const chain = {
    chain: game.chain,
    address: game.address,
  }

  return {
    title,
    subtitle,
    logo,
    cta,
    symbol,
    votes,
    chain: [{ ...chain }],
  }
}

const createGameList = (deserializedGames: GameProps[], gameList: Game[]) => {
  gameList.forEach((game) => {
    if (deserializedGames.length) {
      const found = deserializedGames.findIndex(({ symbol }) => symbol === game.symbol)
      if (found >= 0) {
        deserializedGames[found].chain.push({ chain: game.chain, address: game.address })
      } else {
        deserializedGames.push(deserializeGame(game))
      }
    } else {
      deserializedGames.push(deserializeGame(game))
    }
  })

  deserializedGames.sort((a, b) => b.votes - a.votes)
}

export const useGames = () => {
  const deserializedGamesData: GameProps[] = []
  const games = useSelector((state: State) => state.games)
  const [airTableGames, setAirTableGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const fetchGamesData = async () => {
      try {
        const { data: allGames } = await axios.get(url, {
          signal: controller.signal,
        })
        setAirTableGames(allGames)
        setIsLoading(false)
      } catch (e) {
        console.info(e, 'table')
      }
    }
    fetchGamesData()

    return () => {
      setIsLoading(true)
      controller.abort()
    }
  }, [])

  if (!airTableGames.length) {
    createGameList(deserializedGamesData, games.data)
  } else {
    createGameList(deserializedGamesData, airTableGames)
  }

  const { loadArchivedFarmsData, userDataLoaded } = games
  return {
    isLoading,
    loadArchivedFarmsData,
    userDataLoaded,
    data: deserializedGamesData,
  }
}
