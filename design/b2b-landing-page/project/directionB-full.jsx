/* Direction B (extended) — Techno-Futurist with multiple 3D moments through scroll */

const DEFAULTS_B = /*EDITMODE-BEGIN*/{
  "palette": "iris",
  "typePair": "mono",
  "mode": "dark",
  "heroCopy": "outcomes"
}/*EDITMODE-END*/;

const PB = {
  midnight: { bg: "#0A0B0D", bg2: "#111316", ink: "#E8ECEF", muted: "#6B7280", line: "rgba(232,236,239,0.10)", accent: "#6EFACC", surface: "#0F1114" },
  noir:     { bg: "#08080A", bg2: "#101012", ink: "#E8E6E2", muted: "#7A7770", line: "rgba(232,230,226,0.10)", accent: "#FF5C2B", surface: "#0E0E10" },
  iris:     { bg: "#0A0B14", bg2: "#10121E", ink: "#E8E8F0", muted: "#7779A0", line: "rgba(232,232,240,0.10)", accent: "#A78BFA", surface: "#0F1020" },
};

const TB = {
  mono:      { display: '"Space Grotesk", sans-serif', body: '"Inter Tight", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace', dw: 500 },
  grotesque: { display: '"Inter Tight", system-ui, sans-serif', body: '"Inter Tight", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace', dw: 600 },
  technical: { display: '"Space Grotesk", sans-serif', body: '"Inter Tight", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace', dw: 500 },
};

const HC_B = {
  default:  { kicker: "L&D · OS · v4.2", h1: ["The operating layer", "for learning organisations."], sub: "Programmes, skills, and outcomes — wired into the systems your business already runs on." },
  outcomes: { kicker: "OUTCOMES PROTOCOL", h1: ["Measure what", "learning actually does."], sub: "Stop reporting completions. Start reporting capability lift, business impact, and ROI." },
  team:     { kicker: "BUILT FOR L&D", h1: ["Infrastructure for", "people development."], sub: "The plumbing your L&D team has been hand-rolling in spreadsheets for a decade." },
};

/* ---------- Hooks ---------- */

function useViewport() {
  const [w, setW] = React.useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  React.useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return w;
}

function useScrollY() {
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    const on = () => setY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return y;
}

function useElementProgress(ref) {
  /* returns 0 when element top hits viewport bottom, 1 when bottom hits viewport top */
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const on = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const traveled = vh - r.top;
      setP(Math.max(0, Math.min(1, traveled / total)));
    };
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    on();
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  return p;
}

function useMouse() {
  const [m, setM] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const on = (e) => {
      setM({ x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 });
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, []);
  return m;
}

/* ---------- Atoms ---------- */

function Magnetic({ children, primary, P, font, big }) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    setT({ x: x * 0.3, y: y * 0.5 });
  };
  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{
        transform: `translate(${t.x}px, ${t.y}px)`,
        transition: "transform .25s cubic-bezier(.2,.8,.2,1), background .15s",
        background: primary ? P.accent : "transparent",
        color: primary ? "#08080A" : P.ink,
        border: `1px solid ${primary ? P.accent : P.line}`,
        padding: big ? "16px 28px" : "13px 22px",
        borderRadius: 4,
        fontFamily: font,
        fontSize: big ? 14 : 13,
        fontWeight: 500,
        letterSpacing: ".04em",
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

function CountUp({ to, suffix, duration = 1800 }) {
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
      transform: shown ? "translateY(0)" : "translateY(28px)",
      opacity: shown ? 1 : 0,
      transition: `transform 1s cubic-bezier(.2,.8,.2,1) ${delay}ms, opacity 1s ease ${delay}ms`,
    }}>{children}</div>
  );
}

/* ---------- Scroll-driven hero (Adaline-style pinned tilt) ---------- */

