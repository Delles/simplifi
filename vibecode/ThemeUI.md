# SimpliFi: UI Theme - "Modern Clarity"

**Overall Aesthetic & Feel:**

The "Modern Clarity" UI theme for SimpliFi is designed to be **clean, minimalist, trustworthy, and highly intuitive**, catering especially to non-technical users as per the PDR. It prioritizes ease of use, clear information hierarchy, and a sense of security and professionalism. The aesthetic is bright and approachable, utilizing ample white space and clear visual cues to guide users through complex blockchain operations effortlessly. It aims to feel like a natural extension of the MultiversX ecosystem while establishing its own distinct, user-centric identity.

**Guiding Principles:**

-   **Simplicity Above All:** Uncluttered layouts, focused content.
-   **Guided Experience:** Clear visual hierarchy, intuitive navigation, and prominent calls to action.
-   **Trust & Security:** A polished, professional look that inspires confidence.
-   **Accessibility:** High contrast ratios, legible typography, and clear interactive states.
-   **Educational Support:** Design elements that seamlessly integrate guidance and explanations.
-   **Consistency:** Uniform application of all theme elements.

---

**1. Color Palette:**

The palette is built around a light, airy base with vibrant accents for interactivity and clear semantic colors for feedback.

-   **Core Backgrounds:**

    -   **App Canvas/Page Background:** `#F7F9FC` (Cloud White - A very light, cool gray providing a subtle backdrop)
    -   **Header/Sidebar Background:** `#FFFFFF` (Pure White - For primary navigation areas, offering clean separation)
    -   **Content Surface Background (Cards, Modals, Input Fields):** `#FFFFFF` (Pure White - For main content areas ensuring high contrast and focus)

-   **Accent Colors:**

    -   **Primary Accent (Primary CTAs, Active States, Key Icons):** `#00F2C3` (Cyber Teal - The vibrant MultiversX teal for high-visibility actions)
    -   **Secondary Accent (Secondary CTAs, Links, Informative Icons):** `#3B82F6` (Hyperlink Blue - A modern, friendly blue for secondary actions and links)

-   **Text Colors:**

    -   **Text - Primary (on light surfaces):** `#1F2937` (Graphite - A dark gray for primary content)
    -   **Text - Secondary (on light surfaces):** `#6B7280` (Slate - A medium gray for less emphasized text, labels)
    -   **Text - On Primary Accent (e.g., on Cyber Teal buttons):** `#0D2B2B` (Deep Teal/Black - Ensuring high contrast on the bright teal)
    -   **Text - On Dark Surfaces (e.g., dark tooltips):** `#F3F4F6` (Mist - A light gray for readability)

-   **Borders & Dividers:**

    -   **Standard Borders:** `#E5E7EB` (Ash - A light gray for subtle separation)

-   **Semantic Colors (Feedback & Status):**

    -   **Success:** `#10B981` (Emerald Green - For success messages, confirmations)
    -   **Warning (Non-critical alerts, pending states):** `#F59E0B` (Amber - For cautionary information, pending indicators)
    -   **Error/Destructive:** `#EF4444` (Signal Red - For errors, critical warnings, destructive actions)
    -   **Informational (General info messages, neutral alerts):** `#3B82F6` (Hyperlink Blue - Can also be used for neutral informational messages, consistent with secondary accent)

-   **Disabled States:**
    -   **Disabled Background (Buttons, elements):** `#E5E7EB` (Ash)
    -   **Disabled Text/Icons:** `#6B7280` (Slate - Ensuring better contrast than a lighter gray)

---

**2. Typography:**

**Font Family:** **Inter** (A highly legible, versatile, and modern sans-serif family)

-   **Headings:**
    -   `h1` (Page Titles): Inter Bold, 32px
    -   `h2` (Section Titles): Inter SemiBold, 24px
    -   `h3` (Card Titles, Sub-sections): Inter SemiBold, 20px
    -   `h4` (Smaller Titles, emphasized labels): Inter Medium, 18px
