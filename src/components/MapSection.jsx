import { COLORS, WEDDING_INFO } from "../constants/wedding.js";
import mapPreviewImage from "../assets/images/map-preview.png";
import shuttleIcon from "/icons/shuttle.svg";
import subwayIcon from "/icons/subway.svg";
import carIcon from "/icons/car.svg";

function MapSection() {
  return (
    <section id="location" style={styles.section}>
      <div style={styles.mapContainer}>
        <div style={styles.venueInfo}>
          <p style={styles.venueName}>{WEDDING_INFO.venue}</p>
          <p style={styles.venueAddress}>{WEDDING_INFO.address}</p>
        </div>

        <div style={styles.transportation}>
          <TransportInfo
            icon={subwayIcon}
            title="捷運/公車"
            content="捷運淡水線至士林捷運站，轉乘公車255、304、小型公車18、19，至故宮博物院站下站（步行約3分鐘）。"
          />
          <TransportInfo
            icon={shuttleIcon}
            title="接駁車"
            content={
              <>
                乘車處 - 劍南路捷運站一號出口直行至北安路交叉口
                <br />
                接駁時間：16:30~18:30，每10分鐘一班（車程約5分鐘）。
                <br />
                搭車指引：
                <a
                  href="https://youtube.com/shorts/wDz2kf8dk08?si=vPbVUMQma4Yzt3ch"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube Shorts
                </a>
              </>
            }
          />
          <TransportInfo
            icon={carIcon}
            title="自行前往"
            content="車位有限，建議停放附近停車場。"
          />
        </div>

        <div style={styles.mapFrame}>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=青青食尚花園會館"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.mapLink}
            onMouseEnter={(e) => {
              const overlay = e.currentTarget.querySelector(".map-overlay");
              overlay.style.opacity = 1;
            }}
            onMouseLeave={(e) => {
              const overlay = e.currentTarget.querySelector(".map-overlay");
              overlay.style.opacity = 0;
            }}
          >
            <img
              src={mapPreviewImage}
              alt="Google Map Preview"
              style={styles.mapImage}
            />
            <div style={styles.mapOverlay} className="map-overlay">
              Open Google Maps
            </div>
            <p style={styles.clickPrompt}>&lt; 點圖開啟導航 &gt;</p>
          </a>
        </div>
      </div>
    </section>
  );
}

function TransportInfo({ icon, title, content }) {
  return (
    <div style={styles.transportItem}>
      <div style={styles.transportHeader}>
        <img src={icon} alt={title} style={styles.transportIcon} />
        <span style={styles.transportTitle}>{title}</span>
      </div>
      <p style={styles.transportContent}>{content}</p>
    </div>
  );
}

const styles = {
  section: {
    width: "100%",
    marginBottom: "60px",
  },
  mapContainer: {
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "32px 20px 20px",
    boxSizing: "border-box",
  },
  venueInfo: {
    textAlign: "left",
    marginBottom: "16px",
  },
  venueName: {
    fontSize: "clamp(16px, 4vw, 20px)",
    margin: "0 0 4px 0",
    fontWeight: "700",
  },
  venueAddress: {
    fontSize: "clamp(14px, 4vw, 18px)",
    margin: 0,
  },
  mapFrame: {
    width: "100%",
    marginBottom: "16px",
    display: "flex",
    justifyContent: "center", // ★ 讓地圖置中
  },
  mapLink: {
    position: "relative",
    display: "block",
    width: "90%",
    maxWidth: "660px", // ★ 可避免大螢幕太寬
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    margin: "0 auto", // ★ 置中保險
  },
  mapImage: {
    width: "100%",
    display: "block",
  },
  mapOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.background67,
    color: COLORS.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "600",
    opacity: 0,
    transition: "opacity 0.25s ease-in-out",
  },
  clickPrompt: {
    textAlign: "center",
    textDecoration: "none",
    fontSize: "clamp(12px, 3vw, 16px)",
    color: COLORS.primary, // 使用輔助色強調
    fontWeight: 500,
    // 讓文字居中，並設定底部間距
    margin: "8px auto 24px auto",
    width: "90%",
    maxWidth: "660px",
    fontStyle: "italic",
  },
  transportation: {
    width: "100%",
    maxWidth: "none",
    margin: "0",
    textAlign: "left",
    lineHeight: "clamp(1.5, 4vw, 1.8)",
  },
  transportItem: {
    marginBottom: "16px",
  },
  transportHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
  },
  transportIcon: {
    width: "20px",
    height: "20px",
  },
  transportTitle: {
    fontSize: "clamp(12px, 4vw, 18px)",
    fontWeight: "600",
  },
  transportContent: {
    marginLeft: "28px",
    fontSize: "clamp(12px, 4vw, 18px)",
    whiteSpace: "pre-line",
  },
};

export default MapSection;
