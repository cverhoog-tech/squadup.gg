
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Gamepad2,
  Home,
  Info,
  Plus,
  Search,
  Settings,
  Sparkles,
  Trophy,
  User,
  Users,
  X,
  Zap
} from "lucide-react";
import "./style.css";

const layouts = [
  { id: "immersion", label: "Full Immersion" },
  { id: "carousel", label: "Carousel Focus" },
  { id: "neon", label: "Neon Command" },
  { id: "deck", label: "Steam Deck" },
  { id: "arcade", label: "Cyber Arcade" },
  { id: "lan", label: "LAN Party" },
  { id: "grid", label: "Grid Command" }
];

const initialSquad = [
  { id: 1, name: "Kevin", avatar: "🛡️", archetype: "Tactical Vanguard", level: 18, status: "Playing", game: "Helldivers 2", availability: "Ready", badges: ["Reliable", "Shield Wall", "No Fear"], xp: 2840, bio: "Altijd als eerste in de lobby en meestal ook als eerste dood." },
  { id: 2, name: "Tom", avatar: "🧙", archetype: "Arcane Strategist", level: 16, status: "In Game", game: "Deep Rock Galactic", availability: "Maybe", badges: ["Planner", "Backlog Mage", "Lore Brain"], xp: 2210, bio: "Maakt spreadsheets voor survival bases en noemt dat casual play." },
  { id: 3, name: "Sven", avatar: "🤖", archetype: "LAN Engineer", level: 14, status: "In Voice", game: "Discord voice", availability: "Online", badges: ["Cable Goblin", "Setup Wizard", "Tech Support"], xp: 1904, bio: "Heeft altijd een extra kabel, maar nooit de juiste." },
  { id: 4, name: "Shane", avatar: "🚀", archetype: "Squad Captain", level: 21, status: "Browsing", game: "SquadUp.gg", availability: "Ready", badges: ["Pathfinder", "LAN Lord", "Hype Driver"], xp: 3120, bio: "Start het avontuur, plant de chaos en vergeet soms de snacks." },
  { id: 5, name: "Lars", avatar: "🐺", archetype: "Chaos Ranger", level: 12, status: "Online", game: "Steam", availability: "Busy later", badges: ["Friendly Fire", "Loot Goblin", "Last Minute"], xp: 1325, bio: "Komt binnen met nul context en maakt het toch legendarisch." }
];

const avatarPool = ["🛡️","🧙","🤖","🚀","🐺","🐉","👾","🦾","🧟","🧛","🧝","🧌","🦊","🦁","🐲","🦅","🦇","🦂","🦄","🦖","⚔️","🏹","🔮","💀","☠️","👑","🧠","🧪","🔧","💣","🪓","🗡️","🛸","🛰️","🕹️","🎮","🎯","🔥","⚡","🌙","🐸","🐼","🐵","🐧","🦉","🦈","🐙","🦀","🦥","🦦","🦔","🐢","🐍","🦎","🦕","🦣","🦭","🦜","🦚","🦡"];

const games = [
  {
    id: 1,
    name: "HELLDIVERS™ 2",
    short: "Helldivers",
    match: 93,
    mode: "Co-op PvE",
    pvp: false,
    pve: true,
    coop: true,
    singleplayer: false,
    maxPlayers: 4,
    session: "30-60 min",
    tags: ["co-op", "pve", "quick", "chaos"],
    art: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1400&q=80",
    desc: "Co-op chaos met korte missies, duidelijke roles en veel squad momentum. Ideaal als de groep snel iets wil doen zonder lange voorbereiding, met genoeg paniek en friendly fire om de avond memorabel te maken.",
    ownedBy: [1, 2, 3, 4],
    installedBy: [1, 2, 4],
    wants: [5],
    activeNow: [1]
  },
  {
    id: 2,
    name: "DEEP ROCK GALACTIC",
    short: "Deep Rock",
    match: 88,
    mode: "Co-op PvE",
    pvp: false,
    pve: true,
    coop: true,
    singleplayer: true,
    maxPlayers: 4,
    session: "45-90 min",
    tags: ["co-op", "pve", "dwarves", "quick"],
    art: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1400&q=80",
    desc: "Mijnbouw, teamwork en paniek in compacte co-op sessies. Sterk voor squads die samen objectives willen doen, maar ook ruimte willen voor domme chaos, clutch revives en 'nog één missie dan' momenten.",
    ownedBy: [1, 2, 3, 4, 5],
    installedBy: [1, 2, 3, 4],
    wants: [],
    activeNow: [2]
  },
  {
    id: 3,
    name: "VALHEIM",
    short: "Valheim",
    match: 82,
    mode: "Survival Co-op",
    pvp: true,
    pve: true,
    coop: true,
    singleplayer: true,
    maxPlayers: 10,
    session: "2+ uur",
    tags: ["survival", "building", "long"],
    art: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    desc: "Survival, bouwen, boss fights en langlopende squad progressie. Perfect voor een groep die een gedeelde wereld wil opbouwen en meerdere avonden aan hetzelfde avontuur wil blijven werken.",
    ownedBy: [1, 2, 4, 5],
    installedBy: [2, 4],
    wants: [3],
    activeNow: []
  },
  {
    id: 4,
    name: "PROJECT ZOMBOID",
    short: "Zomboid",
    match: 78,
    mode: "Survival PvE/PvP",
    pvp: true,
    pve: true,
    coop: true,
    singleplayer: true,
    maxPlayers: 16,
    session: "2+ uur",
    tags: ["survival", "hardcore", "roleplay"],
    art: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1400&q=80",
    desc: "Hardcore survival sandbox voor inside jokes en rampzalige plannen. Minder geschikt voor korte sessies, maar extreem sterk voor groepen die houden van verhalen, risico en permanente consequenties.",
    ownedBy: [1, 3, 5],
    installedBy: [3, 5],
    wants: [2, 4],
    activeNow: []
  },
  {
    id: 5,
    name: "RISK OF RAIN 2",
    short: "Risk of Rain",
    match: 86,
    mode: "Co-op Roguelike",
    pvp: false,
    pve: true,
    coop: true,
    singleplayer: true,
    maxPlayers: 4,
    session: "30-75 min",
    tags: ["co-op", "roguelike", "quick"],
    art: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80",
    desc: "Snelle roguelike runs voor avonden met weinig setup. De game schaalt lekker met chaos en is ideaal wanneer de groep wel actie wil, maar geen complete campaign wil starten.",
    ownedBy: [1, 2, 4],
    installedBy: [1, 4],
    wants: [3, 5],
    activeNow: []
  }
];

