
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell, CalendarDays, ChevronRight, Gamepad2, Home, Lock, Menu, Mic, MicOff,
  Palette, Plus, Search, Settings, Shield, User, Users, X, Zap
} from "lucide-react";
import "./style.css";

const providers = ["Google", "Discord", "Steam", "Xbox", "Apple", "Microsoft"];
const tabs = ["home", "explore", "party", "squad", "plan", "chat", "profile"];
const themes = [
  { id: "neon", name: "Neon Command" },
  { id: "deck", name: "Steam Deck" },
  { id: "carousel", name: "Carousel Focus" },
  { id: "lan", name: "LAN Party" },
  { id: "immersion", name: "Full Immersion" }
];

const avatarPool = Array.from({ length: 160 }, (_, i) => ({
  id: i + 1,
  code: `AV-${String(i + 1).padStart(3, "0")}`,
  rarity: ["Common", "Rare", "Elite", "Founder", "Seasonal"][(i * 7) % 5],
  category: ["Tactical", "Cyberpunk", "Fantasy", "Sci-Fi", "Masked", "Founder", "Seasonal", "Dark"][(i * 5) % 8],
  palette: i % 12,
  locked: i > 24 && i % 6 === 0
}));

const games = [
  {
    id: 1,
    name: "HELLDIVERS 2",
    match: 93,
    mode: "Co-op PvE",
    pvp: false,
    pve: true,
    coop: true,
    solo: false,
    max: 4,
    price: "EUR 39.99",
    deal: "EUR 27.49 key",
    trend: "#4 Steam today",
    owned: [1, 2, 3, 4],
    installed: [1, 2, 4],
    art: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1400&q=80",
    desc: "Co-op chaos met korte missies, duidelijke rollen en veel squad momentum. Perfect voor een snelle game night."
  },
  {
    id: 2,
    name: "DEEP ROCK GALACTIC",
    match: 88,
    mode: "Co-op PvE",
    pvp: false,
    pve: true,
    coop: true,
    solo: true,
    max: 4,
    price: "EUR 29.99",
    deal: "EUR 9.89 sale",
    trend: "Friends favorite",
    owned: [1, 2, 3, 4, 5],
    installed: [1, 2, 3, 4],
    art: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1400&q=80",
    desc: "Mijnbouw, teamwork en paniek in compacte co-op sessies. Makkelijk om samen in te stappen."
  },
  {
    id: 3,
    name: "VALHEIM",
    match: 82,
    mode: "Survival Co-op",
    pvp: true,
    pve: true,
    coop: true,
    solo: true,
    max: 10,
    price: "EUR 19.99",
    deal: "EUR 12.49 deal",
    trend: "Survival pick",
    owned: [1, 2, 4, 5],
    installed: [2, 4],
    art: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    desc: "Survival, bouwen en boss fights. Sterk voor een vaste squadwereld waar je vaker naar terugkeert."
  },
  {
    id: 4,
    name: "PROJECT ZOMBOID",
    match: 78,
    mode: "Survival PvE/PvP",
    pvp: true,
    pve: true,
    coop: true,
    solo: true,
    max: 16,
    price: "EUR 19.50",
    deal: "EUR 13.20 key",
    trend: "Wipe-ready",
    owned: [1, 3, 5],
    installed: [3, 5],
    art: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1400&q=80",
    desc: "Hardcore survival sandbox voor inside jokes, rampzalige plannen en lange sessies."
  },
  {
    id: 5,
    name: "RISK OF RAIN 2",
    match: 86,
    mode: "Co-op Roguelike",
    pvp: false,
    pve: true,
    coop: true,
    solo: true,
    max: 4,
    price: "EUR 24.99",
    deal: "EUR 8.99 sale",
    trend: "Quick run",
    owned: [1, 2, 4],
    installed: [1, 4],
    art: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80",
    desc: "Snelle roguelike runs voor avonden met weinig setup. Actiegericht en herspeelbaar."
  }
];

