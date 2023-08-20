"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, set } from "date-fns";
import * as z from "zod";
import { cn } from "@/lib/utils";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "./ui/use-toast";
import { TaskStatusEnum, TaskCategoriesEnum } from "@/db/schema";
import { useState } from "react";

export const formSchema = z.object({
  user_id: z.coerce.number().max(3, {
    message: "Album name field cannot be more than 12 characters.",
  }),
  title: z.string().max(12, {
    message: "Album name field cannot be more than 12 characters.",
  }),
  description: z.string().max(12, {
    message: "Album name field cannot be more than 12 characters.",
  }),

  task_category_name: z.string().max(12, {
    message: "Album name field cannot be more than 12 characters.",
  }),

  due_date: z.date({
    required_error: "A release date is required.",
  }),
  status: z.string().max(12, {
    message: "Album name field cannot be more than 12 characters.",
  }),
});

type formSchemaValues = z.infer<typeof formSchema>;

interface FormInputProps {
  updateSubmittedData: (data: formSchemaValues) => void;
}

const ProfileForm: React.FC<FormInputProps> = ({ updateSubmittedData}) => {
  const [submittedData, setSubmittedData] = useState<{}>({});
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues,
  });

  // 2. Define a submit handler.

  function onSubmit(data: formSchemaValues) {
    setSubmittedData(data)
    updateSubmittedData(data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    // Define the fetch options, including the method and headers
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indicates that we're sending JSON data
        // You can add other headers here if needed
      },
      body: JSON.stringify(data), // Convert the data to JSON format
    };
    // Make the POST request using the fetch API
    fetch("http://localhost:3000/api/v1/create-task", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response JSON
      })
      .then((data) => {
        // Handle the response data here
        console.log("Response Data:", data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch Error:", error);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
        <FormField
          control={form.control}
          name="user_id"
          defaultValue={1}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assign to</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>This is the assigned user.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder="Task title..." {...field} />
              </FormControl>
              <FormDescription>A short title for task.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description..." {...field} />
              </FormControl>
              <FormDescription>A short Description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="New" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TaskStatusEnum.enumValues.map((Status) => (
                    <SelectItem value={Status} key={Status}>
                      {Status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Task status.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="task_category_name"
          defaultValue="Fullstack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Category</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Fullstack" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TaskCategoriesEnum.enumValues.map((category_name) => (
                    <SelectItem value={category_name} key={category_name}>
                      {category_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Task category.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Task Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(day: Date | undefined) => field.onChange(day!)}
                    disabled={(date: any) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Due date for the task to be completed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;