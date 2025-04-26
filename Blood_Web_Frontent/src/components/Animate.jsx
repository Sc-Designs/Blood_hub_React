import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const BLOCK_COUNT = 6;

const Animate = ({ children }) => {
  const overlayControlsArray = Array.from({ length: BLOCK_COUNT }, () =>
    useAnimation()
  );
  const revoverlayControlsArray = Array.from({ length: BLOCK_COUNT }, () =>
    useAnimation()
  );
  const contentControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      for (let i = 0; i < BLOCK_COUNT; i++) {
        overlayControlsArray[i].start({
          left: "-52%",
          opacity: 0.5,
          transition: { duration: 0.5, type: "circIn"},
        });
        
        revoverlayControlsArray[i].start({
          left: "102%",
          opacity: 0.5,
          transition: { duration: 0.5, type: "circIn" },
        });

        await new Promise((res) => setTimeout(res, 200));
      }

      await contentControls.start("animate");
    };

    sequence();
  }, []);

  const animation = {
    initial: { opacity: 0.2, y: 0 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <>
      {overlayControlsArray.map((controls, index) => (
        <motion.div
          key={`overlay-${index}`}
          className="w-[50%] h-[20vh] bg-white fixed left-0 z-50"
          style={{ top: `${index * 20}%` }}
          initial={{ left: "0%", opacity: 1 }}
          animate={controls}
        />
      ))}
      {revoverlayControlsArray.map((controls, index) => (
        <motion.div
          key={`revoverlay-${index}`}
          className="w-[50%] h-[20vh] bg-white fixed left-0 z-50"
          style={{ top: `${index * 20}%` }}
          initial={{ left: "50%" }}
          animate={controls}
        />
      ))}

      <motion.div
        variants={animation}
        initial="initial"
        animate={contentControls}
        exit="exit">
        {children}
      </motion.div>
    </>
  );
};

export default Animate;
