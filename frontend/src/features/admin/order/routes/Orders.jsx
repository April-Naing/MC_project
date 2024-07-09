import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrders } from "../api/get-orders";
import Create from "@/assets/icons/create.svg?react";
import Delete from "@/assets/icons/delete.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import View from "@/assets/icons/view.svg?react";
import { useState } from "react";
import DeleteOrder from "./DeleteOrder";
import Paginate from "@/components/shared/Paginate";

const Orders = () => {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState();

  const limit = 5;
  const { data: ordersData, isLoading } = useGetOrders({ page, limit });

  const orders = ordersData?.data?.data?.orders;
  const totalOrders = ordersData?.data?.data?.totalOrders;
  const totalPages = Math.ceil(totalOrders / limit);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setPage(page + 1);
    }
  };
  return (
    <>
      <Card className="bg-slate-300 mx-12 my-6 ">
        <Table className=" bg-white">
          <TableHeader className="">
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead className="ps-4">OrderItems</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              orders &&
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">
                    {order.user?.name}
                  </TableCell>
                  <TableCell>
                    {order.orderItems?.map((item) => (
                      <ul className=" list-disc" key={item._id}>
                        <li>{item.product.name}</li>
                      </ul>
                    ))}
                  </TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setOpenDeleteDialog(true), setId(order._id);
                      }}
                      className=" bg-red-600 hover:bg-red-500"
                    >
                      <Delete className="icon w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>

      <Paginate
        prevClickHandler={handlePrevPage}
        nextClickHandler={handleNextPage}
        currentPage={currentPage}
        page={page}
        totalPages={totalPages}
      />

      <DeleteOrder
        isOpen={openDeleteDialog}
        setIsOpen={() => setOpenDeleteDialog(false)}
        orderId={id}
      />
    </>
  );
};

export default Orders;
