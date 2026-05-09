
import React, { useState } from "react";
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
  Shield,
  Trophy,
  User,
  Users,
  X
} from "lucide-react";
import "./style.css";

const layouts = [
  ["neon", "1. Neon Command", "Futuristic · Bold · Neon"],
  ["deck", "2. Steam Deck", "Clean · Console · Focused"],
  ["arcade", "3. Cyber Arcade", "Vibrant · Playful · Retro"],
  ["lan", "4. LAN Party", "Retro · Bold · Hardware"],
  ["grid", "5. Grid Command", "Data · Tactical · Structured"],
  ["carousel", "6. Carousel Focus", "Visual · Immersive · Media First"],
  ["sidenav", "7. Side Nav Command", "Command Center · Dashboard"],
  ["immersion", "8. Full Immersion", "Cinematic · Fullscreen · Story Driven"]
];

const squad = [
  {
    name: "Kevin",
    status: "Playing",
    avatar: "🛡️",
    archetype: "Tactical Vanguard",
    level: 18,
    badges: ["Reliable", "Shield Wall", "No Fear"],
    game: "Helldivers 2",
    availability: "Ready tonight",
    bio: "Altijd als eerste in de lobby en meestal ook als eerste dood."
  },
  {
    name: "Tom",
    status: "In Game",
    avatar: "🧙",
    archetype: "Arcane Strategist",
    level: 16,
    badges: ["Planner", "Backlog Mage", "Lore Brain"],
    game: "Deep Rock",
    availability: "Maybe",
    bio: "Maakt spreadsheets voor survival bases en noemt dat casual play."
  },
  {
    name: "Sven",
    status: "In Voice",
    avatar: "🤖",
    archetype: "LAN Engineer",
    level: 14,
    badges: ["Cable Goblin", "Setup Wizard", "Tech Support"],
    game: "Discord",
    availability: "Online",
    bio: "Heeft altijd een extra kabel, maar nooit de juiste."
  },
  {
    name: "Shane",
    status: "Idle",
    avatar: "🚀",
    archetype: "Squad Captain",
    level: 21,
    badges: ["Pathfinder", "LAN Lord", "Hype Driver"],
    game: "SquadUp",
    availability: "Ready tonight",
    bio: "Start het avontuur, plant de chaos en vergeet soms de snacks."
  },
  {
    name: "Lars",
    status: "Online",
    avatar: "🐺",
    archetype: "Chaos Ranger",
    level: 12,
    badges: ["Friendly Fire", "Loot Goblin", "Last Minute"],
    game: "Steam",
    availability: "Busy later",
    bio: "Komt binnen met nul context en maakt het toch legendarisch."
  }
];

const avatarPool = [
  "🛡️","🧙","🤖","🚀","🐺","🐉","👾","🦾","🧟","🧛","🧝","🧌","🦊","🦁","🐲","🦅","🦇","🦂","🦄","🦖",
  "⚔️","🏹","🔮","💀","☠️","👑","🧠","🧪","🔧","💣","🪓","🗡️","🛸","🛰️","🕹️","🎮","🎯","🔥","⚡","🌙",
  "🪐","🌌","🧊","🌋","🌲","🏴‍☠️","🥷","🕵️","🧑‍🚀","🧑‍🔧","🧑‍💻","🧑‍🎤","🧑‍🚒","🧑‍✈️","🧑‍🎨","🧑‍🔬",
  "🐸","🐼","🐵","🐧","🦉","🦈","🐙","🦀","🦥","🦦","🦔","🐢","🐍","🦎","🦕","🦣","🦭","🦜","🦚","🦡",
  "🥷🏻","🥷🏽","🧙‍♂️","🧙‍♀️","🧝‍♂️","🧝‍♀️","🧛‍♂️","🧛‍♀️","🧟‍♂️","🧟‍♀️","🦸","🦹","🧞","🧚","🧜","🧌",
  "🛡","⚙️","🧲","🪬","🧿","💎","🏆","🎲","🃏","♟️","🧩","🪄","🕶️","🥽","🎧","📡","💾","🖥️","⌨️","🖱️"
];

