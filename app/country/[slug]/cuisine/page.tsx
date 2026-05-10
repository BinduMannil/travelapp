/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AmbientDestinationMotion } from "@/components/destination/AmbientDestinationMotion";
import { getCountry, getCountryCuisine, type Dish } from "@/lib/data/seed";
import { getDestinationIdentity } from "@/lib/destination/identity";

export function generateMetadata(): Metadata {
  return {
    title: "Must-try local cuisine",
    description:
      "The dishes you should actively seek out — what they're made of, where they were born, and what they resemble globally.",
  };
}

const TOP_BY_COUNTRY: Record<string, string[]> = {
  japan: ["sushi", "ramen", "tempura"],
};

const KANJI_BY_SLUG: Record<string, string> = {
  sushi: "鮨",
  ramen: "麺",
  tempura: "天",
  tonkatsu: "豚",
  yakitori: "串",
  okonomiyaki: "好",
  takoyaki: "蛸",
  soba: "蕎",
  udon: "饂",
  kaiseki: "懐",
  wagyu: "牛",
  matcha: "抹",
};

const FOOD_ATMOSPHERE = {
  counter:
    "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1800&q=84",
  ramen:
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1800&q=84",
  lantern:
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=84",
  table:
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1800&q=84",
};

const CULTURE_NOTES = [
  {
    title: "Specialists matter",
    body: "The best meals are rarely at places that do everything. Sushi counters, tempura rooms, soba shops and ramen bars each protect a narrow craft.",
  },
  {
    title: "Eat with tempo",
    body: "Ramen is fast, kaiseki is slow, sushi follows the chef's sequence. The rhythm of the dish is part of the dish.",
  },
  {
    title: "Quiet etiquette",
    body: "Do not drown sushi in soy, do not linger at a ramen counter, and let the restaurant's ritual guide the room before you photograph it.",
  },
];

function dishImages(dish: Dish) {
  return (dish.hero_image_urls ?? []).length > 0
    ? dish.hero_image_urls!
    : dish.hero_image_url
      ? [dish.hero_image_url]
      : [];
}

function dishImage(dish: Dish, fallback = FOOD_ATMOSPHERE.table) {
  return dishImages(dish)[0] ?? fallback;
}

function dishBySlug(dishes: Dish[], slug: string) {
  return dishes.find((dish) => dish.slug === slug);
}

function DishLinks({ dish }: { dish: Dish }) {
  if (!dish.where_in_tokyo || dish.where_in_tokyo.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="luxury-kicker text-kintsugi-300/82">Where to try</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {dish.where_in_tokyo.map((restaurant) => (
          <Link
            key={restaurant}
            href={`/city/tokyo/restaurants/${restaurant}`}
            className="rounded-full border border-white/16 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold capitalize text-white/78 backdrop-blur transition hover:border-kintsugi-300/55 hover:bg-kintsugi-300 hover:text-sumi-950"
          >
            {restaurant.replace(/-/g, " ")} →
          </Link>
        ))}
      </div>
    </div>
  );
}

function OriginChips({ dish, countryName }: { dish: Dish; countryName: string }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {dish.originated_here ? (
        <span className="rounded-full bg-kintsugi-300 px-3 py-1 text-xs font-bold text-sumi-950">
          From {countryName}
        </span>
      ) : null}
      {dish.vegan_version ? (
        <span className="rounded-full border border-matcha-300/45 bg-matcha-300/12 px-3 py-1 text-xs font-bold text-matcha-100">
          Vegan possible
        </span>
      ) : null}
    </div>
  );
}

