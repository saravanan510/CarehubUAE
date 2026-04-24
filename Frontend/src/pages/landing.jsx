import { useState, useEffect, useRef } from "react";

/* ── STYLES ─────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

:root {
  --navy: #0b1628;
  --navy-mid: #122040;
  --navy-lt: #1a2f55;
  --gold: #c9a84c;
  --gold-lt: #e8c96d;
  --gold-pale: #fdf6e3;
  --teal: #0ea5a0;
  --teal-lt: #d0f4f3;
  --white: #ffffff;
  --off-white: #f8f7f4;
  --text-muted: #8899bb;
  --border: rgba(201,168,76,0.18);
  --r: 12px;
  --rl: 20px;
}

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--navy);
  color: var(--white);
  font-size: 16px;
  line-height: 1.6;
  overflow-x: hidden;
}

/* ── UTILITIES ── */
.container { max-width: 1140px; margin: 0 auto; padding: 0 24px; }
.serif { font-family: 'Fraunces', serif; }
.gold { color: var(--gold); }
.teal { color: var(--teal); }

/* ── FADE-IN ANIMATION ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: .5; }
  70%  { transform: scale(1.6); opacity: 0; }
  100% { transform: scale(1.6); opacity: 0; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.animate-up { animation: fadeUp .7s ease both; }
.delay-1 { animation-delay: .1s; }
.delay-2 { animation-delay: .2s; }
.delay-3 { animation-delay: .3s; }
.delay-4 { animation-delay: .4s; }
.delay-5 { animation-delay: .55s; }
.delay-6 { animation-delay: .7s; }

/* ── NAVBAR ── */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 0 24px; height: 68px;
  display: flex; align-items: center; justify-content: space-between;
  transition: background .3s, border-color .3s;
}
.navbar.scrolled {
  background: rgba(11,22,40,.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.nav-logo-mark {
  width: 36px; height: 36px; border-radius: 9px;
  background: linear-gradient(135deg, var(--gold), var(--gold-lt));
  display: grid; place-items: center; font-family: 'Fraunces', serif;
  font-size: 15px; font-weight: 900; color: var(--navy);
}
.nav-logo-text { font-family: 'Fraunces', serif; font-size: 1.15rem; font-weight: 700; color: var(--white); }
.nav-logo-text em { color: var(--gold); font-style: normal; }
.nav-links { display: flex; align-items: center; gap: 32px; }
.nav-links a {
  font-size: .88rem; font-weight: 500; color: var(--text-muted);
  text-decoration: none; transition: color .15s; letter-spacing: .02em;
}
.nav-links a:hover { color: var(--white); }
.nav-cta {
  padding: 9px 22px; border-radius: 50px;
  background: linear-gradient(135deg, var(--gold), var(--gold-lt));
  color: var(--navy); font-weight: 600; font-size: .88rem;
  text-decoration: none; transition: transform .15s, box-shadow .15s;
  box-shadow: 0 4px 16px rgba(201,168,76,.3);
}
.nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(201,168,76,.4); }
.nav-mobile-toggle { display: none; background: none; border: none; cursor: pointer; color: var(--white); font-size: 1.4rem; }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  display: flex; align-items: center;
  position: relative; overflow: hidden;
  padding: 100px 0 80px;
}
.hero-bg {
  position: absolute; inset: 0; z-index: 0;
  background: radial-gradient(ellipse 80% 60% at 60% 40%, rgba(26,47,85,.7) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 20% 80%, rgba(14,165,160,.1) 0%, transparent 60%),
              linear-gradient(170deg, #0b1628 0%, #0d1e3a 50%, #0b1628 100%);
}
.hero-grid-lines {
  position: absolute; inset: 0; z-index: 0; opacity: .06;
  background-image:
    linear-gradient(rgba(201,168,76,.8) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,168,76,.8) 1px, transparent 1px);
  background-size: 60px 60px;
}
.hero-glow {
  position: absolute; top: -200px; right: -100px; z-index: 0;
  width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,76,.08) 0%, transparent 70%);
  pointer-events: none;
}
.hero-content {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 60px; align-items: center;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 14px; border-radius: 50px;
  border: 1px solid var(--border);
  background: rgba(201,168,76,.07);
  font-size: .78rem; font-weight: 600; color: var(--gold);
  letter-spacing: .06em; text-transform: uppercase; margin-bottom: 24px;
}
.hero-badge-dot {
  width: 7px; height: 7px; border-radius: 50%; background: var(--gold);
  position: relative;
}
.hero-badge-dot::after {
  content: ''; position: absolute; inset: -3px; border-radius: 50%;
  border: 1.5px solid var(--gold);
  animation: pulse-ring 1.8s ease-out infinite;
}
.hero h1 {
  font-family: 'Fraunces', serif;
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  font-weight: 900; line-height: 1.1;
  color: var(--white); margin-bottom: 22px;
}
.hero h1 .italic-gold { font-style: italic; color: var(--gold); }
.hero-sub {
  font-size: 1.05rem; color: var(--text-muted);
  line-height: 1.75; margin-bottom: 36px; max-width: 480px;
}
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
.btn-gold {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 50px;
  background: linear-gradient(135deg, var(--gold), var(--gold-lt));
  color: var(--navy); font-weight: 700; font-size: .95rem;
  text-decoration: none; border: none; cursor: pointer;
  transition: transform .15s, box-shadow .15s; font-family: 'DM Sans', sans-serif;
  box-shadow: 0 6px 24px rgba(201,168,76,.3);
}
.btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(201,168,76,.4); }
.btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 26px; border-radius: 50px;
  border: 1.5px solid rgba(255,255,255,.2);
  color: var(--white); font-weight: 500; font-size: .95rem;
  text-decoration: none; background: transparent; cursor: pointer;
  transition: border-color .15s, background .15s; font-family: 'DM Sans', sans-serif;
}
.btn-ghost:hover { border-color: rgba(255,255,255,.45); background: rgba(255,255,255,.05); }
.hero-trust {
  display: flex; align-items: center; gap: 16px;
  margin-top: 32px; padding-top: 28px;
  border-top: 1px solid rgba(255,255,255,.08);
}
.hero-trust-item { display: flex; flex-direction: column; }
.hero-trust-num { font-family: 'Fraunces', serif; font-size: 1.6rem; font-weight: 700; color: var(--gold); line-height: 1; }
.hero-trust-label { font-size: .78rem; color: var(--text-muted); margin-top: 3px; }
.hero-trust-divider { width: 1px; height: 40px; background: rgba(255,255,255,.1); }

