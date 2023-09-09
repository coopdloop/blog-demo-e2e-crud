"use client";
import React, { useState } from "react";
import { TasksArray } from "@/types/api/tasks";
import ViewTable from "@/components/ViewTable";

export default function TaskTableView() {
  const [submittedData, setSubmittedData] = useState<TasksArray>([]);

  return (
    <div className="container h-screen">
      <ViewTable updatedFormData={submittedData} />
    </div>
  );
}
