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
import { useGetProducts } from "../api/get-products";
import Create from "@/assets/icons/create.svg?react";
import { useState } from "react";
import Edit from "@/assets/icons/edit.svg?react";
import Delete from "@/assets/icons/delete.svg?react";
import EditProduct from "./EditProduct";
import CreateProduct from "./CreateProduct";
import DeleteProduct from "./Deleteproduct";
import Paginate from "@/components/shared/Paginate";

const Products = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const [process, setProcess] = useState();
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [id, setId] = useState();
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const { data: productsData, isLoading } = useGetProducts({ page, limit });
  const products = productsData?.data?.data?.products;

  const totalProducts = productsData?.data?.data?.totalProducts;
  const totalPages = Math.ceil(totalProducts / limit);

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
      <div className="flex">
        <Button
          onClick={() => {
            setCreateDialog(true);
          }}
          className="ml-auto mr-14 mt-4 border-2 hover:bg-white border-cyan-500 bg-slate-50 text-cyan-500"
        >
          <Create className="text-cyan-500  mr-1" /> Create
        </Button>
      </div>
      <Card className="bg-slate-300 mx-12 my-6">
        <Table className=" bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="ps-4">Name</TableHead>
              <TableHead className="ps-4">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount-Role</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              products &&
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img
                      className="w-20"
                      src={`${baseURL}public/img/products/${product.image}`}
                      alt={product.name}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.originalPrice}</TableCell>
                  <TableCell className="">
                    {product.discounts?.map((d) => (
                      <ul key={d._id}>
                        <li>
                          {d.discountPercentage}% for {d.roleId.role}
                        </li>
                      </ul>
                    ))}
                    {product.discountAmount}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setEditDialog(true);
                        setProcess("edit");
                        setId(product._id);
                      }}
                      className=" bg-cyan-500 hover:bg-cyan-400"
                    >
                      <Edit className="icon w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setDeleteDialog(true), setId(product._id);
                      }}
                      className=" bg-red-500 hover:bg-red-400"
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
        page={page}
        totalPages={totalPages}
        currentPage={currentPage}
        prevClickHandler={handlePrevPage}
        nextClickHandler={handleNextPage}
      />
      <EditProduct
        isOpen={editDialog}
        process={process}
        productId={id}
        setIsOpen={() => setEditDialog(false)}
      />
      <CreateProduct
        isOpen={createDialog}
        setIsOpen={() => setCreateDialog(false)}
      />
      <DeleteProduct
        isOpen={deleteDialog}
        productId={id}
        setIsOpen={() => setDeleteDialog(false)}
      />
    </>
  );
};

export default Products;
