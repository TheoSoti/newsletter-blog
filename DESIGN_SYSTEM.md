# Theo Soti Site Design System

Status: v1.0  
Applies to: the homepage, blog archive, short archive, learning path, articles, short articles, shared navigation, newsletter, footer, and reusable promotional blocks.  
Does not apply to: the dedicated ebook landing page at `/you-dont-need-js/`, `src/components/ebook/`, or `src/styles/ebookv2/`.

The `BookShowcase` and `BuyBook` components remain part of this system because they appear inside the main site. They may borrow a limited campaign palette, but they must still follow the site's spacing, border, interaction, and accessibility rules.

## 1. Design direction

Theo Soti is an editorial developer site for front-end developers who want practical modern CSS knowledge. The visual language is friendly technical neo-brutalism:

- Editorial first: content and examples are always the main event.
- Practical, not corporate: the interface should feel personal and direct.
- Structured: hard borders, visible grids, and numbered content make hierarchy obvious.
- Approachable: warm paper, mint green, and rounded details soften the technical structure.
- Tactile: controls and cards use a simple pressed-object interaction.
- Native: prefer semantic HTML and modern CSS over decorative JavaScript.

Design dials:

| Dial | Value | Meaning |
| --- | ---: | --- |
| Design variance | 6/10 | Mostly orderly layouts with a few asymmetric or graphic moments |
| Motion intensity | 4/10 | Clear hover, focus, popover, drawer, and scroll-progress feedback |
| Visual density | 4/10 | Comfortable editorial spacing with denser article and archive areas |

## 2. Brand principles

### 2.1 Content before decoration

Every visual device must support scanning, comprehension, navigation, or feedback. Decorative effects must never compete with an article, code sample, or interactive example.

### 2.2 One clear accent

Green is the core interaction and brand accent. Orange or yellow is reserved for a contained campaign block such as the book showcase or email course. Do not introduce a third page-level accent.

### 2.3 Borders create structure

Borders are not ornamental outlines. Use them to define sections, interactive objects, cards, and reading regions. Avoid wrapping every piece of content in a card.

### 2.4 Motion explains state

Motion should show that an object was pressed, a panel opened, a theme changed, or progress was made. Do not add looping motion to ordinary editorial content.

### 2.5 Examples may diverge, chrome may not

Article demos can use their own local palettes when color is part of the lesson. Keep those colors inside a clearly bounded demo. Site navigation, article chrome, cards, calls to action, and the footer stay on the core palette.

## 3. Foundations

### 3.1 Color

The existing variables in `src/styles/global.css` are the source of truth.

#### Light theme

| Token | Value | Role |
| --- | --- | --- |
| `--main` | `hsl(150 40% 70%)` | Soft mint highlight, selected surface, focus support |
| `--secondary` | `hsl(150 40% 35%)` | Primary action and link color |
| `--link` | `var(--secondary)` | Inline links |
| `--link-hover` | `hsl(150 55% 26%)` | Link hover and stronger green emphasis |
| `--background` | `hsl(32 100% 97%)` | Warm paper page background |
| `--bg-light` | `hsl(230 100% 99%)` | Cards, panels, header, inputs |
| `--white` | `hsl(230 100% 99%)` | Text on dark green and filled controls |
| `--black` | `hsl(0 0% 9%)` | Near-black anchor value |
| `--text` | `hsl(0 0% 9%)` | Primary text |
| `--small-text` | `hsl(0 0% 44%)` | Dates, helper text, captions |
| `--border` | `hsl(0 0% 9%)` | Structural borders |
| `--error-text` | `#b82f2f` | Validation and error text |
| `--example` | `hsl(230 70% 80%)` | Default article-example accent |
| `--code` | `#ebeceb` | Inline code background |
| `--code-border` | `transparent` | Code-block border in light mode |

#### Dark theme

| Token | Value | Role |
| --- | --- | --- |
| `--main` | `hsl(150 59.02% 68.79%)` | Bright mint accent |
| `--secondary` | `hsl(150 40% 35%)` | Filled action base |
| `--link` | `var(--main)` | Inline links |
| `--link-hover` | `hsl(150 70% 80%)` | Link hover |
| `--background` | `hsl(150 40% 12%)` | Deep green page background |
| `--bg-light` | `hsl(0 0% 9%)` | Raised dark surface |
| `--text` | `hsl(230 100% 99%)` | Primary text |
| `--small-text` | `hsl(0 0% 75%)` | Secondary text |
| `--border` | `hsl(150 12% 46%)` | Muted green-gray structure |
| `--error-text` | `hsl(0 85% 76%)` | Validation and error text |
| `--example` | `hsl(230 70% 60%)` | Default article-example accent |
| `--code` | `rgb(255 255 255 / 15%)` | Inline code background |
| `--code-border` | `color-mix(in srgb, var(--border) 55%, transparent)` | Code-block edge |

