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
import { useGetUsers } from "../api/get-users-api";
import Create from "@/assets/icons/create.svg?react";
import Spinner from "@/assets/icons/spinner.svg?react";
import { useNavigate } from "react-router-dom";

const Users = ({ data }) => {
  //   const { data: usersData, isLoading } = useGetUsers();
  //   const users = usersData?.data?.users;
  //   const navigate = useNavigate();

  const hanldeClick = () => {
    console.log("click");
    navigate("/dashboard/create");
  };
  return (
    <>
      <div className="flex">
        <Button
          onClick={hanldeClick}
          className="ml-auto mr-14 mt-4 border-2 hover:bg-white border-cyan-500 bg-slate-50 text-cyan-500"
        >
          <Create className="text-cyan-500  mr-1" /> Create
        </Button>
      </div>
      <Card className="bg-slate-300 mx-12 my-6">
        <Table className=" bg-white">
          <TableHeader>
            <TableRow>
              {/* {data.} */}
              <TableHead className="ps-4">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-center">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* <Spinner className="fa-spin" /> */}
            {!isLoading &&
              users &&
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-center">{user.point}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default Users;
