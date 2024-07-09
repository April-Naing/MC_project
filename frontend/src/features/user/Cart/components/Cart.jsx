import CartItems from "../routes/CartItems";
import Summary from "./Summary";

const Cart = () => {
  return (
    <div className="mt-8">
      <h1 className="text-2xl text-teal-700 font-semibold ms-16">YOUR CART</h1>
      <div className="md:flex">
        <div className="md:w-2/3">
          <CartItems />
        </div>
        <div className="md:w-1/3">
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