#### Campaign exception

Book or course promotions may use:

| Role | Value |
| --- | --- |
| Deep promotional green | `hsl(145 40% 18%)` |
| Warm promotional accent | `hsl(38 92% 50%)` to `hsl(38 100% 61%)` |

Use these colors inside one bounded promotional region. Generic cards, archive pages, and article navigation must not switch to the campaign palette.

#### Color rules

- Never use pure black or pure white when an existing token provides the intended role.
- Text and icons must meet WCAG AA at minimum. Aim for stronger contrast in article body copy.
- Hover, active, and focus states must increase or preserve contrast.
- Never communicate meaning with color alone.
- Do not hardcode a brand color inside a shared component. Use a semantic token or a component-scoped custom property.

### 3.2 Typography

#### Core typeface

Use the system sans stack already defined on `body`:

```css
font-family:
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  Oxygen,
  Ubuntu,
  Cantarell,
  "Open Sans",
  "Helvetica Neue",
  sans-serif;
```

This keeps the site fast, familiar, and readable. Do not introduce a display font into core editorial pages. Bebas Neue belongs only to an explicitly branded campaign surface.

#### Type scale

The current scale is relative to a `16px` mobile body and an `18px` body from `37.5em` upward.

| Role | Size | Weight | Line height |
| --- | --- | --- | --- |
| Body | `1rem` | 400 | 1.7 |
| H1 | `2.5em` | 500 | 1.2 |
| H2 | `1.5em` | 700 | 1.2 |
| H3 | `1.3em` | 500 | 1.2 |
| H4 | `1.2em` | 500 | 1.2 |
| H5 | `1.15em` | 500 | 1.2 |
| Strong | Inherit | 600 | Inherit |
| Metadata | `0.7em` to `0.9em` | 400 to 600 | 1.25 to 1.4 |
| Caption | `0.9em` | 400 | Inherit |
| Inline code | `0.9em` | Inherit | Inherit |
| Code block | `0.8em` | Inherit | Code theme default |

Use `text-wrap: balance` on headings. Keep article paragraphs readable rather than wide. The desktop article column must stay between roughly `530px` and `760px`.

#### Editorial hierarchy

- Every page has one `h1`.
- Page and section headings use sentence-style phrasing unless a proper name requires title case.
- Long-form article `h2` and `h3` headings are numbered automatically.
- Dates and reading time sit below titles and use tabular numerals where comparison matters.
- Avoid all-caps paragraphs. Small uppercase text is limited to a short campaign eyebrow.
- Keep section introductions to a comfortable reading measure, ideally `45ch` to `65ch`.

### 3.3 Spacing

The site uses a compact 4px-derived rhythm, expressed mostly in `rem` or `em`.

| Token name | Value | Typical use |
| --- | ---: | --- |
| `space-1` | `0.25rem` | Optical adjustment |
| `space-2` | `0.5rem` | Icon gap, compact padding |
| `space-3` | `0.75rem` | Button and menu padding |
| `space-4` | `1rem` | Default component inset and mobile gutter |
| `space-5` | `1.25rem` | Compact component gap |
| `space-6` | `1.5rem` | Panel inset |
| `space-8` | `2rem` | Section and grid gap |
| `space-12` | `3rem` | Section separation |
| `space-16` | `4rem` | Large editorial separation |

Rules:

- Mobile page gutter: `1rem` on each side.
- Default component padding: `1rem`.
- Comfortable panel padding: `1.5rem 2rem` when space allows.
- Card grid gap: `20px` or `1.25rem`.
- Desktop article plus sidebar gap: `40px` or `2.5rem`.
- Prefer `gap` over child margins for component layout.
- Use logical properties for new CSS: `padding-inline`, `margin-block`, and `inset-inline`.

### 3.4 Layout and containers

