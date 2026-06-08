import { motion } from "framer-motion";
import { useRef } from "react";

export default function PremiumCard({ children, className = "" }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    const card = ref.current;
    if (!card || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = -((y / rect.height) - 0.5) * 7;
    const rotateY = ((x / rect.width) - 0.5) * 7;

    card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
  };

  const reset = () => {
    ref.current?.style.removeProperty("--tilt-x");
    ref.current?.style.removeProperty("--tilt-y");
  };

  return (
    <motion.article
      ref={ref}
      className={`premium-card ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.24 }}
    >
      {children}
    </motion.article>
  );
}
