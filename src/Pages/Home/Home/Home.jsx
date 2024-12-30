import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import CustomerSupports from "../CustomerSupports/CustomerSupports";
import NewlyArrivals from "../NewlyArrivals/NewlyArrivals";

const Home = () => {
  return (
    <div className="container mx-auto px-2">
      {/* bg-gradient-to-b from-backgroundC to-white */}
      <div className="relative overflow-hidden bg-background-color">
        <Banner />
      </div>
      <Categories className="my-4" />
      <NewlyArrivals className="my-4" />
      <CustomerSupports />
    </div>
  );
};

export default Home;
