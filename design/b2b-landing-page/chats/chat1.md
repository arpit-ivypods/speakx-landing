# 3D Website Clone

_Started 2026-04-29 16:26 UTC_

---

## User

https://mercury.com/

Create a 3d website just like this, replicate entire experience

## Assistant

I can't recreate Mercury's website — that's their branded, copyrighted design. But I'd love to help you build an original 3D-forward B2B landing page that captures the same *feeling* (premium fintech, sophisticated motion, clean type) without copying their specific visual identity.

Let me ask a few questions so I can build something tailored to you, rather than guessing.

_[tool: questions_v2]_

## User

Questions answered:
- audience: L&D Department
- vibe: Explore a few options
- threed_intensity: Moderate — hero + a few 3D moments while scrolling
- threed_subject: Floating product / device mockup
- sections: Hero with 3D, Feature grid, Product screenshot showcase, Numbers / stats band, Testimonials, Pricing, FAQ, CTA / footer, Logo bar (social proof)
- color: Explore a few options
- type: Decide for me
- interactions: 3D object reacts to mouse/scroll, Animated number counters, Tab-switcher in product showcase, Magnetic buttons / cursor effects, Scroll-triggered section reveals
- tweaks: Decide for me
- variations: 2 distinct directions side-by-side

## Assistant

I'll build an original 3D-forward B2B landing page for an L&D (Learning & Development) platform — two distinct directions side-by-side on a design canvas.

Plan:
- **Direction A: "Premium Editorial"** — warm neutrals, serif display + grotesque body, restrained color
- **Direction B: "Techno-Futurist"** — deep ink, mono accents, technical/wireframe energy
- Both feature a floating 3D device hero (CSS 3D transforms reacting to mouse), animated counters, tab-switcher product showcase, magnetic buttons, scroll-reveals
- Tweaks: color palette swap, type pairing swap, light/dark, hero copy variant

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: copy_starter_component]_

Now I'll build the landing page. Two directions, full-bleed, mounted in a design canvas.

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

Now the main HTML file that mounts both directions in a design canvas with shared tweaks:

_[tool: write_file]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

I built an original 3D-forward L&D landing page with two distinct directions side-by-side on a design canvas.

**Direction A — Premium Editorial:** Cream + ink palette, Newsreader serif display paired with Inter Tight, floating 3D laptop hero with mouse-reactive tilt, three drifting UI cards on Z-axis, calm reveals.

**Direction B — Techno-Futurist:** Deep midnight + neon-mint, mono-led type, wireframe-style 3D device on a perspective grid floor with glow, scanline overlay, terminal-y copy ("§02 / PROTOCOLS", `// SURFACE_00`).

Both directions include: hero with 3D mouse-reactive object, social-proof logo bar, feature grid, tabbed product showcase (Programmes / Learner / Skills / Insights), animated stats counters, testimonials, pricing toggle (annual/monthly), expanding FAQ, CTA + footer. Buttons are magnetic.

**Tweaks** (toggle from the toolbar): per-direction palette swap (3 each), type pairing swap, light/dark mode, and 3 hero-copy variants.

Click any artboard to focus it fullscreen for a proper review.

## User

I liked direction B

## Assistant

Great — let's lean into Direction B. I'll promote it to a full-bleed prototype, drop Direction A, expand the 3D moments mid-scroll (you asked for "moderate — hero + a few 3D moments while scrolling"), and tighten the techno-futurist details.

_[tool: snip]_

_[tool: snip]_

Now let me build the full-bleed prototype for Direction B with expanded 3D moments throughout the scroll:

_[tool: copy_files]_

Now I'll write a new, expanded Direction B with additional 3D scroll moments — a rotating skill-graph cube, a parallax stat panel, and a 3D pricing card stack:

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Direction B is now promoted to full-bleed with three 3D moments: hero wireframe device with floating modules, mid-page rotating skill cube (scroll-driven rotation + mouse parallax), and a layered card stack that expands as you scroll past it. Tweaks panel exposes palette (Iris/Mint/Ember), mode, type pairing, and hero copy.

Old version is preserved as `B2B Landing Page v1.html` if you want to compare.

## User

Verifier agent check completed

## Assistant

_[tool: snip]_

I'll fix the responsive issues — nav stacking below 1100px, hero stacking below 1024px, and constrain the floating modules.

_[tool: read_file]_

I'll add a useViewport hook and apply responsive breakpoints by editing the layout-affecting style values directly.

_[tool: str_replace_edit]_

_[tool: snip]_

Now let me apply the responsive fixes. I need to make: hero columns stack <1024px, hero device shrink + floating modules pull in, nav links collapse <1100px.

_[tool: str_replace_edit]_

_[tool: snip]_

Now let me apply the responsive fixes to the main DirectionBFull component — nav and hero sections need breakpoint logic.

_[tool: str_replace_edit]_

_[tool: snip]_

Now let me also apply responsive padding to the rest of the sections that hard-code `64px`:

_[tool: grep]_

_[tool: snip]_

_[tool: grep]_

I'll use a script to apply responsive padding across all the section blocks at once:

_[tool: snip]_

_[tool: run_script]_

I need to push the `vw` variable into Pricing and FAQ sub-components since they use it now. Let me check and fix.

_[tool: snip]_

_[tool: grep]_

_[tool: snip]_

_[tool: run_script]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Responsive fixes are in. Nav collapses to logo + CTA below 1180px, hero stacks vertically below 1024px, hero device + floating modules shrink in compact mode, feature grid drops from 3→2→1 columns, stats from 4→2, testimonials/FAQ/3D-section columns stack on narrow screens, and section padding scales down with viewport.