function ScrollHero({ P, type, copy }) {
  const stageRef = React.useRef(null);
  const [prog, setProg] = React.useState(0);
  const m = useMouse();
  const vw = useViewport();
  const stackHero = vw < 1024;

  React.useEffect(() => {
    const on = () => {
      if (!stageRef.current) return;
      const r = stageRef.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const traveled = -r.top;
      const p = Math.max(0, Math.min(1, traveled / Math.max(1, total)));
      setProg(p);
    };
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    on();
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);

  // Eased interpolation
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  if (stackHero) {
    // Below 1024px: static fallback (no pin), no scroll choreography
    return (
      <section style={{ padding: `56px ${vw < 720 ? 24 : 40}px 40px`, position: "relative", zIndex: 1 }}>
        <HeroCopy P={P} type={type} copy={copy} />
        <div style={{ marginTop: 40, perspective: 2000, display: "grid", placeItems: "center" }}>
          <div style={{ width: "100%", maxWidth: 520, transform: "rotateX(8deg) rotateY(-8deg)", transformStyle: "preserve-3d" }}>
            <DeviceFace P={P} />
          </div>
        </div>
      </section>
    );
  }

  // Phases (over total 350vh of scroll = 250vh of travel):
  //   0.00 → 0.55  rotate from tilted-back + oversized → upright + full-screen   (slow lift)
  //   0.55 → 1.00  HOLD upright, fullscreen — floating modules fade in, then unpin
  const liftEnd = 0.55;

  const liftP = Math.min(1, prog / liftEnd);
  const holdP = Math.max(0, Math.min(1, (prog - liftEnd) / (1 - liftEnd)));
  const eLift = ease(liftP);
  const eHold = ease(holdP);
  const eSettle = 0; // no shrink phase — device stays upright until unpin

  // Tilt: 62° → 0° during lift, stays 0
  const rx = 62 * (1 - eLift) + m.y * 3;
  const ry = m.x * 5;
  // Scale: 1.35 → 1.55 (full-screen) during lift, stays
  const scaleNow = 1.35 + 0.20 * eLift;
  // Y offset: 180 → 0 during lift
  const ty = 180 * (1 - eLift);
  // Floating cards: appear during HOLD
  const cardOpacity = eHold;
  const cardLift = (1 - cardOpacity) * 40;
  // Headline: drifts up slightly during lift, holds
  const headlineY = -eLift * 40;
  const headlineOpacity = 1 - eHold * 0.15;
  // Glow intensifies during lift, peaks at hold
  const glowOpacity = 0.06 + eLift * 0.14;
  // Kicker progress bars
  const accentBars = Math.floor(eLift * 8);

  return (
    <section ref={stageRef} style={{ position: "relative", height: "350vh", zIndex: 1 }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "grid", placeItems: "center",
        overflow: "hidden",
      }}>
        {/* grid floor */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `linear-gradient(${P.line} 1px, transparent 1px) 0 0/56px 56px, linear-gradient(90deg, ${P.line} 1px, transparent 1px) 0 0/56px 56px`,
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 60%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 60%, black 20%, transparent 80%)",
          opacity: 0.5 + eLift * 0.3 - eSettle * 0.15,
          transform: `translateY(${prog * 20}px)`,
        }}></div>

        {/* glow that intensifies as device comes upright */}
        <div style={{
          position: "absolute", width: 800, height: 800, borderRadius: "50%",
          background: P.accent, opacity: glowOpacity,
          filter: "blur(120px)",
          transform: `translateY(${(1 - eLift) * 100}px)`,
        }}></div>

        {/* Headline overlay */}
        <div style={{
          position: "absolute", top: "12vh", left: 0, right: 0,
          padding: `0 ${vw < 1024 ? 40 : 64}px`,
          textAlign: "center", zIndex: 3,
          transform: `translateY(${headlineY}px)`,
          opacity: headlineOpacity,
          pointerEvents: eSettle > 0.3 ? "none" : "auto",
        }}>
          <div style={{ fontFamily: type.mono, fontSize: 11, color: P.accent, letterSpacing: ".24em", textTransform: "uppercase", marginBottom: 28, display: "inline-flex", alignItems: "center", gap: 14 }}>
            <span style={{ display: "inline-flex", gap: 3 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} style={{ display: "inline-block", width: 6, height: 1, background: i < accentBars ? P.accent : P.line }}></span>
              ))}
            </span>
            {copy.kicker}
          </div>
          <h1 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: type.dw,
            fontSize: "clamp(56px, 7vw, 112px)",
            lineHeight: 0.96,
            letterSpacing: "-0.045em",
            margin: 0,
            color: P.ink,
            maxWidth: 1200,
            marginInline: "auto",
          }}>
            {copy.h1.map((line, i) => <div key={i}>{line}</div>)}
          </h1>
        </div>

        {/* CTA reveal during hold */}
        <div style={{
          position: "absolute", bottom: "8vh", left: 0, right: 0,
          textAlign: "center", zIndex: 3,
          opacity: eHold,
          transform: `translateY(${(1 - eHold) * 30}px)`,
          pointerEvents: eHold > 0.5 ? "auto" : "none",
        }}>
          <p style={{ fontSize: 17, color: P.muted, maxWidth: 560, margin: "0 auto 24px", lineHeight: 1.55 }}>{copy.sub}</p>
          <div style={{ display: "inline-flex", gap: 12 }}>
            <Magnetic primary P={P} font={type.mono} big>Request access →</Magnetic>
            <Magnetic P={P} font={type.mono} big>Read the docs</Magnetic>
          </div>
        </div>

        {/* The device stage */}
        <div style={{ perspective: 2400, perspectiveOrigin: "50% 30%", width: "100%", height: "100%", position: "absolute", inset: 0, display: "grid", placeItems: "center", zIndex: 2 }}>
          <div style={{
            transformStyle: "preserve-3d",
            transform: `translateY(${ty}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scaleNow})`,
            transition: "transform .15s linear",
            width: 760, height: 480, position: "relative",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: P.surface,
              border: `1px solid ${P.accent}`,
              boxShadow: `0 0 0 1px ${P.accent}33, 0 80px 140px rgba(0,0,0,.75)`,
              padding: 24,
              fontFamily: '"JetBrains Mono", monospace',
              color: P.ink,
              fontSize: 12,
            }}>
              <DeviceFace P={P} />
            </div>

            {/* Floating side modules - fade in late */}
            <div style={{
              position: "absolute", left: -240, top: 60, width: 260,
              background: P.surface, border: `1px solid ${P.line}`, padding: 18,
              fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: P.ink,
              transform: `translateZ(180px) rotateY(10deg) translateX(${-cardLift}px)`,
              opacity: cardOpacity,
              transition: "opacity .2s",
              boxShadow: "0 30px 60px rgba(0,0,0,.6)",
            }}>
              <div style={{ color: P.muted, fontSize: 10, marginBottom: 12, letterSpacing: ".14em" }}>// SKILL_GRAPH / EM</div>
              {[["coaching", 78], ["delegation", 41], ["feedback", 84]].map(([s, v]) => (
                <div key={s} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>{s}</span><span style={{ color: P.accent }}>L{Math.round(v/25)+1}</span></div>
                  <div style={{ height: 2, background: P.line, marginTop: 4 }}>
                    <div style={{ width: `${v}%`, height: "100%", background: P.accent }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              position: "absolute", right: -200, bottom: 20, width: 240,
              background: P.surface, border: `1px solid ${P.line}`, padding: 16,
              fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: P.ink,
              transform: `translateZ(220px) rotateY(-12deg) translateX(${cardLift}px)`,
              opacity: cardOpacity,
              transition: "opacity .2s",
              boxShadow: "0 30px 60px rgba(0,0,0,.6)",
            }}>
              <div style={{ color: P.accent, fontSize: 10, marginBottom: 8, letterSpacing: ".15em" }}>● COHORT_07 SYNCED</div>
              <div style={{ fontSize: 12, marginBottom: 4, fontFamily: '"Space Grotesk", sans-serif' }}>14 learners enrolled</div>
              <div style={{ color: P.muted, fontSize: 10 }}>auto-provisioned · 2s ago</div>
            </div>

            <div style={{
              position: "absolute", right: -120, top: -50, width: 200,
              background: P.surface, border: `1px solid ${P.line}`, padding: 14,
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: P.ink,
              transform: `translateZ(240px) rotateY(-6deg) translateY(${-cardLift}px)`,
              opacity: cardOpacity,
              transition: "opacity .2s",
              boxShadow: "0 30px 60px rgba(0,0,0,.6)",
            }}>
              <div style={{ display: "flex", gap: 4, alignItems: "end", height: 32, marginBottom: 8 }}>
                {[40, 60, 50, 78, 65, 90, 72].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 5 ? P.accent : P.line }}></div>
                ))}
              </div>
              <div style={{ color: P.muted, fontSize: 9 }}>// ENGAGEMENT / 7d</div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
          fontFamily: type.mono, fontSize: 10, color: P.muted, letterSpacing: ".2em",
          opacity: prog < 0.08 ? 1 : 0, transition: "opacity .3s",
        }}>SCROLL ↓</div>
      </div>
    </section>
  );
}

function HeroCopy({ P, type, copy }) {
  return (
    <div>
      <div style={{ fontFamily: type.mono, fontSize: 11, color: P.accent, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 32, display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ display: "inline-block", width: 28, height: 1, background: P.accent }}></span>
        {copy.kicker}
      </div>
      <h1 style={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: type.dw,
        fontSize: "clamp(48px, 7vw, 88px)",
        lineHeight: 0.97,
        letterSpacing: "-0.04em",
        margin: 0,
      }}>
        {copy.h1.map((line, i) => <div key={i}>{line}</div>)}
      </h1>
      <p style={{ fontSize: 17, color: P.muted, maxWidth: 500, marginTop: 28, lineHeight: 1.55 }}>{copy.sub}</p>
      <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
        <Magnetic primary P={P} font={type.mono} big>Request access →</Magnetic>
        <Magnetic P={P} font={type.mono} big>Read the docs</Magnetic>
      </div>
    </div>
  );
}

