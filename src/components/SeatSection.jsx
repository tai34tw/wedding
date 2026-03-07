import { useMemo, useState } from "react";
import { COLORS } from "../constants/wedding.js";
import seatCodesRaw from "../constants/seat-codes.txt?raw";

const CODE_HASH_SALT = "wedding-seat";

const TABLE_NAME_TO_NUMBER = {
  雙星合耀: "雙星合耀",

  父傳榮耀: "父傳榮耀",
  親領風華: "親領風華",
  萱草花開: "萱草花開",
  昕火相傳: "昕火相傳",
  星光閃耀: "星光閃耀",
  生靈薈萃: "生靈薈萃",
  排山倒海: "排山倒海",
  球不落地: "球不落地",

  親情是你: "親情是你",
  年少有你: "年少有你",
  血脈有你: "血脈有你",
  緣來是你: "緣來是你",
  青春有你: "青春有你",
  來自康康的你: "來自康康的你",
  感恩有你: "感恩有你",
};

const TABLES = [
  { id: "雙星合耀", x: 50, y: 15 },
  { id: "親領風華", x: 87, y: 32 },
  { id: "球不落地", x: 87, y: 48 },
  { id: "生靈薈萃", x: 87, y: 64 },
  { id: "星光閃耀", x: 87, y: 80 },
  { id: "父傳榮耀", x: 68, y: 37 },
  { id: "排山倒海", x: 68, y: 53 },
  { id: "萱草花開", x: 68, y: 69 },
  { id: "昕火相傳", x: 68, y: 85 },
  { id: "親情是你", x: 32, y: 37 },
  { id: "血脈有你", x: 32, y: 53 },
  { id: "年少有你", x: 32, y: 69 },
  { id: "青春有你", x: 32, y: 85 },
  { id: "緣來是你", x: 14, y: 44 },
  { id: "來自康康的你", x: 14, y: 60 },
  { id: "感恩有你", x: 14, y: 76 },
];

function formatTableLabel(tableName) {
  if (tableName === "雙星合耀") return tableName;

  const chars = [...tableName];
  if (chars.length === 4) {
    return `${chars.slice(0, 2).join("")}\n${chars.slice(2).join("")}`;
  }
  if (chars.length >= 3) {
    const chunks = [];
    for (let i = 0; i < chars.length; i += 3) {
      chunks.push(chars.slice(i, i + 3).join(""));
    }
    return chunks.join("\n");
  }

  return tableName;
}

function parseSeatCodes(raw) {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [code, tableName] = line.split("-").map((part) => part.trim());
      return { code, tableName };
    })
    .filter((entry) => entry.code && entry.tableName);
}

