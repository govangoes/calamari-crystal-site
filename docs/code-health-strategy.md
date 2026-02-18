# Code Health Strategy (CodeScene-Informed)

This document turns the **Code Health Report** and **Software Portfolio Overview** (CodeScene, Feb 2026) into a concrete strategy for calamari-crystal-site.

---

## 1. Current Snapshot (from reports)

| Metric                     | Value                                                                 |
| -------------------------- | --------------------------------------------------------------------- |
| **Code Health**            | 81% healthy (green), **19% problematic (yellow)**, 0% unhealthy (red) |
| **Health score**           | 9.6 (hotspot), 9.6 avg, **8.7 worst performer**                       |
| **Knowledge Distribution** | **Attention** (portfolio) — improvement recommended                   |
| **Team–Code Alignment**    | Not configured (define teams in CodeScene if needed)                  |
| **Delivery**               | Pro plan required for metrics; CI already runs on push/PR             |

**Takeaway:** The repo is in good shape overall. The main levers are: (1) reduce the 19% problematic (yellow) code, and (2) improve knowledge distribution so the project isn’t dependent on a single person.

---

## 2. Goals

1. **Shrink problematic code** — Target the ~978 LOC (19%) that CodeScene flags as yellow; improve structure, tests, or docs so it trends green.
2. **Improve Knowledge Distribution** — Document architecture, hotspots, and key decisions so onboarding and maintenance are easier.
3. **Keep health stable** — Use PR checklist and CI so new work doesn’t regress code health.

---

## 3. Action Plan

### 3.1 Target “Yellow” (Problematic) Code

- **Identify hotspots:** Focus on files with high churn or high complexity. In this repo, likely candidates include:
  - `src/data/orlandoOpenMics.js` (large data module)
  - `src/components/RapMapExplorer.jsx`, `src/components/LyricsLabContent.jsx` (larger UI components)
  - `src/utils/lyricsAnalysis.js` (core logic)
- **Actions:**
  - Add brief JSDoc or file-head comments for data shape and purpose.
  - Extract subcomponents or pure functions where it simplifies reasoning.
  - Add or extend unit tests for critical paths (e.g. `lyricsAnalysis`, key components).

### 3.2 Knowledge Distribution

- **Document architecture:** See `docs/ARCHITECTURE.md` for high-level structure, routing, and where key features live.
- **Keep AGENTS.md current:** Update when you add conventions, scripts, or env vars.
- **Comment non-obvious logic:** Especially in hotspots and in `api/*` and `scripts/*`.

### 3.3 Process (PRs and CI)

- **PR template:** Use the Code Health checklist on every PR (lint, test, build, no unnecessary complexity).
- **CI:** Already runs lint, test, and build on push/PR; keep that as the quality gate.
- **Optional:** Enable CodeScene PR integration for automated delta analysis and trend visibility.

### 3.4 Optional CodeScene Setup

- **Teams:** If multiple people work on the repo, define teams in CodeScene to get Team–Code Alignment.
- **PM/issue integration:** Connect Jira/GitHub Issues etc. to reason about effort and defects in hotspots.

---

## 4. Success Criteria

- **Short term:** No new red code; yellow (problematic) percentage does not increase.
- **Medium term:** Yellow percentage decreases (e.g. 19% → 15%) and Knowledge Distribution moves from “Attention” to “Healthy.”
- **Long term:** Stable or improving health score (e.g. worst performer above 9.0) and faster, more predictable delivery.

---

## 5. References

- Code Health Report (CodeScene) — project-level health and trends.
- Software Portfolio Overview — 4 factors (Code Health, Knowledge Distribution, Team–Code Alignment, Delivery).
- In-repo: `AGENTS.md`, `docs/ARCHITECTURE.md`, `.github/pull_request_template.md`, `.github/workflows/ci.yml`.
