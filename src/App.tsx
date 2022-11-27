import React, { useEffect, useRef } from "react";
import ListCharacters from "./components/ListCharacters";
import { MdKeyboardArrowUp } from "react-icons/md";

const SiderbarFilter = () => {
  return (
    <aside className="siderbar">
      <div className="filters">
        <h2>Filtros</h2>
        <br />
        <div className="filter">
          <label htmlFor="status">Estado</label>
          <select name="status" id="status">
            <option value="all">Todos</option>
            <option value="alive">Vivo</option>
            <option value="dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
        <div className="filter">
          <label htmlFor="species">Especie</label>
          <select name="species" id="species">
            <option value="all">Todos</option>
            <option value="human">Humano</option>
            <option value="alien">Alien</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
        <div className="filter">
        <label htmlFor="genders">Genero</label>
          <select name="genders" id="genders">
            <option value="all">Todos</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
        <button className="btn-filter">Filter</button>
      </div>
    </aside>
  );
};

const NavBar = () => {
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
    
    })
  };
  return (
    <>
      <nav ref={navRef} className="navbar">
        <h1>Personajes de Rick and Morty</h1>
        <div className="search">
          <input type="text" placeholder="Search" />
        </div>
        <div className="links_content">
          <ul className="links">
            <li>
              <a href="#">Characters</a>
            </li>
            <li>
              <a href="#">Favorites</a>{" "}
              <span className="count_favorites">4</span>
            </li>
            <li>
              <a href="#">Locations</a>
            </li>
            <li>
              <a href="#">Episodes</a>
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

const App = () => {
  return (
    <>
      <NavBar />
      <div className="pageHome">
        <SiderbarFilter />
        <main className="main">
          <ListCharacters />
        </main>
      </div>
    </>
  );
};

export default App;
