import React from "react";

/* Direction B (extended) — Techno-Futurist with multiple 3D moments through scroll */

const PB = {
  midnight: { bg: "#0A0B0D", bg2: "#111316", ink: "#E8ECEF", muted: "#6B7280", line: "rgba(232,236,239,0.10)", accent: "#6EFACC", surface: "#0F1114" },
  noir:     { bg: "#08080A", bg2: "#101012", ink: "#E8E6E2", muted: "#7A7770", line: "rgba(232,230,226,0.10)", accent: "#FF5C2B", surface: "#0E0E10" },
  iris:     { bg: "#000000", bg2: "#0A0B0F", ink: "#FFFFFF", muted: "#8A8E9A", line: "rgba(255,255,255,0.08)", accent: "#0062FF", surface: "#0E0F14" },
};

const TB = {
  mono:      { display: '"Spline Sans", system-ui, sans-serif', body: '"Spline Sans", system-ui, sans-serif', mono: '"Spline Sans Mono", ui-monospace, monospace', dw: 500 },
  grotesque: { display: '"Spline Sans", system-ui, sans-serif', body: '"Spline Sans", system-ui, sans-serif', mono: '"Spline Sans Mono", ui-monospace, monospace', dw: 500 },
  technical: { display: '"Spline Sans", system-ui, sans-serif', body: '"Spline Sans", system-ui, sans-serif', mono: '"Spline Sans Mono", ui-monospace, monospace', dw: 500 },
};

const ACCENTS = {
  mint:  "#6EFACC",
  pink:  "#FF8FB1",
  amber: "#FFB37C",
  sky:   "#7DD3FC",
  gold:  "#F4D35E",
  coral: "#FF7466",
  iris:  "#A78BFA",
  lime:  "#BEF264",
};

const HC_B = {
  default:  { kicker: "SPEAKX · OS · v4.2", h1: ["English fluency", "for hospital teams."], sub: "Nurses, doctors, front desk, paramedics — trained in the clinical English their shift actually demands." },
  outcomes: { kicker: "FLUENCY PROTOCOL", h1: ["Train every clinician", "to speak with confidence."], sub: "Stop generic English courses. Start measuring patient-comms quality, handoff clarity, and satisfaction lift across every ward." },
  team:     { kicker: "BUILT FOR HOSPITALS", h1: ["Infrastructure for", "clinical communication."], sub: "From admissions to discharge — every voice your patient hears, fluent in the language of care." },
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

function useElementProgress(ref) {
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
  }, [ref]);
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
        transition: "transform .25s cubic-bezier(.2,.8,.2,1), background .15s, box-shadow .15s",
        background: primary ? P.accent : "transparent",
        color: primary ? "#FFFFFF" : P.ink,
        border: `1px solid ${primary ? P.accent : P.line}`,
        padding: big ? "14px 26px" : "11px 20px",
        borderRadius: 999,
        fontFamily: font,
        fontSize: big ? 15 : 14,
        fontWeight: 500,
        letterSpacing: ".01em",
        textTransform: "none",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        boxShadow: primary ? `0 8px 24px ${P.accent}33` : "none",
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
  }, [to, duration]);
  const display = to % 1 === 0 ? Math.round(v).toLocaleString() : v.toFixed(1);
  return <span ref={ref}>{display}{suffix}</span>;
}

