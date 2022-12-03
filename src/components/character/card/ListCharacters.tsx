import { useAppSelector } from "../../../hooks/useStore";
import CharacterCard from "./CharacterCard";
import { SkletonCardList } from "../skleton";

const ListCharacters = ({ characters }: { characters: any[] }) => {
  const loading = useAppSelector((state) => state.characters.loading);

  if (loading) {
    return <SkletonCardList />;
  }
  if (characters.length === 0) {
    return (
      <div className="loader">
        <h1>NO SE ENCONTRARON RESULTADOS!</h1>
      </div>
    );
  }
  return (
    <>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </>
  );
};

export default ListCharacters;