const picks = [
  {
    rank: 1,
    name: "HELLDIVERS™ 2",
    match: "93% Match",
    ready: "93% READY",
    img: "helldivers",
    art: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=900&q=80",
    desc: "Co-op PvE chaos met korte missies en veel squad momentum.",
    mode: "Co-op PvE"
  },
  {
    rank: 2,
    name: "DEEP ROCK GALACTIC",
    match: "88% Match",
    ready: "88% READY",
    img: "deeprock",
    art: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80",
    desc: "Mijnbouw, teamwork en paniek in compacte co-op sessies.",
    mode: "Co-op PvE"
  },
  {
    rank: 3,
    name: "VALHEIM",
    match: "82% Match",
    ready: "82% READY",
    img: "valheim",
    art: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    desc: "Survival, bouwen, boss fights en langlopende squad progressie.",
    mode: "Survival Co-op"
  },
  {
    rank: 4,
    name: "PROJECT ZOMBOID",
    match: "78% Match",
    ready: "78% READY",
    img: "zomboid",
    art: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=900&q=80",
    desc: "Hardcore survival sandbox voor inside jokes en rampzalige plannen.",
    mode: "Survival PvE"
  },
  {
    rank: 5,
    name: "RISK OF RAIN 2",
    match: "86% Match",
    ready: "86% READY",
    img: "risk",
    art: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
    desc: "Snelle roguelike runs voor avonden met weinig setup.",
    mode: "Co-op PvE"
  }
];

