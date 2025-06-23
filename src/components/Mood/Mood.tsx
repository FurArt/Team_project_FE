import { useTranslation } from "react-i18next";
import ScrollToStartButton from "../ScrollToStartButton/ScrollToStartButton"
import "./Mood.scss"

const Mood = () => {
  const { t } = useTranslation();
  return (
    <section className="mood">
      <h1 className="mood-head">{t('home.title')}</h1>
      <p className="mood-title">
        There are so many movies out there, and it can be tricky to pick
        just the right one! But don't worry, we're here to help.
        Just answer a few simple questions, and we'll do the rest!
      </p>
      <ScrollToStartButton />
    </section>
  )
}

export default Mood