const squad = [
  { id: 1, name: "Kevin", avatarId: 4, status: "In Voice", game: "Helldivers 2", title: "Reliable Shotcaller", highlight: "5.2 KDA - Jungle Main", honors: ["Shotcaller", "Reliable"], mostWith: "Shane - 84 sessions", trend: [2,3,3,4,5,6,7], volume: 78 },
  { id: 2, name: "Tom", avatarId: 18, status: "In Game", game: "Deep Rock", title: "Backlog Mage", highlight: "Co-op PvE +34%", honors: ["Teacher", "Chill"], mostWith: "Sven - 61 sessions", trend: [4,4,5,4,6,7,8], volume: 65 },
  { id: 3, name: "Sven", avatarId: 29, status: "Online", game: "Discord", title: "Cable Goblin", highlight: "Rust Wipe Grinder", honors: ["Loyal", "Tech"], mostWith: "Tom - 61 sessions", trend: [1,2,2,3,2,5,5], volume: 82 },
  { id: 4, name: "Shane", avatarId: 1, status: "Browsing", game: "SquadUp.gg", title: "Pathfinder", highlight: "Most played with Kevin", honors: ["Hype Driver", "Clutch"], mostWith: "Kevin - 84 sessions", trend: [3,4,5,5,7,8,9], volume: 74 },
  { id: 5, name: "Lars", avatarId: 39, status: "Online", game: "Steam", title: "Friendly Fire Expert", highlight: "Late night +12%", honors: ["Funny Chaos", "Loot Runner"], mostWith: "Shane - 49 sessions", trend: [2,1,3,3,4,4,6], volume: 70 }
];

function Avatar({ id, size = "md", speaking = false }) {
  const a = avatarPool.find(x => x.id === id) || avatarPool[0];
  return <span className={`avatar ${size} palette-${a.palette} ${speaking ? "speaking" : ""}`}><i /><b /></span>;
}

function ModePills({ game }) {
  return <div className="modePills">
    <span className={game.pvp ? "on" : ""}>PvP {game.pvp ? "yes" : "no"}</span>
    <span className={game.pve ? "on" : ""}>PvE {game.pve ? "yes" : "no"}</span>
    <span className={game.coop ? "on" : ""}>Co-op</span>
    <span className={game.solo ? "on" : ""}>Solo</span>
  </div>;
}