/* HERO CARD */
.hero-card-wrap { display: flex; flex-direction: column; gap: 14px; animation: float 5s ease-in-out infinite; }
.hero-card {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--rl); padding: 22px 24px;
  backdrop-filter: blur(8px);
}
.hero-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.hero-card-title { font-family: 'Fraunces', serif; font-size: 1rem; font-weight: 700; }
.hero-card-price { font-family: 'Fraunces', serif; font-size: 1.8rem; font-weight: 900; color: var(--gold); }
.hero-card-price small { font-size: .85rem; font-family: 'DM Sans', sans-serif; font-weight: 400; color: var(--text-muted); }
.hero-card-tests { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.hero-test-pill {
  display: flex; align-items: center; gap: 7px;
  padding: 6px 10px; border-radius: 8px;
  background: rgba(201,168,76,.07); border: 1px solid rgba(201,168,76,.12);
  font-size: .78rem; color: rgba(255,255,255,.75);
}
.hero-test-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
.hero-mini-card {
  display: flex; align-items: center; gap: 14px;
  background: linear-gradient(135deg, rgba(14,165,160,.15), rgba(14,165,160,.05));
  border: 1px solid rgba(14,165,160,.25); border-radius: var(--r);
  padding: 14px 18px;
}
.hero-mini-icon { font-size: 1.6rem; }
.hero-mini-text { font-size: .83rem; color: rgba(255,255,255,.8); line-height: 1.4; }
.hero-mini-text strong { color: var(--teal); font-weight: 600; display: block; }

/* ── LOGOS STRIP ── */
.logos-strip {
  padding: 28px 0;
  border-top: 1px solid rgba(255,255,255,.06);
  border-bottom: 1px solid rgba(255,255,255,.06);
  background: rgba(255,255,255,.02);
}
.logos-inner { display: flex; align-items: center; justify-content: center; gap: 48px; flex-wrap: wrap; }
.logos-label { font-size: .75rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--text-muted); }
.logo-pill {
  display: flex; align-items: center; gap: 7px;
  font-size: .82rem; font-weight: 600; color: rgba(255,255,255,.4);
  letter-spacing: .04em;
}
.logo-pill-icon { font-size: 1.1rem; opacity: .5; }

