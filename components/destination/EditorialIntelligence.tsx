import type { DestinationIdentity } from "@/lib/destination/identity";
import type { DestinationIntelligence, IntelligenceSlice } from "@/lib/destination/intelligence";
import { AmbientDestinationMotion } from "./AmbientDestinationMotion";

function conicGradient(slices: IntelligenceSlice[], palette: string[]) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  let cursor = 0;

  return `conic-gradient(${slices
    .map((slice, index) => {
      const start = (cursor / total) * 360;
      cursor += slice.value;
      const end = (cursor / total) * 360;
      return `${palette[index % palette.length]} ${start.toFixed(2)}deg ${end.toFixed(2)}deg`;
    })
    .join(", ")})`;
}

function EditorialDonut({
  slices,
  palette,
  label,
  headline,
}: {
  slices: IntelligenceSlice[];
  palette: string[];
  label: string;
  headline: string;
}) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  const leading = slices[0];

  return (
    <div className="grid gap-8 xl:grid-cols-[13rem_1fr] xl:items-start">
      <div className="mx-auto w-full max-w-[15rem] xl:mx-0">
        <div className="relative mx-auto h-48 w-48 rounded-full p-[1px] shadow-[0_24px_80px_rgba(0,0,0,.3)]">
          <div
            className="h-full w-full rounded-full"
            style={{ background: conicGradient(slices, palette) }}
            role="img"
            aria-label={label}
          />
          <div className="absolute inset-[1.15rem] rounded-full border border-white/10 bg-black/74 shadow-inner backdrop-blur-xl" />
          <div className="absolute inset-[4.4rem] rounded-full border border-white/10 bg-white/[0.035]" />
        </div>
        {leading ? (
          <div className="mt-5 text-center xl:text-left">
            <div className="luxury-kicker text-[0.58rem] text-white/38">Largest share</div>
            <div className="mt-2 text-sm text-white/64">
              {leading.label} · {((leading.value / total) * 100).toFixed(1)}%
            </div>
          </div>
        ) : null}
      </div>

      <div>
        <div className="luxury-kicker text-white/42">{label}</div>
        <div className="mt-3 font-display text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-none text-white">
          {headline}
        </div>
        <div className="mt-3 max-w-sm text-sm leading-7 text-white/56">
          foreign residents represented as a proportional mix.
        </div>

        <ul className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {slices.map((slice, index) => (
            <li
              key={slice.label}
              className="flex items-center justify-between gap-4 border-b border-white/10 py-2 text-sm"
            >
              <span className="flex min-w-0 items-center gap-3 text-white/70">
                <span
                  aria-hidden
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: palette[index % palette.length] }}
                />
                <span className="truncate">{slice.label}</span>
              </span>
              <span className="text-sm tabular-nums text-white/82">
                {((slice.value / total) * 100).toFixed(1)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ThinBarList({
  bars,
  palette,
}: {
  bars: IntelligenceSlice[];
  palette: string[];
}) {
  const max = Math.max(...bars.map((bar) => bar.value), 1);

  return (
    <div className="space-y-4">
      {bars.map((bar, index) => (
        <div key={bar.label} className="grid grid-cols-[7.5rem_1fr_4rem] items-center gap-3 text-sm">
          <div className="text-white/72">{bar.label}</div>
          <div className="h-px bg-white/14">
            <div
              className="h-px"
              style={{
                width: `${Math.max((bar.value / max) * 100, 2)}%`,
                backgroundColor: palette[index % palette.length],
                boxShadow: `0 0 18px ${palette[index % palette.length]}`,
              }}
            />
          </div>
          <div className="text-right font-display text-base tabular-nums text-white">
            {bar.value >= 1 ? bar.value.toFixed(bar.value % 1 ? 1 : 0) : bar.value}
            %
          </div>
        </div>
      ))}
    </div>
  );
}

export function EditorialIntelligence({
  identity,
  intelligence,
}: {
  identity: DestinationIdentity;
  intelligence: DestinationIntelligence;
}) {
  return (
    <section
      className="relative isolate overflow-hidden py-20 text-white sm:py-28"
      style={{
        background: `linear-gradient(135deg, ${identity.colors.ink}, ${identity.colors.ground} 54%, ${identity.colors.ink})`,
      }}
    >
      <div className="absolute inset-0 opacity-80" style={{ backgroundImage: identity.texture }} aria-hidden />
      <AmbientDestinationMotion identity={identity} variant="section" />
      <div
        className="absolute -right-16 top-12 font-display text-[22rem] font-semibold leading-none opacity-[0.035]"
        aria-hidden
      >
        {identity.accents.glyph}
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div>
            <p className="luxury-kicker" style={{ color: identity.colors.accent }}>
              {intelligence.eyebrow}
            </p>
            <h2 className="luxury-display mt-4 text-[clamp(3rem,8vw,7rem)] font-semibold">
              {intelligence.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/68">{intelligence.lede}</p>
            <div className="mt-8 border-l pl-5 text-sm leading-7 text-white/58" style={{ borderColor: identity.colors.accent }}>
              <span className="font-semibold text-white">{identity.label}</span>
              <br />
              {identity.mood}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {intelligence.metrics.map((metric) => (
              <div
                key={metric.label}
                className="editorial-type-container min-h-40 rounded-[1.15rem] border border-white/12 bg-white/[0.065] p-5 shadow-editorial backdrop-blur-xl"
              >
                <div className="luxury-kicker text-[0.62rem] text-white/48">{metric.label}</div>
                <div className="mt-5 font-display text-[clamp(2rem,13cqw,2.65rem)] font-semibold leading-none text-white">
                  {metric.value}
                </div>
                <p className="mt-4 text-xs leading-6 text-white/58">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
          <div
            className="rounded-[1.45rem] border border-white/12 p-6 shadow-editorial-deep backdrop-blur-xl sm:p-8"
            style={{ backgroundColor: identity.colors.panel }}
          >
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="luxury-kicker" style={{ color: identity.colors.accent }}>
                  Residency mix
                </p>
                <h3 className="editorial-module-title mt-2 font-display font-semibold text-white">
                  {intelligence.nationality.label}
                </h3>
              </div>
              <span className="hidden text-right text-xs uppercase tracking-[0.22em] text-white/36 sm:block">
                {identity.accents.line}
              </span>
            </div>
            <EditorialDonut
              slices={intelligence.nationality.slices}
              palette={identity.chartPalette}
              label={intelligence.nationality.label}
              headline={intelligence.nationality.center}
            />
          </div>

          <div
            className="rounded-[1.45rem] border border-white/12 p-6 shadow-editorial-deep backdrop-blur-xl sm:p-8"
            style={{ backgroundColor: identity.colors.panel }}
          >
            <p className="luxury-kicker" style={{ color: identity.colors.accent }}>
              Language field
            </p>
            <h3 className="editorial-module-title mt-2 font-display font-semibold text-white">
              {intelligence.languages.label}
            </h3>
            <p className="mt-3 text-xs leading-6 text-white/52">{intelligence.languages.note}</p>
            <div className="mt-8">
              <ThinBarList bars={intelligence.languages.bars} palette={identity.chartPalette} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