function MiniChart({ values }) {
  const max = Math.max(...values);
  return <div className="chart">{values.map((v, i) => <i key={i} style={{ height: `${18 + (v / max) * 48}px` }} />)}</div>;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("squadup_demo") === "yes");
  const [activeTab, setActiveTab] = useState("home");
  const [theme, setTheme] = useState("neon");
  const [me, setMe] = useState(1);
  const [toast, setToast] = useState("");
  const [side, setSide] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [partyOpen, setPartyOpen] = useState(false);
  const [partyGame, setPartyGame] = useState(games[0]);
  const [partySlots, setPartySlots] = useState([squad[3], squad[0], null, null]);
  const [ready, setReady] = useState({ 1: true, 4: true });
  const [muted, setMuted] = useState(false);

  function push(message) {
    setToast(message);
    window.clearTimeout(window.__squadToast);
    window.__squadToast = window.setTimeout(() => setToast(""), 1600);
  }

  function enterDemo(provider = "Offline Demo") {
    localStorage.setItem("squadup_demo", "yes");
    setLoggedIn(true);
    push(`${provider} loaded`);
  }

  function logout() {
    localStorage.removeItem("squadup_demo");
    setLoggedIn(false);
  }

  function openParty(game = games[0]) {
    setPartyGame(game);
    const size = Math.min(Math.max(game.max, 4), 6);
    const initial = [squad[3], ...game.owned.map(id => squad.find(u => u.id === id)).filter(Boolean)];
    const unique = Array.from(new Map(initial.map(u => [u.id, u])).values()).slice(0, size);
    setPartySlots(Array.from({ length: size }, (_, i) => unique[i] || null));
    setReady(Object.fromEntries(unique.map((u, i) => [u.id, i < 2])));
    setPartyOpen(true);
  }

  function addToParty(user) {
    setPartySlots(prev => {
      if (prev.some(slot => slot?.id === user.id)) return prev;
      const next = [...prev];
      const idx = next.findIndex(slot => slot === null);
      if (idx >= 0) next[idx] = user;
      return next;
    });
    push(`${user.name} invited`);
  }

  if (!loggedIn) return <Login onLogin={enterDemo} />;

  return <div className={`app theme-${theme}`}>
    <DesktopShell activeTab={activeTab} setActiveTab={setActiveTab} setThemeOpen={setThemeOpen} openParty={openParty} setSelectedGame={setSelectedGame} setSelectedUser={setSelectedUser} logout={logout} />
    <main className="mobile">
      <TopBar setSide={setSide} setThemeOpen={setThemeOpen} setAvatarOpen={setAvatarOpen} me={me} />
      <AppContent activeTab={activeTab} openParty={openParty} setSelectedGame={setSelectedGame} setSelectedUser={setSelectedUser} muted={muted} setMuted={setMuted} />
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} openParty={openParty} setSide={setSide} />
    </main>

    {side && <Sidebar close={() => setSide(false)} setActiveTab={setActiveTab} openParty={openParty} logout={logout} />}
    {themeOpen && <ThemeDrawer close={() => setThemeOpen(false)} theme={theme} setTheme={setTheme} />}
    {avatarOpen && <AvatarGallery close={() => setAvatarOpen(false)} current={me} setCurrent={setMe} push={push} />}
    {selectedGame && <GameModal game={selectedGame} close={() => setSelectedGame(null)} openParty={openParty} />}
    {selectedUser && <PlayerDrawer user={selectedUser} close={() => setSelectedUser(null)} addToParty={addToParty} openParty={openParty} />}
    {partyOpen && <PartyLobby game={partyGame} setGame={setPartyGame} slots={partySlots} setSlots={setPartySlots} ready={ready} setReady={setReady} close={() => setPartyOpen(false)} addToParty={addToParty} muted={muted} setMuted={setMuted} push={push} />}
    <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
  </div>;
}

function Login({ onLogin }) {
  return <main className="login">
    <section className="loginCard">
      <div className="loginBrand"><Gamepad2 /><strong>SquadUp<span>.gg</span></strong></div>
      <h1>Find your squad. Play together.</h1>
      <p>Premium social gaming launcher voor party lobby, voice, Explore, honors en squad memory.</p>
      <div className="providerGrid">
        {providers.map(p => <button key={p} onClick={() => onLogin(`${p} Demo`)}>
          <b>{p.slice(0, 2).toUpperCase()}</b><strong>{p}</strong><small>Demo</small>
        </button>)}
      </div>
      <button className="offlineDemo" onClick={() => onLogin("Offline Demo")}>Enter Offline Demo Mode</button>
      <small className="note">No account needed for testing. OAuth-ready later.</small>
    </section>
    <aside className="loginArt">
      <div className="loginSquad">
        <Avatar id={1} size="xl" speaking />
        <Avatar id={18} size="lg" />
        <Avatar id={29} size="lg" />
      </div>
    </aside>
  </main>;
}

function TopBar({ setSide, setThemeOpen, setAvatarOpen, me }) {
  return <header className="topbar">
    <button onClick={() => setSide(true)}><Menu /></button>
    <strong>SquadUp<span>.gg</span></strong>
    <div><button onClick={() => setThemeOpen(true)}><Palette /></button><button onClick={() => setAvatarOpen(true)}><Avatar id={me} size="xs" /></button></div>
  </header>;
}

function AppContent({ activeTab, openParty, setSelectedGame, setSelectedUser, muted, setMuted }) {
  if (activeTab === "explore") return <ExploreScreen openParty={openParty} setSelectedGame={setSelectedGame} />;
  if (activeTab === "party") return <PartyTab openParty={openParty} setSelectedUser={setSelectedUser} muted={muted} setMuted={setMuted} />;
  if (activeTab === "squad") return <SquadScreen setSelectedUser={setSelectedUser} openParty={openParty} />;
  if (activeTab === "plan") return <PlanScreen openParty={openParty} setSelectedGame={setSelectedGame} />;
  if (activeTab === "chat") return <ChatScreen />;
  if (activeTab === "profile") return <ProfileScreen />;
  return <HomeScreen openParty={openParty} setSelectedGame={setSelectedGame} setSelectedUser={setSelectedUser} muted={muted} setMuted={setMuted} />;
}

