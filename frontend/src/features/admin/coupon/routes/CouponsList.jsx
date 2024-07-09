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
import Create from "@/assets/icons/create.svg?react";
import CreateCoupon from "./CreateCoupon";
import { useState } from "react";
import { useGetCoupons } from "../api/get-coupon";
import { formatDate } from "@/util/dateFormatter";
import Delete from "@/assets/icons/delete.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import EditCoupon from "./EditCoupon";
import DeleteCoupon from "./DeleteCoupon";

const CouponsList = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [id, setId] = useState();

  const { data: couponsData, isLoading } = useGetCoupons();
  const coupons = couponsData?.data?.data?.coupons;
  return (
    <>
      <div className="flex">
        <Button
          onClick={() => setOpenCreateDialog(true)}
          className="ml-auto mr-14 mt-4 border-2 hover:bg-white border-cyan-500 bg-slate-50 text-cyan-500"
        >
          <Create className="text-cyan-500  mr-1" /> Create
        </Button>
      </div>
      <Card className="bg-slate-300 mx-12 my-6">
        <Table className=" bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="ps-4">Code</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="text-center">Discount Amount</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* <Spinner className="fa-spin" /> */}
            {!isLoading &&
              coupons &&
              coupons.map((coupon) => (
                <TableRow key={coupon._id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>{formatDate(coupon.startDate)}</TableCell>
                  <TableCell>{formatDate(coupon.endDate)}</TableCell>
                  <TableCell className="text-center">
                    {coupon.discountPrice}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setOpenEditDialog(true);
                        setId(coupon._id);
                      }}
                      className=" bg-cyan-500 hover:bg-cyan-400"
                    >
                      <Edit className="icon w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setOpenDeleteDialog(true), setId(coupon._id);
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
      <CreateCoupon
        isOpen={openCreateDialog}
        setIsOpen={() => setOpenCreateDialog(false)}
      />
      <EditCoupon
        isOpen={openEditDialog}
        setIsOpen={() => setOpenEditDialog(false)}
        couponId={id}
      />
      <DeleteCoupon
        isOpen={openDeleteDialog}
        setIsOpen={() => setOpenDeleteDialog(false)}
        couponId={id}
      />
    </>
  );
};

export default CouponsList;
