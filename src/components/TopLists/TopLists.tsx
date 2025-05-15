import React, { useState } from "react";
import "./TopLists.scss";
import cs from "classnames";
import { useNavigate } from "react-router-dom";
import { RoutesPath } from "../../utils/enumRouts";
import { TopListTypes } from "../../types/TopListTypes";

const topLists = [
  {
    title: "Iconic Movies of the 21st Century",
    value: TopListTypes.ICONIC_MOVIES_OF_THE_21ST_CENTURY,
  },
  {
    title: "Top Oscar-Winning Masterpieces",
    value: TopListTypes.TOP_OSCAR_WINNING_MASTERPIECES,
  },
  {
    title: "Top Most-Watched Blockbusters of the Decade",
    value: TopListTypes.TOP_MOST_WATCHED_BLOCKBUSTERS_OF_THE_DECADE,
  },
  {
    title: "Top 100 Superhero Movies",
    value: TopListTypes.TOP_100_SUPERHERO_MOVIES,
  },
  {
    title: "Top-Rated IMDb Movies of All Time",
    value: TopListTypes.TOP_RATED_IMDB_MOVIES_OF_ALL_TIME,
  },
];

const TopLists: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<TopListTypes | null>(null);
  const navigate = useNavigate();

  const handleSectionClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target as HTMLElement).closest(".top-lists-item")) {
      setSelectedIndex(null);
    }
  };

  const handleGoToList = (value: TopListTypes) => (e: React.MouseEvent) => {
    e.stopPropagation();
    sessionStorage.setItem("TopListvalue", JSON.stringify(value))
    navigate(`../${RoutesPath.SHOWTOPLISTS}?id=${value}`, { replace: true });
  };

  return (
    <section className="top-lists" onClick={handleSectionClick}>
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
                active: selectedIndex === item.value
              })}
              onClick={() => setSelectedIndex(item.value)}
            >
              <span className="top-lists-text">
                {`0${index + 1}.`} {item.title}
              </span>
              <div
                className={cs("selection-arrow", {
                  sellected: selectedIndex === item.value
                })}
                onClick={handleGoToList(item.value)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TopLists;
