# Codebase Summary — PMS VNU-HCM Frontend

**Last Updated**: 2026-04-18
**Version**: 0.1.0
**Repository**: `/Users/coolstar/inseclab/khoa-hoc-cong-nghe/web/`

## Overview

PMS VNU-HCM Frontend is a Next.js 15 application implementing Figma designs for a university research task management system. Features dual-role UI (Researcher primary flow + Admin superuser view) with 28 routes, full TypeScript strict mode, Tailwind v4 styling, and shadcn/ui base-nova components. No backend; mock TS data layer provides realistic sample content.

## Folder Structure

```
web/
├── app/                           # Next.js App Router
│   ├── (auth)/                   # Route group: Auth pages
│   │   ├── dang-nhap/            # Unified login
│   │   └── layout.tsx            # Gradient auth background
│   ├── (nkh)/                    # Route group: Researcher flow (URL prefix hidden)
│   │   ├── dashboard/            # Dashboard with programs & quick actions
│   │   ├── dang-ky/              # Registration wizard (4 tabs)
│   │   │   ├── [tab]/page.tsx    # Dynamic tab routing
│   │   │   ├── thong-tin-chung/  # Tab 1: General info
│   │   │   ├── thue-minh-tl/     # Tab 2: Explanations & templates
│   │   │   ├── danh-sach-tv/     # Tab 3: Team members
│   │   │   └── nop-ho-so/        # Tab 4: Submission checklist
│   │   ├── ho-so-cua-toi/        # My dossier list
│   │   ├── ky-so/                # Digital signature (5 steps)
│   │   ├── chuong-trinh-mo/      # Program catalog
│   │   ├── thong-bao/            # Notifications
│   │   ├── tai-khoan/            # User profile
│   │   └── layout.tsx            # NKH sidebar (emerald theme)
│   ├── admin/                    # Admin route group
│   │   ├── dashboard/            # KPI dashboard
│   │   ├── nhiem-vu/             # Task list (filterable)
│   │   ├── nhiem-vu-tai-tro/     # Sponsored tasks
│   │   ├── hop-dong-tai-tro/     # Sponsorship contracts
│   │   ├── ky-ket-hop-dong/      # Contract signing wizard (4 steps)
│   │   ├── nhat-ky-trien-khai/   # Implementation log
│   │   ├── ly-lich-to-chuc/      # Organization info
│   │   ├── theo-doi-nhiem-vu/    # Task tracking
│   │   └── layout.tsx            # Admin sidebar (navy theme)
│   ├── layout.tsx                # Root layout (Inter font, metadata, ThemeProvider)
│   ├── page.tsx                  # Redirect → /dang-nhap
│   └── not-found.tsx             # Branded 404 page
│
├── components/                    # Reusable components
│   ├── app-sidebar.tsx           # Sidebar (theme-aware variant prop)
│   ├── app-topbar.tsx            # Top navigation bar
│   ├── nhiem-vu/                 # Task-related components
│   │   ├── tab-don-dang-ky.tsx   # Registration form tab
│   │   ├── filter-bar.tsx        # Task list filters
│   │   └── data-table.tsx        # Task table display
│   ├── nkh/                      # Researcher-specific UI
│   │   ├── dashboard-stat-card.tsx
│   │   ├── program-card.tsx      # Program browsing card
│   │   ├── register-program-modal.tsx
│   │   └── ky-so-step-*.tsx      # Digital signature steps
│   ├── admin/                    # Admin-specific UI
│   │   ├── dashboard-chart.tsx   # Mock bar/donut charts
│   │   ├── tab-*.tsx             # Wizard tab content
│   │   └── timeline.tsx          # Implementation log timeline
│   ├── shared/                   # Both roles
│   │   ├── login-card.tsx        # Login form with role detection
│   │   ├── wizard-tabs.tsx       # Multi-tab wizard container
│   │   ├── form-field.tsx        # Labeled form wrapper
│   │   ├── page-shell.tsx        # Standard page layout
│   │   ├── status-chip.tsx       # Status badge (review/signed/active/done)
│   │   └── file-upload-box.tsx   # Drag-drop file zone
│   ├── brand/                    # VNU branding
│   │   └── vnu-logo.tsx          # University logo display
│   ├── auth/                     # Auth-specific
│   │   └── auth-blob.tsx         # SVG blob decorations
│   ├── ui/                       # shadcn/ui primitives (19 components)
│   │   ├── button.tsx, input.tsx, select.tsx, form.tsx, ...
│   │   └── [other base-ui components]
│
├── lib/                          # Utilities & data
│   ├── mock-data/                # Sample data domain
│   │   ├── nhiem-vu.ts           # Task mock (15 items + countByStatus)
│   │   ├── hop-dong.ts           # Contract mock (7 items)
│   │   ├── organization.ts       # Org & team data
│   │   ├── nhat-ky.ts            # Log entry sample
│   │   ├── thanh-vien.ts         # Team member + featured member
│   │   ├── dashboard.ts          # KPI, charts, status breakdown (derive from list)
│   │   └── programs.ts           # Program catalog with registration modal
│   ├── utils/                    # Helper functions
│   │   ├── cn.ts                 # classNames merge helper
│   │   └── [other utilities]
│   ├── nav-config.ts             # Sidebar navigation structure (role variants)
│   ├── color-scheme.ts           # Theme token definitions (navy/emerald)
│   ├── validators.ts             # Zod schemas (form validation)
│   └── types.ts                  # TypeScript interfaces
│
├── public/                       # Static assets
│   └── logo-vnu-hcm.png         # VNU logo image
│
├── .eslintrc.js                 # Linting config
├── tsconfig.json                # TypeScript strict mode (ES2022, baseUrl, paths)
├── tailwind.config.ts           # Tailwind v4 with theme tokens & 2 color schemes
├── next.config.ts               # Next.js configuration (Turbopack)
├── package.json                 # Dependencies (React 19, Next 15, TS strict, etc)
└── README.md                    # Dev setup & commands
```

