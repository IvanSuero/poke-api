import type React from "react"
import { motion } from "framer-motion"

interface BattleResultProps {
  winner: "player" | "cpu" | ""
  playerScore: number
  cpuScore: number
  onClose: () => void
}

const BattleResult: React.FC<BattleResultProps> = ({ winner, playerScore, cpuScore, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-yellow-100 border-4 border-yellow-400 rounded-xl p-6 text-center"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4">{winner === "player" ? "🎉 You Won! 🎉" : "😔 CPU Won! 😔"}</h2>
        <div className="text-xl mb-4">
          Score: {playerScore} - {cpuScore}
        </div>
        <p className="text-sm text-gray-600">Click anywhere to continue</p>
      </motion.div>
    </motion.div>
  )
}

export default BattleResult