function namesFromIds(ids, squad) {
  return ids.map(id => squad.find(member => member.id === id)?.name).filter(Boolean);
}

function App() {
  const [layout, setLayout] = useState("immersion");
  const [squad, setSquad] = useState(initialSquad);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [partyOpen, setPartyOpen] = useState(false);
  const [partyGame, setPartyGame] = useState(games[0]);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(true);
  const [toast, setToast] = useState("");
  const [events, setEvents] = useState([
    { id: 1, title: "Helldivers 2 chaos run", game: "HELLDIVERS™ 2", time: "Vanavond · 20:00", ready: 4, invited: ["Kevin", "Tom", "Sven"] }
  ]);
  const [activity, setActivity] = useState([
    "Kevin is Helldivers 2 gestart",
    "Tom is in Discord voice",
    "Shane heeft een game night gepland"
  ]);
  const [gameStatus, setGameStatus] = useState({});
  const [currentAvatar, setCurrentAvatar] = useState("🚀");
  const [activeTab, setActiveTab] = useState("home");
  const [partySlots, setPartySlots] = useState([initialSquad[3], initialSquad[0], null, null]);
  const [partyMood, setPartyMood] = useState("Chaos Run");
  const [partyStatus, setPartyStatus] = useState("forming");
  const [readyMap, setReadyMap] = useState({ 4: "ready", 1: "ready" });
  const [partyFeed, setPartyFeed] = useState([
    "Shane opened the party lobby",
    "Kevin joined the squad",
    "Voice channel suggested"
  ]);

  const smartPick = games[0];

  function notify(message) {
    setToast(message);
    setActivity(prev => [message, ...prev].slice(0, 8));
    clearTimeout(window.__squadToast);
    window.__squadToast = setTimeout(() => setToast(""), 1800);
  }

  function openParty(game = smartPick) {
    setPartyGame(game);
    const max = Math.max(2, Math.min(game.maxPlayers, 8));
    const initial = [squad[3], ...game.activeNow.map(id => squad.find(user => user.id === id)).filter(Boolean)];
    const slots = Array.from({ length: max }, (_, index) => initial[index] || null);
    setPartySlots(slots);
    setPartyOpen(true);
  }

  function addToParty(user) {
    setPartySlots(prev => {
      if (prev.some(slot => slot?.id === user.id)) return prev;
      const next = [...prev];
      const empty = next.findIndex(slot => slot === null);
      if (empty >= 0) next[empty] = user;
      return next;
    });
    setReadyMap(prev => ({ ...prev, [user.id]: "maybe" }));
    setPartyFeed(prev => [`${user.name} joined the party`, ...prev].slice(0, 8));
    notify(`${user.name} toegevoegd aan party`);
  }

  function removeFromParty(index) {
    setPartySlots(prev => {
      const leaving = prev[index];
      if (leaving) {
        setReadyMap(map => {
          const next = { ...map };
          delete next[leaving.id];
          return next;
        });
        setPartyFeed(feed => [`${leaving.name} removed from party`, ...feed].slice(0, 8));
      }
      return prev.map((slot, i) => i === index ? null : slot);
    });
  }

  function planGame(game) {
    const filled = partySlots.filter(Boolean).map(user => user.name);
    const event = {
      id: Date.now(),
      title: `${game.name} squad night`,
      game: game.name,
      time: "Vandaag · 20:30",
      ready: filled.length || 1,
      invited: filled
    };
    setEvents(prev => [event, ...prev]);
    notify(`${game.name} ingepland`);
  }

  function inviteUser(user, context = "party") {
    notify(`${user.name} uitgenodigd voor ${context}`);
    addToParty(user);
  }

  function sendPartyInvite() {
    const filled = partySlots.filter(Boolean);
    setPartyStatus(filled.length >= Math.min(partyGame.maxPlayers, 4) ? "ready" : "forming");
    setPartyFeed(prev => [`Party invite sent to ${filled.length} players`, "Ready check started", ...prev].slice(0, 8));
    notify(`Party invite verstuurd naar ${filled.length} spelers`);
    planGame(partyGame);
  }

  function toggleReady(userId) {
    setReadyMap(prev => {
      const current = prev[userId] || "maybe";
      const nextStatus = current === "ready" ? "maybe" : current === "maybe" ? "installing" : "ready";
      return { ...prev, [userId]: nextStatus };
    });
    const user = squad.find(member => member.id === userId);
    if (user) setPartyFeed(prev => [`${user.name} updated ready status`, ...prev].slice(0, 8));
  }

  function startReadyCheck() {
    setPartyStatus("ready-check");
    setPartyFeed(prev => ["Ready check started", ...prev].slice(0, 8));
    notify("Ready check gestart");
  }

  function launchParty() {
    const filled = partySlots.filter(Boolean);
    const allReady = filled.length > 0 && filled.every(user => readyMap[user.id] === "ready");
    if (!allReady) {
      notify("Nog niet iedereen is ready");
      setPartyFeed(prev => ["Launch blocked: not everyone is ready", ...prev].slice(0, 8));
      return;
    }
    setPartyStatus("in-game");
    setPartyFeed(prev => [`${partyGame.name} launched`, "Voice channel opened", ...prev].slice(0, 8));
    notify("Game launched");
  }

  function updateStatus(game, key) {
    setGameStatus(prev => ({
      ...prev,
      [game.id]: { ...(prev[game.id] || {}), [key]: !(prev[game.id]?.[key]) }
    }));
    notify(`${game.name}: ${key} bijgewerkt`);
  }

  const sharedProps = {
    layout,
    setLayout,
    squad,
    games,
    events,
    activity,
    smartPick,
    openProfile: setSelectedUser,
    openGame: setSelectedGame,
    openParty,
    openAvatar: () => setAvatarOpen(true),
    notify,
    planGame,
    inviteUser,
    currentAvatar,
    activeTab,
    setActiveTab
  };

  const LayoutComponent = {
    immersion: ImmersionLayout,
    carousel: CarouselLayout,
    neon: NeonLayout,
    deck: DeckLayout,
    arcade: ArcadeLayout,
    lan: LanLayout,
    grid: GridLayout
  }[layout];

  return (
    <div className={`app ${layout}`}>
      <DesktopDashboard {...sharedProps} />
      <main className="mobileShell">
        <LayoutSwitcher layout={layout} setLayout={setLayout} />
        <LayoutComponent {...sharedProps} />
        <BottomNav layout={layout} activeTab={activeTab} setActiveTab={setActiveTab} openParty={() => openParty(smartPick)} events={events} squad={squad} />
      </main>

      {introOpen && <IntroPicker setLayout={setLayout} close={() => setIntroOpen(false)} />}
      {selectedUser && <UserModal user={selectedUser} close={() => setSelectedUser(null)} inviteUser={inviteUser} openParty={() => openParty(partyGame)} />}
      {selectedGame && <GameModal game={selectedGame} squad={squad} close={() => setSelectedGame(null)} planGame={planGame} openParty={openParty} updateStatus={updateStatus} status={gameStatus[selectedGame.id] || {}} />}
      {partyOpen && <PartyModule game={partyGame} squad={squad} slots={partySlots} addToParty={addToParty} removeFromParty={removeFromParty} close={() => setPartyOpen(false)} sendPartyInvite={sendPartyInvite} setPartyGame={setPartyGame} games={games} partyMood={partyMood} setPartyMood={setPartyMood} partyStatus={partyStatus} readyMap={readyMap} toggleReady={toggleReady} startReadyCheck={startReadyCheck} launchParty={launchParty} partyFeed={partyFeed} />}
      {avatarOpen && <AvatarModal currentAvatar={currentAvatar} setCurrentAvatar={setCurrentAvatar} close={() => setAvatarOpen(false)} notify={notify} />}
      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
    </div>
  );
}

