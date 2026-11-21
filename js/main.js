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
    const cursor = target.parentElement?.querySelector(".typing-cursor");
    let i = 0;
    const tick = () => {
      target.textContent = text.slice(0, ++i);
      if (i < text.length) {
        setTimeout(tick, speed);
      } else if (cursor) {
        cursor.classList.add("is-done");
      }
    };
    setTimeout(tick, 460);
  };

  /* --------------------------------------------------- animated demos ---- */
  const DEMO_SVG_ASEAN = `
<svg class="modal-demo" viewBox="0 0 640 360" role="img" aria-label="Illustrative animated ASEAN health statistics chart">
<style type="text/css">
.bar { fill: url(#aseanBar); opacity: 0; animation: rise 2.8s ease-out var(--d) both; }
.dot { fill: #f4c26b; opacity: 0; animation: rise 2.2s ease-out var(--d) both; }
.v { fill: #c96a45; opacity: 0.55; }
.pulse { animation: pulse 2.2s ease-in-out infinite alternate; }
@keyframes rise { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0%, 100% { opacity: 0.3 } 50% { opacity: 1 } }
</style>
<defs>
<linearGradient id="aseanBar" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#e8894a"/><stop offset="1" stop-color="#7a3b1f"/>
</linearGradient>
</defs>
<g class="v"><circle cx="596" cy="36" r="20"/><circle cx="564" cy="118" r="24"/><circle cx="46" cy="62" r="18"/><circle cx="584" cy="242" r="16"/></g>
<text x="18" y="22" font-family="JetBrains Mono, monospace" font-size="11" fill="#cbb49c">Illustrative trend — ASEAN health stats (demo)</text>
<rect class="bar" x="54" y="210" width="22" height="80" rx="3" style="--d:0.05s"/>
<rect class="bar" x="108" y="160" width="22" height="130" rx="3" style="--d:0.4s"/>
<rect class="bar" x="162" y="196" width="22" height="102" rx="3" style="--d:0.75s"/>
<rect class="bar" x="216" y="126" width="22" height="152" rx="3" style="--d:1.1s"/>
<rect class="bar" x="270" y="234" width="22" height="64" rx="3" style="--d:1.45s"/>
<rect class="bar" x="324" y="138" width="22" height="124" rx="3" style="--d:1.8s"/>
<rect class="bar" x="378" y="206" width="22" height="96" rx="3" style="--d:2.15s"/>
<g class="dot"><circle class="pulse" cx="54" cy="298" r="3"/><circle class="pulse" cx="108" cy="282" r="3"/><circle class="pulse" cx="162" cy="312" r="3"/><circle class="pulse" cx="216" cy="272" r="3"/><circle class="pulse" cx="270" cy="326" r="3"/><circle class="pulse" cx="324" cy="280" r="3"/><circle class="pulse" cx="378" cy="298" r="3"/></g>
<g class="dot"><circle class="pulse" cx="54" cy="324" r="2.5"/><circle class="pulse" cx="108" cy="312" r="2.5"/><circle class="pulse" cx="162" cy="336" r="2.5"/><circle class="pulse" cx="216" cy="292" r="2.5"/><circle class="pulse" cx="270" cy="342" r="2.5"/><circle class="pulse" cx="324" cy="298" r="2.5"/><circle class="pulse" cx="378" cy="320" r="2.5"/></g>
<text x="54" y="352" font-family="JetBrains Mono, monospace" font-size="9" fill="#cbb49c">Country</text>
<text x="270" y="352" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" fill="#cbb49c">Country</text>
</svg>`;

  const DEMO_SVG_AQ = `
<svg class="modal-demo" viewBox="0 0 640 360" role="img" aria-label="Illustrative animated air quality analytics">
<style type="text/css">
.aq-bar { transform-origin: bottom; animation: bounce 3.2s cubic-bezier(.45,.5,.55,.5) infinite; }
@keyframes bounce { 0% { transform: scaleY(0.45) } 22% { transform: scaleY(1.05) } 55% { transform: scaleY(0.72) } 100% { transform: scaleY(1) } }
.tw { fill: #f4c26b; opacity: 0; animation: twinkle 2.2s ease-in-out infinite alternate; }
@keyframes twinkle { 0%, 100% { opacity: 0 } 50% { opacity: 1 } }
.grid { stroke: #e8894a; stroke-width: 1; opacity: 0.14; }
.title { fill: #cbb49c; font-size: 10; }
</style>
<path class="grid" d="M0 160h640"/><path class="grid" d="M0 176h640"/><path class="grid" d="M0 192h640"/><path class="grid" d="M0 208h640"/>
<text class="title" x="16" y="20">Air quality analytics — illustrative bars (AQI style)</text>
<g>
<rect class="aq-bar" x="34" y="220" width="12" height="100" fill="#c96a45" opacity="0.85"/>
<rect class="aq-bar" x="94" y="238" width="12" height="102" fill="#c96a45" opacity="0.85"/>
<rect class="aq-bar" x="154" y="204" width="12" height="96" fill="#e8894a" opacity="0.85"/>
<rect class="aq-bar" x="214" y="256" width="12" height="86" fill="#f4c26b" opacity="0.85"/>
<rect class="aq-bar" x="274" y="192" width="12" height="108" fill="#c96a45" opacity="0.85"/>
<rect class="aq-bar" x="334" y="246" width="12" height="92" fill="#e8894a" opacity="0.85"/>
<rect class="aq-bar" x="394" y="228" width="12" height="100" fill="#f4c26b" opacity="0.85"/>
<rect class="aq-bar" x="454" y="206" width="12" height="98" fill="#c96a45" opacity="0.85"/>
<rect class="aq-bar" x="514" y="262" width="12" height="84" fill="#e8894a" opacity="0.85"/>
<rect class="aq-bar" x="574" y="234" width="12" height="98" fill="#f4c26b" opacity="0.85"/>
</g>
<g class="tw">
<circle cx="80" cy="80" r="2.5"/><circle cx="150" cy="130" r="2"/><circle cx="270" cy="40" r="2.5"/><circle cx="390" cy="170" r="1.5"/><circle cx="510" cy="100" r="2"/>
<circle cx="580" cy="186" r="2.5"/><circle cx="120" cy="300" r="1.5"/><circle cx="440" cy="320" r="2"/><circle cx="20" cy="150" r="2"/>
</g>
</svg>`;

  const DEMO_SVG_CICD = `
<svg class="modal-demo" viewBox="0 0 640 360" role="img" aria-label="Illustrative animated Azure CI/CD pipeline">
<style type="text/css">
.pipe-line { stroke: #e8894a; stroke-width: 1.5; fill: none; stroke-dasharray: 90; stroke-dashoffset: 90; opacity: .3; stroke-linecap: round; }
.flow { fill: none; stroke: #f4c26b; stroke-width: 2; animation: slide 3.6s linear infinite; stroke-linecap: round; }
.stage { opacity: 0; animation: pop 1.3s cubic-bezier(.34,1.56,.64,1) var(--d) forwards; }
.core { fill: #e8894a; }
@keyframes pop { 50% { transform: scale(1.06) translateY(-3px); } to { opacity: 1 } }
@keyframes slide { to { stroke-dashoffset: 0 } }
</style>
<text class="title" x="18" y="22" font-family="JetBrains Mono, monospace" font-size="10" fill="#cbb49c">GitHub Actions → Docker → GHCR → Azure — animated</text>
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
<text class="title" x="300" y="340" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" fill="#cbb49c">Code → check → pack → deploy (auto rollback on failure)</text>
</svg>`;

  const DEMO_SVG_TRAFFIC = `
<svg class="modal-demo" viewBox="0 0 640 360" role="img" aria-label="Illustrative animated traffic forecasting dashboard">
<style type="text/css">
.flowline { fill: none; stroke: #e8894a; stroke-width: 2.4; stroke-linecap: round; stroke-dasharray: 560; stroke-dashoffset: 560; animation: drawLine 3s ease-out .2s forwards; }
.pred { fill: none; stroke: #f4c26b; stroke-width: 2; stroke-dasharray: 6 8; stroke-linecap: round; opacity: 0; animation: fadeIn 1.4s ease 1.5s forwards; }
.route { fill: none; stroke: #c96a45; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 6 10; animation: slideDash 2.6s linear infinite; }
.node { fill: #f4c26b; opacity: 0; animation: nodePop .7s ease var(--d) forwards; }
.grid { stroke: rgba(232,137,74,.16); stroke-width: 1; }
.axis { fill: #a38a72; font-family: 'JetBrains Mono', monospace; font-size: 9px; }
@keyframes drawLine { to { stroke-dashoffset: 0 } }
@keyframes fadeIn { to { opacity: .95 } }
@keyframes slideDash { to { stroke-dashoffset: -32 } }
@keyframes nodePop { 50% { r: 7 } to { opacity: 1 } }
</style>
<text x="18" y="22" font-family="'JetBrains Mono', monospace" font-size="10" fill="#cbb49c">LSTM traffic forecast — Melbourne SCATS data</text>
<g class="grid">
<path d="M24 90h592"/><path d="M24 140h592"/><path d="M24 190h592"/><path d="M24 240h592"/><path d="M24 290h592"/>
</g>
<path class="flowline" d="M28 260 C 92 150, 150 272, 214 168 S 330 96, 392 196 S 512 256, 612 116"/>
<path class="pred" d="M392 196 C 452 132, 506 158, 612 84"/>
<circle class="node" cx="28" cy="260" r="5" style="--d:.6s"/>
<circle class="node" cx="214" cy="168" r="5" style="--d:1.1s"/>
<circle class="node" cx="392" cy="196" r="5" style="--d:1.6s"/>
<circle class="node" cx="612" cy="116" r="5" style="--d:2.1s"/>
<path class="route" d="M48 324 H 178 V 300 H 312 V 322 H 470 V 296 H 596"/>
<circle cx="48" cy="324" r="4" fill="#c96a45"/><circle cx="596" cy="296" r="4" fill="#c96a45"/>
<text class="axis" x="28" y="278">actual</text>
<text class="axis" x="500" y="70">predicted</text>
<text class="axis" x="48" y="344">A* route recommendation</text>
</svg>`;

  const DEMO_SVG_LOCAL_SHOP = `
<svg class="modal-demo" viewBox="0 0 640 360" role="img" aria-label="Illustrative animated e-commerce storefront and cart">
<style type="text/css">
.win { opacity: 0; animation: windowIn .8s ease .1s forwards; }
.card { opacity: 0; animation: cardIn .7s cubic-bezier(.2,.8,.2,1) var(--d) forwards; }
.row { opacity: 0; animation: rowIn .6s ease var(--d) forwards; }
.btn { animation: btnPulse 2.4s ease-in-out 1.5s infinite; }
@keyframes windowIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
@keyframes cardIn { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
@keyframes rowIn { from { opacity: 0; transform: translateX(10px) } to { opacity: 1; transform: none } }
@keyframes btnPulse { 50% { opacity: .78 } }
</style>
<g class="win">
<rect x="20" y="24" width="600" height="310" rx="15" fill="#241811" stroke="rgba(255,233,206,.16)"/>
<path d="M20 52h600" stroke="rgba(255,233,206,.12)"/>
<circle cx="40" cy="38" r="4" fill="#c4553a"/><circle cx="55" cy="38" r="4" fill="#f4c26b"/><circle cx="70" cy="38" r="4" fill="#e8894a"/>
<text x="96" y="42" font-family="'JetBrains Mono', monospace" font-size="10" fill="#cbb49c">Your Local Shop — React + FastAPI storefront</text>
</g>
<g class="card" style="--d:.45s">
<rect x="40" y="72" width="348" height="238" rx="12" fill="#322116" stroke="rgba(255,233,206,.1)"/>
<rect x="56" y="88" width="150" height="96" rx="9" fill="#3d2a1c"/>
<rect x="218" y="88" width="150" height="96" rx="9" fill="#3d2a1c"/>
<rect x="56" y="196" width="150" height="96" rx="9" fill="#3d2a1c"/>
<rect x="218" y="196" width="150" height="96" rx="9" fill="#3d2a1c"/>
<circle cx="86" cy="118" r="18" fill="#e8894a" opacity=".85"/>
<rect x="224" y="102" width="96" height="9" rx="4" fill="#f4c26b" opacity=".8"/>
<rect x="224" y="122" width="70" height="7" rx="3" fill="#cbb49c" opacity=".5"/>
<rect x="72" y="146" width="58" height="8" rx="4" fill="#cbb49c" opacity=".7"/>
<rect x="234" y="142" width="58" height="8" rx="4" fill="#cbb49c" opacity=".7"/>
<rect x="56" y="214" width="110" height="8" rx="4" fill="#f4c26b" opacity=".8"/>
<rect x="56" y="234" width="80" height="7" rx="3" fill="#cbb49c" opacity=".5"/>
<rect x="56" y="258" width="150" height="18" rx="9" fill="#e8894a" opacity=".22"/>
<rect x="218" y="214" width="110" height="8" rx="4" fill="#cbb49c" opacity=".7"/>
<rect x="218" y="234" width="80" height="7" rx="3" fill="#cbb49c" opacity=".5"/>
<rect x="218" y="258" width="150" height="18" rx="9" fill="#e8894a" opacity=".22"/>
</g>
<g class="card" style="--d:.9s">
<rect x="404" y="72" width="196" height="238" rx="12" fill="#2a1c13" stroke="rgba(232,137,74,.32)"/>
<text x="422" y="96" font-family="'JetBrains Mono', monospace" font-size="10" fill="#f4c26b">CART · 3 ITEMS</text>
<g class="row" style="--d:1.15s">
<rect x="422" y="112" width="28" height="28" rx="6" fill="#3d2a1c"/><rect x="460" y="118" width="80" height="7" rx="3" fill="#cbb49c" opacity=".65"/><text x="566" y="128" font-family="'JetBrains Mono', monospace" font-size="9" fill="#f7ead9">$24</text>
</g>
<g class="row" style="--d:1.3s">
<rect x="422" y="150" width="28" height="28" rx="6" fill="#3d2a1c"/><rect x="460" y="156" width="66" height="7" rx="3" fill="#cbb49c" opacity=".65"/><text x="566" y="166" font-family="'JetBrains Mono', monospace" font-size="9" fill="#f7ead9">$18</text>
</g>
<g class="row" style="--d:1.45s">
<rect x="422" y="188" width="28" height="28" rx="6" fill="#3d2a1c"/><rect x="460" y="194" width="74" height="7" rx="3" fill="#cbb49c" opacity=".65"/><text x="562" y="204" font-family="'JetBrains Mono', monospace" font-size="9" fill="#f7ead9">$32</text>
</g>
<path d="M422 226h160" stroke="rgba(255,233,206,.14)" stroke-dasharray="3 5"/>
<text x="422" y="248" font-family="'JetBrains Mono', monospace" font-size="9" fill="#a38a72">TOTAL</text>
<text x="546" y="249" font-family="'JetBrains Mono', monospace" font-size="12" fill="#f4c26b">$74</text>
<rect class="btn" x="422" y="262" width="160" height="28" rx="14" fill="#e8894a"/>
<text x="502" y="280" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9.5" fill="#24130a">Checkout →</text>
</g>
</svg>`;

  const DEMO_SVG_PROPERTY = `
<svg class="modal-demo" viewBox="0 0 640 360" role="img" aria-label="Illustrative animated property market dashboard">
<style type="text/css">
.kpi { opacity: 0; animation: riseIn .7s cubic-bezier(.2,.8,.2,1) var(--d) forwards; }
.bar { transform-origin: bottom; transform: scaleY(0); animation: growBar 1.1s cubic-bezier(.2,.8,.2,1) var(--d) forwards; }
.trend { fill: none; stroke: #f4c26b; stroke-width: 2.2; stroke-linecap: round; stroke-dasharray: 320; stroke-dashoffset: 320; animation: drawTrend 2.6s ease .5s forwards; }
.dot { fill: #f4c26b; opacity: 0; animation: appear .5s ease var(--d) forwards; }
@keyframes riseIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
@keyframes growBar { to { transform: scaleY(1) } }
@keyframes drawTrend { to { stroke-dashoffset: 0 } }
@keyframes appear { to { opacity: 1 } }
</style>
<text x="20" y="22" font-family="'JetBrains Mono', monospace" font-size="10" fill="#cbb49c">Melbourne property insights — Tableau dashboard</text>
<g class="kpi" style="--d:.15s">
<rect x="24" y="38" width="184" height="70" rx="10" fill="#322116" stroke="rgba(255,233,206,.12)"/>
<text x="40" y="60" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#a38a72">MEDIAN PRICE</text>
<text x="40" y="88" font-family="'JetBrains Mono', monospace" font-size="20" fill="#f4c26b">$1.12m</text>
</g>
<g class="kpi" style="--d:.3s">
<rect x="224" y="38" width="184" height="70" rx="10" fill="#322116" stroke="rgba(255,233,206,.12)"/>
<text x="240" y="60" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#a38a72">CAPITAL GROWTH</text>
<text x="240" y="88" font-family="'JetBrains Mono', monospace" font-size="20" fill="#e8894a">+6.4%</text>
</g>
<g class="kpi" style="--d:.45s">
<rect x="424" y="38" width="192" height="70" rx="10" fill="#322116" stroke="rgba(255,233,206,.12)"/>
<text x="440" y="60" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#a38a72">RENTAL YIELD</text>
<text x="440" y="88" font-family="'JetBrains Mono', monospace" font-size="20" fill="#f7ead9">3.2%</text>
</g>
<g class="kpi" style="--d:.55s">
<rect x="24" y="126" width="376" height="206" rx="10" fill="#241811" stroke="rgba(255,233,206,.12)"/>
<path d="M44 296h336" stroke="rgba(255,233,206,.16)"/>
<path d="M44 260h336" stroke="rgba(255,233,206,.07)"/>
<path d="M44 220h336" stroke="rgba(255,233,206,.07)"/>
<path d="M44 180h336" stroke="rgba(255,233,206,.07)"/>
<rect class="bar" x="64" y="228" width="26" height="68" rx="3" fill="#e8894a" style="--d:.7s"/>
<rect class="bar" x="110" y="200" width="26" height="96" rx="3" fill="#f4c26b" style="--d:.85s"/>
<rect class="bar" x="156" y="240" width="26" height="56" rx="3" fill="#c96a45" style="--d:1s"/>
<rect class="bar" x="202" y="186" width="26" height="110" rx="3" fill="#e8894a" style="--d:1.15s"/>
<rect class="bar" x="248" y="214" width="26" height="82" rx="3" fill="#f4c26b" style="--d:1.3s"/>
<rect class="bar" x="294" y="170" width="26" height="126" rx="3" fill="#c96a45" style="--d:1.45s"/>
<rect class="bar" x="340" y="194" width="26" height="102" rx="3" fill="#e8894a" style="--d:1.6s"/>
<text x="44" y="156" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#a38a72">MEDIAN PRICE BY SUBURB</text>
</g>
<g class="kpi" style="--d:.65s">
<rect x="416" y="126" width="200" height="206" rx="10" fill="#241811" stroke="rgba(255,233,206,.12)"/>
<text x="434" y="150" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#a38a72">PRICE TREND</text>
<path class="trend" d="M434 290 L 466 262 L 498 270 L 530 232 L 562 240 L 598 196"/>
<circle class="dot" cx="434" cy="290" r="3" style="--d:1.6s"/><circle class="dot" cx="498" cy="270" r="3" style="--d:1.9s"/><circle class="dot" cx="562" cy="240" r="3" style="--d:2.2s"/><circle class="dot" cx="598" cy="196" r="3" style="--d:2.5s"/>
<text x="434" y="314" font-family="'JetBrains Mono', monospace" font-size="8" fill="#a38a72">2021 → 2026</text>
</g>
</svg>`;

  const DEMO_SVG_ZOO = `
<svg class="modal-demo" viewBox="0 0 640 360" role="img" aria-label="Illustrative animated IoT zoo monitoring dashboard">
<style type="text/css">
.panel { opacity: 0; animation: panelIn .7s cubic-bezier(.2,.8,.2,1) var(--d) forwards; }
.node { opacity: 0; animation: nodeIn .6s ease var(--d) forwards; }
.ping { fill: none; stroke: #f4c26b; stroke-width: 1.2; opacity: 0; animation: ping 2.4s ease-out infinite; transform-origin: center; }
.wave { fill: none; stroke: #e8894a; stroke-width: 2; stroke-linecap: round; stroke-dasharray: 260; stroke-dashoffset: 260; animation: drawWave 3s ease .8s infinite; }
@keyframes panelIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
@keyframes nodeIn { 50% { r: 8 } to { opacity: 1 } }
@keyframes ping { 0% { opacity: .7; r: 10 } 100% { opacity: 0; r: 28 } }
@keyframes drawWave { 0% { stroke-dashoffset: 260 } 70% { stroke-dashoffset: 0 } 100% { stroke-dashoffset: -260 } }
</style>
<text x="20" y="22" font-family="'JetBrains Mono', monospace" font-size="10" fill="#cbb49c">SMART ZOO — IoT monitoring &amp; RFID access</text>
<g class="panel" style="--d:.15s">
<rect x="24" y="38" width="188" height="140" rx="11" fill="#322116" stroke="rgba(255,233,206,.12)"/>
<text x="40" y="60" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#a38a72">TEMPERATURE</text>
<text x="40" y="88" font-family="'JetBrains Mono', monospace" font-size="19" fill="#f4c26b">27.4°C</text>
<path class="wave" d="M40 118 L 62 108 L 84 122 L 106 100 L 128 116 L 150 104 L 176 112"/>
</g>
<g class="panel" style="--d:.3s">
<rect x="226" y="38" width="188" height="140" rx="11" fill="#322116" stroke="rgba(255,233,206,.12)"/>
<text x="242" y="60" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#a38a72">WATER QUALITY</text>
<text x="242" y="88" font-family="'JetBrains Mono', monospace" font-size="19" fill="#e8894a">pH 7.2</text>
<rect x="242" y="106" width="150" height="10" rx="5" fill="#241811"/>
<rect x="242" y="106" width="118" height="10" rx="5" fill="#f4c26b"/>
<text x="242" y="132" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#a38a72">turbidity · safe range</text>
</g>
<g class="panel" style="--d:.45s">
<rect x="428" y="38" width="188" height="140" rx="11" fill="#322116" stroke="rgba(255,233,206,.12)"/>
<text x="444" y="60" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#a38a72">RFID ACCESS</text>
<rect x="444" y="72" width="62" height="40" rx="7" fill="#e8894a" opacity=".2" stroke="rgba(232,137,74,.45)"/>
<text x="475" y="97" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#f4c26b">ZONE A</text>
<rect x="518" y="72" width="62" height="40" rx="7" fill="#e8894a" opacity=".2" stroke="rgba(232,137,74,.45)"/>
<text x="549" y="97" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#f4c26b">ZONE B</text>
<text x="444" y="132" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#a38a72">2 entries · all verified</text>
</g>
<g class="panel" style="--d:.6s">
<rect x="24" y="194" width="592" height="140" rx="11" fill="#241811" stroke="rgba(255,233,206,.12)"/>
<text x="40" y="216" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#a38a72">SENSOR NETWORK</text>
</g>
<g>
<path d="M110 274 L 210 246 L 310 282 L 410 240 L 510 276 L 574 238" fill="none" stroke="rgba(232,137,74,.32)" stroke-width="1.4" stroke-dasharray="4 6"/>
<circle class="node" cx="110" cy="274" r="6" fill="#e8894a" style="--d:1s"/><circle class="ping" cx="110" cy="274" r="10" style="animation-delay:1s"/>
<circle class="node" cx="210" cy="246" r="6" fill="#f4c26b" style="--d:1.2s"/><circle class="ping" cx="210" cy="246" r="10" style="animation-delay:1.2s"/>
<circle class="node" cx="310" cy="282" r="6" fill="#c96a45" style="--d:1.4s"/><circle class="ping" cx="310" cy="282" r="10" style="animation-delay:1.4s"/>
<circle class="node" cx="410" cy="240" r="6" fill="#e8894a" style="--d:1.6s"/><circle class="ping" cx="410" cy="240" r="10" style="animation-delay:1.6s"/>
<circle class="node" cx="510" cy="276" r="6" fill="#f4c26b" style="--d:1.8s"/><circle class="ping" cx="510" cy="276" r="10" style="animation-delay:1.8s"/>
<circle class="node" cx="574" cy="238" r="6" fill="#c96a45" style="--d:2s"/><circle class="ping" cx="574" cy="238" r="10" style="animation-delay:2s"/>
</g>
</svg>`;

  /* ------------------------------------------------------------- projects ---- */
  const PROJECTS = {
    "cicd-azure": {
      name: "Online Convenience Store System",
      tag: "Cloud & DevOps",
      subtitle: "CI/CD pipeline on Microsoft Azure — SWE40006 group project · Nov 2026",
      desc: "Built an automated CI/CD pipeline that lints, tests, containerises and deploys a Flask e-commerce app on every push to main. Enforced an 80% minimum test coverage gate with Pytest plus Flake8 linting, deployed Docker images tagged with the Git commit ID to separate Azure test and production environments, and added smoke tests on /health and /version with automatic rollback when a deployment fails.",
      tech: ["Python", "Flask", "Docker", "GitHub Actions", "Azure App Service", "GHCR", "Pytest", "Flake8"],
      links: [
        { label: "GitHub", href: "https://github.com/Treasure-Mei-box/SWE40006-Group-Project" },
      ],
      demo: DEMO_SVG_CICD,
    },
    "air-quality": {
      name: "AirAware — Air Quality Analytics",
      tag: "Machine Learning",
      subtitle: "AI-powered air quality prediction & analytics platform · 2025",
      desc: "Forecast air quality across Malaysia, Singapore and Thailand using ten years (2014–2024) of AQI and weather data. Cleaned and merged multi-country datasets, performed exploratory analysis to uncover pollution trends, and built Random Forest regression for AQI prediction, Random Forest classification for AQI categories and DBSCAN clustering for regional patterns — compared against XGBoost and K-Means. Results were presented in an interactive React dashboard and technical reports.",
      tech: ["Python", "pandas", "scikit-learn", "XGBoost", "Jupyter", "React", "TypeScript"],
      links: [
        { label: "GitHub", href: "https://github.com/Treasure-Mei-box/COS30049-Computing-Technology-Innovation-Project-by-YSA" },
      ],
      demo: DEMO_SVG_AQ,
    },
    "traffic-route": {
      name: "Traffic-Based Route Guidance System",
      tag: "Deep Learning",
      subtitle: "Deep learning traffic forecasting · COS30019 AI · 2026",
      desc: "Predicted traffic flow at Melbourne (Boroondara) intersections using real VicRoads SCATS traffic data. Built and trained an LSTM deep learning model on GPU in Google Colab, compared it with GRU and Random Forest models, applied preprocessing, feature engineering and model evaluation, then fed the predictions into an A* search algorithm to recommend the fastest routes.",
      tech: ["Python", "TensorFlow / Keras", "LSTM", "GRU", "Random Forest", "Google Colab", "A* Search"],
      links: [
        { label: "GitHub", href: "https://github.com/Treasure-Mei-box/cos30019-assignment-2b" },
      ],
      demo: DEMO_SVG_TRAFFIC,
    },
    "local-shop": {
      name: "Your Local Shop",
      tag: "Full-Stack",
      subtitle: "E-commerce management system · SWE30003 Software Architecture",
      desc: "Built a full-stack store with sign-up/login, a database-backed cart, checkout, order history and profile management. Developed role-based admin dashboards for Staff and Manager users with live order and stock metrics, catalogue management and order-status controls, and designed the relational database and REST API with the team using Git and GitHub.",
      tech: ["React", "Vite", "Python", "FastAPI", "REST APIs", "Relational Database"],
      links: [
        { label: "GitHub", href: "https://github.com/Treasure-Mei-box/SWE30003---SoftwareArchitecture" },
      ],
      demo: DEMO_SVG_LOCAL_SHOP,
    },
    "asean-health": {
      name: "ASEAN Health Statistics",
      tag: "Data Visualization",
      subtitle: "Interactive data visualization · COS30045 · 2024",
      desc: "Built interactive maps, heatmaps and line, radial and bubble charts on life expectancy, birth rates and population across ASEAN. Combined OECD, World Bank and Statista data into a guided data story for policymakers, researchers and the public, using D3.js and GeoJSON.",
      tech: ["D3.js", "JavaScript", "HTML5", "CSS3", "GeoJSON"],
      links: [
        { label: "GitHub", href: "https://github.com/Treasure-Mei-box/COS30045---Data-Visualization-" },
        { label: "Live demo", href: "https://cos30045datavisualization.vercel.app" },
      ],
      demo: DEMO_SVG_ASEAN,
    },
    "melbourne-property": {
      name: "Melbourne Property Insights",
      tag: "BI & Analytics",
      subtitle: "Property market analytics · Tableau + Excel",
      desc: "Analysed property, rental and economic data to compare Melbourne suburbs on median price, capital growth, rental yield and total return. Investigated the impact of interest rates and government policy, then built interactive Tableau dashboards and a one-page infographic for decision-makers.",
      tech: ["Tableau", "Excel", "Data Analysis", "Dashboard Design"],
      links: [],
      demo: DEMO_SVG_PROPERTY,
    },
    "smart-zoo": {
      name: "SMART ZOO",
      tag: "IoT",
      subtitle: "IoT monitoring system · sensors, RFID and cloud dashboards",
      desc: "Designed an IoT system for real-time monitoring of environmental and security conditions, with RFID access control, water quality monitoring and cloud dashboards. Combined IoT sensors and RFID readers with Thingsboard dashboards, containerised services on Docker.",
      tech: ["IoT Sensors", "RFID", "Thingsboard", "Docker", "Cloud Dashboards"],
      links: [],
      demo: DEMO_SVG_ZOO,
    },
  };

  /* ---------------------------------------------------------------- modal ---- */
  let lastFocused = null;

  const anyOverlayOpen = () =>
    q(".modal.open") || q(".cv-modal.open");

  const lockScroll = () => { document.body.style.overflow = "hidden"; };
  const unlockScroll = () => {
    if (!anyOverlayOpen()) document.body.style.overflow = "";
  };

  function openProject(id) {
    const p = PROJECTS[id];
    if (!p) return;
    lastFocused = document.activeElement;
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
    lockScroll();
    q("#modalClose")?.focus();
  }

  function closeProject() {
    const modal = q("#project-modal");
    if (!modal || !modal.classList.contains("open")) return;
    modal.classList.remove("open");
    unlockScroll();
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function initModal() {
    const modal = q("#project-modal");
    const closeBtn = q("#modalClose");
    if (closeBtn) closeBtn.addEventListener("click", closeProject);
    if (!modal) return;
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeProject();
    });
  }

  /* ------------------------------------------------------------- CV modal ---- */
  const CV_SRC = "assets/Yadanar_Theint_CV.pdf#view=FitH&toolbar=1";

  function openCv() {
    const modal = q("#cv-modal");
    const frame = q("#cvFrame");
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.add("open");
    lockScroll();
    if (frame && frame.getAttribute("src") !== CV_SRC) frame.setAttribute("src", CV_SRC);
    q("#cvClose")?.focus();
  }

  function closeCv() {
    const modal = q("#cv-modal");
    const frame = q("#cvFrame");
    if (!modal || !modal.classList.contains("open")) return;
    modal.classList.remove("open");
    unlockScroll();
    if (frame) frame.setAttribute("src", "about:blank");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function initCvModal() {
    const modal = q("#cv-modal");
    if (!modal) return;
    qa("[data-cv-open]").forEach((btn) => btn.addEventListener("click", openCv));
    q("#cvClose")?.addEventListener("click", closeCv);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeCv();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      closeCv();
      closeProject();
    });
  }

  /* ------------------------------------------------------------- init ---- */
  function initHeroParticles() {
    const canvas = q(".hero-particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const colors = ["#e8894a", "#f4c26b", "#c96a45", "#e0a15b"];
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
    typeText(q(".hero-name-text"), "Yadanar Theint", 58);
    setTimeout(() => typeText(q(".hero-sub-text"), "Data Science · Machine Learning · Cloud", 55), 1000);
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
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Open ${p.name}`);
      card.innerHTML = `
        <div class="project-card__thumb" aria-hidden="true">${p.demo}</div>
        <div class="project-card__content">
          <span class="project-tag">${p.tag}</span>
          <h3 class="project-name">${p.name}</h3>
          <p class="project-desc">${p.desc}</p>
          <div class="project-meta">
            ${p.tech.map((t) => `<span class="tech-chip">${t}</span>`).join("")}
            ${p.links.length ? `<div class="project-footer">
              ${p.links.map((l) => `<a href="${l.href}" target="_blank" rel="noopener">${l.label} ↗</a>`).join("")}
            </div>` : ""}
          </div>
        </div>`;
      grid.appendChild(card);
    });
    qa("[data-project]").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return;
        openProject(card.dataset.project);
      });
      card.addEventListener("keydown", (e) => {
        if (e.target.closest("a")) return;
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
    initCvModal();
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
