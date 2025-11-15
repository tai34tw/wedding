import { WEDDING_INFO } from "../constants/wedding.js";

function MapSection() {
  return (
    <section style={styles.section}>
      <div style={styles.mapContainer}>
        <h2 style={styles.mapTitle}>MAP</h2>
        <div style={styles.venueInfo}>
          <p style={styles.venueName}>{WEDDING_INFO.venue}</p>
          <p style={styles.venueAddress}>{WEDDING_INFO.address}</p>
        </div>

        <div style={styles.mapFrame}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.1131040703704!2d121.550742!3d25.0980324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac3b78936b87%3A0x87561057caaacb5!2z6Z2S6Z2S6aOf5bCa6Iqx5ZyS5pyD6aSo!5e0!3m2!1szh-TW!2stw!4v1762788597076!5m2!1szh-TW!2stw"
            width="100%"
            height="400"
            style={styles.iframe}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Location Map"
          />
        </div>

        <div style={styles.transportation}>
          <TransportInfo
            icon="/icons/subway.png"
            title="捷運/公車"
            content="捷運淡水線至士林站，轉乘公車815、255、304、小型公車18、19，至故宮博物院站下站。"
          />
          <TransportInfo
            icon="/icons/shuttle.png"
            title="接駁車"
            content="乘車處 - 士林捷運站一號出口直行至中正路左側（中正路249-1號）
接駁時間：晚宴：16:45、17:15、17:45、18:15"
          />
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
    padding: "20px",
    boxSizing: "border-box",
  },
  mapTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "8px",
    textAlign: "left",
  },
  venueInfo: {
    textAlign: "left",
    marginBottom: "16px",
  },
  venueName: {
    fontSize: "18px",
    margin: "0 0 4px 0",
  },
  venueAddress: {
    fontSize: "16px",
    margin: 0,
  },
  mapFrame: {
    width: "100%",
    marginBottom: "16px",
  },
  iframe: {
    border: 0,
    borderRadius: "12px",
  },
  transportation: {
    textAlign: "left",
    lineHeight: "1.6",
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
    fontSize: "16px",
    fontWeight: "600",
  },
  transportContent: {
    marginLeft: "28px",
    fontSize: "16px",
    whiteSpace: "pre-line",
  },
};

export default MapSection;
