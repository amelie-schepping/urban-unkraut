# urban-unkraut
##Projekt Übersicht 
Urban-Unkraut ist ein interdisziplinäres Projekt mit dem Ziel Menschen über für den im Raum Düsseldorf native Blumen und Pflanzen zu bilden und darüber hinaus zu animieren den Urbanen raum zu begrünen. 
Wichtig ist hervor zu heben, dass es sich um Pflanzen handelt, die die Biodiversität fördern. 

Es werden analogePlakate in geschäten, cafesudn Orte in der stadt verteit. Menschen können die de Scannen udn gelangen dann auf unsere webseite. Von dort aus können dei die AR Experience staten. Dazu muss das poster nochmal von der webseite aus gescannt werden und eine Bluem wächst in AR. 

Um möglichst viele menschan abzuholen, soll das Projekt soll auf allen Betriebsystemen und browsersn funktionieren. 

## Funktionen
- Scannen von physischen Markern, um das virtuelle Blume wachsen zu lassen
- Animierte 3D-Blumenmodelle werden in AR angezeigt
- Gamification: 
    - dynamisches Freischalten von Blumen über die Weboberfläche. So können vershciednene Blumenen eingesammelt werden
    - dei Blumen müssen an verschiedenen Orten eingesammelt werden
- Responsive Website mit Vite, Bootstrap und Three.js erstellt
- Das Projekt soll auf allen Betriebsystemen und browsersn funktionieren. 

## Verwendete Tools:
- Vite - Frontend-Erstellungstool
- Three.js - 3D-Rendering-Bibliothek für Blumenanimationen
- Bootstrap - CSS-Framework für responsives Design
- Dart Sass - Für das Styling mit SCSS

## Project Struktur (Auswahl)
Distribution files (dist/)
- dist/index.html - Haupteinstiegspunkt zur Website
- dist/page1.html - Zusätzliche Webseite
- dist/assets/ - Kompilierte statische Assets für die Bereitstellung

Quelldateien (src/)
- src/main.js - Haupt-JavaScript-Datei zum dynamischen Laden der Blumen
- src/style.css und src/style.scss - Styling für die Website

Öffentliche Assets (public/)
- public/marker/ - AR-Marker, die für das AR-Erlebnis vom Nutzer gescannt werden
- public/models/ - 3D-Modelle für Blumen
- public/assets/plants.json - JSON-Datendatei mit Blumen und Metadaten

Stammdateie
- package.json und package-lock.json - definiert Projektumgebung, einschließlich Abhängigkeiten und Skripte
- vite.config.js - Konfiguration für das Vite-Build-Tool

## Projekt Starten
### Vorraussetzung 
Node.js und npm sind auf Ihrem Rechner installiert. Zum installieren: 
    npm install

### Das Projekt lokal ausführen
Damit wird der Vite-Entwicklungsserver gestartet. 
    npm run dev

Das Projekt ist dann local erreichbei unter localhost. Das beudetet dann:
- der Computer wird zum lokalen Webserver
- Vite kompiliert die Dateien live (Hot Reload), wenn Änderungen gemacht werden.
- die Seite ist sofort im Browser anschaubar

Auf dem Handy testen:
- Vorraussetzung: Handy udn REchner müssen im gleichen Netzwerk sein 
- wenn  npm run dev gestartet wurde werden zwei adressen angezeigt:
        - Local:   http://localhost:5173/
        - Network: mit einer IP adresse
- Öffne auf dem Handy den Network-Link 


### Bauen für die Produktion
npm run build
