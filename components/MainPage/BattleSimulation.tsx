import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import PokemonCard from "../PokemonCard"
import VersusComponent from "../VersusComponent"

interface BattleSimulationProps {
  playerPokemon: any
  cpuPokemon: any
  onBattleComplete: (winner: "player" | "cpu", playerStat: number, cpuStat: number) => void
}

const BattleSimulation: React.FC<BattleSimulationProps> = ({ playerPokemon, cpuPokemon, onBattleComplete }) => {
  const [stage, setStage] = useState(0)
  const [selectedStat, setSelectedStat] = useState<string | null>(null)

  useEffect(() => {
    if(selectedStat) {
      const timer = setTimeout(() => {
        if (stage < 3) {
          setStage(stage + 1)
        } else {
          const playerStatValue = playerPokemon.stats.find((stat: any) => stat.stat.name === selectedStat).base_stat
          const cpuStatValue = cpuPokemon.stats.find((stat: any) => stat.stat.name === selectedStat).base_stat
          onBattleComplete(playerStatValue > cpuStatValue ? "player" : "cpu", playerStatValue, cpuStatValue)
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [stage, selectedStat, playerPokemon, cpuPokemon, onBattleComplete])

  const handleStatSelect = (statName: string) => {
    setSelectedStat(statName)
    setStage(1)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative w-full max-w-3xl flex items-center justify-center">
        <motion.div
          className="absolute left-0"
          initial={{ x: -200, rotate: 0 }}
          animate={{
            x: stage > 0 ? 0 : -200,
            rotate: stage > 1 ? [-5, 5, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <PokemonCard data={playerPokemon} onSelectStat={handleStatSelect} selectable={stage === 0} />
        </motion.div>
        {stage > 1 && (
          <motion.div
            className="text-6xl font-bold text-yellow-400 z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <VersusComponent />
          </motion.div>
        )}
        <motion.div
          className="absolute right-0"
          initial={{ x: 200, rotate: 0 }}
          animate={{
            x: stage > 0 ? 0 : 200,
            rotate: stage > 1 ? [5, -5, 5, -5, 0] : 0,
          }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <PokemonCard data={cpuPokemon} />
        </motion.div>
      </div>
      {stage < 3 && selectedStat && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="w-64 h-2 bg-gray-300 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3 }}
          >
            <motion.div
              className="h-full bg-yellow-400"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
            />
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default BattleSimulation

