# SquadUp.gg v0.16

Nieuwe upgrade:
- SteamDB Today lijst niet meer prominent bovenaan
- Steam ranking subtiel geïntegreerd op gamekaarten
- Per game duidelijke statusbuttons: Owned, Want, Installed, Active
- Squad readiness met own/want/installed/active signalen
- Profiel heeft account linking cards voor Steam, Discord, Microsoft/Xbox, Google en Apple
- Avatar upload/preset uit v0.15 behouden
- LAN CRUD uit v0.15 behouden

Let op: account linking is nu UI/mock. Voor echte Steam/Discord/Microsoft/Google/Apple koppelingen is backend OAuth nodig.

## Run lokaal

```bash
npm install
npm run dev
```

## Deploy op Vercel

Upload de uitgepakte bestanden naar GitHub en commit. Vercel redeployt automatisch.
