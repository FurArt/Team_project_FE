import ScrollToStartButton from "../ScrollToStartButton/ScrollToStartButton"
import "./Mood.scss"

const Mood = () => {
  return (
    <section className="mood">
      <h1 className="mood-head">Discover Films That Match Your Mood</h1>
      <p className="mood-title">
        There are so many movies out there, and it can be tricky to pick 
        just the right one! But don't worry, we're here to help. 
        Just answer a few simple questions, and we'll do the rest!
      </p>
      <ScrollToStartButton/>
    </section>
  )
}

export default Mood
