# UI Design Documentation

## Design System

The workspace booking platform now features a modern design inspired by leading co-working platforms, with the following characteristics:

### Color Palette

**Primary Colors:**
- **Red Accent**: `#DC2626` (red-600) - Primary CTAs, active states
- **Purple-Blue Gradient**: Pink-200 → Purple-300 → Blue-400
  - Used for hero sections and prominent backgrounds
  - Creates a soft, modern, professional look

**Secondary Colors:**
- **White**: Pure white backgrounds for content sections
- **Gray Scale**: Gray-50 to Gray-900 for text hierarchy
- **Borders**: Gray-200 to Gray-300 for subtle separations

### Typography

- **Headings**: Bold, large font sizes (text-4xl to text-6xl)
- **Body Text**: Medium weight (font-medium) for navigation and labels
- **Colors**:
  - Primary text: Gray-900
  - Secondary text: Gray-600/700
  - Muted text: Gray-500

### Components

#### Navigation Bar
- **Height**: 80px (h-20)
- **Background**: Pure white with subtle shadow
- **Logo**: Two-tone (Red "Work" + Gray "Space")
- **Links**: Gray-700 with red hover state
- **Phone**: Bordered button with red accent
- **Login**: Solid red button

#### Hero Section
- **Background**: Purple-to-blue gradient with subtle overlay
- **Layout**: Two-column (content + image) on desktop
- **Search Box**: White card with shadow-2xl
- **Tabs**: Red active state, gray inactive
- **Popular Cities**: Rounded pills with white borders

#### Featured Workspaces
- **Category Tabs**: Horizontal scrollable pills
  - Active: Red background with white text
  - Inactive: Gray border with hover effects
- **Cards**:
  - Clean white with shadow-lg
  - Image hover effect (scale-110)
  - Pricing in red (text-red-600)
  - "Starting from ₹X / month" format

#### Process Steps
- **Background**: Gray-50
- **Steps**: Numbered circles (01-04) connected by dashed lines
- **Style**: Black circles with white text
- **Layout**: Horizontal on desktop with connecting lines

#### CTA Section
- **Background**: Matching gradient (purple-to-blue)
- **Buttons**: Primary red + Secondary white outline
- **Stats**: Three-column grid with large numbers
- **Style**: Center-aligned with generous spacing

### Interactive States

1. **Hover Effects**:
   - Links: Color transition to red
   - Cards: Shadow increase + image scale
   - Buttons: Darker shade on hover

2. **Active States**:
   - Tabs: Red background with shadow
   - Navigation: Red text color

3. **Transitions**:
   - All color changes: `transition-colors`
   - Image transforms: `transition-transform duration-300`
   - Shadows: `transition-all`

### Responsive Design

- **Mobile**:
  - Single column layout
  - Collapsible navigation
  - Stacked search elements
  - Scrollable category tabs

- **Tablet (md)**:
  - Two-column grids
  - Visible secondary navigation
  - Side-by-side CTAs

- **Desktop (lg)**:
  - Four-column grid for workspaces
  - Full hero layout with image
  - Horizontal process steps with connecting lines

### Spacing System

- **Sections**: py-16 to py-20 (64px to 80px vertical)
- **Container**: mx-auto with responsive px-4
- **Cards**: p-5 to p-6 internal padding
- **Gaps**: gap-3 to gap-8 for flex/grid layouts

### Shadows

- **Subtle**: shadow-sm for navbar
- **Medium**: shadow-lg for cards
- **Heavy**: shadow-2xl for search box and hero elements
- **Hover**: shadow-2xl on card hover

### Border Radius

- **Small**: rounded-lg (8px)
- **Medium**: rounded-2xl (16px)
- **Full**: rounded-full for pills and circles

## Key Features

1. **Modern Gradient Hero**: Eye-catching purple-to-blue gradient matching industry standards
2. **Category Filtering**: Horizontal pill-style tabs for space types
3. **Clean Card Design**: Image-first workspace cards with pricing emphasis
4. **Process Visualization**: Clear 4-step process with visual connectors
5. **Trust Indicators**: Statistics in CTA section (locations, workspaces, users)
6. **Professional Color Scheme**: Red accents on neutral base with gradient highlights

## Usage Notes

- Red (`#DC2626`) is used sparingly for maximum impact on CTAs and important elements
- Gradients provide visual interest without overwhelming content
- White space is generous for a clean, premium feel
- Typography hierarchy is clear with proper size and weight variations
- All interactive elements have clear hover states for better UX