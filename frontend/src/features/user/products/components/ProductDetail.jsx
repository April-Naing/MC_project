import { Button } from "@/components/ui/button";
import { useGetProductById } from "@/features/admin/products/api/get-products";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Add from "@/assets/icons/add.svg?react";
import Subtract from "@/assets/icons/subtract.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "@/store/counter-slice";
import { useCreateOrderItems } from "@/features/admin/order-items/api/create-order-items";
import { toast } from "react-toastify";
import { cartActions } from "@/store/cart-slice";
import { useGetMe } from "@/features/admin/users/api/get-users";
import { useCreateCartItems } from "../../Cart/api/create-cart-item";
import Back from "@/assets/icons/back.svg?react";

const ProductDetail = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  const counter = useSelector((state) => state.counter.counter);

  const { data: userData } = useGetMe();
  const user = userData?.data?.data?.user;

  const { id } = useParams();
  const { data: productData, isLoading } = useGetProductById(id);
  const product = productData?.data?.data?.product;
  console.log("product from detail", product);

  const discount = product?.discounts.find((d) => d.roleId === user?.role?._id);
  const discountedPrice = discount
    ? product.originalPrice * (1 - discount.discountPercentage / 100)
    : "";

  const addItemHandler = () => {
    dispatch(counterActions.add());
  };

  const removeItemHandler = () => {
    dispatch(counterActions.remove());
  };

  const { mutate: createCartItemMutation, isPending } = useCreateCartItems();

  const addToCartHandler = () => {
    const totalPrice = discountedPrice
      ? discountedPrice * counter
      : product?.originalPrice * counter;

    const data = {
      product: id,
      quantity: counter,
      price: totalPrice,
      user: user._id,
    };

    createCartItemMutation(data, {
      onSuccess: () => {
        toast.success("The product has added to the cart.");
      },
      onError: () => {
        toast.error("Fail to add product to the cart.Try Again later.");
      },
    });
  };

  return (
    <div className="mt-8">
      <Card className="mx-8 py-4 bg-neutral-100">
        <div className="ms-8">
          <Link to="/home#products">
            <Back className="icon w-4" />
          </Link>
        </div>
        {!isLoading && product && (
          <div className="block sm:flex justify-start md:justify-center pt-8">
            <div className="w-1/2 lg:w-1/3 m-auto md:mx-8">
              <img
                className="h-auto sm:w-96 rounded-md"
                src={`${baseURL}public/img/products/${product.image}`}
                alt={product.name}
              />
            </div>
            <div className="sm:ms-4 mt-4">
              <div className="me-6 text-center sm:text-left">
                <h2 className=" md:text-3xl">{product.name}</h2>
                <p className="my-4 md:text-lg">{product.description}</p>
                <div className="ms-4 sm:ms-0 w-auto border-solid border-slate-950 border-b-2"></div>
                <div className="my-4">
                  {discountedPrice ? (
                    <>
                      <span className="md:text-xl mx-2 line-through">
                        $ {product.originalPrice}
                      </span>
                      <span className="md:text-xl mx-2">
                        $ {discountedPrice}
                      </span>
                    </>
                  ) : (
                    <span className="md:text-xl mx-2">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex justify-center">
                  <Button className="mt-4 mx-4 bg-white border-solid border-2 border-teal-600 rounded-full hover:bg-white">
                    <button
                      onClick={removeItemHandler}
                      disabled={counter === 0}
                    >
                      <Subtract className="w-3 mx-2" />
                    </button>
                    <span className="text-slate-950 mx-3 text-lg">
                      {counter}
                    </span>
                    <button onClick={addItemHandler}>
                      <Add className="w-3 mx-2" />
                    </button>
                  </Button>
                  <Button
                    onClick={addToCartHandler}
                    disabled={counter === 0}
                    className="my-4 bg-teal-600 hover:bg-teal-700 md:w-full rounded-full"
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
