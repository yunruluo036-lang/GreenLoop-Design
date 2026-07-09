import { useState } from "react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import {
  Leaf, MapPin, Search, ChevronRight, ChevronLeft,
  Heart, Home, Compass, User, Bell, Filter, X, Check,
  Calendar, Users, ArrowRight, Package, Recycle,
  ShoppingBag, Droplets, Globe, Award,
  Instagram, Facebook, Twitter, Phone, Clock,
  TrendingUp, Shield, Sparkles,
  MessageSquare, Languages, Settings, BookOpen, Info, Menu
} from "lucide-react";

// ─── i18n ─────────────────────────────────────────────────────────────────────

const T = {
  en: {
    discover: "Discover", explore: "Explore", map: "Map", community: "Community",
    profile: "Profile", home: "Home", filter: "Filter", search: "Search businesses…",
    verifiedCriteria: "Verified Criteria",
    sustainabilityInfo: "Sustainability Info", firstVisitOffer: "Your First Visit Offer",
    showAt: "Show this offer at", freeHotDrink: "One free hot drink", freeHotDrinkSub: "on your first visit",
    scanCheckout: "Scan at the counter to redeem your welcome gift",
    validUntil: "Valid for your first visit · Single use",
    reviews: "What visitors say", writeReview: "Share your experience…",
    ownerWord: "Owner's Message", openNow: "Open now",
    savedPlaces: "Saved Places", language: "Language", settings: "Settings",
    getDirections: "Get Directions", share: "Share", seeAll: "See all",
    featuredPartners: "Featured Partners", nearYou: "Near You",
    goodMorning: "Good morning,", welcomeBack: "Welcome to GreenLoop",
    welcomeSub: "Discover sustainable local shops, cafés, restaurants, and makers.",
    aboutUs: "About Us", howItWorks: "How It Works",
    signIn: "Sign in", getApp: "Get the App",
    showResults: "Show Results", resetAll: "Reset all", distance: "Distance",
    category: "Category", sustainability: "Sustainability", rating: "Rating",
    memberSince: "Member since 2024", greenCitizen: "🌿 Green Citizen",
    saved: "Saved", badgesEarned: "Exploration Badges",
    viewAll: "View all", contact: "Contact",
  },
  de: {
    discover: "Entdecken", explore: "Erkunden", map: "Karte", community: "Community",
    profile: "Profil", home: "Start", filter: "Filter", search: "Geschäfte suchen…",
    verifiedCriteria: "Geprüfte Kriterien",
    sustainabilityInfo: "Nachhaltigkeitsinfos", firstVisitOffer: "Dein Erstbesuchs-Angebot",
    showAt: "Zeig das bei", freeHotDrink: "Ein heißes Getränk gratis", freeHotDrinkSub: "bei deinem ersten Besuch",
    scanCheckout: "Zeig den Code an der Theke und erhalte dein Willkommensgeschenk",
    validUntil: "Gültig bis 31. Aug 2025 · Einmalig einlösbar",
    reviews: "Was Besucher sagen", writeReview: "Teile deine Erfahrung…",
    ownerWord: "Nachricht der Inhaber:innen", openNow: "Jetzt geöffnet",
    savedPlaces: "Gespeicherte Orte", language: "Sprache", settings: "Einstellungen",
    getDirections: "Route", share: "Teilen", seeAll: "Alle sehen",
    featuredPartners: "Unsere Partner", nearYou: "In deiner Nähe",
    goodMorning: "Guten Morgen,", welcomeBack: "Willkommen bei GreenLoop",
    welcomeSub: "Entdecke nachhaltige lokale Läden, Cafés, Restaurants und Macher.",
    aboutUs: "Über uns", howItWorks: "So funktioniert's",
    signIn: "Anmelden", getApp: "App laden",
    showResults: "Ergebnisse anzeigen", resetAll: "Alle zurücksetzen", distance: "Entfernung",
    category: "Kategorie", sustainability: "Nachhaltigkeit", rating: "Bewertung",
    memberSince: "Mitglied seit 2024", greenCitizen: "🌿 Grüner Bürger",
    saved: "Gespeichert", badgesEarned: "Entdeckungs-Badges",
    viewAll: "Alle ansehen", contact: "Kontakt",
  },
};
type Lang = "en" | "de";

const GREENLOOP_LOGO_SRC = "/greenloop-logo.png";

function GreenLoopLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src={GREENLOOP_LOGO_SRC}
      alt="GreenLoop logo"
      className={`object-contain ${className}`}
    />
  );
}

// ─── Shared Data ─────────────────────────────────────────────────────────────

const LABEL_COLORS: Record<string, { bg: string; color: string }> = {
  "Vegan Options": { bg: "#E7F6EC", color: "#176B3A" },
  "Vegetarian Options": { bg: "#DFF4EA", color: "#145F45" },
  "Regional Ingredients": { bg: "#FBE8D3", color: "#8A4B16" },
  "Seasonal Products": { bg: "#F8DDE0", color: "#9A2F35" },
  Organic: { bg: "#EAF6DA", color: "#2F6D25" },
  "Fair Trade": { bg: "#F7EFCB", color: "#6D5720" },
  "Reusable Packaging": { bg: "#DDF3EF", color: "#126D63" },
  "Plastic-Free": { bg: "#DCECF8", color: "#1D5F8D" },
  "Refill Station": { bg: "#D9F4F4", color: "#08747A" },
  "Socially Responsible": { bg: "#ECE4F6", color: "#5D3A8A" },
};

const labelColor = (label: string) => LABEL_COLORS[label] ?? { bg: "#E8F5EE", color: "#0F6B3E" };

const BADGES = [
  { label: "Vegan Options", labelDe: "Vegane Optionen", icon: Sparkles, emoji: "🌱", ...labelColor("Vegan Options") },
  { label: "Vegetarian Options", labelDe: "Vegetarische Optionen", icon: Leaf, emoji: "🥗", ...labelColor("Vegetarian Options") },
  { label: "Regional Ingredients", labelDe: "Regionale Zutaten", icon: MapPin, emoji: "🥕", ...labelColor("Regional Ingredients") },
  { label: "Seasonal Products", labelDe: "Saisonale Produkte", icon: Calendar, emoji: "🍎", ...labelColor("Seasonal Products") },
  { label: "Organic", labelDe: "Bio", icon: Leaf, emoji: "🌾", ...labelColor("Organic") },
  { label: "Fair Trade", labelDe: "Fair Trade", icon: Globe, emoji: "☕", ...labelColor("Fair Trade") },
  { label: "Reusable Packaging", labelDe: "Mehrwegverpackung", icon: Recycle, emoji: "♻️", ...labelColor("Reusable Packaging") },
  { label: "Plastic-Free", labelDe: "Plastikfrei", icon: Package, emoji: "🚫", ...labelColor("Plastic-Free") },
  { label: "Refill Station", labelDe: "Nachfüllstation", icon: Droplets, emoji: "🔄", ...labelColor("Refill Station") },
  { label: "Socially Responsible", labelDe: "Sozial verantwortlich", icon: Users, emoji: "🤝", ...labelColor("Socially Responsible") },
];

const SUSTAINABILITY_FILTERS = [
  ...BADGES,
];

