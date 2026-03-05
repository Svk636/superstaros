# Hollywood Superstar Protocol — Superstar OS v5.0
### Performance Operating System · PWA · GitHub Pages Ready

---

## 🚀 GitHub Pages Deployment (5 Steps)

### Step 1 — Create Repository
1. Go to [github.com/new](https://github.com/new)
2. Name it `superstar-os` (or any name)
3. Set to **Public**
4. Click **Create repository**

### Step 2 — Upload Files
Upload ALL files from this folder to the repo root:
```
superstar-os/
├── index.html          ← Main app
├── sw.js               ← Service Worker (offline support)
├── manifest.json       ← PWA manifest
├── 404.html            ← SPA routing fallback
├── .nojekyll           ← Disables Jekyll (required)
├── README.md
└── icons/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    ├── icon-512.png
    ├── screenshot-wide.png
    └── screenshot-narrow.png
```

### Step 3 — Enable GitHub Pages
1. Go to repo **Settings** → **Pages** (left sidebar)
2. Source: **Deploy from a branch**
3. Branch: **main** / **root folder** (`/`)
4. Click **Save**

### Step 4 — Your URL
After ~2 minutes, your app is live at:
```
https://YOUR-USERNAME.github.io/superstar-os/
```

### Step 5 — Install as PWA
- **iPhone/iPad**: Open URL in Safari → Share → Add to Home Screen
- **Android**: Open in Chrome → three dots → Add to Home Screen
- **Desktop Chrome**: Click install icon in address bar

---

## 📱 PWA Features
- ✅ Offline capable (full app works without internet)
- ✅ Installable on iOS, Android, and Desktop
- ✅ Data persists in localStorage (stays on your device)
- ✅ No ads, no tracking, no server required
- ✅ Service Worker caches all assets

## 🔒 Privacy
All data is stored **locally on your device** in `localStorage`.  
Nothing is ever sent to any server.

## ⚙️ Data Storage Keys
| Key | Contents |
|-----|----------|
| `superstar_os_v1` | Daily block scores, notes, reflection |
| `superstar_hist_v1` | Archived day history |
| `superstar_hab_v1` | Habit tracker data |
| `superstar_phys_v1` | Weekly combat + gym schedule |
| `superstar_nut_v1` | Nutrition tracker |
| `superstar_monthly_v1` | Monthly KPI scorecard |
| `superstar_sc_v1` | Weekly master scorecard |
| `superstar_aud_v1` | Auditions + portfolio pipeline |
| `superstar_p12_v1` | Phase 1→2 criteria |
| `superstar_p23_v1` | Phase 2→3 criteria |

---

## 📋 What's in v5.0
| Tab | Feature |
|-----|---------|
| 00 Dashboard | Live clock, today's metrics, CNS readiness |
| 01 Today's Flow | 9 time blocks with DOD checklists + Focus Mode |
| 02 Planned vs Actual | Block-by-block implementation scoring |
| 03 Reflection | Morning open + night close + weekly review |
| 04 Habits | Full daily habit tracker with streaks |
| 05 90-Day Map | Click-to-mark grid with status colors |
| 06 Momentum | Charts: daily, weekly, block types, CNS trend |
| 07 Benchmarks | 90-day physical + skill + brand targets |
| 08 P/R Balance | Performance/recovery calculator + 8 adjustment rules |
| 09 Week Plan | Mon–Sun combat + gym schedule (editable) |
| 10 History | All archived days with scores + reflections |
| **11 Phases** | Phase transition criteria + deload protocol |
| **12 Nutrition** | Daily macro tracker + meal timing guide |
| **13 Monthly** | 4-week KPI scorecard with delta tracking |
| **14 Scorecard** | Weighted master scorecard (combat 30%, meditation 20%) |
| **15 Auditions** | Casting pipeline: auditions, self-tapes, portfolio |

---

*EXECUTION IS THE IDENTITY*
