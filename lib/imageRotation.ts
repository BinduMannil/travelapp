export type DestinationImageCategory =
  | "hero"
  | "skyline"
  | "food"
  | "markets"
  | "neighborhoods"
  | "nightlife"
  | "nature"
  | "landmarks"
  | "transport"
  | "hiddenGems"
  | "cities"
  | "cuisine"
  | "culture"
  | "coast"
  | "mountains"
  | "experiences"
  | "routes";

export type DestinationImageSet = Partial<Record<DestinationImageCategory, string[]>>;

export type ImageUsageContext = {
  usedImages: Set<string>;
};

type UniqueImageRequest = {
  destinationSlug?: string;
  countrySlug?: string;
  category?: DestinationImageCategory;
  preferredImage?: string;
  usedImages?: ImageUsageContext;
};

const fallbackImages: DestinationImageSet = {
  hero: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=86",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=86",
  ],
  skyline: [
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1800&q=84",
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?auto=format&fit=crop&w=1800&q=84",
  ],
  food: [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=84",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=84",
  ],
  culture: [
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1800&q=84",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=84",
  ],
  nature: [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=84",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=84",
  ],
  hiddenGems: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=84",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=84",
  ],
};

const countryImages: Record<string, DestinationImageSet> = {
  vietnam: {
    hero: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2400&q=86",
    ],
    cities: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1800&q=84",
    ],
    cuisine: [
      "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1600&q=84",
    ],
    culture: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=1800&q=84",
    ],
    nature: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=84",
    ],
    coast: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=84",
    ],
    experiences: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=1600&q=84",
    ],
    routes: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1800&q=84",
    ],
  },
  japan: {
    hero: [
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=86",
    ],
    cities: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1800&q=84",
    ],
    cuisine: [
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1600&q=84",
    ],
    culture: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1800&q=84",
    ],
    nature: [
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=84",
    ],
    experiences: [
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1600&q=84",
    ],
    routes: [
      "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=84",
    ],
  },
  italy: {
    hero: [
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?auto=format&fit=crop&w=2400&q=86",
    ],
    cities: [
      "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1800&q=84",
    ],
    cuisine: [
      "https://images.unsplash.com/photo-1498579397066-22750a3cb424?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1600&q=84",
    ],
    culture: [
      "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1800&q=84",
    ],
    nature: [
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1534445867742-43195f401b6c?auto=format&fit=crop&w=1800&q=84",
    ],
    experiences: [
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1498579397066-22750a3cb424?auto=format&fit=crop&w=1600&q=84",
    ],
  },
  france: {
    hero: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=2400&q=86",
    ],
    cities: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=1800&q=84",
    ],
    cuisine: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1600&q=84",
    ],
    culture: [
      "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1800&q=84",
    ],
    experiences: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=84",
    ],
  },
  switzerland: {
    hero: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2400&q=86",
    ],
    mountains: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1800&q=84",
    ],
    nature: [
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=84",
    ],
    cities: [
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=1800&q=84",
    ],
    experiences: [
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1600&q=84",
    ],
  },
  morocco: {
    hero: [
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1548018560-c7196548e84d?auto=format&fit=crop&w=2400&q=86",
    ],
    cities: [
      "https://images.unsplash.com/photo-1548018560-c7196548e84d?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1539020140153-e8c237112e53?auto=format&fit=crop&w=1800&q=84",
    ],
    cuisine: [
      "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1600&q=84&sat=20",
    ],
    culture: [
      "https://images.unsplash.com/photo-1539020140153-e8c237112e53?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1800&q=84",
    ],
    nature: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1800&q=84",
    ],
    experiences: [
      "https://images.unsplash.com/photo-1548018560-c7196548e84d?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=84",
    ],
  },
  indonesia: {
    hero: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=2400&q=86",
    ],
    cities: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1800&q=84",
    ],
    cuisine: [
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=1600&q=84",
    ],
    nature: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1800&q=84",
    ],
    coast: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1800&q=84",
    ],
    experiences: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1600&q=84",
    ],
  },
};

