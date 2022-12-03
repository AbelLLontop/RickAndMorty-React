import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./styles/index.css";
import "./styles/App.css";
import "./styles/Card.css";
import "./styles/Skleton.css";
import "./styles/Navbar.css";
import "./styles/Sidebar.css";
import { store } from "@/redux/store";
import { router } from "@/routes/routes";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <RouterProvider router={router}/>
    {/* </React.StrictMode> */}
  </Provider>
);
