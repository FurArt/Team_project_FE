import { Outlet } from "react-router-dom"
import "./Wrapper.scss"
import { ReactNode } from "react"
import MadeInUkraine from "../MadeInUkraine/MadeInUkraine"

interface WrapperProps {
  children?: ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <main className="wrapper">
      <MadeInUkraine/>
      <section className="conteiner-video">
        <div className="wrapper-img wrapper-img-1"></div>
        <div className="wrapper-img wrapper-img-2"></div>
        <div className="wrapper-img wrapper-img-3"></div>
        <div className="wrapper-img wrapper-img-4"></div>
        <div className="wrapper-img wrapper-img-5"></div>
        <div className="wrapper-img wrapper-img-6"></div>
        <div className="wrapper-img wrapper-img-7"></div>
        <div className="wrapper-img wrapper-img-8"></div>
        <div className="wrapper-img wrapper-img-9"></div>
        <div className="wrapper-img wrapper-img-10"></div>
        <div className="wrapper-img wrapper-img-11"></div>
        <div className="wrapper-img wrapper-img-12"></div>
        <div className="wrapper-img wrapper-img-13"></div>
        <div className="wrapper-img wrapper-img-14"></div>
        <div className="wrapper-img wrapper-img-15"></div>
        <div className="wrapper-img wrapper-img-16"></div>
        <div className="wrapper-img wrapper-img-17"></div>
        <div className="wrapper-img wrapper-img-18"></div>
        <div className="wrapper-img wrapper-img-19"></div>
        <div className="wrapper-img wrapper-img-20"></div>
        <div className="wrapper-img wrapper-img-21"></div>
        <div className="wrapper-img wrapper-img-22"></div>
        <div className="wrapper-img wrapper-img-23"></div>
        <div className="wrapper-img wrapper-img-24"></div>
        <div className="wrapper-img wrapper-img-25"></div>
        <div className="wrapper-img wrapper-img-26"></div>
        <div className="wrapper-img wrapper-img-27"></div>
        <div className="wrapper-img wrapper-img-28"></div>
        <div className="wrapper-img wrapper-img-29"></div>
        <div className="wrapper-img wrapper-img-30"></div>
        <div className="wrapper-img wrapper-img-31"></div>
        <div className="wrapper-img wrapper-img-32"></div>
        <div className="wrapper-img wrapper-img-33"></div>
        <div className="wrapper-img wrapper-img-34"></div>
        <div className="wrapper-img wrapper-img-35"></div>
        <div className="wrapper-img wrapper-img-36"></div>
        <div className="wrapper-img wrapper-img-37"></div>
        <div className="wrapper-img wrapper-img-38"></div>
        <div className="wrapper-img wrapper-img-39"></div>
        <div className="wrapper-img wrapper-img-40"></div>
        <div className="wrapper-img wrapper-img-41"></div>
        <div className="wrapper-img wrapper-img-42"></div>
        <div className="wrapper-img wrapper-img-43"></div>
        <div className="wrapper-img wrapper-img-44"></div>
        <div className="wrapper-img wrapper-img-45"></div>
        <div className="wrapper-img wrapper-img-46"></div>
        <div className="wrapper-img wrapper-img-47"></div>
        <div className="wrapper-img wrapper-img-48"></div>
        <div className="wrapper-img wrapper-img-49"></div>
        <div className="wrapper-img wrapper-img-50"></div>
        <div className="wrapper-img wrapper-img-51"></div>
        <div className="wrapper-img wrapper-img-52"></div>
        <div className="wrapper-img wrapper-img-53"></div>
        <div className="wrapper-img wrapper-img-54"></div>
        <div className="wrapper-img wrapper-img-55"></div>
        <div className="wrapper-img wrapper-img-56"></div>
        <div className="wrapper-img wrapper-img-57"></div>
        <div className="wrapper-img wrapper-img-58"></div>
        <div className="wrapper-img wrapper-img-59"></div>
        <div className="wrapper-img wrapper-img-60"></div>
        <div className="wrapper-img wrapper-img-61"></div>
        <div className="wrapper-img wrapper-img-62"></div>
        <div className="wrapper-img wrapper-img-63"></div>
        <div className="wrapper-img wrapper-img-64"></div>
        <div className="wrapper-img wrapper-img-65"></div>
        <div className="wrapper-img wrapper-img-66"></div>
        <div className="wrapper-img wrapper-img-67"></div>
        <div className="wrapper-img wrapper-img-68"></div>
        <div className="wrapper-img wrapper-img-69"></div>
        <div className="wrapper-img wrapper-img-70"></div>
        {/* <div className="wrapper-img wrapper-img-71"></div> */}
        {/* <div className="wrapper-img wrapper-img-72"></div> */}
      </section>
      {/* <Stats/> */}
      {children}
      <Outlet />
    </main>
  )
}

export default Wrapper
