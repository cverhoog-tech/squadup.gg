
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
 const nav=[['home','⌂','Home'],['explore','⌕','Explore'],['parties','♙','Parties'],['voice','≋','Voice'],['calendar','▣','Calendar'],['profile','◇','Profile'],['settings','⚙','Settings']];
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
    {page==='voice'&&<Voice setProfile={setProfile}/>}\n    {page==='calendar'&&<Calendar setProfile={setProfile}/>}
    {page==='profile'&&<Profile wishlist={wishlist} toggleWish={toggleWish}/>}
    {page==='settings'&&<Settings/>}
   </main>
   <nav className="mobileBottomNav">
    {nav.slice(0,5).map(n=><button key={n[0]} className={page===n[0]?'active':''} onClick={()=>setPage(n[0])}><span>{n[1]}</span><small>{n[2]}</small></button>)}
   </nav>
   {selected&&<GameDetail game={selected} onClose={()=>setSelected(null)} wishlist={wishlist} toggleWish={toggleWish}/>}
   {profile&&<UserCard user={profile} onClose={()=>setProfile(null)}/>}
   <FloatingChat open={chatOpen} setOpen={setChatOpen} pos={chatPos} setPos={setChatPos}/>
 </div>
}

function Home({setPage}){
 const activity=[
  ['Shane started a party','Hunt: Showdown','2m'],
  ['Leah is looking for players','Elden Ring','10m'],
  ['Sven achieved Level 43','Diablo IV','15m'],
  ['Tom completed a quest','CS2','1h']
 ];
 return <section className="home page mockHome">
  <div className="homeShell">
   <div className="homeMainMock">
    <header className="welcomeCard">
      <div className="welcomeUser">
        <img src={avatars[0].avatar}/>
        <div><h1>Welcome back, Shane <span>♜</span></h1><p>Ready to squad up?</p></div>
      </div>
    </header>

    <section className="squadOverviewMock">
      <div>
        <p className="mockLabel">SQUAD OVERVIEW</p>
        <h2>Squad Alpha</h2>
        <small>8 Members · 3 Online</small>
        <div className="avatarStack">{avatars.slice(0,5).map(a=><button onClick={()=>{}}><img src={a.avatar}/></button>)}</div>
      </div>
      <div className="squadCrest">✦</div>
    </section>

    <div className="actionTilesMock">
      <button onClick={()=>setPage('parties')}><b>⚙</b><span>INSTANT QUEUE</span><small>Quick Match</small></button>
      <button onClick={()=>setPage('voice')}><b>◌</b><span>JOIN VOICE</span><small>Squad Voice</small></button>
      <button onClick={()=>setPage('calendar')}><b>▣</b><span>PLAN LAN</span><small>Event Planner</small></button>
      <button><b>♙</b><span>INVITE SQUAD</span><small>Add Friends</small></button>
    </div>

    <section className="mockSection">
      <div className="mockSectionHead"><h2>PLAYING NOW</h2><button>View All</button></div>
      <div className="playingNowGrid">
        {games.slice(1,5).map((g,i)=><button className="playCard" onClick={()=>setPage('parties')} style={{backgroundImage:`linear-gradient(180deg,transparent,rgba(0,0,0,.82)),url(${g.art})`}}><b>{g.title}</b><small>{i+1} In {i%2?'Lobby':'Game'}</small></button>)}
      </div>
    </section>

    <section className="mockSection recentWide">
      <h2>RECENT ACTIVITY</h2>
      <div className="recentGrid">{activity.map((a,i)=><div className="activityPill"><img src={avatars[i].avatar}/><span><b>{a[0]}</b><small>{a[1]}</small></span><em>{a[2]}</em></div>)}</div>
    </section>
   </div>

   <aside className="homeRightMock">
    <Panel title="LIVE SQUAD ACTIVITY">
      {activity.map((a,i)=><div className="activityLine compact"><img src={avatars[i+1].avatar}/><span><b>{a[0]}</b><small>{a[1]}</small></span><em>{a[2]}</em></div>)}
      <button className="textAction">View All</button>
    </Panel>
    <Panel title="RECOMMENDED FOR SQUAD">
      {games.slice(0,5).map(g=><div className="recommendLine"><img src={g.art}/><span>{g.title}</span></div>)}
      <button className="textAction">View More</button>
    </Panel>
    <button className="partyChatDock" onClick={()=>setPage('parties')}>PARTY CHAT <span></span></button>
   </aside>
  </div>
 </section>
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
 const [messages,setMessages]=useState([{name:'Shane',text:'Yo bois, who’s down to game tonight?'},{name:'Leah',text:'I’m in! What are we playing?'},{name:'Tom',text:'Let’s do it!'},{name:'Sven',text:'I’m in too 💪'}]);
 const [msg,setMsg]=useState('');
 const send=(text=msg)=>{ if(!text.trim()) return; setMessages([...messages,{name:'Shane',text}]); setMsg(''); };
 return <section className="parties page mockParty">
  <div className="partyShellMock">
   <div className="partyStage">
    <header className="partyTopMock">
      <div><h1>Squad Alpha <span>▣</span></h1><p>8 Members · Private</p></div>
      <div><button className="primary">INVITE</button><button>•••</button></div>
    </header>
    <nav className="partyTabs"><button className="active">LOBBY</button><button>VOTE NEXT</button><button>DICE ROLL</button><button>SETTINGS</button></nav>

    <section className="orbitLobby">
      <div className="orbitCore">✦<small>Drag to Reposition</small></div>
      {avatars.slice(0,7).map((a,i)=><button className={'orbitMember m'+i} onClick={()=>setProfile(a)}><img src={a.avatar}/><b>{a.name}</b></button>)}
    </section>

    <div className="voiceControlsMock">
      {['Mic','Cam','Mute','Settings','Noise','GIF'].map((x,i)=><button className={i===2?'danger':''}>{x}</button>)}
    </div>
    <button className="leaveParty">LEAVE PARTY</button>
   </div>

   <aside className="partyChatPanel">
    <div className="chatTopMock"><h2>Squad Alpha</h2><small>8 Members</small><div><button>☎</button><button>▣</button><button>☰</button></div></div>
    <nav className="chatTabs"><button className="active">CHAT</button><button>DETAILS</button></nav>
    <div className="chatFeedMock">
      {messages.map((m,i)=><div className={i===2?'chatBubble shared':'chatBubble'}><img src={avatars[i%avatars.length].avatar}/><div><b>{m.name}<small> 8:{45+i} PM</small></b><p>{m.text}</p>{i===2&&<div className="sharedGameCard"><img src={games[1].art}/><span><b>ELDEN RING</b><small>€59,99</small></span><em>♥ 2</em></div>}</div></div>)}
    </div>
    <div className="chatToolRow"><button onClick={()=>send('📊 Poll started')}>POLL</button><button onClick={()=>send('🎮 Game suggested')}>SUGGEST GAME</button><button onClick={()=>send('💜 Wishlist shared')}>SHARE WISHLIST</button></div>
    <div className="chatInput mockInput"><input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Message Squad Alpha..."/><button onClick={()=>send()}>➤</button></div>
   </aside>
  </div>
 </section>
}
function Voice({setProfile}){return <section className="page voice"><h1>Voice Channel</h1><div className="voiceGrid">{avatars.slice(0,8).map(a=><div className="voiceUser" onClick={()=>setProfile(a)}><img src={a.avatar}/><b>{a.name}</b><input type="range"/></div>)}</div></section>}
function Profile({wishlist,toggleWish}){const liked=games.filter(g=>wishlist.includes(g.id));return <section className="page profile"><div className="profileHero"><img src={avatars[0].avatar}/><div><h1>Shane</h1><p>@squadlead · LAN Captain</p></div></div><h2>Wishlist</h2><div className="wishlist">{liked.length?liked.map(g=><GameCard g={g} setSelected={()=>{}} wishlist={wishlist} toggleWish={toggleWish}/>):<p>No games wishlisted yet.</p>}</div></section>}

function Calendar({setProfile}){
 return <section className="calendar page mockCalendar">
  <div className="calendarShell">
   <div className="calendarTop"><h1>May 2026</h1><div><button>Month</button><button>Week</button><button>Agenda</button><button className="primary">+ New Event</button></div></div>
   <div className="calendarGridMock">
    {Array.from({length:35},(_,i)=><button className={(i===23||i===30)?'dayCell event':'dayCell'}><span>{i+1}</span>{i===23&&<b>LAN Party</b>}{i===30&&<b>Game Night</b>}</button>)}
   </div>
   <aside className="eventPreviewMock"><h2>LAN Party</h2><p>HELLDIVERS™ 2 · 24 May · 14:00</p><div className="avatarStack">{avatars.slice(0,3).map(a=><img src={a.avatar}/>)}</div><h3>Sidequests</h3>{['Ethernet switch','Snacks','Extra controller','Steam deck dock'].map((x,i)=><label className="task"><input type="checkbox"/> {x}<em>{avatars[i].name}</em></label>)}<button className="primary">Edit Event</button><button>RSVP Going</button></aside>
  </div>
 </section>
}

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
