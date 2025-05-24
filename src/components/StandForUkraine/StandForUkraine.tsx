import "./StandForUkraine.scss"

const StandForUkraine = () => {
  return (
    <div className="made-in-ukraine" title="We from Ukraine">
      <a href="https://www.standwukraine.org/ua/" target="_blank">
        <div className="made-in-ukraine__image-wrapper">
          <img
            src="images/start-button.png"
            alt="We from Ukraine"
            className="made-in-ukraine__image"
          />
          <span className="made-in-ukraine__label">Stand for Ukraine</span>
        </div>
      </a>
    </div>
  );
};

export default StandForUkraine