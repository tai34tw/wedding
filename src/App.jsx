import { COLORS, WEDDING_INFO } from "./constants/wedding.js";
import coupleImage from "./assets/images/couple.png";
import MapSection from "./components/MapSection.jsx";
import Countdown from "./components/Countdown.jsx";
import Divider from "./components/Divider.jsx";
import RSVP from "./components/RSVP.jsx";

function App() {
  return (
    <div style={styles.app}>
      <Divider text={WEDDING_INFO.date} />

      <header style={styles.header}>
        <h1 style={styles.mainTitle}>We Are Getting Married</h1>

        <div style={styles.coupleSection}>
          <img src={coupleImage} alt="新人照片" style={styles.coupleImage} />
        </div>

        <div style={styles.invitation}>
          <p>誠摯邀請</p>
          <p>素惠 ❤️元泰的婚禮</p>
          <p>{WEDDING_INFO.displayDate}</p>
          <p>{WEDDING_INFO.venue}</p>
          <p>與我們一起慶祝！</p>
        </div>
      </header>
      <Divider text="How to Get There" />
      <MapSection />
      <Divider text="RSVP" />
      <Countdown />
      <RSVP />
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: COLORS.background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Playfair Display', 'Noto Serif TC', serif",
    color: COLORS.primary,
    padding: "60px 80px",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    width: "100%",
    marginBottom: "40px",
  },
  mainTitle: {
    fontSize: "58px",
    fontWeight: 500,
    lineHeight: "1.2",
    textTransform: "uppercase",
    textShadow: "0 2px 6px rgba(0,0,0,0.1)",
    letterSpacing: "3px",
    margin: "40px 0 20px",
    fontFamily: "'Sawarabi Mincho', serif",
    color: COLORS.primary,
  },
  coupleSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  coupleImage: {
    width: "170px",
    height: "auto",
    borderRadius: "12px",
    objectFit: "cover",
  },
  invitation: {
    lineHeight: "1.8",
    fontSize: "18px",
    letterSpacing: "1px",
    color: COLORS.primary,
  },
};

export default App;
