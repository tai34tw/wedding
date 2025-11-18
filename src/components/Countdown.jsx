import React, { useState, useEffect } from "react";
import { COLORS, WEDDING_INFO } from "../constants/wedding.js";

function Countdown() {
  const weddingDate = new Date(WEDDING_INFO.weddingDateTime);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const distance = weddingDate - now;

      if (distance <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      };
    };

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
  }, [weddingDate]);

  return (
    <section style={styles.countdownSection}>
      <h2 style={styles.countdownTitle}>WEDDING COUNTDOWN</h2>
      <p style={styles.countdownSubtitle}>距離婚禮還有</p>

      <div style={styles.timerGrid}>
        <TimeBox label="Days" value={timeLeft.days} />
        <TimeBox label="Hours" value={timeLeft.hours} />
        <TimeBox label="Mins" value={timeLeft.minutes} />
        <TimeBox label="Secs" value={timeLeft.seconds} />
      </div>

      <p style={styles.countdownFooter}>期待與你們見面！</p>
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
    color: COLORS.primary,
  },
  countdownTitle: {
    fontSize: "36px",
    letterSpacing: "6px",
    fontWeight: "300",
    marginBottom: "20px",
  },
  countdownSubtitle: {
    fontSize: "20px",
    marginBottom: "40px",
    letterSpacing: "3px",
  },
  timerGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "50px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  timeBox: {
    minWidth: "80px",
  },
  timeNumber: {
    fontSize: "42px",
    fontWeight: "300",
    letterSpacing: "4px",
  },
  timeLabel: {
    marginTop: "10px",
    fontSize: "16px",
    letterSpacing: "3px",
    opacity: 0.8,
  },
  countdownFooter: {
    fontSize: "20px",
    letterSpacing: "3px",
  },
};

export default Countdown;
