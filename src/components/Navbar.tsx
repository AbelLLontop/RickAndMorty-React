import { useEffect, useRef } from "react";
import { Form, Link, NavLink, useSubmit } from "react-router-dom";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useAppSelector } from "@/hooks/useStore";
import { BsSearch } from "react-icons/bs";
import { MdOutlineFavorite } from "react-icons/md";
import { MdEmojiPeople } from "react-icons/md";
import InputSearch from "./InputSearch";

const Navbar = () => {
  const { navRef, arrowRef, handleTopScroll } = useScrollNavbarAndArrowUp();

  const favoritesLenght = useAppSelector(
    (state) => state.characters.favorites.length
  );

  return (
    <>
      <nav ref={navRef} className="navbar">
        <Link to={"/"}>
          <h1>Rick and Morty</h1>
        </Link>
        <InputSearch/>
        <div className="links_content">
          <ul className="links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `linkItem ${isActive ? "linkSelect" : undefined}`
                }
              >
                <MdEmojiPeople />
                Characters
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favoritos"
                className={({ isActive }) =>
                  `linkItem ${isActive ? "linkSelect" : undefined}`
                }
              >
                <MdOutlineFavorite />
                Favorites{" "}
                <span className="count_favorites">{favoritesLenght}</span>
              </NavLink>
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
