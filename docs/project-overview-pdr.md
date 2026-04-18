# Project Overview & Product Development Requirements (PDR)

**Project Name**: PMS VNU-HCM — Frontend Demo
**Version**: 0.1.0
**Last Updated**: 2026-04-18
**Status**: Demo Complete (Internal Use)
**Repository**: `/Users/coolstar/inseclab/khoa-hoc-cong-nghe/web/`

## Executive Summary

PMS VNU-HCM is a frontend demo application for the Research Task Management System (Hệ thống Quản lý Nhiệm vụ KH&CN) of Vietnam National University, Ho Chi Minh City. Built from Figma design via Claude Code AI-assisted development. Deliverable: 28 static routes + 1 dynamic route, ~3,500 LOC (without shadcn UI primitives), 2 theme variants (navy admin + emerald scientist), full flow demo (Login → Registration → Submission → Digital Signature → Success). Built with Next.js 15, React 19, TypeScript strict, Tailwind v4, shadcn/ui base-nova. No backend integration yet; mock data layer only.

## Project Scope

### Objective
Deliver a high-fidelity UI demo translating Figma designs (22 frames) into working Next.js frontend for two user roles: Researchers (Nhà khoa học) and Administrative Organization (Tổ chức chủ trì / Superuser).

### Delivered Flows
1. **Researcher (NKH) Primary Flow**: Login → Dashboard → Register for Program → 4-Tab Registration Wizard → Digital Signature (5 steps) → Success confirmation
2. **Admin (Superuser) View**: Dashboard with KPIs + Task management (list, filter, status tracking) + Contract signing (4 steps) + Implementation log + Team & dossier management

### Design Fidelity
- **Overall**: 85-90% visual match vs Figma
- **NKH flow post-rebuild**: 92% (all 7 screenshots implemented)
- **Admin key screens post-rebuild**: 90% (members, submissions, contract, logs)

### Technical Stack
- **Framework**: Next.js 15.5.15 with App Router + Turbopack
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + custom theme tokens (brand palette, status colors, shadows)
- **Components**: shadcn/ui base-nova + custom (Sidebar, TopBar, Tables, Forms, Cards)
- **Form**: React Hook Form + Zod validation
- **Icons**: lucide-react
- **Utils**: date-fns, clsx, tailwind-merge
- **Themes**: 2 variants via CSS variables (Navy `#003087` for Admin, Emerald `#059669` for NKH)

### Design Tokens (Extracted from Figma)
- **Primary Colors**: Brand navy `#003087` (admin), Emerald-600 (NKH), Emerald-900 (NKH sidebar)
- **Status Pastels**: Review blue `#3b82f6`, Signed green `#10b981`, Active amber `#f59e0b`, Done purple `#8b5cf6`
- **Typography**: Inter font with Vietnamese subset
- **Spacing**: 8/12/16/20/24px base scale
- **Shadows**: card (light), hero (elevated)

## Deliverables

### Routes Map
**Researcher (NKH) - 7 routes** (root level, route group `(nkh)` hides prefix):
- `/dang-nhap` — Unified login (role-detect via email)
- `/dashboard` — Dashboard with quick actions & active programs
- `/dang-ky/thong-tin-chung` — Registration tab 1 (general info)
- `/dang-ky/thue-minh-tl` — Registration tab 2 (explanations + file templates)
- `/dang-ky/danh-sach-tv` — Registration tab 3 (team members)
- `/dang-ky/nop-ho-so` — Registration tab 4 (submission checklist)
- `/ho-so-cua-toi` — My dossier list
- `/ky-so` — Digital signature (5 steps)
- `/chuong-trinh-mo` — Program catalog (browse & register)
- `/thong-bao` — Notifications
- `/tai-khoan` — User profile & security

**Admin (Superuser) - 9 routes** (`/admin/*`):
- `/admin/dashboard` — KPI dashboard + status breakdown chart
- `/admin/nhiem-vu` — Task list (filter by status, pagination)
- `/admin/nhiem-vu-tai-tro` — Sponsored task list
- `/admin/hop-dong-tai-tro` — Sponsorship contracts
- `/admin/ky-ket-hop-dong` — Contract signing wizard (4 steps)
- `/admin/nhat-ky-trien-khai` — Implementation log (timeline + task tracking)
- `/admin/ly-lich-to-chuc` — Organization info
- `/admin/theo-doi-nhiem-vu` — Task milestone tracking

