"use client";

import type {
  PtCityId,
  PtDimensionId,
  PtMode,
} from "@/lib/content/interactives/transit-info";

/*
 * Placeholder-quality representative illustrations (Phase 1): one
 * stylized rendering per dimension, varied per city — recognizable,
 * simplified, to be refined alongside the dedicated content pass.
 *
 * Every visual node is categorized text / symbol / backdrop so the
 * Tourist/Local toggle can cross-fade categories (the MTR pattern,
 * two states): Tourist reads text at full strength, Local reads
 * symbol and colour. Backdrops never fade — the ground stays.
 */

export const PT_W = 960;
export const PT_H = 300;

const INK = "#f5f6f4";
const GLYPH = "#3c4756";
const PAPER = "#f6f1e6";
const BOARD = "#14181f";

const SONG_STACK =
  "'Noto Serif TC','Noto Serif CJK TC','Songti TC','SimSun',serif";

interface Props {
  city: PtCityId;
  dim: PtDimensionId;
  mode: PtMode;
}

export function PtIllustration({ city, dim, mode }: Props) {
  const tOp = mode === "tourist" ? 1 : 0.25;
  const sOp = mode === "tourist" ? 0.45 : 1;
  const T = ({ children }: { children: React.ReactNode }) => (
    <g className="pt-fade" style={{ opacity: tOp }}>
      {children}
    </g>
  );
  const S = ({ children }: { children: React.ReactNode }) => (
    <g className="pt-fade" style={{ opacity: sOp }}>
      {children}
    </g>
  );

  return (
    <svg
      viewBox={`0 0 ${PT_W} ${PT_H}`}
      aria-hidden="true"
      className="block w-full select-none"
    >
      {dim === "maps" && <Maps city={city} T={T} S={S} />}
      {dim === "tickets" && <Tickets city={city} T={T} S={S} />}
      {dim === "icons" && <Icons city={city} T={T} S={S} />}
      {dim === "digital" && <Digital city={city} T={T} S={S} />}
    </svg>
  );
}

type Wrap = ({ children }: { children: React.ReactNode }) => React.ReactNode;

/* ----------------------------- maps ------------------------------ */

interface MapCfg {
  lines: { d: string; color: string; width: number }[];
  stations: [number, number][];
  labels: [number, number, string][];
  bullets: [number, number, string, string][];
}

