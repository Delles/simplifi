# LP Creation Wizard Design System

## Color Scheme

### Primary Colors

-   **theme-blue** (#3c7fba): Headers, primary actions, main UI elements
-   **theme-blue-dark**: Darker variant for hover states and emphasis

### Secondary Colors

-   **emerald-green** (#10B981): Success states, positive feedback, completed actions
-   **emerald-600**: Darker variant for hover states

### Accent Colors

-   **distribute-primary** (#F59E0B): Warnings, important call-to-actions, risk indicators
-   **distribute-secondary**: Darker variant for hover states

### Neutral Colors

-   **graphite**: Primary text color
-   **slate**: Secondary text color
-   **ash**: Border and subtle background color
-   **cloud-white**: Light background color

## Component Variants

### CollapsibleCard Variants

#### Primary Cards

-   **Usage**: Important content, main information sections
-   **Colors**: theme-blue accents, theme-blue/5 backgrounds
-   **Examples**: Pool summary, token details, transaction details

#### Secondary Cards

-   **Usage**: Supporting information, tips, additional content
-   **Colors**: ash/30 borders, slate/5 backgrounds
-   **Examples**: Important notes, strategy tips, educational content

#### Warning Cards

-   **Usage**: Warnings, risks, important notices
-   **Colors**: distribute-primary accents, distribute-primary/5 backgrounds
-   **Examples**: Risk acknowledgment, important reminders, warnings

#### Success Cards

-   **Usage**: Positive feedback, completed states, benefits
-   **Colors**: emerald-green accents, emerald-green/5 backgrounds
-   **Examples**: Successful completion, benefits, recommendations

## Typography Hierarchy

### Headers

-   **H1**: `text-h1` - Main page titles
-   **H2**: `text-h2` - Section headers (theme-blue)
-   **H3**: `text-h3` - Subsection headers
-   **H4**: `text-h4` - Card titles, component headers

### Body Text

-   **Large**: `text-body-lg` - Important descriptions
-   **Regular**: `text-body` - Standard content
-   **Small**: `text-sm` - Secondary information
-   **Extra Small**: `text-xs` - Labels, badges

## Spacing System

### Consistent Spacing

-   **Component spacing**: `space-y-8` between major sections
-   **Card spacing**: `space-y-6` within card groups
-   **Content spacing**: `space-y-4` within cards
-   **Element spacing**: `space-y-3` for related elements

### Padding

-   **Cards**: `p-4` for standard cards, `p-6` for important cards
-   **Buttons**: `px-6 py-3` for standard, `px-8 py-4` for primary actions
-   **Small elements**: `px-2 py-1` for badges, `px-3 py-1` for small buttons

## Shadow System

### Card Shadows

-   **Level 1**: `shadow-level-1` - Subtle elevation
-   **Level 2**: `shadow-level-2` - Standard cards
-   **Level 3**: `shadow-level-3` - Important elements, modals

### Hover Effects

-   **Card hover**: `hover:shadow-level-1` or `hover:shadow-level-2`
-   **Button hover**: `hover:shadow-level-3`

## Border Radius

### Consistent Rounding

-   **Cards**: `rounded-xl` (12px)
-   **Buttons**: `rounded-xl` (12px)
-   **Small elements**: `rounded-lg` (8px)
-   **Badges**: `rounded-md` (6px)
-   **Icons**: `rounded-lg` (8px)

## Animation Guidelines

### Subtle Animations

-   **Transitions**: `transition-all duration-200` for interactions
-   **Hover effects**: `group-hover:scale-105` for subtle scaling
-   **Loading states**: `animate-pulse` for active elements
-   **Success states**: `animate-bounce` for celebration

### Avoid

-   Excessive animations
-   Long duration transitions
-   Distracting effects
-   Heavy decorative animations

## Accessibility

### Color Contrast

-   All text meets WCAG AA standards
-   Interactive elements have sufficient contrast
-   Focus states are clearly visible

### Keyboard Navigation

-   All interactive elements are keyboard accessible
-   Tab order is logical and intuitive
-   Focus indicators are visible

### Screen Readers

-   Proper semantic HTML structure
-   ARIA labels where needed
-   Descriptive button and link text

## Component Patterns

### Selection States

```tsx
// Selected state
className={`${isSelected
  ? "bg-theme-blue/5 border-theme-blue/30 shadow-level-1"
  : "bg-white border-ash/30 hover:bg-theme-blue/5"
}`}
```

### Status Indicators

```tsx
// Success indicator
<div className="w-8 h-8 bg-emerald-green rounded-lg flex items-center justify-center text-white">
  ✓
</div>

// Warning indicator
<div className="w-8 h-8 bg-distribute-primary rounded-lg flex items-center justify-center text-white">
  ⚠️
</div>
```

### Button Patterns

```tsx
// Primary button
className =
    "px-8 py-3 bg-gradient-to-r from-theme-blue to-theme-blue-dark text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-200 shadow-level-2 hover:shadow-level-3";

// Secondary button
className =
    "px-8 py-3 border border-theme-blue text-theme-blue rounded-xl font-semibold hover:bg-theme-blue/5 transition-all duration-200";
```

## Implementation Notes

### Consistency Checklist

-   [ ] All components use the defined color scheme
-   [ ] CollapsibleCard variants are used appropriately
-   [ ] Spacing system is consistently applied
-   [ ] Typography hierarchy is maintained
-   [ ] Shadow system is used correctly
-   [ ] Border radius is consistent
-   [ ] Animations are subtle and purposeful
-   [ ] Accessibility standards are met

### Future Enhancements

-   Consider adding dark mode support
-   Implement theme customization
-   Add more sophisticated animation system
-   Enhance accessibility features
