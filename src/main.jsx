import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, Gamepad2, Home, Monitor, Plus, Search, User, Zap } from 'lucide-react';
import './styles.css';

const squad = {
  name: 'Friday Squad',
  members: [
    { id: 1, name: 'Shane', initials: 'SV', status: 'ready', platform: 'Steam + Discord' },
    { id: 2, name: 'Kevin', initials: 'KV', status: 'maybe', platform: 'Steam' },
    { id: 3, name: 'Tom', initials: 'TM', status: 'ready', platform: 'Discord' },
    { id: 4, name: 'Milan', initials: 'MI', status: 'ready', platform: 'Steam' },
    { id: 5, name: 'Ruben', initials: 'RB', status: 'out', platform: 'Steam + Discord' },
  ],
};

const games = [
  { id: 1, title: 'Deep Rock Galactic', icon: '⛏️', match: 94, owned: 5, price: 'Owned', tags: ['co-op', 'korte sessies', '4 spelers'], reason: 'Iedereen bezit hem en hij past bij een korte chaos-avond.' },
  { id: 2, title: 'Valheim', icon: '🌲', match: 88, owned: 4, price: '€19,99', tags: ['survival', 'base building', 'lang avontuur'], reason: 'Sterk voor een langer gezamenlijk avontuur met progression.' },
  { id: 3, title: 'No Man’s Sky', icon: '🚀', match: 84, owned: 3, price: 'Sale watch', tags: ['sci-fi', 'exploration', 'relaxed'], reason: 'Goede fit voor sci-fi en casual exploration, maar niet iedereen heeft hem.' },
];

const events = [
  { id: 1, title: 'Helldivers 2 chaos run', game: 'Helldivers 2', icon: '🛸', date: 'Vrijdag', time: '20:00', confirmed: 4, total: 5, type: 'Game Night' },
  { id: 2, title: 'Backlog roulette', game: 'Random squad pick', icon: '🎡', date: 'Zaterdag', time: '14:00', confirmed: 3, total: 5, type: 'Poll Night' },
  { id: 3, title: 'LAN weekend', game: 'Multiple games', icon: '💻', date: '24-26 mei', time: 'All day', confirmed: 6, total: 8, type: 'LAN Party' },
];

const feed = [
  { id: 1, icon: '🔥', title: 'Tom speelde 5 uur Valheim', body: 'Nieuwe base is eindelijk storm-proof. Denk ik.', reactions: ['😂 3', 'Join next', 'Comment'] },
  { id: 2, icon: '🏆', title: 'Squad milestone unlocked', body: '100 uur samen gespeeld deze maand. Meest gespeeld: co-op survival.', reactions: ['⛏ Rock', 'Hall of Fame'] },
  { id: 3, icon: '🗳️', title: 'Nieuwe koop-poll actief', body: 'No Man’s Sky staat bovenaan, maar Kevin wacht op sale.', reactions: ['Vote', 'Sale alert'] },
];

function App() {
  const [screen, setScreen] = useState('home');
  const [toast, setToast] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [attendance, setAttendance] = useState({ 1: 'none', 2: 'none', 3: 'none' });
  const [votes, setVotes] = useState({ 1: 4, 2: 3, 3: 2 });

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 1800);
  }

  function joinEvent(id, value) {
    setAttendance(prev => ({ ...prev, [id]: value }));
    notify(value === 'ready' ? 'Je staat op Ready' : value === 'maybe' ? 'Je staat op Misschien' : 'Je hebt afgezegd');
  }

  function voteGame(id) {
    setVotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
    notify('Stem toegevoegd aan squad poll');
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><div className="logo">🎮</div><span>SquadQuest</span></div>
        <button className="icon-button" onClick={() => notify('Steam + Discord sync gestart')}><Zap size={19}/></button>
      </header>

      {toast && <div className="toast">{toast}</div>}

      <main className="content">
        {screen === 'home' && <HomeScreen notify={notify} setScreen={setScreen} setCreateOpen={setCreateOpen} attendance={attendance} joinEvent={joinEvent} />}
        {screen === 'discover' && <DiscoverScreen voteGame={voteGame} votes={votes} notify={notify} />}
        {screen === 'planning' && <PlanningScreen joinEvent={joinEvent} attendance={attendance} notify={notify} setCreateOpen={setCreateOpen} />}
        {screen === 'lan' && <LanScreen notify={notify} />}
        {screen === 'profile' && <ProfileScreen notify={notify} />}
      </main>

      <button className="floating-create" onClick={() => setCreateOpen(true)}><Plus /></button>
      <BottomNav screen={screen} setScreen={setScreen} />
      {createOpen && <CreateSheet onClose={() => setCreateOpen(false)} notify={notify} />}
    </div>
  );
}

