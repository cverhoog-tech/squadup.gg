# SquadUp.gg v0.17

Nieuwe upgrade:
- Live Squad Presence op Home
- Online / playing / voice / idle / offline status
- Zien wat vrienden spelen
- Refresh mock voor presence updates
- Available Tonight quick toggle
- Squad mood voting
- Session length selector
- Smart Tonight Picks op basis van mood, sessielengte, online members en game metadata
- Alle v0.16 features behouden: account linking UI, game ownership toggles, Steam ranking in cards, LAN CRUD, avatar upload

Let op: live presence is nu mock state. Echte online status vereist backend realtime presence + Steam/Discord API koppelingen.

## Run lokaal

```bash
npm install
npm run dev
```

## Deploy op Vercel

Upload de uitgepakte bestanden naar GitHub en commit. Vercel redeployt automatisch.
