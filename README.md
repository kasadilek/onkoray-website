# OnkoRay Website

Astro-basierte Marketing-Website für OnkoRay: eine warme, patient:innenzentrierte
Landingpage mit lokal gehosteter Schrift, statischem Build und rechtlichen
Entwurfsseiten.

## Tech Stack

- Astro 6
- TypeScript
- PostCSS
- Self-hosted Plus Jakarta Sans
- Statischer Output nach `dist/`

## Scripts

| Command           | Zweck                         |
| ----------------- | ----------------------------- |
| `npm run dev`     | Lokaler Dev-Server            |
| `npm run build`   | Production-Build nach `dist/` |
| `npm run preview` | Preview des Production-Builds |
| `npm run check`   | Astro/TypeScript-Diagnostics  |
| `npm run lint`    | ESLint für Astro, TS und JS   |
| `npm run format`  | Prettier                      |

## Struktur

```text
src/
├── components/
│   ├── SiteHead/       # Header + responsive Navigation
│   └── SiteFoot/       # Footer + Rechtliches
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── impressum.astro
│   └── datenschutz.astro
└── styles/
    └── onkoray.css     # OnkoRay Design-Layer

public/assets/
├── fonts/
├── img/
└── screens/
```

## Inhalt

Die Startseite enthält:

- Hero mit App-Screenshots
- Vertrauensleiste
- Einführung für Betroffene
- Ablauf in drei Schritten
- Funktionen: Befund, Therapie, Nachsorge
- Begleiter: OnkelRay und TanteRay
- Sicherheit und medizinischer Hinweis
- Team
- FAQ
- Pre-Launch-Anmeldung

`/impressum/` und `/datenschutz/` sind weiterhin Entwürfe. Platzhalter mit
`[…]` müssen vor Veröffentlichung ausgefüllt und rechtlich geprüft werden.

## Hinweise

- Das Anmeldeformular ist derzeit rein frontendseitig und speichert keine Daten.
- Die Website setzt kein Tracking und lädt keine externen Fonts.
- OnkoRay ist eine Orientierungshilfe und ersetzt keine ärztliche Beratung,
  Diagnose oder Behandlung.
