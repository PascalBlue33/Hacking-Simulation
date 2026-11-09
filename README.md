# HACK//OS

Ein lokaler Hollywood-Hacker-Simulator mit Angular 21, TypeScript (strict), Standalone Components, Signals und SCSS. Alle Ziele, Systemwerte und Vorgänge sind fiktiv. Keine Backend-Anbindung, Netzwerk-Scans, Shell-Ausführung oder externen Schriftarten.

## Start

Node.js 22.12+ oder 24 verwenden.

```sh
npm install
npm start
```

Im Browser `http://localhost:4200` öffnen. Alternativ `npx ng serve`.

```sh
npm run build
npm test
```

Der Produktionsbuild liegt unter `dist/hack-os/browser`. Nach der Installation sind die simulierten Vorgänge vollständig lokal. Die Sitzung wird bewusst nicht gespeichert; ein Neuladen setzt sie zurück.

## Operation Blackout

`scan` → `connect` → `breach` → `decrypt`. Jeder Vorgang dauert ca. drei Sekunden. Danach wird der geheime Zugangscode enthüllt und die Mission abgeschlossen. Schnellaktionen sind auch ohne Tastatur bedienbar.

| Befehl | Funktion |
| --- | --- |
| `help` | Befehlsübersicht |
| `clear` | Terminal-Ausgabe leeren |
| `status` | Fiktive Systeminformationen |
| `scan` | Simuliertes Netzwerk untersuchen |
| `connect` | Mit virtuellem Ziel verbinden |
| `breach` | Fiktive Firewall überwinden |
| `decrypt` | Geheimdatei entschlüsseln |
| `matrix` | Hintergrundanimation umschalten |
| `whoami` | Operator-Profil |
| `mission` | Aktuelles Ziel / Ergebnis |
| `history` | Bisherige Befehle |
| `reboot` | Laufende Animation abbrechen und Sitzung zurücksetzen |

Enter führt aus, Pfeil hoch/runter navigiert durch den Verlauf, Tab ergänzt eindeutige Befehle. Einige zusätzliche Befehle enthalten Easter Eggs.

## Aufbau

`src/app` enthält Header, Terminal, SystemMonitor, MissionPanel und MatrixBackground als eigene Komponenten. TerminalService verarbeitet ausschliesslich fest definierte Befehle und verwaltet Animationen. MissionService kapselt die Reihenfolge, SimulationService erzeugt fiktive Telemetrie. Timer und Canvas-Frames werden beim Zerstören aufgeräumt. Terminal-Ausgaben werden als Text gerendert und auf 300 Zeilen begrenzt. Reduzierte Bewegung wird respektiert; der Matrix-Effekt kann jederzeit ausgeschaltet werden.

Die Vitest-Tests prüfen Missionsreihenfolge, doppelte und unbekannte Befehle, vollständigen Missionsabschluss, Verlauf sowie den Abbruch durch reboot.
