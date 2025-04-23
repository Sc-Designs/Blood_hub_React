import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const Animate = ({ children }) => {
  const overlayControls = useAnimation();
  const contentControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await overlayControls.start({
        y: "-100%",
        transition: { ease: "easeIn", duration: 0.5, type: "circIn" },
      });

      await contentControls.start("animate");
    };

    sequence();
  }, []);

  const animation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <>
      <motion.div
        className="w-full h-screen bg-white/70 fixed top-0 left-0 z-50"
        initial={{ y: 0 }}
        animate={overlayControls}
      />
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
