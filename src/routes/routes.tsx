import { createHashRouter} from "react-router-dom";
import Layout from "@/pages/Layout";
import App, { loader as LoaderFiltersParams} from "@/pages/App";
import FavoritesPage from "@/pages/FavoritesPage";
import CharacterPage from '@/pages/CharacterPage';
import EpisodePage from "@/pages/EpisodePage";

export const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        children:[
            {
                index:true,
                element:<App /> ,
               
                loader:LoaderFiltersParams
            },
            {
                path:'/favoritos',
                element:<FavoritesPage/>
            },
            {
                path:"/character/:id",
                element:<CharacterPage/>
            },
            {
                path:"/episode/:id",
                element:<EpisodePage/>
            },
            {
                path: "*",
                element: <h1>404</h1>
            }
        ]
    }
])