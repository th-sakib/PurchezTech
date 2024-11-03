import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";

const Home = () => {
  return (
    <>
      {/* bg-gradient-to-b from-backgroundC to-white */}
      <div className="relative overflow-hidden bg-background-color">
        <Banner />
      </div>
      <Categories className="my-4 max-w-screen-sm md:max-w-screen-xl mx-auto" />
    </>
  );
};

export default Home;