function LayoutSwitcher({ layout, setLayout }) {
  return (
    <div className="layoutSwitcher">
      {layouts.map(item => (
        <button key={item.id} className={layout === item.id ? "active" : ""} onClick={() => setLayout(item.id)}>
          {item.label}
        </button>
      ))}
    </div>
  );
}

function TopBar({ title = "SQUADUP.GG", avatar, openAvatar, openParty }) {
  return (
    <header className="topBar">
      <strong>{title}</strong>
      <div>
        <button onClick={openParty} aria-label="open party"><Zap size={16} /></button>
        <button onClick={openAvatar} aria-label="open avatar picker"><span className="miniAvatar">{avatar}</span></button>
      </div>
    </header>
  );
}

function SquadRow({ squad, openProfile, compact = false }) {
  return (
    <div className={compact ? "squadRow compact" : "squadRow"}>
      {squad.map(user => (
        <button className="squadMember tactile" key={user.id} onClick={() => openProfile(user)}>
          <span className="avatar">{user.avatar}</span>
          <strong>{user.name}</strong>
          <small>{user.status}</small>
        </button>
      ))}
    </div>
  );
}

function GameModePills({ game }) {
  return (
    <div className="modePills">
      <span className={game.pvp ? "on" : ""}>PvP {game.pvp ? "yes" : "no"}</span>
      <span className={game.pve ? "on" : ""}>PvE {game.pve ? "yes" : "no"}</span>
      <span className={game.coop ? "on" : ""}>Co-op {game.coop ? "yes" : "no"}</span>
      <span className={game.singleplayer ? "on" : ""}>Solo {game.singleplayer ? "yes" : "no"}</span>
    </div>
  );
}

