import {
  mtrMosaicStations,
  type MtrMosaicStation,
} from "@/lib/content/interactives/mtr-wayfinding";

/*
 * The mosaic deep dive's visual: four station swatches, each a small
 * tile grid in that station's documented colour identity, labelled
 * bilingually. Static illustration — no interaction, server-rendered.
 */

const SONG_STACK =
  "'Noto Serif TC','Noto Serif CJK TC','Songti TC','SimSun','MingLiU',serif";

function Swatch({ station }: { station: MtrMosaicStation }) {
  const tiles: React.ReactNode[] = [];
  const cols = 9;
  const rows = 5;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      /* Choi Hung's rainbow runs in horizontal bands (its documented
         pattern); other stations mix their family pseudo-randomly. */
      const idx =
        station.en === "Choi Hung"
          ? r % station.tiles.length
          : (r * 3 + c * 5) % station.tiles.length;
      tiles.push(
        <rect
          key={`${r}-${c}`}
          x={4 + c * 18}
          y={4 + r * 18}
          width={15}
          height={15}
          fill={station.tiles[idx]}
        />,
      );
    }
  }
  return (
    <div>
      <svg
        viewBox="0 0 170 98"
        aria-hidden="true"
        className="block w-full max-w-[13rem]"
      >
        {tiles}
        <text
          x={8}
          y={82}
          fontSize="26"
          fill={station.ink}
          fillOpacity="0.95"
          style={{ fontFamily: SONG_STACK }}
        >
          {station.zh}
        </text>
      </svg>
      <p className="mt-2 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-information/80">
        {station.en}
      </p>
      <p className="mt-1 font-serif text-xs italic leading-relaxed text-information/60">
        {station.caption}
      </p>
    </div>
  );
}

export function MtrMosaicStrip() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {mtrMosaicStations.map((s) => (
        <Swatch key={s.en} station={s} />
      ))}
    </div>
  );
}