function HomeScreen({ openParty, setSelectedGame, setSelectedUser, muted, setMuted }) {
  return <>
    <Hero game={games[0]} openParty={openParty} setSelectedGame={setSelectedGame} />
    <SquadStrip setSelectedUser={setSelectedUser} />
    <GameList setSelectedGame={setSelectedGame} openParty={openParty} />
    <Panel title="Squad Voice"><VoiceDeck muted={muted} setMuted={setMuted} compact /></Panel>
    <Panel title="Session memory"><Memory /></Panel>
  </>;
}

function Hero({ game, openParty, setSelectedGame }) {
  return <article className="hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.78),rgba(0,0,0,.18)),url(${game.art})` }}>
    <span>Best match tonight</span>
    <h1>{game.name}</h1>
    <p>{game.desc}</p>
    <ModePills game={game} />
    <div><button onClick={() => openParty(game)}>Open party</button><button onClick={() => setSelectedGame(game)}>Details</button></div>
  </article>;
}

function SquadStrip({ setSelectedUser }) {
  return <section className="squadStrip">{squad.map((u, i) => <button key={u.id} onClick={() => setSelectedUser(u)}><Avatar id={u.avatarId} speaking={i === 1} /><strong>{u.name}</strong><small>{u.status}</small></button>)}</section>;
}

function GameList({ setSelectedGame, openParty }) {
  return <section className="gameList">{games.map((g, i) => <article key={g.id} onClick={() => setSelectedGame(g)}>
    <b>{i + 1}</b>
    <div className="thumb" style={{ backgroundImage: `url(${g.art})` }} />
    <div><strong>{g.name}</strong><small>{g.match}% - {g.mode}</small><small>{g.owned.length}/5 own - {g.deal}</small></div>
    <button onClick={e => { e.stopPropagation(); openParty(g); }}>Party</button>
  </article>)}</section>;
}

function ExploreScreen({ openParty, setSelectedGame }) {
  return <section className="sectionScreen">
    <h1>Explore</h1>
    <p>Steam/popular/deals-ready feed. Nu mock data, klaar voor live koppeling.</p>
    <div className="filters"><button>All</button><button>PvP</button><button>PvE</button><button>Co-op</button><button>Survival</button></div>
    <div className="exploreCards">{games.map(g => <button key={g.id} onClick={() => setSelectedGame(g)} style={{ backgroundImage: `linear-gradient(180deg,transparent,rgba(0,0,0,.85)),url(${g.art})` }}>
      <strong>{g.name}</strong><span>{g.trend} - {g.mode}</span><small>{g.price} - {g.deal} - PvP {g.pvp ? "yes" : "no"}</small>
      <em onClick={e => { e.stopPropagation(); openParty(g); }}>Start party</em>
    </button>)}</div>
  </section>;
}

function PartyTab({ openParty, setSelectedUser, muted, setMuted }) {
  return <section className="sectionScreen">
    <h1>Party</h1>
    <p>Squad lobby, voice and ready state.</p>
    <button className="wideCta" onClick={() => openParty(games[0])}>Open cinematic party lobby</button>
    <Panel title="Voice HUD"><VoiceDeck muted={muted} setMuted={setMuted} /></Panel>
    <Panel title="Current squad"><SquadStrip setSelectedUser={setSelectedUser} /></Panel>
  </section>;
}

function SquadScreen({ setSelectedUser, openParty }) {
  return <section className="sectionScreen">
    <h1>Squad</h1>
    <p>Presence, invites en player profiles.</p>
    <div className="squadList">{squad.map(u => <button key={u.id} onClick={() => setSelectedUser(u)}><Avatar id={u.avatarId} speaking={u.status === "In Voice"} /><div><strong>{u.name}</strong><small>{u.status} - {u.game}</small></div><ChevronRight /></button>)}</div>
    <button className="wideCta" onClick={() => openParty(games[0])}>Start squad party</button>
  </section>;
}

