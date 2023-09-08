"use client";
import React, { useState } from "react";
import { TasksArray } from "@/types/api/tasks";
import ViewTable from "@/components/ViewTable";

export default function TaskTableView() {
  const [submittedData, setSubmittedData] = useState<TasksArray>([]);

  return (
    <div className="flex flex-col w-full pl-2">
      <ViewTable updatedFormData={submittedData} />
    </div>
  );
}