function sha256Fallback(ascii) {
  const rightRotate = (value, amount) =>
    (value >>> amount) | (value << (32 - amount));
  let mathPow = Math.pow;
  let maxWord = mathPow(2, 32);
  let result = "";
  let words = [];
  let asciiBitLength = ascii.length * 8;
  let hash = sha256Fallback.h || [];
  let k = sha256Fallback.k || [];
  let primeCounter = k.length;
  let isComposite = {};

  for (let candidate = 2; primeCounter < 64; candidate += 1) {
    if (!isComposite[candidate]) {
      for (let i = 0; i < 313; i += candidate) isComposite[i] = candidate;
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  sha256Fallback.h = hash;
  sha256Fallback.k = k;

  ascii += "\x80";
  while ((ascii.length % 64) - 56) ascii += "\x00";
  for (let i = 0; i < ascii.length; i += 1) {
    const j = ascii.charCodeAt(i);
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;

  for (let j = 0; j < words.length; ) {
    let w = words.slice(j, (j += 16));
    let oldHash = hash.slice(0);
    hash = hash.slice(0, 8);

    for (let i = 0; i < 64; i += 1) {
      let w15 = w[i - 15];
      let w2 = w[i - 2];
      let a = hash[0];
      let e = hash[4];
      let temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);
      let temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (let i = 0; i < 8; i += 1) hash[i] = (hash[i] + oldHash[i]) | 0;
  }

  for (let i = 0; i < 8; i += 1) {
    for (let j = 3; j + 1; j -= 1) {
      let b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? "0" : "") + b.toString(16);
    }
  }
  return result;
}

async function hashQueryCode(code) {
  const input = `${CODE_HASH_SALT}:${code}`;
  if (globalThis.crypto?.subtle) {
    const bytes = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return sha256Fallback(input);
}

function FindSeatSection() {
  const seatData = useMemo(() => parseSeatCodes(seatCodesRaw), []);
  const [queryCode, setQueryCode] = useState("");
  const [inputError, setInputError] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 480;

  const highlightedTableIds = useMemo(
    () =>
      new Set(
        results
          .map((entry) => TABLE_NAME_TO_NUMBER[entry.tableName] || null)
          .filter(Boolean),
      ),
    [results],
  );

  const matchedTableNames = useMemo(
    () => [...new Set(results.map((entry) => entry.tableName))],
    [results],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalized = queryCode.trim();
    if (!/^\d{4}$/.test(normalized)) {
      setResults([]);
      setSearched(true);
      return;
    }

    const hashedCode = await hashQueryCode(normalized);
    const found = seatData.filter((entry) => entry.code === hashedCode);
    setResults(found);
    setSearched(true);
  };

  const handleQueryCodeChange = (event) => {
    const raw = event.target.value;
    if (/\D/.test(raw)) {
      setInputError("請輸入數字");
    } else {
      setInputError("");
    }
    setQueryCode(raw.replace(/\D/g, ""));
  };

  return (
    <section id="seatSearch" style={styles.section}>
      <div style={styles.container}>
        <form style={styles.searchForm} onSubmit={handleSubmit}>
          <input
            type="text"
            inputMode="numeric"
            placeholder="請輸入手機末四碼，例如 9339"
            value={queryCode}
            onChange={handleQueryCodeChange}
            style={{ ...styles.input, ...(isMobile ? styles.inputMobile : {}) }}
          />
          <button type="submit" style={styles.button}>
            桌次查詢
          </button>
        </form>
        {inputError && <p style={styles.inputErrorText}>{inputError}</p>}

        {searched && results.length > 0 && (
          <>
            <p style={styles.successText}>
              查詢結果：{matchedTableNames.join("、")}
            </p>

            <div style={styles.mapWrapper}>
              <div
                style={{
                  ...styles.seatMap,
                  ...(isMobile ? styles.seatMapMobile : {}),
                }}
              >
                <div
                  style={{
                    ...styles.stageBox,
                    ...(isMobile ? styles.stageBoxMobile : {}),
                  }}
                >
                  <div
                    style={{
                      ...styles.stage,
                      ...(isMobile ? styles.stageMobile : {}),
                    }}
                  >
                    舞台
                  </div>
                </div>
                <div
                  style={{
                    ...styles.aisle,
                    ...(isMobile ? styles.aisleMobile : {}),
                  }}
                >
                  紅 毯 大 道
                </div>
                <div
                  style={{
                    ...styles.entrance,
                    ...(isMobile ? styles.entranceMobile : {}),
                  }}
                >
                  出入口
                </div>
                <div
                  style={{
                    ...styles.bridalRoom,
                    ...(isMobile ? styles.bridalRoomMobile : {}),
                  }}
                >
                  新娘房
                </div>
                <div
                  style={{
                    ...styles.restroom,
                    ...(isMobile ? styles.restroomMobile : {}),
                  }}
                >
                  洗手間
                </div>
                <div
                  style={{
                    ...styles.giftDesk,
                    ...(isMobile ? styles.giftDeskMobile : {}),
                  }}
                >
                  收禮桌
                </div>
                {TABLES.map((table) => {
                  const isActive = highlightedTableIds.has(table.id);
                  if (table.id == "雙星合耀") {
                    return (
                      <div
                        key={table.id}
                        style={{
                          ...styles.mainTable,
                          ...(isMobile ? styles.mainTableMobile : {}),
                          left: `${table.x}%`,
                          top: `${table.y}%`,
                          ...(isActive ? styles.tableCircleActive : {}),
                        }}
                      >
                        {formatTableLabel(table.id)}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={table.id}
                      style={{
                        ...styles.tableCircle,
                        ...(isMobile ? styles.tableCircleMobile : {}),
                        left: `${table.x}%`,
                        top: `${table.y}%`,
                        ...(isActive ? styles.tableCircleActive : {}),
                      }}
                    >
                      {formatTableLabel(table.id)}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {searched && results.length === 0 && (
          <p style={styles.errorText}>查無號碼，請找工作人員協助帶位。</p>
        )}
      </div>
    </section>
  );
}

const styles = {
  section: {
    width: "100%",
    marginBottom: "40px",
  },
  container: {
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    boxSizing: "border-box",
    textAlign: "left",
    color: COLORS.primary,
  },
  searchForm: {
    width: "min(100%, 640px)",
    margin: "0 auto 8px auto",
    display: "flex",
    gap: "8px",
    flexWrap: "nowrap",
  },
  input: {
    flex: "1 1 auto",
    minWidth: 0,
    boxSizing: "border-box",
    border: `1px solid ${COLORS.divider}`,
    borderRadius: "8px",
    padding: "12px 14px",
    fontSize: "18px",
    color: COLORS.primary,
    backgroundColor: "#fff",
  },
  inputMobile: {
    fontSize: "16px",
    padding: "10px 12px",
  },
  button: {
    flex: "0 0 140px",
    boxSizing: "border-box",
    border: `1px solid ${COLORS.divider}`,
    borderRadius: "8px",
    padding: "12px 16px",
    backgroundColor: COLORS.background,
    color: COLORS.primary,
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
  },
  successText: {
    width: "min(100%, 640px)",
    margin: "8px auto 16px auto",
    fontSize: "20px",
    fontWeight: "600",
    color: "#2f6b2f",
  },
  errorText: {
    width: "min(100%, 640px)",
    margin: "8px auto 16px auto",
    fontSize: "20px",
    color: "#a33a3a",
  },
  inputErrorText: {
    width: "min(100%, 640px)",
    margin: "4px auto 8px auto",
    fontSize: "16px",
    color: "#a33a3a",
  },
  mapWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "8px",
  },
  seatMap: {
    width: "min(100%, 840px)",
    aspectRatio: "3 / 3.4",
    border: `2px solid ${COLORS.primary}`,
    position: "relative",
    backgroundColor: "#fff",
    overflow: "visible",
  },
  seatMapMobile: {
    aspectRatio: "3 / 4.3",
    overflow: "visible",
  },
  stageBox: {
    position: "absolute",
    top: "-2px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "86%",
    border: `2px solid ${COLORS.primary}`,
    borderBottomLeftRadius: "70% 120%",
    borderBottomRightRadius: "70% 120%",
    backgroundColor: "#fff",
    padding: "8px 0 80px 0",
  },
  stageBoxMobile: {
    width: "74%",
    padding: "6px 0 52px 0",
  },
  stage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    textAlign: "center",
    fontSize: "clamp(20px, 3vw, 30px)",
    fontWeight: "700",
  },
  stageMobile: {
    fontSize: "clamp(16px, 2.8vw, 22px)",
  },
  mainTable: {
    position: "absolute",
    top: "13%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: `2px solid ${COLORS.primary}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "700",
    backgroundColor: "#fff",
    textAlign: "center",
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    wordBreak: "break-all",
    lineHeight: "1.2",
    padding: "10px",
    boxSizing: "border-box",
  },
  mainTableMobile: {
    width: "78px",
    height: "78px",
    fontSize: "14px",
    padding: "6px",
    top: "15%",
  },
  aisle: {
    position: "absolute",
    left: "50%",
    top: "25%",
    transform: "translateX(-50%)",
    width: "80px",
    height: "70%",
    border: `2px solid ${COLORS.primary}`,
    writingMode: "vertical-rl",
    textOrientation: "upright",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "700",
    letterSpacing: "2px",
    backgroundColor: "#fff",
    whiteSpace: "pre-line",
  },
  aisleMobile: {
    width: "42px",
    fontSize: "14px",
    letterSpacing: "0px",
  },
  entrance: {
    position: "absolute",
    left: "50%",
    bottom: "-2px",
    transform: "translateX(-50%)",
    width: "120px",
    textAlign: "center",
    border: `2px solid ${COLORS.primary}`,
    fontSize: "20px",
    padding: "14px 0",
    backgroundColor: "#fff",
  },
  entranceMobile: {
    width: "74px",
    fontSize: "13px",
    padding: "8px 0",
  },
  bridalRoom: {
    position: "absolute",
    top: "-2px",
    right: "-124px",
    width: "120px",
    textAlign: "center",
    border: `2px solid ${COLORS.primary}`,
    fontSize: "22px",
    padding: "36px 0",
    backgroundColor: "#fff",
  },
  bridalRoomMobile: {
    top: "-2px",
    right: "-56px",
    width: "52px",
    fontSize: "14px",
    padding: "8px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    writingMode: "vertical-rl",
    textOrientation: "upright",
    letterSpacing: "1px",
  },
  restroom: {
    position: "absolute",
    left: "-74px",
    bottom: "-2px",
    width: "70px",
    height: "120px",
    border: `2px solid ${COLORS.primary}`,
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    writingMode: "vertical-rl",
    textOrientation: "upright",
    letterSpacing: "2px",
  },
  restroomMobile: {
    left: "-56px",
    bottom: "-2px",
    width: "52px",
    height: "100px",
    fontSize: "14px",
    letterSpacing: "1px",
  },
  giftDesk: {
    position: "absolute",
    right: "60px",
    bottom: "-6.8%",
    width: "160px",
    textAlign: "center",
    border: `2px solid ${COLORS.primary}`,
    fontSize: "22px",
    padding: "8px 0",
    backgroundColor: "#fff",
  },
  giftDeskMobile: {
    left: "83%",
    right: "auto",
    transform: "translateX(-50%)",
    bottom: "-44px",
    width: "92px",
    fontSize: "14px",
    padding: "6px 0",
  },
  tableCircle: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    width: "100px",
    height: "100px",
    borderRadius: "60%",
    border: `2px solid ${COLORS.primary}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "21px",
    fontWeight: "700",
    backgroundColor: "#fff",
    color: COLORS.primary,
    transition: "all 0.2s ease",
    textAlign: "center",
    whiteSpace: "pre-line",
    overflowWrap: "anywhere",
    wordBreak: "break-all",
    lineHeight: "1.2",
    padding: "6px",
    boxSizing: "border-box",
  },
  tableCircleMobile: {
    width: "58px",
    height: "58px",
    fontSize: "12px",
    padding: "4px",
  },
  tableCircleActive: {
    backgroundColor: "#ffe9b3",
    borderColor: "#d38c24",
    boxShadow: "0 0 0 3px rgba(211, 140, 36, 0.25)",
  },
};

export default FindSeatSection;
