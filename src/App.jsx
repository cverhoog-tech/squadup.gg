
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  CalendarDays,
  ChevronRight,
  Gamepad2,
  Home,
  Menu,
  Plus,
  Search,
  Settings,
  Trophy,
  User,
  Users,
  X,
  Zap
} from "lucide-react";
import "./style.css";

const layouts = [
  { id: "immersion", label: "Full Immersion", desc: "Cinematic · Story Driven" },
  { id: "carousel", label: "Carousel Focus", desc: "Visual · Media First" },
  { id: "neon", label: "Neon Command", desc: "Futuristic · Bold" },
  { id: "deck", label: "Steam Deck", desc: "Console · Focused" },
  { id: "arcade", label: "Cyber Arcade", desc: "Retro · Playful" },
  { id: "lan", label: "LAN Party", desc: "Hardware · Retro" },
  { id: "grid", label: "Grid Command", desc: "Tactical · Structured" },
  { id: "sidenav", label: "Side Nav", desc: "Command Center" }
];

const initialSquad = [
  { id: 1, name: "Kevin", avatar: "🛡️", archetype: "Tactical Vanguard", level: 18, status: "Playing", game: "Helldivers 2", availability: "Ready", badges: ["Reliable", "Shield Wall", "No Fear"], xp: 2840, bio: "Altijd als eerste in de lobby en meestal ook als eerste dood." },
  { id: 2, name: "Tom", avatar: "🧙", archetype: "Arcane Strategist", level: 16, status: "In Game", game: "Deep Rock Galactic", availability: "Maybe", badges: ["Planner", "Backlog Mage", "Lore Brain"], xp: 2210, bio: "Maakt spreadsheets voor survival bases en noemt dat casual play." },
  { id: 3, name: "Sven", avatar: "🤖", archetype: "LAN Engineer", level: 14, status: "In Voice", game: "Discord voice", availability: "Online", badges: ["Cable Goblin", "Setup Wizard", "Tech Support"], xp: 1904, bio: "Heeft altijd een extra kabel, maar nooit de juiste." },
  { id: 4, name: "Shane", avatar: "🚀", archetype: "Squad Captain", level: 21, status: "Browsing", game: "SquadUp.gg", availability: "Ready", badges: ["Pathfinder", "LAN Lord", "Hype Driver"], xp: 3120, bio: "Start het avontuur, plant de chaos en vergeet soms de snacks." },
  { id: 5, name: "Lars", avatar: "🐺", archetype: "Chaos Ranger", level: 12, status: "Online", game: "Steam", availability: "Busy later", badges: ["Friendly Fire", "Loot Goblin", "Last Minute"], xp: 1325, bio: "Komt binnen met nul context en maakt het toch legendarisch." }
];

const avatarPool = [
  "🛡️","🧙","🤖","🚀","🐺","🐉","👾","🦾","🧟","🧛","🧝","🧌","🦊","🦁","🐲","🦅","🦇","🦂","🦄","🦖",
  "⚔️","🏹","🔮","💀","☠️","👑","🧠","🧪","🔧","💣","🪓","🗡️","🛸","🛰️","🕹️","🎮","🎯","🔥","⚡","🌙",
  "🐸","🐼","🐵","🐧","🦉","🦈","🐙","🦀","🦥","🦦","🦔","🐢","🐍","🦎","🦕","🦣","🦭","🦜","🦚","🦡",
  "🥷","🧑‍🚀","🧑‍🔧","🧑‍💻","🧑‍🎤","🧑‍🚒","🧑‍✈️","🦸","🦹","🧞","🧚","🧜","⚙️","🧿","💎","🏆","🎲","🃏","♟️","🧩"
];

