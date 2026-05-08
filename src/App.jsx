
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BadgeCheck,
  Camera,
  CalendarDays,
  ChevronRight,
  Crown,
  Flame,
  Gamepad2,
  Home,
  Laptop,
  Medal,
  Trash2,
  Edit3,
  MessageCircle,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Trophy,
  User,
  Users,
  Wifi,
  Clock,
  Radio,
  Zap
} from "lucide-react";
import "./style.css";

const userName = "Shane";

const badgeLibrary = [
  { id: "reliable", icon: "🔥", title: "Reliable", desc: "Komt opdagen als hij Ready zegt.", rarity: "Epic" },
  { id: "lanlord", icon: "💻", title: "LAN Lord", desc: "Regelt gear, snacks en chaos.", rarity: "Rare" },
  { id: "pathfinder", icon: "🚀", title: "Pathfinder", desc: "Vindt nieuwe adventures voor de squad.", rarity: "Epic" },
  { id: "lootgoblin", icon: "💰", title: "Loot Goblin", desc: "Loot eerst, vragen later.", rarity: "Common" },
  { id: "cablegoblin", icon: "🔌", title: "Cable Goblin", desc: "Heeft altijd ergens een kabel liggen.", rarity: "Rare" },
  { id: "wallet", icon: "💸", title: "Wallet Destroyer", desc: "Koopt games sneller dan hij ze speelt.", rarity: "Legendary" },
  { id: "chaos", icon: "☄️", title: "Chaos Bringer", desc: "Maakt elke sessie memorabel.", rarity: "Rare" },
  { id: "backlog", icon: "🧟", title: "Backlog Necromancer", desc: "Brengt oude games terug tot leven.", rarity: "Epic" }
];

const initialSquad = [
  { name: "Shane", xp: 2840, level: 17, badges: ["reliable", "lanlord", "pathfinder"], ready: 91, discovery: 12, avatar: "S" },
  { name: "Kevin", xp: 2190, level: 14, badges: ["wallet", "chaos", "lootgoblin"], ready: 74, discovery: 7, avatar: "K" },
  { name: "Tom", xp: 2450, level: 15, badges: ["backlog", "reliable", "chaos"], ready: 83, discovery: 10, avatar: "T" },
  { name: "Sven", xp: 1800, level: 12, badges: ["cablegoblin", "lanlord", "lootgoblin"], ready: 69, discovery: 5, avatar: "V" },
  { name: "Mark", xp: 1520, level: 10, badges: ["pathfinder", "backlog", "wallet"], ready: 63, discovery: 8, avatar: "M" }
];

const baseDiscoverGames = [
  {
    id: 1,
    name: "Deep Rock Galactic",
    image: "linear-gradient(135deg, rgba(33, 72, 58, .82), rgba(0, 228, 168, .26)), url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80')",
    score: 94,
    price: "€9,99 sale",
    owned: "5/5 bezit",
    playModes: ["Co-op PvE"],
    types: ["Co-op", "PvE", "Survival-ish", "Quick"],
    desc: "Een compacte co-op shooter waarin jullie samen grotten induiken, resources verzamelen en proberen levend terug te komen. De kracht voor jullie squad zit in de korte missies, duidelijke rollen en constante chaos zonder dat iemand eerst drie uur tutorials hoeft te kijken.",
    tags: ["Co-op", "PvE", "4 spelers", "Korte sessies", "Iedereen bezit"],
    mode: "Tonight pick"
  },
  {
    id: 2,
    name: "No Man's Sky",
    image: "linear-gradient(135deg, rgba(50, 37, 105, .82), rgba(125, 92, 255, .28)), url('https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=900&q=80')",
    score: 87,
    price: "€29,99",
    owned: "4/5 bezit",
    playModes: ["Co-op PvE", "Singleplayer"],
    types: ["Co-op", "PvE", "Survival", "Exploration", "Long"],
    desc: "Een groot sci-fi avontuur rond ontdekken, base building, resource gathering en samen verdwalen in rare sterrenstelsels. Dit is minder geschikt als snelle one-night pick, maar sterk als jullie een nieuw langlopend squad-project willen starten.",
    tags: ["Sci-fi", "Exploration", "Base building", "Long adventure"],
    mode: "New adventure"
  },
  {
    id: 3,
    name: "Project Zomboid",
    image: "linear-gradient(135deg, rgba(80, 42, 42, .82), rgba(255, 92, 122, .22)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80')",
    score: 81,
    price: "€19,50",
    owned: "2/5 bezit",
    playModes: ["Co-op PvE", "Singleplayer"],
    types: ["Survival", "PvE", "Co-op", "Hardcore", "LAN"],
    desc: "Een harde survival sandbox waarin kleine fouten snel veranderen in legendarische groepsverhalen. Perfect voor squads die houden van planning, paniek, base defense en de onvermijdelijke discussie wie de auto heeft laten crashen.",
    tags: ["Survival", "Hardcore", "LAN chaos", "Sandbox"],
    mode: "LAN chaos"
  },
  {
    id: 4,
    name: "Risk of Rain 2",
    image: "linear-gradient(135deg, rgba(33, 45, 88, .84), rgba(255, 200, 87, .22)), url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80')",
    score: 89,
    price: "€24,99",
    owned: "3/5 bezit",
    playModes: ["Co-op PvE", "Singleplayer"],
    types: ["Co-op", "PvE", "Roguelike", "Quick"],
    desc: "Snelle roguelike runs waarin elke run groter, chaotischer en gevaarlijker wordt. Ideaal voor avonden waarop jullie direct willen starten, weinig organisatie willen en toch een duidelijke run-based uitdaging zoeken.",
    tags: ["Roguelike", "Fast runs", "Co-op", "Low setup"],
    mode: "Quick session"
  },
  {
    id: 5,
    name: "Valheim",
    image: "linear-gradient(135deg, rgba(44, 76, 58, .86), rgba(255, 200, 87, .18)), url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80')",
    score: 92,
    price: "€19,99",
    owned: "4/5 bezit",
    playModes: ["Co-op PvE", "Singleplayer"],
    types: ["Survival", "Co-op", "PvE", "Crafting", "Long"],
    desc: "Een survival crafting avontuur met bouwen, varen, boss fights en veel ruimte voor gezamenlijke projecten. Voor jullie squad is dit sterk als langlopend avontuur waarin iedereen een rol kan pakken: bouwer, farmer, explorer of chaos-agent.",
    tags: ["Survival", "Crafting", "Bosses", "Long adventure"],
    mode: "Squad project"
  },
  {
    id: 6,
    name: "The Finals",
    image: "linear-gradient(135deg, rgba(100, 38, 63, .86), rgba(255, 92, 122, .24)), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80')",
    score: 78,
    price: "Free-to-play",
    owned: "5/5 kan spelen",
    playModes: ["PvP", "Team PvP"],
    types: ["PvP", "Shooter", "Competitive", "Quick"],
    desc: "Een snelle team shooter met destructieve arena's, cashout objectives en veel clutch-momenten. Goed wanneer jullie competitieve energie hebben, maar minder geschikt als iemand een relaxte PvE-avond zoekt.",
    tags: ["PvP", "Team shooter", "Free", "Competitive"],
    mode: "PvP night"
  },
  {
    id: 7,
    name: "Baldur's Gate 3",
    image: "linear-gradient(135deg, rgba(72, 44, 92, .86), rgba(125, 92, 255, .22)), url('https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80')",
    score: 84,
    price: "€59,99",
    owned: "2/5 bezit",
    playModes: ["Co-op PvE", "Singleplayer"],
    types: ["RPG", "Co-op", "PvE", "Story", "Long"],
    desc: "Een diepe party RPG waarin keuzes, builds en compleet ontsporende plannen centraal staan. Niet de makkelijkste game voor korte sessies, maar uitstekend als jullie een verhalend avontuur willen dat maanden kan meegaan.",
    tags: ["RPG", "Story", "Co-op", "Long campaign"],
    mode: "Campaign"
  },
  {
    id: 8,
    name: "Palworld",
    image: "linear-gradient(135deg, rgba(42, 83, 92, .86), rgba(0, 228, 168, .20)), url('https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80')",
    score: 86,
    price: "€28,99",
    owned: "3/5 bezit",
    playModes: ["Co-op PvE", "Singleplayer"],
    types: ["Survival", "Co-op", "PvE", "Crafting", "Base building"],
    desc: "Een survival crafting game met creature collecting, base automation en genoeg rare situaties om de feed vol te krijgen. Vooral interessant als jullie houden van bouwen, verzamelen en semi-chaotische sandbox progressie.",
    tags: ["Survival", "Base building", "Creature collecting", "Co-op"],
    mode: "New adventure"
  },
  {
    id: 9,
    name: "Rocket League",
    image: "linear-gradient(135deg, rgba(31, 50, 93, .86), rgba(255, 200, 87, .24)), url('https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80')",
    score: 83,
    price: "Free-to-play",
    owned: "5/5 kan spelen",
    playModes: ["PvP", "Co-op vs AI"],
    types: ["PvP", "Competitive", "Quick", "LAN"],
    desc: "Snelle matches, direct plezier en genoeg ruimte voor zowel tryhard als domme goals. Voor LAN-avonden is dit een sterke fallback omdat iedereen snel begrijpt wat de bedoeling is en potjes kort blijven.",
    tags: ["PvP", "Quick matches", "Free", "LAN"],
    mode: "LAN tournament"
  },
  {
    id: 10,
    name: "Satisfactory",
    image: "linear-gradient(135deg, rgba(88, 56, 28, .86), rgba(255, 200, 87, .20)), url('https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=900&q=80')",
    score: 79,
    price: "€39,99",
    owned: "2/5 bezit",
    playModes: ["Co-op PvE", "Singleplayer"],
    types: ["Automation", "Co-op", "PvE", "Building", "Long"],
    desc: "Een fabriek-bouwgame waarin optimalisatie, spaghetti-belts en steeds grotere plannen centraal staan. Niet iedereen zal dit even leuk vinden, maar voor squads met planners en builders kan dit gevaarlijk verslavend zijn.",
    tags: ["Automation", "Building", "Long project", "Co-op"],
    mode: "Builder pick"
  },
  {
    id: 11,
    name: "Lethal Company",
    image: "linear-gradient(135deg, rgba(55, 57, 71, .88), rgba(255, 92, 122, .18)), url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80')",
    score: 90,
    price: "€9,75",
    owned: "4/5 bezit",
    playModes: ["Co-op PvE"],
    types: ["Horror", "Co-op", "PvE", "Quick", "LAN"],
    desc: "Een goedkope co-op horror game die vooral werkt door voice chat, paniek en slechte beslissingen. Perfect voor korte avonden waarin jullie niet per se progressie zoeken, maar wel gegarandeerd sterke momenten krijgen.",
    tags: ["Horror", "Co-op", "Cheap", "Voice chaos"],
    mode: "Chaos pick"
  },
  {
    id: 12,
    name: "Stardew Valley",
    image: "linear-gradient(135deg, rgba(55, 92, 59, .86), rgba(0, 228, 168, .18)), url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80')",
    score: 76,
    price: "€13,99",
    owned: "3/5 bezit",
    playModes: ["Co-op PvE", "Singleplayer"],
    types: ["Cozy", "Co-op", "PvE", "Farming", "Long"],
    desc: "Een rustige farming en life sim die goed werkt als jullie een break willen van shooters en stress. De game is niet spectaculair in presentatie, maar wel sterk voor ontspannen sessies met vaste progressie.",
    tags: ["Cozy", "Farming", "Co-op", "Relaxed"],
    mode: "Chill pick"
  }
];


