import React from "react";
import AddProductForm from "./AddProductForm";

const Sidebar = ({
  isOpenSidebar,
  toggleSidebar,
  setIsOpenSidebar,
  isEditMode,
  setIsEditMode,
}) => {
  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input
          id="my-drawer-4"
          type="checkbox"
          checked={isOpenSidebar}
          onChange={toggleSidebar}
          className="drawer-toggle"
        />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <AddProductForm
              isOpenSidebar={isOpenSidebar}
              setIsOpenSidebar={setIsOpenSidebar}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
