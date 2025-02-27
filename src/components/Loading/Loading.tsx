import { useEffect, useState } from "react";
import "./Loading.scss"
import { useAppSelector } from "../../app/hooks";
import { Counter } from "../Stats";

const Loading = () => {
  const { data: movies, loading, error } = useAppSelector(state => state.movies)

  return (
    <>
      <section className="loading">
        <p className="loading-title">Wait, Muvio is in the process</p>
        <p><Counter target={100} duration={2000} start={loading} />%</p>
      </section>
    </>
  )
}

export default Loading

