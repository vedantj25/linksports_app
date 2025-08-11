## LinkSports Mobile UI Revamp – Design Specification (v0.1 Draft)

This document proposes a modernized visual direction and component system for the LinkSports mobile app (Expo/React Native). It highlights key screens, UX patterns, accessibility, and an implementation plan. Questions requiring your input are listed at the end.

### 1) Design Goals
- Elevate perceived quality with a clean, modern look that feels “sports-tech”.
- Improve first-time experience (splash + intro), increase sign-in/sign-up conversion.
- Establish a cohesive design system: colors, type scale, spacing, components.
- Ensure accessibility (contrast, touch targets, motion preferences) and dark mode readiness.

### 2) Brand Direction (Confirmed)
- Primary color: `#FF6B00` (orange). Hover/tint `#FF8F33`.
- Secondary color: `#005BBB` (blue). Alt `#4DA3FF`.
- Neutrals: Light `#F5F5F5` backgrounds, white cards, subtle borders.
- Shape language: Rounded, medium-radius corners; minimal shadows.
- Visual motif: Subtle diagonal gradients and motion lines are allowed.

### 3) Typography
- Keep existing system for now (already loaded):
  - Headlines: Roboto 700
  - UI labels/buttons: Roboto 500
  - Secondary text: Open Sans 400/600
- Optional upgrade: switch to Inter (tight metrics, modern look) in a later iteration.

### 4) Spacing & Layout
- Grid: 8pt base. Section paddings 16–24pt. Screen gutters 16pt.
- Buttons: Full-width primary CTAs; consistent vertical rhythm (12–16pt spacing).
- Inputs: Labeled, helper/error text below; icons optional.

### 5) Core Components (RN/Expo)
- Buttons: Variants – primary, secondary, outline, ghost; sizes sm/md/lg. Full-width by default on forms. Loading states.
- Inputs: Label, helper/error, optional leading icon, password visibility toggle.
- Cards: White/dark cards, subtle borders; optional header area.
- Badges/Chips: For roles (player/coach/club), tags, filters.
- Tab bar: Icons with labels, clear active state, safe tap sizes.
- Banners: Informational and action banners (e.g., profile incomplete) with iconography.

### 6) Iconography
- Library: Ionicons via `@expo/vector-icons` (no strict preference given; chosen for breadth and modern look).
- Style: 24px filled for active, outline for inactive; strong contrast in dark mode.
- Tabs (proposed):
  - Feed: home
  - Discover: compass/magnify
  - Profile: person/account-circle

### 7) Color & Elevation System
- Light mode
  - Background: `#F5F5F5`
  - Card: `#FFFFFF`
  - Text: `#121212`
  - Secondary text: `#A0A0A0`
  - Border: `#E6E6E6`
- Dark mode
  - Background: `#121212`
  - Card: `#1E1E1E`
  - Text: `#F5F5F5`
  - Secondary text: `#888888`
  - Border: `#2A2A2A`
- Shadows: Minimal; rely on borders + contrast.

### 8) Motion & Haptics
- Subtle micro-interactions on presses (opacity/scale) and haptics for success/error.
- Reduce motion if system “Reduce Motion” is enabled.
- Lottie animations are allowed as long as they are lightweight and do not delay interactions. We will add a minimal loader on Splash and Intro.

### 9) Key Screens

9.1 Splash
- Full-bleed background (solid or gradient), centered logo mark + wordmark.
- Optional light Lottie/animated gradient.
- Status bar styled to match background.
- Keeps launch time minimal (fast handoff to app).

9.2 Intro Slider (3 slides)
- Slide 1 – Discover: “Discover players, coaches and clubs.”
- Slide 2 – Connect: “Grow your sports network.”
- Slide 3 – Showcase: “Share achievements and highlights.”
- Each slide: illustration/icon, headline, 1–2 lines body.
- Controls: pagination dots, Skip, Next; final slide shows primary CTA.
- CTAs: “Continue with email” + optional Apple/Google (if enabled).
 - Tagline: “Connect. Grow. Play.”

9.3 Login
- Layout: Brand header (small logo), title, inputs, actions.
- Inputs: Email/username, password with visibility toggle.
- Actions: Primary full-width “Sign in”, secondary “Create account”, link “Forgot password?”
- Error handling: Inline error below inputs; non-blocking toast for network errors.
 - Legal: Terms/Privacy links present (non-navigating for now).

9.4 Signup
- Layout: similar to Login; progressive disclosure if needed.
- Inputs: Email, password, user type selector (segmented control/chips: player/coach/club).
- Actions: Primary “Create account”, secondary “I already have an account”.
- Post-submit: email verification info screen.
 - Business rule: User type remains mandatory at signup (backend dependent).

9.5 Tabs (Feed, Discover, Profile)
- Bottom tabs with icons + labels; active color = primary.
- Larger hit targets; improved contrast.

### 10) Empty/Loading/Error States
- Loading: Skeletons or activity indicators aligned to content blocks.
- Empty: Friendly illustration + 1–2 lines + CTA.
- Errors: Inline + toast; offer retry.

### 11) Accessibility
- Contrast ratio target ≥ 4.5:1 for body text.
- Min touch area 44×44pt.
- Dynamic type supported; layouts don’t break.
- Semantic focus order; VoiceOver labels on buttons/inputs.

### 12) Implementation Plan (Phased)
- Phase 1 (Foundation)
  - Install icon set via `@expo/vector-icons`.
  - Normalize buttons/inputs in auth screens to custom components with full-width layout.
  - Update tab navigator to show icons and consistent labels.
  - Update app.json splash: background color, centered mark; add simple animation in SplashScreen.

 - Phase 2 (Intro & Auth UX)
  - Build intro slider (3 slides) with Skip/Next/CTA.
  - Redesign Login/Signup with `AuthLayout`, password toggle, error presentation, links.
  - Add “Forgot password” placeholder flow.
  - Add lightweight Lottie loader on Splash and Intro.

 - Phase 3 (Polish)
  - Refine banners, empty/loading states, micro-interactions, haptics.
  - Dark mode polish and icon set tuning.

 - Phase 4 (Stretch)
  - Social sign-in (Apple/Google) if approved.
  - Visual illustrations or Lottie (branding assets dependent).

### 13) Deliverables
- Updated theme with cohesive palette and spacing.
- Iconized tab bar.
- Modern Splash + Intro slider.
- Redesigned Login/Signup using shared layout.
- Consistent components across Profile, Feed, Discover (incremental).

### 14) Decisions Locked
1. Colors: Keep current `#FF6B00` (primary) and `#005BBB` (secondary).
2. Logo: No assets yet; use a temporary wordmark.
3. Icons: Use Ionicons via `@expo/vector-icons`.
4. Gradients: Allowed.
5. Motion: Lottie allowed but must be lightweight and smooth; no delay.
6. Social auth: Deferred.
7. Copy: “Connect. Grow. Play.” and three intro slide headlines approved for now.
8. Legal: Show Terms/Privacy links on auth (non-navigating for now).
9. Signup: User type required; check backend.
10. Status bar: System default.

Proceeding with Phase 1–2 under these constraints.


