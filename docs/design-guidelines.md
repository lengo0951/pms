# Design Guidelines — PMS VNU-HCM

**Last Updated**: 2026-04-18
**Source**: Extracted from Figma 22-frame design + implemented components

## Brand Identity

### Color Palette

#### Primary Roles
| Role | Primary | Sidebar | Accent | Usage |
|------|---------|---------|--------|-------|
| **Admin (Superuser)** | Brand `#003087` navy | `bg-brand-700` white text | Navy-600 (active) | `/admin/*` routes + contract signing |
| **Researcher (NKH)** | Emerald-600 `#059669` | `bg-emerald-900` white text | Emerald-700 (active) | Root `/(nkh)/*` routes + registration |
| **Login (Unified)** | Gradient navy 700→500 | N/A | Navy accent | `/dang-nhap` (both roles) |

#### Status Colors (Shared)
| Status | Hex | Usage | Badge Color |
|--------|-----|-------|------------|
| **Review** (Đang xét chọn) | `#3b82f6` | Task in review state | Blue chip |
| **Signed** (Đã ký HĐ) | `#10b981` | Contract signed | Green chip |
| **Active** (Đang thực hiện) | `#f59e0b` | Task in progress | Amber chip |
| **Done** (Hoàn thành) | `#8b5cf6` | Completed task | Purple chip |

#### Neutral Scale
- **Surface**: `#ffffff` (white), `#f9fafb` (gray-50), `#f3f4f6` (gray-100)
- **Border**: `#e5e7eb` (gray-200), `#d1d5db` (gray-300)
- **Text**: `#111827` (gray-900, primary), `#6b7280` (gray-500, secondary)
- **Disabled**: `#9ca3af` (gray-400)

#### Alert Colors
- **Warning** (Cảnh báo): `#fca5a5` (red-200) background, `#7f1d1d` (red-900) text
- **Info** (Thông tin): `#bfdbfe` (blue-200) background, `#1e3a8a` (blue-900) text
- **Success** (Thành công): `#d1fae5` (emerald-100) background, `#065f46` (emerald-900) text

### Typography

**Font Family**: Inter (from Tailwind default + custom subset)
**Subsets**: Latin + Vietnamese (for diacritics: ă, â, ê, ô, ơ, ư, đ, etc.)

| Element | Size | Weight | Line-height | Margin | Usage |
|---------|------|--------|-------------|--------|-------|
| **H1** (Page title) | 2rem (32px) | 700 (bold) | 2.5rem | 0 | Page headers |
| **H2** (Section) | 1.5rem (24px) | 700 | 2rem | 0 | Wizard tabs, card headers |
| **H3** (Subsection) | 1.25rem (20px) | 600 | 1.75rem | 0 | Card titles, form group headers |
| **Body** (Default) | 1rem (16px) | 400 | 1.5rem | 0 | Paragraph text, labels |
| **Small** (Secondary) | 0.875rem (14px) | 400 | 1.25rem | 0 | Form hints, timestamps, chip text |
| **Xsmall** (Tertiary) | 0.75rem (12px) | 500 | 1rem | 0 | Badges, footnotes |

### Spacing & Layout

**Base Unit**: 4px

| Scale | Pixel | Usage |
|-------|-------|-------|
| xs | 4px (0.25rem) | Icon gaps, very tight spacing |
| sm | 8px (0.5rem) | Input padding, tight margins |
| md | 12px (0.75rem) | Component padding, default spacing |
| base | 16px (1rem) | Card padding, page margins |
| lg | 20px (1.25rem) | Section spacing |
| xl | 24px (1.5rem) | Large margins between sections |
| 2xl | 32px (2rem) | Page top/bottom padding |

**Layout Constants**:
- **Sidebar width**: 240px (fixed, both themes)
- **Topbar height**: 64px (admin only)
- **Content max-width**: 1200px (centered grid)
- **Card radius**: 8-12px (for `rounded-lg` / `rounded-xl`)
- **Form row gap**: 12px (vertical spacing between fields)

### Shadows & Elevation

| Level | CSS | Usage |
|-------|-----|-------|
| **None** | — | Flat surfaces (inputs, disabled buttons) |
| **Card** | `0 1px 3px rgba(0,0,0,0.1)` | Cards, modals, dropdowns |
| **Elevated** | `0 4px 6px rgba(0,0,0,0.15)` | Floating elements, focused states |
| **Hero** | `0 10px 25px rgba(0,0,0,0.2)` | Modals, hero sections |

## Component Variants

### Buttons

**Primary** (Action CTA)
- Background: Role primary color (navy/emerald)
- Text: White
- Hover: Darker shade (600)
- Size: 40px height, 12px horizontal padding min

**Secondary** (Less important action)
- Background: `bg-gray-100`
- Text: `text-gray-900`
- Hover: `bg-gray-200`

**Outline** (Tertiary, form reset)
- Border: 1px role primary color
- Background: transparent
- Text: role primary color
- Hover: Light background

**Disabled** (Inactive state)
- Background: `bg-gray-200`
- Text: `text-gray-400`
- Cursor: not-allowed

**Sizes**:
- **sm** (small): 32px height, 8px h-padding (icon buttons)
- **md** (default): 40px height, 12px h-padding
- **lg** (large): 48px height, 16px h-padding

### Form Controls

**Input**
- Border: 1px solid `#d1d5db` (gray-300)
- Padding: 8px 12px (40px height total)
- Radius: 6px
- Focus: Blue border `#3b82f6`, box-shadow subtle blue
- Placeholder: `#9ca3af` (gray-400)
- Error: Red border `#dc2626`, red bg tint