baseDiscoverGames.push(
  {
    id: 13,
    name: "Enshrouded",
    image: "linear-gradient(135deg, rgba(62, 48, 82, .86), rgba(255, 200, 87, .16)), url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80')",
    score: 88,
    price: "€29,99",
    owned: "2/5 bezit",
    playModes: ["Co-op PvE", "Singleplayer"],
    types: ["Survival", "Co-op", "PvE", "Crafting", "RPG", "Long"],
    desc: "Een survival RPG met bouwen, crafting, exploration en progression die goed past bij squads die een gezamenlijk project zoeken. De game geeft genoeg vrijheid voor spelers met verschillende rollen zonder meteen te hardcore te worden.",
    tags: ["Survival", "RPG", "Building", "Co-op"],
    mode: "Recommended"
  },
  {
    id: 14,
    name: "Helldivers 2",
    image: "linear-gradient(135deg, rgba(44, 55, 100, .86), rgba(0, 228, 168, .14)), url('https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=900&q=80')",
    score: 93,
    price: "€39,99",
    owned: "4/5 bezit",
    playModes: ["Co-op PvE"],
    types: ["Co-op", "PvE", "Shooter", "Quick"],
    desc: "Een co-op shooter waarin chaos, teamwork en friendly fire constant door elkaar lopen. Sterk voor korte sessies, maar ook goed voor vaste avonden omdat missies duidelijk en snel te plannen zijn.",
    tags: ["Co-op", "PvE", "Shooter", "Squad chaos"],
    mode: "Squad favorite"
  },
  {
    id: 15,
    name: "Sea of Thieves",
    image: "linear-gradient(135deg, rgba(24, 77, 92, .86), rgba(0, 228, 168, .18)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80')",
    score: 82,
    price: "€39,99",
    owned: "3/5 bezit",
    playModes: ["Co-op PvE", "PvP"],
    types: ["Co-op", "PvE", "PvP", "Exploration", "Long"],
    desc: "Een piraten sandbox waar PvE voyages en onverwachte PvP elkaar kunnen afwisselen. Vooral interessant als jullie verhalen willen maken in plaats van alleen objectives afvinken.",
    tags: ["Co-op", "PvP mogelijk", "Sandbox", "Adventure"],
    mode: "Adventure pick"
  },
  {
    id: 16,
    name: "Hunt: Showdown",
    image: "linear-gradient(135deg, rgba(56, 38, 33, .88), rgba(255, 92, 122, .17)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80')",
    score: 77,
    price: "€39,99",
    owned: "1/5 bezit",
    playModes: ["PvPvE"],
    types: ["PvP", "PvE", "Shooter", "Hardcore"],
    desc: "Een spanningsvolle extraction shooter waarin PvE monsters vooral drukmiddelen zijn en andere spelers de echte dreiging vormen. Niet casual, maar wel sterk als jullie houden van intense comms en high-stakes momenten.",
    tags: ["PvPvE", "Extraction", "Hardcore", "Shooter"],
    mode: "Hardcore pick"
  },
  {
    id: 17,
    name: "Raft",
    image: "linear-gradient(135deg, rgba(31, 75, 86, .86), rgba(255, 200, 87, .14)), url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80')",
    score: 80,
    price: "€19,99",
    owned: "3/5 bezit",
    playModes: ["Co-op PvE", "Singleplayer"],
    types: ["Survival", "Co-op", "PvE", "Crafting", "Long"],
    desc: "Een relaxtere survival game waarin jullie langzaam een drijvende basis uitbouwen. Goed voor squads die progression willen zonder constant onder maximale stress te staan.",
    tags: ["Survival", "Crafting", "Chill", "Co-op"],
    mode: "Chill survival"
  },
  {
    id: 18,
    name: "Phasmophobia",
    image: "linear-gradient(135deg, rgba(34, 39, 58, .88), rgba(125, 92, 255, .16)), url('https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=900&q=80')",
    score: 85,
    price: "€16,79",
    owned: "4/5 bezit",
    playModes: ["Co-op PvE"],
    types: ["Horror", "Co-op", "PvE", "Quick", "LAN"],
    desc: "Een co-op ghost hunting game die vooral draait om communicatie, spanning en paniek. Sterk voor korte sessies of LAN-avonden waarbij lachen en schrikken belangrijker is dan lange progressie.",
    tags: ["Horror", "Co-op", "PvE", "Voice"],
    mode: "Party horror"
  }
);