// Bayreuth partner businesses
const BUSINESSES = [
  {
    id: 1,
    name: "Vedans Fresh ’n’ Healthy",
    nameDe: "Vedans Fresh ’n’ Healthy",
    category: "Vegan / Vegetarian Food",
    categoryDe: "Veganes / Vegetarisches Essen",
    address: "Richard-Wagner-Str. 26, 95444 Bayreuth",
    phone: "Contact details coming soon",
    email: "Profile details coming soon",
    distance: "0.2 km",
    badges: ["Vegan Options", "Vegetarian Options", "Regional Ingredients", "Seasonal Products", "Organic", "Reusable Packaging"],
    verified: true,
    image: "/shops/vedans.jpg",
    description: "Vegan and vegetarian food, fresh bowls, smoothies, and healthy meals in Bayreuth city centre.",
    descriptionDe: "Veganes und vegetarisches Essen, frische Bowls, Smoothies und gesunde Mahlzeiten in der Bayreuther Innenstadt.",
    ownerQuote: "We want fresh vegan and vegetarian food to feel easy, nourishing, and welcoming in everyday city life.",
    ownerQuoteDe: "Wir möchten, dass frisches, pflanzenbetontes Essen im Alltag einfach, nährend und einladend ist.",
    ownerName: "The Vedans Team",
    ownerNameDe: "Inhaber:in",
    hours: "Mon–Sun: 09:30–20:30",
    offer: "Show your GreenLoop profile when you visit",
    offerDe: "Zeige dein GreenLoop-Profil bei deinem Besuch",
    reviews: [
      { author: "GreenLoop note", text: "Fresh, friendly, and a great option for a healthy lunch in the city centre.", textDe: "Frisch, freundlich und eine tolle Option für ein gesundes Mittagessen in der Innenstadt." },
    ],
    mapX: 282, mapY: 275,
  },
  {
    id: 2,
    name: "Café Freudenherz",
    nameDe: "Café Freudenherz",
    category: "Café & Concept Store",
    categoryDe: "Café & Concept Store",
    address: "Sophienstraße 2, 95444 Bayreuth",
    phone: "Contact details coming soon",
    email: "Profile details coming soon",
    distance: "0.3 km",
    badges: ["Vegetarian Options", "Vegan Options", "Fair Trade", "Regional Ingredients", "Socially Responsible"],
    verified: true,
    image: "/shops/freudenherz.jpg",
    description: "Café, fair fashion, gifts, and selected sustainable and regional products.",
    descriptionDe: "Café, faire Mode, Geschenke sowie ausgewählte nachhaltige und regionale Produkte.",
    ownerQuote: "Our concept brings coffee, fair fashion, gifts, and regional products together in one warm place for conscious choices.",
    ownerQuoteDe: "Unser Konzept verbindet Kaffee, faire Mode, Geschenke und regionale Produkte an einem warmen Ort für bewusste Entscheidungen.",
    ownerName: "Owner",
    ownerNameDe: "Inhaber:in",
    hours: "Mon–Fri: 11:00–18:00\nSat: 10:00–18:00\nSun: Closed",
    offer: "Show your GreenLoop profile when you visit",
    offerDe: "Zeige dein GreenLoop-Profil bei deinem Besuch",
    reviews: [
      { author: "GreenLoop", text: "Profile ready for verified community notes.", textDe: "Profil bereit für geprüfte Community-Notizen." },
    ],
    mapX: 190, mapY: 236,
  },
  {
    id: 3,
    name: "Die Hamsterbacke",
    nameDe: "Die Hamsterbacke",
    category: "Community / Sustainable Food",
    categoryDe: "Community / Nachhaltige Lebensmittel",
    address: "Hohenzollernring 67, 95444 Bayreuth",
    phone: "Contact details coming soon",
    email: "Profile details coming soon",
    distance: "0.8 km",
    badges: ["Regional Ingredients", "Organic", "Plastic-Free", "Reusable Packaging", "Refill Station", "Socially Responsible", "Seasonal Products"],
    verified: true,
    image: "/shops/hamsterbacke.jpg",
    description: "Local community space with sustainable food and low-waste values.",
    descriptionDe: "Lokaler Community-Ort mit nachhaltigen Lebensmitteln und Low-Waste-Werten.",
    ownerQuote: "Community and low-waste values belong together: good food should connect people and make sustainable habits easier.",
    ownerQuoteDe: "Community und Low-Waste-Werte gehören zusammen: Gutes Essen soll Menschen verbinden und nachhaltige Gewohnheiten erleichtern.",
    ownerName: "Owner",
    ownerNameDe: "Inhaber:in",
    hours: "Mon: Closed\nTue–Fri: 09:30–19:00\nSat: 09:30–15:00\nSun: Closed",
    offer: "Show your GreenLoop profile when you visit",
    offerDe: "Zeige dein GreenLoop-Profil bei deinem Besuch",
    reviews: [
      { author: "GreenLoop", text: "Profile ready for verified community notes.", textDe: "Profil bereit für geprüfte Community-Notizen." },
    ],
    mapX: 105, mapY: 330,
  },
  {
    id: 4,
    name: "Der Weltladen Bayreuth",
    nameDe: "Der Weltladen Bayreuth",
    category: "Fair Trade",
    categoryDe: "Fair Trade",
    address: "Ludwigstraße 5, 95444 Bayreuth",
    phone: "Contact details coming soon",
    email: "Profile details coming soon",
    distance: "0.4 km",
    badges: ["Fair Trade", "Socially Responsible", "Reusable Packaging"],
    verified: true,
    image: "/shops/weltladen.jpg",
    description: "Fair-trade products, ethical consumption, and global responsibility.",
    descriptionDe: "Fair-Trade-Produkte, ethischer Konsum und globale Verantwortung.",
    ownerQuote: "Fair trade is about respect across the whole supply chain, from producers to the people choosing these products here.",
    ownerQuoteDe: "Fairer Handel bedeutet Respekt entlang der gesamten Lieferkette, von den Produzent:innen bis zu den Menschen, die hier einkaufen.",
    ownerName: "Owner",
    ownerNameDe: "Inhaber:in",
    hours: "Mon–Fri: 10:00–18:00\nSat: 10:00–15:00\nSun: Closed",
    offer: "Show your GreenLoop profile when you visit",
    offerDe: "Zeige dein GreenLoop-Profil bei deinem Besuch",
    reviews: [
      { author: "GreenLoop", text: "Profile ready for verified community notes.", textDe: "Profil bereit für geprüfte Community-Notizen." },
    ],
    mapX: 205, mapY: 280,
  },
  {
    id: 5,
    name: "Lemon Tree",
    nameDe: "Lemon Tree",
    category: "Vegan Food / Fair Fashion",
    categoryDe: "Veganes Essen / Faire Mode",
    address: "Sophienstraße 28/30, 95444 Bayreuth",
    phone: "Contact details coming soon",
    email: "Profile details coming soon",
    distance: "0.5 km",
    badges: ["Vegan Options", "Fair Trade", "Socially Responsible", "Plastic-Free"],
    verified: true,
    image: "/shops/lemontree.jpg",
    description: "Vegan food, fair fashion, and sustainable lifestyle products.",
    descriptionDe: "Veganes Essen, faire Mode und nachhaltige Lifestyle-Produkte.",
    ownerQuote: "We curate food, fashion, and lifestyle products that make a more sustainable routine feel beautiful and practical.",
    ownerQuoteDe: "Wir kuratieren Essen, Mode und Lifestyle-Produkte, die nachhaltigere Routinen schön und praktisch machen.",
    ownerName: "Owner",
    ownerNameDe: "Inhaber:in",
    hours: "Mon: Closed\nTue–Fri: 10:00–18:00\nSat: 10:00–15:00\nSun: Closed",
    offer: "Show your GreenLoop profile when you visit",
    offerDe: "Zeige dein GreenLoop-Profil bei deinem Besuch",
    reviews: [
      { author: "GreenLoop", text: "Profile ready for verified community notes.", textDe: "Profil bereit für geprüfte Community-Notizen." },
    ],
    mapX: 170, mapY: 255,
  },
  {
    id: 6,
    name: "Reformhaus Sattran GmbH",
    nameDe: "Reformhaus Sattran GmbH",
    category: "Health Food Store",
    categoryDe: "Reformhaus / Naturkost",
    address: "Hohenzollernring 58, 95444 Bayreuth",
    phone: "Contact details coming soon",
    email: "Profile details coming soon",
    distance: "0.7 km",
    badges: ["Organic", "Vegan Options", "Vegetarian Options", "Regional Ingredients", "Seasonal Products"],
    verified: true,
    image: "/shops/reformhaus-sattran.jpg",
    description: "Organic, natural, and health-oriented products.",
    descriptionDe: "Bio-, Natur- und gesundheitsorientierte Produkte.",
    ownerQuote: "Health-conscious shopping works best when natural, organic, and carefully selected products are easy to understand.",
    ownerQuoteDe: "Gesundheitsbewusstes Einkaufen gelingt am besten, wenn natürliche, biologische und sorgfältig ausgewählte Produkte verständlich sind.",
    ownerName: "Owner",
    ownerNameDe: "Inhaber:in",
    hours: "Mon–Sat: 09:00–19:00\nSun: Closed",
    offer: "Show your GreenLoop profile when you visit",
    offerDe: "Zeige dein GreenLoop-Profil bei deinem Besuch",
    reviews: [
      { author: "GreenLoop", text: "Profile ready for verified community notes.", textDe: "Profil bereit für geprüfte Community-Notizen." },
    ],
    mapX: 120, mapY: 315,
  },
  {
    id: 7,
    name: "VerSTOFFlicht",
    nameDe: "VerSTOFFlicht",
    category: "Fabric / Sewing / Handmade",
    categoryDe: "Stoff / Nähen / Handgemacht",
    address: "Sophienstraße 21, 95444 Bayreuth",
    phone: "Contact details coming soon",
    email: "Profile details coming soon",
    distance: "0.4 km",
    badges: ["Reusable Packaging", "Socially Responsible", "Plastic-Free"],
    verified: true,
    image: "/shops/verstofflicht.jpg",
    description: "Fabrics, handmade goods, repair-oriented making, and creative sustainable consumption.",
    descriptionDe: "Stoffe, handgemachte Produkte, reparaturorientiertes Gestalten und kreativer nachhaltiger Konsum.",
    ownerQuote: "Making, repairing, and choosing quality materials helps people value what they own and keep it in use longer.",
    ownerQuoteDe: "Selbermachen, Reparieren und hochwertige Materialien helfen Menschen, Dinge wertzuschätzen und länger zu nutzen.",
    ownerName: "Owner",
    ownerNameDe: "Inhaber:in",
    hours: "Mon: Closed\nTue–Fri: 14:00–18:00\nSat: 10:00–16:00\nSun: Closed",
    offer: "Show your GreenLoop profile when you visit",
    offerDe: "Zeige dein GreenLoop-Profil bei deinem Besuch",
    reviews: [
      { author: "GreenLoop", text: "Profile ready for verified community notes.", textDe: "Profil bereit für geprüfte Community-Notizen." },
    ],
    mapX: 178, mapY: 246,
  },
  {
    id: 8,
    name: "Atelier Förster-Oetter",
    nameDe: "Atelier Förster-Oetter",
    category: "Atelier / Jewelry / Craft",
    categoryDe: "Atelier / Schmuck / Handwerk",
    address: "Hinter der Kirche 9, 95448 Bayreuth",
    phone: "Contact details coming soon",
    email: "Profile details coming soon",
    distance: "1.2 km",
    badges: ["Socially Responsible", "Reusable Packaging", "Regional Ingredients"],
    verified: true,
    image: "/shops/atelier-foerster-oetter.jpg",
    description: "Local craft, handmade design, and long-lasting products.",
    descriptionDe: "Lokales Handwerk, handgemachtes Design und langlebige Produkte.",
    ownerQuote: "Local craft is about patience, repair, and pieces that are made to be worn, cared for, and kept.",
    ownerQuoteDe: "Lokales Handwerk steht für Geduld, Reparatur und Stücke, die getragen, gepflegt und bewahrt werden.",
    ownerName: "Owner",
    ownerNameDe: "Inhaber:in",
    hours: "Mon, Wed: 09:00–12:00\nTue, Thu: By appointment\nFri: 13:00–18:00\nSat–Sun: Closed",
    offer: "Show your GreenLoop profile when you visit",
    offerDe: "Zeige dein GreenLoop-Profil bei deinem Besuch",
    reviews: [
      { author: "GreenLoop", text: "Profile ready for verified community notes.", textDe: "Profil bereit für geprüfte Community-Notizen." },
    ],
    mapX: 320, mapY: 355,
  },
  {
    id: 9,
    name: "TeeGschwendner Bayreuth",
    nameDe: "TeeGschwendner Bayreuth",
    category: "Tea Shop",
    categoryDe: "Teeladen",
    address: "Maximilianstraße 75, 95444 Bayreuth",
    phone: "Contact details coming soon",
    email: "Profile details coming soon",
    distance: "0.5 km",
    badges: ["Fair Trade", "Organic", "Reusable Packaging", "Socially Responsible"],
    verified: true,
    image: "/shops/teegschwendner.jpg",
    description: "Tea, selected quality products, and responsible consumption.",
    descriptionDe: "Tee, ausgewählte Qualitätsprodukte und verantwortungsvoller Konsum.",
    ownerQuote: "Responsible consumption starts with thoughtful selection, quality products, and the time to choose well.",
    ownerQuoteDe: "Verantwortungsvoller Konsum beginnt mit sorgfältiger Auswahl, Qualität und der Zeit, bewusst zu wählen.",
    ownerName: "Owner",
    ownerNameDe: "Inhaber:in",
    hours: "Mon–Fri: 09:30–18:00\nSat: 09:30–16:00\nSun: Closed",
    offer: "Show your GreenLoop profile when you visit",
    offerDe: "Zeige dein GreenLoop-Profil bei deinem Besuch",
    reviews: [
      { author: "GreenLoop", text: "Profile ready for verified community notes.", textDe: "Profil bereit für geprüfte Community-Notizen." },
    ],
    mapX: 142, mapY: 272,
  },
  {
    id: 10,
    name: "André Hagen – Der Optiker",
    nameDe: "André Hagen – Der Optiker",
    category: "Optician",
    categoryDe: "Optiker",
    address: "Richard-Wagner-Straße 32, 95444 Bayreuth",
    phone: "Contact details coming soon",
    email: "Profile details coming soon",
    distance: "0.3 km",
    badges: ["Reusable Packaging", "Socially Responsible"],
    verified: true,
    image: "/shops/andre-hagen-optiker.jpg",
    description: "Local service, repair, long-lasting eyewear, and responsible consumption.",
    descriptionDe: "Lokaler Service, Reparatur, langlebige Brillen und verantwortungsvoller Konsum.",
    ownerQuote: "Good eyewear should last. Careful local service and repair help customers keep the right pair for longer.",
    ownerQuoteDe: "Gute Brillen sollen lange halten. Sorgfältiger lokaler Service und Reparatur helfen, die passende Brille länger zu nutzen.",
    ownerName: "Owner",
    ownerNameDe: "Inhaber:in",
    hours: "Mon: Closed\nTue–Fri: 09:00–18:00\nSat: 10:00–15:00\nSun: Closed",
    offer: "Show your GreenLoop profile when you visit",
    offerDe: "Zeige dein GreenLoop-Profil bei deinem Besuch",
    reviews: [
      { author: "GreenLoop", text: "Profile ready for verified community notes.", textDe: "Profil bereit für geprüfte Community-Notizen." },
    ],
    mapX: 296, mapY: 286,
  },
];

