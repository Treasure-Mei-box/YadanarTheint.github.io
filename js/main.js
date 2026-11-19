/* ====================================================================
   Portfolio interactions — Yadanar Theint.
   Typing effects, particles, animated reveal/stagger, scroll progress,
   animated skills bars/meters/pills, animated timeline, project modal,
   animated project demos, contact form and nav.
==================================================================== */
(function () {
  "use strict";

  const q = (sel, ctx) => (ctx || document).querySelector(sel);
  const qa = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ---------------------------------------------------------- helpers ---- */
  const animateValue = (el, from, to, duration, onDone) => {
    if (!el) return;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = `${Math.round(from + (to - from) * ease)}%`;
      if (p < 1) requestAnimationFrame(tick);
      else if (onDone) onDone();
    };
    requestAnimationFrame(tick);
  };

  const typeText = (target, text, speed) => {
    if (!target) return;
    let i = 0;
    const tick = () => {
      target.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, speed);
    };
    setTimeout(tick, 460);
  };

  /* --------------------------------------------------- animated demos ---- */
  const DEMO_SVG_ASEAN = `
<svg class="modal-demo" viewBox="0 0 640 360" role="img" aria-label="Illustrative animated ASEAN health statistics chart">
<style type="text/css">
.bar { fill: url(#aseanBar); opacity: 0; animation: rise 2.8s ease-out var(--d) both; }
.dot { fill: #f2b53a; opacity: 0; animation: rise 2.2s ease-out var(--d) both; }
.v { fill: #6a86ff; opacity: 0.55; }
.pulse { animation: pulse 2.2s ease-in-out infinite alternate; }
@keyframes rise { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0%, 100% { opacity: 0.3 } 50% { opacity: 1 } }
</style>
<defs>
<linearGradient id="aseanBar" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#4cdfb0"/><stop offset="1" stop-color="#2a5d82"/>
</linearGradient>
</defs>
<g class="v"><circle cx="596" cy="36" r="20"/><circle cx="564" cy="118" r="24"/><circle cx="46" cy="62" r="18"/><circle cx="584" cy="242" r="16"/></g>
<text x="18" y="22" font-family="JetBrains Mono, monospace" font-size="11" fill="#9ca8c5">Illustrative trend — ASEAN health stats (demo)</text>
<rect class="bar" x="54" y="210" width="22" height="80" rx="3" style="--d:0.05s"/>
<rect class="bar" x="108" y="160" width="22" height="130" rx="3" style="--d:0.4s"/>
<rect class="bar" x="162" y="196" width="22" height="102" rx="3" style="--d:0.75s"/>
<rect class="bar" x="216" y="126" width="22" height="152" rx="3" style="--d:1.1s"/>
<rect class="bar" x="270" y="234" width="22" height="64" rx="3" style="--d:1.45s"/>
<rect class="bar" x="324" y="138" width="22" height="124" rx="3" style="--d:1.8s"/>
<rect class="bar" x="378" y="206" width="22" height="96" rx="3" style="--d:2.15s"/>
<g class="dot"><circle class="pulse" cx="54" cy="298" r="3"/><circle class="pulse" cx="108" cy="282" r="3"/><circle class="pulse" cx="162" cy="312" r="3"/><circle class="pulse" cx="216" cy="272" r="3"/><circle class="pulse" cx="270" cy="326" r="3"/><circle class="pulse" cx="324" cy="280" r="3"/><circle class="pulse" cx="378" cy="298" r="3"/></g>
<g class="dot"><circle class="pulse" cx="54" cy="324" r="2.5"/><circle class="pulse" cx="108" cy="312" r="2.5"/><circle class="pulse" cx="162" cy="336" r="2.5"/><circle class="pulse" cx="216" cy="292" r="2.5"/><circle class="pulse" cx="270" cy="342" r="2.5"/><circle class="pulse" cx="324" cy="298" r="2.5"/><circle class="pulse" cx="378" cy="320" r="2.5"/></g>
<text x="54" y="352" font-family="JetBrains Mono, monospace" font-size="9" fill="#9ca8c5">Country</text>
<text x="270" y="352" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" fill="#9ca8c5">Country</text>
</svg>`;

  const DEMO_SVG_AQ = `
<svg class="modal-demo" viewBox="0 0 640 360" role="img" aria-label="Illustrative animated air quality analytics">
<style type="text/css">
.aq-bar { transform-origin: bottom; animation: bounce 3.2s cubic-bezier(.45,.5,.55,.5) infinite; }
@keyframes bounce { 0% { transform: scaleY(0.45) } 22% { transform: scaleY(1.05) } 55% { transform: scaleY(0.72) } 100% { transform: scaleY(1) } }
.tw { fill: #f2b53a; opacity: 0; animation: twinkle 2.2s ease-in-out infinite alternate; }
@keyframes twinkle { 0%, 100% { opacity: 0 } 50% { opacity: 1 } }
.grid { stroke: #4cdfb0; stroke-width: 1; opacity: 0.14; }
.title { fill: #9ca8c5; font-size: 10; }
</style>
<path class="grid" d="M0 160h640"/><path class="grid" d="M0 176h640"/><path class="grid" d="M0 192h640"/><path class="grid" d="M0 208h640"/>
<text class="title" x="16" y="20">Air quality analytics — illustrative bars (AQI style)</text>
<g>
<rect class="aq-bar" x="34" y="220" width="12" height="100" fill="#6a86ff" opacity="0.85"/>
<rect class="aq-bar" x="94" y="238" width="12" height="102" fill="#6a86ff" opacity="0.85"/>
<rect class="aq-bar" x="154" y="204" width="12" height="96" fill="#4cdfb0" opacity="0.85"/>
<rect class="aq-bar" x="214" y="256" width="12" height="86" fill="#f2b53a" opacity="0.85"/>
<rect class="aq-bar" x="274" y="192" width="12" height="108" fill="#6a86ff" opacity="0.85"/>
<rect class="aq-bar" x="334" y="246" width="12" height="92" fill="#4cdfb0" opacity="0.85"/>
<rect class="aq-bar" x="394" y="228" width="12" height="100" fill="#f2b53a" opacity="0.85"/>
<rect class="aq-bar" x="454" y="206" width="12" height="98" fill="#6a86ff" opacity="0.85"/>
<rect class="aq-bar" x="514" y="262" width="12" height="84" fill="#4cdfb0" opacity="0.85"/>
<rect class="aq-bar" x="574" y="234" width="12" height="98" fill="#f2b53a" opacity="0.85"/>
</g>
<g class="tw">
<circle cx="80" cy="80" r="2.5"/><circle cx="150" cy="130" r="2"/><circle cx="270" cy="40" r="2.5"/><circle cx="390" cy="170" r="1.5"/><circle cx="510" cy="100" r="2"/>
<circle cx="580" cy="186" r="2.5"/><circle cx="120" cy="300" r="1.5"/><circle cx="440" cy="320" r="2"/><circle cx="20" cy="150" r="2"/>
</g>
</svg>`;

  const DEMO_SVG_CICD = `
<svg class="modal-demo" viewBox="0 0 640 360" role="img" aria-label="Illustrative animated Azure CI/CD pipeline">
<style type="text/css">
.pipe-line { stroke: #4cdfb0; stroke-width: 1.5; fill: none; stroke-dasharray: 90; stroke-dashoffset: 90; opacity: .3; stroke-linecap: round; }
.flow { fill: none; stroke: #f2b53a; stroke-width: 2; animation: slide 3.6s linear infinite; stroke-linecap: round; }
.stage { opacity: 0; animation: pop 1.3s cubic-bezier(.34,1.56,.64,1) var(--d) forwards; }
.core { fill: #4cdfb0; }
@keyframes pop { 50% { transform: scale(1.06) translateY(-3px); } to { opacity: 1 } }
@keyframes slide { to { stroke-dashoffset: 0 } }
</style>
<text class="title" x="18" y="22" font-family="JetBrains Mono, monospace" font-size="10" fill="#9ca8c5">GitHub Actions → Docker → GHCR → Azure — animated</text>
<path class="pipe-line" d="M30 110h580"/>
<g class="stage" style="--d:0.1s"><circle cx="62" cy="110" r="21"/><circle class="core" cx="62" cy="110" r="11"/></g>
<g class="stage" style="--d:0.45s"><circle cx="142" cy="110" r="21"/><circle class="core" cx="142" cy="110" r="11"/></g>
<g class="stage" style="--d:0.8s"><circle cx="222" cy="110" r="21"/><circle class="core" cx="222" cy="110" r="11"/></g>
<g class="stage" style="--d:1.15s"><circle cx="302" cy="110" r="21"/><circle class="core" cx="302" cy="110" r="11"/></g>
<g class="stage" style="--d:1.5s"><circle cx="382" cy="110" r="21"/><circle class="core" cx="382" cy="110" r="11"/></g>
<g class="stage" style="--d:1.85s"><circle cx="462" cy="110" r="21"/><circle class="core" cx="462" cy="110" r="11"/></g>
<g class="stage" style="--d:2.2s"><circle cx="542" cy="110" r="21"/><circle class="core" cx="542" cy="110" r="11"/></g>
<path class="flow" d="M10 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<path class="flow" d="M52 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<path class="flow" d="M94 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<path class="flow" d="M136 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<path class="flow" d="M178 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<path class="flow" d="M220 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<path class="flow" d="M262 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<path class="flow" d="M304 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<path class="flow" d="M346 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<path class="flow" d="M388 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<path class="flow" d="M430 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<path class="flow" d="M472 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<path class="flow" d="M514 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<path class="flow" d="M556 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<path class="flow" d="M598 110a21 21 0 0 0 42 0" stroke-dasharray="8 10"/>
<text class="title" x="300" y="340" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" fill="#9ca8c5">Code → check → pack → deploy (auto rollback on failure)</text>
</svg>`;

  const DEMO_SVG_OOP = `
<svg class="modal-demo" viewBox="0 0 640 360" role="img" aria-label="Illustrative animated OOP class tree">
<style type="text/css">
.edge { stroke: #4cdfb0; stroke-width: 2; fill: none; stroke-linecap: round; stroke-dasharray: 165; stroke-dashoffset: 165; animation: draw 1.1s ease-out var(--d) forwards; }
.node { opacity: 0; animation: pop 1.5s cubic-bezier(.34,1.56,.64,1) var(--d) both; }
.label { fill: #081021; font-family: JetBrains Mono, monospace; font-size: 9.5; font-weight: 700; opacity: 0; animation: pop 1.5s cubic-bezier(.34,1.56,.64,1) calc(var(--d) + 0.08s) both; }
@keyframes draw { to { stroke-dashoffset: 0 } }
@keyframes pop { 50% { transform: translateY(-6px) scale(1.14) } to { opacity: 1 } }
</style>
<circle class="node" cx="320" cy="250" r="25" fill="#f2b53a" style="--d:0.15s"/>
<text class="label" x="320" y="254" text-anchor="middle">Class</text>
<path class="edge" d="M320 225c-46 0 -94 -20 -112 -40" style="--d:0.45s"/>
<path class="edge" d="M320 225c46 0 94 -20 112 -40" style="--d:0.45s"/>
<path class="edge" d="M208 225c0 -30 40 -50 60 -62" style="--d:0.8s"/>
<path class="edge" d="M432 225c0 -30 -40 -50 -60 -62" style="--d:0.8s"/>
<circle class="node" cx="208" cy="163" r="13" fill="#6a86ff" style="--d:1.2s"/>
<text class="label" x="208" y="167" text-anchor="middle">SubA</text>
<circle class="node" cx="432" cy="163" r="13" fill="#6a86ff" style="--d:1.4s"/>
<text class="label" x="432" y="167" text-anchor="middle">SubB</text>
<path class="edge" d="M188 163c-40 0 -60 30 -60 50" style="--d:0.45s"/>
<path class="edge" d="M228 163c40 0 60 30 60 50" style="--d:0.45s"/>
<path class="edge" d="M408 163c40 0 60 30 60 50" style="--d:0.45s"/>
<path class="edge" d="M448 163c-40 0 -60 30 -60 50" style="--d:0.45s"/>
<circle class="node" cx="148" cy="123" r="8.5" fill="#4cdfb0" style="--d:1.8s"/>
<circle class="node" cx="268" cy="123" r="8.5" fill="#4cdfb0" style="--d:1.95s"/>
<circle class="node" cx="388" cy="123" r="8.5" fill="#4cdfb0" style="--d:2.1s"/>
<circle class="node" cx="508" cy="123" r="8.5" fill="#4cdfb0" style="--d:2.25s"/>
<text x="300" y="335" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" fill="#9ca8c5">Illustrative class tree — animated in</text>
</svg>`;

  const DEMO_SVG_TREE = `
<svg class="modal-demo" viewBox="0 0 640 360" role="img" aria-label="Illustrative animated tree-based route finding">
<style type="text/css">
.line { stroke: #4cdfb0; stroke-width: 2; fill: none; stroke-linecap: round; }
.node { fill: #f2b53a; }
.walk { stroke: #f2b53a; stroke-width: 2.6; fill: none; stroke-linecap: round; opacity: 0; animation: walk 1.7s ease-in-out var(--d) both; }
@keyframes walk { 0% { opacity: 0; stroke-dashoffset: 260 } 30% { opacity: 1; stroke-dashoffset: 260 } 60% { opacity: 1; stroke-dashoffset: 0 } 90% { opacity: 0 } }
.flash { fill: #6a86ff; opacity: 0; animation: pop 1.7s ease-in-out var(--d) both; }
@keyframes pop { 50% { opacity: 1; transform: translateY(-6px) } 100% { opacity: 1; transform: none } }
</style>
<text class="title" x="300" y="340" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" fill="#9ca8c5">Tree-based route finding — animated search</text>
<circle class="node" cx="320" cy="112" r="17"/>
<circle class="node" cx="200" cy="190" r="13" fill="#4cdfb0"/>
<circle class="node" cx="440" cy="190" r="13" fill="#4cdfb0"/>
<circle class="node" cx="120" cy="290" r="8" fill="#6a86ff"/>
<circle class="node" cx="280" cy="290" r="8" fill="#6a86ff"/>
<circle class="node" cx="560" cy="290" r="8" fill="#6a86ff"/>
<path class="line" d="M320 95V150"/>
<path class="line" d="M320 150H200"/>
<path class="line" d="M320 150H440"/>
<path class="line" d="M200 177V214"/>
<path class="line" d="M440 177V214"/>
<path class="line" d="M200 214L120 290"/>
<path class="line" d="M200 214L280 290"/>
<path class="line" d="M440 214L560 290"/>
<g class="flash" style="--d:0.1s"><circle cx="320" cy="112" r="12" opacity="0.5"/><circle cx="320" cy="112" r="9"/></g>
<path class="walk" d="M280 112H180" style="--d:0.5s"/>
<path class="walk" d="M200 190L120 290" style="--d:1.1s"/>
<path class="walk" d="M120 290H170" style="--d:1.9s"/>
<path class="walk" d="M200 290H280" style="--d:2.7s"/>
<path class="walk" d="M440 190L560 290" style="--d:0.8s"/>
<g class="flash" style="--d:3.2s"><circle cx="280" cy="290" r="10" opacity="0.4"/><circle cx="280" cy="290" r="7"/></g>
</svg>`;

  const DEMO_SVG_MINIS = `
<svg class="modal-demo" viewBox="0 0 640 360" role="img" aria-label="Illustrative animated Python mini projects">
<style type="text/css">
.mini-bar { fill: url(#miniGrad); opacity: 0; animation: rise 1.8s ease-out var(--d) both; }
.snip { fill: #6a86ff; opacity: 0; animation: rise 1.3s ease-out var(--d) both; }
@keyframes rise { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
</style>
<defs><linearGradient id="miniGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4cdfb0"/><stop offset="1" stop-color="#2a5d82"/></linearGradient></defs>
<text class="title" x="18" y="22" font-family="JetBrains Mono, monospace" font-size="10" fill="#9ca8c5">Python mini programs — animated rise</text>
<g>
<rect class="mini-bar" x="34" y="214" width="12" height="70" rx="3" style="--d:0.05s"/>
<rect class="mini-bar" x="56" y="196" width="12" height="88" rx="3" style="--d:0.25s"/>
<rect class="mini-bar" x="78" y="228" width="12" height="56" rx="3" style="--d:0.45s"/>
<rect class="mini-bar" x="100" y="176" width="12" height="94" rx="3" style="--d:0.65s"/>
<rect class="mini-bar" x="122" y="236" width="12" height="48" rx="3" style="--d:0.85s"/>
<rect class="mini-bar" x="144" y="204" width="12" height="80" rx="3" style="--d:1.05s"/>
<rect class="mini-bar" x="166" y="248" width="12" height="42" rx="3" style="--d:1.25s"/>
<rect class="mini-bar" x="188" y="160" width="12" height="98" rx="3" style="--d:1.45s"/>
</g>
<g class="snip">
<rect x="34" y="68" width="10" height="10" rx="2"/>
<rect x="60" y="48" width="10" height="10" rx="2"/>
<rect x="86" y="80" width="10" height="10" rx="2"/>
<rect x="112" y="40" width="10" height="10" rx="2"/>
<rect x="138" y="90" width="10" height="10" rx="2"/>
<rect x="164" y="60" width="10" height="10" rx="2"/>
<rect x="190" y="100" width="10" height="10" rx="2"/>
<rect x="216" y="46" width="10" height="10" rx="2"/>
</g>
</svg>`;

  const DEMO_SVG_NOTEBOOKS = `
<svg class="modal-demo" viewBox="0 0 640 360" role="img" aria-label="Illustrative animated DataScienceML notebook stack">
<style type="text/css">
.nb { opacity: 0; animation: open 1.2s ease-out var(--d) both; }
@keyframes open { 0% { opacity: 0; transform: scaleY(0) } 60% { opacity: 1; transform: scaleY(0.15) } 100% { transform: scaleY(1) } }
.page { fill: #f2b53a; opacity: 0; animation: page 0.9s ease-out var(--d) both; transform-origin: top; }
@keyframes page { 0% { opacity: 0; transform: scaleX(0) } 100% { opacity: 1; transform: scaleX(1) } }
</style>
<text class="title" x="20" y="352" font-family="JetBrains Mono, monospace" font-size="9" fill="#9ca8c5">Notebooks — pandas and matplotlib — animated open</text>
<g class="nb" style="--d:0.15s" transform="translate(50, 30)">
  <rect class="page" x="0" y="6" width="170" height="220" rx="6"/>
  <rect class="page" x="0" y="36" width="170" height="220" rx="6"/>
  <rect class="page" x="0" y="66" width="170" height="220" rx="6"/>
  <rect x="10" y="22" width="150" height="6" rx="2" fill="#f04e70"/>
  <rect x="10" y="52" width="130" height="6" rx="2" fill="#4cdfb0"/>
  <rect x="10" y="80" width="140" height="6" rx="2" fill="#6a86ff"/>
  <circle cx="170" cy="30" r="8" fill="#f2b53a"/>
  <circle cx="175" cy="50" r="8" fill="#4cdfb0"/>
  <circle cx="170" cy="70" r="8" fill="#6a86ff"/>
</g>
<g class="nb" style="--d:0.8s" transform="translate(230, 30)">
  <rect class="page" x="0" y="6" width="170" height="220" rx="6"/>
  <rect class="page" x="0" y="36" width="170" height="220" rx="6"/>
  <rect class="page" x="0" y="66" width="170" height="220" rx="6"/>
  <rect x="10" y="22" width="150" height="6" rx="2" fill="#6a86ff"/>
  <rect x="10" y="52" width="130" height="6" rx="2" fill="#f04e70"/>
  <rect x="10" y="80" width="140" height="6" rx="2" fill="#4cdfb0"/>
  <circle cx="170" cy="30" r="8" fill="#f2b53a"/>
  <circle cx="175" cy="50" r="8" fill="#f04e70"/>
  <circle cx="170" cy="70" r="8" fill="#4cdfb0"/>
</g>
<g class="nb" style="--d:1.45s" transform="translate(410, 30)">
  <rect class="page" x="0" y="6" width="170" height="220" rx="6"/>
  <rect class="page" x="0" y="36" width="170" height="220" rx="6"/>
  <rect class="page" x="0" y="66" width="170" height="220" rx="6"/>
  <rect x="10" y="22" width="150" height="6" rx="2" fill="#4cdfb0"/>
  <rect x="10" y="52" width="130" height="6" rx="2" fill="#f04e70"/>
  <rect x="10" y="80" width="140" height="6" rx="2" fill="#6a86ff"/>
  <circle cx="170" cy="30" r="8" fill="#4cdfb0"/>
  <circle cx="175" cy="50" r="8" fill="#f04e70"/>
  <circle cx="170" cy="70" r="8" fill="#6a86ff"/>
</g>
</svg>`;

  /* ------------------------------------------------------------- projects ---- */
  const PROJECTS = {
    "asean-health": {
      name: "ASEAN Health Statistics Visualization",
      tag: "Data Visualization",
      subtitle: "COS30045 — Swinburne University of Technology (Australia)",
      desc: "Interactive data visualization of ASEAN health statistics — life expectancy, birth rates and population demographics. Built with D3.js; data sources include OECD Health Statistics, Statista, Macrotrends, World Bank and ASEAN Data.",
      tech: ["D3.js", "HTML5", "JavaScript", "Git", "GitHub"],
      links: [
        { label: "GitHub", href: "https://github.com/Treasure-Mei-box/COS30045---Data-Visualization-" },
        { label: "Live demo", href: "https://cos30045datavisualization.vercel.app" },
      ],
      demo: DEMO_SVG_ASEAN,
    },
    "air-quality": {
      name: "Air Quality Analytics (COS30049)",
      tag: "Data Engineering / ML",
      subtitle: "Cross-country air quality analytics for Malaysia, Singapore and Thailand — 2014–2024",
      desc: "Reproducible data pipeline for cross-country air quality analytics across Malaysia, Singapore and Thailand, from 2014 to 2024. Random Forest regression (AQI), Random Forest classification and DBSCAN clustering — EDA and visualizations in Jupyter notebooks.",
      tech: ["Python", "Pandas", "SQL", "Random Forest", "DBSCAN", "XGBoost", "Jupyter", "Git"],
      links: [
        { label: "GitHub", href: "https://github.com/Treasure-Mei-box/COS30049-Computing-Technology-Innovation-Project-by-YSA" },
      ],
      demo: DEMO_SVG_AQ,
    },
    "cicd-azure": {
      name: "Online Convenience Store System",
      tag: "CI/CD & DevOps",
      subtitle: "SWE40006 — full pipeline to Azure App Service",
      desc: "A Python web app for an online convenience store, with a full CI/CD pipeline: lint + tests, Docker build, images in GHCR, smoke tests, deploy to Azure YLS-TEST and YLS-PROD, with automatic rollback on failure.",
      tech: ["Python", "Web app", "GitHub Actions", "Docker", "Azure", "GHCR"],
      links: [
        { label: "GitHub", href: "https://github.com/Treasure-Mei-box/SWE40006-Group-Project" },
      ],
      demo: DEMO_SVG_CICD,
    },
    "oop-csharp": {
      name: "Object Oriented Programming",
      tag: "C#",
      subtitle: "COS20007 — OOP projects and exercises",
      desc: "Object-oriented programming projects and exercises — classes, inheritance and data structures in C#.",
      tech: ["C#", "OOP"],
      links: [
        { label: "GitHub", href: "https://github.com/Treasure-Mei-box/COS20007" },
      ],
      demo: DEMO_SVG_OOP,
    },
    "cos30015-coursework": {
      name: "COS30015 — Object Oriented Programming",
      tag: "Coursework",
      subtitle: "Assignments, practical project submissions and course materials",
      desc: "Object Oriented Programming coursework — assignment and practical project submissions with supporting materials, delivered as part of COS30015 at INTI Subang.",
      tech: ["C#", "Coursework"],
      links: [
        { label: "GitHub", href: "https://github.com/Treasure-Mei-box/COS30015" },
      ],
    },
    "route-finding": {
      name: "Tree-Based Search Algorithms (Route Finding)",
      tag: "Artificial Intelligence",
      subtitle: "COS30019 Assignment 2A — Introduction to AI",
      desc: "Assignment 2A for Introduction to AI — tree-based search algorithms for route finding in Python.",
      tech: ["Python", "Trees", "Search"],
      links: [
        { label: "GitHub", href: "https://github.com/Treasure-Mei-box/cos30019-assignment-2a" },
      ],
      demo: DEMO_SVG_TREE,
    },
    "python-minis": {
      name: "Python Mini Projects",
      tag: "Python",
      subtitle: "Learning-by-doing mini programs — loops, functions, data structures",
      desc: "A collection of mini programs coding my learning journey — simple scripts and exercises covering basic programming concepts in Python.",
      tech: ["Python", "Mini projects"],
      links: [
        { label: "GitHub", href: "https://github.com/Treasure-Mei-box/Python" },
      ],
      demo: DEMO_SVG_MINIS,
    },
    "datascienceml": {
      name: "DataScienceML",
      tag: "Data Science",
      subtitle: "Notebook collection — pandas and matplotlib explorations",
      desc: "Notebook explorations: Day 1–2, Day 3, Pandas and matplotlib — my data science and ML learning notes in Jupyter notebooks.",
      tech: ["Python", "pandas", "matplotlib", "Jupyter"],
      links: [
        { label: "GitHub", href: "https://github.com/Treasure-Mei-box/DataScienceML" },
      ],
      demo: DEMO_SVG_NOTEBOOKS,
    },
  };

  /* ---------------------------------------------------------------- modal ---- */
  function openProject(id) {
    const p = PROJECTS[id];
    if (!p) return;
    q("#modal-tag").textContent = p.tag;
    q("#modal-title").textContent = p.name;
    q("#modal-subtitle").textContent = p.subtitle;
    q("#modal-desc").textContent = p.desc;
    q("#modal-tech").innerHTML = p.tech.map((t) => `<span class="skill-pill">${t}</span>`).join("");
    q("#modal-links").innerHTML = p.links
      .map((l) => `<a class="btn btn--ghost" href="${l.href}" target="_blank" rel="noopener">${l.label} ↗</a>`)
      .join("");
    q("#modal-demo").innerHTML = p.demo;
    q("#project-modal").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeProject() {
    const modal = q("#project-modal");
    if (!modal.classList.contains("open")) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function initModal() {
    const modal = q("#project-modal");
    const closeBtn = q("#modalClose");
    if (closeBtn) closeBtn.addEventListener("click", closeProject);
    if (!modal) return;
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeProject();
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeProject();
    });
  }

  /* ------------------------------------------------------------- init ---- */
  function initHeroParticles() {
    const canvas = q(".hero-particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const colors = ["#4cdfb0", "#f2b53a", "#6a86ff", "#7aa3ff"];
    let width = 0;
    let height = 0;
    const particles = [];

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    resize();

    const spawn = () => {
      particles.length = 0;
      const count = Math.max(16, Math.floor((width * height) / 9000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 3 + 1.2,
          opacity: Math.random() * 0.45 + 0.25,
          color: colors[i % colors.length],
          phase: Math.random() * Math.PI * 2,
        });
      }
    };
    spawn();

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = performance.now() * 0.0011;
      for (const p of particles) {
        p.vx += (Math.sin(t + p.phase + p.y * 0.02) - 0.5) * 0.0006;
        p.vy += (Math.cos(t + p.phase + p.x * 0.02) - 0.5) * 0.0006;
        p.vx *= 0.996;
        p.vy *= 0.996;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        const r = p.size * dpr;
        const grad = ctx.createRadialGradient(p.x * dpr, p.y * dpr, 0, p.x * dpr, p.y * dpr, r);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, "transparent");
        ctx.globalAlpha = p.opacity * (0.55 + 0.45 * Math.abs(Math.sin(t + p.phase)));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x * dpr, p.y * dpr, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener("resize", resize);
  }

  function initHero() {
    const avatar = q(".hero-avatar");
    if (avatar) {
      avatar.style.animation =
        "heroEnter 0.9s cubic-bezier(.2,.8,.2,1) 1.0s forwards, avatarFloat 4.2s ease-in-out infinite alternate";
    }
    typeText(q(".hero-name-text"), "Yadanar Theint", 58);
    setTimeout(() => typeText(q(".hero-sub-text"), "Data Science • AI Engineering", 60), 1000);
  }

  function initProjectGrid() {
    const grid = q("#project-grid");
    if (!grid) return;
    Object.entries(PROJECTS).forEach(([id, p]) => {
      const card = document.createElement("article");
      card.className = "project-card reveal";
      card.id = `project-card-${id}`;
      card.dataset.project = id;
      card.tabIndex = 0;
      card.innerHTML = `
        <div class="project-card__thumb"></div>
        <div class="project-card__content">
          <span class="project-tag">${p.tag}</span>
          <h3 class="project-name">${p.name}</h3>
          <p class="project-desc">${p.desc}</p>
          <div class="project-meta">
            ${p.tech.map((t) => `<span class="tech-chip">${t}</span>`).join("")}
            <div class="project-footer">
              ${p.links.map((l) => `<a href="${l.href}" target="_blank" rel="noopener">${l.label} ↗</a>`).join("")}
            </div>
          </div>
        </div>`;
      grid.appendChild(card);
    });
    qa("[data-project]").forEach((card) => {
      card.addEventListener("click", () => openProject(card.dataset.project));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProject(card.dataset.project);
        }
      });
    });
  }

  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    qa(".reveal").forEach((el) => observer.observe(el));
  }

  function initStaggered() {
    qa(".stagger").forEach((container) => {
      const children = qa(".reveal", container);
      if (!children.length) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 70}ms`;
          child.classList.add("in");
        });
        observer.unobserve(entry.target);
      }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
      observer.observe(container);
    });
  }

  function initProgressBar() {
    const bar = q("#progress");
    if (!bar) return;
    const total = document.body.scrollHeight - window.innerHeight;
    window.addEventListener("scroll", () => {
      const pct = total <= 0 ? 0 : Math.min(1, window.scrollY / total);
      bar.style.width = `${pct * 100}%`;
    }, { passive: true });
  }

  function initSkillBars() {
    qa(".skill-bar").forEach((bar) => {
      const fill = bar.querySelector(".skill-bar__fill");
      const pct = Number(fill?.getAttribute("data-pct") ?? 0);
      const pctEl = bar.querySelector(".skill-pct");
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (fill) fill.style.setProperty("--pct", `${pct}%`);
        bar.classList.add("in");
        animateValue(pctEl, 0, pct, 950);
      }, { threshold: 0.5, rootMargin: "0px 0px -80px 0px" });
      observer.observe(bar);
    });
  }

  function initSkillMeters() {
    const C = 314.16;
    qa(".skill-meter").forEach((meter) => {
      const filled = meter.querySelector(".arc--filled");
      const valueEl = meter.querySelector(".meter-value");
      const pct = Number(meter.getAttribute("data-pct") || 0);
      if (filled) filled.style.setProperty("--dash", `${(C * (1 - pct / 100)).toFixed(2)}px`);
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        meter.classList.add("in");
        animateValue(valueEl, 0, pct, 1100);
      }, { threshold: 0.5, rootMargin: "0px 0px -80px 0px" });
      observer.observe(meter);
    });
  }

  function initTimeline() {
    qa(".timeline-item").forEach((item) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }, { threshold: 0.2, rootMargin: "0px 0px -40px 0px" });
      observer.observe(item);
    });
  }

  function initMobileMenu() {
    const btn = q("#navMenu");
    const menu = q("#mobileMenu");
    const close = q("#mobileMenuClose");
    if (!btn || !menu || !close) return;
    const toggle = () => {
      menu.classList.toggle("open");
      btn.classList.toggle("active");
    };
    btn.addEventListener("click", toggle);
    close.addEventListener("click", toggle);
    qa(".mobile-link", menu).forEach((l) => l.addEventListener("click", toggle));
  }

  function initScrollBehavior() {
    const nav = q("#nav");
    if (!nav) return;
    let lastScroll = 0;
    let ticking = false;

    const markActive = () => {
      const targets = [];
      qa(".nav-link").forEach((a) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) targets.push({ a, top: target.getBoundingClientRect().top });
      });
      let active = null;
      targets.forEach((t) => {
        if (t.top <= 120) active = t;
      });
      qa(".nav-link").forEach((a) => {
        const isActive = active && a === active.a;
        a.classList.toggle("active", isActive);
      });
    };

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const scrolled = window.scrollY;
        nav.classList.toggle("scrolled", scrolled > 48);
        if (scrolled > lastScroll + 90 && scrolled > 220) nav.classList.add("out");
        else nav.classList.remove("out");
        lastScroll = scrolled;
        markActive();
      });
    }, { passive: true });

    qa('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        q("#mobileMenu").classList.remove("open");
        q("#navMenu").classList.remove("active");
      });
    });
  }

  function initContactForm() {
    const form = q("#contactForm");
    const fields = qa(".contact-form .form-field");
    const nameF = q("#c-name");
    const emailF = q("#c-email");
    const subjectF = q("#c-subject");
    const messageF = q("#c-message");
    const status = q("#formStatus");
    if (!form || !nameF || !emailF || !subjectF || !messageF) return;

    const isValid = (el) => {
      const v = el.value.trim();
      if (!v) return false;
      if (el.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return false;
      return true;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      fields.forEach((el) => {
        const good = isValid(el);
        el.classList.toggle("invalid", !good);
        el.classList.toggle("shake", !good);
        if (!good) ok = false;
      });
      if (!ok) return;

      const body = [
        `Name: ${nameF.value.trim()}`,
        `Email: ${emailF.value.trim()}`,
        "",
        messageF.value.trim(),
      ].join("\n");
      window.location.href =
        `mailto:yadanartheint2412@gmail.com?subject=${encodeURIComponent(subjectF.value.trim())}&body=${encodeURIComponent(body)}`;

      status.textContent = "Your message is on its way — I'll get back to you soon!";
      status.classList.add("sent");
    });
  }

  function initCopyEmail() {
    const btn = q("#copyEmail");
    const label = q("#copyLabel");
    if (!btn || !label) return;
    const addr = btn.dataset.email;
    btn.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(addr); } catch { /* ignore */ }
      btn.classList.add("copied");
      label.textContent = "Copied!";
      setTimeout(() => {
        btn.classList.remove("copied");
        label.textContent = "Copy email";
      }, 2200);
    });
  }

  function initScrollTop() {
    const btn = q("#scrollTop");
    if (!btn) return;
    window.addEventListener("scroll", () => {
      btn.style.display = window.scrollY > 520 ? "flex" : "none";
    }, { passive: true });
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initAll() {
    initProgressBar();
    initHeroParticles();
    initHero();
    initProjectGrid();
    initReveal();
    initStaggered();
    initModal();
    initSkillBars();
    initSkillMeters();
    initTimeline();
    initMobileMenu();
    initScrollBehavior();
    initContactForm();
    initCopyEmail();
    initScrollTop();
  }

  initAll();
})();
