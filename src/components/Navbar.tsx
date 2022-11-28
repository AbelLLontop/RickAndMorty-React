import { useEffect, useRef } from "react";
import { ActionFunction, Form, Link, useFetcher } from "react-router-dom";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useAppSelector } from "../hooks/useStore";



export const NavBar = () => {
  const { navRef, arrowRef, handleTopScroll } = useScrollNavbarAndArrowUp();
  const {gender,species,status,name} = useAppSelector((state) => state.characters.filter);
  const favoritesLenght = useAppSelector(
    (state) => state.characters.favorites.length
    );

  return (
    <>
      <nav ref={navRef} className="navbar">
        <Link to={"/"}>
          <h1>Personajes de Rick and Morty</h1>
        </Link>
        <div className="search">
        <Form>
            <input  name="name" type="text" placeholder="Search"/>
            <input name="species" value={species} type="hidden" placeholder="Search" />
            <input name="status" value={status} type="hidden" placeholder="Search" />
            <input name="gender" value={gender} type="hidden" placeholder="Search" />
            <button >Search</button>
          </Form>
        </div>
        <div className="links_content">
          <ul className="links">
            <li>
              <Link to="/characters">Characters</Link>
            </li>
            <li>
              <Link to="/favoritos">Favorites</Link>
              <span className="count_favorites">{favoritesLenght}</span>
            </li>
            <li>
              <Link to="/locations">Locations</Link>
            </li>
            <li>
              <Link to="/episodes">Episodes</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div
        ref={arrowRef}
        onClick={handleTopScroll}
        className="contentArrowScrollTop"
      >
        <MdKeyboardArrowUp className="iconArrowTopScroll" />
      </div>
    </>
  );
};

const useScrollNavbarAndArrowUp = () => {
  const navRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollPrincipal = window.scrollY;
    const handleScroll = () => {
      let displacement = window.scrollY;
      if (scrollPrincipal >= displacement) {
        navRef.current?.classList.remove("hide");
      } else {
        navRef.current?.classList.add("hide");
      }

      if (window.scrollY > 0) {
        arrowRef.current?.classList.add("hideArrowTopScroll");
      } else {
        arrowRef.current?.classList.remove("hideArrowTopScroll");
      }
      scrollPrincipal = displacement;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTopScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return { navRef, arrowRef, handleTopScroll };
};