const MAPS: Record<PtCityId, MapCfg> = {
  tokyo: {
    lines: [
      { d: "M70 230 L250 120 L430 150 L620 70 L900 110", color: "#c0392b", width: 3 },
      { d: "M70 90 L230 140 L420 80 L640 180 L900 150", color: "#2e7d55", width: 3 },
      { d: "M120 250 L300 200 L520 210 L720 140 L890 190", color: "#c78a1e", width: 3 },
      { d: "M70 150 L260 60 L480 120 L700 230 L900 240", color: "#5568b8", width: 3 },
      { d: "M180 40 L340 180 L560 160 L760 60", color: "#b45a92", width: 3 },
      { d: "M70 190 L300 240 L540 250 L820 200", color: "#3a8ea5", width: 3 },
    ],
    stations: [
      [250, 120], [430, 150], [620, 70], [230, 140], [420, 80], [640, 180],
      [300, 200], [520, 210], [720, 140], [260, 60], [480, 120], [340, 180],
      [560, 160], [300, 240],
    ],
    labels: [
      [258, 112, "SHINJUKU"], [438, 164, "GINZA"], [628, 62, "UENO"],
      [648, 194, "TOKYO"], [308, 214, "SHIBUYA"], [568, 152, "AKIHABARA"],
      [268, 52, "IKEBUKURO"], [488, 134, "KANDA"],
    ],
    bullets: [
      [82, 230, "M", "#c0392b"], [82, 90, "C", "#2e7d55"],
      [130, 250, "G", "#c78a1e"], [82, 150, "T", "#5568b8"],
      [188, 44, "F", "#b45a92"], [82, 190, "Z", "#3a8ea5"],
    ],
  },
  london: {
    lines: [
      { d: "M70 230 L260 230 L380 140 L600 140 L780 60", color: "#1e4b8f", width: 4 },
      { d: "M70 120 L300 120 L440 200 L680 200 L900 130", color: "#c0392b", width: 4 },
      { d: "M120 60 L320 60 L480 160 L900 160", color: "#2e7d55", width: 4 },
      { d: "M200 250 L420 250 L560 190 L900 190", color: "#8b8e94", width: 4 },
      { d: "M70 170 L240 170 L400 90 L620 90 L900 60", color: "#c78a1e", width: 4 },
    ],
    stations: [
      [260, 230], [380, 140], [600, 140], [300, 120], [440, 200], [680, 200],
      [320, 60], [480, 160], [420, 250], [560, 190], [240, 170], [400, 90],
    ],
    labels: [
      [268, 222, "VICTORIA"], [388, 132, "BAKER ST"], [608, 132, "KING'S CROSS"],
      [448, 214, "BANK"], [328, 52, "PADDINGTON"], [568, 204, "MONUMENT"],
    ],
    bullets: [
      [380, 140, "◉", "#1e4b8f"], [440, 200, "◉", "#c0392b"],
      [480, 160, "◉", "#2e7d55"], [400, 90, "◉", "#c78a1e"],
    ],
  },
  "hong-kong": {
    lines: [
      { d: "M70 200 C300 190 500 120 900 110", color: "#c0392b", width: 6 },
      { d: "M70 120 L420 140 L900 220", color: "#1e5aa5", width: 6 },
      { d: "M200 250 L520 180 L820 70", color: "#2e7d55", width: 6 },
      { d: "M70 60 L360 80 L640 160 L900 170", color: "#c78a1e", width: 6 },
    ],
    stations: [
      [420, 140], [520, 180], [360, 80], [640, 160], [300, 190], [700, 132],
    ],
    labels: [
      [428, 128, "ADMIRALTY 金鐘"], [528, 194, "CENTRAL 中環"],
      [368, 66, "MONG KOK 旺角"], [648, 146, "KOWLOON TONG 九龍塘"],
    ],
    bullets: [
      [420, 140, "", "#1e5aa5"], [520, 180, "", "#2e7d55"],
    ],
  },
  "new-york": {
    lines: [
      { d: "M140 30 L140 150 L180 200 L180 270", color: "#2b57a8", width: 4 },
      { d: "M240 30 L240 270", color: "#c9622e", width: 4 },
      { d: "M340 30 L340 180 L390 230 L390 270", color: "#5a9c4a", width: 4 },
      { d: "M460 30 L460 270", color: "#8b8e94", width: 4 },
      { d: "M580 30 L580 130 L620 180 L620 270", color: "#d4af2a", width: 4 },
      { d: "M700 30 L700 270", color: "#c0392b", width: 4 },
      { d: "M820 30 L820 270", color: "#2e7d55", width: 4 },
    ],
    stations: [
      [140, 110], [240, 110], [340, 110], [460, 110], [580, 110],
      [240, 220], [460, 220], [700, 220], [820, 160],
    ],
    labels: [
      [80, 100, "34 ST"], [80, 214, "14 ST"], [740, 106, "42 ST"],
      [500, 250, "CANAL ST"],
    ],
    bullets: [
      [140, 44, "A", "#2b57a8"], [240, 44, "7", "#c9622e"],
      [340, 44, "L", "#5a9c4a"], [460, 44, "S", "#8b8e94"],
      [580, 44, "N", "#d4af2a"], [700, 44, "1", "#c0392b"],
      [820, 44, "G", "#2e7d55"],
    ],
  },
};

