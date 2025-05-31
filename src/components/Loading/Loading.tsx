import { useEffect, useState } from "react";
import "./Loading.scss"
import { useAppSelector } from "../../app/hooks";
import { Counter } from "../Stats";

const Loading = () => {
  const { movies } = useAppSelector(state => state)
  const loading = movies?.loading
  return (
    <>
      <section className="loading">
        {/* <p className="loading-title">Wait, Muvio is in the process</p> */}
        <p><Counter target={99} duration={6000} start={loading} />%</p>
      </section >
    </>
  )
}

export default Loading

