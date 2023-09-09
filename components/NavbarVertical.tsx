"use client";
import { FC, useEffect, useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { userDataNormalSchema } from "@/types/api/tasks";
type SidebarProps = {
  isOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  if (!isOpen) {
    return null; // Render nothing if the sidebar is closed
  }

  return (
    <div className="h-full border-r-4 w-fit pr-4 sm:hidden">
      <ul className="justify-start flex flex-col h-full pt-4 text-center text-lg text-white">
        <li className="py-2">
          <a href="/">Home</a>
        </li>
        <li className="py-2">
          <a href="/task">Tasks</a>
        </li>
        <li className="py-2">
          <a href="/user">Users</a>
        </li>
        <li className="py-2">
          <a href="mailto:cooper@lariatlabs.dev">Contact</a>
        </li>
        <li className="py-2">
          <a href="https://devsec-cooper.codes">Blog</a>
        </li>
      </ul>
    </div>
  );
};

const VertNav: FC = ({}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<null | userDataNormalSchema>(null); // [{}
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const logout = async () => {
    try {
      await fetch("/api/logout");
      toast({
        title: "Success",
        description: "You have been logged out.",
        duration: 9000,
      });
      setUserData(null);
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong.",
        duration: 9000,
      });
    }
  };
  useEffect(() => {
    // Check and see if tableData state is not empty
    // if (userData !== null) {
    console.log("useEffect - client site userData state update from UI.");
    getMyUserData();
    // }
    // }
    // Call the fetchData function when the component mounts
  }, [pathname]); // The empty dependency array ensures this effect runs once, similar to componentDidMount
  const getMyUserData = async () => {
    try {
      const myUserData = await fetch("/api/v1/me");
      const myUser = await myUserData.json();
      //assume one user in request
      setUserData(myUser[0]);
    } catch (error) {
      setUserData(null);
    }
  };

  return (
    <div className="">
      <div className="left-0 relative w-1/6 lg:hidden">
        <Hamburger
          toggled={isSidebarOpen}
          toggle={handleToggle}
          // distance={"lg"}
        />
        <Sidebar isOpen={isSidebarOpen} />
      </div>
      <div className="hidden lg:flex h-full">
        <nav className="top-0 left-0 bottom-0 flex flex-col w-40 sm:max-w-xs pt-6 pb-8 bg-blue-400 overflow-hidden">
          <div className="flex w-full items-center px-6 pb-6 mb-6 lg:border-b border-gray-100">
            <a className="text-xl text-white font-semibold" href="/">
              e2e crud
            </a>
          </div>
          <div className="px-4 pb-6">
            <h3 className="mb-2 text-xs uppercase text-black font-medium">
              App Links
            </h3>
            <ul className="text-sm font-medium">
              <li>
                <div className="pt-4">
                  <a
                    className="flex items-center pl-3 py-3 pr-2 text-gray-50 hover:bg-gray-900 rounded"
                    href="/task"
                  >
                    <span className="inline-block mr-4"></span>
                    <span>Tasks</span>
                  </a>
                </div>
              </li>
              <li>
                <div className="pt-4">
                  <a
                    className="flex items-center pl-3 py-3 pr-2 text-gray-50 hover:bg-gray-900 rounded"
                    href="/user"
                  >
                    <span className="inline-block mr-4"></span>
                    <span>Users</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div className="px-4 pb-6">
            <h3 className="mb-2 text-xs uppercase text-black font-medium">
              Nav Items
            </h3>
            <ul className="text-sm font-medium">
              <li>
                <a
                  className="flex items-center pl-3 py-3 pr-2 text-gray-50 hover:bg-gray-900 rounded"
                  href="mailto:cooper@lariatlabs.dev"
                >
                  <span className="inline-block mr-3"></span>
                  <span>Contact</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center pl-3 py-3 pr-4 text-gray-50 hover:bg-gray-900 rounded"
                  href="https://devsec-cooper.codes"
                >
                  <span className="inline-block mr-3"></span>
                  <span>Blog</span>
                </a>
              </li>
              <li>
                <Button onClick={logout}>Logout</Button>
              </li>
              {userData && (
                <>
                  <h1 className="text-lg mt-4">User JWT Info</h1>
                  <li className="flex flex-col text-xs gap-4 mt-4">
                    <a className=" items-center text-gray-50">
                      user_id: {userData.user_id}
                    </a>
                    <a className=" items-center text-gray-50">
                      username: {userData.username}
                    </a>
                    <a className="items-center text-gray-50">
                      email: {userData.email}
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default VertNav;