function HomeScreen({ notify, setScreen, setCreateOpen, attendance, joinEvent }) {
  const tonight = events[0];
  return <>
    <Hero eyebrow={squad.name} title="Ontdek wat jullie spelen en plan de volgende game night." text="Steam, Discord, squad votes, planning en LAN party overzicht in één plek.">
      <button className="btn primary" onClick={() => setCreateOpen(true)}>Plan</button>
      <button className="btn green" onClick={() => setScreen('discover')}>Match</button>
      <button className="btn" onClick={() => setScreen('lan')}>LAN</button>
    </Hero>
    <Section title="Vanavond" action={`${tonight.confirmed}/${tonight.total} bevestigd`} />
    <EventCard event={tonight} attendance={attendance[tonight.id]} joinEvent={joinEvent} />
    <Section title="Squad feed" action="status + reacties" />
    {feed.map(item => <FeedItem key={item.id} item={item} notify={notify} />)}
  </>;
}

function DiscoverScreen({ voteGame, votes, notify }) {
  return <>
    <Section title="Squad matches" action="Steam + voorkeuren" />
    {games.map(game => <GameMatch key={game.id} game={game} votes={votes[game.id]} onVote={() => voteGame(game.id)} notify={notify} />)}
    <Section title="Koopbesluit" action="budgetmodus" />
    <Card><h3>Wat kopen we voor het volgende avontuur?</h3><p className="muted">Max €30, co-op, minimaal 4 spelers, geen zware competitive grind.</p><button className="btn primary full" onClick={() => notify('Koop-poll geopend')}>Open koop-poll</button></Card>
  </>;
}

function PlanningScreen({ joinEvent, attendance, notify, setCreateOpen }) {
  return <>
    <Section title="Planning" action="game nights" />
    {events.map(event => <EventCard key={event.id} event={event} attendance={attendance[event.id]} joinEvent={joinEvent} compact />)}
    <Section title="Beschikbaarheid" action="beste moment" />
    <Card><h3>Wanneer kan de squad?</h3><Heat label="Vrij 20:00" value={90} count="5"/><Heat label="Za 14:00" value={65} count="3"/><Heat label="Zo 19:30" value={75} count="4"/><button className="btn green full" onClick={() => setCreateOpen(true)}>Gebruik beste moment</button></Card>
  </>;
}

function LanScreen({ notify }) {
  return <>
    <Hero eyebrow="LAN party mode" title="LAN weekend: 24-26 mei" text="Locatie, gear, food, games, slaapplaatsen en toernooien in één hub.">
      <button className="btn green" onClick={() => notify('Je bent bevestigd voor LAN')}>Join LAN</button>
      <button className="btn warning" onClick={() => notify('Checklist geopend')}>Checklist</button>
      <button className="btn" onClick={() => notify('Food vote geopend')}>Food</button>
    </Hero>
    <Card><div className="row"><h3>LAN readiness</h3><span className="pill yellow">72%</span></div><div className="bar"><span style={{width:'72%'}} /></div><div className="tile-grid"><Tile title="👥 Attendees" text="6 confirmed, 2 maybe"/><Tile title="🖥 Gear" text="3 monitors missing"/><Tile title="🍕 Food" text="Pizza wint met 5 votes"/><Tile title="🏆 Tournament" text="Rocket League bracket"/></div></Card>
    <Section title="Loadout" action="wie neemt wat mee" />
    <Card><h3>Shane's LAN loadout</h3><p className="muted">✅ Switch · ✅ verlengsnoer · ⬜ extra monitor · ⬜ snacks</p><button className="btn primary full" onClick={() => notify('Loadout aangepast')}>Loadout aanpassen</button></Card>
  </>;
}

function ProfileScreen({ notify }) {
  return <>
    <Hero eyebrow="Jouw gamerprofiel" title="Shane / Squad Captain" text="Steam gekoppeld · Discord gekoppeld · voorkeur: co-op, sci-fi, survival." />
    <div className="stats-grid"><Stat value="186u" label="gespeeld deze maand"/><Stat value="42" label="games owned"/><Stat value="8" label="game nights"/><Stat value="91%" label="show-up score"/></div>
    <Section title="Connecties" action="live status" />
    <Card><Connection name="Discord" status="Connected"/><Connection name="Steam" status="Synced"/><Connection name="Status feed" status="Squad only"/><button className="btn green full" onClick={() => notify('Account sync vernieuwd')}>Sync vernieuwen</button></Card>
  </>;
}

