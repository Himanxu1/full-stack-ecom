import React, { useEffect, useState } from 'react'
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
} from "@material-tailwind/react";
import useTableData from '../utils/useTableData';
 
const TABLE_HEAD = ["Member", "username", "Role", "ID"];

const Profile = () => {
const [searchUser,setSearchUsers] = useState([])
const [filteredTableData,setFilteredTableData]= useState([])

  const users = useTableData(setFilteredTableData);
  const filterData = (users, searchUser) => {
    const list = users.filter((product) =>
      product.username.toLowerCase().includes(searchUser.toLowerCase())
    );

    setFilteredTableData(list);
  };

  useEffect(()=>{
  filterData(users,searchUser)
  },[searchUser])

 

  return    (
    <div>
         <Card className="h-full w-full ml-10 mt-2">
      <CardHeader floated={false} shadow={false} className="rounded-none"> 
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e)=>setSearchUsers(e.target.value)}
              />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden px-0 ">
        <table className="mt-4 ml-4 w-[900px] min-w-max table-auto text-left ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTableData.map(
              ({ role, username, email,_id }, index) => {
                const isLast = index === filteredTableData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={username}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                      <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {username}
                          </Typography>
                       
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={role}
                          color={role =='user' ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {_id}
                      </Typography>
                    </td>
                  
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 7
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Profile


 
 

 
 