"use client"
import ProfileForm from "@/components/FormInput";
import ViewTable from "@/components/ViewTable";
import { useState } from "react";
export default function Home() {
  const [submittedData, setSubmittedData] = useState<{}>({});


  function updateSubmittedData(data: {}) {
    console.log(data)
    setSubmittedData(data);
  }

  return (
    <div className="justify-center container py-24 bg-gray-300 rounded-2xl mt-8 border-black border-2">
      <ProfileForm updateSubmittedData={updateSubmittedData} />
      <ViewTable updatedFormData={submittedData}/>
    </div>
  );
}
