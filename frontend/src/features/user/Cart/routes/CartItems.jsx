import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  useGetOrderItems,
  useGetOrderItemsByUser,
} from "@/features/admin/order-items/api/get-order-items";
import { useState, Fragment } from "react";
import { useGetCartItemsByUser } from "../api/get-cart-item";
import Delete from "@/assets/icons/cross.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import DeleteCartItem from "./DeleteCartItem";
import { Link } from "react-router-dom";
import { useGetMe } from "@/features/admin/users/api/get-users";

const CartItems = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState();

  const baseURL = import.meta.env.VITE_API_URL;

  const { data: cartItemsDataByUser, isLoading } = useGetCartItemsByUser();
  const cartItems = cartItemsDataByUser?.data?.data;

  const { data: userData } = useGetMe();
  const userRoleId = userData?.data?.data?.user?.role?._id;

  return (
    <div className="mt-4">
      <Table className="w-10/12 md:w-11/12 ms-12 ">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow className="border-b-2 border-b-teal-700 hover:bg-white">
            <TableHead className="w-[100px] text-lg text-teal-700">
              Product
            </TableHead>
            <TableHead className="text-lg text-teal-700"></TableHead>
            <TableHead className="text-lg text-teal-700">Price</TableHead>
            <TableHead className="text-lg text-teal-700">Quantity</TableHead>
            <TableHead className="text-lg text-teal-700">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b-2 border-b-teal-700">
          {!isLoading &&
            cartItems &&
            cartItems.map((cartItem) => {
              let discountedPrice = cartItem.product.originalPrice;
              let hasDiscount = false;

              cartItem.product.discounts?.forEach((d) => {
                if (d.roleId === userRoleId) {
                  discountedPrice =
                    cartItem.product.originalPrice *
                    (1 - d.discountPercentage / 100);
                  hasDiscount = true;
                }
              });
              return (
                <Fragment key={cartItem._id}>
                  <TableRow className="border-none hover:bg-white">
                    <TableCell>
                      <img
                        src={`${baseURL}public/img/products/${cartItem.product.image}`}
                        alt={cartItem.product.name}
                        className="w-16 h-16 object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {cartItem.product.name}
                      <div className="text-sm text-gray-600">
                        {cartItem.product.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      {hasDiscount
                        ? discountedPrice
                        : cartItem.product.originalPrice}
                    </TableCell>
                    <TableCell>{cartItem.quantity}</TableCell>
                    <TableCell>
                      {hasDiscount
                        ? (discountedPrice * cartItem.quantity).toFixed(2)
                        : cartItem.product.originalPrice * cartItem.quantity}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-b-2 border-b-teal-700 hover:bg-white">
                    <TableCell className="">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-none hover:bg-white me-4"
                        onClick={() => {
                          setOpenDeleteDialog(true), setId(cartItem._id);
                        }}
                      >
                        <Delete className="icon w-4 me-2" /> Delete
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Link to={`/home/product/${cartItem.product._id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-none  hover:bg-white"
                        >
                          <Edit className="icon w-4 me-2 text-teal-700" />
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
        </TableBody>
      </Table>
      <DeleteCartItem
        isOpen={openDeleteDialog}
        setIsOpen={() => setOpenDeleteDialog(false)}
        cartItemId={id}
      />
    </div>
  );
};

export default CartItems;