function Maps({ city, T, S }: { city: PtCityId; T: Wrap; S: Wrap }) {
  const cfg = MAPS[city];
  return (
    <>
      <rect x={40} y={16} width={880} height={268} rx={6} fill={PAPER} stroke={GLYPH} strokeOpacity={0.2} />
      <S>
        {cfg.lines.map((l, i) => (
          <path key={i} d={l.d} fill="none" stroke={l.color} strokeWidth={l.width} strokeLinejoin="round" />
        ))}
        {cfg.stations.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={4.5} fill="#fff" stroke={GLYPH} strokeWidth={1.5} />
        ))}
        {cfg.bullets.map(([x, y, ch, color], i) =>
          ch === "◉" ? (
            <g key={i}>
              <circle cx={x} cy={y} r={9} fill="none" stroke={color} strokeWidth={3.5} />
              <rect x={x - 12} y={y - 2} width={24} height={4} fill={color} />
            </g>
          ) : (
            <g key={i}>
              <circle cx={x} cy={y} r={ch ? 11 : 7} fill={color} />
              {ch && (
                <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" style={{ fontFamily: "var(--font-sans)" }}>
                  {ch}
                </text>
              )}
            </g>
          ),
        )}
      </S>
      <T>
        {cfg.labels.map(([x, y, text], i) => (
          <text key={i} x={x} y={y} fontSize="9.5" letterSpacing="0.8" fill={GLYPH} fillOpacity={0.85} style={{ fontFamily: "var(--font-sans)" }}>
            {text}
          </text>
        ))}
      </T>
    </>
  );
}

/* ---------------------------- tickets ---------------------------- */

function Tickets({ city, T, S }: { city: PtCityId; T: Wrap; S: Wrap }) {
  return (
    <>
      {/* machine body — backdrop */}
      <rect x={360} y={30} width={240} height={244} rx={10} fill="#d9d3c5" stroke={GLYPH} strokeOpacity={0.35} />
      <rect x={382} y={50} width={196} height={64} rx={4} fill={BOARD} />
      <T>
        <text x={480} y={72} textAnchor="middle" fontSize="10" letterSpacing="1.5" fill={INK} style={{ fontFamily: "var(--font-sans)" }}>
          SELECT TICKET TYPE
        </text>
        <text x={480} y={90} textAnchor="middle" fontSize="8.5" fill={INK} fillOpacity={0.75} style={{ fontFamily: "var(--font-sans)" }}>
          単程 · SINGLE · RETURN · DAY PASS
        </text>
        <text x={480} y={104} textAnchor="middle" fontSize="8.5" fill={INK} fillOpacity={0.6} style={{ fontFamily: "var(--font-sans)" }}>
          INSERT COINS OR NOTES BELOW
        </text>
      </T>
      <S>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={386 + (i % 2) * 100} y={130 + Math.floor(i / 2) * 46} width={88} height={36} rx={6}
            fill={["#c0392b", "#2e7d55", "#c78a1e", "#1e4b8f"][i]} fillOpacity={0.9} />
        ))}
        <rect x={402} y={228} width={70} height={8} rx={4} fill={BOARD} />
        <circle cx={545} cy={240} r={14} fill="none" stroke={GLYPH} strokeWidth={2.5} />
      </S>

      {city === "tokyo" && (
        <>
          {/* the fare board above/beside the machine */}
          <rect x={80} y={40} width={240} height={160} rx={4} fill={BOARD} />
          <T>
            <text x={200} y={64} textAnchor="middle" fontSize="10" letterSpacing="2" fill={INK} style={{ fontFamily: "var(--font-sans)" }}>
              運賃 FARE TABLE
            </text>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <text key={i} x={110 + (i % 4) * 56} y={96 + Math.floor(i / 4) * 32} fontSize="9" fill={INK} fillOpacity={0.85} style={{ fontFamily: "var(--font-sans)" }}>
                ¥{140 + (i % 4) * 40 + Math.floor(i / 4) * 10}
              </text>
            ))}
          </T>
          <S>
            <path d="M 330 130 L 352 130 M 344 122 L 354 130 L 344 138" fill="none" stroke={GLYPH} strokeWidth={2.5} />
          </S>
        </>
      )}
      {city === "london" && (
        <>
          <S>
            <circle cx={720} cy={140} r={50} fill="#e8ba1c" />
            <rect x={698} y={122} width={44} height={30} rx={4} fill="none" stroke={BOARD} strokeWidth={3} />
            <path d="M 706 160 q 14 10 28 0" fill="none" stroke={BOARD} strokeWidth={3} strokeLinecap="round" />
          </S>
          <T>
            <text x={720} y={216} textAnchor="middle" fontSize="10" letterSpacing="2" fill={GLYPH} style={{ fontFamily: "var(--font-sans)" }}>
              TAP CARD OR PHONE
            </text>
          </T>
        </>
      )}
      {city === "hong-kong" && (
        <>
          <S>
            <rect x={670} y={104} width={110} height={76} rx={10} fill="#2e7d55" fillOpacity={0.9} />
            <circle cx={725} cy={142} r={20} fill="none" stroke="#fff" strokeWidth={2.5} />
            <circle cx={725} cy={142} r={10} fill="none" stroke="#fff" strokeWidth={2} strokeOpacity={0.7} />
          </S>
          <T>
            <text x={725} y={210} textAnchor="middle" fontSize="10" letterSpacing="1.5" fill={GLYPH} style={{ fontFamily: "var(--font-sans)" }}>
              八達通 OCTOPUS
            </text>
          </T>
        </>
      )}
      {city === "new-york" && (
        <>
          <S>
            <rect x={680} y={90} width={14} height={180} fill={GLYPH} />
            <rect x={840} y={90} width={14} height={180} fill={GLYPH} />
            <g stroke={GLYPH} strokeWidth={7} strokeLinecap="round">
              <line x1={694} y1={160} x2={766} y2={140} />
              <line x1={694} y1={160} x2={760} y2={186} />
            </g>
            <rect x={820} y={120} width={20} height={26} rx={3} fill="#5a9c4a" />
          </S>
          <T>
            <text x={767} y={236} textAnchor="middle" fontSize="9.5" letterSpacing="1" fill={GLYPH} style={{ fontFamily: "var(--font-sans)" }}>
              TAP TO PAY · OMNY ACCEPTED HERE
            </text>
            <text x={767} y={252} textAnchor="middle" fontSize="8.5" fill={GLYPH} fillOpacity={0.7} style={{ fontFamily: "var(--font-sans)" }}>
              SWIPE METROCARD WITH BLACK STRIPE FACING YOU
            </text>
          </T>
        </>
      )}
    </>
  );
}

