import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import useSound from "use-sound";

const Skiper25 = () => {
  const indicatorWrapStyle = {
    display: "grid",
    placeItems: "center",
    gap: 18,
    textAlign: "center",
  };

  const indicatorTextWrap = {
    display: "grid",
    justifyItems: "center",
    gap: 14,
  };

  const indicatorTextStyle = {
    textTransform: "uppercase",
    letterSpacing: 0.6,
    fontSize: 12,
    color: "#9ca3af",
    maxWidth: 180,
  };

  const indicatorLineStyle = {
    width: 1,
    height: 48,
    background: "linear-gradient(180deg, rgba(139,92,246,0), rgba(139,92,246,0.55))",
  };

  return (
    <div style={indicatorWrapStyle} className="music-toggle-wrap">
      <div style={indicatorTextWrap}>
        <span style={indicatorTextStyle} className="music-toggle-label">CLICK TO PLAY THE MUSIC</span>
        <div style={indicatorLineStyle} className="music-toggle-indicator" />
      </div>
      <MusicToggleButton />
    </div>
  );
};

export { Skiper25 };

export const MusicToggleButton = () => {
  const bars = 5;

  const getRandomHeights = () => {
    return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
  };

  const [heights, setHeights] = useState(getRandomHeights());

  const [isPlaying, setIsPlaying] = useState(false);

  const [play, { pause, sound }] = useSound("/audio.mp3", {
    loop: true,
    onplay: () => setIsPlaying(true),
    onend: () => setIsPlaying(false),
    onpause: () => setIsPlaying(false),
    onstop: () => setIsPlaying(false),
    soundEnabled: true,
  });

  useEffect(() => {
    if (isPlaying) {
      const waveformIntervalId = setInterval(() => {
        setHeights(getRandomHeights());
      }, 100);

      return () => {
        clearInterval(waveformIntervalId);
      };
    }
    setHeights(Array(bars).fill(0.1));
  }, [isPlaying]);

  const handleClick = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
      return;
    }
    play();
    setIsPlaying(true);
  };

  return (
    <>
      <motion.div
        onClick={handleClick}
        key="audio"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 1, bounce: 0.6, type: "spring" }}
        style={{ cursor: "pointer", borderRadius: 9999, display: "grid", placeItems: "center" }}
        className="music-toggle"
      >
        <motion.div
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", bounce: 0.35 }}
          style={{ display: "flex", alignItems: "center", gap: 6, borderRadius: 9999, boxSizing: "border-box" }}
          className="music-toggle-face"
        >
          {heights.map((height, index) => (
            <motion.div
              key={index}
              initial={{ height: 1 }}
              animate={{ height: Math.max(4, height * 14) }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              style={{
                width: 2,
                borderRadius: 9999,
                backgroundColor: "#4f46e5",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};