/* ── SECTION BASE ── */
.section { padding: 96px 0; }
.section-light { background: var(--off-white); color: var(--navy); }
.section-mid { background: #f0ede8; color: var(--navy); }
.section-header { text-align: center; max-width: 640px; margin: 0 auto 56px; }
.section-eyebrow {
  font-size: .75rem; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase; margin-bottom: 14px;
}
.section-eyebrow.gold { color: var(--gold); }
.section-eyebrow.teal { color: var(--teal); }
.section-eyebrow.navy { color: var(--navy-lt); }
.section-title {
  font-family: 'Fraunces', serif;
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 900; line-height: 1.1; margin-bottom: 18px;
}
.section-title.dark { color: var(--navy); }
.section-desc { font-size: 1rem; line-height: 1.7; color: var(--text-muted); }
.section-desc.dark { color: #5a6a80; }

/* ── WHAT'S INCLUDED ── */
.tests-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.test-card {
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
  border-radius: var(--rl); padding: 22px 18px;
  transition: border-color .2s, background .2s, transform .2s;
  cursor: default;
}
.test-card:hover {
  border-color: rgba(201,168,76,.35); background: rgba(201,168,76,.04);
  transform: translateY(-4px);
}
.test-card-icon { font-size: 1.7rem; margin-bottom: 12px; }
.test-card-name { font-family: 'Fraunces', serif; font-size: .95rem; font-weight: 700; color: var(--white); margin-bottom: 5px; }
.test-card-count { font-size: .78rem; color: var(--text-muted); line-height: 1.4; }
.tests-plus {
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, rgba(201,168,76,.12), rgba(201,168,76,.04));
  border: 1.5px dashed rgba(201,168,76,.3);
  border-radius: var(--rl); padding: 22px 18px;
  font-family: 'Fraunces', serif; font-size: 1rem; font-weight: 700;
  color: var(--gold); text-align: center; line-height: 1.5;
}

/* ── HOW IT WORKS ── */
.steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; }
.steps-grid::before {
  content: ''; position: absolute; top: 36px; left: 12.5%; right: 12.5%; height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), var(--gold), transparent);
  opacity: .25; z-index: 0;
}
.step-item { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 16px; position: relative; z-index: 1; }
.step-num {
  width: 72px; height: 72px; border-radius: 50%; margin-bottom: 20px;
  display: grid; place-items: center;
  background: var(--navy);
  border: 2px solid rgba(201,168,76,.3);
  box-shadow: 0 0 0 6px rgba(201,168,76,.06), 0 0 0 12px rgba(201,168,76,.03);
}
.step-num-inner { font-family: 'Fraunces', serif; font-size: 1.5rem; font-weight: 900; color: var(--gold); }
.step-icon { font-size: 1.6rem; margin-bottom: 12px; }
.step-title { font-family: 'Fraunces', serif; font-size: 1rem; font-weight: 700; color: var(--white); margin-bottom: 8px; }
.step-desc { font-size: .83rem; color: var(--text-muted); line-height: 1.6; }

/* ── PRICING ── */
.pricing-wrap { display: grid; grid-template-columns: 1fr 380px; gap: 24px; align-items: start; }
.price-card {
  border-radius: var(--rl); overflow: hidden;
  border: 1px solid rgba(201,168,76,.2);
  background: linear-gradient(160deg, var(--navy-mid) 0%, var(--navy) 100%);
}
.price-card-top {
  padding: 32px 32px 24px;
  border-bottom: 1px solid rgba(255,255,255,.08);
}
.price-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 50px;
  background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.25);
  font-size: .72rem; font-weight: 700; color: var(--gold);
  letter-spacing: .06em; text-transform: uppercase; margin-bottom: 18px;
}
.price-amount { display: flex; align-items: baseline; gap: 6px; margin-bottom: 6px; }
.price-aed { font-family: 'Fraunces', serif; font-size: 1.1rem; font-weight: 700; color: var(--gold); }
.price-num { font-family: 'Fraunces', serif; font-size: 3.5rem; font-weight: 900; color: var(--white); line-height: 1; }
.price-was {
  font-size: .88rem; color: var(--text-muted);
  text-decoration: line-through; margin-left: 4px;
}
.price-sub { font-size: .85rem; color: var(--text-muted); margin-bottom: 20px; }
.price-incl { font-size: .8rem; color: var(--teal); font-weight: 600; }
.price-card-body { padding: 24px 32px 32px; }
.price-feat-list { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
.price-feat-item { display: flex; align-items: flex-start; gap: 10px; font-size: .88rem; color: rgba(255,255,255,.75); }
.price-feat-check {
  width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0; margin-top: 1px;
  background: rgba(14,165,160,.15); border: 1px solid rgba(14,165,160,.3);
  display: grid; place-items: center; color: var(--teal); font-size: .7rem;
}
.price-cta {
  display: flex; width: 100%; padding: 15px;
  align-items: center; justify-content: center; gap: 8px;
  border-radius: 50px; background: linear-gradient(135deg, var(--gold), var(--gold-lt));
  color: var(--navy); font-weight: 700; font-size: 1rem;
  border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
  transition: transform .15s, box-shadow .15s;
  box-shadow: 0 6px 24px rgba(201,168,76,.3); text-decoration: none;
}
.price-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(201,168,76,.45); }

/* ADDONS SIDE */
.addon-side { display: flex; flex-direction: column; gap: 10px; }
.addon-side-title {
  font-family: 'Fraunces', serif; font-size: 1.1rem; font-weight: 700;
  color: var(--white); margin-bottom: 6px;
}
.addon-side-sub { font-size: .83rem; color: var(--text-muted); margin-bottom: 12px; line-height: 1.5; }
.addon-chip {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; border-radius: var(--r);
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08);
  transition: border-color .15s, background .15s;
}
.addon-chip:hover { border-color: rgba(201,168,76,.3); background: rgba(201,168,76,.04); }
.addon-chip-left { display: flex; align-items: center; gap: 10px; font-size: .85rem; color: rgba(255,255,255,.8); }
.addon-chip-icon { font-size: 1.1rem; }
.addon-chip-price { font-size: .82rem; font-weight: 700; color: var(--gold); white-space: nowrap; }
.addons-more { font-size: .82rem; color: var(--text-muted); text-align: center; padding-top: 6px; }