const cityImages: Record<string, DestinationImageSet> = {
  "ho-chi-minh-city": {
    hero: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2400&q=86",
    ],
    skyline: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=84",
    ],
    food: [
      "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1600&q=84",
    ],
    markets: [
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1600&q=84",
    ],
    neighborhoods: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1600&q=84",
    ],
    nightlife: [
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=84",
    ],
    landmarks: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=84",
    ],
    transport: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=84",
    ],
    hiddenGems: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?auto=format&fit=crop&w=1600&q=84",
    ],
  },
  hanoi: {
    hero: [
      "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=86",
    ],
    skyline: [
      "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=84",
    ],
    food: [
      "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1600&q=84",
    ],
    markets: [
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1600&q=84",
    ],
    neighborhoods: [
      "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=84",
    ],
    nightlife: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=84",
    ],
    hiddenGems: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?auto=format&fit=crop&w=1600&q=84",
    ],
  },
  "da-nang": {
    hero: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=86",
    ],
    skyline: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=84",
    ],
    food: [
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?auto=format&fit=crop&w=1600&q=84",
    ],
    markets: [
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1600&q=84",
    ],
    nature: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=84",
    ],
    transport: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=84",
    ],
    hiddenGems: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=84",
    ],
  },
  "hoi-an": {
    hero: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=2400&q=86",
    ],
    landmarks: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=84",
    ],
    food: [
      "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1600&q=84",
    ],
    markets: [
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1600&q=84",
    ],
    neighborhoods: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=1600&q=84",
    ],
    nightlife: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1600&q=84",
    ],
    hiddenGems: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=84",
    ],
  },
  kyoto: {
    hero: [
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=86",
    ],
    landmarks: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1800&q=84",
    ],
    food: [
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1600&q=84",
    ],
    neighborhoods: [
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1600&q=84",
    ],
    nature: [
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1600&q=84",
    ],
    hiddenGems: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1600&q=84",
    ],
  },
  tokyo: {
    hero: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2400&q=86",
    ],
    skyline: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1800&q=84",
    ],
    food: [
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1600&q=84",
    ],
    nightlife: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1600&q=84",
    ],
    transport: [
      "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1600&q=84",
    ],
    hiddenGems: [
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=84",
    ],
  },
  paris: {
    hero: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=2400&q=86",
    ],
    skyline: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1800&q=84",
    ],
    food: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1600&q=84",
    ],
    neighborhoods: [
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=1600&q=84",
    ],
  },
  milan: {
    hero: [
      "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=2400&q=86",
    ],
    skyline: [
      "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1800&q=84",
    ],
    food: [
      "https://images.unsplash.com/photo-1498579397066-22750a3cb424?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1600&q=84",
    ],
    culture: [
      "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1800&q=84",
    ],
  },
  marrakech: {
    hero: [
      "https://images.unsplash.com/photo-1548018560-c7196548e84d?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1539020140153-e8c237112e53?auto=format&fit=crop&w=2400&q=86",
    ],
    markets: [
      "https://images.unsplash.com/photo-1539020140153-e8c237112e53?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1548018560-c7196548e84d?auto=format&fit=crop&w=1800&q=84",
    ],
    food: [
      "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=1600&q=84",
    ],
    landmarks: [
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1539020140153-e8c237112e53?auto=format&fit=crop&w=1800&q=84",
    ],
    nightlife: [
      "https://images.unsplash.com/photo-1548018560-c7196548e84d?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=84",
    ],
  },
  bali: {
    hero: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=86",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=2400&q=86",
    ],
    nature: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1800&q=84",
    ],
    coast: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1800&q=84",
    ],
    food: [
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1600&q=84",
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=1600&q=84",
    ],
    landmarks: [
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1800&q=84",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=84",
    ],
  },
};

const relatedCountryByCity: Record<string, string> = {
  "ho-chi-minh-city": "vietnam",
  hanoi: "vietnam",
  "da-nang": "vietnam",
  "hoi-an": "vietnam",
  kyoto: "japan",
  tokyo: "japan",
  paris: "france",
  milan: "italy",
  marrakech: "morocco",
  bali: "indonesia",
};

const categoryFallbacks: Record<DestinationImageCategory, DestinationImageCategory[]> = {
  hero: ["skyline", "landmarks", "nature", "cities", "experiences"],
  skyline: ["hero", "landmarks", "neighborhoods", "cities"],
  food: ["cuisine", "markets", "culture", "experiences"],
  markets: ["food", "culture", "neighborhoods", "experiences"],
  neighborhoods: ["landmarks", "skyline", "culture", "cities"],
  nightlife: ["skyline", "neighborhoods", "culture"],
  nature: ["mountains", "coast", "hero", "experiences"],
  landmarks: ["culture", "skyline", "hero", "cities"],
  transport: ["routes", "cities", "skyline", "experiences"],
  hiddenGems: ["neighborhoods", "landmarks", "nature", "culture"],
  cities: ["skyline", "landmarks", "hero", "experiences"],
  cuisine: ["food", "markets", "culture", "experiences"],
  culture: ["landmarks", "markets", "neighborhoods", "experiences"],
  coast: ["nature", "hero", "experiences"],
  mountains: ["nature", "hero", "experiences"],
  experiences: ["culture", "nature", "cities", "hero"],
  routes: ["transport", "cities", "nature", "experiences"],
};

