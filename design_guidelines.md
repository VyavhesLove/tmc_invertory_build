# Design Guidelines: Inventory Management System (ТМЦ)

## Design Approach: Utility-First Dashboard System

**Selected Approach:** Design System (Productivity-Focused)  
**Reference Inspiration:** Linear + Notion + Modern SaaS Dashboards  
**Rationale:** This is a data-intensive productivity tool requiring clarity, efficiency, and consistent patterns for daily operational use.

## Core Design Principles

1. **Clarity Over Decoration** - Every element serves a functional purpose
2. **Rapid Data Scanning** - Visual hierarchy optimized for quick information retrieval
3. **Minimal Cognitive Load** - Consistent patterns reduce learning curve
4. **Action-Oriented** - Primary actions always visible and accessible

## Color Palette

**Dark Mode Primary (Default):**
- Background: 220 15% 8% (deep blue-grey)
- Surface: 220 13% 12% (elevated panels)
- Surface Hover: 220 12% 15%
- Border: 220 10% 20%
- Text Primary: 220 10% 95%
- Text Secondary: 220 8% 65%
- Brand/Accent: 210 100% 55% (professional blue)
- Success: 145 65% 45%
- Warning: 38 92% 50%
- Danger: 0 72% 51%

**Light Mode:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Border: 220 10% 88%
- Text Primary: 220 15% 15%
- Text Secondary: 220 8% 45%

**Status Colors:**
- В ремонте (In Repair): 38 92% 50% (amber)
- Выдано (Issued): 210 100% 55% (blue)
- Подтвердить ремонт (Confirm Repair): 280 65% 55% (purple)

## Typography

**Font Stack:** Inter (via Google Fonts CDN) with system fallback  
**Scale:**
- Page Titles: text-2xl font-semibold (24px, 600 weight)
- Section Headers: text-lg font-medium (18px, 500 weight)
- Body/Table: text-sm font-normal (14px, 400 weight)
- Labels: text-xs font-medium uppercase tracking-wide (12px, 500 weight)
- Metadata: text-xs text-muted (12px, secondary color)

## Layout System

**Spacing Primitives:** Use Tailwind units: 2, 4, 6, 8, 12, 16  
**Common Patterns:**
- Card padding: p-6
- Section gaps: gap-6
- Button spacing: px-4 py-2
- Input padding: px-3 py-2
- Table cell padding: px-4 py-3

**Grid Structure:**
- Sidebar: 240px fixed width (collapsible on mobile)
- Main content: flex-1 with max-w-7xl container
- Content padding: p-6 lg:p-8
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## Component Library

### Navigation
- **Top Bar:** Fixed height (64px), dark surface, logo left, user menu right
- **Sidebar:** Collapsible vertical nav, icons + labels, active state highlight with subtle left border (brand color)
- Mobile: Hamburger menu, slide-out drawer

### Data Table (Primary Component)
- **Container:** Rounded border, subtle shadow on dark surface
- **Header Row:** Sticky, slightly darker background, uppercase text-xs labels
- **Rows:** Hover state (lighter background), 48px min-height for touch targets
- **Cells:** Left-aligned text, right-aligned numbers, centered status badges
- **Column Toggle:** Dropdown menu (top-right), checkboxes for show/hide
- **Pagination:** Bottom-right, simple prev/next + page numbers

### Forms & Inputs
- **Input Fields:** Dark background (surface color), 1px border, rounded-md, focus ring (brand color)
- **Labels:** Above inputs, text-sm font-medium, mb-2
- **Buttons:** 
  - Primary: Brand color bg, white text, hover slightly lighter
  - Secondary: Transparent bg, border, hover bg surface
  - Danger: Red bg for destructive actions
- **Select Dropdowns:** Match input styling, chevron icon right
- **Modals:** Centered, max-w-2xl, dark surface with subtle backdrop blur

### Status Badges
- Pill shape (rounded-full), px-3 py-1, text-xs font-medium
- Colored background with darker text for contrast
- Positioned inline in table cells

### Action Buttons/Menus
- **Row Actions:** Three-dot menu icon (end of row), dropdown on click
- **Bulk Actions:** Appear when rows selected, floating bar at bottom
- **Add New:** Prominent button (top-right), brand color, "+ Добавить ТМЦ"

## Responsive Behavior

**Desktop (lg+):** Sidebar visible, table with all columns, multi-column forms  
**Tablet (md):** Sidebar collapsible, table scrollable horizontally, reduced columns  
**Mobile (<md):** 
- Hamburger menu
- Table converts to card view (stacked rows)
- Forms single column
- Bottom sheet for modals
- Floating action button for primary actions

## Interactions

**Hover States:** Subtle background lightening (2-3% lighter)  
**Active States:** Slightly pressed appearance (scale-98)  
**Loading:** Skeleton screens for tables, spinner for forms  
**Transitions:** duration-200 ease-in-out for all state changes  
**Focus:** 2px brand-colored ring with offset

## Images

**Not Required** - This is a data-focused utility application. Use icons only:
- **Icons:** Heroicons (outline for navigation, solid for actions)
- **Empty States:** Simple icon + text message (e.g., "Нет данных")
- **User Avatars:** Initials in colored circles if needed

## Key Screens

1. **Login:** Centered card, logo, simple email/password form, minimal design
2. **Dashboard/Table View:** Full-width table with filters (top), column toggles, row actions
3. **Add/Edit Modal:** Form overlay with sections for item details, status, location
4. **Transfer Modal:** Two-step form (select location → select responsible person)
5. **Service/Repair Modal:** Form with reason/comment textarea

**Quality Focus:** Clean, professional, fast-loading interface optimized for daily operational use.