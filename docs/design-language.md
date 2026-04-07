# Kunst Design Language

## Intent

Kunst targets enterprise back-office interfaces: operational dashboards, CMS panels, logistics platforms, data-heavy admin tools. The kind of software where someone spends 8 hours a day scanning tables, filling forms, and triaging queued items.

The design optimizes for:

- **Scanability.** High contrast between content and chrome. Clear visual hierarchy without decorative noise.
- **Density.** Compact controls and tight spacing. Screen real estate is valuable when you're looking at 200 rows of transport orders.
- **Calm.** Neutral, cool-toned palette. Color is reserved for meaning (status, actions, errors), not decoration.
- **Durability.** Nothing trendy. Subtle radii, flat surfaces, minimal shadows. The interface should feel like infrastructure, not a marketing page.

## Color system

All colors are defined in oklch for perceptual uniformity.

**Neutrals** use a slight cool shift (low chroma, blue hue) to avoid the yellowish cast that pure gray gets on most displays. This reads as "professional" without being obviously tinted.

**Semantic slots:**
- `primary` - the main interactive color. Used for primary actions and focus rings. A muted blue that stays legible at small sizes.
- `secondary` - low-emphasis actions and selected states. Near-background tint.
- `accent` - hover states and subtle highlights. Slightly warmer than secondary to create visual distinction on mouseover.
- `destructive` - delete, cancel, error states. Red, but desaturated enough to not scream on a page full of them.
- `muted` - disabled text, placeholder content, metadata. Clearly subordinate to foreground.

**Dark mode** inverts the lightness scale. The hue bias stays the same so the interface feels consistent across modes.

## Typography

- **Sans:** Inter. High x-height, clear at small sizes, good tabular figures for data columns.
- **Mono:** JetBrains Mono. For log output, IDs, code snippets, and any fixed-width data.

Body text is 14px (`text-sm` in Tailwind). This is intentionally one step below the typical 16px default because back-office UIs need to fit more content per viewport. Components are sized to match.

## Shape

- **Radii:** Small and consistent. 2-4px range. Enough to soften hard edges without looking rounded or playful.
- **Shadows:** Minimal. One level for cards/dropdowns, barely visible. The hierarchy comes from borders and background contrast, not elevation. Dense UIs with many elevated surfaces look cluttered with shadows.
- **Borders:** 1px solid, using the `border` token. The primary structural separator. Visible but not heavy.

## Density

Controls are compact:
- Small: 28-30px height
- Default: 32-34px height
- Large: 36-38px height

This is tighter than most consumer-facing component libraries. The target user has a mouse and a large monitor, not a phone.

## When to use color

Color should carry information, not create atmosphere.

- **Blue (primary):** "You can interact with this." Buttons, links, focus rings, selected tabs.
- **Red (destructive):** "This action has consequences." Delete buttons, error messages, failed status.
- **Green:** Not in the base palette. Add it as a status token when you need success/healthy/active indicators.
- **Yellow/amber:** Not in the base palette. Add when you need warning/pending states.
- **Gray variations:** Everything else. Borders, backgrounds, disabled states, metadata.
