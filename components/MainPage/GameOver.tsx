import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface GameOverProps {
  playerScore: number
  cpuScore: number
  onPlayAgain: () => void
}

const GameOver: React.FC<GameOverProps> = ({ playerScore, cpuScore, onPlayAgain }) => {
  const winner = playerScore > cpuScore ? "Player" : "CPU"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
    >
      <motion.div
        className="bg-yellow-100 border-4 border-yellow-400 rounded-xl p-8 text-center"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
        <p className="text-xl mb-4">{winner === "Player" ? "🎉 You Won! 🎉" : "😔 CPU Won! 😔"}</p>
        <div className="text-2xl mb-6">
          Final Score: {playerScore} - {cpuScore}
        </div>
        <Button
          onClick={onPlayAgain}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
        >
          Play Again
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default GameOver

