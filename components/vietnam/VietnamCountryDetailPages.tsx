/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  Coffee,
  Languages,
  MapPinned,
  Shirt,
  Soup,
  Sparkles,
  Train,
  Waves,
} from "lucide-react";
import {
  VIETNAM_ACTIVITIES,
  VIETNAM_COUNTRY_IMAGES,
  VIETNAM_LOCAL_APPS,
  VIETNAM_PHRASES,
  VIETNAM_PRICE_BENCHMARKS,
  formatVnd,
} from "@/lib/vietnam/frontend";

const food = [
  {
    name: "Pho",
    vietnamese: "Phở",
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1600&q=84",
    note: "The national noodle-soup reference point. Try it early in the day, compare northern and southern styles, and keep condiments gentle until you taste the broth.",
    where: "Hanoi for a cleaner northern profile; Ho Chi Minh City for herbs, sweetness, and bigger table rituals.",
  },
  {
    name: "Banh mi",
    vietnamese: "Bánh mì",
    image:
      "https://images.unsplash.com/photo-1600628421055-4d30de868b8f?auto=format&fit=crop&w=1600&q=84",
    note: "A crisp, fast, portable meal that shows Vietnam's colonial, street-food, and local-pickle layers in one bite.",
    where: "Hoi An and Ho Chi Minh City are easy wins, but the best version is often the busy local shop near your hotel.",
  },
  {
    name: "Bun cha",
    vietnamese: "Bún chả",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1600&q=84",
    note: "Grilled pork, herbs, noodles, and dipping broth. It is social, smoky, and very Hanoi-coded.",
    where: "Hanoi lunch rooms, especially places turning tables quickly around midday.",
  },
  {
    name: "Cao lau",
    vietnamese: "Cao lầu",
    image:
      "https://images.unsplash.com/photo-1511910849309-0dffb8785146?auto=format&fit=crop&w=1600&q=84",
    note: "Hoi An's signature noodle bowl: chewy noodles, herbs, pork, crunch, and a sense of place you do not really get elsewhere.",
    where: "Hoi An Ancient Town, preferably away from the loudest riverfront pitch.",
  },
];

const famousFor = [
  {
    title: "Coffee culture",
    icon: Coffee,
    body: "Phin coffee, condensed milk, egg coffee, coconut coffee, roasteries, laptop cafes, and slow sidewalk mornings.",
  },
  {
    title: "Tailoring",
    icon: Shirt,
    body: "Hoi An is the practical tailoring capital. The trick is time: arrive early enough for fabric choice, fitting, adjustment, and pickup.",
  },
  {
    title: "Motorbike rhythm",
    icon: Train,
    body: "Scooters shape how cities move, how roads are crossed, and how travelers understand distance, risk, rain, and daily life.",
  },
  {
    title: "Coast and karst",
    icon: Waves,
    body: "Ha Long, Lan Ha, Ninh Binh, Da Nang, Nha Trang, and Phu Quoc make water and limestone part of the route logic.",
  },
];

const drinks = [
  {
    name: "Ca phe sua da",
    vietnamese: "Cà phê sữa đá",
    category: "Coffee",
    note: "Iced coffee with condensed milk: strong, sweet, and the default first order for many visitors.",
  },
  {
    name: "Egg coffee",
    vietnamese: "Cà phê trứng",
    category: "Coffee",
    note: "A Hanoi icon with whipped egg cream over coffee. Treat it like dessert, not a normal quick caffeine stop.",
  },
  {
    name: "Bia hoi",
    vietnamese: "Bia hơi",
    category: "Beer",
    note: "Fresh draft beer culture, especially visible in Hanoi. Cheap, casual, social, and best approached with low expectations and good timing.",
  },
  {
    name: "Nuoc mia",
    vietnamese: "Nước mía",
    category: "Street drink",
    note: "Pressed sugarcane juice, usually cold and fast. Useful on hot walking days, especially in the south.",
  },
];

const languageNotes = [
  "Vietnamese is tonal, so phrasebook transliteration is a support tool, not a guarantee.",
  "English access is easiest in hotels, tours, airport services, and central visitor districts.",
  "Pointing to a map, saved address, or translated text often works better than repeating a place name.",
  "Polite basics matter: greetings, thanks, the bill, taxi instructions, and emergency phrases cover most daily friction.",
];

function VietnamShell({
  eyebrow,
  title,
  subtitle,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#07110d] text-orange-50">
      <section className="relative isolate min-h-[72svh] overflow-hidden">
        <img
          src={image}
          alt=""
          className="absolute inset-0 -z-30 h-full w-full object-cover saturate-150"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,16,12,.96),rgba(7,17,13,.64)_48%,rgba(7,17,13,.16)),linear-gradient(0deg,#07110d,transparent_58%)]" />
        <div className="mx-auto grid min-h-[72svh] max-w-7xl content-end px-6 pb-16 pt-24">
          <nav className="text-xs font-black uppercase tracking-[0.12em] text-orange-100/60">
            <Link href="/" className="hover:text-orange-100">Home</Link> ·{" "}
            <Link href="/country/vietnam" className="hover:text-orange-100">Vietnam</Link> · {eyebrow}
          </nav>
          <p className="mt-10 text-xs font-black uppercase tracking-[0.14em] text-amber-300">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-5xl font-sans text-[clamp(3.4rem,12vw,9rem)] font-black leading-[0.86]">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-orange-50/78">
            {subtitle}
          </p>
        </div>
      </section>
      {children}
    </main>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-300">
        {kicker}
      </p>
      <h2 className="mt-3 font-sans text-[clamp(2rem,6vw,4.25rem)] font-black leading-tight">
        {title}
      </h2>
    </div>
  );
}

