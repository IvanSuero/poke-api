import type React from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Stat {
  base_stat: number
  stat: {
    name: string
  }
}

interface PokemonData {
  name: string
  types: Array<{ type: { name: string } }>
  sprites: {
    front_default: string
  }
  stats: Stat[]
}

interface PokemonCardProps {
  data: PokemonData
  onSelectStat?: (statName: string) => void
  selectable?: boolean
}

const PokemonCard: React.FC<PokemonCardProps> = ({ data, onSelectStat, selectable = false }) => {

  const getStatColor = (statName: string) => {
    switch (statName) {
      case "hp":
        return "bg-green-500"
      case "attack":
        return "bg-yellow-500"
      case "defense":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }


  return (
    <Card className="w-72 h-[22rem] bg-yellow-100 border-4 border-yellow-400 rounded-xl overflow-hidden shadow-lg transition-all duration-300">
      <CardHeader className="bg-yellow-400 p-2">
        <CardTitle className="text-center text-lg font-bold capitalize">{data.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex justify-center mb-3">
          <Image
            src={data.sprites.front_default || "/placeholder.svg?height=80&width=80"}
            alt={data.name}
            width={120}
            height={120}
          />
        </div>
        <div className="flex justify-center gap-2 mb-4">
          {data.types.map((type, index) => (
            <Badge key={index} variant="secondary" className="text-[0.7rem] px-2 py-0.5">
              {type.type.name}
            </Badge>
          ))}
        </div>
        <div className="space-y-3">
          {data.stats.filter((s) => s.stat.name !== 'special-attack' && s.stat.name !== 'special-defense' && s.stat.name !== 'speed').map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="w-20 text-[0.7rem] font-medium capitalize">{stat.stat.name === 'attack' ? 'att' : stat.stat.name === 'defense' ? 'def' : stat.stat.name}:</span>
              <div className="flex-1 flex items-center gap-2">
                <Progress value={(stat.base_stat / 200) * 100} max={100} className={`h-2 w-24`} colorIndicator={`${getStatColor(stat.stat.name)}`} />
              </div>
              <span className="tabular-nums text-[0.7rem] w-6">{stat.base_stat}</span>
              {selectable && (
                <Image
                  src="/attack.png"
                  alt={data.name}
                  width={30}
                  height={30}
                  className="h-4 w-8 pl-2 hover:cursor-pointer"
                  onClick={() => onSelectStat && onSelectStat(stat.stat.name)}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default PokemonCard

