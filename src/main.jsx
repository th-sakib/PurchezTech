import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <div className={`mx-auto font-josefin_sans text-[#1A1819]`}> 
        {/* text-[#393D46] */}
        {/* TODO: remove max-w-screen-xl from footer */}
            <RouterProvider router={router} />
        </div>
    </StrictMode>
);