**Special routes**:
- `/dang-ky` — Redirect to `/dang-ky/thong-tin-chung`
- `/not-found` — Branded 404 (navy themed)
- `[dynamic]`: `/dang-ky/[tab]` — Prerendered 4 tabs

### Code Metrics
| Metric | Value |
|--------|-------|
| Total routes | 28 static + 1 dynamic |
| LOC (app code only) | ~3,500 |
| Component files | ~28 |
| Mock data domains | 7 (nhiemVu, hopDong, organization, nhatKy, thanhVien, dashboard, programs) |
| Bundle (shared JS) | 139 KB gzipped |
| Max page load | 225 KB (`/dang-nhap` with forms) |
| Build status | ✅ Pass (0 errors) |
| Lint status | ✅ Pass (0 errors) |
| TypeScript strict | ✅ Pass (0 errors) |
| Files exceeding 200 LOC | 0 (excluding shadcn UI primitives) |

### Code Quality Review Score
**Pre-fix**: 7.5/10 → **Post-fix**: 9/10
- 3 critical bugs fixed (data consistency, a11y, success feedback)
- 6 important issues addressed (console logs, unused code, aria labels)
- 8 minor improvements applied

## Development Context

### AI-Assisted Development
**Process**: Figma → Research → 2 Planning cycles → Auto-implement → Fix → Code review x2 → Rebuild
**Time to deliver**: ~2.5h hands-on AI + 15 min fixes (manual) = 3h total
**Estimated manual coding**: 40-50h → **94% time savings**
**AI model used**: Claude Opus 4.7 (planning) + Sonnet (subagents)
**AI errors found & fixed**: 11 issues (base-nova API differences, icon serialization, theme drift, data consistency)

### Development Environment
**Work context**: `/Users/coolstar/inseclab/khoa-hoc-cong-nghe/web/`
**Reports directory**: `plans/reports/`
**Plans directory**: `plans/`
**Key artifacts**:
- Session log: `plans/reports/ai-coding-session-log-260418-pms-vnuhcm-final.md` (550 lines, 16 milestones)
- Figma research: `plans/reports/researcher-260418-2044-figma-pms-vnuhcm-scope.md`
- Code review: `plans/reports/code-review-260418-2156-full-codebase.md` (290 lines)
- Plan: `plans/260418-2051-pms-vnuhcm-figma-to-nextjs/` (11 phases)

### Known Limitations & Future Work
**NOT implemented (out of scope for demo)**:
- Backend API integration (mock TS data only)
- Real authentication (static role detection)
- Responsive mobile design (1440×900 desktop-only)
- Test suite
- Digital signature backend
- Real file uploads
- Database persistence

**Priority next steps**:
1. UI Polish: Mobile responsiveness, animation transitions, dark mode toggle
2. Authentication: Real OAuth/session layer
3. API Integration: Connect to backend endpoints
4. Test Suite: Unit + E2E test coverage
5. Deployment: Vercel or custom server setup

### 3. Extensive Skills Library (47+ Skills)

**Organized by Domain** (`.claude/skills/`):

**AI & Vision**: ai-artist, ai-multimodal, agent-browser
**Authentication**: better-auth
**Backend & Databases**: backend-development, databases
**Code Quality & Debugging**: code-review, debug, sequential-thinking
**Content & Copywriting**: copywriting, brainstorm
**Design & Frontend**: frontend-design, frontend-development, ui-styling, ui-ux-pro-max, web-design-guidelines
**DevOps & Infrastructure**: devops, git
**Documentation**: docs-seeker, repomix, markdown-novel-viewer, document-skills
**Framework Integration**: web-frameworks, react-best-practices, shopify
**Game Development**: threejs, shader
**Media Processing**: media-processing (FFmpeg, ImageMagick)
**MCP Tools**: mcp-builder, mcp-management
**Mobile Development**: mobile-development
**Project Planning**: plan, plans-kanban
**Skill Development**: skill-creator, template-skill
**Testing & QA**: web-testing
**Visualization**: mermaidjs-v11
**Workflow Tools**: cook, research, scout, payment-integration

