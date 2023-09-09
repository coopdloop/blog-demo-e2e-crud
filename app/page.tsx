import FormTableView from "@/components/FormTableView";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect("/dashboard");
}
