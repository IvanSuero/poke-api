'use client'

import PokemonCard from "../components/PokemonCard"
import FaceDownCard from "../components/FaceDownCard"
import Error from "../components/MainPage/Error"
import Loading from "../components/MainPage/Loading"
import User from "../components/MainPage/User"
import BattleResult from "../components/MainPage/BattleResult"
import BattleSimulation from "../components/MainPage/BattleSimulation"
import { useState, useEffect } from "react"
import GameOver from "../components/MainPage/GameOver"

async function getPokemonData(number: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pokemon?number=${number}`)

  if (!res.ok) throw Error({ error: "Failed to fetch data" })
  return res.json()
}

export default function Page() {
  const [pokemonData, setPokemonData] = useState([])
  const [opponentPokemonData, setOpponentPokemonData] = useState([])
  const [error, setError] = useState<string | null>(null)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [opponentSelectedCard, setOpponentSelectedCard] = useState<string | null>(null)
  const [showBattleResult, setShowBattleResult] = useState(false)
  const [playerScore, setPlayerScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [battleWinner, setBattleWinner] = useState<"player" | "cpu" | "">("")
  const [showBattleSimulation, setShowBattleSimulation] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  async function getOpponentPokemonData() {
    const randomNumbers = Array.from({ length: 3 }, () => Math.floor(Math.random() * 1025) + 1)
    const data: any = await Promise.all(randomNumbers.map(getPokemonData))
    setOpponentPokemonData(data)
  }

  async function initializeGame() {
    try {
      const randomNumbers = Array.from({ length: 3 }, () => Math.floor(Math.random() * 1025) + 1)
      const data: any = await Promise.all(randomNumbers.map(getPokemonData))
      setPokemonData(data)
      localStorage.setItem("pokemonData", JSON.stringify(data))
      await getOpponentPokemonData()
    } catch (e: any) {
      setError("An error occurred" + e)
    }
  }

  useEffect(() => {
    const fetchPokemonData = async () => {
      try { 
        const storedData = localStorage.getItem("pokemonData")
        if (storedData && storedData.length > 0) {
          setPokemonData(JSON.parse(storedData))
          getOpponentPokemonData()
          return
        }
        initializeGame()
      } catch (e) { 
        setError("An error occurred" + e)
      }
    }

    fetchPokemonData()
  }, [])

  function selectCard(name: string) {
    setSelectedCard(name)

    const randomIndex = Math.floor(Math.random() * opponentPokemonData.length)
    const cpuPokemon: any = opponentPokemonData[randomIndex]
    setOpponentSelectedCard(cpuPokemon.name)

    setShowBattleSimulation(true)
  }

  const handleBattleSimulationComplete = (winner: 'player' | 'cpu') => {
    setShowBattleSimulation(false)
    setBattleWinner(winner)
    if (winner === "player") setPlayerScore((prev) => prev + 1)
    else setOpponentScore((prev) => prev + 1)
    setShowBattleResult(true)
  }

  const handleBattleEnd = () => {
    setShowBattleResult(false)
    setSelectedCard(null)
    setOpponentSelectedCard(null)

    if(battleWinner === "player") {
      const updatedOpponentPokemonData = opponentPokemonData.filter((p: any) => p.name !== opponentSelectedCard)
      setOpponentPokemonData(updatedOpponentPokemonData)
      localStorage.setItem("opponentPokemonData", JSON.stringify(updatedOpponentPokemonData))
      if (updatedOpponentPokemonData.length === 0) setIsGameOver(true)
    } else {
      const updatedPokemonData = pokemonData.filter((p: any) => p.name !== selectedCard)
      setPokemonData(updatedPokemonData)
      localStorage.setItem("pokemonData", JSON.stringify(updatedPokemonData))
      if (updatedPokemonData.length === 0) setIsGameOver(true)
    }
  }

  const handlePlayAgain = () => {
    setIsGameOver(false)
    setPlayerScore(0)
    setOpponentScore(0)
    setPokemonData([])
    setOpponentPokemonData([])
    initializeGame()
  }

  if (error) { return ( <Error error={error} /> )}

  if ((pokemonData.length === 0 || opponentPokemonData.length === 0) && !isGameOver) { return ( <Loading /> )}

  return (
      <div className="h-screen items-center justify-between bg-gray-100 flex">

       <User userScore={playerScore} cpuScore={opponentScore} />

        <div className="flex-col w-full h-screen items-center justify-center py-8 relative">
          <div className="flex items-center justify-center gap-4">
            {opponentPokemonData.map((_, index) => (
              <div key={index} className="transform -rotate-4">
                <FaceDownCard />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            {pokemonData.map((data: any, index) => (
              <div key={index} className={`${selectedCard === data.name ? 'opacity-50' : 'hover:-translate-y-4 hover:cursor-pointer transition-all hover:shadow-xl'}`} onClick={() => selectCard(data.name)}>
                <PokemonCard data={data} />
              </div>
            ))}
          </div>
        </div>

        {showBattleSimulation && selectedCard && opponentSelectedCard && (
          <BattleSimulation
            playerPokemon={pokemonData.find((data: any) => data.name === selectedCard)}
            cpuPokemon={opponentPokemonData.find((data: any) => data.name === opponentSelectedCard)}
            onBattleComplete={handleBattleSimulationComplete}
          />
        )}

        {showBattleResult && (
          <BattleResult winner={battleWinner} playerScore={playerScore} cpuScore={opponentScore} onClose={handleBattleEnd} />
        )}

        {isGameOver && <GameOver playerScore={playerScore} cpuScore={opponentScore} onPlayAgain={handlePlayAgain} />}
      </div>
  );
}
