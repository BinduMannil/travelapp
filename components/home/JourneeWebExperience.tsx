/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { JourneeBrand } from "@/components/brand/JourneeLogo";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import { CinematicBackground } from "@/components/visual/CinematicBackground";
import { formatDisplayTitle } from "@/lib/ui/formatDisplayTitle";
import {
  getUniqueDestinationImage,
  inferImageCategoryFromText,
  markImageAsUsed,
  resetUsedImagesForPage,
} from "@/lib/imageRotation";
import { mainNavigation, routes } from "@/lib/routes";

const imageSet = {
  nature:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=84",
  culture:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=84",
  hidden:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=84",
  adventure:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=84",
  food:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=84",
  spiritual:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=84",
  ubud:
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=86",
  lauterbrunnen:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=86",
  kyoto:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=86",
  lofoten:
    "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1200&q=86",
};

type HeroSlide = {
  destination: string;
  country: string;
  image: string;
  eyebrow: string;
  quote: string;
  byline: string;
};

const globalHeroSlides: HeroSlide[] = [
  { destination: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2600&q=88", eyebrow: "Neon crossing", quote: "The city moves like a current, and somehow makes room for your own rhythm.", byline: "Tokyo, Japan" },
  { destination: "Kyoto", country: "Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2600&q=88", eyebrow: "Temple hush", quote: "Old streets teach you to listen before you decide where to go next.", byline: "Kyoto, Japan" },
  { destination: "Osaka", country: "Japan", image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=2600&q=88", eyebrow: "Night market glow", quote: "Some cities introduce themselves through steam, laughter and a late table.", byline: "Osaka, Japan" },
  { destination: "Hokkaido", country: "Japan", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2600&q=88", eyebrow: "Snow country", quote: "The farther north you travel, the softer the world seems to speak.", byline: "Hokkaido, Japan" },
  { destination: "Seoul", country: "South Korea", image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=2600&q=88", eyebrow: "After-dark skyline", quote: "A bright city can still feel personal when you find your corner of it.", byline: "Seoul, South Korea" },
  { destination: "Busan", country: "South Korea", image: "https://images.unsplash.com/photo-1535189043414-47a3c49a0bed?auto=format&fit=crop&w=2600&q=88", eyebrow: "Harbor morning", quote: "The coast changes the tempo, turning every arrival into a breath.", byline: "Busan, South Korea" },
  { destination: "Shanghai", country: "China", image: "https://images.unsplash.com/photo-1548919973-5cef591cdbc9?auto=format&fit=crop&w=2600&q=88", eyebrow: "River of towers", quote: "Glass, water and light keep rewriting the city in front of you.", byline: "Shanghai, China" },
  { destination: "Beijing", country: "China", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2600&q=88", eyebrow: "Imperial scale", quote: "History feels different when it stretches beyond the edge of your sight.", byline: "Beijing, China" },
  { destination: "Hong Kong", country: "China", image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=2600&q=88", eyebrow: "Vertical harbor", quote: "The skyline rises fast, but the best moments still happen at street level.", byline: "Hong Kong, China" },
  { destination: "Bangkok", country: "Thailand", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=2600&q=88", eyebrow: "Golden heat", quote: "The city opens in layers of incense, traffic, river light and spice.", byline: "Bangkok, Thailand" },
  { destination: "Chiang Mai", country: "Thailand", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2600&q=88", eyebrow: "Mountain temples", quote: "Some mornings begin with bells and end above a valley of blue smoke.", byline: "Chiang Mai, Thailand" },
  { destination: "Phuket", country: "Thailand", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=2600&q=88", eyebrow: "Andaman blue", quote: "The sea keeps a slower clock, and it invites you to borrow it.", byline: "Phuket, Thailand" },
  { destination: "Hanoi", country: "Vietnam", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2600&q=88", eyebrow: "Old quarter rain", quote: "A thousand small rituals can make one city feel endlessly new.", byline: "Hanoi, Vietnam" },
  { destination: "Ho Chi Minh City", country: "Vietnam", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=2600&q=88", eyebrow: "Electric evening", quote: "Momentum becomes beautiful when the whole street seems to move together.", byline: "Ho Chi Minh City, Vietnam" },
  { destination: "Da Nang", country: "Vietnam", image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2600&q=88", eyebrow: "Coastal bridge", quote: "Between mountains and sea, even the road feels like part of the view.", byline: "Da Nang, Vietnam" },
  { destination: "Bali", country: "Indonesia", image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=2600&q=88", eyebrow: "Ritual green", quote: "The island asks you to notice what is offered, not only what is seen.", byline: "Bali, Indonesia" },
  { destination: "Jakarta", country: "Indonesia", image: "https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=2600&q=88", eyebrow: "Capital surge", quote: "A city this alive turns movement itself into a kind of weather.", byline: "Jakarta, Indonesia" },
  { destination: "Singapore", country: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=2600&q=88", eyebrow: "Garden skyline", quote: "The future feels warmer when it grows beside trees and night air.", byline: "Singapore" },
  { destination: "Kuala Lumpur", country: "Malaysia", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f11?auto=format&fit=crop&w=2600&q=88", eyebrow: "Twin tower gleam", quote: "At dusk, the city gathers its reflections and becomes cinematic.", byline: "Kuala Lumpur, Malaysia" },
  { destination: "Penang", country: "Malaysia", image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=2600&q=88", eyebrow: "Heritage coast", quote: "The best streets give you color first, then history, then appetite.", byline: "Penang, Malaysia" },
  { destination: "Dubai", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2600&q=88", eyebrow: "Desert futurism", quote: "Here, ambition catches the light and throws it back across the sand.", byline: "Dubai, UAE" },
  { destination: "Abu Dhabi", country: "UAE", image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=2600&q=88", eyebrow: "Marble calm", quote: "Grandeur feels gentler when it is wrapped in courtyards and quiet water.", byline: "Abu Dhabi, UAE" },
  { destination: "Riyadh", country: "Saudi Arabia", image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=2600&q=88", eyebrow: "Desert capital", quote: "The horizon is wide enough here to make tomorrow feel visible.", byline: "Riyadh, Saudi Arabia" },
  { destination: "AlUla", country: "Saudi Arabia", image: "https://images.unsplash.com/photo-1608096299210-db7e38487075?auto=format&fit=crop&w=2600&q=88", eyebrow: "Sandstone theater", quote: "Rock and silence can hold a story longer than any city street.", byline: "AlUla, Saudi Arabia" },
  { destination: "Jeddah", country: "Saudi Arabia", image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=2600&q=88", eyebrow: "Red Sea air", quote: "Salt, coral and old balconies make the coast feel remembered.", byline: "Jeddah, Saudi Arabia" },
  { destination: "Doha", country: "Qatar", image: "https://images.unsplash.com/photo-1551041777-ed277b8dd348?auto=format&fit=crop&w=2600&q=88", eyebrow: "Pearl skyline", quote: "The bay turns architecture into a reflection you can walk beside.", byline: "Doha, Qatar" },
  { destination: "Muscat", country: "Oman", image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2601&q=88", eyebrow: "Mountain harbor", quote: "White walls, old forts and sea wind keep the city beautifully grounded.", byline: "Muscat, Oman" },
  { destination: "Istanbul", country: "Turkey", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=2600&q=88", eyebrow: "Two-continent light", quote: "Every ferry crossing feels like moving between chapters of the same poem.", byline: "Istanbul, Turkey" },
  { destination: "Cappadocia", country: "Turkey", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2600&q=88", eyebrow: "Balloon dawn", quote: "The morning rises with you, soft and impossible above the stone.", byline: "Cappadocia, Turkey" },
  { destination: "Paris", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2600&q=88", eyebrow: "Midnight icon", quote: "The familiar becomes magic again when the city turns on its lights.", byline: "Paris, France" },
  { destination: "Nice", country: "France", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2601&q=88", eyebrow: "Riviera blue", quote: "The shore makes elegance feel easy, sunlit and close enough to touch.", byline: "Nice, France" },
  { destination: "Provence", country: "France", image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=2600&q=88", eyebrow: "Lavender hour", quote: "The countryside slows the light until it feels almost handmade.", byline: "Provence, France" },
  { destination: "Rome", country: "Italy", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=2600&q=88", eyebrow: "Ancient gold", quote: "A city built in layers lets every walk become a small excavation.", byline: "Rome, Italy" },
  { destination: "Venice", country: "Italy", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=2600&q=88", eyebrow: "Canal dusk", quote: "Water changes everything, including the way memory enters a street.", byline: "Venice, Italy" },
  { destination: "Florence", country: "Italy", image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?auto=format&fit=crop&w=2600&q=88", eyebrow: "Renaissance light", quote: "Beauty feels practical here, as if every stone knows its purpose.", byline: "Florence, Italy" },
  { destination: "Amalfi Coast", country: "Italy", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2600&q=88", eyebrow: "Cliffside blue", quote: "The coast turns every curve of road into a reveal.", byline: "Amalfi Coast, Italy" },
  { destination: "Barcelona", country: "Spain", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=2600&q=88", eyebrow: "Mosaic city", quote: "Color becomes architecture, and architecture becomes a reason to wander.", byline: "Barcelona, Spain" },
  { destination: "Madrid", country: "Spain", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=2600&q=88", eyebrow: "Late-night plazas", quote: "Some capitals save their warmth for after sunset.", byline: "Madrid, Spain" },
  { destination: "Seville", country: "Spain", image: "https://images.unsplash.com/photo-1559564477-6e858227cbc7?auto=format&fit=crop&w=2600&q=88", eyebrow: "Andalusian flame", quote: "Orange trees, tilework and song make the evening feel alive.", byline: "Seville, Spain" },
  { destination: "Lisbon", country: "Portugal", image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=2600&q=88", eyebrow: "Atlantic hills", quote: "The city climbs toward the light, then gives you the river.", byline: "Lisbon, Portugal" },
  { destination: "Porto", country: "Portugal", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=2600&q=88", eyebrow: "Blue-tile river", quote: "Every bridge feels like an invitation to see the city twice.", byline: "Porto, Portugal" },
  { destination: "Athens", country: "Greece", image: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=2600&q=88", eyebrow: "Marble horizon", quote: "The old world still knows how to catch the last light.", byline: "Athens, Greece" },
  { destination: "Santorini", country: "Greece", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2601&q=88", eyebrow: "Caldera glow", quote: "White walls, blue domes and a horizon that refuses to end.", byline: "Santorini, Greece" },
  { destination: "Zurich", country: "Switzerland", image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=2600&q=88", eyebrow: "Lake precision", quote: "A clear morning can make even a city feel freshly drawn.", byline: "Zurich, Switzerland" },
  { destination: "Lauterbrunnen", country: "Switzerland", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2600&q=88", eyebrow: "Waterfall valley", quote: "Some landscapes do not need drama; they are already full of it.", byline: "Lauterbrunnen, Switzerland" },
  { destination: "Zermatt", country: "Switzerland", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2601&q=88", eyebrow: "Matterhorn air", quote: "The mountain holds the horizon steady while everything else falls quiet.", byline: "Zermatt, Switzerland" },
  { destination: "Vienna", country: "Austria", image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=2600&q=88", eyebrow: "Imperial evening", quote: "Music seems to linger in the stone long after the hall empties.", byline: "Vienna, Austria" },
  { destination: "Salzburg", country: "Austria", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2600&q=88", eyebrow: "Alpine baroque", quote: "The hills arrive at the edge of town like a quiet chorus.", byline: "Salzburg, Austria" },
  { destination: "London", country: "UK", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2600&q=88", eyebrow: "River capital", quote: "The city feels endless because every neighborhood keeps its own weather.", byline: "London, UK" },
  { destination: "Edinburgh", country: "UK", image: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=2600&q=88", eyebrow: "Castle weather", quote: "Stone, mist and stories make the climb feel worth every step.", byline: "Edinburgh, UK" },
  { destination: "Dublin", country: "Ireland", image: "https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=2600&q=88", eyebrow: "Literary rain", quote: "The best evenings begin with a doorway, a song and no strict plan.", byline: "Dublin, Ireland" },
  { destination: "Amsterdam", country: "Netherlands", image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=2600&q=88", eyebrow: "Canal geometry", quote: "Reflections make the city feel doubled, softer and more secret.", byline: "Amsterdam, Netherlands" },
  { destination: "Oslo", country: "Norway", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2600&q=88", eyebrow: "Nordic harbor", quote: "Clean lines and cold water give the city its quiet confidence.", byline: "Oslo, Norway" },
  { destination: "Bergen", country: "Norway", image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=2600&q=88", eyebrow: "Fjord gateway", quote: "Rain belongs here, turning color and timber into something cinematic.", byline: "Bergen, Norway" },
  { destination: "Lofoten", country: "Norway", image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=2600&q=88", eyebrow: "Northern edge", quote: "At the edge of the world, even silence feels like a destination.", byline: "Lofoten, Norway" },
  { destination: "Reykjavik", country: "Iceland", image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=2600&q=88", eyebrow: "Volcanic light", quote: "The landscape feels newly made, as if the earth is still deciding.", byline: "Reykjavik, Iceland" },
  { destination: "New York", country: "USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2600&q=88", eyebrow: "Avenue cinema", quote: "The city gives you scale first, then dares you to find intimacy.", byline: "New York, USA" },
  { destination: "Los Angeles", country: "USA", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2601&q=88", eyebrow: "Pacific haze", quote: "Sunset turns ambition soft, gold and almost believable.", byline: "Los Angeles, USA" },
  { destination: "San Francisco", country: "USA", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2600&q=88", eyebrow: "Bay fog", quote: "The fog arrives like theater, changing the city without moving it.", byline: "San Francisco, USA" },
  { destination: "Miami", country: "USA", image: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=2600&q=88", eyebrow: "Tropical deco", quote: "Color, heat and ocean air make the night feel wide awake.", byline: "Miami, USA" },
  { destination: "Las Vegas", country: "USA", image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=2600&q=88", eyebrow: "Desert neon", quote: "The city glows because the desert around it is so dark.", byline: "Las Vegas, USA" },
  { destination: "Honolulu", country: "USA", image: "https://images.unsplash.com/photo-1507876466758-bc54f384809c?auto=format&fit=crop&w=2600&q=88", eyebrow: "Island capital", quote: "The horizon stays close enough to change the shape of your day.", byline: "Honolulu, USA" },
  { destination: "Toronto", country: "Canada", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=2600&q=88", eyebrow: "Lake skyline", quote: "A northern city can feel vast and neighborly in the same glance.", byline: "Toronto, Canada" },
  { destination: "Vancouver", country: "Canada", image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=2600&q=88", eyebrow: "Mountain glass", quote: "The city looks best when the mountains appear to be listening.", byline: "Vancouver, Canada" },
  { destination: "Banff", country: "Canada", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2600&q=88", eyebrow: "Glacial blue", quote: "The lake is so clear it feels like a promise kept by the mountains.", byline: "Banff, Canada" },
  { destination: "Mexico City", country: "Mexico", image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=2600&q=88", eyebrow: "Highland metropolis", quote: "History, art and appetite meet at the same crowded table.", byline: "Mexico City, Mexico" },
  { destination: "Tulum", country: "Mexico", image: "https://images.unsplash.com/photo-1504731231146-c0f65dc6a950?auto=format&fit=crop&w=2600&q=88", eyebrow: "Caribbean ruins", quote: "Stone and sea share the same edge, both older than your plans.", byline: "Tulum, Mexico" },
  { destination: "Rio de Janeiro", country: "Brazil", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=2600&q=88", eyebrow: "Mountain beach", quote: "The city does not separate landscape from life; it lets them dance.", byline: "Rio de Janeiro, Brazil" },
  { destination: "São Paulo", country: "Brazil", image: "https://images.unsplash.com/photo-1543059080-f9b1272213d5?auto=format&fit=crop&w=2600&q=88", eyebrow: "Endless city", quote: "Scale becomes exciting when every block has another reason to stay.", byline: "São Paulo, Brazil" },
  { destination: "Buenos Aires", country: "Argentina", image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=2600&q=88", eyebrow: "Boulevard romance", quote: "The city moves between melancholy and elegance without choosing one.", byline: "Buenos Aires, Argentina" },
  { destination: "Patagonia", country: "Argentina", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2601&q=88", eyebrow: "Southern vastness", quote: "Distance becomes beautiful when the wind is the only schedule.", byline: "Patagonia, Argentina" },
  { destination: "Cusco", country: "Peru", image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2600&q=88", eyebrow: "Andean stone", quote: "Altitude makes every doorway feel earned and every view ceremonial.", byline: "Cusco, Peru" },
  { destination: "Lima", country: "Peru", image: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&w=2600&q=88", eyebrow: "Pacific table", quote: "The coast brings fog, flavor and a city that rewards curiosity.", byline: "Lima, Peru" },
  { destination: "Marrakech", country: "Morocco", image: "https://images.unsplash.com/photo-1597212720415-f8a6c2f6cc95?auto=format&fit=crop&w=2600&q=88", eyebrow: "Medina pulse", quote: "Color leads first, then scent, then the feeling you have crossed a threshold.", byline: "Marrakech, Morocco" },
  { destination: "Casablanca", country: "Morocco", image: "https://images.unsplash.com/photo-1548018560-c7196548e84d?auto=format&fit=crop&w=2600&q=88", eyebrow: "Atlantic facade", quote: "The ocean gives the city its edge, its breeze and its old film mood.", byline: "Casablanca, Morocco" },
  { destination: "Cairo", country: "Egypt", image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=2600&q=88", eyebrow: "Desert monument", quote: "Some silhouettes are so ancient they make the present feel brief.", byline: "Cairo, Egypt" },
  { destination: "Luxor", country: "Egypt", image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=2600&q=88", eyebrow: "Nile gold", quote: "The river carries the light past temples that still know how to astonish.", byline: "Luxor, Egypt" },
  { destination: "Cape Town", country: "South Africa", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=2600&q=88", eyebrow: "Table mountain", quote: "The city is held between ocean and rock, and both refuse to be background.", byline: "Cape Town, South Africa" },
  { destination: "Johannesburg", country: "South Africa", image: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?auto=format&fit=crop&w=2600&q=88", eyebrow: "Highveld energy", quote: "The city carries its history loudly, then turns it into motion.", byline: "Johannesburg, South Africa" },
  { destination: "Nairobi", country: "Kenya", image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=2600&q=88", eyebrow: "Savanna threshold", quote: "The wild feels close enough here to change the meaning of morning.", byline: "Nairobi, Kenya" },
  { destination: "Maasai Mara", country: "Kenya", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2600&q=88", eyebrow: "Golden migration", quote: "The horizon moves, and the whole plain seems to breathe with it.", byline: "Maasai Mara, Kenya" },
  { destination: "Sydney", country: "Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2600&q=88", eyebrow: "Harbor icon", quote: "The city knows its best angle and still manages to surprise you.", byline: "Sydney, Australia" },
  { destination: "Melbourne", country: "Australia", image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=2600&q=88", eyebrow: "Laneway mood", quote: "The finest discoveries hide behind coffee, brick and a turn you nearly missed.", byline: "Melbourne, Australia" },
  { destination: "Queenstown", country: "New Zealand", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2601&q=88", eyebrow: "Alpine lake", quote: "Adventure feels calmer when the water mirrors every peak.", byline: "Queenstown, New Zealand" },
  { destination: "Auckland", country: "New Zealand", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=2600&q=88", eyebrow: "Sail city", quote: "Two harbors make every departure feel possible.", byline: "Auckland, New Zealand" },
];

const navItems = mainNavigation.slice(0, 6);

const categories = [
  { title: "Nature Escapes", count: "124 places", image: imageSet.nature },
  { title: "Cultural Journeys", count: "98 places", image: imageSet.culture },
  { title: "Hidden Gems", count: "76 places", image: imageSet.hidden },
  { title: "Adventure", count: "63 places", image: imageSet.adventure },
  { title: "Food & Local", count: "54 places", image: imageSet.food },
  { title: "Spiritual", count: "48 places", image: imageSet.spiritual },
];

const destinations = [
  {
    country: "Bali",
    title: "Ubud Indonesia",
    rating: "4.8",
    reviews: "1,248",
    copy: "Rice terraces, temples and peaceful vibes.",
    image: imageSet.ubud,
    href: routes.country("indonesia"),
  },
  {
    country: "Switzerland",
    title: "Lauterbrunnen Valley",
    rating: "4.9",
    reviews: "892",
    copy: "Waterfalls, valleys and alpine beauty.",
    image: imageSet.lauterbrunnen,
    href: routes.country("switzerland"),
  },
  {
    country: "Japan",
    title: "Kyoto Japan",
    rating: "4.8",
    reviews: "1,124",
    copy: "Timeless temples, traditions and culture.",
    image: imageSet.kyoto,
    href: routes.city("kyoto"),
  },
  {
    country: "Norway",
    title: "Lofoten Islands",
    rating: "4.9",
    reviews: "743",
    copy: "Dramatic landscapes and remote beauty.",
    image: imageSet.lofoten,
    href: routes.country("norway"),
  },
];

const features = [
  {
    title: "Curated by locals",
    copy: "Authentic experiences and recommendations from people who call these places home.",
  },
  {
    title: "Travel with confidence",
    copy: "Safety tips, local insights and 24/7 support for worry-free exploration.",
  },
  {
    title: "Save & plan your trips",
    copy: "Save places, build itineraries and organize your journey in one place.",
  },
];

type DatePickerMode = "exact" | "duration" | "flexible";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdayLabels = ["M", "T", "W", "T", "F", "S", "S"];

const flexibleOptions = [
  "This weekend",
  "Next weekend",
  "One week",
  "Two weeks",
  "Any month",
  "Summer",
  "Winter",
];

function createDate(year: number, month: number, day: number) {
  return new Date(year, month, day, 12, 0, 0, 0);
}

function startOfMonth(date: Date) {
  return createDate(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date: Date, days: number) {
  return createDate(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function addMonths(date: Date, months: number) {
  return createDate(date.getFullYear(), date.getMonth() + months, 1);
}

function isSameDay(left?: Date | null, right?: Date | null) {
  if (!left || !right) return false;
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function isBeforeDay(left: Date, right: Date) {
  return createDate(left.getFullYear(), left.getMonth(), left.getDate()).getTime() <
    createDate(right.getFullYear(), right.getMonth(), right.getDate()).getTime();
}

function isBetweenDays(day: Date, start?: Date | null, end?: Date | null) {
  if (!start || !end) return false;
  const dayTime = createDate(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
  const startTime = createDate(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const endTime = createDate(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return dayTime > startTime && dayTime < endTime;
}

function formatTravelDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getCalendarDays(month: Date) {
  const first = startOfMonth(month);
  const mondayOffset = (first.getDay() + 6) % 7;
  const gridStart = addDays(first, -mondayOffset);
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

function destinationSlugFromTitle(title: string) {
  if (/ubud|bali/i.test(title)) return "bali";
  if (/kyoto/i.test(title)) return "kyoto";
  return title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function countrySlugFromLabel(country: string) {
  if (country === "Bali") return "indonesia";
  return country.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildHomeImageAssignments() {
  const usedImages = resetUsedImagesForPage();
  const assignedHeroSlides = globalHeroSlides;
  assignedHeroSlides.forEach((slide) => markImageAsUsed(slide.image, usedImages));
  const assignedCategories = categories.map((category) => ({
    ...category,
    image: getUniqueDestinationImage({
      destinationSlug: category.title,
      category: inferImageCategoryFromText(category.title),
      preferredImage: category.image,
      usedImages,
    }),
  }));
  const assignedDestinations = destinations.map((destination) => ({
    ...destination,
    image: getUniqueDestinationImage({
      destinationSlug: destinationSlugFromTitle(destination.title),
      countrySlug: countrySlugFromLabel(destination.country),
      category: inferImageCategoryFromText(`${destination.title} ${destination.copy}`),
      preferredImage: destination.image,
      usedImages,
    }),
  }));

  return { heroSlides: assignedHeroSlides, categories: assignedCategories, destinations: assignedDestinations };
}

function HomeNavbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 px-4 pt-5 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[1168px] items-center justify-between gap-5">
        <Link href={routes.home} className="shrink-0 text-white">
          <JourneeBrand direction="celestial-route" />
        </Link>

        <nav className="hidden items-center gap-9 rounded-full border border-white/[0.06] bg-black/[0.08] px-3 font-sans backdrop-blur-sm lg:flex">
          {navItems.map((item) => (
            <MainNavLink
              key={item.href}
              label={item.label}
              href={item.href}
              className="group relative py-4 text-sm font-medium text-white/86 transition hover:text-white"
              underlineClassName="absolute bottom-2 left-1/2 h-px w-7 -translate-x-1/2 bg-[#d9a947]"
            >
              {item.label}
              <span
                className={`absolute bottom-2 left-1/2 h-px -translate-x-1/2 bg-[#d9a947] transition-all duration-300 ${
                  "w-0 group-hover:w-6"
                }`}
              />
            </MainNavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden h-12 w-12 place-items-center rounded-full border border-white/18 bg-black/12 text-white backdrop-blur-md transition hover:border-[#d9a947]/70 hover:text-[#d9a947] sm:grid"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/alerts"
            aria-label="Notifications"
            className="relative hidden h-12 w-12 place-items-center rounded-full border border-white/10 bg-black/10 text-white backdrop-blur-md transition hover:border-[#d9a947]/70 hover:text-[#d9a947] sm:grid"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#d9a947]" />
          </Link>
        </div>
      </div>

      <nav className="mx-auto mt-4 flex max-w-[1168px] gap-4 overflow-x-auto border-y border-white/[0.08] bg-black/12 px-4 font-sans backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 lg:hidden">
        {navItems.map((item) => (
          <MainNavLink
            key={item.href}
            label={item.label}
            href={item.href}
            className="relative shrink-0 py-3 text-sm font-medium text-white/84"
            underlineClassName="absolute bottom-2 left-0 h-px w-full bg-[#d9a947]"
          >
            {item.label}
          </MainNavLink>
        ))}
      </nav>
    </header>
  );
}

function HomeHero({ heroSlides }: { heroSlides: HeroSlide[] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const activeHeroSlide = heroSlides[activeSlide] ?? heroSlides[0];
  const heroImages = heroSlides.map((slide) => slide.image);
  const totalSlides = heroSlides.length;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % totalSlides);
    }, 60000);

    return () => window.clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#020908] sm:min-h-[820px] lg:min-h-[850px]">
      <CinematicBackground images={heroImages} activeImageIndex={activeSlide} />

      <HomeNavbar />

      <div className="relative z-10 mx-auto grid min-h-[760px] max-w-[1168px] items-center gap-8 px-5 pb-24 pt-40 sm:min-h-[820px] sm:px-8 sm:pt-44 lg:min-h-[850px] lg:grid-cols-[1fr_330px] lg:px-10 lg:pb-28 xl:px-0">
        <div className="max-w-[610px] motion-safe:animate-[journeeFadeUp_.9s_ease-out_both]">
          <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.44em] text-[#d9a947]">
            {activeHeroSlide.eyebrow}
          </p>
          <h1
            aria-label="Until it becomes a place."
            className="heading-display mt-6 text-balance text-[clamp(4rem,15vw,7.4rem)] text-[#fffaf0]"
          >
            <span aria-hidden="true">
              Until it
              <span className="block">becomes</span>
              <span className="block heading-emphasis text-[#d9a947]">a place.</span>
            </span>
          </h1>
          <p className="mt-7 max-w-[470px] font-sans text-base leading-8 text-white/78 sm:text-lg">
            Journee helps you discover meaningful travel experiences, hidden gems and authentic
            places around the world.
          </p>
          <div className="mt-9 flex flex-col gap-4 min-[390px]:flex-row min-[390px]:items-center">
            <Link
              href={routes.explore}
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#d9a947] px-7 font-sans text-sm font-bold text-[#161006] shadow-[0_18px_45px_rgba(217,169,71,.28)] transition hover:bg-[#efc66d]"
            >
              Start Exploring
              <span className="ml-8 text-xl leading-none">→</span>
            </Link>
            <Link
              href="#recommended"
              className="inline-flex h-14 items-center gap-3 font-sans text-sm font-semibold text-white"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/28 bg-black/20 backdrop-blur-md">
                <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
              </span>
              Watch Journee
            </Link>
          </div>
        </div>

        <aside className="hidden rounded-[1.35rem] border border-white/18 bg-[#121713]/64 p-8 shadow-2xl shadow-black/35 backdrop-blur-xl lg:block">
          <p className="font-display text-5xl leading-none text-[#d9a947]">“</p>
          <p className="mt-4 font-display text-xl leading-8 text-white/86">
            {activeHeroSlide.quote}
          </p>
          <div className="mt-7 border-t border-white/14 pt-5 font-sans text-sm text-white/70">
            —&nbsp; {activeHeroSlide.byline}
          </div>
          <p className="mt-6 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white/54">
            Scene {activeSlide + 1} of {totalSlides}
          </p>
        </aside>
      </div>
    </section>
  );
}

function DateSummary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-black/24 px-3 py-3 shadow-[0_0_0_1px_rgba(255,255,255,.06)_inset]">
      <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/38">
        {label}
      </p>
      <p className="mt-1 font-sans text-sm font-semibold text-white/86">{value}</p>
    </div>
  );
}

function HeroSearchBar() {
  const [destination, setDestination] = useState("");
  const [travelers, setTravelers] = useState("solo");
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateMode, setDateMode] = useState<DatePickerMode>("exact");
  const [calendarMonth, setCalendarMonth] = useState(() => startOfMonth(new Date()));
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [durationStartDate, setDurationStartDate] = useState<Date | null>(null);
  const [durationDays, setDurationDays] = useState(7);
  const [flexibleTiming, setFlexibleTiming] = useState("One week");
  const [dateSummary, setDateSummary] = useState("");
  const durationEndDate = useMemo(
    () => (durationStartDate ? addDays(durationStartDate, Math.max(1, durationDays) - 1) : null),
    [durationDays, durationStartDate],
  );

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!datePickerRef.current?.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsDatePickerOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function selectCalendarDay(day: Date) {
    if (dateMode === "duration") {
      setDurationStartDate(day);
      return;
    }

    if (!startDate || (startDate && endDate) || isBeforeDay(day, startDate)) {
      setStartDate(day);
      setEndDate(null);
      return;
    }

    if (isSameDay(day, startDate)) {
      setStartDate(day);
      setEndDate(null);
      return;
    }

    setEndDate(day);
  }

  function applyDateSelection() {
    if (dateMode === "exact" && startDate && endDate) {
      setDateSummary(`${formatTravelDate(startDate)} - ${formatTravelDate(endDate)}`);
      setIsDatePickerOpen(false);
      return;
    }

    if (dateMode === "exact" && startDate) {
      setDateSummary(formatTravelDate(startDate));
      setIsDatePickerOpen(false);
      return;
    }

    if (dateMode === "duration" && durationStartDate) {
      setDateSummary(`${formatTravelDate(durationStartDate)} for ${Math.max(1, durationDays)} days`);
      setIsDatePickerOpen(false);
      return;
    }

    if (dateMode === "flexible") {
      setDateSummary(`Flexible: ${flexibleTiming}`);
      setIsDatePickerOpen(false);
    }
  }

  function clearDateSelection() {
    setStartDate(null);
    setEndDate(null);
    setDurationStartDate(null);
    setDurationDays(7);
    setFlexibleTiming("One week");
    setDateSummary("");
    setIsDatePickerOpen(false);
  }

  return (
    <div className="relative z-20 mx-auto -mt-16 max-w-[968px] px-5 sm:px-8 lg:px-10 xl:px-0">
      <form
        action="/search"
        method="get"
        className="grid gap-4 rounded-[1.8rem] border border-white/20 bg-[#0b1110]/82 p-5 shadow-[0_28px_80px_rgba(0,0,0,.48)] backdrop-blur-2xl md:grid-cols-[1fr_1fr_1fr_auto] md:items-center md:rounded-full md:p-5"
      >
        <label className="min-w-0 rounded-2xl bg-white/[0.035] px-5 py-4 text-left transition focus-within:bg-white/[0.06] md:rounded-none md:bg-transparent md:px-8 md:py-1">
          <span className="block font-sans text-xs font-semibold text-white/88">Where to?</span>
          <input
            name="q"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder="Anywhere"
            className="mt-1 block w-full min-w-0 bg-transparent font-sans text-base text-white outline-none placeholder:text-white/62"
          />
        </label>

        <div
          ref={datePickerRef}
          className="relative min-w-0 rounded-2xl bg-white/[0.035] px-5 py-4 text-left transition focus-within:bg-white/[0.06] md:rounded-none md:border-l md:border-white/12 md:bg-transparent md:px-8 md:py-1"
        >
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={isDatePickerOpen}
            onClick={() => setIsDatePickerOpen((open) => !open)}
            className="block w-full min-w-0 text-left outline-none"
          >
            <span className="block font-sans text-xs font-semibold text-white/88">Anytime</span>
            <span className="mt-1 block truncate font-sans text-base text-white/82">
              {dateSummary || "Add dates"}
            </span>
          </button>
          <input type="hidden" name="date" value={dateSummary} />

          {isDatePickerOpen ? (
            <div
              role="dialog"
              aria-label="Choose travel dates"
              className="absolute left-1/2 top-[calc(100%+1.35rem)] z-50 w-[min(92vw,42rem)] -translate-x-1/2 rounded-[1.5rem] bg-[#07100f]/95 p-5 shadow-[0_34px_100px_rgba(0,0,0,.58),0_0_0_1px_rgba(255,255,255,.07)_inset] backdrop-blur-2xl sm:p-6 md:left-0 md:-translate-x-1/3 lg:left-1/2 lg:-translate-x-1/2"
            >
              <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_20%_0%,rgba(217,169,71,.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,.045),transparent_48%)]" />
              <div className="relative">
                <div className="grid gap-2.5 rounded-full bg-white/[0.045] p-1.5 sm:grid-cols-3">
                  {[
                    ["exact", "Exact Dates"],
                    ["duration", "Start + Days"],
                    ["flexible", "Flexible"],
                  ].map(([mode, label]) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setDateMode(mode as DatePickerMode)}
                      className={`rounded-full px-5 py-3 font-sans text-sm font-semibold transition ${
                        dateMode === mode
                          ? "bg-[#d9a947] text-[#171006] shadow-[0_10px_30px_rgba(217,169,71,.18)]"
                          : "text-white/66 hover:bg-white/[0.055] hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {dateMode !== "flexible" ? (
                  <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_.85fr]">
                    <div className="rounded-[1.2rem] bg-black/18 p-5 shadow-[0_0_0_1px_rgba(255,255,255,.055)_inset]">
                      <div className="mb-5 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setCalendarMonth((month) => addMonths(month, -1))}
                          className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.055] text-white/76 transition hover:bg-white/[0.09] hover:text-white"
                          aria-label="Previous month"
                        >
                          ‹
                        </button>
                        <p className="font-sans text-sm font-bold text-white">
                          {monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                        </p>
                        <button
                          type="button"
                          onClick={() => setCalendarMonth((month) => addMonths(month, 1))}
                          className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.055] text-white/76 transition hover:bg-white/[0.09] hover:text-white"
                          aria-label="Next month"
                        >
                          ›
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/38">
                        {weekdayLabels.map((label, index) => (
                          <span key={`${label}-${index}`}>{label}</span>
                        ))}
                      </div>
                      <div className="mt-3 grid grid-cols-7 gap-1.5">
                        {getCalendarDays(calendarMonth).map((day) => {
                          const isOutsideMonth = day.getMonth() !== calendarMonth.getMonth();
                          const selected =
                            dateMode === "exact"
                              ? isSameDay(day, startDate) || isSameDay(day, endDate)
                              : isSameDay(day, durationStartDate);
                          const inRange =
                            dateMode === "exact"
                              ? isBetweenDays(day, startDate, endDate)
                              : Boolean(durationStartDate && durationEndDate && isBetweenDays(day, durationStartDate, durationEndDate));

                          return (
                            <button
                              key={day.toISOString()}
                              type="button"
                              onClick={() => selectCalendarDay(day)}
                              className={`h-11 rounded-full font-sans text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a947]/70 ${
                                selected
                                  ? "bg-[#d9a947] font-bold text-[#171006]"
                                  : inRange
                                    ? "bg-[#d9a947]/18 text-white"
                                    : isOutsideMonth
                                      ? "text-white/22 hover:bg-white/[0.04]"
                                      : "text-white/72 hover:bg-white/[0.07] hover:text-white"
                              }`}
                            >
                              {day.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="rounded-[1.2rem] bg-white/[0.045] p-5 shadow-[0_0_0_1px_rgba(255,255,255,.055)_inset]">
                      {dateMode === "exact" ? (
                        <>
                          <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#d9a947]">
                            Exact Dates
                          </p>
                          <div className="mt-5 grid gap-4">
                            <DateSummary label="Start Date" value={startDate ? formatTravelDate(startDate) : "Select a date"} />
                            <DateSummary label="End Date" value={endDate ? formatTravelDate(endDate) : "Select a date"} />
                          </div>
                          <p className="mt-5 font-sans text-sm leading-6 text-white/55">
                            Choose a start date, then choose the final night of the trip.
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#d9a947]">
                            Start Date + Days
                          </p>
                          <div className="mt-5 grid gap-4">
                            <DateSummary label="Start Date" value={durationStartDate ? formatTravelDate(durationStartDate) : "Select a date"} />
                            <label className="grid gap-2 font-sans text-sm font-semibold text-white/70">
                              Number of days
                              <input
                                type="number"
                                min={1}
                                max={90}
                                value={durationDays}
                                onChange={(event) => setDurationDays(Math.max(1, Number(event.currentTarget.value) || 1))}
                                className="h-12 rounded-xl bg-black/24 px-4 text-white outline-none shadow-[0_0_0_1px_rgba(255,255,255,.08)_inset] focus:shadow-[0_0_0_1px_rgba(217,169,71,.7)_inset]"
                              />
                            </label>
                            <DateSummary label="Calculated End" value={durationEndDate ? formatTravelDate(durationEndDate) : "Waiting for start"} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 rounded-[1.2rem] bg-black/18 p-5 shadow-[0_0_0_1px_rgba(255,255,255,.055)_inset]">
                    <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#d9a947]">
                      Flexible Timing
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {flexibleOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFlexibleTiming(option)}
                          className={`rounded-2xl px-5 py-3.5 text-left font-sans text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a947]/70 ${
                            flexibleTiming === option
                              ? "bg-[#d9a947] text-[#171006]"
                              : "bg-white/[0.045] text-white/72 hover:bg-white/[0.075] hover:text-white"
                          }`}
                        >
                          {formatDisplayTitle(option)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-4 border-t border-white/[0.075] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-sans text-sm text-white/55">
                    {dateMode === "flexible"
                      ? `Flexible: ${flexibleTiming}`
                      : dateMode === "duration" && durationStartDate
                        ? `${formatTravelDate(durationStartDate)} for ${Math.max(1, durationDays)} days`
                        : startDate && endDate
                          ? `${formatTravelDate(startDate)} - ${formatTravelDate(endDate)}`
                          : "Choose your timing."}
                  </p>
                  <div className="flex gap-3.5">
                    <button
                      type="button"
                      onClick={clearDateSelection}
                      className="rounded-full bg-white/[0.055] px-6 py-3 font-sans text-sm font-semibold text-white/72 transition hover:bg-white/[0.09] hover:text-white"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={applyDateSelection}
                      className="rounded-full bg-[#d9a947] px-6 py-3 font-sans text-sm font-bold text-[#171006] shadow-[0_12px_34px_rgba(217,169,71,.18)] transition hover:bg-[#efc66d]"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <label className="min-w-0 rounded-2xl bg-white/[0.035] px-5 py-4 text-left transition focus-within:bg-white/[0.06] md:rounded-none md:border-l md:border-white/12 md:bg-transparent md:px-8 md:py-1">
          <span className="block font-sans text-xs font-semibold text-white/88">Travelers</span>
          <select
            name="travelers"
            value={travelers}
            onChange={(event) => setTravelers(event.target.value)}
            className="mt-1 block w-full min-w-0 appearance-none bg-transparent font-sans text-base text-white/82 outline-none"
          >
            <option value="solo">Solo traveler</option>
            <option value="couple">2 travelers</option>
            <option value="family">Family</option>
            <option value="group">Group</option>
          </select>
        </label>

        <button
          type="submit"
          aria-label="Search journeys"
          className="grid h-14 w-full place-items-center rounded-full bg-[#d9a947] text-[#161006] shadow-[0_14px_36px_rgba(217,169,71,.28)] transition hover:bg-[#efc66d] md:w-14"
        >
          <Search className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-6">
      <h2 className="heading-cinematic text-[clamp(1.65rem,5vw,2.05rem)] text-[#fffaf0]">
        {title}
      </h2>
      <Link
        href={routes.explore}
        className="shrink-0 font-sans text-sm font-medium text-white/86 transition hover:text-[#d9a947]"
      >
        View all <span className="ml-3 text-lg">›</span>
      </Link>
    </div>
  );
}

function JourneyCategoryRail({ items }: { items: typeof categories }) {
  return (
    <section id="journeys" className="mx-auto mt-10 max-w-[1168px] px-5 sm:px-8 lg:px-10 xl:px-0">
      <SectionHeading title="Find your kind of journey" />
      <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
        {items.map((category) => (
          <Link
            key={category.title}
            href={routes.explore}
            className="group relative h-[202px] min-w-[184px] snap-start overflow-hidden rounded-[1.1rem] border border-white/12 bg-white/[0.04] shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-[#d9a947]/35 lg:min-w-0"
          >
            <img
              src={category.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-82 transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/44 to-black/12" />
            <span className="absolute inset-x-0 bottom-0 h-[68%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,.88),rgba(0,0,0,.44)_52%,transparent_78%)]" />
            <span className="relative flex h-full flex-col justify-end p-5">
              <span className="mb-4 inline-flex w-fit rounded-full border border-[#d9a947]/45 bg-black/28 px-3 py-1 font-sans text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#d9a947]">
                {category.count}
              </span>
              <strong className="font-display text-lg font-medium leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,.9)]">
                {category.title}
              </strong>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RecommendedDestinations({ items }: { items: typeof destinations }) {
  return (
    <section id="recommended" className="mx-auto mt-12 max-w-[1168px] px-5 sm:px-8 lg:px-10 xl:px-0">
      <SectionHeading title="Recommended for you" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((destination) => (
          <Link
            key={destination.title}
            href={destination.href}
            className="group relative min-h-[405px] overflow-hidden rounded-[1.45rem] bg-white/[0.035] shadow-[0_28px_80px_rgba(0,0,0,.34),0_1px_0_rgba(255,255,255,.045)_inset] transition-[transform,box-shadow,filter] duration-700 ease-[cubic-bezier(.19,1,.22,1)] hover:-translate-y-1.5 hover:shadow-[0_34px_110px_rgba(0,0,0,.48),0_0_48px_rgba(217,169,71,.085),0_1px_0_rgba(255,255,255,.08)_inset] sm:min-h-[440px]"
          >
            <img
              src={destination.image}
              alt={destination.title}
              className="absolute inset-0 h-full w-full object-cover brightness-[0.86] saturate-[0.94] transition-[transform,filter] duration-[1200ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.03] group-hover:brightness-[0.92] group-hover:saturate-100"
            />
            <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.9)_0%,rgba(0,0,0,.76)_22%,rgba(0,0,0,.5)_43%,rgba(0,0,0,.2)_68%,rgba(0,0,0,.04)_100%)] transition-opacity duration-700 group-hover:opacity-95" />
            <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_86%,rgba(0,0,0,.82)_0%,rgba(0,0,0,.5)_34%,rgba(0,0,0,.16)_58%,transparent_82%),radial-gradient(ellipse_at_50%_105%,rgba(0,0,0,.74)_0%,rgba(0,0,0,.3)_42%,transparent_76%)] transition-opacity duration-700 group-hover:opacity-90" />
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,.12),transparent_30%),radial-gradient(circle_at_74%_84%,rgba(217,169,71,.1),transparent_36%),radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,.28)_100%)] opacity-48 transition-opacity duration-700 group-hover:opacity-68" />
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,.045),inset_0_1px_24px_rgba(255,255,255,.035),inset_0_-36px_90px_rgba(0,0,0,.38)] transition-shadow duration-700 group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,.075),inset_0_1px_28px_rgba(255,255,255,.055),inset_0_-38px_96px_rgba(0,0,0,.42)]" />
            <span className="relative flex h-full flex-col justify-end p-5 sm:p-6">
              <span className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                {destination.country}
              </span>
              <strong className="mt-3 max-w-full text-wrap font-display text-[clamp(1.55rem,5vw,1.95rem)] font-medium leading-[1.06] text-[#fffaf0] drop-shadow-[0_4px_18px_rgba(0,0,0,1)]">
                {destination.title}
              </strong>
              <span className="mt-5 flex items-center gap-2 font-sans text-sm font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                <span className="text-[#d9a947]">★</span>
                {destination.rating} <span className="text-white/82">({destination.reviews})</span>
              </span>
              <span className="mt-4 max-w-[16rem] font-sans text-sm font-medium leading-6 text-white/92 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                {destination.copy}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeatureStrip() {
  return (
    <section className="mx-auto mt-14 max-w-[1168px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 xl:px-0">
      <div className="grid overflow-hidden rounded-[1.25rem] border border-white/13 bg-white/[0.045] shadow-2xl shadow-black/28 backdrop-blur-xl md:grid-cols-3">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className={`p-7 sm:p-9 ${index > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""}`}
          >
            <div className="flex gap-6">
              <div>
                <h3 className="font-display text-[1.45rem] font-medium leading-tight text-[#fffaf0]">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-[18rem] font-sans text-sm leading-6 text-white/62">{feature.copy}</p>
                <Link
                  href={routes.explore}
                  className="mt-5 inline-flex items-center font-sans text-sm font-semibold text-[#d9a947] transition hover:text-[#efc66d]"
                >
                  Explore <span className="ml-3">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function JourneeWebExperience() {
  const homeImages = buildHomeImageAssignments();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020908] font-sans text-white">
      <style>
        {`
          .journee-hero-image {
            filter: saturate(1.02) contrast(1.08) brightness(0.82);
            transform-origin: 52% 45%;
            animation: journeeHeroDrift 34s ease-in-out infinite alternate;
          }

          .journee-aurora-field {
            mask-image: radial-gradient(ellipse at 50% 46%, black 0 54%, rgba(0,0,0,.86) 66%, transparent 92%);
            -webkit-mask-image: radial-gradient(ellipse at 50% 46%, black 0 54%, rgba(0,0,0,.86) 66%, transparent 92%);
            animation: journeeAuroraField 38s ease-in-out infinite alternate;
          }

          .journee-aurora-blob {
            position: absolute;
            display: block;
            border-radius: 9999px;
            opacity: 0.8;
            transform: translate3d(0, 0, 0);
            mask-image: radial-gradient(circle, black 0 24%, rgba(0,0,0,.74) 45%, transparent 76%);
            -webkit-mask-image: radial-gradient(circle, black 0 24%, rgba(0,0,0,.74) 45%, transparent 76%);
          }

          .journee-aurora-blob-a {
            left: -14%;
            top: -8%;
            height: 48rem;
            width: 58rem;
            background: radial-gradient(circle at 48% 48%, rgba(216,169,71,.48), rgba(216,169,71,.18) 36%, transparent 72%);
            animation: journeeAuroraA 31s ease-in-out infinite alternate;
          }

          .journee-aurora-blob-b {
            right: -18%;
            top: 8%;
            height: 54rem;
            width: 62rem;
            background: radial-gradient(circle at 48% 46%, rgba(32,157,167,.46), rgba(48,111,130,.18) 42%, transparent 78%);
            animation: journeeAuroraB 37s ease-in-out infinite alternate;
          }

          .journee-aurora-blob-c {
            left: 18%;
            bottom: -24%;
            height: 45rem;
            width: 66rem;
            background: radial-gradient(circle at 48% 52%, rgba(141,20,36,.36), rgba(217,169,71,.12) 44%, transparent 78%);
            animation: journeeAuroraC 42s ease-in-out infinite alternate;
          }

          .journee-aurora-blob-d {
            right: 12%;
            bottom: -18%;
            height: 40rem;
            width: 52rem;
            background: radial-gradient(circle at 50% 50%, rgba(236,207,151,.3), rgba(98,156,150,.14) 42%, transparent 80%);
            animation: journeeAuroraD 29s ease-in-out infinite alternate;
          }

          .journee-hero-haze {
            background:
              radial-gradient(ellipse at 24% 52%, rgba(255,246,223,.13), transparent 38%),
              radial-gradient(ellipse at 70% 34%, rgba(180,220,220,.08), transparent 42%),
              linear-gradient(180deg, rgba(2,9,8,.24), rgba(2,9,8,.06) 36%, rgba(2,9,8,.62) 100%);
            backdrop-filter: blur(1.5px);
            mask-image: linear-gradient(180deg, transparent 0%, black 13%, black 88%, transparent 100%);
            -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 13%, black 88%, transparent 100%);
            opacity: 0.82;
            animation: journeeHazeFloat 26s ease-in-out infinite alternate;
          }

          .journee-hero-grain {
            background-image:
              radial-gradient(circle at 20% 30%, rgba(255,255,255,.38) 0 0.8px, transparent 1px),
              radial-gradient(circle at 72% 64%, rgba(255,255,255,.24) 0 0.7px, transparent 1px),
              radial-gradient(circle at 42% 82%, rgba(0,0,0,.32) 0 0.9px, transparent 1.1px),
              repeating-linear-gradient(115deg, rgba(255,255,255,.035) 0 1px, transparent 1px 4px);
            background-size: 84px 84px, 116px 116px, 96px 96px, 220px 220px;
          }

          .journee-hero-vignette {
            background:
              radial-gradient(ellipse at 46% 44%, transparent 0 42%, rgba(2,9,8,.34) 72%, rgba(2,9,8,.88) 100%),
              linear-gradient(90deg, rgba(2,9,8,.84), rgba(2,9,8,.38) 24%, rgba(2,9,8,.08) 56%, rgba(2,9,8,.52)),
              linear-gradient(180deg, rgba(2,9,8,.7), transparent 24%, rgba(2,9,8,.88) 100%);
          }

          .journee-hero-text-glow {
            background: radial-gradient(ellipse at 38% 45%, rgba(2,9,8,.78), rgba(2,9,8,.46) 42%, transparent 74%);
            opacity: 0.94;
            mask-image: radial-gradient(ellipse at 38% 45%, black 0 38%, rgba(0,0,0,.82) 54%, transparent 78%);
            -webkit-mask-image: radial-gradient(ellipse at 38% 45%, black 0 38%, rgba(0,0,0,.82) 54%, transparent 78%);
          }

          @keyframes journeeHeroDrift {
            from { transform: scale(1.08) translate3d(0, 0, 0); }
            to { transform: scale(1.14) translate3d(-1.5%, -1%, 0); }
          }
          @keyframes journeeAuroraField {
            from { transform: translate3d(-1.5%, .6%, 0) rotate(-1deg) scale(1); }
            to { transform: translate3d(1.6%, -1.1%, 0) rotate(1.4deg) scale(1.05); }
          }
          @keyframes journeeAuroraA {
            from { transform: translate3d(-2%, 1%, 0) scale(1); }
            to { transform: translate3d(9%, 4%, 0) scale(1.14); }
          }
          @keyframes journeeAuroraB {
            from { transform: translate3d(3%, -2%, 0) scale(1.05); }
            to { transform: translate3d(-8%, 6%, 0) scale(1.16); }
          }
          @keyframes journeeAuroraC {
            from { transform: translate3d(-4%, 3%, 0) scale(1.02); }
            to { transform: translate3d(6%, -7%, 0) scale(1.12); }
          }
          @keyframes journeeAuroraD {
            from { transform: translate3d(4%, 5%, 0) scale(1); }
            to { transform: translate3d(-7%, -4%, 0) scale(1.1); }
          }
          @keyframes journeeHazeFloat {
            from { transform: translate3d(-1%, 0, 0) scale(1.02); }
            to { transform: translate3d(1.2%, -1%, 0) scale(1.06); }
          }
          @keyframes journeeFadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (prefers-reduced-motion: reduce) {
            .journee-hero-image,
            .journee-aurora-field,
            .journee-aurora-blob,
            .journee-hero-haze {
              animation: none;
            }
          }
        `}
      </style>
      <HomeHero heroSlides={homeImages.heroSlides} />
      <HeroSearchBar />
      <JourneyCategoryRail items={homeImages.categories} />
      <RecommendedDestinations items={homeImages.destinations} />
      <FeatureStrip />
    </main>
  );
}
