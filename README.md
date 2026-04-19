# 🎉 Countdown alla Pensione

Un bellissimo sito web con countdown personalizzato per celebrare il pensionamento!

## ✨ Caratteristiche

- ⏰ **Countdown in tempo reale** - Giorni, ore, minuti e secondi
- 📊 **Barra di progresso animata** - Visualizza quanto manca
- 💬 **Citazioni motivazionali** - Cambiano ogni 10 secondi
- 🎨 **Design moderno** - Gradienti, animazioni e effetti glassmorphism
- 📱 **Responsive** - Funziona su tutti i dispositivi
- 🎊 **Effetti speciali** - Confetti quando arriva il grande giorno!
- 🎁 **Easter egg** - Doppio click sul titolo per celebrare!

## 🚀 Come visualizzare il sito localmente

1. Apri il file `index.html` nel tuo browser
2. Oppure usa un server locale (ad esempio con Python):
   ```bash
   python -m http.server 8000
   ```
   Poi apri http://localhost:8000 nel browser

## 🌐 Come Deployare GRATUITAMENTE

### Opzione 1: GitHub Pages (Consigliato) ⭐

**Vantaggi**: Gratuito, facile, hosting illimitato, dominio personalizzato gratis

**Passi:**

1. **Crea un account GitHub** (se non ce l'hai già)
   - Vai su https://github.com
   - Clicca "Sign up"

2. **Crea un nuovo repository**
   - Clicca sul + in alto a destra
   - Seleziona "New repository"
   - Nome: `countdown-pensione` (o quello che preferisci)
   - Seleziona "Public"
   - Clicca "Create repository"

3. **Carica i file**
   - Clicca "uploading an existing file"
   - Trascina i file: `index.html`, `style.css`, `script.js`
   - Clicca "Commit changes"

4. **Attiva GitHub Pages**
   - Vai su "Settings" del repository
   - Nel menu laterale, clicca "Pages"
   - In "Source", seleziona "main" branch
   - Clicca "Save"
   - Dopo qualche minuto, il sito sarà online!

5. **Il tuo sito sarà disponibile su:**
   ```
   https://[tuo-username].github.io/countdown-pensione/
   ```

### Opzione 2: Netlify

**Vantaggi**: Deploy con drag & drop, HTTPS automatico, dominio personalizzato gratis

**Passi:**

1. Vai su https://www.netlify.com
2. Clicca "Sign up" (puoi usare GitHub, Google, o email)
3. Clicca "Add new site" → "Deploy manually"
4. Trascina la cartella `Countdown` nella finestra
5. Il sito sarà online in pochi secondi!
6. Netlify ti darà un URL tipo: `https://random-name-123.netlify.app`
7. Puoi personalizzare il nome in "Site settings" → "Change site name"

### Opzione 3: Vercel

**Vantaggi**: Deploy velocissimo, ottimizzazioni automatiche

**Passi:**

1. Vai su https://vercel.com
2. Clicca "Sign up" (consiglio con GitHub)
3. Clicca "Add New" → "Project"
4. Importa dalla cartella locale o da GitHub
5. Clicca "Deploy"
6. Il sito sarà online su: `https://countdown-pensione.vercel.app`

### Opzione 4: Cloudflare Pages

**Vantaggi**: CDN velocissimo a livello mondiale, gratis

**Passi:**

1. Vai su https://pages.cloudflare.com
2. Clicca "Sign up"
3. Clicca "Create a project"
4. Connetti GitHub o carica manualmente i file
5. Clicca "Deploy"

## 🎨 Personalizzazione

### Cambiare la data di pensionamento
Nel file `script.js`, modifica la linea 2:
```javascript
const retirementDate = new Date('2029-04-01T23:59:59').getTime();
```

### Cambiare la data di inizio lavoro (per la barra di progresso)
Nel file `script.js`, modifica la linea 5:
```javascript
const workStartDate = new Date('1990-01-01T00:00:00').getTime();
```

### Aggiungere nuove citazioni
Nel file `script.js`, aggiungi citazioni all'array `quotes` (linea 8-17)

### Cambiare i colori
Nel file `style.css`, modifica le variabili CSS nella sezione `:root` (prime linee)

## 📝 Note

- Il countdown si aggiorna automaticamente ogni secondo
- La barra di progresso mostra la percentuale completata
- Le citazioni cambiano ogni 10 secondi
- Il sito è completamente responsive (funziona su mobile, tablet e desktop)
- Quando arriva il grande giorno, appare un messaggio di congratulazioni con effetto confetti! 🎊

## 💡 Suggerimenti

- Puoi condividere il link direttamente con tuo padre
- Aggiungi il sito ai preferiti del browser
- Su mobile, puoi "Aggiungi alla schermata Home" per averlo come app

## ❤️ Fatto con amore

Questo sito è stato creato per celebrare un momento speciale. Goditi ogni secondo del countdown!

---

**Buona pensione! 🌴☀️**