/* ── WHY CHOOSE US ── */
.why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.why-card {
  background: var(--white); border-radius: var(--rl); padding: 32px 26px;
  box-shadow: 0 2px 24px rgba(0,0,0,.06); transition: transform .2s, box-shadow .2s;
}
.why-card:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,.1); }
.why-icon {
  width: 52px; height: 52px; border-radius: 14px; margin-bottom: 18px;
  display: grid; place-items: center; font-size: 1.5rem;
}
.why-icon.gold-bg { background: linear-gradient(135deg, #fdf1d0, #f5e4a8); }
.why-icon.teal-bg { background: linear-gradient(135deg, #d0f4f3, #a6ebe9); }
.why-icon.blue-bg { background: linear-gradient(135deg, #dbeafe, #bfdbfe); }
.why-icon.green-bg { background: linear-gradient(135deg, #d1fae5, #a7f3d0); }
.why-icon.red-bg { background: linear-gradient(135deg, #fee2e2, #fecaca); }
.why-icon.purple-bg { background: linear-gradient(135deg, #ede9fe, #ddd6fe); }
.why-title { font-family: 'Fraunces', serif; font-size: 1.05rem; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
.why-desc { font-size: .85rem; color: #5a6a80; line-height: 1.65; }

/* ── TESTIMONIALS ── */
.testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.testi-card {
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
  border-radius: var(--rl); padding: 26px;
}
.testi-stars { color: var(--gold); font-size: 1rem; margin-bottom: 14px; letter-spacing: 3px; }
.testi-text { font-size: .9rem; color: rgba(255,255,255,.75); line-height: 1.7; margin-bottom: 18px; font-style: italic; }
.testi-author { display: flex; align-items: center; gap: 12px; }
.testi-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  display: grid; place-items: center;
  font-family: 'Fraunces', serif; font-size: .95rem; font-weight: 700; color: var(--navy);
  flex-shrink: 0;
}
.testi-name { font-size: .88rem; font-weight: 600; color: var(--white); }
.testi-loc { font-size: .77rem; color: var(--text-muted); }

/* ── FAQ ── */
.faq-list { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }
.faq-item {
  border: 1px solid rgba(255,255,255,.08); border-radius: var(--r);
  overflow: hidden; transition: border-color .2s;
}
.faq-item.open { border-color: rgba(201,168,76,.3); }
.faq-q {
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px 22px; cursor: pointer;
  font-size: .95rem; font-weight: 600; color: var(--white);
  background: rgba(255,255,255,.03); transition: background .15s;
  gap: 16px; border: none; width: 100%; text-align: left; font-family: 'DM Sans', sans-serif;
}
.faq-q:hover { background: rgba(255,255,255,.06); }
.faq-icon {
  width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
  display: grid; place-items: center;
  background: rgba(201,168,76,.1); color: var(--gold);
  font-size: 1rem; line-height: 1; transition: transform .25s;
}
.faq-item.open .faq-icon { transform: rotate(45deg); }
.faq-a {
  font-size: .88rem; color: var(--text-muted); line-height: 1.7;
  padding: 0 22px; max-height: 0; overflow: hidden;
  transition: max-height .3s ease, padding .3s ease;
}
.faq-item.open .faq-a { max-height: 200px; padding: 0 22px 18px; }

/* ── CTA BAND ── */
.cta-band {
  padding: 80px 0;
  background: linear-gradient(135deg, var(--navy-mid) 0%, #0d2044 50%, var(--navy-mid) 100%);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  position: relative; overflow: hidden;
}
.cta-band-glow {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 60% 100% at 50% 50%, rgba(201,168,76,.07) 0%, transparent 70%);
}
.cta-inner { text-align: center; position: relative; z-index: 1; }
.cta-inner h2 {
  font-family: 'Fraunces', serif; font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 900; color: var(--white); margin-bottom: 14px; line-height: 1.15;
}
.cta-inner h2 em { font-style: italic; color: var(--gold); }
.cta-inner p { font-size: 1rem; color: var(--text-muted); margin-bottom: 36px; }
.cta-actions { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }
.cta-trust { display: flex; justify-content: center; gap: 28px; margin-top: 28px; flex-wrap: wrap; }
.cta-trust-item { display: flex; align-items: center; gap: 7px; font-size: .82rem; color: var(--text-muted); }
.cta-trust-item span:first-child { font-size: 1rem; }

/* ── FOOTER ── */
footer {
  background: #080e1a; padding: 56px 0 32px;
  border-top: 1px solid rgba(255,255,255,.05);
}
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 48px; }
.footer-brand-desc { font-size: .85rem; color: var(--text-muted); margin: 14px 0 20px; line-height: 1.7; max-width: 260px; }
.footer-social { display: flex; gap: 10px; }
.social-btn {
  width: 34px; height: 34px; border-radius: 8px;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
  display: grid; place-items: center; font-size: 1rem; text-decoration: none;
  transition: background .15s, border-color .15s;
}
.social-btn:hover { background: rgba(201,168,76,.1); border-color: rgba(201,168,76,.25); }
.footer-col-title { font-family: 'Fraunces', serif; font-size: .9rem; font-weight: 700; color: var(--white); margin-bottom: 16px; }
.footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.footer-links a { font-size: .83rem; color: var(--text-muted); text-decoration: none; transition: color .15s; }
.footer-links a:hover { color: var(--gold); }
.footer-bottom { padding-top: 24px; border-top: 1px solid rgba(255,255,255,.05); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
.footer-copy { font-size: .78rem; color: #3d4f6a; }
.footer-legal { display: flex; gap: 20px; }
.footer-legal a { font-size: .78rem; color: #3d4f6a; text-decoration: none; }
.footer-legal a:hover { color: var(--text-muted); }

/* ── RESPONSIVE ── */
@media (max-width: 980px) {
  .hero-content { grid-template-columns: 1fr; gap: 40px; }
  .hero-card-wrap { max-width: 480px; margin: 0 auto; animation: none; }
  .tests-grid { grid-template-columns: repeat(2, 1fr); }
  .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
  .steps-grid::before { display: none; }
  .pricing-wrap { grid-template-columns: 1fr; }
  .why-grid { grid-template-columns: repeat(2, 1fr); }
  .testimonials-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .nav-links { display: none; }
  .nav-mobile-toggle { display: block; }
}
@media (max-width: 600px) {
  .hero h1 { font-size: 2.2rem; }
  .tests-grid { grid-template-columns: 1fr 1fr; }
  .steps-grid { grid-template-columns: 1fr; }
  .why-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
  .logos-inner { gap: 24px; }
  .hero-trust { flex-wrap: wrap; gap: 20px; }
}
`;

/* ── DATA ──────────────────────────────────────────────────── */
const BASE_TESTS = [
  { icon: "❤️", name: "Lipid Profile", count: "8 tests · Heart health" },
  { icon: "🫁", name: "Liver Function", count: "11 tests · LFT panel" },
  { icon: "🫘", name: "Kidney Function", count: "6 tests · Renal profile" },
  { icon: "💉", name: "Hemogram CBC", count: "21 tests · Full blood count" },
  { icon: "🦋", name: "Thyroid Panel", count: "TSH, FT3, FT4" },
  { icon: "☀️", name: "Vitamins & Minerals", count: "Vit D, B12, Folate, Mg" },
  { icon: "🩸", name: "Diabetes Profile", count: "HbA1c, FBS, Insulin" },
  { icon: "🔬", name: "Pancreatic", count: "Amylase, Lipase" },
];

const ADDONS_PREVIEW = [
  { icon: "🎗️", name: "Cancer Screening Panel", price: "from AED 50" },
  { icon: "🌸", name: "Hormone Profile", price: "from AED 50" },
  { icon: "🧲", name: "Full Iron Profile", price: "AED 80" },
  { icon: "⚡", name: "Electrolytes & CRP", price: "from AED 30" },
  { icon: "🧬", name: "Allergy / Intolerance", price: "from AED 150" },
];

const STEPS = [
  {
    icon: "📋",
    title: "Choose Your Package",
    desc: "Start with ArogyaPlus 100 base and add optional tests to fit your health goals.",
  },
  {
    icon: "📅",
    title: "Book a Time Slot",
    desc: "Pick a date and preferred time window. Morning or evening — we work around you.",
  },
  {
    icon: "🏠",
    title: "We Come to You",
    desc: "Our certified phlebotomist arrives at your home or office at the scheduled time.",
  },
  {
    icon: "📲",
    title: "Get Your Results",
    desc: "Receive a detailed digital report within 24 hours on email and WhatsApp.",
  },
];

const WHY_CARDS = [
  {
    icon: "🏠",
    bg: "gold-bg",
    title: "Free Home Collection",
    desc: "No travel, no queues. Our certified team comes to your door anywhere in the UAE.",
  },
  {
    icon: "🔬",
    bg: "teal-bg",
    title: "MOHAP Certified Lab",
    desc: "All samples processed in UAE Ministry of Health approved, ISO-accredited laboratories.",
  },
  {
    icon: "⚡",
    bg: "blue-bg",
    title: "24-Hour Results",
    desc: "Detailed digital reports delivered to your email and WhatsApp within 24 hours of collection.",
  },
  {
    icon: "💊",
    bg: "green-bg",
    title: "100+ Tests in One Draw",
    desc: "ArogyaPlus covers over 100 biomarkers in a single blood draw — unrivalled value.",
  },
  {
    icon: "👨‍⚕️",
    bg: "purple-bg",
    title: "Doctor Report Review",
    desc: "Add a 30-minute consultation with a specialist doctor to walk through your results together.",
  },
  {
    icon: "💳",
    bg: "red-bg",
    title: "Pay on Collection",
    desc: "No advance payment required. Pay cash or card when our team arrives at your home.",
  },
];

const TESTIMONIALS = [
  {
    stars: 5,
    text: "Absolutely seamless. Booked the night before, the nurse arrived at 7am sharp. Results were on WhatsApp by evening. Will never go to a clinic again.",
    name: "Rania M.",
    loc: "Dubai Marina",
    color: "#e8c96d",
  },
  {
    stars: 5,
    text: "I added the hormone panel and cancer markers. The report was incredibly detailed and easy to understand. My doctor was impressed by the range of tests.",
    name: "Karthik P.",
    loc: "Sharjah",
    color: "#7dd3c0",
  },
  {
    stars: 5,
    text: "As someone with diabetes, I need regular tests. CareHub has made this completely stress-free. The HbA1c results come faster than the clinic ever managed.",
    name: "Fatima A.",
    loc: "Abu Dhabi",
    color: "#f9a8d4",
  },
];

const FAQS = [
  {
    q: "Do I need to fast before my blood test?",
    a: "For the base ArogyaPlus 100 package (which includes fasting tests like blood glucose and lipid profile), we recommend fasting for 10–12 hours before collection. Our team will confirm fasting requirements when booking.",
  },
  {
    q: "Which areas do you cover in the UAE?",
    a: "We cover all 7 emirates — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Home collection is available 7 days a week, 7am–8pm.",
  },
  {
    q: "How do I receive my results?",
    a: "Your detailed report is sent as a PDF to your email and WhatsApp within 24 hours of sample collection. The report includes reference ranges and flagged values for easy review.",
  },
  {
    q: "Can I book for multiple family members?",
    a: "Yes! Let us know during booking how many individuals need testing. Our phlebotomist will collect all samples in a single visit. Family discounts are available for 3+ members.",
  },
  {
    q: "What if I need to reschedule my appointment?",
    a: "You can reschedule up to 2 hours before your appointment at no charge. Just WhatsApp us on +971 50 886 0612 or call and we'll sort it out.",
  },
];

/* ── COMPONENTS ────────────────────────────────────────────── */
function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <a href="/" className="nav-logo">
        <div className="nav-logo-mark">C</div>
        <div className="nav-logo-text">
          Care<em>Hub</em>
        </div>
      </a>
      <div className="nav-links">
        <a href="#tests">What's Included</a>
        <a href="#how">How It Works</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
      </div>
      <button className="nav-cta" onClick={onBook}>
        Book Now →
      </button>
      <button className="nav-mobile-toggle" onClick={onBook}>
        ☰
      </button>
    </nav>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button className="faq-q" onClick={() => setOpen((o) => !o)}>
        {q}
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-a">{a}</div>
    </div>
  );
}

/* ── APP ───────────────────────────────────────────────────── */
export default function App() {
  const handleBook = () => {
    window.location.href = "/arogyaPlusPackage";
  };

  return (
    <>
      <style>{css}</style>

      <Navbar onBook={handleBook} />

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-grid-lines" />
        <div className="hero-glow" />
        <div className="container">
          <div className="hero-content">
            {/* Left */}
            <div>
              <div className="hero-badge animate-up">
                <span className="hero-badge-dot" />
                UAE's Premium Home Health Testing
              </div>
              <h1 className="animate-up delay-1">
                100+ Tests.
                <br />
                <span className="italic-gold">Zero Hassle.</span>
                <br />
                Your Doorstep.
              </h1>
              <p className="hero-sub animate-up delay-2">
                ArogyaPlus brings a complete health screening to your home.
                Certified nurses, same-day collection, 24-hour digital results —
                starting at just{" "}
                <strong style={{ color: "var(--gold)" }}>AED 499</strong>.
              </p>
              <div className="hero-actions animate-up delay-3">
                <button className="btn-gold" onClick={handleBook}>
                  Build My Package →
                </button>
                <a href="https://wa.me/971508860612" className="btn-ghost">
                  💬 Chat on WhatsApp
                </a>
              </div>
              <div className="hero-trust animate-up delay-4">
                <div className="hero-trust-item">
                  <span className="hero-trust-num">8,400+</span>
                  <span className="hero-trust-label">Patients Served</span>
                </div>
                <div className="hero-trust-divider" />
                <div className="hero-trust-item">
                  <span className="hero-trust-num">100+</span>
                  <span className="hero-trust-label">Tests Covered</span>
                </div>
                <div className="hero-trust-divider" />
                <div className="hero-trust-item">
                  <span className="hero-trust-num">4.9★</span>
                  <span className="hero-trust-label">Average Rating</span>
                </div>
                <div className="hero-trust-divider" />
                <div className="hero-trust-item">
                  <span className="hero-trust-num">7 UAE</span>
                  <span className="hero-trust-label">Emirates Covered</span>
                </div>
              </div>
            </div>

            {/* Right — Hero Card */}
            <div className="animate-up delay-5">
              <div className="hero-card-wrap">
                <div className="hero-card">
                  <div className="hero-card-header">
                    <span
                      style={{
                        fontSize: ".8rem",
                        fontWeight: 600,
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: ".08em",
                      }}
                    >
                      ArogyaPlus 100
                    </span>
                    <div className="hero-card-price">
                      499 <small>AED</small>
                    </div>
                  </div>
                  <div className="hero-card-tests">
                    {BASE_TESTS.slice(0, 6).map((t) => (
                      <div className="hero-test-pill" key={t.name}>
                        <span className="hero-test-dot" />
                        {t.name}
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      fontSize: ".75rem",
                      color: "var(--text-muted)",
                      textAlign: "center",
                    }}
                  >
                    + {BASE_TESTS.length - 6} more panels · 100+ biomarkers
                    total
                  </div>
                </div>
                <div className="hero-mini-card">
                  <span className="hero-mini-icon">🏠</span>
                  <div className="hero-mini-text">
                    <strong>Free Home Collection</strong>
                    Our nurse comes to you · 7am–8pm daily
                  </div>
                </div>
                <div
                  className="hero-mini-card"
                  style={{
                    background:
                      "linear-gradient(135deg,rgba(201,168,76,.12),rgba(201,168,76,.04))",
                    border: "1px solid rgba(201,168,76,.2)",
                  }}
                >
                  <span className="hero-mini-icon">📲</span>
                  <div className="hero-mini-text">
                    <strong style={{ color: "var(--gold)" }}>
                      Results in 24 Hours
                    </strong>
                    Detailed PDF report · Email & WhatsApp
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGOS STRIP ── */}
      <div className="logos-strip">
        <div className="container">
          <div className="logos-inner">
            <span className="logos-label">Trusted & Certified</span>
            {[
              "🏥 MOHAP Approved",
              "🧪 ISO Accredited Lab",
              "✅ DHA Licensed",
              "🔒 HIPAA Compliant",
              "⭐ Google 4.9★",
            ].map((l) => (
              <div className="logo-pill" key={l}>
                <span className="logo-pill-icon">{l.split(" ")[0]}</span>
                {l.split(" ").slice(1).join(" ")}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="section" id="tests">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow gold">What's Inside</div>
            <h2 className="section-title">100+ Tests in One Package</h2>
            <p className="section-desc">
              The ArogyaPlus 100 base package covers every major organ system —
              heart, liver, kidneys, thyroid, blood, and more. All from a single
              blood draw.
            </p>
          </div>
          <div className="tests-grid">
            {BASE_TESTS.map((t) => (
              <div className="test-card" key={t.name}>
                <div className="test-card-icon">{t.icon}</div>
                <div className="test-card-name">{t.name}</div>
                <div className="test-card-count">{t.count}</div>
              </div>
            ))}
            <div className="tests-plus">
              ➕ Customize with
              <br />
              <span style={{ color: "var(--gold-lt)", fontSize: "1.2rem" }}>
                15+ Add-On Tests
              </span>
              <br />
              <span style={{ fontSize: ".8rem", opacity: 0.7 }}>
                Cancer · Hormones · Allergy · Iron
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        className="section"
        style={{
          background: "rgba(255,255,255,.02)",
          borderTop: "1px solid rgba(255,255,255,.05)",
          borderBottom: "1px solid rgba(255,255,255,.05)",
        }}
        id="how"
      >
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow teal">Simple Process</div>
            <h2 className="section-title">Health Testing, Reimagined</h2>
            <p className="section-desc">
              From booking to results in under 24 hours. No clinic visits, no
              waiting rooms.
            </p>
          </div>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div className="step-item" key={s.title}>
                <div className="step-num">
                  <div className="step-num-inner">{i + 1}</div>
                </div>
                <div className="step-icon">{s.icon}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section" id="pricing">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow gold">Transparent Pricing</div>
            <h2 className="section-title">One Price. No Surprises.</h2>
            <p className="section-desc">
              AED 499 covers everything in the base package. Add optional tests
              at clear, fixed prices. Home collection always included.
            </p>
          </div>
          <div className="pricing-wrap">
            {/* Price Card */}
            <div className="price-card">
              <div className="price-card-top">
                <div className="price-badge">⭐ Best Value Package</div>
                <div className="price-amount">
                  <span className="price-aed">AED</span>
                  <span className="price-num">499</span>
                  <span className="price-was">AED 2,500</span>
                </div>
                <div className="price-sub">
                  One-time · Includes everything below
                </div>
                <div className="price-incl">
                  ✓ Free home collection included
                </div>
              </div>
              <div className="price-card-body">
                <ul className="price-feat-list">
                  {[
                    "100+ biomarkers across 8 essential health panels",
                    "MOHAP-certified lab processing — same day",
                    "Free home or office collection, 7am–8pm",
                    "Detailed digital PDF report within 24 hours",
                    "WhatsApp & email report delivery",
                    "Pay on collection — cash or card",
                    "Certified, experienced phlebotomist",
                    "Free fasting guidance & pre-test support",
                  ].map((f) => (
                    <li className="price-feat-item" key={f}>
                      <span className="price-feat-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="price-cta" onClick={handleBook}>
                  Customize & Book Now →
                </button>
              </div>
            </div>

            {/* Addons Side */}
            <div className="addon-side">
              <div className="addon-side-title">+ Optional Add-Ons</div>
              <div className="addon-side-sub">
                Enhance your package with targeted tests. Prices update
                automatically in the builder.
              </div>
              {ADDONS_PREVIEW.map((a) => (
                <div className="addon-chip" key={a.name}>
                  <span className="addon-chip-left">
                    <span className="addon-chip-icon">{a.icon}</span>
                    {a.name}
                  </span>
                  <span className="addon-chip-price">{a.price}</span>
                </div>
              ))}
              <div className="addons-more">
                + Doctor Consultation · Priority 6hr Results · and more
              </div>
              <button
                className="btn-gold"
                style={{
                  marginTop: 16,
                  width: "100%",
                  justifyContent: "center",
                }}
                onClick={handleBook}
              >
                See All Add-Ons →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow navy">Why CareHub</div>
            <h2 className="section-title dark">Built Around Your Life</h2>
            <p className="section-desc dark">
              We designed every part of this experience to be effortless,
              trustworthy, and genuinely better than a clinic visit.
            </p>
          </div>
          <div className="why-grid">
            {WHY_CARDS.map((w) => (
              <div className="why-card" key={w.title}>
                <div className={`why-icon ${w.bg}`}>{w.icon}</div>
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow gold">Patient Stories</div>
            <h2 className="section-title">Loved Across the UAE</h2>
            <p className="section-desc">
              Over 8,400 patients have trusted CareHub with their health. Here's
              what some of them say.
            </p>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div className="testi-card" key={t.name}>
                <div className="testi-stars">{"★".repeat(t.stars)}</div>
                <div className="testi-text">"{t.text}"</div>
                <div className="testi-author">
                  <div
                    className="testi-avatar"
                    style={{ background: `${t.color}25`, color: t.color }}
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-loc">📍 {t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" style={{ paddingTop: 72 }} id="faq">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow teal">FAQ</div>
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="cta-band">
        <div className="cta-band-glow" />
        <div className="container">
          <div className="cta-inner">
            <h2>
              Your Health Deserves
              <br />
              <em>More Than a Waiting Room.</em>
            </h2>
            <p>
              Book your ArogyaPlus home health screening today. Starts from AED
              499.
            </p>
            <div className="cta-actions">
              <button
                className="btn-gold"
                style={{ fontSize: "1.05rem", padding: "16px 36px" }}
                onClick={handleBook}
              >
                Build My Package →
              </button>
              <a
                href="https://wa.me/971508860612"
                className="btn-ghost"
                style={{ fontSize: "1.05rem", padding: "15px 30px" }}
              >
                💬 WhatsApp Us
              </a>
            </div>
            <div className="cta-trust">
              {[
                "🏠 Free Home Collection",
                "⚡ Results in 24 Hours",
                "💳 Pay on Collection",
                "📞 24/7 Support",
              ].map((t) => (
                <div className="cta-trust-item" key={t}>
                  <span>{t.split(" ")[0]}</span>
                  <span>{t.split(" ").slice(1).join(" ")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="/" className="nav-logo" style={{ marginBottom: 0 }}>
                <div className="nav-logo-mark">C</div>
                <div className="nav-logo-text">
                  Care<em>Hub</em>
                </div>
              </a>
              <p className="footer-brand-desc">
                UAE's most trusted home health testing service. Bringing
                certified diagnostics to your doorstep since 2021.
              </p>
              <div className="footer-social">
                {["📘", "📸", "🐦", "💼"].map((s, i) => (
                  <a key={i} href="#" className="social-btn">
                    {s}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="footer-col-title">Services</div>
              <ul className="footer-links">
                {[
                  "ArogyaPlus 100",
                  "Add-On Tests",
                  "Cancer Screening",
                  "Hormone Panel",
                  "Doctor Consultation",
                ].map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                {[
                  "About Us",
                  "How It Works",
                  "Certifications",
                  "Careers",
                  "Blog",
                ].map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Contact</div>
              <ul className="footer-links">
                <li>
                  <a href="tel:+971508860612">📞 +971 50 886 0612</a>
                </li>
                <li>
                  <a href="https://wa.me/971508860612">💬 WhatsApp</a>
                </li>
                <li>
                  <a href="mailto:hello@carehub.ae">✉️ hello@carehub.ae</a>
                </li>
                <li>
                  <a href="#">📍 Dubai, UAE</a>
                </li>
                <li
                  style={{
                    color: "var(--text-muted)",
                    fontSize: ".82rem",
                    marginTop: 4,
                  }}
                >
                  Available 7am–8pm · 7 days
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">
              © 2025 CareHub Health Services LLC · All rights reserved
            </span>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