export default function App() {
  const [layout, setLayout] = useState("carousel");
  const [toast, setToast] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [queueOpen, setQueueOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(true);
  const [chosenAvatar, setChosenAvatar] = useState("🚀");
  const Current = {
    neon: NeonCommand,
    deck: SteamDeck,
    arcade: CyberArcade,
    lan: LanParty,
    grid: GridCommand,
    carousel: CarouselFocus,
    sidenav: SideNavCommand,
    immersion: FullImmersion
  }[layout];

  function notify(message) {
    setToast(message);
    clearTimeout(window.__toast);
    window.__toast = setTimeout(() => setToast(""), 1600);
  }

  return (
    <div className="stage">
      <div className="layoutSwitcher">
        {layouts.map(([id, title]) => (
          <button key={id} className={layout === id ? "active" : ""} onClick={() => setLayout(id)}>{title.replace(/^\d+\.\s/, "")}</button>
        ))}
      </div>
      <DesktopCommandCenter layout={layout} setLayout={setLayout} notify={notify} openProfile={setSelectedUser} openQueue={() => setQueueOpen(true)} />
      <div className={`phone ${layout}`}>
        <Current notify={notify} setLayout={setLayout} openProfile={setSelectedUser} openQueue={() => setQueueOpen(true)} />
      </div>
      {introOpen && <IntroThemePicker setLayout={setLayout} close={() => setIntroOpen(false)} />}
      {selectedUser && <UserProfileModal user={selectedUser} close={() => setSelectedUser(null)} notify={notify} />}
      {queueOpen && <InstantQueueOverlay close={() => setQueueOpen(false)} notify={notify} />}
      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
    </div>
  );
}

function SquadRow({ compact = false, openProfile = () => {} }) {
  return (
    <div className={compact ? "squadRow compact" : "squadRow"}>
      {squad.map(member => (
        <button className="squadMember" key={member.name} onClick={() => openProfile(member)}>
          <div className="avatar characterAvatar">{member.avatar}</div>
          <strong>{member.name}</strong>
          <span>{member.status}</span>
        </button>
      ))}
    </div>
  );
}

function PickList({ variant = "default", notify }) {
  return (
    <div className={`pickList ${variant}`}>
      {picks.slice(0, 3).map(pick => (
        <button key={pick.name} className="pick" onClick={() => notify(`${pick.name} ingepland`)}>
          <b>{pick.rank}</b>
          <div className="thumb" style={{ backgroundImage: `linear-gradient(135deg, rgba(0,0,0,.18), rgba(124,58,237,.28)), url(${pick.art})` }}></div>
          <div>
            <strong>{pick.name}</strong>
            <span>{pick.match} · {pick.mode}</span>
          </div>
          <em>{pick.ready}</em>
        </button>
      ))}
    </div>
  );
}

function GameArtWall({ compact = false }) {
  return (
    <section className={compact ? "gameArtWall compact" : "gameArtWall"}>
      {picks.slice(0, compact ? 3 : 5).map(game => (
        <article key={game.name} style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.12), rgba(0,0,0,.74)), url(${game.art})` }}>
          <strong>{game.name}</strong>
          <span>{game.mode}</span>
        </article>
      ))}
    </section>
  );
}

function BottomNav() {
  return (
    <nav className="bottomNav">
      <button><Home size={17}/><span>Home</span></button>
      <button><Search size={17}/><span>Discover</span></button>
      <button><Users size={17}/><span>Squad</span></button>
      <button><CalendarDays size={17}/><span>Plan</span></button>
      <button><User size={17}/><span>Profile</span></button>
    </nav>
  );
}

function TopBar({ title = "SQUADUP.GG", centered = false }) {
  return (
    <header className={centered ? "topBar centered" : "topBar"}>
      <strong>{title}</strong>
      <div>
        <Bell size={16}/>
        <User size={16}/>
      </div>
    </header>
  );
}

function NeonCommand({ notify, openProfile, openQueue } {
  return (
    <main className="screen neonScreen">
      <TopBar />
      <section className="squadOnline">
        <p>SQUAD ONLINE</p>
        <SquadRow openProfile={openProfile} />
      </section>
      <section className="neonQuestion">
        <div>
          <span>WHAT WE PLAYING</span>
          <h1>TONIGHT?</h1>
          <p>Get smart picks based on who's online</p>
        </div>
        <button onClick={openQueue}><ChevronRight /></button>
      </section>
      <GameArtWall compact />
      <h3 className="label">TONIGHT\'S PICKS</h3>
      <PickList variant="neonPicks" notify={notify}/>
      <BottomNav />
    </main>
  );
}

function SteamDeck({ notify, openProfile, openQueue } {
  return (
    <main className="deckShell">
      <aside className="deckRail">
        <button className="active"><Home size={16}/><span>Home</span></button>
        <button><Search size={16}/><span>Discover</span></button>
        <button><Users size={16}/><span>Squad</span></button>
        <button><CalendarDays size={16}/><span>Plan</span></button>
        <button><User size={16}/><span>Profile</span></button>
        <button><Settings size={16}/><span>Settings</span></button>
      </aside>
      <section className="deckMain">
        <TopBar />
        <h2>Good evening, Kevin</h2>
        <p className="muted">Squad Online</p>
        <SquadRow compact openProfile={openProfile} />
        <div className="continueCard">
          <div className="thumb heroB"></div>
          <div>
            <span>Continue Playing Together</span>
            <h3>DEEP ROCK GALACTIC</h3>
            <p>3 friends playing</p>
          </div>
          <button onClick={() => notify("Joined Deep Rock")}>JOIN</button>
        </div>
        <GameArtWall compact />
        <h3>Play Tonight</h3>
        <PickList variant="deckPicks" notify={notify}/>
      </section>
    </main>
  );
}

function CyberArcade({ notify, openProfile, openQueue } {
  return (
    <main className="screen arcadeScreen">
      <TopBar title="☠ SQUADUP.GG" />
      <section className="arcadeStatus">
        <p>SQUAD STATUS</p>
        <SquadRow openProfile={openProfile} />
      </section>
      <section className="arcadeStart">
        <h1>WHAT WE PLAYING<br/>TONIGHT?</h1>
        <p>PRESS START</p>
        <Gamepad2 size={46}/>
      </section>
      <GameArtWall compact />
      <h3 className="arcadeLabel">TOP PICKS</h3>
      <PickList variant="arcadePicks" notify={notify}/>
      <BottomNav />
    </main>
  );
}

function CozyQuest({ notify, openProfile, openQueue }) {
  return (
    <main className="screen cozyScreen">
      <header className="cozyTop"><Menu size={18}/><strong>SquadUp.gg</strong><User size={18}/></header>
      <section className="cozyPaper">
        <span>Your Squad</span>
        <SquadRow openProfile={openProfile} />
      </section>
      <section className="cozyHero">
        <h1>What shall we play tonight?</h1>
        <p>We've got some great ideas</p>
        <button onClick={() => notify("Adventure board geopend")}><ChevronRight /></button>
      </section>
      <GameArtWall compact />
      <h3>Tonight\'s Picks</h3>
      <PickList variant="cozyPicks" notify={notify}/>
      <BottomNav />
    </main>
  );
}

function LanParty({ notify, openProfile, openQueue } {
  return (
    <main className="screen lanScreen">
      <TopBar title="☢ SQUADUP.GG" />
      <section className="lanPanel">
        <p>SQUAD ONLINE</p>
        <SquadRow openProfile={openProfile} />
      </section>
      <section className="lanDisplay">
        <h1>WHAT ARE WE<br/>PLAYING TONIGHT?</h1>
        <p>&gt; FIND THE PERFECT GAME</p>
      </section>
      <GameArtWall compact />
      <h3>TONIGHT\'S PICKS</h3>
      <PickList variant="lanPicks" notify={notify}/>
      <BottomNav />
    </main>
  );
}

function MinimalPro({ notify, openProfile, openQueue }) {
  return (
    <main className="minimalShell">
      <aside className="minimalRail">
        <Home size={16}/><Search size={16}/><Users size={16}/><CalendarDays size={16}/><User size={16}/><Settings size={16}/>
      </aside>
      <section className="minimalMain">
        <TopBar />
        <p>Squad Online</p>
        <SquadRow compact openProfile={openProfile} />
        <section className="minimalQuestion">
          <div>
            <h1>What should we<br/>play tonight?</h1>
            <p>Smart picks for your squad</p>
          </div>
          <button onClick={openQueue}><ChevronRight /></button>
        </section>
        <h3>Top Picks</h3>
        <PickList variant="minimalPicks" notify={notify}/>
      </section>
    </main>
  );
}

function GridCommand({ notify, openProfile, openQueue } {
  return (
    <main className="screen gridScreen">
      <TopBar />
      <section className="gridStatus">
        <div>
          <h3>SQUAD STATUS</h3>
          {squad.map(m => <p key={m.name}><b>{m.name}</b><span>{m.status}</span></p>)}
        </div>
        <div>
          <h3>CURRENTLY PLAYING</h3>
          <h2>HELLDIVERS™ 2</h2>
          <p>Kevin, Tom</p>
          <button onClick={() => notify("Joining session")}>JOIN</button>
        </div>
      </section>
      <section className="mission">
        <h3>MISSION CONTROL</h3>
        <p>What should we play tonight?</p>
        <button onClick={openQueue}>FIND MATCH</button>
      </section>
      <h3>TOP MATCHES</h3>
      <PickList variant="gridPicks" notify={notify}/>
    </main>
  );
}

function CarouselFocus({ notify, openProfile, openQueue } {
  return (
    <main className="screen carouselScreen">
      <TopBar />
      <p>Squad Online</p>
      <SquadRow compact openProfile={openProfile} />
      <section className="bigCarousel">
        {picks.slice(0, 4).map((pick, i) => (
          <article key={pick.name} className={i === 0 ? "mainSlide" : ""} style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.78)), url(${pick.art})` }}>
            <h1>{pick.name}</h1>
            <p>{pick.match} · {pick.mode}</p>
            <span>{pick.desc}</span>
            <button onClick={() => notify(`${pick.name} joined`)}>JOIN</button>
          </article>
        ))}
      </section>
      <h3>More Great Picks</h3>
      <div className="miniStrip">
        {picks.map(p => <div key={p.name} className="thumb" style={{ backgroundImage: `linear-gradient(135deg, rgba(0,0,0,.18), rgba(124,58,237,.25)), url(${p.art})` }}></div>)}
      </div>
      <BottomNav />
    </main>
  );
}

