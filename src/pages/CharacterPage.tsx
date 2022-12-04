import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { fetchGetCharacterById } from "@/redux/features/characters/thunks";
import { CardDetail, EpisodesList, Loader } from "@/components";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const CharacterPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const character = useAppSelector(
    (state) => state.characters.characterSelected.data
  );
  const loading = useAppSelector(
    (state) => state.characters.characterSelected.loading
  );
  const idNumber = parseInt(id||"0")||0;
  const nexId = idNumber + 1;
  const prevId = idNumber - 1;
  

  useEffect(() => {
    if (idNumber > 0) {
      dispatch(fetchGetCharacterById(idNumber.toString() || ""));
    }
  }, [id]);

  if (idNumber <= 0 || !character) {
    return <div>Not found</div>;
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="characterPage">
      <div className="characterPage_content">
        {prevId > 0 && (<Link to={`/character/${prevId}`} className="characterPage_link">
          <GrFormPrevious className="icon_characterPage_nextPreview" />
        </Link>)}
        
        <CardDetail character={character} />
        <Link to={`/character/${nexId}`} className="characterPage_link">
          <GrFormNext className="icon_characterPage_nextPreview" />
        </Link>
      </div>
      <EpisodesList character={character} />
    </div>
  );
};

export default CharacterPage;
