import { useState } from "react";
import {
  Leaf, MapPin, Search, ChevronRight, ChevronLeft,
  Heart, Home, Compass, User, Bell, Filter, X, Check,
  Calendar, Users, ArrowRight, Package, Recycle,
  ShoppingBag, Droplets, Globe, Award, Plus,
  Instagram, Facebook, Twitter, Phone, Clock,
  TrendingUp, Shield, Sparkles, TreePine,
  MessageSquare, Languages, Settings, BookOpen, Info
} from "lucide-react";

// ─── i18n ─────────────────────────────────────────────────────────────────────

const T = {
  en: {
    discover: "Discover", explore: "Explore", map: "Map", community: "Community",
    profile: "Profile", home: "Home", filter: "Filter", search: "Search businesses…",
    verified: "GreenLoop Verified", verifiedCriteria: "Verified Criteria",
    sustainabilityInfo: "Sustainability Info", firstVisitOffer: "Your First Visit Offer",
    showAt: "Show this at", freeHotDrink: "One free hot drink", freeHotDrinkSub: "on your first visit",
    scanCheckout: "Scan at the counter to redeem your welcome gift",
    validUntil: "Valid until 31 Aug 2025 · Single use",
    reviews: "What visitors say", writeReview: "Share your experience…",
    ownerWord: "Owner's words", openNow: "Open now",
    savedPlaces: "Saved Places", language: "Language", settings: "Settings",
    getDirections: "Get Directions", share: "Share", seeAll: "See all",
    featuredPartners: "Featured Partners", nearYou: "Near You",
    goodMorning: "Good morning,", welcomeBack: "Welcome to GreenLoop",
    welcomeSub: "Discover Bayreuth's most sustainable shops, cafés, and services.",
    aboutUs: "About Us", howItWorks: "How It Works",
    signIn: "Sign in", getApp: "Get the App",
    showResults: "Show Results", resetAll: "Reset all", distance: "Distance",
    category: "Category", sustainability: "Sustainability", rating: "Rating",
    hostEvent: "Host an event", hostEventSub: "Share your sustainability knowledge",
    memberSince: "Member since 2024", greenCitizen: "🌿 Green Citizen",
    visits: "Visits", saved: "Saved", badgesEarned: "Exploration Badges",
    viewAll: "View all", contact: "Contact",
  },
  de: {
    discover: "Entdecken", explore: "Erkunden", map: "Karte", community: "Community",
    profile: "Profil", home: "Start", filter: "Filter", search: "Geschäfte suchen…",
    verified: "GreenLoop Geprüft", verifiedCriteria: "Geprüfte Kriterien",
    sustainabilityInfo: "Nachhaltigkeitsinfos", firstVisitOffer: "Dein Erstbesuchs-Angebot",
    showAt: "Zeig das bei", freeHotDrink: "Ein heißes Getränk gratis", freeHotDrinkSub: "bei deinem ersten Besuch",
    scanCheckout: "Zeig den Code an der Theke und erhalte dein Willkommensgeschenk",
    validUntil: "Gültig bis 31. Aug 2025 · Einmalig einlösbar",
    reviews: "Was Besucher sagen", writeReview: "Teile deine Erfahrung…",
    ownerWord: "Aus dem Mund der Inhaberin", openNow: "Jetzt geöffnet",
    savedPlaces: "Gespeicherte Orte", language: "Sprache", settings: "Einstellungen",
    getDirections: "Route", share: "Teilen", seeAll: "Alle sehen",
    featuredPartners: "Unsere Partner", nearYou: "In deiner Nähe",
    goodMorning: "Guten Morgen,", welcomeBack: "Willkommen bei GreenLoop",
    welcomeSub: "Entdecke Bayreuths nachhaltigste Läden, Cafés und Dienstleistungen.",
    aboutUs: "Über uns", howItWorks: "So funktioniert's",
    signIn: "Anmelden", getApp: "App laden",
    showResults: "Ergebnisse anzeigen", resetAll: "Alle zurücksetzen", distance: "Entfernung",
    category: "Kategorie", sustainability: "Nachhaltigkeit", rating: "Bewertung",
    hostEvent: "Veranstaltung anbieten", hostEventSub: "Teile dein Nachhaltigkeitswissen",
    memberSince: "Mitglied seit 2024", greenCitizen: "🌿 Grüner Bürger",
    visits: "Besuche", saved: "Gespeichert", badgesEarned: "Entdeckungs-Badges",
    viewAll: "Alle ansehen", contact: "Kontakt",
  },
};
type Lang = "en" | "de";

// ─── Shared Data ─────────────────────────────────────────────────────────────

const BADGES = [
  { label: "Organic",     labelDe: "Bio",          icon: Leaf,        color: "#2D7A45", bg: "#E8F5EE" },
  { label: "Regional",    labelDe: "Regional",      icon: MapPin,      color: "#1A6B3E", bg: "#E0F0E8" },
  { label: "Fair Trade",  labelDe: "Fair Trade",    icon: Globe,       color: "#5C6B2E", bg: "#EEF2DE" },
  { label: "Vegan",       labelDe: "Vegan",         icon: Sparkles,    color: "#3A8C55", bg: "#EAF7EF" },
  { label: "Refill",      labelDe: "Nachfüllbar",   icon: Droplets,    color: "#1E7A6A", bg: "#DEF2EF" },
  { label: "Upcycled",    labelDe: "Upcycling",     icon: Recycle,     color: "#7A5C1E", bg: "#F7EFDE" },
  { label: "Zero Waste",  labelDe: "Zero Waste",    icon: Package,     color: "#2A5C8A", bg: "#DEE9F5" },
  { label: "Second-hand", labelDe: "Secondhand",    icon: ShoppingBag, color: "#8A3A5C", bg: "#F5DEE9" },
];

// 10 real-style Bayreuth partner businesses
const BUSINESSES = [
  {
    id: 1,
    name: "Café Herzensfreude",
    nameDe: "Café Herzensfreude",
    category: "Café & Bakery",
    categoryDe: "Café & Bäckerei",
    address: "Friedrichstraße 15, Bayreuth",
    phone: "+49 921 123 456",
    email: "hallo@herzensfreude-bayreuth.de",
    distance: "0.2 km",
    badges: ["Organic", "Vegan", "Fair Trade", "Regional"],
    verified: true,
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&h=400&fit=crop&auto=format",
    description: "A cosy, plant-based café in the heart of Bayreuth. Every dish is made from seasonal, regional ingredients — most within 80 km.",
    descriptionDe: "Ein gemütliches, pflanzenbasiertes Café im Herzen Bayreuths. Jedes Gericht wird aus saisonalen, regionalen Zutaten zubereitet.",
    ownerQuote: "\"We believe a cup of coffee should nourish both you and the planet. That is why we source everything with intention.\"",
    ownerQuoteDe: "\"Wir glauben, dass eine Tasse Kaffee sowohl dich als auch den Planeten nähren sollte.\"",
    ownerName: "Lisa Hoffmann, Owner",
    ownerNameDe: "Lisa Hoffmann, Inhaberin",
    hours: "Mo–Sa 8:00–18:00, So 9:00–15:00",
    offer: "One free hot drink on your first visit",
    offerDe: "Ein heißes Getränk gratis bei deinem ersten Besuch",
    reviews: [
      { author: "Marie K.", text: "The oat latte is wonderful, and the team always explains where the ingredients come from.", textDe: "Der Haferlatte ist wunderbar, und das Team erklärt immer, woher die Zutaten kommen." },
      { author: "Jonas B.", text: "Warm atmosphere, seasonal food, and a place that feels genuinely connected to Bayreuth.", textDe: "Warme Atmosphäre, saisonales Essen und ein Ort, der sich wirklich mit Bayreuth verbunden fühlt." },
      { author: "Lena S.", text: "GreenLoop brought me here. I stayed for the walnut cake and the friendly community table.", textDe: "GreenLoop hat mich hergebracht. Geblieben bin ich wegen des Walnusskuchens und des freundlichen Gemeinschaftstischs." },
    ],
    mapX: 162, mapY: 268,
  },
  {
    id: 2,
    name: "Weltladen Bayreuth",
    nameDe: "Weltladen Bayreuth",
    category: "Fair Trade Shop",
    categoryDe: "Fairer Handel",
    address: "Maxstraße 33, Bayreuth",
    phone: "+49 921 234 567",
    email: "info@weltladen-bayreuth.de",
    distance: "0.4 km",
    badges: ["Fair Trade", "Organic", "Regional"],
    verified: true,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop&auto=format",
    description: "Bayreuth's original fair trade shop, run by volunteers since 1979. Coffee, chocolate, textiles and handicrafts from over 30 countries.",
    descriptionDe: "Bayreuths ursprünglicher Weltladen, seit 1979 von Ehrenamtlichen geführt.",
    ownerQuote: "\"Fair trade is not a label — it is a relationship between people across continents built on dignity.\"",
    ownerQuoteDe: "\"Fairer Handel ist kein Label — es ist eine Beziehung zwischen Menschen auf verschiedenen Kontinenten.\"",
    ownerName: "Helga Müller, Ehrenamtliche Leiterin",
    hours: "Mo–Fr 9:30–18:00, Sa 9:30–14:00",
    offer: "Free tasting session on your first visit",
    offerDe: "Kostenlose Verkostung bei deinem ersten Besuch",
    reviews: [
      { author: "Thomas W.", text: "The coffee here is extraordinary — and knowing the full supply chain makes it taste all the better." },
      { author: "Anna P.", text: "Run with such care and knowledge. Every volunteer can tell you where every product comes from." },
    ],
    mapX: 96, mapY: 298,
  },
  {
    id: 3,
    name: "Tauschwerk Bayreuth",
    nameDe: "Tauschwerk Bayreuth",
    category: "Second-hand & Repair",
    categoryDe: "Secondhand & Reparatur",
    address: "Dammallee 5, Bayreuth",
    phone: "+49 921 345 678",
    email: "mitmachen@tauschwerk.de",
    distance: "0.7 km",
    badges: ["Second-hand", "Upcycled", "Zero Waste"],
    verified: true,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=400&fit=crop&auto=format",
    description: "Community swap shop and repair café. Bring what you no longer need, find treasures, and learn to mend with our volunteer repair experts.",
    descriptionDe: "Gemeinschaftlicher Tauschladen und Repair-Café. Bringe, was du nicht mehr brauchst, und finde neue Schätze.",
    ownerQuote: "\"The best waste is the waste that never happens. Here we help things live a second, third, fourth life.\"",
    ownerQuoteDe: "\"Der beste Abfall ist der, der gar nicht erst entsteht. Hier helfen wir Dingen, ein zweites Leben zu führen.\"",
    ownerName: "Markus Weber, Mitgründer",
    hours: "Di–So 10:00–18:00",
    offer: "Free repair session on your first visit",
    offerDe: "Kostenlose Reparatursitzung bei deinem ersten Besuch",
    reviews: [
      { author: "Clara F.", text: "Brought my broken lamp — fixed in 20 minutes for free. This place is magic." },
      { author: "Stefan H.", text: "Found a near-perfect leather jacket for €8. The community vibe here is unbeatable." },
    ],
    mapX: 248, mapY: 358,
  },
  {
    id: 4,
    name: "Naturkost am Markt",
    nameDe: "Naturkost am Markt",
    category: "Organic Grocery",
    categoryDe: "Bio-Lebensmittel",
    address: "Marktplatz 7, Bayreuth",
    phone: "+49 921 456 789",
    email: "laden@naturkost-bayreuth.de",
    distance: "0.5 km",
    badges: ["Organic", "Regional", "Vegan", "Zero Waste"],
    verified: true,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop&auto=format",
    description: "Certified organic grocery at the historic market square. Loose goods, zero-waste packaging options, and a curated selection of local producers.",
    descriptionDe: "Bio-Lebensmittelgeschäft am historischen Marktplatz. Lose Waren und lokale Erzeuger.",
    ownerQuote: "\"Local food is not a trend — it is common sense. We connect Bayreuth people with Bayreuth soil.\"",
    ownerQuoteDe: "\"Lokale Ernährung ist kein Trend — es ist gesunder Menschenverstand.\"",
    ownerName: "Petra Schmid, Inhaberin",
    hours: "Mo–Sa 8:00–19:00",
    offer: "Free reusable tote bag on your first visit",
    offerDe: "Gratis Stoffbeutel bei deinem ersten Besuch",
    reviews: [
      { author: "Maria L.", text: "The loose grains section is incredible — zero plastic and everything is labelled with the farm." },
      { author: "Bernd K.", text: "Most of our weekly shop comes from here now. Quality and transparency are exceptional." },
    ],
    mapX: 178, mapY: 220,
  },
  {
    id: 5,
    name: "Quellpunkt",
    nameDe: "Quellpunkt",
    category: "Zero Waste Refill",
    categoryDe: "Zero-Waste Nachfüllstation",
    address: "Sophienstraße 31, Bayreuth",
    phone: "+49 921 567 890",
    email: "hallo@quellpunkt-bayreuth.de",
    distance: "1.1 km",
    badges: ["Refill", "Zero Waste", "Vegan"],
    verified: true,
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&h=400&fit=crop&auto=format",
    description: "Bring your own containers and refill cleaning products, shampoos, oils and grains. Plastic-free living made simple and affordable.",
    descriptionDe: "Bring dein eigenes Behältnis und fülle Reinigungsmittel, Shampoos und Öle nach.",
    ownerQuote: "\"Convenience and sustainability are not opposites. We prove it every day.\"",
    ownerQuoteDe: "\"Bequemlichkeit und Nachhaltigkeit sind keine Gegensätze. Das beweisen wir täglich.\"",
    ownerName: "Sandra Klein, Gründerin",
    hours: "Mo–Fr 9:00–18:30, Sa 9:00–14:00",
    offer: "Free starter kit on your first visit",
    offerDe: "Gratis Starter-Kit bei deinem ersten Besuch",
    reviews: [
      { author: "Ines R.", text: "Switched entirely to refill for my household. Saves money and the planet — perfect." },
      { author: "Paul M.", text: "Friendly team, clear labelling and excellent selection. My plastic use has dropped 80%." },
    ],
    mapX: 82, mapY: 388,
  },
  {
    id: 6,
    name: "Bio-Bäckerei Krug",
    nameDe: "Bio-Bäckerei Krug",
    category: "Organic Bakery",
    categoryDe: "Bio-Bäckerei",
    address: "Kulmbacher Str. 12, Bayreuth",
    phone: "+49 921 678 901",
    email: "brot@baeckerei-krug.de",
    distance: "0.8 km",
    badges: ["Organic", "Regional", "Vegan"],
    verified: true,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop&auto=format",
    description: "Fourth-generation artisan bakery, 100% organic. Long-fermented sourdough, ancient grains, and vegan pastries baked fresh every morning.",
    descriptionDe: "Viertgenerationen-Bäckerei, 100% bio. Langsam fermentiertes Sauerteigbrot und veganes Gebäck.",
    ownerQuote: "\"Good bread takes time. And the soil it comes from takes even longer to care for.\"",
    ownerQuoteDe: "\"Gutes Brot braucht Zeit. Und der Boden, aus dem es kommt, braucht noch länger Pflege.\"",
    ownerName: "Andreas Krug, Inhaber",
    hours: "Di–Fr 6:00–13:00, Sa 6:00–12:00",
    offer: "Free bread roll on your first visit",
    offerDe: "Gratis Brötchen bei deinem ersten Besuch",
    reviews: [
      { author: "Klaus N.", text: "This is what bread should taste like. The rye sourdough is life-changing." },
      { author: "Sophie T.", text: "Been coming here for years. Consistent quality and a wonderful family atmosphere." },
    ],
    mapX: 296, mapY: 210,
  },
  {
    id: 7,
    name: "Grüne Mode",
    nameDe: "Grüne Mode",
    category: "Sustainable Fashion",
    categoryDe: "Nachhaltige Mode",
    address: "Opernstraße 22, Bayreuth",
    phone: "+49 921 789 012",
    email: "style@gruenemode-bayreuth.de",
    distance: "0.6 km",
    badges: ["Fair Trade", "Organic", "Second-hand", "Upcycled"],
    verified: true,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop&auto=format",
    description: "Curated slow fashion boutique combining certified new labels with pre-loved finds. Every piece vetted for ethical production.",
    descriptionDe: "Kuratierte Slow-Fashion-Boutique. Jedes Stück auf ethische Produktion geprüft.",
    ownerQuote: "\"Fashion can be beautiful without being harmful. We prove it with every item on our rails.\"",
    ownerQuoteDe: "\"Mode kann schön sein, ohne zu schaden. Das beweisen wir mit jedem Kleidungsstück.\"",
    ownerName: "Julia Berger, Stilberaterin",
    hours: "Mo–Sa 10:00–19:00",
    offer: "10% off your first purchase",
    offerDe: "10% Rabatt auf deinen ersten Kauf",
    reviews: [
      { author: "Lara H.", text: "Found a gorgeous linen dress here — ethical and timeless. Staff are incredibly knowledgeable." },
      { author: "Max S.", text: "Finally a shop where I can trust every label. The pre-loved section is a goldmine." },
    ],
    mapX: 320, mapY: 320,
  },
  {
    id: 8,
    name: "Stadtgärtnerei Bayreuth",
    nameDe: "Stadtgärtnerei Bayreuth",
    category: "Urban Garden & Seeds",
    categoryDe: "Stadtgärtnerei",
    address: "Am Stadtpark 3, Bayreuth",
    phone: "+49 921 890 123",
    email: "info@stadtgaertnerei-bayreuth.de",
    distance: "1.4 km",
    badges: ["Organic", "Regional", "Zero Waste"],
    verified: true,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&auto=format",
    description: "Community urban garden and seed library. Grow your own food, swap seeds with neighbours, and join our seasonal gardening workshops.",
    descriptionDe: "Gemeinschaftsgarten und Samenbibliothek. Baue dein eigenes Essen an.",
    ownerQuote: "\"A city that grows food is a city that knows where it comes from. We want Bayreuth to be that city.\"",
    ownerQuoteDe: "\"Eine Stadt, die Essen anbaut, weiß woher es kommt.\"",
    ownerName: "Felix Braun, Stadtgärtner",
    hours: "Mi–So 10:00–17:00 (Apr–Okt)",
    offer: "Free seed pack on your first visit",
    offerDe: "Gratis Samentüte bei deinem ersten Besuch",
    reviews: [
      { author: "Gabi W.", text: "Joined the seed swap last spring. Now my balcony is full of tomatoes — all from here." },
      { author: "Nina K.", text: "The workshops are excellent. Learnt composting, now I use it every week." },
    ],
    mapX: 60, mapY: 480,
  },
  {
    id: 9,
    name: "Lebensbaum Apotheke",
    nameDe: "Lebensbaum Apotheke",
    category: "Natural Pharmacy",
    categoryDe: "Naturapotheke",
    address: "Bahnhofstraße 18, Bayreuth",
    phone: "+49 921 901 234",
    email: "beratung@lebensbaum-apotheke.de",
    distance: "0.9 km",
    badges: ["Organic", "Vegan", "Fair Trade"],
    verified: true,
    image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=600&h=400&fit=crop&auto=format",
    description: "Independent natural pharmacy stocking certified organic supplements, cosmetics, and remedies. Expert herbalism consultations available.",
    descriptionDe: "Unabhängige Naturapotheke mit zertifizierten Bio-Nahrungsergänzungsmitteln und Kräuterberatungen.",
    ownerQuote: "\"Health and planet health are inseparable. Every product here reflects that belief.\"",
    ownerQuoteDe: "\"Gesundheit und Planetengesundheit sind untrennbar. Jedes Produkt hier spiegelt das wider.\"",
    ownerName: "Dr. Eva Richter, Apothekerin",
    hours: "Mo–Fr 8:30–18:30, Sa 8:30–13:00",
    offer: "Free consultation on your first visit",
    offerDe: "Kostenlose Beratung bei deinem ersten Besuch",
    reviews: [
      { author: "Renate B.", text: "Switched to natural cosmetics with Eva's guidance. My skin has never been better." },
      { author: "Georg H.", text: "Finally a pharmacist who talks about root causes rather than just symptoms." },
    ],
    mapX: 188, mapY: 460,
  },
  {
    id: 10,
    name: "Velo Fahrradwerkstatt",
    nameDe: "Velo Fahrradwerkstatt",
    category: "Bike Repair & Sales",
    categoryDe: "Fahrradwerkstatt",
    address: "Richard-Wagner-Str. 9, Bayreuth",
    phone: "+49 921 012 345",
    email: "rad@velo-bayreuth.de",
    distance: "0.3 km",
    badges: ["Zero Waste", "Upcycled", "Regional"],
    verified: true,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
    description: "Community bike repair workshop and sustainable cycle shop. Repair your own bike with our tools, or buy a lovingly restored second-hand model.",
    descriptionDe: "Fahrradwerkstatt und nachhaltiger Radladen. Repariere dein Rad selbst oder kaufe ein restauriertes Modell.",
    ownerQuote: "\"Every bike repaired is a car not driven. Small choice, big ripple.\"",
    ownerQuoteDe: "\"Jedes reparierte Rad ist ein nicht gefahrenes Auto. Kleine Entscheidung, große Wirkung.\"",
    ownerName: "Tobias Schneider, Radmechaniker",
    hours: "Mo–Fr 9:00–18:00, Sa 10:00–14:00",
    offer: "Free safety check on your first visit",
    offerDe: "Kostenloser Sicherheitscheck bei deinem ersten Besuch",
    reviews: [
      { author: "Chris M.", text: "Fixed my old racer for practically nothing. The do-it-yourself sessions are so empowering." },
      { author: "Vroni A.", text: "Bought a restored Dutch bike here — perfect condition, fair price. Couldn't be happier." },
    ],
    mapX: 322, mapY: 420,
  },
];

