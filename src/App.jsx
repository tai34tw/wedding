import { useRef, useEffect } from "react";
import { COLORS, WEDDING_INFO } from "./constants/wedding.js";
import coupleImage from "./assets/images/couple.png";
import MapSection from "./components/MapSection.jsx";
import FindSeatSection from "./components/SeatSection.jsx";
import Divider from "./components/Divider.jsx";
import Countdown from "./components/Countdown.jsx";

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    const updateVh = () => {
      const vh = window.innerHeight; // 使用 JS 獲取精確的可視高度
      if (appRef.current) {
        // 將高度設定為 CSS 變數
        appRef.current.style.setProperty("--app-height", `${vh}px`);
      }
    };
    updateVh();
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  const isMobile = window.innerWidth < 480;

  return (
    <div style={styles.outer}>
      <div style={styles.container}>
        <div style={styles.app} ref={appRef}>
          <section style={styles.homeSection}>
            <Divider
              text={<Countdown inline />}
              style={styles.largeDividerWithNoMargin}
            />
            <header style={styles.header}>
              <h1 style={styles.mainTitle}>WONDERFUL DAY</h1>

              <div style={styles.coupleSection}>
                <img
                  src={coupleImage}
                  alt="新人照片"
                  style={styles.coupleImage}
                />
              </div>

              <div style={styles.invitation(isMobile)}>
                <p>元泰💍素惠的婚禮</p>
                <p>{WEDDING_INFO.displayDate}</p>
                <p style={styles.quickLinksRow}>
                  <a href="#seatSearch" style={styles.quickLink}>
                    桌次查詢
                  </a>
                  <span aria-hidden="true" style={styles.quickLinkSeparator}>
                    |
                  </span>
                  <a href="#location" style={styles.quickLink}>
                    交通資訊
                  </a>
                </p>
              </div>
            </header>
            <Divider
              text={` FIND YOUR SEAT `}
              style={styles.largeDividerWithNoMargin}
            />
          </section>
          <FindSeatSection />
          <Divider
            text={` WHERE TO GO `}
            style={styles.largeDividerWithNoMargin}
          />
          <MapSection />
        </div>
      </div>
    </div>
  );
}

const styles = {
  outer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },

  container: {
    width: "100%",
    maxWidth: "900px", // 推薦 900，可調整成 800 / 1000 都可
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },

  app: {
    width: "100%",
    backgroundColor: COLORS.background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Playfair Display', 'Noto Serif TC', serif",
    color: COLORS.primary,
    padding: 0,
    boxSizing: "border-box",
  },
  homeSection: {
    height: "var(--app-height, 100dvh)", // 優先使用--app-height, 100dvh為預設值
    width: "100%",
    padding: "clamp(0px, 4vw, 60px) 0 clamp(5px, 4vw, 80px)", // 最大化可用垂直空間
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // 讓 Divider 黏在最上面和最下面
  },
  header: {
    textAlign: "center",
    flex: 1, // 讓中間內容自動佔據剩餘空間
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  mainTitle: {
    fontSize: "clamp(40px, 4vw, 58px)",
    fontWeight: 500,
    lineHeight: "1.2",
    textTransform: "uppercase",
    textShadow: "0 2px 6px rgba(0,0,0,0.1)",
    letterSpacing: "3px",
    margin: `clamp(0px, 1vw, 8px) 0 clamp(0px, 3vw, 16px)`,
    fontFamily: "'Sawarabi Mincho', serif",
    color: COLORS.primary,
  },
  coupleSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "clamp(5px, 4vw, 20px)",
  },
  coupleImage: {
    width: "clamp(170px, 4vw, 500px)",
    height: "auto",
    borderRadius: "12px",
    objectFit: "cover",
  },
  invitation: (isMobile) => ({
    lineHeight: isMobile ? "1" : "1.5",
    fontSize: "clamp(14px, 4vw, 20px)",
    letterSpacing: "1px",
    color: COLORS.primary,
  }),
  quickLinksRow: {
    margin: "1em 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "18px",
  },
  quickLink: {
    color: COLORS.primary,
    textDecoration: "none",
    cursor: "pointer",
    padding: "0 4px",
  },
  quickLinkSeparator: {
    userSelect: "none",
  },
  largeDividerWithNoMargin: {
    margin: 0,
    fontSize: "18px",
  },
};

export default App;
