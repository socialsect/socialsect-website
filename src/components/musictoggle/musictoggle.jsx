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
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  // Function to check if audio file exists
  const checkAudioExists = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error("Error checking audio file:", error);
      return false;
    }
  };

  // Retry mechanism for audio loading
  const retryAudioLoad = () => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      setHasError(false);
      setIsLoading(true);
      // Force re-render by updating a state
      setHeights(getRandomHeights());
    }
  };

  const [play, { pause, sound }] = useSound("/audio.mp3", {
    loop: true,
    onplay: () => {
      setIsPlaying(true);
      setHasError(false);
    },
    onend: () => setIsPlaying(false),
    onpause: () => setIsPlaying(false),
    onstop: () => setIsPlaying(false),
    onload: () => {
      setIsLoading(false);
      setHasError(false);
      setRetryCount(0);
    },
    onloaderror: (error) => {
      console.error("Audio loading error:", error);
      setHasError(true);
      setIsLoading(false);
      
      // Auto-retry after a delay
      if (retryCount < 2) {
        setTimeout(() => {
          retryAudioLoad();
        }, 2000);
      }
    },
    soundEnabled: true,
    preload: true,
  });

  // Check audio availability on component mount
  useEffect(() => {
    const checkAudio = async () => {
      const exists = await checkAudioExists("/audio.mp3");
      if (!exists) {
        console.warn("Audio file not found at /audio.mp3");
        setHasError(true);
        setIsLoading(false);
      }
    };
    
    checkAudio();
  }, []);

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
    if (hasError) {
      console.log("Audio failed to load, cannot play");
      return;
    }
    
    if (isLoading) {
      console.log("Audio is still loading, please wait");
      return;
    }
    
    if (isPlaying) {
      pause();
      setIsPlaying(false);
      return;
    }
    
    try {
      play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
      setHasError(true);
    }
  };

  return (
    <>
      <motion.div
        onClick={handleClick}
        key="audio"
        initial={{ scale: 1 }}
        whileHover={{ scale: hasError || isLoading ? 1 : 1.06 }}
        whileTap={{ scale: hasError || isLoading ? 1 : 0.98 }}
        transition={{ duration: 1, bounce: 0.6, type: "spring" }}
        style={{ 
          cursor: hasError || isLoading ? "not-allowed" : "pointer", 
          borderRadius: 9999, 
          display: "grid", 
          placeItems: "center",
          opacity: hasError ? 0.5 : 1
        }}
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
          {hasError ? (
            <div style={{ 
              color: "#ef4444", 
              fontSize: "10px", 
              textAlign: "center",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}>
              <div>Audio Error</div>
              {retryCount < 3 && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    retryAudioLoad();
                  }}
                  style={{
                    background: "transparent",
                    border: "1px solid #ef4444",
                    color: "#ef4444",
                    borderRadius: "4px",
                    padding: "2px 6px",
                    fontSize: "8px",
                    cursor: "pointer"
                  }}
                >
                  Retry
                </button>
              )}
            </div>
          ) : isLoading ? (
            <div style={{ 
              color: "#6b7280", 
              fontSize: "12px", 
              textAlign: "center",
              padding: "8px"
            }}>
              Loading...
            </div>
          ) : (
            heights.map((height, index) => (
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
            ))
          )}
        </motion.div>
      </motion.div>
    </>
  );
};


