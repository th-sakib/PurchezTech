import errorRobo from "../assets/images/error-page.png";

const NoProduct = ({ textContent, className }) => {
  return (
    <div className="flex flex-col justify-center items-center font-mono text-black selection:bg-accent-color/30">
      <div className="">
        <img
          className="h-40"
          src={errorRobo}
          alt="Error page image not found"
        />
      </div>
      {/* texts  */}
      <div className="leading-10 text-center">
        <h1 className="text-4xl uppercase font-josefin_sans font-bold">
          {textContent ? (
            <>
              <span className="text-red-500">No</span> {textContent}
            </>
          ) : (
            <>
              <span className="text-red-500">No</span> Product found
            </>
          )}
        </h1>
      </div>
    </div>
  );
};

export default NoProduct;