function SideNavCommand({ notify, openProfile, openQueue } {
  return (
    <main className="sideCommand">
      <aside className="sideNav">
        <strong>SquadUp</strong>
        <button className="active">Dashboard</button>
        <button>Discover</button>
        <button>Squad</button>
        <button>Plan</button>
        <button>Games</button>
        <button>Activity</button>
        <button>Profile</button>
        <button>Settings</button>
      </aside>
      <section className="sideMain">
        <TopBar title="Dashboard" />
        <section className="sideCard">
          <h3>Squad Online</h3>
          <SquadRow compact openProfile={openProfile} />
        </section>
        <section className="sideQuestion">
          <div>
            <h2>What should we play tonight?</h2>
            <p>Get smart recommendations.</p>
          </div>
          <button onClick={openQueue}><ChevronRight /></button>
        </section>
        <h3>Tonight's Top Matches</h3>
        <PickList variant="sidePicks" notify={notify}/>
      </section>
    </main>
  );
}

function FullImmersion({ notify, openProfile, openQueue } {
  return (
    <main className="immersionScreen">
      <TopBar />
      <section className="immersionHero">
        <div>
          <p>WHAT EPIC ADVENTURE</p>
          <h1>TONIGHT?</h1>
          <span>The squad is ready. The choice is yours.</span>
          <button onClick={openQueue}>FIND YOUR GAME</button>
        </div>
      </section>
      <GameArtWall compact />
      <section className="immersionSquad">
        <h3>SQUAD ONLINE</h3>
        <SquadRow compact openProfile={openProfile} />
      </section>
    </main>
  );
}


function DesktopCommandCenter({ layout, setLayout, notify, openProfile, openQueue }) {
  const active = layouts.find(([id]) => id === layout);
  return (
    <section className="desktopOnly">
      <aside className="desktopSidebar">
        <div className="desktopBrand">
          <div className="desktopLogo"><Gamepad2 size={24}/></div>
          <div>
            <strong>SquadUp<span>.gg</span></strong>
            <small>v0.23 command center</small>
          </div>
        </div>

        <nav className="desktopNav">
          <button className="active"><Home size={18}/> Dashboard</button>
          <button><Search size={18}/> Discover</button>
          <button><Users size={18}/> Squad</button>
          <button><CalendarDays size={18}/> Planning</button>
          <button><Trophy size={18}/> Progression</button>
          <button><Settings size={18}/> Settings</button>
        </nav>

        <div className="desktopThemeBox">
          <span>Layout mode</span>
          <strong>{active?.[1]}</strong>
          <div className="desktopThemeGrid">
            {layouts.map(([id, title]) => (
              <button key={id} className={layout === id ? "active" : ""} onClick={() => setLayout(id)}>{title.replace(/^\d+\.\s/, "")}</button>
            ))}
          </div>
        </div>
      </aside>

      <main className={`desktopMain desktop-${layout}`}>
        <header className="desktopHeader">
          <div>
            <span>Friday Squad</span>
            <h1>What are we playing tonight?</h1>
            <p>Live squad presence, smart picks, instant queue en game discovery in één fullscreen dashboard.</p>
          </div>
          <button onClick={openQueue}>🎮 NU een potje?</button>
        </header>

        <section className="desktopHeroGrid">
          <article className="desktopCinematicCard" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.72), rgba(0,0,0,.15)), url(${picks[0].art})` }}>
            <div>
              <span>Best match tonight</span>
              <h2>{picks[0].name}</h2>
              <p>{picks[0].desc}</p>
              <div className="desktopActionRow">
                <button onClick={() => notify(`${picks[0].name} ingepland`)}>Plan game night</button>
                <button onClick={openQueue}>Tag squad</button>
              </div>
            </div>
          </article>

          <article className="desktopPresence">
            <div className="desktopPanelHead">
              <h3>Squad online</h3>
              <span>3 online · 2 playing</span>
            </div>
            {squad.map(member => (
              <div className="desktopMember" key={member.name}>
                <div className="avatar">{member.avatar}</div>
                <div>
                  <strong>{member.name}</strong>
                  <span>{member.status} · {member.game}</span>
                </div>
                <button onClick={() => openProfile(member)}>Profile</button>
              </div>
            ))}
          </article>
        </section>

        <section className="desktopContentGrid">
          <article className="desktopPanel wide">
            <div className="desktopPanelHead">
              <h3>Recommended games</h3>
              <span>Steam / IGDB ready</span>
            </div>
            <div className="desktopGameGrid">
              {picks.map(game => (
                <button key={game.name} className="desktopGameCard" onClick={() => notify(`${game.name} geopend`)} style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.76)), url(${game.art})` }}>
                  <strong>{game.name}</strong>
                  <span>{game.match} · {game.mode}</span>
                </button>
              ))}
            </div>
          </article>

          <article className="desktopPanel">
            <div className="desktopPanelHead">
              <h3>Instant queue</h3>
              <span>Push-ready concept</span>
            </div>
            <div className="queueButtons">
              <button onClick={() => notify("Quick Match ping verstuurd")}>Quick Match</button>
              <button onClick={() => notify("Co-op ping verstuurd")}>Co-op PvE</button>
              <button onClick={() => notify("Competitive ping verstuurd")}>Competitive</button>
              <button onClick={() => notify("LAN prep ping verstuurd")}>LAN Prep</button>
            </div>
          </article>

          <article className="desktopPanel">
            <div className="desktopPanelHead">
              <h3>Tonight readiness</h3>
              <span>Live mock</span>
            </div>
            <div className="readinessBig">93%</div>
            <p>4/5 ready · 3 installed · 2 active now</p>
          </article>
        </section>
      </main>
    </section>
  );
}



