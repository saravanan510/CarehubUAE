"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../assets/carehub_logo.png";

/* ─── FIREBASE (dynamic import so it only runs client-side) ─── */
let db: any = null;
let fbReady = false;

async function initFirebase() {
  if (fbReady) return db;

  // Import from the local npm package instead of a URL
  const { initializeApp } = await import("firebase/app");
  const { getDatabase } = await import("firebase/database");

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  db = getDatabase(app);
  fbReady = true;
  return db;
}

async function fbPush(path: string, data: any) {
  const db = await initFirebase();
  const { ref, push, set } = await import("firebase/database");
  const newRef = push(ref(db, path));
  await set(newRef, data);
  return newRef;
}

function useFirebaseValue<T>(path: string): T | null {
  const [val, setVal] = useState<T | null>(null);
  useEffect(() => {
    let unsub: any;
    (async () => {
      const db = await initFirebase();
      const { ref, onValue } = await import("firebase/database");
      const r = ref(db, path);
      unsub = onValue(r, (snap) => setVal(snap.val()));
    })();
    return () => {
      if (unsub) unsub();
    };
  }, [path]);
  return val;
}

/* ─── TYPES ─── */
interface Content {
  siteName?: string;
  siteTagline?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  pkgSectionTitle?: string;
  pkgSectionDesc?: string;
  whyTitle?: string;
  whyDesc?: string;
  stepsTitle?: string;
  testiTitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  footerText?: string;
  trust1?: string;
  trust2?: string;
  trust3?: string;
  trust4?: string;
  heroStats?: { num: string; label: string }[];
}

interface PackageItem {
  id: string;
  name: string;
  tagline?: string;
  price: number | string;
  currency?: string;
  category?: string;
  icon?: string;
  featured?: boolean;
  order?: number;
  tests?: string[];
  customTests?: string[];
}

interface TestItem {
  id: string;
  name: string;
  code?: string;
  category?: string;
  description?: string;
  price?: number;
}

