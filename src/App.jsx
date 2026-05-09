
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
  { id: "grid", label: "Grid Command" },
  { id: "sidenav", label: "Side Nav" }
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
    notify(`${user.name} toegevoegd aan party`);
  }

  function removeFromParty(index) {
    setPartySlots(prev => prev.map((slot, i) => i === index ? null : slot));
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
    notify(`Party invite verstuurd naar ${filled.length} spelers`);
    planGame(partyGame);
    setPartyOpen(false);
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
    grid: GridLayout,
    sidenav: SideNavLayout
  }[layout];

  return (
    <div className={`app ${layout}`}>
      <DesktopDashboard {...sharedProps} />
      <main className="mobileShell">
        <LayoutSwitcher layout={layout} setLayout={setLayout} />
        <LayoutComponent {...sharedProps} />
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} openParty={() => openParty(smartPick)} />
      </main>

      {introOpen && <IntroPicker setLayout={setLayout} close={() => setIntroOpen(false)} />}
      {selectedUser && <UserModal user={selectedUser} close={() => setSelectedUser(null)} inviteUser={inviteUser} openParty={() => openParty(partyGame)} />}
      {selectedGame && <GameModal game={selectedGame} squad={squad} close={() => setSelectedGame(null)} planGame={planGame} openParty={openParty} updateStatus={updateStatus} status={gameStatus[selectedGame.id] || {}} />}
      {partyOpen && <PartyModule game={partyGame} squad={squad} slots={partySlots} addToParty={addToParty} removeFromParty={removeFromParty} close={() => setPartyOpen(false)} sendPartyInvite={sendPartyInvite} setPartyGame={setPartyGame} games={games} />}
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

function SideNavLayout(props) {
  const { games, squad, openProfile, openParty, openAvatar, currentAvatar } = props;
  return (
    <section className="sideLayout">
      <aside className="sideNav"><strong>SquadUp</strong><button>Dashboard</button><button>Discover</button><button>Squad</button><button>Plan</button></aside>
      <main className="sideMain">
        <TopBar title="Dashboard" avatar={currentAvatar} openAvatar={openAvatar} openParty={() => openParty(games[0])} />
        <section className="panel"><SquadRow squad={squad} openProfile={openProfile} compact /></section>
        <section className="questionBox"><div><h2>What should we play tonight?</h2><p>Get smart recommendations.</p></div><button onClick={() => openParty(games[0])}><ChevronRight /></button></section>
        <PickList games={games} squad={squad} openGame={props.openGame} openParty={openParty} />
      </main>
    </section>
  );
}

function DesktopDashboard(props) {
  const { layout, setLayout, games, squad, openProfile, openGame, openParty, events, activity, smartPick } = props;
  return (
    <section className="desktop">
      <aside className="desktopSidebar">
        <div className="brand"><Gamepad2/><div><strong>SquadUp<span>.gg</span></strong><small>v0.25 Command Center</small></div></div>
        <nav>{["Dashboard","Discover","Squad","Planning","Party","Settings"].map(item => <button key={item}>{item}</button>)}</nav>
        <div className="desktopLayouts">
          {layouts.map(item => <button key={item.id} className={layout === item.id ? "active" : ""} onClick={() => setLayout(item.id)}>{item.label}</button>)}
        </div>
      </aside>
      <main className="desktopMain">
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

function BottomNav({ activeTab, setActiveTab, openParty }) {
  return (
    <nav className="bottomNav">
      {["home","discover","plan","squad"].map(tab => <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>{tab}</button>)}
      <button className="queueFab" onClick={openParty}><Plus /></button>
    </nav>
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

function PartyModule({ game, squad, slots, addToParty, removeFromParty, close, sendPartyInvite, setPartyGame, games }) {
  const filled = slots.filter(Boolean);
  const candidates = squad.filter(user => !slots.some(slot => slot?.id === user.id));
  return (
    <div className="overlay">
      <section className="modal partyModule">
        <button className="close" onClick={close}><X/></button>
        <span>Party module</span>
        <h1>Build your party</h1>
        <select value={game.id} onChange={(event) => setPartyGame(games.find(g => g.id === Number(event.target.value)))}>
          {games.map(g => <option value={g.id} key={g.id}>{g.name}</option>)}
        </select>
        <div className="partyGameHeader" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.18)), url(${game.art})` }}>
          <strong>{game.name}</strong>
          <span>{filled.length}/{slots.length} filled · {game.mode}</span>
        </div>
        <div className="partySlots">
          {slots.map((slot, index) => (
            <button key={index} className={slot ? "partySlot filled" : "partySlot"} onClick={() => slot ? removeFromParty(index) : null}>
              {slot ? <><span>{slot.avatar}</span><strong>{slot.name}</strong><small>{slot.availability}</small></> : <><Plus/><strong>Open slot</strong><small>Invite someone</small></>}
            </button>
          ))}
        </div>
        <h3>Add squad members</h3>
        <div className="candidateGrid">
          {candidates.map(user => <button key={user.id} onClick={() => addToParty(user)}><span>{user.avatar}</span><strong>{user.name}</strong><small>{user.game}</small></button>)}
        </div>
        <button className="mainAction" onClick={sendPartyInvite}>Send party invite</button>
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
