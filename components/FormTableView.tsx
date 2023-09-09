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
    <div className="flex flex-col sm:w-full md:w-full lg:w-full">
      <span className="flex sm:justify-start md:justify-between lg:justify-center w-full py-2 my-8 flex-wrap">
        <div className="px-8">
          <h1 className="text-2xl">Your assigned work</h1>
          <AssignedTasks updatedFormData={submittedData} />
          <Separator/>

          <h1 className="mt-8 text-2xl">All users</h1>
          <UserTable updatedFormData={submittedUserData} />
        </div>
        <span className="flex gap-8">
        <Separator orientation="vertical"/>
        <ProfileForm updateSubmittedData={updateSubmittedData} />
        </span>
      </span>
      <Separator/>
      <h1 className="mt-8 text-2xl">All tasks</h1>
      <ViewTable updatedFormData={submittedData} />
    </div>
  );
}
