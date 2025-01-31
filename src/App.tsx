import "./features/styles/_variables.scss"
import "./features/styles/App.scss"
import "./features/styles/index.scss"
import "./features/styles/reset.scss"


import Header from "./components/Header/Header"
import Wrapper from "./components/Wrapper/Wrapper"
import Footer from "./components/Footer/Footer"
import { Route, Routes } from "react-router"
import NotFound from "./components/NotFound/NotFound"

const App = () => {
  return (
    <>
    <Header />
    <Wrapper >
      <Routes>
       {/* <Route path="*" element={<NotFound />} />  */}

        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Wrapper>
    <Footer />
  </>
  )
}

export default App
