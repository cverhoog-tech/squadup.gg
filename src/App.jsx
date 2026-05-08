
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  Crown,
  Flame,
  Gamepad2,
  Home,
  Laptop,
  Medal,
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

const discoverGames = [
  {
    id: 1,
    name: "Deep Rock Galactic",
    image: "linear-gradient(135deg, rgba(33, 72, 58, .82), rgba(0, 228, 168, .26)), url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80')",
    score: 94,
    price: "€9,99 sale",
    owned: "5/5 bezit",
    desc: "Co-op mining chaos met korte missies, veel teamwork en genoeg domme momenten voor jullie squad.",
    tags: ["Co-op", "4 spelers", "Korte sessies", "Iedereen bezit"],
    mode: "Tonight pick"
  },
  {
    id: 2,
    name: "No Man's Sky",
    image: "linear-gradient(135deg, rgba(50, 37, 105, .82), rgba(125, 92, 255, .28)), url('https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=900&q=80')",
    score: 87,
    price: "€29,99",
    owned: "4/5 bezit",
    desc: "Langer sci-fi avontuur met exploration, base building en genoeg vrijheid om jullie eigen verhaal te maken.",
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
    desc: "Hardcore survival sandbox voor lange avonden, paniek, slechte beslissingen en inside jokes.",
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
    desc: "Snelle roguelike runs voor avonden waarop niemand zin heeft in lange uitleg.",
    tags: ["Roguelike", "Fast runs", "Co-op", "Low setup"],
    mode: "Quick session"
  }
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
      <div className="app">
        <header className="topbar">
          <button className="brand" onClick={() => setTab("home")}>
            <div className="brandIcon"><Gamepad2 size={22} /></div>
            <div>
              <strong>SquadUp<span>.gg</span></strong>
              <small>v0.13 · Friday Squad</small>
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
          />
        )}

        {tab === "discover" && <DiscoverScreen games={discoverGames} planGame={planGame} />}
        {tab === "plan" && <PlanScreen events={events} setAttendance={setAttendance} setTab={setTab} />}
        {tab === "lan" && <LanScreen checklist={lanChecklist} setChecklist={setLanChecklist} addXp={addXp} />}
        {tab === "profile" && (
          <ProfileScreen
            me={me}
            squad={squad}
            selectedBadges={selectedBadges}
            setSelectedBadges={setSelectedBadges}
            notify={notify}
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

function HomeScreen({ slides, selectedHero, setSelectedHero, event, feed, setFeed, squad, me, selectedBadges, planGame, setTab, notify, addXp }) {
  const slide = slides[selectedHero];

  function react(id) {
    setFeed(prev => prev.map(item => item.id === id ? { ...item, reactions: item.reactions + 1 } : item));
    addXp(8, "Feed reactie");
  }

  return (
    <main className="screen">
      <section className={`heroCarousel ${slide.bg}`}>
        <div className="heroIcon">{slide.icon}</div>
        <div className="kicker"><Sparkles size={14} /> {slide.eyebrow}</div>
        <h1>{slide.title}</h1>
        <p>{slide.body}</p>
        <button className="primaryBtn" onClick={slide.action}>{slide.cta}</button>
        <div className="dots">
          {slides.map((_, index) => (
            <button key={index} className={selectedHero === index ? "active" : ""} onClick={() => setSelectedHero(index)} />
          ))}
        </div>
      </section>

      <section className="identityCard">
        <div className="avatarBig">S</div>
        <div className="identityMain">
          <div className="identityTop">
            <div>
              <h2>{me.name}</h2>
              <p>Level {me.level} · {me.xp} XP</p>
            </div>
            <span className="rankPill"><Crown size={13} /> Squad Captain</span>
          </div>
          <div className="xpBar"><span style={{ width: `${me.xp % 170 / 170 * 100}%` }} /></div>
          <BadgeShowcase ids={selectedBadges} />
        </div>
      </section>

      <SectionHeader title="Volgende sessie" action={`${readyCount(event)}/5 ready`} />
      <EventCard event={event} onAttendance={(status) => notify(`Open Plan om ${status} te zetten`)} />

      <SectionHeader title="Nieuwe game gekocht" action="Purchase alerts" />
      <div className="feedStack">
        {feed.slice(0, 3).map(item => (
          <FeedCard key={item.id} item={item} onReact={() => react(item.id)} onAction={() => {
            if (item.action.toLowerCase().includes("plan")) setTab("plan");
            notify(item.action);
          }} />
        ))}
      </div>

      <SectionHeader title="Leaderboard" action="Deze maand" />
      <Leaderboard squad={squad} />
    </main>
  );
}

function DiscoverScreen({ games, planGame }) {
  const [mode, setMode] = useState("All");
  const modes = ["All", "Tonight", "LAN", "Budget", "Long"];

  const filtered = games.filter(game => {
    if (mode === "All") return true;
    if (mode === "Tonight") return game.mode.includes("Tonight") || game.tags.includes("Korte sessies");
    if (mode === "LAN") return game.mode.includes("LAN");
    if (mode === "Budget") return game.price.includes("€9") || game.price.includes("€19");
    if (mode === "Long") return game.mode.includes("adventure");
    return true;
  });

  return (
    <main className="screen">
      <PageHeader
        icon={<Search size={18} />}
        label="Discover"
        title="Steam-style discovery voor jouw squad."
        body="Mock Steam/IGDB kaarten met artwork, prijs, ownership, beschrijving en squad match."
      />

      <div className="modeRow">
        {modes.map(m => <button key={m} className={mode === m ? "active" : ""} onClick={() => setMode(m)}>{m}</button>)}
      </div>

      <div className="discoverGrid">
        {filtered.map(game => <SteamGameCard key={game.id} game={game} onPlan={() => planGame(game)} />)}
      </div>
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

function LanScreen({ checklist, setChecklist, addXp }) {
  const done = checklist.filter(i => i.done).length;
  const pct = Math.round((done / checklist.length) * 100);

  function toggle(id) {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
    addXp(12, "LAN checklist");
  }

  return (
    <main className="screen">
      <section className="lanHero">
        <div className="kicker"><Laptop size={14} /> LAN party mode</div>
        <h1>LAN weekend: 24-26 mei</h1>
        <p>Gear, food, attendance, games en readiness in één compacte hub.</p>
        <button className="primaryBtn" onClick={() => addXp(35, "LAN deelname bevestigd")}>Join LAN</button>
      </section>

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

function ProfileScreen({ me, squad, selectedBadges, setSelectedBadges, notify }) {
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
        <div className="avatarHuge">S</div>
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

function SteamGameCard({ game, onPlan }) {
  return (
    <article className="steamCard">
      <div className="steamArt" style={{ backgroundImage: game.image }}>
        <span className="modePill">{game.mode}</span>
        <div className="steamScore">{game.score}%</div>
      </div>
      <div className="steamBody">
        <div className="split">
          <h3>{game.name}</h3>
          <strong>{game.price}</strong>
        </div>
        <p>{game.desc}</p>
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
