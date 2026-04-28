import { useState } from "react";

/* ─── DATA ─────────────────────────────────────────────────── */
const BASE_PRICE = 499;
const RETAIL_PRICE = 2500;
const WHATSAPP_NUMBER = "971585817348";

const BASE_PACKAGE = {
  tests: [
    { icon: "❤️", name: "Lipid Profile (Heart)", count: "8 tests included" },
    { icon: "🫁", name: "Liver Function Test", count: "11 tests included" },
    { icon: "🫘", name: "Renal Function (Kidney)", count: "6 tests included" },
    { icon: "💉", name: "Hemogram (CBC)", count: "21 tests included" },
    { icon: "🦋", name: "Thyroid Function", count: "TSH, FT3, FT4" },
    {
      icon: "☀️",
      name: "Vitamins & Minerals",
      count: "Vit D, B12, Folate, PO4, Mg",
    },
    {
      icon: "🩸",
      name: "Diabetic Profile",
      count: "FBS, HbA1c, Insulin, C-Peptide",
    },
    { icon: "🔬", name: "Pancreatic", count: "Amylase, Lipase" },
  ],
};

const ADDON_CATEGORIES = [
  {
    category: "🎗️ Cancer Screening",
    items: [
      {
        id: "psa",
        name: "PSA — Prostate Cancer",
        desc: "Prostate-specific antigen screening (Male)",
        price: 50,
        popular: true,
      },
      {
        id: "ca125",
        name: "CA125 — Ovarian Cancer",
        desc: "Ovarian cancer marker screening (Female)",
        price: 60,
        popular: true,
      },
      {
        id: "cea",
        name: "CEA — Colon Cancer",
        desc: "Carcinoembryonic antigen marker",
        price: 70,
        popular: false,
      },
      {
        id: "afp",
        name: "AFP — Liver Cancer",
        desc: "Alpha-fetoprotein liver cancer marker",
        price: 65,
        popular: false,
      },
    ],
  },
  {
    category: "🌸 Hormones",
    items: [
      {
        id: "testosterone",
        name: "Testosterone (Male)",
        desc: "Total testosterone level",
        price: 55,
        popular: false,
      },
      {
        id: "progesterone",
        name: "Progesterone (Female)",
        desc: "Female reproductive hormone",
        price: 55,
        popular: false,
      },
      {
        id: "prolactin",
        name: "Prolactin",
        desc: "Pituitary hormone assessment",
        price: 50,
        popular: false,
      },
      {
        id: "estradiol",
        name: "Estradiol",
        desc: "Estrogen level in blood",
        price: 55,
        popular: false,
      },
      {
        id: "fsh",
        name: "FSH",
        desc: "Follicle-stimulating hormone",
        price: 50,
        popular: false,
      },
      {
        id: "lh",
        name: "LH (Luteinizing Hormone)",
        desc: "Reproductive hormone panel",
        price: 50,
        popular: false,
      },
    ],
  },
  {
    category: "🧲 Iron Profile",
    items: [
      {
        id: "iron_full",
        name: "Full Iron Profile",
        desc: "Iron, TIBC, % Transferrin, Ferritin",
        price: 80,
        popular: true,
      },
      {
        id: "ferritin",
        name: "Ferritin Only",
        desc: "Iron storage protein test",
        price: 45,
        popular: false,
      },
    ],
  },
  {
    category: "⚡ Electrolytes & Inflammation",
    items: [
      {
        id: "electrolytes",
        name: "Electrolytes",
        desc: "Sodium, Potassium, Chloride",
        price: 40,
        popular: false,
      },
      {
        id: "crp",
        name: "CRP",
        desc: "C-Reactive Protein — inflammation marker",
        price: 45,
        popular: false,
      },
      {
        id: "esr",
        name: "ESR",
        desc: "Erythrocyte sedimentation rate",
        price: 30,
        popular: false,
      },
    ],
  },
  {
    category: "🧫 Urine Analysis",
    items: [
      {
        id: "urine",
        name: "Complete Urine Analysis",
        desc: "26 urine parameters including crystals, cells, proteins",
        price: 60,
        popular: false,
      },
    ],
  },
  {
    category: "🧬 Allergy & Intolerance",
    items: [
      {
        id: "food_intol",
        name: "Food Intolerance Panel",
        desc: "96 foods screened (IgG based)",
        price: 180,
        popular: false,
      },
      {
        id: "allergy",
        name: "Allergy Screening Panel",
        desc: "Common allergens — dust, pollen, food",
        price: 150,
        popular: false,
      },
    ],
  },
  {
    category: "👨‍⚕️ Additional Services",
    items: [
      {
        id: "consultation",
        name: "Doctor Consultation",
        desc: "30-min online report review with doctor",
        price: 100,
        popular: false,
      },
      {
        id: "priority",
        name: "Priority Processing",
        desc: "6-hour express result delivery",
        price: 50,
        popular: false,
      },
    ],
  },
];

