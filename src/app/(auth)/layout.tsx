import React, { ReactNode } from "react";
import "../globals.css";
interface LayoutProps {
  children: ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => (
    <div
    className="custom-gradient w-full flex flex-col items-center h-lvh justify-center"
  >
    {children}
  </div>

  );


export default layout;
