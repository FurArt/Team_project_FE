import React, { useState } from "react"
import "./TopLists.scss"
import cs from "classnames"
import { useNavigate } from "react-router-dom"
import { RoutesPath } from "../../utils/enumRouts"
import { TopListsHeader, TopListTypes } from "../../types/TopListTypes"

const topLists: TopListsHeader[] = [
  {
    title: "Iconic Movies of the 21st Century",
    value: TopListTypes.ICONIC_MOVIES_OF_THE_21ST_CENTURY,
    description: "Discover the most influential and unforgettable films that have defined cinema since the year 2000."
  },
  {
    title: "Top Oscar-Winning Masterpieces",
    value: TopListTypes.TOP_OSCAR_WINNING_MASTERPIECES,
    description: "Explore a collection of films that earned the highest honors at the Academy Awards."
  },
  {
    title: "Top Most-Watched Blockbusters of the Decade",
    value: TopListTypes.TOP_MOST_WATCHED_BLOCKBUSTERS_OF_THE_DECADE,
    description: "From global hits to box-office giants, these are the films that captivated audiences worldwide."
  },
  {
    title: "Top 100 Superhero Movies",
    value: TopListTypes.TOP_100_SUPERHERO_MOVIES,
    description: "A ranking of the most thrilling and beloved superhero movies, featuring icons from Marvel, DC, and beyond."
  },
  {
    title: "Top-Rated IMDb Movies of All Time",
    value: TopListTypes.TOP_RATED_IMDB_MOVIES_OF_ALL_TIME,
    description: "A definitive list of the highest-rated films ever, as ranked by millions of IMDb users."
  },
]


const TopLists: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<TopListTypes | null>(null)
  const navigate = useNavigate()

  const handleSectionClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target as HTMLElement).closest(".top-lists-item")) {
      setSelectedIndex(null)
    }
  }

  const handleGoToList = (item: TopListsHeader) => (e: React.MouseEvent) => {
    e.stopPropagation()
    sessionStorage.setItem("TopListvalue", JSON.stringify(item))
    navigate(`../${RoutesPath.SHOWTOPLISTS}?id=${item.value}`, { replace: true })
  }

  return (
    <section className="top-lists" onClick={handleSectionClick}>
      <img src="images/toptop.png" className="top-lists__overlay" />
      <h2 className="top-lists-title">TOP LISTS</h2>
      <p className="top-lists-description">
        Here are ideas for various movie top lists based on different criteria
      </p>
      <div className="top-lists-container">
        <ul className="top-lists-menu">
          {topLists.map((item, index) => (
            <li
              key={index}
              className={cs("top-lists-item", {
                active: selectedIndex === item.value,
              })}
              onClick={handleGoToList(item)}
            >
              <span className="top-lists-text">
                {`0${index + 1}.`} {item.title}
              </span>
              <div
                className={cs("selection-arrow", {
                  sellected: selectedIndex === item.value,
                })}
                onClick={handleGoToList(item)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TopLists