const EVENTS = [
  {
    id: 1,
    title: "Repair Café — Bring Your Broken Things",
    titleDe: "Repair-Café — Bring deine kaputten Sachen",
    date: "Sa, 12. Jul", time: "10:00–14:00",
    location: "Tauschwerk, Dammallee 5",
    attendees: 34, category: "Workshop",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "Urban Harvest Walk — Foraging in Bayreuth",
    titleDe: "Stadtspaziergang — Wildkräuter sammeln in Bayreuth",
    date: "So, 13. Jul", time: "09:00–12:00",
    location: "Stadtpark, Haupteingang",
    attendees: 18, category: "Nature",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "Zero Waste Kitchen — Cooking Workshop",
    titleDe: "Zero-Waste-Küche — Kochworkshop",
    date: "Mi, 16. Jul", time: "18:00–20:30",
    location: "Quellpunkt, Sophienstraße 31",
    attendees: 12, category: "Food",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop&auto=format",
  },
];

// ─── Shared UI Atoms ──────────────────────────────────────────────────────────

function Badge({ label, lang = "en", small = false }: { label: string; lang?: Lang; small?: boolean }) {
  const b = BADGES.find((x) => x.label === label) ?? BADGES[0];
  const Icon = b.icon;
  const displayLabel = lang === "de" ? b.labelDe : b.label;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"}`}
      style={{ background: b.bg, color: b.color }}
    >
      <Icon size={small ? 9 : 11} />
      {displayLabel}
    </span>
  );
}

function VerifiedBadge({ small = false, lang = "en" }: { small?: boolean; lang?: Lang }) {
  const label = lang === "de" ? "GreenLoop Geprüft" : "GreenLoop Verified";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"}`}
      style={{ background: "#0F6B3E", color: "#fff" }}
    >
      <Check size={small ? 9 : 10} strokeWidth={3} />
      {label}
    </span>
  );
}

// Reusable QR Code SVG
function QRCode({ size = 176 }: { size?: number }) {
  return (
    <svg viewBox="0 0 210 210" width={size} height={size} xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      <rect width="210" height="210" fill="white" />
      {/* Finder TL */}
      <rect x="10" y="10" width="49" height="49" fill="#111" />
      <rect x="17" y="17" width="35" height="35" fill="white" />
      <rect x="24" y="24" width="21" height="21" fill="#111" />
      {/* Finder TR */}
      <rect x="151" y="10" width="49" height="49" fill="#111" />
      <rect x="158" y="17" width="35" height="35" fill="white" />
      <rect x="165" y="24" width="21" height="21" fill="#111" />
      {/* Finder BL */}
      <rect x="10" y="151" width="49" height="49" fill="#111" />
      <rect x="17" y="158" width="35" height="35" fill="white" />
      <rect x="24" y="165" width="21" height="21" fill="#111" />
      {/* Alignment pattern */}
      <rect x="155" y="155" width="21" height="21" fill="#111" />
      <rect x="158" y="158" width="15" height="15" fill="white" />
      <rect x="162" y="162" width="7" height="7" fill="#111" />
      {/* Timing */}
      {[0,2,4,6,8].map(i => <rect key={`th${i}`} x={66+i*7} y="66" width="7" height="7" fill="#111" />)}
      {[0,2,4,6,8].map(i => <rect key={`tv${i}`} x="66" y={66+i*7} width="7" height="7" fill="#111" />)}
      {/* Data rows */}
      {[73,80,94,108,122,136,143].map(x=><rect key={`r0_${x}`} x={x} y="10" width="7" height="7" fill="#111"/>)}
      {[66,80,87,101,115,136,150].map(x=><rect key={`r1_${x}`} x={x} y="17" width="7" height="7" fill="#111"/>)}
      {[73,94,108,115,129,143,157].map(x=><rect key={`r2_${x}`} x={x} y="24" width="7" height="7" fill="#111"/>)}
      {[66,80,87,101,122,136,150,164].map(x=><rect key={`r3_${x}`} x={x} y="31" width="7" height="7" fill="#111"/>)}
      {[73,94,108,115,129,143].map(x=><rect key={`r4_${x}`} x={x} y="38" width="7" height="7" fill="#111"/>)}
      {[66,80,87,94,101,122,136,157,164].map(x=><rect key={`r5_${x}`} x={x} y="45" width="7" height="7" fill="#111"/>)}
      {[73,108,115,129,143,150].map(x=><rect key={`r6_${x}`} x={x} y="52" width="7" height="7" fill="#111"/>)}
      {[10,17,66,80,94,101,108,122,143,157,171,192,199].map(x=><rect key={`r7_${x}`} x={x} y="59" width="7" height="7" fill="#111"/>)}
      {[66,73,87,115,129,136,150,164,171,185,199].map(x=><rect key={`r8_${x}`} x={x} y="66" width="7" height="7" fill="#111"/>)}
      {[[10,24,38,52,73,87,101,115,129,143,164,178,192],[17,31,45,59,80,94,108,122,136,150,171,185,199],[10,38,52,66,73,87,115,129,157,164,178],[24,31,45,59,80,94,101,108,136,143,150,171,192,199],[10,17,52,66,73,87,115,122,129,157,164,185],[31,38,45,59,94,101,108,136,143,150,178,192,199],[10,24,38,52,66,80,87,122,129,157,171,185],[17,31,45,59,73,94,101,108,136,143,150,164,178,192],[10,38,52,66,80,87,115,129,157,164,185,199]].map((cols,ri)=>cols.map(x=><rect key={`ra${ri}_${x}`} x={x} y={73+ri*7} width="7" height="7" fill="#111"/>))}
      {[[10,17,31,52,66,80,87,108,115,129,143,164,178,199],[24,38,45,59,73,94,101,122,136,150,157,171,185,192],[10,31,52,66,80,87,108,115,143,150,164,178],[17,24,38,45,59,73,94,101,129,136,157,171,185,199],[10,31,52,66,73,80,108,122,143,150,164,192],[17,24,38,45,59,87,94,101,115,129,136,157,178,199],[10,31,45,52,66,80,108,115,143,164,171,185],[17,24,38,59,73,87,94,101,122,129,150,157,178,192,199],[10,31,52,66,80,87,108,115,136,143,164,171,185]].map((cols,ri)=>cols.map(x=><rect key={`rb${ri}_${x}`} x={x} y={136+ri*7} width="7" height="7" fill="#111"/>))}
      {/* GreenLoop brand mark */}
      <rect x="91" y="91" width="28" height="28" rx="4" fill="white"/>
      <rect x="93" y="93" width="24" height="24" rx="3" fill="#0F6B3E"/>
      <text x="105" y="109" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">G</text>
    </svg>
  );
}

