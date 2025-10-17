# 🎨 Design System - Shyam Mehandi Website

## Color Palette

### Primary Colors
- **Deep Green**: `#0b3b2e` - Main brand color
- **Gold**: `#c69b3b` - Accent and highlights
- **Cream**: `#fff6ea` - Background

### Secondary Colors
- **Rose Gold**: `#b76e79` - Secondary accent
- **Brown**: `#603a2e` - Text and headings
- **Olive**: `#6b8a58` - Subtle accents

### Neutral Colors
- **Light Cream**: `#fffbf5` - Light backgrounds
- **Dark Brown**: `#4a2c26` - Dark text

## Typography

### Font Families
1. **Great Vibes** (Serif, Script)
   - Used for: Main title, hero heading
   - Size: 72px (desktop), 40px (mobile)
   - Weight: Regular

2. **Lora** (Serif)
   - Used for: Subtitles, section headings
   - Size: 24px (desktop), 18px (mobile)
   - Weight: 400, 700

3. **Montserrat** (Sans-serif)
   - Used for: Body text, buttons, navigation
   - Size: 16px (desktop), 14px (mobile)
   - Weight: 300, 400, 600, 700

### Typography Scale
```
Hero Title:        72px (desktop) / 40px (mobile)
Section Heading:   28px (desktop) / 24px (mobile)
Subtitle:          24px (desktop) / 18px (mobile)
Body Text:         16px (desktop) / 15px (mobile)
Small Text:        14px (desktop) / 12px (mobile)
```

## Spacing System

### Base Unit: 4px

```
xs:  4px   (0.25rem)
sm:  8px   (0.5rem)
md:  12px  (0.75rem)
lg:  16px  (1rem)
xl:  20px  (1.25rem)
2xl: 24px  (1.5rem)
3xl: 28px  (1.75rem)
4xl: 32px  (2rem)
```

### Common Spacing
- **Padding**: 16px, 20px, 28px
- **Margin**: 12px, 16px, 20px, 24px
- **Gap**: 12px, 14px, 16px, 18px

## Shadow System

### Shadow Levels
```css
--shadow-sm:  0 4px 12px rgba(0, 0, 0, 0.08)
--shadow-md:  0 12px 32px rgba(0, 0, 0, 0.12)
--shadow-lg:  0 20px 48px rgba(0, 0, 0, 0.16)
```

### Usage
- **sm**: Subtle depth, cards
- **md**: Medium depth, buttons, modals
- **lg**: Strong depth, lightbox, important elements

## Border Radius

```
sm:  6px
md:  8px
lg:  10px
xl:  12px
2xl: 14px
3xl: 16px
```

### Usage
- **6-8px**: Small elements, buttons
- **10-12px**: Cards, containers
- **14-16px**: Large sections

## Animation System

### Timing Functions
```css
ease:                    ease
smooth:                  cubic-bezier(0.4, 0, 0.2, 1)
bounce:                  cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Duration
```
fast:    150ms
normal:  300ms
slow:    500ms
slower:  800ms
```

### Common Animations
- **Fade In**: 300ms, ease
- **Scale**: 300ms, smooth
- **Slide**: 500ms, smooth
- **Zoom**: 400ms, smooth

## Component Styles

### Buttons

#### Primary Button
- Background: Linear gradient (Deep Green)
- Color: Cream
- Padding: 14px 28px
- Border Radius: 10px
- Shadow: md
- Hover: Lift 6px, enhanced shadow

#### Outline Button
- Background: Transparent
- Border: 2px solid Gold
- Color: Deep Green
- Padding: 14px 28px
- Border Radius: 10px
- Hover: Fill with gold gradient

### Cards

#### Service Card
- Background: Gradient (Light Cream)
- Padding: 28px
- Border Radius: 16px
- Shadow: md
- Border: 1px solid rgba(Gold, 0.1)
- Hover: Lift 12px, enhanced shadow

#### Gallery Card
- Background: White
- Padding: 0
- Border Radius: 12px
- Shadow: md
- Image Height: 240px (desktop)
- Hover: Lift 8px, scale image 1.08

### Navigation

#### Nav Link
- Color: Deep Green
- Padding: 10px 14px
- Border Radius: 8px
- Underline: Gold gradient (on hover)
- Transition: 300ms smooth

#### Mobile Menu
- Background: Gradient (Light Cream)
- Border Radius: 14px
- Shadow: lg
- Border: 1px solid rgba(Gold, 0.1)
- Padding: 16px 20px

## Responsive Breakpoints

```
xs:  < 420px   (Extra Small Mobile)
sm:  420-600px (Small Mobile)
md:  600-768px (Mobile)
lg:  768-1024px (Tablet)
xl:  1024-1400px (Desktop)
2xl: > 1400px  (Large Desktop)
```

## Grid System

### Desktop (>1024px)
- Columns: 12
- Gap: 16px
- Max Width: 1200px

### Tablet (768-1024px)
- Columns: 8
- Gap: 14px
- Max Width: 100%

### Mobile (<768px)
- Columns: 4
- Gap: 12px
- Max Width: 100%

## Accessibility

### Color Contrast
- Text on background: 7:1 (AAA)
- Links: 4.5:1 (AA)
- Buttons: 4.5:1 (AA)

### Focus States
- Outline: 2px solid Gold
- Outline Offset: 4px
- Visible on all interactive elements

### Touch Targets
- Minimum size: 44x44px
- Spacing: 8px minimum

## Icons

### Icon Sizes
```
sm:  16px
md:  18px
lg:  24px
xl:  36px
2xl: 48px
```

### Icon Colors
- Primary: Deep Green
- Accent: Gold
- Hover: Rose Gold

## Patterns

### Background Pattern
- SVG-based mehandi motifs
- Opacity: 0.12
- Repeat: 400px
- Colors: Deep Green, Gold, Olive

### Gradient Patterns
- Direction: 135deg (diagonal)
- Colors: Cream to Light Cream
- Opacity: Varies by element

## Responsive Typography

### Desktop
- Hero Title: 72px
- Heading: 28px
- Subtitle: 24px
- Body: 16px

### Tablet
- Hero Title: 52px
- Heading: 24px
- Subtitle: 20px
- Body: 15px

### Mobile
- Hero Title: 40px
- Heading: 24px
- Subtitle: 18px
- Body: 15px

### Small Mobile
- Hero Title: 32px
- Heading: 20px
- Subtitle: 16px
- Body: 14px

## Depth Layers

```
z-index: 0    - Background patterns
z-index: 1    - Main content
z-index: 99   - Header (sticky)
z-index: 999  - Lightbox/Modals
```

## Performance Metrics

- **Animation FPS**: 60fps
- **Transition Duration**: 300-500ms
- **Load Time**: < 2 seconds
- **Lighthouse Score**: 90+

---

**This design system ensures consistency and quality across all pages and devices.**