/* ─── STYLES ─── */
const css = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --blue:#15803D;--blue-mid:#16A34A;--blue-light:#F0FDF4;--blue-pale:#DCFCE7;
    --indigo:#3730A3;--accent:#0EA5E9;--orange:#F97316;--green:#10B981;
    --white:#FFFFFF;--bg:#F8FAFC;--surface:#FFFFFF;--text:#0F172A;
    --text-md:#334155;--muted:#64748B;--border:#E2E8F0;
    --radius-sm:8px;--radius:14px;--radius-lg:20px;
    --shadow-sm:0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.04);
    --shadow:0 4px 16px rgba(15,23,42,.08);
    --shadow-md:0 8px 32px rgba(15,23,42,.12);
  }
  html{scroll-behavior:smooth}
  body{font-family:'Nunito Sans',sans-serif;color:var(--text);background:var(--bg);line-height:1.6}

  #loader{position:fixed;inset:0;background:#fff;display:flex;align-items:center;justify-content:center;z-index:9999;transition:opacity .4s ease}
  #loader.out{opacity:0;pointer-events:none}
  .ld-logo{display:flex;flex-direction:column;align-items:center;gap:16px}
  .ld-ring{width:48px;height:48px;border:3px solid var(--blue-pale);border-top-color:var(--blue-mid);border-radius:50%;animation:spin .8s linear infinite}
  .ld-text{font-family:'Nunito',sans-serif;font-weight:700;font-size:1.1rem;color:var(--blue);letter-spacing:.02em}
  @keyframes spin{to{transform:rotate(360deg)}}

  .skel{background:linear-gradient(90deg,var(--border) 25%,#f0f0f0 50%,var(--border) 75%);background-size:200% 100%;animation:skel 1.5s infinite;border-radius:8px}
  @keyframes skel{0%{background-position:200% 0}100%{background-position:-200% 0}}

  .topbar{background:#fff;border-bottom:1px solid var(--border);padding:0 0;position:sticky;top:0;z-index:200;box-shadow:var(--shadow-sm)}
  .topbar-inner{max-width:1200px;margin:0 auto;padding:0 32px;height:68px;display:flex;align-items:center;justify-content:space-between}
  .brand{display:flex;align-items:center;gap:12px;text-decoration:none}
  .brand-icon{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,var(--blue) 0%,var(--blue-mid) 100%);display:flex;align-items:center;justify-content:center}
  .brand-icon svg{width:24px;height:24px;fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
  .brand-text{display:flex;flex-direction:column;line-height:1.2}
  .brand-name{font-family:'Nunito',sans-serif;font-weight:800;font-size:1.2rem;color:var(--blue);letter-spacing:-.01em}
  .brand-sub{font-size:.7rem;color:var(--muted);font-weight:600;letter-spacing:.04em;text-transform:uppercase}
  .nav-links{display:flex;align-items:center;gap:8px}
  .nav-link{padding:8px 16px;font-size:.875rem;font-weight:600;color:var(--text-md);border-radius:var(--radius-sm);text-decoration:none;transition:all .18s}
  .nav-link:hover{background:var(--blue-light);color:var(--blue-mid)}
  .nav-btn{padding:10px 22px;background:var(--blue-mid);color:#fff;border:none;border-radius:var(--radius-sm);font-size:.875rem;font-weight:700;cursor:pointer;transition:all .18s;font-family:inherit}
  .nav-btn:hover{background:var(--blue);transform:translateY(-1px);box-shadow:0 4px 12px rgba(37,99,235,.35)}
  .ham{display:none;background:none;border:none;cursor:pointer;padding:8px;border-radius:6px;color:var(--text-md)}
  .ham:hover{background:var(--blue-light)}
  .mobile-nav{display:none;flex-direction:column;gap:4px;padding:16px 24px;background:#fff;border-bottom:1px solid var(--border)}
  .mobile-nav.open{display:flex}
  .mobile-nav .nav-link{display:block;padding:12px 16px}

  .hero{background:linear-gradient(135deg, #14532d 0%, #15803d 35%, #16a34a 70%, #22c55e 100%);padding:80px 32px 0;overflow:hidden;position:relative}
  .hero::after{content:'';position:absolute;bottom:0;left:0;right:0;height:80px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%)}
  .hero-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 420px;gap:60px;align-items:center;padding-bottom:100px;position:relative;z-index:1}
  .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);border-radius:20px;padding:6px 16px;margin-bottom:20px;width:fit-content}
  .hero-badge-dot{width:8px;height:8px;border-radius:50%;background:#34D399;animation:pulse 2s ease infinite}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.85)}}
  .hero-badge span{font-size:.75rem;font-weight:700;color:rgba(255,255,255,.9);letter-spacing:.06em;text-transform:uppercase}
  .hero h1{font-family:'Nunito',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:800;color:#fff;line-height:1.18;margin-bottom:18px;letter-spacing:-.02em}
  .hero h1 em{font-style:normal;color:#93C5FD}
  .hero-sub{font-size:1.05rem;color:rgba(255,255,255,.78);line-height:1.75;margin-bottom:36px;max-width:520px}
  .hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:48px}
  .btn-hero-primary{padding:14px 30px;background:#fff;color:var(--blue);border:none;border-radius:var(--radius-sm);font-size:.95rem;font-weight:700;cursor:pointer;transition:all .18s;font-family:inherit}
  .btn-hero-primary:hover{background:#EFF6FF;transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.2)}
  .btn-hero-ghost{padding:13px 28px;background:rgba(255,255,255,.12);color:#fff;border:1.5px solid rgba(255,255,255,.35);border-radius:var(--radius-sm);font-size:.95rem;font-weight:700;cursor:pointer;transition:all .18s;font-family:inherit}
  .btn-hero-ghost:hover{background:rgba(255,255,255,.2)}
  .hero-stats{display:flex;gap:32px;flex-wrap:wrap}
  .hstat{border-right:1px solid rgba(255,255,255,.2);padding-right:32px}
  .hstat:last-child{border-right:none;padding-right:0}
  .hstat-num{font-family:'Nunito',sans-serif;font-size:1.7rem;font-weight:800;color:#fff;line-height:1}
  .hstat-lbl{font-size:.75rem;color:rgba(255,255,255,.6);margin-top:4px;text-transform:uppercase;letter-spacing:.05em;font-weight:600}
  .hero-card{background:#fff;border-radius:var(--radius-lg);padding:28px;box-shadow:0 24px 60px rgba(0,0,0,.25)}
  .hcard-header{display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border)}
  .hcard-icon{width:42px;height:42px;border-radius:10px;background:var(--blue-light);display:flex;align-items:center;justify-content:center;font-size:1.3rem}
  .hcard-title{font-family:'Nunito',sans-serif;font-weight:800;font-size:1rem;color:var(--text)}
  .hcard-sub{font-size:.75rem;color:var(--muted)}
  .hcard-item{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)}
  .hcard-item:last-of-type{border-bottom:none;padding-bottom:0}
  .hcard-item-left{display:flex;align-items:center;gap:10px}
  .hcard-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
  .hcard-lbl{font-size:.85rem;color:var(--text-md);font-weight:600}
  .hcard-price{font-family:'Nunito',sans-serif;font-weight:800;font-size:.95rem;color:var(--blue)}
  .hcard-book{width:100%;margin-top:18px;padding:12px;background:var(--blue-mid);color:#fff;border:none;border-radius:var(--radius-sm);font-size:.9rem;font-weight:700;cursor:pointer;font-family:inherit;transition:background .18s}
  .hcard-book:hover{background:var(--blue)}

  .trust{background:#fff;border-bottom:1px solid var(--border);padding:18px 32px}
  .trust-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap}
  .trust-item{display:flex;align-items:center;gap:10px}
  .trust-ic{width:34px;height:34px;border-radius:8px;background:var(--blue-light);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
  .trust-text strong{display:block;font-size:.82rem;font-weight:700;color:var(--text);line-height:1.2}
  .trust-text span{font-size:.72rem;color:var(--muted)}
  .trust-div{width:1px;height:36px;background:var(--border)}

  .section{padding:72px 32px}
  .section-inner{max-width:1200px;margin:0 auto}
  .sec-head{text-align:center;margin-bottom:52px}
  .sec-eye{display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--blue-mid);background:var(--blue-light);padding:5px 14px;border-radius:20px;margin-bottom:12px}
  .sec-title{font-family:'Nunito',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:800;color:var(--text);letter-spacing:-.02em;margin-bottom:12px}
  .sec-desc{color:var(--muted);max-width:520px;margin:0 auto;font-size:.95rem;line-height:1.75}

  #packages{background:var(--bg)}
  .filter-row{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:40px}
  .filter-btn{padding:8px 20px;border:1.5px solid var(--border);background:#fff;border-radius:20px;font-size:.82rem;font-weight:700;color:var(--muted);cursor:pointer;transition:all .18s;font-family:inherit}
  .filter-btn.active,.filter-btn:hover{background:var(--blue-mid);border-color:var(--blue-mid);color:#fff}
  #pkg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:24px}
  .pkg-card{background:#fff;border-radius:var(--radius-lg);border:1.5px solid var(--border);overflow:hidden;display:flex;flex-direction:column;transition:transform .22s,box-shadow .22s;position:relative}
  .pkg-card:hover{transform:translateY(-5px);box-shadow:var(--shadow-md)}
  .pkg-card.pop{border-color:var(--blue-mid)}
  .pop-ribbon{position:absolute;top:0;right:0;background:var(--blue-mid);color:#fff;font-size:.68rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:6px 16px 6px 12px;border-bottom-left-radius:10px}
  .pkg-top{padding:24px 24px 18px;border-bottom:1px solid var(--border)}
  .pkg-icon-row{display:flex;align-items:center;gap:12px;margin-bottom:14px}
  .pkg-icon{width:46px;height:46px;border-radius:12px;background:var(--blue-light);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0}
  .pkg-card.pop .pkg-icon{background:var(--blue-pale)}
  .pkg-name{font-family:'Nunito',sans-serif;font-size:1.1rem;font-weight:800;color:var(--text);line-height:1.2}
  .pkg-tag{font-size:.78rem;color:var(--muted);margin-top:2px}
  .pkg-price-row{display:flex;align-items:flex-end;gap:6px;margin-top:4px}
  .pkg-cur{font-size:.82rem;font-weight:700;color:var(--blue-mid);margin-bottom:5px}
  .pkg-amt{font-family:'Nunito',sans-serif;font-size:2.2rem;font-weight:800;color:var(--blue);line-height:1}
  .pkg-per{font-size:.78rem;color:var(--muted);margin-bottom:6px}
  .pkg-tests-cnt{display:inline-flex;align-items:center;gap:6px;background:var(--blue-light);color:var(--blue-mid);font-size:.75rem;font-weight:700;padding:4px 12px;border-radius:12px;margin-top:10px}
  .pkg-body{padding:20px 24px;flex:1}
  .pkg-tests-lbl{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:12px}
  .pkg-tests{list-style:none;display:flex;flex-direction:column;gap:9px}
  .pkg-tests li{display:flex;align-items:flex-start;gap:10px;font-size:.875rem;color:var(--text-md);line-height:1.45}
  .pkg-tests li .chk{width:18px;height:18px;border-radius:50%;background:var(--blue-light);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
  .pkg-tests li .chk svg{width:10px;height:10px;stroke:var(--blue-mid);fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
  .pkg-footer{padding:0 24px 24px}
  .pkg-btn{width:100%;padding:13px;border-radius:var(--radius-sm);border:2px solid var(--blue-mid);background:transparent;color:var(--blue-mid);font-size:.9rem;font-weight:700;cursor:pointer;transition:all .18s;font-family:inherit}
  .pkg-btn:hover,.pkg-card.pop .pkg-btn{background:var(--blue-mid);color:#fff}
  .empty-pkgs{text-align:center;padding:64px 20px;color:var(--muted);grid-column:1/-1}
  .empty-pkgs .e-icon{font-size:3rem;margin-bottom:14px}

  #why{background:#fff;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
  .why-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:24px}
  .why-card{background:var(--bg);border-radius:var(--radius);padding:28px 24px;text-align:center;border:1px solid var(--border);transition:box-shadow .18s}
  .why-card:hover{box-shadow:var(--shadow)}
  .why-ic{width:54px;height:54px;border-radius:14px;background:linear-gradient(135deg,var(--blue-light),var(--blue-pale));display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin:0 auto 16px}
  .why-title{font-family:'Nunito',sans-serif;font-weight:800;font-size:.95rem;color:var(--text);margin-bottom:8px}
  .why-desc{font-size:.82rem;color:var(--muted);line-height:1.65}

  #how{background:linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)}
  .steps-row{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:0;position:relative}
  .steps-row::before{content:'';position:absolute;top:32px;left:14%;right:14%;height:2px;background:linear-gradient(90deg,var(--blue-pale),var(--blue-mid),var(--blue-pale));z-index:0}
  .step{text-align:center;padding:0 16px;position:relative;z-index:1}
  .step-num{width:64px;height:64px;border-radius:50%;background:var(--blue-mid);color:#fff;font-family:'Nunito',sans-serif;font-size:1.4rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 4px 16px rgba(37,99,235,.35);position:relative;z-index:1}
  .step-title{font-family:'Nunito',sans-serif;font-weight:800;font-size:.95rem;color:var(--text);margin-bottom:8px}
  .step-desc{font-size:.82rem;color:var(--muted);line-height:1.65}

  #reviews{background:var(--bg)}
  .reviews-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}
  .rev-card{background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:26px;transition:box-shadow .18s}
  .rev-card:hover{box-shadow:var(--shadow)}
  .rev-stars{color:#F59E0B;font-size:1rem;letter-spacing:2px;margin-bottom:14px}
  .rev-text{font-size:.9rem;color:var(--text-md);line-height:1.75;margin-bottom:20px}
  .rev-author{display:flex;align-items:center;gap:12px}
  .rev-av{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--blue) 0%,var(--accent) 100%);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:.85rem}
  .rev-name{font-weight:700;font-size:.88rem;color:var(--text)}
  .rev-loc{font-size:.75rem;color:var(--muted);margin-top:2px}

  .cta-band{background:linear-gradient(135deg, #14532d 0%, #15803d 35%, #16a34a 70%, #22c55e 100%);padding:72px 32px;text-align:center}
  .cta-band-inner{max-width:680px;margin:0 auto}
  .cta-band h2{font-family:'Nunito',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:800;color:#fff;letter-spacing:-.02em;margin-bottom:14px}
  .cta-band p{color:rgba(255,255,255,.75);font-size:1rem;line-height:1.75;margin-bottom:36px}
  .cta-btns{display:flex;justify-content:center;gap:14px;flex-wrap:wrap}
  .cta-primary{padding:14px 32px;background:#fff;color:var(--blue);border:none;border-radius:var(--radius-sm);font-size:.95rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .18s}
  .cta-primary:hover{background:#EFF6FF;transform:translateY(-2px)}
  .cta-ghost{padding:13px 28px;background:rgba(255,255,255,.1);color:#fff;border:1.5px solid rgba(255,255,255,.35);border-radius:var(--radius-sm);font-size:.95rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .18s}
  .cta-ghost:hover{background:rgba(255,255,255,.2)}

  footer{background:#0F172A;color:rgba(255,255,255,.55);padding:40px 32px}
  .footer-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px}
  .footer-brand{display:flex;align-items:center;gap:10px}
  .footer-brand-icon{width:36px;height:36px;border-radius:9px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:1.1rem}
  .footer-brand-name{font-family:'Nunito',sans-serif;font-weight:800;color:rgba(255,255,255,.8);font-size:.95rem}
  .footer-links{display:flex;gap:24px;flex-wrap:wrap}
  .footer-links a{color:rgba(255,255,255,.45);font-size:.8rem;text-decoration:none;transition:color .15s}
  .footer-links a:hover{color:rgba(255,255,255,.8)}
  .footer-copy{font-size:.78rem;color:rgba(255,255,255,.3)}

  .overlay{position:fixed;inset:0;background:rgba(15,23,42,.6);z-index:500;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .25s;padding:20px}
  .overlay.open{opacity:1;pointer-events:all}
  .modal{background:#fff;border-radius:var(--radius-lg);padding:36px;width:100%;max-width:480px;transform:scale(.96);transition:transform .25s;max-height:90vh;overflow-y:auto}
  .overlay.open .modal{transform:scale(1)}
  .modal-head{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px}
  .modal-title{font-family:'Nunito',sans-serif;font-weight:800;font-size:1.3rem;color:var(--text)}
  .modal-sub{font-size:.83rem;color:var(--muted);margin-top:3px}
  .modal-close{background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--muted);line-height:1;padding:4px}
  .modal-close:hover{color:var(--text)}
  .m-group{margin-bottom:16px}
  .m-group label{display:block;font-size:.78rem;font-weight:700;color:var(--text-md);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em}
  .m-group input,.m-group select{width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-size:.9rem;outline:none;transition:border .18s;font-family:inherit;color:var(--text);background:#fff}
  .m-group input:focus,.m-group select:focus{border-color:var(--blue-mid);box-shadow:0 0 0 3px rgba(37,99,235,.1)}
  .m-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .m-submit{width:100%;margin-top:20px;padding:14px;background:var(--blue-mid);color:#fff;border:none;border-radius:var(--radius-sm);font-size:.95rem;font-weight:700;cursor:pointer;font-family:inherit;transition:background .18s}
  .m-submit:hover{background:var(--blue)}
  .m-submit:disabled{opacity:.6;cursor:not-allowed}

  #toast{position:fixed;bottom:28px;right:28px;z-index:9999;background:var(--text);color:#fff;padding:13px 22px;border-radius:10px;font-size:.88rem;font-weight:600;opacity:0;transform:translateY(8px);transition:all .3s;pointer-events:none;display:flex;align-items:center;gap:10px}
  #toast.on{opacity:1;transform:translateY(0)}
  #toast .t-ic{font-size:1rem}

  .it-card{background:#fff;border:1.5px solid var(--border);border-radius:var(--radius);padding:22px;transition:transform .18s,box-shadow .18s;display:flex;flex-direction:column}
  .it-card:hover{transform:translateY(-3px);box-shadow:var(--shadow)}
  .it-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;gap:10px}
  .it-name{font-family:'Nunito',sans-serif;font-weight:800;font-size:1rem;color:var(--text);line-height:1.3;flex:1}
  .it-code{font-size:.72rem;color:var(--muted);background:var(--bg);padding:2px 8px;border-radius:6px;white-space:nowrap}
  .it-cat{display:inline-flex;align-items:center;gap:4px;background:var(--blue-light);color:var(--blue-mid);font-size:.68rem;font-weight:700;padding:3px 10px;border-radius:10px;margin-bottom:10px}
  .it-desc{font-size:.82rem;color:var(--muted);line-height:1.6;margin-bottom:14px;flex:1}
  .it-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:14px;border-top:1px solid var(--border)}
  .it-price{font-family:'Nunito',sans-serif;font-size:1.3rem;font-weight:800;color:var(--blue)}
  .it-price-cur{font-size:.8rem;font-weight:700;color:var(--blue-mid);margin-right:2px}
  .it-book-btn{padding:10px 20px;background:var(--blue-mid);color:#fff;border:none;border-radius:var(--radius-sm);font-size:.85rem;font-weight:700;cursor:pointer;transition:background .18s;font-family:inherit}
  .it-book-btn:hover{background:var(--blue)}
  .it-empty{text-align:center;padding:48px 20px;color:var(--muted);grid-column:1/-1}
  .it-empty .e-icon{font-size:3rem;margin-bottom:14px}

  @media(max-width:900px){
    .hero-inner{grid-template-columns:1fr;gap:40px}
    .hero-card{display:none}
    .steps-row::before{display:none}
    .nav-links{display:none}
    .ham{display:flex}
  }
  @media(max-width:600px){
    .topbar-inner{padding:0 20px}
    .hero{padding:56px 20px 0}
    .section{padding:52px 20px}
    .trust{padding:16px 20px}
    .trust-div{display:none}
    .trust-inner{gap:20px}
    .cta-band{padding:52px 20px}
    footer{padding:32px 20px}
  }
`;

/* ─── COMPONENT ─── */
export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastIcon, setToastIcon] = useState("✓");
  const [toastVisible, setToastVisible] = useState(false);
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const [preselectedPkg, setPreselectedPkg] = useState("");
  const [preselectedTest, setPreselectedTest] = useState("");

  const content = useFirebaseValue<Content>("content");
  const rawPkgs = useFirebaseValue<Record<string, any>>("packages");
  const rawTests = useFirebaseValue<Record<string, any>>("tests");

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  }, []);

  const allPkgs: PackageItem[] = React.useMemo(() => {
    if (!rawPkgs) return [];
    return Object.entries(rawPkgs)
      .map(([id, p]) => ({ id, ...p }))
      .sort((a, b) => (a.order || 99) - (b.order || 99));
  }, [rawPkgs]);

  const allTests: TestItem[] = React.useMemo(() => {
    if (!rawTests) return [];
    return Object.entries(rawTests)
      .map(([id, t]) => ({ id, ...t }))
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }, [rawTests]);

  const filteredPkgs =
    activeCat === "all"
      ? allPkgs
      : allPkgs.filter((p) => p.category === activeCat);

  const cats = React.useMemo(() => {
    const set = new Set(allPkgs.map((p) => p.category).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [allPkgs]);

  const featured = allPkgs.find((p) => p.featured) || allPkgs[0];

  const filteredTests = React.useMemo(() => {
    const s = search.toLowerCase();
    return allTests.filter(
      (t) =>
        (t.name || "").toLowerCase().includes(s) ||
        (t.category || "").toLowerCase().includes(s) ||
        (t.code || "").toLowerCase().includes(s),
    );
  }, [allTests, search]);

  const testPriceMap = React.useMemo(() => {
    const map: Record<string, number> = {};
    allTests.forEach((t) => {
      if (t.name && t.price) map[t.name] = t.price;
    });
    return map;
  }, [allTests]);

  function toast(msg: string, icon = "✓") {
    setToastMsg(msg);
    setToastIcon(icon);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  }

  function openModal(pkgName?: string) {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
    if (pkgName) {
      setPreselectedPkg(pkgName);
      setTimeout(() => setPreselectedPkg(""), 300);
    }
  }

  function closeModal() {
    setModalOpen(false);
    document.body.style.overflow = "";
  }

  function openTestModal(testName?: string) {
    setTestModalOpen(true);
    document.body.style.overflow = "hidden";
    if (testName) {
      setPreselectedTest(testName);
      setTimeout(() => setPreselectedTest(""), 300);
    }
  }

  function closeTestModal() {
    setTestModalOpen(false);
    document.body.style.overflow = "";
  }

  async function submitBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const fn = String(fd.get("fname") || "").trim();
    const ln = String(fd.get("lname") || "").trim();
    const ph = String(fd.get("phone") || "").trim();
    const em = String(fd.get("email") || "").trim();
    const pk = String(fd.get("pkg") || "").trim();
    const dt = String(fd.get("date") || "").trim();
    const tm = String(fd.get("time") || "").trim();
    const nt = String(fd.get("notes") || "").trim();

    if (!fn || !ph || !em || !pk || !dt || !tm) {
      toast("Please fill in all required fields.", "⚠️");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      toast("Please enter a valid email address.", "⚠️");
      return;
    }

    const btn = e.currentTarget.querySelector(
      "button[type=submit]",
    ) as HTMLButtonElement;
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Submitting...";
    }

    try {
      const pkgPrice = allPkgs.find((p) => p.name === pk)?.price;
      const orderData = {
        customerName: fn + (ln ? " " + ln : ""),
        customerEmail: em,
        customerPhone: ph,
        packageName: pk,
        appointmentDate: new Date(
          dt + "T" + tm.split("–")[0].trim(),
        ).toISOString(),
        timeSlot: tm,
        notes: nt,
        status: "pending",
        createdAt: Date.now(),
        currency: "AED",
        amount: pkgPrice ? Number(pkgPrice) : undefined,
      };
      await fbPush("orders", orderData);
      closeModal();
      toast(`Booking confirmed for ${fn}! We'll call you within 2 hours.`, "✓");
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      toast("Booking failed. Please try again or call us.", "❌");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Confirm Booking";
      }
    }
  }

  async function submitTestBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const test = String(fd.get("test") || "").trim();
    const fn = String(fd.get("fname") || "").trim();
    const ln = String(fd.get("lname") || "").trim();
    const ph = String(fd.get("phone") || "").trim();
    const em = String(fd.get("email") || "").trim();
    const dt = String(fd.get("date") || "").trim();
    const tm = String(fd.get("time") || "").trim();
    const nt = String(fd.get("notes") || "").trim();

    if (!test || !fn || !ph || !em || !dt || !tm) {
      toast("Please fill in all required fields.", "⚠️");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      toast("Please enter a valid email address.", "⚠️");
      return;
    }

    const btn = e.currentTarget.querySelector(
      "button[type=submit]",
    ) as HTMLButtonElement;
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Submitting...";
    }

    try {
      const testPrice = testPriceMap[test] || 0;
      const orderData = {
        type: "individual_test",
        testName: test,
        customerName: fn + (ln ? " " + ln : ""),
        customerEmail: em,
        customerPhone: ph,
        appointmentDate: new Date(
          dt + "T" + tm.split("–")[0].trim(),
        ).toISOString(),
        timeSlot: tm,
        notes: nt,
        status: "pending",
        createdAt: Date.now(),
        currency: "AED",
        amount: testPrice,
      };
      await fbPush("orders", orderData);
      closeTestModal();
      toast(
        `Test booking confirmed for ${fn}! We'll call you within 2 hours.`,
        "✓",
      );
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      toast("Booking failed. Please try again or call us.", "❌");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Book Test";
      }
    }
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const c = content || {};
  const siteName = c.siteName || "ArogyaPlus";
  const heroTitle =
    c.heroTitle || "Your Health\nOur Priority\nExpert Nursing at Home";
  const heroSubtitle =
    c.heroSubtitle ||
    "Preventive care and early detection from certified labs — with free home sample collection and digital reports delivered in 48 hours.";
  const heroStats = c.heroStats || [
    { num: "50K+", label: "Patients Served" },
    { num: "200+", label: "Tests Available" },
    { num: "48hrs", label: "Report Delivery" },
    { num: "98%", label: "Accuracy Rate" },
  ];

  return (
    <>
      <style>{css}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Nunito+Sans:wght@300;400;600&display=swap"
        rel="stylesheet"
      />

      {/* Loader */}
      <div id="loader" className={loaded ? "out" : ""}>
        <div className="ld-logo">
          <div className="ld-ring" />
          <div className="ld-text">{siteName}</div>
        </div>
      </div>

      {/* Topbar */}
      <header>
        <div className="topbar">
          <div className="topbar-inner">
            <a href="#" className="brand">
              <div
                className="brand-icon"
                style={{ background: "transparent", padding: 0 }}
              >
                <Image
                  src={logo}
                  alt="CareHub Logo"
                  width={44}
                  height={44}
                  style={{
                    objectFit: "contain",
                    borderRadius: 12,
                  }}
                />
              </div>
              <div className="brand-text">
                <span className="brand-name">{siteName}</span>
                <span className="brand-sub">
                  {c.siteTagline || "Health Packages"}
                </span>
              </div>
            </a>
            <div className="nav-links">
              <a
                href="#packages"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("packages");
                }}
              >
                Packages
              </a>
              <a
                href="#individual-tests"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("individual-tests");
                }}
              >
                Lab Tests
              </a>
              <a
                href="#why"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("why");
                }}
              >
                Why Us
              </a>
              <a
                href="#how"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("how");
                }}
              >
                How It Works
              </a>
              <a
                href="#reviews"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("reviews");
                }}
              >
                Reviews
              </a>
              <button className="nav-btn" onClick={() => openModal()}>
                Book Now
              </button>
            </div>
            <button
              className="ham"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
          </div>
          <nav className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
            <a
              href="#packages"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("packages");
              }}
            >
              Packages
            </a>
            <a
              href="#individual-tests"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("individual-tests");
              }}
            >
              Lab Tests
            </a>
            <a
              href="#why"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("why");
              }}
            >
              Why Us
            </a>
            <a
              href="#how"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("how");
              }}
            >
              How It Works
            </a>
            <a
              href="#reviews"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("reviews");
              }}
            >
              Reviews
            </a>
            <button
              className="nav-btn"
              style={{ width: "100%", marginTop: 4 }}
              onClick={() => {
                openModal();
                setMobileOpen(false);
              }}
            >
              Book Now
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" id="hero-section">
        <div className="hero-inner">
          <div>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <span>{c.heroEyebrow || "Trusted by 50,000+ Families"}</span>
            </div>
            <h1
              dangerouslySetInnerHTML={{
                __html: heroTitle.replace(/\n/g, "<br/>"),
              }}
            />
            <p className="hero-sub">{heroSubtitle}</p>
            <div className="hero-actions">
              <button
                className="btn-hero-primary"
                onClick={() => scrollTo("packages")}
              >
                View Packages
              </button>
              <button className="btn-hero-ghost" onClick={() => openModal()}>
                Book Now
              </button>
            </div>
            <div className="hero-stats">
              {heroStats.map((s, i) => (
                <div className="hstat" key={i}>
                  <div className="hstat-num">{s.num}</div>
                  <div className="hstat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Hero Card */}
          <div className="hero-card">
            <div className="hcard-header">
              <div className="hcard-icon">{featured?.icon || "⭐"}</div>
              <div>
                <div className="hcard-title">Most Popular</div>
                <div className="hcard-sub">
                  {featured?.tagline || "Our best-selling health package"}
                </div>
              </div>
            </div>
            {featured ? (
              <>
                <div style={{ textAlign: "center", padding: "16px 0" }}>
                  <div
                    style={{
                      fontFamily: "'Nunito',sans-serif",
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      color: "var(--text)",
                    }}
                  >
                    {featured.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      gap: 4,
                      marginTop: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: ".9rem",
                        fontWeight: 700,
                        color: "var(--blue-mid)",
                      }}
                    >
                      {featured.currency || "AED"}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Nunito',sans-serif",
                        fontSize: "2rem",
                        fontWeight: 800,
                        color: "var(--blue)",
                      }}
                    >
                      {featured.price}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "var(--blue-light)",
                      color: "var(--blue-mid)",
                      fontSize: ".75rem",
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 12,
                      marginTop: 10,
                    }}
                  >
                    {
                      [
                        ...(featured.tests || []),
                        ...(featured.customTests || []),
                      ].length
                    }{" "}
                    tests included
                  </div>
                </div>
                <div
                  style={{
                    padding: "8px 0",
                    borderTop: "1px solid var(--border)",
                    marginTop: 12,
                  }}
                >
                  {[...(featured.tests || []), ...(featured.customTests || [])]
                    .slice(0, 4)
                    .map((t, i) => {
                      const tp = testPriceMap[t];
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            padding: "5px 0",
                            fontSize: ".82rem",
                            color: "var(--text-md)",
                          }}
                        >
                          <span
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              background: "var(--blue-light)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: 1,
                            }}
                          >
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="var(--blue-mid)"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                          <span style={{ flex: 1 }}>{t}</span>
                          {tp ? (
                            <span
                              style={{
                                color: "var(--blue)",
                                fontWeight: 700,
                                fontSize: ".75rem",
                                marginLeft: "auto",
                              }}
                            >
                              AED {tp}
                            </span>
                          ) : null}
                        </div>
                      );
                    })}
                </div>
                <button
                  className="hcard-book"
                  onClick={() => openModal(featured.name)}
                >
                  Book {featured.name} →
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: "var(--text)",
                  }}
                >
                  No Packages Yet
                </div>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: ".8rem",
                    marginTop: 8,
                  }}
                >
                  Check back soon for health packages
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust Band */}
      <div className="trust">
        <div className="trust-inner">
          {[
            {
              ic: "🏥",
              strong: c.trust1 || "NABH Accredited Labs",
              span: "Government certified",
            },
            {
              ic: "🔒",
              strong: c.trust2 || "HIPAA Compliant",
              span: "Your data is safe",
            },
            {
              ic: "🚐",
              strong: c.trust3 || "Free Home Collection",
              span: "At your doorstep",
            },
            {
              ic: "📱",
              strong: c.trust4 || "Digital Reports in 48h",
              span: "With doctor review",
            },
          ].map((item, i) => (
            <React.Fragment key={i}>
              <div className="trust-item">
                <div className="trust-ic">{item.ic}</div>
                <div className="trust-text">
                  <strong>{item.strong}</strong>
                  <span>{item.span}</span>
                </div>
              </div>
              {i < 3 && <div className="trust-div" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Packages */}
      <section className="section" id="packages">
        <div className="section-inner">
          <div className="sec-head">
            <div className="sec-eye">Health Plans</div>
            <h2 className="sec-title">
              {c.pkgSectionTitle || "Choose Your Health Package"}
            </h2>
            <p className="sec-desc">
              {c.pkgSectionDesc ||
                "All packages are curated by our senior medical team and include free home sample collection, certified lab testing, and digital report delivery."}
            </p>
          </div>
          <div className="filter-row">
            {cats.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCat === cat ? "active" : ""}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat === "all" ? "All Packages" : cat}
              </button>
            ))}
          </div>
          <div id="pkg-grid">
            {filteredPkgs.length === 0 ? (
              <div className="empty-pkgs">
                <div className="e-icon">📦</div>
                <p>
                  {allPkgs.length === 0
                    ? "Loading packages…"
                    : "No packages in this category."}
                </p>
              </div>
            ) : (
              filteredPkgs.map((p) => {
                const allTestsList = [
                  ...(p.tests || []),
                  ...(p.customTests || []),
                ];
                return (
                  <div
                    className={`pkg-card ${p.featured ? "pop" : ""}`}
                    key={p.id}
                  >
                    {p.featured && (
                      <div className="pop-ribbon">⭐ Most Popular</div>
                    )}
                    <div className="pkg-top">
                      <div className="pkg-icon-row">
                        <div className="pkg-icon">{p.icon || "💊"}</div>
                        <div>
                          <div className="pkg-name">{p.name}</div>
                          <div className="pkg-tag">{p.tagline || ""}</div>
                        </div>
                      </div>
                      <div className="pkg-price-row">
                        <span className="pkg-cur">{p.currency || "AED"}</span>
                        <span className="pkg-amt">{p.price}</span>
                        <span className="pkg-per">/ person</span>
                      </div>
                      <div className="pkg-tests-cnt">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {allTestsList.length} tests included
                      </div>
                    </div>
                    <div className="pkg-body">
                      <div className="pkg-tests-lbl">What&apos;s Included</div>
                      <ul className="pkg-tests">
                        {allTestsList.slice(0, 8).map((t, i) => {
                          const tp = testPriceMap[t];
                          return (
                            <li key={i}>
                              <span className="chk">
                                <svg viewBox="0 0 24 24">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </span>
                              <span style={{ flex: 1 }}>{t}</span>
                              {tp ? (
                                <span
                                  style={{
                                    color: "var(--blue)",
                                    fontWeight: 700,
                                    fontSize: ".78rem",
                                    marginLeft: "auto",
                                  }}
                                >
                                  AED {tp}
                                </span>
                              ) : null}
                            </li>
                          );
                        })}
                        {allTestsList.length > 8 && (
                          <li
                            style={{
                              color: "var(--muted)",
                              fontSize: ".8rem",
                              fontStyle: "italic",
                            }}
                          >
                            + {allTestsList.length - 8} more tests
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="pkg-footer">
                      <button
                        className="pkg-btn"
                        onClick={() => openModal(p.name)}
                      >
                        Book This Package
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Individual Tests */}
      <section
        className="section"
        id="individual-tests"
        style={{ background: "#fff", borderTop: "1px solid var(--border)" }}
      >
        <div className="section-inner">
          <div className="sec-head">
            <div className="sec-eye">Lab Tests</div>
            <h2 className="sec-title">
              {c.testsSectionTitle || "Book Individual Tests"}
            </h2>
            <p className="sec-desc">
              {c.testsSectionDesc ||
                "Need a specific test? Browse our complete lab test menu and book only what you need — with free home sample collection."}
            </p>
          </div>
          <div
            style={{
              position: "relative",
              maxWidth: 480,
              margin: "0 auto 28px",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted)",
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search tests by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px 12px 42px",
                border: "1.5px solid var(--border)",
                borderRadius: 10,
                fontSize: ".9rem",
                outline: "none",
                fontFamily: "inherit",
                color: "var(--text)",
                background: "#fff",
              }}
            />
          </div>
          <div
            style={{
              fontSize: ".85rem",
              color: "var(--muted)",
              fontWeight: 600,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            {filteredTests.length} test{filteredTests.length !== 1 ? "s" : ""}{" "}
            available
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
              gap: 16,
            }}
          >
            {filteredTests.length === 0 ? (
              <div className="it-empty" style={{ gridColumn: "1 / -1" }}>
                <div className="e-icon">🔍</div>
                <p>
                  {allTests.length === 0
                    ? "Loading tests…"
                    : "No tests match your search."}
                </p>
              </div>
            ) : (
              filteredTests.map((t) => (
                <div className="it-card" key={t.id}>
                  <div className="it-header">
                    <div className="it-name">{t.name}</div>
                    {t.code && <div className="it-code">{t.code}</div>}
                  </div>
                  {t.category && <div className="it-cat">{t.category}</div>}
                  <div className="it-desc">
                    {t.description ||
                      "Professional lab test with free home sample collection and digital report delivery."}
                  </div>
                  <div className="it-footer">
                    <div className="it-price">
                      {t.price ? (
                        <>
                          <span className="it-price-cur">AED</span>
                          {t.price}
                        </>
                      ) : (
                        <span
                          style={{ color: "var(--muted)", fontSize: ".9rem" }}
                        >
                          Price on request
                        </span>
                      )}
                    </div>
                    <button
                      className="it-book-btn"
                      onClick={() => openTestModal(t.name)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section" id="why">
        <div className="section-inner">
          <div className="sec-head">
            <div className="sec-eye">Why {siteName}</div>
            <h2 className="sec-title">
              {c.whyTitle || "Healthcare You Can Trust"}
            </h2>
            <p className="sec-desc">
              {c.whyDesc ||
                "We combine technology, certified labs, and compassionate care to give you the most complete health picture."}
            </p>
          </div>
          <div className="why-grid">
            {[
              {
                ic: "🏆",
                title: "NABH Certified",
                desc: "Every lab we partner with is government-accredited and quality-audited.",
              },
              {
                ic: "🚐",
                title: "Home Collection",
                desc: "Our trained phlebotomist arrives at your home within the time slot you choose.",
              },
              {
                ic: "⚡",
                title: "Fast Reports",
                desc: "Digital reports delivered to your email and app within 48 hours of sample pickup.",
              },
              {
                ic: "👨‍⚕️",
                title: "Doctor Consultation",
                desc: "Free 15-minute doctor consultation included with every Premium and above package.",
              },
              {
                ic: "💳",
                title: "Flexible Payment",
                desc: "Pay by card, bank transfer, or cash. Corporate billing available for businesses.",
              },
              {
                ic: "🔔",
                title: "Annual Reminders",
                desc: "We remind you when your annual health check is due — so you never miss one.",
              },
            ].map((w, i) => (
              <div className="why-card" key={i}>
                <div className="why-ic">{w.ic}</div>
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" id="how">
        <div className="section-inner">
          <div className="sec-head">
            <div className="sec-eye">Process</div>
            <h2 className="sec-title">{c.stepsTitle || "How It Works"}</h2>
            <p className="sec-desc">
              Four simple steps from booking to getting your results.
            </p>
          </div>
          <div className="steps-row">
            {[
              {
                num: "1",
                title: "Pick a Package",
                desc: "Browse packages and choose the one that fits your health goals and budget.",
              },
              {
                num: "2",
                title: "Book a Slot",
                desc: "Select a convenient date and time. We confirm within 2 hours.",
              },
              {
                num: "3",
                title: "Sample Collected",
                desc: "Our certified phlebotomist visits your home and collects the sample safely.",
              },
              {
                num: "4",
                title: "Get Your Report",
                desc: "Receive detailed digital reports and a free doctor consultation to review findings.",
              },
            ].map((s, i) => (
              <div className="step" key={i}>
                <div className="step-num">{s.num}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section" id="reviews">
        <div className="section-inner">
          <div className="sec-head">
            <div className="sec-eye">Patient Stories</div>
            <h2 className="sec-title">
              {c.testiTitle || "What Our Patients Say"}
            </h2>
          </div>
          <div className="reviews-grid">
            {[
              {
                stars: "★★★★★",
                text: "The phlebotomist arrived on time and the whole process was smooth. Reports were ready the next morning. Absolutely excellent service.",
                name: "Rahul Kumar",
                loc: "Dubai, UAE",
                av: "RK",
              },
              {
                stars: "★★★★★",
                text: "Caught an early thyroid issue through the comprehensive package. The doctor review call was incredibly helpful and reassuring.",
                name: "Sunita Agarwal",
                loc: "Abu Dhabi, UAE",
                av: "SA",
              },
              {
                stars: "★★★★☆",
                text: "Very professional team. Easy online booking, friendly collector, and the digital report was detailed and easy to understand.",
                name: "Mohammed Farooq",
                loc: "Sharjah, UAE",
                av: "MF",
              },
            ].map((r, i) => (
              <div className="rev-card" key={i}>
                <div className="rev-stars">{r.stars}</div>
                <p className="rev-text">&ldquo;{r.text}&rdquo;</p>
                <div className="rev-author">
                  <div className="rev-av">{r.av}</div>
                  <div>
                    <div className="rev-name">{r.name}</div>
                    <div className="rev-loc">{r.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="cta-band-inner">
          <h2>{c.ctaTitle || "Start Your Health Journey Today"}</h2>
          <p>
            {c.ctaSubtitle ||
              "Join over 50,000 families who trust ArogyaPlus for their annual health checkups. Book now and get your results in 48 hours."}
          </p>
          <div className="cta-btns">
            <button className="cta-primary" onClick={() => openModal()}>
              Book a Package
            </button>
            <button
              className="cta-ghost"
              onClick={() => (window.location.href = "tel:+971000000000")}
            >
              📞 Call Us Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <div
              className="footer-brand-icon"
              style={{ background: "transparent", padding: 0 }}
            >
              <Image
                src={logo}
                alt="CareHub Logo"
                width={36}
                height={36}
                style={{
                  objectFit: "contain",
                  borderRadius: 9,
                }}
              />
            </div>
            <span className="footer-brand-name">{siteName}</span>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Contact Us</a>
            <a href="admin.html">Admin</a>
          </div>
          <span className="footer-copy">
            {c.footerText || "© 2024 ArogyaPlus. All rights reserved."}
          </span>
        </div>
      </footer>

      {/* Booking Modal */}
      {modalOpen && (
        <div
          className="overlay open"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="modal">
            <div className="modal-head">
              <div>
                <div className="modal-title">Book a Health Package</div>
                <div className="modal-sub">
                  We&apos;ll confirm your appointment within 2 hours.
                </div>
              </div>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>
            <form onSubmit={submitBooking}>
              <div className="m-row">
                <div className="m-group">
                  <label>First Name *</label>
                  <input
                    name="fname"
                    type="text"
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="m-group">
                  <label>Last Name</label>
                  <input name="lname" type="text" placeholder="Last name" />
                </div>
              </div>
              <div className="m-group">
                <label>Phone Number *</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+971 50 000 0000"
                  required
                />
              </div>
              <div className="m-group">
                <label>Email Address *</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div className="m-group">
                <label>Select Package *</label>
                <select name="pkg" required defaultValue={preselectedPkg}>
                  <option value="">— Choose a package —</option>
                  {allPkgs.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} – {p.currency || "AED"} {p.price}
                    </option>
                  ))}
                </select>
              </div>
              <div className="m-row">
                <div className="m-group">
                  <label>Preferred Date *</label>
                  <input
                    name="date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="m-group">
                  <label>Time Slot *</label>
                  <select name="time" required>
                    <option value="">Select time</option>
                    <option>8:00 AM – 10:00 AM</option>
                    <option>10:00 AM – 12:00 PM</option>
                    <option>12:00 PM – 2:00 PM</option>
                    <option>2:00 PM – 4:00 PM</option>
                    <option>4:00 PM – 6:00 PM</option>
                  </select>
                </div>
              </div>
              <div className="m-group">
                <label>Notes (optional)</label>
                <input
                  name="notes"
                  type="text"
                  placeholder="Any special requirements..."
                />
              </div>
              <button className="m-submit" type="submit">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Test Booking Modal */}
      {testModalOpen && (
        <div
          className="overlay open"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeTestModal();
          }}
        >
          <div className="modal">
            <div className="modal-head">
              <div>
                <div className="modal-title">Book a Lab Test</div>
                <div className="modal-sub">
                  Select your test and we&apos;ll confirm your appointment
                  within 2 hours.
                </div>
              </div>
              <button className="modal-close" onClick={closeTestModal}>
                ×
              </button>
            </div>
            <form onSubmit={submitTestBooking}>
              <div className="m-group">
                <label>Test *</label>
                <select name="test" required defaultValue={preselectedTest}>
                  <option value="">— Choose a test —</option>
                  {allTests.map((t) => (
                    <option key={t.id} value={t.name} data-price={t.price || 0}>
                      {t.name}
                      {t.price ? ` – AED ${t.price}` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="m-row">
                <div className="m-group">
                  <label>First Name *</label>
                  <input
                    name="fname"
                    type="text"
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="m-group">
                  <label>Last Name</label>
                  <input name="lname" type="text" placeholder="Last name" />
                </div>
              </div>
              <div className="m-group">
                <label>Phone Number *</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+971 50 000 0000"
                  required
                />
              </div>
              <div className="m-group">
                <label>Email Address *</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div className="m-row">
                <div className="m-group">
                  <label>Preferred Date *</label>
                  <input
                    name="date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="m-group">
                  <label>Time Slot *</label>
                  <select name="time" required>
                    <option value="">Select time</option>
                    <option>8:00 AM – 10:00 AM</option>
                    <option>10:00 AM – 12:00 PM</option>
                    <option>12:00 PM – 2:00 PM</option>
                    <option>2:00 PM – 4:00 PM</option>
                    <option>4:00 PM – 6:00 PM</option>
                  </select>
                </div>
              </div>
              <div className="m-group">
                <label>Notes (optional)</label>
                <input
                  name="notes"
                  type="text"
                  placeholder="Any special requirements..."
                />
              </div>
              <button className="m-submit" type="submit">
                Book Test
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      <div id="toast" className={toastVisible ? "on" : ""}>
        <span className="t-ic">{toastIcon}</span>
        <span>{toastMsg}</span>
      </div>
    </>
  );
}
