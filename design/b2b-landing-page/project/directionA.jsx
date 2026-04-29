/* Direction A — Premium Editorial
   Warm cream + ink, serif display (Fraunces alt: "Newsreader") paired with neo-grotesque body (Geist),
   floating 3D laptop hero, calm motion. */

const A_TWEAKS = /*EDITMODE-BEGIN*/{
  "palette": "cream",
  "typePair": "editorial",
  "mode": "light",
  "heroCopy": "default"
}/*EDITMODE-END*/;

const A_PALETTES = {
  cream: { bg: "#F4EFE6", bg2: "#EAE2D2", ink: "#1A1813", muted: "#6B6356", line: "rgba(26,24,19,0.12)", accent: "#C8462C", surface: "#FFFFFF" },
  sage:  { bg: "#EEF0E8", bg2: "#E1E5D6", ink: "#191B14", muted: "#5F6555", line: "rgba(25,27,20,0.12)", accent: "#3D6B3A", surface: "#FBFCF7" },
  ivory: { bg: "#F7F4EC", bg2: "#EDE7D8", ink: "#171614", muted: "#6A655A", line: "rgba(23,22,20,0.10)", accent: "#7B5A2E", surface: "#FFFFFF" },
};

const A_TYPE = {
  editorial: { display: '"Newsreader", "Source Serif 4", Georgia, serif', body: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace', displayWeight: 400 },
  grotesque: { display: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif', body: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace', displayWeight: 600 },
  mono:      { display: '"JetBrains Mono", ui-monospace, monospace', body: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace', displayWeight: 500 },
};

const A_HERO_COPY = {
  default: { kicker: "Learning & Development, modernised", h1Top: "Build the", h1Mid: "skills your", h1Bot: "company needs.", sub: "A complete platform for L&D teams to design programmes, track progress, and prove impact — without the spreadsheets." },
  outcomes: { kicker: "Outcomes-led learning", h1Top: "From compliance", h1Mid: "to capability —", h1Bot: "in one platform.", sub: "Everything your L&D team needs to plan, deliver, and measure learning that actually moves the business." },
  team:     { kicker: "Built for L&D teams", h1Top: "The operating", h1Mid: "system for", h1Bot: "people development.", sub: "Workflows, dashboards, and learner experiences your team will actually use." },
};

function MagneticButton({ children, primary, palette, font }) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    setT({ x: x * 0.25, y: y * 0.4 });
  };
  const reset = () => setT({ x: 0, y: 0 });
  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        transform: `translate(${t.x}px, ${t.y}px)`,
        transition: "transform .25s cubic-bezier(.2,.8,.2,1), background .2s, color .2s",
        background: primary ? palette.ink : "transparent",
        color: primary ? palette.bg : palette.ink,
        border: `1px solid ${primary ? palette.ink : palette.line}`,
        padding: "14px 22px",
        borderRadius: 999,
        fontFamily: font,
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: "-0.01em",
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

function Hero3DLaptop({ palette }) {
  const wrap = React.useRef(null);
  const [tilt, setTilt] = React.useState({ rx: -14, ry: -22 });
  React.useEffect(() => {
    const onMove = (e) => {
      if (!wrap.current) return;
      const r = wrap.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      setTilt({ rx: -14 + dy * 8, ry: -22 + dx * 14 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrap} style={{ perspective: 1800, width: "100%", height: 560, display: "grid", placeItems: "center" }}>
      <div style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform .6s cubic-bezier(.2,.8,.2,1)",
        width: 720, height: 460, position: "relative",
      }}>
        {/* shadow */}
        <div style={{ position: "absolute", inset: "auto 8% -4% 8%", height: 60, background: "radial-gradient(60% 100% at 50% 0%, rgba(0,0,0,0.28), transparent 70%)", filter: "blur(18px)", transform: "translateZ(-200px)" }}></div>
        {/* base */}
        <div style={{ position: "absolute", inset: "auto 0 0 0", height: 24, background: `linear-gradient(180deg, ${palette.surface}, ${palette.bg2})`, borderRadius: 8, transform: "translateZ(0)", boxShadow: `0 30px 60px rgba(0,0,0,.18), inset 0 1px 0 ${palette.line}` }}></div>
        {/* hinge */}
        <div style={{ position: "absolute", inset: "auto 4% 22px 4%", height: 8, background: palette.bg2, borderRadius: 4, transform: "translateZ(2px)" }}></div>
        {/* screen */}
        <div style={{
          position: "absolute", left: "4%", right: "4%", bottom: 26, height: 420,
          background: palette.ink, borderRadius: 16,
          transform: "translateZ(0) rotateX(90deg)",
          transformOrigin: "bottom center",
          boxShadow: `0 0 0 6px ${palette.bg2}, 0 60px 80px -20px rgba(0,0,0,.35)`,
          padding: 14,
          fontFamily: '"Inter Tight", system-ui, sans-serif',
          color: palette.bg,
          overflow: "hidden",
        }}>
          <DashboardScreen palette={palette} />
        </div>

        {/* floating cards */}
        <FloatingCard palette={palette} style={{ left: -120, top: 40, transform: "translateZ(120px) rotate(-6deg)" }}>
          <div style={{ fontSize: 11, color: palette.muted, marginBottom: 6, letterSpacing: ".08em", textTransform: "uppercase" }}>Completion</div>
          <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-.02em" }}>92.4%</div>
          <div style={{ height: 4, background: palette.line, borderRadius: 4, marginTop: 10, overflow: "hidden" }}>
            <div style={{ width: "92%", height: "100%", background: palette.accent }}></div>
          </div>
        </FloatingCard>
        <FloatingCard palette={palette} style={{ right: -100, top: 180, transform: "translateZ(160px) rotate(4deg)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 999, background: palette.accent }}></div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>New cohort enrolled</div>
              <div style={{ fontSize: 10, color: palette.muted }}>Leadership · 24 learners</div>
            </div>
          </div>
        </FloatingCard>
        <FloatingCard palette={palette} style={{ left: -60, bottom: -10, transform: "translateZ(80px) rotate(2deg)", width: 180 }}>
          <div style={{ display: "flex", alignItems: "end", gap: 4, height: 36 }}>
            {[40, 65, 50, 80, 55, 90, 72].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 5 ? palette.accent : palette.line, borderRadius: 2 }}></div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: palette.muted, marginTop: 8, fontFamily: '"JetBrains Mono", monospace' }}>Engagement / 7d</div>
        </FloatingCard>
      </div>
    </div>
  );
}

function FloatingCard({ children, style, palette }) {
  return (
    <div style={{
      position: "absolute",
      width: 200,
      padding: 14,
      background: palette.surface,
      border: `1px solid ${palette.line}`,
      borderRadius: 12,
      boxShadow: "0 20px 40px -10px rgba(0,0,0,.18), 0 4px 8px rgba(0,0,0,.04)",
      fontFamily: '"Inter Tight", system-ui, sans-serif',
      color: palette.ink,
      ...style,
    }}>{children}</div>
  );
}

function DashboardScreen({ palette }) {
  return (
    <div style={{ width: "100%", height: "100%", background: palette.bg, color: palette.ink, borderRadius: 8, display: "grid", gridTemplateColumns: "140px 1fr", overflow: "hidden" }}>
      <aside style={{ borderRight: `1px solid ${palette.line}`, padding: 12, fontSize: 10 }}>
        <div style={{ fontFamily: '"Newsreader", serif', fontSize: 14, marginBottom: 14 }}>Cohere<span style={{ color: palette.accent }}>.</span></div>
        {["Programmes", "Learners", "Skills", "Reports", "Library"].map((x, i) => (
          <div key={x} style={{ padding: "6px 8px", marginBottom: 2, borderRadius: 6, background: i === 0 ? palette.bg2 : "transparent", color: i === 0 ? palette.ink : palette.muted }}>{x}</div>
        ))}
      </aside>
      <main style={{ padding: 14, fontSize: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: '"Newsreader", serif', fontSize: 16, letterSpacing: "-.02em" }}>Q2 Leadership Programme</div>
            <div style={{ color: palette.muted, fontSize: 10 }}>24 learners · 6 modules · 8 weeks</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ padding: "3px 8px", border: `1px solid ${palette.line}`, borderRadius: 999, fontSize: 9 }}>Active</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[["Enrolled", "24"], ["Active", "21"], ["Completed", "16"]].map(([k, v]) => (
            <div key={k} style={{ border: `1px solid ${palette.line}`, borderRadius: 6, padding: 8 }}>
              <div style={{ color: palette.muted, fontSize: 9 }}>{k}</div>
              <div style={{ fontSize: 16, fontFamily: '"Newsreader", serif' }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ border: `1px solid ${palette.line}`, borderRadius: 6, padding: 10 }}>
          <div style={{ color: palette.muted, fontSize: 9, marginBottom: 8 }}>Module progress</div>
          {["Coaching fundamentals", "Difficult conversations", "Strategic thinking", "Feedback frameworks"].map((m, i) => (
            <div key={m} style={{ display: "grid", gridTemplateColumns: "120px 1fr 30px", gap: 8, alignItems: "center", marginBottom: 6, fontSize: 9 }}>
              <div>{m}</div>
              <div style={{ height: 4, background: palette.bg2, borderRadius: 4 }}>
                <div style={{ width: `${[88, 72, 54, 31][i]}%`, height: "100%", background: i === 0 ? palette.accent : palette.ink, borderRadius: 4 }}></div>
              </div>
              <div style={{ textAlign: "right", color: palette.muted }}>{[88, 72, 54, 31][i]}%</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function CountUp({ to, suffix, duration = 1600 }) {
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

function Reveal({ children, delay = 0 }) {
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

function DirectionA({ tweaks }) {
  const palette = A_PALETTES[tweaks.palette] || A_PALETTES.cream;
  const type = A_TYPE[tweaks.typePair] || A_TYPE.editorial;
  const copy = A_HERO_COPY[tweaks.heroCopy] || A_HERO_COPY.default;
  const dark = tweaks.mode === "dark";
  const P = dark
    ? { ...palette, bg: "#15140F", bg2: "#1F1D17", ink: "#F2EDE2", muted: "#9A9285", line: "rgba(242,237,226,0.12)", surface: "#1B1914" }
    : palette;

  const [tab, setTab] = React.useState(0);
  const tabs = ["Programmes", "Learner experience", "Skills graph", "Insights"];

  return (
    <div style={{ background: P.bg, color: P.ink, fontFamily: type.body, minHeight: "100%", letterSpacing: "-0.01em" }}>
      {/* Nav */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 64px", borderBottom: `1px solid ${P.line}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div style={{ fontFamily: type.display, fontSize: 24, fontWeight: type.displayWeight, letterSpacing: "-0.03em" }}>
            Cohere<span style={{ color: P.accent }}>.</span>
          </div>
          <div style={{ display: "flex", gap: 28, fontSize: 14, color: P.muted }}>
            {["Platform", "Solutions", "Customers", "Pricing", "Resources"].map((x) => (
              <a key={x} href="#" style={{ color: "inherit", textDecoration: "none" }}>{x}</a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="#" style={{ color: P.ink, fontSize: 14, textDecoration: "none" }}>Sign in</a>
          <MagneticButton primary palette={P} font={type.body}>Book a demo →</MagneticButton>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 64px 40px", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 48, alignItems: "center", minHeight: 720 }}>
        <div>
          <div style={{ fontFamily: type.mono, fontSize: 12, color: P.muted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 28 }}>
            ◆ &nbsp; {copy.kicker}
          </div>
          <h1 style={{
            fontFamily: type.display,
            fontWeight: type.displayWeight,
            fontSize: "clamp(56px, 6vw, 96px)",
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
            margin: 0,
          }}>
            <div>{copy.h1Top}</div>
            <div style={{ fontStyle: tweaks.typePair === "editorial" ? "italic" : "normal", color: P.accent }}>{copy.h1Mid}</div>
            <div>{copy.h1Bot}</div>
          </h1>
          <p style={{ fontSize: 19, color: P.muted, maxWidth: 520, marginTop: 28, lineHeight: 1.5 }}>
            {copy.sub}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
            <MagneticButton primary palette={P} font={type.body}>Start free trial →</MagneticButton>
            <MagneticButton palette={P} font={type.body}>Watch the tour</MagneticButton>
          </div>
          <div style={{ marginTop: 44, display: "flex", gap: 32, fontSize: 13, color: P.muted, alignItems: "center" }}>
            <span style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ width: 8, height: 8, borderRadius: 999, background: P.accent }}></span> SOC 2 Type II</span>
            <span>·</span>
            <span>SCIM + SSO</span>
            <span>·</span>
            <span>SCORM &amp; xAPI</span>
          </div>
        </div>
        <Hero3DLaptop palette={P} />
      </section>

      {/* Logo bar */}
      <section style={{ padding: "40px 64px", borderTop: `1px solid ${P.line}`, borderBottom: `1px solid ${P.line}` }}>
        <div style={{ fontFamily: type.mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: P.muted, marginBottom: 20 }}>
          Trusted by L&D teams at
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 24, alignItems: "center", color: P.ink }}>
          {[
            { name: "NORTHWIND", style: { fontFamily: type.display, fontWeight: 500, letterSpacing: "-.02em" } },
            { name: "Halcyon", style: { fontFamily: type.display, fontStyle: "italic" } },
            { name: "MERIDIAN/CO", style: { fontFamily: type.mono, fontWeight: 500 } },
            { name: "PARALLAX", style: { fontFamily: type.body, fontWeight: 600, letterSpacing: ".18em", fontSize: 14 } },
            { name: "Lumen", style: { fontFamily: type.display, fontWeight: 400 } },
            { name: "FIELDNOTE", style: { fontFamily: type.mono, fontWeight: 500, letterSpacing: ".1em" } },
          ].map((l) => (
            <div key={l.name} style={{ fontSize: 22, opacity: .7, ...l.style }}>{l.name}</div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section style={{ padding: "120px 64px" }}>
        <Reveal>
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <div style={{ fontFamily: type.mono, fontSize: 12, color: P.muted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>02 / Platform</div>
            <h2 style={{ fontFamily: type.display, fontSize: 64, lineHeight: 1, letterSpacing: "-0.03em", margin: 0, fontWeight: type.displayWeight }}>
              Everything L&D <span style={{ fontStyle: tweaks.typePair === "editorial" ? "italic" : "normal" }}>needs.</span><br />Nothing it doesn't.
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: P.line, border: `1px solid ${P.line}` }}>
          {[
            { num: "01", t: "Programmes", d: "Design multi-module programmes with cohorts, milestones, and live sessions in one place." },
            { num: "02", t: "Learner experience", d: "A learner home that feels less LMS, more product. Daily nudges, streaks, and clear next steps." },
            { num: "03", t: "Skills graph", d: "Map every learner's capability against the roles you're building toward. Watch gaps close." },
            { num: "04", t: "Live & async", d: "Run cohort-based programmes alongside self-paced libraries — without forcing learners to context-switch." },
            { num: "05", t: "Reporting", d: "Export-ready dashboards your CFO will actually read. Per-cohort, per-team, per-skill." },
            { num: "06", t: "Integrations", d: "HRIS, SSO, calendar, Slack, Teams, Workday. Wired up in an afternoon." },
          ].map((f, i) => (
            <Reveal key={f.num} delay={i * 60}>
              <div style={{ background: P.bg, padding: 32, minHeight: 240 }}>
                <div style={{ fontFamily: type.mono, fontSize: 12, color: P.muted, marginBottom: 32 }}>{f.num}</div>
                <div style={{ fontFamily: type.display, fontSize: 26, letterSpacing: "-0.02em", marginBottom: 12, fontWeight: type.displayWeight }}>{f.t}</div>
                <div style={{ color: P.muted, fontSize: 15, lineHeight: 1.55 }}>{f.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Product showcase with tabs */}
      <section style={{ padding: "80px 64px 120px" }}>
        <Reveal>
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <div style={{ fontFamily: type.mono, fontSize: 12, color: P.muted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 20 }}>03 / Inside the product</div>
            <h2 style={{ fontFamily: type.display, fontSize: 56, lineHeight: 1, letterSpacing: "-0.03em", margin: 0, fontWeight: type.displayWeight }}>
              Four surfaces, <span style={{ fontStyle: tweaks.typePair === "editorial" ? "italic" : "normal" }}>one</span> system.
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              padding: "10px 18px", borderRadius: 999, fontSize: 14, fontFamily: type.body, cursor: "pointer",
              background: tab === i ? P.ink : "transparent", color: tab === i ? P.bg : P.ink,
              border: `1px solid ${tab === i ? P.ink : P.line}`,
              transition: "all .2s",
            }}>{t}</button>
          ))}
        </div>
        <Reveal>
          <div style={{ aspectRatio: "16/9", background: P.bg2, borderRadius: 16, border: `1px solid ${P.line}`, padding: 24, display: "grid", gridTemplateColumns: "240px 1fr", gap: 24, overflow: "hidden", position: "relative" }}>
            <div>
              <div style={{ fontFamily: type.display, fontSize: 22, marginBottom: 16, fontWeight: type.displayWeight, letterSpacing: "-.02em" }}>{tabs[tab]}</div>
              <div style={{ color: P.muted, fontSize: 14, lineHeight: 1.5 }}>
                {[
                  "Build programmes the way your team thinks — by outcome, not by content type.",
                  "A learner home that respects time. Show what's due, why it matters, and how long it takes.",
                  "See how skills move across teams. Spot capability gaps before the org chart asks for them.",
                  "Roll up engagement, completion, and skill lift into reports that fit on one page.",
                ][tab]}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0", color: P.ink, fontSize: 13 }}>
                {[
                  ["Cohorts & milestones", "Templates", "Approvals"],
                  ["Streaks", "Daily nudges", "Mobile-first"],
                  ["Role-based maps", "Calibrations", "Manager review"],
                  ["Per-cohort", "Per-skill", "CSV / API export"],
                ][tab].map((x) => (
                  <li key={x} style={{ padding: "8px 0", borderTop: `1px solid ${P.line}`, fontFamily: type.mono, fontSize: 12, letterSpacing: ".04em" }}>→ {x}</li>
                ))}
              </ul>
            </div>
            <div style={{ background: P.surface, borderRadius: 12, border: `1px solid ${P.line}`, overflow: "hidden", padding: 16 }}>
              {tab === 0 && <ProgrammesPanel P={P} type={type} />}
              {tab === 1 && <LearnerPanel P={P} type={type} />}
              {tab === 2 && <SkillsPanel P={P} type={type} />}
              {tab === 3 && <InsightsPanel P={P} type={type} />}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section style={{ padding: "100px 64px", background: P.ink, color: P.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontFamily: type.mono, fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: P.muted, marginBottom: 40, opacity: .7 }}>04 / By the numbers</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {[
              { v: 87, suf: "%", l: "Average completion across cohorts", note: "vs 31% industry baseline" },
              { v: 4.2, suf: "×", l: "Faster programme launch", note: "from kickoff to live" },
              { v: 1240, suf: "", l: "Skills tracked per customer", note: "median, year one" },
              { v: 96, suf: "%", l: "Manager satisfaction", note: "rolling NPS, last 90d" },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: type.display, fontSize: 84, lineHeight: 1, letterSpacing: "-0.04em", fontWeight: type.displayWeight }}>
                  <CountUp to={s.v} suffix={s.suf} />
                </div>
                <div style={{ fontSize: 15, marginTop: 16, maxWidth: 220 }}>{s.l}</div>
                <div style={{ fontFamily: type.mono, fontSize: 11, color: P.muted, marginTop: 8, opacity: .8 }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "120px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32 }}>
          {[
            { q: "We replaced four tools with Cohere. Our L&D ops team got their afternoons back, and our completion rates doubled in a quarter.", a: "Priya Adeyemi", r: "Head of L&D, Northwind" },
            { q: "The skills graph finally gave us a shared language with the business. We can show capability lift, not just hours of training delivered.", a: "Marc Holst", r: "VP People Development, Halcyon" },
          ].map((t) => (
            <Reveal key={t.a}>
              <div style={{ padding: 40, border: `1px solid ${P.line}`, borderRadius: 16, background: P.surface }}>
                <div style={{ fontFamily: type.display, fontSize: 26, lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 32, fontWeight: type.displayWeight }}>“{t.q}”</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 999, background: P.accent }}></div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{t.a}</div>
                    <div style={{ fontSize: 13, color: P.muted }}>{t.r}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <PricingA P={P} type={type} tweaks={tweaks} />

      {/* FAQ */}
      <FAQA P={P} type={type} />

      {/* CTA + Footer */}
      <section style={{ padding: "140px 64px 80px", background: P.bg2, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -120, top: -120, width: 480, height: 480, borderRadius: "50%", background: P.accent, opacity: .12, filter: "blur(40px)" }}></div>
        <div style={{ maxWidth: 900, position: "relative" }}>
          <div style={{ fontFamily: type.mono, fontSize: 12, color: P.muted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 24 }}>07 / Get started</div>
          <h2 style={{ fontFamily: type.display, fontSize: "clamp(56px, 7vw, 112px)", lineHeight: 0.95, letterSpacing: "-0.04em", margin: 0, fontWeight: type.displayWeight }}>
            Bring your L&D <span style={{ fontStyle: tweaks.typePair === "editorial" ? "italic" : "normal", color: P.accent }}>into focus.</span>
          </h2>
          <p style={{ fontSize: 19, color: P.muted, maxWidth: 560, marginTop: 24, lineHeight: 1.5 }}>
            14-day trial. No card. White-glove migration if you've outgrown your LMS.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <MagneticButton primary palette={P} font={type.body}>Book a demo →</MagneticButton>
            <MagneticButton palette={P} font={type.body}>Talk to founders</MagneticButton>
          </div>
        </div>
      </section>
      <footer style={{ padding: "48px 64px", borderTop: `1px solid ${P.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: P.muted, fontFamily: type.mono }}>
        <div>© Cohere Labs, Ltd. — Designed in London &amp; Lisbon.</div>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ color: "inherit" }}>Security</a>
          <a href="#" style={{ color: "inherit" }}>Privacy</a>
          <a href="#" style={{ color: "inherit" }}>Status</a>
          <a href="#" style={{ color: "inherit" }}>Changelog</a>
        </div>
      </footer>
    </div>
  );
}

/* Sub-panels for tab content */
function ProgrammesPanel({ P, type }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: 12, fontSize: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: type.display, fontSize: 18, fontWeight: type.displayWeight }}>Active programmes</div>
        <div style={{ fontFamily: type.mono, fontSize: 11, color: P.muted }}>Q2 · 2026</div>
      </div>
      {[
        { n: "Manager essentials", c: 124, p: 64, s: "Live" },
        { n: "Sales onboarding", c: 38, p: 88, s: "Live" },
        { n: "Senior IC capability", c: 61, p: 21, s: "Starting" },
        { n: "Compliance refresh", c: 412, p: 95, s: "Closing" },
      ].map((r) => (
        <div key={r.n} style={{ display: "grid", gridTemplateColumns: "1.6fr 60px 1fr 60px", gap: 12, alignItems: "center", padding: "10px 0", borderTop: `1px solid ${P.line}` }}>
          <div>
            <div style={{ fontWeight: 500 }}>{r.n}</div>
            <div style={{ color: P.muted, fontSize: 11 }}>{r.c} learners · 6 modules</div>
          </div>
          <div style={{ fontFamily: type.mono }}>{r.p}%</div>
          <div style={{ height: 4, background: P.bg2, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: `${r.p}%`, height: "100%", background: P.ink }}></div>
          </div>
          <div style={{ fontSize: 11, color: P.muted, textAlign: "right" }}>{r.s}</div>
        </div>
      ))}
    </div>
  );
}
function LearnerPanel({ P, type }) {
  return (
    <div style={{ height: "100%", display: "grid", gridTemplateRows: "auto 1fr", gap: 12, fontSize: 12 }}>
      <div>
        <div style={{ fontFamily: type.mono, fontSize: 11, color: P.muted, marginBottom: 4 }}>Good morning, Olu —</div>
        <div style={{ fontFamily: type.display, fontSize: 22, fontWeight: type.displayWeight, letterSpacing: "-.02em" }}>Two things due today.</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { t: "Coaching practice 03", d: "12 min · video + reflection", due: "Due 5pm" },
          { t: "Peer review: Marcus", d: "8 min · async feedback", due: "Today" },
        ].map((c) => (
          <div key={c.t} style={{ padding: 14, border: `1px solid ${P.line}`, borderRadius: 10, background: P.bg }}>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>{c.t}</div>
            <div style={{ color: P.muted, fontSize: 11, marginBottom: 12 }}>{c.d}</div>
            <div style={{ fontFamily: type.mono, fontSize: 10, color: P.accent }}>{c.due}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", color: P.muted, fontSize: 11 }}>
        <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 999, background: P.accent }}></span>
        14-day streak · keep going
      </div>
    </div>
  );
}
function SkillsPanel({ P, type }) {
  const skills = [
    { s: "Coaching", l: 78 }, { s: "Strategic thinking", l: 54 }, { s: "Storytelling", l: 62 },
    { s: "Delegation", l: 41 }, { s: "Feedback", l: 84 }, { s: "Prioritisation", l: 33 },
  ];
  return (
    <div style={{ fontSize: 12 }}>
      <div style={{ fontFamily: type.display, fontSize: 18, fontWeight: type.displayWeight, marginBottom: 12 }}>Capability map · Engineering Managers</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {skills.map((k) => (
          <div key={k.s}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span>{k.s}</span>
              <span style={{ fontFamily: type.mono, color: P.muted }}>L{Math.round(k.l / 25) + 1}</span>
            </div>
            <div style={{ height: 6, background: P.bg2, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${k.l}%`, height: "100%", background: k.l > 70 ? P.accent : P.ink }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function InsightsPanel({ P, type }) {
  return (
    <div style={{ fontSize: 12, height: "100%", display: "grid", gridTemplateRows: "auto 1fr", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <div>
          <div style={{ fontFamily: type.display, fontSize: 18, fontWeight: type.displayWeight }}>Engagement, last 30 days</div>
          <div style={{ color: P.muted, fontSize: 11 }}>All cohorts · weekly active</div>
        </div>
        <div style={{ fontFamily: type.mono, fontSize: 11, color: P.accent }}>+18.4% WoW</div>
      </div>
      <svg viewBox="0 0 400 120" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="A_grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={P.accent} stopOpacity=".4" />
            <stop offset="100%" stopColor={P.accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,90 L40,80 L80,84 L120,60 L160,68 L200,40 L240,46 L280,28 L320,38 L360,18 L400,24 L400,120 L0,120 Z" fill="url(#A_grad)" />
        <path d="M0,90 L40,80 L80,84 L120,60 L160,68 L200,40 L240,46 L280,28 L320,38 L360,18 L400,24" fill="none" stroke={P.accent} strokeWidth="2" />
      </svg>
    </div>
  );
}

function PricingA({ P, type, tweaks }) {
  const [annual, setAnnual] = React.useState(true);
  const tiers = [
    { n: "Team", p: annual ? 12 : 15, sub: "per learner / month", f: ["Up to 250 learners", "Programmes & cohorts", "Reporting basics", "SSO"], cta: "Start trial" },
    { n: "Business", p: annual ? 22 : 28, sub: "per learner / month", f: ["Skills graph", "Manager review flows", "HRIS sync", "Custom roles"], cta: "Book a demo", featured: true },
    { n: "Enterprise", p: null, sub: "Custom", f: ["Unlimited everything", "SCIM provisioning", "Dedicated CSM", "Audit & compliance"], cta: "Talk to sales" },
  ];
  return (
    <section style={{ padding: "120px 64px" }}>
      <Reveal>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: type.mono, fontSize: 12, color: P.muted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16 }}>05 / Pricing</div>
            <h2 style={{ fontFamily: type.display, fontSize: 56, lineHeight: 1, letterSpacing: "-0.03em", margin: 0, fontWeight: type.displayWeight }}>Simple, per-learner.</h2>
          </div>
          <div style={{ display: "inline-flex", border: `1px solid ${P.line}`, borderRadius: 999, padding: 4, background: P.surface }}>
            {[["Annual", true], ["Monthly", false]].map(([l, v]) => (
              <button key={l} onClick={() => setAnnual(v)} style={{
                padding: "8px 18px", borderRadius: 999, border: "none", cursor: "pointer", fontFamily: type.body, fontSize: 13,
                background: annual === v ? P.ink : "transparent", color: annual === v ? P.bg : P.ink,
              }}>{l}</button>
            ))}
          </div>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {tiers.map((t) => (
          <Reveal key={t.n}>
            <div style={{
              padding: 32, borderRadius: 16,
              background: t.featured ? P.ink : P.surface,
              color: t.featured ? P.bg : P.ink,
              border: `1px solid ${t.featured ? P.ink : P.line}`,
              minHeight: 380,
            }}>
              <div style={{ fontFamily: type.mono, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: t.featured ? P.muted : P.muted, marginBottom: 24 }}>{t.n}</div>
              <div style={{ fontFamily: type.display, fontSize: 56, fontWeight: type.displayWeight, letterSpacing: "-0.03em", lineHeight: 1 }}>
                {t.p ? `£${t.p}` : "Let's talk"}
              </div>
              <div style={{ fontSize: 13, color: t.featured ? P.muted : P.muted, marginTop: 8 }}>{t.sub}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "32px 0", fontSize: 14 }}>
                {t.f.map((x) => (
                  <li key={x} style={{ padding: "10px 0", borderTop: `1px solid ${t.featured ? "rgba(255,255,255,.1)" : P.line}`, display: "flex", gap: 10 }}>
                    <span style={{ color: P.accent }}>→</span>{x}
                  </li>
                ))}
              </ul>
              <button style={{
                width: "100%", padding: "14px", borderRadius: 999, fontFamily: type.body, fontSize: 14, cursor: "pointer",
                background: t.featured ? P.bg : P.ink, color: t.featured ? P.ink : P.bg,
                border: "none",
              }}>{t.cta} →</button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FAQA({ P, type }) {
  const [open, setOpen] = React.useState(0);
  const items = [
    ["Do you replace our LMS?", "For most customers, yes — Cohere covers programmes, libraries, learner experience, and reporting. For regulated industries that need an LRS of record, we plug in via xAPI."],
    ["How long does implementation take?", "Median time-to-launch is 11 working days for Team and Business plans. Enterprise white-glove migrations average 4–6 weeks including HRIS reconciliation."],
    ["Do you support cohort-based programmes?", "Yes — cohorts are first-class. Schedule live sessions, async modules, and milestone reviews together. Slack and Teams sync is included."],
    ["Can we bring our own content?", "Absolutely. SCORM 1.2 / 2004, xAPI, video, PDF, and Markdown all import natively. We also have a content partner network you can plug into."],
    ["Is Cohere SOC 2 / ISO 27001?", "SOC 2 Type II annually. ISO 27001 in progress (audit Q3 2026). Data residency available in EU and UK."],
  ];
  return (
    <section style={{ padding: "100px 64px", background: P.bg2 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64 }}>
        <div>
          <div style={{ fontFamily: type.mono, fontSize: 12, color: P.muted, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16 }}>06 / FAQ</div>
          <h2 style={{ fontFamily: type.display, fontSize: 48, lineHeight: 1, letterSpacing: "-0.03em", margin: 0, fontWeight: type.displayWeight }}>Common questions.</h2>
        </div>
        <div>
          {items.map(([q, a], i) => (
            <div key={q} style={{ borderTop: `1px solid ${P.line}`, padding: "24px 0", cursor: "pointer" }} onClick={() => setOpen(open === i ? -1 : i)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: type.display, fontSize: 22, letterSpacing: "-0.02em", fontWeight: type.displayWeight }}>{q}</div>
                <div style={{ fontFamily: type.mono, fontSize: 18, color: P.muted }}>{open === i ? "–" : "+"}</div>
              </div>
              <div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height .4s ease, margin .4s ease", marginTop: open === i ? 12 : 0 }}>
                <div style={{ color: P.muted, fontSize: 16, lineHeight: 1.55, maxWidth: 640 }}>{a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.DirectionA = DirectionA;
window.A_TWEAKS = A_TWEAKS;
window.A_PALETTES = A_PALETTES;
window.A_TYPE = A_TYPE;
window.A_HERO_COPY = A_HERO_COPY;