function Hero({ eyebrow, title, text, children }) { return <section className="hero"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="muted">{text}</p>{children && <div className="quick-row">{children}</div>}</section>; }
function Section({ title, action }) { return <div className="section-title"><h2>{title}</h2><span>{action}</span></div>; }
function Card({ children }) { return <div className="card">{children}</div>; }
function EventCard({ event, attendance, joinEvent, compact=false }) { return <Card><div className="event-top"><div className="game-art">{event.icon}</div><div className="grow"><div className="row"><h3>{event.title}</h3><span className="pill">{event.confirmed}/{event.total}</span></div><div className="meta"><span>📅 {event.date}</span><span>🕗 {event.time}</span><span>🎮 {event.type}</span></div></div></div>{!compact && <AvatarRow />}<div className="action-grid"><button className={attendance==='ready'?'btn green':'btn'} onClick={() => joinEvent(event.id, 'ready')}>✅ Ready</button><button className={attendance==='maybe'?'btn warning':'btn'} onClick={() => joinEvent(event.id, 'maybe')}>🤔 Maybe</button><button className={attendance==='out'?'btn danger':'btn'} onClick={() => joinEvent(event.id, 'out')}>💤 Out</button></div></Card>; }
function AvatarRow() { return <div className="players"><div className="avatars">{squad.members.slice(0,4).map(m => <div className="avatar" key={m.id}>{m.initials}</div>)}</div><span className="muted small">Kevin twijfelt nog</span></div>; }
function FeedItem({ item, notify }) { return <Card><div className="feed-item"><div className="feed-icon">{item.icon}</div><div><h3>{item.title}</h3><p className="muted">{item.body}</p><div className="reaction-row">{item.reactions.map(r => <button key={r} className="reaction" onClick={() => notify(`${r} geplaatst`)}>{r}</button>)}</div></div></div></Card>; }
function GameMatch({ game, votes, onVote, notify }) { return <Card><div className="row"><div><div className="eyebrow">{game.icon} Beste match</div><h2>{game.title}</h2></div><div className="score">{game.match}%</div></div><div className="bar"><span style={{width:`${game.match}%`}} /></div><p className="muted">{game.reason}</p><div className="tag-row"><span className="tag">💸 {game.price}</span><span className="tag">👥 {game.owned}/5 owned</span>{game.tags.map(t => <span className="tag" key={t}>#{t}</span>)}</div><div className="quick-row"><button className="btn green" onClick={() => notify('Game night voorstel aangemaakt')}>Plan</button><button className="btn primary" onClick={onVote}>Vote {votes}</button><button className="btn" onClick={() => notify('Details geopend')}>Details</button></div></Card>; }
function Heat({ label, value, count }) { return <div className="heat-row"><span>{label}</span><div className="heat"><span style={{width:`${value}%`}} /></div><b>{count}</b></div>; }
function Tile({ title, text }) { return <div className="tile"><strong>{title}</strong><span className="muted small">{text}</span></div>; }
function Stat({ value, label }) { return <div className="stat-card"><strong>{value}</strong><span className="muted small">{label}</span></div>; }
function Connection({ name, status }) { return <div className="poll-option"><span>{name}</span><span className="pill">{status}</span></div>; }

function BottomNav({ screen, setScreen }) {
  const items = [ ['home', Home, 'Home'], ['discover', Search, 'Games'], ['planning', CalendarDays, 'Plan'], ['lan', Monitor, 'LAN'], ['profile', User, 'Profiel'] ];
  return <nav className="bottom-nav">{items.map(([id, Icon, label]) => <button key={id} className={`nav-btn ${screen===id?'active':''}`} onClick={() => setScreen(id)}><Icon size={20}/><span>{label}</span></button>)}</nav>;
}

function CreateSheet({ onClose, notify }) {
  function action(msg) { notify(msg); onClose(); }
  return <div className="modal" onClick={e => e.target.className === 'modal' && onClose()}><div className="sheet"><h2>Nieuwe squad actie</h2><button className="btn green full" onClick={() => action('Game night concept aangemaakt')}>🎮 Game night plannen</button><button className="btn primary full" onClick={() => action('Nieuwe game poll gestart')}>🗳 Game poll starten</button><button className="btn warning full" onClick={() => action('LAN event builder geopend')}>💻 LAN party maken</button><div className="input-like">Titel: Friday Squad Adventure</div><div className="input-like">Buttons: Join · Maybe · Skip · Later</div><button className="btn full" onClick={onClose}>Sluiten</button></div></div>;
}

createRoot(document.getElementById('root')).render(<App />);
