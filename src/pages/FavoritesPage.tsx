
import { ListCharacters } from "@/components";
import { useAppSelector } from "@/hooks/useStore";
import { useEffect } from 'react';

const FavoritesPage = () => {
  const favorites = useAppSelector((state) => state.characters.favorites);
  useEffect(()=>{
    window.scrollTo({
      top: 0,
    })
  },[])

  return (
    <section>
      <div className="listCharacters">
        <ListCharacters characters={favorites}/>
      </div>
    </section>
  );
};

export default FavoritesPage;
