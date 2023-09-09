"use client";
import { TasksArray } from "@/types/api/tasks";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-tables/table-tasks/data-table";
import { columns } from "@/components/data-tables/table-tasks/columns";

export default function Page({ params }: { params: { slug: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<TasksArray>([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    // Check and see if tableData state is not empty
    if (tableData.length > 0) {
      console.log("useEffect - client site tableData state update from UI.");
      setIsLoading(true);
      setRowCount(rowCount + 1);
      //   updateValues(tableData);
      setIsLoading(false);
      // tableData state is empty, therefore we need to fetch data from the API.
    } else {
      console.log("useEffect - update tableData state from API.");
      setIsLoading(true);

      fetchData()
        .then((apiData) => {
          console.log(apiData);
          setTableData([apiData[0]]);
          //   updateValues(apiData);
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
    console.log(params.slug);
    const response = await fetch(
      `/api/v1/get-task/${params.slug}`
    );
    const data = await response.json();
    console.log(response.status, response.url);
    return data;
  };

  //   const updateValues = (data: TasksArray) => {
  //     for (const key in data) {
  //       setTableData([data[key]]);
  //     }
  //   };
  return (
    <div className="container h-screen">
      {isLoading ? (
        <DataTable columns={columns} data={[]} />
      ) : (
        <DataTable columns={columns} data={tableData} />
      )}
    </div>
  );
}
