import "./Stats.scss"

const Stats = () => {
  return (
    <section className="stats">
      <div className="stats-container">
        <div className="stats-item">
          <span className="stats-number">+900</span>
          <span className="stats-label">FILMS</span>
        </div>
        <div className="stats-item">
          <span className="stats-number">+16</span>
          <span className="stats-label">GENRES</span>
        </div>
        <div className="stats-item">
          <span className="stats-number">+10’000</span>
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
  )
}

export default Stats