const games = [
  {
    id: 1,
    name: "HELLDIVERS™ 2",
    match: 93,
    mode: "Co-op PvE",
    tags: ["co-op", "pve", "quick"],
    art: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
    desc: "Co-op chaos met korte missies, duidelijke roles en veel squad momentum.",
    owned: 4,
    installed: 3,
    want: 1,
    active: 2
  },
  {
    id: 2,
    name: "DEEP ROCK GALACTIC",
    match: 88,
    mode: "Co-op PvE",
    tags: ["co-op", "pve", "quick"],
    art: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80",
    desc: "Mijnbouw, teamwork en paniek in compacte co-op sessies.",
    owned: 5,
    installed: 4,
    want: 0,
    active: 1
  },
  {
    id: 3,
    name: "VALHEIM",
    match: 82,
    mode: "Survival Co-op",
    tags: ["survival", "co-op", "long"],
    art: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    desc: "Survival, bouwen, boss fights en langlopende squad progressie.",
    owned: 4,
    installed: 2,
    want: 1,
    active: 0
  },
  {
    id: 4,
    name: "PROJECT ZOMBOID",
    match: 78,
    mode: "Survival PvE",
    tags: ["survival", "pve", "hardcore"],
    art: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80",
    desc: "Hardcore survival sandbox voor inside jokes en rampzalige plannen.",
    owned: 3,
    installed: 2,
    want: 2,
    active: 0
  },
  {
    id: 5,
    name: "RISK OF RAIN 2",
    match: 86,
    mode: "Co-op Roguelike",
    tags: ["co-op", "pve", "quick"],
    art: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    desc: "Snelle roguelike runs voor avonden met weinig setup.",
    owned: 3,
    installed: 3,
    want: 1,
    active: 0
  }
];

function App() {
  const [layout, setLayout] = useState("immersion");
  const [squad, setSquad] = useState(initialSquad);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [queueOpen, setQueueOpen] = useState(false);
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

  const smartPick = games[0];

  function notify(message) {
    setToast(message);
    setActivity(prev => [message, ...prev].slice(0, 8));
    clearTimeout(window.__squadToast);
    window.__squadToast = setTimeout(() => setToast(""), 1800);
  }

  function planGame(game) {
    const event = {
      id: Date.now(),
      title: `${game.name} squad night`,
      game: game.name,
      time: "Vandaag · 20:30",
      ready: 1,
      invited: []
    };
    setEvents(prev => [event, ...prev]);
    notify(`${game.name} ingepland`);
  }

  function inviteUser(user, context = "party") {
    notify(`${user.name} uitgenodigd voor ${context}`);
    setEvents(prev => prev.map((event, index) => index === 0
      ? { ...event, invited: Array.from(new Set([...event.invited, user.name])) }
      : event
    ));
  }

  function sendQueue(selectedNames, mood) {
    notify(`Queue invite verstuurd naar ${selectedNames.length} spelers · ${mood}`);
    setQueueOpen(false);
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
    openQueue: () => setQueueOpen(true),
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
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} openQueue={() => setQueueOpen(true)} />
      </main>

      {introOpen && <IntroPicker setLayout={setLayout} close={() => setIntroOpen(false)} />}
      {selectedUser && <UserModal user={selectedUser} close={() => setSelectedUser(null)} inviteUser={inviteUser} openQueue={() => setQueueOpen(true)} />}
      {selectedGame && <GameModal game={selectedGame} close={() => setSelectedGame(null)} planGame={planGame} updateStatus={updateStatus} status={gameStatus[selectedGame.id] || {}} />}
      {queueOpen && <QueueModal squad={squad} games={games} close={() => setQueueOpen(false)} sendQueue={sendQueue} />}
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
          <strong>{item.label}</strong>
          <span>{item.desc}</span>
        </button>
      ))}
    </div>
  );
}