function DeviceFace({ P }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 10, marginBottom: 16, letterSpacing: ".1em", fontFamily: '"JetBrains Mono", monospace' }}>
        <span>cohere://outcomes/q2-2026</span>
        <span style={{ color: P.accent }}>● LIVE</span>
      </div>
      <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 26, marginBottom: 18, letterSpacing: "-.02em", color: P.ink }}>Capability Lift · Q2 2026</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 18 }}>
        {[["LEARNERS", "1,240"], ["LIFT", "+34%"], ["NPS", "72"], ["ROI", "4.2×"]].map(([k, v]) => (
          <div key={k} style={{ border: `1px solid ${P.line}`, padding: "12px 14px" }}>
            <div style={{ color: P.muted, fontSize: 9, letterSpacing: ".14em", fontFamily: '"JetBrains Mono", monospace' }}>{k}</div>
            <div style={{ fontSize: 22, color: ["LIFT","ROI"].includes(k) ? P.accent : P.ink, fontFamily: '"Space Grotesk", sans-serif' }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, border: `1px solid ${P.line}`, padding: 14, position: "relative", minHeight: 130 }}>
        <svg viewBox="0 0 400 90" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          {[20, 45, 70].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke={P.line} />)}
          <path d="M0,70 L40,62 L80,66 L120,48 L160,52 L200,34 L240,38 L280,20 L320,24 L360,12 L400,16"
            fill="none" stroke={P.accent} strokeWidth="1.5" />
          <path d="M0,70 L40,62 L80,66 L120,48 L160,52 L200,34 L240,38 L280,20 L320,24 L360,12 L400,16 L400,90 L0,90 Z"
            fill={P.accent} fillOpacity=".10" />
          {[[0,70],[80,66],[160,52],[240,38],[320,24],[400,16]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="3" fill={P.bg} stroke={P.accent} strokeWidth="1.2" />
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ---------- (Legacy) Hero3D — unused, kept for reference ---------- */

function Hero3D({ P }) {
  const wrap = React.useRef(null);
  const m = useMouse();
  const vw = useViewport();
  const compact = vw < 1280;
  const tilt = { rx: 8 + m.y * 8, ry: -16 + m.x * 14, rz: m.x * 1.5 };
  const W = compact ? 460 : 600;
  const H = compact ? 320 : 400;
  const sideOffset = compact ? -130 : -200;
  const sideWidth = compact ? 200 : 240;
  const topW = compact ? 150 : 180;

  return (
    <div ref={wrap} style={{ perspective: 2200, width: "100%", height: compact ? 520 : 640, display: "grid", placeItems: "center", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(${P.line} 1px, transparent 1px) 0 0/48px 48px, linear-gradient(90deg, ${P.line} 1px, transparent 1px) 0 0/48px 48px`,
        maskImage: "radial-gradient(ellipse 70% 60% at center, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at center, black 30%, transparent 75%)",
        opacity: .7,
      }}></div>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: P.accent, opacity: .10, filter: "blur(100px)" }}></div>

      <div style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) rotateZ(${tilt.rz}deg)`,
        transition: "transform .5s cubic-bezier(.2,.8,.2,1)",
        width: W, height: H, position: "relative",
      }}>
        {/* main panel */}
        <div style={{
          position: "absolute", inset: 0,
          background: P.surface,
          border: `1px solid ${P.accent}`,
          boxShadow: `0 0 0 1px ${P.accent}33, 0 60px 100px rgba(0,0,0,.7)`,
          padding: 20,
          fontFamily: '"JetBrains Mono", monospace',
          color: P.ink,
          fontSize: 11,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 10, marginBottom: 16, letterSpacing: ".08em" }}>
            <span>cohere://outcomes/q2-2026</span>
            <span style={{ color: P.accent }}>● LIVE</span>
          </div>
          <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, marginBottom: 16, letterSpacing: "-.02em" }}>Capability Lift · Q2 2026</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 18 }}>
            {[["LEARNERS", "1,240"], ["LIFT", "+34%"], ["NPS", "72"], ["ROI", "4.2×"]].map(([k, v]) => (
              <div key={k} style={{ border: `1px solid ${P.line}`, padding: "10px 12px" }}>
                <div style={{ color: P.muted, fontSize: 9, letterSpacing: ".12em" }}>{k}</div>
                <div style={{ fontSize: 20, color: ["LIFT","ROI"].includes(k) ? P.accent : P.ink, fontFamily: '"Space Grotesk", sans-serif' }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 110, border: `1px solid ${P.line}`, padding: 12, position: "relative" }}>
            <svg viewBox="0 0 400 80" style={{ width: "100%", height: "100%" }}>
              {[20, 40, 60].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke={P.line} />)}
              <path d="M0,60 L40,55 L80,58 L120,42 L160,46 L200,30 L240,34 L280,18 L320,22 L360,10 L400,14"
                fill="none" stroke={P.accent} strokeWidth="1.5" />
              <path d="M0,60 L40,55 L80,58 L120,42 L160,46 L200,30 L240,34 L280,18 L320,22 L360,10 L400,14 L400,80 L0,80 Z"
                fill={P.accent} fillOpacity=".08" />
              {[[0,60],[80,58],[160,46],[240,34],[320,22],[400,14]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="2.5" fill={P.bg} stroke={P.accent} strokeWidth="1" />
              ))}
            </svg>
          </div>
        </div>

        {/* floating modules */}
        <div style={{
          position: "absolute", left: sideOffset, top: 50, width: sideWidth,
          background: P.surface, border: `1px solid ${P.line}`, padding: 16,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: P.ink,
          transform: "translateZ(160px) rotateY(8deg)",
          boxShadow: "0 30px 60px rgba(0,0,0,.6)",
        }}>
          <div style={{ color: P.muted, fontSize: 9, marginBottom: 10, letterSpacing: ".12em" }}>// SKILL_GRAPH / EM</div>
          {[["coaching", 78], ["delegation", 41], ["feedback", 84]].map(([s, v]) => (
            <div key={s} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>{s}</span><span style={{ color: P.accent }}>L{Math.round(v/25)+1}</span></div>
              <div style={{ height: 2, background: P.line, marginTop: 4 }}>
                <div style={{ width: `${v}%`, height: "100%", background: P.accent }}></div>
              </div>
            </div>
          ))}
        </div>
        <div style={{
          position: "absolute", right: sideOffset, bottom: 0, width: sideWidth - 20,
          background: P.surface, border: `1px solid ${P.line}`, padding: 14,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: P.ink,
          transform: "translateZ(200px) rotateY(-12deg)",
          boxShadow: "0 30px 60px rgba(0,0,0,.6)",
        }}>
          <div style={{ color: P.accent, fontSize: 9, marginBottom: 6, letterSpacing: ".14em" }}>● COHORT_07 SYNCED</div>
          <div style={{ fontSize: 11, marginBottom: 4, fontFamily: '"Space Grotesk", sans-serif' }}>14 learners enrolled</div>
          <div style={{ color: P.muted, fontSize: 9 }}>auto-provisioned from Workday · 2s ago</div>
        </div>
        <div style={{
          position: "absolute", right: compact ? -60 : -100, top: -40, width: topW,
          background: P.surface, border: `1px solid ${P.line}`, padding: 12,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: P.ink,
          transform: "translateZ(220px) rotateY(-6deg)",
          boxShadow: "0 30px 60px rgba(0,0,0,.6)",
        }}>
          <div style={{ display: "flex", gap: 4, alignItems: "end", height: 30, marginBottom: 8 }}>
            {[40, 60, 50, 78, 65, 90, 72].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 5 ? P.accent : P.line }}></div>
            ))}
          </div>
          <div style={{ color: P.muted, fontSize: 9 }}>// ENGAGEMENT / 7d</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 3D MOMENT 2 — Rotating skill-graph cube ---------- */