function CursorSpotlight({ color }) {
  const [pos, setPos] = React.useState({ x: -1000, y: -1000 });
  React.useEffect(() => {
    const on = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, []);
  return (
    <div aria-hidden style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
      background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, ${color}14, transparent 60%)`,
      transition: "background .15s linear",
    }} />
  );
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

  const ease = (t) => 1 - Math.pow(1 - t, 3);

  if (stackHero) {
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

  const liftEnd = 0.55;
  const liftP = Math.min(1, prog / liftEnd);
  const holdP = Math.max(0, Math.min(1, (prog - liftEnd) / (1 - liftEnd)));
  const eLift = ease(liftP);
  const eHold = ease(holdP);
  const eSettle = 0;

  const rx = 62 * (1 - eLift) + m.y * 3;
  const ry = m.x * 5;
  // Device (760w) + floating widgets extend to ~1320w with perspective inflation.
  // Cap max scale so the full assembly stays within the viewport.
  const ASM_W = 1320;
  const maxFit = Math.min(1.55, (vw - 80) / ASM_W);
  const startScale = Math.min(1.35, maxFit * 0.9);
  const scaleNow = startScale + Math.max(0, maxFit - startScale) * eLift;
  const ty = 180 * (1 - eLift);
  const cardOpacity = eHold;
  const cardLift = (1 - cardOpacity) * 40;
  const headlineY = -eLift * 40;
  const headlineOpacity = Math.max(0, 1 - eLift * 1.4);
  const glowOpacity = 0.06 + eLift * 0.14;
  const accentBars = Math.floor(eLift * 8);

  return (
    <section ref={stageRef} style={{ position: "relative", height: "350vh", zIndex: 1 }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "grid", placeItems: "center",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `linear-gradient(${P.line} 1px, transparent 1px) 0 0/56px 56px, linear-gradient(90deg, ${P.line} 1px, transparent 1px) 0 0/56px 56px`,
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 60%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 60%, black 20%, transparent 80%)",
          opacity: 0.5 + eLift * 0.3 - eSettle * 0.15,
          transform: `translateY(${prog * 20}px)`,
        }}></div>

        <div style={{
          position: "absolute", width: 800, height: 800, borderRadius: "50%",
          background: P.accent, opacity: glowOpacity,
          filter: "blur(120px)",
          transform: `translateY(${(1 - eLift) * 100}px)`,
        }}></div>

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
            fontFamily: '"Spline Sans", sans-serif',
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
              fontFamily: '"Spline Sans Mono", monospace',
              color: P.ink,
              fontSize: 12,
            }}>
              <DeviceFace P={P} progress={eHold} />
            </div>

            <div style={{
              position: "absolute", left: -240, top: 60, width: 260,
              background: P.surface, border: `1px solid ${P.line}`, padding: 18,
              fontFamily: '"Spline Sans Mono", monospace', fontSize: 11, color: P.ink,
              transform: `translateZ(180px) rotateY(10deg) translateX(${-cardLift}px)`,
              opacity: cardOpacity,
              transition: "opacity .2s",
              boxShadow: "0 30px 60px rgba(0,0,0,.6)",
            }}>
              <div style={{ color: P.muted, fontSize: 10, marginBottom: 12, letterSpacing: ".14em" }}>// FLUENCY / NURSING</div>
              {[["handoff", 78], ["empathy", 41], ["pronunciation", 84]].map(([s, v]) => (
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
              fontFamily: '"Spline Sans Mono", monospace', fontSize: 11, color: P.ink,
              transform: `translateZ(220px) rotateY(-12deg) translateX(${cardLift}px)`,
              opacity: cardOpacity,
              transition: "opacity .2s",
              boxShadow: "0 30px 60px rgba(0,0,0,.6)",
            }}>
              <div style={{ color: P.accent, fontSize: 10, marginBottom: 8, letterSpacing: ".15em" }}>● WARD_04 SYNCED</div>
              <div style={{ fontSize: 12, marginBottom: 4, fontFamily: '"Spline Sans", sans-serif' }}>28 staff rostered</div>
              <div style={{ color: P.muted, fontSize: 10 }}>auto-rostered · 2s ago</div>
            </div>

            <div style={{
              position: "absolute", right: -120, top: -50, width: 200,
              background: P.surface, border: `1px solid ${P.line}`, padding: 14,
              fontFamily: '"Spline Sans Mono", monospace', fontSize: 10, color: P.ink,
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
              <div style={{ color: P.muted, fontSize: 9 }}>// PSAT / 7d</div>
            </div>
          </div>
        </div>

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
        fontFamily: '"Spline Sans", sans-serif',
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

function DeviceFace({ P, progress = 1 }) {
  const e = 1 - Math.pow(1 - Math.max(0, Math.min(1, progress)), 3);
  const metrics = [
    ["TRAINED", Math.round(1420 * e).toLocaleString(), false],
    ["FLUENCY", `+${Math.round(42 * e)}%`, true],
    ["PSAT", String(Math.round(89 * e)), false],
    ["CARE", `${(4.6 * e).toFixed(1)}×`, true],
  ];
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 10, marginBottom: 16, letterSpacing: ".1em", fontFamily: '"Spline Sans Mono", monospace' }}>
        <span>speakx://fluency/q2-2026</span>
        <span style={{ color: P.accent }}>● LIVE</span>
      </div>
      <div style={{ fontFamily: '"Spline Sans", sans-serif', fontSize: 26, marginBottom: 18, letterSpacing: "-.02em", color: P.ink }}>Fluency Lift · Q2 2026</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 18 }}>
        {metrics.map(([k, v, hot]) => (
          <div key={k} style={{ border: `1px solid ${P.line}`, padding: "12px 14px" }}>
            <div style={{ color: P.muted, fontSize: 9, letterSpacing: ".14em", fontFamily: '"Spline Sans Mono", monospace' }}>{k}</div>
            <div style={{ fontSize: 22, color: hot ? P.accent : P.ink, fontFamily: '"Spline Sans", sans-serif', fontVariantNumeric: "tabular-nums" }}>{v}</div>
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

/* ---------- 3D MOMENT 2 — Rotating skill-graph cube ---------- */

function SkillCube({ P }) {
  const ref = React.useRef(null);
  const prog = useElementProgress(ref);
  const m = useMouse();
  const ry = prog * 360 + m.x * 20;
  const rx = -15 + m.y * 10;

  const faces = [
    { label: "PATIENT COMMS", value: 82, c: P.accent },
    { label: "HANDOFF CLARITY", value: 78, c: P.accent },
    { label: "PRONUNCIATION", value: 64, c: P.accent },
    { label: "MEDICAL TERMS", value: 71, c: P.accent },
    { label: "EMPATHY SCRIPTS", value: 56, c: P.accent },
    { label: "EMERGENCY CALLS", value: 48, c: P.accent },
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
            background: `linear-gradient(140deg, ${P.surface}, ${f.c}10)`,
            border: `1px solid ${f.c}`,
            boxShadow: `inset 0 0 0 1px ${f.c}22, 0 0 30px ${f.c}22`,
            transform: transforms[i],
            display: "grid", placeItems: "center",
            padding: 20, color: P.ink,
            fontFamily: '"Spline Sans Mono", monospace',
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: f.c, letterSpacing: ".15em", marginBottom: 12, opacity: 0.85 }}>// SKILL</div>
              <div style={{ fontFamily: '"Spline Sans", sans-serif', fontSize: 22, marginBottom: 16, letterSpacing: "-.01em" }}>{f.label}</div>
              <div style={{ fontFamily: '"Spline Sans", sans-serif', fontSize: 56, color: f.c, lineHeight: 1, letterSpacing: "-.04em", textShadow: `0 0 30px ${f.c}66` }}>{f.value}</div>
              <div style={{ fontSize: 10, color: P.muted, marginTop: 8, letterSpacing: ".1em" }}>L{Math.round(f.value / 25) + 1} · TEAM AVG</div>
              <div style={{ height: 2, background: P.line, marginTop: 16 }}>
                <div style={{ width: `${f.value}%`, height: "100%", background: f.c }}></div>
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

  const z = (i) => -120 + i * (40 + prog * 80);
  const ty = (i) => i * (12 - prog * 24);
  const opacity = (i) => Math.max(0.4, 1 - i * 0.18 + prog * 0.4);

  const cards = [
    { code: "RPRT", title: "CMO-grade dashboards", body: "Per-ward, per-role, per-shift. Patient feedback correlated with fluency lift. Export to your BI of choice.", c: P.accent },
    { code: "SYNC", title: "Live HMS + roster sync", body: "Pulls staff from your hospital management system. Auto-rosters drills around shift schedules.", c: P.accent },
    { code: "EVNT", title: "Roleplay + async drills", body: "Live simulation labs for handoffs and family conversations, plus 5-minute mobile drills between shifts.", c: P.accent },
    { code: "CALI", title: "Charge-nurse calibrations", body: "Quarterly fluency calibrations baked into the charge-nurse workflow. Quality docs, not spreadsheets.", c: P.accent },
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
            background: `linear-gradient(160deg, ${P.surface}, ${c.c}10)`,
            border: `1px solid ${i === 0 ? c.c : P.line}`,
            padding: 28,
            transform: `translateZ(${z(i)}px) translateY(${ty(i)}px)`,
            transition: "transform .3s ease-out, opacity .3s",
            opacity: opacity(i),
            boxShadow: `0 30px 60px rgba(0,0,0,.4), 0 0 60px ${c.c}${i === 0 ? "33" : "11"}`,
            color: P.ink,
            fontFamily: '"Spline Sans Mono", monospace',
            borderRadius: 14,
            overflow: "hidden",
          }}>
            <div aria-hidden style={{ position: "absolute", top: -50, right: -50, width: 160, height: 160, borderRadius: "50%", background: c.c, opacity: 0.18, filter: "blur(50px)" }} />
            <div style={{ position: "relative", display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 10, marginBottom: 20, letterSpacing: ".15em" }}>
              <span style={{ color: c.c, padding: "4px 10px", borderRadius: 999, background: `${c.c}1A`, border: `1px solid ${c.c}33` }}>{c.code}</span>
              <span>0{i + 1} / 0{cards.length}</span>
            </div>
            <div style={{ position: "relative", fontFamily: '"Spline Sans", sans-serif', fontSize: 28, letterSpacing: "-.02em", marginBottom: 12 }}>{c.title}</div>
            <div style={{ position: "relative", color: P.muted, fontSize: 13, lineHeight: 1.55, fontFamily: '"Spline Sans", sans-serif' }}>{c.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Marquee (continuous scroll) ---------- */

function Marquee({ items, P, type, speed = 40 }) {
  const id = React.useId().replace(/:/g, "");
  return (
    <div style={{ position: "relative", overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
      <style>{`@keyframes mq-${id}{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div style={{ display: "flex", gap: 64, width: "max-content", animation: `mq-${id} ${speed}s linear infinite` }}>
        {[...items, ...items].map((l, i) => (
          <div key={i} style={{ fontFamily: type.mono, fontSize: 14, letterSpacing: ".12em", color: P.ink, opacity: 0.55, whiteSpace: "nowrap" }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Pill kicker ---------- */

function Kicker({ children, P, type }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: `${P.accent}14`, border: `1px solid ${P.accent}33`, fontFamily: type.mono, fontSize: 11, color: P.accent, letterSpacing: ".18em", textTransform: "uppercase" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: P.accent, boxShadow: `0 0 8px ${P.accent}` }} />
      {children}
    </div>
  );
}

/* ---------- Tilt card (hover spotlight + 3D tilt) ---------- */

function TiltCard({ children, P, padding = 36, minHeight = 280, borderRight, borderBottom, accent }) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ rx: 0, ry: 0, mx: 50, my: 50, hov: false });
  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - y) * 6, ry: (x - 0.5) * 6, mx: x * 100, my: y * 100, hov: true });
  };
  const onLeave = () => setT({ rx: 0, ry: 0, mx: 50, my: 50, hov: false });
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{
      padding, minHeight, position: "relative",
      borderRight, borderBottom,
      background: t.hov ? `radial-gradient(400px circle at ${t.mx}% ${t.my}%, ${(accent || P.accent)}10, transparent 70%)` : "transparent",
      transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
      transition: "transform .25s cubic-bezier(.2,.8,.2,1), background .2s",
      transformStyle: "preserve-3d",
    }}>
      {children}
    </div>
  );
}

