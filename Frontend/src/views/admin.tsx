"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  update,
  remove,
  push,
  set,
  Database,
} from "firebase/database";
import Head from "next/head";

// ─── Types ──────────────────────────────────────────────────────────
// interface Package {
//   name: string;
//   tagline?: string;
//   price: number;
//   currency?: string;
//   icon?: string;
//   category?: string;
//   order?: number;
//   featured?: boolean;
//   tests?: string[];
//   customTests?: string[];
// }

interface Test {
  name: string;
  category?: string;
  code?: string;
  description?: string;
}

interface Order {
  customerName?: string;
  userName?: string;
  customerEmail?: string;
  userEmail?: string;
  customerPhone?: string;
  userPhone?: string;
  userId?: string;
  packageName?: string;
  packageDescription?: string;
  amount?: number;
  currency?: string;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt?: number;
  updatedAt?: number;
  paymentMethod?: string;
  notes?: string;
  appointmentDate?: string;
  tests?: string[];
}

interface User {
  name?: string;
  displayName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  uid?: string;
  createdAt?: number;
}

interface Content {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroStats?: { num: string; label: string }[];
  trust1?: string;
  trust2?: string;
  trust3?: string;
  trust4?: string;
  whyTitle?: string;
  whyDesc?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  siteName?: string;
  siteTagline?: string;
  footerText?: string;
  pkgSectionTitle?: string;
  pkgSectionDesc?: string;
  stepsTitle?: string;
  testiTitle?: string;
}

// ─── Firebase Config ──────────────────────────────────────────────
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