function PlanScreen({ openParty, setSelectedGame }) {
  return <section className="sectionScreen">
    <h1>Plan</h1>
    <p>Game night planning zonder calendar-overload.</p>
    <article className="planHero">
      <span>Friday Squad Night</span>
      <h2>Helldivers 2 Chaos Run</h2>
      <p>20:30 - 4 players target - Voice preferred</p>
      <div className="planMembers">{squad.slice(0, 4).map((u, i) => <Avatar key={u.id} id={u.avatarId} size="sm" speaking={i === 1} />)}</div>
      <button onClick={() => openParty(games[0])}>Open party lobby</button>
    </article>
    <div className="planGrid">{games.slice(0, 4).map(g => <button key={g.id} onClick={() => setSelectedGame(g)}><div className="planThumb" style={{ backgroundImage: `url(${g.art})` }} /><div><strong>{g.name}</strong><small>{g.mode} - {g.owned.length}/5 own</small></div><span>{g.deal}</span></button>)}</div>
  </section>;
}

function ChatScreen() {
  return <section className="sectionScreen"><h1>Lobby Chat</h1><Panel title="Party messages"><div className="chat"><p><strong>Kevin</strong> Ready when you are</p><p><strong>Tom</strong> 2 minutes out</p><p><strong>System</strong> Voice room opened</p><div><input placeholder="Type message..." /><button>Send</button></div></div></Panel></section>;
}

function ProfileScreen() {
  return <section className="sectionScreen"><h1>Profile</h1><div className="profileTop"><Avatar id={1} size="xl" speaking /><h2>Shane</h2><p>Squad Captain - Pathfinder</p></div><Panel title="Stats"><Memory /></Panel><Panel title="Connected apps"><div className="connectGrid">{providers.map(p => <button key={p}>{p}<span>Ready</span></button>)}</div></Panel></section>;
}

function Panel({ title, children }) {
  return <section className="panel"><h3>{title}</h3>{children}</section>;
}

function VoiceDeck({ muted, setMuted, compact = false }) {
  return <div className={`voiceDeck ${compact ? "compact" : ""}`}>
    <header>
      <div><span className="voicePulse" /><strong>Squad Voice</strong><small>Noise suppression - Echo cancellation - Auto gain</small></div>
      <button onClick={() => setMuted(!muted)}><span className="voiceGlyph">{muted ? "M" : "V"}</span>{muted ? "Unmute" : "Mute"}</button>
    </header>
    <div className="voiceUsers">
      {squad.slice(0, compact ? 3 : 5).map((u, i) => <article key={u.id} className={i === 1 ? "speakingCard" : ""}>
        <Avatar id={u.avatarId} size="sm" speaking={i === 1} />
        <div><strong>{u.name}</strong><small>{i === 1 ? "Speaking" : u.status}</small></div>
        <input type="range" min="0" max="100" defaultValue={u.volume} />
      </article>)}
    </div>
  </div>;
}

function Memory() {
  return <div className="memory"><strong>Chaos Duo</strong><span>Shane + Kevin - 84 sessions</span><MiniChart values={[2, 3, 4, 4, 6, 7, 9]} /></div>;
}

function Nav({ activeTab, setActiveTab, openParty, setSide }) {
  return <nav className="nav">
    <div>
      <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}><Home /><span>Home</span></button>
      <button className={activeTab === "explore" ? "active" : ""} onClick={() => setActiveTab("explore")}><Search /><span>Explore</span></button>
      <button onClick={() => openParty()}><Zap /><span>Queue</span></button>
    </div>
    <button className="fab" onClick={() => openParty()}><Plus /><em>2/4</em></button>
    <div>
      <button className={activeTab === "squad" ? "active" : ""} onClick={() => setActiveTab("squad")}><Users /><span>Squad</span></button>
      <button className={activeTab === "chat" ? "active" : ""} onClick={() => setActiveTab("chat")}><Bell /><span>Chat</span></button>
      <button onClick={() => setSide(true)}><User /><span>Menu</span></button>
    </div>
  </nav>;
}

