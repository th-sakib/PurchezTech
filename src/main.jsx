import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route";
import { Provider } from "react-redux";
import store from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className={`font-josefin_sans text-primary-color `}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  </StrictMode>
);
