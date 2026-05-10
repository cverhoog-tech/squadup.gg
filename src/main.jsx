
import React, {useMemo, useState, useRef} from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const games = [
 {id:1,title:'HELLDIVERS™ 2',genre:['PvE','Co-op','Shooter'],price:'€39.99',steam:'https://store.steampowered.com/app/553850/HELLDIVERS_2/',art:'https://cdn.cloudflare.steamstatic.com/steam/apps/553850/header.jpg',hero:'https://cdn.cloudflare.steamstatic.com/steam/apps/553850/library_hero.jpg',rank:'#1',friends:5,desc:'Join the Helldivers and fight for managed democracy in chaotic co-op operations. Perfect for squads that want short explosive sessions with tactical teamwork.'},
 {id:2,title:'Baldur’s Gate 3',genre:['Co-op','RPG','Story'],price:'€59.99',steam:'https://store.steampowered.com/app/1086940/Baldurs_Gate_3/',art:'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg',hero:'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/library_hero.jpg',rank:'#2',friends:3,desc:'A massive party RPG where choices matter and every session becomes a story. Great for slow-burn squad adventures.'},
 {id:3,title:'Palworld',genre:['Survival','Co-op','Open World'],price:'€28.99',steam:'https://store.steampowered.com/app/1623730/Palworld/',art:'https://cdn.cloudflare.steamstatic.com/steam/apps/1623730/header.jpg',hero:'https://cdn.cloudflare.steamstatic.com/steam/apps/1623730/library_hero.jpg',rank:'#3',friends:4,desc:'Creature collecting, base building and chaotic survival in one package. A strong fit for casual squad nights.'},
 {id:4,title:'Rust',genre:['PvP','Survival','Open World'],price:'€39.99',steam:'https://store.steampowered.com/app/252490/Rust/',art:'https://cdn.cloudflare.steamstatic.com/steam/apps/252490/header.jpg',hero:'https://cdn.cloudflare.steamstatic.com/steam/apps/252490/library_hero.jpg',rank:'#4',friends:6,desc:'A brutal survival sandbox about alliances, betrayal and weekly wipes. Best for squads that like long-term chaos.'},
 {id:5,title:'Hunt: Showdown 1896',genre:['PvPvE','Extraction','Tactical'],price:'€29.99',steam:'https://store.steampowered.com/app/594650/Hunt_Showdown_1896/',art:'https://cdn.cloudflare.steamstatic.com/steam/apps/594650/header.jpg',hero:'https://cdn.cloudflare.steamstatic.com/steam/apps/594650/library_hero.jpg',rank:'#5',friends:2,desc:'Tense extraction PvPvE in a dark southern gothic world. Every sound matters and every match tells a story.'},
 {id:6,title:'Deep Rock Galactic',genre:['PvE','Co-op','Shooter'],price:'€29.99',steam:'https://store.steampowered.com/app/548430/Deep_Rock_Galactic/',art:'https://cdn.cloudflare.steamstatic.com/steam/apps/548430/header.jpg',hero:'https://cdn.cloudflare.steamstatic.com/steam/apps/548430/library_hero.jpg',rank:'#6',friends:7,desc:'Dwarven co-op mining, bugs and beer. One of the easiest recommendations for dependable squad fun.'},
 {id:7,title:'Lethal Company',genre:['Horror','Co-op','Comedy'],price:'€9.75',steam:'https://store.steampowered.com/app/1966720/Lethal_Company/',art:'https://cdn.cloudflare.steamstatic.com/steam/apps/1966720/header.jpg',hero:'https://cdn.cloudflare.steamstatic.com/steam/apps/1966720/library_hero.jpg',rank:'#7',friends:4,desc:'Terrifying, hilarious co-op scrap runs. Works perfectly when your group wants quick chaos.'},
 {id:8,title:'Valheim',genre:['Survival','Co-op','Viking'],price:'€19.99',steam:'https://store.steampowered.com/app/892970/Valheim/',art:'https://cdn.cloudflare.steamstatic.com/steam/apps/892970/header.jpg',hero:'https://cdn.cloudflare.steamstatic.com/steam/apps/892970/library_hero.jpg',rank:'#8',friends:5,desc:'A cozy but dangerous viking survival world built for long squad progression.'},
 {id:9,title:'Warhammer 40,000: Darktide',genre:['PvE','Co-op','Action'],price:'€39.99',steam:'https://store.steampowered.com/app/1361210/Warhammer_40000_Darktide/',art:'https://cdn.cloudflare.steamstatic.com/steam/apps/1361210/header.jpg',hero:'https://cdn.cloudflare.steamstatic.com/steam/apps/1361210/library_hero.jpg',rank:'#9',friends:3,desc:'Gritty squad combat in the 41st millennium with brutal melee and ranged action.'},
 {id:10,title:'Sea of Thieves',genre:['Co-op','PvP','Adventure'],price:'€39.99',steam:'https://store.steampowered.com/app/1172620/Sea_of_Thieves_2024_Edition/',art:'https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/header.jpg',hero:'https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/library_hero.jpg',rank:'#10',friends:2,desc:'Sail, loot and betray other pirates in a social sandbox built for stories.'},
 {id:11,title:'Enshrouded',genre:['Survival','Co-op','RPG'],price:'€29.99',steam:'https://store.steampowered.com/app/1203620/Enshrouded/',art:'https://cdn.cloudflare.steamstatic.com/steam/apps/1203620/header.jpg',hero:'https://cdn.cloudflare.steamstatic.com/steam/apps/1203620/library_hero.jpg',rank:'#11',friends:4,desc:'Crafting, magic and exploration across a dangerous fantasy world for co-op groups.'},
 {id:12,title:'Ready or Not',genre:['Tactical','Co-op','Shooter'],price:'€49.99',steam:'https://store.steampowered.com/app/1144200/Ready_or_Not/',art:'https://cdn.cloudflare.steamstatic.com/steam/apps/1144200/header.jpg',hero:'https://cdn.cloudflare.steamstatic.com/steam/apps/1144200/library_hero.jpg',rank:'#12',friends:3,desc:'Slow tactical SWAT operations for squads that enjoy planning and precision.'}
];

