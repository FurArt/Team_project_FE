// import { useState, useEffect, ReactNode } from "react"
// import "./Stats.scss"
// import { Outlet } from "react-router-dom"
// import { scrollToHandler } from "../../utils/scrollToHandler"

// type CounterProps = {
//   target: number,
//   duration: number,
// }

// interface StatsProps {
//   children?: ReactNode
// }

// export const Counter: React.FC<CounterProps> = ({ target, duration = 2000 }) => {
//   const [count, setCount] = useState<number>(0)

//   useEffect(() => {
//     let start = 0
//     // const duration = 2000
//     const step = Math.ceil(target / (duration / 100))

//     const interval = setInterval(() => {
//       start += step
//       if (start >= target) {
//         setCount(target)
//         clearInterval(interval)
//       } else {
//         setCount(start)
//       }
//     }, 75)
//     return () => clearInterval(interval)
//   }, [target])

//   return <span>{count.toLocaleString()}</span>
// }



// const Stats: React.FC = ({ children }: StatsProps) => {
//   return (
//     <>
//       {/* <Mood/> */}
//       {children}
//       <Outlet />
//       <section className="stats">
//         <div className="stats-container">
//           <div className="stats-item">
//             <span className="stats-number">
//               +<Counter target={900} />
//             </span>
//             <span className="stats-label">FILMS</span>
//           </div>
//           <div className="stats-item">
//             <span className="stats-number">
//               +<Counter target={16} />
//             </span>
//             <span className="stats-label">GENRES</span>
//           </div>
//           <div className="stats-item">
//             <span className="stats-number">
//               +<Counter target={10000} />
//             </span>
//             <span className="stats-label">ACTORS</span>
//           </div>
//         </div>

//         <div className="stats-content">
//           <p className="stats-text">
//             Tired of endless scrolling, watching trailers, and still not knowing
//             what to watch?
//           </p>
//           <p className="stats-text">
//             Just take a quick quiz, and{" "}
//             <span className="stats-brand">MUVIO</span> will suggest the perfect
//             film based on your mood, occasion, and personal preferences!
//           </p>
//         </div>

//         <div className="stats-arrow">
//           <a
//             href="#"
//             className="stats-link"
//             onClick={scrollToHandler}
//           ></a>
//         </div>
//       </section>
//     </>
//   )
// }

// export default Stats

import { useState, useEffect, useRef, ReactNode } from "react"
import "./Stats.scss"
import { Outlet } from "react-router-dom"
import { scrollToHandler } from "../../utils/scrollToHandler"

type CounterProps = {
  target: number
  duration: number
  start: boolean
}

interface StatsProps {
  children?: ReactNode
}

export const Counter: React.FC<CounterProps> = ({ target, duration = 2000, start }) => {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    if (!start) return // Only start counting if start is true

    let startValue = 0
    const step = Math.ceil(target / (duration / 100))

    const interval = setInterval(() => {
      startValue += step
      if (startValue >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(startValue)
      }
    }, 75)

    return () => clearInterval(interval)
  }, [target, start])

  return <span>{count.toLocaleString()}</span>
}

const Stats: React.FC = ({ children }: StatsProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Stop observing once visible
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {children}
      <Outlet />
      <section ref={statsRef} className="stats">
        <div className="stats-container">
          <div className="stats-item">
            <span className="stats-number">
              +<Counter target={900} duration={2000} start={isVisible} />
            </span>
            <span className="stats-label">FILMS</span>
          </div>
          <div className="stats-item">
            <span className="stats-number">
              +<Counter target={16} duration={2000} start={isVisible} />
            </span>
            <span className="stats-label">GENRES</span>
          </div>
          <div className="stats-item">
            <span className="stats-number">
              +<Counter target={10000} duration={2000} start={isVisible} />
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
          <a
            href="#"
            className="stats-link"
            onClick={scrollToHandler}
          ></a>
        </div>
      </section>
    </>
  )
}

export default Stats

