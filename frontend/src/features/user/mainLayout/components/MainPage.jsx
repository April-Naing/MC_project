import ProductsList from "../../products/routes/ProductsList";
import Promotions from "../../promotion/routes/Promotions";
import Footer from "./Footer";
import Home from "./Home";
const MainPage = () => {
  return (
    <>
      <Home />
      <ProductsList />
      <Promotions />
      <Footer />
    </>
  );
};

export default MainPage;
