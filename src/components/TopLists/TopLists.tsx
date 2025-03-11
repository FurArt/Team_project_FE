import React, { useState } from "react"
import "./TopLists.scss"
import MovieRecommendations from "../MovieRecommendations/MovieRecommendations"

const topLists = [
  {
    title: "Iconic Movies of the 21st Century",
  },
  {
    title: "Top Masterpieces",

  },
  {
    title: "Most-Watched Blockbusters of the Decade",
  },
  {
    title: "Viral Hits That Everyone Is Talking About",
  },
  {
    title: "Top-Rated IMDb Movies of All Time",
  },
]

const TopLists: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <>
      <section className="top-lists">
        <h2 className="top-lists-title">TOP LISTS</h2>
        <p className="top-lists-description">
          Here are ideas for various movie top lists based on different criteria
        </p>
        <div className="top-lists-container">
          <ul className="top-lists-menu">
            {topLists.map((item, index) => (
              <li
                key={index}
                className={`top-lists-item ${selectedIndex === index ? "active" : ""}`}
                onClick={() => setSelectedIndex(index)}
              >
                <span className="top-lists-text">
                  {`0${index + 1}.`} {item.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default TopLists
