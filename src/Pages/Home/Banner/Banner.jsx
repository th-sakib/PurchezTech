import Button from "../../../Components/Button";

const Banner = () => {
  return (
    <div className="flex justify-center items-center my-5 max-w-screen-lg  mx-auto ">
      {/* first section */}
      <div className="w-full">
        <h1 className="text-6xl mb-10">Easy Buy Tech & Accessories</h1>
        <p className="w-9/12 text-justify mb-10">
          There has never been a simpler way to buy tech accessories than with
          Purcheztech. We understand the importance of having access to
          reliable, high-quality technology products, whether it's for work,
          gaming, or staying connected. That,s why we,ve built a platform that
          makes shopping for the latest tech as easy as possible.
        </p>

        <Button shopNow>Shop now</Button>
      </div>
      {/* last section */}
      <div className="w-7/12 h-96 bg-red-950"></div>
    </div>
  );
};

export default Banner;
