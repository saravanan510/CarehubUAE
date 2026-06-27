'use client'; // optional – for App Router, but works in Pages Router too

import React, { useState, useEffect, useCallback, useMemo } from "react";
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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ─── Helpers ──────────────────────────────────────────────────────
const esc = (str) => {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

// ─── CSS (injected) ─────────────────────────────────────────────
const styles = `
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  :root {
    --blue: #1A4F8A;
    --blue-mid: #2563EB;
    --blue-light: #EFF6FF;
    --blue-pale: #DBEAFE;
    --accent: #0EA5E9;
    --green: #10B981;
    --orange: #F97316;
    --red: #EF4444;
    --white: #FFFFFF;
    --bg: #F1F5F9;
    --surface: #FFFFFF;
    --text: #0F172A;
    --text-md: #334155;
    --muted: #64748B;
    --border: #E2E8F0;
    --sidebar-w: 260px;
    --radius: 12px;
    --shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 4px 16px rgba(15, 23, 42, 0.1);
  }
  body {
    font-family: 'Nunito Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    display: flex;
    min-height: 100vh;
  }
  aside {
    width: var(--sidebar-w);
    background: #0F172A;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: sticky;
    top: 0;
    flex-shrink: 0;
    z-index: 100;
  }
  .sb-header {
    padding: 22px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .sb-brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sb-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: var(--blue-mid);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
  .sb-name {
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    color: #fff;
    font-size: 1rem;
  }
  .sb-role {
    font-size: .68rem;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 1px;
    letter-spacing: .04em;
    text-transform: uppercase;
  }
  .sb-nav {
    padding: 12px 0;
    flex: 1;
    overflow-y: auto;
  }
  .sb-group-lbl {
    font-size: .62rem;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.3);
    padding: 12px 20px 5px;
  }
  .sb-item {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 10px 20px;
    font-size: .875rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    border-left: 3px solid transparent;
    transition: all .16s;
  }
  .sb-item:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
  }
  .sb-item.active {
    color: #fff;
    background: rgba(37, 99, 235, 0.25);
    border-left-color: var(--blue-mid);
  }
  .sb-item .sb-ic {
    width: 20px;
    text-align: center;
    font-size: 1rem;
    flex-shrink: 0;
  }
  .sb-item .sb-badge {
    margin-left: auto;
    background: var(--blue-mid);
    color: #fff;
    font-size: .65rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 10px;
    min-width: 22px;
    text-align: center;
  }
  .sb-footer {
    padding: 16px 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sb-user-av {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--blue-mid);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: .8rem;
    color: #fff;
    flex-shrink: 0;
  }
  .sb-user-name {
    font-size: .8rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.7);
  }
  .sb-user-email {
    font-size: .68rem;
    color: rgba(255, 255, 255, 0.35);
  }
  .view-site-sb {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    margin: 0 12px 12px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.6);
    font-size: .78rem;
    font-weight: 600;
    text-decoration: none;
    transition: all .16s;
  }
  .view-site-sb:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
  }
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .topbar {
    background: #fff;
    border-bottom: 1px solid var(--border);
    padding: 0 32px;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: var(--shadow);
  }
  .tb-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .tb-title {
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 1.05rem;
    color: var(--text);
  }
  .tb-breadcrumb {
    font-size: .78rem;
    color: var(--muted);
    font-weight: 600;
  }
  .tb-sep {
    color: var(--border);
    margin: 0 4px;
  }
  .tb-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .status-dot {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: .78rem;
    font-weight: 700;
    color: var(--green);
  }
  .status-dot::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--green);
    animation: pulse2 2s ease infinite;
  }
  @keyframes pulse2 {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: .4;
    }
  }
  .tb-btn {
    padding: 8px 16px;
    border-radius: 8px;
    font-size: .8rem;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: all .16s;
    border: 1.5px solid var(--border);
    background: #fff;
    color: var(--text-md);
    text-decoration: none;
    display: inline-block;
  }
  .tb-btn:hover {
    background: var(--bg);
    border-color: var(--text-md);
  }
  .tb-btn.primary {
    background: var(--blue-mid);
    color: #fff;
    border-color: var(--blue-mid);
  }
  .tb-btn.primary:hover {
    background: var(--blue);
  }
  .content {
    padding: 28px 32px;
    flex: 1;
  }
  .panel {
    display: none;
  }
  .panel.active {
    display: block;
  }
  .dash-row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
  .dash-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: var(--shadow);
  }
  .dc-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    flex-shrink: 0;
  }
  .dc-icon.blue {
    background: var(--blue-light);
  }
  .dc-icon.green {
    background: #D1FAE5;
  }
  .dc-icon.orange {
    background: #FFF7ED;
  }
  .dc-icon.purple {
    background: #F5F3FF;
  }
  .dc-num {
    font-family: 'Nunito', sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--text);
    line-height: 1;
  }
  .dc-lbl {
    font-size: .75rem;
    color: var(--muted);
    margin-top: 3px;
    font-weight: 600;
  }
  .card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    margin-bottom: 20px;
    overflow: hidden;
    box-shadow: var(--shadow);
  }
  .card-head {
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    flex-wrap: wrap;
    gap: 10px;
  }
  .card-title {
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: .95rem;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .card-title .ch-ic {
    font-size: 1rem;
  }
  .card-body {
    padding: 24px;
  }
  .card-desc {
    font-size: .85rem;
    color: var(--muted);
    line-height: 1.7;
  }
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
  .fg-full {
    grid-column: 1 / -1;
  }
  .fg {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .fg label {
    font-size: .72rem;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: .06em;
  }
  .fg input,
  .fg textarea,
  .fg select {
    padding: 10px 13px;
    border: 1.5px solid var(--border);
    border-radius: 8px;
    font-size: .9rem;
    outline: none;
    transition: border .16s, box-shadow .16s;
    font-family: inherit;
    color: var(--text);
    resize: vertical;
    background: #fff;
  }
  .fg input:focus,
  .fg textarea:focus,
  .fg select:focus {
    border-color: var(--blue-mid);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  .save-btn {
    margin-top: 18px;
    padding: 11px 26px;
    background: var(--blue-mid);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: .88rem;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: background .16s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .save-btn:hover {
    background: var(--blue);
  }
  .save-btn.red {
    background: var(--red);
  }
  .save-btn.red:hover {
    background: #DC2626;
  }
  .save-btn.sm {
    padding: 8px 16px;
    font-size: .8rem;
    margin-top: 0;
  }
  .save-btn.outline {
    background: #fff;
    color: var(--blue-mid);
    border: 1.5px solid var(--blue-pale);
  }
  .save-btn.outline:hover {
    background: var(--blue-light);
  }
  .save-btn.green {
    background: var(--green);
  }
  .save-btn.green:hover {
    background: #059669;
  }
  .tbl-wrap {
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    text-align: left;
    font-size: .7rem;
    text-transform: uppercase;
    letter-spacing: .08em;
    color: var(--muted);
    font-weight: 700;
    padding: 10px 16px;
    border-bottom: 2px solid var(--border);
    background: var(--bg);
    white-space: nowrap;
  }
  td {
    padding: 13px 16px;
    border-bottom: 1px solid var(--border);
    font-size: .875rem;
    vertical-align: middle;
  }
  tr:last-child td {
    border-bottom: none;
  }
  tr:hover td {
    background: #FAFBFF;
  }
  .tbl-name {
    font-weight: 700;
    color: var(--text);
  }
  .tbl-sub {
    font-size: .75rem;
    color: var(--muted);
    margin-top: 2px;
  }
  .tbl-price {
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    color: var(--blue);
    font-size: .95rem;
  }
  .pop-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: var(--blue-pale);
    color: var(--blue-mid);
    font-size: .68rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 10px;
  }
  .status-pending {
    background: #FEF3C7;
    color: #D97706;
  }
  .status-confirmed {
    background: #DBEAFE;
    color: #2563EB;
  }
  .status-completed {
    background: #D1FAE5;
    color: #059669;
  }
  .status-cancelled {
    background: #FEE2E2;
    color: #DC2626;
  }
  .act-btn {
    padding: 5px 12px;
    border-radius: 6px;
    font-size: .76rem;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: all .16s;
    border: 1.5px solid var(--border);
    background: #fff;
  }
  .act-btn.edit {
    color: var(--blue-mid);
    border-color: var(--blue-pale);
  }
  .act-btn.edit:hover {
    background: var(--blue-mid);
    color: #fff;
    border-color: var(--blue-mid);
  }
  .act-btn.del {
    color: var(--red);
    border-color: #FEE2E2;
  }
  .act-btn.del:hover {
    background: var(--red);
    color: #fff;
    border-color: var(--red);
  }
  .act-btn.view {
    color: var(--green);
    border-color: #D1FAE5;
  }
  .act-btn.view:hover {
    background: var(--green);
    color: #fff;
    border-color: var(--green);
  }
  .acts {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .empty-row td {
    text-align: center;
    padding: 40px;
    color: var(--muted);
  }
  .test-cat-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #F0FDF4;
    color: var(--green);
    font-size: .68rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 10px;
  }
  .test-search-wrap {
    position: relative;
    margin-bottom: 16px;
  }
  .test-search-wrap input {
    width: 100%;
    padding: 10px 14px 10px 38px;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    font-size: .9rem;
    outline: none;
    transition: border .16s, box-shadow .16s;
    font-family: inherit;
    color: var(--text);
    background: #fff;
  }
  .test-search-wrap input:focus {
    border-color: var(--blue-mid);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  .test-search-wrap svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
  }
  .test-count {
    font-size: .8rem;
    color: var(--muted);
    font-weight: 600;
    margin-bottom: 12px;
  }
  .test-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: 10px;
    margin-bottom: 8px;
    background: #fff;
    transition: all .16s;
  }
  .test-row:hover {
    border-color: var(--blue-mid);
    background: var(--blue-light);
  }
  .test-row-info {
    flex: 1;
    min-width: 0;
  }
  .test-row-name {
    font-weight: 700;
    color: var(--text);
    font-size: .9rem;
  }
  .test-row-meta {
    font-size: .75rem;
    color: var(--muted);
    margin-top: 2px;
  }
  .test-row-acts {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
    margin-left: 12px;
  }
  .test-row .act-btn {
    padding: 4px 10px;
    font-size: .72rem;
  }
  .test-empty {
    text-align: center;
    padding: 40px;
    color: var(--muted);
    font-size: .9rem;
  }
  .test-selector {
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 12px;
    background: #fff;
    max-height: 220px;
    overflow-y: auto;
  }
  .test-selector-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: background .16s;
  }
  .test-selector-item:hover {
    background: var(--blue-light);
  }
  .test-selector-item input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: var(--blue-mid);
    cursor: pointer;
    flex-shrink: 0;
  }
  .test-selector-item label {
    cursor: pointer;
    font-size: .84rem;
    color: var(--text-md);
    font-weight: 600;
    flex: 1;
  }
  .test-selector-empty {
    text-align: center;
    padding: 20px;
    color: var(--muted);
    font-size: .8rem;
  }
  .selected-tests-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;
  }
  .selected-test-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: var(--blue-light);
    border: 1px solid var(--blue-pale);
    padding: 4px 10px;
    border-radius: 20px;
    font-size: .78rem;
    font-weight: 600;
    color: var(--blue-mid);
  }
  .selected-test-pill button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--red);
    font-size: .85rem;
    padding: 0 2px;
    line-height: 1;
  }
  .test-section-title {
    font-size: .8rem;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: .06em;
    margin: 16px 0 8px;
  }
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.55);
    z-index: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity .22s;
    padding: 20px;
  }
  .overlay.open {
    opacity: 1;
    pointer-events: all;
  }
  .dialog {
    background: #fff;
    border-radius: 16px;
    padding: 30px;
    width: 620px;
    max-width: 95vw;
    max-height: 90vh;
    overflow-y: auto;
    transform: translateY(14px);
    transition: transform .22s;
  }
  .overlay.open .dialog {
    transform: translateY(0);
  }
  .dlg-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
  }
  .dlg-title {
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 1.1rem;
  }
  .dlg-close {
    background: none;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
    color: var(--muted);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  }
  .dlg-close:hover {
    background: var(--bg);
    color: var(--text);
  }
  .tests-entry {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
  }
  .tests-entry input {
    flex: 1;
    padding: 9px 12px;
    border: 1.5px solid var(--border);
    border-radius: 8px;
    font-size: .88rem;
    outline: none;
    transition: border .16s;
    font-family: inherit;
  }
  .tests-entry input:focus {
    border-color: var(--blue-mid);
  }
  .tests-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .test-chip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--blue-light);
    border: 1px solid var(--blue-pale);
    padding: 7px 12px;
    border-radius: 8px;
    font-size: .84rem;
    color: var(--text-md);
  }
  .test-chip button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--red);
    font-size: .95rem;
    line-height: 1;
    padding: 0 2px;
  }
  .dlg-footer {
    display: flex;
    gap: 10px;
    margin-top: 22px;
  }
  .toggle-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 4px;
  }
  .toggle-row input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: var(--blue-mid);
    cursor: pointer;
  }
  .toggle-row label {
    font-size: .88rem;
    color: var(--text-md);
    font-weight: 600;
    cursor: pointer;
  }
  #toast {
    position: fixed;
    bottom: 26px;
    right: 26px;
    z-index: 9999;
    background: #0F172A;
    color: #fff;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: .87rem;
    font-weight: 600;
    opacity: 0;
    transform: translateY(8px);
    transition: all .28s;
    pointer-events: none;
    display: flex;
    align-items: center;
    gap: 9px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
  #toast.on {
    opacity: 1;
    transform: translateY(0);
  }
  .t-ic {
    font-size: 1rem;
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
    transition: transform .4s ease;
    border-radius: 0 2px 2px 0;
  }
  .saving-bar.on {
    transform: scaleX(1);
  }
  .confirm-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.6);
    z-index: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity .2s;
    padding: 20px;
  }
  .confirm-overlay.open {
    opacity: 1;
    pointer-events: all;
  }
  .confirm-box {
    background: #fff;
    border-radius: 14px;
    padding: 28px;
    width: 400px;
    max-width: 90vw;
    text-align: center;
    transform: scale(0.95);
    transition: transform .2s;
  }
  .confirm-overlay.open .confirm-box {
    transform: scale(1);
  }
  .confirm-box .c-icon {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }
  .confirm-box .c-title {
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 1.1rem;
    margin-bottom: 8px;
  }
  .confirm-box .c-msg {
    font-size: .85rem;
    color: var(--muted);
    margin-bottom: 20px;
    line-height: 1.6;
  }
  .confirm-box .c-btns {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  @media (max-width: 768px) {
    aside {
      width: 58px;
    }
    .sb-name,
    .sb-role,
    .sb-item span:not(.sb-ic),
    .sb-group-lbl,
    .sb-badge,
    .view-site-sb span,
    .sb-user-name,
    .sb-user-email {
      display: none;
    }
    .sb-item {
      justify-content: center;
      padding: 12px;
    }
    .sb-footer {
      justify-content: center;
    }
    .view-site-sb {
      justify-content: center;
      margin: 0 8px 8px;
      padding: 8px;
    }
    .content {
      padding: 20px 16px;
    }
    .topbar {
      padding: 0 16px;
    }
    .dialog {
      width: 95vw;
      padding: 20px;
    }
    .dash-row {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 480px) {
    .dash-row {
      grid-template-columns: 1fr;
    }
    .form-grid {
      grid-template-columns: 1fr;
    }
  }
`;

// ─── Main App ────────────────────────────────────────────────────
export default function App() {
  // ── Auth ──────────────────────────────────────────────────────
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("arogya_admin_auth");
    if (auth === "carehub_authenticated") {
      setIsLoggedIn(true);
    }
    setAuthChecked(true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("arogya_admin_auth", "carehub_authenticated");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("arogya_admin_auth");
    setIsLoggedIn(false);
  };

  // ── Global UI state ──────────────────────────────────────────
  const [toast, setToast] = useState({ message: "", icon: "✓", visible: false });
  const [saving, setSaving] = useState(false);
  const [activePanel, setActivePanel] = useState("dashboard");

  const showToast = (message, icon = "✓") => {
    setToast({ message, icon, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
  };

  const startSaving = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 900);
  };

  // ── Firebase data hooks ──────────────────────────────────────
  const [packages, setPackages] = useState({});
  const [tests, setTests] = useState({});
  const [content, setContent] = useState({});
  const [orders, setOrders] = useState({});
  const [users, setUsers] = useState({});

  useEffect(() => {
    const unsubs = [
      onValue(ref(db, "packages"), (snap) => setPackages(snap.val() || {})),
      onValue(ref(db, "tests"), (snap) => setTests(snap.val() || {})),
      onValue(ref(db, "content"), (snap) => setContent(snap.val() || {})),
      onValue(ref(db, "orders"), (snap) => setOrders(snap.val() || {})),
      onValue(ref(db, "users"), (snap) => setUsers(snap.val() || {})),
    ];
    return () => unsubs.forEach((unsub) => unsub());
  }, []);

  // ── Derived data ─────────────────────────────────────────────
  const pkgArr = useMemo(() => Object.entries(packages), [packages]);
  const testArr = useMemo(() => Object.entries(tests), [tests]);
  const ordersArr = useMemo(() => Object.entries(orders), [orders]);
  const usersArr = useMemo(() => Object.entries(users), [users]);

  // ── Package Dialog state ─────────────────────────────────────
  const [pkgDialogOpen, setPkgDialogOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState(null);
  const [pkgForm, setPkgForm] = useState({
    id: "",
    name: "",
    tagline: "",
    price: "",
    currency: "AED",
    icon: "",
    category: "",
    order: 1,
    featured: false,
    selectedTests: [],
    customTests: [],
  });
  const [customTestInput, setCustomTestInput] = useState("");

  // ── Test Dialog state ──────────────────────────────────────
  const [testDialogOpen, setTestDialogOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [testForm, setTestForm] = useState({
    id: "",
    name: "",
    category: "",
    code: "",
    description: "",
  });

  // ── Order Dialog state ──────────────────────────────────────
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState("pending");

  // ── User Dialog state ──────────────────────────────────────
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // ── Confirm Dialog state ────────────────────────────────────
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    title: "",
    message: "",
    icon: "⚠️",
    onConfirm: null,
  });

  // ── Filters ──────────────────────────────────────────────────
  const [orderFilters, setOrderFilters] = useState({
    status: "all",
    dateFrom: "",
    dateTo: "",
    search: "",
  });
  const [userSearch, setUserSearch] = useState("");
  const [testSearch, setTestSearch] = useState("");

  // ── Package Dialog handlers ─────────────────────────────────
  const openPkgDialog = (pkgData = null) => {
    if (pkgData) {
      setEditingPkg(pkgData);
      setPkgForm({
        id: pkgData.id || "",
        name: pkgData.name || "",
        tagline: pkgData.tagline || "",
        price: pkgData.price !== undefined ? pkgData.price : "",
        currency: pkgData.currency || "AED",
        icon: pkgData.icon || "",
        category: pkgData.category || "",
        order: pkgData.order !== undefined ? pkgData.order : 1,
        featured: !!pkgData.featured,
        selectedTests: pkgData.tests || [],
        customTests: pkgData.customTests || [],
      });
    } else {
      setEditingPkg(null);
      setPkgForm({
        id: "",
        name: "",
        tagline: "",
        price: "",
        currency: "AED",
        icon: "",
        category: "",
        order: 1,
        featured: false,
        selectedTests: [],
        customTests: [],
      });
    }
    setCustomTestInput("");
    setPkgDialogOpen(true);
  };

  const closePkgDialog = () => setPkgDialogOpen(false);

  const handlePkgChange = (field, value) => {
    setPkgForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTestSelection = (testName) => {
    setPkgForm((prev) => {
      const idx = prev.selectedTests.indexOf(testName);
      if (idx > -1) {
        return { ...prev, selectedTests: prev.selectedTests.filter((t) => t !== testName) };
      } else {
        return { ...prev, selectedTests: [...prev.selectedTests, testName] };
      }
    });
  };

  const addCustomTest = () => {
    const t = customTestInput.trim();
    if (!t) return;
    if (pkgForm.customTests.includes(t)) {
      showToast("This custom test is already added.", "⚠️");
      return;
    }
    setPkgForm((prev) => ({
      ...prev,
      customTests: [...prev.customTests, t],
    }));
    setCustomTestInput("");
  };

  const removeCustomTest = (index) => {
    setPkgForm((prev) => ({
      ...prev,
      customTests: prev.customTests.filter((_, i) => i !== index),
    }));
  };

  const removeSelectedTest = (index) => {
    setPkgForm((prev) => {
      if (index < prev.selectedTests.length) {
        return {
          ...prev,
          selectedTests: prev.selectedTests.filter((_, i) => i !== index),
        };
      } else {
        const ci = index - prev.selectedTests.length;
        return {
          ...prev,
          customTests: prev.customTests.filter((_, i) => i !== ci),
        };
      }
    });
  };

  const savePackage = async () => {
    const { name, price, tagline, currency, icon, category, order, featured, selectedTests, customTests } = pkgForm;
    if (!name.trim()) {
      showToast("Package name is required.", "⚠️");
      return;
    }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      showToast("Enter a valid price.", "⚠️");
      return;
    }
    const pkgData = {
      name: name.trim(),
      price: priceNum,
      tagline: tagline.trim(),
      currency: currency.trim() || "AED",
      icon: icon.trim() || "💊",
      category: category.trim(),
      order: parseInt(order) || 1,
      featured: featured,
      tests: selectedTests,
      customTests: customTests,
    };
    startSaving();
    try {
      if (editingPkg) {
        await update(ref(db, `packages/${editingPkg.id}`), pkgData);
      } else {
        const newRef = push(ref(db, "packages"));
        await set(newRef, pkgData);
      }
      showToast("Package saved! ✓");
      closePkgDialog();
    } catch (err) {
      showToast("Error: " + err.message, "❌");
    }
  };

  // ── Test Dialog handlers ────────────────────────────────────
  const openTestDialog = (testData = null) => {
    if (testData) {
      setEditingTest(testData);
      setTestForm({
        id: testData.id || "",
        name: testData.name || "",
        category: testData.category || "",
        code: testData.code || "",
        description: testData.description || "",
      });
    } else {
      setEditingTest(null);
      setTestForm({ id: "", name: "", category: "", code: "", description: "" });
    }
    setTestDialogOpen(true);
  };

  const closeTestDialog = () => setTestDialogOpen(false);

  const handleTestChange = (field, value) => {
    setTestForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveTest = async () => {
    const { name, category, code, description } = testForm;
    if (!name.trim()) {
      showToast("Test name is required.", "⚠️");
      return;
    }
    const testData = {
      name: name.trim(),
      category: category.trim(),
      code: code.trim(),
      description: description.trim(),
    };
    startSaving();
    try {
      if (editingTest) {
        await update(ref(db, `tests/${editingTest.id}`), testData);
      } else {
        const newRef = push(ref(db, "tests"));
        await set(newRef, testData);
      }
      showToast("Test saved! ✓");
      closeTestDialog();
    } catch (err) {
      showToast("Error: " + err.message, "❌");
    }
  };

  // ── Order Dialog ─────────────────────────────────────────────
  const openOrderDialog = (orderId) => {
    setSelectedOrderId(orderId);
    const order = orders[orderId];
    setOrderStatus(order?.status || "pending");
    setOrderDialogOpen(true);
  };

  const closeOrderDialog = () => setOrderDialogOpen(false);

  const updateOrderStatus = async () => {
    if (!selectedOrderId) return;
    startSaving();
    try {
      await update(ref(db, `orders/${selectedOrderId}`), {
        status: orderStatus,
        updatedAt: Date.now(),
      });
      showToast("Order status updated!");
      closeOrderDialog();
    } catch (err) {
      showToast("Error: " + err.message, "❌");
    }
  };

  // ── User Dialog ──────────────────────────────────────────────
  const openUserDialog = (userId) => {
    setSelectedUserId(userId);
    setUserDialogOpen(true);
  };

  const closeUserDialog = () => setUserDialogOpen(false);

  // ── Confirm Dialog ───────────────────────────────────────────
  const openConfirm = (title, message, icon, onConfirm) => {
    setConfirmConfig({ title, message, icon, onConfirm });
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setConfirmConfig({ title: "", message: "", icon: "⚠️", onConfirm: null });
  };

  const handleConfirm = () => {
    if (confirmConfig.onConfirm) confirmConfig.onConfirm();
    closeConfirm();
  };

  // ── Delete handlers ──────────────────────────────────────────
  const deletePackage = (id) => {
    openConfirm(
      "Delete Package?",
      `Are you sure you want to delete "${packages[id]?.name || "this package"}"? This cannot be undone.`,
      "🗑️",
      async () => {
        startSaving();
        try {
          await remove(ref(db, `packages/${id}`));
          showToast("Package deleted.", "🗑️");
        } catch (err) {
          showToast("Error: " + err.message, "❌");
        }
      }
    );
  };

  const deleteTest = (id) => {
    openConfirm(
      "Delete Test?",
      `Are you sure you want to delete "${tests[id]?.name || "this test"}"? This cannot be undone.`,
      "🗑️",
      async () => {
        startSaving();
        try {
          await remove(ref(db, `tests/${id}`));
          showToast("Test deleted.", "🗑️");
        } catch (err) {
          showToast("Error: " + err.message, "❌");
        }
      }
    );
  };

  const deleteOrder = (id) => {
    openConfirm(
      "Delete Order?",
      `Delete order #${id.slice(-8).toUpperCase()}? This cannot be undone.`,
      "🗑️",
      async () => {
        startSaving();
        try {
          await remove(ref(db, `orders/${id}`));
          showToast("Order deleted.", "🗑️");
        } catch (err) {
          showToast("Error: " + err.message, "❌");
        }
      }
    );
  };

  // ── Content updates ──────────────────────────────────────────
  const updateContent = async (updates, successMsg = "Saved!") => {
    startSaving();
    try {
      await update(ref(db, "content"), updates);
      showToast(successMsg);
    } catch (err) {
      showToast("Error: " + err.message, "❌");
    }
  };

  // ── Render helpers ───────────────────────────────────────────

  // ── Login Screen ─────────────────────────────────────────────
  if (!authChecked) return null;
  if (!isLoggedIn) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "linear-gradient(135deg,#0F172A 0%,#1A4F8A 100%)",
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: styles }} />
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
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: "1.4rem",
              color: "#0F172A",
              marginBottom: 4,
            }}
          >
            ArogyaPlus Admin
          </h1>
          <p style={{ color: "#64748B", fontSize: ".9rem", marginBottom: 28 }}>
            Sign in to access the admin panel
          </p>
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  // ── Main Panel ───────────────────────────────────────────────

  // ── Compute stats ────────────────────────────────────────────
  const visiblePkgs = Object.values(packages).filter((p) => p.order !== 0);
  const prices = visiblePkgs.map((p) => Number(p.price)).filter((v) => !isNaN(v) && v > 0);
  const categories = new Set(visiblePkgs.map((p) => p.category).filter(Boolean));
  const testCategories = new Set(Object.values(tests).map((t) => t.category).filter(Boolean));
  const ordersList = Object.values(orders);
  const usersList = Object.values(users);
  const ordersPending = ordersList.filter((o) => (o.status || "pending") === "pending").length;
  const ordersCompleted = ordersList.filter((o) => o.status === "completed").length;
  const revenue = ordersList
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const newUsers = usersList.filter((u) => u.createdAt && u.createdAt > sevenDaysAgo);
  const userIdsWithOrders = new Set();
  ordersList.forEach((o) => { if (o.userId) userIdsWithOrders.add(o.userId); });

  // ── Filtered orders ──────────────────────────────────────────
  let filteredOrders = ordersArr;
  const { status: orderStatusFilter, dateFrom, dateTo, search: orderSearch } = orderFilters;
  if (orderStatusFilter !== "all") {
    filteredOrders = filteredOrders.filter(([id, o]) => (o.status || "pending") === orderStatusFilter);
  }
  if (dateFrom) {
    const fromTime = new Date(dateFrom).getTime();
    filteredOrders = filteredOrders.filter(([id, o]) => (o.createdAt || 0) >= fromTime);
  }
  if (dateTo) {
    const toTime = new Date(dateTo).getTime() + 86400000;
    filteredOrders = filteredOrders.filter(([id, o]) => (o.createdAt || 0) <= toTime);
  }
  if (orderSearch) {
    const s = orderSearch.toLowerCase();
    filteredOrders = filteredOrders.filter(([id, o]) => {
      const orderId = id.toLowerCase();
      const customer = (o.customerName || o.userName || "").toLowerCase();
      const email = (o.customerEmail || o.userEmail || "").toLowerCase();
      const pkg = (o.packageName || "").toLowerCase();
      return orderId.includes(s) || customer.includes(s) || email.includes(s) || pkg.includes(s);
    });
  }
  filteredOrders.sort((a, b) => (b[1].createdAt || 0) - (a[1].createdAt || 0));

  // ── Filtered tests ───────────────────────────────────────────
  const filteredTests = testArr.filter(([id, t]) => {
    const s = testSearch.toLowerCase();
    const name = (t.name || "").toLowerCase();
    const cat = (t.category || "").toLowerCase();
    const code = (t.code || "").toLowerCase();
    return name.includes(s) || cat.includes(s) || code.includes(s);
  });

  // ── Filtered users ───────────────────────────────────────────
  const filteredUsers = usersArr.filter(([id, u]) => {
    const s = userSearch.toLowerCase();
    const name = (u.name || u.displayName || "").toLowerCase();
    const email = (u.email || "").toLowerCase();
    const phone = (u.phone || "").toLowerCase();
    return name.includes(s) || email.includes(s) || phone.includes(s);
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <aside>
          <div className="sb-header">
            <div className="sb-brand">
              <div className="sb-icon">❤️</div>
              <div>
                <div className="sb-name">ArogyaPlus</div>
                <div className="sb-role">Admin Panel</div>
              </div>
            </div>
          </div>
          <nav className="sb-nav">
            <div className="sb-group-lbl">Overview</div>
            <SidebarItem
              id="dashboard"
              icon="📊"
              label="Dashboard"
              active={activePanel === "dashboard"}
              onClick={() => setActivePanel("dashboard")}
            />
            <div className="sb-group-lbl">Content</div>
            <SidebarItem
              id="packages"
              icon="📦"
              label="Packages"
              badge={Object.keys(packages).length}
              active={activePanel === "packages"}
              onClick={() => setActivePanel("packages")}
            />
            <SidebarItem
              id="tests"
              icon="🧪"
              label="Tests"
              badge={Object.keys(tests).length}
              active={activePanel === "tests"}
              onClick={() => setActivePanel("tests")}
            />
            <SidebarItem
              id="hero"
              icon="🖼️"
              label="Hero Section"
              active={activePanel === "hero"}
              onClick={() => setActivePanel("hero")}
            />
            <SidebarItem
              id="trust"
              icon="🛡️"
              label="Trust Strip"
              active={activePanel === "trust"}
              onClick={() => setActivePanel("trust")}
            />
            <SidebarItem
              id="why"
              icon="⭐"
              label="Why Us"
              active={activePanel === "why"}
              onClick={() => setActivePanel("why")}
            />
            <SidebarItem
              id="cta"
              icon="📣"
              label="CTA Banner"
              active={activePanel === "cta"}
              onClick={() => setActivePanel("cta")}
            />
            <div className="sb-group-lbl">Settings</div>
            <SidebarItem
              id="settings"
              icon="⚙️"
              label="Site Settings"
              active={activePanel === "settings"}
              onClick={() => setActivePanel("settings")}
            />
            <div className="sb-group-lbl">Management</div>
            <SidebarItem
              id="orders"
              icon="📋"
              label="Orders"
              badge={Object.keys(orders).length}
              active={activePanel === "orders"}
              onClick={() => setActivePanel("orders")}
            />
            <SidebarItem
              id="users"
              icon="👥"
              label="Users"
              badge={Object.keys(users).length}
              active={activePanel === "users"}
              onClick={() => setActivePanel("users")}
            />
          </nav>
          <a href="/" target="_blank" className="view-site-sb">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>View Live Site</span>
          </a>
          <div className="sb-footer">
            <div className="sb-user-av">AD</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="sb-user-name">Administrator</div>
              <div className="sb-user-email">admin@arogyaplus.com</div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,.4)",
                fontSize: "1.1rem",
                padding: 4,
                borderRadius: 6,
                transition: "all .16s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,.1)"; }}
              onMouseOut={(e) => { e.currentTarget.style.color = "rgba(255,255,255,.4)"; e.currentTarget.style.background = "none"; }}
            >
              🚪
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main>
          <div className="topbar">
            <div className="tb-left">
              <div className="tb-title">
                {activePanel === "dashboard" && "Dashboard"}
                {activePanel === "packages" && "Packages"}
                {activePanel === "tests" && "Tests"}
                {activePanel === "hero" && "Hero Section"}
                {activePanel === "trust" && "Trust Strip"}
                {activePanel === "why" && "Why Us"}
                {activePanel === "cta" && "CTA Banner"}
                {activePanel === "settings" && "Site Settings"}
                {activePanel === "orders" && "Orders"}
                {activePanel === "users" && "Users"}
              </div>
            </div>
            <div className="tb-right">
              <div className="status-dot">Live</div>
              <a href="/" target="_blank" className="tb-btn">
                View Site ↗
              </a>
            </div>
          </div>
          <div className="content">
            {/* Dashboard */}
            {activePanel === "dashboard" && (
              <div className="panel active">
                <div className="dash-row">
                  <DashCard icon="📦" label="Total Packages" value={visiblePkgs.length} className="blue" />
                  <DashCard icon="⭐" label="Featured" value={visiblePkgs.filter((p) => p.featured).length} className="green" />
                  <DashCard icon="💰" label="Starting From (AED)" value={prices.length ? Math.min(...prices) : "—"} className="orange" />
                  <DashCard icon="🗂️" label="Categories" value={categories.size} className="purple" />
                </div>
                <div className="dash-row">
                  <DashCard icon="🧪" label="Total Tests" value={Object.keys(tests).length} className="blue" bg="#FEF3C7" />
                  <DashCard icon="📋" label="Test Categories" value={testCategories.size} className="green" bg="#ECFDF5" />
                  <DashCard icon="📋" label="Total Orders" value={ordersList.length} className="orange" bg="#FFF7ED" />
                  <DashCard icon="👥" label="Total Users" value={usersList.length} className="purple" bg="#F5F3FF" />
                </div>
                <div className="card">
                  <div className="card-head"><div className="card-title"><span className="ch-ic">🚀</span> Getting Started</div></div>
                  <div className="card-body">
                    <p className="card-desc">Welcome to the ArogyaPlus admin panel. All changes save instantly to Firebase and appear on the live site in real time.</p>
                    <br />
                    <p className="card-desc">
                      <strong>Packages</strong> — Add, edit and reorder health packages shown on the site.<br />
                      <strong>Tests</strong> — Manage your test library. Add tests here first, then assign them to packages.<br />
                      <strong>Hero Section</strong> — Edit the headline, subtitle, eyebrow text and statistics.<br />
                      <strong>Trust Strip</strong> — Update the four trust badges displayed below the hero.<br />
                      <strong>Why Us</strong> — Control the section heading and description text.<br />
                      <strong>CTA Banner</strong> — Edit the call-to-action headline and subtitle.<br />
                      <strong>Site Settings</strong> — Change the site name, tagline, footer, and section titles.<br />
                      <strong>Orders</strong> — View and manage customer bookings with status tracking.<br />
                      <strong>Users</strong> — View registered users and their order history.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Packages */}
            {activePanel === "packages" && (
              <div className="panel active">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                  <p style={{ fontSize: ".85rem", color: "var(--muted)" }}>Manage all health packages. Changes appear live on the site.</p>
                  <button className="save-btn sm" onClick={() => openPkgDialog()}>+ Add Package</button>
                </div>
                <div className="card" style={{ padding: 0 }}>
                  <div className="tbl-wrap">
                    <table>
                      <thead>
                        <tr><th>Package</th><th>Category</th><th>Price</th><th>Tests</th><th>Order</th><th>Status</th><th>Actions</th></tr>
                      </thead>
                      <tbody>
                        {pkgArr.length === 0 ? (
                          <tr className="empty-row"><td colSpan="7">No packages yet. Click "+ Add Package" to create one.</td></tr>
                        ) : (
                          pkgArr
                            .sort((a, b) => (a[1].order || 99) - (b[1].order || 99))
                            .map(([id, p]) => (
                              <tr key={id} style={p.order === 0 ? { opacity: 0.55, background: "#F8FAFC" } : {}}>
                                <td>
                                  <div className="tbl-name">{p.icon || ""} {esc(p.name)}</div>
                                  <div className="tbl-sub">{esc(p.tagline || "—")}</div>
                                </td>
                                <td>{esc(p.category || "—")}</td>
                                <td><span className="tbl-price">{esc(p.currency || "AED")} {esc(String(p.price))}</span></td>
                                <td>{(p.tests || []).length + (p.customTests || []).length}</td>
                                <td>{p.order !== undefined ? p.order : 1}</td>
                                <td>
                                  {p.order === 0 ? (
                                    <span style={{ color: "var(--red)", fontSize: ".78rem", fontWeight: 700 }}>🚫 Hidden</span>
                                  ) : p.featured ? (
                                    <span className="pop-chip">⭐ Popular</span>
                                  ) : (
                                    <span style={{ color: "var(--muted)", fontSize: ".78rem" }}>—</span>
                                  )}
                                </td>
                                <td>
                                  <div className="acts">
                                    <button className="act-btn edit" onClick={() => openPkgDialog({ id, ...p })}>Edit</button>
                                    <button className="act-btn del" onClick={() => deletePackage(id)}>Delete</button>
                                  </div>
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tests */}
            {activePanel === "tests" && (
              <div className="panel active">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                  <p style={{ fontSize: ".85rem", color: "var(--muted)" }}>Manage your test library. Add tests here, then assign them to packages.</p>
                  <button className="save-btn sm" onClick={() => openTestDialog()}>+ Add Test</button>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="test-search-wrap">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <input
                        type="text"
                        value={testSearch}
                        onChange={(e) => setTestSearch(e.target.value)}
                        placeholder="Search tests by name or category..."
                      />
                    </div>
                    <div className="test-count">{filteredTests.length} test{filteredTests.length !== 1 ? "s" : ""}</div>
                    <div id="tests-list-container">
                      {filteredTests.length === 0 ? (
                        <div className="test-empty">No tests match your search.</div>
                      ) : (
                        filteredTests.map(([id, t]) => (
                          <div className="test-row" key={id}>
                            <div className="test-row-info">
                              <div className="test-row-name">
                                {esc(t.name)} {t.code ? <span style={{ color: "var(--muted)", fontWeight: 400, fontSize: ".78rem" }}>({esc(t.code)})</span> : ""}
                              </div>
                              <div className="test-row-meta">
                                {t.category ? <span className="test-cat-chip">{esc(t.category)}</span> : ""} {esc(t.description || "")}
                              </div>
                            </div>
                            <div className="test-row-acts">
                              <button className="act-btn edit" onClick={() => openTestDialog({ id, ...t })}>Edit</button>
                              <button className="act-btn del" onClick={() => deleteTest(id)}>Delete</button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hero */}
            {activePanel === "hero" && (
              <div className="panel active">
                <div className="card">
                  <div className="card-head"><div className="card-title"><span className="ch-ic">🖼️</span> Hero Section</div></div>
                  <div className="card-body">
                    <div className="form-grid">
                      <div className="fg fg-full">
                        <label>Eyebrow Text (small label above title)</label>
                        <input
                          type="text"
                          value={content.heroEyebrow || ""}
                          onChange={(e) => updateContent({ heroEyebrow: e.target.value }, "")}
                          placeholder="Trusted by 50,000+ Families"
                        />
                      </div>
                      <div className="fg fg-full">
                        <label>Main Headline</label>
                        <input
                          type="text"
                          value={content.heroTitle || ""}
                          onChange={(e) => updateContent({ heroTitle: e.target.value }, "")}
                          placeholder="Comprehensive Health Packages for Every Family"
                        />
                      </div>
                      <div className="fg fg-full">
                        <label>Subtitle / Description</label>
                        <textarea
                          rows="3"
                          value={content.heroSubtitle || ""}
                          onChange={(e) => updateContent({ heroSubtitle: e.target.value }, "")}
                          placeholder="Supporting sentence…"
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
                      <div style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 14 }}>Hero Statistics (4 items)</div>
                      <div className="form-grid">
                        {(content.heroStats || [
                          { num: "50K+", label: "Patients Served" },
                          { num: "200+", label: "Tests Available" },
                          { num: "48hrs", label: "Report Delivery" },
                          { num: "98%", label: "Accuracy Rate" },
                        ]).map((stat, i) => (
                          <React.Fragment key={i}>
                            <div className="fg">
                              <label>Stat {i+1} — Number</label>
                              <input
                                type="text"
                                value={stat.num}
                                onChange={(e) => {
                                  const newStats = [...(content.heroStats || [])];
                                  newStats[i] = { ...newStats[i], num: e.target.value };
                                  updateContent({ heroStats: newStats }, "");
                                }}
                              />
                            </div>
                            <div className="fg">
                              <label>Stat {i+1} — Label</label>
                              <input
                                type="text"
                                value={stat.label}
                                onChange={(e) => {
                                  const newStats = [...(content.heroStats || [])];
                                  newStats[i] = { ...newStats[i], label: e.target.value };
                                  updateContent({ heroStats: newStats }, "");
                                }}
                              />
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <button className="save-btn" onClick={() => updateContent({}, "Hero section saved!")}>💾 Save Hero</button>
                  </div>
                </div>
              </div>
            )}

            {/* Trust */}
            {activePanel === "trust" && (
              <div className="panel active">
                <div className="card">
                  <div className="card-head"><div className="card-title"><span className="ch-ic">🛡️</span> Trust Strip Badges</div></div>
                  <div className="card-body">
                    <p className="card-desc" style={{ marginBottom: 20 }}>These four badges appear in the band directly below the hero section.</p>
                    <div className="form-grid">
                      {[1, 2, 3, 4].map((i) => (
                        <div className="fg" key={i}>
                          <label>Badge {i} Text</label>
                          <input
                            type="text"
                            value={content[`trust${i}`] || ""}
                            onChange={(e) => updateContent({ [`trust${i}`]: e.target.value }, "")}
                          />
                        </div>
                      ))}
                    </div>
                    <button className="save-btn" onClick={() => updateContent({}, "Trust strip saved!")}>💾 Save Trust Strip</button>
                  </div>
                </div>
              </div>
            )}

            {/* Why Us */}
            {activePanel === "why" && (
              <div className="panel active">
                <div className="card">
                  <div className="card-head"><div className="card-title"><span className="ch-ic">⭐</span> Why Us Section</div></div>
                  <div className="card-body">
                    <div className="form-grid">
                      <div className="fg"><label>Section Title</label><input type="text" value={content.whyTitle || ""} onChange={(e) => updateContent({ whyTitle: e.target.value }, "")} placeholder="Healthcare You Can Trust" /></div>
                      <div className="fg"><label>Section Description</label><input type="text" value={content.whyDesc || ""} onChange={(e) => updateContent({ whyDesc: e.target.value }, "")} placeholder="Supporting sentence…" /></div>
                    </div>
                    <button className="save-btn" onClick={() => updateContent({}, "Why Us saved!")}>💾 Save Why Us</button>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            {activePanel === "cta" && (
              <div className="panel active">
                <div className="card">
                  <div className="card-head"><div className="card-title"><span className="ch-ic">📣</span> CTA Banner</div></div>
                  <div className="card-body">
                    <div className="form-grid">
                      <div className="fg fg-full"><label>Headline</label><input type="text" value={content.ctaTitle || ""} onChange={(e) => updateContent({ ctaTitle: e.target.value }, "")} placeholder="Start Your Health Journey Today" /></div>
                      <div className="fg fg-full"><label>Subtitle</label><textarea rows="3" value={content.ctaSubtitle || ""} onChange={(e) => updateContent({ ctaSubtitle: e.target.value }, "")} placeholder="Supporting sentence…" /></div>
                    </div>
                    <button className="save-btn" onClick={() => updateContent({}, "CTA banner saved!")}>💾 Save CTA</button>
                  </div>
                </div>
              </div>
            )}

            {/* Settings */}
            {activePanel === "settings" && (
              <div className="panel active">
                <div className="card">
                  <div className="card-head"><div className="card-title"><span className="ch-ic">⚙️</span> Site Settings</div></div>
                  <div className="card-body">
                    <div className="form-grid">
                      <div className="fg"><label>Site Name</label><input type="text" value={content.siteName || ""} onChange={(e) => updateContent({ siteName: e.target.value }, "")} /></div>
                      <div className="fg"><label>Site Tagline (under logo)</label><input type="text" value={content.siteTagline || ""} onChange={(e) => updateContent({ siteTagline: e.target.value }, "")} /></div>
                      <div className="fg fg-full"><label>Footer Text</label><input type="text" value={content.footerText || ""} onChange={(e) => updateContent({ footerText: e.target.value }, "")} /></div>
                      <div className="fg fg-full"><label>Packages Section Title</label><input type="text" value={content.pkgSectionTitle || ""} onChange={(e) => updateContent({ pkgSectionTitle: e.target.value }, "")} /></div>
                      <div className="fg fg-full"><label>Packages Section Description</label><textarea rows="2" value={content.pkgSectionDesc || ""} onChange={(e) => updateContent({ pkgSectionDesc: e.target.value }, "")} /></div>
                      <div className="fg"><label>How It Works Title</label><input type="text" value={content.stepsTitle || ""} onChange={(e) => updateContent({ stepsTitle: e.target.value }, "")} /></div>
                      <div className="fg"><label>Testimonials Section Title</label><input type="text" value={content.testiTitle || ""} onChange={(e) => updateContent({ testiTitle: e.target.value }, "")} /></div>
                    </div>
                    <button className="save-btn" onClick={() => updateContent({}, "Settings saved!")}>💾 Save Settings</button>
                  </div>
                </div>
              </div>
            )}

            {/* Orders */}
            {activePanel === "orders" && (
              <div className="panel active">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                  <p style={{ fontSize: ".85rem", color: "var(--muted)" }}>View and manage customer orders. Click on an order to see full details.</p>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <select
                      value={orderFilters.status}
                      onChange={(e) => setOrderFilters((prev) => ({ ...prev, status: e.target.value }))}
                      style={{ padding: "8px 12px", border: "1.5px solid var(--border)", borderRadius: 8, fontSize: ".85rem", fontFamily: "inherit", color: "var(--text)", background: "#fff", cursor: "pointer" }}
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <input
                      type="date"
                      value={orderFilters.dateFrom}
                      onChange={(e) => setOrderFilters((prev) => ({ ...prev, dateFrom: e.target.value }))}
                      style={{ padding: "8px 12px", border: "1.5px solid var(--border)", borderRadius: 8, fontSize: ".85rem", fontFamily: "inherit", color: "var(--text)" }}
                    />
                    <input
                      type="date"
                      value={orderFilters.dateTo}
                      onChange={(e) => setOrderFilters((prev) => ({ ...prev, dateTo: e.target.value }))}
                      style={{ padding: "8px 12px", border: "1.5px solid var(--border)", borderRadius: 8, fontSize: ".85rem", fontFamily: "inherit", color: "var(--text)" }}
                    />
                    <input
                      type="text"
                      value={orderFilters.search}
                      onChange={(e) => setOrderFilters((prev) => ({ ...prev, search: e.target.value }))}
                      placeholder="Search orders..."
                      style={{ padding: "8px 12px", border: "1.5px solid var(--border)", borderRadius: 8, fontSize: ".85rem", fontFamily: "inherit", color: "var(--text)", width: 200 }}
                    />
                  </div>
                </div>
                <div className="dash-row" style={{ marginBottom: 20 }}>
                  <DashCard icon="📋" label="Total Orders" value={ordersList.length} className="blue" bg="#FEF3C7" />
                  <DashCard icon="⏳" label="Pending" value={ordersPending} className="orange" bg="#FFF7ED" />
                  <DashCard icon="✅" label="Completed" value={ordersCompleted} className="green" bg="#D1FAE5" />
                  <DashCard icon="💰" label="Revenue (AED)" value={revenue.toLocaleString()} className="purple" bg="#F5F3FF" />
                </div>
                <div className="card" style={{ padding: 0 }}>
                  <div className="tbl-wrap">
                    <table>
                      <thead><tr><th>Order ID</th><th>Customer</th><th>Package</th><th>Amount</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                      <tbody>
                        {filteredOrders.length === 0 ? (
                          <tr className="empty-row"><td colSpan="7">No orders found.</td></tr>
                        ) : (
                          filteredOrders.map(([id, o]) => {
                            const status = o.status || "pending";
                            const statusColors = {
                              pending: { bg: "#FEF3C7", color: "#D97706", label: "Pending" },
                              confirmed: { bg: "#DBEAFE", color: "#2563EB", label: "Confirmed" },
                              completed: { bg: "#D1FAE5", color: "#059669", label: "Completed" },
                              cancelled: { bg: "#FEE2E2", color: "#DC2626", label: "Cancelled" },
                            };
                            const sc = statusColors[status] || statusColors.pending;
                            const date = o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";
                            return (
                              <tr key={id} style={{ cursor: "pointer" }} onClick={() => openOrderDialog(id)}>
                                <td><span style={{ fontFamily: "monospace", fontSize: ".8rem", fontWeight: 700, color: "var(--blue-mid)" }}>#{esc(id.slice(-8).toUpperCase())}</span></td>
                                <td>
                                  <div className="tbl-name">{esc(o.customerName || o.userName || "Guest")}</div>
                                  <div className="tbl-sub">{esc(o.customerEmail || o.userEmail || "—")}</div>
                                </td>
                                <td>{esc(o.packageName || "—")}</td>
                                <td><span className="tbl-price">{esc(o.currency || "AED")} {esc(String(o.amount || 0))}</span></td>
                                <td style={{ fontSize: ".78rem", color: "var(--muted)" }}>{date}</td>
                                <td><span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 10, fontSize: ".68rem", fontWeight: 700, background: sc.bg, color: sc.color }}>{sc.label}</span></td>
                                <td>
                                  <div className="acts">
                                    <button className="act-btn edit" onClick={(e) => { e.stopPropagation(); openOrderDialog(id); }}>View</button>
                                    <button className="act-btn del" onClick={(e) => { e.stopPropagation(); deleteOrder(id); }}>Delete</button>
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
            )}

            {/* Users */}
            {activePanel === "users" && (
              <div className="panel active">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                  <p style={{ fontSize: ".85rem", color: "var(--muted)" }}>View registered users and their activity.</p>
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search users by name or email..."
                    style={{ padding: "8px 12px", border: "1.5px solid var(--border)", borderRadius: 8, fontSize: ".85rem", fontFamily: "inherit", color: "var(--text)", width: 260 }}
                  />
                </div>
                <div className="dash-row" style={{ marginBottom: 20 }}>
                  <DashCard icon="👥" label="Total Users" value={usersList.length} className="blue" bg="#EFF6FF" />
                  <DashCard icon="🆕" label="New (7 days)" value={newUsers.length} className="green" bg="#ECFDF5" />
                  <DashCard icon="🛒" label="With Orders" value={userIdsWithOrders.size} className="orange" bg="#FFF7ED" />
                </div>
                <div className="card" style={{ padding: 0 }}>
                  <div className="tbl-wrap">
                    <table>
                      <thead><tr><th>User</th><th>Email</th><th>Phone</th><th>Joined</th><th>Orders</th><th>Total Spent</th><th>Actions</th></tr></thead>
                      <tbody>
                        {filteredUsers.length === 0 ? (
                          <tr className="empty-row"><td colSpan="7">No users found.</td></tr>
                        ) : (
                          filteredUsers.map(([id, u]) => {
                            const initials = getInitials(u.name || u.displayName || u.email);
                            const joined = u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";
                            let orderCount = 0;
                            let totalSpent = 0;
                            ordersList.forEach((o) => {
                              if (o.userId === id) {
                                orderCount++;
                                if (o.status !== "cancelled") totalSpent += Number(o.amount) || 0;
                              }
                            });
                            return (
                              <tr key={id} style={{ cursor: "pointer" }} onClick={() => openUserDialog(id)}>
                                <td>
                                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--blue-mid)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: ".75rem", color: "#fff", flexShrink: 0 }}>{initials}</div>
                                    <div>
                                      <div className="tbl-name">{esc(u.name || u.displayName || "Unnamed")}</div>
                                      <div className="tbl-sub">{esc(u.uid || id.slice(0, 8))}</div>
                                    </div>
                                  </div>
                                </td>
                                <td>{esc(u.email || "—")}</td>
                                <td>{esc(u.phone || "—")}</td>
                                <td style={{ fontSize: ".78rem", color: "var(--muted)" }}>{joined}</td>
                                <td><span style={{ fontWeight: 700, color: "var(--blue-mid)" }}>{orderCount}</span></td>
                                <td><span className="tbl-price">AED {totalSpent.toLocaleString()}</span></td>
                                <td>
                                  <div className="acts">
                                    <button className="act-btn edit" onClick={(e) => { e.stopPropagation(); openUserDialog(id); }}>View</button>
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
            )}
          </div>
        </main>
      </div>

      {/* ─── Modals ─────────────────────────────────────────────────── */}

      {/* Package Dialog */}
      <PackageDialog
        open={pkgDialogOpen}
        onClose={closePkgDialog}
        form={pkgForm}
        setForm={handlePkgChange}
        tests={tests}
        customTestInput={customTestInput}
        setCustomTestInput={setCustomTestInput}
        addCustomTest={addCustomTest}
        removeCustomTest={removeCustomTest}
        toggleTestSelection={toggleTestSelection}
        removeSelectedTest={removeSelectedTest}
        onSave={savePackage}
        isEditing={!!editingPkg}
      />

      {/* Test Dialog */}
      <TestDialog
        open={testDialogOpen}
        onClose={closeTestDialog}
        form={testForm}
        setForm={handleTestChange}
        onSave={saveTest}
        isEditing={!!editingTest}
      />

      {/* Order Dialog */}
      <OrderDialog
        open={orderDialogOpen}
        onClose={closeOrderDialog}
        orderId={selectedOrderId}
        orders={orders}
        users={users}
        status={orderStatus}
        setStatus={setOrderStatus}
        onUpdateStatus={updateOrderStatus}
      />

      {/* User Dialog */}
      <UserDialog
        open={userDialogOpen}
        onClose={closeUserDialog}
        userId={selectedUserId}
        users={users}
        orders={orders}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        icon={confirmConfig.icon}
        onConfirm={handleConfirm}
        onCancel={closeConfirm}
      />

      {/* Toast */}
      <div id="toast" className={toast.visible ? "on" : ""}>
        <span className="t-ic">{toast.icon}</span>
        <span id="t-msg">{toast.message}</span>
      </div>

      {/* Saving Bar */}
      <div className={`saving-bar ${saving ? "on" : ""}`} id="saving-bar" />
    </>
  );
}

// ─── Subcomponents ──────────────────────────────────────────────

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "carehub" && password === "Carehub123") {
      setError(false);
      onLogin();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ textAlign: "left", marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: ".72rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5 }}>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #E2E8F0", borderRadius: 10, fontSize: ".95rem", outline: "none", fontFamily: "inherit", color: "#0F172A" }}
        />
      </div>
      <div style={{ textAlign: "left", marginBottom: 24 }}>
        <label style={{ display: "block", fontSize: ".72rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #E2E8F0", borderRadius: 10, fontSize: ".95rem", outline: "none", fontFamily: "inherit", color: "#0F172A" }}
        />
      </div>
      {error && <div style={{ color: "#EF4444", fontSize: ".85rem", fontWeight: 600, marginBottom: 16 }}>Invalid username or password.</div>}
      <button
        type="submit"
        style={{ width: "100%", padding: 13, border: "none", borderRadius: 10, background: "#2563EB", color: "#fff", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: ".95rem", cursor: "pointer", transition: "background .16s" }}
      >
        Sign In
      </button>
    </form>
  );
}

function SidebarItem({ id, icon, label, badge, active, onClick }) {
  return (
    <div className={`sb-item ${active ? "active" : ""}`} onClick={onClick}>
      <span className="sb-ic">{icon}</span>
      <span>{label}</span>
      {badge !== undefined && <span className="sb-badge">{badge}</span>}
    </div>
  );
}

function DashCard({ icon, label, value, className, bg }) {
  return (
    <div className="dash-card">
      <div className={`dc-icon ${className}`} style={bg ? { background: bg } : {}}>
        {icon}
      </div>
      <div>
        <div className="dc-num">{value}</div>
        <div className="dc-lbl">{label}</div>
      </div>
    </div>
  );
}

function PackageDialog({
  open,
  onClose,
  form,
  setForm,
  tests,
  customTestInput,
  setCustomTestInput,
  addCustomTest,
  removeCustomTest,
  toggleTestSelection,
  removeSelectedTest,
  onSave,
  isEditing,
}) {
  if (!open) return null;

  const allSelected = [...form.selectedTests, ...form.customTests];

  return (
    <div className="overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dialog">
        <div className="dlg-head">
          <div className="dlg-title">{isEditing ? "Edit Package" : "Add Package"}</div>
          <button className="dlg-close" onClick={onClose}>×</button>
        </div>
        <div className="form-grid">
          <div className="fg"><label>Package Name *</label><input type="text" value={form.name} onChange={(e) => setForm("name", e.target.value)} placeholder="e.g. Essential Checkup" /></div>
          <div className="fg"><label>Tagline</label><input type="text" value={form.tagline} onChange={(e) => setForm("tagline", e.target.value)} placeholder="Brief description" /></div>
          <div className="fg"><label>Price *</label><input type="number" value={form.price} onChange={(e) => setForm("price", e.target.value)} placeholder="299" min="0" /></div>
          <div className="fg"><label>Currency</label><input type="text" value={form.currency} onChange={(e) => setForm("currency", e.target.value)} placeholder="AED" /></div>
          <div className="fg"><label>Icon (emoji)</label><input type="text" value={form.icon} onChange={(e) => setForm("icon", e.target.value)} placeholder="💊" maxLength="4" /></div>
          <div className="fg"><label>Category</label><input type="text" value={form.category} onChange={(e) => setForm("category", e.target.value)} placeholder="e.g. Basic, Premium, Family" /></div>
          <div className="fg"><label>Display Order (0 = hidden)</label><input type="number" value={form.order} onChange={(e) => setForm("order", e.target.value)} min="0" /></div>
          <div className="fg" style={{ alignSelf: "end" }}>
            <div className="toggle-row">
              <input type="checkbox" id="pf-feat" checked={form.featured} onChange={(e) => setForm("featured", e.target.checked)} />
              <label htmlFor="pf-feat">Mark as Most Popular</label>
            </div>
          </div>
          <div className="fg fg-full">
            <div className="test-section-title">Select Tests from Library</div>
            <div className="test-selector">
              {Object.keys(tests).length === 0 ? (
                <div className="test-selector-empty">No tests in library yet. Go to Tests menu to add tests first, or use custom tests below.</div>
              ) : (
                Object.entries(tests)
                  .sort((a, b) => (a[1].name || "").localeCompare(b[1].name || ""))
                  .map(([id, t]) => (
                    <div className="test-selector-item" key={id} onClick={() => toggleTestSelection(t.name)}>
                      <input type="checkbox" checked={form.selectedTests.includes(t.name)} readOnly />
                      <label>{esc(t.name)} {t.category ? <span style={{ color: "var(--muted)", fontWeight: 400, fontSize: ".75rem" }}>— {esc(t.category)}</span> : ""}</label>
                    </div>
                  ))
              )}
            </div>
            <div className="selected-tests-preview">
              {allSelected.map((t, i) => (
                <div className="selected-test-pill" key={i}>
                  <span>{esc(t)}</span>
                  <button onClick={() => removeSelectedTest(i)}>✕</button>
                </div>
              ))}
            </div>
          </div>
          <div className="fg fg-full">
            <div className="test-section-title">Or Add Custom Test</div>
            <div className="tests-entry">
              <input type="text" value={customTestInput} onChange={(e) => setCustomTestInput(e.target.value)} placeholder="e.g. Complete Blood Count (CBC)" />
              <button className="save-btn sm" onClick={addCustomTest}>+ Add</button>
            </div>
            <div className="tests-list">
              {form.customTests.length === 0 ? (
                <div style={{ fontSize: ".8rem", color: "var(--muted)", padding: "8px 0" }}>No custom tests added yet.</div>
              ) : (
                form.customTests.map((t, i) => (
                  <div className="test-chip" key={i}>
                    <span>{esc(t)}</span>
                    <button onClick={() => removeCustomTest(i)}>✕</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="dlg-footer">
          <button className="save-btn" style={{ flex: 1 }} onClick={onSave}>💾 Save Package</button>
          <button className="save-btn red" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function TestDialog({ open, onClose, form, setForm, onSave, isEditing }) {
  if (!open) return null;

  return (
    <div className="overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dialog" style={{ width: 480 }}>
        <div className="dlg-head">
          <div className="dlg-title">{isEditing ? "Edit Test" : "Add Test"}</div>
          <button className="dlg-close" onClick={onClose}>×</button>
        </div>
        <div className="form-grid">
          <div className="fg fg-full"><label>Test Name *</label><input type="text" value={form.name} onChange={(e) => setForm("name", e.target.value)} placeholder="e.g. Complete Blood Count (CBC)" /></div>
          <div className="fg"><label>Category</label><input type="text" value={form.category} onChange={(e) => setForm("category", e.target.value)} placeholder="e.g. Blood, Urine, Imaging" /></div>
          <div className="fg"><label>Code (optional)</label><input type="text" value={form.code} onChange={(e) => setForm("code", e.target.value)} placeholder="e.g. CBC-001" /></div>
          <div className="fg fg-full"><label>Description</label><textarea rows="2" value={form.description} onChange={(e) => setForm("description", e.target.value)} placeholder="Brief description of the test…" /></div>
        </div>
        <div className="dlg-footer">
          <button className="save-btn" style={{ flex: 1 }} onClick={onSave}>💾 Save Test</button>
          <button className="save-btn red" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function OrderDialog({ open, onClose, orderId, orders, users, status, setStatus, onUpdateStatus }) {
  if (!open || !orderId) return null;
  const order = orders[orderId];
  if (!order) return null;

  const statusColors = {
    pending: { bg: "#FEF3C7", color: "#D97706", label: "Pending" },
    confirmed: { bg: "#DBEAFE", color: "#2563EB", label: "Confirmed" },
    completed: { bg: "#D1FAE5", color: "#059669", label: "Completed" },
    cancelled: { bg: "#FEE2E2", color: "#DC2626", label: "Cancelled" },
  };
  const sc = statusColors[status] || statusColors.pending;
  const date = order.createdAt ? new Date(order.createdAt).toLocaleString("en-GB") : "—";
  const user = order.userId ? users[order.userId] : null;

  return (
    <div className="overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dialog" style={{ width: 680 }}>
        <div className="dlg-head">
          <div className="dlg-title">Order #{esc(orderId.slice(-8).toUpperCase())}</div>
          <button className="dlg-close" onClick={onClose}>×</button>
        </div>
        <div className="dlg-body" style={{ fontSize: ".9rem", color: "var(--text-md)", lineHeight: 1.7 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div style={{ background: "var(--bg)", padding: 14, borderRadius: 10 }}>
              <div style={{ fontSize: ".7rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>Status</div>
              <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 10, fontSize: ".8rem", fontWeight: 700, background: sc.bg, color: sc.color }}>{sc.label}</span>
            </div>
            <div style={{ background: "var(--bg)", padding: 14, borderRadius: 10 }}>
              <div style={{ fontSize: ".7rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>Order Date</div>
              <div style={{ fontWeight: 700, color: "var(--text)" }}>{date}</div>
            </div>
            <div style={{ background: "var(--bg)", padding: 14, borderRadius: 10 }}>
              <div style={{ fontSize: ".7rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>Amount</div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "var(--blue)" }}>{esc(order.currency || "AED")} {esc(String(order.amount || 0))}</div>
            </div>
            <div style={{ background: "var(--bg)", padding: 14, borderRadius: 10 }}>
              <div style={{ fontSize: ".7rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>Payment Method</div>
              <div style={{ fontWeight: 700, color: "var(--text)" }}>{esc(order.paymentMethod || "—")}</div>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Customer Information</div>
            <div style={{ background: "var(--bg)", padding: 14, borderRadius: 10 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div><span style={{ color: "var(--muted)", fontSize: ".8rem" }}>Name:</span> <span style={{ fontWeight: 600 }}>{esc(order.customerName || order.userName || user?.name || user?.displayName || "Guest")}</span></div>
                <div><span style={{ color: "var(--muted)", fontSize: ".8rem" }}>Email:</span> <span style={{ fontWeight: 600 }}>{esc(order.customerEmail || order.userEmail || user?.email || "—")}</span></div>
                <div><span style={{ color: "var(--muted)", fontSize: ".8rem" }}>Phone:</span> <span style={{ fontWeight: 600 }}>{esc(order.customerPhone || order.userPhone || user?.phone || "—")}</span></div>
                <div><span style={{ color: "var(--muted)", fontSize: ".8rem" }}>User ID:</span> <span style={{ fontFamily: "monospace", fontSize: ".75rem" }}>{esc(order.userId || "—")}</span></div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Package Details</div>
            <div style={{ background: "var(--bg)", padding: 14, borderRadius: 10 }}>
              <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{esc(order.packageName || "—")}</div>
              <div style={{ color: "var(--muted)", fontSize: ".85rem" }}>{esc(order.packageDescription || "")}</div>
              {order.tests && order.tests.length ? <div style={{ marginTop: 10 }}><span style={{ color: "var(--muted)", fontSize: ".8rem" }}>Tests included:</span> <span style={{ fontWeight: 600 }}>{order.tests.length}</span></div> : ""}
            </div>
          </div>
          {order.notes && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Notes</div>
              <div style={{ background: "var(--bg)", padding: 14, borderRadius: 10, color: "var(--text-md)", fontSize: ".85rem" }}>{esc(order.notes)}</div>
            </div>
          )}
          {order.appointmentDate && (
            <div>
              <div style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Appointment</div>
              <div style={{ background: "var(--bg)", padding: 14, borderRadius: 10 }}><span style={{ fontWeight: 700 }}>{new Date(order.appointmentDate).toLocaleString("en-GB")}</span></div>
            </div>
          )}
        </div>
        <div className="dlg-footer" style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1, flexWrap: "wrap" }}>
            <label style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", whiteSpace: "nowrap" }}>Update Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: "8px 12px", border: "1.5px solid var(--border)", borderRadius: 8, fontSize: ".85rem", fontFamily: "inherit", color: "var(--text)", background: "#fff", cursor: "pointer", flex: 1, minWidth: 120 }}>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="save-btn sm" onClick={onUpdateStatus}>Update</button>
          </div>
          <button className="save-btn red sm" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function UserDialog({ open, onClose, userId, users, orders }) {
  if (!open || !userId) return null;
  const user = users[userId];
  if (!user) return null;

  const initials = getInitials(user.name || user.displayName || user.email);
  const joined = user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) : "—";

  const userOrders = orders
    ? Object.entries(orders).filter(([oid, o]) => o.userId === userId).sort((a, b) => (b[1].createdAt || 0) - (a[1].createdAt || 0))
    : [];
  const totalSpent = userOrders
    .filter(([oid, o]) => o.status !== "cancelled")
    .reduce((sum, [oid, o]) => sum + (Number(o.amount) || 0), 0);
  const completed = userOrders.filter(([oid, o]) => o.status === "completed").length;

  return (
    <div className="overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dialog" style={{ width: 560 }}>
        <div className="dlg-head">
          <div className="dlg-title">{esc(user.name || user.displayName || "User Details")}</div>
          <button className="dlg-close" onClick={onClose}>×</button>
        </div>
        <div className="dlg-body" style={{ fontSize: ".9rem", color: "var(--text-md)", lineHeight: 1.7 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--blue-mid)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.4rem", color: "#fff", flexShrink: 0 }}>{initials}</div>
            <div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "var(--text)" }}>{esc(user.name || user.displayName || "Unnamed")}</div>
              <div style={{ color: "var(--muted)", fontSize: ".85rem", marginTop: 2 }}>{esc(user.email || "—")}</div>
              <div style={{ color: "var(--muted)", fontSize: ".78rem", marginTop: 2 }}>Member since {joined}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            <div style={{ background: "var(--bg)", padding: 14, borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "var(--blue)" }}>{userOrders.length}</div>
              <div style={{ fontSize: ".7rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginTop: 2 }}>Total Orders</div>
            </div>
            <div style={{ background: "var(--bg)", padding: 14, borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "var(--green)" }}>{completed}</div>
              <div style={{ fontSize: ".7rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginTop: 2 }}>Completed</div>
            </div>
            <div style={{ background: "var(--bg)", padding: 14, borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "var(--orange)" }}>AED {totalSpent.toLocaleString()}</div>
              <div style={{ fontSize: ".7rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginTop: 2 }}>Total Spent</div>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Contact Information</div>
            <div style={{ background: "var(--bg)", padding: 14, borderRadius: 10 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: ".85rem" }}>
                <div><span style={{ color: "var(--muted)" }}>Phone:</span> <span style={{ fontWeight: 600 }}>{esc(user.phone || "—")}</span></div>
                <div><span style={{ color: "var(--muted)" }}>Address:</span> <span style={{ fontWeight: 600 }}>{esc(user.address || "—")}</span></div>
                <div><span style={{ color: "var(--muted)" }}>City:</span> <span style={{ fontWeight: 600 }}>{esc(user.city || "—")}</span></div>
                <div><span style={{ color: "var(--muted)" }}>Country:</span> <span style={{ fontWeight: 600 }}>{esc(user.country || "—")}</span></div>
              </div>
            </div>
          </div>
          {userOrders.length > 0 && (
            <div>
              <div style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Recent Orders</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {userOrders.slice(0, 5).map(([oid, o]) => {
                  const s = o.status || "pending";
                  const sc = { pending: "#D97706", confirmed: "#2563EB", completed: "#059669", cancelled: "#DC2626" }[s] || "#D97706";
                  return (
                    <div key={oid} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "var(--bg)", borderRadius: 8 }}>
                      <div>
                        <span style={{ fontFamily: "monospace", fontSize: ".78rem", fontWeight: 700, color: "var(--blue-mid)" }}>#{esc(oid.slice(-8).toUpperCase())}</span>
                        <span style={{ marginLeft: 8, fontSize: ".85rem", fontWeight: 600 }}>{esc(o.packageName || "—")}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontWeight: 700, color: "var(--blue)" }}>{esc(o.currency || "AED")} {esc(String(o.amount || 0))}</span>
                        <span style={{ fontSize: ".7rem", fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: s === "completed" ? "#D1FAE5" : (s === "cancelled" ? "#FEE2E2" : "#FEF3C7"), color: sc }}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {userOrders.length === 0 && <div style={{ textAlign: "center", padding: 20, color: "var(--muted)", fontSize: ".9rem" }}>No orders yet.</div>}
        </div>
        <div className="dlg-footer" style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border)", justifyContent: "flex-end" }}>
          <button className="save-btn red sm" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function ConfirmDialog({ open, title, message, icon, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="confirm-overlay open" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="confirm-box">
        <div className="c-icon">{icon || "⚠️"}</div>
        <div className="c-title">{title}</div>
        <div className="c-msg">{message}</div>
        <div className="c-btns">
          <button className="save-btn red sm" onClick={onCancel}>Cancel</button>
          <button className="save-btn sm" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}