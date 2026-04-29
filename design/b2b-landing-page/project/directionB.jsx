/* Direction B — Techno-Futurist
   Deep ink, neon-mint accent, mono + grotesque, wireframe energy, scanlines, terminal-y. */

const B_TWEAKS = /*EDITMODE-BEGIN*/{
  "palette": "midnight",
  "typePair": "mono",
  "mode": "dark",
  "heroCopy": "default"
}/*EDITMODE-END*/;

const B_PALETTES = {
  midnight: { bg: "#0A0B0D", bg2: "#111316", ink: "#E8ECEF", muted: "#6B7280", line: "rgba(232,236,239,0.10)", accent: "#6EFACC", surface: "#0F1114" },
  noir:     { bg: "#08080A", bg2: "#101012", ink: "#E8E6E2", muted: "#7A7770", line: "rgba(232,230,226,0.10)", accent: "#FF5C2B", surface: "#0E0E10" },
  iris:     { bg: "#0A0B14", bg2: "#10121E", ink: "#E8E8F0", muted: "#7779A0", line: "rgba(232,232,240,0.10)", accent: "#A78BFA", surface: "#0F1020" },
};

const B_TYPE = {
  mono:      { display: '"JetBrains Mono", ui-monospace, monospace', body: '"Inter Tight", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace', dw: 500 },
  grotesque: { display: '"Inter Tight", system-ui, sans-serif', body: '"Inter Tight", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace', dw: 600 },
  technical: { display: '"Space Grotesk", system-ui, sans-serif', body: '"Inter Tight", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace', dw: 500 },
};

const B_HERO_COPY = {
  default:  { kicker: "L&D · OS · v4.2", h1: ["The operating layer", "for learning organisations."], sub: "Programmes, skills, and outcomes — wired into the systems your business already runs on." },
  outcomes: { kicker: "OUTCOMES PROTOCOL", h1: ["Measure what", "learning actually does."], sub: "Stop reporting completions. Start reporting capability lift, business impact, and ROI." },
  team:     { kicker: "BUILT FOR L&D", h1: ["Infrastructure for", "people development."], sub: "The plumbing your L&D team has been hand-rolling in spreadsheets for a decade." },
};

function MagneticButtonB({ children, primary, palette, font }) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    setT({ x: x * 0.25, y: y * 0.4 });
  };
  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{
        transform: `translate(${t.x}px, ${t.y}px)`,
        transition: "transform .25s cubic-bezier(.2,.8,.2,1), background .15s, color .15s",
        background: primary ? palette.accent : "transparent",
        color: primary ? "#08080A" : palette.ink,
        border: `1px solid ${primary ? palette.accent : palette.line}`,
        padding: "13px 22px",
        borderRadius: 4,
        fontFamily: font,
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: ".02em",
        textTransform: "uppercase",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {children}
    </button>
  );
}