function PickList({ games, squad, openGame, openParty, variant = "" }) {
  return (
    <div className={`pickList ${variant}`}>
      {games.slice(0, 4).map((game, index) => (
        <article className="pickCard tactile" key={game.id} onClick={() => openGame(game)}>
          <span className="rank">{index + 1}</span>
          <div className="pickThumb" style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(0,0,0,.72)), url(${game.art})` }} />
          <div>
            <strong>{game.name}</strong>
            <small>{game.match}% · {game.mode}</small>
            <small>{game.ownedBy.length}/{squad.length} own · {game.installedBy.length} installed</small>
          </div>
          <button onClick={(event) => { event.stopPropagation(); openParty(game); }}>Party</button>
        </article>
      ))}
    </div>
  );
}

function ActivityFeed({ activity }) {
  return (
    <section className="panel">
      <div className="sectionTitle"><h3>Activity feed</h3><span>live mock</span></div>
      <div className="activityList">
        {activity.map((item, index) => <p key={index}>⚡ {item}</p>)}
      </div>
    </section>
  );
}

function EventsPanel({ events, openParty }) {
  return (
    <section className="panel">
      <div className="sectionTitle"><h3>Planning</h3><button onClick={openParty}>NU een potje?</button></div>
      {events.map(event => (
        <article className="eventCard" key={event.id}>
          <strong>{event.title}</strong>
          <span>{event.time} · {event.ready}/5 ready</span>
          <small>Invited: {event.invited.length ? event.invited.join(", ") : "Nog niemand"}</small>
        </article>
      ))}
    </section>
  );
}

function ImmersionLayout(props) {
  const { smartPick, games, squad, openProfile, openGame, openParty, openAvatar, currentAvatar, events, activity } = props;
  return (
    <section className="layoutScreen immersionScreen">
      <TopBar avatar={currentAvatar} openAvatar={openAvatar} openParty={() => openParty(smartPick)} />
      <article className="cinematicHero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.12)), url(${smartPick.art})` }}>
        <span>Best adventure tonight</span>
        <h1>{smartPick.name}</h1>
        <p>{smartPick.desc}</p>
        <GameModePills game={smartPick} />
        <button onClick={() => openParty(smartPick)}>Open party module</button>
      </article>
      <SquadRow squad={squad} openProfile={openProfile} compact />
      <PickList games={games} squad={squad} openGame={openGame} openParty={openParty} />
      <EventsPanel events={events} openParty={() => openParty(smartPick)} />
      <ActivityFeed activity={activity} />
    </section>
  );
}