/* ─── STYLES ────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',sans-serif;background:#f9fafb;color:#111827;font-size:15px;line-height:1.6}
:root{
  --blue:#1a56db;--blue-dk:#1240a8;--blue-lt:#eff4ff;--blue-bd:#c3d3f5;
  --green:#16a34a;--green-lt:#f0fdf4;--green-bd:#86efac;
  --amber:#d97706;--amber-lt:#fffbeb;--amber-bd:#fde68a;
  --red:#dc2626;--red-lt:#fef2f2;--red-bd:#fecaca;
  --g50:#f9fafb;--g100:#f3f4f6;--g200:#e5e7eb;--g300:#d1d5db;
  --g400:#9ca3af;--g500:#6b7280;--g700:#374151;--g900:#111827;
  --border:#e5e7eb;--r:10px;--rl:14px
}
.container{max-width:1160px;margin:0 auto;padding:0 5vw}
.btn{display:inline-flex;align-items:center;gap:7px;padding:9px 20px;border-radius:var(--r);font-weight:600;font-size:.875rem;text-decoration:none;cursor:pointer;border:1.5px solid transparent;transition:all .15s;white-space:nowrap;font-family:inherit;background:none}
.btn-primary{background:var(--blue)!important;color:#fff;border-color:var(--blue)}.btn-primary:hover{background:var(--blue-dk)!important}
.btn-green{background:var(--green)!important;color:#fff;border-color:var(--green)}.btn-green:hover{background:#15803d!important}
.btn-outline{border-color:var(--border);color:var(--g700);background:#fff!important}.btn-outline:hover{border-color:#aab8d0}

/* NAV */
nav{position:sticky;top:0;z-index:100;background:#fff;border-bottom:1px solid var(--border);height:62px}
.nav-inner{height:100%;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:9px;text-decoration:none}
.logo-mark{width:33px;height:33px;background:var(--blue);border-radius:7px;display:grid;place-items:center;color:#fff;font-size:14px;font-weight:800}
.logo-name{font-size:1.1rem;font-weight:800;color:var(--g900)}.logo-name em{color:var(--blue);font-style:normal}
.nav-right{display:flex;gap:8px;align-items:center}

/* PAGE HEADER */
.page-header{background:#fff;border-bottom:1px solid var(--border);padding:28px 0}
.page-header h1{font-size:1.7rem;font-weight:800;color:var(--g900)}
.page-header p{color:var(--g500);font-size:.9rem;margin-top:5px}
.breadcrumb{display:flex;align-items:center;gap:6px;font-size:.82rem;color:var(--g400);margin-bottom:10px}
.breadcrumb a{color:var(--g500);text-decoration:none}.breadcrumb a:hover{color:var(--blue)}
.breadcrumb .crumb-active{color:var(--g900);font-weight:600}

/* LAYOUT */
.page-body{padding:32px 0 80px}
.two-col{display:grid;grid-template-columns:1fr 360px;gap:24px;align-items:start}

/* CARD */
.card{background:#fff;border:1px solid var(--border);border-radius:var(--rl);overflow:hidden;margin-bottom:20px}
.card-head{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}
.card-head h2{font-size:1rem;font-weight:700;color:var(--g900)}
.tag{font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:3px 10px;border-radius:50px}
.tag-green{background:var(--green-lt);border:1px solid var(--green-bd);color:var(--green)}
.tag-blue{background:var(--blue-lt);border:1px solid var(--blue-bd);color:var(--blue)}
.card-body{padding:20px}
.card-intro{font-size:.85rem;color:var(--g500);margin-bottom:16px}

/* BASE PACKAGE GRID */
.base-pkg-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.base-item{display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:var(--g50);border-radius:8px;border:1px solid var(--border)}
.bi-icon{font-size:1rem;flex-shrink:0;margin-top:1px}
.base-item-name{font-weight:600;color:var(--g900);font-size:.83rem}
.base-item-count{font-size:.75rem;color:var(--g400);margin-top:1px}

/* ADD-ONS */
.addon-cat{margin-bottom:24px}.addon-cat:last-child{margin-bottom:0}
.addon-cat-title{font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--g400);margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--border)}
.addon-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.addon-item{position:relative}
.addon-label{display:flex;align-items:flex-start;gap:10px;padding:12px 14px;border:1.5px solid var(--border);border-radius:var(--r);cursor:pointer;transition:border-color .15s,background .15s;background:#fff}
.addon-label:hover{border-color:var(--blue-bd);background:var(--blue-lt)}
.addon-label.checked{border-color:var(--blue);background:var(--blue-lt)}
.addon-checkbox{width:18px;height:18px;border:2px solid var(--g300);border-radius:5px;display:grid;place-items:center;flex-shrink:0;margin-top:1px;transition:all .15s;color:transparent}
.addon-checkbox.checked{background:var(--blue);border-color:var(--blue);color:#fff}
.addon-name{font-size:.86rem;font-weight:600;color:var(--g900);line-height:1.3}
.addon-desc{font-size:.77rem;color:var(--g500);margin-top:2px;line-height:1.4}
.addon-price{font-size:.82rem;font-weight:700;color:var(--blue);margin-top:4px}
.addon-popular{position:absolute;top:-6px;right:8px;font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;background:var(--amber);color:#fff;padding:2px 8px;border-radius:50px}

/* SUMMARY CARD */
.summary-card{background:#fff;border:1px solid var(--border);border-radius:var(--rl);overflow:hidden;position:sticky;top:80px}
.sc-head{background:var(--blue);padding:16px 20px}
.sc-head h3{font-size:1rem;font-weight:800;color:#fff}
.sc-head p{font-size:.78rem;color:rgba(255,255,255,.72);margin-top:2px}
.sc-body{padding:20px}
.sc-section-title{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--g400);margin-bottom:10px}
.sc-base-row{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:var(--g50);border:1px solid var(--border);border-radius:8px;margin-bottom:12px}
.sc-base-name{font-size:.86rem;font-weight:700;color:var(--g900)}
.sc-base-price{font-size:.86rem;font-weight:700;color:var(--blue)}
.sc-addons{min-height:48px;margin-bottom:12px}
.sc-addon-row{display:flex;justify-content:space-between;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--border);gap:10px}
.sc-addon-row:last-child{border-bottom:none}
.sc-addon-name{font-size:.82rem;color:var(--g700);flex:1;line-height:1.4}
.sc-addon-right{display:flex;align-items:center;gap:6px}
.sc-addon-price{font-size:.82rem;font-weight:600;color:var(--g900);white-space:nowrap}
.sc-addon-remove{background:none;border:none;cursor:pointer;color:var(--g400);font-size:1rem;padding:0 2px;transition:color .15s;line-height:1}
.sc-addon-remove:hover{color:var(--red)}
.sc-empty{font-size:.82rem;color:var(--g400);font-style:italic;text-align:center;padding:12px 0}
.sc-divider{border:none;border-top:1.5px solid var(--border);margin:14px 0}
.sc-total-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}
.sc-total-label{font-size:.82rem;color:var(--g500)}
.sc-total-val{font-size:.86rem;color:var(--g700);font-weight:600}
.sc-grand{display:flex;justify-content:space-between;align-items:center;margin-top:10px}
.sc-grand-label{font-size:.95rem;font-weight:700;color:var(--g900)}
.sc-grand-price{font-size:1.8rem;font-weight:800;color:var(--blue)}
.sc-grand-price small{font-size:.85rem}
.sc-savings{display:flex;justify-content:space-between;align-items:center;background:var(--green-lt);border:1px solid var(--green-bd);border-radius:8px;padding:8px 12px;margin-top:10px;font-size:.8rem;color:var(--green);font-weight:600}
.sc-whatsapp{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;padding:13px;border-radius:var(--r);background:#25d366;color:#fff;border:none;font-weight:700;font-size:.95rem;text-decoration:none;margin-top:14px;transition:background .15s;cursor:pointer;font-family:inherit}
.sc-whatsapp:hover{background:#1db954}
.sc-note{font-size:.75rem;color:var(--g400);text-align:center;margin-top:10px;line-height:1.5}

/* RESPONSIVE */
@media(max-width:860px){
  .two-col{grid-template-columns:1fr}
  .summary-card{position:static}
  .base-pkg-grid{grid-template-columns:1fr}
  .addon-grid{grid-template-columns:1fr}
}
@media(max-width:540px){
  .nav-right .btn-outline{display:none}
}
`;

/* ─── ICONS ─────────────────────────────────────────────────── */
const CheckIcon = ({ size = 10, color = "currentColor" }) => (
  <svg viewBox="0 0 10 10" width={size} height={size}>
    <polyline
      points="9 2 4 8 1 5"
      stroke={color}
      fill="none"
      strokeWidth="2.5"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─── WHATSAPP MESSAGE BUILDER ──────────────────────────────── */
function buildWhatsAppMessage(selectedAddons) {
  const addonsTotal = selectedAddons.reduce((s, a) => s + a.price, 0);
  const total = BASE_PRICE + addonsTotal;

  let msg = `Hello CareHub! 👋\n\nI'd like to book the *ArogyaPlus Home Health Package*.\n\n`;
  msg += `📦 *Base Package: ArogyaPlus 100*\n`;
  msg += `   • 100+ biomarkers (Lipid, Liver, Kidney, CBC, Thyroid, Vitamins, Diabetes, Pancreatic)\n`;
  msg += `   • Price: AED ${BASE_PRICE}\n`;

  if (selectedAddons.length > 0) {
    msg += `\n➕ *Selected Add-Ons:*\n`;
    selectedAddons.forEach((a) => {
      msg += `   • ${a.name} — AED ${a.price}\n`;
    });
    msg += `   Add-Ons Total: AED ${addonsTotal}\n`;
  }

  msg += `\n💰 *Total Amount: AED ${total}*\n`;
  msg += `\n✅ Please confirm my booking and let me know available time slots.\n`;
  msg += `\n🏠 Free home collection included.`;

  return encodeURIComponent(msg);
}

/* ─── SUMMARY CARD ──────────────────────────────────────────── */
function SummaryCard({ selectedAddons, onRemove }) {
  const addonsTotal = selectedAddons.reduce((s, a) => s + a.price, 0);
  const total = BASE_PRICE + addonsTotal;
  const saved = RETAIL_PRICE + addonsTotal * 4 - total;

  function handleWhatsApp() {
    const msg = buildWhatsAppMessage(selectedAddons);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  }

  return (
    <div className="summary-card">
      <div className="sc-head">
        <h3>Your Package Summary</h3>
        <p>Prices update as you select tests</p>
      </div>
      <div className="sc-body">
        <div className="sc-section-title">Base Package</div>
        <div className="sc-base-row">
          <div className="sc-base-name">ArogyaPlus 100 (100+ Tests)</div>
          <div className="sc-base-price">AED 499</div>
        </div>

        <div className="sc-section-title">Selected Add-Ons</div>
        <div className="sc-addons">
          {selectedAddons.length === 0 ? (
            <div className="sc-empty">No add-ons selected yet.</div>
          ) : (
            selectedAddons.map((a) => (
              <div className="sc-addon-row" key={a.id}>
                <div className="sc-addon-name">{a.name}</div>
                <div className="sc-addon-right">
                  <span className="sc-addon-price">AED {a.price}</span>
                  <button
                    className="sc-addon-remove"
                    onClick={() => onRemove(a.id)}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <hr className="sc-divider" />
        <div className="sc-total-row">
          <span className="sc-total-label">Base Package</span>
          <span className="sc-total-val">AED 499</span>
        </div>
        <div className="sc-total-row">
          <span className="sc-total-label">Add-On Tests</span>
          <span className="sc-total-val">AED {addonsTotal}</span>
        </div>
        <div className="sc-grand">
          <span className="sc-grand-label">Total</span>
          <span className="sc-grand-price">
            <small>AED </small>
            {total}
          </span>
        </div>

        <div className="sc-savings">
          <span>💰 You save</span>
          <span>AED {saved.toLocaleString()}</span>
        </div>

        <button className="sc-whatsapp" onClick={handleWhatsApp}>
          <WhatsAppIcon /> Book via WhatsApp
        </button>
        <div className="sc-note">
          🏠 Free home collection included
          <br />
          📄 Results within 24 hours
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN APP ──────────────────────────────────────────────── */
export default function App() {
  const [selectedAddons, setSelectedAddons] = useState([]);

  function toggleAddon(item) {
    setSelectedAddons((prev) =>
      prev.find((a) => a.id === item.id)
        ? prev.filter((a) => a.id !== item.id)
        : [...prev, item],
    );
  }

  const selectedIds = selectedAddons.map((a) => a.id);

  return (
    <>
      <style>{css}</style>

      {/* Navbar */}
      <nav>
        <div className="container nav-inner">
          <a href="/" className="logo">
            <div className="logo-mark">C</div>
            <div className="logo-name">
              Care<em>Hub</em>
            </div>
          </a>
          <div className="nav-right">
            <a href="/arogyaPlus" className="btn btn-outline">
              ← Back to Home
            </a>
            <a href="tel:+971508860612" className="btn btn-primary">
              📞 Need Help?
            </a>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <span className="crumb-active">Customize Package</span>
          </div>
          <h1>Build Your ArogyaPlus Package</h1>
          <p>
            Start with our AED 499 base package · Add tests to customize · Price
            updates automatically
          </p>
        </div>
      </div>

      {/* Page Body */}
      <div className="page-body">
        <div className="container">
          <div className="two-col">
            {/* Left Column */}
            <div>
              {/* Base Package */}
              <div className="card">
                <div className="card-head">
                  <h2>📦 Base Package — ArogyaPlus 100</h2>
                  <span className="tag tag-green">✓ Included — AED 499</span>
                </div>
                <div className="card-body">
                  <p className="card-intro">
                    Your package includes all tests listed below. Add optional
                    tests to customize further.
                  </p>
                  <div className="base-pkg-grid">
                    {BASE_PACKAGE.tests.map((t) => (
                      <div className="base-item" key={t.name}>
                        <div className="bi-icon">{t.icon}</div>
                        <div>
                          <div className="base-item-name">{t.name}</div>
                          <div className="base-item-count">{t.count}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add-On Tests */}
              <div className="card">
                <div className="card-head">
                  <h2>➕ Add-On Tests</h2>
                  <span className="tag tag-blue">Optional · Auto-priced</span>
                </div>
                <div className="card-body">
                  <p className="card-intro">
                    Select any additional tests below. The total price updates
                    automatically in your summary.
                  </p>
                  {ADDON_CATEGORIES.map((cat) => (
                    <div className="addon-cat" key={cat.category}>
                      <div className="addon-cat-title">{cat.category}</div>
                      <div className="addon-grid">
                        {cat.items.map((item) => {
                          const checked = selectedIds.includes(item.id);
                          return (
                            <div className="addon-item" key={item.id}>
                              {item.popular && (
                                <div className="addon-popular">Popular</div>
                              )}
                              <div
                                className={`addon-label${checked ? " checked" : ""}`}
                                onClick={() => toggleAddon(item)}
                              >
                                <div
                                  className={`addon-checkbox${checked ? " checked" : ""}`}
                                >
                                  {checked && <CheckIcon color="#fff" />}
                                </div>
                                <div>
                                  <div className="addon-name">{item.name}</div>
                                  <div className="addon-desc">{item.desc}</div>
                                  <div className="addon-price">
                                    + AED {item.price}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column — Summary */}
            <SummaryCard
              selectedAddons={selectedAddons}
              onRemove={(id) =>
                setSelectedAddons((prev) => prev.filter((a) => a.id !== id))
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
