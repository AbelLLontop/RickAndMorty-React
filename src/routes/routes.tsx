import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";

import {lazy,Suspense} from 'react'
import { loader as LoaderSiderBarFilter} from "../components/ListCharacters";
import App from "../App";
// const App = lazy(()=>import('../App'))


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children:[
            {
                index:true,
                // element:<Suspense fallback={<h1>DESCARGANDO PAGINA</h1>}><App /></Suspense> ,
                element:<App /> ,
                loader:LoaderSiderBarFilter
            },
            {
                path: "*",
                element: <h1>404</h1>
            }
        ]
    }
])