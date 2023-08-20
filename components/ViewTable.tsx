"use client";
import { TasksArray } from "@/types/api/tasks";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface ViewTableProps {
  updatedFormData: {};
}

const ViewTable: React.FC<ViewTableProps> = ({ updatedFormData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<TasksArray>([]);
  const [rowCount, setRowCount] = useState(0);
  const staticRowCount = Array.from({ length: rowCount }, (_, index) => index);
  useEffect(() => {
    console.log("useEffect called");
    setIsLoading(true);
    // Define an asynchronous function to fetch your data
    // if (formSubmitted) {

    fetchData()
      .then((apiData) => {
        setTableData(apiData);
        setRowCount(apiData.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setIsLoading(false);
    // }
    // Call the fetchData function when the component mounts
  }, [updatedFormData]); // The empty dependency array ensures this effect runs once, similar to componentDidMount

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/api/v1/get-tasks");
    const data = await response.json();
    const valuesList = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        valuesList.push(element);
      }
    }
    return valuesList;
  };

  return (
    <>
      {isLoading ? (
        <Table>
          <TableCaption>List of tasks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Task ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Assigned to</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staticRowCount.map((index) => (
              <TableRow>
                {Array.from({length:7}).map((index) => (
                  <TableCell className="font-medium">
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableCaption>List of tasks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Task ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Assigned to</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData!.map((data) => (
              <TableRow key={data.task_id}>
                <TableCell className="font-medium">{data.task_id}</TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{data.due_date}</TableCell>
                <TableCell>{data.user_id}</TableCell>
                <TableCell>{data.task_category_name}</TableCell>
                <TableCell>{data.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default ViewTable;
