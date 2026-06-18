import React, { useState, useEffect, useCallback, useRef } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  update,
  remove,
  push,
  set,
} from "firebase/database";

/* ─── Firebase Config ─── */
const firebaseConfig = {
  apiKey: "AIzaSyDoBtdP-nXZg-FTXw3OVLJYeZcPH_4aoyc",
  authDomain: "fdgdhdhhhrh.firebaseapp.com",
  databaseURL: "https://fdgdhdhhhrh-default-rtdb.firebaseio.com",
  projectId: "fdgdhdhhhrh",
  storageBucket: "fdgdhdhhhrh.firebasestorage.app",
  messagingSenderId: "737216413042",
  appId: "1:737216413042:web:8a96446c18cd03a3cbb1eb",
  measurementId: "G-HL2J3JLV63",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* ─── Helpers ─── */
const esc = (str) => {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const useSaving = () => {
  const [saving, setSaving] = useState(false);
  const trigger = useCallback(() => {
    setSaving(true);
    setTimeout(() => setSaving(false), 900);
  }, []);
  return { saving, trigger };
};

const useToast = () => {
  const [toast, setToast] = useState({ show: false, msg: "", icon: "✓" });
  const showToast = useCallback((msg, icon = "✓") => {
    setToast({ show: true, msg, icon });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
  }, []);
  return { toast, showToast };
};

/* ─── Sidebar ─── */
const Sidebar = ({ active, onNavigate, pkgCount, testCount }) => {
  const groups = [
    {
      label: "Overview",
      items: [{ id: "dashboard", icon: "📊", label: "Dashboard" }],
    },
    {
      label: "Content",
      items: [
        { id: "packages", icon: "📦", label: "Packages", badge: pkgCount },
        { id: "tests", icon: "🧪", label: "Tests", badge: testCount },
        { id: "hero", icon: "🖼️", label: "Hero Section" },
        { id: "trust", icon: "🛡️", label: "Trust Strip" },
        { id: "why", icon: "⭐", label: "Why Us" },
        { id: "cta", icon: "📣", label: "CTA Banner" },
      ],
    },
    {
      label: "Settings",
      items: [{ id: "settings", icon: "⚙️", label: "Site Settings" }],
    },
  ];

  return (
    <aside style={styles.sidebar}>
      <div style={styles.sbHeader}>
        <div style={styles.sbBrand}>
          <div style={styles.sbIcon}>❤️</div>
          <div>
            <div style={styles.sbName}>ArogyaPlus</div>
            <div style={styles.sbRole}>Admin Panel</div>
          </div>
        </div>
      </div>
      <nav style={styles.sbNav}>
        {groups.map((g, gi) => (
          <div key={gi}>
            <div style={styles.sbGroupLbl}>{g.label}</div>
            {g.items.map((item) => (
              <div
                key={item.id}
                style={{
                  ...styles.sbItem,
                  ...(active === item.id ? styles.sbItemActive : {}),
                }}
                onClick={() => onNavigate(item.id)}
              >
                <span style={styles.sbIc}>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span style={styles.sbBadge}>{item.badge}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <a
        href="index.html"
        target="_blank"
        rel="noreferrer"
        style={styles.viewSiteSb}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        <span>View Live Site</span>
      </a>
      <div style={styles.sbFooter}>
        <div style={styles.sbUserAv}>AD</div>
        <div>
          <div style={styles.sbUserName}>Administrator</div>
          <div style={styles.sbUserEmail}>admin@arogyaplus.com</div>
        </div>
      </div>
    </aside>
  );
};

/* ─── Topbar ─── */
const Topbar = ({ title }) => (
  <div style={styles.topbar}>
    <div style={styles.tbLeft}>
      <div style={styles.tbTitle}>{title}</div>
    </div>
    <div style={styles.tbRight}>
      <div style={styles.statusDot}>Live</div>
      <a
        href="index.html"
        target="_blank"
        rel="noreferrer"
        style={styles.tbBtn}
      >
        View Site ↗
      </a>
    </div>
  </div>
);

/* ─── Dashboard ─── */
const Dashboard = ({ stats }) => (
  <div>
    <div style={styles.dashRow}>
      <StatCard
        icon="📦"
        color="#EFF6FF"
        num={stats.totalPkgs}
        label="Total Packages"
      />
      <StatCard
        icon="⭐"
        color="#D1FAE5"
        num={stats.featPkgs}
        label="Featured"
      />
      <StatCard
        icon="💰"
        color="#FFF7ED"
        num={stats.lowPrice}
        label="Starting From (AED)"
      />
      <StatCard icon="🗂️" color="#F5F3FF" num={stats.cats} label="Categories" />
    </div>
    <div style={styles.dashRow}>
      <StatCard
        icon="🧪"
        color="#FEF3C7"
        num={stats.totalTests}
        label="Total Tests"
      />
      <StatCard
        icon="📋"
        color="#ECFDF5"
        num={stats.testCats}
        label="Test Categories"
      />
    </div>
    <div style={styles.card}>
      <div style={styles.cardHead}>
        <div style={styles.cardTitle}>
          <span style={{ fontSize: "1rem" }}>🚀</span> Getting Started
        </div>
      </div>
      <div style={styles.cardBody}>
        <p style={styles.cardDesc}>
          Welcome to the ArogyaPlus admin panel. All changes save instantly to
          Firebase and appear on the live site in real time.
        </p>
        <br />
        <p style={styles.cardDesc}>
          <strong>Packages</strong> — Add, edit and reorder health packages
          shown on the site.
          <br />
          <strong>Tests</strong> — Manage your test library. Add tests here
          first, then assign them to packages.
          <br />
          <strong>Hero Section</strong> — Edit the headline, subtitle, eyebrow
          text and statistics.
          <br />
          <strong>Trust Strip</strong> — Update the four trust badges displayed
          below the hero.
          <br />
          <strong>Why Us</strong> — Control the section heading and description
          text.
          <br />
          <strong>CTA Banner</strong> — Edit the call-to-action headline and
          subtitle.
          <br />
          <strong>Site Settings</strong> — Change the site name, tagline,
          footer, and section titles.
        </p>
      </div>
    </div>
  </div>
);

const StatCard = ({ icon, color, num, label }) => (
  <div style={styles.dashCard}>
    <div style={{ ...styles.dcIcon, background: color }}>{icon}</div>
    <div>
      <div style={styles.dcNum}>{num}</div>
      <div style={styles.dcLbl}>{label}</div>
    </div>
  </div>
);

/* ─── Packages ─── */
const Packages = ({ pkgs, tests, onEdit, onDelete, onAdd }) => {
  const entries = Object.entries(pkgs).sort(
    (a, b) => (a[1].order || 99) - (b[1].order || 99),
  );
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <p style={{ fontSize: ".85rem", color: "#64748B" }}>
          Manage all health packages. Changes appear live on the site.
        </p>
        <button
          style={{
            ...styles.saveBtn,
            padding: "8px 16px",
            fontSize: ".8rem",
            marginTop: 0,
          }}
          onClick={onAdd}
        >
          + Add Package
        </button>
      </div>
      <div style={{ ...styles.card, padding: 0 }}>
        <div style={styles.tblWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Package</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Tests</th>
                <th style={styles.th}>Order</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!entries.length ? (
                <tr>
                  <td colSpan={7} style={styles.emptyRow}>
                    No packages yet. Click "+ Add Package" to create one.
                  </td>
                </tr>
              ) : (
                entries.map(([id, p]) => {
                  const testCount =
                    (p.tests || []).length + (p.customTests || []).length;
                  return (
                    <tr key={id} style={styles.tr}>
                      <td style={styles.td}>
                        <div style={styles.tblName}>
                          {p.icon || ""} {p.name}
                        </div>
                        <div style={styles.tblSub}>{p.tagline || "—"}</div>
                      </td>
                      <td style={styles.td}>{p.category || "—"}</td>
                      <td style={styles.td}>
                        <span style={styles.tblPrice}>
                          {p.currency || "AED"} {p.price}
                        </span>
                      </td>
                      <td style={styles.td}>{testCount}</td>
                      <td style={styles.td}>{p.order || 1}</td>
                      <td style={styles.td}>
                        {p.featured ? (
                          <span style={styles.popChip}>⭐ Popular</span>
                        ) : (
                          <span
                            style={{ color: "#64748B", fontSize: ".78rem" }}
                          >
                            —
                          </span>
                        )}
                      </td>
                      <td style={styles.td}>
                        <div style={styles.acts}>
                          <button
                            style={{ ...styles.actBtn, ...styles.actBtnEdit }}
                            onClick={() => onEdit(id)}
                          >
                            Edit
                          </button>
                          <button
                            style={{ ...styles.actBtn, ...styles.actBtnDel }}
                            onClick={() => onDelete(id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ─── Tests ─── */
const Tests = ({ tests, onEdit, onDelete, onAdd, search, setSearch }) => {
  const entries = Object.entries(tests).sort((a, b) =>
    (a[1].name || "").localeCompare(b[1].name || ""),
  );
  const filtered = entries.filter(([id, t]) => {
    const s = search.toLowerCase();
    return (
      (t.name || "").toLowerCase().includes(s) ||
      (t.category || "").toLowerCase().includes(s) ||
      (t.code || "").toLowerCase().includes(s)
    );
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <p style={{ fontSize: ".85rem", color: "#64748B" }}>
          Manage your test library. Add tests here, then assign them to
          packages.
        </p>
        <button
          style={{
            ...styles.saveBtn,
            padding: "8px 16px",
            fontSize: ".8rem",
            marginTop: 0,
          }}
          onClick={onAdd}
        >
          + Add Test
        </button>
      </div>
      <div style={styles.card}>
        <div style={styles.cardBody}>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <svg
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748B",
              }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search tests by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ ...styles.input, width: "100%", paddingLeft: 38 }}
            />
          </div>
          <div
            style={{
              fontSize: ".8rem",
              color: "#64748B",
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            {filtered.length} test{filtered.length !== 1 ? "s" : ""}
          </div>
          <div>
            {!filtered.length ? (
              <div style={styles.testEmpty}>No tests match your search.</div>
            ) : (
              filtered.map(([id, t]) => (
                <div key={id} style={styles.testRow}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={styles.testRowName}>
                      {t.name}{" "}
                      {t.code && (
                        <span
                          style={{
                            color: "#64748B",
                            fontWeight: 400,
                            fontSize: ".78rem",
                          }}
                        >
                          ({t.code})
                        </span>
                      )}
                    </div>
                    <div style={styles.testRowMeta}>
                      {t.category && (
                        <span style={styles.testCatChip}>{t.category}</span>
                      )}{" "}
                      {t.description || ""}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexShrink: 0,
                      marginLeft: 12,
                    }}
                  >
                    <button
                      style={{
                        ...styles.actBtn,
                        ...styles.actBtnEdit,
                        padding: "4px 10px",
                        fontSize: ".72rem",
                      }}
                      onClick={() => onEdit(id)}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        ...styles.actBtn,
                        ...styles.actBtnDel,
                        padding: "4px 10px",
                        fontSize: ".72rem",
                      }}
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Hero ─── */
const HeroPanel = ({ content, onSave, saving }) => {
  const [eyebrow, setEyebrow] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [stats, setStats] = useState([
    { num: "", label: "" },
    { num: "", label: "" },
    { num: "", label: "" },
    { num: "", label: "" },
  ]);

  useEffect(() => {
    if (content) {
      setEyebrow(content.heroEyebrow || "");
      setTitle(content.heroTitle || "");
      setSubtitle(content.heroSubtitle || "");
      setStats(
        content.heroStats || [
          { num: "50K+", label: "Patients Served" },
          { num: "200+", label: "Tests Available" },
          { num: "48hrs", label: "Report Delivery" },
          { num: "98%", label: "Accuracy Rate" },
        ],
      );
    }
  }, [content]);

  const updateStat = (i, field, val) => {
    const next = [...stats];
    next[i] = { ...next[i], [field]: val };
    setStats(next);
  };

  const handleSave = () => {
    onSave({
      heroEyebrow: eyebrow,
      heroTitle: title,
      heroSubtitle: subtitle,
      heroStats: stats,
    });
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHead}>
        <div style={styles.cardTitle}>
          <span style={{ fontSize: "1rem" }}>🖼️</span> Hero Section
        </div>
      </div>
      <div style={styles.cardBody}>
        <div style={styles.formGrid}>
          <div style={{ ...styles.fg, gridColumn: "1 / -1" }}>
            <label style={styles.fgLabel}>
              Eyebrow Text (small label above title)
            </label>
            <input
              style={styles.input}
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
            />
          </div>
          <div style={{ ...styles.fg, gridColumn: "1 / -1" }}>
            <label style={styles.fgLabel}>Main Headline</label>
            <input
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div style={{ ...styles.fg, gridColumn: "1 / -1" }}>
            <label style={styles.fgLabel}>Subtitle / Description</label>
            <textarea
              style={{ ...styles.input, resize: "vertical" }}
              rows={3}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop: "1px solid #E2E8F0",
          }}
        >
          <div
            style={{
              fontSize: ".8rem",
              fontWeight: 700,
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: ".06em",
              marginBottom: 14,
            }}
          >
            Hero Statistics (4 items)
          </div>
          <div style={styles.formGrid}>
            {stats.map((s, i) => (
              <React.Fragment key={i}>
                <div style={styles.fg}>
                  <label style={styles.fgLabel}>Stat {i + 1} — Number</label>
                  <input
                    style={styles.input}
                    value={s.num}
                    onChange={(e) => updateStat(i, "num", e.target.value)}
                  />
                </div>
                <div style={styles.fg}>
                  <label style={styles.fgLabel}>Stat {i + 1} — Label</label>
                  <input
                    style={styles.input}
                    value={s.label}
                    onChange={(e) => updateStat(i, "label", e.target.value)}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <button style={styles.saveBtn} onClick={handleSave} disabled={saving}>
          💾 Save Hero
        </button>
      </div>
    </div>
  );
};

/* ─── Trust ─── */
const TrustPanel = ({ content, onSave, saving }) => {
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");
  const [t3, setT3] = useState("");
  const [t4, setT4] = useState("");

  useEffect(() => {
    if (content) {
      setT1(content.trust1 || "");
      setT2(content.trust2 || "");
      setT3(content.trust3 || "");
      setT4(content.trust4 || "");
    }
  }, [content]);

  return (
    <div style={styles.card}>
      <div style={styles.cardHead}>
        <div style={styles.cardTitle}>
          <span style={{ fontSize: "1rem" }}>🛡️</span> Trust Strip Badges
        </div>
      </div>
      <div style={styles.cardBody}>
        <p style={{ ...styles.cardDesc, marginBottom: 20 }}>
          These four badges appear in the band directly below the hero section.
        </p>
        <div style={styles.formGrid}>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Badge 1 Text</label>
            <input
              style={styles.input}
              value={t1}
              onChange={(e) => setT1(e.target.value)}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Badge 2 Text</label>
            <input
              style={styles.input}
              value={t2}
              onChange={(e) => setT2(e.target.value)}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Badge 3 Text</label>
            <input
              style={styles.input}
              value={t3}
              onChange={(e) => setT3(e.target.value)}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Badge 4 Text</label>
            <input
              style={styles.input}
              value={t4}
              onChange={(e) => setT4(e.target.value)}
            />
          </div>
        </div>
        <button
          style={styles.saveBtn}
          onClick={() =>
            onSave({ trust1: t1, trust2: t2, trust3: t3, trust4: t4 })
          }
          disabled={saving}
        >
          💾 Save Trust Strip
        </button>
      </div>
    </div>
  );
};

/* ─── Why Us ─── */
const WhyPanel = ({ content, onSave, saving }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (content) {
      setTitle(content.whyTitle || "");
      setDesc(content.whyDesc || "");
    }
  }, [content]);

  return (
    <div style={styles.card}>
      <div style={styles.cardHead}>
        <div style={styles.cardTitle}>
          <span style={{ fontSize: "1rem" }}>⭐</span> Why Us Section
        </div>
      </div>
      <div style={styles.cardBody}>
        <div style={styles.formGrid}>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Section Title</label>
            <input
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Section Description</label>
            <input
              style={styles.input}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        <button
          style={styles.saveBtn}
          onClick={() => onSave({ whyTitle: title, whyDesc: desc })}
          disabled={saving}
        >
          💾 Save Why Us
        </button>
      </div>
    </div>
  );
};

/* ─── CTA ─── */
const CTAPanel = ({ content, onSave, saving }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    if (content) {
      setTitle(content.ctaTitle || "");
      setSubtitle(content.ctaSubtitle || "");
    }
  }, [content]);

  return (
    <div style={styles.card}>
      <div style={styles.cardHead}>
        <div style={styles.cardTitle}>
          <span style={{ fontSize: "1rem" }}>📣</span> CTA Banner
        </div>
      </div>
      <div style={styles.cardBody}>
        <div style={styles.formGrid}>
          <div style={{ ...styles.fg, gridColumn: "1 / -1" }}>
            <label style={styles.fgLabel}>Headline</label>
            <input
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div style={{ ...styles.fg, gridColumn: "1 / -1" }}>
            <label style={styles.fgLabel}>Subtitle</label>
            <textarea
              style={{ ...styles.input, resize: "vertical" }}
              rows={3}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
        </div>
        <button
          style={styles.saveBtn}
          onClick={() => onSave({ ctaTitle: title, ctaSubtitle: subtitle })}
          disabled={saving}
        >
          💾 Save CTA
        </button>
      </div>
    </div>
  );
};

/* ─── Settings ─── */
const SettingsPanel = ({ content, onSave, saving }) => {
  const [fields, setFields] = useState({});

  useEffect(() => {
    if (content) {
      setFields({
        siteName: content.siteName || "",
        siteTagline: content.siteTagline || "",
        footerText: content.footerText || "",
        pkgSectionTitle: content.pkgSectionTitle || "",
        pkgSectionDesc: content.pkgSectionDesc || "",
        stepsTitle: content.stepsTitle || "",
        testiTitle: content.testiTitle || "",
      });
    }
  }, [content]);

  const update = (k, v) => setFields((f) => ({ ...f, [k]: v }));

  return (
    <div style={styles.card}>
      <div style={styles.cardHead}>
        <div style={styles.cardTitle}>
          <span style={{ fontSize: "1rem" }}>⚙️</span> Site Settings
        </div>
      </div>
      <div style={styles.cardBody}>
        <div style={styles.formGrid}>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Site Name</label>
            <input
              style={styles.input}
              value={fields.siteName || ""}
              onChange={(e) => update("siteName", e.target.value)}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Site Tagline (under logo)</label>
            <input
              style={styles.input}
              value={fields.siteTagline || ""}
              onChange={(e) => update("siteTagline", e.target.value)}
            />
          </div>
          <div style={{ ...styles.fg, gridColumn: "1 / -1" }}>
            <label style={styles.fgLabel}>Footer Text</label>
            <input
              style={styles.input}
              value={fields.footerText || ""}
              onChange={(e) => update("footerText", e.target.value)}
            />
          </div>
          <div style={{ ...styles.fg, gridColumn: "1 / -1" }}>
            <label style={styles.fgLabel}>Packages Section Title</label>
            <input
              style={styles.input}
              value={fields.pkgSectionTitle || ""}
              onChange={(e) => update("pkgSectionTitle", e.target.value)}
            />
          </div>
          <div style={{ ...styles.fg, gridColumn: "1 / -1" }}>
            <label style={styles.fgLabel}>Packages Section Description</label>
            <textarea
              style={{ ...styles.input, resize: "vertical" }}
              rows={2}
              value={fields.pkgSectionDesc || ""}
              onChange={(e) => update("pkgSectionDesc", e.target.value)}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>How It Works Title</label>
            <input
              style={styles.input}
              value={fields.stepsTitle || ""}
              onChange={(e) => update("stepsTitle", e.target.value)}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Testimonials Section Title</label>
            <input
              style={styles.input}
              value={fields.testiTitle || ""}
              onChange={(e) => update("testiTitle", e.target.value)}
            />
          </div>
        </div>
        <button
          style={styles.saveBtn}
          onClick={() => onSave(fields)}
          disabled={saving}
        >
          💾 Save Settings
        </button>
      </div>
    </div>
  );
};

/* ─── Package Dialog ─── */
const PackageDialog = ({ open, onClose, pkg, allTests, onSave }) => {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("AED");
  const [icon, setIcon] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState(1);
  const [featured, setFeatured] = useState(false);
  const [selectedTests, setSelectedTests] = useState([]);
  const [customTests, setCustomTests] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (open) {
      if (pkg) {
        setName(pkg.name || "");
        setTagline(pkg.tagline || "");
        setPrice(pkg.price !== undefined ? String(pkg.price) : "");
        setCurrency(pkg.currency || "AED");
        setIcon(pkg.icon || "");
        setCategory(pkg.category || "");
        setOrder(pkg.order !== undefined ? pkg.order : 1);
        setFeatured(!!pkg.featured);
        setSelectedTests([...(pkg.tests || [])]);
        setCustomTests([...(pkg.customTests || [])]);
      } else {
        setName("");
        setTagline("");
        setPrice("");
        setCurrency("AED");
        setIcon("");
        setCategory("");
        setOrder(1);
        setFeatured(false);
        setSelectedTests([]);
        setCustomTests([]);
      }
      setCustomInput("");
      setSearch("");
    }
  }, [open, pkg]);

  const testEntries = Object.entries(allTests).sort((a, b) =>
    (a[1].name || "").localeCompare(b[1].name || ""),
  );
  const filteredTests = testEntries.filter(([id, t]) =>
    (t.name || "").toLowerCase().includes(search.toLowerCase()),
  );

  const toggleTest = (testName) => {
    setSelectedTests((prev) =>
      prev.includes(testName)
        ? prev.filter((t) => t !== testName)
        : [...prev, testName],
    );
  };

  const addCustom = () => {
    const v = customInput.trim();
    if (!v) return;
    if (customTests.includes(v)) return;
    setCustomTests([...customTests, v]);
    setCustomInput("");
  };

  const removeCustom = (i) =>
    setCustomTests((prev) => prev.filter((_, idx) => idx !== i));
  const removeSelected = (testName) =>
    setSelectedTests((prev) => prev.filter((t) => t !== testName));

  const handleSave = () => {
    const priceVal = parseFloat(price);
    if (!name.trim()) {
      alert("Package name is required.");
      return;
    }
    if (price === "" || isNaN(priceVal) || priceVal < 0) {
      alert("Enter a valid price.");
      return;
    }
    onSave({
      name: name.trim(),
      price: priceVal,
      tagline: tagline.trim(),
      currency: currency.trim() || "AED",
      icon: icon.trim() || "💊",
      category: category.trim(),
      order: parseInt(order) || 1,
      featured,
      tests: selectedTests,
      customTests: customTests,
    });
  };

  if (!open) return null;

  const allSelected = [...selectedTests, ...customTests];

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div style={styles.dlgHead}>
          <div style={styles.dlgTitle}>
            {pkg ? "Edit Package" : "Add Package"}
          </div>
          <button style={styles.dlgClose} onClick={onClose}>
            ×
          </button>
        </div>
        <div style={styles.formGrid}>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Package Name *</label>
            <input
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Tagline</label>
            <input
              style={styles.input}
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Price *</label>
            <input
              style={styles.input}
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Currency</label>
            <input
              style={styles.input}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Icon (emoji)</label>
            <input
              style={styles.input}
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              maxLength={4}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Category</label>
            <input
              style={styles.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Display Order</label>
            <input
              style={styles.input}
              type="number"
              min="1"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </div>
          <div style={{ ...styles.fg, alignSelf: "end" }}>
            <div style={styles.toggleRow}>
              <input
                type="checkbox"
                id="pf-feat"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                style={{
                  width: 18,
                  height: 18,
                  accentColor: "#2563EB",
                  cursor: "pointer",
                }}
              />
              <label
                htmlFor="pf-feat"
                style={{
                  fontSize: ".88rem",
                  color: "#334155",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Mark as Most Popular
              </label>
            </div>
          </div>

          <div style={{ ...styles.fg, gridColumn: "1 / -1" }}>
            <div style={styles.testSectionTitle}>Select Tests from Library</div>
            <input
              style={{ ...styles.input, marginBottom: 8 }}
              placeholder="Search tests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={styles.testSelector}>
              {!filteredTests.length ? (
                <div style={styles.testSelectorEmpty}>
                  No tests in library yet. Go to Tests menu to add tests first,
                  or use custom tests below.
                </div>
              ) : (
                filteredTests.map(([id, t]) => (
                  <div
                    key={id}
                    style={styles.testSelectorItem}
                    onClick={() => toggleTest(t.name)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTests.includes(t.name)}
                      onChange={() => toggleTest(t.name)}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: 16,
                        height: 16,
                        accentColor: "#2563EB",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    />
                    <label
                      style={{
                        cursor: "pointer",
                        fontSize: ".84rem",
                        color: "#334155",
                        fontWeight: 600,
                        flex: 1,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t.name}{" "}
                      {t.category && (
                        <span
                          style={{
                            color: "#64748B",
                            fontWeight: 400,
                            fontSize: ".75rem",
                          }}
                        >
                          — {t.category}
                        </span>
                      )}
                    </label>
                  </div>
                ))
              )}
            </div>
            <div style={styles.selectedTestsPreview}>
              {allSelected.map((t, i) => (
                <div key={i} style={styles.selectedTestPill}>
                  <span>{t}</span>
                  <button
                    onClick={() => {
                      if (i < selectedTests.length) removeSelected(t);
                      else removeCustom(i - selectedTests.length);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#EF4444",
                      fontSize: ".85rem",
                      padding: "0 2px",
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...styles.fg, gridColumn: "1 / -1" }}>
            <div style={styles.testSectionTitle}>Or Add Custom Test</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input
                style={{ ...styles.input, flex: 1 }}
                placeholder="e.g. Complete Blood Count (CBC)"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addCustom())
                }
              />
              <button
                style={{
                  ...styles.saveBtn,
                  padding: "8px 16px",
                  fontSize: ".8rem",
                  marginTop: 0,
                }}
                onClick={addCustom}
              >
                + Add
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {!customTests.length ? (
                <div
                  style={{
                    fontSize: ".8rem",
                    color: "#64748B",
                    padding: "8px 0",
                  }}
                >
                  No custom tests added yet.
                </div>
              ) : (
                customTests.map((t, i) => (
                  <div key={i} style={styles.testChip}>
                    <span>{t}</span>
                    <button
                      onClick={() => removeCustom(i)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#EF4444",
                        fontSize: ".95rem",
                        lineHeight: 1,
                        padding: "0 2px",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div style={styles.dlgFooter}>
          <button style={{ ...styles.saveBtn, flex: 1 }} onClick={handleSave}>
            💾 Save Package
          </button>
          <button
            style={{ ...styles.saveBtn, ...styles.saveBtnRed, flex: 1 }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Test Dialog ─── */
const TestDialog = ({ open, onClose, test, onSave }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      if (test) {
        setName(test.name || "");
        setCategory(test.category || "");
        setCode(test.code || "");
        setDescription(test.description || "");
      } else {
        setName("");
        setCategory("");
        setCode("");
        setDescription("");
      }
    }
  }, [open, test]);

  const handleSave = () => {
    if (!name.trim()) {
      alert("Test name is required.");
      return;
    }
    onSave({
      name: name.trim(),
      category: category.trim(),
      code: code.trim(),
      description: description.trim(),
    });
  };

  if (!open) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={{ ...styles.dialog, width: 480 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.dlgHead}>
          <div style={styles.dlgTitle}>{test ? "Edit Test" : "Add Test"}</div>
          <button style={styles.dlgClose} onClick={onClose}>
            ×
          </button>
        </div>
        <div style={styles.formGrid}>
          <div style={{ ...styles.fg, gridColumn: "1 / -1" }}>
            <label style={styles.fgLabel}>Test Name *</label>
            <input
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Category</label>
            <input
              style={styles.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div style={styles.fg}>
            <label style={styles.fgLabel}>Code (optional)</label>
            <input
              style={styles.input}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div style={{ ...styles.fg, gridColumn: "1 / -1" }}>
            <label style={styles.fgLabel}>Description</label>
            <textarea
              style={{ ...styles.input, resize: "vertical" }}
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div style={styles.dlgFooter}>
          <button style={{ ...styles.saveBtn, flex: 1 }} onClick={handleSave}>
            💾 Save Test
          </button>
          <button
            style={{ ...styles.saveBtn, ...styles.saveBtnRed, flex: 1 }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Toast ─── */
const Toast = ({ toast }) => (
  <div style={{ ...styles.toast, ...(toast.show ? styles.toastOn : {}) }}>
    <span style={{ fontSize: "1rem" }}>{toast.icon}</span>
    <span>{toast.msg}</span>
  </div>
);

/* ─── Saving Bar ─── */
const SavingBar = ({ saving }) => (
  <div style={{ ...styles.savingBar, ...(saving ? styles.savingBarOn : {}) }} />
);

/* ─── Main App ─── */
export default function App() {
  const [activePanel, setActivePanel] = useState("dashboard");
  const [content, setContent] = useState({});
  const [pkgs, setPkgs] = useState({});
  const [tests, setTests] = useState({});
  const [pkgDlgOpen, setPkgDlgOpen] = useState(false);
  const [editPkgId, setEditPkgId] = useState(null);
  const [testDlgOpen, setTestDlgOpen] = useState(false);
  const [editTestId, setEditTestId] = useState(null);
  const [testSearch, setTestSearch] = useState("");

  const { saving, trigger } = useSaving();
  const { toast, showToast } = useToast();

  const panelNames = {
    dashboard: "Dashboard",
    packages: "Packages",
    tests: "Tests",
    hero: "Hero Section",
    trust: "Trust Strip",
    why: "Why Us",
    cta: "CTA Banner",
    settings: "Site Settings",
  };

  // Load Firebase data
  useEffect(() => {
    const unsubContent = onValue(ref(db, "content"), (snap) =>
      setContent(snap.val() || {}),
    );
    const unsubPkgs = onValue(ref(db, "packages"), (snap) =>
      setPkgs(snap.val() || {}),
    );
    const unsubTests = onValue(ref(db, "tests"), (snap) =>
      setTests(snap.val() || {}),
    );
    return () => {
      unsubContent();
      unsubPkgs();
      unsubTests();
    };
  }, []);

  // Dashboard stats
  const dashStats = {
    totalPkgs: Object.keys(pkgs).length,
    featPkgs: Object.values(pkgs).filter((p) => p.featured).length,
    lowPrice: (() => {
      const prices = Object.values(pkgs)
        .map((p) => Number(p.price))
        .filter((v) => !isNaN(v) && v > 0);
      return prices.length ? Math.min(...prices) : "—";
    })(),
    cats: new Set(
      Object.values(pkgs)
        .map((p) => p.category)
        .filter(Boolean),
    ).size,
    totalTests: Object.keys(tests).length,
    testCats: new Set(
      Object.values(tests)
        .map((t) => t.category)
        .filter(Boolean),
    ).size,
  };

  // Save helpers
  const saveContent = useCallback(
    (data) => {
      trigger();
      update(ref(db, "content"), data)
        .then(() => showToast("Saved!"))
        .catch((e) => showToast("Error: " + e.message, "❌"));
    },
    [trigger, showToast],
  );

  const handleSavePkg = useCallback(
    (pkgData) => {
      trigger();
      if (editPkgId) {
        update(ref(db, `packages/${editPkgId}`), pkgData)
          .then(() => {
            setPkgDlgOpen(false);
            showToast("Package saved! ✓");
          })
          .catch((e) => showToast("Error: " + e.message, "❌"));
      } else {
        const newRef = push(ref(db, "packages"));
        set(newRef, pkgData)
          .then(() => {
            setPkgDlgOpen(false);
            showToast("Package saved! ✓");
          })
          .catch((e) => showToast("Error: " + e.message, "❌"));
      }
    },
    [editPkgId, trigger, showToast],
  );

  const handleSaveTest = useCallback(
    (testData) => {
      trigger();
      if (editTestId) {
        update(ref(db, `tests/${editTestId}`), testData)
          .then(() => {
            setTestDlgOpen(false);
            showToast("Test saved! ✓");
          })
          .catch((e) => showToast("Error: " + e.message, "❌"));
      } else {
        const newRef = push(ref(db, "tests"));
        set(newRef, testData)
          .then(() => {
            setTestDlgOpen(false);
            showToast("Test saved! ✓");
          })
          .catch((e) => showToast("Error: " + e.message, "❌"));
      }
    },
    [editTestId, trigger, showToast],
  );

  const handleDeletePkg = useCallback(
    (id) => {
      if (!confirm("Delete this package? This cannot be undone.")) return;
      trigger();
      remove(ref(db, `packages/${id}`)).then(() =>
        showToast("Package deleted.", "🗑️"),
      );
    },
    [trigger, showToast],
  );

  const handleDeleteTest = useCallback(
    (id) => {
      const t = tests[id];
      if (
        !confirm(
          `Delete "${t?.name || "this test"}"? This will remove it from the test library but packages using it will keep the test name.`,
        )
      )
        return;
      trigger();
      remove(ref(db, `tests/${id}`)).then(() =>
        showToast("Test deleted.", "🗑️"),
      );
    },
    [tests, trigger, showToast],
  );

  // Escape key to close dialogs
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setPkgDlgOpen(false);
        setTestDlgOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const editPkg = (id) => {
    setEditPkgId(id);
    setPkgDlgOpen(true);
  };
  const addPkg = () => {
    setEditPkgId(null);
    setPkgDlgOpen(true);
  };
  const editTest = (id) => {
    setEditTestId(id);
    setTestDlgOpen(true);
  };
  const addTest = () => {
    setEditTestId(null);
    setTestDlgOpen(true);
  };

  return (
    <div style={styles.body}>
      <SavingBar saving={saving} />
      <Sidebar
        active={activePanel}
        onNavigate={setActivePanel}
        pkgCount={Object.keys(pkgs).length}
        testCount={Object.keys(tests).length}
      />
      <main style={styles.main}>
        <Topbar title={panelNames[activePanel]} />
        <div style={styles.content}>
          {activePanel === "dashboard" && <Dashboard stats={dashStats} />}
          {activePanel === "packages" && (
            <Packages
              pkgs={pkgs}
              tests={tests}
              onEdit={editPkg}
              onDelete={handleDeletePkg}
              onAdd={addPkg}
            />
          )}
          {activePanel === "tests" && (
            <Tests
              tests={tests}
              onEdit={editTest}
              onDelete={handleDeleteTest}
              onAdd={addTest}
              search={testSearch}
              setSearch={setTestSearch}
            />
          )}
          {activePanel === "hero" && (
            <HeroPanel content={content} onSave={saveContent} saving={saving} />
          )}
          {activePanel === "trust" && (
            <TrustPanel
              content={content}
              onSave={saveContent}
              saving={saving}
            />
          )}
          {activePanel === "why" && (
            <WhyPanel content={content} onSave={saveContent} saving={saving} />
          )}
          {activePanel === "cta" && (
            <CTAPanel content={content} onSave={saveContent} saving={saving} />
          )}
          {activePanel === "settings" && (
            <SettingsPanel
              content={content}
              onSave={saveContent}
              saving={saving}
            />
          )}
        </div>
      </main>

      <PackageDialog
        open={pkgDlgOpen}
        onClose={() => setPkgDlgOpen(false)}
        pkg={editPkgId ? pkgs[editPkgId] : null}
        allTests={tests}
        onSave={handleSavePkg}
      />
      <TestDialog
        open={testDlgOpen}
        onClose={() => setTestDlgOpen(false)}
        test={editTestId ? tests[editTestId] : null}
        onSave={handleSaveTest}
      />
      <Toast toast={toast} />
    </div>
  );
}

/* ─── Styles ─── */
const styles = {
  body: {
    fontFamily: "'Nunito Sans', sans-serif",
    background: "#F1F5F9",
    color: "#0F172A",
    display: "flex",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
  },
  sidebar: {
    width: 260,
    background: "#0F172A",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    position: "sticky",
    top: 0,
    flexShrink: 0,
  },
  sbHeader: {
    padding: "22px 20px",
    borderBottom: "1px solid rgba(255,255,255,.08)",
  },
  sbBrand: { display: "flex", alignItems: "center", gap: 10 },
  sbIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    background: "#2563EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
  },
  sbName: {
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 800,
    color: "#fff",
    fontSize: "1rem",
  },
  sbRole: {
    fontSize: ".68rem",
    color: "rgba(255,255,255,.4)",
    marginTop: 1,
    letterSpacing: ".04em",
    textTransform: "uppercase",
  },
  sbNav: { padding: "12px 0", flex: 1 },
  sbGroupLbl: {
    fontSize: ".62rem",
    fontWeight: 700,
    letterSpacing: ".14em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,.3)",
    padding: "12px 20px 5px",
  },
  sbItem: {
    display: "flex",
    alignItems: "center",
    gap: 11,
    padding: "10px 20px",
    fontSize: ".875rem",
    fontWeight: 600,
    color: "rgba(255,255,255,.6)",
    cursor: "pointer",
    borderLeft: "3px solid transparent",
    transition: "all .16s",
  },
  sbItemActive: {
    color: "#fff",
    background: "rgba(37,99,235,.25)",
    borderLeftColor: "#2563EB",
  },
  sbIc: { width: 20, textAlign: "center", fontSize: "1rem", flexShrink: 0 },
  sbBadge: {
    marginLeft: "auto",
    background: "#2563EB",
    color: "#fff",
    fontSize: ".65rem",
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 10,
    minWidth: 22,
    textAlign: "center",
  },
  sbFooter: {
    padding: "16px 20px",
    borderTop: "1px solid rgba(255,255,255,.08)",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  sbUserAv: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "#2563EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: ".8rem",
    color: "#fff",
    flexShrink: 0,
  },
  sbUserName: {
    fontSize: ".8rem",
    fontWeight: 700,
    color: "rgba(255,255,255,.7)",
  },
  sbUserEmail: { fontSize: ".68rem", color: "rgba(255,255,255,.35)" },
  viewSiteSb: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    margin: "0 12px 12px",
    background: "rgba(255,255,255,.07)",
    border: "1px solid rgba(255,255,255,.1)",
    borderRadius: 8,
    color: "rgba(255,255,255,.6)",
    fontSize: ".78rem",
    fontWeight: 600,
    textDecoration: "none",
    transition: "all .16s",
  },
  main: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  topbar: {
    background: "#fff",
    borderBottom: "1px solid #E2E8F0",
    padding: "0 32px",
    height: 62,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 50,
    boxShadow: "0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.04)",
  },
  tbLeft: { display: "flex", alignItems: "center", gap: 14 },
  tbTitle: {
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 800,
    fontSize: "1.05rem",
    color: "#0F172A",
  },
  tbRight: { display: "flex", alignItems: "center", gap: 10 },
  statusDot: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: ".78rem",
    fontWeight: 700,
    color: "#10B981",
  },
  tbBtn: {
    padding: "8px 16px",
    borderRadius: 8,
    fontSize: ".8rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all .16s",
    border: "1.5px solid #E2E8F0",
    background: "#fff",
    color: "#334155",
    textDecoration: "none",
  },
  content: { padding: "28px 32px", flex: 1 },
  dashRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
    gap: 16,
    marginBottom: 24,
  },
  dashCard: {
    background: "#fff",
    border: "1px solid #E2E8F0",
    borderRadius: 12,
    padding: 20,
    display: "flex",
    alignItems: "center",
    gap: 16,
    boxShadow: "0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.04)",
  },
  dcIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    flexShrink: 0,
  },
  dcNum: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#0F172A",
    lineHeight: 1,
  },
  dcLbl: {
    fontSize: ".75rem",
    color: "#64748B",
    marginTop: 3,
    fontWeight: 600,
  },
  card: {
    background: "#fff",
    border: "1px solid #E2E8F0",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.04)",
  },
  cardHead: {
    padding: "18px 24px",
    borderBottom: "1px solid #E2E8F0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
  },
  cardTitle: {
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 800,
    fontSize: ".95rem",
    color: "#0F172A",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  cardBody: { padding: 24 },
  cardDesc: { fontSize: ".85rem", color: "#64748B", lineHeight: 1.7 },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
    gap: 16,
  },
  fg: { display: "flex", flexDirection: "column", gap: 5 },
  fgLabel: {
    fontSize: ".72rem",
    fontWeight: 700,
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: ".06em",
  },
  input: {
    padding: "10px 13px",
    border: "1.5px solid #E2E8F0",
    borderRadius: 8,
    fontSize: ".9rem",
    outline: "none",
    transition: "border .16s,box-shadow .16s",
    fontFamily: "inherit",
    color: "#0F172A",
    resize: "vertical",
    background: "#fff",
    width: "100%",
  },
  saveBtn: {
    marginTop: 18,
    padding: "11px 26px",
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: ".88rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background .16s",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  saveBtnRed: { background: "#EF4444" },
  tblWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    fontSize: ".7rem",
    textTransform: "uppercase",
    letterSpacing: ".08em",
    color: "#64748B",
    fontWeight: 700,
    padding: "10px 16px",
    borderBottom: "2px solid #E2E8F0",
    background: "#F1F5F9",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "13px 16px",
    borderBottom: "1px solid #E2E8F0",
    fontSize: ".875rem",
    verticalAlign: "middle",
  },
  tr: { transition: "background .16s" },
  emptyRow: { textAlign: "center", padding: 40, color: "#64748B" },
  tblName: { fontWeight: 700, color: "#0F172A" },
  tblSub: { fontSize: ".75rem", color: "#64748B", marginTop: 2 },
  tblPrice: {
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 800,
    color: "#1A4F8A",
    fontSize: ".95rem",
  },
  popChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    background: "#DBEAFE",
    color: "#2563EB",
    fontSize: ".68rem",
    fontWeight: 700,
    padding: "3px 10px",
    borderRadius: 10,
  },
  actBtn: {
    padding: "5px 12px",
    borderRadius: 6,
    fontSize: ".76rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all .16s",
    border: "1.5px solid #E2E8F0",
    background: "#fff",
  },
  actBtnEdit: { color: "#2563EB", borderColor: "#DBEAFE" },
  actBtnDel: { color: "#EF4444", borderColor: "#FEE2E2" },
  acts: { display: "flex", gap: 6, flexWrap: "wrap" },
  testEmpty: {
    textAlign: "center",
    padding: 40,
    color: "#64748B",
    fontSize: ".9rem",
  },
  testRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    border: "1px solid #E2E8F0",
    borderRadius: 10,
    marginBottom: 8,
    background: "#fff",
    transition: "all .16s",
    cursor: "pointer",
  },
  testRowName: { fontWeight: 700, color: "#0F172A", fontSize: ".9rem" },
  testRowMeta: { fontSize: ".75rem", color: "#64748B", marginTop: 2 },
  testCatChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    background: "#F0FDF4",
    color: "#10B981",
    fontSize: ".68rem",
    fontWeight: 700,
    padding: "3px 10px",
    borderRadius: 10,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,.55)",
    zIndex: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  dialog: {
    background: "#fff",
    borderRadius: 16,
    padding: 30,
    width: 620,
    maxWidth: "95vw",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  dlgHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  dlgTitle: {
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 800,
    fontSize: "1.1rem",
  },
  dlgClose: {
    background: "none",
    border: "none",
    fontSize: "1.3rem",
    cursor: "pointer",
    color: "#64748B",
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  dlgFooter: { display: "flex", gap: 10, marginTop: 22 },
  toggleRow: { display: "flex", alignItems: "center", gap: 12, marginTop: 4 },
  testSectionTitle: {
    fontSize: ".8rem",
    fontWeight: 700,
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    margin: "16px 0 8px",
  },
  testSelector: {
    border: "1.5px solid #E2E8F0",
    borderRadius: 10,
    padding: 12,
    background: "#fff",
    maxHeight: 220,
    overflowY: "auto",
  },
  testSelectorItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 10px",
    borderRadius: 6,
    cursor: "pointer",
    transition: "background .16s",
  },
  testSelectorEmpty: {
    textAlign: "center",
    padding: 20,
    color: "#64748B",
    fontSize: ".8rem",
  },
  selectedTestsPreview: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 10,
  },
  selectedTestPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    background: "#EFF6FF",
    border: "1px solid #DBEAFE",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: ".78rem",
    fontWeight: 600,
    color: "#2563EB",
  },
  testChip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#EFF6FF",
    border: "1px solid #DBEAFE",
    padding: "7px 12px",
    borderRadius: 8,
    fontSize: ".84rem",
    color: "#334155",
  },
  toast: {
    position: "fixed",
    bottom: 26,
    right: 26,
    zIndex: 9999,
    background: "#0F172A",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: 10,
    fontSize: ".87rem",
    fontWeight: 600,
    opacity: 0,
    transform: "translateY(8px)",
    transition: "all .28s",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    gap: 9,
    boxShadow: "0 8px 24px rgba(0,0,0,.25)",
  },
  toastOn: { opacity: 1, transform: "translateY(0)" },
  savingBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: "linear-gradient(90deg,#2563EB,#0EA5E9)",
    zIndex: 9999,
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform .4s ease",
    borderRadius: "0 2px 2px 0",
  },
  savingBarOn: { transform: "scaleX(1)" },
};