function normalizeSlug(value?: string) {
  return value?.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizeImageKey(image: string) {
  try {
    const url = new URL(image);
    return `${url.origin}${url.pathname}`;
  } catch {
    return image.split("?")[0];
  }
}

function mergeImageSets(...sets: Array<DestinationImageSet | undefined>): DestinationImageSet {
  return sets.reduce<DestinationImageSet>((merged, set) => {
    if (!set) return merged;

    (Object.keys(set) as DestinationImageCategory[]).forEach((category) => {
      merged[category] = [...(merged[category] ?? []), ...(set[category] ?? [])];
    });

    return merged;
  }, {});
}

function uniqueImages(images: string[]) {
  const seen = new Set<string>();
  return images.filter((image) => {
    const key = normalizeImageKey(image);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function resetUsedImagesForPage(): ImageUsageContext {
  return { usedImages: new Set<string>() };
}

export function markImageAsUsed(image: string, usedImages: ImageUsageContext = resetUsedImagesForPage()) {
  usedImages.usedImages.add(normalizeImageKey(image));
  return image;
}

export function getImageSetForDestination(destinationSlug?: string, countrySlug?: string): DestinationImageSet {
  const normalizedDestination = normalizeSlug(destinationSlug);
  const normalizedCountry = normalizeSlug(countrySlug) ?? (normalizedDestination ? relatedCountryByCity[normalizedDestination] : undefined);

  return mergeImageSets(
    normalizedCountry ? countryImages[normalizedCountry] : undefined,
    normalizedDestination ? cityImages[normalizedDestination] : undefined,
    fallbackImages,
  );
}

export function getUniqueDestinationImage({
  destinationSlug,
  countrySlug,
  category = "hero",
  preferredImage,
  usedImages,
}: UniqueImageRequest) {
  const imageContext = usedImages ?? resetUsedImagesForPage();
  const normalizedDestination = normalizeSlug(destinationSlug);
  const normalizedCountry = normalizeSlug(countrySlug) ?? (normalizedDestination ? relatedCountryByCity[normalizedDestination] : undefined);
  const destinationImageSet = mergeImageSets(
    normalizedCountry ? countryImages[normalizedCountry] : undefined,
    normalizedDestination ? cityImages[normalizedDestination] : undefined,
  );
  const imageSet = mergeImageSets(destinationImageSet, fallbackImages);
  const candidateCategories: DestinationImageCategory[] = [category, ...(categoryFallbacks[category] ?? []), "hero", "experiences", "nature"];
  const preferred = preferredImage ? [preferredImage] : [];
  const candidates = uniqueImages([
    ...candidateCategories.flatMap((imageCategory) => destinationImageSet[imageCategory] ?? []),
    ...Object.values(destinationImageSet).flat(),
    ...preferred,
    ...candidateCategories.flatMap((imageCategory) => fallbackImages[imageCategory] ?? []),
    ...Object.values(imageSet).flat(),
  ]);

  const uniqueCandidate = candidates.find((image) => !imageContext.usedImages.has(normalizeImageKey(image)));
  const selected = uniqueCandidate ?? candidates[0] ?? fallbackImages.hero?.[0] ?? "";

  if (selected) {
    markImageAsUsed(selected, imageContext);
  }

  return selected;
}

export function inferImageCategoryFromText(text: string): DestinationImageCategory {
  const normalized = text.toLowerCase();

  if (/food|eat|dish|cuisine|coffee|cafe|restaurant|meal|drink|tea|wine|beer/.test(normalized)) return "food";
  if (/market|bazaar|souq|shop|shopping/.test(normalized)) return "markets";
  if (/night|bar|rooftop|after dark|sunset|evening/.test(normalized)) return "nightlife";
  if (/train|bus|metro|rail|transport|route|transfer|itinerary|road/.test(normalized)) return "transport";
  if (/beach|coast|island|sea|ocean|bay/.test(normalized)) return "coast";
  if (/mountain|alpine|snow|glacier|hike|valley/.test(normalized)) return "mountains";
  if (/garden|forest|river|lake|nature|waterfall|park/.test(normalized)) return "nature";
  if (/hidden|secret|local|neighborhood|quarter|district|alley/.test(normalized)) return "hiddenGems";
  if (/temple|museum|palace|church|landmark|architecture|castle|shrine/.test(normalized)) return "landmarks";
  if (/city|cities|skyline|urban/.test(normalized)) return "cities";
  if (/culture|ritual|language|famous|craft|etiquette/.test(normalized)) return "culture";

  return "experiences";
}
