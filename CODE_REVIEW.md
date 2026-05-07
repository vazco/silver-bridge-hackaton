# Code Review Report

**Branch:** `cursor/code-quality-review-2488`  
**Base Branch:** `cursor/podstrona-z-przychodniami-f84c`  
**Review Date:** May 7, 2026  
**Reviewer:** Senior Software Engineer (Automated Review)

## Summary

This review covers the addition of a new `/przychodnie` (clinics) page and navigation updates. The implementation includes:
- New route: `apps/web/src/routes/przychodnie.tsx` (160 lines)
- Updated navigation: `apps/web/src/components/header.tsx` (5 lines changed)
- Auto-generated route tree updates

The code demonstrates good use of TypeScript types and modern React patterns. However, there are several production-readiness concerns, accessibility issues, and maintainability improvements needed before deployment.

---

## High Severity

### 1. Missing Accessibility - Active Link Indication

**File:** `apps/web/src/components/header.tsx`

**Description:**  
Navigation links provide no visual or programmatic indication of which page is currently active. This violates WCAG 2.1 Success Criterion 2.4.8 (Location) and creates a poor user experience. Users cannot determine their current location in the application.

**Impact:**  
- Users with cognitive disabilities may become disoriented
- Fails accessibility compliance (WCAG AA)
- Poor UX for all users navigating between pages

**Suggested Fix:**  
Use TanStack Router's `activeProps` or `activeOptions` to style active links:

```tsx
<Link 
  key={to} 
  to={to}
  activeProps={{
    className: "font-semibold underline",
    'aria-current': 'page'
  }}
>
  {label}
</Link>
```

---

### 2. Phone Numbers in Wrong Semantic Context

**File:** `apps/web/src/routes/przychodnie.tsx` (Line 112)

**Description:**  
Phone numbers are displayed in `CardDescription`, which is semantically meant for descriptive text, not contact information. Additionally, phone numbers are not wrapped in clickable links (`<a href="tel:...">`), making them non-functional on mobile devices.

**Impact:**  
- Mobile users cannot tap to call
- Screen readers may not properly announce phone numbers
- Breaks expected mobile UX patterns
- Potential loss of user engagement/conversions

**Suggested Fix:**

```tsx
<CardHeader>
  <CardTitle>{clinic.name}</CardTitle>
  <CardDescription>
    <a 
      href={`tel:${clinic.phone.replace(/\s/g, '')}`}
      className="hover:underline"
      aria-label={`Zadzwoń do ${clinic.name}`}
    >
      {clinic.phone}
    </a>
  </CardDescription>
</CardHeader>
```

---

### 3. No Loading or Error States

**File:** `apps/web/src/routes/przychodnie.tsx`

**Description:**  
The component renders mock data directly with no consideration for asynchronous data fetching. While this works for static mock data, the code structure provides no pattern for handling loading states, errors, or empty states that will be required when connecting to a real API.

**Impact:**  
- When connected to API: users see stale/incorrect data during loading
- No error handling means silent failures in production
- Poor user experience during network delays
- Makes refactoring to real data more error-prone

**Suggested Fix:**  
Implement a data fetching pattern using TanStack Query (already in dependencies):

```tsx
export const Route = createFileRoute("/przychodnie")({
  component: PrzychodnieComponent,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData({
      queryKey: ['clinics'],
      queryFn: async () => {
        // API call would go here
        return mockClinics;
      },
    });
  },
});

function PrzychodnieComponent() {
  const { data: clinics, isLoading, error } = useQuery({
    queryKey: ['clinics'],
    queryFn: async () => mockClinics,
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Ładowanie...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Błąd: {error.message}</div>;
  }

  // ... rest of render
}
```

---

### 4. Missing Navigation Landmark and Skip Link

**File:** `apps/web/src/components/header.tsx`

**Description:**  
The navigation is wrapped in a generic `<div>` instead of semantic HTML elements. Additionally, there's no "skip to main content" link, which is critical for keyboard and screen reader users to bypass repetitive navigation.

**Impact:**  
- Screen reader users must tab through navigation on every page load
- Violates WCAG 2.1 SC 2.4.1 (Bypass Blocks)
- Fails accessibility audits
- Poor experience for keyboard-only users

**Suggested Fix:**

```tsx
export default function Header() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/przychodnie", label: "Przychodnie" },
  ] as const;

  return (
    <header>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-background focus:text-foreground"
      >
        Przejdź do głównej treści
      </a>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg" aria-label="Nawigacja główna">
          {links.map(({ to, label }) => {
            return (
              <Link key={to} to={to}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
      <hr />
    </header>
  );
}
```