function HeroWireframeDevice({ palette }) {
  const wrap = React.useRef(null);
  const [tilt, setTilt] = React.useState({ rx: 8, ry: -18, rz: 0 });
  React.useEffect(() => {
    const onMove = (e) => {
      if (!wrap.current) return;
      const r = wrap.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      setTilt({ rx: 8 + dy * 12, ry: -18 + dx * 18, rz: dx * 2 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div ref={wrap} style={{ perspective: 2000, width: "100%", height: 600, display: "grid", placeItems: "center", position: "relative" }}>
      {/* grid floor */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          linear-gradient(${palette.line} 1px, transparent 1px) 0 0/40px 40px,
          linear-gradient(90deg, ${palette.line} 1px, transparent 1px) 0 0/40px 40px
        `,
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        opacity: .6,
      }}></div>
      {/* glow */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: palette.accent, opacity: .12, filter: "blur(80px)" }}></div>

      <div style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) rotateZ(${tilt.rz}deg)`,
        transition: "transform .5s cubic-bezier(.2,.8,.2,1)",
        width: 560, height: 380, position: "relative",
      }}>
        {/* main panel */}
        <div style={{
          position: "absolute", inset: 0,
          background: palette.surface,
          border: `1px solid ${palette.accent}`,
          boxShadow: `0 0 0 1px ${palette.accent}33, 0 40px 80px rgba(0,0,0,.6)`,
          padding: 18,
          fontFamily: '"JetBrains Mono", monospace',
          color: palette.ink,
          fontSize: 11,
          transform: "translateZ(0)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: palette.muted, fontSize: 10, marginBottom: 14, letterSpacing: ".08em" }}>
            <span>cohere://programmes/manager-essentials</span>
            <span style={{ color: palette.accent }}>● LIVE</span>
          </div>
          <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, marginBottom: 14, letterSpacing: "-.02em" }}>Manager Essentials · Q2</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
            {[["LEARNERS", "124"], ["ACTIVE", "98"], ["LIFT", "+34%"], ["DAYS", "23"]].map(([k, v]) => (
              <div key={k} style={{ border: `1px solid ${palette.line}`, padding: "8px 10px" }}>
                <div style={{ color: palette.muted, fontSize: 9, letterSpacing: ".1em" }}>{k}</div>
                <div style={{ fontSize: 18, color: k === "LIFT" ? palette.accent : palette.ink, fontFamily: '"Space Grotesk", sans-serif' }}>{v}</div>
              </div>
            ))}
          </div>
          {/* chart */}
          <div style={{ height: 100, border: `1px solid ${palette.line}`, padding: 10, position: "relative" }}>
            <svg viewBox="0 0 400 80" style={{ width: "100%", height: "100%" }}>
              {[20, 40, 60].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke={palette.line} />)}
              <path d="M0,60 L40,55 L80,58 L120,42 L160,46 L200,30 L240,34 L280,18 L320,22 L360,10 L400,14"
                fill="none" stroke={palette.accent} strokeWidth="1.5" />
              {[[0,60],[80,58],[160,46],[240,34],[320,22],[400,14]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="2.5" fill={palette.bg} stroke={palette.accent} strokeWidth="1" />
              ))}
            </svg>
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 6, color: palette.muted, fontSize: 10 }}>
            <span>$ ENGAGEMENT</span>
            <span style={{ color: palette.accent }}>+18.4%</span>
            <span style={{ marginLeft: "auto" }}>30D ▲</span>
          </div>
        </div>

        {/* floating side modules */}
        <div style={{
          position: "absolute", left: -180, top: 40, width: 220,
          background: palette.surface, border: `1px solid ${palette.line}`, padding: 14,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: palette.ink,
          transform: "translateZ(140px) rotateY(8deg)",
          boxShadow: "0 30px 60px rgba(0,0,0,.5)",
        }}>
          <div style={{ color: palette.muted, fontSize: 9, marginBottom: 8, letterSpacing: ".1em" }}>// SKILL_GRAPH</div>
          {[["coaching", 78], ["delegation", 41], ["feedback", 84]].map(([s, v]) => (
            <div key={s} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>{s}</span><span style={{ color: palette.accent }}>{v}</span></div>
              <div style={{ height: 2, background: palette.line, marginTop: 3 }}>
                <div style={{ width: `${v}%`, height: "100%", background: palette.accent }}></div>
              </div>
            </div>
          ))}
        </div>
        <div style={{
          position: "absolute", right: -160, bottom: 0, width: 200,
          background: palette.surface, border: `1px solid ${palette.line}`, padding: 14,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: palette.ink,
          transform: "translateZ(180px) rotateY(-10deg)",
          boxShadow: "0 30px 60px rgba(0,0,0,.5)",
        }}>
          <div style={{ color: palette.accent, fontSize: 9, marginBottom: 6, letterSpacing: ".12em" }}>● COHORT_07 SYNCED</div>
          <div style={{ fontSize: 11, marginBottom: 4 }}>14 learners enrolled</div>
          <div style={{ color: palette.muted, fontSize: 9 }}>Auto-provisioned from Workday · 2s ago</div>
        </div>
      </div>
    </div>
  );
}

function CountUpB({ to, suffix, duration = 1600 }) {
  const [v, setV] = React.useState(0);
  const ref = React.useRef(null);
  const seen = React.useRef(false);
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !seen.current) {
          seen.current = true;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setV(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  const display = to % 1 === 0 ? Math.round(v).toLocaleString() : v.toFixed(1);
  return <span ref={ref}>{display}{suffix}</span>;
}

function RevealB({ children, delay = 0 }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setShown(true); });
    }, { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      transform: shown ? "translateY(0)" : "translateY(24px)",
      opacity: shown ? 1 : 0,
      transition: `transform .9s cubic-bezier(.2,.8,.2,1) ${delay}ms, opacity .9s ease ${delay}ms`,
    }}>{children}</div>
  );
}

