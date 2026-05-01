# Prajwal V. — Security Architect Portfolio

> **Live at:** [portfolio-sepia-two-47.vercel.app/](https://portfolio-sepia-two-47.vercel.app/) 

A high-end, cinematic portfolio engineered for **SOC Engineers**, **Detection Architects**, and **Digital Forensics** roles. Built to stand out — not just look good.

---

## ✦ Design Philosophy

> *"Less decoration. More authority."*

Every scroll interaction, layout decision, and word is optimized for one goal: convince a senior security recruiter in **6 seconds** that this candidate belongs in the top 5%.

---

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Animation | GSAP + ScrollTrigger |
| Data | GitHub REST API v3 (live feed) |
| Icons | Lucide React + React Icons |

---

## ✦ Sections

| # | Section | Description |
|---|---|---|
| 1 | **Hero** | Cinematic entrance with GSAP stagger — massive bold identity reveal |
| 2 | **About** | Scroll-scrubbed manifesto statement |
| 3 | **Experience** | Quantified operational timeline with metric tags |
| 4 | **Capabilities** | Core security competencies + verified credentials |
| 5 | **Featured Architectures** | Horizontal-scroll showcase (Nexus + CyberSentinel) with business impact callouts |
| 6 | **Research** | Threat hunting deep dive with a live YARA rule snippet |
| 7 | **Security Repositories** | Auto-classified GitHub live feed — new security repos appear automatically |
| 8 | **Contact** | Closing CTA with timezone, availability, and resume link |

---

## ✦ Live GitHub Feed — How It Works

The **Security Repositories** section is fully autonomous:

- Fetches up to 50 repos from the GitHub API on load
- Auto-classifies repos using a **30+ keyword engine** (`yara`, `soc`, `dfir`, `pentest`, `threat`, `malware`, etc.)
- Polls every **5 minutes** — push a new security project and it appears automatically
- Hard-blocks non-security repos (`wanderluxe`, `portfolio`, `syncflow`, etc.) by name

> **Zero manual updates needed.** Push a new security repo → it's live on the portfolio within minutes.

---

## ✦ Featured Projects

### Nexus Threat Platform `Infrastructure & Orchestration`
- **15,000+ EPS** processing via FastAPI / WebSocket pipeline
- **45% reduction** in false positive alerts through custom correlation rules
- Reduced P1 analyst response time by eliminating low-fidelity noise at ingestion

### CyberSentinel DFIR `Detection Engineering & Logic`
- Raw NTFS/FAT sector-level parsing to defeat anti-forensic evasion
- **98% artifact recovery rate** on heavily fragmented drives
- Enables attacker attribution by recovering wiped execution artefacts

---

## ✦ Research

The **Threat Hunting & Research** section features a custom YARA rule authored during a live forensic investigation — detecting APT29 (Cozy Bear) fileless memory droppers **before execution touches disk**.

```yara
rule APT29_CozyBear_Memory_Dropper {
    meta:
        author    = "Prajwal V"
        severity  = "CRITICAL"
    condition:
        $magic at 0 and $decryption_routine and 1 of ($obfuscated*)
}
```

---

## ✦ Running Locally

```bash
git clone https://github.com/prajwal-2201/portfolio
cd portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## ✦ Building for Production

```bash
npm run build
```

Output goes to `dist/` — deploy to Vercel, Netlify, or GitHub Pages.

---

## ✦ Certifications

- Ethical Hacker Certification
- Penetration Testing Course
- Information Security Certification

---

## ✦ Contact

| | |
|---|---|
| **Email** | vprajwal2204@gmail.com |
| **LinkedIn** | [prajwal-v-b975952a0](https://www.linkedin.com/in/prajwal-v-b975952a0/) |
| **GitHub** | [@prajwal-2201](https://github.com/prajwal-2201) |
| **Availability** | Remote / Hybrid · IST (UTC +5:30) |

---

<p align="center">
  <sub>Built with intent. Deployed with precision. © Prajwal V. 2025</sub>
</p>