const names = ['Rook','Nyx','Valk','Echo','Ghost','Nova','Blade','Juno','Kade','Hex','Iris','Vex'];
const avatars = names.map((n,i)=>({name:n,title:['Raid Caller','Night Stalker','LAN Captain','Wishlist Goblin','Voice Anchor','Tactical Medic'][i%6], avatar:`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=squadup-${i+30}&backgroundColor=151022,211335,0b1020&radius=18`, status:['online','voice','ready','queued'][i%4], game:games[i%games.length].title}));

function App(){
 const [page,setPage]=useState('home');
 const [leftOpen,setLeftOpen]=useState(true);
 const [rightOpen,setRightOpen]=useState(false);
 const [wishlist,setWishlist]=useState([]);
 const [selected,setSelected]=useState(null);
 const [chatOpen,setChatOpen]=useState(false);
 const [chatPos,setChatPos]=useState({x:22,y:window.innerHeight-95});
 const [profile,setProfile]=useState(null);
 const nav=[['home','⌂','Home'],['explore','◈','Explore'],['parties','✦','Parties'],['voice','≋','Voice'],['profile','◇','Profile'],['settings','⚙','Settings']];
 const toggleWish=(g)=>setWishlist(w=>w.includes(g.id)?w.filter(id=>id!==g.id):[...w,g.id]);
 return <div className="app">
   <aside className={'leftbar '+(leftOpen?'open':'mini')}>
    <button className="collapse" onClick={()=>setLeftOpen(!leftOpen)}>{leftOpen?'‹':'›'}</button>
    <div className="brand"><span className="brandmark">S</span>{leftOpen&&<b>SquadUp</b>}</div>
    {nav.map(n=><button key={n[0]} className={'navpill '+(page===n[0]?'active':'')} onClick={()=>setPage(n[0])}><span>{n[1]}</span>{leftOpen&&<em>{n[2]}</em>}</button>)}
    <button className="me" onClick={()=>setProfile(avatars[0])}><img src={avatars[0].avatar}/>{leftOpen&&<span><b>Shane</b><small>@squadlead</small></span>}</button>
   </aside>
   <main className={'main '+(leftOpen?'withLeft':'')}>
    {page==='home'&&<Home setPage={setPage} />}
    {page==='explore'&&<Explore wishlist={wishlist} toggleWish={toggleWish} setSelected={setSelected} setProfile={setProfile} rightOpen={rightOpen} setRightOpen={setRightOpen}/>}
    {page==='parties'&&<Parties setProfile={setProfile}/>}
    {page==='voice'&&<Voice setProfile={setProfile}/>}
    {page==='profile'&&<Profile wishlist={wishlist} toggleWish={toggleWish}/>}
    {page==='settings'&&<Settings/>}
   </main>
   {selected&&<GameDetail game={selected} onClose={()=>setSelected(null)} wishlist={wishlist} toggleWish={toggleWish}/>}
   {profile&&<UserCard user={profile} onClose={()=>setProfile(null)}/>}
   <FloatingChat open={chatOpen} setOpen={setChatOpen} pos={chatPos} setPos={setChatPos}/>
 </div>
}