function CarouselLayout(props) {
  const { games, squad, openProfile, openGame, openParty, openAvatar, currentAvatar, events } = props;
  return (
    <section className="layoutScreen carouselScreen">
      <TopBar avatar={currentAvatar} openAvatar={openAvatar} openParty={() => openParty(games[0])} />
      <SquadRow squad={squad} openProfile={openProfile} compact />
      <div className="bigCarousel">
        {games.map(game => (
          <article className="carouselCard tactile" key={game.id} onClick={() => openGame(game)} style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(0,0,0,.78)), url(${game.art})` }}>
            <h2>{game.name}</h2>
            <p>{game.match}% match · {game.mode}</p>
            <GameModePills game={game} />
            <button onClick={(event) => { event.stopPropagation(); openParty(game); }}>Open party</button>
          </article>
        ))}
      </div>
      <EventsPanel events={events} openParty={() => openParty(games[0])} />
    </section>
  );
}

function NeonLayout(props) {
  const { games, squad, openProfile, openParty, openAvatar, currentAvatar } = props;
  return (
    <section className="layoutScreen neonScreen">
      <TopBar avatar={currentAvatar} openAvatar={openAvatar} openParty={() => openParty(games[0])} />
      <section className="neonBox">
        <p>SQUAD ONLINE</p>
        <SquadRow squad={squad} openProfile={openProfile} />
      </section>
      <section className="questionBox">
        <div><span>WHAT WE PLAYING</span><h1>TONIGHT?</h1><p>Smart picks based on who's online</p></div>
        <button onClick={() => openParty(games[0])}><ChevronRight /></button>
      </section>
      <PickList games={games} squad={squad} openGame={props.openGame} openParty={openParty} />
    </section>
  );
}

function DeckLayout(props) {
  const { games, squad, openProfile, openParty, openAvatar, currentAvatar } = props;
  return (
    <section className="deckLayout">
      <aside className="rail"><Home/><Search/><Users/><CalendarDays/><Settings/></aside>
      <main className="deckMain">
        <TopBar avatar={currentAvatar} openAvatar={openAvatar} openParty={() => openParty(games[1])} />
        <h2>Good evening, squad</h2>
        <SquadRow squad={squad} openProfile={openProfile} compact />
        <article className="continueCard" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.75), rgba(0,0,0,.15)), url(${games[1].art})` }}>
          <h3>Continue Playing Together</h3>
          <strong>{games[1].name}</strong>
          <button onClick={() => openParty(games[1])}>Join</button>
        </article>
        <PickList games={games} squad={squad} openGame={props.openGame} openParty={openParty} variant="compact" />
      </main>
    </section>
  );
}

function ArcadeLayout(props) {
  const { games, squad, openProfile, openParty, openAvatar, currentAvatar } = props;
  return (
    <section className="layoutScreen arcadeScreen">
      <TopBar title="☠ SQUADUP.GG" avatar={currentAvatar} openAvatar={openAvatar} openParty={() => openParty(games[0])} />
      <section className="arcadeStatus"><SquadRow squad={squad} openProfile={openProfile} /></section>
      <section className="arcadeStart tactile" onClick={() => openParty(games[0])}>
        <h1>WHAT WE PLAYING TONIGHT?</h1>
        <p>PRESS START</p>
        <Gamepad2 size={48} />
      </section>
      <PickList games={games} squad={squad} openGame={props.openGame} openParty={openParty} />
    </section>
  );
}

function LanLayout(props) {
  const { games, squad, openProfile, openParty, openAvatar, currentAvatar, events } = props;
  return (
    <section className="layoutScreen lanScreen">
      <TopBar title="☢ SQUADUP.GG" avatar={currentAvatar} openAvatar={openAvatar} openParty={() => openParty(games[0])} />
      <section className="lanPanel"><SquadRow squad={squad} openProfile={openProfile} /></section>
      <section className="terminal tactile" onClick={() => openParty(games[0])}>
        <h1>WHAT ARE WE PLAYING TONIGHT?</h1>
        <p>&gt; FIND THE PERFECT GAME</p>
      </section>
      <PickList games={games} squad={squad} openGame={props.openGame} openParty={openParty} />
      <EventsPanel events={events} openParty={() => openParty(games[0])} />
    </section>
  );
}

function GridLayout(props) {
  const { games, squad, openProfile, openParty, openAvatar, currentAvatar, activity } = props;
  return (
    <section className="layoutScreen gridScreen">
      <TopBar avatar={currentAvatar} openAvatar={openAvatar} openParty={() => openParty(games[0])} />
      <section className="gridPanels">
        <article className="panel"><h3>Squad status</h3><SquadRow squad={squad} openProfile={openProfile} compact /></article>
        <article className="panel"><h3>Mission Control</h3><p>Analyse squad and get best matches.</p><button onClick={() => openParty(games[0])}>Find match</button></article>
      </section>
      <PickList games={games} squad={squad} openGame={props.openGame} openParty={openParty} />
      <ActivityFeed activity={activity} />
    </section>
  );
}

