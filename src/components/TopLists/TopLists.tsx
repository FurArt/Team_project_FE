import React, { useState } from "react"
import "./TopLists.scss"
import cs from "classnames"
import MovieRecommendations from "../MovieRecommendations/MovieRecommendations"
import { useNavigate } from "react-router-dom"
import { RoutesPath } from "../../utils/enumRouts"

const topLists = [
  {
    title: "Iconic Movies of the 21st Century",
  },
  {
    title: "Top Oscar-Winning Masterpieces",
  },
  {
    title: "Top Most-Watched Blockbusters of the Decade",
  },
  {
    title: "Top 100 Superhero Movies",
  },
  {
    title: "Top-Rated IMDb Movies of All Time",
  },
]

const TopLists: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const navigate = useNavigate();
  const handleSectionClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target as HTMLElement).closest(".top-lists-item")) {
      setSelectedIndex(null);
    }
  };
  const handleGoToList = () => {
    console.log(`click`);
    navigate(`../${RoutesPath.SHOWTOPLISTS}?id${RoutesPath.SHOWTOPLISTS}=${selectedIndex}`, { replace: true });
  };
  return (
    <>
      <section className="top-lists"
        onClick={handleSectionClick}
      >
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
      </section >
      <div
        className={cs("selection-arrow", { sellected: selectedIndex !== null })}
        onClick={handleGoToList}
      />
    </>
  )
}

export default TopLists;