**Select / Dropdown**
- Same as Input
- Trigger width matches anchor (form grid)
- Popup: `min-w-[anchor-width]` + `max-w-[92vw]` to prevent truncation
- Text: No truncate, wrap if needed

**Checkbox**
- Size: 20px × 20px
- Border: 2px role primary color when unchecked
- Background: Role primary color when checked
- Checkmark: White
- Indeterminate: Dash icon

**Radio Button**
- Same as checkbox but circle (not implemented in current scope)

### Cards & Containers

**Standard Card**
- Background: `#ffffff` (white)
- Border: 1px solid `#e5e7eb` (gray-200)
- Radius: 8px (`rounded-lg`)
- Padding: 16px (1rem)
- Shadow: card level (1px 3px...)

**Elevated Card** (Featured, highlighted)
- Same as standard
- Shadow: elevated level (4px 6px...)
- Border: 2px role primary color OR gradient

**Modal / Dialog**
- Overlay: `rgba(0,0,0,0.5)` (semi-transparent)
- Card: white, radius 12px, shadow hero
- Header: Bg role primary, white text, 16px padding
- Body: 16px padding
- Footer: Border-top gray-200, 12px padding (CTA buttons right-aligned)

### Tables

**Header Row**
- Background: `#f3f4f6` (gray-100)
- Text: `#111827` (gray-900), 12px small weight 500
- Height: 40px
- Border: 1px bottom gray-200

**Body Row**
- Height: 48px
- Padding: 12px
- Border: 1px bottom gray-100 (light)
- Hover: `bg-gray-50` (subtle highlight)
- Text: 14px, normal weight

**Status Cell**
- Use `StatusChip` component (badge with role primary background, white text)

### Badges & Chips

**Status Badge** (StatusChip)
- Padding: 4px 8px (tight)
- Radius: 4px
- Font size: 12px
- Font weight: 500
- Colors: Per status table above

**Feature Badge** (e.g., "Bắt buộc", "Đã xác nhận")
- Bg: Pale color (gray-100 or status tint)
- Text: Darker shade
- Radius: 4px
- Padding: 4px 8px

## Layout Patterns

### Sidebar Navigation

**Width**: 240px (fixed)
**Background**: Role primary color (navy/emerald)
**Text color**: White
**Font**: 14px normal

**Items**:
- Non-clickable header: no bg, bold text
- Clickable item: py-2, px-3, hover `opacity-80`
- **Active item**: Circle pill background (slightly lighter shade), rounded 6px
- **Icon + label**: 16px icon + 8px gap + label
- **Children**: Indent 16px, smaller text (13px)

**Bottom section**:
- Border-top role primary color (darker)
- User block with avatar + name + role
- Logout button (outline style)

### Top Navigation Bar (Admin Only)

**Height**: 64px
**Background**: White
**Border**: 1px bottom gray-200

**Left**: VNU logo (40px square) + org name (select dropdown)
**Center**: (Reserved for search, not implemented)
**Right**: Bell icon (notifications), user menu (dropdown avatar)

### Page Layout (Content Area)

```
┌─────────────────────────────────────┐
│ PageHeader (title + breadcrumb)      │ 16px padding
├─────────────────────────────────────┤
│                                     │
│ PageContent (main form/table)        │ 16px padding
│ - Grid 1200px max-width centered    │
│ - Form rows 12px gap                │
│ - Sections 24px gap                 │
│                                     │
│ (Optional) PageFooter               │ 16px padding
└─────────────────────────────────────┘
```

### Form Layouts

**Single column** (narrow, default):
- Max-width: 600px
- Label above input
- 12px gap between fields

**Two columns** (wider, admin tasks):
- Max-width: 100% (full content width)
- Label above input
- Grid `gap-4` (12px) horizontally
- Fields break to 1 col on mobile (future)

## Responsive Design

**Current scope**: Desktop only (1440×900 minimum)
**Future mobile support**: Breakpoints
- sm: 640px (tablet)
- md: 768px (ipad)
- lg: 1024px (desktop)
- xl: 1280px (large desktop)

## Accessibility (WCAG 2.1 Level A)

- **Color contrast**: 4.5:1 minimum for text (status colors may not meet this; amber/green on white ~3:1)
- **Form labels**: Use native `<label htmlFor="id">` or wrapper pattern; no label-less inputs
- **Icons**: Decorative icons get `aria-hidden="true"`; functional icons get `aria-label="description"`
- **Focus**: Visible focus ring on all interactive elements (Tailwind `focus:ring-2`)
- **Keyboard nav**: Tab order follows visual order; no trap focus
- **Semantic HTML**: Use `<form>`, `<button>`, `<input type="...">` correctly

## Implementation Notes

**Tailwind v4 Integration**:
- Custom theme tokens in `tailwind.config.ts` via `@theme` directive
- CSS variables for brand colors (switch via `[data-theme="admin|nkh"]`)
- Pre-built `rounded-lg`, `shadow-*`, `text-*` utilities used directly
- No custom CSS classes needed for spacing/colors (use Tailwind utilities)

**shadcn/ui Customization**:
- base-nova provides Button, Input, Select, Form, etc.
- Wrapper components (FormField, StatusChip, PageShell) add project-specific styling
- No overrides of base primitives; compose instead

**Future polish**:
- Transitions: 150-200ms ease-in-out (buttons, hovers)
- Animations: Subtle fade-in on page loads, slide for modals
- Dark mode: Toggle via next-themes (CSS var support ready)
