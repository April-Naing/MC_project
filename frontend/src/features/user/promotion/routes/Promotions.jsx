import { Element } from "react-scroll";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetPromotions } from "@/features/admin/promotion/api/get-promotions";
import Promotion from "@/assets/icons/promotion.svg?react";
import { Button } from "@/components/ui/button";
import { useGetUser } from "../../profile/api/get-user";
import { useCreateUserPromotion } from "../api/create-user-promotion";
import { toast } from "react-toastify";
import { useGetUserPromotionByUser } from "../api/get-user-promotion";
import Bell from "@/assets/icons/bell.svg?react";

const Promotions = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const date = currentDate.toISOString();
  const { data: promotionData, isLoading: isGettingData } = useGetPromotions({
    date,
  });
  const promotions = promotionData?.data?.data?.promotions;

  const { data: userData } = useGetUser();
  const user = userData?.data?.data?.user;

  const { data: userPromotionData } = useGetUserPromotionByUser();
  const userPromotions = userPromotionData?.data?.data;

  const { mutate: createUserPromoMutation } = useCreateUserPromotion();

  const claimHandler = (id) => {
    const samePromotion = userPromotions?.find(
      (userPromotion) => userPromotion.promotion._id === id
    );

    if (samePromotion) {
      toast.error("You have already claimed this coupon.");
    } else {
      const data = {
        user: user?._id,
        promotion: id,
      };
      createUserPromoMutation(data, {
        onSuccess: () => {
          toast.success("Promotion coupon has claimed!");
        },
        onError: () => {
          toast.error("Cannot claim the coupon");
        },
      });
    }
  };

  return (
    <Element name="promotions" id="promotions" className="section">
      <div className="my-4 ">
        <h1 className="text-center text-3xl text-teal-800 font-semibold">
          Get Promotion
        </h1>
      </div>
      {!isGettingData && promotions?.length > 0 && (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full sm:max-w-sm md:max-w-3xl lg:max-w-6xl m-auto px-0 my-4"
        >
          <CarouselContent>
            {promotions.map((promotion) => (
              <CarouselItem
                key={promotion._id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="text-neutral-300 bg-teal-800 rounded-sm items-center justify-center p-4">
                      <h1 className="text-xl font-semibold flex">
                        {promotion.name}
                        <Promotion className="icon w-4 ms-2" />
                      </h1>
                      <h3 className="font-semibold my-2">
                        Code : {promotion.code}
                      </h3>
                      <h3>{promotion.description}</h3>
                      <div className="my-2">
                        <span>Get promotion and make your days better.</span>
                      </div>
                      <Button
                        className="bg-neutral-300 text-teal-950 mt-4 hover:bg-neutral-200"
                        onClick={() => claimHandler(promotion._id)}
                      >
                        Claim Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
      {promotions?.length === 0 && (
        <Card className="w-1/2 bg-teal-800 rounded-sm m-auto my-8">
          <CardHeader>
            <CardTitle className="flex justify-center text-neutral-300">
              <Bell className="icon w-6 mr-2" />
              Coming Soon
            </CardTitle>
            <CardDescription className="text-xl text-neutral-300 py-4">
              There is no available promotion now yet. We will come with more
              big promotions soon.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </Element>
  );
};

export default Promotions;