And update `__root.tsx` to add `id="main-content"` to the outlet container.

---

### 5. Production Data Hardcoded in Component

**File:** `apps/web/src/routes/przychodnie.tsx` (Lines 29-95)

**Description:**  
Mock clinic data is hardcoded directly in the component file. This is not production-ready and creates a maintenance burden. If this code reaches production with mock data, it will display fake business information to real users.

**Impact:**  
- **Critical:** Risk of shipping mock data to production
- Impossible to update clinic information without code deployment
- No way to add/remove/update clinics dynamically
- Violates separation of concerns
- Makes testing more difficult

**Suggested Fix:**  
1. Move mock data to separate file: `src/data/mockClinics.ts`
2. Create API endpoint in tRPC router
3. Add proper data fetching with loading/error states
4. Add environment check to prevent mock data in production:

```tsx
// src/data/mockClinics.ts
export const mockClinics: Clinic[] = [
  // ... data
];

// In component
function PrzychodnieComponent() {
  const { data: clinics } = trpc.clinics.getAll.useQuery();
  
  // Safety check in development
  if (import.meta.env.PROD && clinics === mockClinics) {
    throw new Error('Mock data detected in production!');
  }
  
  // ... rest
}
```

---

## Medium Severity

### 1. Missing Responsive Navigation Pattern

**File:** `apps/web/src/components/header.tsx`

**Description:**  
The navigation uses a horizontal flex layout with no mobile-responsive pattern (hamburger menu, etc.). As more navigation items are added, the header will overflow on small screens or wrap awkwardly.

**Suggested Improvement:**  
Implement a responsive navigation pattern:

```tsx
const [isMenuOpen, setIsMenuOpen] = useState(false);

return (
  <header>
    <div className="flex items-center justify-between px-2 py-1">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden"
        aria-expanded={isMenuOpen}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X /> : <Menu />}
      </button>
      
      <nav className={`
        ${isMenuOpen ? 'block' : 'hidden'} 
        md:flex gap-4 text-lg
      `}>
        {/* links */}
      </nav>
      
      <ModeToggle />
    </div>
  </header>
);
```

---

### 2. No Internationalization (i18n) Support

**File:** `apps/web/src/routes/przychodnie.tsx`

**Description:**  
All text strings are hardcoded in Polish with no internationalization framework. This makes it impossible to support multiple languages without significant refactoring. Even if the app is Poland-only, proper i18n structure is a best practice.

**Suggested Improvement:**  
Implement i18n using a library like `react-i18next` or `next-intl`:

```tsx
const t = useTranslations();

<h1 className="text-3xl font-bold mb-2">
  {t('clinics.title')}
</h1>
```

---

### 3. Component Lacks Performance Optimization

**File:** `apps/web/src/routes/przychodnie.tsx`

**Description:**  
The component and its child elements are not memoized. The clinic cards are re-rendered on every parent re-render, even though the data is static. While not critical with 5 items, this pattern doesn't scale.

**Suggested Improvement:**

```tsx
const ClinicCard = memo(({ clinic }: { clinic: Clinic }) => (
  <Card key={clinic.id}>
    {/* card content */}
  </Card>
));

function PrzychodnieComponent() {
  const clinics = useMemo(() => mockClinics, []);
  
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2">
        {clinics.map((clinic) => (
          <ClinicCard key={clinic.id} clinic={clinic} />
        ))}
      </div>
    </div>
  );
}
```

---

### 4. Missing SEO Metadata

**File:** `apps/web/src/routes/przychodnie.tsx`

**Description:**  
The route has no metadata (title, description, OpenGraph tags) defined. This hurts SEO and social media sharing. TanStack Router supports a `head` export for this purpose.

**Suggested Improvement:**

```tsx
export const Route = createFileRoute("/przychodnie")({
  component: PrzychodnieComponent,
  head: () => ({
    meta: [
      {
        title: "Nasze Przychodnie - Silver Bridge",
        content: "Znajdź najbliższą przychodnię. Lista naszych placówek z godzinami otwarcia i danymi kontaktowymi.",
      },
      {
        property: "og:title",
        content: "Nasze Przychodnie",
      },
      {
        property: "og:description",
        content: "Znajdź najbliższą przychodnię. Lista 5 placówek w całej Polsce.",
      },
    ],
  }),
});
```

---

### 5. Incomplete Data Model for Production