function DesktopShell({ activeTab, setActiveTab, setThemeOpen, openParty, setSelectedGame, setSelectedUser, logout }) {
  return <section className="desktop">
    <header className="command">
      <div className="loginBrand"><Gamepad2 /><strong>SquadUp<span>.gg</span></strong></div>
      <nav>{tabs.map(x => <button key={x} className={activeTab === x ? "selected" : ""} onClick={() => x === "party" ? openParty() : setActiveTab(x)}>{x}</button>)}</nav>
      <button onClick={() => openParty()}><Plus /></button>
      <button onClick={() => setThemeOpen(true)}><Palette />Themes</button>
    </header>
    <main>
      <AppContent activeTab={activeTab} openParty={openParty} setSelectedGame={setSelectedGame} setSelectedUser={setSelectedUser} muted={false} setMuted={() => {}} />
      <button className="desktopLogout" onClick={logout}>Logout demo</button>
    </main>
  </section>;
}

function Sidebar({ close, setActiveTab, openParty, logout }) {
  return <div className="drawer"><aside><button className="close" onClick={close}><X /></button><div className="loginBrand"><Gamepad2 /><strong>SquadUp.gg</strong></div>{["Home", "Explore", "Party", "Squad", "Plan", "Chat", "Profile", "Settings"].map(x => <button key={x} onClick={() => { if (x === "Party") openParty(); else setActiveTab(x.toLowerCase()); close(); }}><span>{x}</span><ChevronRight /></button>)}<button onClick={logout}><span>Logout demo</span><ChevronRight /></button></aside></div>;
}

function ThemeDrawer({ close, theme, setTheme }) {
  return <div className="overlay"><section className="modal"><button className="close" onClick={close}><X /></button><span>Theme pocket</span><h2>Choose your vibe</h2><div className="themeGrid">{themes.map(t => <button key={t.id} className={theme === t.id ? "selected" : ""} onClick={() => setTheme(t.id)}><strong>{t.name}</strong><small>Theme-aware sidebar and party UI</small></button>)}</div></section></div>;
}

function GameModal({ game, close, openParty }) {
  const names = ids => ids.map(id => squad.find(u => u.id === id)?.name).filter(Boolean).join(", ") || "None";
  return <div className="overlay"><section className="modal"><button className="close" onClick={close}><X /></button><div className="banner" style={{ backgroundImage: `linear-gradient(180deg,transparent,rgba(0,0,0,.85)),url(${game.art})` }}><h2>{game.name}</h2><p>{game.mode} - {game.match}% match</p></div><ModePills game={game} /><p>{game.desc}</p><div className="stats"><div><strong>{game.owned.length}/5</strong><span>friends own</span><small>{names(game.owned)}</small></div><div><strong>{game.installed.length}</strong><span>installed</span><small>{names(game.installed)}</small></div><div><strong>{game.deal}</strong><span>best deal</span><small>Steam/key compare ready</small></div><div><strong>{game.max}</strong><span>max players</span><small>30-60 min</small></div></div><div className="modalActions"><button onClick={() => openParty(game)}>Open party</button><button>Plan night</button></div></section></div>;
}

function PlayerDrawer({ user, close, addToParty, openParty }) {
  return <div className="drawer right"><aside><button className="close" onClick={close}><X /></button><div className="profileTop"><Avatar id={user.avatarId} size="xl" speaking={user.status === "In Voice"} /><span>{user.status}</span><h2>{user.name}</h2><p>{user.title}</p></div><p>{user.highlight}</p><div className="honors">{user.honors.map(h => <em key={h}>{h}</em>)}</div><Panel title="Player insights"><div className="insights"><div><strong>{user.mostWith}</strong><span>Most played with</span></div><div><strong>{user.highlight}</strong><span>Game highlight</span></div></div><MiniChart values={user.trend} /></Panel><Panel title="Connected data"><ul><li>Steam presence ready</li><li>Riot stats ready</li><li>Discord voice ready</li><li>Medal clips placeholder</li></ul></Panel><div className="modalActions"><button onClick={() => addToParty(user)}>Invite</button><button onClick={() => openParty(games[0])}>Open party</button></div></aside></div>;
}