-   **Body Text:**
    -   `p (Primary)`: Inter Regular, 16px, Line Height: 1.6
    -   `p (Secondary/Small)`: Inter Regular, 14px, Line Height: 1.5 (for captions, tooltips)
-   **Labels & Helper Text:**
    -   `Input Labels`: Inter Medium, 14px, Color: `Slate (#6B7280)`
    -   `Helper/Error Text (under inputs)`: Inter Regular, 12px
-   **Button Text:**
    -   `Primary/Large Buttons`: Inter Medium, 16px
    -   `Secondary/Small Buttons`: Inter Medium, 14px
-   **Input Field Text:** Inter Regular, 16px

**Note:** Ensure adequate letter spacing for headings and comfortable line heights for all text to maximize readability.

---

**3. Shadowing & Elevation:**

Subtle, soft shadows are used to create depth, denote interactivity, and establish a clear visual hierarchy. Light source is implied from the top.

-   **Level 1 (Subtle lift: Cards, static elements needing slight separation):**
    `box-shadow: 0px 1px 3px rgba(25, 39, 55, 0.05), 0px 1px 2px rgba(25, 39, 55, 0.03);`
    _(Using a desaturated blue for shadow color instead of pure black gives a more refined look)_
-   **Level 2 (Standard elevation: Active cards on hover, Modals, Dropdowns):**
    `box-shadow: 0px 4px 8px rgba(25, 39, 55, 0.07), 0px 2px 4px rgba(25, 39, 55, 0.05);`
-   **Level 3 (Significant elevation: Critical pop-ups, focused overlays):**
    `box-shadow: 0px 10px 20px rgba(25, 39, 55, 0.08), 0px 5px 10px rgba(25, 39, 55, 0.06);`
-   **Interactive Hover Shadow (on Cards, Buttons):** Transition to a slightly more pronounced shadow (e.g., from Level 1 to a slightly larger Level 1 or a soft Level 2) and/or a subtle upward transform (`transform: translateY(-2px)`).

---

**4. UI Elements:**

Consistency in styling across all UI elements is crucial. Default border-radius for interactable elements like buttons and inputs: **6px to 8px**. For cards and modals: **8px to 12px**.

-   **Buttons:**

    -   **Primary CTA:**
        -   Background: `Cyber Teal (#00F2C3)`
        -   Text: `Deep Teal/Black (#0D2B2B)`
        -   Border: None
        -   Padding: ~12px 24px
        -   Shadow: Level 1 (subtle); Hover: Slight lift, darken background slightly.
    -   **Secondary CTA (Filled):**
        -   Background: `Hyperlink Blue (#3B82F6)`
        -   Text: `Pure White (#FFFFFF)`
        -   Others: Similar to Primary.
    -   **Secondary CTA (Outlined):**
        -   Background: `Pure White (#FFFFFF)`
        -   Text: `Hyperlink Blue (#3B82F6)`
        -   Border: 1px solid `Hyperlink Blue (#3B82F6)`
        -   Hover: Background `Hyperlink Blue` at 10% opacity.
    -   **Destructive CTA:**
        -   Background: `Signal Red (#EF4444)`
        -   Text: `Pure White (#FFFFFF)`
        -   Others: Similar to Primary.
    -   **Disabled State:**
        -   Background: `Ash (#E5E7EB)`
        -   Text: `Slate (#6B7280)`
        -   Shadow: None. Cursor: `not-allowed`.
    -   **Focus State (Keyboard):** Add a 2px solid outline using the respective accent color (e.g., `Cyber Teal` for primary, `Hyperlink Blue` for secondary) with a small offset.

-   **Input Fields (Text, Number, Select):**

    -   Background: `Pure White (#FFFFFF)`
    -   Border: 1px solid `Ash (#E5E7EB)`
    -   Text Color: `Graphite (#1F2937)`
    -   Placeholder Text Color: `Slate (#6B7280)` (with opacity if needed, e.g., 0.7)
    -   Focus State: Border 1.5px solid `Hyperlink Blue (#3B82F6)`, subtle `Level 1` inner shadow or glow.
    -   Error State: Border 1.5px solid `Signal Red (#EF4444)`.
    -   Disabled State: Background `Ash (#E5E7EB)`, Text `Slate (#6B7280)`.

