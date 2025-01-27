import VersusComponent from '../VersusComponent'
import PokemonCard from '../PokemonCard'

const SelectedCards: React.FC<{ userPokemon: any, opponentPokemon: any }> = ({ userPokemon, opponentPokemon }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="transform scale-125 flex items-center justify-center gap-4">
        <div>
          <PokemonCard data={userPokemon} />
          <p className="text-white text-lg font-bold text-center mt-4">Your card</p>
        </div>
        <VersusComponent />
        {opponentPokemon && (
          <div>
            <PokemonCard data={opponentPokemon} />
            <p className="text-white text-lg font-bold text-center mt-4">Opponent card</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectedCards;