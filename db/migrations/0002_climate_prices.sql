-- M1: seasonal_climate + price_items (country + city scoped) and fallback
-- helper functions that merge country-level rows with city-level overrides.
--
-- Both tables use owner_kind = 'country' | 'city' and enforce that exactly
-- one of country_id / city_id is set. City rows override country rows on the
-- join key (month for climate, key for price_items).

-- ---------------------------------------------------------------------------
-- seasonal_climate
-- ---------------------------------------------------------------------------

create table if not exists public.seasonal_climate (
  id uuid primary key default gen_random_uuid(),
  owner_kind text not null check (owner_kind in ('country','city')),
  country_id uuid references public.countries(id) on delete cascade,
  city_id uuid references public.cities(id) on delete cascade,
  month smallint not null check (month between 1 and 12),
  avg_high_c numeric(4,1),
  avg_low_c numeric(4,1),
  precip_mm numeric(6,1),
  humidity_pct numeric(4,1),
  season_label text check (season_label in ('peak','shoulder','off')),
  cost_index numeric(3,2),
  notes text,
  created_at timestamptz not null default now(),
  check (
    (owner_kind = 'country' and country_id is not null and city_id is null) or
    (owner_kind = 'city'    and city_id    is not null and country_id is null)
  )
);

create unique index if not exists uq_seasonal_climate_country
  on public.seasonal_climate(country_id, month)
  where owner_kind = 'country';

create unique index if not exists uq_seasonal_climate_city
  on public.seasonal_climate(city_id, month)
  where owner_kind = 'city';

alter table public.seasonal_climate enable row level security;
create policy seasonal_climate_read on public.seasonal_climate for select using (true);

-- ---------------------------------------------------------------------------
-- price_items
-- ---------------------------------------------------------------------------

create table if not exists public.price_items (
  id uuid primary key default gen_random_uuid(),
  owner_kind text not null check (owner_kind in ('country','city')),
  country_id uuid references public.countries(id) on delete cascade,
  city_id uuid references public.cities(id) on delete cascade,
  key text not null,
  label text not null,
  amount_minor int not null,
  currency char(3) not null,
  source text,
  source_url text,
  notes text,
  display_order int not null default 0,
  updated_at timestamptz not null default now(),
  check (
    (owner_kind = 'country' and country_id is not null and city_id is null) or
    (owner_kind = 'city'    and city_id    is not null and country_id is null)
  )
);

create unique index if not exists uq_price_items_country
  on public.price_items(country_id, key)
  where owner_kind = 'country';

create unique index if not exists uq_price_items_city
  on public.price_items(city_id, key)
  where owner_kind = 'city';

alter table public.price_items enable row level security;
create policy price_items_read on public.price_items for select using (true);

create trigger trg_price_items_updated_at
before update on public.price_items
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Fallback helpers: country content + city override
-- ---------------------------------------------------------------------------

create or replace function public.effective_seasonal_climate(p_city_id uuid)
returns setof public.seasonal_climate
language sql
stable
as $$
  with city_row as (
    select country_id from public.cities where id = p_city_id
  ),
  city_months as (
    select month from public.seasonal_climate
     where owner_kind = 'city' and city_id = p_city_id
  )
  select *
    from public.seasonal_climate
   where owner_kind = 'city' and city_id = p_city_id
  union all
  select sc.*
    from public.seasonal_climate sc
    join city_row cr on cr.country_id = sc.country_id
   where sc.owner_kind = 'country'
     and sc.month not in (select month from city_months);
$$;

create or replace function public.effective_price_items(p_city_id uuid)
returns setof public.price_items
language sql
stable
as $$
  with city_row as (
    select country_id from public.cities where id = p_city_id
  ),
  city_keys as (
    select key from public.price_items
     where owner_kind = 'city' and city_id = p_city_id
  )
  select *
    from public.price_items
   where owner_kind = 'city' and city_id = p_city_id
  union all
  select pi.*
    from public.price_items pi
    join city_row cr on cr.country_id = pi.country_id
   where pi.owner_kind = 'country'
     and pi.key not in (select key from city_keys);
$$;

grant execute on function public.effective_seasonal_climate(uuid) to anon, authenticated;
grant execute on function public.effective_price_items(uuid) to anon, authenticated;
