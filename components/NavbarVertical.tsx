"use client";
import { FC, useState } from "react";
import { Sling as Hamburger } from "hamburger-react";

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  if (!isOpen) {
    return null; // Render nothing if the sidebar is closed
  }

  return (
    <div className="h-full rounded-r-lg bg-gray-800 w-28">
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

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-1/6">
      <div className="h-full left-0 fixed max-1/6">
        <Hamburger toggled={isSidebarOpen} toggle={handleToggle} distance={'lg'} />
        <Sidebar isOpen={isSidebarOpen} />
      </div>
      <div className="hidden lg:block relative z-50">
        <div className="lg:hidden inset-0 bg-gray-800 opacity-10"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-44 lg:w-44 sm:max-w-xs pt-6 pb-8 bg-neutral-700 overflow-y-auto rounded-r-lg">
          <div className="flex w-full items-center px-6 pb-6 mb-6 lg:border-b border-gray-100">
            <a className="text-xl text-white font-semibold" href="/">
              e2e crud
            </a>
          </div>
          <div className="px-4 pb-6">
            <h3 className="mb-2 text-xs uppercase text-gray-500 font-medium">
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
            <h3 className="mb-2 text-xs uppercase text-gray-500 font-medium">
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
            </ul>
          </div>
        </nav>
      </div>
      <div className="mx-auto lg:ml-80"></div>
    </div>
  );
};

export default VertNav;
