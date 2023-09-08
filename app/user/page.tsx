"use client";
import React, { useEffect, useState } from "react";
import { UsersArray } from "@/types/api/tasks";
import { DataTable } from "@/components/data-tables/user-table/data-table";
import { columns } from "@/components/data-tables/user-table/columns";

const UserTable: React.FC = ({ }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<UsersArray>([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    // Check and see if tableData state is not empty
    if (tableData.length > 0) {
      console.log("useEffect - client site tableData state update from UI.");
      setIsLoading(true);
      setIsLoading(false);
      // tableData state is empty, therefore we need to fetch data from the API.
    } else {
      console.log("useEffect - update tableData state from API.");
      setIsLoading(true);

      fetchData()
        .then((apiData) => {
          console.log(apiData);
          setTableData(apiData.user_data);
          setRowCount(apiData.length);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      setIsLoading(false);
    }
    // }
    // Call the fetchData function when the component mounts
  }); // The empty dependency array ensures this effect runs once, similar to componentDidMount

  const fetchData = async () => {
    const response = await fetch(
      "/api/v1/get-users"
    );
    const data = await response.json();
    console.log(response.status, response.url);
    return data;
  };

  // const updateValues = (data: UsersArray) => {
  //   for (const key in data) {
  //     setTableData((prevItems) => [...prevItems, data[key]]);
  //   }
  // };
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

export default UserTable;
