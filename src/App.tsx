import ListCharacters from "./components/ListCharacters";
import { NavBar } from "./components/Navbar";
import { SiderbarFilter } from "./components/SiderBarFilter";

const App = () => {
  return (
      <div className="pageHome">
        <SiderbarFilter />
        <main className="main">
          <ListCharacters />
        </main>
      </div>
  );
};

export default App;