/* ---------- Surfaces panel ---------- */

function PanelB({ tab, P }) {
  if (tab === 0) return (
    <div style={{ fontSize: 11, fontFamily: '"Spline Sans Mono", monospace', color: P.ink }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: P.muted, fontSize: 10, marginBottom: 12 }}>
        <span>$ curricula --status active</span><span>4 results</span>
      </div>
      {[["nursing-handoffs", 240, 64], ["doctor-rounds", 86, 88], ["front-desk-comms", 124, 21], ["emergency-protocols", 412, 95]].map(([n, c, p]) => (
        <div key={n} style={{ display: "grid", gridTemplateColumns: "1.4fr 60px 1fr 50px", gap: 10, alignItems: "center", padding: "10px 0", borderTop: `1px solid ${P.line}` }}>
          <div style={{ color: P.accent }}>▸ {n}</div>
          <div>{c} stf</div>
          <div style={{ height: 3, background: P.line }}><div style={{ width: `${p}%`, height: "100%", background: P.accent }}></div></div>
          <div style={{ textAlign: "right" }}>{p}%</div>
        </div>
      ))}
    </div>
  );
  if (tab === 1) return (
    <div style={{ fontSize: 12, color: P.ink }}>
      <div style={{ fontFamily: '"Spline Sans Mono", monospace', color: P.muted, fontSize: 10, marginBottom: 8 }}>// CLINICIAN: nurse_priya (ward_04)</div>
      <div style={{ fontFamily: '"Spline Sans", sans-serif', fontSize: 24, marginBottom: 18, letterSpacing: "-.02em" }}>Two drills before your shift.</div>
      <div style={{ display: "grid", gap: 10 }}>
        {[["handoff-drill-03", "12 min", "7pm"], ["pronunciation/cardio-terms", "8 min", "EOS"]].map(([t, d, due]) => (
          <div key={t} style={{ border: `1px solid ${P.line}`, padding: 14, display: "grid", gridTemplateColumns: "1fr auto", gap: 8, fontFamily: '"Spline Sans Mono", monospace', fontSize: 11 }}>
            <div><div style={{ color: P.ink }}>▸ {t}</div><div style={{ color: P.muted, fontSize: 10, marginTop: 2 }}>{d}</div></div>
            <div style={{ color: P.accent, alignSelf: "center", fontSize: 10 }}>DUE {due}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, fontFamily: '"Spline Sans Mono", monospace', fontSize: 10, color: P.muted }}>● 14-shift streak — keep going</div>
    </div>
  );
  if (tab === 2) return (
    <div style={{ fontSize: 11, color: P.ink, fontFamily: '"Spline Sans Mono", monospace' }}>
      <div style={{ color: P.muted, fontSize: 10, marginBottom: 14 }}>// FLUENCY / nursing_staff</div>
      {[["patient_handoff", 82], ["medical_terms", 71], ["empathy_scripts", 56], ["family_comms", 64], ["pronunciation", 78], ["emergency_calls", 48]].map(([s, v]) => (
        <div key={s} style={{ display: "grid", gridTemplateColumns: "1fr 80px 30px", gap: 10, alignItems: "center", padding: "6px 0" }}>
          <div>{s}</div>
          <div style={{ height: 3, background: P.line }}><div style={{ width: `${v}%`, height: "100%", background: v > 70 ? P.accent : P.ink }}></div></div>
          <div style={{ textAlign: "right", color: v > 70 ? P.accent : P.muted }}>L{Math.round(v / 25) + 1}</div>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ fontSize: 11, color: P.ink, height: "100%", display: "grid", gridTemplateRows: "auto 1fr", fontFamily: '"Spline Sans Mono", monospace' }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ color: P.muted }}>// fluency_lift_30d</span>
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
  const display = '"Spline Sans", sans-serif';
  const tiers = [
    { n: "WARD", p: annual ? 399 : 499, f: ["Up to 250 staff", "Role-based curricula", "Fluency reports", "SSO"], cta: "Start pilot" },
    { n: "HOSPITAL", p: annual ? 599 : 749, f: ["Fluency map", "Charge-nurse calibrations", "HMS + roster sync", "Custom roles"], cta: "Request access", featured: true },
    { n: "CHAIN", p: null, f: ["Unlimited everything", "SCIM provisioning", "Dedicated CSM", "NABH-aligned reporting"], cta: "Talk to sales" },
  ];
  return (
    <section style={{ padding: `120px ${padX}px`, borderTop: `1px solid ${P.line}`, position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
        <div>
          <div style={{ marginBottom: 16 }}><Kicker P={P} type={type}>Pricing</Kicker></div>
          <h2 style={{ fontFamily: display, fontSize: "clamp(36px, 4.6vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.035em", margin: 0, fontWeight: 500 }}>Per staff. No surprises.</h2>
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
            borderRight: i < 2 && vw >= 900 ? `1px solid ${P.line}` : "none",
            borderBottom: vw < 900 && i < 2 ? `1px solid ${P.line}` : "none",
            position: "relative",
            minHeight: 460,
          }}>
            {t.featured && <div style={{ position: "absolute", top: 20, right: 20, fontFamily: type.mono, fontSize: 10, color: P.accent, letterSpacing: ".15em" }}>● MOST DEPLOYED</div>}
            <div style={{ fontFamily: type.mono, fontSize: 11, letterSpacing: ".15em", color: P.muted, marginBottom: 28 }}>// {t.n}</div>
            <div style={{ fontFamily: display, fontSize: 72, fontWeight: type.dw, letterSpacing: "-0.04em", lineHeight: 1, color: t.featured ? P.accent : P.ink }}>
              {t.p ? `₹${t.p}` : "Custom"}
            </div>
            <div style={{ fontSize: 12, color: P.muted, marginTop: 10, fontFamily: type.mono, letterSpacing: ".06em" }}>{t.p ? "PER STAFF / MO" : "MULTI-SITE LICENSING"}</div>
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
  const display = '"Spline Sans", sans-serif';
  const items = [
    ["Which roles can you train?", "Nurses, doctors, paramedics, lab techs, pharmacists, front-desk and reception, billing and insurance staff, patient-care coordinators, ward attendants, ambulance crew, and international patient services — each with role-specific clinical English curricula."],
    ["How long until staff start improving?", "Measurable fluency lift in 21 days. Median time-to-launch is 11 working days for Ward and Hospital tiers. Multi-site Chain rollouts: 4–6 weeks including HMS reconciliation."],
    ["Can you handle 24/7 shift schedules?", "Yes — drills auto-roster around your shift patterns. 5-minute mobile sessions between rounds, async catch-up for night shifts, live roleplay labs scheduled to ward downtime."],
    ["Can you cover our specialty?", "Cardiac, oncology, paediatrics, emergency, OBG, neuro — clinical vocabulary modules per specialty. Bring your SOPs and protocols, we tune the drills to them."],
    ["Patient data privacy & HIPAA?", "No patient data ever enters Speakx. Roleplay scenarios use synthetic cases. SOC 2 Type II annually, ISO 27001 in audit Q3 2026, NABH-aligned reporting, India + EU data residency available."],
    ["Pricing for govt or charitable hospitals?", "50% off Hospital tier for registered charitable trusts and govt hospitals. Medical college licensing available — talk to sales."],
  ];
  return (
    <section style={{ padding: `120px ${padX}px`, borderTop: `1px solid ${P.line}`, position: "relative", zIndex: 1, background: P.bg2 }}>
      <div style={{ display: "grid", gridTemplateColumns: vw < 900 ? "1fr" : "1fr 2fr", gap: vw < 900 ? 32 : 64 }}>
        <div>
          <div style={{ marginBottom: 16 }}><Kicker P={P} type={type}>FAQ</Kicker></div>
          <h2 style={{ fontFamily: display, fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.035em", margin: 0, fontWeight: 500 }}>Common questions.</h2>
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

export default function DirectionBFull({ tweaks }) {
  const palette = PB[tweaks.palette] || PB.iris;
  const type = TB[tweaks.typePair] || TB.mono;
  const copy = HC_B[tweaks.heroCopy] || HC_B.outcomes;
  const light = tweaks.mode === "light";
  const P = light
    ? { ...palette, bg: "#F4F4F1", bg2: "#EAEAE5", ink: "#0A0B0D", muted: "#6B7280", line: "rgba(10,11,13,0.10)", surface: "#FFFFFF" }
    : palette;

  const vw = useViewport();
  const compactNav = vw < 1180;
  const padX = vw < 720 ? 24 : vw < 1024 ? 40 : 64;
  const stackHero = vw < 1024;

  const [scrollY, setScrollY] = React.useState(0);
  React.useEffect(() => {
    const on = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const navOpacity = stackHero ? 1 : (() => {
    const t = scrollY / Math.max(1, vh);
    if (t < 0.7) return 1;
    if (t < 1.2) return 1 - (t - 0.7) / 0.5;
    if (t < 2.5) return 0;
    if (t < 2.8) return (t - 2.5) / 0.3;
    return 1;
  })();

  const display = '"Spline Sans", sans-serif';
  const [tab, setTab] = React.useState(0);
  const tabs = ["00 / Curricula", "01 / Clinician", "02 / Fluency", "03 / Quality"];

  return (
    <div style={{ background: P.bg, color: P.ink, fontFamily: type.body, minHeight: "100vh", letterSpacing: "-0.005em", position: "relative", overflowX: "clip" }}>
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(${P.line} 1px, transparent 1px)`,
        backgroundSize: "100% 4px",
        opacity: .35, mixBlendMode: light ? "multiply" : "screen",
      }}></div>
      <CursorSpotlight color={P.accent} />

      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 8px 8px 22px", position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 50, background: "rgba(20,21,30,0.72)", backdropFilter: "blur(24px) saturate(160%)", WebkitBackdropFilter: "blur(24px) saturate(160%)", borderRadius: 56, border: `1px solid rgba(255,255,255,0.08)`, gap: 24, boxShadow: "0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)", opacity: navOpacity, pointerEvents: navOpacity < 0.4 ? "none" : "auto", transition: "opacity .25s ease", maxWidth: "calc(100vw - 24px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: compactNav ? 18 : 32, minWidth: 0 }}>
          <div style={{ fontFamily: type.mono, fontSize: 13, letterSpacing: ".14em", display: "flex", alignItems: "center", gap: 10, flexShrink: 0, color: P.ink }}>
            <span aria-hidden style={{ width: 18, height: 18, borderRadius: "50%", background: `radial-gradient(circle at 30% 30%, #6FA0FF, ${P.accent} 55%, #003FCC)`, boxShadow: `0 0 12px ${P.accent}66`, display: "inline-block" }}></span>
            SPEAKX
          </div>
          {!compactNav && (
            <div style={{ display: "flex", gap: 22, fontSize: 12, color: "rgba(232,232,240,0.72)", fontFamily: type.mono, textTransform: "uppercase", letterSpacing: ".1em" }}>
              {["Platform", "Roles", "Hospitals", "Pricing", "Docs"].map((x) => (
                <a key={x} href="#" style={{ color: "inherit", textDecoration: "none" }}>{x}</a>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          {!compactNav && <a href="#" style={{ color: "rgba(232,232,240,0.85)", fontSize: 12, textDecoration: "none", fontFamily: type.mono, textTransform: "uppercase", letterSpacing: ".1em", padding: "8px 14px" }}>Sign in</a>}
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: P.accent, color: "#FFFFFF", padding: "10px 18px", borderRadius: 999, fontFamily: type.mono, fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", textDecoration: "none", boxShadow: `0 0 0 1px ${P.accent}, 0 8px 24px ${P.accent}40` }}>{compactNav ? "Pilot" : "Book a pilot"} →</a>
        </div>
      </nav>

      <ScrollHero P={P} type={type} copy={copy} />

      <section style={{ padding: `40px ${padX}px`, borderTop: `1px solid ${P.line}`, position: "relative", zIndex: 1, background: P.bg }}>
        <div style={{ display: "grid", gridTemplateColumns: vw < 720 ? "1fr 1fr" : "repeat(3, auto)", gap: 16, justifyContent: vw < 720 ? "stretch" : "center", fontFamily: type.mono }}>
          {[
            { label: "HIPAA", sub: "aligned", c: P.accent },
            { label: "NABH", sub: "compatible", c: P.accent },
            { label: "ISO 27001", sub: "+ SOC 2", c: P.accent },
          ].map((b) => (
            <div key={b.label} style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "10px 18px", border: `1px solid ${b.c}33`, background: `${b.c}10`, borderRadius: 999 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: b.c, boxShadow: `0 0 10px ${b.c}` }} />
              <span style={{ fontFamily: display, fontSize: 16, color: b.c, fontWeight: type.dw }}>{b.label}</span>
              <span style={{ color: P.muted, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase" }}>{b.sub}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: `40px 0`, borderTop: `1px solid ${P.line}`, borderBottom: `1px solid ${P.line}`, position: "relative", zIndex: 1, background: P.bg }}>
        <div style={{ textAlign: "center", fontFamily: type.mono, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: P.muted, marginBottom: 24 }}>
          Deployed across 40+ hospitals
        </div>
        <Marquee P={P} type={type} items={["MERIDIAN HEALTH", "STERLING CARE", "NORTHSIDE HOSP", "HALCYON MEDICAL", "ASTRA CLINICS", "LUMEN/HEALTH", "AURORA MEDICAL", "VESTA CARE", "PRIMARK HOSPITALS", "CALIBRE HEALTH"]} />
      </section>

      {/* Built for every role */}
      <section style={{ padding: `120px ${padX}px`, position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Kicker P={P} type={type}>Roles</Kicker>
            <h2 style={{ fontFamily: display, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.02, letterSpacing: "-0.04em", margin: "20px auto 16px", fontWeight: type.dw, maxWidth: 880 }}>
              Built for every voice<br />in your hospital.
            </h2>
            <p style={{ color: P.muted, fontSize: 17, lineHeight: 1.55, maxWidth: 560, margin: "0 auto" }}>
              Each role gets a curriculum tuned to the patient interactions they actually have — not a generic English course.
            </p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: vw < 720 ? "1fr 1fr" : vw < 1024 ? "repeat(3, 1fr)" : "repeat(4, 1fr)", gap: 12 }}>
          {[
            { code: "RN", t: "Nurses", d: "Handoffs, family conversations, vitals reporting", n: 840, c: P.accent },
            { code: "MD", t: "Doctors", d: "Patient rounds, diagnosis briefs, discharge talks", n: 320, c: P.accent },
            { code: "FD", t: "Front Desk", d: "Admissions, queries, appointment scheduling", n: 180, c: P.accent },
            { code: "ER", t: "Paramedics", d: "Emergency calls, triage briefs, ambulance comms", n: 96, c: P.accent },
            { code: "LX", t: "Lab Techs", d: "Sample protocols, patient instructions, reports", n: 124, c: P.accent },
            { code: "RX", t: "Pharmacists", d: "Prescription counselling, dosage clarifications", n: 84, c: P.accent },
            { code: "PC", t: "Patient Care", d: "Coordination, family briefings, transfers", n: 142, c: P.accent },
            { code: "BL", t: "Billing & Insurance", d: "Cashless flow, claim conversations, estimates", n: 78, c: P.accent },
          ].map((r, i) => (
            <Reveal key={r.code} delay={i * 40}>
              <div style={{
                position: "relative",
                padding: 22,
                background: P.surface,
                border: `1px solid ${P.line}`,
                borderRadius: 14,
                minHeight: 178,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
              }}>
                <div aria-hidden style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: r.c, opacity: 0.10, filter: "blur(36px)" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: `linear-gradient(135deg, ${r.c}, ${r.c}88)`,
                    display: "grid", placeItems: "center",
                    fontFamily: type.mono, fontSize: 11, fontWeight: 700, color: "#FFFFFF",
                    letterSpacing: ".04em",
                    boxShadow: `0 6px 20px ${r.c}55, inset 0 1px 0 rgba(255,255,255,0.4)`,
                  }}>{r.code}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "rgba(255,255,255,0.05)", border: `1px solid ${P.line}`, borderRadius: 999, fontFamily: type.mono, fontSize: 10, color: P.muted, letterSpacing: ".06em" }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: r.c }} />~{r.n} staff
                  </div>
                </div>
                <div style={{ position: "relative" }}>
                  <div style={{ fontFamily: display, fontSize: 20, fontWeight: type.dw, letterSpacing: "-.015em", marginBottom: 6, color: P.ink }}>{r.t}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.5, color: P.muted }}>{r.d}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tonal break — Drill demo (full-bleed colored gradient) */}
      <section style={{
        padding: `120px ${padX}px`,
        position: "relative",
        zIndex: 1,
        background: "linear-gradient(140deg, #FFD485 0%, #FFB266 60%, #FF9252 100%)",
        overflow: "hidden",
        borderTop: `1px solid ${P.line}`,
      }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(900px circle at 78% 18%, rgba(255,255,255,0.30), transparent 55%), radial-gradient(700px circle at 18% 90%, rgba(20,12,0,0.18), transparent 60%)",
        }} />
        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: vw < 1024 ? "1fr" : "1.1fr 1fr", gap: vw < 1024 ? 56 : 64, alignItems: "center", maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(8,8,10,0.78)", color: "#FFB37C", fontFamily: type.mono, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB37C", boxShadow: "0 0 8px #FFB37C" }} />
                Drill demo
              </div>
              <h2 style={{ fontFamily: display, fontSize: "clamp(48px, 6.5vw, 96px)", lineHeight: 0.96, letterSpacing: "-0.045em", margin: 0, fontWeight: type.dw, color: "#0A0B14", marginBottom: 24 }}>
                5 minutes<br />between rounds.
              </h2>
              <p style={{ fontSize: 18, color: "rgba(10,11,20,0.78)", lineHeight: 1.55, maxWidth: 500, marginBottom: 36 }}>
                A nurse finishes her vitals round on Ward 04. She picks up her phone, taps Speakx, and runs a 5-minute handoff drill before the doctor arrives. The next morning, her PSAT score is up 12 points.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 999, background: "#0A0B14", color: "#fff", fontFamily: type.mono, fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", textDecoration: "none", fontWeight: 600, boxShadow: "0 8px 24px rgba(10,11,20,0.25)" }}>
                  Watch a drill <span>→</span>
                </a>
                <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 999, background: "rgba(255,255,255,0.7)", color: "#0A0B14", fontFamily: type.mono, fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", textDecoration: "none", fontWeight: 600, backdropFilter: "blur(12px)" }}>
                  Try on mobile
                </a>
              </div>
            </div>
          </Reveal>

          {/* Phone mockup */}
          <div style={{ display: "grid", placeItems: "center", perspective: 1400 }}>
            <div style={{
              width: 300, height: 600,
              background: "#0A0B14",
              border: "8px solid #1A1B25",
              borderRadius: 44,
              boxShadow: "0 80px 140px rgba(10,11,20,0.45), 0 40px 80px rgba(10,11,20,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
              padding: 8,
              transform: "rotateX(6deg) rotateY(-14deg) rotateZ(2deg)",
              transformStyle: "preserve-3d",
              position: "relative",
            }}>
              <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", width: 110, height: 28, background: "#0A0B14", borderRadius: 20, zIndex: 3 }} />
              <div style={{ background: "#0F1020", height: "100%", borderRadius: 36, padding: "44px 16px 12px", display: "flex", flexDirection: "column", color: "#E8E8F0", fontFamily: type.body, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ fontFamily: type.mono, fontSize: 10, color: "#7779A0", letterSpacing: ".08em" }}>9:41</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: type.mono, fontSize: 9, color: "#6EFACC", letterSpacing: ".08em" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#6EFACC", boxShadow: "0 0 6px #6EFACC" }} />
                    WARD_04 · LIVE
                  </div>
                </div>
                <div style={{ fontFamily: type.mono, fontSize: 9, color: "#A78BFA", letterSpacing: ".15em", marginBottom: 4 }}>// HANDOFF DRILL · 4/8</div>
                <div style={{ fontFamily: display, fontSize: 19, fontWeight: type.dw, letterSpacing: "-.02em", marginBottom: 16 }}>Patient vitals report</div>
                <div style={{ background: "linear-gradient(140deg, rgba(167,139,250,0.20), rgba(110,250,204,0.10))", border: "1px solid rgba(167,139,250,0.40)", borderRadius: 14, padding: 14, marginBottom: 14 }}>
                  <div style={{ fontFamily: type.mono, fontSize: 9, color: "#A78BFA", letterSpacing: ".15em", marginBottom: 6 }}>SAY THIS WORD</div>
                  <div style={{ fontFamily: display, fontSize: 26, fontWeight: type.dw, letterSpacing: "-.02em", marginBottom: 2 }}>tachycardia</div>
                  <div style={{ fontFamily: type.mono, fontSize: 10, color: "#7779A0" }}>/ˌtækɪˈkɑːrdiə/</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, height: 44, padding: "0 8px", background: "rgba(167,139,250,0.08)", borderRadius: 10, marginBottom: 14 }}>
                  {[20, 45, 80, 60, 95, 70, 50, 85, 30, 65, 90, 55, 75, 40, 88, 50, 68, 30, 45, 60, 78, 42, 56].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: i < 14 ? "#A78BFA" : "rgba(167,139,250,0.22)", borderRadius: 1 }} />
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "#9b9eba", lineHeight: 1.45, marginBottom: 14, fontStyle: "italic" }}>
                  "Patient's heart rate is elevated — 110 BPM, tachycardic on admission."
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "rgba(110,250,204,0.10)", border: "1px solid rgba(110,250,204,0.30)", borderRadius: 10, marginBottom: 14 }}>
                  <div style={{ fontFamily: type.mono, fontSize: 9, color: "#6EFACC", letterSpacing: ".12em" }}>FLUENCY</div>
                  <div style={{ fontFamily: display, fontSize: 17, fontWeight: type.dw, color: "#6EFACC" }}>82 / 100</div>
                </div>
                <div style={{ marginTop: "auto", display: "grid", placeItems: "center", padding: "8px 0 16px" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "linear-gradient(135deg, #A78BFA, #5E3AC8)",
                    display: "grid", placeItems: "center",
                    boxShadow: "0 10px 28px rgba(167,139,250,0.45), 0 0 0 8px rgba(167,139,250,0.12)",
                  }}>
                    <div style={{ width: 18, height: 18, background: "#fff", borderRadius: 3 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: `140px ${padX}px`, position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: vw < 900 ? "1fr" : "1fr 1fr", gap: 48, marginBottom: 72, alignItems: "end" }}>
            <div>
              <div style={{ marginBottom: 20 }}><Kicker P={P} type={type}>Modules</Kicker></div>
              <h2 style={{ fontFamily: display, fontSize: "clamp(40px, 5.5vw, 64px)", lineHeight: 1.04, letterSpacing: "-0.035em", margin: 0, fontWeight: 500 }}>
                Six modules.<br />Every role covered.
              </h2>
            </div>
            <div style={{ color: P.muted, fontSize: 16, lineHeight: 1.6, maxWidth: 480 }}>
              Speakx is composed, not bundled. Each module ships role-specific clinical English — pick what your hospital needs today and add the rest as you scale.
            </div>
          </div>
        </Reveal>
        <div style={{ border: `1px solid ${P.line}`, display: "grid", gridTemplateColumns: vw < 900 ? "1fr" : vw < 1180 ? "repeat(2, 1fr)" : "repeat(3, 1fr)" }}>
          {[
            { code: "CURR", t: "Role curricula", d: "Clinical English tuned for the patient interactions each role actually has.", bullets: ["Per-specialty vocabulary", "Handoff & rounds scripts", "Versioned protocols"] },
            { code: "DRIL", t: "Shift drills", d: "5-minute voice-first drills, designed for the bedside, not the desk.", bullets: ["Mobile + offline", "Voice + listening", "Auto-rostered"] },
            { code: "FLUE", t: "Fluency map", d: "The capability map your hospital has been measuring by feel.", bullets: ["Per-role calibrations", "Live signals from drills", "Gap detection"] },
            { code: "ROLE", t: "Roleplay labs", d: "Live simulations for handoffs, family conversations, emergency calls.", bullets: ["Auto-transcribed", "Peer review", "Async catch-up"] },
            { code: "RPRT", t: "Quality reports", d: "Dashboards your CMO will read — per-ward, per-shift, per-role.", bullets: ["NABH-aligned exports", "Patient feedback overlay", "BI + API"] },
            { code: "SYNC", t: "HMS + roster sync", d: "Pulls staff from your HMS. Auto-rosters around shift schedules.", bullets: ["Workday, Allscripts, Epic", "Slack / Teams / WhatsApp", "SCIM provisioning"] },
          ].map((f, i) => {
            const isLastCol = vw >= 1180 ? i % 3 === 2 : vw >= 900 ? i % 2 === 1 : true;
            const isLastRow = vw >= 1180 ? i >= 3 : vw >= 900 ? i >= 4 : i === 5;
            return (
              <Reveal key={f.code} delay={i * 60}>
                <TiltCard P={P} padding={32} minHeight={300} borderRight={isLastCol ? "none" : `1px solid ${P.line}`} borderBottom={isLastRow ? "none" : `1px solid ${P.line}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
                    <span style={{ fontFamily: type.mono, fontSize: 10, color: P.accent, letterSpacing: ".18em" }}>// {f.code}</span>
                    <span style={{ fontFamily: type.mono, fontSize: 10, color: P.muted }}>0{i + 1}</span>
                  </div>
                  <div style={{ fontFamily: display, fontSize: 26, marginBottom: 12, letterSpacing: "-0.02em", fontWeight: type.dw }}>{f.t}</div>
                  <div style={{ color: P.muted, fontSize: 14, lineHeight: 1.55, marginBottom: 18 }}>{f.d}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
                    {f.bullets.map((b) => (
                      <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: type.mono, fontSize: 12, color: P.ink }}>
                        <span aria-hidden style={{ width: 14, height: 14, borderRadius: "50%", background: `${P.accent}22`, color: P.accent, display: "grid", placeItems: "center", fontSize: 9, fontWeight: 700 }}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section style={{ padding: `60px ${padX}px 140px`, position: "relative", zIndex: 1, borderTop: `1px solid ${P.line}` }}>
        <div style={{ display: "grid", gridTemplateColumns: vw < 1024 ? "1fr" : "1fr 1fr", gap: vw < 1024 ? 48 : 64, alignItems: "center" }}>
          <div>
            <div style={{ marginBottom: 20 }}><Kicker P={P} type={type}>Fluency map</Kicker></div>
            <h2 style={{ fontFamily: display, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.035em", margin: 0, fontWeight: 500, marginBottom: 24 }}>
              Every skill,<br />every role, every ward.
            </h2>
            <p style={{ color: P.muted, fontSize: 17, lineHeight: 1.55, maxWidth: 460, marginBottom: 32 }}>
              Speakx builds a live fluency map from your role definitions, calibrations, and drill activity. Spot communication gaps before patient feedback does.
            </p>
            <div style={{ display: "grid", gap: 12, fontFamily: type.mono, fontSize: 13, color: P.ink }}>
              {[
                ["▸", "Role definitions per specialty (cardiac, oncology, OBG, ER…)"],
                ["▸", "Charge-nurse calibration cycles (quarterly default)"],
                ["▸", "Auto-derived signals from drills and roleplays"],
                ["▸", "Per-ward, per-shift, per-tenure rollups"],
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

      <section style={{ padding: `120px ${padX}px 140px`, position: "relative", zIndex: 1, borderTop: `1px solid ${P.line}` }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <Kicker P={P} type={type}>Surfaces</Kicker>
            <h2 style={{ fontFamily: display, fontSize: "clamp(40px, 5.2vw, 68px)", lineHeight: 1.02, letterSpacing: "-0.04em", margin: 0, fontWeight: type.dw, maxWidth: 880 }}>
              {[
                <>One workspace for<br />the whole hospital.</>,
                <>A drill home built<br />around the shift.</>,
                <>The fluency map your<br />board has been missing.</>,
                <>Quality reports your<br />CMO will read.</>,
              ][tab]}
            </h2>
            <p style={{ color: P.muted, fontSize: 17, lineHeight: 1.55, maxWidth: 560, margin: 0 }}>
              {[
                "Compose curricula per specialty and shift. Versioned, approvable, deployable across wards in minutes.",
                "5-minute drills designed for between rounds — voice-first, mobile, offline-capable.",
                "Calibrated by charge nurses, audited by quality teams, mapped to every role and ward.",
                "Patient comms quality and fluency lift — broken out by ward, role, and shift, exportable to your BI.",
              ][tab]}
            </p>
            <a href="#" style={{ marginTop: 4, display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 999, background: "rgba(255,255,255,0.04)", border: `1px solid ${P.line}`, color: P.ink, textDecoration: "none", fontFamily: type.mono, fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase" }}>
              See the platform <span style={{ color: P.accent }}>→</span>
            </a>
          </div>
        </Reveal>

        {/* Floating pill tab bar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", padding: 4, gap: 2, background: "rgba(20,21,30,0.6)", border: `1px solid ${P.line}`, borderRadius: 999, backdropFilter: "blur(12px)" }}>
            {tabs.map((t, i) => {
              const label = t.split("/ ")[1];
              return (
                <button key={t} onClick={() => setTab(i)} style={{
                  padding: "10px 20px", fontFamily: type.mono, fontSize: 12, cursor: "pointer", letterSpacing: ".06em",
                  background: tab === i ? P.accent : "transparent",
                  color: tab === i ? "#08080A" : "rgba(232,232,240,0.65)",
                  border: "none", borderRadius: 999,
                  transition: "all .2s", fontWeight: tab === i ? 600 : 500,
                }}>{label}</button>
              );
            })}
          </div>
        </div>

        {/* Showcase canvas */}
        <Reveal>
          <div style={{
            position: "relative",
            background: `linear-gradient(180deg, ${P.surface}, ${P.bg2})`,
            border: `1px solid ${P.line}`,
            borderRadius: 20,
            padding: vw < 720 ? 24 : 40,
            minHeight: 480,
            overflow: "hidden",
            boxShadow: `0 40px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)`,
          }}>
            {/* ambient glow */}
            <div aria-hidden style={{ position: "absolute", top: -120, right: -120, width: 380, height: 380, borderRadius: "50%", background: P.accent, opacity: 0.08, filter: "blur(80px)" }} />
            <div aria-hidden style={{ position: "absolute", bottom: -160, left: -100, width: 340, height: 340, borderRadius: "50%", background: "#5E3AC8", opacity: 0.10, filter: "blur(80px)" }} />

            {/* Floating badges (top row) */}
            <div style={{ position: "absolute", top: 20, left: 24, display: "flex", gap: 10, alignItems: "center", zIndex: 3 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", background: "rgba(110,250,204,0.12)", border: "1px solid rgba(110,250,204,0.32)", borderRadius: 999, fontFamily: type.mono, fontSize: 11, color: "#6EFACC" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6EFACC", boxShadow: "0 0 8px #6EFACC" }} />LIVE
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", background: `${P.accent}1F`, border: `1px solid ${P.accent}55`, borderRadius: 999, fontFamily: type.mono, fontSize: 11, color: P.accent }}>
                Ward 04 · Cardiac
              </div>
            </div>

            {/* Floating collaborator pills (top right) */}
            <div style={{ position: "absolute", top: 20, right: 24, display: "flex", alignItems: "center", gap: 8, zIndex: 3 }}>
              <div style={{ display: "flex", alignItems: "center", gap: -4 }}>
                {[
                  { i: "PS", c: "#A78BFA" },
                  { i: "MR", c: "#FFB37C" },
                  { i: "NV", c: "#6EFACC" },
                ].map((u, i) => (
                  <div key={u.i} style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg, ${u.c}, ${u.c}AA)`, color: "#FFFFFF", display: "grid", placeItems: "center", fontSize: 9, fontWeight: 700, fontFamily: type.mono, marginLeft: i === 0 ? 0 : -8, border: `2px solid ${P.surface}`, boxShadow: `0 4px 12px ${u.c}55` }}>{u.i}</div>
                ))}
              </div>
              <div style={{ fontFamily: type.mono, fontSize: 11, color: P.muted, marginLeft: 4 }}>3 calibrating</div>
            </div>

            {/* Cursor label (Spline-style collaborator cursor) */}
            <div style={{ position: "absolute", top: 90, right: 80, zIndex: 3, opacity: 0.85 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }}>
                <path d="M2 2 L2 14 L6 11 L9 17 L11 16 L8 10 L14 10 Z" fill={P.accent} />
              </svg>
              <div style={{ display: "inline-block", marginTop: 2, padding: "4px 10px", background: P.accent, color: "#FFFFFF", borderRadius: 6, fontFamily: type.mono, fontSize: 10, fontWeight: 600 }}>Dr. Anjali</div>
            </div>

            {/* Bottom-left tip pill */}
            <div style={{ position: "absolute", bottom: 18, left: 24, padding: "6px 12px", background: "rgba(255,179,124,0.14)", border: "1px solid rgba(255,179,124,0.34)", borderRadius: 999, fontFamily: type.mono, fontSize: 10, color: "#FFB37C", display: "inline-flex", alignItems: "center", gap: 6, zIndex: 3 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB37C" }} />
              {[
                "12 curricula in review",
                "2 drills due before shift end",
                "Calibration cycle Q2-2026 active",
                "PSAT report ready · 3 hospitals",
              ][tab]}
            </div>

            {/* Inner panel containing dynamic content */}
            <div style={{
              position: "relative",
              zIndex: 2,
              marginTop: 56,
              background: P.bg,
              border: `1px solid ${P.line}`,
              borderRadius: 14,
              padding: 28,
              minHeight: 320,
            }}>
              <PanelB tab={tab} P={P} />
            </div>
          </div>
        </Reveal>
      </section>

      <section style={{ padding: `100px ${padX}px`, position: "relative", zIndex: 1, borderTop: `1px solid ${P.line}`, background: P.bg2 }}>
        <div style={{ display: "grid", gridTemplateColumns: vw < 1024 ? "1fr" : "1fr 1fr", gap: vw < 1024 ? 48 : 64, alignItems: "center" }}>
          <CardStack P={P} />
          <div>
            <div style={{ marginBottom: 20 }}><Kicker P={P} type={type}>Composition</Kicker></div>
            <h2 style={{ fontFamily: display, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.035em", margin: 0, fontWeight: 500, marginBottom: 24 }}>
              Layered, not bundled.
            </h2>
            <p style={{ color: P.muted, fontSize: 17, lineHeight: 1.55, maxWidth: 460 }}>
              Each module composes cleanly with the others — and with your existing HMS, EMR, and rostering stack. No rip-and-replace, no weekend cutover, no waiting for a release window.
            </p>
            <div style={{ marginTop: 36, fontFamily: type.mono, fontSize: 12, color: P.muted, letterSpacing: ".08em" }}>
              SCROLL TO LAYER ↓
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: `120px ${padX}px`, borderTop: `1px solid ${P.line}`, position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: 40 }}><Kicker P={P} type={type}>Telemetry</Kicker></div>
        <div style={{ display: "grid", gridTemplateColumns: vw < 900 ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 0, borderTop: `1px solid ${P.line}`, borderBottom: `1px solid ${P.line}` }}>
          {[
            { v: 91, suf: "%", l: "Drill completion across shifts", note: "[34% generic-LMS baseline]", c: P.accent },
            { v: 42, suf: "%", l: "Avg fluency lift in 90 days", note: "[clinical English, all roles]", c: P.accent },
            { v: 1420, suf: "", l: "Staff trained per hospital", note: "[median, year one]", c: P.accent },
            { v: 28, suf: " pts", l: "Patient satisfaction lift", note: "[PSAT, rolling 90d]", c: P.accent },
          ].map((s, i) => (
            <div key={s.l} style={{ padding: "40px 28px", position: "relative", borderRight: i < 3 && vw >= 900 ? `1px solid ${P.line}` : "none", borderBottom: vw < 900 && i < 2 ? `1px solid ${P.line}` : "none", overflow: "hidden" }}>
              <div aria-hidden style={{ position: "absolute", top: -60, left: -40, width: 220, height: 220, borderRadius: "50%", background: s.c, opacity: 0.10, filter: "blur(60px)" }} />
              <div style={{ position: "relative", fontFamily: display, fontSize: 96, lineHeight: 1, letterSpacing: "-0.05em", fontWeight: type.dw, color: s.c, textShadow: `0 0 40px ${s.c}33` }}>
                <CountUp to={s.v} suffix={s.suf} />
              </div>
              <div style={{ position: "relative", fontSize: 15, marginTop: 20, maxWidth: 240, color: P.ink }}>{s.l}</div>
              <div style={{ position: "relative", fontFamily: type.mono, fontSize: 10, color: P.muted, marginTop: 8, letterSpacing: ".08em" }}>{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: `120px ${padX}px`, position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: vw < 900 ? "1fr" : "repeat(2, 1fr)", gap: 28 }}>
          {[
            { q: "We replaced three vendors with Speakx. Our nurses run 5-minute drills between rounds, and patient feedback on communication clarity jumped 28 points in a quarter.", a: "Dr. Priya Sharma", r: "CHRO · Sterling Hospitals", c: P.accent, ini: "PS" },
            { q: "The fluency map finally gave us a shared language with the medical board. Communication lift, not just training hours logged.", a: "Anita Menon", r: "CNO · Meridian Healthcare", c: P.accent, ini: "AM" },
          ].map((t) => (
            <Reveal key={t.a}>
              <div style={{ padding: 40, border: `1px solid ${t.c}33`, background: `linear-gradient(160deg, ${P.surface}, ${t.c}08)`, position: "relative", borderRadius: 16, overflow: "hidden" }}>
                <div aria-hidden style={{ position: "absolute", top: -80, right: -80, width: 240, height: 240, borderRadius: "50%", background: t.c, opacity: 0.08, filter: "blur(60px)" }} />
                <div style={{ position: "absolute", top: -10, left: 28, padding: "4px 12px", borderRadius: 999, background: t.c, color: "#FFFFFF", fontFamily: type.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".12em" }}>CASE STUDY</div>
                <div style={{ position: "relative", fontFamily: display, fontSize: 24, lineHeight: 1.35, letterSpacing: "-0.015em", marginBottom: 32, fontWeight: type.dw }}>&ldquo;{t.q}&rdquo;</div>
                <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 14, paddingTop: 20, borderTop: `1px solid ${P.line}` }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${t.c}, ${t.c}99)`, display: "grid", placeItems: "center", color: "#FFFFFF", fontFamily: type.mono, fontSize: 12, fontWeight: 700, boxShadow: `0 6px 18px ${t.c}55, inset 0 1px 0 rgba(255,255,255,0.4)` }}>{t.ini}</div>
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

      <section style={{ padding: `160px ${padX}px 100px`, borderTop: `1px solid ${P.line}`, position: "relative", zIndex: 1, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(900px circle at 80% 30%, ${P.accent}30, transparent 55%), radial-gradient(700px circle at 15% 80%, ${P.accent}20, transparent 50%)` }}></div>
        <div style={{ maxWidth: 1000, position: "relative" }}>
          <div style={{ marginBottom: 28 }}><Kicker P={P} type={type}>Deploy</Kicker></div>
          <h2 style={{ fontFamily: display, fontSize: "clamp(64px, 8vw, 128px)", lineHeight: 0.95, letterSpacing: "-0.045em", margin: 0, fontWeight: type.dw }}>
            Train every voice in your hospital.
          </h2>
          <p style={{ fontSize: 18, color: P.muted, maxWidth: 560, marginTop: 28, lineHeight: 1.55 }}>
            White-glove rollout for nurses, doctors, front desk, and support staff. Median time-to-launch: 11 working days.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
            <Magnetic primary P={P} font={type.mono} big>Book a pilot →</Magnetic>
            <Magnetic P={P} font={type.mono} big>Talk to clinical leads</Magnetic>
          </div>
        </div>
      </section>

      <footer style={{ padding: `40px ${padX}px`, borderTop: `1px solid ${P.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: P.muted, fontFamily: type.mono, letterSpacing: ".08em", textTransform: "uppercase", position: "relative", zIndex: 1, flexWrap: "wrap", gap: 16 }}>
        <div>© SPEAKX · v4.2.0</div>
        <div style={{ display: "flex", gap: 28 }}>
          <a href="#" style={{ color: "inherit" }}>Security</a>
          <a href="#" style={{ color: "inherit" }}>Compliance</a>
          <a href="#" style={{ color: "inherit" }}>Docs</a>
          <a href="#" style={{ color: "inherit" }}>Status</a>
        </div>
      </footer>
    </div>
  );
}