## User

Verifier agent check completed

## Assistant

_[tool: snip]_

Verified clean across breakpoints. The landing page is ready.

## User

Check the hero 3d effect https://www.adaline.ai/ and try and build something similar on scroll.

## Assistant

_[tool: snip]_

_[tool: web_fetch]_

_[tool: copy_files]_

The text fetch doesn't show the motion. The Adaline hero effect is a well-known pattern: a hero product image that **starts huge / tilted in 3D, lying back like a desk**, and as you scroll it **rotates upright and shrinks to a normal flat product shot** — pinned-section scroll choreography. I'll build that effect (originally, not copying their visuals) for the Cohere hero.

The new hero will:
- Pin a sticky stage for ~150vh
- Image starts at ~40° tilt back (lying flat-ish), oversized, low on screen
- As you scroll, it rotates up to 0°, scales down, and slides into final position
- Floating UI cards parallax in around it
- Then unpins and the rest of the page continues

_[tool: snip]_

I'll build the scroll-driven hero — pinned stage, device starts tilted-back and oversized, rotates upright + scales down as the user scrolls.

_[tool: read_file]_

_[tool: snip]_

I'll build a new ScrollHero component with a pinned scroll-driven 3D rotation, then swap it into the page.

_[tool: str_replace_edit]_

_[tool: snip]_

Now I need to swap the existing hero in DirectionBFull to use ScrollHero instead.

_[tool: grep]_

_[tool: snip]_

_[tool: read_file]_

Now I'll replace the entire hero section with `<ScrollHero />`:

_[tool: str_replace_edit]_

Now also need to remove the duplicate logo bar that's right below since I replaced trust strip earlier — let me check:

_[tool: grep]_

Both kept — different content. Now verify the page loads cleanly.

_[tool: done]_

Hero is now scroll-driven, Adaline-style:

- **Pinned 260vh stage** — page sticks while the device animates
- **Device starts laid back at ~62° tilt**, oversized (1.35×), pushed down — like it's lying flat on a desk
- **As you scroll, it rotates upright to 0°** and scales down to 0.85, settling into final position
- **Headline drifts up + fades** as you progress; **floating side modules + CTA fade in** in the back half
- Mouse parallax stays on top of the scroll choreography for subtle live feel
- Below 1024px it falls back to a static hero (no pin) so mobile doesn't fight the scroll

_[tool: fork_verifier_agent]_

Hero rebuilt with pinned scroll choreography. Verifier is checking the rotation/scale/reveal stages.

## User

Verifier agent check completed

## Assistant

Verifier confirmed clean: no console errors, no overflow, fallback layout works at narrow widths. The pinned scroll choreography activates at ≥1024px — open the artboard fullscreen (or widen the preview pane) to see the device tilt up from laid-back to upright as you scroll the hero.

## User

The scroll must be lot slower and the dashboard should take full screen when scrolling up and should say for few scrolls before moving up on further scrolling.

## Assistant

I'll slow the scroll, add a hold phase where the device sits upright and full-screen before releasing, and increase the pin duration.

_[tool: str_replace_edit]_

Now update the references to `e`, `scale`, `cardOpacity` formula in the rest of the function:

_[tool: grep]_

Also need to find the CTA opacity that uses `e`:

_[tool: grep]_

_[tool: snip]_

_[tool: str_replace_edit]_

Now also need to make the CTA appear at the very end (after settle) rather than during hold — let me adjust:

_[tool: str_replace_edit]_

Verify it loads and ship.

_[tool: done]_

Slowed and re-staged the scroll choreography:

- **Pin duration nearly doubled** — 500vh of scroll now (was 260vh) so the whole sequence takes much longer
- **Three phases:**
  - **0–45%** — device lifts from 62° tilted-back to upright, **scaling up to 1.55× (full-screen)** as it rotates
  - **45–75%** — **HOLD phase**: device sits upright and full-screen for ~30% of the scroll. Floating side modules fade in here
  - **75–100%** — device settles down to 0.85× final size, headline fades, CTA appears
- Headline only starts fading in the settle phase (was fading immediately)
- "SCROLL ↓" hint dismisses sooner so it doesn't linger over the lift

## User

the screen kept on scrolling down and blank space was there for majority of the scroll

## Assistant

The 500vh pin is too long for the viewport — most of the scroll just shows the sticky stage with nothing changing because phases happen fast and then there's dead scroll. Let me check the math: with 500vh total and 100vh sticky, the "travel" is 400vh. The animation phases use the full prog 0→1 so it shouldn't be blank — but if the section's height calc is off, there could be empty space below.

Actually I think the issue is different: after the device lifts and holds, in the settle phase it scales DOWN to 0.85, but the sticky section is still pinned for the remaining 25% of 500vh = 125vh of scroll showing the small device with nothing else happening. Let me restructure:

1. Reduce total height to 350vh
2. Remove the settle/shrink phase entirely — device just rises, holds full-screen, then unpins (page scrolls naturally to next section)
3. Make lift slower, hold longer

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

Fixed:

- **No more shrink phase / dead scroll.** The device just lifts upright + grows to full-screen, then **holds full-screen for the rest of the pin** while floating modules and CTA fade in. When the user keeps scrolling past the hold, the section unpins and the page flows naturally to the next section.
- Total pin reduced 500vh → 350vh, but the lift takes 55% of that (~140vh of scroll) so it still feels much slower than the original.
- No blank space — every scroll position has visible motion or sits on the full-screen dashboard.