function FeatureDish({
  dish,
  countryName,
  rank,
}: {
  dish: Dish;
  countryName: string;
  rank?: number;
}) {
  const kanji = KANJI_BY_SLUG[dish.slug] ?? "食";

  return (
    <article id={dish.slug} className="relative isolate overflow-hidden rounded-[1.7rem] border border-white/12 bg-sumi-900 shadow-editorial-deep">
      <img
        src={dishImage(dish)}
        alt={dish.name}
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-88"
        loading="lazy"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,7,6,.94),rgba(8,7,6,.62)_48%,rgba(8,7,6,.18)),linear-gradient(0deg,rgba(8,7,6,.82),transparent_54%)]" />
      <div className="absolute left-8 top-8 hidden font-display text-[18rem] font-semibold leading-none text-white/[0.04] lg:block" aria-hidden>
        {kanji}
      </div>
      <div className="grid min-h-[46rem] gap-8 p-6 sm:p-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
        <div className="max-w-xl self-end rounded-[1.25rem] border border-white/14 bg-black/34 p-6 backdrop-blur-xl sm:p-8">
          <div className="luxury-kicker text-kintsugi-300">
            {rank ? `Feature dish 0${rank}` : "Feature dish"} · {dish.romaji}
          </div>
          <h2 className="luxury-display mt-4 text-[clamp(3.2rem,8vw,7.6rem)] font-semibold text-white">
            {dish.name}
          </h2>
          <p className="mt-2 font-display text-2xl tracking-[0.28em] text-white/62">
            {dish.native_script}
          </p>
          <OriginChips dish={dish} countryName={countryName} />
        </div>

        <div className="max-w-xl self-end lg:ml-auto">
          <p className="text-base leading-8 text-white/82">{dish.made_of}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="border-l border-kintsugi-300/55 pl-5">
              <div className="luxury-kicker text-kintsugi-300/82">Origin</div>
              <p className="mt-3 text-sm leading-7 text-white/68">{dish.origin}</p>
            </div>
            <div className="border-l border-white/16 pl-5">
              <div className="luxury-kicker text-white/48">Best form</div>
              <p className="mt-3 text-sm leading-7 text-white/68">{dish.must_try_form}</p>
            </div>
          </div>
          <DishLinks dish={dish} />
        </div>
      </div>
    </article>
  );
}