-   **Toggle Switches & Radio Buttons/Checkboxes:**

    -   **Toggle Switch (On):** Background `Cyber Teal (#00F2C3)`.
    -   **Toggle Switch (Off):** Background `Ash (#E5E7EB)`.
    -   **Radio/Checkbox (Selected):** Icon/fill `Hyperlink Blue (#3B82F6)` or `Cyber Teal (#00F2C3)` for primary selections, border `Ash`.
    -   **Focus:** Visible outline similar to buttons.

-   **Cards & Modals:**

    -   Background: `Pure White (#FFFFFF)`
    -   Shadow: `Level 1` or `Level 2` for Cards. Modals `Level 2` or `Level 3`.
    -   Modal Backdrop: `Graphite (#1F2937)` with ~60-70% opacity.

-   **Navigation (Sidebar/Header):**

    -   **Header:** Background `Pure White (#FFFFFF)`, Shadow `Level 1` (bottom only).
    -   **Sidebar:** Background `Pure White (#FFFFFF)`.
    -   **Nav Links (Text & Icon):** Color `Slate (#6B7280)`.
    -   **Active Nav Link:** Text & Icon color `Cyber Teal (#00F2C3)`, Font-weight: SemiBold. Optional: A subtle `Cyber Teal` left border (2-3px) or a very light teal background (`Cyber Teal` at 5-10% opacity).

-   **Tooltips (`InfoIconWithTooltip`):**

    -   Icon: `Slate (#6B7280)` or `Hyperlink Blue (#3B82F6)`.
    -   Tooltip Background: `Graphite (#1F2937)`.
    -   Tooltip Text: `Mist (#F3F4F6)`.
    -   Border Radius: 4px.

-   **Stepper Navigation:**

    -   **Active Step:** Circle/Icon fill `Cyber Teal (#00F2C3)`, Text `Cyber Teal (#00F2C3)`.
    -   **Completed Step:** Circle/Icon fill `Emerald Green (#10B981)`, Text `Slate (#6B7280)`.
    -   **Upcoming Step:** Circle/Icon border `Ash (#E5E7EB)`, fill `Pure White (#FFFFFF)`, Text `Silver (#9CA3AF)`.
    -   Connecting Lines: `Ash (#E5E7EB)`; `Cyber Teal` for filled progress.

-   **Transaction Status Notifications (Toasts/Alerts):**

    -   Sharp, clear iconography alongside text. Rounded corners (e.g., 8px), `Level 2` shadow.
    -   **Success:** Background `Emerald Green (#10B981)`, Text `Pure White (#FFFFFF)`.
    -   **Warning:** Background `Amber (#F59E0B)`, Text `Graphite (#1F2937)`.
    -   **Error:** Background `Signal Red (#EF4444)`, Text `Pure White (#FFFFFF)`.
    -   **Info:** Background `Hyperlink Blue (#3B82F6)` (or a lighter shade like `Cloud White` with `Hyperlink Blue` text/border), Text `Pure White (#FFFFFF)`.

-   **Tables:**
    -   Header Background: `Cloud White (#F7F9FC)`.
    -   Header Text: `Graphite (#1F2937)`, Inter SemiBold, 14px.
    -   Row Background: `Pure White (#FFFFFF)`.
    -   Cell Text: `Graphite (#1F2937)`.
    -   Borders: Horizontal lines 1px solid `Ash (#E5E7EB)`.
    -   Hover on Rows (if interactive): Subtle background change, e.g., `Cloud White (#F7F9FC)`.

---

This "Modern Clarity" UI theme provides a comprehensive visual foundation for SimpliFi, ensuring a cohesive, engaging, and user-friendly experience that aligns with the project's core goals of simplicity, accessibility, and trust within the MultiversX ecosystem.
