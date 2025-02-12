import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { useState } from "react"
import "./ScrollToStartButton.scss" // Import SCSS file
import { useNavigate } from "react-router-dom"

const ScrollToStartButton = () => {
  const controls = useAnimation()
  const [actionTriggered, setActionTriggered] = useState(false)
  const [backgroundVisible, setBackgroundVisible] = useState(false)
  const x = useMotionValue(0);
  const width = useTransform(x, [0, 390], ["390px", "100px"]); 
  const opacity = useTransform(x, [0, 100], [1, 0]); 
  const navigete = useNavigate()

  const handleAnimationComplete = () => {
    setActionTriggered(true)
    alert("Action Triggered! 🎬") 
  }
  const setIsDragging = (isDragging: boolean) => {
    setBackgroundVisible(isDragging)
    if (isDragging) {
      console.log("Action Triggered! 🎬")
    }
    controls.start({ x: 0 })
    navigete("/picker/#logo")
    window.scrollTo(0, 0)
  }

 const setIsStartDragging = () => {
  console.log(width);
  
 }

  return (
    <div className="scroll-cont">
      <motion.div
        className="scroll-button"
        transition={{ duration: 0.5 }}
        style={{width}}
        

      >
        <motion.div
          className="scroll-button__circle"
          drag="x"
          dragConstraints={{ left: 0, right: 300 }}
          // dragElastic={1}
          animate={controls}
          onDrag={(event, info) => setIsStartDragging()}
          style={{x}}
          onDragEnd={() => setIsDragging(true)}
          transition={{ duration: 0.5 }}
          dragMomentum={false}

        >
          ▶
        </motion.div>

        <motion.span 
        className="scroll-button__text"
        style={{opacity}}
        >
          PUll TO START
        </motion.span>
      </motion.div>

      
    </div>
  )
}

export default ScrollToStartButton