function SplitDish({
  dish,
  countryName,
  reverse = false,
}: {
  dish: Dish;
  countryName: string;
  reverse?: boolean;
}) {
  const kanji = KANJI_BY_SLUG[dish.slug] ?? "食";

  return (
    <article
      id={dish.slug}
      className={`grid gap-10 lg:grid-cols-2 lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      <div className="relative min-h-[34rem] overflow-hidden rounded-[1.45rem] border border-white/12 bg-sumi-900 shadow-editorial-deep">
        <img
          src={dishImage(dish, FOOD_ATMOSPHERE.ramen)}
          alt={dish.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.26)_42%,rgba(0,0,0,.84))]" />
        <div className="absolute bottom-0 p-6 sm:p-8">
          <div className="font-display text-7xl font-semibold leading-none text-white/18">{kanji}</div>
        </div>
      </div>
      <div className="max-w-xl">
        <p className="luxury-kicker text-kintsugi-300">{dish.romaji}</p>
        <h2 className="luxury-display mt-4 text-[clamp(2.7rem,5.5vw,5.8rem)] font-semibold text-white">
          {dish.name}
        </h2>
        <p className="mt-2 font-display text-xl tracking-[0.24em] text-white/46">{dish.native_script}</p>
        <p className="mt-7 text-base leading-8 text-white/74">{dish.made_of}</p>
        <div className="mt-8 rounded-[1.1rem] border border-white/12 bg-white/[0.055] p-5 backdrop-blur">
          <div className="luxury-kicker text-kintsugi-300/82">How to try it</div>
          <p className="mt-3 text-sm leading-7 text-white/66">{dish.must_try_form}</p>
        </div>
        <OriginChips dish={dish} countryName={countryName} />
        <DishLinks dish={dish} />
      </div>
    </article>
  );
}

function SupportingDish({ dish }: { dish: Dish }) {
  const kanji = KANJI_BY_SLUG[dish.slug] ?? "食";

  return (
    <article id={dish.slug} className="group grid gap-5 border-t border-white/12 pt-6 sm:grid-cols-[12rem_1fr] sm:items-start">
      <div className="relative h-56 overflow-hidden rounded-[1.15rem] bg-sumi-900 sm:h-44">
        <img
          src={dishImage(dish)}
          alt={dish.name}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/66 to-transparent" />
        <div className="absolute bottom-3 right-4 font-display text-4xl font-semibold text-white/34">{kanji}</div>
      </div>
      <div>
        <div className="luxury-kicker text-kintsugi-300/78">{dish.romaji}</div>
        <h3 className="mt-2 font-display text-[clamp(1.6rem,4vw,2.35rem)] font-semibold leading-tight text-white">
          {dish.name}
        </h3>
        <p className="mt-3 text-sm leading-7 text-white/64">{dish.made_of}</p>
        <div className="mt-4 text-sm font-semibold text-kintsugi-300">{dish.must_try_form}</div>
        <DishLinks dish={dish} />
      </div>
    </article>
  );
}

export default async function CuisinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountry(slug);
  const data = getCountryCuisine(slug);
  if (!country || !data) notFound();

  const identity = getDestinationIdentity(slug);
  const topList = TOP_BY_COUNTRY[slug] ?? [];
  const rankOf = (dishSlug: string) => {
    const idx = topList.indexOf(dishSlug);
    return idx === -1 ? undefined : idx + 1;
  };

  const sushi = dishBySlug(data.dishes, "sushi") ?? data.dishes[0];
  const ramen = dishBySlug(data.dishes, "ramen") ?? data.dishes[1];
  const tempura = dishBySlug(data.dishes, "tempura") ?? data.dishes[2];
  const supporting = data.dishes.filter(
    (dish) => ![sushi.slug, ramen.slug, tempura.slug].includes(dish.slug),
  );

  return (
    <main className="editorial-page">
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-sumi-900">
        <img
          src={dishImage(sushi, FOOD_ATMOSPHERE.counter)}
          alt={`${country.name} cuisine table`}
          className="image-drift absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,7,6,.96),rgba(8,7,6,.62)_48%,rgba(8,7,6,.18)),linear-gradient(0deg,rgba(8,7,6,.9),transparent_52%)]" />
        <div className="absolute inset-0 -z-10 opacity-70" style={{ backgroundImage: identity.texture }} />
        <AmbientDestinationMotion identity={identity} />
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-end gap-12 px-6 pb-20 pt-24 lg:grid-cols-[1.02fr_.98fr] lg:items-end">
          <div>
            <nav className="luxury-kicker text-white/56">
              <Link href="/" className="hover:text-kintsugi-300">
                Home
              </Link>{" "}
              ·{" "}
              <Link href={`/country/${slug}`} className="hover:text-kintsugi-300">
                {country.name}
              </Link>{" "}
              · Cuisine
            </nav>
            <p className="luxury-kicker mt-8 text-kintsugi-300">At the table</p>
            <h1 className="luxury-display mt-4 text-[clamp(4rem,11vw,10rem)] font-semibold text-white">
              {country.name} cuisine
            </h1>
            <p className="luxury-lede mt-8 max-w-2xl text-white/82">{data.summary}</p>
          </div>
          <aside className="scene-glass rounded-[1.35rem] p-6 sm:p-8">
            <p className="luxury-kicker text-kintsugi-300">How to read the menu</p>
            <div className="mt-7 space-y-6">
              {CULTURE_NOTES.map((note) => (
                <div key={note.title} className="border-l border-white/14 pl-5">
                  <h2 className="font-display text-2xl font-semibold leading-tight text-white">{note.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-white/62">{note.body}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="journee-scene relative overflow-hidden py-32 sm:py-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(200,155,60,.18),transparent_34%),radial-gradient(circle_at_86%_30%,rgba(141,20,36,.22),transparent_36%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-20 max-w-3xl">
            <p className="luxury-kicker text-kintsugi-300">Feature dish</p>
            <h2 className="luxury-display mt-4 text-[clamp(2.8rem,6vw,6rem)] font-semibold text-white">
              Start where the city learned restraint.
            </h2>
          </div>
          <FeatureDish dish={sushi} countryName={country.name} rank={rankOf(sushi.slug)} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#11100e] py-32 sm:py-44">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${FOOD_ATMOSPHERE.lantern})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,.94),rgba(17,16,14,.86),rgba(17,16,14,.96))]" />
        <div className="relative mx-auto max-w-7xl space-y-32 px-6">
          <SplitDish dish={ramen} countryName={country.name} />
          <SplitDish dish={tempura} countryName={country.name} reverse />
        </div>
      </section>

      <section className="relative overflow-hidden py-32 sm:py-44">
        <img
          src={FOOD_ATMOSPHERE.table}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-24"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,7,.96),rgba(9,8,7,.82),rgba(9,8,7,.98))]" />
        <div className="relative mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-[.68fr_1.32fr]">
          <div>
            <p className="luxury-kicker text-kintsugi-300">Supporting table</p>
            <h2 className="luxury-display mt-4 text-[clamp(2.6rem,5vw,5.2rem)] font-semibold text-white">
              The rest of the meal changes tempo.
            </h2>
            <p className="mt-7 max-w-md text-base leading-8 text-white/66">
              Fried cutlets, smoke, noodles, tea ceremony and grill-at-the-table meals should not feel equal. Each one carries a different rhythm.
            </p>
          </div>
          <div className="space-y-9">
            {supporting.map((dish) => (
              <SupportingDish key={dish.slug} dish={dish} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