function DesktopDashboard(props) {
  const { layout, setLayout, games, squad, openProfile, openGame, openParty, events, activity, smartPick } = props;
  const [activeDesktopTab, setActiveDesktopTab] = useState("home");
  return (
    <section className={`desktop desktop-${layout}`}>
      <header className="desktopCommandBar">
        <div className="brand"><Gamepad2/><div><strong>SquadUp<span>.gg</span></strong><small>v0.27 adaptive navigation</small></div></div>
        <nav className="desktopTopNav">
          {[["home", Home, "Home"],["games", Gamepad2, "Games"],["queue", Zap, "Queue"],["squad", Users, "Squad"],["plan", CalendarDays, "Plan"],["chat", Bell, "Chat"],["profile", User, "Profile"]].map(([id, Icon, label]) => (
            <button key={id} className={activeDesktopTab === id ? "active" : ""} onClick={() => id === "queue" ? openParty(smartPick) : setActiveDesktopTab(id)}>
              <Icon size={17}/><span>{label}</span>{id === "chat" && <b>3</b>}
            </button>
          ))}
        </nav>
        <button className="desktopPlus" onClick={() => openParty(smartPick)}><Plus size={22}/></button>
        <div className="desktopPresenceMini">{squad.slice(0,4).map(user => <span key={user.id}>{user.avatar}</span>)}<strong>3/5 online</strong></div>
        <select className="desktopThemeSelect" value={layout} onChange={(event) => setLayout(event.target.value)}>{layouts.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select>
      </header>
      <main className="desktopMain noSidebar">
        <SmartActionCards squad={squad} events={events} openParty={() => openParty(smartPick)} openVoice={() => openParty(smartPick)} openDetails={() => openParty(smartPick)} />
        <header className="desktopHero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.75), rgba(0,0,0,.12)), url(${smartPick.art})` }}>
          <div><span>Friday Squad</span><h1>What are we playing tonight?</h1><p>{smartPick.desc}</p><GameModePills game={smartPick}/><button onClick={() => openParty(smartPick)}>🎮 Open party module</button></div>
        </header>
        <section className="desktopGrid">
          <article className="panel wide"><div className="sectionTitle"><h3>Recommended games</h3><span>click for details</span></div><div className="desktopGames">{games.map(g => <button key={g.id} onClick={() => openGame(g)} style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(0,0,0,.78)), url(${g.art})` }}><strong>{g.name}</strong><span>{g.match}% · {g.mode}</span><small>{g.ownedBy.length}/{squad.length} own · {g.installedBy.length} installed · PvP {g.pvp ? "yes" : "no"}</small></button>)}</div></article>
          <article className="panel"><div className="sectionTitle"><h3>Party slots</h3><button onClick={() => openParty(smartPick)}>Open</button></div><MiniPartyPreview game={smartPick} squad={squad}/></article>
          <article className="panel"><div className="sectionTitle"><h3>Squad online</h3><span>tag/profile</span></div>{squad.map(user => <button className="desktopUser" key={user.id} onClick={() => openProfile(user)}><span className="avatar">{user.avatar}</span><div><strong>{user.name}</strong><small>{user.status} · {user.game}</small></div></button>)}</article>
          <EventsPanel events={events} openParty={() => openParty(smartPick)} />
          <ActivityFeed activity={activity} />
        </section>
      </main>
    </section>
  );
}

function MiniPartyPreview({ game, squad }) {
  const players = [squad[3], squad[0]];
  return (
    <div className="miniParty">
      {Array.from({ length: Math.min(game.maxPlayers, 4) }).map((_, index) => (
        <div key={index} className={players[index] ? "filled" : ""}>
          {players[index] ? <><span>{players[index].avatar}</span><strong>{players[index].name}</strong></> : <><Plus size={18}/><small>Open slot</small></>}
        </div>
      ))}
    </div>
  );
}


function SmartActionCards({ squad, events, openParty, openVoice, openDetails }) {
  const online = squad.filter(user => user.status !== "Offline").slice(0, 4);
  const nextEvent = events[0];
  return (
    <section className="smartActions">
      <article>
        <div className="miniFaceStack">{online.map(user => <span key={user.id}>{user.avatar}</span>)}</div>
        <strong>Vrienden online</strong>
        <small>{online.length} spelers beschikbaar</small>
        <button onClick={openParty}>Start squad queue</button>
      </article>
      <article>
        <div className="voiceOrb">🎙️</div>
        <strong>Iemand in voice</strong>
        <small>Tom en Sven zitten klaar</small>
        <button onClick={openVoice}>Join voice</button>
      </article>
      <article>
        <div className="eventPreview">LAN</div>
        <strong>Event binnenkort</strong>
        <small>{nextEvent?.time || "Geen event"}</small>
        <button onClick={openDetails}>Details</button>
      </article>
    </section>
  );
}

function QuickActionMenu({ open, close, openParty, setActiveTab }) {
  if (!open) return null;
  const actions = [
    ["⚡", "Start Queue", () => openParty()],
    ["👥", "Create Party", () => openParty()],
    ["📣", "Ping Squad", () => openParty()],
    ["📅", "Plan Session", () => setActiveTab("plan")],
    ["🎙️", "Join Voice", () => setActiveTab("squad")],
    ["➕", "Add Friend", () => setActiveTab("squad")]
  ];
  return (
    <div className="quickOverlay" onClick={close}>
      <section className="quickMenu" onClick={(event) => event.stopPropagation()}>
        <button className="quickClose" onClick={close}><X size={18} /></button>
        <span>Quick actions</span>
        <h2>Wat wil je starten?</h2>
        <div className="quickGrid">
          {actions.map(([icon, label, action]) => (
            <button key={label} onClick={() => { action(); close(); }}>
              <i>{icon}</i><strong>{label}</strong>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function BottomNav({ layout, activeTab, setActiveTab, openParty, events, squad }) {
  const [quickOpen, setQuickOpen] = useState(false);
  const partyCount = 2;
  const partyMax = 4;
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "games", label: "Games", icon: Gamepad2 },
    { id: "queue", label: "Queue", icon: Zap },
    { id: "squad", label: "Squad", icon: Users },
    { id: "plan", label: "Plan", icon: CalendarDays },
    { id: "chat", label: "Chat", icon: Bell },
    { id: "profile", label: "Profile", icon: User }
  ];
  return (
    <>
      <div className={`navDock themeDock ${layout}`}>
        <div className="partyIndicator" onClick={openParty}>
          <div className="miniFaceStack">{squad.slice(0, partyCount).map(user => <span key={user.id}>{user.avatar}</span>)}</div>
          <strong>Party {partyCount}/{partyMax}</strong>
        </div>
        <nav className="coreNav">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            if (index === 3) {
              return (
                <button key="plus" className="centerAction" onClick={() => setQuickOpen(true)} aria-label="Open quick actions">
                  <Plus size={24} /><em>{events.length}</em>
                </button>
              );
            }
            return (
              <button key={item.id} className={activeTab === item.id ? "active" : ""} onClick={() => item.id === "queue" ? openParty() : setActiveTab(item.id)}>
                <Icon size={18} /><span>{item.label}</span>{item.id === "chat" && <b>3</b>}
              </button>
            );
          })}
        </nav>
      </div>
      <QuickActionMenu open={quickOpen} close={() => setQuickOpen(false)} openParty={openParty} setActiveTab={setActiveTab} />
    </>
  );
}

function IntroPicker({ setLayout, close }) {
  return (
    <div className="overlay">
      <section className="modal intro">
        <button className="close" onClick={close}><X/></button>
        <span>Welcome to SquadUp.gg</span>
        <h1>Choose your squad vibe</h1>
        <p>Kies de startstijl. Later kun je altijd wisselen.</p>
        <div className="introCards">
          <button onClick={() => { setLayout("immersion"); close(); }}><strong>Full Immersion</strong><small>Cinematic adventure</small></button>
          <button onClick={() => { setLayout("carousel"); close(); }}><strong>Carousel Focus</strong><small>Game artwork first</small></button>
        </div>
      </section>
    </div>
  );
}

function UserModal({ user, close, inviteUser, openParty }) {
  return (
    <div className="overlay">
      <section className="modal profileModal">
        <button className="close" onClick={close}><X/></button>
        <div className="profileTop"><span className="modalAvatar">{user.avatar}</span><div><small>{user.archetype}</small><h2>{user.name}</h2><p>Level {user.level} · {user.availability}</p></div></div>
        <p>{user.bio}</p>
        <div className="badgeRow">{user.badges.map(b => <span key={b}>{b}</span>)}</div>
        <div className="modalActions">
          <button onClick={() => inviteUser(user, "party")}>Invite to party</button>
          <button onClick={openParty}>Open party module</button>
        </div>
      </section>
    </div>
  );
}

function GameModal({ game, squad, close, planGame, openParty, updateStatus, status }) {
  const ownNames = namesFromIds(game.ownedBy, squad);
  const installedNames = namesFromIds(game.installedBy, squad);
  const wantNames = namesFromIds(game.wants, squad);
  return (
    <div className="overlay">
      <section className="modal gameModal">
        <button className="close" onClick={close}><X/></button>
        <div className="gameBanner" style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(0,0,0,.82)), url(${game.art})` }}><h2>{game.name}</h2><p>{game.mode} · {game.match}% squad match</p></div>
        <GameModePills game={game}/>
        <p>{game.desc}</p>
        <div className="gameStats">
          <div><strong>{game.ownedBy.length}/{squad.length}</strong><span>friends own it</span><small>{ownNames.join(", ")}</small></div>
          <div><strong>{game.installedBy.length}</strong><span>installed</span><small>{installedNames.join(", ") || "None"}</small></div>
          <div><strong>{game.wants.length}</strong><span>want to buy</span><small>{wantNames.join(", ") || "None"}</small></div>
          <div><strong>{game.maxPlayers}</strong><span>max party</span><small>{game.session}</small></div>
        </div>
        <div className="statusButtons">
          {["owned","want","installed","active"].map(key => <button key={key} className={status[key] ? "on" : ""} onClick={() => updateStatus(game, key)}>{status[key] ? <Check size={14}/> : null}{key}</button>)}
        </div>
        <div className="modalActions">
          <button onClick={() => openParty(game)}>Open party module</button>
          <button onClick={() => planGame(game)}>Plan game night</button>
        </div>
      </section>
    </div>
  );
}