const discoverGames = baseDiscoverGames;

const initialPresence = [
  { name: "Shane", status: "online", activity: "Browsing SquadUp.gg", game: "SquadUp.gg", minutes: 12, joinable: false, mood: "Survival", availability: "yes", ring: "online" },
  { name: "Kevin", status: "playing", activity: "Playing Helldivers 2", game: "Helldivers 2", minutes: 48, joinable: true, mood: "Competitive", availability: "yes", ring: "playing" },
  { name: "Tom", status: "voice", activity: "In Discord voice", game: "Deep Rock Galactic", minutes: 22, joinable: true, mood: "Quick", availability: "yes", ring: "voice" },
  { name: "Sven", status: "idle", activity: "Idle", game: "Away", minutes: 7, joinable: false, mood: "Chill", availability: "maybe", ring: "idle" },
  { name: "Mark", status: "offline", activity: "Offline", game: "Last seen: Valheim", minutes: 0, joinable: false, mood: "Long", availability: "no", ring: "offline" }
];

const moodOptions = ["Chill", "Competitive", "Horror", "Survival", "Quick", "Long"];
const lengthOptions = ["30-60 min", "1-2 uur", "All night", "LAN weekend"];


const themeOptions = [
  { id: "neon", name: "Neon Command", vibe: "Futuristic dashboard met grote statusblokken en glow-heavy cards.", unlock: "Default" },
  { id: "deck", name: "Steam Deck", vibe: "Console-first layout met side rail, compacte cards en focus op controls.", unlock: "Level 5" },
  { id: "arcade", name: "Cyber Arcade", vibe: "Retro neon, chunky panels en arcade-achtige call-to-actions.", unlock: "10 game nights" },
  { id: "cozy", name: "Cozy Quest", vibe: "Warme fantasy-card layout met rustiger tempo en adventure gevoel.", unlock: "3 long adventures" },
  { id: "lanparty", name: "LAN Party", vibe: "Retro hardware dashboard met amber UI, terminal panels en LAN energy.", unlock: "LAN event" },
  { id: "minimal", name: "Minimal Pro", vibe: "Strakke lichte utility layout met snelle planning en weinig afleiding.", unlock: "Productivity mode" },
  { id: "grid", name: "Grid Command", vibe: "Tactische grid layout met statuspanelen, mission control en data-overzicht.", unlock: "Squad level 8" },
  { id: "carousel", name: "Carousel Focus", vibe: "Media-first home met grote game carousel en visuele discovery.", unlock: "Discovery streak" },
  { id: "sidenav", name: "Side Nav Command", vibe: "Desktop-dashboard gevoel met vaste zij-navigatie en command center.", unlock: "Power user" },
  { id: "immersion", name: "Full Immersion", vibe: "Cinematic fullscreen adventure, grote beelden en minimale chrome.", unlock: "Epic campaign" }
];



const initialEvents = [
  {
    id: 1,
    title: "Helldivers 2 chaos run",
    game: "Helldivers 2",
    day: "VRI",
    time: "20:00",
    icon: "🛸",
    type: "Game Night",
    status: { Shane: "ready", Kevin: "maybe", Tom: "ready", Sven: "ready", Mark: "ready" }
  },
  {
    id: 2,
    title: "LAN prep night",
    game: "Setup + party games",
    day: "DON",
    time: "20:30",
    icon: "🧰",
    type: "Planning",
    status: { Shane: "ready", Kevin: "maybe", Tom: "maybe", Sven: "ready", Mark: "maybe" }
  }
];

const initialFeed = [
  {
    id: 1,
    type: "purchase",
    icon: "🛒",
    title: "Kevin kocht Monster Hunter Wilds",
    body: "3 squad members hebben hem nu. Hype level stijgt.",
    action: "Plan hunt",
    reactions: 6
  },
  {
    id: 2,
    type: "badge",
    icon: "🏅",
    title: "Shane unlocked Pathfinder",
    body: "Omdat 3 voorgestelde games zijn ingepland door de squad.",
    action: "Bekijk badge",
    reactions: 4
  },
  {
    id: 3,
    type: "session",
    icon: "✅",
    title: "Friday night bijna vol",
    body: "4/5 ready voor Helldivers 2 om 20:00.",
    action: "Join",
    reactions: 3
  }
];


const steamDbToday = [
  { rank: 1, name: "Counter-Strike 2", current: "761k", peak: "1.33M", mode: "PvP", tag: "Competitive" },
  { rank: 2, name: "Dota 2", current: "344k", peak: "579k", mode: "PvP", tag: "MOBA" },
  { rank: 3, name: "PUBG: BATTLEGROUNDS", current: "327k", peak: "773k", mode: "PvP", tag: "Battle Royale" },
  { rank: 4, name: "Apex Legends", current: "126k", peak: "296k", mode: "PvP", tag: "Squad shooter" },
  { rank: 5, name: "Rust", current: "120k", peak: "245k", mode: "PvP/PvE", tag: "Survival" },
  { rank: 6, name: "Team Fortress 2", current: "92k", peak: "151k", mode: "PvP", tag: "Classic" }
];



function getBadge(id) {
  return badgeLibrary.find(b => b.id === id);
}

