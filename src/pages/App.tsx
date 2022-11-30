import { LoaderFunction } from "react-router-dom";
import { SidebarFilter ,ListCharacters} from "@/components";

export interface ILoaderParams{
  status: string;
  species: string;
  gender:string;
  name:string;
}

export const loader:LoaderFunction= async ({request,params})=>{
  const url = new URL(request.url);
  const status = url.searchParams.get('status')||'';
  const species = url.searchParams.get('species')||'';
  const gender = url.searchParams.get('gender')||'';
  const name = url.searchParams.get('name')||'';

  return {
    status,
    species,
    gender,
    name
  }
  
}

const App = () => {
  return (
      <div className="pageHome">
        <SidebarFilter />
        <main className="main">
          <ListCharacters />
        </main>
      </div>
  );
};

export default App;
