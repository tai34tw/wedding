import { useState } from "react";

const GOOGLE_FORMS = {
  attending:
    "https://docs.google.com/forms/d/e/1FAIpQLSfNKWgplOoZT1u9nVy1946BUqgbtE-8tPrvVtxTUEIHEllrQQ/formResponse",
  notAttending:
    "https://docs.google.com/forms/d/e/1FAIpQLScWq6EmpGS3x3WIv7spPFTHkv49hCYRxcZRBQ00CanO3PppQQ/formResponse",
};

export default function RSVP() {
  const [attendance, setAttendance] = useState("attending");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // 共用欄位
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    relationshipTo: "新娘親友",
    emailForEInvitation: "",
    addressForPaperInvitation: "",
    numAdults: "0",
    numKids: "0",
    vegetarianCount: "0",
  });

  const RELATIONSHIP_OPTIONS = ["新郎親友", "新娘親友"];

  // --- 📱 手機格式器：自動輸入成 09xx-xxx-xxx ---
  const formatPhone = (v) => {
    const digits = v.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7, 10)}`;
  };

  // --- 📧 email 驗證：允許 "無" ---
  const isValidEmail = (email) =>
    email === "無" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    let { name, value } = e.target;

    const numberFields = ["numAdults", "numKids", "vegetarianCount"];
    if (numberFields.includes(name)) {
      value = value.replace(/\D/g, "");
    }

    if (name === "phoneNumber") {
      value = formatPhone(value);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 手機格式送出前驗證
    if (!/^09\d{2}-\d{3}-\d{3}$/.test(formData.phoneNumber)) {
      alert("請輸入正確的手機格式：09xx-xxx-xxx");
      return;
    }

    if (!isValidEmail(formData.emailForEInvitation)) {
      alert("請輸入正確的 Email，或填寫「無」");
      return;
    }

    setLoading(true);

    const entryMap =
      attendance === "attending"
        ? {
            name: "entry.587561096",
            phoneNumber: "entry.824059083",
            relationshipTo: "entry.774221532",
            numAdults: "entry.220208653",
            numKids: "entry.1193611879",
            vegetarianCount: "entry.588847459",
            emailForEInvitation: "entry.163847035",
            addressForPaperInvitation: "entry.1047704005",
          }
        : {
            name: "entry.587561096",
            phoneNumber: "entry.824059083",
            relationshipTo: "entry.774221532",
            emailForEInvitation: "entry.1610803008",
            addressForPaperInvitation: "entry.1047704005",
          };

    const formUrl =
      attendance === "attending"
        ? GOOGLE_FORMS.attending
        : GOOGLE_FORMS.notAttending;
    const data = new FormData();

    Object.keys(entryMap).forEach((key) => {
      data.append(entryMap[key], formData[key] || "");
    });

    await fetch(formUrl, { method: "POST", mode: "no-cors", body: data });

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted)
    return (
      <div style={styles.thankYouBox}>
        <h2 style={{ color: "#4b3b2f" }}>已收到您的回覆 ❤️</h2>
        <p>期待與您共享幸福時刻。</p>
      </div>
    );

  return (
    <div style={styles.container}>
      {/* <h2 style={styles.title}>RSVP</h2> */}

      {/* 出席切換 */}
      <div style={styles.toggleBox}>
        <button
          onClick={() => setAttendance("attending")}
          style={{
            ...styles.toggleBtn,
            ...(attendance === "attending" ? styles.activeBtn : {}),
          }}
        >
          將出席
        </button>
        <button
          onClick={() => setAttendance("notAttending")}
          style={{
            ...styles.toggleBtn,
            ...(attendance === "notAttending" ? styles.activeBtn : {}),
          }}
        >
          無法出席
        </button>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* 姓名 */}
        <Field label="姓名 *">
          <input
            name="name"
            required
            style={styles.underlineInput}
            value={formData.name}
            onChange={handleChange}
          />
        </Field>

        {/* 手機 */}
        <Field label="手機號碼 *">
          <input
            name="phoneNumber"
            placeholder="09xx-xxx-xxx"
            required
            style={{
              ...styles.underlineInput,
              borderBottom:
                formData.phoneNumber &&
                !/^09\d{2}-\d{3}-\d{3}$/.test(formData.phoneNumber)
                  ? "2px solid #b85c5c"
                  : "1px solid rgba(75,59,47,0.55)",
            }}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Field>

        {/* 關係 */}
        <Field label="關係 *">
          <select
            name="relationshipTo"
            required
            style={styles.underlineSelect}
            value={formData.relationshipTo}
            onChange={handleChange}
          >
            {RELATIONSHIP_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>

        {/* 出席欄位 */}
        {attendance === "attending" && (
          <>
            <Field label="出席大人人數 *">
              <input
                name="numAdults"
                required
                style={styles.underlineInput}
                value={formData.numAdults}
                onChange={handleChange}
              />
            </Field>

            <Field label="出席小孩人數 *">
              <input
                name="numKids"
                required
                style={styles.underlineInput}
                value={formData.numKids}
                onChange={handleChange}
              />
            </Field>

            <Field label="素食份數 *">
              <input
                name="vegetarianCount"
                required
                style={styles.underlineInput}
                value={formData.vegetarianCount}
                onChange={handleChange}
              />
            </Field>
          </>
        )}

        {/* Email */}
        <Field label="電子喜帖 Email*">
          <input
            name="emailForEInvitation"
            placeholder="不需要請輸入無"
            required
            style={{
              ...styles.underlineInput,
              borderBottom:
                formData.emailForEInvitation &&
                !isValidEmail(formData.emailForEInvitation)
                  ? "2px solid #b85c5c"
                  : "1px solid rgba(75,59,47,0.55)",
            }}
            value={formData.emailForEInvitation}
            onChange={handleChange}
          />
        </Field>

        {/* 地址 */}
        <Field label="紙本喜帖寄送地址">
          <input
            name="addressForPaperInvitation"
            placeholder="郵遞區號＋地址（不需要請填無）"
            style={styles.underlineInput}
            value={formData.addressForPaperInvitation}
            onChange={handleChange}
          />
        </Field>

        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? "送出中…" : "送出回覆"}
        </button>
      </form>
    </div>
  );
}

/* ⬇ 小組件：統一底線欄位排版 */
function Field({ label, children }) {
  return (
    <div style={styles.underlineField}>
      {label}
      {children}
    </div>
  );
}

/* 🎨 樣式 */
const styles = {
  container: {
    padding: "28px",
    maxWidth: "480px",
    width: "50%",
    minHeight: "960px",
    margin: "auto",
    fontFamily: "serif",
    color: "#4b3b2f",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "16px",
  },
  toggleBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  toggleBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #a18350",
    background: "#d7c7b5",
    cursor: "pointer",
    color: "white",
  },
  activeBtn: {
    background: "#a18350",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  underlineField: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "16px",
    marginBottom: "18px",
  },
  underlineInput: {
    border: "none",
    borderBottom: "1px solid rgba(75,59,47,0.55)",
    padding: "6px 4px",
    background: "transparent",
    fontSize: "16px",
    color: "#4b3b2f",
    outline: "none",
  },
  underlineSelect: {
    border: "none",
    borderBottom: "1px solid rgba(75,59,47,0.55)",
    padding: "6px 2px",
    background: "transparent",
    fontSize: "16px",
    color: "#4b3b2f",
    outline: "none",
  },
  submitBtn: {
    marginTop: "10px",
    padding: "12px",
    background: "#a18350",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  thankYouBox: {
    padding: "32px",
    maxWidth: "580px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "serif",
    // color: "#4b3b2f",
    color: "#a18350",
  },
};