function DirectionB({ tweaks }) {
  const palette = B_PALETTES[tweaks.palette] || B_PALETTES.midnight;
  const type = B_TYPE[tweaks.typePair] || B_TYPE.mono;
  const copy = B_HERO_COPY[tweaks.heroCopy] || B_HERO_COPY.default;
  const light = tweaks.mode === "light";
  const P = light
    ? { ...palette, bg: "#F4F4F1", bg2: "#EAEAE5", ink: "#0A0B0D", muted: "#6B7280", line: "rgba(10,11,13,0.10)", surface: "#FFFFFF" }
    : palette;

  const [tab, setTab] = React.useState(0);
  const tabs = ["00 / Programmes", "01 / Learner", "02 / Skills", "03 / Insights"];

  return (
    <div style={{ background: P.bg, color: P.ink, fontFamily: type.body, minHeight: "100%", letterSpacing: "-0.005em", position: "relative", overflow: "hidden" }}>
      {/* scanline grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(${P.line} 1px, transparent 1px)`,
        backgroundSize: "100% 4px",
        opacity: .4, mixBlendMode: light ? "multiply" : "screen",
      }}></div>

      {/* Nav */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 48px", borderBottom: `1px solid ${P.line}`, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ fontFamily: type.mono, fontSize: 14, letterSpacing: ".1em", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, background: P.accent, display: "inline-block" }}></span>
            COHERE/OS
          </div>
          <div style={{ display: "flex", gap: 24, fontSize: 12, color: P.muted, fontFamily: type.mono, textTransform: "uppercase", letterSpacing: ".08em" }}>
            {["Platform", "Protocols", "Customers", "Pricing", "Docs"].map((x) => (
              <a key={x} href="#" style={{ color: "inherit", textDecoration: "none" }}>{x}</a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="#" style={{ color: P.ink, fontSize: 12, textDecoration: "none", fontFamily: type.mono, textTransform: "uppercase", letterSpacing: ".08em" }}>Sign in</a>
          <MagneticButtonB primary palette={P} font={type.mono}>Request access →</MagneticButtonB>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "60px 48px 60px", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 32, alignItems: "center", minHeight: 760, position: "relative", zIndex: 1 }}>
        <div>
          <div style={{ fontFamily: type.mono, fontSize: 11, color: P.accent, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 36, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: P.accent }}></span>
            {copy.kicker}
          </div>
          <h1 style={{
            fontFamily: type.display === '"JetBrains Mono", ui-monospace, monospace' ? '"Space Grotesk", sans-serif' : type.display,
            fontWeight: type.dw,
            fontSize: "clamp(48px, 5.5vw, 88px)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            margin: 0,
          }}>
            {copy.h1.map((line, i) => (
              <div key={i} style={{ color: i === copy.h1.length - 1 ? P.ink : P.ink }}>{line}</div>
            ))}
          </h1>
          <p style={{ fontSize: 17, color: P.muted, maxWidth: 480, marginTop: 28, lineHeight: 1.55 }}>{copy.sub}</p>
          <div style={{ display: "flex", gap: 10, marginTop: 36 }}>
            <MagneticButtonB primary palette={P} font={type.mono}>Request access →</MagneticButtonB>
            <MagneticButtonB palette={P} font={type.mono}>Read the docs</MagneticButtonB>
          </div>
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 24, fontSize: 11, color: P.muted, fontFamily: type.mono, letterSpacing: ".06em", textTransform: "uppercase" }}>
            <div><div style={{ color: P.ink, fontSize: 18, marginBottom: 4, fontFamily: type.display }}>SOC 2</div>Type II</div>
            <div><div style={{ color: P.ink, fontSize: 18, marginBottom: 4, fontFamily: type.display }}>SCIM</div>+ SSO</div>
            <div><div style={{ color: P.ink, fontSize: 18, marginBottom: 4, fontFamily: type.display }}>xAPI</div>+ SCORM</div>
          </div>
        </div>
        <HeroWireframeDevice palette={P} />
      </section>

      {/* Logo bar */}
      <section style={{ padding: "32px 48px", borderTop: `1px solid ${P.line}`, borderBottom: `1px solid ${P.line}`, position: "relative", zIndex: 1, background: P.bg }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ fontFamily: type.mono, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: P.muted }}>
            // DEPLOYED AT
          </div>
          {["NORTHWIND", "HALCYON.IO", "MERIDIAN", "PARALLAX", "LUMEN/CO", "FIELDNOTE"].map((l) => (
            <div key={l} style={{ fontFamily: type.mono, fontSize: 14, letterSpacing: ".1em", opacity: .7 }}>{l}</div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section style={{ padding: "120px 48px", position: "relative", zIndex: 1 }}>
        <RevealB>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 64, alignItems: "end" }}>
            <div>
              <div style={{ fontFamily: type.mono, fontSize: 11, color: P.muted, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 20 }}>§02 / PROTOCOLS</div>
              <h2 style={{ fontFamily: type.display === '"JetBrains Mono", ui-monospace, monospace' ? '"Space Grotesk", sans-serif' : type.display, fontSize: 64, lineHeight: 0.98, letterSpacing: "-0.035em", margin: 0, fontWeight: type.dw }}>
                Six modules.<br />One spec.
              </h2>
            </div>
            <div style={{ color: P.muted, fontSize: 15, lineHeight: 1.6, maxWidth: 440 }}>
              Cohere is composed, not bundled. Each module ships its own API, schema, and webhook surface — pick the ones you need today and grow into the rest.
            </div>
          </div>
        </RevealB>
        <div style={{ border: `1px solid ${P.line}`, display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            { code: "PROG", t: "Programmes", d: "Compose multi-module learning programmes from primitives. Cohorts, milestones, approvals." },
            { code: "LEAR", t: "Learner OS", d: "A daily home for learners. Streaks, nudges, async + live, mobile-first." },
            { code: "SKIL", t: "Skill graph", d: "Roles, levels, calibrations. The capability map your org has been missing." },
            { code: "EVNT", t: "Live sessions", d: "Schedule, run, and capture live cohort sessions. Auto-transcript, highlights, async catchup." },
            { code: "RPRT", t: "Reporting", d: "Dashboards your CFO will read. Per-cohort, per-team, per-skill. CSV + API export." },
            { code: "SYNC", t: "Integrations", d: "HRIS, SSO, calendar, Slack, Teams, Workday. Webhooks for the rest." },
          ].map((f, i) => (
            <RevealB key={f.code} delay={i * 60}>
              <div style={{
                padding: 28, minHeight: 240,
                borderRight: i % 3 !== 2 ? `1px solid ${P.line}` : "none",
                borderBottom: i < 3 ? `1px solid ${P.line}` : "none",
                position: "relative",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
                  <span style={{ fontFamily: type.mono, fontSize: 10, color: P.accent, letterSpacing: ".15em" }}>// {f.code}</span>
                  <span style={{ fontFamily: type.mono, fontSize: 10, color: P.muted }}>0{i + 1}</span>
                </div>
                <div style={{ fontFamily: type.display === '"JetBrains Mono", ui-monospace, monospace' ? '"Space Grotesk", sans-serif' : type.display, fontSize: 24, marginBottom: 10, letterSpacing: "-0.02em", fontWeight: type.dw }}>{f.t}</div>
                <div style={{ color: P.muted, fontSize: 14, lineHeight: 1.55 }}>{f.d}</div>
              </div>
            </RevealB>
          ))}
        </div>
      </section>

      {/* Product showcase */}
      <section style={{ padding: "60px 48px 120px", position: "relative", zIndex: 1 }}>
        <RevealB>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: type.mono, fontSize: 11, color: P.muted, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 16 }}>§03 / SURFACES</div>
            <h2 style={{ fontFamily: type.display === '"JetBrains Mono", ui-monospace, monospace' ? '"Space Grotesk", sans-serif' : type.display, fontSize: 56, lineHeight: 0.98, letterSpacing: "-0.035em", margin: 0, fontWeight: type.dw }}>Inside the system.</h2>
          </div>
        </RevealB>
        <div style={{ display: "flex", gap: 0, marginBottom: 0, borderBottom: `1px solid ${P.line}` }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              padding: "16px 24px", fontFamily: type.mono, fontSize: 12, cursor: "pointer", letterSpacing: ".1em", textTransform: "uppercase",
              background: "transparent", color: tab === i ? P.accent : P.muted,
              border: "none", borderBottom: `2px solid ${tab === i ? P.accent : "transparent"}`,
              transition: "all .2s", marginBottom: -1,
            }}>{t}</button>
          ))}
        </div>
        <RevealB>
          <div style={{ aspectRatio: "16/9", background: P.surface, border: `1px solid ${P.line}`, borderTop: "none", padding: 24, display: "grid", gridTemplateColumns: "260px 1fr", gap: 24, position: "relative" }}>
            <div>
              <div style={{ fontFamily: type.mono, fontSize: 10, color: P.accent, letterSpacing: ".15em", marginBottom: 8 }}>// SURFACE_{String(tab).padStart(2, "0")}</div>
              <div style={{ fontFamily: type.display === '"JetBrains Mono", ui-monospace, monospace' ? '"Space Grotesk", sans-serif' : type.display, fontSize: 22, marginBottom: 12, fontWeight: type.dw, letterSpacing: "-.02em" }}>{tabs[tab].split("/ ")[1]}</div>
              <div style={{ color: P.muted, fontSize: 13, lineHeight: 1.55, marginBottom: 16 }}>
                {[
                  "Compose programmes from cohorts, milestones, and content blocks. Versioned and approvable.",
                  "A learner home built around time and intent, not catalogue browsing.",
                  "Your org's capability mapped against roles. Calibrated by managers, audited by L&D.",
                  "Engagement and lift, broken out by team, cohort, and skill — exportable everywhere.",
                ][tab]}
              </div>
              <div style={{ fontFamily: type.mono, fontSize: 11, color: P.ink, borderTop: `1px solid ${P.line}`, paddingTop: 16 }}>
                {[
                  ["GET /programmes", "POST /cohorts", "PUT /milestones"],
                  ["GET /learner/home", "POST /events/nudge", "GET /streaks"],
                  ["GET /skills/:role", "POST /calibrations", "GET /gaps"],
                  ["GET /reports/:cohort", "POST /exports/csv", "GET /lift"],
                ][tab].map((x) => (
                  <div key={x} style={{ padding: "6px 0", color: P.muted }}>{x}</div>
                ))}
              </div>
            </div>
            <div style={{ background: P.bg, border: `1px solid ${P.line}`, padding: 16, overflow: "hidden" }}>
              <PanelB tab={tab} P={P} type={type} />
            </div>
          </div>
        </RevealB>
      </section>

      {/* Stats */}
      <section style={{ padding: "100px 48px", borderTop: `1px solid ${P.line}`, borderBottom: `1px solid ${P.line}`, position: "relative", zIndex: 1, background: P.bg2 }}>
        <div style={{ fontFamily: type.mono, fontSize: 11, color: P.accent, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 40 }}>§04 / TELEMETRY</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: `1px solid ${P.line}` }}>
          {[
            { v: 87, suf: "%", l: "Avg completion across cohorts", note: "[31% industry baseline]" },
            { v: 4.2, suf: "×", l: "Faster programme launch", note: "[kickoff → live]" },
            { v: 1240, suf: "", l: "Skills tracked per customer", note: "[median, year one]" },
            { v: 96, suf: "%", l: "Manager satisfaction", note: "[rolling NPS, 90d]" },
          ].map((s, i) => (
            <div key={s.l} style={{ padding: "32px 24px", borderRight: i < 3 ? `1px solid ${P.line}` : "none" }}>
              <div style={{ fontFamily: type.display === '"JetBrains Mono", ui-monospace, monospace' ? '"Space Grotesk", sans-serif' : type.display, fontSize: 76, lineHeight: 1, letterSpacing: "-0.04em", fontWeight: type.dw, color: P.accent }}>
                <CountUpB to={s.v} suffix={s.suf} />
              </div>
              <div style={{ fontSize: 14, marginTop: 16, maxWidth: 220 }}>{s.l}</div>
              <div style={{ fontFamily: type.mono, fontSize: 10, color: P.muted, marginTop: 8, letterSpacing: ".06em" }}>{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "120px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {[
            { q: "We replaced four tools with Cohere. Our L&D ops team got their afternoons back, and our completion rates doubled in a quarter.", a: "Priya Adeyemi", r: "Head of L&D · Northwind" },
            { q: "The skills graph finally gave us a shared language with the business. Capability lift, not training hours.", a: "Marc Holst", r: "VP People Dev · Halcyon" },
          ].map((t) => (
            <RevealB key={t.a}>
              <div style={{ padding: 32, border: `1px solid ${P.line}`, background: P.surface, position: "relative" }}>
                <div style={{ position: "absolute", top: -10, left: 24, background: P.bg, padding: "0 8px", fontFamily: type.mono, fontSize: 10, color: P.accent, letterSpacing: ".15em" }}>// CASE_STUDY</div>
                <div style={{ fontFamily: type.display === '"JetBrains Mono", ui-monospace, monospace' ? '"Space Grotesk", sans-serif' : type.display, fontSize: 22, lineHeight: 1.35, letterSpacing: "-0.015em", marginBottom: 28, fontWeight: type.dw }}>"{t.q}"</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: `1px solid ${P.line}` }}>
                  <div style={{ width: 36, height: 36, background: P.accent }}></div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{t.a}</div>
                    <div style={{ fontSize: 11, color: P.muted, fontFamily: type.mono, letterSpacing: ".06em" }}>{t.r}</div>
                  </div>
                </div>
              </div>
            </RevealB>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <PricingB P={P} type={type} />

      {/* FAQ */}
      <FAQB P={P} type={type} />

      {/* CTA */}
      <section style={{ padding: "140px 48px 80px", borderTop: `1px solid ${P.line}`, position: "relative", zIndex: 1, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 50%, ${P.accent}22, transparent 50%)` }}></div>
        <div style={{ maxWidth: 900, position: "relative" }}>
          <div style={{ fontFamily: type.mono, fontSize: 11, color: P.accent, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 24 }}>§07 / DEPLOY</div>
          <h2 style={{ fontFamily: type.display === '"JetBrains Mono", ui-monospace, monospace' ? '"Space Grotesk", sans-serif' : type.display, fontSize: "clamp(56px, 7vw, 104px)", lineHeight: 0.95, letterSpacing: "-0.04em", margin: 0, fontWeight: type.dw }}>
            Bring L&D online.
          </h2>
          <p style={{ fontSize: 17, color: P.muted, maxWidth: 540, marginTop: 24, lineHeight: 1.55 }}>
            White-glove migration from your current LMS. Median time-to-launch: 11 working days.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
            <MagneticButtonB primary palette={P} font={type.mono}>Request access →</MagneticButtonB>
            <MagneticButtonB palette={P} font={type.mono}>Talk to founders</MagneticButtonB>
          </div>
        </div>
      </section>

      <footer style={{ padding: "32px 48px", borderTop: `1px solid ${P.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: P.muted, fontFamily: type.mono, letterSpacing: ".06em", textTransform: "uppercase", position: "relative", zIndex: 1 }}>
        <div>© COHERE LABS · v4.2.0 · {new Date().toISOString().split("T")[0]}</div>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ color: "inherit" }}>Security</a>
          <a href="#" style={{ color: "inherit" }}>Status</a>
          <a href="#" style={{ color: "inherit" }}>Docs</a>
          <a href="#" style={{ color: "inherit" }}>Changelog</a>
        </div>
      </footer>
    </div>
  );
}