### 4. Automated Release Management

**Features**:
- Semantic versioning (MAJOR.MINOR.PATCH)
- Conventional commit enforcement
- Automated changelog generation
- GitHub releases with assets
- Optional NPM publishing
- Git hooks for commit validation

**Commit Types**:
- `feat:` → Minor version bump
- `fix:` → Patch version bump
- `BREAKING CHANGE:` → Major version bump
- `docs:`, `refactor:`, `test:`, `ci:` → Patch bump

### 5. Development Workflow Automation

**Pre-Commit**:
- Commit message linting (conventional commits)
- Optional test execution

**Pre-Push**:
- Linting validation
- Test suite execution
- Build verification

**CI/CD**:
- GitHub Actions integration
- Automated releases on main branch
- Test automation
- Build validation

## Technical Requirements

### Functional Requirements

**FR1: Agent Orchestration**
- Support sequential and parallel agent execution
- Enable agent-to-agent communication via file system
- Maintain context across agent handoffs
- Track agent task completion

**FR2: Command System**
- Parse slash commands with arguments
- Route to appropriate agent workflows
- Support nested commands (e.g., `/ck:fix:ci`)
- Provide command discovery and help

**FR3: Documentation Management**
- Auto-generate codebase summaries with repomix
- Keep docs synchronized with code changes
- Maintain project roadmap and changelog
- Update API documentation automatically

**FR4: Quality Assurance**
- Run tests before commits
- Perform code review automatically
- Check type safety and compilation
- Validate security best practices

**FR5: Git Workflow**
- Enforce conventional commits
- Scan for secrets before commits
- Generate professional commit messages
- Create clean PR descriptions

**FR6: Project Bootstrapping**
- Initialize git repository
- Gather requirements through questions
- Research tech stacks
- Generate project structure
- Create initial documentation
- Set up CI/CD

### Non-Functional Requirements

**NFR1: Performance**
- Command execution < 5 seconds for simple operations
- Parallel agent spawning for independent tasks
- Efficient file system operations
- Optimized context loading

**NFR2: Reliability**
- Handle agent failures gracefully
- Provide rollback mechanisms
- Validate agent outputs
- Error recovery and retry logic

**NFR3: Usability**
- Clear command syntax and documentation
- Helpful error messages
- Progress indicators for long operations
- Comprehensive command help

**NFR4: Maintainability**
- Modular agent definitions
- Reusable workflow templates
- Clear separation of concerns
- Self-documenting code and configs

**NFR5: Security**
- Secret detection before commits
- No AI attribution in public commits
- Secure handling of credentials
- Security best practice enforcement

**NFR6: Scalability**
- Support projects of any size
- Handle large codebases efficiently
- Scale agent parallelization
- Manage complex dependency graphs

## Success Metrics

### Adoption Metrics
- GitHub stars and forks
- NPM package downloads
- Active users and installations
- Community engagement (issues, discussions, PRs)

### Performance Metrics
- Average time to bootstrap new project: < 10 minutes
- Planning to implementation cycle time: 50% reduction
- Documentation coverage: > 90%
- Test coverage: > 80%
- Code review time: 75% reduction

### Quality Metrics
- Conventional commit compliance: 100%
- Zero secrets in commits: 100%
- Automated test pass rate: > 95%
- Documentation freshness: < 24 hours lag

### Developer Experience Metrics
- Time to first commit: < 5 minutes
- Developer onboarding time: 50% reduction
- Context switching overhead: 60% reduction
- Satisfaction score: > 4.5/5.0

## Technical Architecture

### Core Components

**1. Agent Framework**
- Agent definition files (Markdown with frontmatter)
- Agent orchestration engine
- Context management system
- Communication protocol (file-based reports)

**2. Command System**
- Command parser and router
- Argument handling ($ARGUMENTS, $1, $2, etc.)
- Command composition and nesting
- Help and discovery system

**3. Workflow Engine**
- Sequential execution support
- Parallel task scheduling
- Dependency resolution
- Error handling and recovery

**4. Documentation System**
- Repomix integration for codebase compaction
- Template-based doc generation
- Auto-update triggers
- Version tracking