function App() {
  const [tab, setTab] = useState("home");
  const [squad, setSquad] = useState(initialSquad);
  const [events, setEvents] = useState(initialEvents);
  const [feed, setFeed] = useState(initialFeed);
  const [selectedHero, setSelectedHero] = useState(0);
  const [toast, setToast] = useState("");
  const [selectedBadges, setSelectedBadges] = useState(["reliable", "lanlord", "pathfinder"]);
  const [lanChecklist, setLanChecklist] = useState([
    { id: 1, label: "Extra monitor", done: false },
    { id: 2, label: "Verlengsnoeren", done: true },
    { id: 3, label: "Snacks + drinken", done: false },
    { id: 4, label: "Switch / router", done: true },
    { id: 5, label: "Slaapplekken", done: false }
  ]);

  const [lanParties, setLanParties] = useState([
    {
      id: 1,
      title: "LAN weekend",
      date: "24-26 mei",
      location: "Bij Kevin",
      attendees: 6,
      food: "Pizza",
      note: "Rocket League bracket + survival night"
    }
  ]);
  const [avatarImage, setAvatarImage] = useState("");
  const [avatarPreset, setAvatarPreset] = useState("S");
  const [userGameStatus, setUserGameStatus] = useState({});
  const [linkedAccounts, setLinkedAccounts] = useState({
    steam: false,
    discord: true,
    microsoft: false,
    google: false,
    apple: false
  });
  const [presence, setPresence] = useState(initialPresence);
  const [myAvailability, setMyAvailability] = useState("yes");
  const [squadMood, setSquadMood] = useState("Quick");
  const [sessionLength, setSessionLength] = useState("1-2 uur");
  const [activeTheme, setActiveTheme] = useState("neon");

  function notify(message) {
    setToast(message);
    window.clearTimeout(window.__squadupToast);
    window.__squadupToast = window.setTimeout(() => setToast(""), 1900);
  }

  function addXp(amount, reason) {
    setSquad(prev => prev.map(member => {
      if (member.name !== userName) return member;
      const xp = member.xp + amount;
      return { ...member, xp, level: Math.max(member.level, Math.floor(xp / 170) + 1) };
    }));
    notify(`+${amount} XP · ${reason}`);
  }

  function setAttendance(eventId, status) {
    setEvents(prev => prev.map(event => event.id === eventId ? {
      ...event,
      status: { ...event.status, [userName]: status }
    } : event));
    addXp(status === "ready" ? 25 : 5, status === "ready" ? "Ready gezet" : "Status bijgewerkt");
  }

  function planGame(game) {
    const newEvent = {
      id: Date.now(),
      title: `${game.name} squad run`,
      game: game.name,
      day: "VRI",
      time: "20:00",
      icon: "🎮",
      type: "Squad Match",
      status: { Shane: "ready", Kevin: "maybe", Tom: "maybe", Sven: "ready", Mark: "maybe" }
    };
    setEvents(prev => [newEvent, ...prev]);
    setFeed(prev => [{
      id: Date.now(),
      type: "session",
      icon: "📅",
      title: `${game.name} is ingepland`,
      body: "Nieuwe game night aangemaakt vanuit Discover.",
      action: "Open planning",
      reactions: 1
    }, ...prev]);
    setTab("plan");
    addXp(40, "Game night gepland");
  }

  function cyclePresence() {
    setPresence(prev => prev.map(member => {
      if (member.name === "Kevin") return { ...member, game: member.game === "Helldivers 2" ? "Deep Rock Galactic" : "Helldivers 2", activity: member.game === "Helldivers 2" ? "Playing Deep Rock Galactic" : "Playing Helldivers 2", minutes: member.minutes + 6 };
      if (member.name === "Sven") return { ...member, status: member.status === "idle" ? "online" : "idle", ring: member.ring === "idle" ? "online" : "idle", activity: member.status === "idle" ? "Online now" : "Idle" };
      return member;
    }));
    notify("Live presence bijgewerkt");
  }

  function setAvailability(value) {
    setMyAvailability(value);
    setPresence(prev => prev.map(member => member.name === userName ? { ...member, availability: value } : member));
    addXp(12, "Beschikbaarheid bijgewerkt");
  }

  function tonightScore(game) {
    const onlineCount = presence.filter(p => ["online", "playing", "voice"].includes(p.status)).length;
    const activeForGame = presence.filter(p => p.game === game.name).length;
    const lengthBoost = sessionLength === "30-60 min" && game.types?.includes("Quick") ? 8 : sessionLength === "All night" && game.types?.includes("Long") ? 8 : 0;
    const moodBoost = game.types?.includes(squadMood) || game.tags?.includes(squadMood) ? 10 : 0;
    const base = game.score || 75;
    return Math.min(99, Math.round(base * 0.62 + onlineCount * 5 + activeForGame * 8 + lengthBoost + moodBoost));
  }

  function getTonightPicks() {
    return [...discoverGames]
      .map(game => ({ ...game, tonightScore: tonightScore(game) }))
      .sort((a, b) => b.tonightScore - a.tonightScore)
      .slice(0, 3);
  }

  function simulatePurchase() {
    const purchases = [
      ["Tom", "Risk of Rain 2"],
      ["Sven", "No Man's Sky"],
      ["Kevin", "Deep Rock Galactic"],
      ["Mark", "Project Zomboid"]
    ];
    const [name, game] = purchases[Math.floor(Math.random() * purchases.length)];
    setFeed(prev => [{
      id: Date.now(),
      type: "purchase",
      icon: "🛒",
      title: `${name} kocht ${game}`,
      body: "Nieuwe game gekocht. SquadUp detecteert momentum voor een nieuwe sessie.",
      action: "Plan session",
      reactions: 0
    }, ...prev]);
    notify("Nieuwe game purchase alert toegevoegd");
  }

  const me = squad.find(m => m.name === userName);
  const currentEvent = events[0];
  const heroSlides = [
    {
      eyebrow: "Vanavond",
      title: currentEvent.title,
      body: `${readyCount(currentEvent)}/5 ready · ${currentEvent.time} · ${currentEvent.game}`,
      cta: "Open planning",
      icon: currentEvent.icon,
      action: () => setTab("plan"),
      bg: "heroNight"
    },
    {
      eyebrow: "Nieuwe squad match",
      title: "Deep Rock Galactic",
      body: "94% match · iedereen bezit hem · perfecte korte sessies.",
      cta: "Plan deze",
      icon: "⛏️",
      action: () => planGame(discoverGames[0]),
      bg: "heroMatch"
    },
    {
      eyebrow: "LAN weekend",
      title: "LAN party readiness",
      body: `${Math.round((lanChecklist.filter(i => i.done).length / lanChecklist.length) * 100)}% voorbereid · food vote open.`,
      cta: "Open LAN hub",
      icon: "💻",
      action: () => setTab("lan"),
      bg: "heroLan"
    }
  ];

  return (
    <div className="shell">
      <div className={`app theme-${activeTheme}`}>
        <header className="topbar">
          <button className="brand" onClick={() => setTab("home")}>
            <div className="brandIcon"><Gamepad2 size={22} /></div>
            <div>
              <strong>SquadUp<span>.gg</span></strong>
              <small>v0.19 · Friday Squad</small>
            </div>
          </button>
          <button className="iconButton" onClick={simulatePurchase}><ShoppingBag size={19} /></button>
        </header>

        {tab === "home" && (
          <HomeScreen
            slides={heroSlides}
            selectedHero={selectedHero}
            setSelectedHero={setSelectedHero}
            event={currentEvent}
            feed={feed}
            setFeed={setFeed}
            squad={squad}
            me={me}
            selectedBadges={selectedBadges}
            planGame={planGame}
            setTab={setTab}
            notify={notify}
            addXp={addXp}
            presence={presence}
            cyclePresence={cyclePresence}
            myAvailability={myAvailability}
            setAvailability={setAvailability}
            squadMood={squadMood}
            setSquadMood={setSquadMood}
            sessionLength={sessionLength}
            setSessionLength={setSessionLength}
            tonightPicks={getTonightPicks()}
            activeTheme={activeTheme}
          />
        )}

        {tab === "discover" && <DiscoverScreen games={discoverGames} planGame={planGame} userGameStatus={userGameStatus} setUserGameStatus={setUserGameStatus} addXp={addXp} />}
        {tab === "plan" && <PlanScreen events={events} setAttendance={setAttendance} setTab={setTab} />}
        {tab === "lan" && <LanScreen checklist={lanChecklist} setChecklist={setLanChecklist} addXp={addXp} lanParties={lanParties} setLanParties={setLanParties} />}
        {tab === "profile" && (
          <ProfileScreen
            me={me}
            squad={squad}
            selectedBadges={selectedBadges}
            setSelectedBadges={setSelectedBadges}
            notify={notify}
            avatarImage={avatarImage}
            setAvatarImage={setAvatarImage}
            avatarPreset={avatarPreset}
            setAvatarPreset={setAvatarPreset}
            linkedAccounts={linkedAccounts}
            setLinkedAccounts={setLinkedAccounts}
            addXp={addXp}
            activeTheme={activeTheme}
            setActiveTheme={setActiveTheme}
          />
        )}

        <button className="fab" onClick={() => {
          setEvents(prev => [{
            id: Date.now(),
            title: "Quick Game Night",
            game: "Nog te kiezen",
            day: "ZON",
            time: "19:30",
            icon: "🎮",
            type: "Quick Plan",
            status: { Shane: "ready", Kevin: "maybe", Tom: "maybe", Sven: "maybe", Mark: "maybe" }
          }, ...prev]);
          addXp(30, "Quick plan gemaakt");
          setTab("plan");
        }}>
          <Plus size={27} />
        </button>

        <BottomNav tab={tab} setTab={setTab} />
        <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
      </div>
    </div>
  );
}


function HomeLayoutFrame(props) {
  const { activeTheme } = props;
  if (activeTheme === "deck") return <DeckHome {...props} />;
  if (activeTheme === "arcade") return <ArcadeHome {...props} />;
  if (activeTheme === "cozy") return <CozyHome {...props} />;
  if (activeTheme === "lanparty") return <LanPartyHome {...props} />;
  if (activeTheme === "minimal") return <MinimalHome {...props} />;
  if (activeTheme === "grid") return <GridCommandHome {...props} />;
  if (activeTheme === "carousel") return <CarouselHome {...props} />;
  if (activeTheme === "sidenav") return <SideNavHome {...props} />;
  if (activeTheme === "immersion") return <ImmersionHome {...props} />;
  return <NeonHome {...props} />;
}