/* ----------------------------- icons ----------------------------- */

function Pict({ kind, cx, cy, ink }: { kind: number; cx: number; cy: number; ink: string }) {
  switch (kind) {
    case 0: // person exiting + arrow
      return (
        <g stroke={ink} strokeWidth={3.5} fill="none" strokeLinecap="round">
          <circle cx={cx - 8} cy={cy - 18} r={5} fill={ink} stroke="none" />
          <path d={`M ${cx - 8} ${cy - 12} L ${cx - 8} ${cy + 2} M ${cx - 8} ${cy + 2} L ${cx - 16} ${cy + 18} M ${cx - 8} ${cy + 2} L ${cx} ${cy + 18} M ${cx - 8} ${cy - 8} L ${cx + 2} ${cy - 2}`} />
          <path d={`M ${cx + 8} ${cy - 2} L ${cx + 22} ${cy - 2} M ${cx + 16} ${cy - 8} L ${cx + 23} ${cy - 2} L ${cx + 16} ${cy + 4}`} />
        </g>
      );
    case 1: // train front
      return (
        <g>
          <rect x={cx - 16} y={cy - 20} width={32} height={36} rx={8} fill="none" stroke={ink} strokeWidth={3.5} />
          <rect x={cx - 10} y={cy - 13} width={20} height={12} fill={ink} />
          <circle cx={cx - 8} cy={cy + 9} r={2.5} fill={ink} />
          <circle cx={cx + 8} cy={cy + 9} r={2.5} fill={ink} />
        </g>
      );
    case 2: // wheelchair
      return (
        <g stroke={ink} strokeWidth={3.5} fill="none" strokeLinecap="round">
          <circle cx={cx - 2} cy={cy + 6} r={12} />
          <circle cx={cx + 2} cy={cy - 18} r={4.5} fill={ink} stroke="none" />
          <path d={`M ${cx + 2} ${cy - 12} L ${cx + 2} ${cy} L ${cx + 14} ${cy} M ${cx + 2} ${cy - 6} L ${cx + 12} ${cy - 6}`} />
        </g>
      );
    case 3: // arrow
      return (
        <g stroke={ink} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={`M ${cx - 16} ${cy + 12} L ${cx + 10} ${cy - 14} M ${cx - 2} ${cy - 14} L ${cx + 12} ${cy - 16} L ${cx + 10} ${cy - 2}`} />
        </g>
      );
    default: // information
      return (
        <g>
          <circle cx={cx} cy={cy - 14} r={4} fill={ink} />
          <rect x={cx - 3.5} y={cy - 5} width={7} height={22} rx={3} fill={ink} />
        </g>
      );
  }
}