**5. Quality System**
- Test runner integration
- Code review automation
- Type checking and linting
- Security scanning

**6. Release System**
- Semantic versioning engine
- Changelog generation
- GitHub release creation
- Asset packaging

### Technology Stack

**Runtime**:
- Node.js >= 18.0.0
- Bash scripting (Unix hooks)
- PowerShell scripting (Windows hooks)
- Cross-platform hook dispatcher (Node.js)

**AI Platforms**:
- Anthropic Claude (Sonnet 4, Opus 4)
- OpenRouter integration
- Google Gemini (for docs-manager)
- Grok Code (for git-manager)

**Development Tools**:
- Semantic Release
- Commitlint
- Husky (git hooks)
- Repomix (codebase compaction)
- Scout Block Hook (performance optimization)

**CI/CD**:
- GitHub Actions
- Conventional Commits
- Automated versioning

### Integration Points

**MCP Tools**:
- **context7**: Read latest documentation
- **sequential-thinking**: Structured problem solving
- **SearchAPI**: Google and YouTube search
- **review-website**: Web content extraction
- **VidCap**: Video transcript analysis

**External Services**:
- GitHub (Actions, Releases, PRs)
- Discord (notifications)
- NPM (optional package publishing)

## Use Cases

### UC1: Bootstrap New Project
**Actor**: Developer
**Goal**: Create new project from scratch
**Flow**:
1. Run `/bootstrap` command
2. Answer requirement questions
3. AI researches tech stacks
4. Review and approve recommendations
5. AI generates project structure
6. AI implements initial features
7. AI creates tests and documentation
8. Project ready for development

**Outcome**: Fully functional project with tests, docs, CI/CD in < 10 minutes

### UC2: Implement New Feature
**Actor**: Developer
**Goal**: Add feature with full workflow
**Flow**:
1. Run `/ck:cook "add user authentication"`
2. Planner creates implementation plan
3. Researcher agents explore auth solutions
4. Developer reviews and approves plan
5. AI implements code
6. AI writes comprehensive tests
7. AI performs code review
8. AI updates documentation
9. AI commits with conventional message

**Outcome**: Feature complete with tests, docs, and clean git history

### UC3: Debug Production Issue
**Actor**: Developer
**Goal**: Identify and fix production bug
**Flow**:
1. Run `/ck:debug "API timeout errors"`
2. Debugger agent analyzes logs and system
3. Root cause identified
4. Fix plan created
5. AI implements solution
6. Tests validate fix
7. Code review confirms quality
8. Commit and deploy

**Outcome**: Bug fixed with comprehensive testing and documentation

### UC4: Manage Commits and Deployments
**Actor**: Developer
**Goal**: Maintain professional git history
**Flow**:
1. Developer completes feature implementation
2. Run tests via `/ck:test` command
3. Code review via `/ck:cook` workflow
4. Conventional commit via git-manager agent
5. Push to feature branch
6. Create PR via GitHub interface

**Outcome**: Professional commit history and clean PR ready for review

### UC5: Update Documentation
**Actor**: Project Manager
**Goal**: Ensure docs are current
**Flow**:
1. Run `/ck:docs update`
2. Docs manager scans codebase
3. Generates fresh summary with repomix
4. Identifies outdated sections
5. Updates API docs, guides, architecture
6. Validates naming conventions
7. Creates update report

**Outcome**: Documentation synchronized with code

## Constraints & Limitations

### Technical Constraints
- Requires Node.js >= 18.0.0
- Depends on Claude Code or Open Code CLI
- File-based communication has I/O overhead
- Token limits on AI model context windows

### Operational Constraints
- Requires API keys for AI platforms
- GitHub Actions minutes for CI/CD
- Internet connection for MCP tools
- Storage for repomix output files

### Design Constraints
- Agent definitions must be Markdown with frontmatter
- Commands follow slash syntax
- Reports use specific naming conventions
- Conventional commits required

## Risks & Mitigation

### Risk 1: AI Model API Failures
**Impact**: High
**Likelihood**: Medium
**Mitigation**: Retry logic, fallback models, graceful degradation

### Risk 2: Context Window Limits
**Impact**: Medium
**Likelihood**: High
**Mitigation**: Repomix for code compaction, selective context loading, chunking

