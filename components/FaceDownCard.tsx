import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

const FaceDownCard: React.FC = () => {
  return (
    <Card className="w-64 h-[22rem] bg-red-500 border-4 border-yellow-400 rounded-xl overflow-hidden shadow-lg transform rotate-180">
      <CardContent className="h-full flex items-center justify-center">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
          <div className="w-24 h-24 bg-red-500 rounded-full"></div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FaceDownCard