export function VietnamCuisinePage() {
  return (
    <VietnamShell
      eyebrow="Cuisine"
      title="Eat by city, not checklist."
      subtitle="Vietnam's food map is regional, fast-moving, and deeply practical: breakfast soups, coffee stops, market snacks, coastal seafood, and one-dish specialists."
      image={VIETNAM_COUNTRY_IMAGES.food}
    >
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Signature dishes" title="Start with the dishes that teach the rhythm." />
          <div className="grid gap-5 lg:grid-cols-2">
            {food.map((dish) => (
              <article key={dish.name} className="overflow-hidden border border-orange-100/14 bg-black/24">
                <div className="relative min-h-72">
                  <img src={dish.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-300">{dish.vietnamese}</p>
                    <h2 className="mt-2 font-sans text-4xl font-black">{dish.name}</h2>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-sm leading-7 text-orange-50/72">{dish.note}</p>
                  <p className="mt-5 border-l border-amber-300/70 pl-4 text-sm leading-7 text-orange-50/62">{dish.where}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <SectionTitle kicker="Cost cues" title="Food stays affordable, but location changes the bill." />
          <div className="grid gap-3">
            {VIETNAM_PRICE_BENCHMARKS.filter((item) => item.category === "food_drink").map((item) => (
              <div key={item.benchmark_key} className="flex justify-between gap-5 border-b border-orange-100/12 pb-3 text-sm">
                <span className="text-orange-50/72">{item.label}</span>
                <span className="font-black text-amber-300">{formatVnd(item.amount_typical_minor)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </VietnamShell>
  );
}

export function VietnamBeveragesPage() {
  return (
    <VietnamShell
      eyebrow="Drinks"
      title="Coffee first, beer later."
      subtitle="Vietnam is one of the easiest places to build a day around drinks: phin coffee in the morning, fruit juice in the heat, and casual beer after dark."
      image={VIETNAM_COUNTRY_IMAGES.coffee}
    >
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="What to order" title="Four drinks that explain the day." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {drinks.map((drink) => (
              <article key={drink.name} className="border border-orange-100/14 bg-black/28 p-6">
                <Coffee className="text-amber-300" />
                <p className="mt-6 text-xs font-black uppercase tracking-[0.12em] text-orange-50/48">{drink.category}</p>
                <h2 className="mt-2 font-sans text-3xl font-black">{drink.name}</h2>
                <p className="mt-1 text-sm font-bold text-amber-300">{drink.vietnamese}</p>
                <p className="mt-5 text-sm leading-7 text-orange-50/68">{drink.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          {VIETNAM_LOCAL_APPS.slice(0, 4).map((app) => (
            <a key={app.slug} href={app.web_url ?? "#"} className="border border-orange-100/14 bg-white/[0.045] p-5 transition hover:border-amber-300/70">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-300">Useful app</p>
              <h3 className="mt-2 font-sans text-3xl font-black">{app.name}</h3>
              <p className="mt-3 text-sm leading-7 text-orange-50/68">{app.traveler_notes}</p>
            </a>
          ))}
        </div>
      </section>
    </VietnamShell>
  );
}

export function VietnamFamousForPage() {
  return (
    <VietnamShell
      eyebrow="Famous for"
      title="Coffee, coast, craft, motion."
      subtitle="Vietnam is not one visual mood. Its strongest travel signals are daily-use culture: cafes, scooters, tailoring, river cities, mountain weather, beach resets, and food that changes by region."
      image={VIETNAM_COUNTRY_IMAGES.street}
    >
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Identity markers" title="What travelers remember after leaving." />
          <div className="grid gap-5 md:grid-cols-2">
            {famousFor.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="border border-orange-100/14 bg-black/24 p-6 sm:p-8">
                  <Icon className="text-amber-300" size={30} />
                  <h2 className="mt-6 font-sans text-4xl font-black">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-orange-50/68">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Best-fit activities" title="Use the activity layer to choose your route." />
          <div className="flex flex-wrap gap-3">
            {VIETNAM_ACTIVITIES.map((activity) => (
              <span key={activity.slug} className="border border-orange-100/14 bg-white/[0.055] px-4 py-2 text-sm font-black text-orange-50/82">
                {activity.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </VietnamShell>
  );
}

export function VietnamLanguagesPage() {
  const grouped = VIETNAM_PHRASES.reduce<Record<string, typeof VIETNAM_PHRASES>>((acc, phrase) => {
    acc[phrase.category] = [...(acc[phrase.category] ?? []), phrase];
    return acc;
  }, {});

  return (
    <VietnamShell
      eyebrow="Language"
      title="Vietnamese is the travel key."
      subtitle="You can travel Vietnam with English in major visitor zones, but a few Vietnamese phrases make taxis, cafes, markets, and emergencies much smoother."
      image={VIETNAM_COUNTRY_IMAGES.hero}
    >
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <Languages className="text-amber-300" size={34} />
            <SectionTitle kicker="Language reality" title="Tone, context, and phone support matter." />
            <div className="grid gap-3">
              {languageNotes.map((note) => (
                <p key={note} className="border-l border-amber-300/70 pl-4 text-sm leading-7 text-orange-50/68">
                  {note}
                </p>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            {Object.entries(grouped).map(([category, phrases]) => (
              <article key={category} className="border border-orange-100/14 bg-black/24 p-5 sm:p-6">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-300">{category.replace(/-/g, " ")}</p>
                <div className="mt-4 grid gap-4">
                  {phrases.map((phrase) => (
                    <div key={phrase.phrase_key} className="border-t border-orange-100/10 pt-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h2 className="font-sans text-2xl font-black">{phrase.translated_text}</h2>
                        <span className="text-xs font-bold text-orange-50/45">{phrase.source_text}</span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-amber-300">{phrase.transliteration}</p>
                      <p className="mt-2 text-sm leading-6 text-orange-50/62">{phrase.usage_notes}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <Link href="/country/vietnam" className="border border-orange-100/14 bg-white/[0.045] p-5 transition hover:border-amber-300/70">
            <MapPinned className="text-amber-300" />
            <h3 className="mt-4 font-sans text-2xl font-black">Back to Vietnam</h3>
          </Link>
          <Link href="/country/vietnam/itinerary" className="border border-orange-100/14 bg-white/[0.045] p-5 transition hover:border-amber-300/70">
            <Sparkles className="text-amber-300" />
            <h3 className="mt-4 font-sans text-2xl font-black">Build a route</h3>
          </Link>
          <Link href="/country/vietnam/cuisine" className="border border-orange-100/14 bg-white/[0.045] p-5 transition hover:border-amber-300/70">
            <Soup className="text-amber-300" />
            <h3 className="mt-4 font-sans text-2xl font-black">Food guide</h3>
          </Link>
        </div>
      </section>
    </VietnamShell>
  );
}
