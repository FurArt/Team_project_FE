import { useState, useEffect, ReactNode } from "react"
import "./Stats.scss"
import { Outlet } from "react-router-dom"

type CounterProps = {
  target: number
}

interface StatsProps {
  children?: ReactNode
}

const Counter: React.FC<CounterProps> = ({ target }) => {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    let start = 0
    const duration = 2000
    const step = Math.ceil(target / (duration / 100))

    const interval = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(start)
      }
    }, 75)
    return () => clearInterval(interval)
  }, [target])

  return <span>{count.toLocaleString()}</span>
}



const Stats: React.FC = ({ children }: StatsProps) => {
  return (
    <>
      {/* <Mood/> */}
      {children}
      <Outlet/>
      <section className="stats">
        <div className="stats-container">
          <div className="stats-item">
            <span className="stats-number">
              +<Counter target={900} />
            </span>
            <span className="stats-label">FILMS</span>
          </div>
          <div className="stats-item">
            <span className="stats-number">
              +<Counter target={16} />
            </span>
            <span className="stats-label">GENRES</span>
          </div>
          <div className="stats-item">
            <span className="stats-number">
              +<Counter target={10000} />
            </span>
            <span className="stats-label">ACTORS</span>
          </div>
        </div>

        <div className="stats-content">
          <p className="stats-text">
            Tired of endless scrolling, watching trailers, and still not knowing
            what to watch?
          </p>
          <p className="stats-text">
            Just take a quick quiz, and{" "}
            <span className="stats-brand">MUVIO</span> will suggest the perfect
            film based on your mood, occasion, and personal preferences!
          </p>
        </div>

        <div className="stats-arrow">
          <a href="#header" className="stats-link"></a>
        </div>
      </section>
    </>
  )
}

export default Stats
