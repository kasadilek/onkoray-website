# OnkoRay — Website

Eine warme, patient:innen-zentrierte Landingpage für OnkoRay — angelehnt an die Pink!-App-Website
und das OnkoRay-App-Designsystem („Editorial Compassion": Sage/Sand/Sunrise auf hellem Surface,
Plus Jakarta Sans, weiche Rundungen, viel Weißraum, Pill-Buttons).

## Inhalt (warm, „du", benefit-orientiert)
Hero · Vertrauens-Leiste · „Du bist nicht allein" · So funktioniert's (3 Schritte) ·
Funktionen (Befund verstehen / Therapie / Nachsorge) · Begleiter (OnkelRay & TanteRay) ·
Sicherheit & Vertrauen · Team · FAQ · Anmeldung (Updates) · Hinweis · Footer.

Bewusst **kein** Investor-Material mehr (Marktgrößen, Wettbewerb, Geschäftsmodell, Roadmap, Moat) —
das gehört ins Pitch Deck, nicht auf die patient:innen-zentrierte Seite.

## So öffnest du die Seite
**Schnell:** Doppelklick auf `index.html`.

**Mit lokalem Server** (empfohlen):
```bash
cd "/Users/dilek/AI Projects/OnkoRay_Website"
python3 -m http.server 4178
```
Dann im Browser: http://localhost:4178 · Beenden mit `Strg + C`.

## Dateien
| Datei | Zweck |
|-------|-------|
| `index.html` | Inhalt & Struktur (Abschnitte über `<!-- … -->` markiert) |
| `styles.css` | Design (Farben & Tokens oben im `:root`) |
| `script.js` | Mobiles Menü, Scroll-Animationen, FAQ, E-Mail-Anmeldung |
| `assets/screens/` | App-Screenshots (Dashboard, Therapie, Nachsorge) |
| `assets/img/` | Offizielles Logo (`onkoray-mark.svg`, `onkoray-logo.svg`), OnkelRay, TanteRay, Favicon |

## Logo
Offizielles Vektor-Logo aus eurem App-Repo (`github.com/KaiUweHella/onkoray`), Farbe Sage `#7da48a`.

## Rechtliches & Datenschutz
- `impressum.html` und `datenschutz.html` sind als **Entwürfe** angelegt (Design wie die Hauptseite).
  Platzhalter `[…]` (Adresse, Telefon, ggf. Berufsangaben) bitte ausfüllen und vor breitem Teilen
  rechtlich prüfen lassen. Verlinkt im Footer.
- Schriftart ist **lokal gehostet** (`assets/fonts/`) — keine Google-Fonts-/CDN-Aufrufe, keine
  Datenübertragung an Dritte. Die Seite ist vollständig eigenständig.

## Offene Punkte
- **Anmelde-Formular** sendet noch nichts ab (reine Frontend-Demo). Für echten Versand: Dienst wie
  Formspree/Buttondown anbinden oder kleines Backend — dann Datenschutz-Abschnitt 5 ergänzen.
- Kontakt-Mailadresse `kontakt@onkoray.de` ist ein Platzhalter — bei Bedarf anpassen.

## Hinweis
OnkoRay ist eine Orientierungshilfe, **keine** Therapieempfehlung, und noch nicht als Medizinprodukt
zugelassen. Die Seite kommuniziert Pre-Launch-Status (Anmeldung für Updates), keine „Download"-Versprechen.
