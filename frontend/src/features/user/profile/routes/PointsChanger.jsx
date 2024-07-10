import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetCoupons } from "@/features/admin/coupon/api/get-coupon";
import { formatDate } from "@/util/dateFormatter";
import { useState } from "react";
import ExchangeCoupon from "./ExchangeCoupon";

const PointChanger = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState();
  const [point, setPoint] = useState();

  const { data, isLoading } = useGetCoupons();
  const coupons = data?.data?.data?.coupons;

  return (
    <div className="ms-10 w-auto m-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 p-2 ">
        {!isLoading &&
          coupons.map((coupon) => (
            <Card className="mt-4 shadow-lg" key={coupon._id}>
              <CardHeader>
                <CardTitle>{coupon.discountPrice}% OFF</CardTitle>
                <CardDescription>on purchase</CardDescription>
                <h3 className="font-semibold">Code : {coupon.code}</h3>
              </CardHeader>
              <CardContent>
                <span>Point : {coupon.points} </span>
                <span className="block">
                  Exp Date : {formatDate(coupon.endDate)}
                </span>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={() => {
                    setOpenDialog(true),
                      setId(coupon._id),
                      setPoint(coupon.points);
                  }}
                  className="bg-teal-800 hover:bg-teal-700"
                >
                  Buy
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
      <ExchangeCoupon
        isOpen={openDialog}
        setIsOpen={() => setOpenDialog(false)}
        couponId={id}
        points={point}
      />
    </div>
  );
};

export default PointChanger;
