import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetProducts } from "@/features/admin/products/api/get-products";
import { Element } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetUser } from "../../profile/api/get-user";

export default function ProductsList() {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const { data: userData } = useGetUser();
  const userRoleId = userData?.data?.data?.user?.role?._id;

  const { data: productsData, isLoading } = useGetProducts({});
  const products = productsData?.data?.data?.products;

  const handleClick = () => {
    navigate("product");
  };

  return (
    <Element name="products" id="products" className="section">
      <div className="h-auto mt-16">
        <div className="text-center text-3xl text-teal-800 font-semibold my-8">
          <h1>Explore the collection</h1>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full sm:max-w-sm md:max-w-3xl lg:max-w-6xl m-auto px-0 my-4"
        >
          <CarouselContent>
            {!isLoading &&
              products &&
              products.map((product, index) => {
                let discountedPrice = product.originalPrice;
                let hasDiscount = false;

                product.discounts.forEach((d) => {
                  if (d.roleId._id === userRoleId) {
                    discountedPrice =
                      product.originalPrice * (1 - d.discountPercentage / 100);
                    hasDiscount = true;
                  }
                });

                return (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                      <Card className="border-none shadow-none">
                        <CardContent className="aspect-square">
                          <div className="group/item relative">
                            <img
                              className="mt-4 rounded-md"
                              src={`${baseURL}public/img/products/${product.image}`}
                              alt={product.name}
                            />
                            <div className="p-1 group/edit invisible group-hover/item:visible absolute bottom-0 text-center bg-neutral-200 opacity-60 w-full">
                              <Link to={`home/product/${product._id}`}>
                                <button
                                  onClick={handleClick}
                                  className="text-teal-950 font-semibold text-md"
                                >
                                  Quick view
                                </button>
                              </Link>
                            </div>
                          </div>
                          <h2 className="font-semibold my-2">
                            {product.name.toUpperCase()}
                          </h2>
                          <p className="my-2">{product.description}</p>
                          {hasDiscount ? (
                            <React.Fragment>
                              <span className="font-semibold my-2 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                              <span className="ms-4 font-semibold my-2">
                                ${discountedPrice.toFixed(2)}
                              </span>
                            </React.Fragment>
                          ) : (
                            <span className="font-semibold my-2">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Element>
  );
}
