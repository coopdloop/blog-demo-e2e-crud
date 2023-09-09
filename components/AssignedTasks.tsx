"use client";
import React, { useEffect, useState } from "react";
import { TasksArray } from "@/types/api/tasks";
import { DataTable } from "@/components/data-tables/assigned-tasks/data-table";
import { columns } from "@/components/data-tables/assigned-tasks/columns";
interface AssignedTasksProps {
  updatedFormData: TasksArray;
}

const AssignedTasks: React.FC<AssignedTasksProps> = ({ updatedFormData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<TasksArray>([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    // Check and see if tableData state is not empty
    if (tableData.length > 0) {
      console.log("useEffect - client site tableData state update from UI.");
      setIsLoading(true);
      setRowCount(rowCount + 1);
      updateValues(updatedFormData);
      setIsLoading(false);
      // tableData state is empty, therefore we need to fetch data from the API.
    } else {
      console.log("useEffect - update tableData state from API.");
      setIsLoading(true);

      fetchData()
        .then((apiData) => {
          updateValues(apiData);
          setRowCount(apiData.length);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      setIsLoading(false);
    }
    // }
    // Call the fetchData function when the component mounts
  }, [updatedFormData]); // The empty dependency array ensures this effect runs once, similar to componentDidMount

  const fetchData = async () => {
    const myUserData = await fetch("/api/v1/me");
    const myUser = await myUserData.json();
    // assume one user in request
    const response = await fetch(
      `/api/v1/get-tasks?user_id=${myUser[0].user_id}`
    );
    const data = await response.json();
    console.log(response.status, response.url);
    return data;
  };

  const updateValues = (data: TasksArray) => {
    for (const key in data) {
      setTableData((prevItems) => [...prevItems, data[key]]);
    }
  };
  return (
    <>
      {isLoading ? (
        <DataTable columns={columns} data={[]} />
      ) : (
        <DataTable columns={columns} data={tableData} />
      )}
    </>
  );
};

export { AssignedTasks };
