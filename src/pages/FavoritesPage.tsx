import { CharacterCard } from '../components/CharacterCard';
import { useAppSelector } from '../hooks/useStore'

const FavoritesPage = () => {
    const favorites = useAppSelector(state=>state.characters.favorites);
  return (
    <section>
      <h1>Favoritos </h1>
    <div style={{display:'flex'}}>
         {favorites.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
    </div>
   

    </section>
  )
}

export default FavoritesPage