// ─── Mobile Layout Primitives ─────────────────────────────────────────────────

function MobileFrame({ children, bg = "#FBF7EF" }: { children: React.ReactNode; bg?: string }) {
  return (
    <div className="relative overflow-hidden flex-shrink-0"
      style={{ width: 393, height: 852, background: bg, borderRadius: 48,
        boxShadow: "0 32px 80px rgba(15,107,62,0.18), 0 2px 8px rgba(0,0,0,0.08)",
        border: "10px solid #1A2E1A", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1" style={{ color: "#1A2E1A" }}>
        <span className="text-xs font-semibold">9:41</span>
        <div className="w-24 h-5 rounded-full bg-[#1A2E1A] mx-auto absolute left-1/2 -translate-x-1/2 top-2" style={{ width: 90, height: 20 }} />
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5 items-end">
            {[3,5,7,9].map((h,i) => <div key={i} className="w-1 rounded-sm bg-[#1A2E1A]" style={{ height: h, opacity: i < 3 ? 1 : 0.3 }} />)}
          </div>
          <div className="w-5 h-3 rounded-sm border border-[#1A2E1A] relative">
            <div className="absolute inset-[2px] right-[3px] rounded-sm bg-[#1A2E1A]" />
            <div className="absolute -right-[3px] top-[3px] h-[6px] w-[2px] rounded-full bg-[#1A2E1A]" />
          </div>
        </div>
      </div>
      <div className="overflow-y-auto" style={{ height: 800 }}>{children}</div>
    </div>
  );
}

function BottomNav({ active, lang = "en" }: { active: string; lang?: Lang }) {
  const t = T[lang];
  const items = [
    { icon: Home,    label: t.home },
    { icon: Compass, label: t.explore },
    { icon: MapPin,  label: t.map },
    { icon: Users,   label: t.community },
    { icon: User,    label: t.profile },
  ];
  return (
    <div className="flex items-center justify-around px-2 pt-3 pb-5"
      style={{ background: "#FFFFFF", borderTop: "1px solid rgba(15,107,62,0.1)", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
      {items.map(({ icon: Icon, label }) => {
        const isActive = active === label;
        return (
          <button key={label} className="flex flex-col items-center gap-1 min-w-[52px]">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isActive ? "bg-[#0F6B3E]" : ""}`}>
              <Icon size={20} color={isActive ? "#fff" : "#6B7B6B"} strokeWidth={isActive ? 2.5 : 1.8} />
            </div>
            <span className={`text-[9px] font-medium ${isActive ? "text-[#0F6B3E]" : "text-[#6B7B6B]"}`}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Mobile Screens ───────────────────────────────────────────────────────────

// Screen 1: Welcome / Onboarding
function ScreenWelcome({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <MobileFrame bg="#0F6B3E">
      <div className="flex flex-col h-full px-6 pt-4">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10" style={{ background: "#fff", transform: "translate(40%,-40%)" }} />
        <div className="absolute bottom-40 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: "#fff", transform: "translate(-40%,40%)" }} />

        {/* Language switcher top-right */}
        <div className="flex justify-end mb-4 relative z-10">
          <div className="flex rounded-xl overflow-hidden" style={{ border: "1.5px solid rgba(255,255,255,0.35)" }}>
            {(["en","de"] as Lang[]).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className="px-3 py-1.5 text-xs font-bold"
                style={lang === l ? { background: "rgba(255,255,255,0.9)", color: "#0F6B3E" } : { color: "rgba(255,255,255,0.7)" }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center text-center mt-8 flex-1">
          <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center mb-6 shadow-xl">
            <div className="flex items-center gap-0.5">
              <TreePine size={28} color="#0F6B3E" strokeWidth={2} />
              <div className="w-2 h-2 rounded-full bg-[#0F6B3E] -mt-3" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Lora', serif", lineHeight: 1.1 }}>GreenLoop</h1>
          <p className="text-sm text-white/70 font-medium tracking-widest uppercase mb-10">Bayreuth</p>

          <div className="w-full rounded-3xl p-6 mb-6" style={{ background: "rgba(255,255,255,0.12)" }}>
            <p className="text-white text-lg font-medium leading-snug mb-2" style={{ fontFamily: "'Lora', serif" }}>
              {lang === "de" ? "Entdecke Bayreuths nachhaltigste Orte." : "Discover your city's most sustainable places."}
            </p>
            <p className="text-white/70 text-sm">
              {lang === "de"
                ? "Geprüfte Läden, Cafés und Dienstleistungen — alle für ein grüneres Bayreuth."
                : "Verified shops, cafés, and services — all committed to a greener Bayreuth."}
            </p>
          </div>

          <div className="flex gap-2 mb-12">
            {[true, false, false].map((a, i) => (
              <div key={i} className="rounded-full" style={{ width: a ? 24 : 8, height: 8, background: a ? "#fff" : "rgba(255,255,255,0.35)" }} />
            ))}
          </div>
        </div>

        <div className="pb-10 flex flex-col gap-3">
          <button className="w-full py-4 rounded-2xl bg-white text-[#0F6B3E] font-bold text-base" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
            {lang === "de" ? "Loslegen" : "Get Started"}
          </button>
          <button className="w-full py-4 rounded-2xl font-medium text-sm text-white/80" style={{ border: "1px solid rgba(255,255,255,0.3)" }}>
            {lang === "de" ? "Ich habe bereits ein Konto" : "I already have an account"}
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

// Screen 2: Home
function ScreenHome({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="px-5 pt-4 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-[#6B7B6B] font-medium">{t.goodMorning}</p>
              <h2 className="text-xl font-bold text-[#1A2E1A]" style={{ fontFamily: "'Lora', serif" }}>Emma 👋</h2>
            </div>
            <div className="relative">
              <button className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                <Bell size={20} color="#1A2E1A" strokeWidth={1.8} />
              </button>
              <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#0F6B3E] border-2 border-[#FBF7EF]" />
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white mb-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <Search size={18} color="#6B7B6B" />
            <span className="text-sm text-[#6B7B6B]">{t.search}</span>
            <div className="ml-auto w-8 h-8 rounded-xl bg-[#0F6B3E] flex items-center justify-center">
              <Filter size={14} color="#fff" />
            </div>
          </div>

          {/* Welcome card (replaces impact strip) */}
          <div className="rounded-2xl p-4 mb-4" style={{ background: "linear-gradient(135deg, #0F6B3E 0%, #1A8C52 100%)" }}>
            <p className="text-white/80 text-xs font-semibold uppercase tracking-wide mb-1">{t.welcomeBack}</p>
            <p className="text-white text-sm leading-relaxed">
              {lang === "de"
                ? "10 geprüfte Partner in Bayreuth warten auf dich — lokal, nachhaltig, ehrlich."
                : "10 verified partners in Bayreuth are waiting — local, sustainable, honest."}
            </p>
            <button className="mt-3 px-4 py-1.5 rounded-xl bg-white text-[#0F6B3E] text-xs font-bold">
              {lang === "de" ? "Alle entdecken" : "Explore all"}
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-1">
            {(lang === "de"
              ? ["Alle", "Café", "Bio", "Secondhand", "Fairer Handel", "Nachfüllbar"]
              : ["All", "Café", "Organic", "Second-hand", "Fair Trade", "Refill"]
            ).map((c, i) => (
              <button key={c} className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold"
                style={i === 0 ? { background: "#0F6B3E", color: "#fff" } : { background: "#fff", color: "#1A2E1A", border: "1px solid rgba(15,107,62,0.15)" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Near You */}
        <div className="px-5 mb-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-[#1A2E1A]">{t.nearYou}</h3>
            <button className="text-xs text-[#0F6B3E] font-semibold flex items-center gap-1">{t.seeAll} <ChevronRight size={12} /></button>
          </div>
        </div>

        <div className="px-5 flex flex-col gap-3 pb-2">
          {BUSINESSES.slice(0, 2).map((b) => (
            <div key={b.id} className="rounded-2xl bg-white overflow-hidden" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
              <div className="relative h-32">
                <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3"><VerifiedBadge small lang={lang} /></div>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                  <Heart size={14} color="#6B7B6B" />
                </button>
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#1A2E1A] text-sm leading-tight">{lang === "de" ? b.nameDe : b.name}</h4>
                    <p className="text-xs text-[#6B7B6B] mt-0.5">{lang === "de" ? b.categoryDe : b.category}</p>
                  </div>
                  <span className="text-[10px] text-[#6B7B6B] flex-shrink-0 pt-0.5">{b.distance}</span>
                </div>
                <div className="flex gap-1 flex-wrap mt-2">
                  {b.badges.slice(0, 3).map((badge) => <Badge key={badge} label={badge} lang={lang} small />)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <BottomNav active={T[lang].home} lang={lang} />
        </div>
      </div>
    </MobileFrame>
  );
}

// Screen 3: Map Explore
function ScreenMap({ lang }: { lang: Lang }) {
  const t = T[lang];
  const allPins = BUSINESSES.map((b, i) => ({ ...b, active: i === 0 }));

  return (
    <MobileFrame bg="#EAE6DE">
      <div className="flex flex-col h-full relative">
        {/* Map canvas */}
        <div className="absolute inset-0">
          <svg width="393" height="852" viewBox="0 0 393 852" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
            <rect width="393" height="852" fill="#EAE6DE" />
            {/* Parks */}
            <ellipse cx="58" cy="480" rx="52" ry="38" fill="#C8DCBA" opacity="0.9" />
            <ellipse cx="340" cy="560" rx="40" ry="30" fill="#C8DCBA" opacity="0.8" />
            <rect x="200" y="490" width="70" height="55" rx="12" fill="#C8DCBA" opacity="0.85" />
            {[[50,470],[62,482],[52,492],[72,474],[44,488],[200,500],[220,510],[210,520],[232,500],[336,555],[348,567]].map(([px,py],i)=>(
              <circle key={i} cx={px} cy={py} r="4" fill="#A8C894" opacity="0.9" />
            ))}
            <text x="52" y="510" fill="#5A7A42" fontSize="7" fontWeight="600" fontFamily="DM Sans, sans-serif" opacity="0.85">Stadtpark</text>
            {/* River */}
            <path d="M0 395 Q40 388 80 395 Q120 402 160 394 Q200 386 240 393 Q280 400 320 391 Q360 382 393 390 L393 410 Q360 402 320 411 Q280 420 240 413 Q200 406 160 414 Q120 422 80 415 Q40 408 0 415 Z" fill="#AECFE0" opacity="0.75" />
            <text x="90" y="408" fill="#5A90A8" fontSize="7" fontFamily="DM Sans, sans-serif" fontStyle="italic" opacity="0.9">Roter Main</text>
            {/* Buildings */}
            <rect x="170" y="190" width="88" height="65" rx="5" fill="#D8D2C8" opacity="0.9" />
            <rect x="175" y="195" width="78" height="55" rx="4" fill="#CCC6BC" opacity="0.6" />
            <rect x="55" y="320" width="60" height="45" rx="5" fill="#D8D2C8" opacity="0.85" />
            <rect x="295" y="255" width="70" height="55" rx="5" fill="#D8D2C8" opacity="0.85" />
            <rect x="60" y="175" width="75" height="50" rx="5" fill="#D8D2C8" opacity="0.8" />
            <rect x="280" y="455" width="65" height="50" rx="5" fill="#D8D2C8" opacity="0.8" />
            <rect x="160" y="640" width="80" height="60" rx="5" fill="#D8D2C8" opacity="0.75" />
            {/* Arteries */}
            <line x1="0" y1="280" x2="393" y2="280" stroke="#F8F4EE" strokeWidth="14" />
            <line x1="0" y1="280" x2="393" y2="280" stroke="#E8E2D8" strokeWidth="10" />
            <line x1="0" y1="180" x2="393" y2="340" stroke="#F8F4EE" strokeWidth="11" />
            <line x1="0" y1="180" x2="393" y2="340" stroke="#E8E2D8" strokeWidth="7.5" />
            <line x1="155" y1="0" x2="155" y2="852" stroke="#F8F4EE" strokeWidth="13" />
            <line x1="155" y1="0" x2="155" y2="852" stroke="#E8E2D8" strokeWidth="9" />
            <line x1="295" y1="0" x2="295" y2="852" stroke="#F8F4EE" strokeWidth="10" />
            <line x1="295" y1="0" x2="295" y2="852" stroke="#E8E2D8" strokeWidth="7" />
            {/* Secondary */}
            <line x1="0" y1="430" x2="393" y2="430" stroke="#EDE8E0" strokeWidth="7" />
            <line x1="0" y1="540" x2="393" y2="540" stroke="#EDE8E0" strokeWidth="6" />
            <line x1="65" y1="0" x2="65" y2="852" stroke="#EDE8E0" strokeWidth="6" />
            <line x1="230" y1="0" x2="230" y2="852" stroke="#EDE8E0" strokeWidth="6" />
            <line x1="350" y1="0" x2="350" y2="852" stroke="#EDE8E0" strokeWidth="5" />
            <path d="M0 600 Q100 720 200 700 Q300 680 393 720" stroke="#EDE8E0" strokeWidth="7" fill="none" />
            {/* Tertiary */}
            <line x1="0" y1="340" x2="393" y2="340" stroke="#E4DFD6" strokeWidth="4" />
            <line x1="120" y1="0" x2="120" y2="852" stroke="#E4DFD6" strokeWidth="4" />
            <line x1="190" y1="0" x2="190" y2="852" stroke="#E4DFD6" strokeWidth="3" />
            <line x1="260" y1="0" x2="260" y2="852" stroke="#E4DFD6" strokeWidth="3" />
            {/* Road labels */}
            <text x="28" y="274" fill="#9A948A" fontSize="7.5" fontFamily="DM Sans, sans-serif" fontWeight="600" opacity="0.9">Maxstraße</text>
            <text x="162" y="140" fill="#9A948A" fontSize="7.5" fontFamily="DM Sans, sans-serif" fontWeight="600" opacity="0.9" transform="rotate(90,162,140)">Ludwigstraße</text>
            <text x="302" y="130" fill="#9A948A" fontSize="7" fontFamily="DM Sans, sans-serif" opacity="0.85" transform="rotate(90,302,130)">Sophienstraße</text>
            {/* Neighbourhood labels */}
            <text x="155" y="158" fill="#6A6460" fontSize="10" fontFamily="DM Sans, sans-serif" fontWeight="700" opacity="0.55" textAnchor="middle" letterSpacing="2">INNENSTADT</text>
            <text x="78" y="238" fill="#6A6460" fontSize="8" fontFamily="DM Sans, sans-serif" fontWeight="600" opacity="0.45" textAnchor="middle" letterSpacing="1">ST. GEORGEN</text>
          </svg>

          {/* All 10 business pins */}
          {allPins.map((pin, idx) => (
            <div key={pin.id} className="absolute"
              style={{ left: pin.mapX - (pin.active ? 22 : 17), top: pin.mapY - (pin.active ? 50 : 42), zIndex: pin.active ? 10 : 5 }}>
              {pin.active && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-lg text-white font-semibold"
                  style={{ fontSize: 9, background: "#0F6B3E", boxShadow: "0 2px 8px rgba(15,107,62,0.35)" }}>
                  {lang === "de" ? pin.nameDe : pin.name}
                </div>
              )}
              <div className="flex flex-col items-center"
                style={{ filter: pin.active ? "drop-shadow(0 4px 10px rgba(15,107,62,0.4))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.18))" }}>
                <div className="rounded-2xl flex items-center justify-center"
                  style={{ width: pin.active ? 44 : 32, height: pin.active ? 44 : 32,
                    background: pin.active ? "#0F6B3E" : "#FFFFFF",
                    border: pin.active ? "3px solid rgba(255,255,255,0.5)" : "2px solid #0F6B3E" }}>
                  <Leaf size={pin.active ? 20 : 13} color={pin.active ? "#fff" : "#0F6B3E"} strokeWidth={pin.active ? 2.5 : 2} />
                </div>
                <div style={{ width: 0, height: 0,
                  borderLeft: `${pin.active ? 5 : 4}px solid transparent`,
                  borderRight: `${pin.active ? 5 : 4}px solid transparent`,
                  borderTop: `${pin.active ? 8 : 6}px solid #0F6B3E`,
                  opacity: pin.active ? 1 : 0.55 }} />
              </div>
            </div>
          ))}

          {/* User location */}
          <div className="absolute" style={{ left: 196, top: 322, zIndex: 8 }}>
            <div className="relative">
              <div className="absolute rounded-full" style={{ width: 36, height: 36, top: -14, left: -14, background: "rgba(37,99,235,0.12)", border: "1.5px solid rgba(37,99,235,0.25)" }} />
              <div className="rounded-full border-2 border-white" style={{ width: 12, height: 12, background: "#2563EB", boxShadow: "0 2px 8px rgba(37,99,235,0.5)" }} />
            </div>
          </div>
        </div>

        {/* Top UI */}
        <div className="relative z-20 px-5 pt-4">
          <div className="flex items-center gap-2 rounded-2xl px-4 py-3 bg-white mb-2.5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.13)" }}>
            <Search size={17} color="#6B7B6B" />
            <span className="text-sm text-[#6B7B6B] flex-1">{lang === "de" ? "Bayreuth Innenstadt" : "Bayreuth city centre"}</span>
            <button className="w-8 h-8 rounded-xl bg-[#E8F5EE] flex items-center justify-center">
              <Filter size={14} color="#0F6B3E" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {(lang === "de"
              ? ["Alle","Bio","Nachfüllbar","Café","Secondhand"]
              : ["All","Organic","Refill","Café","Second-hand"]
            ).map((c, i) => (
              <button key={c} className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                style={i === 0
                  ? { background: "#0F6B3E", color: "#fff", boxShadow: "0 2px 8px rgba(15,107,62,0.3)" }
                  : { background: "#fff", color: "#1A2E1A", boxShadow: "0 1px 6px rgba(0,0,0,0.1)" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Partner count pill */}
        <div className="absolute z-20 left-1/2 -translate-x-1/2" style={{ top: 144 }}>
          <div className="px-3.5 py-1.5 rounded-full bg-white flex items-center gap-1.5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}>
            <div className="w-2 h-2 rounded-full bg-[#0F6B3E]" />
            <span className="text-xs font-semibold text-[#1A2E1A]">
              {lang === "de" ? "10 Partner in der Nähe" : "10 partners nearby"}
            </span>
          </div>
        </div>

        {/* Map controls */}
        <div className="absolute right-4 z-20" style={{ top: 180 }}>
          <div className="flex flex-col gap-1 rounded-2xl overflow-hidden bg-white" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.13)" }}>
            <button className="w-10 h-10 flex items-center justify-center text-lg font-light text-[#1A2E1A] border-b border-gray-100">+</button>
            <button className="w-10 h-10 flex items-center justify-center text-lg font-light text-[#1A2E1A]">−</button>
          </div>
          <button className="mt-2 w-10 h-10 rounded-2xl bg-white flex items-center justify-center" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.13)" }}>
            <Compass size={18} color="#0F6B3E" />
          </button>
        </div>

        {/* Bottom card */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="mx-4 mb-3 rounded-3xl bg-white p-4" style={{ boxShadow: "0 -8px 40px rgba(0,0,0,0.14)" }}>
            <div className="flex justify-center mb-3"><div className="w-10 h-1 rounded-full bg-[#D4D8D4]" /></div>
            <div className="flex gap-3.5">
              <img src={BUSINESSES[0].image} alt={BUSINESSES[0].name} className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1"><VerifiedBadge small lang={lang} /></div>
                <h4 className="font-bold text-[#1A2E1A] text-sm leading-tight">{lang === "de" ? BUSINESSES[0].nameDe : BUSINESSES[0].name}</h4>
                <p className="text-xs text-[#6B7B6B] mb-1.5">{lang === "de" ? BUSINESSES[0].categoryDe : BUSINESSES[0].category} · {BUSINESSES[0].distance}</p>
                <div className="flex gap-1">{BUSINESSES[0].badges.slice(0,2).map(b => <Badge key={b} label={b} lang={lang} small />)}</div>
              </div>
              <button className="w-10 h-10 rounded-2xl bg-[#0F6B3E] flex items-center justify-center flex-shrink-0 self-center" style={{ boxShadow: "0 4px 12px rgba(15,107,62,0.35)" }}>
                <ChevronRight size={18} color="#fff" />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: "1px solid rgba(15,107,62,0.1)" }}>
              <span className="text-xs text-[#0F6B3E] font-semibold flex items-center gap-1"><MapPin size={11} />{BUSINESSES[0].address}</span>
              <span className="text-xs text-[#6B7B6B] flex items-center gap-1 ml-auto"><Clock size={11} />{BUSINESSES[0].hours.split(",")[0]}</span>
            </div>
          </div>
          <BottomNav active={T[lang].map} lang={lang} />
        </div>
      </div>
    </MobileFrame>
  );
}

// Screen 4: Discover
function ScreenDiscover({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="px-5 pt-4 pb-3">
          <h2 className="text-2xl font-bold text-[#1A2E1A] mb-1" style={{ fontFamily: "'Lora', serif" }}>{t.discover}</h2>
          <p className="text-sm text-[#6B7B6B] mb-4">
            {lang === "de" ? "10 geprüfte Partner in Bayreuth" : "10 verified partners in Bayreuth"}
          </p>
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white mb-3" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <Search size={18} color="#6B7B6B" />
            <span className="text-sm text-[#6B7B6B]">{t.search}</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(lang === "de"
              ? ["Alle","Essen & Trinken","Mode","Gesundheit","Haus","Dienstleistungen"]
              : ["All","Food & Drink","Fashion","Health","Home","Services"]
            ).map((c, i) => (
              <button key={c} className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={i === 0 ? { background: "#0F6B3E", color: "#fff" } : { background: "#fff", color: "#1A2E1A", border: "1px solid rgba(15,107,62,0.15)" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 flex flex-col gap-3 pb-4">
          {BUSINESSES.slice(0, 6).map((b) => (
            <div key={b.id} className="rounded-2xl bg-white overflow-hidden flex gap-3 p-3" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
              <img src={b.image} alt={b.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0 py-0.5">
                <div className="flex items-center gap-1.5 mb-1"><VerifiedBadge small lang={lang} /></div>
                <h4 className="font-bold text-[#1A2E1A] text-sm leading-tight">{lang === "de" ? b.nameDe : b.name}</h4>
                <p className="text-[11px] text-[#6B7B6B] mt-0.5">{lang === "de" ? b.categoryDe : b.category}</p>
                <div className="flex items-center gap-2 mt-1 mb-2">
                  <span className="text-[10px] text-[#6B7B6B] flex items-center gap-0.5"><MapPin size={9} />{b.distance}</span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {b.badges.slice(0, 2).map((badge) => <Badge key={badge} label={badge} lang={lang} small />)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto"><BottomNav active={T[lang].explore} lang={lang} /></div>
      </div>
    </MobileFrame>
  );
}

// Screen 5: Filter
function ScreenFilter({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [selected, setSelected] = useState<string[]>(["Organic", "Vegan"]);
  const toggle = (l: string) => setSelected((s) => s.includes(l) ? s.filter((x) => x !== l) : [...s, l]);
  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="flex justify-center pt-4 pb-2"><div className="w-12 h-1.5 rounded-full bg-[#D4D8D4]" /></div>
        <div className="px-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#1A2E1A]" style={{ fontFamily: "'Lora', serif" }}>{t.filter}</h2>
            <button className="text-sm text-[#0F6B3E] font-semibold">{t.resetAll}</button>
          </div>

          <div className="mb-5">
            <h3 className="font-bold text-[#1A2E1A] text-sm mb-3">{t.distance}</h3>
            <div className="flex gap-2">
              {["0.5 km","1 km","2 km","5 km"].map((d,i)=>(
                <button key={d} className="flex-1 py-2.5 rounded-xl text-xs font-semibold"
                  style={i===1?{background:"#0F6B3E",color:"#fff"}:{background:"#fff",color:"#1A2E1A",border:"1px solid rgba(15,107,62,0.2)"}}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <h3 className="font-bold text-[#1A2E1A] text-sm mb-3">{t.category}</h3>
            <div className="flex gap-2 flex-wrap">
              {(lang==="de"
                ?["Alle","Essen & Trinken","Mode","Gesundheit","Haus","Dienstleistungen"]
                :["All","Food & Drink","Fashion","Health","Home","Services"]
              ).map((c,i)=>(
                <button key={c} className="px-3 py-2 rounded-xl text-xs font-semibold"
                  style={i===0?{background:"#0F6B3E",color:"#fff"}:{background:"#fff",color:"#1A2E1A",border:"1px solid rgba(15,107,62,0.2)"}}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <h3 className="font-bold text-[#1A2E1A] text-sm mb-3">{t.sustainability}</h3>
            <div className="grid grid-cols-2 gap-2">
              {BADGES.map((b) => {
                const Icon = b.icon;
                const active = selected.includes(b.label);
                const displayLabel = lang === "de" ? b.labelDe : b.label;
                return (
                  <button key={b.label} onClick={() => toggle(b.label)}
                    className="flex items-center gap-2 p-3 rounded-2xl transition-all"
                    style={active ? { background: b.bg, border: `2px solid ${b.color}` } : { background: "#fff", border: "2px solid transparent", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: b.bg }}>
                      <Icon size={16} color={b.color} />
                    </div>
                    <span className="text-xs font-semibold text-[#1A2E1A]">{displayLabel}</span>
                    {active && <Check size={12} color={b.color} className="ml-auto" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-auto px-5 pb-10 pt-4" style={{ borderTop: "1px solid rgba(15,107,62,0.1)" }}>
          <button className="w-full py-4 rounded-2xl bg-[#0F6B3E] text-white font-bold text-base">
            {lang === "de" ? "10 Ergebnisse anzeigen" : "Show 10 Results"}
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

// Screen 6: Business Profile — Café Herzensfreude
function ScreenBusinessProfile({ lang }: { lang: Lang }) {
  const t = T[lang];
  const b = BUSINESSES[0]; // Café Herzensfreude
  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        {/* Hero */}
        <div className="relative h-52 flex-shrink-0">
          <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(26,46,26,0.75) 100%)" }} />
          <button className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-white/90 flex items-center justify-center">
            <ChevronLeft size={20} color="#1A2E1A" />
          </button>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/90 flex items-center justify-center">
            <Heart size={18} color="#1A2E1A" />
          </button>
          <div className="absolute bottom-3 left-4 flex gap-2 items-center">
            <VerifiedBadge lang={lang} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-3">
          {/* Business name */}
          <div className="mb-3">
            <h2 className="text-xl font-bold text-[#1A2E1A] leading-tight" style={{ fontFamily: "'Lora', serif" }}>{lang === "de" ? b.nameDe : b.name}</h2>
            <p className="text-sm text-[#6B7B6B] mt-1">{lang === "de" ? b.categoryDe : b.category}</p>
          </div>

          {/* Contact + hours row */}
          <div className="flex flex-col gap-1.5 py-3 mb-3" style={{ borderBottom: "1px solid rgba(15,107,62,0.1)" }}>
            <span className="flex items-center gap-1.5 text-xs text-[#6B7B6B]"><MapPin size={13} color="#0F6B3E" />{b.address}</span>
            <span className="flex items-center gap-1.5 text-xs text-[#6B7B6B]"><Clock size={13} color="#0F6B3E" />{b.hours}</span>
            <span className="flex items-center gap-1.5 text-xs text-[#6B7B6B]"><Phone size={13} color="#0F6B3E" />{b.phone}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#3A4A3A] leading-relaxed mb-4">
            {lang === "de" ? b.descriptionDe : b.description}
          </p>

          {/* Owner quote */}
          <div className="rounded-2xl p-4 mb-4" style={{ background: "#F0EBE0" }}>
            <p className="text-xs text-[#6B7B6B] font-semibold uppercase tracking-wide mb-1.5">{t.ownerWord}</p>
            <p className="text-sm text-[#3A4A3A] italic leading-relaxed">{lang === "de" ? b.ownerQuoteDe : b.ownerQuote}</p>
            <p className="text-xs text-[#6B7B6B] mt-2 font-medium">— {lang === "de" && "ownerNameDe" in b ? b.ownerNameDe : b.ownerName}</p>
          </div>

          {/* Map mini */}
          <div className="rounded-2xl overflow-hidden mb-4" style={{ height: 80, background: "#E8F0EB", position: "relative" }}>
            <svg width="100%" height="80" viewBox="0 0 343 80">
              <rect width="343" height="80" fill="#E8F0EB" />
              <line x1="0" y1="40" x2="343" y2="40" stroke="#E8E2D8" strokeWidth="8" />
              <line x1="120" y1="0" x2="120" y2="80" stroke="#E8E2D8" strokeWidth="6" />
              <line x1="220" y1="0" x2="220" y2="80" stroke="#E8E2D8" strokeWidth="5" />
              <rect x="130" y="15" width="70" height="45" rx="5" fill="#D8D2C8" opacity="0.8" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-xl bg-[#0F6B3E] flex items-center justify-center shadow-lg">
                <MapPin size={14} color="#fff" />
              </div>
            </div>
            <div className="absolute bottom-2 left-3">
              <span className="text-[10px] text-[#6B7B6B] font-medium">{b.address}</span>
            </div>
          </div>

          {/* Sustainability criteria */}
          <div className="mb-4">
            <h3 className="font-bold text-[#1A2E1A] text-sm mb-2">{t.verifiedCriteria}</h3>
            <div className="flex gap-1.5 flex-wrap">
              {b.badges.map((badge) => <Badge key={badge} label={badge} lang={lang} />)}
            </div>
          </div>

          {/* First visit offer */}
          <div className="rounded-2xl p-4 mb-4 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0F6B3E, #1A8C52)" }}>
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Award size={20} color="#fff" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">{lang === "de" ? b.offerDe : b.offer}</p>
              <p className="text-white/70 text-xs">{lang === "de" ? "GreenLoop QR-Code zeigen" : "Show your GreenLoop QR code"}</p>
            </div>
            <ChevronRight size={18} color="#fff" />
          </div>

          {/* Reviews */}
          <div className="mb-4">
            <h3 className="font-bold text-[#1A2E1A] text-sm mb-1">{lang === "de" ? "Community-Bewertungen" : "Community Reviews"}</h3>
            <p className="text-xs text-[#6B7B6B] mb-2">
              {lang === "de" ? "Stimmen aus der GreenLoop-Community." : "Notes from the GreenLoop community."}
            </p>
            <div className="flex flex-col gap-2">
              {b.reviews.map((r) => (
                <div key={r.author} className="rounded-2xl bg-white p-3" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-full bg-[#E8F5EE] flex items-center justify-center">
                      <User size={12} color="#0F6B3E" />
                    </div>
                    <span className="text-xs font-bold text-[#1A2E1A]">{r.author}</span>
                  </div>
                  <p className="text-xs text-[#3A4A3A] leading-relaxed italic">"{lang === "de" && "textDe" in r ? r.textDe : r.text}"</p>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full flex items-center gap-2 rounded-2xl bg-white px-3 py-3 text-xs text-[#6B7B6B] font-medium" style={{ border: "1px solid rgba(15,107,62,0.12)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <MessageSquare size={12} />
              {lang === "de" ? "Eigene Erfahrung teilen..." : "Write a review..."}
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pb-4">
            <button className="flex-1 py-3.5 rounded-2xl bg-[#0F6B3E] text-white font-bold text-sm">{t.getDirections}</button>
            <button className="px-4 py-3.5 rounded-2xl font-bold text-sm" style={{ background: "#E8F5EE", color: "#0F6B3E" }}>{t.share}</button>
          </div>
        </div>

        <BottomNav active={T[lang].explore} lang={lang} />
      </div>
    </MobileFrame>
  );
}

// Screen 7: Sustainability Info (replaces score)
function ScreenSustainabilityInfo({ lang }: { lang: Lang }) {
  const t = T[lang];
  const b = BUSINESSES[0];
  const criteria = [
    { ...BADGES[0], title: lang === "de" ? "Zertifiziert Bio" : "Certified Organic",
      desc: lang === "de"
        ? "Alle Produkte erfüllen die EU-Bio-Verordnung (DE-ÖKO-001). Keine synthetischen Pestizide oder Düngemittel."
        : "All products meet EU organic certification (DE-ÖKO-001). No synthetic pesticides or fertilisers used." },
    { ...BADGES[2], title: lang === "de" ? "Fairer Handel" : "Fair Trade",
      desc: lang === "de"
        ? "Kaffeebohnen direkt von Fairtrade-zertifizierten Kooperativen. Faire Löhne, faire Bedingungen."
        : "Coffee beans sourced directly from Fairtrade-certified cooperatives. Fair wages, fair conditions." },
    { ...BADGES[1], title: lang === "de" ? "Regionale Zutaten" : "Regional Sourcing",
      desc: lang === "de"
        ? "80 %+ der Zutaten kommen aus einem Umkreis von 100 km rund um Bayreuth — von namentlich genannten Partnerbetrieben."
        : "80%+ of ingredients sourced within 100 km of Bayreuth from named partner farms and producers." },
    { ...BADGES[3], title: lang === "de" ? "Vollständig vegan" : "100% Vegan",
      desc: lang === "de"
        ? "Kein Fleisch, keine Tierprodukte oder Tierversuche in irgendeiner Phase der Produktion oder Lieferkette."
        : "No animal products, by-products, or testing at any stage of production or supply chain." },
  ];

  return (
    <MobileFrame>
      <div className="flex flex-col h-full px-5 pt-4">
        <div className="flex items-center gap-3 mb-5">
          <button className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <ChevronLeft size={20} color="#1A2E1A" />
          </button>
          <h2 className="text-lg font-bold text-[#1A2E1A]" style={{ fontFamily: "'Lora', serif" }}>{t.sustainabilityInfo}</h2>
        </div>

        {/* Business header */}
        <div className="rounded-2xl bg-white p-4 flex items-center gap-3 mb-5" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#1A2E1A] text-sm">{lang === "de" ? b.nameDe : b.name}</h3>
            <p className="text-xs text-[#6B7B6B]">{lang === "de" ? b.categoryDe : b.category}</p>
          </div>
          <div className="ml-auto"><VerifiedBadge small lang={lang} /></div>
        </div>

        {/* What does verification mean */}
        <div className="rounded-2xl p-4 mb-4" style={{ background: "#E8F5EE" }}>
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} color="#0F6B3E" />
            <span className="font-bold text-[#0F6B3E] text-sm">
              {lang === "de" ? "Was bedeutet GreenLoop Geprüft?" : "What does GreenLoop Verified mean?"}
            </span>
          </div>
          <p className="text-xs text-[#3A4A3A] leading-relaxed">
            {lang === "de"
              ? "Jedes Badge steht für ein tatsächlich geprüftes Nachhaltigkeitskriterium. Wir besuchen jeden Betrieb persönlich und überprüfen jährlich alle Angaben."
              : "Every badge represents a real, audited sustainability commitment. We visit each business in person and re-verify annually."}
          </p>
        </div>

        {/* Criteria cards */}
        <h3 className="font-bold text-[#1A2E1A] text-sm mb-3">{t.verifiedCriteria}</h3>
        <div className="flex flex-col gap-3 pb-4">
          {criteria.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="rounded-2xl p-4 bg-white flex gap-3" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: c.bg }}>
                  <Icon size={18} color={c.color} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-[#1A2E1A] text-sm">{c.title}</p>
                    <Check size={12} color="#0F6B3E" strokeWidth={3} />
                  </div>
                  <p className="text-xs text-[#6B7B6B] leading-relaxed">{c.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-auto"><BottomNav active={T[lang].explore} lang={lang} /></div>
      </div>
    </MobileFrame>
  );
}

// Screen 8: First Visit Offer — Café Herzensfreude
function ScreenOffer({ lang }: { lang: Lang }) {
  const t = T[lang];
  const b = BUSINESSES[0];
  return (
    <MobileFrame bg="#0F6B3E">
      <div className="flex flex-col items-center h-full px-6 pt-6">
        <button className="self-start w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
          <X size={18} color="#fff" />
        </button>
        <div className="w-14 h-14 rounded-3xl bg-white flex items-center justify-center mb-3 shadow-xl">
          <Leaf size={24} color="#0F6B3E" />
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-1" style={{ fontFamily: "'Lora', serif" }}>{t.firstVisitOffer}</h2>
        <p className="text-white/70 text-sm text-center mb-5">{t.showAt} {lang === "de" ? b.nameDe : b.name}</p>

        {/* Card */}
        <div className="w-full rounded-3xl bg-white p-5 mb-4">
          {/* Business header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-[#1A2E1A] text-sm">{lang === "de" ? b.nameDe : b.name}</h3>
              <p className="text-xs text-[#6B7B6B]">{lang === "de" ? b.categoryDe : b.category}</p>
            </div>
            <VerifiedBadge small lang={lang} />
          </div>

          {/* Offer highlight */}
          <div className="text-center py-3 rounded-2xl mb-4" style={{ background: "#E8F5EE" }}>
            <p className="text-[#0F6B3E] font-bold text-xl">{t.freeHotDrink}</p>
            <p className="text-[#6B7B6B] text-sm">{t.freeHotDrinkSub}</p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-3">
            <div className="rounded-2xl p-3 bg-white inline-block" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.10)" }}>
              <QRCode size={172} />
            </div>
          </div>
          <p className="text-center text-xs text-[#6B7B6B]">{t.validUntil}</p>
        </div>

        <div className="flex gap-1.5 flex-wrap justify-center mb-4">
          {b.badges.map((badge) => <Badge key={badge} label={badge} lang={lang} />)}
        </div>
        <p className="text-white/50 text-xs text-center px-4">{t.scanCheckout}</p>

        <div className="mt-auto w-full pb-4">
          <BottomNav active={T[lang].explore} lang={lang} />
        </div>
      </div>
    </MobileFrame>
  );
}

// Screen 9: Community / Events
function ScreenCommunity({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="px-5 pt-4 pb-2">
          <h2 className="text-2xl font-bold text-[#1A2E1A] mb-1" style={{ fontFamily: "'Lora', serif" }}>{t.community}</h2>
          <p className="text-sm text-[#6B7B6B] mb-4">
            {lang === "de" ? "Veranstaltungen & Workshops in Bayreuth" : "Events & workshops in Bayreuth"}
          </p>
          <div className="flex gap-2 mb-4 overflow-x-auto pb-0.5">
            {(lang === "de"
              ? ["Alle","Diese Woche","Workshops","Natur","Essen"]
              : ["All","This Week","Workshops","Nature","Food"]
            ).map((c, i) => (
              <button key={c} className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={i === 0 ? { background: "#0F6B3E", color: "#fff" } : { background: "#fff", color: "#1A2E1A", border: "1px solid rgba(15,107,62,0.15)" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Featured */}
        <div className="mx-5 mb-4 rounded-3xl overflow-hidden relative" style={{ height: 190 }}>
          <img src={EVENTS[0].image} alt={EVENTS[0].title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,107,62,0.9) 0%, transparent 60%)" }} />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="px-2 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">{EVENTS[0].category}</span>
            <h3 className="text-white font-bold mt-1 leading-tight text-sm">
              {lang === "de" ? EVENTS[0].titleDe : EVENTS[0].title}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-white/80 text-xs flex items-center gap-1"><Calendar size={10} />{EVENTS[0].date}</span>
              <span className="text-white/80 text-xs flex items-center gap-1"><Users size={10} />{EVENTS[0].attendees} {lang === "de" ? "dabei" : "going"}</span>
            </div>
          </div>
        </div>

        <div className="px-5 flex flex-col gap-3 pb-3">
          {EVENTS.slice(1).map((e) => (
            <div key={e.id} className="rounded-2xl bg-white overflow-hidden flex gap-3 p-3" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <img src={e.image} alt={e.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: "#E8F5EE", color: "#0F6B3E" }}>{e.category}</span>
                <h4 className="font-bold text-[#1A2E1A] text-sm leading-tight mt-1">{lang === "de" ? e.titleDe : e.title}</h4>
                <p className="text-xs text-[#6B7B6B] mt-1 flex items-center gap-1"><Calendar size={10} />{e.date} · {e.time}</p>
                <p className="text-xs text-[#6B7B6B] flex items-center gap-1"><Users size={10} />{e.attendees} {lang === "de" ? "dabei" : "going"}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-5 mb-2 p-4 rounded-2xl" style={{ background: "#E8F5EE" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F6B3E] flex items-center justify-center flex-shrink-0">
              <Plus size={20} color="#fff" />
            </div>
            <div>
              <p className="font-bold text-[#1A2E1A] text-sm">{t.hostEvent}</p>
              <p className="text-xs text-[#6B7B6B]">{t.hostEventSub}</p>
            </div>
            <ChevronRight size={16} color="#0F6B3E" className="ml-auto" />
          </div>
        </div>

        <div className="mt-auto"><BottomNav active={T[lang].community} lang={lang} /></div>
      </div>
    </MobileFrame>
  );
}

// Screen 10: Profile / Settings
function ScreenProfile({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = T[lang];
  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="px-5 pt-4 pb-3 flex-1 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format"
                alt="Emma" className="w-16 h-16 rounded-2xl object-cover" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0F6B3E] flex items-center justify-center border-2 border-[#FBF7EF]">
                <Check size={10} color="#fff" strokeWidth={3} />
              </div>
            </div>
            <div>
              <h2 className="font-bold text-[#1A2E1A] text-xl" style={{ fontFamily: "'Lora', serif" }}>Emma Bauer</h2>
              <p className="text-sm text-[#6B7B6B]">Bayreuth · {t.memberSince}</p>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white inline-block mt-1" style={{ background: "#0F6B3E" }}>{t.greenCitizen}</span>
            </div>
          </div>

          {/* Stats — visits + saved only, no CO₂ */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { value: "47", label: t.visits },
              { value: "8",  label: t.saved },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-4 text-center bg-white" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <p className="font-bold text-[#0F6B3E] text-2xl leading-none">{s.value}</p>
                <p className="text-xs text-[#6B7B6B] mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Language switcher */}
          <div className="rounded-2xl bg-white p-4 mb-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#E8F5EE] flex items-center justify-center">
                  <Languages size={16} color="#0F6B3E" />
                </div>
                <span className="font-semibold text-[#1A2E1A] text-sm">{t.language}</span>
              </div>
              <div className="flex rounded-xl overflow-hidden" style={{ border: "1.5px solid rgba(15,107,62,0.2)" }}>
                {(["en","de"] as Lang[]).map((l) => (
                  <button key={l} onClick={() => setLang(l)}
                    className="px-3 py-1.5 text-xs font-bold"
                    style={lang === l ? { background: "#0F6B3E", color: "#fff" } : { color: "#6B7B6B" }}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Exploration badges */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#1A2E1A] text-sm">{t.badgesEarned}</h3>
              <button className="text-xs text-[#0F6B3E] font-semibold">{t.viewAll}</button>
            </div>
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {BADGES.slice(0, 5).map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.label} className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: b.bg }}>
                      <Icon size={20} color={b.color} />
                    </div>
                    <span className="text-[9px] text-[#6B7B6B] text-center">{lang === "de" ? b.labelDe : b.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Saved places */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#1A2E1A] text-sm">{t.savedPlaces}</h3>
              <button className="text-xs text-[#0F6B3E] font-semibold">{t.seeAll}</button>
            </div>
            <div className="flex flex-col gap-2.5">
              {BUSINESSES.slice(0, 3).map((b) => (
                <div key={b.id} className="flex items-center gap-3 rounded-2xl bg-white p-3" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <img src={b.image} alt={b.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#1A2E1A] text-sm">{lang === "de" ? b.nameDe : b.name}</h4>
                    <p className="text-xs text-[#6B7B6B]">{lang === "de" ? b.categoryDe : b.category}</p>
                  </div>
                  <button className="w-8 h-8 rounded-xl bg-[#E8F5EE] flex items-center justify-center">
                    <Heart size={14} color="#0F6B3E" fill="#0F6B3E" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Settings rows */}
          <div className="mt-4 flex flex-col gap-2 pb-4">
            {[
              { icon: Settings, label: lang === "de" ? "Einstellungen" : "Settings" },
              { icon: Info, label: lang === "de" ? "Über uns / Wer wir sind" : "About Us / Who We Are" },
              { icon: BookOpen, label: lang === "de" ? "Wie es funktioniert" : "How It Works" },
            ].map(({ icon: Icon, label }) => (
              <button key={label} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
                <div className="w-8 h-8 rounded-xl bg-[#E8F5EE] flex items-center justify-center">
                  <Icon size={15} color="#0F6B3E" />
                </div>
                <span className="text-sm font-medium text-[#1A2E1A]">{label}</span>
                <ChevronRight size={14} color="#6B7B6B" className="ml-auto" />
              </button>
            ))}
          </div>
        </div>

        <BottomNav active={T[lang].profile} lang={lang} />
      </div>
    </MobileFrame>
  );
}

// ─── Desktop Screens ──────────────────────────────────────────────────────────

function DesktopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-shrink-0 overflow-hidden"
      style={{ width: 1440, minHeight: 900, background: "#FBF7EF", fontFamily: "'DM Sans', sans-serif",
        borderRadius: 16, boxShadow: "0 24px 80px rgba(15,107,62,0.15), 0 2px 8px rgba(0,0,0,0.06)",
        border: "1px solid rgba(15,107,62,0.1)" }}>
      {children}
    </div>
  );
}

function DesktopNav({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = T[lang];
  return (
    <nav className="flex items-center justify-between px-16 py-5" style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(15,107,62,0.1)" }}>
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-[#0F6B3E] flex items-center justify-center">
          <TreePine size={18} color="#fff" />
        </div>
        <span className="font-bold text-[#1A2E1A] text-xl" style={{ fontFamily: "'Lora', serif" }}>GreenLoop</span>
        <span className="text-xs text-[#6B7B6B] font-medium mt-0.5 ml-1">Bayreuth</span>
      </div>
      <div className="flex items-center gap-8">
        {[t.explore, t.howItWorks, t.aboutUs].map((item) => (
          <a key={item} href="#" className="text-sm font-medium text-[#3A4A3A] hover:text-[#0F6B3E] transition-colors">{item}</a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {/* Language switcher */}
        <div className="flex rounded-xl overflow-hidden" style={{ border: "1.5px solid rgba(15,107,62,0.2)" }}>
          {(["en","de"] as Lang[]).map((l) => (
            <button key={l} onClick={() => setLang(l)}
              className="px-3 py-1.5 text-xs font-bold transition-all"
              style={lang === l ? { background: "#0F6B3E", color: "#fff" } : { color: "#6B7B6B" }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <button className="text-sm font-semibold text-[#0F6B3E]">{t.signIn}</button>
        <button className="px-5 py-2.5 rounded-xl bg-[#0F6B3E] text-white font-semibold text-sm">{t.getApp}</button>
      </div>
    </nav>
  );
}

// Desktop 1: Home / Landing
function DesktopHome({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = T[lang];
  return (
    <DesktopFrame>
      <DesktopNav lang={lang} setLang={setLang} />

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: 580 }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1440&h=700&fit=crop&auto=format"
            alt="Sustainable market" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,107,62,0.92) 40%, rgba(15,107,62,0.3) 100%)" }} />
        </div>
        <div className="relative z-10 px-16 py-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold mb-6 backdrop-blur-sm">
            <Leaf size={12} />
            {lang === "de" ? "10 geprüfte Partner in Bayreuth" : "10 verified partners in Bayreuth"}
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 leading-none" style={{ fontFamily: "'Lora', serif" }}>
            {lang === "de" ? <>Dein grüner<br />Stadtführer<br />Bayreuth.</> : <>Your green<br />guide to<br />Bayreuth.</>}
          </h1>
          <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-md">
            {lang === "de"
              ? "Entdecke lokale Läden, Cafés und Dienstleistungen, die echte Nachhaltigkeit leben. Transparent geprüft, ehrlich empfohlen."
              : "Discover local shops, cafés, and services with genuine sustainability commitments. Transparently verified, honestly recommended."}
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 rounded-2xl bg-white text-[#0F6B3E] font-bold text-base">
              {lang === "de" ? "Partner entdecken" : "Explore Partners"}
            </button>
            <button className="px-8 py-4 rounded-2xl font-bold text-base text-white" style={{ border: "2px solid rgba(255,255,255,0.4)" }}>
              {t.howItWorks}
            </button>
          </div>
        </div>
        {/* Floating info cards — no speculative metrics */}
        <div className="absolute right-16 bottom-16 flex gap-4">
          {[
            { value: "10", label: lang === "de" ? "Geprüfte Partner" : "Verified Partners" },
            { value: "8",  label: lang === "de" ? "Kriterien" : "Criteria" },
            { value: lang === "de" ? "Lokal" : "Local", label: lang === "de" ? "& transparent" : "& transparent" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-5 text-center backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.15)", minWidth: 130 }}>
              <p className="text-white font-bold text-3xl">{s.value}</p>
              <p className="text-white/70 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Criteria strip */}
      <div className="px-16 py-8">
        <p className="text-center text-xs font-semibold text-[#6B7B6B] tracking-widest uppercase mb-5">
          {lang === "de" ? "Unsere Nachhaltigkeitskriterien" : "Our Sustainability Criteria"}
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {BADGES.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl" style={{ background: b.bg }}>
                <Icon size={16} color={b.color} />
                <span className="text-sm font-semibold" style={{ color: b.color }}>{lang === "de" ? b.labelDe : b.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map teaser */}
      <div className="px-16 pb-10">
        <div className="rounded-3xl overflow-hidden relative" style={{ height: 220, background: "#E8F0EB" }}>
          <svg width="1312" height="220" viewBox="0 0 1312 220">
            <rect width="1312" height="220" fill="#E8F0EB" />
            <line x1="0" y1="110" x2="1312" y2="110" stroke="#E8E2D8" strokeWidth="18" />
            <line x1="0" y1="60" x2="1312" y2="170" stroke="#EDE8E0" strokeWidth="12" />
            <line x1="400" y1="0" x2="400" y2="220" stroke="#E8E2D8" strokeWidth="14" />
            <line x1="800" y1="0" x2="800" y2="220" stroke="#EDE8E0" strokeWidth="10" />
            <line x1="1100" y1="0" x2="1100" y2="220" stroke="#EDE8E0" strokeWidth="8" />
            <rect x="420" y="30" width="180" height="120" rx="8" fill="#D8D2C8" opacity="0.7" />
            <rect x="820" y="60" width="140" height="100" rx="8" fill="#D8D2C8" opacity="0.7" />
            <ellipse cx="200" cy="160" rx="80" ry="50" fill="#C8DCBA" opacity="0.8" />
          </svg>
          {/* Partner pins on map */}
          {[{x:380,y:95},{x:520,y:65},{x:660,y:130},{x:750,y:80},{x:840,y:155},{x:940,y:70},{x:1040,y:120},{x:1120,y:90},{x:290,y:140},{x:1200,y:140}].map((pin, i) => (
            <div key={i} className="absolute flex flex-col items-center" style={{ left: pin.x - 16, top: pin.y - 36 }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md"
                style={{ background: i === 0 ? "#0F6B3E" : "#fff", border: i === 0 ? "none" : "2px solid #0F6B3E" }}>
                <Leaf size={14} color={i === 0 ? "#fff" : "#0F6B3E"} />
              </div>
              <div style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent",
                borderTop: `6px solid ${i === 0 ? "#0F6B3E" : "#0F6B3E"}`, opacity: i === 0 ? 1 : 0.5 }} />
            </div>
          ))}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[#1A2E1A] font-bold text-xl mb-1" style={{ fontFamily: "'Lora', serif" }}>
              {lang === "de" ? "Alle 10 Partner auf der Karte" : "All 10 partners on the map"}
            </p>
            <button className="px-5 py-2.5 rounded-xl bg-[#0F6B3E] text-white text-sm font-semibold flex items-center gap-2">
              {lang === "de" ? "Karte öffnen" : "Open Map"} <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Featured partners — no star ratings */}
      <div className="px-16 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#1A2E1A]" style={{ fontFamily: "'Lora', serif" }}>{t.featuredPartners}</h2>
          <button className="flex items-center gap-2 text-sm font-semibold text-[#0F6B3E]">
            {lang === "de" ? "Alle Partner" : "All partners"} <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {BUSINESSES.slice(0, 4).map((b) => (
            <div key={b.id} className="rounded-2xl bg-white overflow-hidden hover:shadow-xl transition-shadow cursor-pointer" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <div className="relative h-44">
                <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3"><VerifiedBadge small lang={lang} /></div>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                  <Heart size={14} color="#6B7B6B" />
                </button>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-[#1A2E1A] leading-tight mb-1">{lang === "de" ? b.nameDe : b.name}</h4>
                <p className="text-xs text-[#6B7B6B] mb-3">{lang === "de" ? b.categoryDe : b.category} · {b.distance}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {b.badges.slice(0, 2).map((badge) => <Badge key={badge} label={badge} lang={lang} small />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* App CTA */}
      <div className="mx-16 mb-16 rounded-3xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0F6B3E 0%, #1A8C52 100%)", height: 180 }}>
        <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-white/5" style={{ transform: "translate(30%,-30%)" }} />
        <div className="relative z-10 flex items-center justify-between px-16 h-full">
          <div>
            <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Lora', serif" }}>
              {lang === "de" ? "Nimm GreenLoop mit." : "Take GreenLoop with you."}
            </h3>
            <p className="text-white/70">{lang === "de" ? "Für iOS und Android — kostenlos." : "Available for iOS and Android — free to download."}</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 rounded-xl bg-white text-[#0F6B3E] font-bold text-sm">App Store</button>
            <button className="px-6 py-3 rounded-xl font-bold text-sm text-white" style={{ border: "2px solid rgba(255,255,255,0.4)" }}>Google Play</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-16 py-8" style={{ borderTop: "1px solid rgba(15,107,62,0.1)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0F6B3E] flex items-center justify-center">
              <TreePine size={14} color="#fff" />
            </div>
            <span className="font-bold text-[#1A2E1A]" style={{ fontFamily: "'Lora', serif" }}>GreenLoop Bayreuth</span>
          </div>
          <p className="text-xs text-[#6B7B6B]">© 2025 GreenLoop · {lang === "de" ? "Mit ♥ gemacht in Bayreuth" : "Made with ♥ in Bayreuth"}</p>
          <div className="flex gap-4">
            <Instagram size={18} color="#6B7B6B" />
            <Facebook size={18} color="#6B7B6B" />
            <Twitter size={18} color="#6B7B6B" />
          </div>
        </div>
      </footer>
    </DesktopFrame>
  );
}

// Desktop 2: Explore Businesses
function DesktopExplore({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = T[lang];
  const [activeFilter, setActiveFilter] = useState("All");
  return (
    <DesktopFrame>
      <DesktopNav lang={lang} setLang={setLang} />
      <div className="px-16 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#1A2E1A] mb-2" style={{ fontFamily: "'Lora', serif" }}>
              {lang === "de" ? "Partner entdecken" : "Explore Partners"}
            </h1>
            <p className="text-[#6B7B6B]">{lang === "de" ? "10 geprüfte nachhaltige Betriebe in Bayreuth" : "10 verified sustainable businesses in Bayreuth"}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-2xl px-5 py-3 bg-white" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", width: 320 }}>
              <Search size={18} color="#6B7B6B" />
              <span className="text-sm text-[#6B7B6B]">{t.search}</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white text-sm font-semibold text-[#1A2E1A]" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <Filter size={16} />{t.filter}
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-72 flex-shrink-0">
            <div className="rounded-2xl bg-white p-5 sticky top-4" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
              <h3 className="font-bold text-[#1A2E1A] mb-4">{t.category}</h3>
              {(lang === "de"
                ? ["Alle","Essen & Trinken","Mode & Kleidung","Gesundheit & Wellness","Haus & Garten","Dienstleistungen"]
                : ["All","Food & Drink","Fashion & Clothing","Health & Wellness","Home & Garden","Services"]
              ).map((c, i) => (
                <button key={c} onClick={() => setActiveFilter(c)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl mb-1 text-sm font-medium"
                  style={activeFilter === c ? { background: "#E8F5EE", color: "#0F6B3E" } : { color: "#3A4A3A" }}>
                  {c}<ChevronRight size={14} />
                </button>
              ))}
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(15,107,62,0.1)" }}>
                <h3 className="font-bold text-[#1A2E1A] mb-3">{t.sustainability}</h3>
                <div className="flex flex-col gap-2">
                  {BADGES.map((b) => {
                    const Icon = b.icon;
                    return (
                      <label key={b.label} className="flex items-center gap-2.5 cursor-pointer">
                        <div className="w-4 h-4 rounded-md border-2 flex items-center justify-center" style={{ borderColor: "#0F6B3E", background: "#E8F5EE" }}>
                          <Check size={10} color="#0F6B3E" strokeWidth={3} />
                        </div>
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: b.bg }}>
                          <Icon size={12} color={b.color} />
                        </div>
                        <span className="text-sm text-[#3A4A3A]">{lang === "de" ? b.labelDe : b.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Business grid — no star ratings */}
          <div className="flex-1 grid grid-cols-3 gap-6 content-start">
            {BUSINESSES.map((b) => (
              <div key={b.id} className="rounded-2xl bg-white overflow-hidden cursor-pointer hover:shadow-xl transition-shadow" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
                <div className="relative h-40">
                  <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3"><VerifiedBadge small lang={lang} /></div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                    <Heart size={14} color="#6B7B6B" />
                  </button>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-[#1A2E1A] text-sm leading-tight mb-1">{lang === "de" ? b.nameDe : b.name}</h4>
                  <p className="text-xs text-[#6B7B6B] mb-1">{lang === "de" ? b.categoryDe : b.category} · {b.distance}</p>
                  <p className="text-xs text-[#3A4A3A] leading-relaxed mb-3 line-clamp-2">{lang === "de" ? b.descriptionDe : b.description}</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {b.badges.slice(0, 2).map((badge) => <Badge key={badge} label={badge} lang={lang} small />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DesktopFrame>
  );
}

// Desktop 3: Sustainability Criteria & How It Works
function DesktopCriteria({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = T[lang];
  const criteria = [
    { ...BADGES[0], title: lang==="de"?"Zertifiziert Bio":"Certified Organic", desc: lang==="de"?"Produkte erfüllen die EU-Bio-Verordnung. Geprüft von akkreditierten Zertifizierungsstellen. Keine synthetischen Pestizide oder gentechnisch veränderten Organismen.":"Products comply with EU organic regulation. Verified by accredited certification bodies. No synthetic pesticides, GMOs or artificial inputs.", tag: "EU Bio" },
    { ...BADGES[1], title: lang==="de"?"Regionale Herkunft":"Regional Sourcing", desc: lang==="de"?"80 % der Kernzutaten aus einem Umkreis von 100 km rund um Bayreuth. Wir erfassen Lieferketten und prüfen die Partnerbetriebe namentlich.":"80%+ of core ingredients from within 100 km of Bayreuth. We map and verify supply chains with named farm partnerships.", tag: "100 km" },
    { ...BADGES[2], title: lang==="de"?"Fairer Handel":"Fair Trade", desc: lang==="de"?"Fairtrade-, WFTO- oder gleichwertige Zertifizierung, die faire Löhne und Arbeitsbedingungen in der gesamten Lieferkette sicherstellt.":"Holds Fairtrade, WFTO, or equivalent certification ensuring fair wages and conditions throughout the supply chain.", tag: lang==="de"?"Zertifiziert":"Certified" },
    { ...BADGES[3], title: lang==="de"?"100 % Vegan":"100% Vegan", desc: lang==="de"?"Keine tierischen Produkte oder Nebenerzeugnisse. Keine Tierversuche. Geprüft durch Zutatenaudits und Lieferantenerklärungen.":"No animal products or by-products. No animal testing. Verified through ingredient audits and supplier declarations.", tag: lang==="de"?"Zertifiziert":"Certified" },
    { ...BADGES[4], title: lang==="de"?"Nachfüllsystem":"Refill System", desc: lang==="de"?"Bietet Nachfüllbehälter oder Schüttspender an. Kunden können eigene Verpackungen mitbringen — kein Einwegplastik.":"Offers refillable containers or bulk dispensers. Customers can bring their own packaging — zero single-use plastic.", tag: lang==="de"?"Aktiv":"Active" },
    { ...BADGES[5], title: lang==="de"?"Upcycling":"Upcycled", desc: lang==="de"?"Produkte werden aus Abfallströmen oder Vorproduktionsmaterialien hergestellt. Kreislauforientiert — was weggeworfen wurde, wird neu.":"Products made from waste streams or pre-consumer materials. Circular by design.", tag: lang==="de"?"Kreislauf":"Circular" },
    { ...BADGES[6], title: lang==="de"?"Zero Waste":"Zero Waste", desc: lang==="de"?"Zertifiziert Zero Waste oder nachweislich 90 %+ des Betriebsabfalls aus der Deponierung durch Reduktion, Wiederverwendung und Kompostierung umgeleitet.":"Certified Zero Waste or independently verified to divert 90%+ of operational waste from landfill.", tag: "90%+" },
    { ...BADGES[7], title: lang==="de"?"Secondhand":"Second-hand", desc: lang==="de"?"Verkauf von gebrauchten Waren als primäres Geschäftsmodell. Verlängert die Produktlebensdauer und verringert den Bedarf an Neuproduktion.":"Sells pre-owned goods as a primary business model. Extends product lifetimes, reduces new production demand.", tag: lang==="de"?"Wiederverkauf":"Resale" },
  ];
  return (
    <DesktopFrame>
      <DesktopNav lang={lang} setLang={setLang} />
      <div className="px-16 py-16" style={{ background: "linear-gradient(135deg, #0F6B3E 0%, #1A8C52 100%)" }}>
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold mb-6">
            <Shield size={12} />{lang==="de"?"Transparent & unabhängig geprüft":"Transparent & Independently Verified"}
          </div>
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Lora', serif" }}>
            {lang==="de"?"Was macht einen Betrieb GreenLoop Geprüft?":"What makes a business GreenLoop Verified?"}
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            {lang==="de"
              ?"Jedes Badge steht für ein tatsächlich geprüftes Engagement. Wir besuchen, verifizieren und prüfen jeden Betrieb regelmäßig nach."
              :"Every badge represents a real, audited commitment. We visit, verify, and regularly re-audit every business on our platform."}
          </p>
        </div>
      </div>

      <div className="px-16 py-16">
        <h2 className="text-3xl font-bold text-[#1A2E1A] mb-10 text-center" style={{ fontFamily: "'Lora', serif" }}>
          {lang==="de"?"So funktioniert die Verifizierung":"How Verification Works"}
        </h2>
        <div className="grid grid-cols-4 gap-8 mb-16">
          {[
            { step:"01", icon:Search,    title:lang==="de"?"Bewerben":"Apply",   desc:lang==="de"?"Der Betrieb reicht eine Bewerbung ein und beschreibt seine Nachhaltigkeitspraxis und Dokumentation.":"Business submits an application describing their sustainability practices and documentation." },
            { step:"02", icon:Shield,    title:lang==="de"?"Prüfen":"Audit",     desc:lang==="de"?"Unser Team prüft die Unterlagen und führt einen Vor-Ort-Besuch durch, um alle angegebenen Kriterien zu verifizieren.":"Our team reviews documentation and conducts an in-person visit to verify all claimed criteria." },
            { step:"03", icon:Check,     title:lang==="de"?"Bestätigen":"Verify", desc:lang==="de"?"Geprüfte Kriterien erscheinen im Geschäftsprofil mit dem GreenLoop-Geprüft-Badge.":"Verified criteria are listed on the business profile with the GreenLoop Verified badge." },
            { step:"04", icon:TrendingUp,title:lang==="de"?"Verbessern":"Improve",desc:lang==="de"?"Jährliche Nachprüfungen und ein kontinuierlicher Verbesserungspfad, um weitere Kriterien zu erwerben.":"Annual re-audits and a continuous improvement pathway to earn additional criteria over time." },
          ].map(({ step, icon: Icon, title, desc }) => (
            <div key={step} className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl font-bold" style={{ color: "#0F6B3E", fontFamily: "'Lora', serif", opacity: 0.75 }}>{step}</span>
                <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] flex items-center justify-center">
                  <Icon size={20} color="#0F6B3E" />
                </div>
              </div>
              <h3 className="font-bold text-[#1A2E1A] text-lg mb-2">{title}</h3>
              <p className="text-sm text-[#6B7B6B] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-[#1A2E1A] mb-8" style={{ fontFamily: "'Lora', serif" }}>
          {lang==="de"?"Nachhaltigkeitskriterien":"Sustainability Criteria"}
        </h2>
        <div className="grid grid-cols-4 gap-5">
          {criteria.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="rounded-2xl bg-white p-5" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: c.bg }}>
                    <Icon size={22} color={c.color} />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: c.bg, color: c.color }}>{c.tag}</span>
                </div>
                <h4 className="font-bold text-[#1A2E1A] mb-2">{c.title}</h4>
                <p className="text-sm text-[#6B7B6B] leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-16 mb-16 rounded-3xl p-12 flex items-center justify-between" style={{ background: "#E8F5EE" }}>
        <div>
          <h3 className="text-2xl font-bold text-[#1A2E1A] mb-2" style={{ fontFamily: "'Lora', serif" }}>
            {lang==="de"?"Bereit für die Verifizierung?":"Ready to get verified?"}
          </h3>
          <p className="text-[#6B7B6B]">
            {lang==="de"?"Bewirb dich bei GreenLoop und verbinde dich mit Bayreuths nachhaltigkeitsbewusster Community.":"Apply to join GreenLoop and connect with Bayreuth's sustainability-conscious community."}
          </p>
        </div>
        <button className="px-8 py-4 rounded-2xl bg-[#0F6B3E] text-white font-bold text-base flex items-center gap-2">
          {lang==="de"?"Als Betrieb bewerben":"Apply as a Business"} <ArrowRight size={18} />
        </button>
      </div>
    </DesktopFrame>
  );
}

// Desktop 4: About Us
function DesktopAbout({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = T[lang];
  return (
    <DesktopFrame>
      <DesktopNav lang={lang} setLang={setLang} />

      {/* Hero */}
      <div className="relative" style={{ minHeight: 420 }}>
        <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1440&h=500&fit=crop&auto=format"
          alt="Team Bayreuth" className="w-full h-full object-cover absolute inset-0" style={{ height: 420 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,107,62,0.88) 45%, rgba(15,107,62,0.25) 100%)", height: 420 }} />
        <div className="relative z-10 px-16 py-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold mb-6">
            <Leaf size={12} />{lang==="de"?"Ein studentisches Projekt aus Bayreuth":"A student project from Bayreuth"}
          </div>
          <h1 className="text-5xl font-bold text-white mb-5 leading-none" style={{ fontFamily: "'Lora', serif" }}>
            {lang==="de"?"Über uns / Wer wir sind.":"About Us / Who We Are."}
          </h1>
          <p className="text-white/85 text-lg leading-relaxed max-w-lg">
            {lang==="de"
              ?"Lerne unsere Philosophie, Mission und Ziele kennen: GreenLoop macht lokale Nachhaltigkeit sichtbar — transparent, ehrlich, gemeinschaftlich."
              :"Meet our philosophy, mission, and goals: GreenLoop makes local sustainability more visible — transparent, honest, and community-driven."}
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="px-16 py-16 grid grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-bold text-[#0F6B3E] uppercase tracking-widest mb-3">
            {lang==="de"?"Unsere Mission":"Our Mission"}
          </p>
          <h2 className="text-4xl font-bold text-[#1A2E1A] mb-6 leading-tight" style={{ fontFamily: "'Lora', serif" }}>
            {lang==="de"
              ?"Nachhaltigkeit zugänglich machen — nicht durch Zahlen, sondern durch Vertrauen."
              :"Making sustainability accessible — not through numbers, but through trust."}
          </h2>
          <p className="text-[#3A4A3A] leading-relaxed mb-4">
            {lang==="de"
              ?"GreenLoop ist kein Bewertungsportal. Es ist ein Werkzeug zur Entdeckung, das auf echter Prüfung und echter Gemeinschaft aufbaut. Wir glauben, dass Nachhaltigkeit keine Konkurrenz ist — es ist Zusammenarbeit."
              :"GreenLoop is not a ratings platform. It is a discovery tool built on real verification and real community. We believe sustainability is not competition — it is collaboration."}
          </p>
          <p className="text-[#3A4A3A] leading-relaxed">
            {lang==="de"
              ?"Jeder Badge den du in der App siehst repräsentiert ein tatsächlich geprüftes Engagement. Keine Algorithmen, keine bezahlten Platzierungen — nur ehrliche lokale Betriebe."
              :"Every badge you see in the app represents a genuine, audited commitment. No algorithms, no paid placements — just honest local businesses."}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { icon: Shield,   heading: lang==="de"?"Transparenz statt Scoring":"Transparency over scoring",  text: lang==="de"?"Keine Punktezahlen, kein Ranking — nur klare, ehrliche Kriterien.":"No numeric scores, no ranking — just clear, honest criteria." },
            { icon: Users,    heading: lang==="de"?"Gemeinschaft statt Konkurrenz":"Community over competition", text: lang==="de"?"Lokale Betriebe unterstützen sich gegenseitig. Wir feiern alle Bemühungen.":"Local businesses supporting each other. We celebrate every effort." },
            { icon: MapPin,   heading: lang==="de"?"Lokal zuerst":"Local first",               text: lang==="de"?"Bayreuth ist unser Zuhause. Wir kennen jeden unserer Partner persönlich.":"Bayreuth is our home. We know every partner personally." },
            { icon: BookOpen, heading: lang==="de"?"Bildung & Bewusstsein":"Education & awareness",        text: lang==="de"?"Wir erklären, was Nachhaltigkeit wirklich bedeutet — klar und ohne Jargon.":"We explain what sustainability really means — clearly and without jargon." },
          ].map(({ icon: Icon, heading, text }) => (
            <div key={heading} className="flex gap-4 rounded-2xl bg-white p-5" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div className="w-11 h-11 rounded-xl bg-[#E8F5EE] flex items-center justify-center flex-shrink-0">
                <Icon size={20} color="#0F6B3E" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A2E1A] mb-1">{heading}</h4>
                <p className="text-sm text-[#6B7B6B] leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team / project section */}
      <div className="px-16 pb-16" style={{ background: "#FFFFFF" }}>
        <div className="pt-14 pb-10">
          <h2 className="text-3xl font-bold text-[#1A2E1A] mb-3" style={{ fontFamily: "'Lora', serif" }}>
            {lang==="de"?"Entstanden an der Uni Bayreuth":"Created at the University of Bayreuth"}
          </h2>
          <p className="text-[#6B7B6B] max-w-2xl leading-relaxed">
            {lang==="de"
              ?"GreenLoop ist ein studentisches Projekt, das zeigen will, wie Design, Technologie und lokales Engagement gemeinsam echte Veränderung anstoßen können."
              :"GreenLoop is a student project demonstrating how design, technology, and local engagement can together spark real change."}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {[
            { img:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&auto=format", name:"Lisa Sebald", role:lang==="de"?"UX Design & Forschung":"UX Design & Research" },
            { img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&auto=format", name:"Yunru Luo",  role:lang==="de"?"Produktstrategie":"Product Strategy" },
            { img:"https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&h=120&fit=crop&auto=format", name:"Daria Luneva", role:lang==="de"?"Partnerschaften & Community":"Partnerships & Community" },
          ].map(({ img, name, role }) => (
            <div key={name} className="flex flex-col items-center text-center rounded-2xl p-6" style={{ background: "#FBF7EF" }}>
              <img src={img} alt={name} className="w-20 h-20 rounded-2xl object-cover mb-4" />
              <p className="font-bold text-[#1A2E1A]">{name}</p>
              <p className="text-sm text-[#6B7B6B] mt-1">{role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mx-16 mb-16 rounded-3xl p-12 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #0F6B3E 0%, #1A8C52 100%)" }}>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Lora', serif" }}>
            {lang==="de"?"Mach mit — als Partner oder als Nutzer.":"Join us — as a partner or a user."}
          </h3>
          <p className="text-white/70">
            {lang==="de"
              ?"Wir freuen uns über jeden, der Bayreuth nachhaltiger und lebenswerter machen will."
              :"We welcome everyone who wants to make Bayreuth more sustainable and liveable."}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 rounded-xl bg-white text-[#0F6B3E] font-bold text-sm">
            {lang==="de"?"Mehr erfahren":"Learn More"}
          </button>
          <button className="px-6 py-3 rounded-xl font-bold text-sm text-white" style={{ border: "2px solid rgba(255,255,255,0.4)" }}>
            {lang==="de"?"App laden":"Get the App"}
          </button>
        </div>
      </div>
    </DesktopFrame>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

const MOBILE_SCREENS = [
  { id:"welcome",       label:"Welcome / Onboarding",    labelDe:"Willkommen" },
  { id:"home",          label:"Home",                    labelDe:"Start" },
  { id:"map",           label:"Map Explore",             labelDe:"Karte" },
  { id:"discover",      label:"Discover",                labelDe:"Entdecken" },
  { id:"filter",        label:"Filter Panel",            labelDe:"Filter" },
  { id:"biz-profile",   label:"Business Profile",        labelDe:"Geschäftsprofil" },
  { id:"sustain",       label:"Sustainability Info",     labelDe:"Nachhaltigkeitsinfos" },
  { id:"offer",         label:"First Visit Offer",       labelDe:"Erstbesuchs-Angebot" },
  { id:"community",     label:"Community / Events",      labelDe:"Community" },
  { id:"profile",       label:"Profile / Settings",      labelDe:"Profil & Einstellungen" },
];

const DESKTOP_SCREENS = [
  { id:"d-home",    label:"Home / Landing",          labelDe:"Startseite" },
  { id:"d-explore", label:"Explore Businesses",      labelDe:"Partner entdecken" },
  { id:"d-criteria",label:"Sustainability Criteria", labelDe:"Nachhaltigkeitskriterien" },
  { id:"d-about",   label:"About Us",                labelDe:"Über uns" },
];

export default function App() {
  const [tab, setTab] = useState<"mobile" | "desktop">("mobile");
  const [mobileIdx, setMobileIdx] = useState(0);
  const [desktopIdx, setDesktopIdx] = useState(0);
  const [lang, setLang] = useState<Lang>("en");

  const screenId = MOBILE_SCREENS[mobileIdx].id;
  const dScreenId = DESKTOP_SCREENS[desktopIdx].id;

  const mobileScreen = () => {
    switch (screenId) {
      case "welcome":     return <ScreenWelcome lang={lang} setLang={setLang} />;
      case "home":        return <ScreenHome lang={lang} />;
      case "map":         return <ScreenMap lang={lang} />;
      case "discover":    return <ScreenDiscover lang={lang} />;
      case "filter":      return <ScreenFilter lang={lang} />;
      case "biz-profile": return <ScreenBusinessProfile lang={lang} />;
      case "sustain":     return <ScreenSustainabilityInfo lang={lang} />;
      case "offer":       return <ScreenOffer lang={lang} />;
      case "community":   return <ScreenCommunity lang={lang} />;
      case "profile":     return <ScreenProfile lang={lang} setLang={setLang} />;
      default:            return null;
    }
  };

  const desktopScreen = () => {
    switch (dScreenId) {
      case "d-home":     return <DesktopHome lang={lang} setLang={setLang} />;
      case "d-explore":  return <DesktopExplore lang={lang} setLang={setLang} />;
      case "d-criteria": return <DesktopCriteria lang={lang} setLang={setLang} />;
      case "d-about":    return <DesktopAbout lang={lang} setLang={setLang} />;
      default:           return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#F0EBE0", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(15,107,62,0.1)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#0F6B3E] flex items-center justify-center">
            <TreePine size={16} color="#fff" />
          </div>
          <span className="font-bold text-[#1A2E1A] text-lg" style={{ fontFamily: "'Lora', serif" }}>GreenLoop</span>
          <span className="text-xs text-[#6B7B6B] font-medium">UI Kit · Bayreuth</span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "#F0EBE0" }}>
          <button onClick={() => setTab("mobile")} className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            style={tab === "mobile" ? { background: "#fff", color: "#0F6B3E", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" } : { color: "#6B7B6B" }}>
            📱 Mobile · {MOBILE_SCREENS.length} screens
          </button>
          <button onClick={() => setTab("desktop")} className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            style={tab === "desktop" ? { background: "#fff", color: "#0F6B3E", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" } : { color: "#6B7B6B" }}>
            🖥 Desktop · {DESKTOP_SCREENS.length} pages
          </button>
        </div>

        {/* Global language switcher */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6B7B6B]">{lang === "de" ? "Sprache:" : "Language:"}</span>
          <div className="flex rounded-xl overflow-hidden" style={{ border: "1.5px solid rgba(15,107,62,0.2)" }}>
            {(["en","de"] as Lang[]).map((l) => (
              <button key={l} onClick={() => setLang(l)} className="px-3 py-1.5 text-xs font-bold transition-all"
                style={lang === l ? { background: "#0F6B3E", color: "#fff" } : { color: "#6B7B6B" }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {tab === "mobile" && (
        <div className="flex" style={{ minHeight: "calc(100vh - 65px)" }}>
          {/* Screen list */}
          <div className="w-52 flex-shrink-0 py-6 px-4" style={{ background: "#FFFFFF", borderRight: "1px solid rgba(15,107,62,0.1)" }}>
            <p className="text-[10px] font-bold text-[#6B7B6B] uppercase tracking-widest px-2 mb-3">
              {lang === "de" ? "App-Screens" : "Mobile Screens"}
            </p>
            {MOBILE_SCREENS.map((s, i) => (
              <button key={s.id} onClick={() => setMobileIdx(i)}
                className="w-full text-left px-3 py-2.5 rounded-xl mb-1 text-sm transition-all"
                style={mobileIdx === i ? { background: "#E8F5EE", color: "#0F6B3E", fontWeight: 600 } : { color: "#3A4A3A" }}>
                <span className="text-[10px] text-[#6B7B6B] block">{String(i + 1).padStart(2, "0")}</span>
                {lang === "de" ? s.labelDe : s.label}
              </button>
            ))}
          </div>

          {/* Canvas */}
          <div className="flex-1 flex items-start justify-center py-10 px-8 overflow-auto">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-3">
                <button onClick={() => setMobileIdx((i) => (i - 1 + MOBILE_SCREENS.length) % MOBILE_SCREENS.length)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-white" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  <ChevronLeft size={18} color="#1A2E1A" />
                </button>
                <span className="text-sm font-semibold text-[#1A2E1A]">
                  {lang === "de" ? MOBILE_SCREENS[mobileIdx].labelDe : MOBILE_SCREENS[mobileIdx].label}
                </span>
                <button onClick={() => setMobileIdx((i) => (i + 1) % MOBILE_SCREENS.length)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-white" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  <ChevronRight size={18} color="#1A2E1A" />
                </button>
              </div>

              {mobileScreen()}

              <div className="flex gap-2 flex-wrap justify-center max-w-2xl">
                {MOBILE_SCREENS.map((s, i) => (
                  <button key={s.id} onClick={() => setMobileIdx(i)}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all"
                    style={mobileIdx === i ? { background: "#0F6B3E", color: "#fff" } : { background: "#fff", color: "#6B7B6B", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                    {i + 1}. {lang === "de" ? s.labelDe : s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "desktop" && (
        <div className="flex" style={{ minHeight: "calc(100vh - 65px)" }}>
          {/* Screen list */}
          <div className="w-52 flex-shrink-0 py-6 px-4" style={{ background: "#FFFFFF", borderRight: "1px solid rgba(15,107,62,0.1)" }}>
            <p className="text-[10px] font-bold text-[#6B7B6B] uppercase tracking-widest px-2 mb-3">
              {lang === "de" ? "Website-Seiten" : "Desktop Pages"}
            </p>
            {DESKTOP_SCREENS.map((s, i) => (
              <button key={s.id} onClick={() => setDesktopIdx(i)}
                className="w-full text-left px-3 py-2.5 rounded-xl mb-1 text-sm transition-all"
                style={desktopIdx === i ? { background: "#E8F5EE", color: "#0F6B3E", fontWeight: 600 } : { color: "#3A4A3A" }}>
                <span className="text-[10px] text-[#6B7B6B] block">{String(i + 1).padStart(2, "0")}</span>
                {lang === "de" ? s.labelDe : s.label}
              </button>
            ))}
          </div>

          {/* Canvas */}
          <div className="flex-1 flex flex-col items-center py-10 px-8 overflow-auto">
            <div className="flex items-center gap-3 mb-8">
              <button onClick={() => setDesktopIdx((i) => (i - 1 + DESKTOP_SCREENS.length) % DESKTOP_SCREENS.length)}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <ChevronLeft size={18} color="#1A2E1A" />
              </button>
              <span className="text-sm font-semibold text-[#1A2E1A]">
                {lang === "de" ? DESKTOP_SCREENS[desktopIdx].labelDe : DESKTOP_SCREENS[desktopIdx].label}
              </span>
              <button onClick={() => setDesktopIdx((i) => (i + 1) % DESKTOP_SCREENS.length)}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <ChevronRight size={18} color="#1A2E1A" />
              </button>
            </div>

            <div style={{ transform: "scale(0.72)", transformOrigin: "top center", marginBottom: -240 }}>
              {desktopScreen()}
            </div>

            <div className="flex gap-2 flex-wrap justify-center mt-8">
              {DESKTOP_SCREENS.map((s, i) => (
                <button key={s.id} onClick={() => setDesktopIdx(i)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={desktopIdx === i ? { background: "#0F6B3E", color: "#fff" } : { background: "#fff", color: "#6B7B6B", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                  {i + 1}. {lang === "de" ? s.labelDe : s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
