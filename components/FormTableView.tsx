"use client";
import React, { useState } from "react";
import { TasksArray, UsersArray } from "@/types/api/tasks";
import ProfileForm from "@/components/FormInput";
import ViewTable from "@/components/ViewTable";
import { AssignedTasks } from "@/components/AssignedTasks";
import {Separator} from "@/ui/separator"
import { UserTable } from "./UserTable";
export default function FormTableView() {
  const [submittedData, setSubmittedData] = useState<TasksArray>([]);
  const [submittedUserData, setSubmittedUserData] = useState<UsersArray>([]);

  function updateSubmittedData(data: TasksArray) {
    setSubmittedData(data);
  }

  return (
    <div className="flex flex-col w-full pl-2">
      <span className="flex justify-center w-full py-2 my-8 flex-wrap">
        <div className="px-8">
          <h1>Your assigned work</h1>
          <AssignedTasks updatedFormData={submittedData} />
          <h1>All users</h1>
          <UserTable updatedFormData={submittedUserData} />
        </div>
        <ProfileForm updateSubmittedData={updateSubmittedData} />
      </span>
      <Separator/>
      <ViewTable updatedFormData={submittedData} />
    </div>
  );
}
