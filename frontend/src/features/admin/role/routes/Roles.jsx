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
import Delete from "@/assets/icons/delete.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import { useState } from "react";
import { useGetRoles } from "../api/get-role";
import CreateRole from "./CreateRole";
import DeleteRole from "./DeleteRole";
import EditRole from "./EditRole";
import Paginate from "@/components/shared/Paginate";

const Roles = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState();

  const handleCreateClick = () => {
    setOpenCreateDialog(true);
  };

  const handleEditClick = (id) => {
    setOpenEditDialog(true);
    setId(id);
  };

  const handleDeleteClick = (id) => {
    setOpenDeleteDialog(true);
    setId(id);
  };

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { data: rolesData, isLoading } = useGetRoles({ page, limit });
  const roles = rolesData?.data?.data?.userRoles;
  const totalRoles = rolesData?.data?.data?.totalRoles;
  const totalPages = Math.ceil(totalRoles / limit);

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
          onClick={handleCreateClick}
          className="ml-auto mr-14 mt-4 border-2 hover:bg-white border-cyan-500 bg-slate-50 text-cyan-500"
        >
          <Create className="text-cyan-500  mr-1" /> Create
        </Button>
      </div>
      <Card className="bg-slate-300 mx-12 my-6 ">
        <Table className=" bg-white">
          <TableHeader className="">
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead className="ps-4">Min Point</TableHead>
              <TableHead>Point Multiplier</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              roles &&
              roles.map((role) => (
                <TableRow key={role._id}>
                  <TableCell className="font-medium">{role.role}</TableCell>
                  <TableCell>{role.minPoint}</TableCell>
                  <TableCell>{role.pointMultiplier}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleEditClick(role._id);
                      }}
                      className=" bg-cyan-500 hover:bg-cyan-400"
                    >
                      <Edit className="icon w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteClick(role._id)}
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
        page={page}
        currentPage={currentPage}
        totalPages={totalPages}
        prevClickHandler={handlePrevPage}
        nextClickHandler={handleNextPage}
      />
      <CreateRole isOpen={openCreateDialog} setIsOpen={setOpenCreateDialog} />
      <DeleteRole
        isOpen={openDeleteDialog}
        setIsOpen={setOpenDeleteDialog}
        roleId={id}
      />
      <EditRole
        isOpen={openEditDialog}
        setIsOpen={setOpenEditDialog}
        roleId={id}
      />
    </>
  );
};

export default Roles;
