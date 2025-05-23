import { useState } from "react";
import MadeInUkraine from "../MadeInUkraine/MadeInUkraine";
import StandForUkraine from "../StandForUkraine/StandForUkraine";
import "./UkraineHoverToggle.scss";

const UkraineHoverToggle = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="ukraine-toggle-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? <StandForUkraine /> : <MadeInUkraine />}
    </div>
  );
};

export default UkraineHoverToggle;