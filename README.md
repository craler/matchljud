# Matchljud

A courtside sound desk for game days: Spotify songs, horns and other sound effects, and a
Novation Launchpad Mini MK3 as the control surface. Runs in Chrome on Android, tablets and
laptops as an installable web app. The interface is in Swedish.

Open it at https://craler.github.io/matchljud/

## What it does

- Tiles in groups (Match, Mål, Periodpaus …). Tap to play, tap again to fade out.
- Start and stop points, fades, loops, "play the next tile afterwards" and timed silences for sing-alongs.
- Played songs go dark; one button plays a random unplayed song from a group.
- Sound effects fire the moment you touch them and stack on top of the music.
- Launchpad Mini MK3: the pads mirror the tiles and their colours. Any pad, MIDI button or
  keyboard key can also be bound to a tile or to a group's random song.
- Reads a Sports Audio DJ backup (.sadj), and saves and restores its own backups.
- Optional sync between devices through a private GitHub repository.

## Setup

1. Create an app at https://developer.spotify.com/dashboard with **Web API** and
   **Web Playback SDK**, and add the page address as Redirect URI. Spotify Premium is required.
2. Open the app, choose **Koppla Spotify**, paste the Client ID and log in.
3. Plug in the Launchpad with USB and allow MIDI access when Chrome asks.

Everything is stored in the browser on the device. Nothing is sent anywhere except to Spotify
and, if you switch sync on, to your own GitHub repository.

## Files

- `index.html` – the whole app
- `sw.js` – offline start and background updates
- `matchljud-cond.woff` – condensed display face, a renamed subset of TeX Gyre Heros Condensed Bold (see `FONT-LICENSE.txt`)