function PanelB({ tab, P, type }) {
  const display = '"Space Grotesk", sans-serif';
  if (tab === 0) return (
    <div style={{ fontSize: 11, fontFamily: type.mono, color: P.ink }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 10, marginBottom: 12 }}>
        <span>$ programmes --status active</span><span>4 results</span>
      </div>
      {[["manager-essentials", 124, 64], ["sales-onboarding", 38, 88], ["senior-ic-capability", 61, 21], ["compliance-q2", 412, 95]].map(([n, c, p]) => (
        <div key={n} style={{ display: "grid", gridTemplateColumns: "1.4fr 60px 1fr 50px", gap: 10, alignItems: "center", padding: "8px 0", borderTop: `1px solid ${P.line}` }}>
          <div style={{ color: P.accent }}>▸ {n}</div>
          <div>{c} usr</div>
          <div style={{ height: 3, background: P.line }}><div style={{ width: `${p}%`, height: "100%", background: P.accent }}></div></div>
          <div style={{ textAlign: "right" }}>{p}%</div>
        </div>
      ))}
    </div>
  );
  if (tab === 1) return (
    <div style={{ fontSize: 12, color: P.ink }}>
      <div style={{ fontFamily: type.mono, color: P.muted, fontSize: 10, marginBottom: 8 }}>// LEARNER: olu_a (cohort_07)</div>
      <div style={{ fontFamily: display, fontSize: 22, marginBottom: 16, letterSpacing: "-.02em" }}>Two things due today.</div>
      <div style={{ display: "grid", gap: 8 }}>
        {[["coaching-practice-03", "12 min", "5pm"], ["peer-review/marcus", "8 min", "EOD"]].map(([t, d, due]) => (
          <div key={t} style={{ border: `1px solid ${P.line}`, padding: 12, display: "grid", gridTemplateColumns: "1fr auto", gap: 8, fontFamily: type.mono, fontSize: 11 }}>
            <div><div style={{ color: P.ink }}>▸ {t}</div><div style={{ color: P.muted, fontSize: 10, marginTop: 2 }}>{d}</div></div>
            <div style={{ color: P.accent, alignSelf: "center", fontSize: 10 }}>DUE {due}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, fontFamily: type.mono, fontSize: 10, color: P.muted }}>● 14d streak — keep going</div>
    </div>
  );
  if (tab === 2) return (
    <div style={{ fontSize: 11, color: P.ink, fontFamily: type.mono }}>
      <div style={{ color: P.muted, fontSize: 10, marginBottom: 12 }}>// SKILLS / engineering_managers</div>
      {[["coaching", 78], ["strategic_thinking", 54], ["storytelling", 62], ["delegation", 41], ["feedback", 84], ["prioritisation", 33]].map(([s, v]) => (
        <div key={s} style={{ display: "grid", gridTemplateColumns: "1fr 50px 24px", gap: 8, alignItems: "center", padding: "5px 0" }}>
          <div>{s}</div>
          <div style={{ height: 3, background: P.line }}><div style={{ width: `${v}%`, height: "100%", background: v > 70 ? P.accent : P.ink }}></div></div>
          <div style={{ textAlign: "right", color: v > 70 ? P.accent : P.muted }}>L{Math.round(v / 25) + 1}</div>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ fontSize: 11, color: P.ink, height: "100%", display: "grid", gridTemplateRows: "auto 1fr" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontFamily: type.mono }}>
        <span style={{ color: P.muted }}>// engagement_30d</span>
        <span style={{ color: P.accent }}>+18.4% wow</span>
      </div>
      <svg viewBox="0 0 400 120" style={{ width: "100%", height: "100%" }}>
        {[20, 50, 80].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke={P.line} strokeDasharray="2 4" />)}
        <path d="M0,90 L40,80 L80,84 L120,60 L160,68 L200,40 L240,46 L280,28 L320,38 L360,18 L400,24" fill="none" stroke={P.accent} strokeWidth="1.5" />
        {[[0,90],[80,84],[160,68],[240,46],[320,38],[400,24]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="2.5" fill={P.bg} stroke={P.accent} />)}
      </svg>
    </div>
  );
}