### Risk 3: Agent Coordination Failures
**Impact**: High
**Likelihood**: Low
**Mitigation**: Validation checks, error recovery, rollback mechanisms

### Risk 4: Secret Exposure
**Impact**: Critical
**Likelihood**: Low
**Mitigation**: Pre-commit scanning, .gitignore enforcement, security reviews

### Risk 5: Documentation Drift
**Impact**: Medium
**Likelihood**: Medium
**Mitigation**: Automated triggers, freshness checks, validation workflows

## Future Roadmap

### Phase 1: Foundation (Complete - v1.0-1.8)
- ✅ Core agent framework
- ✅ Slash command system
- ✅ Automated releases
- ✅ Skills library
- ✅ Documentation system

### Phase 2: Enhancement (Current)
- 🔄 Additional skills (GCP, AWS, Azure)
- 🔄 UI/UX improvements
- 🔄 Performance optimization
- 🔄 Enhanced error handling

### Phase 3: Advanced Features (Planned)
- 📋 Visual workflow builder
- 📋 Custom agent creator UI
- 📋 Team collaboration features
- 📋 Analytics and insights dashboard
- 📋 Multi-language support

### Phase 4: Enterprise (Future)
- 📋 Self-hosted deployment
- 📋 Advanced security features
- 📋 Compliance automation
- 📋 Custom integrations
- 📋 Enterprise support

## Dependencies & Integration

### Required Dependencies
- Node.js runtime environment
- Git version control
- Claude Code or Open Code CLI
- API keys for AI platforms

### Optional Dependencies
- Discord webhook for notifications
- GitHub repository for CI/CD
- NPM account for publishing

### Integrations
- GitHub Actions
- Semantic Release
- Commitlint
- Husky
- Repomix
- Various MCP servers

## Compliance & Standards

### Coding Standards
- YAGNI (You Aren't Gonna Need It)
- KISS (Keep It Simple, Stupid)
- DRY (Don't Repeat Yourself)
- Files < 500 lines
- Comprehensive error handling
- Security-first development

### Git Standards
- Conventional Commits
- Clean commit history
- No AI attribution
- No secrets in commits
- Professional PR descriptions

### Documentation Standards
- Markdown format
- Up-to-date (< 24 hours)
- Comprehensive coverage
- Clear examples
- Proper versioning

### Testing Standards
- Unit test coverage > 80%
- Integration tests for workflows
- Error scenario coverage
- Performance validation
- Security testing

## Glossary

- **Agent**: Specialized AI assistant with specific expertise and responsibilities
- **Slash Command**: Shortcut that triggers agent workflows (e.g., `/ck:plan`)
- **Skill**: Reusable knowledge module for specific technologies or patterns
- **MCP**: Model Context Protocol for AI tool integration
- **Repomix**: Tool for compacting codebases into AI-friendly format
- **Sequential Chaining**: Running agents one after another with dependencies
- **Parallel Execution**: Running multiple agents simultaneously
- **Query Fan-Out**: Spawning multiple researchers to explore different approaches
- **Conventional Commits**: Structured commit message format (type(scope): description)

## Appendix

### Related Documentation
- [Codebase Summary](./codebase-summary.md)
- [Code Standards](./code-standards.md)
- [System Architecture](./system-architecture.md)
- [Skills Reference](../guide/SKILLS.md)

### External Resources
- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code/overview)
- [Open Code Documentation](https://opencode.ai/docs)
- [Conventional Commits](https://conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

### Support & Community
- GitHub Issues: https://github.com/claudekit/claudekit-engineer/issues
- Discussions: https://github.com/claudekit/claudekit-engineer/discussions
- Repository: https://github.com/claudekit/claudekit-engineer

## Unresolved Questions

1. **Performance Benchmarks**: Need to establish baseline metrics for agent execution times
2. **Multi-Repository Support**: How to handle projects spanning multiple repositories?
3. **Custom AI Model Support**: Should we support other AI platforms beyond Claude and OpenRouter?
4. **Agent Marketplace**: Community-contributed agents and skills distribution mechanism?
5. **Real-Time Collaboration**: How to handle multiple developers using agents simultaneously?
