import React, { useCallback, useEffect, useState } from "react";
import { COLORS, WEDDING_INFO } from "../constants/wedding.js";

function Countdown({ inline = false }) {
  const weddingTime = new Date(WEDDING_INFO.weddingDateTime).getTime();

  const calculateTimeLeft = useCallback(() => {
    const now = Date.now();
    const distance = weddingTime - now;

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  }, [weddingTime]);

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());
  const isFinished =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <section style={inline ? styles.inlineSection : styles.countdownSection}>
      {inline ? (
        <span style={styles.inlineText}>
          {isFinished
            ? "HAVE FUN"
            : `${timeLeft.days} Days ${timeLeft.hours} Hours ${timeLeft.minutes} Mins ${timeLeft.seconds} Secs`}
        </span>
      ) : isFinished ? (
        <div style={styles.finishedText}>HAVE FUN</div>
      ) : (
        <div style={styles.timerGrid}>
          <TimeBox label="Days" value={timeLeft.days} />
          <TimeBox label="Hours" value={timeLeft.hours} />
          <TimeBox label="Mins" value={timeLeft.minutes} />
          <TimeBox label="Secs" value={timeLeft.seconds} />
        </div>
      )}
    </section>
  );
}

function TimeBox({ label, value }) {
  return (
    <div style={styles.timeBox}>
      <div style={styles.timeNumber}>{value}</div>
      <div style={styles.timeLabel}>{label}</div>
    </div>
  );
}

const styles = {
  countdownSection: {
    textAlign: "center",
    width: "100%",
    marginBottom: "40px",
    color: COLORS.secondary,
  },
  inlineSection: {
    width: "auto",
    margin: "0",
    color: COLORS.secondary,
  },
  timerGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "clamp(8px, 4vw, 50px)",
    marginBottom: "40px",
    flexWrap: "nowrap",
  },
  inlineText: {
    fontSize: "clamp(14px, 4vw, 20px)",
    letterSpacing: "1px",
    whiteSpace: "nowrap",
  },
  finishedText: {
    fontSize: "clamp(24px, 5vw, 36px)",
    fontWeight: "600",
    letterSpacing: "3px",
    marginBottom: "40px",
  },
  timeBox: {
    minWidth: "70px",
    textAlign: "center",
  },
  timeNumber: {
    fontSize: "clamp(30px, 4vw, 42px)",
    fontWeight: "300",
    letterSpacing: "4px",
  },
  timeLabel: {
    marginTop: "10px",
    fontSize: "clamp(12px, 4vw, 16px)",
    letterSpacing: "3px",
    opacity: 0.8,
  },
};

export default Countdown;