function PricingB({ P, type }) {
  const [annual, setAnnual] = React.useState(true);
  const display = '"Space Grotesk", sans-serif';
  const tiers = [
    { n: "TEAM", p: annual ? 12 : 15, f: ["Up to 250 learners", "Programmes & cohorts", "Reporting basics", "SSO"], cta: "Start trial" },
    { n: "BUSINESS", p: annual ? 22 : 28, f: ["Skills graph", "Manager review flows", "HRIS sync", "Custom roles"], cta: "Request access", featured: true },
    { n: "ENTERPRISE", p: null, f: ["Unlimited everything", "SCIM provisioning", "Dedicated CSM", "Audit & compliance"], cta: "Talk to sales" },
  ];
  return (
    <section style={{ padding: "120px 48px", borderTop: `1px solid ${P.line}`, position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48 }}>
        <div>
          <div style={{ fontFamily: type.mono, fontSize: 11, color: P.accent, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 16 }}>§05 / PRICING</div>
          <h2 style={{ fontFamily: display, fontSize: 56, lineHeight: 0.98, letterSpacing: "-0.035em", margin: 0, fontWeight: type.dw }}>Per-learner. No surprises.</h2>
        </div>
        <div style={{ display: "inline-flex", border: `1px solid ${P.line}`, padding: 4 }}>
          {[["ANNUAL", true], ["MONTHLY", false]].map(([l, v]) => (
            <button key={l} onClick={() => setAnnual(v)} style={{
              padding: "8px 16px", border: "none", cursor: "pointer", fontFamily: type.mono, fontSize: 11, letterSpacing: ".1em",
              background: annual === v ? P.accent : "transparent", color: annual === v ? "#08080A" : P.ink,
            }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: `1px solid ${P.line}` }}>
        {tiers.map((t, i) => (
          <div key={t.n} style={{
            padding: 32,
            background: t.featured ? P.bg2 : P.surface,
            borderRight: i < 2 ? `1px solid ${P.line}` : "none",
            position: "relative",
            minHeight: 420,
          }}>
            {t.featured && <div style={{ position: "absolute", top: 16, right: 16, fontFamily: type.mono, fontSize: 10, color: P.accent, letterSpacing: ".15em" }}>● MOST DEPLOYED</div>}
            <div style={{ fontFamily: type.mono, fontSize: 11, letterSpacing: ".15em", color: P.muted, marginBottom: 24 }}>// {t.n}</div>
            <div style={{ fontFamily: display, fontSize: 64, fontWeight: type.dw, letterSpacing: "-0.04em", lineHeight: 1, color: t.featured ? P.accent : P.ink }}>
              {t.p ? `£${t.p}` : "Custom"}
            </div>
            <div style={{ fontSize: 12, color: P.muted, marginTop: 8, fontFamily: type.mono, letterSpacing: ".06em" }}>{t.p ? "PER LEARNER / MO" : "VOLUME LICENSING"}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "32px 0", fontSize: 13, fontFamily: type.mono }}>
              {t.f.map((x) => (
                <li key={x} style={{ padding: "8px 0", borderTop: `1px solid ${P.line}`, display: "flex", gap: 10, color: P.ink }}>
                  <span style={{ color: P.accent }}>+</span>{x}
                </li>
              ))}
            </ul>
            <button style={{
              width: "100%", padding: "12px", fontFamily: type.mono, fontSize: 12, cursor: "pointer", letterSpacing: ".1em", textTransform: "uppercase",
              background: t.featured ? P.accent : "transparent", color: t.featured ? "#08080A" : P.ink,
              border: `1px solid ${t.featured ? P.accent : P.line}`,
            }}>{t.cta} →</button>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQB({ P, type }) {
  const [open, setOpen] = React.useState(0);
  const display = '"Space Grotesk", sans-serif';
  const items = [
    ["Do you replace our LMS?", "For most customers, yes — Cohere covers programmes, libraries, learner experience, and reporting. For regulated industries that need an LRS of record, we plug in via xAPI."],
    ["How long is implementation?", "Median time-to-launch is 11 working days for Team and Business. Enterprise migrations: 4–6 weeks including HRIS reconciliation."],
    ["Cohort-based programmes?", "First-class. Live sessions, async modules, and milestone reviews together. Slack and Teams sync included."],
    ["Bring our own content?", "SCORM 1.2 / 2004, xAPI, video, PDF, Markdown — all native. Content partner network on top."],
    ["SOC 2 / ISO 27001?", "SOC 2 Type II annually. ISO 27001 in audit Q3 2026. EU and UK data residency available."],
  ];
  return (
    <section style={{ padding: "100px 48px", borderTop: `1px solid ${P.line}`, position: "relative", zIndex: 1, background: P.bg2 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 48 }}>
        <div>
          <div style={{ fontFamily: type.mono, fontSize: 11, color: P.accent, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 16 }}>§06 / FAQ</div>
          <h2 style={{ fontFamily: display, fontSize: 44, lineHeight: 0.98, letterSpacing: "-0.035em", margin: 0, fontWeight: type.dw }}>Common questions.</h2>
        </div>
        <div>
          {items.map(([q, a], i) => (
            <div key={q} style={{ borderTop: `1px solid ${P.line}`, padding: "20px 0", cursor: "pointer" }} onClick={() => setOpen(open === i ? -1 : i)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                  <span style={{ fontFamily: type.mono, fontSize: 11, color: P.muted }}>0{i + 1}</span>
                  <span style={{ fontFamily: display, fontSize: 20, letterSpacing: "-0.02em", fontWeight: type.dw }}>{q}</span>
                </div>
                <div style={{ fontFamily: type.mono, fontSize: 16, color: P.accent }}>{open === i ? "[–]" : "[+]"}</div>
              </div>
              <div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height .4s ease, margin .4s ease", marginTop: open === i ? 12 : 0, marginLeft: 30 }}>
                <div style={{ color: P.muted, fontSize: 14, lineHeight: 1.55, maxWidth: 640 }}>{a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.DirectionB = DirectionB;
window.B_TWEAKS = B_TWEAKS;
window.B_PALETTES = B_PALETTES;
window.B_TYPE = B_TYPE;
window.B_HERO_COPY = B_HERO_COPY;
