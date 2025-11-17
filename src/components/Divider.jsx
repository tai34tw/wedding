import { COLORS } from "../constants/wedding.js";

function Divider({ text }) {
  return (
    <div style={styles.divider}>
      <div style={styles.dividerLine} />
      <span style={styles.dividerText}>{text}</span>
    </div>
  );
}

const styles = {
  divider: {
    width: "100%",
    textAlign: "center",
    fontSize: "18px",
    letterSpacing: "2px",
    color: COLORS.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    margin: "5px 0",
  },
  dividerLine: {
    position: "absolute",
    top: "50%",
    left: 0,
    width: "100%",
    height: "1px",
    backgroundColor: COLORS.divider,
    zIndex: 0,
  },
  dividerText: {
    position: "relative",
    backgroundColor: COLORS.background,
    padding: "0 16px",
    zIndex: 1,
  },
};

export default Divider;
