import { Key, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="w-full py-4 px-6 bg-white shadow-md">
      <div className=" flex items-center justify-between mx-auto ">
        <div className="flex items-center space-x-2">
          <Key className="w-6 h-6 text-gray-700" />
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
        <Button variant="outline" size="sm" className="flex items-center space-x-1">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};