| Pattern | Rule |
| --- | --- |
| Site container | `width: 1100px; max-width: calc(100% - 2em); margin-inline: auto` |
| Article column | `width: clamp(530px, calc(100% - 340px), 760px)` on desktop |
| Table of contents | `300px`, sticky at `110px`, desktop only |
| Header | Fixed, `80px` tall |
| Single-column mobile | Default below the component's content breakpoint |
| Archive grid | 1 column, 2 from `37.5em`, 3 from `64em` |

Canonical page breakpoints:

| Name | Width | Use |
| --- | ---: | --- |
| `compact` | `37.5em` | Body scale, two-column archive grids |
| `content-wide` | `56.25em` | Article sidebar and wide editorial layouts |
| `navigation-wide` | `64em` | Desktop navigation and three-column grids |

Component-specific breakpoints are allowed only when the content requires them. Reusable blocks should prefer container queries, as the newsletter already does.

### 3.5 Borders, radii, and shadows

#### Border scale

| Weight | Use |
| ---: | --- |
| `1px` | Internal separators, table-of-contents rows, subtle code edge |
| `2px` | Buttons, inputs, cards, popovers, compact panels |
| `4px` | Page sections, header/footer boundaries, logo frame, strong article frame |
| `8px` | Bottom-edge emphasis on a major panel, never on every side |

#### Radius scale

| Radius | Use |
| ---: | --- |
| `4px` | Small internal items, focus ring contour, image-card top corners |
| `6px` | Default button, input, card, popover, and panel radius |
| `8px` | Standalone editorial media and code blocks |
| `50%` | Avatars and profile photography only |
| `999px` | Rare badges or campaign highlight discs only |

Do not mix soft `16px+` cards into the core system. Rounded corners should soften the structure, not erase it.

#### Shadow

The signature elevation is a hard downward shadow:

```css
--box-shadow: 0 5px var(--shadow-color);
```

In the current implementation, the light shadow color is near-black and the dark shadow color is black. Use this shadow only on interactive cards, buttons, compact navigation panels, and emphasized sign-up blocks. Flat editorial sections use borders and spacing instead.

## 4. Interaction system

### 4.1 Links

- Inline links use `--link` and retain an underline unless a component provides another clear affordance.
- Hover uses `--link-hover`.
- Navigation links may remove underlines, but the current item must use color plus weight or underline.
- External links open in the same tab by default. If a new tab is necessary, use `rel="noopener noreferrer"`.

### 4.2 Buttons and pressable cards

Primary controls follow the pressed-object model:

```css
border: 2px solid var(--border);
border-radius: 6px;
background: var(--secondary);
color: var(--white);
box-shadow: var(--box-shadow);
transition:
  box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1),
  transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
```

On hover or keyboard focus, remove the hard shadow and move the object down by the same visual distance. Under reduced motion, keep the color and shadow feedback but remove movement.

Rules:

- Minimum target size: `44px` on mobile and `24px` in all contexts.
- Button text stays on one line at desktop sizes.
- Use `<a>` for navigation and `<button>` for actions.
- Do not wrap a clickable card in a `div` click handler.
- Add `touch-action: manipulation` to touch controls.
- Disabled state must retain readable text and a clear non-interactive cursor.

### 4.3 Focus

The global focus treatment is:

```css
:focus-visible {
  outline: 2px solid var(--text);
  outline-offset: 2px;
  border-radius: 4px;
}
```

Rules:

- Never remove an outline without a visible replacement.
- Use `:focus-visible` for keyboard focus. Do not rely on `:focus` alone for new components.
- Pair related compound controls with `:focus-within` when the group itself needs emphasis.
- Focus must remain visible in light mode, dark mode, and forced-colors mode.

### 4.4 Motion