// ─── Utility Functions ────────────────────────────────────────────
function esc(str: unknown): string {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(ts: number | undefined): string {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateShort(ts: number | undefined): string {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ─── Main Component ───────────────────────────────────────────────
export default function ArogyaAdminPage() {
  // ── State ────────────────────────────────────────────────────────
  const [db, setDb] = useState<Database | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [activePanel, setActivePanel] = useState("dashboard");
  const [panelTitle, setPanelTitle] = useState("Dashboard");

  // Data state
  const [allPkgs, setAllPkgs] = useState<Record<string, Package>>({});
  const [allTests, setAllTests] = useState<Record<string, Test>>({});
  const [allOrders, setAllOrders] = useState<Record<string, Order>>({});
  const [allUsers, setAllUsers] = useState<Record<string, User>>({});
  const [content, setContent] = useState<Content>({});

  // UI state
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastIcon, setToastIcon] = useState("✓");
  const [showToast, setShowToast] = useState(false);

  // Dialogs
  const [pkgDlgOpen, setPkgDlgOpen] = useState(false);
  const [pkgDlgEditId, setPkgDlgEditId] = useState("");
  const [pkgDlgTitle, setPkgDlgTitle] = useState("Add Package");
  const [pkgForm, setPkgForm] = useState({
    name: "",
    tagline: "",
    price: "",
    currency: "AED",
    icon: "",
    category: "",
    order: "1",
    featured: false,
  });
  const [editPkgTests, setEditPkgTests] = useState<string[]>([]);
  const [editPkgCustomTests, setEditPkgCustomTests] = useState<string[]>([]);

  const [testDlgOpen, setTestDlgOpen] = useState(false);
  const [testDlgEditId, setTestDlgEditId] = useState("");
  const [testDlgTitle, setTestDlgTitle] = useState("Add Test");
  const [testForm, setTestForm] = useState({
    name: "",
    category: "",
    code: "",
    description: "",
  });

  const [orderDlgOpen, setOrderDlgOpen] = useState(false);
  const [orderDlgId, setOrderDlgId] = useState("");
  const [orderDlgStatus, setOrderDlgStatus] = useState("pending");

  const [userDlgOpen, setUserDlgOpen] = useState(false);
  const [userDlgId, setUserDlgId] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");
  const [confirmIcon, setConfirmIcon] = useState("⚠️");
  const [confirmCallback, setConfirmCallback] = useState<(() => void) | null>(
    null,
  );

  // Search / Filter state
  const [testSearch, setTestSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [orderDateFrom, setOrderDateFrom] = useState("");
  const [orderDateTo, setOrderDateTo] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  // Hero stats
  const [heroStats, setHeroStats] = useState([
    { num: "50K+", label: "Patients Served" },
    { num: "200+", label: "Tests Available" },
    { num: "48hrs", label: "Report Delivery" },
    { num: "98%", label: "Accuracy Rate" },
  ]);

  // ── Init Firebase ───────────────────────────────────────────────
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    setDb(database);
  }, []);

  // ── Check auth ──────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("arogya_admin_auth");
      if (auth === "carehub_authenticated") {
        setIsLoggedIn(true);
      }
    }
  }, []);

  // ── Subscribe to data ───────────────────────────────────────────
  useEffect(() => {
    if (!db) return;

    const unsubContent = onValue(ref(db, "content"), (snap) => {
      const c = (snap.val() || {}) as Content;
      setContent(c);
      if (c.heroStats) setHeroStats(c.heroStats);
    });

    const unsubPkgs = onValue(ref(db, "packages"), (snap) => {
      setAllPkgs((snap.val() || {}) as Record<string, Package>);
    });

    const unsubTests = onValue(ref(db, "tests"), (snap) => {
      setAllTests((snap.val() || {}) as Record<string, Test>);
    });

    const unsubOrders = onValue(ref(db, "orders"), (snap) => {
      setAllOrders((snap.val() || {}) as Record<string, Order>);
    });

    const unsubUsers = onValue(ref(db, "users"), (snap) => {
      setAllUsers((snap.val() || {}) as Record<string, User>);
    });

    return () => {
      unsubContent();
      unsubPkgs();
      unsubTests();
      unsubOrders();
      unsubUsers();
    };
  }, [db]);

  // ── Toast helper ────────────────────────────────────────────────
  const showToastMsg = useCallback((msg: string, icon = "✓") => {
    setToastMsg(msg);
    setToastIcon(icon);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  // ── Saving helper ───────────────────────────────────────────────
  const triggerSaving = useCallback(() => {
    setSaving(true);
    setTimeout(() => setSaving(false), 900);
  }, []);

  // ── Login ───────────────────────────────────────────────────────
  const doLogin = () => {
    if (loginUser === "carehub" && loginPass === "Carehub123") {
      localStorage.setItem("arogya_admin_auth", "carehub_authenticated");
      setIsLoggedIn(true);
      setLoginError(false);
      setLoginPass("");
    } else {
      setLoginError(true);
      setLoginPass("");
    }
  };

  const doLogout = () => {
    localStorage.removeItem("arogya_admin_auth");
    setIsLoggedIn(false);
  };

  // ── Navigation ──────────────────────────────────────────────────
  const panelNames: Record<string, string> = {
    dashboard: "Dashboard",
    packages: "Packages",
    tests: "Tests",
    hero: "Hero Section",
    trust: "Trust Strip",
    why: "Why Us",
    cta: "CTA Banner",
    settings: "Site Settings",
    orders: "Orders",
    users: "Users",
  };

  const goto = (id: string) => {
    setActivePanel(id);
    setPanelTitle(panelNames[id] || id);
  };

  // ── Dashboard stats ─────────────────────────────────────────────
  const pkgsArr = Object.values(allPkgs);
  const visiblePkgs = pkgsArr.filter((p) => p.order !== 0);
  const featuredCount = visiblePkgs.filter((p) => p.featured).length;
  const prices = visiblePkgs
    .map((p) => Number(p.price))
    .filter((v) => !isNaN(v) && v > 0);
  const minPrice = prices.length ? Math.min(...prices) : null;
  const cats = new Set(visiblePkgs.map((p) => p.category).filter(Boolean));

  const testsArr = Object.values(allTests);
  const testCats = new Set(testsArr.map((t) => t.category).filter(Boolean));

  const ordersArr = Object.values(allOrders);
  const usersArr = Object.values(allUsers);

  const orderStats = {
    total: ordersArr.length,
    pending: ordersArr.filter((o) => o.status === "pending" || !o.status)
      .length,
    completed: ordersArr.filter((o) => o.status === "completed").length,
    revenue: ordersArr
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + (Number(o.amount) || 0), 0),
  };

  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const userStats = {
    total: usersArr.length,
    new7d: usersArr.filter((u) => u.createdAt && u.createdAt > sevenDaysAgo)
      .length,
    withOrders: (() => {
      const ids = new Set<string>();
      ordersArr.forEach((o) => {
        if (o.userId) ids.add(o.userId);
      });
      return ids.size;
    })(),
  };

  // ── Confirm dialog ──────────────────────────────────────────────
  const openConfirm = (
    title: string,
    msg: string,
    icon: string,
    onConfirm: () => void,
  ) => {
    setConfirmTitle(title);
    setConfirmMsg(msg);
    setConfirmIcon(icon);
    setConfirmCallback(() => onConfirm);
    setConfirmOpen(true);
  };

  // ── Package Dialog ──────────────────────────────────────────────
  const openPkgDlg = () => {
    setPkgDlgEditId("");
    setPkgDlgTitle("Add Package");
    setPkgForm({
      name: "",
      tagline: "",
      price: "",
      currency: "AED",
      icon: "",
      category: "",
      order: "1",
      featured: false,
    });
    setEditPkgTests([]);
    setEditPkgCustomTests([]);
    setPkgDlgOpen(true);
  };

  const editPkg = (id: string) => {
    const p = allPkgs[id];
    if (!p) return;
    setPkgDlgEditId(id);
    setPkgDlgTitle("Edit Package");
    setPkgForm({
      name: p.name || "",
      tagline: p.tagline || "",
      price: p.price !== undefined ? String(p.price) : "",
      currency: p.currency || "AED",
      icon: p.icon || "",
      category: p.category || "",
      order: p.order !== undefined ? String(p.order) : "1",
      featured: !!p.featured,
    });
    setEditPkgTests([...(p.tests || [])]);
    setEditPkgCustomTests([...(p.customTests || [])]);
    setPkgDlgOpen(true);
  };

  const closePkgDlg = () => setPkgDlgOpen(false);

  const savePkg = () => {
    if (!db) return;
    const name = pkgForm.name.trim();
    const priceVal = pkgForm.price.trim();
    const price = parseFloat(priceVal);
    if (!name) {
      showToastMsg("Package name is required.", "⚠️");
      return;
    }
    if (priceVal === "" || isNaN(price) || price < 0) {
      showToastMsg("Enter a valid price.", "⚠️");
      return;
    }

    const pkg: Package = {
      name,
      price,
      tagline: pkgForm.tagline,
      currency: pkgForm.currency || "AED",
      icon: pkgForm.icon || "💊",
      category: pkgForm.category,
      order:
        parseInt(pkgForm.order) !== undefined ? parseInt(pkgForm.order) : 1,
      featured: pkgForm.featured,
      tests: [...editPkgTests],
      customTests: [...editPkgCustomTests],
    };

    triggerSaving();
    if (pkgDlgEditId) {
      update(ref(db, `packages/${pkgDlgEditId}`), pkg)
        .then(() => {
          closePkgDlg();
          showToastMsg("Package saved! ✓");
        })
        .catch((e) => showToastMsg("Error: " + e.message, "❌"));
    } else {
      const newRef = push(ref(db, "packages"));
      set(newRef, pkg)
        .then(() => {
          closePkgDlg();
          showToastMsg("Package saved! ✓");
        })
        .catch((e) => showToastMsg("Error: " + e.message, "❌"));
    }
  };

  const confirmDeletePkg = (id: string) => {
    const p = allPkgs[id];
    openConfirm(
      "Delete Package?",
      `Are you sure you want to delete "${p?.name || "this package"}"? This cannot be undone.`,
      "🗑️",
      () => {
        if (!db) return;
        triggerSaving();
        remove(ref(db, `packages/${id}`)).then(() =>
          showToastMsg("Package deleted.", "🗑️"),
        );
      },
    );
  };

  // ── Test Dialog ─────────────────────────────────────────────────
  const openTestDlg = () => {
    setTestDlgEditId("");
    setTestDlgTitle("Add Test");
    setTestForm({ name: "", category: "", code: "", description: "" });
    setTestDlgOpen(true);
  };

  const editTest = (id: string) => {
    const t = allTests[id];
    if (!t) return;
    setTestDlgEditId(id);
    setTestDlgTitle("Edit Test");
    setTestForm({
      name: t.name || "",
      category: t.category || "",
      code: t.code || "",
      description: t.description || "",
    });
    setTestDlgOpen(true);
  };

  const closeTestDlg = () => setTestDlgOpen(false);

  const saveTest = () => {
    if (!db) return;
    const name = testForm.name.trim();
    if (!name) {
      showToastMsg("Test name is required.", "⚠️");
      return;
    }

    const testData: Test = {
      name,
      category: testForm.category,
      code: testForm.code,
      description: testForm.description,
    };

    triggerSaving();
    if (testDlgEditId) {
      update(ref(db, `tests/${testDlgEditId}`), testData)
        .then(() => {
          closeTestDlg();
          showToastMsg("Test saved! ✓");
        })
        .catch((e) => showToastMsg("Error: " + e.message, "❌"));
    } else {
      const newRef = push(ref(db, "tests"));
      set(newRef, testData)
        .then(() => {
          closeTestDlg();
          showToastMsg("Test saved! ✓");
        })
        .catch((e) => showToastMsg("Error: " + e.message, "❌"));
    }
  };

  const confirmDeleteTest = (id: string) => {
    const t = allTests[id];
    openConfirm(
      "Delete Test?",
      `Are you sure you want to delete "${t?.name || "this test"}"? This cannot be undone.`,
      "🗑️",
      () => {
        if (!db) return;
        triggerSaving();
        remove(ref(db, `tests/${id}`)).then(() =>
          showToastMsg("Test deleted.", "🗑️"),
        );
      },
    );
  };

  // ── Content Saves ───────────────────────────────────────────────
  const saveHero = () => {
    if (!db) return;
    const stats = heroStats.map((s) => ({
      num: s.num.trim(),
      label: s.label.trim(),
    }));
    triggerSaving();
    update(ref(db, "content"), {
      heroEyebrow: content.heroEyebrow || "",
      heroTitle: content.heroTitle || "",
      heroSubtitle: content.heroSubtitle || "",
      heroStats: stats,
    }).then(() => showToastMsg("Hero section saved!"));
  };

  const saveTrust = () => {
    if (!db) return;
    triggerSaving();
    update(ref(db, "content"), {
      trust1: content.trust1 || "",
      trust2: content.trust2 || "",
      trust3: content.trust3 || "",
      trust4: content.trust4 || "",
    }).then(() => showToastMsg("Trust strip saved!"));
  };

  const saveWhy = () => {
    if (!db) return;
    triggerSaving();
    update(ref(db, "content"), {
      whyTitle: content.whyTitle || "",
      whyDesc: content.whyDesc || "",
    }).then(() => showToastMsg("Why Us section saved!"));
  };

  const saveCTA = () => {
    if (!db) return;
    triggerSaving();
    update(ref(db, "content"), {
      ctaTitle: content.ctaTitle || "",
      ctaSubtitle: content.ctaSubtitle || "",
    }).then(() => showToastMsg("CTA banner saved!"));
  };

  const saveSettings = () => {
    if (!db) return;
    triggerSaving();
    update(ref(db, "content"), {
      siteName: content.siteName || "",
      siteTagline: content.siteTagline || "",
      footerText: content.footerText || "",
      pkgSectionTitle: content.pkgSectionTitle || "",
      pkgSectionDesc: content.pkgSectionDesc || "",
      stepsTitle: content.stepsTitle || "",
      testiTitle: content.testiTitle || "",
    }).then(() => showToastMsg("Settings saved!"));
  };

  // ── Order Dialog ────────────────────────────────────────────────
  const viewOrder = (id: string) => {
    const o = allOrders[id];
    if (!o) return;
    setOrderDlgId(id);
    setOrderDlgStatus(o.status || "pending");
    setOrderDlgOpen(true);
  };

  const closeOrderDlg = () => setOrderDlgOpen(false);

  const updateOrderStatus = () => {
    if (!db || !orderDlgId || !allOrders[orderDlgId]) return;
    triggerSaving();
    update(ref(db, `orders/${orderDlgId}`), {
      status: orderDlgStatus,
      updatedAt: Date.now(),
    })
      .then(() => {
        showToastMsg("Order status updated!");
        closeOrderDlg();
      })
      .catch((e) => showToastMsg("Error: " + e.message, "❌"));
  };

  const confirmDeleteOrder = (id: string) => {
    openConfirm(
      "Delete Order?",
      `Delete order #${id.slice(-8).toUpperCase()}? This cannot be undone.`,
      "🗑️",
      () => {
        if (!db) return;
        triggerSaving();
        remove(ref(db, `orders/${id}`)).then(() =>
          showToastMsg("Order deleted.", "🗑️"),
        );
      },
    );
  };

  // ── User Dialog ─────────────────────────────────────────────────
  const viewUser = (id: string) => {
    const u = allUsers[id];
    if (!u) return;
    setUserDlgId(id);
    setUserDlgOpen(true);
  };

  const closeUserDlg = () => setUserDlgOpen(false);

  // ── Filtered data ───────────────────────────────────────────────
  const filteredTests = Object.entries(allTests)
    .filter(([id, t]) => {
      const s = testSearch.toLowerCase();
      return (
        (t.name || "").toLowerCase().includes(s) ||
        (t.category || "").toLowerCase().includes(s) ||
        (t.code || "").toLowerCase().includes(s)
      );
    })
    .sort((a, b) => (a[1].name || "").localeCompare(b[1].name || ""));

  const filteredOrders = Object.entries(allOrders)
    .filter(([id, o]) => {
      if (
        orderStatusFilter !== "all" &&
        (o.status || "pending") !== orderStatusFilter
      )
        return false;
      if (orderDateFrom) {
        const fromTime = new Date(orderDateFrom).getTime();
        if ((o.createdAt || 0) < fromTime) return false;
      }
      if (orderDateTo) {
        const toTime = new Date(orderDateTo).getTime() + 86400000;
        if ((o.createdAt || 0) > toTime) return false;
      }
      if (orderSearch) {
        const s = orderSearch.toLowerCase();
        return (
          id.toLowerCase().includes(s) ||
          (o.customerName || o.userName || "").toLowerCase().includes(s) ||
          (o.customerEmail || o.userEmail || "").toLowerCase().includes(s) ||
          (o.packageName || "").toLowerCase().includes(s)
        );
      }
      return true;
    })
    .sort((a, b) => (b[1].createdAt || 0) - (a[1].createdAt || 0));

  const filteredUsers = Object.entries(allUsers)
    .filter(([id, u]) => {
      if (!userSearch) return true;
      const s = userSearch.toLowerCase();
      return (
        (u.name || u.displayName || "").toLowerCase().includes(s) ||
        (u.email || "").toLowerCase().includes(s) ||
        (u.phone || "").toLowerCase().includes(s)
      );
    })
    .sort((a, b) => (b[1].createdAt || 0) - (a[1].createdAt || 0));

  // ── User order stats ────────────────────────────────────────────
  const userOrderStats: Record<string, { count: number; total: number }> = {};
  Object.entries(allOrders).forEach(([oid, o]) => {
    const uid = o.userId;
    if (!uid) return;
    if (!userOrderStats[uid]) userOrderStats[uid] = { count: 0, total: 0 };
    userOrderStats[uid].count++;
    if (o.status !== "cancelled")
      userOrderStats[uid].total += Number(o.amount) || 0;
  });

  // ── Status colors ───────────────────────────────────────────────
  const statusColors: Record<
    string,
    { bg: string; color: string; label: string }
  > = {
    pending: { bg: "#FEF3C7", color: "#D97706", label: "Pending" },
    confirmed: { bg: "#DBEAFE", color: "#2563EB", label: "Confirmed" },
    completed: { bg: "#D1FAE5", color: "#059669", label: "Completed" },
    cancelled: { bg: "#FEE2E2", color: "#DC2626", label: "Cancelled" },
  };

  // ── Render ──────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <>
        <Head>
          <title>ArogyaPlus – Admin Panel</title>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
        </Head>
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "linear-gradient(135deg,#0F172A 0%,#1A4F8A 100%)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Nunito',sans-serif",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 40,
              width: 400,
              maxWidth: "90vw",
              boxShadow: "0 25px 60px rgba(0,0,0,.35)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "linear-gradient(135deg,#2563EB,#0EA5E9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: "1.8rem",
              }}
            >
              ❤️
            </div>
            <h1
              style={{
                fontFamily: "'Nunito',sans-serif",
                fontWeight: 800,
                fontSize: "1.4rem",
                color: "#0F172A",
                marginBottom: 4,
              }}
            >
              ArogyaPlus Admin
            </h1>
            <p
              style={{ color: "#64748B", fontSize: "0.9rem", marginBottom: 28 }}
            >
              Sign in to access the admin panel
            </p>

            <div style={{ textAlign: "left", marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#64748B",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 5,
                }}
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") doLogin();
                }}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 10,
                  fontSize: "0.95rem",
                  outline: "none",
                  fontFamily: "inherit",
                  color: "#0F172A",
                }}
              />
            </div>

            <div style={{ textAlign: "left", marginBottom: 24 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#64748B",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 5,
                }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") doLogin();
                }}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 10,
                  fontSize: "0.95rem",
                  outline: "none",
                  fontFamily: "inherit",
                  color: "#0F172A",
                }}
              />
            </div>

            {loginError && (
              <div
                style={{
                  color: "#EF4444",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Invalid username or password.
              </div>
            )}

            <button
              onClick={doLogin}
              style={{
                width: "100%",
                padding: 13,
                border: "none",
                borderRadius: 10,
                background: "#2563EB",
                color: "#fff",
                fontFamily: "'Nunito',sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "background 0.16s",
              }}
            >
              Sign In
            </button>

            <p style={{ color: "#94A3B8", fontSize: "0.78rem", marginTop: 20 }}>
              Protected area. Authorized personnel only.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>ArogyaPlus – Admin Panel</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        :root {
          --blue: #1a4f8a;
          --blue-mid: #2563eb;
          --blue-light: #eff6ff;
          --blue-pale: #dbeafe;
          --accent: #0ea5e9;
          --green: #10b981;
          --orange: #f97316;
          --red: #ef4444;
          --white: #ffffff;
          --bg: #f1f5f9;
          --surface: #ffffff;
          --text: #0f172a;
          --text-md: #334155;
          --muted: #64748b;
          --border: #e2e8f0;
          --sidebar-w: 260px;
          --radius: 12px;
          --shadow:
            0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
          --shadow-md: 0 4px 16px rgba(15, 23, 42, 0.1);
        }
        body {
          font-family: "Nunito Sans", sans-serif;
          background: var(--bg);
          color: var(--text);
          display: flex;
          min-height: 100vh;
        }
        .saving-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--blue-mid), var(--accent));
          z-index: 9999;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
          border-radius: 0 2px 2px 0;
        }
        .saving-bar.on {
          transform: scaleX(1);
        }
        @keyframes pulse2 {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>

      {/* Saving Bar */}
      <div className={`saving-bar ${saving ? "on" : ""}`} />

      {/* ─── SIDEBAR ─── */}
      <aside
        style={{
          width: "var(--sidebar-w)",
          background: "#0F172A",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "sticky",
          top: 0,
          flexShrink: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            padding: "22px 20px",
            borderBottom: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "var(--blue-mid)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
            >
              ❤️
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Nunito',sans-serif",
                  fontWeight: 800,
                  color: "#fff",
                  fontSize: "1rem",
                }}
              >
                ArogyaPlus
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "rgba(255,255,255,.4)",
                  marginTop: 1,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Admin Panel
              </div>
            </div>
          </div>
        </div>

        <nav style={{ padding: "12px 0", flex: 1, overflowY: "auto" }}>
          {[
            { label: "Overview", items: [] },
            {
              label: "",
              items: [
                {
                  id: "dashboard",
                  icon: "📊",
                  label: "Dashboard",
                  badge: null,
                },
              ],
            },
            { label: "Content", items: [] },
            {
              label: "",
              items: [
                {
                  id: "packages",
                  icon: "📦",
                  label: "Packages",
                  badge: Object.keys(allPkgs).length,
                },
                {
                  id: "tests",
                  icon: "🧪",
                  label: "Tests",
                  badge: Object.keys(allTests).length,
                },
                { id: "hero", icon: "🖼️", label: "Hero Section", badge: null },
                { id: "trust", icon: "🛡️", label: "Trust Strip", badge: null },
                { id: "why", icon: "⭐", label: "Why Us", badge: null },
                { id: "cta", icon: "📣", label: "CTA Banner", badge: null },
              ],
            },
            { label: "Settings", items: [] },
            {
              label: "",
              items: [
                {
                  id: "settings",
                  icon: "⚙️",
                  label: "Site Settings",
                  badge: null,
                },
              ],
            },
            { label: "Management", items: [] },
            {
              label: "",
              items: [
                {
                  id: "orders",
                  icon: "📋",
                  label: "Orders",
                  badge: Object.keys(allOrders).length,
                },
                {
                  id: "users",
                  icon: "👥",
                  label: "Users",
                  badge: Object.keys(allUsers).length,
                },
              ],
            },
          ].map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <div
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.3)",
                    padding: "12px 20px 5px",
                  }}
                >
                  {group.label}
                </div>
              )}
              {group.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => goto(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    padding: "10px 20px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color:
                      activePanel === item.id ? "#fff" : "rgba(255,255,255,.6)",
                    cursor: "pointer",
                    borderLeft: "3px solid transparent",
                    borderLeftColor:
                      activePanel === item.id
                        ? "var(--blue-mid)"
                        : "transparent",
                    background:
                      activePanel === item.id
                        ? "rgba(37,99,235,.25)"
                        : "transparent",
                    transition: "all 0.16s",
                  }}
                  onMouseEnter={(e) => {
                    if (activePanel !== item.id) {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background =
                        "rgba(255,255,255,.06)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activePanel !== item.id) {
                      e.currentTarget.style.color = "rgba(255,255,255,.6)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      textAlign: "center",
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.badge !== null && item.badge > 0 && (
                    <span
                      style={{
                        marginLeft: "auto",
                        background: "var(--blue-mid)",
                        color: "#fff",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 10,
                        minWidth: 22,
                        textAlign: "center",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            margin: "0 12px 12px",
            background: "rgba(255,255,255,.07)",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 8,
            color: "rgba(255,255,255,.6)",
            fontSize: "0.78rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.16s",
          }}
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

        <div
          style={{
            padding: "16px 20px",
            borderTop: "1px solid rgba(255,255,255,.08)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "var(--blue-mid)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "0.8rem",
              color: "#fff",
              flexShrink: 0,
            }}
          >
            AD
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "rgba(255,255,255,.7)",
              }}
            >
              Administrator
            </div>
            <div
              style={{ fontSize: "0.68rem", color: "rgba(255,255,255,.35)" }}
            >
              admin@arogyaplus.com
            </div>
          </div>
          <button
            onClick={doLogout}
            title="Logout"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,.4)",
              fontSize: "1.1rem",
              padding: 4,
              borderRadius: 6,
              transition: "all 0.16s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.background = "rgba(255,255,255,.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,.4)";
              e.currentTarget.style.background = "none";
            }}
          >
            🚪
          </button>
        </div>
      </aside>

      {/* ─── MAIN ─── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Topbar */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid var(--border)",
            padding: "0 32px",
            height: 62,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 50,
            boxShadow: "var(--shadow)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                fontFamily: "'Nunito',sans-serif",
                fontWeight: 800,
                fontSize: "1.05rem",
                color: "var(--text)",
              }}
            >
              {panelTitle}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "var(--green)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--green)",
                  animation: "pulse2 2s ease infinite",
                }}
              />
              Live
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.16s",
                border: "1.5px solid var(--border)",
                background: "#fff",
                color: "var(--text-md)",
                textDecoration: "none",
              }}
            >
              View Site ↗
            </a>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "28px 32px", flex: 1 }}>
          {/* ─── DASHBOARD ─── */}
          {activePanel === "dashboard" && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                {[
                  {
                    icon: "📦",
                    iconBg: "var(--blue-light)",
                    num: visiblePkgs.length,
                    label: "Total Packages",
                  },
                  {
                    icon: "⭐",
                    iconBg: "#D1FAE5",
                    num: featuredCount,
                    label: "Featured",
                  },
                  {
                    icon: "💰",
                    iconBg: "#FFF7ED",
                    num: minPrice ?? "—",
                    label: "Starting From (AED)",
                  },
                  {
                    icon: "🗂️",
                    iconBg: "#F5F3FF",
                    num: cats.size,
                    label: "Categories",
                  },
                  {
                    icon: "🧪",
                    iconBg: "#FEF3C7",
                    num: testsArr.length,
                    label: "Total Tests",
                  },
                  {
                    icon: "📋",
                    iconBg: "#ECFDF5",
                    num: testCats.size,
                    label: "Test Categories",
                  },
                  {
                    icon: "📋",
                    iconBg: "#FFF7ED",
                    num: ordersArr.length,
                    label: "Total Orders",
                  },
                  {
                    icon: "👥",
                    iconBg: "#F5F3FF",
                    num: usersArr.length,
                    label: "Total Users",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#fff",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      padding: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      boxShadow: "var(--shadow)",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.4rem",
                        flexShrink: 0,
                        background: card.iconBg,
                      }}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Nunito',sans-serif",
                          fontSize: "1.8rem",
                          fontWeight: 800,
                          color: "var(--text)",
                          lineHeight: 1,
                        }}
                      >
                        {card.num}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--muted)",
                          marginTop: 3,
                          fontWeight: 600,
                        }}
                      >
                        {card.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  marginBottom: 20,
                  overflow: "hidden",
                  boxShadow: "var(--shadow)",
                }}
              >
                <div
                  style={{
                    padding: "18px 24px",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#fff",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Nunito',sans-serif",
                      fontWeight: 800,
                      fontSize: "0.95rem",
                      color: "var(--text)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: "1rem" }}>🚀</span> Getting Started
                  </div>
                </div>
                <div style={{ padding: 24 }}>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      lineHeight: 1.7,
                    }}
                  >
                    Welcome to the ArogyaPlus admin panel. All changes save
                    instantly to Firebase and appear on the live site in real
                    time.
                  </p>
                  <br />
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      lineHeight: 1.7,
                    }}
                  >
                    <strong>Packages</strong> — Add, edit and reorder health
                    packages shown on the site.
                    <br />
                    <strong>Tests</strong> — Manage your test library. Add tests
                    here first, then assign them to packages.
                    <br />
                    <strong>Hero Section</strong> — Edit the headline, subtitle,
                    eyebrow text and statistics.
                    <br />
                    <strong>Trust Strip</strong> — Update the four trust badges
                    displayed below the hero.
                    <br />
                    <strong>Why Us</strong> — Control the section heading and
                    description text.
                    <br />
                    <strong>CTA Banner</strong> — Edit the call-to-action
                    headline and subtitle.
                    <br />
                    <strong>Site Settings</strong> — Change the site name,
                    tagline, footer, and section titles.
                    <br />
                    <strong>Orders</strong> — View and manage customer bookings
                    with status tracking.
                    <br />
                    <strong>Users</strong> — View registered users and their
                    order history.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ─── PACKAGES ─── */}
          {activePanel === "packages" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                  Manage all health packages. Changes appear live on the site.
                </p>
                <button
                  onClick={openPkgDlg}
                  style={{
                    padding: "8px 16px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  + Add Package
                </button>
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  marginBottom: 20,
                  overflow: "hidden",
                  boxShadow: "var(--shadow)",
                  padding: 0,
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            textAlign: "left",
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--muted)",
                            fontWeight: 700,
                            padding: "10px 16px",
                            borderBottom: "2px solid var(--border)",
                            background: "var(--bg)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Package
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--muted)",
                            fontWeight: 700,
                            padding: "10px 16px",
                            borderBottom: "2px solid var(--border)",
                            background: "var(--bg)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Category
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--muted)",
                            fontWeight: 700,
                            padding: "10px 16px",
                            borderBottom: "2px solid var(--border)",
                            background: "var(--bg)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Price
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--muted)",
                            fontWeight: 700,
                            padding: "10px 16px",
                            borderBottom: "2px solid var(--border)",
                            background: "var(--bg)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Tests
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--muted)",
                            fontWeight: 700,
                            padding: "10px 16px",
                            borderBottom: "2px solid var(--border)",
                            background: "var(--bg)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Order
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--muted)",
                            fontWeight: 700,
                            padding: "10px 16px",
                            borderBottom: "2px solid var(--border)",
                            background: "var(--bg)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Status
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--muted)",
                            fontWeight: 700,
                            padding: "10px 16px",
                            borderBottom: "2px solid var(--border)",
                            background: "var(--bg)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(allPkgs).length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            style={{
                              textAlign: "center",
                              padding: 40,
                              color: "var(--muted)",
                            }}
                          >
                            No packages yet. Click "+ Add Package" to create
                            one.
                          </td>
                        </tr>
                      ) : (
                        Object.entries(allPkgs)
                          .sort(
                            (a, b) => (a[1].order ?? 99) - (b[1].order ?? 99),
                          )
                          .map(([id, p]) => {
                            const testCount =
                              (p.tests?.length ?? 0) +
                              (p.customTests?.length ?? 0);
                            return (
                              <tr
                                key={id}
                                style={
                                  p.order === 0
                                    ? { opacity: 0.55, background: "#F8FAFC" }
                                    : {}
                                }
                              >
                                <td
                                  style={{
                                    padding: "13px 16px",
                                    borderBottom: "1px solid var(--border)",
                                    fontSize: "0.875rem",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontWeight: 700,
                                      color: "var(--text)",
                                    }}
                                  >
                                    {p.icon ?? ""} {esc(p.name)}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "0.75rem",
                                      color: "var(--muted)",
                                      marginTop: 2,
                                    }}
                                  >
                                    {esc(p.tagline ?? "—")}
                                  </div>
                                </td>
                                <td
                                  style={{
                                    padding: "13px 16px",
                                    borderBottom: "1px solid var(--border)",
                                    fontSize: "0.875rem",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {esc(p.category ?? "—")}
                                </td>
                                <td
                                  style={{
                                    padding: "13px 16px",
                                    borderBottom: "1px solid var(--border)",
                                    fontSize: "0.875rem",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily: "'Nunito',sans-serif",
                                      fontWeight: 800,
                                      color: "var(--blue)",
                                      fontSize: "0.95rem",
                                    }}
                                  >
                                    {esc(p.currency ?? "AED")}{" "}
                                    {esc(String(p.price))}
                                  </span>
                                </td>
                                <td
                                  style={{
                                    padding: "13px 16px",
                                    borderBottom: "1px solid var(--border)",
                                    fontSize: "0.875rem",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {testCount}
                                </td>
                                <td
                                  style={{
                                    padding: "13px 16px",
                                    borderBottom: "1px solid var(--border)",
                                    fontSize: "0.875rem",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {p.order !== undefined ? p.order : 1}
                                </td>
                                <td
                                  style={{
                                    padding: "13px 16px",
                                    borderBottom: "1px solid var(--border)",
                                    fontSize: "0.875rem",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {p.order === 0 ? (
                                    <span
                                      style={{
                                        color: "var(--red)",
                                        fontSize: "0.78rem",
                                        fontWeight: 700,
                                      }}
                                    >
                                      🚫 Hidden
                                    </span>
                                  ) : p.featured ? (
                                    <span
                                      style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 4,
                                        background: "var(--blue-pale)",
                                        color: "var(--blue-mid)",
                                        fontSize: "0.68rem",
                                        fontWeight: 700,
                                        padding: "3px 10px",
                                        borderRadius: 10,
                                      }}
                                    >
                                      ⭐ Popular
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        color: "var(--muted)",
                                        fontSize: "0.78rem",
                                      }}
                                    >
                                      —
                                    </span>
                                  )}
                                </td>
                                <td
                                  style={{
                                    padding: "13px 16px",
                                    borderBottom: "1px solid var(--border)",
                                    fontSize: "0.875rem",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: 6,
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <button
                                      onClick={() => editPkg(id)}
                                      style={{
                                        padding: "5px 12px",
                                        borderRadius: 6,
                                        fontSize: "0.76rem",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        fontFamily: "inherit",
                                        transition: "all 0.16s",
                                        border: "1.5px solid var(--blue-pale)",
                                        background: "#fff",
                                        color: "var(--blue-mid)",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                          "var(--blue-mid)";
                                        e.currentTarget.style.color = "#fff";
                                        e.currentTarget.style.borderColor =
                                          "var(--blue-mid)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                          "#fff";
                                        e.currentTarget.style.color =
                                          "var(--blue-mid)";
                                        e.currentTarget.style.borderColor =
                                          "var(--blue-pale)";
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => confirmDeletePkg(id)}
                                      style={{
                                        padding: "5px 12px",
                                        borderRadius: 6,
                                        fontSize: "0.76rem",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        fontFamily: "inherit",
                                        transition: "all 0.16s",
                                        border: "1.5px solid #FEE2E2",
                                        background: "#fff",
                                        color: "var(--red)",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                          "var(--red)";
                                        e.currentTarget.style.color = "#fff";
                                        e.currentTarget.style.borderColor =
                                          "var(--red)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                          "#fff";
                                        e.currentTarget.style.color =
                                          "var(--red)";
                                        e.currentTarget.style.borderColor =
                                          "#FEE2E2";
                                      }}
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
            </>
          )}

          {/* ─── TESTS ─── */}
          {activePanel === "tests" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                  Manage your test library. Add tests here, then assign them to
                  packages.
                </p>
                <button
                  onClick={openTestDlg}
                  style={{
                    padding: "8px 16px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  + Add Test
                </button>
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  marginBottom: 20,
                  overflow: "hidden",
                  boxShadow: "var(--shadow)",
                }}
              >
                <div style={{ padding: 24 }}>
                  <div style={{ position: "relative", marginBottom: 16 }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      style={{
                        position: "absolute",
                        left: 12,
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
                      value={testSearch}
                      onChange={(e) => setTestSearch(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px 10px 38px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 10,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      fontWeight: 600,
                      marginBottom: 12,
                    }}
                  >
                    {filteredTests.length} test
                    {filteredTests.length !== 1 ? "s" : ""}
                  </div>
                  <div>
                    {filteredTests.length === 0 ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: 40,
                          color: "var(--muted)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {testSearch
                          ? "No tests match your search."
                          : `No tests yet. Click "+ Add Test" to create your first test.`}
                      </div>
                    ) : (
                      filteredTests.map(([id, t]) => (
                        <div
                          key={id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 16px",
                            border: "1px solid var(--border)",
                            borderRadius: 10,
                            marginBottom: 8,
                            background: "#fff",
                            transition: "all 0.16s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor =
                              "var(--blue-mid)";
                            e.currentTarget.style.background =
                              "var(--blue-light)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.background = "#fff";
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontWeight: 700,
                                color: "var(--text)",
                                fontSize: "0.9rem",
                              }}
                            >
                              {esc(t.name)}{" "}
                              {t.code ? (
                                <span
                                  style={{
                                    color: "var(--muted)",
                                    fontWeight: 400,
                                    fontSize: "0.78rem",
                                  }}
                                >
                                  ({esc(t.code)})
                                </span>
                              ) : null}
                            </div>
                            <div
                              style={{
                                fontSize: "0.75rem",
                                color: "var(--muted)",
                                marginTop: 2,
                              }}
                            >
                              {t.category && (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 4,
                                    background: "#F0FDF4",
                                    color: "var(--green)",
                                    fontSize: "0.68rem",
                                    fontWeight: 700,
                                    padding: "3px 10px",
                                    borderRadius: 10,
                                  }}
                                >
                                  {esc(t.category)}
                                </span>
                              )}{" "}
                              {esc(t.description ?? "")}
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
                              onClick={() => editTest(id)}
                              style={{
                                padding: "4px 10px",
                                borderRadius: 6,
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                transition: "all 0.16s",
                                border: "1.5px solid var(--blue-pale)",
                                background: "#fff",
                                color: "var(--blue-mid)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "var(--blue-mid)";
                                e.currentTarget.style.color = "#fff";
                                e.currentTarget.style.borderColor =
                                  "var(--blue-mid)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#fff";
                                e.currentTarget.style.color = "var(--blue-mid)";
                                e.currentTarget.style.borderColor =
                                  "var(--blue-pale)";
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => confirmDeleteTest(id)}
                              style={{
                                padding: "4px 10px",
                                borderRadius: 6,
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                transition: "all 0.16s",
                                border: "1.5px solid #FEE2E2",
                                background: "#fff",
                                color: "var(--red)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "var(--red)";
                                e.currentTarget.style.color = "#fff";
                                e.currentTarget.style.borderColor =
                                  "var(--red)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#fff";
                                e.currentTarget.style.color = "var(--red)";
                                e.currentTarget.style.borderColor = "#FEE2E2";
                              }}
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
            </>
          )}

          {/* ─── HERO ─── */}
          {activePanel === "hero" && (
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                marginBottom: 20,
                overflow: "hidden",
                boxShadow: "var(--shadow)",
              }}
            >
              <div
                style={{
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fff",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>🖼️</span> Hero Section
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Eyebrow Text (small label above title)
                    </label>
                    <input
                      type="text"
                      id="h-eyebrow"
                      defaultValue={content.heroEyebrow ?? ""}
                      placeholder="Trusted by 50,000+ Families"
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Main Headline
                    </label>
                    <input
                      type="text"
                      id="h-title"
                      defaultValue={content.heroTitle ?? ""}
                      placeholder="Comprehensive Health Packages for Every Family"
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Subtitle / Description
                    </label>
                    <textarea
                      id="h-sub"
                      defaultValue={content.heroSubtitle ?? ""}
                      rows={3}
                      placeholder="Supporting sentence…"
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        resize: "vertical",
                        background: "#fff",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 24,
                    paddingTop: 20,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 14,
                    }}
                  >
                    Hero Statistics (4 items)
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill,minmax(250px,1fr))",
                      gap: 16,
                    }}
                  >
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                        }}
                      >
                        <label
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: "var(--muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}
                        >
                          Stat {i + 1} — Number
                        </label>
                        <input
                          type="text"
                          id={`hs-n-${i}`}
                          defaultValue={heroStats[i]?.num ?? ""}
                          style={{
                            padding: "10px 13px",
                            border: "1.5px solid var(--border)",
                            borderRadius: 8,
                            fontSize: "0.9rem",
                            outline: "none",
                            fontFamily: "inherit",
                            color: "var(--text)",
                            background: "#fff",
                          }}
                        />
                      </div>
                    ))}
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                        }}
                      >
                        <label
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: "var(--muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}
                        >
                          Stat {i + 1} — Label
                        </label>
                        <input
                          type="text"
                          id={`hs-l-${i}`}
                          defaultValue={heroStats[i]?.label ?? ""}
                          style={{
                            padding: "10px 13px",
                            border: "1.5px solid var(--border)",
                            borderRadius: 8,
                            fontSize: "0.9rem",
                            outline: "none",
                            fontFamily: "inherit",
                            color: "var(--text)",
                            background: "#fff",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={saveHero}
                  style={{
                    marginTop: 18,
                    padding: "11px 26px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  💾 Save Hero
                </button>
              </div>
            </div>
          )}

          {/* ─── TRUST ─── */}
          {activePanel === "trust" && (
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                marginBottom: 20,
                overflow: "hidden",
                boxShadow: "var(--shadow)",
              }}
            >
              <div
                style={{
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fff",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>🛡️</span> Trust Strip
                  Badges
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    marginBottom: 20,
                  }}
                >
                  These four badges appear in the band directly below the hero
                  section.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                    gap: 16,
                  }}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      <label
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "var(--muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        Badge {i} Text
                      </label>
                      <input
                        type="text"
                        id={`t${i}`}
                        defaultValue={(content as any)[`trust${i}`] ?? ""}
                        style={{
                          padding: "10px 13px",
                          border: "1.5px solid var(--border)",
                          borderRadius: 8,
                          fontSize: "0.9rem",
                          outline: "none",
                          fontFamily: "inherit",
                          color: "var(--text)",
                          background: "#fff",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={saveTrust}
                  style={{
                    marginTop: 18,
                    padding: "11px 26px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  💾 Save Trust Strip
                </button>
              </div>
            </div>
          )}

          {/* ─── WHY US ─── */}
          {activePanel === "why" && (
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                marginBottom: 20,
                overflow: "hidden",
                boxShadow: "var(--shadow)",
              }}
            >
              <div
                style={{
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fff",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>⭐</span> Why Us Section
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                    gap: 16,
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Section Title
                    </label>
                    <input
                      type="text"
                      id="why-title"
                      defaultValue={content.whyTitle ?? ""}
                      placeholder="Healthcare You Can Trust"
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Section Description
                    </label>
                    <input
                      type="text"
                      id="why-desc"
                      defaultValue={content.whyDesc ?? ""}
                      placeholder="Supporting sentence…"
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={saveWhy}
                  style={{
                    marginTop: 18,
                    padding: "11px 26px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  💾 Save Why Us
                </button>
              </div>
            </div>
          )}

          {/* ─── CTA ─── */}
          {activePanel === "cta" && (
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                marginBottom: 20,
                overflow: "hidden",
                boxShadow: "var(--shadow)",
              }}
            >
              <div
                style={{
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fff",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>📣</span> CTA Banner
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Headline
                    </label>
                    <input
                      type="text"
                      id="cta-t"
                      defaultValue={content.ctaTitle ?? ""}
                      placeholder="Start Your Health Journey Today"
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Subtitle
                    </label>
                    <textarea
                      id="cta-s"
                      defaultValue={content.ctaSubtitle ?? ""}
                      rows={3}
                      placeholder="Supporting sentence…"
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        resize: "vertical",
                        background: "#fff",
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={saveCTA}
                  style={{
                    marginTop: 18,
                    padding: "11px 26px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  💾 Save CTA
                </button>
              </div>
            </div>
          )}

          {/* ─── SETTINGS ─── */}
          {activePanel === "settings" && (
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                marginBottom: 20,
                overflow: "hidden",
                boxShadow: "var(--shadow)",
              }}
            >
              <div
                style={{
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fff",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>⚙️</span> Site Settings
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                    gap: 16,
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Site Name
                    </label>
                    <input
                      type="text"
                      id="s-name"
                      defaultValue={content.siteName ?? ""}
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Site Tagline (under logo)
                    </label>
                    <input
                      type="text"
                      id="s-tagline"
                      defaultValue={content.siteTagline ?? ""}
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Footer Text
                    </label>
                    <input
                      type="text"
                      id="s-footer"
                      defaultValue={content.footerText ?? ""}
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Packages Section Title
                    </label>
                    <input
                      type="text"
                      id="s-pkgtitle"
                      defaultValue={content.pkgSectionTitle ?? ""}
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Packages Section Description
                    </label>
                    <textarea
                      id="s-pkgdesc"
                      defaultValue={content.pkgSectionDesc ?? ""}
                      rows={2}
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        resize: "vertical",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      How It Works Title
                    </label>
                    <input
                      type="text"
                      id="s-steptitle"
                      defaultValue={content.stepsTitle ?? ""}
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Testimonials Section Title
                    </label>
                    <input
                      type="text"
                      id="s-testitle"
                      defaultValue={content.testiTitle ?? ""}
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={saveSettings}
                  style={{
                    marginTop: 18,
                    padding: "11px 26px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  💾 Save Settings
                </button>
              </div>
            </div>
          )}

          {/* ─── PACKAGES ─── */}
          {activePanel === "packages" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                  Manage all health packages. Changes appear live on the site.
                </p>
                <button
                  onClick={openPkgDlg}
                  style={{
                    padding: "8px 16px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  + Add Package
                </button>
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  marginBottom: 20,
                  overflow: "hidden",
                  boxShadow: "var(--shadow)",
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={thStyle}>Package</th>
                        <th style={thStyle}>Category</th>
                        <th style={thStyle}>Price</th>
                        <th style={thStyle}>Tests</th>
                        <th style={thStyle}>Order</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(allPkgs).length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            style={{
                              textAlign: "center",
                              padding: 40,
                              color: "var(--muted)",
                            }}
                          >
                            No packages yet. Click "+ Add Package" to create
                            one.
                          </td>
                        </tr>
                      ) : (
                        Object.entries(allPkgs)
                          .sort(
                            (a, b) => (a[1].order || 99) - (b[1].order || 99),
                          )
                          .map(([id, p]) => {
                            const testCount =
                              (p.tests || []).length +
                              (p.customTests || []).length;
                            return (
                              <tr
                                key={id}
                                style={
                                  p.order === 0
                                    ? { opacity: 0.55, background: "#F8FAFC" }
                                    : {}
                                }
                              >
                                <td style={tdStyle}>
                                  <div
                                    style={{
                                      fontWeight: 700,
                                      color: "var(--text)",
                                    }}
                                  >
                                    {p.icon || ""} {esc(p.name)}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "0.75rem",
                                      color: "var(--muted)",
                                      marginTop: 2,
                                    }}
                                  >
                                    {esc(p.tagline || "—")}
                                  </div>
                                </td>
                                <td style={tdStyle}>
                                  {esc(p.category || "—")}
                                </td>
                                <td style={tdStyle}>
                                  <span
                                    style={{
                                      fontFamily: "'Nunito',sans-serif",
                                      fontWeight: 800,
                                      color: "var(--blue)",
                                      fontSize: "0.95rem",
                                    }}
                                  >
                                    {esc(p.currency || "AED")}{" "}
                                    {esc(String(p.price))}
                                  </span>
                                </td>
                                <td style={tdStyle}>{testCount}</td>
                                <td style={tdStyle}>
                                  {p.order !== undefined ? p.order : 1}
                                </td>
                                <td style={tdStyle}>
                                  {p.order === 0 ? (
                                    <span
                                      style={{
                                        color: "var(--red)",
                                        fontSize: "0.78rem",
                                        fontWeight: 700,
                                      }}
                                    >
                                      🚫 Hidden
                                    </span>
                                  ) : p.featured ? (
                                    <span
                                      style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 4,
                                        background: "var(--blue-pale)",
                                        color: "var(--blue-mid)",
                                        fontSize: "0.68rem",
                                        fontWeight: 700,
                                        padding: "3px 10px",
                                        borderRadius: 10,
                                      }}
                                    >
                                      ⭐ Popular
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        color: "var(--muted)",
                                        fontSize: "0.78rem",
                                      }}
                                    >
                                      —
                                    </span>
                                  )}
                                </td>
                                <td style={tdStyle}>
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: 6,
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <button
                                      onClick={() => editPkg(id)}
                                      style={actBtnStyle(
                                        "var(--blue-mid)",
                                        "var(--blue-pale)",
                                      )}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                          "var(--blue-mid)";
                                        e.currentTarget.style.color = "#fff";
                                        e.currentTarget.style.borderColor =
                                          "var(--blue-mid)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                          "#fff";
                                        e.currentTarget.style.color =
                                          "var(--blue-mid)";
                                        e.currentTarget.style.borderColor =
                                          "var(--blue-pale)";
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => confirmDeletePkg(id)}
                                      style={actBtnStyle(
                                        "var(--red)",
                                        "#FEE2E2",
                                      )}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                          "var(--red)";
                                        e.currentTarget.style.color = "#fff";
                                        e.currentTarget.style.borderColor =
                                          "var(--red)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                          "#fff";
                                        e.currentTarget.style.color =
                                          "var(--red)";
                                        e.currentTarget.style.borderColor =
                                          "#FEE2E2";
                                      }}
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
            </>
          )}

          {/* ─── TESTS ─── */}
          {activePanel === "tests" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                  Manage your test library. Add tests here, then assign them to
                  packages.
                </p>
                <button
                  onClick={openTestDlg}
                  style={{
                    padding: "8px 16px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  + Add Test
                </button>
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  marginBottom: 20,
                  overflow: "hidden",
                  boxShadow: "var(--shadow)",
                }}
              >
                <div style={{ padding: 24 }}>
                  <div style={{ position: "relative", marginBottom: 16 }}>
                    <svg
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--muted)",
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
                      value={testSearch}
                      onChange={(e) => setTestSearch(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px 10px 38px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 10,
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border 0.16s, box-shadow 0.16s",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      fontWeight: 600,
                      marginBottom: 12,
                    }}
                  >
                    {filteredTests.length} test
                    {filteredTests.length !== 1 ? "s" : ""}
                  </div>
                  {filteredTests.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: 40,
                        color: "var(--muted)",
                        fontSize: "0.9rem",
                      }}
                    >
                      No tests match your search.
                    </div>
                  ) : (
                    filteredTests.map(([id, t]) => (
                      <div
                        key={id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 16px",
                          border: "1px solid var(--border)",
                          borderRadius: 10,
                          marginBottom: 8,
                          background: "#fff",
                          transition: "all 0.16s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--blue-mid)";
                          e.currentTarget.style.background =
                            "var(--blue-light)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.background = "#fff";
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: 700,
                              color: "var(--text)",
                              fontSize: "0.9rem",
                            }}
                          >
                            {esc(t.name)}{" "}
                            {t.code && (
                              <span
                                style={{
                                  color: "var(--muted)",
                                  fontWeight: 400,
                                  fontSize: "0.78rem",
                                }}
                              >
                                ({esc(t.code)})
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--muted)",
                              marginTop: 2,
                            }}
                          >
                            {t.category && (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 4,
                                  background: "#F0FDF4",
                                  color: "var(--green)",
                                  fontSize: "0.68rem",
                                  fontWeight: 700,
                                  padding: "3px 10px",
                                  borderRadius: 10,
                                  marginRight: 6,
                                }}
                              >
                                {esc(t.category)}
                              </span>
                            )}
                            {esc(t.description || "")}
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
                            onClick={() => editTest(id)}
                            style={{
                              ...actBtnStyle(
                                "var(--blue-mid)",
                                "var(--blue-pale)",
                              ),
                              padding: "4px 10px",
                              fontSize: "0.72rem",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "var(--blue-mid)";
                              e.currentTarget.style.color = "#fff";
                              e.currentTarget.style.borderColor =
                                "var(--blue-mid)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#fff";
                              e.currentTarget.style.color = "var(--blue-mid)";
                              e.currentTarget.style.borderColor =
                                "var(--blue-pale)";
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => confirmDeleteTest(id)}
                            style={{
                              ...actBtnStyle("var(--red)", "#FEE2E2"),
                              padding: "4px 10px",
                              fontSize: "0.72rem",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "var(--red)";
                              e.currentTarget.style.color = "#fff";
                              e.currentTarget.style.borderColor = "var(--red)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#fff";
                              e.currentTarget.style.color = "var(--red)";
                              e.currentTarget.style.borderColor = "#FEE2E2";
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {/* ─── PACKAGES ─── */}
          {activePanel === "packages" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                  Manage all health packages. Changes appear live on the site.
                </p>
                <button
                  onClick={openPkgDlg}
                  style={{
                    padding: "8px 16px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  + Add Package
                </button>
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  marginBottom: 20,
                  overflow: "hidden",
                  boxShadow: "var(--shadow)",
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {[
                          "Package",
                          "Category",
                          "Price",
                          "Tests",
                          "Order",
                          "Status",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              textAlign: "left",
                              fontSize: "0.7rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: "var(--muted)",
                              fontWeight: 700,
                              padding: "10px 16px",
                              borderBottom: "2px solid var(--border)",
                              background: "var(--bg)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(allPkgs).length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            style={{
                              textAlign: "center",
                              padding: 40,
                              color: "var(--muted)",
                            }}
                          >
                            No packages yet. Click "+ Add Package" to create
                            one.
                          </td>
                        </tr>
                      ) : (
                        Object.entries(allPkgs)
                          .sort(
                            (a, b) => (a[1].order || 99) - (b[1].order || 99),
                          )
                          .map(([id, p]) => {
                            const testCount =
                              (p.tests || []).length +
                              (p.customTests || []).length;
                            return (
                              <tr
                                key={id}
                                style={{
                                  opacity: p.order === 0 ? 0.55 : 1,
                                  background:
                                    p.order === 0 ? "#F8FAFC" : "transparent",
                                }}
                              >
                                <td
                                  style={{
                                    padding: "13px 16px",
                                    borderBottom: "1px solid var(--border)",
                                    fontSize: "0.875rem",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontWeight: 700,
                                      color: "var(--text)",
                                    }}
                                  >
                                    {p.icon || ""} {esc(p.name)}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "0.75rem",
                                      color: "var(--muted)",
                                      marginTop: 2,
                                    }}
                                  >
                                    {esc(p.tagline || "—")}
                                  </div>
                                </td>
                                <td
                                  style={{
                                    padding: "13px 16px",
                                    borderBottom: "1px solid var(--border)",
                                    fontSize: "0.875rem",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {esc(p.category || "—")}
                                </td>
                                <td
                                  style={{
                                    padding: "13px 16px",
                                    borderBottom: "1px solid var(--border)",
                                    fontSize: "0.875rem",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily: "'Nunito',sans-serif",
                                      fontWeight: 800,
                                      color: "var(--blue)",
                                      fontSize: "0.95rem",
                                    }}
                                  >
                                    {esc(p.currency || "AED")}{" "}
                                    {esc(String(p.price))}
                                  </span>
                                </td>
                                <td
                                  style={{
                                    padding: "13px 16px",
                                    borderBottom: "1px solid var(--border)",
                                    fontSize: "0.875rem",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {testCount}
                                </td>
                                <td
                                  style={{
                                    padding: "13px 16px",
                                    borderBottom: "1px solid var(--border)",
                                    fontSize: "0.875rem",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {p.order !== undefined ? p.order : 1}
                                </td>
                                <td
                                  style={{
                                    padding: "13px 16px",
                                    borderBottom: "1px solid var(--border)",
                                    fontSize: "0.875rem",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {p.order === 0 ? (
                                    <span
                                      style={{
                                        color: "var(--red)",
                                        fontSize: "0.78rem",
                                        fontWeight: 700,
                                      }}
                                    >
                                      🚫 Hidden
                                    </span>
                                  ) : p.featured ? (
                                    <span
                                      style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 4,
                                        background: "var(--blue-pale)",
                                        color: "var(--blue-mid)",
                                        fontSize: "0.68rem",
                                        fontWeight: 700,
                                        padding: "3px 10px",
                                        borderRadius: 10,
                                      }}
                                    >
                                      ⭐ Popular
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        color: "var(--muted)",
                                        fontSize: "0.78rem",
                                      }}
                                    >
                                      —
                                    </span>
                                  )}
                                </td>
                                <td
                                  style={{
                                    padding: "13px 16px",
                                    borderBottom: "1px solid var(--border)",
                                    fontSize: "0.875rem",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: 6,
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <button
                                      onClick={() => editPkg(id)}
                                      style={{
                                        padding: "5px 12px",
                                        borderRadius: 6,
                                        fontSize: "0.76rem",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        fontFamily: "inherit",
                                        transition: "all 0.16s",
                                        border: "1.5px solid var(--blue-pale)",
                                        background: "#fff",
                                        color: "var(--blue-mid)",
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => confirmDeletePkg(id)}
                                      style={{
                                        padding: "5px 12px",
                                        borderRadius: 6,
                                        fontSize: "0.76rem",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        fontFamily: "inherit",
                                        transition: "all 0.16s",
                                        border: "1.5px solid #FEE2E2",
                                        background: "#fff",
                                        color: "var(--red)",
                                      }}
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
            </>
          )}

          {/* ─── TESTS ─── */}
          {activePanel === "tests" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                  Manage your test library. Add tests here, then assign them to
                  packages.
                </p>
                <button
                  onClick={openTestDlg}
                  style={{
                    padding: "8px 16px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  + Add Test
                </button>
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  marginBottom: 20,
                  overflow: "hidden",
                  boxShadow: "var(--shadow)",
                }}
              >
                <div style={{ padding: 24 }}>
                  <div style={{ position: "relative", marginBottom: 16 }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      style={{
                        position: "absolute",
                        left: 12,
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
                      value={testSearch}
                      onChange={(e) => setTestSearch(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px 10px 38px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 10,
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border 0.16s, box-shadow 0.16s",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      fontWeight: 600,
                      marginBottom: 12,
                    }}
                  >
                    {filteredTests.length} test
                    {filteredTests.length !== 1 ? "s" : ""}
                  </div>
                  <div>
                    {filteredTests.length === 0 ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: 40,
                          color: "var(--muted)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {Object.keys(allTests).length === 0
                          ? `No tests yet. Click "+ Add Test" to create your first test.`
                          : "No tests match your search."}
                      </div>
                    ) : (
                      filteredTests.map(([id, t]) => (
                        <div
                          key={id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 16px",
                            border: "1px solid var(--border)",
                            borderRadius: 10,
                            marginBottom: 8,
                            background: "#fff",
                            transition: "all 0.16s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor =
                              "var(--blue-mid)";
                            e.currentTarget.style.background =
                              "var(--blue-light)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.background = "#fff";
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontWeight: 700,
                                color: "var(--text)",
                                fontSize: "0.9rem",
                              }}
                            >
                              {esc(t.name)}{" "}
                              {t.code && (
                                <span
                                  style={{
                                    color: "var(--muted)",
                                    fontWeight: 400,
                                    fontSize: "0.78rem",
                                  }}
                                >
                                  ({esc(t.code)})
                                </span>
                              )}
                            </div>
                            <div
                              style={{
                                fontSize: "0.75rem",
                                color: "var(--muted)",
                                marginTop: 2,
                              }}
                            >
                              {t.category && (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 4,
                                    background: "#F0FDF4",
                                    color: "var(--green)",
                                    fontSize: "0.68rem",
                                    fontWeight: 700,
                                    padding: "3px 10px",
                                    borderRadius: 10,
                                    marginRight: 6,
                                  }}
                                >
                                  {esc(t.category)}
                                </span>
                              )}
                              {esc(t.description || "")}
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
                              onClick={() => editTest(id)}
                              style={{
                                padding: "4px 10px",
                                borderRadius: 6,
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                transition: "all 0.16s",
                                border: "1.5px solid var(--blue-pale)",
                                background: "#fff",
                                color: "var(--blue-mid)",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => confirmDeleteTest(id)}
                              style={{
                                padding: "4px 10px",
                                borderRadius: 6,
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                transition: "all 0.16s",
                                border: "1.5px solid #FEE2E2",
                                background: "#fff",
                                color: "var(--red)",
                              }}
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
            </>
          )}

          {/* ─── HERO ─── */}
          {activePanel === "hero" && (
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                marginBottom: 20,
                overflow: "hidden",
                boxShadow: "var(--shadow)",
              }}
            >
              <div
                style={{
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fff",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>🖼️</span> Hero Section
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      gridColumn: "1 / -1",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Eyebrow Text (small label above title)
                    </label>
                    <input
                      type="text"
                      id="h-eyebrow"
                      defaultValue={content.heroEyebrow || ""}
                      placeholder="Trusted by 50,000+ Families"
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border 0.16s, box-shadow 0.16s",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        resize: "vertical",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      gridColumn: "1 / -1",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Main Headline
                    </label>
                    <input
                      type="text"
                      id="h-title"
                      defaultValue={content.heroTitle || ""}
                      placeholder="Comprehensive Health Packages for Every Family"
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border 0.16s, box-shadow 0.16s",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        resize: "vertical",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      gridColumn: "1 / -1",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Subtitle / Description
                    </label>
                    <textarea
                      id="h-sub"
                      defaultValue={content.heroSubtitle || ""}
                      rows={3}
                      placeholder="Supporting sentence..."
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border 0.16s, box-shadow 0.16s",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        resize: "vertical",
                        background: "#fff",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 24,
                    paddingTop: 20,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 14,
                    }}
                  >
                    Hero Statistics (4 items)
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill,minmax(250px,1fr))",
                      gap: 16,
                    }}
                  >
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                        }}
                      >
                        <label
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: "var(--muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}
                        >
                          Stat {i + 1} — Number
                        </label>
                        <input
                          type="text"
                          id={`hs-n-${i}`}
                          defaultValue={heroStats[i]?.num || ""}
                          style={{
                            padding: "10px 13px",
                            border: "1.5px solid var(--border)",
                            borderRadius: 8,
                            fontSize: "0.9rem",
                            outline: "none",
                            transition: "border 0.16s, box-shadow 0.16s",
                            fontFamily: "inherit",
                            color: "var(--text)",
                            background: "#fff",
                          }}
                        />
                      </div>
                    ))}
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={`l-${i}`}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                        }}
                      >
                        <label
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: "var(--muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}
                        >
                          Stat {i + 1} — Label
                        </label>
                        <input
                          type="text"
                          id={`hs-l-${i}`}
                          defaultValue={heroStats[i]?.label || ""}
                          style={{
                            padding: "10px 13px",
                            border: "1.5px solid var(--border)",
                            borderRadius: 8,
                            fontSize: "0.9rem",
                            outline: "none",
                            transition: "border 0.16s, box-shadow 0.16s",
                            fontFamily: "inherit",
                            color: "var(--text)",
                            background: "#fff",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={saveHero}
                  style={{
                    marginTop: 18,
                    padding: "11px 26px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  💾 Save Hero
                </button>
              </div>
            </div>
          )}

          {/* ─── TRUST ─── */}
          {activePanel === "trust" && (
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                marginBottom: 20,
                overflow: "hidden",
                boxShadow: "var(--shadow)",
              }}
            >
              <div
                style={{
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fff",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>🛡️</span> Trust Strip
                  Badges
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    marginBottom: 20,
                  }}
                >
                  These four badges appear in the band directly below the hero
                  section.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                    gap: 16,
                  }}
                >
                  {[
                    { id: "t1", label: "Badge 1 Text", val: content.trust1 },
                    { id: "t2", label: "Badge 2 Text", val: content.trust2 },
                    { id: "t3", label: "Badge 3 Text", val: content.trust3 },
                    { id: "t4", label: "Badge 4 Text", val: content.trust4 },
                  ].map((b) => (
                    <div
                      key={b.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      <label
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "var(--muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {b.label}
                      </label>
                      <input
                        type="text"
                        id={b.id}
                        defaultValue={b.val || ""}
                        style={{
                          padding: "10px 13px",
                          border: "1.5px solid var(--border)",
                          borderRadius: 8,
                          fontSize: "0.9rem",
                          outline: "none",
                          transition: "border 0.16s, box-shadow 0.16s",
                          fontFamily: "inherit",
                          color: "var(--text)",
                          background: "#fff",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={saveTrust}
                  style={{
                    marginTop: 18,
                    padding: "11px 26px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  💾 Save Trust Strip
                </button>
              </div>
            </div>
          )}

          {/* ─── WHY US ─── */}
          {activePanel === "why" && (
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                marginBottom: 20,
                overflow: "hidden",
                boxShadow: "var(--shadow)",
              }}
            >
              <div
                style={{
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fff",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>⭐</span> Why Us Section
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                    gap: 16,
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Section Title
                    </label>
                    <input
                      type="text"
                      id="why-title"
                      defaultValue={content.whyTitle || ""}
                      placeholder="Healthcare You Can Trust"
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border 0.16s, box-shadow 0.16s",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Section Description
                    </label>
                    <input
                      type="text"
                      id="why-desc"
                      defaultValue={content.whyDesc || ""}
                      placeholder="Supporting sentence..."
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border 0.16s, box-shadow 0.16s",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={saveWhy}
                  style={{
                    marginTop: 18,
                    padding: "11px 26px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  💾 Save Why Us
                </button>
              </div>
            </div>
          )}

          {/* ─── CTA ─── */}
          {activePanel === "cta" && (
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                marginBottom: 20,
                overflow: "hidden",
                boxShadow: "var(--shadow)",
              }}
            >
              <div
                style={{
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fff",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>📣</span> CTA Banner
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      gridColumn: "1 / -1",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Headline
                    </label>
                    <input
                      type="text"
                      id="cta-t"
                      defaultValue={content.ctaTitle || ""}
                      placeholder="Start Your Health Journey Today"
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border 0.16s, box-shadow 0.16s",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      gridColumn: "1 / -1",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Subtitle
                    </label>
                    <textarea
                      id="cta-s"
                      defaultValue={content.ctaSubtitle || ""}
                      rows={3}
                      placeholder="Supporting sentence..."
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border 0.16s, box-shadow 0.16s",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        resize: "vertical",
                        background: "#fff",
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={saveCTA}
                  style={{
                    marginTop: 18,
                    padding: "11px 26px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  💾 Save CTA
                </button>
              </div>
            </div>
          )}

          {/* ─── SETTINGS ─── */}
          {activePanel === "settings" && (
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                marginBottom: 20,
                overflow: "hidden",
                boxShadow: "var(--shadow)",
              }}
            >
              <div
                style={{
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#fff",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>⚙️</span> Site Settings
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                    gap: 16,
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Site Name
                    </label>
                    <input
                      type="text"
                      id="s-name"
                      defaultValue={content.siteName || ""}
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Site Tagline (under logo)
                    </label>
                    <input
                      type="text"
                      id="s-tagline"
                      defaultValue={content.siteTagline || ""}
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      gridColumn: "1 / -1",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Footer Text
                    </label>
                    <input
                      type="text"
                      id="s-footer"
                      defaultValue={content.footerText || ""}
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      gridColumn: "1 / -1",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Packages Section Title
                    </label>
                    <input
                      type="text"
                      id="s-pkgtitle"
                      defaultValue={content.pkgSectionTitle || ""}
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      gridColumn: "1 / -1",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Packages Section Description
                    </label>
                    <textarea
                      id="s-pkgdesc"
                      defaultValue={content.pkgSectionDesc || ""}
                      rows={2}
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        resize: "vertical",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      How It Works Title
                    </label>
                    <input
                      type="text"
                      id="s-steptitle"
                      defaultValue={content.stepsTitle || ""}
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Testimonials Section Title
                    </label>
                    <input
                      type="text"
                      id="s-testitle"
                      defaultValue={content.testiTitle || ""}
                      style={{
                        padding: "10px 13px",
                        border: "1.5px solid var(--border)",
                        borderRadius: 8,
                        fontSize: "0.9rem",
                        outline: "none",
                        fontFamily: "inherit",
                        color: "var(--text)",
                        background: "#fff",
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={saveSettings}
                  style={{
                    marginTop: 18,
                    padding: "11px 26px",
                    background: "var(--blue-mid)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.16s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  💾 Save Settings
                </button>
              </div>
            </div>
          )}

          {/* ─── ORDERS ─── */}
          {activePanel === "orders" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                  View and manage customer orders. Click on an order to see full
                  details.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      border: "1.5px solid var(--border)",
                      borderRadius: 8,
                      fontSize: "0.85rem",
                      fontFamily: "inherit",
                      color: "var(--text)",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <input
                    type="date"
                    value={orderDateFrom}
                    onChange={(e) => setOrderDateFrom(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      border: "1.5px solid var(--border)",
                      borderRadius: 8,
                      fontSize: "0.85rem",
                      fontFamily: "inherit",
                      color: "var(--text)",
                    }}
                    title="From date"
                  />
                  <input
                    type="date"
                    value={orderDateTo}
                    onChange={(e) => setOrderDateTo(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      border: "1.5px solid var(--border)",
                      borderRadius: 8,
                      fontSize: "0.85rem",
                      fontFamily: "inherit",
                      color: "var(--text)",
                    }}
                    title="To date"
                  />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      border: "1.5px solid var(--border)",
                      borderRadius: 8,
                      fontSize: "0.85rem",
                      fontFamily: "inherit",
                      color: "var(--text)",
                      width: 200,
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                  gap: 16,
                  marginBottom: 20,
                }}
              >
                {[
                  {
                    icon: "📋",
                    iconBg: "#FEF3C7",
                    num: orderStats.total,
                    label: "Total Orders",
                  },
                  {
                    icon: "⏳",
                    iconBg: "#FFF7ED",
                    num: orderStats.pending,
                    label: "Pending",
                  },
                  {
                    icon: "✅",
                    iconBg: "#D1FAE5",
                    num: orderStats.completed,
                    label: "Completed",
                  },
                  {
                    icon: "💰",
                    iconBg: "#F5F3FF",
                    num: orderStats.revenue.toLocaleString(),
                    label: "Revenue (AED)",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#fff",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      padding: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      boxShadow: "var(--shadow)",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.4rem",
                        flexShrink: 0,
                        background: card.iconBg,
                      }}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Nunito',sans-serif",
                          fontSize: "1.8rem",
                          fontWeight: 800,
                          color: "var(--text)",
                          lineHeight: 1,
                        }}
                      >
                        {card.num}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--muted)",
                          marginTop: 3,
                          fontWeight: 600,
                        }}
                      >
                        {card.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  marginBottom: 20,
                  overflow: "hidden",
                  boxShadow: "var(--shadow)",
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {[
                          "Order ID",
                          "Customer",
                          "Package",
                          "Amount",
                          "Date",
                          "Status",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              textAlign: "left",
                              fontSize: "0.7rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: "var(--muted)",
                              fontWeight: 700,
                              padding: "10px 16px",
                              borderBottom: "2px solid var(--border)",
                              background: "var(--bg)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            style={{
                              textAlign: "center",
                              padding: 40,
                              color: "var(--muted)",
                            }}
                          >
                            No orders found.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map(([id, o]) => {
                          const status = o.status || "pending";
                          const sc =
                            statusColors[status] || statusColors.pending;
                          return (
                            <tr
                              key={id}
                              style={{ cursor: "pointer" }}
                              onClick={() => viewOrder(id)}
                            >
                              <td
                                style={{
                                  padding: "13px 16px",
                                  borderBottom: "1px solid var(--border)",
                                  fontSize: "0.875rem",
                                  verticalAlign: "middle",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "monospace",
                                    fontSize: "0.8rem",
                                    fontWeight: 700,
                                    color: "var(--blue-mid)",
                                  }}
                                >
                                  #{esc(id.slice(-8).toUpperCase())}
                                </span>
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  borderBottom: "1px solid var(--border)",
                                  fontSize: "0.875rem",
                                  verticalAlign: "middle",
                                }}
                              >
                                <div
                                  style={{
                                    fontWeight: 700,
                                    color: "var(--text)",
                                  }}
                                >
                                  {esc(o.customerName || o.userName || "Guest")}
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "var(--muted)",
                                    marginTop: 2,
                                  }}
                                >
                                  {esc(o.customerEmail || o.userEmail || "—")}
                                </div>
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  borderBottom: "1px solid var(--border)",
                                  fontSize: "0.875rem",
                                  verticalAlign: "middle",
                                }}
                              >
                                {esc(o.packageName || "—")}
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  borderBottom: "1px solid var(--border)",
                                  fontSize: "0.875rem",
                                  verticalAlign: "middle",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "'Nunito',sans-serif",
                                    fontWeight: 800,
                                    color: "var(--blue)",
                                    fontSize: "0.95rem",
                                  }}
                                >
                                  {esc(o.currency || "AED")}{" "}
                                  {esc(String(o.amount || 0))}
                                </span>
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  borderBottom: "1px solid var(--border)",
                                  fontSize: "0.78rem",
                                  color: "var(--muted)",
                                  verticalAlign: "middle",
                                }}
                              >
                                {formatDate(o.createdAt)}
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  borderBottom: "1px solid var(--border)",
                                  fontSize: "0.875rem",
                                  verticalAlign: "middle",
                                }}
                              >
                                <span
                                  style={{
                                    display: "inline-block",
                                    padding: "3px 10px",
                                    borderRadius: 10,
                                    fontSize: "0.68rem",
                                    fontWeight: 700,
                                    background: sc.bg,
                                    color: sc.color,
                                  }}
                                >
                                  {sc.label}
                                </span>
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  borderBottom: "1px solid var(--border)",
                                  fontSize: "0.875rem",
                                  verticalAlign: "middle",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    gap: 6,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      viewOrder(id);
                                    }}
                                    style={{
                                      padding: "5px 12px",
                                      borderRadius: 6,
                                      fontSize: "0.76rem",
                                      fontWeight: 700,
                                      cursor: "pointer",
                                      fontFamily: "inherit",
                                      border: "1.5px solid #D1FAE5",
                                      background: "#fff",
                                      color: "var(--green)",
                                    }}
                                  >
                                    View
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      confirmDeleteOrder(id);
                                    }}
                                    style={{
                                      padding: "5px 12px",
                                      borderRadius: 6,
                                      fontSize: "0.76rem",
                                      fontWeight: 700,
                                      cursor: "pointer",
                                      fontFamily: "inherit",
                                      border: "1.5px solid #FEE2E2",
                                      background: "#fff",
                                      color: "var(--red)",
                                    }}
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
            </>
          )}

          {/* ─── USERS ─── */}
          {activePanel === "users" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                  View registered users and their activity.
                </p>
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    fontSize: "0.85rem",
                    fontFamily: "inherit",
                    color: "var(--text)",
                    width: 260,
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                  gap: 16,
                  marginBottom: 20,
                }}
              >
                {[
                  {
                    icon: "👥",
                    iconBg: "#EFF6FF",
                    num: userStats.total,
                    label: "Total Users",
                  },
                  {
                    icon: "🆕",
                    iconBg: "#ECFDF5",
                    num: userStats.new7d,
                    label: "New (7 days)",
                  },
                  {
                    icon: "🛒",
                    iconBg: "#FFF7ED",
                    num: userStats.withOrders,
                    label: "With Orders",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#fff",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      padding: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      boxShadow: "var(--shadow)",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.4rem",
                        flexShrink: 0,
                        background: card.iconBg,
                      }}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Nunito',sans-serif",
                          fontSize: "1.8rem",
                          fontWeight: 800,
                          color: "var(--text)",
                          lineHeight: 1,
                        }}
                      >
                        {card.num}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--muted)",
                          marginTop: 3,
                          fontWeight: 600,
                        }}
                      >
                        {card.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  marginBottom: 20,
                  overflow: "hidden",
                  boxShadow: "var(--shadow)",
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {[
                          "User",
                          "Email",
                          "Phone",
                          "Joined",
                          "Orders",
                          "Total Spent",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              textAlign: "left",
                              fontSize: "0.7rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: "var(--muted)",
                              fontWeight: 700,
                              padding: "10px 16px",
                              borderBottom: "2px solid var(--border)",
                              background: "var(--bg)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            style={{
                              textAlign: "center",
                              padding: 40,
                              color: "var(--muted)",
                            }}
                          >
                            No users found.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map(([id, u]) => {
                          const stats = userOrderStats[id] || {
                            count: 0,
                            total: 0,
                          };
                          const joined = formatDateShort(u.createdAt);
                          const initials = getInitials(
                            u.name || u.displayName || u.email || "U",
                          );
                          return (
                            <tr
                              key={id}
                              style={{ cursor: "pointer" }}
                              onClick={() => viewUser(id)}
                            >
                              <td
                                style={{
                                  padding: "13px 16px",
                                  borderBottom: "1px solid var(--border)",
                                  fontSize: "0.875rem",
                                  verticalAlign: "middle",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 34,
                                      height: 34,
                                      borderRadius: "50%",
                                      background: "var(--blue-mid)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontWeight: 800,
                                      fontSize: "0.75rem",
                                      color: "#fff",
                                      flexShrink: 0,
                                    }}
                                  >
                                    {initials}
                                  </div>
                                  <div>
                                    <div
                                      style={{
                                        fontWeight: 700,
                                        color: "var(--text)",
                                      }}
                                    >
                                      {esc(
                                        u.name || u.displayName || "Unnamed",
                                      )}
                                    </div>
                                    <div
                                      style={{
                                        fontSize: "0.75rem",
                                        color: "var(--muted)",
                                        marginTop: 2,
                                      }}
                                    >
                                      {esc(u.uid || id.slice(0, 8))}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  borderBottom: "1px solid var(--border)",
                                  fontSize: "0.875rem",
                                  verticalAlign: "middle",
                                }}
                              >
                                {esc(u.email || "—")}
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  borderBottom: "1px solid var(--border)",
                                  fontSize: "0.875rem",
                                  verticalAlign: "middle",
                                }}
                              >
                                {esc(u.phone || "—")}
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  borderBottom: "1px solid var(--border)",
                                  fontSize: "0.78rem",
                                  color: "var(--muted)",
                                  verticalAlign: "middle",
                                }}
                              >
                                {joined}
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  borderBottom: "1px solid var(--border)",
                                  fontSize: "0.875rem",
                                  verticalAlign: "middle",
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: 700,
                                    color: "var(--blue-mid)",
                                  }}
                                >
                                  {stats.count}
                                </span>
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  borderBottom: "1px solid var(--border)",
                                  fontSize: "0.875rem",
                                  verticalAlign: "middle",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "'Nunito',sans-serif",
                                    fontWeight: 800,
                                    color: "var(--blue)",
                                    fontSize: "0.95rem",
                                  }}
                                >
                                  AED {stats.total.toLocaleString()}
                                </span>
                              </td>
                              <td
                                style={{
                                  padding: "13px 16px",
                                  borderBottom: "1px solid var(--border)",
                                  fontSize: "0.875rem",
                                  verticalAlign: "middle",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    gap: 6,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      viewUser(id);
                                    }}
                                    style={{
                                      padding: "5px 12px",
                                      borderRadius: 6,
                                      fontSize: "0.76rem",
                                      fontWeight: 700,
                                      cursor: "pointer",
                                      fontFamily: "inherit",
                                      border: "1.5px solid var(--blue-pale)",
                                      background: "#fff",
                                      color: "var(--blue-mid)",
                                    }}
                                  >
                                    View
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
            </>
          )}
        </div>
      </main>

      {/* ─── PACKAGE DIALOG ─── */}
      {pkgDlgOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,.55)",
            zIndex: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closePkgDlg();
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 30,
              width: 620,
              maxWidth: "95vw",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  fontFamily: "'Nunito',sans-serif",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                {pkgDlgTitle}
              </div>
              <button
                onClick={closePkgDlg}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  color: "var(--muted)",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 6,
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Package Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Essential Checkup"
                  value={pkgForm.name}
                  onChange={(e) =>
                    setPkgForm({ ...pkgForm, name: e.target.value })
                  }
                  style={{
                    padding: "10px 13px",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "inherit",
                    color: "var(--text)",
                    background: "#fff",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Tagline
                </label>
                <input
                  type="text"
                  placeholder="Brief description"
                  value={pkgForm.tagline}
                  onChange={(e) =>
                    setPkgForm({ ...pkgForm, tagline: e.target.value })
                  }
                  style={{
                    padding: "10px 13px",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "inherit",
                    color: "var(--text)",
                    background: "#fff",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Price *
                </label>
                <input
                  type="number"
                  placeholder="299"
                  min={0}
                  value={pkgForm.price}
                  onChange={(e) =>
                    setPkgForm({ ...pkgForm, price: e.target.value })
                  }
                  style={{
                    padding: "10px 13px",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "inherit",
                    color: "var(--text)",
                    background: "#fff",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Currency
                </label>
                <input
                  type="text"
                  value={pkgForm.currency}
                  onChange={(e) =>
                    setPkgForm({ ...pkgForm, currency: e.target.value })
                  }
                  style={{
                    padding: "10px 13px",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "inherit",
                    color: "var(--text)",
                    background: "#fff",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Icon (emoji)
                </label>
                <input
                  type="text"
                  placeholder="💊"
                  maxLength={4}
                  value={pkgForm.icon}
                  onChange={(e) =>
                    setPkgForm({ ...pkgForm, icon: e.target.value })
                  }
                  style={{
                    padding: "10px 13px",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "inherit",
                    color: "var(--text)",
                    background: "#fff",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Basic, Premium, Family"
                  value={pkgForm.category}
                  onChange={(e) =>
                    setPkgForm({ ...pkgForm, category: e.target.value })
                  }
                  style={{
                    padding: "10px 13px",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "inherit",
                    color: "var(--text)",
                    background: "#fff",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Display Order (0 = hidden)
                </label>
                <input
                  type="number"
                  value={pkgForm.order}
                  onChange={(e) =>
                    setPkgForm({ ...pkgForm, order: e.target.value })
                  }
                  style={{
                    padding: "10px 13px",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "inherit",
                    color: "var(--text)",
                    background: "#fff",
                  }}
                />
              </div>
              <div style={{ alignSelf: "end" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginTop: 4,
                  }}
                >
                  <input
                    type="checkbox"
                    id="pf-feat"
                    checked={pkgForm.featured}
                    onChange={(e) =>
                      setPkgForm({ ...pkgForm, featured: e.target.checked })
                    }
                    style={{
                      width: 18,
                      height: 18,
                      accentColor: "var(--blue-mid)",
                      cursor: "pointer",
                    }}
                  />
                  <label
                    htmlFor="pf-feat"
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--text-md)",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Mark as Most Popular
                  </label>
                </div>
              </div>

              {/* Test Selector */}
              <div style={{ gridColumn: "1 / -1" }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    margin: "16px 0 8px",
                  }}
                >
                  Select Tests from Library
                </div>
                <div
                  style={{
                    border: "1.5px solid var(--border)",
                    borderRadius: 10,
                    padding: 12,
                    background: "#fff",
                    maxHeight: 220,
                    overflowY: "auto",
                  }}
                >
                  {Object.entries(allTests).length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: 20,
                        color: "var(--muted)",
                        fontSize: "0.8rem",
                      }}
                    >
                      No tests in library yet. Go to Tests menu to add tests
                      first, or use custom tests below.
                    </div>
                  ) : (
                    Object.entries(allTests)
                      .sort((a, b) =>
                        (a[1].name || "").localeCompare(b[1].name || ""),
                      )
                      .map(([id, t]) => (
                        <div
                          key={id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "8px 10px",
                            borderRadius: 6,
                            cursor: "pointer",
                            transition: "background 0.16s",
                          }}
                          onClick={() => toggleTest(t.name || "")}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "var(--blue-light)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={editPkgTests.includes(t.name || "")}
                            onChange={() => toggleTest(t.name || "")}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              width: 16,
                              height: 16,
                              accentColor: "var(--blue-mid)",
                              cursor: "pointer",
                              flexShrink: 0,
                            }}
                          />
                          <label
                            style={{
                              cursor: "pointer",
                              fontSize: "0.84rem",
                              color: "var(--text-md)",
                              fontWeight: 600,
                              flex: 1,
                            }}
                          >
                            {esc(t.name)}{" "}
                            {t.category && (
                              <span
                                style={{
                                  color: "var(--muted)",
                                  fontWeight: 400,
                                  fontSize: "0.75rem",
                                }}
                              >
                                — {esc(t.category)}
                              </span>
                            )}
                          </label>
                        </div>
                      ))
                  )}
                </div>
                {(editPkgTests.length > 0 || editPkgCustomTests.length > 0) && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginTop: 10,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        fontSize: "0.75rem",
                        color: "var(--muted)",
                        marginBottom: 4,
                      }}
                    >
                      Selected tests:
                    </div>
                    {[...editPkgTests, ...editPkgCustomTests].map((t, i) => (
                      <div
                        key={i}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          background: "var(--blue-light)",
                          border: "1px solid var(--blue-pale)",
                          padding: "4px 10px",
                          borderRadius: 20,
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          color: "var(--blue-mid)",
                        }}
                      >
                        <span>{esc(t)}</span>
                        <button
                          onClick={() => removeSelectedTest(i)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--red)",
                            fontSize: "0.85rem",
                            padding: "0 2px",
                            lineHeight: 1,
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Tests */}
              <div style={{ gridColumn: "1 / -1" }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    margin: "16px 0 8px",
                  }}
                >
                  Or Add Custom Test
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input
                    type="text"
                    placeholder="e.g. Complete Blood Count (CBC)"
                    value={customTestInput}
                    onChange={(e) => setCustomTestInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomTest();
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: "9px 12px",
                      border: "1.5px solid var(--border)",
                      borderRadius: 8,
                      fontSize: "0.88rem",
                      outline: "none",
                      fontFamily: "inherit",
                      color: "var(--text)",
                      background: "#fff",
                    }}
                  />
                  <button
                    onClick={addCustomTest}
                    style={{
                      padding: "8px 16px",
                      background: "var(--blue-mid)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "background 0.16s",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    + Add
                  </button>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  {editPkgCustomTests.length === 0 ? (
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--muted)",
                        padding: "8px 0",
                      }}
                    >
                      No custom tests added yet.
                    </div>
                  ) : (
                    editPkgCustomTests.map((t, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          background: "var(--blue-light)",
                          border: "1px solid var(--blue-pale)",
                          padding: "7px 12px",
                          borderRadius: 8,
                          fontSize: "0.84rem",
                          color: "var(--text-md)",
                        }}
                      >
                        <span>{esc(t)}</span>
                        <button
                          onClick={() => removeCustomTest(i)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--red)",
                            fontSize: "0.95rem",
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

            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button
                onClick={savePkg}
                style={{
                  flex: 1,
                  padding: "11px 26px",
                  background: "var(--blue-mid)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.16s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                💾 Save Package
              </button>
              <button
                onClick={closePkgDlg}
                style={{
                  flex: 1,
                  padding: "11px 26px",
                  background: "var(--red)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.16s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── TEST DIALOG ─── */}
      {testDlgOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,.55)",
            zIndex: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeTestDlg();
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 30,
              width: 480,
              maxWidth: "95vw",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  fontFamily: "'Nunito',sans-serif",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                {testDlgTitle}
              </div>
              <button
                onClick={closeTestDlg}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  color: "var(--muted)",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 6,
                }}
              >
                ×
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                gap: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  gridColumn: "1 / -1",
                }}
              >
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Test Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Complete Blood Count (CBC)"
                  value={testForm.name}
                  onChange={(e) =>
                    setTestForm({ ...testForm, name: e.target.value })
                  }
                  style={{
                    padding: "10px 13px",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "inherit",
                    color: "var(--text)",
                    background: "#fff",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Blood, Urine, Imaging"
                  value={testForm.category}
                  onChange={(e) =>
                    setTestForm({ ...testForm, category: e.target.value })
                  }
                  style={{
                    padding: "10px 13px",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "inherit",
                    color: "var(--text)",
                    background: "#fff",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Code (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. CBC-001"
                  value={testForm.code}
                  onChange={(e) =>
                    setTestForm({ ...testForm, code: e.target.value })
                  }
                  style={{
                    padding: "10px 13px",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "inherit",
                    color: "var(--text)",
                    background: "#fff",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  gridColumn: "1 / -1",
                }}
              >
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description of the test..."
                  value={testForm.description}
                  onChange={(e) =>
                    setTestForm({ ...testForm, description: e.target.value })
                  }
                  style={{
                    padding: "10px 13px",
                    border: "1.5px solid var(--border)",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "inherit",
                    color: "var(--text)",
                    resize: "vertical",
                    background: "#fff",
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button
                onClick={saveTest}
                style={{
                  flex: 1,
                  padding: "11px 26px",
                  background: "var(--blue-mid)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.16s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                💾 Save Test
              </button>
              <button
                onClick={closeTestDlg}
                style={{
                  flex: 1,
                  padding: "11px 26px",
                  background: "var(--red)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.16s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── ORDER DIALOG ─── */}
      {orderDlgOpen &&
        (() => {
          const o = allOrders[orderDlgId];
          if (!o) return null;
          const status = o.status || "pending";
          const sc = statusColors[status] || statusColors.pending;
          const date = formatDate(o.createdAt);
          const user = o.userId ? allUsers[o.userId] : null;
          return (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(15,23,42,.55)",
                zIndex: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) closeOrderDlg();
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 30,
                  width: 680,
                  maxWidth: "95vw",
                  maxHeight: "90vh",
                  overflowY: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 22,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Nunito',sans-serif",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                    }}
                  >
                    Order #{esc(orderDlgId.slice(-8).toUpperCase())}
                  </div>
                  <button
                    onClick={closeOrderDlg}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "1.3rem",
                      cursor: "pointer",
                      color: "var(--muted)",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 6,
                    }}
                  >
                    ×
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      background: "var(--bg)",
                      padding: 14,
                      borderRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 4,
                      }}
                    >
                      Status
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: 10,
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        background: sc.bg,
                        color: sc.color,
                      }}
                    >
                      {sc.label}
                    </span>
                  </div>
                  <div
                    style={{
                      background: "var(--bg)",
                      padding: 14,
                      borderRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 4,
                      }}
                    >
                      Order Date
                    </div>
                    <div style={{ fontWeight: 700, color: "var(--text)" }}>
                      {date}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "var(--bg)",
                      padding: 14,
                      borderRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 4,
                      }}
                    >
                      Amount
                    </div>
                    <div
                      style={{
                        fontFamily: "'Nunito',sans-serif",
                        fontSize: "1.2rem",
                        fontWeight: 800,
                        color: "var(--blue)",
                      }}
                    >
                      {esc(o.currency || "AED")} {esc(String(o.amount || 0))}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "var(--bg)",
                      padding: 14,
                      borderRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 4,
                      }}
                    >
                      Payment Method
                    </div>
                    <div style={{ fontWeight: 700, color: "var(--text)" }}>
                      {esc(o.paymentMethod || "—")}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 10,
                    }}
                  >
                    Customer Information
                  </div>
                  <div
                    style={{
                      background: "var(--bg)",
                      padding: 14,
                      borderRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 10,
                      }}
                    >
                      <div>
                        <span
                          style={{ color: "var(--muted)", fontSize: "0.8rem" }}
                        >
                          Name:
                        </span>{" "}
                        <span style={{ fontWeight: 600 }}>
                          {esc(
                            o.customerName ||
                              o.userName ||
                              user?.name ||
                              user?.displayName ||
                              "Guest",
                          )}
                        </span>
                      </div>
                      <div>
                        <span
                          style={{ color: "var(--muted)", fontSize: "0.8rem" }}
                        >
                          Email:
                        </span>{" "}
                        <span style={{ fontWeight: 600 }}>
                          {esc(
                            o.customerEmail ||
                              o.userEmail ||
                              user?.email ||
                              "—",
                          )}
                        </span>
                      </div>
                      <div>
                        <span
                          style={{ color: "var(--muted)", fontSize: "0.8rem" }}
                        >
                          Phone:
                        </span>{" "}
                        <span style={{ fontWeight: 600 }}>
                          {esc(
                            o.customerPhone ||
                              o.userPhone ||
                              user?.phone ||
                              "—",
                          )}
                        </span>
                      </div>
                      <div>
                        <span
                          style={{ color: "var(--muted)", fontSize: "0.8rem" }}
                        >
                          User ID:
                        </span>{" "}
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: "0.75rem",
                          }}
                        >
                          {esc(o.userId || "—")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 10,
                    }}
                  >
                    Package Details
                  </div>
                  <div
                    style={{
                      background: "var(--bg)",
                      padding: 14,
                      borderRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        color: "var(--text)",
                        marginBottom: 4,
                      }}
                    >
                      {esc(o.packageName || "—")}
                    </div>
                    <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                      {esc(o.packageDescription || "")}
                    </div>
                    {o.tests && o.tests.length > 0 && (
                      <div style={{ marginTop: 10 }}>
                        <span
                          style={{ color: "var(--muted)", fontSize: "0.8rem" }}
                        >
                          Tests included:
                        </span>{" "}
                        <span style={{ fontWeight: 600 }}>
                          {o.tests.length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {o.notes && (
                  <div style={{ marginBottom: 20 }}>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 10,
                      }}
                    >
                      Notes
                    </div>
                    <div
                      style={{
                        background: "var(--bg)",
                        padding: 14,
                        borderRadius: 10,
                        color: "var(--text-md)",
                        fontSize: "0.85rem",
                      }}
                    >
                      {esc(o.notes)}
                    </div>
                  </div>
                )}

                {o.appointmentDate && (
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 10,
                      }}
                    >
                      Appointment
                    </div>
                    <div
                      style={{
                        background: "var(--bg)",
                        padding: 14,
                        borderRadius: 10,
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>
                        {new Date(o.appointmentDate).toLocaleString("en-GB")}
                      </span>
                    </div>
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: "1px solid var(--border)",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <label
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Update Status:
                  </label>
                  <select
                    value={orderDlgStatus}
                    onChange={(e) => setOrderDlgStatus(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      border: "1.5px solid var(--border)",
                      borderRadius: 8,
                      fontSize: "0.85rem",
                      fontFamily: "inherit",
                      color: "var(--text)",
                      background: "#fff",
                      cursor: "pointer",
                      flex: 1,
                      minWidth: 120,
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={updateOrderStatus}
                    style={{
                      padding: "8px 16px",
                      background: "var(--blue-mid)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "background 0.16s",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={closeOrderDlg}
                    style={{
                      padding: "8px 16px",
                      background: "var(--red)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "background 0.16s",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {/* ─── USER DIALOG ─── */}
      {userDlgOpen &&
        (() => {
          const u = allUsers[userDlgId];
          if (!u) return null;
          const joined = formatDateShort(u.createdAt);
          const initials = getInitials(
            u.name || u.displayName || u.email || "U",
          );
          const userOrders = Object.entries(allOrders)
            .filter(([oid, o]) => o.userId === userDlgId)
            .sort((a, b) => (b[1].createdAt || 0) - (a[1].createdAt || 0));
          const totalSpent = userOrders
            .filter(([oid, o]) => o.status !== "cancelled")
            .reduce((sum, [oid, o]) => sum + (Number(o.amount) || 0), 0);
          return (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(15,23,42,.55)",
                zIndex: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) closeUserDlg();
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 30,
                  width: 560,
                  maxWidth: "95vw",
                  maxHeight: "90vh",
                  overflowY: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 22,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Nunito',sans-serif",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                    }}
                  >
                    {esc(u.name || u.displayName || "User Details")}
                  </div>
                  <button
                    onClick={closeUserDlg}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "1.3rem",
                      cursor: "pointer",
                      color: "var(--muted)",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 6,
                    }}
                  >
                    ×
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "var(--blue-mid)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1.4rem",
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {initials}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Nunito',sans-serif",
                        fontSize: "1.2rem",
                        fontWeight: 800,
                        color: "var(--text)",
                      }}
                    >
                      {esc(u.name || u.displayName || "Unnamed")}
                    </div>
                    <div
                      style={{
                        color: "var(--muted)",
                        fontSize: "0.85rem",
                        marginTop: 2,
                      }}
                    >
                      {esc(u.email || "—")}
                    </div>
                    <div
                      style={{
                        color: "var(--muted)",
                        fontSize: "0.78rem",
                        marginTop: 2,
                      }}
                    >
                      Member since {joined}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 12,
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      background: "var(--bg)",
                      padding: 14,
                      borderRadius: 10,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Nunito',sans-serif",
                        fontSize: "1.4rem",
                        fontWeight: 800,
                        color: "var(--blue)",
                      }}
                    >
                      {userOrders.length}
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginTop: 2,
                      }}
                    >
                      Total Orders
                    </div>
                  </div>
                  <div
                    style={{
                      background: "var(--bg)",
                      padding: 14,
                      borderRadius: 10,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Nunito',sans-serif",
                        fontSize: "1.4rem",
                        fontWeight: 800,
                        color: "var(--green)",
                      }}
                    >
                      {
                        userOrders.filter(
                          ([oid, o]) => o.status === "completed",
                        ).length
                      }
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginTop: 2,
                      }}
                    >
                      Completed
                    </div>
                  </div>
                  <div
                    style={{
                      background: "var(--bg)",
                      padding: 14,
                      borderRadius: 10,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Nunito',sans-serif",
                        fontSize: "1.4rem",
                        fontWeight: 800,
                        color: "var(--orange)",
                      }}
                    >
                      AED {totalSpent.toLocaleString()}
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginTop: 2,
                      }}
                    >
                      Total Spent
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 10,
                    }}
                  >
                    Contact Information
                  </div>
                  <div
                    style={{
                      background: "var(--bg)",
                      padding: 14,
                      borderRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 10,
                        fontSize: "0.85rem",
                      }}
                    >
                      <div>
                        <span style={{ color: "var(--muted)" }}>Phone:</span>{" "}
                        <span style={{ fontWeight: 600 }}>
                          {esc(u.phone || "—")}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "var(--muted)" }}>Address:</span>{" "}
                        <span style={{ fontWeight: 600 }}>
                          {esc(u.address || "—")}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "var(--muted)" }}>City:</span>{" "}
                        <span style={{ fontWeight: 600 }}>
                          {esc(u.city || "—")}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "var(--muted)" }}>Country:</span>{" "}
                        <span style={{ fontWeight: 600 }}>
                          {esc(u.country || "—")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {userOrders.length > 0 ? (
                  <div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 10,
                      }}
                    >
                      Recent Orders
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {userOrders.slice(0, 5).map(([oid, o]) => {
                        const s = o.status || "pending";
                        const sc = statusColors[s] || statusColors.pending;
                        return (
                          <div
                            key={oid}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "10px 14px",
                              background: "var(--bg)",
                              borderRadius: 8,
                            }}
                          >
                            <div>
                              <span
                                style={{
                                  fontFamily: "monospace",
                                  fontSize: "0.78rem",
                                  fontWeight: 700,
                                  color: "var(--blue-mid)",
                                }}
                              >
                                #{esc(oid.slice(-8).toUpperCase())}
                              </span>
                              <span
                                style={{
                                  marginLeft: 8,
                                  fontSize: "0.85rem",
                                  fontWeight: 600,
                                }}
                              >
                                {esc(o.packageName || "—")}
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 700,
                                  color: "var(--blue)",
                                }}
                              >
                                {esc(o.currency || "AED")}{" "}
                                {esc(String(o.amount || 0))}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.7rem",
                                  fontWeight: 700,
                                  padding: "2px 8px",
                                  borderRadius: 10,
                                  background:
                                    s === "completed"
                                      ? "#D1FAE5"
                                      : s === "cancelled"
                                        ? "#FEE2E2"
                                        : "#FEF3C7",
                                  color: sc.color,
                                }}
                              >
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: 20,
                      color: "var(--muted)",
                      fontSize: "0.9rem",
                    }}
                  >
                    No orders yet.
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <button
                    onClick={closeUserDlg}
                    style={{
                      padding: "8px 16px",
                      background: "var(--red)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "background 0.16s",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {/* ─── CONFIRM DIALOG ─── */}
      {confirmOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,.6)",
            zIndex: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeConfirm();
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 28,
              width: 400,
              maxWidth: "90vw",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>
              {confirmIcon}
            </div>
            <div
              style={{
                fontFamily: "'Nunito',sans-serif",
                fontWeight: 800,
                fontSize: "1.1rem",
                marginBottom: 8,
              }}
            >
              {confirmTitle}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "var(--muted)",
                marginBottom: 20,
                lineHeight: 1.6,
              }}
            >
              {confirmMsg}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button
                onClick={closeConfirm}
                style={{
                  padding: "8px 16px",
                  background: "var(--red)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.16s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Cancel
              </button>
              <button
                onClick={onConfirmAction}
                style={{
                  padding: "8px 16px",
                  background: "var(--blue-mid)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.16s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── TOAST ─── */}
      <div
        style={{
          position: "fixed",
          bottom: 26,
          right: 26,
          zIndex: 9999,
          background: "#0F172A",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: 10,
          fontSize: "0.87rem",
          fontWeight: 600,
          opacity: showToast ? 1 : 0,
          transform: showToast ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.28s",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          gap: 9,
          boxShadow: "0 8px 24px rgba(0,0,0,.25)",
        }}
      >
        <span style={{ fontSize: "1rem" }}>{toastIcon}</span>
        <span>{toastMsg}</span>
      </div>
    </>
  );
}
