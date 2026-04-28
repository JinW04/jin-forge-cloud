# Design System Specification: The Architectural Core

## 1. Overview & Creative North Star
**Creative North Star: "The Ethereal Engine"**

This design system moves away from the "industrial utility" typical of developer portals and shifts toward a "High-End Editorial" experience. The goal is to make infrastructure management feel like navigating a premium digital gallery. We achieve this through **The Ethereal Engine**—a philosophy that balances the cold, hard logic of cloud operations with a soft, atmospheric UI. 

Instead of rigid, boxed-in grids, we employ **intentional asymmetry** and **tonal depth**. We break the "template" look by using wide tracking in labels, generous negative space, and overlapping glass layers that suggest a three-dimensional workspace. The interface doesn't just present data; it curates it.

---

## 2. Colors & Surface Philosophy
The palette is a sophisticated blend of deep space charcoal and nocturnal navy, designed to reduce cognitive load while maintaining a high-performance aesthetic.

### The "No-Line" Rule
To achieve a premium feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit directly on a `surface` background. The transition of tone is the divider.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of frosted glass.
*   **Base Layer:** `surface` (#0b1326) – The canvas.
*   **Structural Sections:** `surface-container-low` (#131b2e) – Large layout blocks.
*   **Interactive Cards:** `surface-container` (#171f33) – The standard container.
*   **Elevated Details:** `surface-container-high` (#222a3d) – Pop-overs or active states.

### The "Glass & Gradient" Rule
Standard flat colors are insufficient for a signature experience. 
*   **Glassmorphism:** Use `surface-variant` (#2d3449) at 60% opacity with a `20px` backdrop-blur for floating panels.
*   **Signature Textures:** Primary CTAs must use a linear gradient from `primary` (#a3c9ff) to `primary-container` (#0078d4) at a 135-degree angle. This provides a visual "soul" that flat hex codes cannot replicate.

---

## 3. Typography: The Editorial Voice
We use a dual-font strategy to balance authoritative headers with highly legible data.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision. Use `display-lg` and `headline-md` with tight letter-spacing (-0.02em) to create a sense of "Engineered Authority."
*   **Body & Labels (Inter):** The workhorse. Inter provides exceptional readability for complex cloud configurations. 
*   **Hierarchy as Identity:** Use `label-sm` in all-caps with `0.1em` letter-spacing for metadata. This "editorial" treatment distinguishes system-generated text from user content.

---

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering** rather than traditional structural lines.

### The Layering Principle
Stack tiers to create soft, natural lift. A `surface-container-lowest` card placed on a `surface-container-low` section creates an "inset" feel, implying the card is a carved-out control panel.

### Ambient Shadows
When an element must float (e.g., a modal), use an **Ambient Shadow**:
*   **Blur:** 40px to 60px.
*   **Opacity:** 8% of the `on-surface` color (#dae2fd).
*   **Tint:** Never use pure black; the shadow must be a deep navy tint to maintain the "Nocturnal" atmosphere.

### The "Ghost Border" Fallback
If accessibility requires a border, use the **Ghost Border**: `outline-variant` (#404752) at 15% opacity. Standard 100% opaque borders are strictly forbidden.

---

## 5. Components

### Buttons: The Kinetic Spark
*   **Primary:** Gradient fill (`primary` to `primary-container`). Apply a `0px 0px 15px` glow using `primary_container` at 40% opacity on hover.
*   **Secondary:** Ghost Border style with `on-surface` text.
*   **Tertiary:** Text-only, using `primary` (#a3c9ff) for the font color.

### Chips & Status Badges
*   **High-Contrast Status:** Use `error_container`, `success` (custom), and `warning` (custom) but only as small, high-saturation "pills." The "neon glow" should be a 4px outer blur in the same color to signify "active" system health.

### Input Fields
*   **Styling:** Inputs should use `surface-container-lowest` (#060e20). Upon focus, the "Ghost Border" transitions to a 1px `primary` border with a subtle `2px` outer glow. 
*   **Labels:** Always use `label-md` floating above the field to maintain an airy, vertical rhythm.

### Cards & Lists
*   **No Dividers:** Lists must use vertical white space (16px–24px) or a subtle alternating background shift (`surface-container` to `surface-container-low`) to separate items.
*   **The Vending Slot:** For the "CloudOps Vending Machine" context, use a "Slot" component—a deeply inset `surface-container-lowest` area where provisioned resources appear to "slide" out via a glassmorphic overlay.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Negative Space:** If you think a section needs more content, it probably needs more padding. Use the `xl` (0.75rem) roundedness for large containers to soften the "tech" edge.
*   **Use Tonal Shifts:** Define layout areas by alternating between `surface` and `surface-container-low`.
*   **Prioritize Typography:** Let the scale of the font (e.g., a `display-md` header) be the primary visual anchor of the page.

### Don’t:
*   **Don't use 1px Dividers:** Lines are a sign of a "standard" UI. We are building a signature experience.
*   **Don't use Default Shadows:** Avoid the "dirty" look of black shadows. Always tint your blurs.
*   **Don't Over-Glow:** The neon glow is for *active* states and *primary* actions only. If everything glows, nothing is important.
*   **Don't Flatten the Glass:** Ensure backdrop-blur is always paired with a semi-transparent fill; otherwise, it looks like a simple grey box.