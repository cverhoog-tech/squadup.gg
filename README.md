# SquadUp.gg v0.15

Nieuwe upgrade:
- LAN parties toevoegen, bewerken, joinen en verwijderen met duidelijke buttons
- Profielplaatje uploaden of preset kiezen
- Meer recommended games in Discover
- Grotere infinite-scroll mock catalogus
- SteamDB Today sectie met meest gespeelde games van vandaag als live-ready mock module
- Meer discovery filters en langere gamebeschrijvingen

Let op: SteamDB heeft publieke charts, maar voor echte live data in productie moet dit via een backend/proxy of externe data API worden gekoppeld. Niet rechtstreeks vanuit de frontend scrapen.

## Run lokaal

```bash
npm install
npm run dev
```

## Deploy op Vercel

Upload de uitgepakte bestanden naar GitHub en commit. Vercel redeployt automatisch.
