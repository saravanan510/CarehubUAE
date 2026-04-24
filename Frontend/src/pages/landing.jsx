import { useState, useEffect } from "react";

/* ── STYLES ─────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

:root {
  --blue: #1a56db;
  --blue-dk: #1240a8;
  --blue-lt: #eff4ff;
  --blue-bd: #c3d3f5;
  --blue-mid: #1e4fc7;
  --blue-hero: #0f2e6b;
  --blue-deep: #0a1e47;
  --green: #16a34a;
  --green-lt: #f0fdf4;
  --green-bd: #86efac;
  --amber: #d97706;
  --white: #ffffff;
  --off-white: #f9fafb;
  --border: #e5e7eb;
  --g50: #f9fafb;
  --g100: #f3f4f6;
  --g200: #e5e7eb;
  --g400: #9ca3af;
  --g500: #6b7280;
  --g700: #374151;
  --g900: #111827;
  --text-muted: #93a8d4;
  --r: 10px;
  --rl: 16px;
}

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: var(--white);
  color: var(--g900);
  font-size: 15px;
  line-height: 1.6;
  overflow-x: hidden;
}

/* ── UTILITIES ── */
.container { max-width: 1160px; margin: 0 auto; padding: 0 5vw; }

/* ── ANIMATIONS ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
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
.animate-up { animation: fadeUp .65s ease both; }
.delay-1 { animation-delay: .1s; }
.delay-2 { animation-delay: .2s; }
.delay-3 { animation-delay: .3s; }
.delay-4 { animation-delay: .4s; }
.delay-5 { animation-delay: .55s; }

/* ── NAVBAR ── */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 0 5vw; height: 64px;
  display: flex; align-items: center; justify-content: space-between;
  transition: background .3s, box-shadow .3s;
  background: rgba(10,30,71,0);
}
.navbar.scrolled {
  background: rgba(10,30,71,.96);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 rgba(255,255,255,.06);
}
.nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.nav-logo-mark {
  width: 34px; height: 34px; border-radius: 8px;
  background: var(--blue);
  display: grid; place-items: center;
  font-size: 14px; font-weight: 900; color: #fff;
}
.nav-logo-text { font-size: 1.1rem; font-weight: 800; color: var(--white); }
.nav-logo-text em { color: #7aa4f5; font-style: normal; }
.nav-links { display: flex; align-items: center; gap: 28px; }
.nav-links a {
  font-size: .88rem; font-weight: 500; color: rgba(255,255,255,.65);
  text-decoration: none; transition: color .15s;
}
.nav-links a:hover { color: var(--white); }
.nav-cta {
  padding: 9px 22px; border-radius: 50px;
  background: var(--blue);
  color: #fff; font-weight: 700; font-size: .88rem;
  text-decoration: none; transition: background .15s, box-shadow .15s;
  box-shadow: 0 4px 16px rgba(26,86,219,.4); border: none; cursor: pointer;
  font-family: inherit;
}
.nav-cta:hover { background: var(--blue-dk); }
.nav-mobile-toggle { display: none; background: none; border: none; cursor: pointer; color: var(--white); font-size: 1.4rem; }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  display: flex; align-items: center;
  position: relative; overflow: hidden;
  padding: 100px 0 80px;
  background: linear-gradient(155deg, var(--blue-deep) 0%, #0d2355 40%, #122870 70%, #0f2e6b 100%);
}
.hero-grid-lines {
  position: absolute; inset: 0; z-index: 0; opacity: .05;
  background-image:
    linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
  background-size: 56px 56px;
}
.hero-glow {
  position: absolute; top: -150px; right: -80px; z-index: 0;
  width: 560px; height: 560px; border-radius: 50%;
  background: radial-gradient(circle, rgba(26,86,219,.18) 0%, transparent 70%);
  pointer-events: none;
}
.hero-glow-2 {
  position: absolute; bottom: -100px; left: -80px; z-index: 0;
  width: 400px; height: 400px; border-radius: 50%;
  background: radial-gradient(circle, rgba(26,86,219,.1) 0%, transparent 70%);
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
  border: 1px solid rgba(122,164,245,.3);
  background: rgba(26,86,219,.15);
  font-size: .78rem; font-weight: 700; color: #7aa4f5;
  letter-spacing: .06em; text-transform: uppercase; margin-bottom: 22px;
}
.hero-badge-dot {
  width: 7px; height: 7px; border-radius: 50%; background: #7aa4f5;
  position: relative;
}
.hero-badge-dot::after {
  content: ''; position: absolute; inset: -3px; border-radius: 50%;
  border: 1.5px solid #7aa4f5;
  animation: pulse-ring 1.8s ease-out infinite;
}
.hero h1 {
  font-size: clamp(2.2rem, 4.2vw, 3.6rem);
  font-weight: 900; line-height: 1.1;
  color: var(--white); margin-bottom: 20px;
}
.hero h1 .accent-blue { color: #7aa4f5; }
.hero-sub {
  font-size: 1rem; color: rgba(255,255,255,.65);
  line-height: 1.75; margin-bottom: 34px; max-width: 480px;
}
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
.btn-primary-hero {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 50px;
  background: var(--blue);
  color: #fff; font-weight: 700; font-size: .95rem;
  text-decoration: none; border: none; cursor: pointer;
  transition: background .15s, box-shadow .15s; font-family: 'Plus Jakarta Sans', sans-serif;
  box-shadow: 0 6px 24px rgba(26,86,219,.45);
}
.btn-primary-hero:hover { background: var(--blue-dk); box-shadow: 0 10px 32px rgba(26,86,219,.55); }
.btn-ghost-hero {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 24px; border-radius: 50px;
  border: 1.5px solid rgba(255,255,255,.2);
  color: var(--white); font-weight: 500; font-size: .95rem;
  text-decoration: none; background: transparent; cursor: pointer;
  transition: border-color .15s, background .15s; font-family: 'Plus Jakarta Sans', sans-serif;
}
.btn-ghost-hero:hover { border-color: rgba(255,255,255,.45); background: rgba(255,255,255,.06); }
.hero-trust {
  display: flex; align-items: center; gap: 16px;
  margin-top: 28px; padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,.08);
}
.hero-trust-item { display: flex; flex-direction: column; }
.hero-trust-num { font-size: 1.55rem; font-weight: 900; color: #7aa4f5; line-height: 1; }
.hero-trust-label { font-size: .77rem; color: rgba(255,255,255,.5); margin-top: 3px; }
.hero-trust-divider { width: 1px; height: 38px; background: rgba(255,255,255,.1); }

/* HERO CARD */
.hero-card-wrap { display: flex; flex-direction: column; gap: 12px; animation: float 5s ease-in-out infinite; }
.hero-card {
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: var(--rl); padding: 22px 24px;
  backdrop-filter: blur(10px);
}
.hero-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.hero-card-label { font-size: .78rem; font-weight: 700; color: rgba(255,255,255,.5); text-transform: uppercase; letter-spacing: .08em; }
.hero-card-price { font-size: 1.8rem; font-weight: 900; color: #fff; line-height: 1; }
.hero-card-price small { font-size: .8rem; font-weight: 400; color: rgba(255,255,255,.5); margin-left: 2px; }
.hero-card-tests { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
.hero-test-pill {
  display: flex; align-items: center; gap: 7px;
  padding: 6px 10px; border-radius: 8px;
  background: rgba(26,86,219,.2); border: 1px solid rgba(122,164,245,.2);
  font-size: .77rem; color: rgba(255,255,255,.75);
}
.hero-test-dot { width: 5px; height: 5px; border-radius: 50%; background: #7aa4f5; flex-shrink: 0; }
.hero-mini-card {
  display: flex; align-items: center; gap: 14px;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--r); padding: 14px 18px;
}
.hero-mini-icon { font-size: 1.5rem; }
.hero-mini-text { font-size: .82rem; color: rgba(255,255,255,.75); line-height: 1.4; }
.hero-mini-text strong { color: #7aa4f5; font-weight: 700; display: block; }

/* ── LOGOS STRIP ── */
.logos-strip {
  padding: 24px 0;
  background: var(--g50);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.logos-inner { display: flex; align-items: center; justify-content: center; gap: 44px; flex-wrap: wrap; }
.logos-label { font-size: .74rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--g400); }
.logo-pill {
  display: flex; align-items: center; gap: 6px;
  font-size: .81rem; font-weight: 600; color: var(--g500);
  letter-spacing: .03em;
}

/* ── SECTION BASE ── */
.section { padding: 88px 0; }
.section-alt { background: var(--off-white); }
.section-header { text-align: center; max-width: 620px; margin: 0 auto 52px; }
.section-eyebrow {
  font-size: .73rem; font-weight: 800; letter-spacing: .12em;
  text-transform: uppercase; margin-bottom: 12px;
}
.eyebrow-blue { color: var(--blue); }
.eyebrow-green { color: var(--green); }
.section-title {
  font-size: clamp(1.85rem, 3.2vw, 2.7rem);
  font-weight: 900; line-height: 1.15; margin-bottom: 16px; color: var(--g900);
}
.section-desc { font-size: .95rem; line-height: 1.75; color: var(--g500); }

/* ── WHAT'S INCLUDED ── */
.tests-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.test-card {
  background: var(--white); border: 1px solid var(--border);
  border-radius: var(--rl); padding: 20px 16px;
  transition: border-color .2s, box-shadow .2s, transform .2s;
}
.test-card:hover {
  border-color: var(--blue-bd); box-shadow: 0 8px 24px rgba(26,86,219,.08);
  transform: translateY(-3px);
}
.test-card-icon { font-size: 1.6rem; margin-bottom: 10px; }
.test-card-name { font-size: .9rem; font-weight: 700; color: var(--g900); margin-bottom: 4px; }
.test-card-count { font-size: .77rem; color: var(--g500); line-height: 1.4; }
.tests-plus {
  display: flex; align-items: center; justify-content: center;
  background: var(--blue-lt);
  border: 1.5px dashed var(--blue-bd);
  border-radius: var(--rl); padding: 20px 16px;
  font-size: .95rem; font-weight: 700;
  color: var(--blue); text-align: center; line-height: 1.5;
}

/* ── HOW IT WORKS ── */
.steps-section { background: var(--blue-deep); padding: 88px 0; }
.steps-section .section-title { color: var(--white); }
.steps-section .section-desc { color: rgba(255,255,255,.55); }
.steps-section .section-eyebrow { color: #7aa4f5; }
.steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; }
.steps-grid::before {
  content: ''; position: absolute; top: 34px; left: 12.5%; right: 12.5%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(122,164,245,.4), rgba(122,164,245,.4), transparent);
  z-index: 0;
}
.step-item { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 14px; position: relative; z-index: 1; }
.step-num {
  width: 68px; height: 68px; border-radius: 50%; margin-bottom: 18px;
  display: grid; place-items: center;
  background: var(--blue-hero);
  border: 2px solid rgba(122,164,245,.35);
  box-shadow: 0 0 0 6px rgba(26,86,219,.08);
}
.step-num-inner { font-size: 1.4rem; font-weight: 900; color: #7aa4f5; }
.step-icon { font-size: 1.5rem; margin-bottom: 10px; }
.step-title { font-size: .96rem; font-weight: 800; color: var(--white); margin-bottom: 7px; }
.step-desc { font-size: .82rem; color: rgba(255,255,255,.5); line-height: 1.6; }

/* ── PRICING ── */
.pricing-wrap { display: grid; grid-template-columns: 1fr 370px; gap: 24px; align-items: start; }
.price-card {
  border-radius: var(--rl); overflow: hidden;
  border: 1px solid var(--blue-bd);
  background: linear-gradient(155deg, var(--blue-deep) 0%, #0d2355 100%);
}
.price-card-top { padding: 30px 30px 22px; border-bottom: 1px solid rgba(255,255,255,.07); }
.price-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 50px;
  background: rgba(26,86,219,.2); border: 1px solid rgba(122,164,245,.3);
  font-size: .72rem; font-weight: 700; color: #7aa4f5;
  letter-spacing: .06em; text-transform: uppercase; margin-bottom: 16px;
}
.price-amount { display: flex; align-items: baseline; gap: 5px; margin-bottom: 5px; }
.price-aed { font-size: 1.05rem; font-weight: 700; color: #7aa4f5; }
.price-num { font-size: 3.4rem; font-weight: 900; color: var(--white); line-height: 1; }
.price-was { font-size: .87rem; color: rgba(255,255,255,.35); text-decoration: line-through; margin-left: 4px; }
.price-sub { font-size: .84rem; color: rgba(255,255,255,.45); margin-bottom: 18px; }
.price-incl { font-size: .79rem; color: #34d399; font-weight: 600; }
.price-card-body { padding: 22px 30px 30px; }
.price-feat-list { list-style: none; display: flex; flex-direction: column; gap: 11px; margin-bottom: 26px; }
.price-feat-item { display: flex; align-items: flex-start; gap: 10px; font-size: .87rem; color: rgba(255,255,255,.72); }
.price-feat-check {
  width: 19px; height: 19px; border-radius: 50%; flex-shrink: 0; margin-top: 1px;
  background: rgba(26,86,219,.25); border: 1px solid rgba(122,164,245,.35);
  display: grid; place-items: center; color: #7aa4f5; font-size: .7rem;
}
.price-cta {
  display: flex; width: 100%; padding: 14px;
  align-items: center; justify-content: center; gap: 8px;
  border-radius: 50px; background: var(--blue);
  color: #fff; font-weight: 700; font-size: .97rem;
  border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
  transition: background .15s, box-shadow .15s;
  box-shadow: 0 6px 24px rgba(26,86,219,.4); text-decoration: none;
}
.price-cta:hover { background: var(--blue-dk); box-shadow: 0 10px 32px rgba(26,86,219,.5); }

/* ADDONS SIDE */
.addon-side { display: flex; flex-direction: column; gap: 9px; }
.addon-side-title { font-size: 1.05rem; font-weight: 800; color: var(--g900); margin-bottom: 5px; }
.addon-side-sub { font-size: .83rem; color: var(--g500); margin-bottom: 10px; line-height: 1.5; }
.addon-chip {
  display: flex; align-items: center; justify-content: space-between;
  padding: 11px 14px; border-radius: var(--r);
  background: var(--white); border: 1px solid var(--border);
  transition: border-color .15s, background .15s;
}
.addon-chip:hover { border-color: var(--blue-bd); background: var(--blue-lt); }
.addon-chip-left { display: flex; align-items: center; gap: 9px; font-size: .85rem; color: var(--g700); }
.addon-chip-icon { font-size: 1.05rem; }
.addon-chip-price { font-size: .82rem; font-weight: 700; color: var(--blue); white-space: nowrap; }
.addons-more { font-size: .81rem; color: var(--g400); text-align: center; padding-top: 5px; }

/* ── WHY CHOOSE US ── */
.why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.why-card {
  background: var(--white); border: 1px solid var(--border);
  border-radius: var(--rl); padding: 28px 24px;
  box-shadow: 0 2px 16px rgba(0,0,0,.04); transition: transform .2s, box-shadow .2s, border-color .2s;
}
.why-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(26,86,219,.1); border-color: var(--blue-bd); }
.why-icon {
  width: 48px; height: 48px; border-radius: 12px; margin-bottom: 16px;
  display: grid; place-items: center; font-size: 1.4rem;
}
.why-icon.blue-bg  { background: var(--blue-lt); }
.why-icon.green-bg { background: var(--green-lt); }
.why-icon.sky-bg   { background: #e0f2fe; }
.why-icon.indigo-bg{ background: #eef2ff; }
.why-icon.teal-bg  { background: #ccfbf1; }
.why-icon.purple-bg{ background: #ede9fe; }
.why-title { font-size: 1rem; font-weight: 800; color: var(--g900); margin-bottom: 7px; }
.why-desc { font-size: .84rem; color: var(--g500); line-height: 1.65; }

/* ── TESTIMONIALS ── */
.testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.testi-card {
  background: var(--white); border: 1px solid var(--border);
  border-radius: var(--rl); padding: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,.04);
}
.testi-stars { color: #f59e0b; font-size: .95rem; margin-bottom: 12px; letter-spacing: 3px; }
.testi-text { font-size: .88rem; color: var(--g700); line-height: 1.7; margin-bottom: 16px; font-style: italic; }
.testi-author { display: flex; align-items: center; gap: 11px; }
.testi-avatar {
  width: 38px; height: 38px; border-radius: 50%;
  display: grid; place-items: center;
  font-size: .88rem; font-weight: 800; flex-shrink: 0;
}
.testi-name { font-size: .87rem; font-weight: 700; color: var(--g900); }
.testi-loc { font-size: .76rem; color: var(--g400); }

/* ── FAQ ── */
.faq-list { max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; gap: 9px; }
.faq-item {
  border: 1px solid var(--border); border-radius: var(--r);
  overflow: hidden; transition: border-color .2s;
  background: var(--white);
}
.faq-item.open { border-color: var(--blue-bd); }
.faq-q {
  display: flex; justify-content: space-between; align-items: center;
  padding: 17px 20px; cursor: pointer;
  font-size: .93rem; font-weight: 600; color: var(--g900);
  background: transparent; transition: background .15s;
  gap: 14px; border: none; width: 100%; text-align: left; font-family: 'Plus Jakarta Sans', sans-serif;
}
.faq-q:hover { background: var(--g50); }
.faq-icon {
  width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
  display: grid; place-items: center;
  background: var(--blue-lt); color: var(--blue);
  font-size: .95rem; line-height: 1; transition: transform .25s;
}
.faq-item.open .faq-icon { transform: rotate(45deg); }
.faq-a {
  font-size: .86rem; color: var(--g500); line-height: 1.7;
  padding: 0 20px; max-height: 0; overflow: hidden;
  transition: max-height .3s ease, padding .3s ease;
}
.faq-item.open .faq-a { max-height: 200px; padding: 0 20px 16px; }

/* ── CTA BAND ── */
.cta-band {
  padding: 80px 0;
  background: linear-gradient(135deg, var(--blue-deep) 0%, #0d2355 50%, var(--blue-hero) 100%);
  position: relative; overflow: hidden;
}
.cta-band-glow {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 60% 100% at 50% 50%, rgba(26,86,219,.15) 0%, transparent 70%);
}
.cta-inner { text-align: center; position: relative; z-index: 1; }
.cta-inner h2 {
  font-size: clamp(1.75rem, 3.2vw, 2.7rem);
  font-weight: 900; color: var(--white); margin-bottom: 12px; line-height: 1.15;
}
.cta-inner h2 em { font-style: italic; color: #7aa4f5; }
.cta-inner p { font-size: .97rem; color: rgba(255,255,255,.55); margin-bottom: 34px; }
.cta-actions { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.cta-trust { display: flex; justify-content: center; gap: 26px; margin-top: 26px; flex-wrap: wrap; }
.cta-trust-item { display: flex; align-items: center; gap: 6px; font-size: .81rem; color: rgba(255,255,255,.5); }

/* ── FOOTER ── */
footer {
  background: var(--blue-deep); padding: 52px 0 28px;
  border-top: 1px solid rgba(255,255,255,.05);
}
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 36px; margin-bottom: 44px; }
.footer-brand-desc { font-size: .84rem; color: rgba(255,255,255,.45); margin: 12px 0 18px; line-height: 1.7; max-width: 250px; }
.footer-social { display: flex; gap: 9px; }
.social-btn {
  width: 33px; height: 33px; border-radius: 8px;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
  display: grid; place-items: center; font-size: .95rem; text-decoration: none;
  transition: background .15s, border-color .15s;
}
.social-btn:hover { background: rgba(26,86,219,.3); border-color: rgba(122,164,245,.35); }
.footer-col-title { font-size: .88rem; font-weight: 800; color: var(--white); margin-bottom: 14px; }
.footer-links { list-style: none; display: flex; flex-direction: column; gap: 9px; }
.footer-links a { font-size: .82rem; color: rgba(255,255,255,.45); text-decoration: none; transition: color .15s; }
.footer-links a:hover { color: #7aa4f5; }
.footer-nav-logo-text { font-size: 1.05rem; font-weight: 800; color: var(--white); }
.footer-nav-logo-text em { color: #7aa4f5; font-style: normal; }
.footer-bottom { padding-top: 20px; border-top: 1px solid rgba(255,255,255,.05); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
.footer-copy { font-size: .77rem; color: rgba(255,255,255,.2); }
.footer-legal { display: flex; gap: 18px; }
.footer-legal a { font-size: .77rem; color: rgba(255,255,255,.2); text-decoration: none; }
.footer-legal a:hover { color: rgba(255,255,255,.45); }

/* ── RESPONSIVE ── */
@media (max-width: 980px) {
  .hero-content { grid-template-columns: 1fr; gap: 36px; }
  .hero-card-wrap { max-width: 460px; margin: 0 auto; animation: none; }
  .tests-grid { grid-template-columns: repeat(2, 1fr); }
  .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
  .steps-grid::before { display: none; }
  .pricing-wrap { grid-template-columns: 1fr; }
  .why-grid { grid-template-columns: repeat(2, 1fr); }
  .testimonials-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .nav-links { display: none; }
  .nav-mobile-toggle { display: block; }
}
@media (max-width: 600px) {
  .hero h1 { font-size: 2.1rem; }
  .tests-grid { grid-template-columns: 1fr 1fr; }
  .steps-grid { grid-template-columns: 1fr; }
  .why-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
  .logos-inner { gap: 20px; }
  .hero-trust { flex-wrap: wrap; gap: 18px; }
}
`;

/* ── DATA ──────────────────────────────────────────────────── */
const BASE_TESTS = [
  { icon: "❤️", name: "Lipid Profile",      count: "8 tests · Heart health"      },
  { icon: "🫁", name: "Liver Function",     count: "11 tests · LFT panel"        },
  { icon: "🫘", name: "Kidney Function",    count: "6 tests · Renal profile"     },
  { icon: "💉", name: "Hemogram CBC",       count: "21 tests · Full blood count" },
  { icon: "🦋", name: "Thyroid Panel",      count: "TSH, FT3, FT4"              },
  { icon: "☀️", name: "Vitamins & Minerals",count: "Vit D, B12, Folate, Mg"     },
  { icon: "🩸", name: "Diabetes Profile",   count: "HbA1c, FBS, Insulin"        },
  { icon: "🔬", name: "Pancreatic",         count: "Amylase, Lipase"            },
];

const ADDONS_PREVIEW = [
  { icon: "🎗️", name: "Cancer Screening Panel", price: "from AED 50" },
  { icon: "🌸", name: "Hormone Profile",         price: "from AED 50" },
  { icon: "🧲", name: "Full Iron Profile",        price: "AED 80"      },
  { icon: "⚡", name: "Electrolytes & CRP",       price: "from AED 30" },
  { icon: "🧬", name: "Allergy / Intolerance",    price: "from AED 150"},
];

const STEPS = [
  { icon: "📋", title: "Choose Your Package",  desc: "Start with ArogyaPlus 100 base and add optional tests to fit your health goals." },
  { icon: "📅", title: "Book a Time Slot",     desc: "Pick a date and preferred time window. Morning or evening — we work around you." },
  { icon: "🏠", title: "We Come to You",       desc: "Our certified phlebotomist arrives at your home or office at the scheduled time." },
  { icon: "📲", title: "Get Your Results",     desc: "Receive a detailed digital report within 24 hours on email and WhatsApp." },
];

const WHY_CARDS = [
  { icon: "🏠", bg: "blue-bg",   title: "Free Home Collection",    desc: "No travel, no queues. Our certified team comes to your door anywhere in the UAE."                      },
  { icon: "🔬", bg: "teal-bg",   title: "MOHAP Certified Lab",     desc: "All samples processed in UAE Ministry of Health approved, ISO-accredited laboratories."              },
  { icon: "⚡", bg: "sky-bg",    title: "24-Hour Results",         desc: "Detailed digital reports delivered to your email and WhatsApp within 24 hours of collection."        },
  { icon: "💊", bg: "green-bg",  title: "100+ Tests in One Draw",  desc: "ArogyaPlus covers over 100 biomarkers in a single blood draw — unrivalled value."                   },
  { icon: "👨‍⚕️", bg: "purple-bg", title: "Doctor Report Review",    desc: "Add a 30-minute consultation with a specialist doctor to walk through your results together."        },
  { icon: "💳", bg: "indigo-bg", title: "Pay on Collection",       desc: "No advance payment required. Pay cash or card when our team arrives at your home."                   },
];

const TESTIMONIALS = [
  { stars: 5, text: "Absolutely seamless. Booked the night before, the nurse arrived at 7am sharp. Results were on WhatsApp by evening. Will never go to a clinic again.", name: "Rania M.", loc: "Dubai Marina", color: "#1a56db" },
  { stars: 5, text: "I added the hormone panel and cancer markers. The report was incredibly detailed and easy to understand. My doctor was impressed by the range of tests.", name: "Karthik P.", loc: "Sharjah", color: "#16a34a" },
  { stars: 5, text: "As someone with diabetes, I need regular tests. CareHub has made this completely stress-free. The HbA1c results come faster than the clinic ever managed.", name: "Fatima A.", loc: "Abu Dhabi", color: "#7c3aed" },
];

const FAQS = [
  { q: "Do I need to fast before my blood test?", a: "For the base ArogyaPlus 100 package (which includes fasting tests like blood glucose and lipid profile), we recommend fasting for 10–12 hours before collection. Our team will confirm fasting requirements when booking." },
  { q: "Which areas do you cover in the UAE?", a: "We cover all 7 emirates — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Home collection is available 7 days a week, 7am–8pm." },
  { q: "How do I receive my results?", a: "Your detailed report is sent as a PDF to your email and WhatsApp within 24 hours of sample collection. The report includes reference ranges and flagged values for easy review." },
  { q: "Can I book for multiple family members?", a: "Yes! Let us know during booking how many individuals need testing. Our phlebotomist will collect all samples in a single visit. Family discounts are available for 3+ members." },
  { q: "What if I need to reschedule my appointment?", a: "You can reschedule up to 2 hours before your appointment at no charge. Just WhatsApp us on +971 50 886 0612 or call and we'll sort it out." },
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
        <div className="nav-logo-text">Care<em>Hub</em></div>
      </a>
      <div className="nav-links">
        <a href="#tests">What's Included</a>
        <a href="#how">How It Works</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
      </div>
      <button className="nav-cta" onClick={onBook}>Book Now →</button>
      <button className="nav-mobile-toggle" onClick={onBook}>☰</button>
    </nav>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button className="faq-q" onClick={() => setOpen(o => !o)}>
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
    window.location.href = "/package";
  };

  return (
    <>
      <style>{css}</style>

      <Navbar onBook={handleBook} />

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-grid-lines" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />
        <div className="container">
          <div className="hero-content">
            {/* Left */}
            <div>
              <div className="hero-badge animate-up">
                <span className="hero-badge-dot" />
                UAE's Premium Home Health Testing
              </div>
              <h1 className="animate-up delay-1">
                100+ Tests.<br />
                <span className="accent-blue">Zero Hassle.</span><br />
                Your Doorstep.
              </h1>
              <p className="hero-sub animate-up delay-2">
                ArogyaPlus brings a complete health screening to your home. Certified nurses, same-day collection, 24-hour digital results — starting at just <strong style={{color:"#7aa4f5"}}>AED 499</strong>.
              </p>
              <div className="hero-actions animate-up delay-3">
                <button className="btn-primary-hero" onClick={handleBook}>
                  Build My Package →
                </button>
                <a href="https://wa.me/971508860612" className="btn-ghost-hero">
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
                    <span className="hero-card-label">ArogyaPlus 100</span>
                    <div className="hero-card-price">499 <small>AED</small></div>
                  </div>
                  <div className="hero-card-tests">
                    {BASE_TESTS.slice(0, 6).map(t => (
                      <div className="hero-test-pill" key={t.name}>
                        <span className="hero-test-dot" />
                        {t.name}
                      </div>
                    ))}
                  </div>
                  <div style={{marginTop:11,fontSize:".74rem",color:"rgba(255,255,255,.4)",textAlign:"center"}}>
                    + {BASE_TESTS.length - 6} more panels · 100+ biomarkers total
                  </div>
                </div>
                <div className="hero-mini-card">
                  <span className="hero-mini-icon">🏠</span>
                  <div className="hero-mini-text">
                    <strong>Free Home Collection</strong>
                    Our nurse comes to you · 7am–8pm daily
                  </div>
                </div>
                <div className="hero-mini-card" style={{background:"rgba(26,86,219,.15)",border:"1px solid rgba(122,164,245,.2)"}}>
                  <span className="hero-mini-icon">📲</span>
                  <div className="hero-mini-text">
                    <strong>Results in 24 Hours</strong>
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
            {["🏥 MOHAP Approved","🧪 ISO Accredited Lab","✅ DHA Licensed","🔒 HIPAA Compliant","⭐ Google 4.9★"].map(l => (
              <div className="logo-pill" key={l}>
                <span>{l.split(" ")[0]}</span>
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
            <div className="section-eyebrow eyebrow-blue">What's Inside</div>
            <h2 className="section-title">100+ Tests in One Package</h2>
            <p className="section-desc">The ArogyaPlus 100 base package covers every major organ system — heart, liver, kidneys, thyroid, blood, and more. All from a single blood draw.</p>
          </div>
          <div className="tests-grid">
            {BASE_TESTS.map(t => (
              <div className="test-card" key={t.name}>
                <div className="test-card-icon">{t.icon}</div>
                <div className="test-card-name">{t.name}</div>
                <div className="test-card-count">{t.count}</div>
              </div>
            ))}
            <div className="tests-plus">
              ➕ Customize with<br />
              <span style={{color:"var(--blue)",fontSize:"1.15rem"}}>15+ Add-On Tests</span><br />
              <span style={{fontSize:".79rem",opacity:.65}}>Cancer · Hormones · Allergy · Iron</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="steps-section" id="how">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow" style={{color:"#7aa4f5"}}>Simple Process</div>
            <h2 className="section-title" style={{color:"#fff"}}>Health Testing, Reimagined</h2>
            <p className="section-desc" style={{color:"rgba(255,255,255,.5)"}}>From booking to results in under 24 hours. No clinic visits, no waiting rooms.</p>
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
            <div className="section-eyebrow eyebrow-blue">Transparent Pricing</div>
            <h2 className="section-title">One Price. No Surprises.</h2>
            <p className="section-desc">AED 499 covers everything in the base package. Add optional tests at clear, fixed prices. Home collection always included.</p>
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
                <div className="price-sub">One-time · Includes everything below</div>
                <div className="price-incl">✓ Free home collection included</div>
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
                  ].map(f => (
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
              <div className="addon-side-sub">Enhance your package with targeted tests. Prices update automatically in the builder.</div>
              {ADDONS_PREVIEW.map(a => (
                <div className="addon-chip" key={a.name}>
                  <span className="addon-chip-left">
                    <span className="addon-chip-icon">{a.icon}</span>
                    {a.name}
                  </span>
                  <span className="addon-chip-price">{a.price}</span>
                </div>
              ))}
              <div className="addons-more">+ Doctor Consultation · Priority 6hr Results · and more</div>
              <button className="price-cta" style={{marginTop:14}} onClick={handleBook}>
                See All Add-Ons →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow eyebrow-blue">Why CareHub</div>
            <h2 className="section-title">Built Around Your Life</h2>
            <p className="section-desc">We designed every part of this experience to be effortless, trustworthy, and genuinely better than a clinic visit.</p>
          </div>
          <div className="why-grid">
            {WHY_CARDS.map(w => (
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
            <div className="section-eyebrow eyebrow-blue">Patient Stories</div>
            <h2 className="section-title">Loved Across the UAE</h2>
            <p className="section-desc">Over 8,400 patients have trusted CareHub with their health. Here's what some of them say.</p>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map(t => (
              <div className="testi-card" key={t.name}>
                <div className="testi-stars">{"★".repeat(t.stars)}</div>
                <div className="testi-text">"{t.text}"</div>
                <div className="testi-author">
                  <div className="testi-avatar" style={{background:`${t.color}18`,color:t.color}}>
                    {t.name.split(" ").map(n => n[0]).join("")}
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
      <section className="section section-alt" id="faq">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow eyebrow-blue">FAQ</div>
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div className="faq-list">
            {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="cta-band">
        <div className="cta-band-glow" />
        <div className="container">
          <div className="cta-inner">
            <h2>Your Health Deserves<br /><em>More Than a Waiting Room.</em></h2>
            <p>Book your ArogyaPlus home health screening today. Starts from AED 499.</p>
            <div className="cta-actions">
              <button className="btn-primary-hero" style={{fontSize:"1rem",padding:"15px 34px"}} onClick={handleBook}>
                Build My Package →
              </button>
              <a href="https://wa.me/971508860612" className="btn-ghost-hero" style={{fontSize:"1rem",padding:"14px 28px"}}>
                💬 WhatsApp Us
              </a>
            </div>
            <div className="cta-trust">
              {["🏠 Free Home Collection","⚡ Results in 24 Hours","💳 Pay on Collection","📞 24/7 Support"].map(t => (
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
              <a href="/" className="nav-logo" style={{marginBottom:0,textDecoration:"none"}}>
                <div className="nav-logo-mark">C</div>
                <div className="footer-nav-logo-text">Care<em>Hub</em></div>
              </a>
              <p className="footer-brand-desc">
                UAE's most trusted home health testing service. Bringing certified diagnostics to your doorstep since 2021.
              </p>
              <div className="footer-social">
                {["📘","📸","🐦","💼"].map((s, i) => <a key={i} href="#" className="social-btn">{s}</a>)}
              </div>
            </div>
            <div>
              <div className="footer-col-title">Services</div>
              <ul className="footer-links">
                {["ArogyaPlus 100","Add-On Tests","Cancer Screening","Hormone Panel","Doctor Consultation"].map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                {["About Us","How It Works","Certifications","Careers","Blog"].map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Contact</div>
              <ul className="footer-links">
                <li><a href="tel:+971508860612">📞 +971 50 886 0612</a></li>
                <li><a href="https://wa.me/971508860612">💬 WhatsApp</a></li>
                <li><a href="mailto:hello@carehub.ae">✉️ hello@carehub.ae</a></li>
                <li><a href="#">📍 Dubai, UAE</a></li>
                <li style={{color:"rgba(255,255,255,.25)",fontSize:".81rem",marginTop:3}}>Available 7am–8pm · 7 days</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2025 CareHub Health Services LLC · All rights reserved</span>
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
