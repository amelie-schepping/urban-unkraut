# urban-unkraut
## Projekt Übersicht 
Urban-Unkraut ist ein interdisziplinäres Projekt, das darauf abzielt, Menschen über die im Raum Düsseldorf heimischen Blumen und Pflanzen zu informieren und sie darüber hinaus zur Begrünung des urbanen Raums zu motivieren. 
Es muss betont werden, dass es sich um Pflanzen handelt, die die Ökodiversität unterstützen. 

Es werden analoge Plakate  in Geschäften, Cafés und an verschiedenen Orten der Stadt verteilt. Menschen können diese scannen und gelangen dann auf die  Webseite des Projekts. Von hier aus kann die AR Experience starten. Um diese zu erreichen, muss das Poster nochmals von der Webseite aus gescannt werden, und eine Blumen wachsen in AR. 

Das Projekt soll auf allen Betriebssystemen und Browsern funktionieren, um möglichst viele Menschen abzuholen. 

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
dist/ Distribution files: für den deploy  des fertigen Outputs 
- dist/index.html - Haupteinstiegspunkt zur Webseite
- dist/assets/ - Kompilierte statische Assets für die Bereitstellung
- Wird beim Befehl npm run build erzeugt
- Enthält die fertige, gebaute Website
- Wird für Deployment und Hosting verwendet

src/ Quelldateien:
- src/main.js - Haupt-JavaScript-Datei zum dynamischen Laden der Blumen
- src/style.css und src/style.scss - Styling für die Website

public/ Öffentliche Assets: arteiete mit Quellmaterialien
- public/marker/ - AR-Marker, die für das AR-Erlebnis vom Nutzer gescannt werden
- public/models/ - 3D-Modelle für Blumen (.glb)
- public/assets/plants.json - JSON-Datendatei mit Blumen und Metadaten
- Wird direkt vom Vite-Webserver genutzt (bei npm run dev)
- Enthält statische Dateien wie Bilder, Fonts, Marker, Modelle
- Alles darin wird ungeändert ins dist/ kopiert
- für Dateien, die der Browser direkt laden soll

Weitere zentrale Dateien:
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
    - Local: http://localhost:5173/
    - Network: mit einer IP adresse
- Öffne auf dem Handy den Network-Link 


### Bauen für die Produktion
npm run build


### Marker erstellen 
Wie die Marker erstellt wuren, um die AR Experience zu aktivieren.
Die maker wurden generiert, um auf die Poster zu setzten.
https://github.com/webarkit/Nft-Marker-Creator-App

Dokumentation: https://ar-js-org.github.io/AR.js-Docs/image-tracking/