## Tech Stack

### Runtime & Framework
- **Node.js**: >=18.0.0
- **React**: 19.1.0
- **Next.js**: 15.5.15 with App Router + Turbopack
- **TypeScript**: 5.x (strict mode)
- **Package Manager**: npm

### Styling & UI
- **Tailwind CSS**: v4 (with `@theme` custom tokens)
- **CSS Variables**: theme-aware brand/status/surface/ink color schemes
- **shadcn/ui**: base-nova (Button, Input, Select, Form, Card, Dialog, Table, etc)
- **CVA**: Class Variance Authority for component variants

### Form & Validation
- **React Hook Form**: v7.72.1 (controlled form management)
- **Zod**: v4.3.6 (runtime schema validation)
- **@hookform/resolvers**: Zod integration

### Utilities & Libraries
- **lucide-react**: 1.8.0 (SVG icons, decorative + functional)
- **date-fns**: 4.1.0 (date parsing/formatting)
- **clsx**: 2.1.1 (conditional className)
- **tailwind-merge**: 3.5.0 (merge conflicting Tailwind classes)
- **sonner**: 2.0.7 (toast notifications)
- **next-themes**: 0.4.6 (theme persistence, future dark mode)

### Development Tools
- **ESLint**: 9.x with Next.js config
- **TypeScript Compiler**: Strict, with baseUrl & path aliases
- **Turbopack**: Fast bundler & dev server

### Build & Deployment Ready
- `npm run dev` — Turbopack dev server on http://localhost:3000
- `npm run build` — Production build (Next.js + Turbopack)
- `npm run lint` — ESLint validation
- Build output: `.next/` directory (ready for Vercel or Node.js server)

## Key Components

### 1. Theme System (Dual Variant)

**Admin Theme (Navy)**:
- Primary: Brand-700 `#003087`
- Sidebar: `bg-brand-700 text-white`
- Active pill: `bg-brand-600`
- Accent: Brand tones (blue/teal)

**Researcher Theme (Emerald)**:
- Primary: Emerald-600 `#059669`
- Sidebar: `bg-emerald-900 text-white`
- Active pill: `bg-emerald-700`
- Accent: Emerald/green tones

**Shared Status Colors** (both themes):
- Review: `#3b82f6` (blue)
- Signed: `#10b981` (green)
- Active: `#f59e0b` (amber)
- Done: `#8b5cf6` (purple)

Implementation: CSS variables in `globals.css`, toggled via `<html data-theme>` attribute & tailwind `@theme` in config.

### 2. Route Groups & Layouts

**`(auth)` Layout**:
- Symmetric blob decorations (SVG)
- Centered login card (300px)
- No sidebar/topbar
- Gradient background (navy)

**`(nkh)` Layout** (Researcher):
- Emerald-900 sidebar (240px fixed)
- User block at top (role badge "🌿 Nhà Khoa Học")
- 5 nav items (Home, Programs, My Dossier, Notifications, Account)
- No topbar

**`/admin` Layout** (Superuser):
- Navy sidebar (240px fixed)
- Org selector + user at bottom
- 8 nav items (Dashboard, Tasks tree, Contracts, Logs, Org, Milestones, etc)
- TopBar with VNU logo + org name

**Root Layout**:
- Inter font (vietnamese subset)
- Next.js Metadata (title, description, viewport)
- Dark mode provider (next-themes, theme key "app-theme")