const EVENTS = [
  {
    id: 1,
    title: "Business of the Month",
    titleDe: "Business of the Month",
    description: "A monthly feature highlighting one local GreenLoop partner and their sustainability story.",
    descriptionDe: "Ein monatliches Feature über einen lokalen GreenLoop-Partner und seine Nachhaltigkeitsgeschichte.",
    date: "Monthly", time: "Feature",
    location: "GreenLoop partners",
    category: "Feature",
    image: "/shops/vedans.jpg",
  },
  {
    id: 2,
    title: "Green Week",
    titleDe: "Green Week",
    description: "A week of sustainable shopping, local activities, and special offers from GreenLoop partners.",
    descriptionDe: "Eine Community-Eventwoche mit nachhaltigem Einkaufen, lokalen Aktivitäten und besonderen Angeboten von GreenLoop-Partnern.",
    date: "Community event", time: "All week",
    location: "GreenLoop partners",
    category: "Community",
    image: "/maps/map.png",
  },
  {
    id: 3,
    title: "Jewelry Workshop at Atelier Förster-Oetter",
    titleDe: "Schmuckworkshop bei Atelier Förster-Oetter",
    description: "A hands-on jewelry workshop hosted by Atelier Förster-Oetter, focused on local craft, repair, and long-lasting design.",
    descriptionDe: "Ein praktischer Schmuckworkshop bei Atelier Förster-Oetter mit Fokus auf lokalem Handwerk, Reparatur und langlebigem Design.",
    date: "Workshop", time: "Details coming soon",
    location: "Atelier Förster-Oetter",
    category: "Workshop",
    image: "/shops/atelier-foerster-oetter.jpg",
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
      <rect x="88" y="88" width="34" height="34" rx="5" fill="white"/>
      <image href={GREENLOOP_LOGO_SRC} x="91" y="91" width="28" height="28" preserveAspectRatio="xMidYMid meet" />
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

        <div className="flex flex-col items-center text-center mt-22">
          <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center mb-6 shadow-xl p-3">
            <GreenLoopLogo className="w-full h-full" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Lora', serif", lineHeight: 1.1 }}>GreenLoop</h1>

          <p className="w-full text-white text-[19px] font-semibold leading-snug" style={{ fontFamily: "'Lora', serif" }}>
            {lang === "de" ? "Entdecke Orte, die etwas bewirken." : "Discover places that make a difference."}
          </p>
        </div>

        <div className="mt-auto pb-10 flex flex-col gap-3">
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
                ? "10 geprüfte Partner warten auf dich — lokal, nachhaltig, ehrlich."
                : "10 verified partners are waiting — local, sustainable, honest."}
            </p>
            <button className="mt-3 px-4 py-1.5 rounded-xl bg-white text-[#0F6B3E] text-xs font-bold">
              {lang === "de" ? "Alle entdecken" : "Explore all"}
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-1">
            {(lang === "de"
              ? ["Alle", "Vegan", "Café", "Fair Trade", "Handwerk", "Restaurants"]
              : ["All", "Vegan", "Café", "Fair Trade", "Craft", "Restaurants"]
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
                <ImageWithFallback src={b.image} alt={b.name} className="w-full h-full object-cover" />
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
  const mapPinPositions = [
    { x: 246, y: 260 },
    { x: 142, y: 188 },
    { x: 80, y: 316 },
    { x: 200, y: 222 },
    { x: 150, y: 246 },
    { x: 96, y: 276 },
    { x: 176, y: 166 },
    { x: 318, y: 336 },
    { x: 114, y: 226 },
    { x: 288, y: 286 },
  ];
  const allPins = BUSINESSES.map((b, i) => ({
    ...b,
    active: i === 0,
    visualX: mapPinPositions[i].x,
    visualY: mapPinPositions[i].y,
  }));

  return (
    <MobileFrame bg="#EAE6DE">
      <div className="flex flex-col h-full relative">
        {/* Map canvas */}
        <div className="absolute inset-0">
          <img
            src="/maps/map.png"
            alt="Bayreuth map"
            className="w-full h-full object-cover object-center"
          />

          {/* All 10 business pins */}
          {allPins.map((pin, idx) => (
            <div key={pin.id} className="absolute"
              style={{ left: pin.visualX - (pin.active ? 22 : 17), top: pin.visualY - (pin.active ? 50 : 42), zIndex: pin.active ? 10 : 5 }}>
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
              ? ["Alle","Vegan","Fair Trade","Café","Handwerk"]
              : ["All","Vegan","Fair Trade","Café","Craft"]
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
              <ImageWithFallback src={BUSINESSES[0].image} alt={BUSINESSES[0].name} className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
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
              <span className="text-xs text-[#6B7B6B] flex items-start gap-1 ml-auto whitespace-pre-line"><Clock size={11} className="mt-0.5 flex-shrink-0" />{BUSINESSES[0].hours}</span>
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
  const exploreCardDetails: Record<string, { hours: string; badges: string[] }> = {
    "Vedans Fresh ’n’ Healthy": {
      hours: "Mon–Sun: 09:30–20:30",
      badges: ["Vegan Options", "Vegetarian Options", "Regional Ingredients", "Organic"],
    },
    "Café Freudenherz": {
      hours: "Mon–Fri: 11:00–18:00\nSat: 10:00–18:00\nSun: Closed",
      badges: ["Vegetarian Options", "Vegan Options", "Fair Trade", "Socially Responsible"],
    },
    "Die Hamsterbacke": {
      hours: "Tue–Fri: 09:30–19:00\nSat: 09:30–15:00\nMon/Sun: Closed",
      badges: ["Regional Ingredients", "Organic", "Refill Station", "Plastic-Free"],
    },
    "Der Weltladen Bayreuth": {
      hours: "Mon–Fri: 10:00–18:00\nSat: 10:00–15:00\nSun: Closed",
      badges: ["Fair Trade", "Socially Responsible", "Reusable Packaging", "Regional Ingredients"],
    },
    "Lemon Tree": {
      hours: "Tue–Fri: 10:00–18:00\nSat: 10:00–15:00\nMon/Sun: Closed",
      badges: ["Vegan Options", "Fair Trade", "Plastic-Free", "Socially Responsible"],
    },
    "Reformhaus Sattran GmbH": {
      hours: "Mon–Sat: 09:00–19:00\nSun: Closed",
      badges: ["Organic", "Vegan Options", "Vegetarian Options", "Seasonal Products"],
    },
    "VerSTOFFlicht": {
      hours: "Tue–Fri: 14:00–18:00\nSat: 10:00–16:00\nMon/Sun: Closed",
      badges: ["Reusable Packaging", "Socially Responsible", "Plastic-Free", "Regional Ingredients"],
    },
    "Atelier Förster-Oetter": {
      hours: "Mon, Wed: 09:00–12:00\nTue, Thu: By appointment\nFri: 13:00–18:00\nSat–Sun: Closed",
      badges: ["Socially Responsible", "Reusable Packaging", "Regional Ingredients", "Seasonal Products"],
    },
    "TeeGschwendner Bayreuth": {
      hours: "Mon–Fri: 09:30–18:00\nSat: 09:30–16:00\nSun: Closed",
      badges: ["Fair Trade", "Organic", "Reusable Packaging", "Seasonal Products"],
    },
    "André Hagen – Der Optiker": {
      hours: "Tue–Fri: 09:00–18:00\nSat: 10:00–15:00\nMon/Sun: Closed",
      badges: ["Socially Responsible", "Reusable Packaging", "Regional Ingredients", "Plastic-Free"],
    },
  };

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
              ? ["Alle","Essen & Trinken","Café & Geschenke","Fair Trade","Handwerk","Restaurants"]
              : ["All","Food & Drink","Café & Gifts","Fair Trade","Craft & Handmade","Restaurants"]
            ).map((c, i) => (
              <button key={c} className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={i === 0 ? { background: "#0F6B3E", color: "#fff" } : { background: "#fff", color: "#1A2E1A", border: "1px solid rgba(15,107,62,0.15)" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 flex-1 overflow-y-auto flex flex-col gap-3 pb-6">
          {BUSINESSES.map((b) => {
            const card = exploreCardDetails[b.name] ?? { hours: b.hours, badges: b.badges.slice(0, 4) };
            const compactHours = card.hours.replace(/\n/g, " · ");
            return (
            <div key={b.id} className="rounded-2xl bg-white flex items-start gap-2.5 p-2.5" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
              <ImageWithFallback src={b.image} alt={b.name} className="w-24 h-28 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#1A2E1A] text-sm leading-tight">{lang === "de" ? b.nameDe : b.name}</h4>
                <p className="text-[10px] text-[#6B7B6B] mt-0.5 leading-tight">{lang === "de" ? b.categoryDe : b.category}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-[#6B7B6B] flex items-center gap-0.5"><MapPin size={9} />{b.distance}</span>
                </div>
                <div className="flex items-start gap-1 mt-1 mb-1.5">
                  <Clock size={10} color="#0F6B3E" className="mt-0.5 flex-shrink-0" />
                  <span className="text-[9px] leading-tight text-[#6B7B6B]">{compactHours}</span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {card.badges.slice(0, 4).map((badge) => {
                    const badgeConfig = BADGES.find((item) => item.label === badge) ?? BADGES[0];
                    const label = lang === "de" ? badgeConfig.labelDe : badgeConfig.label;
                    return (
                      <span key={badge} className="inline-flex rounded-full px-1.5 py-0.5 text-[9px] font-medium leading-none"
                        style={{ background: badgeConfig.bg, color: badgeConfig.color }}>
                        {label}
                      </span>
                    );
                  })}
                </div>
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

// Screen 5: Filter
function ScreenFilter({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [selected, setSelected] = useState<string[]>(["Organic", "Vegan Options"]);
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
                ?["Alle","Essen & Trinken","Café & Geschenke","Fair Trade","Handwerk","Restaurants"]
                :["All","Food & Drink","Café & Gifts","Fair Trade","Craft & Handmade","Restaurants"]
              ).map((c,i)=>(
                <button key={c} className="px-3 py-2 rounded-xl text-xs font-semibold"
                  style={i===0?{background:"#0F6B3E",color:"#fff"}:{background:"#fff",color:"#1A2E1A",border:"1px solid rgba(15,107,62,0.2)"}}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#1A2E1A] text-sm">{t.sustainability}</h3>
              <span className="text-xs font-semibold text-[#6B7B6B]">{SUSTAINABILITY_FILTERS.length} filters</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SUSTAINABILITY_FILTERS.map((b) => {
                const active = selected.includes(b.label);
                const displayLabel = lang === "de" ? b.labelDe : b.label;
                return (
                  <button key={b.label} onClick={() => toggle(b.label)}
                    className="relative flex min-h-[82px] flex-col items-center justify-center gap-1.5 p-3 rounded-2xl text-center transition-all"
                    style={active ? { background: b.bg, border: `2px solid ${b.color}` } : { background: "#fff", border: "2px solid transparent", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg" style={{ background: b.bg }}>
                      {b.emoji}
                    </div>
                    <span className="text-xs font-semibold leading-tight text-center text-[#1A2E1A]">{displayLabel}</span>
                    {active && <Check size={12} color={b.color} className="absolute right-3 top-3" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-auto px-5 pb-10 pt-4" style={{ borderTop: "1px solid rgba(15,107,62,0.1)" }}>
          <button className="w-full py-4 rounded-2xl bg-[#0F6B3E] text-white font-bold text-base">
            {lang === "de" ? `${SUSTAINABILITY_FILTERS.length} Ergebnisse anzeigen` : `Show ${SUSTAINABILITY_FILTERS.length} Results`}
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}

// Screen 6: Business Profile
function ScreenBusinessProfile({ lang }: { lang: Lang }) {
  const t = T[lang];
  const b = BUSINESSES[0];
  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        {/* Hero */}
        <div className="relative h-52 flex-shrink-0">
          <ImageWithFallback src={b.image} alt={b.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(26,46,26,0.75) 100%)" }} />
          <button className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-white/90 flex items-center justify-center">
            <ChevronLeft size={20} color="#1A2E1A" />
          </button>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/90 flex items-center justify-center">
            <Heart size={18} color="#1A2E1A" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-3">
          {/* Business name */}
          <div className="mb-3">
            <h2 className="text-xl font-bold text-[#1A2E1A] leading-tight" style={{ fontFamily: "'Lora', serif" }}>{lang === "de" ? b.nameDe : b.name}</h2>
            <p className="text-sm text-[#6B7B6B] mt-1">{lang === "de" ? b.categoryDe : b.category}</p>
          </div>

          {/* Sustainability criteria */}
          <div className="rounded-2xl p-3 mb-3" style={{ background: "#E8F5EE" }}>
            <h3 className="font-bold text-[#1A2E1A] text-sm mb-2">{t.verifiedCriteria}</h3>
            <div className="flex gap-1.5 flex-wrap">
              {b.badges.map((badge) => <Badge key={badge} label={badge} lang={lang} />)}
            </div>
          </div>

          {/* Contact + hours row */}
          <div className="flex flex-col gap-1.5 py-3 mb-3" style={{ borderBottom: "1px solid rgba(15,107,62,0.1)" }}>
            <span className="flex items-center gap-1.5 text-xs text-[#6B7B6B]"><MapPin size={13} color="#0F6B3E" />{b.address}</span>
            <span className="flex items-start gap-1.5 text-xs text-[#6B7B6B] whitespace-pre-line"><Clock size={13} color="#0F6B3E" className="mt-0.5 flex-shrink-0" />{b.hours}</span>
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
            <img src="/maps/map.png" alt="Bayreuth map" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-xl bg-[#0F6B3E] flex items-center justify-center shadow-lg">
                <MapPin size={14} color="#fff" />
              </div>
            </div>
            <div className="absolute bottom-2 left-3">
              <span className="text-[10px] text-[#6B7B6B] font-medium">{b.address}</span>
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
  const criteriaCopy: Record<string, { title: string; titleDe: string; desc: string; descDe: string }> = {
    "Vegan Options": {
      title: "Vegan options",
      titleDe: "Vegane Optionen",
      desc: "This profile includes vegan choices or plant-forward products.",
      descDe: "Dieses Profil umfasst vegane Angebote oder pflanzenbasierte Produkte.",
    },
    "Vegetarian Options": {
      title: "Vegetarian options",
      titleDe: "Vegetarische Optionen",
      desc: "This profile includes vegetarian choices for everyday sustainable decisions.",
      descDe: "Dieses Profil umfasst vegetarische Angebote für nachhaltige Alltagsentscheidungen.",
    },
    "Regional Ingredients": {
      title: "Regional ingredients",
      titleDe: "Regionale Zutaten",
      desc: "This business uses or promotes regional ingredients and local supply connections.",
      descDe: "Dieser Betrieb nutzt oder fördert regionale Zutaten und lokale Lieferbeziehungen.",
    },
    "Seasonal Products": {
      title: "Seasonal products",
      titleDe: "Saisonale Produkte",
      desc: "This profile highlights seasonal products or season-aware sourcing.",
      descDe: "Dieses Profil hebt saisonale Produkte oder saisonbewusste Beschaffung hervor.",
    },
    Organic: {
      title: "Organic and natural products",
      titleDe: "Bio- und Naturprodukte",
      desc: "This profile highlights organic, natural, or health-oriented product choices.",
      descDe: "Dieses Profil hebt Bio-, Natur- oder gesundheitsorientierte Produktauswahl hervor.",
    },
    "Fair Trade": {
      title: "Fair trade and ethical consumption",
      titleDe: "Fair Trade und ethischer Konsum",
      desc: "This profile includes fair-trade, ethical, or responsibility-focused consumption.",
      descDe: "Dieses Profil umfasst Fair Trade, ethischen Konsum oder verantwortungsvolle Produktauswahl.",
    },
    "Reusable Packaging": {
      title: "Reusable packaging",
      titleDe: "Mehrwegverpackung",
      desc: "This profile supports reusable packaging, return systems, or reduced single-use packaging.",
      descDe: "Dieses Profil unterstützt Mehrwegverpackung, Rückgabesysteme oder weniger Einwegverpackung.",
    },
    "Plastic-Free": {
      title: "Plastic-free choices",
      titleDe: "Plastikfreie Auswahl",
      desc: "This profile includes plastic-free products, packaging, or low-plastic alternatives.",
      descDe: "Dieses Profil umfasst plastikfreie Produkte, Verpackungen oder plastikarme Alternativen.",
    },
    "Refill Station": {
      title: "Refill station",
      titleDe: "Nachfüllstation",
      desc: "This profile includes refill, bulk, or bring-your-own-container options.",
      descDe: "Dieses Profil umfasst Nachfüll-, Unverpackt- oder eigene-Behälter-Angebote.",
    },
    "Socially Responsible": {
      title: "Socially responsible",
      titleDe: "Sozial verantwortlich",
      desc: "This profile highlights responsible business values, fair relationships, or community contribution.",
      descDe: "Dieses Profil hebt verantwortungsvolle Unternehmenswerte, faire Beziehungen oder Community-Beitrag hervor.",
    },
  };
  const criteria = b.badges.map((badge) => {
    const badgeConfig = BADGES.find((item) => item.label === badge) ?? BADGES[0];
    const copy = criteriaCopy[badge] ?? {
      title: badgeConfig.label,
      titleDe: badgeConfig.labelDe,
      desc: b.description,
      descDe: b.descriptionDe,
    };
    return {
      ...badgeConfig,
      title: lang === "de" ? copy.titleDe : copy.title,
      desc: lang === "de" ? copy.descDe : copy.desc,
    };
  });

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
        </div>

        {/* What does verification mean */}
        <div className="rounded-2xl p-4 mb-4" style={{ background: "#E8F5EE" }}>
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} color="#0F6B3E" />
            <span className="font-bold text-[#0F6B3E] text-sm">
              {lang === "de" ? "Was bedeutet Verifizierung?" : "What does verification mean?"}
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

// Screen 8: First Visit Offer
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
          <div className="flex items-start justify-center gap-3 mb-4 text-center">
            <div>
              <h3 className="font-bold text-[#1A2E1A] text-sm">{lang === "de" ? b.nameDe : b.name}</h3>
              <p className="text-xs text-[#6B7B6B]">{lang === "de" ? b.categoryDe : b.category}</p>
            </div>
          </div>

          {/* Offer highlight */}
          <div className="text-center py-3 rounded-2xl mb-4" style={{ background: "#E8F5EE" }}>
            <p className="text-[#0F6B3E] font-bold text-xl">{t.freeHotDrink}</p>
            <p className="text-[#6B7B6B] text-sm">{t.freeHotDrinkSub}</p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-3">
            <div className="rounded-2xl p-3 bg-white inline-block" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.10)" }}>
              <img
                src="/qrcode/qrcode.jpeg"
                alt="First visit offer QR code"
                className="w-[172px] h-[172px] object-contain"
              />
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
            {lang === "de" ? "GreenLoop-Aktivitäten, Partnerfeatures und lokale Events." : "GreenLoop activities, partner features, and local events."}
          </p>
          <div className="flex gap-2 mb-4 overflow-x-auto pb-0.5">
            {(lang === "de"
              ? ["Alle","Features","Community","Workshops"]
              : ["All","Features","Community","Workshops"]
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
            <p className="text-white/80 text-xs mt-1 leading-snug line-clamp-2">
              {lang === "de" ? EVENTS[0].descriptionDe : EVENTS[0].description}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-white/80 text-xs flex items-center gap-1"><Calendar size={10} />{EVENTS[0].date}</span>
              <span className="text-white/80 text-xs flex items-center gap-1"><MapPin size={10} />{EVENTS[0].location}</span>
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
                <p className="text-xs text-[#6B7B6B] mt-1 leading-snug line-clamp-2">{lang === "de" ? e.descriptionDe : e.description}</p>
                <p className="text-xs text-[#6B7B6B] mt-1 flex items-center gap-1"><Calendar size={10} />{e.date} · {e.time}</p>
              </div>
            </div>
          ))}
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

          {/* Saved stat */}
          <div className="grid grid-cols-1 gap-3 mb-5">
            {[
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
                  <ImageWithFallback src={b.image} alt={b.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
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
        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-1.5" style={{ border: "1px solid rgba(15,107,62,0.16)" }}>
          <GreenLoopLogo className="w-full h-full" />
        </div>
        <span className="font-bold text-[#1A2E1A] text-xl" style={{ fontFamily: "'Lora', serif" }}>GreenLoop</span>
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
            {lang === "de" ? "Nachhaltige lokale Entscheidungen" : "Sustainable local choices"}
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 leading-none" style={{ fontFamily: "'Lora', serif" }}>
            {lang === "de" ? <>Entdecke Orte,<br />die etwas<br />bewirken.</> : <>Discover places<br />that make<br />a difference.</>}
          </h1>
          <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-md">
            {lang === "de"
              ? "Entdecke lokale Läden, Cafés und Restaurants, die echte Nachhaltigkeit leben. Transparent geprüft, ehrlich empfohlen."
              : "Discover local shops, cafés, and restaurants with genuine sustainability commitments. Transparently verified, honestly recommended."}
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
            { value: String(SUSTAINABILITY_FILTERS.length),  label: lang === "de" ? "Kriterien" : "Criteria" },
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
          <img src="/maps/map.png" alt="Bayreuth map" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(251,247,239,0.22)" }} />
          {/* Partner pins on map */}
          {BUSINESSES.map((pin, i) => {
            const x = 80 + (pin.mapX / 393) * 1152;
            const y = 48 + ((pin.mapY - 220) / 150) * 132;
            return (
              <div key={pin.id} className="absolute flex flex-col items-center" style={{ left: x - 16, top: y - 36 }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md"
                  style={{ background: i === 0 ? "#0F6B3E" : "#fff", border: i === 0 ? "none" : "2px solid #0F6B3E" }}>
                  <Leaf size={14} color={i === 0 ? "#fff" : "#0F6B3E"} />
                </div>
                <div style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent",
                  borderTop: "6px solid #0F6B3E", opacity: i === 0 ? 1 : 0.5 }} />
              </div>
            );
          })}
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
                <ImageWithFallback src={b.image} alt={b.name} className="w-full h-full object-cover" />
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
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center p-1" style={{ border: "1px solid rgba(15,107,62,0.16)" }}>
              <GreenLoopLogo className="w-full h-full" />
            </div>
            <span className="font-bold text-[#1A2E1A]" style={{ fontFamily: "'Lora', serif" }}>GreenLoop</span>
          </div>
          <p className="text-xs text-[#6B7B6B]">© 2025 GreenLoop · {lang === "de" ? "Für lokale Gemeinschaften gemacht" : "Made for local communities"}</p>
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
  const exploreCardDetails: Record<string, { hours: string; badges: string[] }> = {
    "Vedans Fresh ’n’ Healthy": {
      hours: "Mon–Sun: 09:30–20:30",
      badges: ["Vegan Options", "Vegetarian Options", "Regional Ingredients", "Organic"],
    },
    "Café Freudenherz": {
      hours: "Mon–Fri: 11:00–18:00\nSat: 10:00–18:00\nSun: Closed",
      badges: ["Vegetarian Options", "Vegan Options", "Fair Trade", "Socially Responsible"],
    },
    "Die Hamsterbacke": {
      hours: "Tue–Fri: 09:30–19:00\nSat: 09:30–15:00\nMon/Sun: Closed",
      badges: ["Regional Ingredients", "Organic", "Refill Station", "Plastic-Free"],
    },
    "Der Weltladen Bayreuth": {
      hours: "Mon–Fri: 10:00–18:00\nSat: 10:00–15:00\nSun: Closed",
      badges: ["Fair Trade", "Socially Responsible", "Reusable Packaging", "Regional Ingredients"],
    },
    "Lemon Tree": {
      hours: "Tue–Fri: 10:00–18:00\nSat: 10:00–15:00\nMon/Sun: Closed",
      badges: ["Vegan Options", "Fair Trade", "Plastic-Free", "Socially Responsible"],
    },
    "Reformhaus Sattran GmbH": {
      hours: "Mon–Sat: 09:00–19:00\nSun: Closed",
      badges: ["Organic", "Vegan Options", "Vegetarian Options", "Seasonal Products"],
    },
    "VerSTOFFlicht": {
      hours: "Tue–Fri: 14:00–18:00\nSat: 10:00–16:00\nMon/Sun: Closed",
      badges: ["Reusable Packaging", "Socially Responsible", "Plastic-Free", "Regional Ingredients"],
    },
    "Atelier Förster-Oetter": {
      hours: "Mon, Wed: 09:00–12:00\nTue, Thu: By appointment\nFri: 13:00–18:00\nSat–Sun: Closed",
      badges: ["Socially Responsible", "Reusable Packaging", "Regional Ingredients", "Seasonal Products"],
    },
    "TeeGschwendner Bayreuth": {
      hours: "Mon–Fri: 09:30–18:00\nSat: 09:30–16:00\nSun: Closed",
      badges: ["Fair Trade", "Organic", "Reusable Packaging", "Seasonal Products"],
    },
    "André Hagen – Der Optiker": {
      hours: "Tue–Fri: 09:00–18:00\nSat: 10:00–15:00\nMon/Sun: Closed",
      badges: ["Socially Responsible", "Reusable Packaging", "Regional Ingredients", "Plastic-Free"],
    },
  };

  return (
    <DesktopFrame>
      <DesktopNav lang={lang} setLang={setLang} />
      <div className="px-16 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#1A2E1A] mb-2" style={{ fontFamily: "'Lora', serif" }}>
              {lang === "de" ? "Partner entdecken" : "Explore Partners"}
            </h1>
            <p className="text-[#6B7B6B]">{lang === "de" ? "10 geprüfte nachhaltige Betriebe in Bayreuth" : "10 verified sustainable local businesses"}</p>
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
                ? ["Alle","Essen & Trinken","Café & Geschenke","Fair Trade","Handwerk","Restaurants"]
                : ["All","Food & Drink","Café & Gifts","Fair Trade","Craft & Handmade","Restaurants"]
              ).map((c, i) => (
                <button key={c} onClick={() => setActiveFilter(c)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl mb-1 text-sm font-medium"
                  style={activeFilter === c ? { background: "#E8F5EE", color: "#0F6B3E" } : { color: "#3A4A3A" }}>
                  {c}<ChevronRight size={14} />
                </button>
              ))}
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(15,107,62,0.1)" }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[#1A2E1A]">{t.sustainability}</h3>
                  <span className="text-xs font-semibold text-[#6B7B6B]">{SUSTAINABILITY_FILTERS.length} filters</span>
                </div>
                <div className="flex flex-col gap-2">
                  {SUSTAINABILITY_FILTERS.map((b) => {
                    return (
                      <label key={b.label} className="flex items-center gap-2.5 cursor-pointer">
                        <div className="w-4 h-4 rounded-md border-2 flex items-center justify-center" style={{ borderColor: b.color, background: b.bg }}>
                          <Check size={10} color={b.color} strokeWidth={3} />
                        </div>
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center text-sm" style={{ background: b.bg }}>
                          {b.emoji}
                        </div>
                        <span className="text-sm font-medium" style={{ color: b.color }}>{lang === "de" ? b.labelDe : b.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Business grid — no star ratings */}
          <div className="flex-1 grid grid-cols-3 gap-6 content-start">
            {BUSINESSES.map((b) => {
              const card = exploreCardDetails[b.name] ?? { hours: b.hours, badges: b.badges.slice(0, 4) };
              return (
              <div key={b.id} className="rounded-2xl bg-white overflow-hidden cursor-pointer hover:shadow-xl transition-shadow" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
                <div className="relative h-40">
                  <ImageWithFallback src={b.image} alt={b.name} className="w-full h-full object-cover" />
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                    <Heart size={14} color="#6B7B6B" />
                  </button>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-[#1A2E1A] text-sm leading-tight mb-1">{lang === "de" ? b.nameDe : b.name}</h4>
                  <p className="text-xs text-[#6B7B6B] mb-1">{lang === "de" ? b.categoryDe : b.category} · {b.distance}</p>
                  <div className="flex items-start gap-1.5 mb-3">
                    <Clock size={12} color="#0F6B3E" className="mt-0.5 flex-shrink-0" />
                    <span className="text-[11px] leading-snug text-[#6B7B6B] whitespace-pre-line">{card.hours}</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {card.badges.slice(0, 4).map((badge) => <Badge key={badge} label={badge} lang={lang} small />)}
                  </div>
                </div>
              </div>
            );
            })}
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
    { ...BADGES[0], title: lang==="de"?"Vegane Optionen":"Vegan Options", desc: lang==="de"?"Pflanzenbasierte Speisen, Getränke oder Produkte, die bewusst tierfreie Alternativen anbieten.":"Plant-based food, drinks, or products that make animal-free choices easier.", tag: "🌱" },
    { ...BADGES[1], title: lang==="de"?"Vegetarische Optionen":"Vegetarian Options", desc: lang==="de"?"Vegetarische Auswahl für einfache nachhaltige Entscheidungen im Alltag.":"Vegetarian choices for easy sustainable everyday decisions.", tag: "🥗" },
    { ...BADGES[2], title: lang==="de"?"Regionale Zutaten":"Regional Ingredients", desc: lang==="de"?"Zutaten oder Produkte mit regionalem Bezug und lokalen Lieferbeziehungen.":"Ingredients or products with regional sourcing and local supply connections.", tag: "🥕" },
    { ...BADGES[3], title: lang==="de"?"Saisonale Produkte":"Seasonal Products", desc: lang==="de"?"Produkte oder Angebote, die sich an saisonaler Verfügbarkeit orientieren.":"Products or offers guided by seasonal availability.", tag: "🍎" },
    { ...BADGES[4], title: lang==="de"?"Bio":"Organic", desc: lang==="de"?"Bio-, Natur- oder gesundheitsorientierte Produktauswahl.":"Organic, natural, or health-oriented product choices.", tag: "🌾" },
    { ...BADGES[5], title: lang==="de"?"Fair Trade":"Fair Trade", desc: lang==="de"?"Fair gehandelte Produkte und verantwortungsvolle Lieferbeziehungen.":"Fair-trade products and responsible supplier relationships.", tag: "☕" },
    { ...BADGES[6], title: lang==="de"?"Mehrwegverpackung":"Reusable Packaging", desc: lang==="de"?"Mehrweg-, Rückgabe- oder Verpackungsreduktionssysteme.":"Reusable, returnable, or packaging-reduction systems.", tag: "♻️" },
    { ...BADGES[7], title: lang==="de"?"Plastikfrei":"Plastic-Free", desc: lang==="de"?"Plastikfreie Produkte, Verpackungen oder plastikarme Alternativen.":"Plastic-free products, packaging, or low-plastic alternatives.", tag: "🚫" },
    { ...BADGES[8], title: lang==="de"?"Nachfüllstation":"Refill Station", desc: lang==="de"?"Nachfüll-, Unverpackt- oder eigene-Behälter-Angebote.":"Refill, bulk, or bring-your-own-container options.", tag: "🔄" },
    { ...BADGES[9], title: lang==="de"?"Sozial verantwortlich":"Socially Responsible", desc: lang==="de"?"Faire Beziehungen, Community-Beitrag und verantwortungsvolle Unternehmenswerte.":"Fair relationships, community contribution, and responsible business values.", tag: "🤝" },
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
            {lang==="de"?"Was macht einen Betrieb verifiziert?":"What makes a business verified?"}
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
            { step:"03", icon:Check,     title:lang==="de"?"Bestätigen":"Verify", desc:lang==="de"?"Geprüfte Kriterien erscheinen klar im Geschäftsprofil.":"Verified criteria are listed clearly on the business profile." },
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
            { img:"/team/lisa-sebald.png", name:"Lisa Sebald", role:lang==="de"?"UX Design & Forschung":"UX Design & Research" },
            { img:"/team/yunru-luo.png", name:"Yunru Luo",  role:lang==="de"?"Produktstrategie":"Product Strategy" },
            { img:"/team/daria-luneva.png", name:"Daria Luneva", role:lang==="de"?"Partnerschaften & Community":"Partnerships & Community" },
          ].map(({ img, name, role }) => (
            <div key={name} className="flex flex-col items-center text-center rounded-2xl p-6" style={{ background: "#FBF7EF" }}>
              <ImageWithFallback src={img} alt={name} className="w-20 h-20 rounded-2xl object-cover mb-4" />
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const screenId = MOBILE_SCREENS[mobileIdx].id;
  const dScreenId = DESKTOP_SCREENS[desktopIdx].id;
  const activeScreens = tab === "mobile" ? MOBILE_SCREENS : DESKTOP_SCREENS;
  const activeIdx = tab === "mobile" ? mobileIdx : desktopIdx;
  const activeTitle = lang === "de" ? activeScreens[activeIdx].labelDe : activeScreens[activeIdx].label;
  const sidebarTitle = tab === "mobile"
    ? (lang === "de" ? "App-Screens" : "Mobile Screens")
    : (lang === "de" ? "Website-Seiten" : "Desktop Pages");

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

  const selectScreen = (idx: number) => {
    if (tab === "mobile") {
      setMobileIdx(idx);
    } else {
      setDesktopIdx(idx);
    }
    setIsSidebarOpen(false);
  };

  const selectTab = (nextTab: "mobile" | "desktop") => {
    setTab(nextTab);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#F0EBE0", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        .ui-kit-phone-preview {
          width: 393px;
          height: 852px;
          position: relative;
        }
        .ui-kit-phone-preview-inner {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%) scale(1);
          transform-origin: top center;
        }
        .ui-kit-desktop-preview {
          transform: scale(0.72);
          transform-origin: top center;
          margin-bottom: -240px;
        }
        @media (max-width: 767px) {
          .ui-kit-desktop-preview-wrap {
            width: min(100%, calc(100vw - 16px));
            height: 300px;
            overflow: hidden;
          }
          .ui-kit-desktop-preview {
            width: 1440px;
            transform: scale(0.32);
            transform-origin: top left;
            margin-bottom: 0;
          }
        }
        @media (max-width: 430px) {
          .ui-kit-phone-preview {
            width: 338px;
            height: 733px;
          }
          .ui-kit-phone-preview-inner {
            transform: translateX(-50%) scale(0.86);
          }
          .ui-kit-desktop-preview-wrap {
            width: min(100%, 346px);
            height: 236px;
            overflow: hidden;
          }
          .ui-kit-desktop-preview {
            width: 1440px;
            transform: scale(0.24);
            transform-origin: top left;
            margin-bottom: 0;
          }
        }
        @media (max-width: 360px) {
          .ui-kit-phone-preview {
            width: 307px;
            height: 665px;
          }
          .ui-kit-phone-preview-inner {
            transform: translateX(-50%) scale(0.78);
          }
          .ui-kit-desktop-preview-wrap {
            width: min(100%, 320px);
            height: 216px;
          }
          .ui-kit-desktop-preview {
            transform: scale(0.22);
          }
        }
      `}</style>
      {/* Top bar */}
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 px-4 py-3 md:flex-nowrap md:px-8 md:py-4"
        style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(15,107,62,0.1)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
        <div className="flex min-w-0 items-center gap-2.5">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white md:hidden"
            style={{ border: "1px solid rgba(15,107,62,0.16)", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}
            aria-label={lang === "de" ? "Navigation öffnen" : "Open navigation"}
          >
            <Menu size={18} color="#1A2E1A" />
          </button>
          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center p-1.5" style={{ border: "1px solid rgba(15,107,62,0.16)" }}>
            <GreenLoopLogo className="w-full h-full" />
          </div>
          <span className="font-bold text-[#1A2E1A] text-lg" style={{ fontFamily: "'Lora', serif" }}>GreenLoop</span>
          <span className="text-[11px] text-[#6B7B6B] font-medium sm:text-xs">UI Kit · GreenLoop</span>
        </div>

        {/* Tab switcher */}
        <div className="order-3 flex w-full items-center gap-1 rounded-xl p-1 md:order-none md:w-auto" style={{ background: "#F0EBE0" }}>
          <button onClick={() => selectTab("mobile")} className="flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all sm:text-sm md:flex-none md:px-5"
            style={tab === "mobile" ? { background: "#fff", color: "#0F6B3E", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" } : { color: "#6B7B6B" }}>
            Mobile <span className="hidden sm:inline">· {MOBILE_SCREENS.length} screens</span>
          </button>
          <button onClick={() => selectTab("desktop")} className="flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all sm:text-sm md:flex-none md:px-5"
            style={tab === "desktop" ? { background: "#fff", color: "#0F6B3E", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" } : { color: "#6B7B6B" }}>
            Desktop <span className="hidden sm:inline">· {DESKTOP_SCREENS.length} pages</span>
          </button>
        </div>

        {/* Global language switcher */}
        <div className="flex flex-shrink-0 items-center gap-2 md:gap-3">
          <span className="hidden text-xs text-[#6B7B6B] sm:inline">{lang === "de" ? "Sprache:" : "Language:"}</span>
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

      <div className="flex" style={{ minHeight: "calc(100vh - 65px)" }}>
        {isSidebarOpen && (
          <button
            className="fixed inset-0 z-40 bg-[#1A2E1A]/30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label={lang === "de" ? "Navigation schließen" : "Close navigation"}
          />
        )}

        {/* Screen list */}
        <aside
          className={`fixed left-0 top-0 z-50 h-full w-64 flex-shrink-0 px-4 py-6 transition-transform duration-200 md:sticky md:top-[65px] md:z-10 md:h-[calc(100vh-65px)] md:w-52 md:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ background: "#FFFFFF", borderRight: "1px solid rgba(15,107,62,0.1)" }}
        >
          <div className="mb-4 flex items-center justify-between md:hidden">
            <span className="text-sm font-bold text-[#1A2E1A]" style={{ fontFamily: "'Lora', serif" }}>GreenLoop</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: "#F0EBE0" }}
              aria-label={lang === "de" ? "Navigation schließen" : "Close navigation"}
            >
              <X size={18} color="#1A2E1A" />
            </button>
          </div>
          <p className="text-[10px] font-bold text-[#6B7B6B] uppercase tracking-widest px-2 mb-3">
            {sidebarTitle}
          </p>
          {activeScreens.map((s, i) => (
            <button key={s.id} onClick={() => selectScreen(i)}
              className="w-full text-left px-3 py-2.5 rounded-xl mb-1 text-sm transition-all"
              style={activeIdx === i ? { background: "#E8F5EE", color: "#0F6B3E", fontWeight: 600 } : { color: "#3A4A3A" }}>
              <span className="text-[10px] text-[#6B7B6B] block">{String(i + 1).padStart(2, "0")}</span>
              {lang === "de" ? s.labelDe : s.label}
            </button>
          ))}
        </aside>

        {/* Canvas */}
        <main className="flex min-w-0 flex-1 items-start justify-center overflow-x-hidden px-2 py-6 sm:px-6 md:px-8 md:py-10">
          <div className="flex w-full max-w-full flex-col items-center gap-5 md:gap-6">
            <div className="flex w-full max-w-[520px] items-center justify-center gap-3 px-1">
              <button onClick={() => tab === "mobile"
                ? setMobileIdx((i) => (i - 1 + MOBILE_SCREENS.length) % MOBILE_SCREENS.length)
                : setDesktopIdx((i) => (i - 1 + DESKTOP_SCREENS.length) % DESKTOP_SCREENS.length)}
                className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center bg-white" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <ChevronLeft size={18} color="#1A2E1A" />
              </button>
              <span className="min-w-0 flex-1 text-center text-sm font-semibold text-[#1A2E1A]">
                {activeTitle}
              </span>
              <button onClick={() => tab === "mobile"
                ? setMobileIdx((i) => (i + 1) % MOBILE_SCREENS.length)
                : setDesktopIdx((i) => (i + 1) % DESKTOP_SCREENS.length)}
                className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center bg-white" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <ChevronRight size={18} color="#1A2E1A" />
              </button>
            </div>

            {tab === "mobile" ? (
              <div className="ui-kit-phone-preview">
                <div className="ui-kit-phone-preview-inner">{mobileScreen()}</div>
              </div>
            ) : (
              <div className="ui-kit-desktop-preview-wrap">
                <div className="ui-kit-desktop-preview">{desktopScreen()}</div>
              </div>
            )}

            <div className="flex max-w-2xl flex-wrap justify-center gap-2 px-2">
              {activeScreens.map((s, i) => (
                <button key={s.id} onClick={() => selectScreen(i)}
                  className={`${tab === "mobile" ? "px-3 py-1.5 text-[11px]" : "px-4 py-2 text-sm"} rounded-lg font-medium transition-all`}
                  style={activeIdx === i ? { background: "#0F6B3E", color: "#fff" } : { background: "#fff", color: "#6B7B6B", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                  {i + 1}. {lang === "de" ? s.labelDe : s.label}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
