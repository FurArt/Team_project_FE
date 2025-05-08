import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import "./ScrollToStartButton.scss";
import { useNavigate } from "react-router-dom";

const ScrollToStartButton = () => {
  const controls = useAnimation();
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const x = useMotionValue(0);

  // Один раз при загрузке определяем, мобильный ли экран
  useEffect(() => {
    const screenWidth = window.innerWidth;
    setIsMobile(screenWidth <= 599);
  }, []);

  const maxX = isMobile ? 343 : 448;
  const startWidth = isMobile ? "343px" : "448px";

  const width = useTransform(x, [0, maxX], [startWidth, "100px"]);
  const opacity = useTransform(x, [0, 100], [1, 0]);

  const setIsDragging = (isDragging: boolean) => {
    setBackgroundVisible(isDragging);
    controls.start({ x: 0 });
    navigate("/picker/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="scroll-cont">
      <motion.div
        className="scroll-button"
        transition={{ duration: 0.5 }}
        style={{ width }}
      >
        <motion.div
          className="scroll-button__circle"
          drag="x"
          dragConstraints={{ left: 0, right: maxX }}
          animate={controls}
          style={{ x }}
          onDragEnd={() => setIsDragging(true)}
          transition={{ duration: 0.5 }}
          dragMomentum={false}
        >
          ▶
        </motion.div>

        <motion.span className="scroll-button__text" style={{ opacity }}>
          PUll TO START
        </motion.span>
      </motion.div>
    </div>
  );
};

export default ScrollToStartButton;