const ICON_LABELS = ["EXIT", "TRAINS", "STEP-FREE", "WAY OUT", "INFORMATION"];

function Icons({ city, T, S }: { city: PtCityId; T: Wrap; S: Wrap }) {
  const xs = [136, 296, 456, 616, 776];
  return (
    <>
      <rect x={40} y={56} width={880} height={188} rx={6} fill={city === "new-york" ? "#111418" : "#1b212b"} />
      <S>
        {xs.map((x, i) => {
          if (city === "tokyo")
            return (
              <g key={i}>
                <rect x={x - 44} y={84} width={88} height={88} rx={8} fill="#e8ba1c" />
                <Pict kind={i} cx={x} cy={128} ink="#14181f" />
              </g>
            );
          if (city === "london")
            return (
              <g key={i}>
                <circle cx={x} cy={128} r={46} fill="#fff" />
                <circle cx={x} cy={128} r={46} fill="none" stroke="#c0392b" strokeWidth={7} />
                <Pict kind={i} cx={x} cy={128} ink="#10387a" />
              </g>
            );
          if (city === "hong-kong")
            return (
              <g key={i}>
                <rect x={x - 44} y={84} width={88} height={88} rx={6} fill={i === 0 || i === 3 ? "#e8ba1c" : "#14181f"} stroke="#e8ba1c" strokeWidth={i === 0 || i === 3 ? 0 : 2} />
                <Pict kind={i} cx={x} cy={128} ink={i === 0 || i === 3 ? "#14181f" : "#f5f6f4"} />
              </g>
            );
          return (
            <g key={i}>
              <Pict kind={i} cx={x} cy={120} ink="#f5f6f4" />
            </g>
          );
        })}
      </S>
      <T>
        {xs.map((x, i) => (
          <g key={i}>
            <text
              x={x}
              y={city === "new-york" ? 182 : 208}
              textAnchor="middle"
              fontSize={city === "new-york" ? 15 : 10}
              letterSpacing={city === "new-york" ? 1 : 1.6}
              fontWeight={city === "new-york" ? 700 : 400}
              fill={INK}
              fillOpacity={0.92}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {ICON_LABELS[i]}
            </text>
            {city === "hong-kong" && (
              <text x={x} y={224} textAnchor="middle" fontSize="12" fill={INK} fillOpacity={0.8} style={{ fontFamily: SONG_STACK }}>
                {["出口", "列車", "無障礙", "出口", "詢問處"][i]}
              </text>
            )}
            {city === "new-york" && (
              <text x={x} y={204} textAnchor="middle" fontSize="9" letterSpacing="0.5" fill={INK} fillOpacity={0.6} style={{ fontFamily: "var(--font-sans)" }}>
                {["TO STREET", "ALL SERVICES", "ELEVATOR", "8 AV & W 4 ST", "SEE AGENT"][i]}
              </text>
            )}
          </g>
        ))}
      </T>
    </>
  );
}

