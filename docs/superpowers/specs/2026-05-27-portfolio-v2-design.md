# Portfolio V2 Design Spec

**Date:** 2026-05-27  
**Scope:** Option C — responsiveness fixes, new testimonials, Lab expansion, i18n consolidation, hero & nav visual improvements

---

## 1. Data Layer — i18n Consolidation

**Problem:** 5 data domains split across `en.ts` / `pt.ts` file pairs:
- `data/currently-learning/en.ts` + `pt.ts`
- `data/engineering-practices/en.ts` + `pt.ts`
- `data/experience/en.ts` + `pt.ts`
- `data/projects/en.ts` + `pt.ts`
- `data/system-design/en.ts` + `pt.ts`

**Solution:** Merge each pair into a single bilingual file using the pattern already established in `data/testimonials.ts` — inline `{ pt: string; en: string }` on each localizable field.

**Result:** ~11 files → ~6 files. No visible change to users. Eliminates pt/en desync risk.

**Pattern:**
```ts
// Before: two files
// en.ts: export const items = [{ title: 'Foo' }]
// pt.ts: export const items = [{ title: 'Bar' }]

// After: one file
export const items = [{ title: { en: 'Foo', pt: 'Bar' } }]
```

Components that import these files will need to read `field[locale]` instead of the flat value.

---

## 2. Testimonials — Add 2 New Entries

Add to `data/testimonials.ts`:

**Joao Vargas**
- Role: Desenvolvedor | Full-stack | Java, Spring Boot | React.js, Flutter
- Relationship: worked on same team as João Paulo
- Date: April 16, 2026
- Content (PT): Started career alongside João Paulo. From the start João's competence and curiosity in problem-solving was evident. João was fundamental in his professional growth — always explaining things without measure, dedicating hours (sometimes all day) to solve a problem together. What mattered was always reaching the best solution. Recommends João with full confidence — working with him elevates everyone around.
- `featured: true`

**Felipe Baer**
- Role: Desenvolvedor Full-Stack | Web, Mobile e PWA
- Relationship: worked with João Paulo but in different teams
- Date: April 16, 2026
- Content (PT): Had the pleasure of working with João and can state with full conviction that his work is exceptional. Followed his evolution closely — constant dedication and drive to learn and make things happen. His role was always fundamental, both in decision-making and solution building, thanks to deep technical knowledge and domain mastery. Working with João is a valuable opportunity everyone should have.
- `featured: true`

Both entries have no avatar initially (`avatar` field omitted).

---

## 3. Lab Expansion

### 3a. Backend Challenges — +5 new questions

Add 5 questions covering underrepresented types:
- 2x `debug` type (identify the bug in a code snippet scenario)
- 2x `complexity` type (Big-O reasoning, DB index strategy)
- 1x `tradeoff` type (CAP theorem application)

Append to `data/challenges.ts` with `order` continuing from last existing entry.

### 3b. On-Call Simulator — +1 new incident

Add new `Incident` to `data/incidents.ts`:

**Scenario: Memory Leak Cascade**
- Severity: P2
- Scenario: JVM heap growing steadily over 6h, GC pressure increasing, eventually OOM
- Steps: 3 decision points (heap dump analysis → identify leak source → rolling restart vs fix deploy)
- RCA: unbounded cache without eviction policy

### 3c. New Tab: TIL

Add 4th tab to `LabPage.tsx`: **"TIL"** (Today I Learned).

New component: `components/lab/TILSection.tsx`

Content: 6 cards in a 2-col grid (1-col mobile). Each card has:
- Title (the insight)
- 2-line context
- Code block (optional)
- Tag (DB / JVM / API / Concurrency)

Initial TIL entries:
1. `SELECT FOR UPDATE` locks the row — why and when to use it
2. `INNER JOIN` vs `EXISTS` — when EXISTS wins on performance
3. Connection pool exhaustion — why `maxPoolSize` isn't always "more = better"
4. Why `@Transactional` on private methods silently fails in Spring
5. Kafka consumer group rebalance — what triggers it and how to minimize
6. HTTP 429 retry-after — proper backoff vs thundering herd

