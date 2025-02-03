import { Outlet } from "react-router-dom"
import "./Wrapper.scss"
import { ReactNode } from "react";

interface WrapperProps {
  children?: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <main className="wrapper">
      {children}
      <Outlet />
    </main>
  )
}

export default Wrapper