**File:** `apps/web/src/routes/przychodnie.tsx` (Lines 15-27)

**Description:**  
The `Clinic` interface lacks fields necessary for production use: no email, website, services offered, specializations, booking link, images, or ratings. The ID field exists but is never used for routing or linking.

**Suggested Improvement:**

```tsx
interface Clinic {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  hours: ClinicHours;
  phone: string;
  email?: string;
  website?: string;
  services?: string[];
  specializations?: string[];
  image?: string;
  rating?: number;
  bookingUrl?: string;
}
```

Consider adding detail view routes: `/przychodnie/:id`

---

### 6. Type Safety Issue with Links Array

**File:** `apps/web/src/components/header.tsx` (Line 9)

**Description:**  
The links array is marked with `as const`, which is good, but the type can still be mutated. Additionally, there's no validation that the `to` paths are valid routes.

**Suggested Improvement:**

```tsx
import type { FileRouteTypes } from '@/routeTree.gen';

const links: ReadonlyArray<{
  readonly to: FileRouteTypes['to'];
  readonly label: string;
}> = [
  { to: "/", label: "Home" },
  { to: "/przychodnie", label: "Przychodnie" },
] as const;
```

This ensures type safety with generated route types.

---

### 7. No Empty State Handling

**File:** `apps/web/src/routes/przychodnie.tsx`

**Description:**  
If the clinics array is empty (possible with real API data), the page shows a blank grid with just the header. No empty state message is displayed.

**Suggested Improvement:**

```tsx
{clinics.length === 0 ? (
  <div className="text-center py-12">
    <p className="text-muted-foreground">
      Brak dostępnych przychodni.
    </p>
  </div>
) : (
  <div className="grid gap-6 md:grid-cols-2">
    {/* clinic cards */}
  </div>
)}
```

---

## Low Severity

### 1. Redundant Grid Column Configuration

**File:** `apps/web/src/routes/przychodnie.tsx` (Line 107)

**Description:**  
The grid has `md:grid-cols-2 lg:grid-cols-2` which is redundant since both breakpoints use 2 columns.

**Suggested Improvement:**

```tsx
<div className="grid gap-6 md:grid-cols-2">
```

---

### 2. Magic Numbers in Styling

**File:** `apps/web/src/routes/przychodnie.tsx`

**Description:**  
Gap values (gap-6, gap-4, gap-3), padding values, and icon sizes are hardcoded throughout. While Tailwind encourages this, defining semantic spacing constants improves consistency.

**Suggested Improvement:**  
Extract to Tailwind config or CSS variables:

```tsx
// tailwind.config.js
theme: {
  extend: {
    spacing: {
      'card-gap': '1.5rem', // gap-6
      'content-gap': '1rem', // gap-4
    }
  }
}
```

---

### 3. Component Should Be Extracted

**File:** `apps/web/src/routes/przychodnie.tsx` (Lines 109-155)

**Description:**  
The clinic card rendering (47 lines) should be extracted into a separate component for better maintainability and reusability. This follows the Single Responsibility Principle.

**Suggested Improvement:**

```tsx
// components/ClinicCard.tsx
interface ClinicCardProps {
  clinic: Clinic;
}

export function ClinicCard({ clinic }: ClinicCardProps) {
  return (
    <Card>
      {/* card content */}
    </Card>
  );
}

// In przychodnie.tsx
<div className="grid gap-6 md:grid-cols-2">
  {mockClinics.map((clinic) => (
    <ClinicCard key={clinic.id} clinic={clinic} />
  ))}
</div>
```

---

### 4. Inconsistent Spacing in Hours Display

**File:** `apps/web/src/routes/przychodnie.tsx` (Lines 128-151)

**Description:**  
The hours display uses `flex justify-between gap-4` which creates inconsistent spacing depending on label length. "Poniedziałek - Piątek:" is much longer than "Sobota:" creating uneven alignment.

**Suggested Improvement:**

```tsx
<div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
  <span className="text-sm text-muted-foreground">
    Poniedziałek - Piątek:
  </span>
  <span className="text-sm font-medium text-right">
    {clinic.hours.weekdays}
  </span>
  {/* ... */}
</div>
```

---

### 5. Missing Alt Text Pattern for Icons

**File:** `apps/web/src/routes/przychodnie.tsx` (Lines 116, 126)

**Description:**  
Lucide icons (`MapPin`, `Clock`) are used without ARIA labels. While decorative icons don't need alt text, these provide semantic meaning and should be properly labeled.

