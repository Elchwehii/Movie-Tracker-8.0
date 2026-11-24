# Harry’s Chamber

A free movie and series tracker that works as an installable app on PC and Android. It has two sections:

- **Marvel**: every Marvel film and series (MCU, Sony, Fox X-Men, Netflix, ABC and more) with release dates, a live countdown to the next release, news, your watched list and a progress ring.
- **Movies & Shows**: the most anticipated upcoming US and UK titles, what’s trending, search, a watchlist and your own ratings.

Tap any title for its description, cast, trailer link, IMDb and Rotten Tomatoes ratings, and a reminder button. It has 16 colour themes and works offline once opened.

**Live link:** https://elchwehii.github.io/Movie-Tracker-7.0/

## Run it

1. **Just use it:** open the live link in Chrome or Edge. To install it, click the install icon at the right end of the address bar (on Android: ⋮ menu, Install app).
2. **From the files, on Windows:** unzip the folder and double-click `Open-Harrys-Chamber.bat` for an app-style window.
3. **From the files, on any computer:** open a terminal in the folder and run `python -m http.server 8000`, then visit http://localhost:8000.
4. **Host it yourself:** upload the folder (`index.html`, `sw.js`, `manifest.webmanifest`, both icons) to GitHub Pages or Netlify. It must be served over `https://` for installing and notifications.

## First-time setup (⚙ settings)

- **TMDB key (free):** turns on live data. Make an account at themoviedb.org, then Settings, API, and paste the *API Key*.
- **OMDb key (optional, free):** IMDb and Rotten Tomatoes scores. Get one at omdbapi.com/apikey.aspx and activate it from the email.
- **MDBList key (optional, free):** fills gaps when OMDb has no score.

Keys and your lists stay on your device.

## Files

| File | What it does |
| --- | --- |
| `index.html` | the whole app (HTML, CSS, JavaScript and the built-in Marvel list) |
| `sw.js` | offline support and release reminders |
| `manifest.webmanifest` | makes it installable |
| `Open-Harrys-Chamber.bat` | Windows launcher |

Data: TMDB (this product uses the TMDB API but is not endorsed or certified by TMDB), OMDb, MDBList.
