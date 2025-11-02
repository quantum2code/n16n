import React from "react";
import { SidebarTrigger } from "./ui/sidebar";

const AppHeader = () => {
  return (
    <header className="shrink-0 h-14 flex px-4 items-center bg-background">
      <SidebarTrigger />
    </header>
  );
};

export default AppHeader;
