import { useEffect, useRef } from "react";
import {  Form, Link } from "react-router-dom";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useAppSelector } from "@/hooks/useStore";
import {BsSearch} from "react-icons/bs";



const Navbar = () => {
  const { navRef, arrowRef, handleTopScroll } = useScrollNavbarAndArrowUp();
  const {gender,species,status} = useAppSelector((state) => state.characters.filter);
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
          <div style={{display:'flex'}}>
            <input style={{padding:'.4rem'}} name="name" type="text" placeholder="Search"/>
            <input name="species" value={species} type="hidden" placeholder="Search" />
            <input name="status" value={status} type="hidden" placeholder="Search" />
            <input name="gender" value={gender} type="hidden" placeholder="Search" />
            <button className="btn_search" ><BsSearch/></button>
            </div>
          </Form>
        </div>
        <div className="links_content">
          <ul className="links">
            <li>
              <Link to="/">Characters</Link>
            </li>
            <li>
              <Link to="/favoritos">Favorites</Link>
              <span className="count_favorites">{favoritesLenght}</span>
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
export default Navbar;
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