function SkillCube({ P }) {
  const ref = React.useRef(null);
  const prog = useElementProgress(ref);
  const m = useMouse();
  const ry = prog * 360 + m.x * 20;
  const rx = -15 + m.y * 10;

  const faces = [
    { label: "COACHING", value: 78, bg: P.surface },
    { label: "FEEDBACK", value: 84, bg: P.surface },
    { label: "STRATEGY", value: 54, bg: P.surface },
    { label: "DELEGATION", value: 41, bg: P.surface },
    { label: "STORYTELLING", value: 62, bg: P.surface },
    { label: "PRIORITISATION", value: 33, bg: P.surface },
  ];

  const size = 240;
  const half = size / 2;
  const transforms = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  return (
    <div ref={ref} style={{ perspective: 1400, width: "100%", height: 480, display: "grid", placeItems: "center" }}>
      <div style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
        transition: "transform .3s cubic-bezier(.2,.8,.2,1)",
        width: size, height: size, position: "relative",
      }}>
        {faces.map((f, i) => (
          <div key={i} style={{
            position: "absolute", width: size, height: size,
            background: f.bg,
            border: `1px solid ${P.accent}`,
            boxShadow: `inset 0 0 0 1px ${P.accent}22`,
            transform: transforms[i],
            display: "grid", placeItems: "center",
            padding: 20, color: P.ink,
            fontFamily: '"JetBrains Mono", monospace',
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: P.muted, letterSpacing: ".15em", marginBottom: 12 }}>// SKILL</div>
              <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, marginBottom: 16, letterSpacing: "-.01em" }}>{f.label}</div>
              <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 56, color: P.accent, lineHeight: 1, letterSpacing: "-.04em" }}>{f.value}</div>
              <div style={{ fontSize: 10, color: P.muted, marginTop: 8, letterSpacing: ".1em" }}>L{Math.round(f.value / 25) + 1} · TEAM AVG</div>
              <div style={{ height: 2, background: P.line, marginTop: 16 }}>
                <div style={{ width: `${f.value}%`, height: "100%", background: P.accent }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 3D MOMENT 3 — Layered card stack (parallax on scroll) ---------- */

function CardStack({ P }) {
  const ref = React.useRef(null);
  const prog = useElementProgress(ref);

  /* prog: 0..1, expand cards as you scroll past */
  const z = (i) => -120 + i * (40 + prog * 80);
  const ty = (i) => i * (12 - prog * 24);
  const opacity = (i) => Math.max(0.4, 1 - i * 0.18 + prog * 0.4);

  const cards = [
    { code: "RPRT", title: "CFO-grade reports", body: "Per-cohort, per-team, per-skill. Export to CSV, Looker, Snowflake — or our API." },
    { code: "SYNC", title: "Live HRIS sync", body: "Workday, BambooHR, Personio, Hibob. Cohorts auto-provision from your org of record." },
    { code: "EVNT", title: "Live + async, fused", body: "Cohort sessions, async modules, peer reviews — one timeline, one inbox, one calendar." },
    { code: "CALI", title: "Manager calibrations", body: "Periodic skill calibrations baked into the manager workflow. No more spreadsheets." },
  ];

  return (
    <div ref={ref} style={{ perspective: 1800, width: "100%", height: 520, display: "grid", placeItems: "center", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.5,
        background: `linear-gradient(${P.line} 1px, transparent 1px) 0 0/40px 40px, linear-gradient(90deg, ${P.line} 1px, transparent 1px) 0 0/40px 40px`,
        maskImage: "radial-gradient(ellipse 50% 50% at center, black, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse 50% 50% at center, black, transparent 70%)",
      }}></div>
      <div style={{ transformStyle: "preserve-3d", width: 480, height: 280, position: "relative" }}>
        {cards.map((c, i) => (
          <div key={c.code} style={{
            position: "absolute", inset: 0,
            background: P.surface,
            border: `1px solid ${i === 0 ? P.accent : P.line}`,
            padding: 28,
            transform: `translateZ(${z(i)}px) translateY(${ty(i)}px)`,
            transition: "transform .3s ease-out, opacity .3s",
            opacity: opacity(i),
            boxShadow: `0 30px 60px rgba(0,0,0,.4)`,
            color: P.ink,
            fontFamily: '"JetBrains Mono", monospace',
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 10, marginBottom: 20, letterSpacing: ".15em" }}>
              <span style={{ color: P.accent }}>// {c.code}</span>
              <span>0{i + 1} / 0{cards.length}</span>
            </div>
            <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 28, letterSpacing: "-.02em", marginBottom: 12 }}>{c.title}</div>
            <div style={{ color: P.muted, fontSize: 13, lineHeight: 1.55, fontFamily: '"Inter Tight", sans-serif' }}>{c.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Surfaces panel ---------- */

function PanelB({ tab, P }) {
  if (tab === 0) return (
    <div style={{ fontSize: 11, fontFamily: '"JetBrains Mono", monospace', color: P.ink }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 10, marginBottom: 12 }}>
        <span>$ programmes --status active</span><span>4 results</span>
      </div>
      {[["manager-essentials", 124, 64], ["sales-onboarding", 38, 88], ["senior-ic-capability", 61, 21], ["compliance-q2", 412, 95]].map(([n, c, p]) => (
        <div key={n} style={{ display: "grid", gridTemplateColumns: "1.4fr 60px 1fr 50px", gap: 10, alignItems: "center", padding: "10px 0", borderTop: `1px solid ${P.line}` }}>
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
      <div style={{ fontFamily: '"JetBrains Mono", monospace', color: P.muted, fontSize: 10, marginBottom: 8 }}>// LEARNER: olu_a (cohort_07)</div>
      <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, marginBottom: 18, letterSpacing: "-.02em" }}>Two things due today.</div>
      <div style={{ display: "grid", gap: 10 }}>
        {[["coaching-practice-03", "12 min", "5pm"], ["peer-review/marcus", "8 min", "EOD"]].map(([t, d, due]) => (
          <div key={t} style={{ border: `1px solid ${P.line}`, padding: 14, display: "grid", gridTemplateColumns: "1fr auto", gap: 8, fontFamily: '"JetBrains Mono", monospace', fontSize: 11 }}>
            <div><div style={{ color: P.ink }}>▸ {t}</div><div style={{ color: P.muted, fontSize: 10, marginTop: 2 }}>{d}</div></div>
            <div style={{ color: P.accent, alignSelf: "center", fontSize: 10 }}>DUE {due}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: P.muted }}>● 14d streak — keep going</div>
    </div>
  );
  if (tab === 2) return (
    <div style={{ fontSize: 11, color: P.ink, fontFamily: '"JetBrains Mono", monospace' }}>
      <div style={{ color: P.muted, fontSize: 10, marginBottom: 14 }}>// SKILLS / engineering_managers</div>
      {[["coaching", 78], ["strategic_thinking", 54], ["storytelling", 62], ["delegation", 41], ["feedback", 84], ["prioritisation", 33]].map(([s, v]) => (
        <div key={s} style={{ display: "grid", gridTemplateColumns: "1fr 80px 30px", gap: 10, alignItems: "center", padding: "6px 0" }}>
          <div>{s}</div>
          <div style={{ height: 3, background: P.line }}><div style={{ width: `${v}%`, height: "100%", background: v > 70 ? P.accent : P.ink }}></div></div>
          <div style={{ textAlign: "right", color: v > 70 ? P.accent : P.muted }}>L{Math.round(v / 25) + 1}</div>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ fontSize: 11, color: P.ink, height: "100%", display: "grid", gridTemplateRows: "auto 1fr", fontFamily: '"JetBrains Mono", monospace' }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
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

/* ---------- Pricing ---------- */

function Pricing({ P, type, vw, padX }) {
  const [annual, setAnnual] = React.useState(true);
  const display = '"Space Grotesk", sans-serif';
  const tiers = [
    { n: "TEAM", p: annual ? 12 : 15, f: ["Up to 250 learners", "Programmes & cohorts", "Reporting basics", "SSO"], cta: "Start trial" },
    { n: "BUSINESS", p: annual ? 22 : 28, f: ["Skills graph", "Manager review flows", "HRIS sync", "Custom roles"], cta: "Request access", featured: true },
    { n: "ENTERPRISE", p: null, f: ["Unlimited everything", "SCIM provisioning", "Dedicated CSM", "Audit & compliance"], cta: "Talk to sales" },
  ];
  return (
    <section style={{ padding: `120px ${padX}px`, borderTop: `1px solid ${P.line}`, position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56 }}>
        <div>
          <div style={{ fontFamily: type.mono, fontSize: 11, color: P.accent, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 16 }}>§06 / PRICING</div>
          <h2 style={{ fontFamily: display, fontSize: 64, lineHeight: 0.98, letterSpacing: "-0.035em", margin: 0, fontWeight: type.dw }}>Per-learner. No surprises.</h2>
        </div>
        <div style={{ display: "inline-flex", border: `1px solid ${P.line}`, padding: 4 }}>
          {[["ANNUAL", true], ["MONTHLY", false]].map(([l, v]) => (
            <button key={l} onClick={() => setAnnual(v)} style={{
              padding: "10px 20px", border: "none", cursor: "pointer", fontFamily: type.mono, fontSize: 11, letterSpacing: ".1em",
              background: annual === v ? P.accent : "transparent", color: annual === v ? "#08080A" : P.ink,
            }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: vw < 900 ? "1fr" : "repeat(3, 1fr)", border: `1px solid ${P.line}` }}>
        {tiers.map((t, i) => (
          <div key={t.n} style={{
            padding: 36,
            background: t.featured ? P.bg2 : P.surface,
            borderRight: i < 2 ? `1px solid ${P.line}` : "none",
            position: "relative",
            minHeight: 460,
          }}>
            {t.featured && <div style={{ position: "absolute", top: 20, right: 20, fontFamily: type.mono, fontSize: 10, color: P.accent, letterSpacing: ".15em" }}>● MOST DEPLOYED</div>}
            <div style={{ fontFamily: type.mono, fontSize: 11, letterSpacing: ".15em", color: P.muted, marginBottom: 28 }}>// {t.n}</div>
            <div style={{ fontFamily: display, fontSize: 72, fontWeight: type.dw, letterSpacing: "-0.04em", lineHeight: 1, color: t.featured ? P.accent : P.ink }}>
              {t.p ? `£${t.p}` : "Custom"}
            </div>
            <div style={{ fontSize: 12, color: P.muted, marginTop: 10, fontFamily: type.mono, letterSpacing: ".06em" }}>{t.p ? "PER LEARNER / MO" : "VOLUME LICENSING"}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "36px 0", fontSize: 13, fontFamily: type.mono }}>
              {t.f.map((x) => (
                <li key={x} style={{ padding: "10px 0", borderTop: `1px solid ${P.line}`, display: "flex", gap: 10, color: P.ink }}>
                  <span style={{ color: P.accent }}>+</span>{x}
                </li>
              ))}
            </ul>
            <button style={{
              width: "100%", padding: "14px", fontFamily: type.mono, fontSize: 12, cursor: "pointer", letterSpacing: ".1em", textTransform: "uppercase",
              background: t.featured ? P.accent : "transparent", color: t.featured ? "#08080A" : P.ink,
              border: `1px solid ${t.featured ? P.accent : P.line}`,
            }}>{t.cta} →</button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function FAQ({ P, type, vw, padX }) {
  const [open, setOpen] = React.useState(0);
  const display = '"Space Grotesk", sans-serif';
  const items = [
    ["Do you replace our LMS?", "For most customers, yes — Cohere covers programmes, libraries, learner experience, and reporting. For regulated industries that need an LRS of record, we plug in via xAPI."],
    ["How long is implementation?", "Median time-to-launch is 11 working days for Team and Business. Enterprise migrations: 4–6 weeks including HRIS reconciliation."],
    ["Cohort-based programmes?", "First-class. Live sessions, async modules, and milestone reviews together. Slack and Teams sync included."],
    ["Bring our own content?", "SCORM 1.2 / 2004, xAPI, video, PDF, Markdown — all native. Content partner network on top."],
    ["SOC 2 / ISO 27001?", "SOC 2 Type II annually. ISO 27001 in audit Q3 2026. EU and UK data residency available."],
    ["Pricing for non-profits or academia?", "50% off Business tier for registered non-profits. Education licensing available — talk to sales."],
  ];
  return (
    <section style={{ padding: `120px ${padX}px`, borderTop: `1px solid ${P.line}`, position: "relative", zIndex: 1, background: P.bg2 }}>
      <div style={{ display: "grid", gridTemplateColumns: vw < 900 ? "1fr" : "1fr 2fr", gap: vw < 900 ? 32 : 64 }}>
        <div>
          <div style={{ fontFamily: type.mono, fontSize: 11, color: P.accent, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 16 }}>§07 / FAQ</div>
          <h2 style={{ fontFamily: display, fontSize: 48, lineHeight: 0.98, letterSpacing: "-0.035em", margin: 0, fontWeight: type.dw }}>Common questions.</h2>
        </div>
        <div>
          {items.map(([q, a], i) => (
            <div key={q} style={{ borderTop: `1px solid ${P.line}`, padding: "24px 0", cursor: "pointer" }} onClick={() => setOpen(open === i ? -1 : i)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
                  <span style={{ fontFamily: type.mono, fontSize: 11, color: P.muted }}>0{i + 1}</span>
                  <span style={{ fontFamily: display, fontSize: 22, letterSpacing: "-0.02em", fontWeight: type.dw }}>{q}</span>
                </div>
                <div style={{ fontFamily: type.mono, fontSize: 16, color: P.accent }}>{open === i ? "[–]" : "[+]"}</div>
              </div>
              <div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height .4s ease, margin .4s ease", marginTop: open === i ? 12 : 0, marginLeft: 32 }}>
                <div style={{ color: P.muted, fontSize: 15, lineHeight: 1.55, maxWidth: 680 }}>{a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- The full page ---------- */

function DirectionBFull({ tweaks }) {
  const palette = PB[tweaks.palette] || PB.iris;
  const type = TB[tweaks.typePair] || TB.mono;
  const copy = HC_B[tweaks.heroCopy] || HC_B.outcomes;
  const light = tweaks.mode === "light";
  const P = light
    ? { ...palette, bg: "#F4F4F1", bg2: "#EAEAE5", ink: "#0A0B0D", muted: "#6B7280", line: "rgba(10,11,13,0.10)", surface: "#FFFFFF" }
    : palette;

  const vw = useViewport();
  const compactNav = vw < 1180;
  const stackHero = vw < 1024;
  const padX = vw < 720 ? 24 : vw < 1024 ? 40 : 64;

  const display = '"Space Grotesk", sans-serif';
  const [tab, setTab] = React.useState(0);
  const tabs = ["00 / Programmes", "01 / Learner", "02 / Skills", "03 / Insights"];

  return (
    <div style={{ background: P.bg, color: P.ink, fontFamily: type.body, minHeight: "100vh", letterSpacing: "-0.005em", position: "relative", overflowX: "hidden" }}>
      {/* persistent scanline grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(${P.line} 1px, transparent 1px)`,
        backgroundSize: "100% 4px",
        opacity: .35, mixBlendMode: light ? "multiply" : "screen",
      }}></div>

      {/* Nav */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: `20px ${padX}px`, borderBottom: `1px solid ${P.line}`, position: "sticky", top: 0, zIndex: 50, background: `${P.bg}E8`, backdropFilter: "blur(12px)", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: compactNav ? 24 : 40, minWidth: 0, flex: 1 }}>
          <div style={{ fontFamily: type.mono, fontSize: 14, letterSpacing: ".12em", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <span style={{ width: 10, height: 10, background: P.accent, display: "inline-block" }}></span>
            COHERE/OS
          </div>
          {!compactNav && (
            <div style={{ display: "flex", gap: 24, fontSize: 12, color: P.muted, fontFamily: type.mono, textTransform: "uppercase", letterSpacing: ".1em" }}>
              {["Platform", "Protocols", "Customers", "Pricing", "Docs"].map((x) => (
                <a key={x} href="#" style={{ color: "inherit", textDecoration: "none" }}>{x}</a>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexShrink: 0 }}>
          {!compactNav && <a href="#" style={{ color: P.ink, fontSize: 12, textDecoration: "none", fontFamily: type.mono, textTransform: "uppercase", letterSpacing: ".1em" }}>Sign in</a>}
          <Magnetic primary P={P} font={type.mono}>{compactNav ? "Access →" : "Request access →"}</Magnetic>
        </div>
      </nav>

      {/* Hero — pinned scroll-driven 3D rotation */}
      <ScrollHero P={P} type={type} copy={copy} />

      {/* Trust strip */}
      <section style={{ padding: `40px ${padX}px`, borderTop: `1px solid ${P.line}`, position: "relative", zIndex: 1, background: P.bg }}>
        <div style={{ display: "grid", gridTemplateColumns: vw < 720 ? "1fr 1fr" : "repeat(3, auto)", gap: 32, justifyContent: vw < 720 ? "stretch" : "center", fontSize: 11, color: P.muted, fontFamily: type.mono, letterSpacing: ".08em", textTransform: "uppercase" }}>
          <div style={{ textAlign: "center" }}><div style={{ color: P.ink, fontSize: 22, marginBottom: 6, fontFamily: display }}>SOC 2</div>Type II</div>
          <div style={{ textAlign: "center" }}><div style={{ color: P.ink, fontSize: 22, marginBottom: 6, fontFamily: display }}>SCIM</div>+ SSO</div>
          <div style={{ textAlign: "center" }}><div style={{ color: P.ink, fontSize: 22, marginBottom: 6, fontFamily: display }}>xAPI</div>+ SCORM</div>
        </div>
      </section>

      {/* Logo bar */}
      <section style={{ padding: `32px ${padX}px`, borderTop: `1px solid ${P.line}`, borderBottom: `1px solid ${P.line}`, position: "relative", zIndex: 1, background: P.bg }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <div style={{ fontFamily: type.mono, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: P.muted }}>
            // DEPLOYED AT
          </div>
          {["NORTHWIND", "HALCYON.IO", "MERIDIAN", "PARALLAX", "LUMEN/CO", "FIELDNOTE"].map((l) => (
            <div key={l} style={{ fontFamily: type.mono, fontSize: 14, letterSpacing: ".12em", opacity: .7 }}>{l}</div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section style={{ padding: `140px ${padX}px`, position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: vw < 900 ? "1fr" : "1fr 1fr", gap: 48, marginBottom: 72, alignItems: "end" }}>
            <div>
              <div style={{ fontFamily: type.mono, fontSize: 11, color: P.muted, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 24 }}>§02 / PROTOCOLS</div>
              <h2 style={{ fontFamily: display, fontSize: 72, lineHeight: 0.98, letterSpacing: "-0.04em", margin: 0, fontWeight: type.dw }}>
                Six modules.<br />One spec.
              </h2>
            </div>
            <div style={{ color: P.muted, fontSize: 16, lineHeight: 1.6, maxWidth: 480 }}>
              Cohere is composed, not bundled. Each module ships its own API, schema, and webhook surface — pick the ones you need today and grow into the rest.
            </div>
          </div>
        </Reveal>
        <div style={{ border: `1px solid ${P.line}`, display: "grid", gridTemplateColumns: vw < 900 ? "1fr" : vw < 1180 ? "repeat(2, 1fr)" : "repeat(3, 1fr)" }}>
          {[
            { code: "PROG", t: "Programmes", d: "Compose multi-module learning programmes from primitives. Cohorts, milestones, approvals." },
            { code: "LEAR", t: "Learner OS", d: "A daily home for learners. Streaks, nudges, async + live, mobile-first." },
            { code: "SKIL", t: "Skill graph", d: "Roles, levels, calibrations. The capability map your org has been missing." },
            { code: "EVNT", t: "Live sessions", d: "Schedule, run, and capture live cohort sessions. Auto-transcript, highlights, async catchup." },
            { code: "RPRT", t: "Reporting", d: "Dashboards your CFO will read. Per-cohort, per-team, per-skill. CSV + API export." },
            { code: "SYNC", t: "Integrations", d: "HRIS, SSO, calendar, Slack, Teams, Workday. Webhooks for the rest." },
          ].map((f, i) => (
            <Reveal key={f.code} delay={i * 80}>
              <div style={{
                padding: 36, minHeight: 280,
                borderRight: i % 3 !== 2 ? `1px solid ${P.line}` : "none",
                borderBottom: i < 3 ? `1px solid ${P.line}` : "none",
                position: "relative",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 36 }}>
                  <span style={{ fontFamily: type.mono, fontSize: 10, color: P.accent, letterSpacing: ".18em" }}>// {f.code}</span>
                  <span style={{ fontFamily: type.mono, fontSize: 10, color: P.muted }}>0{i + 1}</span>
                </div>
                <div style={{ fontFamily: display, fontSize: 28, marginBottom: 14, letterSpacing: "-0.02em", fontWeight: type.dw }}>{f.t}</div>
                <div style={{ color: P.muted, fontSize: 14, lineHeight: 1.6 }}>{f.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3D MOMENT 2 — rotating skill cube */}
      <section style={{ padding: `60px ${padX}px 140px`, position: "relative", zIndex: 1, borderTop: `1px solid ${P.line}` }}>
        <div style={{ display: "grid", gridTemplateColumns: vw < 1024 ? "1fr" : "1fr 1fr", gap: vw < 1024 ? 48 : 64, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: type.mono, fontSize: 11, color: P.accent, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 24 }}>§03 / SKILL GRAPH</div>
            <h2 style={{ fontFamily: display, fontSize: 64, lineHeight: 0.98, letterSpacing: "-0.04em", margin: 0, fontWeight: type.dw, marginBottom: 24 }}>
              Every skill,<br />every level, every team.
            </h2>
            <p style={{ color: P.muted, fontSize: 17, lineHeight: 1.55, maxWidth: 460, marginBottom: 32 }}>
              Cohere builds a live capability graph from your role definitions, calibrations, and learner activity. Spot capability gaps before the org chart asks for them.
            </p>
            <div style={{ display: "grid", gap: 12, fontFamily: type.mono, fontSize: 13, color: P.ink }}>
              {[
                ["▸", "Role definitions versioned in Git or via API"],
                ["▸", "Manager calibration cycles (quarterly default)"],
                ["▸", "Auto-derived skill signals from activity"],
                ["▸", "Per-team, per-region, per-tenure rollups"],
              ].map(([m, t]) => (
                <div key={t} style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: P.accent }}>{m}</span><span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <SkillCube P={P} />
        </div>
      </section>

      {/* Surfaces — tabbed showcase */}
      <section style={{ padding: `80px ${padX}px 120px`, position: "relative", zIndex: 1, borderTop: `1px solid ${P.line}` }}>
        <Reveal>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: type.mono, fontSize: 11, color: P.muted, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 20 }}>§04 / SURFACES</div>
            <h2 style={{ fontFamily: display, fontSize: 64, lineHeight: 0.98, letterSpacing: "-0.04em", margin: 0, fontWeight: type.dw }}>Inside the system.</h2>
          </div>
        </Reveal>
        <div style={{ display: "flex", gap: 0, marginBottom: 0, borderBottom: `1px solid ${P.line}` }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              padding: "18px 28px", fontFamily: type.mono, fontSize: 12, cursor: "pointer", letterSpacing: ".12em", textTransform: "uppercase",
              background: "transparent", color: tab === i ? P.accent : P.muted,
              border: "none", borderBottom: `2px solid ${tab === i ? P.accent : "transparent"}`,
              transition: "all .2s", marginBottom: -1,
            }}>{t}</button>
          ))}
        </div>
        <Reveal>
          <div style={{ aspectRatio: "16/8", background: P.surface, border: `1px solid ${P.line}`, borderTop: "none", padding: 28, display: "grid", gridTemplateColumns: "280px 1fr", gap: 28 }}>
            <div>
              <div style={{ fontFamily: type.mono, fontSize: 10, color: P.accent, letterSpacing: ".15em", marginBottom: 10 }}>// SURFACE_{String(tab).padStart(2, "0")}</div>
              <div style={{ fontFamily: display, fontSize: 26, marginBottom: 16, fontWeight: type.dw, letterSpacing: "-.02em" }}>{tabs[tab].split("/ ")[1]}</div>
              <div style={{ color: P.muted, fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                {[
                  "Compose programmes from cohorts, milestones, and content blocks. Versioned and approvable.",
                  "A learner home built around time and intent, not catalogue browsing.",
                  "Your org's capability mapped against roles. Calibrated by managers, audited by L&D.",
                  "Engagement and lift, broken out by team, cohort, and skill — exportable everywhere.",
                ][tab]}
              </div>
              <div style={{ fontFamily: type.mono, fontSize: 11, color: P.ink, borderTop: `1px solid ${P.line}`, paddingTop: 18 }}>
                {[
                  ["GET /programmes", "POST /cohorts", "PUT /milestones"],
                  ["GET /learner/home", "POST /events/nudge", "GET /streaks"],
                  ["GET /skills/:role", "POST /calibrations", "GET /gaps"],
                  ["GET /reports/:cohort", "POST /exports/csv", "GET /lift"],
                ][tab].map((x) => (
                  <div key={x} style={{ padding: "8px 0", color: P.muted }}>{x}</div>
                ))}
              </div>
            </div>
            <div style={{ background: P.bg, border: `1px solid ${P.line}`, padding: 20, overflow: "hidden" }}>
              <PanelB tab={tab} P={P} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* 3D MOMENT 3 — card stack */}
      <section style={{ padding: `100px ${padX}px`, position: "relative", zIndex: 1, borderTop: `1px solid ${P.line}`, background: P.bg2 }}>
        <div style={{ display: "grid", gridTemplateColumns: vw < 1024 ? "1fr" : "1fr 1fr", gap: vw < 1024 ? 48 : 64, alignItems: "center" }}>
          <CardStack P={P} />
          <div>
            <div style={{ fontFamily: type.mono, fontSize: 11, color: P.accent, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 24 }}>§05 / COMPOSITION</div>
            <h2 style={{ fontFamily: display, fontSize: 64, lineHeight: 0.98, letterSpacing: "-0.04em", margin: 0, fontWeight: type.dw, marginBottom: 24 }}>
              Layered, not bundled.
            </h2>
            <p style={{ color: P.muted, fontSize: 17, lineHeight: 1.55, maxWidth: 460 }}>
              Each module composes cleanly with the others — and with the rest of your stack. No forced migrations, no weekend cutover, no waiting for a release train.
            </p>
            <div style={{ marginTop: 36, fontFamily: type.mono, fontSize: 12, color: P.muted, letterSpacing: ".08em" }}>
              SCROLL TO LAYER ↓
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: `120px ${padX}px`, borderTop: `1px solid ${P.line}`, position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: type.mono, fontSize: 11, color: P.accent, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 56 }}>§06 / TELEMETRY</div>
        <div style={{ display: "grid", gridTemplateColumns: vw < 900 ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 0, borderTop: `1px solid ${P.line}`, borderBottom: `1px solid ${P.line}` }}>
          {[
            { v: 87, suf: "%", l: "Avg completion across cohorts", note: "[31% industry baseline]" },
            { v: 4.2, suf: "×", l: "Faster programme launch", note: "[kickoff → live]" },
            { v: 1240, suf: "", l: "Skills tracked per customer", note: "[median, year one]" },
            { v: 96, suf: "%", l: "Manager satisfaction", note: "[rolling NPS, 90d]" },
          ].map((s, i) => (
            <div key={s.l} style={{ padding: "40px 28px", borderRight: i < 3 ? `1px solid ${P.line}` : "none" }}>
              <div style={{ fontFamily: display, fontSize: 96, lineHeight: 1, letterSpacing: "-0.05em", fontWeight: type.dw, color: P.accent }}>
                <CountUp to={s.v} suffix={s.suf} />
              </div>
              <div style={{ fontSize: 15, marginTop: 20, maxWidth: 240 }}>{s.l}</div>
              <div style={{ fontFamily: type.mono, fontSize: 10, color: P.muted, marginTop: 8, letterSpacing: ".08em" }}>{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: `120px ${padX}px`, position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: vw < 900 ? "1fr" : "repeat(2, 1fr)", gap: 28 }}>
          {[
            { q: "We replaced four tools with Cohere. Our L&D ops team got their afternoons back, and our completion rates doubled in a quarter.", a: "Priya Adeyemi", r: "Head of L&D · Northwind" },
            { q: "The skills graph finally gave us a shared language with the business. Capability lift, not training hours.", a: "Marc Holst", r: "VP People Dev · Halcyon" },
          ].map((t) => (
            <Reveal key={t.a}>
              <div style={{ padding: 40, border: `1px solid ${P.line}`, background: P.surface, position: "relative" }}>
                <div style={{ position: "absolute", top: -10, left: 28, background: P.bg, padding: "0 10px", fontFamily: type.mono, fontSize: 10, color: P.accent, letterSpacing: ".15em" }}>// CASE_STUDY</div>
                <div style={{ fontFamily: display, fontSize: 24, lineHeight: 1.35, letterSpacing: "-0.015em", marginBottom: 32, fontWeight: type.dw }}>"{t.q}"</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 20, borderTop: `1px solid ${P.line}` }}>
                  <div style={{ width: 40, height: 40, background: P.accent }}></div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{t.a}</div>
                    <div style={{ fontSize: 11, color: P.muted, fontFamily: type.mono, letterSpacing: ".06em" }}>{t.r}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Pricing P={P} type={type} vw={vw} padX={padX} />
      <FAQ P={P} type={type} vw={vw} padX={padX} />

      {/* CTA */}
      <section style={{ padding: `160px ${padX}px 100px`, borderTop: `1px solid ${P.line}`, position: "relative", zIndex: 1, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 50%, ${P.accent}1F, transparent 60%)` }}></div>
        <div style={{ maxWidth: 1000, position: "relative" }}>
          <div style={{ fontFamily: type.mono, fontSize: 11, color: P.accent, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 28 }}>§08 / DEPLOY</div>
          <h2 style={{ fontFamily: display, fontSize: "clamp(64px, 8vw, 128px)", lineHeight: 0.95, letterSpacing: "-0.045em", margin: 0, fontWeight: type.dw }}>
            Bring L&D online.
          </h2>
          <p style={{ fontSize: 18, color: P.muted, maxWidth: 560, marginTop: 28, lineHeight: 1.55 }}>
            White-glove migration from your current LMS. Median time-to-launch: 11 working days.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
            <Magnetic primary P={P} font={type.mono} big>Request access →</Magnetic>
            <Magnetic P={P} font={type.mono} big>Talk to founders</Magnetic>
          </div>
        </div>
      </section>

      <footer style={{ padding: `40px ${padX}px`, borderTop: `1px solid ${P.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: P.muted, fontFamily: type.mono, letterSpacing: ".08em", textTransform: "uppercase", position: "relative", zIndex: 1 }}>
        <div>© COHERE LABS · v4.2.0</div>
        <div style={{ display: "flex", gap: 28 }}>
          <a href="#" style={{ color: "inherit" }}>Security</a>
          <a href="#" style={{ color: "inherit" }}>Status</a>
          <a href="#" style={{ color: "inherit" }}>Docs</a>
          <a href="#" style={{ color: "inherit" }}>Changelog</a>
        </div>
      </footer>
    </div>
  );
}

window.DirectionBFull = DirectionBFull;
window.DEFAULTS_B = DEFAULTS_B;
