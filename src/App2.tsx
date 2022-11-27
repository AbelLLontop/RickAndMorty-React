import { addFavoriteCharacter, fetchCharacters } from "./redux/features/characters/charactersSlice";
import { useAppDispatch, useAppSelector } from "./hooks/useStore";

function App2() {
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => state.characters.characters);
  const favorites = useAppSelector((state) => state.characters.favorites);
  const loading = useAppSelector((state) => state.characters.loading);
  const next = useAppSelector((state) => state.characters.next);
  const prev = useAppSelector((state) => state.characters.prev);


  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <button onClick={() => dispatch(fetchCharacters())}>Buscar</button>
      <div style={{display:'flex'}}>
      <div>

<h3>List</h3>
{characters.map((character) => (
  <div onClick={()=>dispatch(addFavoriteCharacter(character))} key={character.id}>
    <h4>{character.name}</h4>
    <img style={{width:'200px'}} src={character.image} alt={character.name} />
  </div>
))}
</div>
<div>
<h3>Favorites</h3>
{favorites.map((character) => (
  <div key={character.id}>
    <h4>{character.name}</h4>
    <img style={{width:'200px'}} src={character.image} alt={character.name} />
  </div>
))}
</div>
      </div>
  
     <button onClick={() => dispatch(fetchCharacters(prev?prev.split("=")[1]:"1"))}>Prev</button>
     <button onClick={() => dispatch(fetchCharacters(next?next.split("=")[1]:"1"))}>Next</button>
    </div>
  );
}

export default App2;