### 3. Form & Validation

**Registration Form (Tab 1)**:
- Zod schema: 11 fields (task name, field, organization, principal, email, members, files, budget, schedule, notes, uploads)
- React Hook Form controller over each Input
- Custom FormField wrapper with label + required indicator
- Client-side validation on blur, server-side on submit (mock)

**Login Form**:
- Email-only input
- Role detection logic: `email.startsWith("admin@")` → Admin, else → Researcher
- No password (demo only)

### 4. Mock Data Architecture

All sample data in `lib/mock-data/`:
- **nhiem-vu.ts**: `nhiemVuList` (15 tasks) + `countByStatus(list)` helper
- **hop-dong.ts**: `hopDongList` (7 contracts) with signatory states
- **nhat-ky.ts**: `logEntries` (10 log records) + `taskLogContext` mapping
- **thanh-vien.ts**: `members` (4 team) + `chuNhiemFeatured` (lead profile)
- **dashboard.ts**: Derives KPIs from `nhiemVuList` (NOT hardcoded) + mock charts
- **programs.ts**: `programsList` (3 programs) for browsing/registration

Helper functions: `countByStatus()`, date calculations with `date-fns`.

### 5. Component Reuse Strategy

**High-reuse components**:
- `StatusChip` — Status badges (review/signed/active/done), used 20+ times
- `DataTable` — Tabular lists (tasks, contracts, members), used 5+ times
- `FormField` — Form input wrapper with label
- `PageShell` — Page layout container (header + content + footer optional)
- `WizardTabs` — Multi-tab form container (4 NKH tabs + 4 Admin contract steps)
- `FileUploadBox` — Drag-drop file upload zone
- `ProgramCardList` — Browse program cards with modal trigger

**Medium-reuse**:
- `FilterBar` — Task list filters (by status, org, role)
- `Timeline` — Implementation log (event-based display)
- `LoginCard` — Unified auth UI
- Charts (BarChartMock, DonutChartMock)

**Single-use** (domain-specific):
- Digital signature steps (5 in NKH `/ky-so`)
- Admin dashboard tiles
- Registration tabs (4 unique content areas)
   - Extracts todos, modified files, branch, and plan info
   - 7-day auto-expiry, atomic writes, fail-safe
   - Startup and post-compaction recovery messaging is handled by `session-init.cjs`

6. **privacy-block.cjs** - Sensitive File Access Control
7. **descriptive-name.cjs** - Naming conventions enforcement
8. **post-edit-simplify-reminder.cjs** - Post-edit optimization hints
9. **usage-context-awareness.cjs** - Gated prompt-awareness wrapper for usage-based injection
10. **usage-quota-cache-refresh.cjs** - Cosmetic 5h / wk cache warmer for the statusline

**Hook Features:**
- Fail-Safe: All hooks exit 0 (non-blocking) - graceful degradation
- Performance: Optimized token consumption
- Cross-Platform: Windows (PowerShell) & Unix (Bash) via Node.js dispatcher
- Comprehensive Test Coverage: scout-block hook validated via Node.js test suite

### 5. Workflows

**Primary Workflows** (`.claude/rules/`):
1. **primary-workflow.md**: Core development cycle
   - Code implementation
   - Testing
   - Code quality
   - Integration
   - Debugging

2. **orchestration-protocol.md**: Agent coordination patterns
   - Sequential chaining
   - Parallel execution

3. **development-rules.md**: Development standards
   - File size management (<500 lines)
   - YAGNI, KISS, DRY principles
   - Code quality guidelines
   - Pre-commit/push rules

4. **documentation-management.md**: Doc maintenance
   - Roadmap and changelog updates
   - Automatic update triggers
   - Documentation protocols

## Entry Points

### For Users
- **README.md**: Project overview and quick start
- **guide/SKILLS.md**: Comprehensive skills reference (7,073 tokens)
- **CLAUDE.md**: Development instructions and workflows

### For Developers
- **package.json**: Dependencies and scripts
- **.releaserc.json**: Semantic release configuration
- **.commitlintrc.json**: Commit message linting rules
- **.gitignore**: Version control exclusions