function ThemeHomeCore({ event, presence, cyclePresence, myAvailability, setAvailability, squadMood, setSquadMood, sessionLength, setSessionLength, tonightPicks, planGame, feed, setFeed, setTab, addXp, squad }) {
  function react(id) {
    setFeed(prev => prev.map(item => item.id === id ? { ...item, reactions: item.reactions + 1 } : item));
    addXp(8, "Feed reactie");
  }

  return (
    <>
      <SectionHeader title="Live squad presence" action="Mock realtime" />
      <PresenceStrip presence={presence} onRefresh={cyclePresence} />

      <SectionHeader title="Available tonight?" action="1 tap" />
      <AvailabilityPanel value={myAvailability} onChange={setAvailability} mood={squadMood} setMood={setSquadMood} length={sessionLength} setLength={setSessionLength} />

      <SectionHeader title="What should we play tonight?" action="Smart picks" />
      <TonightPicks picks={tonightPicks} onPlan={planGame} />

      <SectionHeader title="Volgende sessie" action={`${readyCount(event)}/5 ready`} />
      <EventCard event={event} onAttendance={(status) => addXp(5, `Status: ${status}`)} />

      <SectionHeader title="Squad feed" action="Momentum" />
      <div className="feedStack">
        {feed.slice(0, 3).map(item => (
          <FeedCard key={item.id} item={item} onReact={() => react(item.id)} onAction={() => setTab("plan")} />
        ))}
      </div>

      <SectionHeader title="Leaderboard" action="Deze maand" />
      <Leaderboard squad={squad} />
    </>
  );
}

function NeonHome(props) {
  const slide = props.slides[props.selectedHero];
  return (
    <>
      <section className={`heroCarousel ${slide.bg}`}>
        <div className="heroIcon">{slide.icon}</div>
        <div className="kicker"><Sparkles size={14} /> {slide.eyebrow}</div>
        <h1>{slide.title}</h1>
        <p>{slide.body}</p>
        <button className="primaryBtn" onClick={slide.action}>{slide.cta}</button>
        <div className="dots">{props.slides.map((_, i) => <button key={i} className={props.selectedHero === i ? "active" : ""} onClick={() => props.setSelectedHero(i)} />)}</div>
      </section>
      <ThemeIdentity activeTheme={props.activeTheme} />
      <IdentityCard {...props} />
      <ThemeHomeCore {...props} />
    </>
  );
}

function DeckHome(props) {
  return (
    <div className="deckHome">
      <aside className="deckRail"><Home size={16}/><Search size={16}/><Users size={16}/><CalendarDays size={16}/></aside>
      <div className="deckMain">
        <CompactHero title="Good evening, squad" body="Console layout · focus op quick actions" action="Find match" onClick={() => props.setTab("discover")} />
        <ThemeIdentity activeTheme={props.activeTheme} />
        <ThemeHomeCore {...props} />
      </div>
    </div>
  );
}

function ArcadeHome(props) {
  return (
    <>
      <section className="arcadeHero">
        <div className="kicker">PRESS START</div>
        <h1>WHAT WE PLAYING TONIGHT?</h1>
        <button onClick={() => props.planGame(props.tonightPicks[0])}>START MATCH</button>
      </section>
      <ThemeIdentity activeTheme={props.activeTheme} />
      <ThemeHomeCore {...props} />
    </>
  );
}

function CozyHome(props) {
  return (
    <>
      <section className="cozyHero">
        <div className="kicker">Your Squad</div>
        <h1>What shall we play tonight?</h1>
        <p>We've got some great ideas for a warm, chaotic adventure.</p>
        <button onClick={() => props.setTab("discover")}>Open adventure board</button>
      </section>
      <ThemeIdentity activeTheme={props.activeTheme} />
      <ThemeHomeCore {...props} />
    </>
  );
}

function LanPartyHome(props) {
  return (
    <>
      <section className="lanPartyHero">
        <div className="lanScreenText">WHAT ARE WE PLAYING TONIGHT?</div>
        <button onClick={() => props.setTab("lan")}>OPEN LAN HUB</button>
      </section>
      <ThemeIdentity activeTheme={props.activeTheme} />
      <ThemeHomeCore {...props} />
    </>
  );
}

function MinimalHome(props) {
  return (
    <>
      <section className="minimalHero">
        <h1>What should we play tonight?</h1>
        <p>Smart picks for your squad, zonder overbodige ruis.</p>
        <button onClick={() => props.planGame(props.tonightPicks[0])}>→</button>
      </section>
      <ThemeIdentity activeTheme={props.activeTheme} />
      <ThemeHomeCore {...props} />
    </>
  );
}

function GridCommandHome(props) {
  return (
    <>
      <section className="gridCommand">
        <div><strong>Squad Online</strong><p>{props.presence.filter(p => p.status !== "offline").length} active signals</p></div>
        <div><strong>Currently Playing</strong><p>{props.presence.find(p => p.status === "playing")?.game || "None"}</p></div>
        <div className="wide"><strong>Mission Control</strong><button onClick={() => props.planGame(props.tonightPicks[0])}>Find Match</button></div>
      </section>
      <ThemeIdentity activeTheme={props.activeTheme} />
      <ThemeHomeCore {...props} />
    </>
  );
}

function CarouselHome(props) {
  return (
    <>
      <section className="carouselFocus">
        {props.tonightPicks.map((game, i) => (
          <article key={game.id} className={i === 0 ? "focus" : ""}>
            <span>{game.icon || "🎮"}</span>
            <h2>{game.name}</h2>
            <p>{game.tonightScore}% tonight fit</p>
            <button onClick={() => props.planGame(game)}>Join</button>
          </article>
        ))}
      </section>
      <ThemeIdentity activeTheme={props.activeTheme} />
      <ThemeHomeCore {...props} />
    </>
  );
}

function SideNavHome(props) {
  return (
    <div className="sideNavLayout">
      <aside><b>Dashboard</b><span>Discover</span><span>Squad</span><span>Plan</span><span>Games</span></aside>
      <main>
        <CompactHero title="Dashboard" body="Command center voor je squad." action="Tonight match" onClick={() => props.planGame(props.tonightPicks[0])} />
        <ThemeIdentity activeTheme={props.activeTheme} />
        <ThemeHomeCore {...props} />
      </main>
    </div>
  );
}

function ImmersionHome(props) {
  return (
    <>
      <section className="immersionHero">
        <div>
          <h1>WHAT EPIC ADVENTURE TONIGHT?</h1>
          <p>The squad is ready. The choice is yours.</p>
          <button onClick={() => props.setTab("discover")}>Find your game</button>
        </div>
      </section>
      <ThemeIdentity activeTheme={props.activeTheme} />
      <ThemeHomeCore {...props} />
    </>
  );
}

function CompactHero({ title, body, action, onClick }) {
  return <section className="compactHero"><h1>{title}</h1><p>{body}</p><button onClick={onClick}>{action}</button></section>;
}

function ThemeIdentity({ activeTheme }) {
  return (
    <article className="themeIdentity">
      <span>Active layout mode</span>
      <strong>{themeOptions.find(t => t.id === activeTheme)?.name}</strong>
    </article>
  );
}

function IdentityCard({ me, selectedBadges }) {
  return (
    <section className="identityCard">
      <div className="avatarBig">S</div>
      <div className="identityMain">
        <div className="identityTop">
          <div><h2>{me.name}</h2><p>Level {me.level} · {me.xp} XP</p></div>
          <span className="rankPill"><Crown size={13} /> Squad Captain</span>
        </div>
        <div className="xpBar"><span style={{ width: `${me.xp % 170 / 170 * 100}%` }} /></div>
        <BadgeShowcase ids={selectedBadges} />
      </div>
    </section>
  );
}

