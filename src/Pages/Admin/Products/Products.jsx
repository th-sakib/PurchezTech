import { useState } from "react";
import Button from "../../../Components/Button";
import Sidebar from "./Sidebar";

const Products = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  return (
    <div className="flex mt-4">
      <Button
        btnType="button"
        btnHandler={toggleSidebar}
        className="ml-auto mr-8"
      >
        Add Product
      </Button>
      <Sidebar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Products;
