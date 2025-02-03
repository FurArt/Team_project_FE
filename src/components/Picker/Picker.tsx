import { getMovies } from "../../api/movie";
import "./Picker.scss"

const Picker = () => {
  const handleClick = async () => {
    getMovies()
      .then((movies)=>{
        console.log(movies);
      })
  }

  return (
    <section className="picker">
      <h1 className="picker-head">Discover Films That Match Your Mood</h1>
      <p className="picker-title">
        There are so many movies out there, and it can be tricky to pick just
        the right one! But don't worry, we're here to help. Just answer a few
        simple questions, and we'll do the rest!
      </p>
      <a href="#" className="picker-button" onClick={handleClick}>
        start
      </a>
    </section>
  )
}

export default Picker