function HomeScreen({
  return (
    <main className="screen">
      <HomeLayoutFrame {...arguments[0]} />
    </main>
  );
}

function PresenceStrip({ presence, onRefresh }) {
  const online = presence.filter(p => ["online", "playing", "voice"].includes(p.status)).length;
  const playing = presence.filter(p => p.status === "playing" || p.status === "voice").length;

  return (
    <article className="presencePanel">
      <div className="presenceSummary">
        <div>
          <strong>{online} online</strong>
          <span>{playing} playing / voice</span>
        </div>
        <button onClick={onRefresh}><Radio size={15} /> Refresh</button>
      </div>
      <div className="presenceScroller">
        {presence.map(member => (
          <div className={`presenceCard ${member.ring}`} key={member.name}>
            <div className="presenceAvatar">{member.name[0]}</div>
            <strong>{member.name}</strong>
            <span>{member.activity}</span>
            <small>{member.status === "offline" ? "offline" : `${member.minutes} min`}</small>
            {member.joinable && <button>Joinable</button>}
          </div>
        ))}
      </div>
    </article>
  );
}

function AvailabilityPanel({ value, onChange, mood, setMood, length, setLength }) {
  return (
    <article className="availabilityPanel">
      <div className="availabilityButtons">
        <button className={value === "yes" ? "yes active" : "yes"} onClick={() => onChange("yes")}>✅ Free</button>
        <button className={value === "maybe" ? "maybe active" : "maybe"} onClick={() => onChange("maybe")}>🤔 Maybe</button>
        <button className={value === "no" ? "no active" : "no"} onClick={() => onChange("no")}>💤 No</button>
      </div>

      <div className="selectorBlock">
        <div className="selectorTitle"><Flame size={15} /> Squad mood</div>
        <div className="choiceRow">
          {moodOptions.map(option => (
            <button key={option} className={mood === option ? "active" : ""} onClick={() => setMood(option)}>{option}</button>
          ))}
        </div>
      </div>

      <div className="selectorBlock">
        <div className="selectorTitle"><Clock size={15} /> Session length</div>
        <div className="choiceRow">
          {lengthOptions.map(option => (
            <button key={option} className={length === option ? "active" : ""} onClick={() => setLength(option)}>{option}</button>
          ))}
        </div>
      </div>
    </article>
  );
}

function TonightPicks({ picks, onPlan }) {
  return (
    <div className="tonightStack">
      {picks.map((game, index) => (
        <article className={`tonightPick ${index === 0 ? "best" : ""}`} key={game.id}>
          <div className="tonightRank">#{index + 1}</div>
          <div>
            <h3>{game.name}</h3>
            <p>{game.playModes?.join(" · ")} · {game.mode}</p>
            <div className="tonightSignals">
              <span>{game.tonightScore}% tonight fit</span>
              <span>{game.owned}</span>
            </div>
          </div>
          <button onClick={() => onPlan(game)}>Plan</button>
        </article>
      ))}
    </div>
  );
}

function DiscoverScreen({ games, planGame, userGameStatus, setUserGameStatus, addXp }) {
  const [activeFilters, setActiveFilters] = useState(["All"]);
  const [visibleCount, setVisibleCount] = useState(14);

  const filters = ["All", "Survival", "Co-op", "PvE", "PvP", "Singleplayer", "LAN", "Quick", "Long", "RPG", "Horror", "Building"];

  const endlessGames = useMemo(() => {
    const suffixes = ["Squad Pick", "Weekend Pick", "LAN Candidate", "Backlog Revival", "Budget Alert"];
    return Array.from({ length: 8 }).flatMap((_, loop) =>
      games.map(game => ({
        ...game,
        id: game.id + loop * 100,
        score: Math.max(61, Math.min(99, game.score - loop * 3 + (game.id % 3))),
        mode: loop === 0 ? game.mode : suffixes[(game.id + loop) % suffixes.length]
      }))
    );
  }, [games]);

  const selected = activeFilters.includes("All") ? [] : activeFilters;

  const filtered = endlessGames.filter(game => {
    if (!selected.length) return true;
    return selected.every(filter => {
      if (filter === "Singleplayer") return game.playModes.includes("Singleplayer");
      return game.types.includes(filter) || game.playModes.includes(filter) || game.tags.includes(filter) || game.mode.includes(filter);
    });
  });

  const visibleGames = filtered.slice(0, visibleCount);

  function toggleFilter(filter) {
    setVisibleCount(14);
    if (filter === "All") {
      setActiveFilters(["All"]);
      return;
    }

    setActiveFilters(prev => {
      const withoutAll = prev.filter(f => f !== "All");
      if (withoutAll.includes(filter)) {
        const next = withoutAll.filter(f => f !== filter);
        return next.length ? next : ["All"];
      }
      return [...withoutAll, filter];
    });
  }

  return (
    <main className="screen">
      <PageHeader
        icon={<Search size={18} />}
        label="Discover"
        title="Explore eindeloos nieuwe games voor je squad."
        body="Filter op Survival, Co-op, PvE, PvP, Singleplayer, LAN of korte sessies. Elke kaart toont speelmodus, prijs, ownership, matchscore en een langere beschrijving zodat je beter kunt kiezen."
      />

      <div className="filterBar">
        {filters.map(filter => (
          <button
            key={filter}
            className={activeFilters.includes(filter) ? "active" : ""}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="discoverMeta">
        <span>{filtered.length} squad matches</span>
        <span>{selected.length ? selected.join(" + ") : "Alle types"}</span>
      </div>

      <div className="discoverGrid">
        {visibleGames.map(game => <SteamGameCard key={game.id} game={game} onPlan={() => planGame(game)} userStatus={userGameStatus[game.name] || { owned: false, wishlist: false, installed: false, active: false }} onToggle={(field) => { setUserGameStatus(prev => ({ ...prev, [game.name]: { ...(prev[game.name] || { owned: false, wishlist: false, installed: false, active: false }), [field]: !(prev[game.name]?.[field]) } })); addXp(10, "Game status bijgewerkt"); }} />)}
      </div>

      {visibleCount < filtered.length ? (
        <button className="wideButton" onClick={() => setVisibleCount(count => count + 12)}>
          Meer games laden
        </button>
      ) : (
        <div className="endOfList">Je hebt alle matches voor deze filters gezien.</div>
      )}
    </main>
  );
}

function PlanScreen({ events, setAttendance, setTab }) {
  return (
    <main className="screen">
      <PageHeader
        icon={<CalendarDays size={18} />}
        label="Planning"
        title="Simpele buttons. Duidelijke commitment."
        body="Geen groepsapp-chaos: Ready, Maybe of Out met één tap."
      />

      <div className="timeline">
        {events.map(event => (
          <div className="timelineRow" key={event.id}>
            <div className="dateBox"><strong>{event.day}</strong><span>{event.time}</span></div>
            <EventCard event={event} onAttendance={(status) => setAttendance(event.id, status)} />
          </div>
        ))}
      </div>

      <button className="wideButton" onClick={() => setTab("discover")}>Ontdek game voor volgende sessie</button>
    </main>
  );
}

function LanScreen({ checklist, setChecklist, addXp, lanParties, setLanParties }) {
  const done = checklist.filter(i => i.done).length;
  const pct = Math.round((done / checklist.length) * 100);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "Nieuwe LAN party", date: "Vrijdag 20:00", location: "TBD", food: "Pizza", note: "Games, food en gear nog bepalen" });

  function toggle(id) {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
    addXp(12, "LAN checklist");
  }

  function saveLanParty() {
    if (!form.title.trim()) return;
    if (editingId) {
      setLanParties(prev => prev.map(party => party.id === editingId ? { ...party, ...form } : party));
      addXp(20, "LAN party bewerkt");
    } else {
      setLanParties(prev => [{ id: Date.now(), attendees: 1, ...form }, ...prev]);
      addXp(45, "LAN party toegevoegd");
    }
    setEditingId(null);
    setForm({ title: "Nieuwe LAN party", date: "Vrijdag 20:00", location: "TBD", food: "Pizza", note: "Games, food en gear nog bepalen" });
  }

  function editParty(party) {
    setEditingId(party.id);
    setForm({ title: party.title, date: party.date, location: party.location, food: party.food, note: party.note });
    document.getElementById("lan-editor")?.scrollIntoView({ behavior: "smooth" });
  }

  function deleteParty(id) {
    setLanParties(prev => prev.filter(party => party.id !== id));
    addXp(5, "LAN planning opgeschoond");
  }

  function joinParty(id) {
    setLanParties(prev => prev.map(party => party.id === id ? { ...party, attendees: party.attendees + 1 } : party));
    addXp(35, "LAN deelname bevestigd");
  }

  return (
    <main className="screen">
      <section className="lanHero">
        <div className="kicker"><Laptop size={14} /> LAN party mode</div>
        <h1>Plan, bewerk en beheer LAN parties.</h1>
        <p>Duidelijke acties voor toevoegen, aanpassen, verwijderen en aanmelden. Geen verborgen menu’s.</p>
        <button className="primaryBtn" onClick={() => document.getElementById("lan-editor")?.scrollIntoView({ behavior: "smooth" })}>Nieuwe LAN party</button>
      </section>

      <SectionHeader title="LAN parties" action={`${lanParties.length} actief`} />
      <div className="lanPartyStack">
        {lanParties.map(party => (
          <article className="lanPartyCard" key={party.id}>
            <div className="split">
              <div>
                <h3>{party.title}</h3>
                <p>{party.date} · {party.location}</p>
              </div>
              <span className="readyPill">{party.attendees} going</span>
            </div>
            <div className="lanPartyMeta">
              <span>🍕 {party.food}</span>
              <span>📝 {party.note}</span>
            </div>
            <div className="lanButtonGrid">
              <button className="lanPrimary" onClick={() => joinParty(party.id)}>Join</button>
              <button className="lanEdit" onClick={() => editParty(party)}><Edit3 size={15} /> Bewerk</button>
              <button className="lanDelete" onClick={() => deleteParty(party.id)}><Trash2 size={15} /> Verwijder</button>
            </div>
          </article>
        ))}
      </div>

      <article className="card lanEditor" id="lan-editor">
        <div className="split">
          <h3>{editingId ? "LAN party bewerken" : "LAN party toevoegen"}</h3>
          {editingId && <button className="smallGhost" onClick={() => setEditingId(null)}>Annuleer</button>}
        </div>
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Naam LAN party" />
        <input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="Datum / tijd" />
        <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Locatie" />
        <input value={form.food} onChange={e => setForm({ ...form, food: e.target.value })} placeholder="Food voorkeur" />
        <textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} placeholder="Notitie" />
        <button className="wideButton" onClick={saveLanParty}>{editingId ? "Wijzigingen opslaan" : "LAN party toevoegen"}</button>
      </article>

      <article className="card">
        <div className="split">
          <h3>LAN readiness</h3>
          <strong className="scoreText">{pct}%</strong>
        </div>
        <div className="progress"><span style={{ width: `${pct}%` }} /></div>
        <div className="tileGrid">
          <MiniTile icon="👥" title="Attendees" value="6 confirmed" />
          <MiniTile icon="🍕" title="Food" value="Pizza wint" />
          <MiniTile icon="🏆" title="Tournament" value="Rocket League" />
          <MiniTile icon="🖥" title="Gear" value={`${checklist.length - done} open`} />
        </div>
      </article>

      <SectionHeader title="Loadout checklist" action="Tap to toggle" />
      <article className="card">
        {checklist.map(item => (
          <button key={item.id} className={`checkRow ${item.done ? "done" : ""}`} onClick={() => toggle(item.id)}>
            <span>{item.done ? "✅" : "⬜"}</span>
            {item.label}
          </button>
        ))}
      </article>
    </main>
  );
}

function ProfileScreen({ me, squad, selectedBadges, setSelectedBadges, notify, avatarImage, setAvatarImage, avatarPreset, setAvatarPreset, linkedAccounts, setLinkedAccounts, addXp, activeTheme, setActiveTheme }) {
  function handleAvatarUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarImage(reader.result);
      notify("Profielplaatje ingesteld");
    };
    reader.readAsDataURL(file);
  }

  function toggleAccount(key) {
    setLinkedAccounts(prev => ({ ...prev, [key]: !prev[key] }));
    addXp(linkedAccounts[key] ? 5 : 35, linkedAccounts[key] ? "Account ontkoppeld" : "Account gekoppeld");
  }

  function toggleBadge(id) {
    if (selectedBadges.includes(id)) {
      if (selectedBadges.length <= 1) return notify("Je moet minimaal 1 badge tonen");
      setSelectedBadges(prev => prev.filter(b => b !== id));
      return notify("Badge verborgen");
    }
    if (selectedBadges.length >= 3) return notify("Maximaal 3 badges zichtbaar");
    setSelectedBadges(prev => [...prev, id]);
    notify("Badge toegevoegd aan showcase");
  }

  return (
    <main className="screen">
      <section className="profileHero">
        <div className="avatarHuge">{avatarImage ? <img src={avatarImage} alt="Avatar" /> : avatarPreset}</div>
        <div>
          <div className="kicker"><User size={14} /> Profile</div>
          <h1>{me.name}</h1>
          <p>Level {me.level} · {me.xp} XP · Squad Captain</p>
          <BadgeShowcase ids={selectedBadges} />
        </div>
      </section>

      <div className="statsGrid">
        <Stat value={me.level} label="Level" />
        <Stat value={me.xp} label="XP" />
        <Stat value={`${me.ready}%`} label="Show-up" />
        <Stat value={me.discovery} label="Discoveries" />
      </div>

      <SectionHeader title="Profielplaatje" action="Upload of kies" />
      <article className="card avatarPicker">
        <label className="uploadButton">
          <Camera size={17} />
          Eigen plaatje uploaden
          <input type="file" accept="image/*" onChange={handleAvatarUpload} />
        </label>
        <div className="presetRow">
          {["S", "🎮", "🛸", "🐉", "💀", "🚀"].map(preset => (
            <button key={preset} className={avatarPreset === preset && !avatarImage ? "active" : ""} onClick={() => {
              setAvatarImage("");
              setAvatarPreset(preset);
              notify("Avatar gekozen");
            }}>{preset}</button>
          ))}
        </div>
      </article>

      <SectionHeader title="Layout engine" action="10 modes" />
      <article className="card themePicker">
        {themeOptions.map(theme => (
          <button key={theme.id} className={`themeOption ${theme.id} ${activeTheme === theme.id ? "active" : ""}`} onClick={() => {
            setActiveTheme(theme.id);
            notify(`${theme.name} actief`);
          }}>
            <div className="themePreview">
              <i></i><i></i><i></i>
            </div>
            <div>
              <strong>{theme.name}</strong>
              <p>{theme.vibe}</p>
              <em>{theme.unlock}</em>
            </div>
          </button>
        ))}
      </article>

      <SectionHeader title="Accounts koppelen" action="Sync hub" />
      <article className="card accountHub">
        <AccountButton platform="steam" title="Steam" subtitle="Owned games, playtime, wishlist" linked={linkedAccounts.steam} onClick={() => toggleAccount("steam")} />
        <AccountButton platform="discord" title="Discord" subtitle="Presence, voice, squad invites" linked={linkedAccounts.discord} onClick={() => toggleAccount("discord")} />
        <AccountButton platform="microsoft" title="Microsoft / Xbox" subtitle="Xbox identity en Game Pass later" linked={linkedAccounts.microsoft} onClick={() => toggleAccount("microsoft")} />
        <AccountButton platform="google" title="Google" subtitle="Snelle login en calendar later" linked={linkedAccounts.google} onClick={() => toggleAccount("google")} />
        <AccountButton platform="apple" title="Apple" subtitle="Private login voor iOS users" linked={linkedAccounts.apple} onClick={() => toggleAccount("apple")} />
      </article>

      <SectionHeader title="Badge showcase" action={`${selectedBadges.length}/3 actief`} />
      <div className="badgeGrid">
        {badgeLibrary.map(badge => (
          <button key={badge.id} className={`badgeCard ${selectedBadges.includes(badge.id) ? "selected" : ""}`} onClick={() => toggleBadge(badge.id)}>
            <span>{badge.icon}</span>
            <strong>{badge.title}</strong>
            <em>{badge.rarity}</em>
            <p>{badge.desc}</p>
          </button>
        ))}
      </div>

      <SectionHeader title="Squad leaderboard" action="XP" />
      <Leaderboard squad={squad} />
    </main>
  );
}

