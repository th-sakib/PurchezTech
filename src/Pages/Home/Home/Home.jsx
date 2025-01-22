import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import CustomerSupports from "../CustomerSupports/CustomerSupports";
import NewlyArrivals from "../NewlyArrivals/NewlyArrivals";
import PopularProducts from "../PopularProducts/PopularProducts";

const Home = () => {
  return (
    <>
      {/* meta tag start  */}
      <title>Buy the Best Tech Products Online | PurchezTech</title>
      <meta
        name="description"
        content="Explore PurchezTech, your ultimate destination for the latest tech gadgets and accessories. Shop smart with unbeatable deals, fast shipping, and top-notch customer support. Upgrade your tech game today!"
      />
      <meta
        name="keywords"
        content="E-commerce, technology, online shopping, tech gadgets, Purcheztech, PurchEZTech, React, JavaScript"
      />
      <meta name="author" content="TH Sakib" />
      <link rel="author" href="https://plus.google.com/{{googlePlusId}}" />
      <link rel="canonical" href="https://purcheztech.onrender.com/" />
      {/* meta tag end  */}

      <div className="mx-auto px-2 xs:px-0 xs:max-w-[88%] bannerMd:max-w-[78%] lg:max-w-[80%] xl:max-w-[1200px]">
        {/* bg-gradient-to-b from-backgroundC to-white */}
        <div className="relative overflow-hidden bg-background-color">
          <Banner />
        </div>
        <Categories className="my-4" />
        <NewlyArrivals className="my-4" />
        <PopularProducts className="my-4" />
        <CustomerSupports />
      </div>
    </>
  );
};

export default Home;