function PartyModule({
  game,
  squad,
  slots,
  addToParty,
  removeFromParty,
  close,
  sendPartyInvite,
  setPartyGame,
  games,
  partyMood,
  setPartyMood,
  partyStatus,
  readyMap,
  toggleReady,
  startReadyCheck,
  launchParty,
  partyFeed
}) {
  const filled = slots.filter(Boolean);
  const candidates = squad.filter(user => !slots.some(slot => slot?.id === user.id));
  const ownedCandidates = candidates.filter(user => game.ownedBy.includes(user.id));
  const onlineCandidates = candidates.filter(user => user.status !== "Offline");
  const bestInvites = Array.from(new Map([...ownedCandidates, ...onlineCandidates, ...candidates].map(user => [user.id, user])).values());
  const readyCount = filled.filter(user => readyMap[user.id] === "ready").length;
  const statusLabel = partyStatus === "in-game" ? "In match" : partyStatus === "ready-check" ? "Ready check" : partyStatus === "ready" ? "Ready" : "Forming";

  return (
    <div className="overlay partyOverlay">
      <section className="partyView">
        <button className="close" onClick={close}><X/></button>

        <header className="partyHero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.82), rgba(0,0,0,.22)), url(${game.art})` }}>
          <div>
            <span>Party lobby</span>
            <h1>{game.name}</h1>
            <p>{game.mode} · {filled.length}/{slots.length} filled · {readyCount}/{filled.length || 1} ready</p>
            <GameModePills game={game}/>
          </div>
          <div className={`partyStatus ${partyStatus}`}>
            <strong>{statusLabel}</strong>
            <small>{partyMood}</small>
          </div>
        </header>

        <div className="partyLayoutGrid">
          <main className="partyMainColumn">
            <section className="partyControls">
              <select value={game.id} onChange={(event) => setPartyGame(games.find(g => g.id === Number(event.target.value)))}>
                {games.map(g => <option value={g.id} key={g.id}>{g.name}</option>)}
              </select>

              <div className="moodSelector">
                {["Chill", "Competitive", "Chaos Run", "Survival", "Quick Session", "All Nighter"].map(mood => (
                  <button key={mood} className={partyMood === mood ? "on" : ""} onClick={() => setPartyMood(mood)}>{mood}</button>
                ))}
              </div>
            </section>

            <section className="partySlotsLarge">
              {slots.map((slot, index) => (
                <article key={index} className={slot ? `slotCard filled ${readyMap[slot.id] || "maybe"}` : "slotCard"}>
                  {slot ? (
                    <>
                      <button className="slotRemove" onClick={() => removeFromParty(index)}>×</button>
                      <span className="slotAvatar">{slot.avatar}</span>
                      <strong>{slot.name}</strong>
                      <small>{slot.game}</small>
                      <div className="slotMeta">
                        <span>{game.ownedBy.includes(slot.id) ? "🎮 Owns" : "🛒 Needs game"}</span>
                        <span>{game.installedBy.includes(slot.id) ? "⬇️ Installed" : "⏳ Install?"}</span>
                        <span>🎧 Voice</span>
                      </div>
                      <button className="readyButton" onClick={() => toggleReady(slot.id)}>
                        {readyMap[slot.id] === "ready" ? "✅ Ready" : readyMap[slot.id] === "installing" ? "⬇️ Installing" : "🟡 Maybe"}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="emptySlotIcon"><Plus/></div>
                      <strong>Open slot</strong>
                      <small>Invite a squad member</small>
                    </>
                  )}
                </article>
              ))}
            </section>

            <section className="partyLaunchBar">
              <button onClick={startReadyCheck}>Ready Check</button>
              <button onClick={sendPartyInvite}>Send Invites</button>
              <button className="launchButton" onClick={launchParty}>Launch Game</button>
            </section>
          </main>

          <aside className="partySidePanel">
            <section>
              <div className="sectionTitle"><h3>Best invites</h3><span>smart suggestions</span></div>
              <div className="candidateList">
                {bestInvites.map(user => (
                  <button key={user.id} onClick={() => addToParty(user)}>
                    <span>{user.avatar}</span>
                    <div>
                      <strong>{user.name}</strong>
                      <small>{game.ownedBy.includes(user.id) ? "Owns game" : "Does not own"} · {user.status}</small>
                    </div>
                    <em>Invite</em>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="sectionTitle"><h3>Party activity</h3><span>live mock</span></div>
              <div className="partyFeed">
                {partyFeed.map((item, index) => <p key={index}>⚡ {item}</p>)}
              </div>
            </section>

            <section className="voicePanel">
              <strong>Voice channel</strong>
              <span>{filled.length} connected · speaking rings enabled</span>
              <button>Join Voice</button>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}


function AvatarModal({ currentAvatar, setCurrentAvatar, close, notify }) {
  return (
    <div className="overlay">
      <section className="modal avatarModal">
        <button className="close" onClick={close}><X/></button>
        <span>Avatar collection</span>
        <h1>Choose your identity</h1>
        <div className="avatarGrid">
          {avatarPool.map((av, i) => <button key={`${av}-${i}`} className={currentAvatar === av ? "on" : ""} onClick={() => { setCurrentAvatar(av); notify("Avatar gekozen"); }}>{av}</button>)}
        </div>
      </section>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