**Suggested Improvement:**

```tsx
<MapPin 
  className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"
  aria-label="Lokalizacja"
/>

<Clock 
  className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"
  aria-label="Godziny otwarcia"
/>
```

Or add `aria-hidden="true"` if they are purely decorative (when paired with visible text).

---

### 6. Inconsistent String Formatting

**File:** `apps/web/src/routes/przychodnie.tsx` (Line 120)

**Description:**  
Postal code and city are concatenated with a space: `{clinic.postalCode} {clinic.city}`. This should use a consistent formatting function to handle null/undefined cases and internationalization.

**Suggested Improvement:**

```tsx
const formatAddress = (postalCode: string, city: string) => {
  return [postalCode, city].filter(Boolean).join(' ');
};

<p className="text-sm text-muted-foreground">
  {formatAddress(clinic.postalCode, clinic.city)}
</p>
```

---

### 7. No Hover States for Interactive Elements

**File:** `apps/web/src/routes/przychodnie.tsx`

**Description:**  
Clinic cards have no hover effects, making it unclear if they're clickable. While they're currently not interactive, the design suggests they should be (given the `Card` component is typically used for clickable items).

**Suggested Improvement:**

```tsx
<Card 
  key={clinic.id}
  className="transition-shadow hover:shadow-lg cursor-pointer"
  onClick={() => navigate({ to: `/przychodnie/${clinic.id}` })}
>
```

---

### 8. Missing Key Prop on Card Content Elements

**File:** `apps/web/src/routes/przychodnie.tsx` (Lines 128-151)

**Description:**  
The hours display div elements don't have keys, though they're not in an array. However, using a `map` function would be more maintainable:

**Suggested Improvement:**

```tsx
const hoursEntries = [
  { label: 'Poniedziałek - Piątek', value: clinic.hours.weekdays },
  { label: 'Sobota', value: clinic.hours.saturday },
  { label: 'Niedziela', value: clinic.hours.sunday },
];

<div className="space-y-1">
  {hoursEntries.map(({ label, value }) => (
    <div key={label} className="flex justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}:</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  ))}
</div>
```

---

## Additional Notes

### Positive Observations

1. **Good TypeScript Usage:** Proper interface definitions and type safety
2. **Modern Stack:** Leveraging TanStack Router, React 19, and modern patterns
3. **Component Library:** Good use of shadcn/ui components for consistency
4. **Semantic Icons:** Lucide React icons used appropriately
5. **Responsive Grid:** Basic responsive design implemented
6. **Consistent Styling:** Tailwind classes used consistently

### Testing Recommendations

1. **Accessibility Testing:** Run axe-core or Lighthouse accessibility audit
2. **Responsive Testing:** Test on mobile devices (320px - 768px widths)
3. **Keyboard Navigation:** Verify full keyboard accessibility
4. **Screen Reader Testing:** Test with NVDA/JAWS/VoiceOver
5. **Visual Regression:** Compare design mockups with implementation
6. **Load Testing:** Verify performance with larger datasets (100+ clinics)

### Security Considerations

1. **Phone Number Validation:** Implement validation if phones become user-editable
2. **XSS Prevention:** While React escapes by default, audit any user-generated content
3. **API Security:** When connecting to real API, implement proper auth/authorization

---

## Conclusion

The implementation demonstrates solid fundamentals but requires significant improvements before production deployment. The **High Severity** issues must be addressed immediately, particularly:

1. Accessibility violations (active links, skip navigation, semantic HTML)
2. Missing error/loading states
3. Mock data safety concerns

The **Medium Severity** issues should be prioritized for the next sprint to ensure scalability and maintainability.

**Recommendation:** Do not merge to production until High Severity issues are resolved. Consider implementing a feature flag for gradual rollout after Medium Severity issues are addressed.

---

## Priority Action Items

1. **Immediate (Pre-merge):**
   - Add active link styling with `aria-current`
   - Wrap phone numbers in `<a href="tel:">` links
   - Add semantic `<header>` and `<nav>` elements
   - Add skip-to-content link
   - Move mock data to separate file with production safety check

2. **Short-term (Next Sprint):**
   - Implement loading/error states with TanStack Query
   - Add responsive navigation pattern
   - Add SEO metadata
   - Implement empty state handling
   - Extract ClinicCard component

3. **Medium-term (Future Sprints):**
   - Connect to real API endpoint
   - Implement i18n framework
   - Add clinic detail pages with routing
   - Expand data model with additional fields
   - Add performance optimizations (memoization)
