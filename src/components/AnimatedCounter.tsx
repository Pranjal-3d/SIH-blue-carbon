"use client";

import { useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export function AnimatedCounter({
  value,
  duration = 1.2,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inViewRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-20%" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 120, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [spring]);

  return (
    <div ref={inViewRef}>
      <motion.span ref={ref} className={className}>
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </motion.span>
    </div>
  );
}