| Interaction | Duration | Easing |
| --- | ---: | --- |
| Pressed button or card | `150ms` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Popover enter/exit | `160ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Mobile drawer | `200ms` | `ease-out` |
| Link color | `300ms` | `ease` |
| Floating label | `150ms` | `ease` |

- Animate only `transform`, `opacity`, `scale`, or `translate`.
- Do not use `transition: all`.
- Continuous animation is limited to meaningful progress, such as the logo's scroll-linked frame.
- Every non-essential animation must stop under `prefers-reduced-motion: reduce`.
- A reduced-motion interface must remain fully understandable.

### 4.5 Popovers and drawers

- Prefer native `popover` and `popovertarget` behavior.
- Use `@starting-style` and discrete transitions for entry and exit.
- Keep the mobile navigation drawer `200px` wide unless the content requires more.
- Use `overscroll-behavior: contain` inside scrollable overlays.
- Icon-only close controls require an accessible name.
- The browser top layer handles stacking for popovers. Do not add arbitrary high z-index values.

## 5. Components

### 5.1 Site header

- Fixed at the top, `80px` high, full width.
- Pale surface with a `4px` bottom border.
- Inner content uses the `1100px` site container.
- Wordmark is a framed text logo with a `4px` border.
- Desktop navigation stays on one line.
- Mobile replaces global links with a menu button and native popover drawer.
- The theme switch sits before navigation actions.
- Header layer is the only normal-page layer allowed near `z-index: 100`.

### 5.2 Hero

- Desktop: circular portrait beside editorial copy.
- Mobile: portrait above copy, all content left aligned.
- One H1, one supporting H2, two short paragraphs, then the newsletter action.
- Newsletter block uses a `4px` leading border to create hierarchy without another card.
- Keep profile imagery circular with a `2px` structural border.
- The hero ends with a `4px` section border.

### 5.3 Social-proof strip

- Full-width pale surface separated by `4px` borders.
- Mobile: stacked and centered, with horizontal separators.
- Desktop: three columns, left aligned, with vertical separators.
- Numbers use fluid type and tabular numerals.
- Do not add card shadows inside the strip.

### 5.4 Article card

- Entire card is one link.
- Pale surface, `2px` border, `6px` radius, hard shadow.
- Thumbnail spans the card width and uses a `2px` bottom divider.
- Title comes before date and reading time.
- Metadata stays at the bottom of equal-height cards.
- Hover and focus use the pressed-object interaction.
- Empty `alt` is acceptable only when the image repeats the linked title and is decorative.

### 5.5 Short card

- Entire card is one link.
- No thumbnail by default.
- Date is muted and smaller than the title.
- Use the same border, radius, shadow, and press behavior as article cards.
- Keep the layout compact enough to scan in a three-column archive.

### 5.6 Newsletter panel

- Pale surface, strong `4px` outer border, and `8px` bottom emphasis.
- Mobile: centered copy and wrapping form controls.
- Wide container: copy and form sit side by side.
- Use a real label, even when a floating-label treatment is visible.
- Input and submit control share a `45px` minimum height in the compact form.
- Error messages use `aria-live="polite"` and `--error-text`.
- Loading buttons retain their original label while displaying progress.

### 5.7 Article header

- A centered title panel sits over a softened article image.
- Use a `4px` frame and `8px` bottom edge on the panel.
- The image receives a high-opacity page-background overlay so the title remains the focus.
- Metadata and Share sit below the H1.
- On narrow screens, reduce padding before shrinking type below a readable scale.

### 5.8 Article body

- Maximum desktop measure is `760px`.
- Body text uses `line-height: 1.7`.
- H2 and H3 headings are numbered to help technical scanning.
- Inline code uses a compact tinted background and `5px` radius.
- Code blocks use `1.5em` padding, `8px` radius, and a theme-aware border.
- Blockquotes use a `4px` mint leading border and slightly enlarged text.
- Media is responsive, intrinsic dimensions are required, and editorial images use an `8px` radius.
- Interactive examples sit immediately after the text they explain.

### 5.9 Table of contents

- Desktop only from `56.25em`.
- Sticky below the fixed header at `110px`.
- `300px` wide with a `2px` border, `6px` radius, and hard shadow.
- Links are numbered with two-digit tabular numerals.
- Each link is at least `44px` high.
- The current target uses the core green link color.
- Mobile articles do not reserve empty space for it.

### 5.10 Share menu

- Trigger uses the standard button system and a Phosphor icon.
- Prefer CSS anchor positioning with a centered fixed-position fallback.
- Popover uses a pale surface, `2px` border, `6px` radius, and hard shadow.
- Items use a mint background on hover or focus and never rely on movement alone.

### 5.11 Book promotion

Two variants exist:

1. `BookShowcase`: a homepage feature section using deep promotional green, warm orange, three compact highlights, and the 3D book mockup.
2. `BuyBook`: an in-content promotion using the normal pale panel, hard bottom edge, and the same 3D book mockup.

Both variants:

- Link to `/you-dont-need-js/`.
- Use `book-professional-transparent.png` through Astro `Picture`.
- Preserve the intrinsic `839 / 1268` aspect ratio.
- Use AVIF, WebP, and PNG output formats.
- Keep the image secondary to the CTA copy.

### 5.12 Footer

- Warm page background with a `4px` top border.
- Reuse the framed wordmark.
- Desktop uses three columns: identity, navigation, social links.
- Mobile stacks the same groups.
- Social links use the compact pressed-object treatment.
- New icons should come from Phosphor. Existing legacy inline SVGs can be migrated gradually.

## 6. Page templates

### 6.1 Homepage

1. Fixed site header
2. Personal editorial hero and newsletter
3. Social-proof strip
4. Book promotion
5. Latest long-form articles
6. Latest short articles
7. Newsletter panel
8. Footer

Keep article and short grids visually related but distinguish them through imagery and density.

### 6.2 Archive page

- H1, short supporting H2, and one concise introduction.
- Cards begin immediately after the introduction.
- Grid changes from 1 to 2 to 3 columns.
- Newsletter and footer close the page.
- Do not add category filters until there is enough content to justify them.

### 6.3 Long-form article

1. Header
2. Framed article title over contextual image
3. Desktop table of contents plus article body
4. Newsletter
5. Three related article cards
6. Footer

### 6.4 Short article

1. Header
2. Compact framed title panel
3. Narrow article body
4. In-content book promotion
5. Newsletter
6. Six related short cards
7. Footer

### 6.5 Learning path

- Introductory hero plus compact topic navigation.
- Topics use a sticky introduction beside grouped guide and tip grids on wide screens.
- Mobile collapses to one column.
- A centered next-step block closes the learning sequence.

### 6.6 Campaign pages

The email course may use a contained campaign typeface and yellow accent. It still inherits the core page background, border logic, control accessibility, and responsive rules. A campaign must not silently redefine shared global tokens.

## 7. Imagery and media

- Use real profile photography, real article illustrations, real screenshots, or functioning interactive examples.
- Do not build fake interface screenshots from decorative divs.
- Use Astro `Picture` for local raster images.
- Always provide intrinsic width and height to prevent layout shift.
- Above-the-fold images load eagerly only when they are likely LCP candidates. Everything else loads lazily.
- Use descriptive alt text when an image adds information.
- Use empty alt text when a linked thumbnail only repeats adjacent linked text.
- Avatars are circular. Editorial screenshots and diagrams use the media radius. The transparent book mockup remains unrounded.
- Autoplay media must have a static fallback and must stop under reduced motion.

## 8. Iconography

- Preferred family: Phosphor Icons.
- Default stroke or visual weight: regular for secondary icons, bold for action icons.
- Standard inline size: `20px`.
- Standard social or standalone size: `24px` to `25px`.
- Decorative icons use `aria-hidden="true"`.
- Icon-only controls require a specific `aria-label`.
- Do not mix multiple icon families inside one component.

## 9. Content and voice

The writing should sound like an experienced front-end developer explaining a useful technique to another developer.

- Lead with the concrete UI problem.
- Prefer direct verbs: build, style, test, compare, replace, inspect.
- Use specific browser, CSS, HTML, accessibility, and performance language.
- Avoid inflated claims and generic marketing language.
- Keep CTAs functional: “Read the article,” “Learn more,” “Join newsletter,” “Start learning.”
- Use curly apostrophes and quotation marks in prose.
- Use the ellipsis character `…`, not three periods.
- Avoid jargon when a shorter common term is accurate.
- Dates remain concise and locale-aware.

## 10. Accessibility requirements

- Every page must include a visible-on-focus “Skip to content” link.
- Every page must contain a `main` landmark.
- Heading levels must be hierarchical.
- All controls must work with keyboard only.
- Use native elements before ARIA: `button`, `a`, `details`, `dialog`, and `popover`.
- Maintain visible `:focus-visible` treatment.
- Mobile interactive targets must be at least `44px` high and wide where possible.
- Form inputs use a visible label, meaningful `name`, correct `type`, and `autocomplete`.
- Email fields use at least `16px` text to prevent iOS zoom.
- Validation appears beside the relevant field and uses polite live regions.
- Do not disable zoom.
- Do not block paste.
- Respect `prefers-reduced-motion`, `prefers-contrast`, and forced colors.
- Dark mode must preserve the same hierarchy and state clarity as light mode.
- Reading and keyboard order must remain logical at every breakpoint.

## 11. Performance requirements

- Keep the core site JavaScript-light. Prefer Astro-rendered HTML and CSS.
- Reserve dimensions for every image and embed.
- Preload only genuine critical assets.
- Lazy-load below-the-fold images and non-critical media.
- Do not animate layout properties.
- Avoid scroll listeners. Prefer CSS scroll-driven animation, Intersection Observer, or native behavior.
- Keep custom fonts out of the core editorial path unless the brand direction changes.
- Test LCP, CLS, and INP with throttling before major releases.

Targets:

| Metric | Target |
| --- | ---: |
| LCP | `< 2.5s` |
| CLS | `< 0.1` |
| INP | `< 200ms` |

## 12. CSS architecture

### 12.1 Sources of truth

- Global foundations: `src/styles/global.css`
- Shared component styles: scoped inside `src/components/*.astro`
- Article layouts: `src/layouts/BlogPost.astro` and `src/layouts/ShortPost.astro`
- Page composition: `src/pages/*.astro`
- Article demos: `src/content/components/**`

The ebook landing-page styles are separate and must not be imported into core pages.

### 12.2 Naming

- Shared components use BEM-style names such as `.book-showcase__content`.
- Component-only generic names are acceptable only inside Astro scoped styles.
- New global utilities must have one purpose and a clear name.
- Component-specific custom properties use a private prefix such as `--_surface` when they do not belong globally.

### 12.3 Modern CSS rules

- Use custom properties for repeated values.
- Use logical properties for new layout code.
- Use Grid for two-dimensional layout and Flexbox for one-dimensional alignment.
- Prefer container queries for reusable component breakpoints.
- Keep nesting to three levels or fewer.
- Do not use `!important` except for an unavoidable third-party override.
- Do not use `transition: all`.
- Do not style with IDs.
- Keep specificity low with component roots and `:where()` where useful.

Recommended future layer order if the global stylesheet is refactored:

```css
@layer reset, tokens, base, layout, components, utilities;
```

## 13. Theme behavior

The current theme switch uses a checkbox, `:root:has(.check-darkmode:checked)`, and `localStorage` persistence.

Rules:

- Theme choice applies to the whole page.
- Do not invert one normal editorial section independently.
- Store the explicit user preference.
- New components must use semantic tokens and work in both themes before merge.
- Native controls must receive explicit background and text colors where browser defaults could conflict.
- Keep the browser `theme-color` aligned with the active page background when theme plumbing is updated.

## 14. Do and do not

### Do

- Use the warm paper, pale surface, and green accent consistently.
- Let strong borders define the page structure.
- Use the hard shadow only where an object is interactive or elevated.
- Keep article text narrow and code examples close to their explanation.
- Make whole cards clickable with semantic links.
- Test light, dark, mobile, desktop, keyboard, and reduced motion.

### Do not

- Import ebook landing-page purple into the main site.
- Put every section inside a shadowed card.
- Add soft generic gradients or glass effects to core pages.
- Mix radius families without a documented reason.
- Add decorative animation to article body content.
- Hide focus outlines.
- Use color as the only active-state signal.
- Add a new display font to normal blog or archive pages.

## 15. Current implementation gaps

This document describes the intended system. The following existing details should be aligned gradually rather than copied into new components:

- Add a shared skip link to all non-LP layouts.
- Consolidate repeated font stacks from individual components into global tokens.
- Consolidate the repeated `1100px` container pattern into a shared layout utility or token.
- Replace legacy inline social and theme SVGs with the established Phosphor family when those components are next edited.
- Use `:focus-visible` instead of `:focus` for new pressed-card and button interactions.
- Standardize the breakpoint set around `37.5em`, `56.25em`, and `64em`, keeping extra breakpoints only where content proves they are needed.
- Move spacing, radius, border, and motion values into named global tokens during the next CSS architecture pass.
- Keep campaign tokens scoped so email-course and book promotion styling cannot leak into the editorial site.

## 16. Component review checklist

Before adding or changing a component, verify:

- [ ] It uses existing semantic color tokens.
- [ ] It works in light and dark themes.
- [ ] Its radius and border weight match the documented scale.
- [ ] Its text remains readable with long titles and translated content.
- [ ] Its interactive target is large enough.
- [ ] It has a visible keyboard focus state.
- [ ] Its hover state does not provide the only feedback.
- [ ] Motion uses only composited properties and has a reduced-motion variant.
- [ ] Images have intrinsic dimensions and correct alt text.
- [ ] Mobile behavior is explicit.
- [ ] It does not import or imitate the ebook landing-page design system.