Tab badge: `NEW`

---

## 4. Hero — Animated Terminal

**Replace** the static Unsplash code image with a new `<TerminalWindow>` component.

**File:** `components/ui/TerminalWindow.tsx`

**Visual:**
- macOS-style window chrome: red/yellow/green dot buttons, dark title bar
- Monospace font, emerald text on near-black background
- Subtle emerald glow border (`border border-emerald-500/20 shadow-emerald-500/10`)

**Animation:**
- Lines appear sequentially via typewriter effect (Framer Motion or CSS)
- Loops after reaching the last line (with a pause)
- ~8 lines showing real backend scenarios:
  ```
  $ docker stats --no-stream api-service
  CONTAINER   CPU    MEM        MEM %
  api-service 12.3%  412MiB     54%
  
  $ curl -s /health | jq '.latency_p99'
  "47ms"
  
  $ psql -c "EXPLAIN ANALYZE SELECT ..."
  Seq Scan on orders (cost=0.00..1842.00)
  Planning time: 0.8ms
  ```

**Responsive:** hidden on `< lg` (same as current image).

---

## 5. Navigation — Cleanup & Scroll Spy

### 5a. Remove tablet duplicate block

Current code has a separate `hidden md:flex lg:hidden` block with `slice(0,5)`. Remove it. Single desktop nav (`hidden lg:flex`) with `gap-6` works down to 1024px.

### 5b. Scroll spy

Add `useScrollSpy` hook in `hooks/useScrollSpy.ts`:
- Observes section IDs via `IntersectionObserver` with `rootMargin: '-20% 0px -70% 0px'`
- Returns `activeSection: string`
- Nav items highlight with emerald underline when their section is active

### 5c. Mobile menu animation

Replace abrupt `{mobileMenuOpen && <div>}` with `AnimatePresence` + `motion.div` using:
```
initial={{ height: 0, opacity: 0 }}
animate={{ height: 'auto', opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
```

---

## 6. Responsiveness Fixes

| Location | Problem | Fix |
|---|---|---|
| Lab tabs | Overflow cut on < 400px | `overflow-x-auto` + `flex-nowrap` on tab bar |
| Hero h1 | `text-5xl` too large at 320px | Change to `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` |
| Testimonials | Long text breaks layout on narrow tablet | Reduce `p-6 md:p-8` to `p-5 md:p-8`, add `line-clamp-6` with expand toggle |
| LabPage back link | "Voltar ao portfólio" hardcoded PT | Move to `messages/pt.json` + `messages/en.json` under `lab.backLink` |

---

## File Change Summary

**New files:**
- `components/ui/TerminalWindow.tsx`
- `components/lab/TILSection.tsx`
- `hooks/useScrollSpy.ts`
- `docs/superpowers/specs/2026-05-27-portfolio-v2-design.md`

**Modified files:**
- `data/testimonials.ts` — add 2 entries
- `data/challenges.ts` — add 5 challenges
- `data/incidents.ts` — add 1 incident
- `data/currently-learning.ts` (merged from `en.ts`+`pt.ts`)
- `data/engineering-practices.ts` (merged)
- `data/experience.ts` (merged)
- `data/projects.ts` (merged)
- `data/system-design.ts` (merged)
- `components/lab/LabPage.tsx` — add TIL tab
- `components/home/Hero.tsx` — replace image with TerminalWindow
- `components/layout/Navigation.tsx` — scroll spy, remove tablet block, animate mobile menu
- `components/home/Testimonials.tsx` — line-clamp expand
- `messages/pt.json` + `messages/en.json` — add `lab.backLink`
- All components consuming the 5 merged data files — update to `field[locale]` access

**Deleted files:**
- `data/currently-learning/en.ts`, `data/currently-learning/pt.ts`
- `data/engineering-practices/en.ts`, `data/engineering-practices/pt.ts`
- `data/experience/en.ts`, `data/experience/pt.ts`
- `data/projects/en.ts`, `data/projects/pt.ts` (keep `en-backup.ts` for safety)
- `data/system-design/en.ts`, `data/system-design/pt.ts`
