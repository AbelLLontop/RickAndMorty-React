import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";

import { loader as LoaderFiltersParams} from "../pages/App";
import App from "../pages/App";
import FavoritesPage from "../pages/FavoritesPage";
// const App = lazy(()=>import('../App'))


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children:[
            {
                // path:"/",
                index:true,
                // element:<Suspense fallback={<h1>DESCARGANDO PAGINA</h1>}><App /></Suspense> ,
                element:<App /> ,
               
                loader:LoaderFiltersParams
            },
            {
                path:'/favoritos',
                element:<FavoritesPage/>
            },
            {
                path: "*",
                element: <h1>404</h1>
            }
        ]
    }
])