<div align="center">
  <img src="https://img.shields.io/badge/STATUS-OPERATIONAL-06b6d4?style=for-the-badge&logo=shield" alt="Status" />
  <img src="https://img.shields.io/badge/CLEARANCE-LEVEL_5-f59e0b?style=for-the-badge&logo=lock" alt="Clearance" />
  <img src="https://img.shields.io/badge/ROLE-DFIR_ANALYST-10b981?style=for-the-badge&logo=terminal" alt="Role" />

  <br/><br/>
  
  # DeepTrace Forensic Framework 
  **Digital Forensics & Incident Response Portfolio**
  
  <p align="center">
    <i>An immersive, cinematic portfolio engineered specifically for the cybersecurity and DFIR industry. Designed to survive the 6-second recruiter skim by forcing absolute immersion through terminal aesthetics, hidden easter eggs, and bleeding-edge web design.</i>
  </p>
</div>

---

## 🔬 The "Experience Factor" (v3.0 Overhaul)

This isn't a static page. It's a simulated incident response environment powered by **GSAP 3** and **React 18**. It bridges the gap between raw technical competence and high-end interactive storytelling.

> [!IMPORTANT]
> **Live Deployment:** [portfolio-sepia-two-47.vercel.app](https://portfolio-sepia-two-47.vercel.app/)

### 🎮 Immersive DFIR Features

- **The Forensic Boot Sequence**: The page initializes with a raw data-carving boot log, calculating hashes and building timelines before the UI unlocks.
- **UV Light Analysis Tool**: A custom cursor tracks over the Hero section, acting as a UV flashlight that illuminates hidden Luminol "blood spatter" trails in the background.
- **Interactive Hex Decoder**: The hero background is a wall of random memory hex dumps. Finding the specific `4D 5A` (MZ header) payload and clicking it triggers a modal decoding the hidden binary (the resume).
- **Forensic CLI Terminal**: A floating, fully functional terminal widget (`forensic_cli`) that responds to real commands (`help`, `whois prajwal`, `evidence --log`, `clear`).
- **The "Root Access" Easter Egg**: Entering the Konami Code (`↑ ↑ ↓ ↓ ← → ← → B A`) on the keyboard triggers a screen-shattering `ROOT ACCESS GRANTED` glitch override sequence.

---

## 🛠️ Tactical Architecture

| Subsystem | Technology |
|---|---|
| **Core Framework** | React 18 + Vite |
| **Animation Engine** | GSAP 3 (ScrollTrigger, Timelines) |
| **Aesthetics & UI** | Tailwind CSS (Cinematic Dark Mode + Glassmorphism) |
| **Data Ingestion** | GitHub REST API v3 (Live activity feeds) |
| **Intake Routing** | Gmail / Native Mail Client Direct Composition |

---

## 🗃️ Evidence & Modules

### `[MODULE 01] · Subject Profile (Hero & About)`
- **Dynamic Typewriter**: Displays current active DFIR studies (Volatility 3, GIAC, Plaso) scrolling continuously.
- **Last Active HUD**: Real-time fetch of the latest GitHub `PushEvent` timestamp injected directly into the navigation bar.

### `[MODULE 02] · Chain of Custody (Journey & Experience)`
- **Plaso Log2Timeline**: The standard timeline is completely rewritten as a digital forensics artifact timeline, mapping out career events by specific ISO 8601 timestamps and SHA-256 hashes.
- **Event Categorization**: Career milestones are tagged as `ARTIFACT_CARVED`, `LOG_INGESTED`, and `EVIDENCE_TAGGED`.

### `[MODULE 03] · Operational Capabilities (Arsenal)`
- **3D Tilt Architecture**: Mission and skill cards physically tilt in 3D perspective relative to mouse coordinates.
- **Hexagon Radar Chart**: A custom-built SVG Spider/Radar chart dynamically animating skill levels across DFIR, SOC, Malware, Scripting, and Detection.

### `[MODULE 04] · The Signature Scene (Nexus Alpha)`
- **Pinned Scroll Mechanics**: The page stops scrolling, forcing the user to scrub horizontally through a simulated "Threat Detection" sequence where the screen goes black, terminal logs stream, and a massive `THREAT NEUTRALIZED` alert flashes on screen.

### `[MODULE 05] · The Vault (Certifications)`
- **Classified Storage**: A highly stylized vault presenting cybersecurity certifications (CEH, PenTest+, AWS) with glowing amber outlines and top-secret classified aesthetics.

---

## 📥 Intake & Deployment

The site requires no backend to deploy. Form submissions natively route via safe email compose chains to prevent third-party logging.

```bash
# Clone the repository
git clone https://github.com/prajwal-2201/portfolio

# Initialize sub-systems
npm install

# Boot development server (Localhost:5173)
npm run dev

# Compile for production deployment
npm run build
```

---

> [!TIP]
> **Accessibility Configured:** The framework natively respects OS-level `prefers-reduced-motion` flags, automatically disarming GSAP animations and CSS glitches for sensitive users.

<p align="center">
  <br/>
  <sub>Built with intent. Deployed with precision.</sub><br/>
  <sub><b>PV_PROTOCOL v8.4.7 · © 2025 · /.well-known/security.txt included</b></sub>
</p>
