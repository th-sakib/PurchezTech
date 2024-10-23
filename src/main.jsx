import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className={`mx-auto font-josefin_sans text-textC `}>
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