function Home({setPage}){
 return <section className="home page">
  <div className="homeHero" style={{backgroundImage:`linear-gradient(90deg,#080712 20%,rgba(9,7,18,.68)),url(${games[0].hero})`}}>
   <div><p className="eyebrow">Trending Now</p><h1>Squad up for {games[0].title}</h1><p>Chaos, co-op and quick joins. Your squad is already forming.</p><button className="primary" onClick={()=>setPage('parties')}>Join Party</button><a className="steam" href={games[0].steam} target="_blank">Open Steam</a></div>
  </div>
  <div className="dashboardGrid">
   <Panel title="Quick Actions"><div className="quickRow"><button>Instant Queue</button><button>Plan LAN</button><button>Invite Squad</button></div></Panel>
   <Panel title="Squad Overview"><div className="squadTiny">{avatars.slice(0,5).map(a=><div className="miniUser" key={a.name}><img src={a.avatar}/><span>{a.name}</span><button>Join</button></div>)}</div></Panel>
  </div>
  <Section title="Recommended for your squad" games={games.slice(2,8)} />
 </section>
}

function Explore({wishlist,toggleWish,setSelected,setProfile,rightOpen,setRightOpen}){
 const [view,setView]=useState('immersive');
 const [filter,setFilter]=useState('All');
 const filters=['All','PvE','PvP','Co-op','Survival','Tactical','Horror'];
 const filtered=filter==='All'?games:games.filter(g=>g.genre.includes(filter)||g.genre.join(' ').includes(filter));
 const feed=['Trending with Friends','SquadUp Recommends','Co-op Nights','Survival Worlds','Deals Worth Watching','PvP Hotlist','LAN Party Picks','Hidden Gems','Recently Updated'];
 return <section className="explore page">
  <div className="exploreTop">
   <div className="switch"><button className={view==='immersive'?'on':''} onClick={()=>setView('immersive')}>SquadUp Immersive</button><button className={view==='command'?'on':''} onClick={()=>setView('command')}>Command View</button></div>
   <button className="rightToggle" onClick={()=>setRightOpen(!rightOpen)}>{rightOpen?'Hide Intel':'Show Intel'}</button>
  </div>
  {view==='command'&&<div className="filters">{filters.map(f=><button className={filter===f?'active':''} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div>}
  <div className="heroExplore" style={{backgroundImage:`linear-gradient(90deg,#070610 25%,rgba(6,5,10,.2)),url(${filtered[0].hero})`}}>
   <div><p className="eyebrow">{view==='command'?'Command Featured':'Featured World'}</p><h1>{filtered[0].title}</h1><p>{filtered[0].desc}</p><button className="primary" onClick={()=>setSelected(filtered[0])}>Open Game</button><a className="steam" href={filtered[0].steam} target="_blank">Steam Store</a></div>
  </div>
  <div className="feed">
   {feed.map((title,i)=> i%3===1
     ? <BannerList key={title} title={title} games={games.slice(i%4, i%4+5)} flip={i%2===0} setSelected={setSelected} wishlist={wishlist} toggleWish={toggleWish}/>
     : <div key={title} className="doubleRows"><Carousel title={title} games={games.concat(games).slice(i,i+9)} setSelected={setSelected} wishlist={wishlist} toggleWish={toggleWish}/>{i%2===0&&<Carousel title="Similar picks" games={games.concat(games).slice(i+3,i+12)} setSelected={setSelected} wishlist={wishlist} toggleWish={toggleWish}/>}</div>
   )}
  </div>
  <div className="squadDock">{avatars.slice(0,5).map(a=><button onClick={()=>setProfile(a)}><img src={a.avatar}/><span>{a.name}</span><small>{a.status}</small></button>)}<button className="primary">Quick Party</button></div>
  <aside className={'rightbar '+(rightOpen?'show':'')}><h3>Squad Intel</h3>{avatars.slice(0,5).map(a=><div className="intel" onClick={()=>setProfile(a)}><img src={a.avatar}/><span><b>{a.name}</b><small>{a.game}</small></span></div>)}</aside>
 </section>
}

function Carousel({title,games,setSelected,wishlist,toggleWish}){
 const ref=useRef(null);
 const move=(dir)=>{ const el=ref.current; if(!el) return; el.scrollBy({left:dir*760,behavior:'smooth'}); setTimeout(()=>{ if(el.scrollLeft>el.scrollWidth-el.clientWidth-900) el.scrollTo({left:0,behavior:'smooth'}); if(el.scrollLeft<20&&dir<0) el.scrollTo({left:el.scrollWidth/2,behavior:'smooth'}); },450)}
 return <div className="carouselBlock"><div className="rowHead"><h2>{title}</h2><div><button onClick={()=>move(-1)}>‹</button><button onClick={()=>move(1)}>›</button></div></div><div className="gameRow" ref={ref}>{games.map((g,i)=><GameCard key={g.id+'-'+i} g={g} setSelected={setSelected} wishlist={wishlist} toggleWish={toggleWish}/>)}</div></div>
}
function GameCard({g,setSelected,wishlist,toggleWish}){
 const liked=wishlist.includes(g.id);
 return <div className="gameCard"><img src={g.art}/><div className="cardBody"><b>{g.title}</b><div className="tags">{g.genre.slice(0,3).map(t=><span className={t.includes('PvP')?'pvp':t.includes('PvE')?'pve':''}>{t}</span>)}</div><small>{g.friends} squad friends · {g.rank}</small><div className="cardActions"><button onClick={()=>setSelected(g)}>Open</button><a href={g.steam} target="_blank" className="steamMini">Steam</a><button className={'heart '+(liked?'liked':'')} onClick={()=>toggleWish(g)}>♥</button></div></div></div>
}
function BannerList({title,games,flip,setSelected,wishlist,toggleWish}){
 const hero=games[0];
 return <div className={'bannerList '+(flip?'flip':'')}><div className="banner" style={{backgroundImage:`linear-gradient(90deg,#090814 15%,rgba(9,8,20,.25)),url(${hero.hero})`}}><p className="eyebrow">{title}</p><h2>{hero.title}</h2><button onClick={()=>setSelected(hero)}>Open</button></div><div className="compactList">{games.slice(1).map(g=><div onClick={()=>setSelected(g)}><img src={g.art}/><span><b>{g.title}</b><small>{g.genre.join(' · ')}</small></span><button className={wishlist.includes(g.id)?'heart liked':'heart'} onClick={(e)=>{e.stopPropagation();toggleWish(g)}}>♥</button></div>)}</div></div>
}

function Parties({setProfile}){
 const [messages,setMessages]=useState([{name:'Rook',text:'Vote is close. Dice if tied?',type:'text'}]);
 const [msg,setMsg]=useState('');
 const send=(text=msg)=>{ if(!text.trim())return; setMessages([...messages,{name:'Shane',text,type:'text'}]); setMsg(''); };
 return <section className="parties page"><div className="partyHero"><p className="eyebrow">Active Lobby</p><h1>Friday Co-op Strike Team</h1><button className="primary">Launch Party</button></div><div className="partyGrid"><Panel title="Live Squad">{avatars.slice(0,6).map(a=><button className="member" onClick={()=>setProfile(a)}><img src={a.avatar}/><b>{a.name}</b><small>{a.title}</small></button>)}</Panel><Panel title="Vote Next Game"><div className="voteBanners">{games.slice(0,3).map((g,i)=><button style={{backgroundImage:`linear-gradient(90deg,#090814 20%,rgba(9,8,20,.3)),url(${g.art})`}}>{g.title}<small>{i+2}/6 votes</small></button>)}</div><button className="dice">Roll 1-100</button></Panel><Panel title="Party Chat"><div className="chatLog">{messages.map((m,i)=><p key={i}><b>{m.name}</b> {m.text}</p>)}</div><div className="chatActions"><button onClick={()=>send('📊 Poll started: what do we play next?')}>Poll/Vote</button><button onClick={()=>send('🎮 Suggesting a new game from wishlist.')}>Suggest Game</button><button onClick={()=>send('💜 Shared wishlist with the party.')}>Share Wishlist</button></div><div className="chatInput"><input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type message..."/><button onClick={()=>send()}>Send</button></div></Panel></div></section>
}
function Voice({setProfile}){return <section className="page voice"><h1>Voice Channel</h1><div className="voiceGrid">{avatars.slice(0,8).map(a=><div className="voiceUser" onClick={()=>setProfile(a)}><img src={a.avatar}/><b>{a.name}</b><input type="range"/></div>)}</div></section>}
function Profile({wishlist,toggleWish}){const liked=games.filter(g=>wishlist.includes(g.id));return <section className="page profile"><div className="profileHero"><img src={avatars[0].avatar}/><div><h1>Shane</h1><p>@squadlead · LAN Captain</p></div></div><h2>Wishlist</h2><div className="wishlist">{liked.length?liked.map(g=><GameCard g={g} setSelected={()=>{}} wishlist={wishlist} toggleWish={toggleWish}/>):<p>No games wishlisted yet.</p>}</div></section>}
function Settings(){return <section className="page settings"><h1>Settings</h1><Panel title="Language"><button className="primary">English</button><button>Nederlands</button></Panel><Panel title="Linked Accounts"><button>Steam</button><button>Discord</button><button>Xbox</button><button>Apple</button></Panel></section>}

function GameDetail({game,onClose,wishlist,toggleWish}){
 const liked=wishlist.includes(game.id);
 const friends=avatars.slice(0,3);
 return <div className="gameDetailPage">
   <aside className="detailRail">
    <div className="detailLogo"><b>SQUADUP</b><span>GG</span></div>
    {['⌂','⌕','♙','▣','☏','✥','♢'].map((icon,i)=><button className={i===1?'railBtn active':'railBtn'} key={i}>{icon}</button>)}
    <div className="railBottom"><img src={avatars[0].avatar}/><button>＋</button><button>⚙</button></div>
   </aside>

   <main className="detailMain">
    <section className="detailHeroExact" style={{backgroundImage:`linear-gradient(90deg,rgba(4,5,12,.98) 0%,rgba(4,5,12,.82) 31%,rgba(4,5,12,.3) 63%,rgba(4,5,12,.86) 100%),url(${game.hero})`}}>
      <div className="detailTopActions">
        <div className="detailLeftActions">
          <button onClick={onClose}>←</button>
          <button className={liked?'saved active':'saved'} onClick={()=>toggleWish(game)}>♡</button>
          <button>⌯</button>
        </div>
        <div className="detailBuyActions">
          <a className="detailSteam" href={game.steam} target="_blank">● PLAY ON STEAM</a>
          <button className="detailPrice">{game.price}</button>
          <button className="detailDrop">⌄</button>
        </div>
      </div>

      <div className="detailHeroContent">
        <h1>{game.title}</h1>
        <div className="detailTags">
          {game.genre.slice(0,3).map(t=><span key={t}>{t.toUpperCase()}</span>)}
        </div>
        <div className="detailMeta">
          <span className="star">★</span><b>4.8</b><span></span><em>328K REVIEWS</em><span></span><em>FROM STEAM</em><span></span><em>RELEASED 25 FEB, 2022</em>
        </div>
        <p>{game.desc}</p>

        <div className="mediaStrip">
          <button className="mediaThumb playThumb" style={{backgroundImage:`url(${game.art})`}}><span>▶</span></button>
          {games.slice(1,5).map(g=><button className="mediaThumb" key={g.id} style={{backgroundImage:`url(${g.art})`}}></button>)}
          <button className="mediaThumb moreThumb">+18</button>
        </div>
      </div>

      <aside className="playFriendsCard">
        <h3>PLAY WITH FRIENDS</h3>
        {friends.map((f,i)=><button className="friendLine" key={f.name}>
          <img src={f.avatar}/><span><b>{f.name}</b><small>{['In Game','In Lobby','Online'][i]}</small></span>
        </button>)}
        <button className="joinVoice">JOIN VOICE</button>
      </aside>
    </section>

    <nav className="detailTabsExact">
      {['OVERVIEW','ACTIVITY','GUIDES','DISCUSSIONS','MEDIA','ACHIEVEMENTS'].map((t,i)=><button className={i===0?'active':''} key={t}>{t}</button>)}
    </nav>

    <section className="detailCardsExact">
      <article className="detailPanel about">
        <h3>ABOUT THIS GAME</h3>
        <p>The Lands Between are ruled by ancient power and broken legends. Gather your squad, explore hostile worlds and decide whether this is the next adventure worth starting together.</p>
        <p>Use SquadUp to check who plays, who wants it, and whether your group should buy or party up.</p>
        <button className="textAction">READ MORE</button>
      </article>

      <article className="detailPanel">
        <div className="panelTitle"><h3>LATEST ACTIVITY</h3><button>View All</button></div>
        {friends.concat(avatars[3]).map((f,i)=><div className="activityLine" key={f.name}>
          <img src={f.avatar}/><span><b>{f.name}</b><small>{['earned an achievement','reached Level 120','defeated a boss','summoned for co-op'][i]} · {i+2}h ago</small></span>
        </div>)}
      </article>

      <article className="detailPanel info">
        <h3>GAME INFO</h3>
        {[
          ['Release Date','25 Feb, 2022'],
          ['Developer','FromSoftware Inc.'],
          ['Publisher','FromSoftware Inc.'],
          ['Genres',game.genre.join(', ')],
          ['Steam Deck','Verified ●'],
          ['Multiplayer','Co-op, PvP'],
          ['Languages','EN, FR, DE + 12']
        ].map(([a,b])=><div className="infoLine" key={a}><span>{a}</span><b>{b}</b></div>)}
      </article>

      <article className="detailPanel achievements">
        <div className="panelTitle"><h3>ACHIEVEMENTS</h3><button>View All</button></div>
        <p>42/42 Unlocked</p>
        <div className="progressBar"><span></span></div>
        <div className="achievementIcons"><div></div><div></div><div></div></div>
        <small>100% Complete</small>
      </article>
    </section>

    <section className="detailSocialActions">
      <button>♡ RECOMMEND TO FRIEND</button>
      <button>✦ ASK SQUAD TO BUY</button>
      <button className={liked?'active':''} onClick={()=>toggleWish(game)}>♥ {liked?'REMOVE FROM WISHLIST':'ADD TO WISHLIST'}</button>
      <button>↗ SHARE GAME</button>
    </section>

    <section className="detailStatsExact">
      <div><span>♙</span><b>32,451</b><small>PLAYERS ONLINE<br/>24h peak</small></div>
      <div><span>◷</span><b>151h</b><small>PLAY TIME (AVG)<br/>Average</small></div>
      <div><span>♜</span><b>42/42</b><small>ACHIEVEMENTS<br/>100%</small></div>
      <div><span>👍</span><b>Very Positive <em>(94%)</em></b><small>REVIEWS<br/>328K Reviews</small></div>
    </section>
   </main>
 </div>
}

function UserCard({user,onClose}){return <div className="userPopup"><button className="close" onClick={onClose}>×</button><img src={user.avatar}/><h2>{user.name}</h2><p>{user.title}</p><small>{user.status} · {user.game}</small><button className="primary">Invite</button><button>DM</button></div>}
function FloatingChat({open,setOpen,pos,setPos}){const [drag,setDrag]=useState(false);const start=useRef(null);function down(e){setDrag(true);start.current={x:e.clientX-pos.x,y:e.clientY-pos.y}}function move(e){if(drag)setPos({x:e.clientX-start.current.x,y:e.clientY-start.current.y})}function up(){setDrag(false)}return <div onMouseMove={move} onMouseUp={up}><button className="chatFab" style={{left:pos.x,top:pos.y}} onMouseDown={down} onClick={()=>setOpen(!open)}><span>◌</span><b>Chat</b></button>{open&&<div className="chatWindow" style={{left:Math.min(pos.x,window.innerWidth-360),top:Math.max(20,pos.y-360)}}><div className="tabs"><button>Party</button><button>Global</button><button>DMs</button></div><p><b>Rook:</b> Ready when you are.</p><p><b>Nyx:</b> Sharing wishlist picks.</p><div className="chatInput"><input placeholder="Message squad..."/><button>Send</button></div></div>}</div>}
function Panel({title,children}){return <div className="panel"><h2>{title}</h2>{children}</div>}
function Section({title,games}){return <div><h2>{title}</h2><div className="simpleRow">{games.map(g=><div className="miniGame"><img src={g.art}/><span>{g.title}</span></div>)}</div></div>}

createRoot(document.getElementById('root')).render(<App/>);
