import { useState, useEffect } from "react";
import "./App.css";

const capabilities = [
  {
    id: "perceive",
    label: "Perceive",
    desc: "Reads context, files, messages, and data from its environment.",
    icon: "👁",
    detail: "Claude ingests text, images, PDFs, code, and structured data — understanding context before acting.",
  },
  {
    id: "reason",
    label: "Reason",
    desc: "Plans multi-step approaches to solve complex problems.",
    icon: "🧠",
    detail: "Rather than reacting instantly, Claude builds a plan — decomposing goals into logical, ordered steps.",
  },
  {
    id: "act",
    label: "Act",
    desc: "Calls tools, searches the web, writes and runs code.",
    icon: "⚡",
    detail: "Claude reaches out through tools — web search, file system, APIs, MCPs — to make real things happen.",
  },
  {
    id: "iterate",
    label: "Iterate",
    desc: "Reflects on results and adjusts its approach dynamically.",
    icon: "🔄",
    detail: "If something doesn't work, Claude notices, reconsiders, and tries a better approach — autonomously.",
  },
];

function CapabilityCard({ cap, index, active, onClick }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), index * 120 + 300);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      className={`cap-card ${mounted ? "visible" : ""} ${active ? "active" : ""}`}
      onClick={() => onClick(cap.id)}
      style={{ "--delay": `${index * 120 + 300}ms` }}
    >
      <div className="cap-icon">{cap.icon}</div>
      <div className="cap-body">
        <h3>{cap.label}</h3>
        <p>{active ? cap.detail : cap.desc}</p>
      </div>
      <div className="cap-arrow">{active ? "↑" : "→"}</div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const toggle = (id) => setActive((prev) => (prev === id ? null : id));

  return (
    <div className="shell">
      {/* Left panel */}
      <aside className="panel-left">
        <div className={`hero-badge ${headerVisible ? "visible" : ""}`}>
          <span className="badge-dot" />
          Claude AI
        </div>

        <div className={`hero-title ${headerVisible ? "visible" : ""}`}>
          <span className="title-line">What is</span>
          <span className="title-line accent">an Agent?</span>
        </div>

        <div className={`hero-sub ${headerVisible ? "visible" : ""}`}>
          An agent is Claude operating autonomously — not just answering a
          question, but pursuing a goal across many steps, decisions, and
          actions.
        </div>

        <div className={`hero-tag ${headerVisible ? "visible" : ""}`}>
          <span>Click a card to learn more</span>
          <span className="tag-arrow">↓</span>
        </div>

        <div className="orbit-wrap">
          <div className="orbit-ring ring1" />
          <div className="orbit-ring ring2" />
          <div className="orbit-core">
            <span>🤖</span>
          </div>
        </div>
      </aside>

      {/* Right panel */}
      <main className="panel-right">
        <div className="cards-grid">
          {capabilities.map((cap, i) => (
            <CapabilityCard
              key={cap.id}
              cap={cap}
              index={i}
              active={active === cap.id}
              onClick={toggle}
            />
          ))}
        </div>

        <footer className="slide-footer">
          <span>Brown Bag · Claude AI for Designers</span>
          <span className="footer-dot" />
          <span>Agents · Skills · Tools & MCPs</span>
        </footer>
      </main>
    </div>
  );
}