/* ---------------------------- digital ---------------------------- */

const DIGITAL_STYLE: Record<
  PtCityId,
  { text: string; sub?: string; rows: [string, string, string, string][] }
> = {
  /* rows: [bullet char, bullet color, destination, minutes] */
  tokyo: {
    text: "#f5f6f4",
    sub: "#9aa3ad",
    rows: [
      ["M", "#c0392b", "AKIHABARA 秋葉原", "2"],
      ["C", "#2e7d55", "SHIBUYA 渋谷", "4"],
      ["Z", "#3a8ea5", "OSHIAGE 押上", "7"],
    ],
  },
  london: {
    text: "#d9a441",
    rows: [
      ["◉", "#d9a441", "EALING BROADWAY", "2"],
      ["◉", "#d9a441", "COCKFOSTERS", "4"],
      ["◉", "#d9a441", "EDGWARE VIA BANK", "6"],
    ],
  },
  "hong-kong": {
    text: "#e07840",
    rows: [
      ["", "#c0392b", "TSUEN WAN 荃灣", "1"],
      ["", "#1e5aa5", "KENNEDY TOWN 堅尼地城", "3"],
      ["", "#c78a1e", "TUNG CHUNG 東涌", "6"],
    ],
  },
  "new-york": {
    text: "#6fbf73",
    rows: [
      ["A", "#2b57a8", "FAR ROCKAWAY", "3"],
      ["7", "#c9622e", "FLUSHING–MAIN ST", "5"],
      ["N", "#d4af2a", "CONEY ISLAND", "9"],
    ],
  },
};

function Digital({ city, T, S }: { city: PtCityId; T: Wrap; S: Wrap }) {
  const st = DIGITAL_STYLE[city];
  return (
    <>
      <rect x={40} y={30} width={880} height={240} rx={8} fill={BOARD} stroke={GLYPH} strokeOpacity={0.4} />
      <T>
        <text x={72} y={66} fontSize="11" letterSpacing="3" fill={st.text} fillOpacity={0.8} style={{ fontFamily: "var(--font-sans)" }}>
          {city === "london" ? "NEXT TRAINS" : "DEPARTURES"}
        </text>
      </T>
      {st.rows.map(([ch, color, dest, min], i) => {
        const y = 116 + i * 56;
        return (
          <g key={i}>
            <S>
              {ch === "◉" ? (
                <g>
                  <circle cx={92} cy={y - 6} r={11} fill="none" stroke={color} strokeWidth={3.5} />
                  <rect x={78} y={y - 8.5} width={28} height={5} fill={color} />
                </g>
              ) : (
                <g>
                  <circle cx={92} cy={y - 6} r={13} fill={color} />
                  {ch && (
                    <text x={92} y={y - 1} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff" style={{ fontFamily: "var(--font-sans)" }}>
                      {ch}
                    </text>
                  )}
                </g>
              )}
              <text x={868} y={y} textAnchor="end" fontSize="26" fill={st.text} style={{ fontFamily: "var(--font-sans)", fontVariantNumeric: "tabular-nums" }}>
                {min}
              </text>
            </S>
            <T>
              <text x={124} y={y} fontSize="16" letterSpacing={city === "london" ? 2.5 : 1} fill={st.text} style={{ fontFamily: "var(--font-sans)" }}>
                {dest}
              </text>
              {city === "tokyo" && (
                <text x={124} y={y + 18} fontSize="9.5" letterSpacing="1.5" fill={st.sub} style={{ fontFamily: "var(--font-sans)" }}>
                  {["FOR OCHANOMIZU · LOCAL", "FOR OMOTESANDO · EXPRESS", "FOR KINSHICHO · LOCAL"][i]}
                </text>
              )}
              <text x={892} y={y} textAnchor="end" fontSize="9" fill={st.text} fillOpacity={0.7} style={{ fontFamily: "var(--font-sans)" }}>
                min
              </text>
            </T>
          </g>
        );
      })}
    </>
  );
}