function IntroThemePicker({ setLayout, close }) {
  return (
    <div className="overlay">
      <section className="introModal">
        <button className="closeButton" onClick={close}><X size={18}/></button>
        <span>Welcome to SquadUp.gg</span>
        <h1>Choose your squad vibe</h1>
        <p>Kies direct de visuele stijl waarmee je de app wilt starten. Je kunt later altijd wisselen.</p>
        <div className="introChoices">
          <button onClick={() => { setLayout("immersion"); close(); }}>
            <div className="introPreview immersionPreview"></div>
            <strong>Full Immersion</strong>
            <small>Cinematic, fullscreen, adventure first</small>
          </button>
          <button onClick={() => { setLayout("carousel"); close(); }}>
            <div className="introPreview carouselPreview"></div>
            <strong>Carousel Focus</strong>
            <small>Big artwork, media-first discovery</small>
          </button>
        </div>
        <button className="secondaryAction" onClick={close}>Skip for now</button>
      </section>
    </div>
  );
}

function UserProfileModal({ user, close, notify }) {
  return (
    <div className="overlay">
      <section className="profileModal">
        <button className="closeButton" onClick={close}><X size={18}/></button>
        <div className="profileHeader">
          <div className="modalAvatar">{user.avatar}</div>
          <div>
            <span>{user.archetype}</span>
            <h2>{user.name}</h2>
            <p>Level {user.level} · {user.availability}</p>
          </div>
        </div>
        <p className="profileBio">{user.bio}</p>
        <div className="profileStats">
          <div><strong>{user.game}</strong><span>Currently / last playing</span></div>
          <div><strong>{user.status}</strong><span>Status</span></div>
        </div>
        <div className="badgeLine">
          {user.badges.map(badge => <span key={badge}>{badge}</span>)}
        </div>
        <div className="modalActions">
          <button onClick={() => notify(`${user.name} uitgenodigd voor party`)}>Invite to party</button>
          <button onClick={() => notify(`${user.name} getagd voor NU een potje`) }>Tag for queue</button>
        </div>
      </section>
    </div>
  );
}

function InstantQueueOverlay({ close, notify }) {
  const [selected, setSelected] = useState(["Kevin", "Tom"]);
  const toggle = (name) => setSelected(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);

  return (
    <div className="overlay">
      <section className="queueModal">
        <button className="closeButton" onClick={close}><X size={18}/></button>
        <span>Instant Queue</span>
        <h1>NU een potje?</h1>
        <p>Tag squadleden en stuur straks een push notificatie met Join / Maybe / Busy.</p>
        <div className="queueMoods">
          {["Quick Match", "Co-op PvE", "Competitive", "Survival", "LAN Prep"].map(mood => <button key={mood}>{mood}</button>)}
        </div>
        <h3>Tag spelers</h3>
        <div className="tagGrid">
          {squad.map(member => (
            <button key={member.name} className={selected.includes(member.name) ? "selected" : ""} onClick={() => toggle(member.name)}>
              <span>{member.avatar}</span>
              <strong>{member.name}</strong>
              <small>{member.game}</small>
            </button>
          ))}
        </div>
        <button className="sendQueue" onClick={() => { notify(`Queue invite naar ${selected.length} spelers`); close(); }}>Send party invite</button>
      </section>
    </div>
  );
}


createRoot(document.getElementById("root")).render(<App />);