function TopBar({ title = "SQUADUP.GG", avatar, openAvatar, openQueue }) {
  return (
    <header className="topBar">
      <strong>{title}</strong>
      <div>
        <button onClick={openQueue}><Zap size={16} /></button>
        <button onClick={openAvatar}><span className="miniAvatar">{avatar}</span></button>
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

function PickList({ games, openGame, planGame, variant = "" }) {
  return (
    <div className={`pickList ${variant}`}>
      {games.slice(0, 3).map((game, index) => (
        <article className="pickCard tactile" key={game.id} onClick={() => openGame(game)}>
          <span className="rank">{index + 1}</span>
          <div className="pickThumb" style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(0,0,0,.72)), url(${game.art})` }} />
          <div>
            <strong>{game.name}</strong>
            <small>{game.match}% match · {game.mode}</small>
          </div>
          <button onClick={(e) => { e.stopPropagation(); planGame(game); }}>Plan</button>
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

function EventsPanel({ events, openQueue }) {
  return (
    <section className="panel">
      <div className="sectionTitle"><h3>Planning</h3><button onClick={openQueue}>NU een potje?</button></div>
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
  const { smartPick, games, squad, openProfile, openGame, openQueue, openAvatar, currentAvatar, events, activity } = props;
  return (
    <section className="layoutScreen immersionScreen">
      <TopBar avatar={currentAvatar} openAvatar={openAvatar} openQueue={openQueue} />
      <article className="cinematicHero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.12)), url(${smartPick.art})` }}>
        <span>Best adventure tonight</span>
        <h1>{smartPick.name}</h1>
        <p>{smartPick.desc}</p>
        <button onClick={openQueue}>Find your squad</button>
      </article>
      <SquadRow squad={squad} openProfile={openProfile} compact />
      <PickList games={games} openGame={openGame} planGame={props.planGame} />
      <EventsPanel events={events} openQueue={openQueue} />
      <ActivityFeed activity={activity} />
    </section>
  );
}

function CarouselLayout(props) {
  const { games, squad, openProfile, openGame, openQueue, openAvatar, currentAvatar, events } = props;
  return (
    <section className="layoutScreen carouselScreen">
      <TopBar avatar={currentAvatar} openAvatar={openAvatar} openQueue={openQueue} />
      <SquadRow squad={squad} openProfile={openProfile} compact />
      <div className="bigCarousel">
        {games.map(game => (
          <article className="carouselCard tactile" key={game.id} onClick={() => openGame(game)} style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(0,0,0,.78)), url(${game.art})` }}>
            <h2>{game.name}</h2>
            <p>{game.match}% match · {game.mode}</p>
            <button onClick={(e) => { e.stopPropagation(); props.planGame(game); }}>Join</button>
          </article>
        ))}
      </div>
      <EventsPanel events={events} openQueue={openQueue} />
    </section>
  );
}

function NeonLayout(props) {
  const { games, squad, openProfile, openQueue, openAvatar, currentAvatar } = props;
  return (
    <section className="layoutScreen neonScreen">
      <TopBar avatar={currentAvatar} openAvatar={openAvatar} openQueue={openQueue} />
      <section className="neonBox">
        <p>SQUAD ONLINE</p>
        <SquadRow squad={squad} openProfile={openProfile} />
      </section>
      <section className="questionBox">
        <div><span>WHAT WE PLAYING</span><h1>TONIGHT?</h1><p>Smart picks based on who's online</p></div>
        <button onClick={openQueue}><ChevronRight /></button>
      </section>
      <PickList games={games} openGame={props.openGame} planGame={props.planGame} />
    </section>
  );
}

function DeckLayout(props) {
  const { games, squad, openProfile, openQueue, openAvatar, currentAvatar } = props;
  return (
    <section className="deckLayout">
      <aside className="rail"><Home/><Search/><Users/><CalendarDays/><Settings/></aside>
      <main className="deckMain">
        <TopBar avatar={currentAvatar} openAvatar={openAvatar} openQueue={openQueue} />
        <h2>Good evening, squad</h2>
        <SquadRow squad={squad} openProfile={openProfile} compact />
        <article className="continueCard" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.75), rgba(0,0,0,.15)), url(${games[1].art})` }}>
          <h3>Continue Playing Together</h3>
          <strong>{games[1].name}</strong>
          <button onClick={openQueue}>Join</button>
        </article>
        <PickList games={games} openGame={props.openGame} planGame={props.planGame} variant="compact" />
      </main>
    </section>
  );
}

function ArcadeLayout(props) {
  const { games, squad, openProfile, openQueue, openAvatar, currentAvatar } = props;
  return (
    <section className="layoutScreen arcadeScreen">
      <TopBar title="☠ SQUADUP.GG" avatar={currentAvatar} openAvatar={openAvatar} openQueue={openQueue} />
      <section className="arcadeStatus"><SquadRow squad={squad} openProfile={openProfile} /></section>
      <section className="arcadeStart tactile" onClick={openQueue}>
        <h1>WHAT WE PLAYING TONIGHT?</h1>
        <p>PRESS START</p>
        <Gamepad2 size={48} />
      </section>
      <PickList games={games} openGame={props.openGame} planGame={props.planGame} />
    </section>
  );
}

function LanLayout(props) {
  const { games, squad, openProfile, openQueue, openAvatar, currentAvatar, events } = props;
  return (
    <section className="layoutScreen lanScreen">
      <TopBar title="☢ SQUADUP.GG" avatar={currentAvatar} openAvatar={openAvatar} openQueue={openQueue} />
      <section className="lanPanel"><SquadRow squad={squad} openProfile={openProfile} /></section>
      <section className="terminal tactile" onClick={openQueue}>
        <h1>WHAT ARE WE PLAYING TONIGHT?</h1>
        <p>&gt; FIND THE PERFECT GAME</p>
      </section>
      <PickList games={games} openGame={props.openGame} planGame={props.planGame} />
      <EventsPanel events={events} openQueue={openQueue} />
    </section>
  );
}

function GridLayout(props) {
  const { games, squad, openProfile, openQueue, openAvatar, currentAvatar, activity } = props;
  return (
    <section className="layoutScreen gridScreen">
      <TopBar avatar={currentAvatar} openAvatar={openAvatar} openQueue={openQueue} />
      <section className="gridPanels">
        <article className="panel"><h3>Squad status</h3><SquadRow squad={squad} openProfile={openProfile} compact /></article>
        <article className="panel"><h3>Mission Control</h3><p>Analyse squad and get best matches.</p><button onClick={openQueue}>Find match</button></article>
      </section>
      <PickList games={games} openGame={props.openGame} planGame={props.planGame} />
      <ActivityFeed activity={activity} />
    </section>
  );
}

function SideNavLayout(props) {
  const { games, squad, openProfile, openQueue, openAvatar, currentAvatar } = props;
  return (
    <section className="sideLayout">
      <aside className="sideNav"><strong>SquadUp</strong><button>Dashboard</button><button>Discover</button><button>Squad</button><button>Plan</button></aside>
      <main className="sideMain">
        <TopBar title="Dashboard" avatar={currentAvatar} openAvatar={openAvatar} openQueue={openQueue} />
        <section className="panel"><SquadRow squad={squad} openProfile={openProfile} compact /></section>
        <section className="questionBox"><div><h2>What should we play tonight?</h2><p>Get smart recommendations.</p></div><button onClick={openQueue}><ChevronRight /></button></section>
        <PickList games={games} openGame={props.openGame} planGame={props.planGame} />
      </main>
    </section>
  );
}

function DesktopDashboard(props) {
  const { layout, setLayout, games, squad, openProfile, openGame, openQueue, events, activity, smartPick } = props;
  return (
    <section className="desktop">
      <aside className="desktopSidebar">
        <div className="brand"><Gamepad2/><div><strong>SquadUp<span>.gg</span></strong><small>v0.24 Command Center</small></div></div>
        <nav>{["Dashboard","Discover","Squad","Planning","Progression","Settings"].map(item => <button key={item}>{item}</button>)}</nav>
        <div className="desktopLayouts">
          {layouts.map(item => <button key={item.id} className={layout === item.id ? "active" : ""} onClick={() => setLayout(item.id)}>{item.label}</button>)}
        </div>
      </aside>
      <main className="desktopMain">
        <header className="desktopHero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.75), rgba(0,0,0,.12)), url(${smartPick.art})` }}>
          <div><span>Friday Squad</span><h1>What are we playing tonight?</h1><p>{smartPick.desc}</p><button onClick={openQueue}>🎮 NU een potje?</button></div>
        </header>
        <section className="desktopGrid">
          <article className="panel wide"><div className="sectionTitle"><h3>Recommended games</h3><span>clickable</span></div><div className="desktopGames">{games.map(g => <button key={g.id} onClick={() => openGame(g)} style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(0,0,0,.78)), url(${g.art})` }}><strong>{g.name}</strong><span>{g.match}% · {g.mode}</span></button>)}</div></article>
          <article className="panel"><div className="sectionTitle"><h3>Squad online</h3><span>tag/profile</span></div>{squad.map(user => <button className="desktopUser" key={user.id} onClick={() => openProfile(user)}><span className="avatar">{user.avatar}</span><div><strong>{user.name}</strong><small>{user.status} · {user.game}</small></div></button>)}</article>
          <EventsPanel events={events} openQueue={openQueue} />
          <ActivityFeed activity={activity} />
        </section>
      </main>
    </section>
  );
}

function BottomNav({ activeTab, setActiveTab, openQueue }) {
  return (
    <nav className="bottomNav">
      {["home","discover","plan","squad"].map(tab => <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>{tab}</button>)}
      <button className="queueFab" onClick={openQueue}><Plus /></button>
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

function UserModal({ user, close, inviteUser, openQueue }) {
  return (
    <div className="overlay">
      <section className="modal profileModal">
        <button className="close" onClick={close}><X/></button>
        <div className="profileTop"><span className="modalAvatar">{user.avatar}</span><div><small>{user.archetype}</small><h2>{user.name}</h2><p>Level {user.level} · {user.availability}</p></div></div>
        <p>{user.bio}</p>
        <div className="badgeRow">{user.badges.map(b => <span key={b}>{b}</span>)}</div>
        <div className="modalActions">
          <button onClick={() => inviteUser(user, "party")}>Invite to party</button>
          <button onClick={openQueue}>Tag in queue</button>
        </div>
      </section>
    </div>
  );
}

function GameModal({ game, close, planGame, updateStatus, status }) {
  return (
    <div className="overlay">
      <section className="modal gameModal">
        <button className="close" onClick={close}><X/></button>
        <div className="gameBanner" style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(0,0,0,.82)), url(${game.art})` }}><h2>{game.name}</h2><p>{game.mode} · {game.match}% squad match</p></div>
        <p>{game.desc}</p>
        <div className="statusButtons">
          {["owned","want","installed","active"].map(key => <button key={key} className={status[key] ? "on" : ""} onClick={() => updateStatus(game, key)}>{key}</button>)}
        </div>
        <button className="mainAction" onClick={() => planGame(game)}>Plan game night</button>
      </section>
    </div>
  );
}

function QueueModal({ squad, games, close, sendQueue }) {
  const [selected, setSelected] = useState([squad[0].name, squad[1].name]);
  const [mood, setMood] = useState("Quick Match");
  const [game, setGame] = useState(games[0].name);
  const toggle = (name) => setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);

  return (
    <div className="overlay">
      <section className="modal queueModal">
        <button className="close" onClick={close}><X/></button>
        <span>Instant Queue</span>
        <h1>NU een potje?</h1>
        <p>Tag squadleden. Dit simuleert straks push notificaties met Join / Maybe / Busy.</p>
        <div className="pillGrid">{["Quick Match","Co-op PvE","Competitive","Survival","LAN Prep"].map(m => <button className={mood === m ? "on" : ""} onClick={() => setMood(m)} key={m}>{m}</button>)}</div>
        <select value={game} onChange={e => setGame(e.target.value)}>{games.map(g => <option key={g.id}>{g.name}</option>)}</select>
        <div className="tagGrid">{squad.map(user => <button className={selected.includes(user.name) ? "on" : ""} key={user.id} onClick={() => toggle(user.name)}><span>{user.avatar}</span><strong>{user.name}</strong><small>{user.game}</small></button>)}</div>
        <button className="mainAction" onClick={() => sendQueue(selected, `${mood} · ${game}`)}>Send party invite</button>
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