function AccountButton({ platform, title, subtitle, linked, onClick }) {
  const icons = {
    steam: "🎮",
    discord: "🟣",
    microsoft: "🟩",
    google: "G",
    apple: ""
  };

  return (
    <button className={`accountButton ${platform} ${linked ? "linked" : ""}`} onClick={onClick}>
      <span className="accountIcon">{icons[platform]}</span>
      <div>
        <strong>{linked ? `${title} gekoppeld` : `Koppel ${title}`}</strong>
        <small>{subtitle}</small>
      </div>
      <em>{linked ? "Connected" : "Connect"}</em>
    </button>
  );
}

function EventCard({ event, onAttendance }) {
  const ready = readyCount(event);
  const my = event.status.Shane;

  return (
    <article className="eventCard">
      <div className="eventHead">
        <div className="gameIcon">{event.icon}</div>
        <div>
          <h3>{event.title}</h3>
          <p>{event.game} · {event.type}</p>
        </div>
        <span className="readyPill">{ready}/5</span>
      </div>
      <div className="avatarRow">
        {Object.entries(event.status).map(([name, status]) => <span key={name} className={`miniAvatar ${status}`}>{name[0]}</span>)}
        <small>Jij: {my}</small>
      </div>
      <div className="actionTriad">
        <button className={my === "ready" ? "ready active" : "ready"} onClick={() => onAttendance("ready")}>Ready</button>
        <button className={my === "maybe" ? "maybe active" : "maybe"} onClick={() => onAttendance("maybe")}>Maybe</button>
        <button className={my === "out" ? "out active" : "out"} onClick={() => onAttendance("out")}>Out</button>
      </div>
    </article>
  );
}

