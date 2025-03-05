// import React from "react";
// import "./TopLists.scss"; // Assuming you will style it separately
// // import { FaArrowRight } from "react-icons/fa";

// const topLists = [
//   "Iconic Movies of the 21st Century",
//   "Top Masterpieces",
//   "Most-Watched Blockbusters of the Decade",
//   "Viral Hits That Everyone Is Talking About",
//   "Top-Rated IMDb Movies of All Time",
// ];

// const TopLists: React.FC = () => {
//   return (
//     <section className="top-lists">
//       <h2 className="top-lists-title">TOP LISTS</h2>
//       <p className="top-lists-description">
//         Here are ideas for various movie top lists based on different criteria
//       </p>
//       <div className="top-lists-container">
//         <ul className="top-lists-menu">
//           {topLists.map((item, index) => (
//             <li key={index} className={`top-lists-item `}>
//                          <span className="top-lists-text"> {`0${index + 1}.`} {item}</span>

//             </li>
//           ))}
//         </ul>
//         <div className="top-lists-image">
//           <img src="/path-to-your-image.jpg" alt="Actor holding an award" />
//           <div className="top-lists-overlay"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TopLists;

import React, { useState } from "react"
import "./TopLists.scss" // Assuming you will style it separately
import MovieRecommendations from "../MovieRecommendations/MovieRecommendations"

const topLists = [
  {
    title: "Iconic Movies of the 21st Century",
    image:
      "http://localhost:5173/Team_project_FE/src/images/top-list/actor-top-list.jpg",
  },
  {
    title: "Top Masterpieces",
    image:
      "http://localhost:5173/Team_project_FE/src/images/top-list/actor-top-list.jpg",
  },
  {
    title: "Most-Watched Blockbusters of the Decade",
    image:
      "http://localhost:5173/Team_project_FE/src/images/top-list/actor-top-list.jpg",
  },
  {
    title: "Viral Hits That Everyone Is Talking About",
    image:
      "http://localhost:5173/Team_project_FE/src/images/top-list/actor-top-list.jpg",
  },
  {
    title: "Top-Rated IMDb Movies of All Time",
    image:
      "http://localhost:5173/Team_project_FE/src/images/top-list/actor-top-list.jpg",
  },
]

// const TopLists: React.FC = () => {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

//   return (
//     <section className="top-lists">
//       <h2 className="top-lists-title">TOP LISTS</h2>
//       <p className="top-lists-description">
//         Here are ideas for various movie top lists based on different criteria
//       </p>
//       <div className="top-lists-container">
//         {/* 🎯 List Items */}
//         <ul className="top-lists-menu">
//           {topLists.map((item, index) => (
//             <li
//               key={index}
//               className="top-lists-item"
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//             >
//               <span className="top-lists-text">
//                 {`0${index + 1}.`} {item.title}
//               </span>
//             </li>
//           ))}
//         </ul>

//         {/* 🎬 Dynamic Image Section */}
//         <div className="top-lists-image">
//           <img
//             src={
//               hoveredIndex !== null
//                 ? topLists[hoveredIndex].image
//                 : "/images/default.jpg"
//             }
//             alt="Actor holding an award"
//             className="top-lists-actor-image"
//           />
//           <div className="top-lists-overlay"></div>
//         </div>
//       </div>
//     </section>
//   )
// }

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

          <div className="top-lists-image">
            <img
              src={
                selectedIndex !== null
                  ? topLists[selectedIndex].image
                  : "http://localhost:5173/Team_project_FE/src/images/top-list/actor-top-list.jpg"
              }
              alt="Actor holding an award"
              className="top-lists-actor-image"
            />
            <div className="top-lists-overlay"></div>
          </div>
        </div>
      </section>
      <MovieRecommendations />
    </>
  )
}

export default TopLists