### For Agents
- **CLAUDE.md**: Primary agent instructions
- **.claude/rules/**: Development rules and protocols
- **plans/templates/**: Implementation plan templates

## Development Principles

### YAGNI (You Aren't Gonna Need It)
Avoid over-engineering and unnecessary features

### KISS (Keep It Simple, Stupid)
Prefer simple, straightforward solutions

### DRY (Don't Repeat Yourself)
Eliminate code duplication

### File Size Management
- Keep files under 500 lines
- Split large files into focused components
- Extract utilities into separate modules

### Security First
- Try-catch error handling
- Security standards coverage
- No secrets in commits
- Confidential info protection

## Agent Communication Protocol

**Report Format**: Markdown files in `./plans/<plan-name>/reports/`
**Naming Convention**: `{date}-from-[agent]-to-[agent]-[task]-report.md`

**Communication Patterns**:
- Sequential: Task dependencies require ordered execution
- Parallel: Independent tasks run simultaneously
- Query Fan-Out: Multiple researchers explore different approaches

## Git Workflow

**Commit Message Format**: Conventional Commits
```
type(scope): description

Types:
- feat: Features (minor bump)
- fix: Bug fixes (patch bump)
- docs: Documentation (patch bump)
- refactor: Code refactoring (patch bump)
- test: Tests (patch bump)
- ci: CI changes (patch bump)
- BREAKING CHANGE: Major version bump
```

**Automated Release**:
- Every push to `main` triggers release check
- Semantic versioning (MAJOR.MINOR.PATCH)
- Automated changelog generation
- GitHub releases with generated notes

## Testing Strategy

- Comprehensive unit tests required
- High code coverage mandatory
- Error scenario testing
- Performance validation
- Tests must pass before push
- No ignoring failed tests

## Documentation Standards

**Required Docs** (`./docs/`):
- `project-overview-pdr.md` - Project overview and PDR
- `code-standards.md` - Coding standards and structure
- `codebase-summary.md` - This file
- `system-architecture.md` - Architecture documentation
- `project-roadmap.md` - Development roadmap
- `project-changelog.md` - Detailed changelog
- `statusline-windows-support.md` - Windows statusline setup guide
- `statusline-architecture.md` - Technical statusline implementation

**Documentation Triggers**:
- Feature implementation completion
- Major milestone achievements
- Bug fixes
- Security updates
- Weekly reviews

## Dependencies Overview

### Production Dependencies
None (template project)

### Development Dependencies
- **@commitlint/cli**: ^18.4.3
- **@commitlint/config-conventional**: ^18.4.3
- **@semantic-release/changelog**: ^6.0.3
- **@semantic-release/commit-analyzer**: ^11.1.0
- **@semantic-release/git**: ^10.0.1
- **@semantic-release/github**: ^9.2.6
- **@semantic-release/npm**: ^11.0.2
- **@semantic-release/release-notes-generator**: ^12.1.0
- **conventional-changelog-conventionalcommits**: ^7.0.2
- **husky**: ^8.0.3
- **semantic-release**: ^22.0.12

## File Statistics

**Total Files**: 48 files (in repomix output)
**Total Tokens**: 38,868 tokens
**Total Characters**: 173,077 chars

**Top 5 Files by Token Count**:
1. `guide/SKILLS.md` - 7,073 tokens (18.2%)
2. `CHANGELOG.md` - 4,836 tokens (12.4%)
3. `README.md` - 3,261 tokens (8.4%)

## Integration Capabilities

### Discord Notifications
Script: `.claude/hooks/notifications/notify.cjs` + `providers/discord.cjs`
Purpose: Send project updates to Discord channels

### GitHub Actions
Workflow: `.github/workflows/release.yml`
Features: Automated releases, changelog generation

### Agent Skills
- **brain**: Advanced reasoning
- **docs-seeker**: Documentation reading
- **ai-multimodal**: Visual understanding
- **ai-multimodal & imagemagick skills**: Content generation and processing

## Critical Files

### Configuration
- `package.json` - Node.js config
- `.releaserc.json` - Release config
- `.commitlintrc.json` - Commit linting
- `.gitignore` - Git exclusions
- `.repomixignore` - Repomix exclusions

### Documentation
- `README.md` - Main project docs
- `CLAUDE.md` - Agent instructions
- `CHANGELOG.md` - Version history
- `guide/SKILLS.md` - Skills reference

### Workflows
- `.claude/rules/primary-workflow.md`
- `.claude/rules/development-rules.md`
- `.claude/rules/orchestration-protocol.md`
- `.claude/rules/documentation-management.md`

## Related Projects

- **claudekit** - ClaudeKit website (`../claudekit`)
- **claudekit-marketing** - Marketing Kit (`../claudekit-marketing`)
- **claudekit-cli** - CLI setup tool (`../claudekit-cli`)
- **claudekit-docs** - Public docs (`../claudekit-docs`)

## Version History

**Current**: v2.9.0-beta.2 (released 2026-01-28)
**License**: MIT
**Author**: Duy Nguyen
**Repository**: https://github.com/claudekit/claudekit-engineer

## Unresolved Questions

None identified. All core components are well-documented and functional.