function SteamDbToday() {
  return (
    <article className="steamDbPanel">
      {steamDbToday.map(game => (
        <div className="steamDbRow" key={game.rank}>
          <strong>#{game.rank}</strong>
          <div>
            <b>{game.name}</b>
            <span>{game.tag} · {game.mode}</span>
          </div>
          <em>{game.current}</em>
        </div>
      ))}
    </article>
  );
}

function SteamGameCard({ game, onPlan, userStatus, onToggle }) {
  const squad = game.squadStatus || {
    owned: game.owned?.startsWith("5/5") ? 5 : game.owned?.startsWith("4/5") ? 4 : game.owned?.startsWith("3/5") ? 3 : 2,
    wishlist: 2,
    installed: 2,
    active: 0
  };

  const steamRank = game.steamRank || (
    game.name === "Counter-Strike 2" ? 1 :
    game.name === "Dota 2" ? 2 :
    game.name === "PUBG: BATTLEGROUNDS" ? 3 :
    game.name === "Apex Legends" ? 4 :
    game.name === "Rust" ? 5 :
    game.name === "Deep Rock Galactic" ? 28 :
    null
  );

  const readiness = Math.min(99, Math.round(game.score * 0.55 + squad.owned * 6 + squad.installed * 5 + squad.active * 4));

  return (
    <article className="steamCard">
      <div className="steamArt" style={{ backgroundImage: game.image }}>
        <div className="artTopBadges">
          <span className="modePill">{game.mode}</span>
          {steamRank && <span className="steamRank">#{steamRank} Steam Today</span>}
        </div>
        <div className="steamScore">{game.score}%</div>
      </div>
      <div className="steamBody">
        <div className="split">
          <h3>{game.name}</h3>
          <strong>{game.price}</strong>
        </div>

        <div className="playModeRow">
          {game.playModes.map(mode => (
            <span key={mode} className={mode.includes("PvP") ? "pvp" : mode.includes("Single") ? "single" : "pve"}>
              {mode}
            </span>
          ))}
        </div>

        <div className="readinessPanel">
          <div className="split">
            <span>Squad readiness</span>
            <b>{readiness}%</b>
          </div>
          <div className="progress"><span style={{ width: `${readiness}%` }} /></div>
          <div className="squadSignals">
            <span>👥 {squad.owned} own</span>
            <span>⭐ {squad.wishlist} want</span>
            <span>⬇ {squad.installed} installed</span>
            <span>🔥 {squad.active} active</span>
          </div>
        </div>

        <p className="gameDesc">{game.desc}</p>

        <div className="ownershipToggles">
          <button className={userStatus.owned ? "owned active" : "owned"} onClick={() => onToggle("owned")}>✓ Owned</button>
          <button className={userStatus.wishlist ? "wishlist active" : "wishlist"} onClick={() => onToggle("wishlist")}>★ Want</button>
          <button className={userStatus.installed ? "installed active" : "installed"} onClick={() => onToggle("installed")}>⬇ Installed</button>
          <button className={userStatus.active ? "activeNow active" : "activeNow"} onClick={() => onToggle("active")}>🔥 Active</button>
        </div>

        <div className="tagRow">{game.tags.map(t => <span key={t}>{t}</span>)}</div>
        <div className="buyRow">
          <span><Users size={14} /> {game.owned}</span>
          <button onClick={onPlan}>Plan <ChevronRight size={15} /></button>
        </div>
      </div>
    </article>
  );
}

function FeedCard({ item, onReact, onAction }) {
  return (
    <article className={`feedCard ${item.type}`}>
      <div className="feedIcon">{item.icon}</div>
      <div className="feedContent">
        <h3>{item.title}</h3>
        <p>{item.body}</p>
        <div className="feedActions">
          <button onClick={onReact}>🔥 {item.reactions}</button>
          <button onClick={onAction}>{item.action}</button>
        </div>
      </div>
    </article>
  );
}

function BadgeShowcase({ ids }) {
  return (
    <div className="badgeShowcase">
      {ids.map(id => {
        const badge = getBadge(id);
        if (!badge) return null;
        return <span key={id}>{badge.icon} {badge.title}</span>;
      })}
    </div>
  );
}

function Leaderboard({ squad }) {
  return (
    <article className="leaderboard">
      {[...squad].sort((a, b) => b.xp - a.xp).map((member, index) => (
        <div className="leaderRow" key={member.name}>
          <strong>#{index + 1}</strong>
          <span className="miniAvatar ready">{member.avatar}</span>
          <div>
            <b>{member.name}</b>
            <BadgeShowcase ids={member.badges.slice(0, 3)} />
          </div>
          <em>{member.xp} XP</em>
        </div>
      ))}
    </article>
  );
}

function BottomNav({ tab, setTab }) {
  const items = [
    ["home", Home, "Home"],
    ["discover", Search, "Discover"],
    ["plan", CalendarDays, "Plan"],
    ["lan", Laptop, "LAN"],
    ["profile", User, "Profiel"]
  ];

  return (
    <nav className="bottomNav">
      {items.map(([id, Icon, label]) => (
        <button key={id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}>
          <Icon size={19} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function PageHeader({ icon, label, title, body }) {
  return (
    <section className="pageHeader">
      <div className="kicker">{icon}{label}</div>
      <h1>{title}</h1>
      <p>{body}</p>
    </section>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="sectionHeader">
      <h2>{title}</h2>
      <span>{action}</span>
    </div>
  );
}

function MiniTile({ icon, title, value }) {
  return <div className="miniTile"><span>{icon}</span><strong>{title}</strong><small>{value}</small></div>;
}

function Stat({ value, label }) {
  return <div className="stat"><strong>{value}</strong><span>{label}</span></div>;
}

function readyCount(event) {
  return Object.values(event.status).filter(v => v === "ready").length;
}

createRoot(document.getElementById("root")).render(<App />);
