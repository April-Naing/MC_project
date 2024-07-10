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
import { useState } from "react";
import { formatDate } from "@/util/dateFormatter";
import Delete from "@/assets/icons/delete.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import { useGetPromotions } from "../api/get-promotions";
import CreatePromotion from "./CreatePromotion";
import EditPromotion from "./EditPromotion";
import DeletePromotion from "./DeletePromotion";
import Paginate from "@/components/shared/Paginate";

const Promotions = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [id, setId] = useState();
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const { data: promotionData, isLoading } = useGetPromotions({
    page,
    limit,
  });
  const promotions = promotionData?.data?.data?.promotions;
  const totalPromotions = promotionData?.data?.data?.totalPromotions;
  const totalPages = Math.ceil(totalPromotions / limit);

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
              <TableHead className="ps-4">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-center">Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              promotions &&
              promotions.map((promotion) => (
                <TableRow key={promotion._id}>
                  <TableCell className="font-medium">
                    {promotion.name}
                  </TableCell>
                  <TableCell>{promotion.description}</TableCell>
                  <TableCell>{promotion.code}</TableCell>
                  <TableCell>{promotion.amount} % </TableCell>
                  <TableCell>{formatDate(promotion.startDate)}</TableCell>
                  <TableCell>{formatDate(promotion.endDate)}</TableCell>
                  <TableCell className="text-center">
                    {promotion.discountPrice}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setOpenEditDialog(true);
                        setId(promotion._id);
                      }}
                      className="w-10 p-0 bg-cyan-500 hover:bg-cyan-400"
                    >
                      <Edit className="icon w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setOpenDeleteDialog(true), setId(promotion._id);
                      }}
                      className="w-10 p-0 bg-red-600 hover:bg-red-500"
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
        currentPage={currentPage}
        totalPages={totalPages}
        prevClickHandler={handlePrevPage}
        nextClickHandler={handleNextPage}
      />
      <CreatePromotion
        isOpen={openCreateDialog}
        setIsOpen={() => setOpenCreateDialog(false)}
      />
      <EditPromotion
        isOpen={openEditDialog}
        setIsOpen={() => setOpenEditDialog(false)}
        promotionId={id}
      />
      <DeletePromotion
        isOpen={openDeleteDialog}
        setIsOpen={() => setOpenDeleteDialog(false)}
        promotionId={id}
      />
    </>
  );
};

export default Promotions;
