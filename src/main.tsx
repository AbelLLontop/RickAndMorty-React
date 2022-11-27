import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { fetchCharacters } from "./redux/features/characters/charactersSlice";
import { store } from "./redux/store";
import { router } from "./routes/routes";

store.dispatch(fetchCharacters());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
    <RouterProvider router={router}/>
    </React.StrictMode>
  </Provider>
);
