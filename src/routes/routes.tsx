import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "@/components/ui/Layout";
import App from "@/pages/App";
import FavoritesPage from "@/pages/FavoritesPage";
import CharacterPage from "@/pages/CharacterPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <App />,
            },
            {
                path: "favorites",
                element: <FavoritesPage />,
            },
            {
                path: "character/:id",
                element: <CharacterPage />,
            },
            {
                path: "favoritos",
                element: <Navigate to="/favorites" replace />,
            },
            {
                path: "*",
                element: (
                    <div className="flex flex-col items-center justify-center py-20">
                        <h1 className="text-9xl font-black text-slate-200">404</h1>
                        <p className="text-xl text-slate-500 mt-4">Wubba Lubba Dub Dub! Page not found.</p>
                    </div>
                ),
            },
        ],
    },
]);