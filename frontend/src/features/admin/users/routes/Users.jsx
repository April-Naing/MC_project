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
import { useGetUsers } from "../api/get-users";
import Create from "@/assets/icons/create.svg?react";
import Delete from "@/assets/icons/delete.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import DeleteUser from "./DeleteUser";
import { useState } from "react";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import Paginate from "@/components/shared/Paginate";

const Users = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState();

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const { data: usersData, isLoading } = useGetUsers({ page, limit });
  const users = usersData?.data?.users;
  const totalUsers = usersData?.data?.totalUsers;
  const totalPages = Math.ceil(totalUsers / limit);

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
            setOpenCreateDialog(true);
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
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-center">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              users &&
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role?.role}</TableCell>
                  <TableCell className="text-center">{user.point}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setOpenEditDialog(true);
                        setId(user._id);
                      }}
                      className="w-10 p-0 bg-cyan-500 hover:bg-cyan-400"
                    >
                      <Edit className="icon w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setOpenDeleteDialog(true), setId(user._id);
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
      <DeleteUser
        isOpen={openDeleteDialog}
        setIsOpen={() => setOpenDeleteDialog(false)}
        userId={id}
      />
      <CreateUser
        isOpen={openCreateDialog}
        setIsOpen={() => setOpenCreateDialog(false)}
      />
      <EditUser
        isOpen={openEditDialog}
        setIsOpen={() => setOpenEditDialog(false)}
        userId={id}
      />
    </>
  );
};

export default Users;
