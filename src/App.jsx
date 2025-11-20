import { COLORS, WEDDING_INFO } from "./constants/wedding.js";
import coupleImage from "./assets/images/couple.png";
import MapSection from "./components/MapSection.jsx";
import Countdown from "./components/Countdown.jsx";
import Divider from "./components/Divider.jsx";
import RSVP from "./components/RSVP.jsx";

function App() {
  const isMobile = window.innerWidth < 480;
  return (
    <div style={styles.outer}>
      <div style={styles.container}>
        <div style={styles.app}>
          <section style={styles.homeSection}>
            <Divider text={WEDDING_INFO.date} />
            <header style={styles.header}>
              <h1 style={styles.mainTitle}>We Are Getting Married</h1>

              <div style={styles.coupleSection}>
                <img
                  src={coupleImage}
                  alt="新人照片"
                  style={styles.coupleImage}
                />
              </div>

              <div style={styles.invitation(isMobile)}>
                <p>誠摯邀請</p>
                <p>素惠 ❤️元泰的婚禮</p>
                <p>{WEDDING_INFO.displayDate}</p>
                <p>{WEDDING_INFO.venue}</p>
                <p>與我們一起慶祝！</p>
              </div>
            </header>
            <Divider text={`How to Get There\n↓`} />
          </section>
          <MapSection />
          <Divider text="RSVP" />
          <Countdown />
          <RSVP />
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
    minHeight: "100vh",
    width: "100%",
    backgroundColor: COLORS.background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Playfair Display', 'Noto Serif TC', serif",
    color: COLORS.primary,
    padding: `clamp(30px, 4vw, 60px) 0 clamp(40px, 4vw, 80px)`,
    boxSizing: "border-box",
  },
  homeSection: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
    width: "100%",
    marginBottom: "clamp(10px, 4vw, 20px)",
  },
  mainTitle: {
    fontSize: "clamp(46px, 4vw, 58px)",
    fontWeight: 500,
    lineHeight: "1.2",
    textTransform: "uppercase",
    textShadow: "0 2px 6px rgba(0,0,0,0.1)",
    letterSpacing: "3px",
    margin: `clamp(20px, 4vw, 40px) 0 clamp(10px, 4vw, 20px)`,
    fontFamily: "'Sawarabi Mincho', serif",
    color: COLORS.primary,
  },
  coupleSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "clamp(10px, 4vw, 20px)",
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
  // invitation: (isMobile) => ({
  //   lineHeight: isMobile ? "1.2" : "1.8",
  //   fontSize: isMobile ? "16px" : "18px",
  //   letterSpacing: "1px",
  //   color: COLORS.primary,
  // }),
};

export default App;
