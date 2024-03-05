import { YellowCircleLoaderIcon } from "../../assets";

const YellowLoader = () => {
  return (
    <img
      src={YellowCircleLoaderIcon}
      alt="loader"
      className="my-2 animate-spin-anti-clockwise"
    />
  );
};

export default YellowLoader;