function PartyLobby({ game, setGame, slots, setSlots, ready, setReady, close, addToParty, muted, setMuted, push }) {
  const candidates = squad.filter(u => !slots.some(s => s?.id === u.id));
  return <div className="overlay partyOverlay"><section className="party"><button className="close" onClick={close}><X /></button><header style={{ backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.82),rgba(0,0,0,.2)),url(${game.art})` }}><div><span>Squad Lobby</span><h1>{game.name}</h1><p>{slots.filter(Boolean).length}/{slots.length} filled - {Object.values(ready).filter(Boolean).length} ready</p><ModePills game={game} /></div><button onClick={() => push("Session planned")}>Plan session</button></header><div className="partyBody"><main><div className="partyControls"><select value={game.id} onChange={e => setGame(games.find(g => g.id === Number(e.target.value)) || games[0])}>{games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}</select><button onClick={() => push("Ready check started")}>Ready Check</button></div><div className="slots">{slots.map((s, i) => <article key={i} className={s ? "filled" : ""}>{s ? <><button className="slotX" onClick={() => setSlots(prev => prev.map((x, j) => j === i ? null : x))}>x</button><Avatar id={s.avatarId} size="lg" speaking={s.status === "In Voice"} /><strong>{s.name}</strong><small>{s.highlight}</small><button className={ready[s.id] ? "ready on" : "ready"} onClick={() => setReady(r => ({ ...r, [s.id]: !r[s.id] }))}>{ready[s.id] ? "Ready" : "Maybe"}</button></> : <><Plus /><strong>Open slot</strong><small>Invite someone</small></>}</article>)}</div></main><aside><Panel title="Lobby Chat"><div className="chat"><p><strong>Kevin</strong> Ready when you are</p><p><strong>Tom</strong> 2 minutes out</p><p><strong>System</strong> Voice room opened</p><div><input placeholder="Type message..." /><button>Send</button></div></div></Panel><Panel title="Voice"><VoiceDeck muted={muted} setMuted={setMuted} /></Panel><Panel title="Best invites"><div className="candidateList">{candidates.map(u => <button key={u.id} onClick={() => addToParty(u)}><Avatar id={u.avatarId} size="sm" /><div><strong>{u.name}</strong><small>{u.status} - {u.game}</small></div></button>)}</div></Panel></aside></div></section></div>;
}

function AvatarGallery({ current, setCurrent, close, push }) {
  const [filter, setFilter] = useState("All");
  const cats = useMemo(() => ["All", ...Array.from(new Set(avatarPool.map(a => a.category)))], []);
  const shown = filter === "All" ? avatarPool : avatarPool.filter(a => a.category === filter);
  return <div className="overlay"><section className="avatarModal"><button className="close" onClick={close}><X /></button><span>Avatar vault</span><h2>Choose your identity</h2><div className="filters">{cats.map(c => <button key={c} className={filter === c ? "active" : ""} onClick={() => setFilter(c)}>{c}</button>)}</div><div className="avatarGrid">{shown.map(a => <button key={a.id} className={current === a.id ? "active" : ""} onClick={() => { if (a.locked) { push("Avatar locked"); return; } setCurrent(a.id); push("Avatar selected"); }}><Avatar id={a.id} /><strong>{a.code}</strong><small>{a.rarity}</small>{a.locked && <Lock size={14} />}</button>)}</div></section></div>;
}

function ErrorFallback() {
  return <main className="fallback"><h1>SquadUp.gg</h1><p>De app kon niet laden. Reset de demo en probeer opnieuw.</p><button onClick={() => { localStorage.removeItem("squadup_demo"); location.reload(); }}>Reset demo</button></main>;
}

try {
  createRoot(document.getElementById("root")).render(<App />);
} catch (error) {
  console.error(error);
  createRoot(document.getElementById("root")).render(<ErrorFallback />);
}
