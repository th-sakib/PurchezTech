import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route";
import { Provider } from "react-redux";
import store from "./redux/store";

function Main() {
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <meta name="author" content="TH Sakib" />
    <meta
      name="keywords"
      content="E-commerce, technology, online shopping, tech gadgets, Purcheztech, PurchEZTech, React, JavaScript"
    />
    <meta
      name="description"
      content="Explore PurchEZtech, your ultimate destination for the latest tech gadgets and e-commerce deals. Shop with ease and enjoy top-notch customer support!"
    />
    <title>PurchezTech</title>

    <div className={`font-josefin_sans text-primary-color `}>
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  </StrictMode>
);
