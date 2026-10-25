# Deal Meal — Food Surplus Marketplace 🥗

> **"Good Food Deserves a Second Chance."**  
> A complete, modern, responsive frontend-only food surplus marketplace connecting **Businesses**, **Consumers**, and **Charities** across Pune, India to eliminate food waste.

---

## 🌟 Key Highlights & Design Direction

- **Forest Green & Fresh Lime Theme**: Built with a sustainability-focused startup aesthetic featuring warm off-white canvas (`#faf9f5`), crisp cards, and rounded typography (Plus Jakarta Sans).
- **100% Frontend-Only Prototype**: Powered by React, Vite, Tailwind CSS, Lucide React, Recharts, and reactive `localStorage` persistence. No backend, database, or API keys required.
- **Three Integrated Stakeholder Experiences**:
  1. **Consumers**: Discover affordable surplus meals at 50–70% off, reserve with instant pickup codes, mark completed pickups, cancel eligible reservations, and rate experiences.
  2. **Businesses**: List unsold batches in 30 seconds with photo preview, update inventory, edit/delete portions, toggle availability, track weekly recovered revenue, and view customer pickup codes.
  3. **Charities / NGOs**: Claim food donations for free (₹0 fee), receive dedicated charity pickup codes (e.g. `CHARITY-9031`), and track distributed community meals.
- **Evaluator-Friendly Demo System**: Persistent top banner with 1-click role switcher between Consumer, Business, and Charity, plus an instant **"Reset Demo Data"** button to restore sample Pune data anytime.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 2. Installation
Open your terminal in the project directory and install the packages:
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
**`http://localhost:5173`**

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
npm run preview
```

---

## 🧭 Project Navigation & Pages

| Route | Page | Description |
|---|---|---|
| `/` | **Landing Page** | Hero section, real-time metrics, 3-way How It Works, featured surplus listings, sustainability impact facts, testimonials, and footer. |
| `/login` | **Authentication Demo** | 1-click evaluator login buttons for Consumer, Business, and Charity dashboards with demo credential fallbacks. |
| `/signup` | **Role Registration** | Dynamic role selector (Consumer / Business / Charity) with custom form fields per role and immediate dashboard routing. |
| `/explore` | **Marketplace** | Full food discovery engine with real-time text search, Pune locality filter, category selector, price slider, expiry window filter, sort options, and grid/list view toggle. |
| `/food/:id` | **Food Details** | High-res imagery, business verification badge, ratings, dietary tags, pickup window, portion stepper, in-store instructions, and reservation modal. |
| `/consumer/dashboard` | **Consumer Dashboard** | Welcome banner, active reservations, total money saved, meals rescued, CO₂ diverted, recommended surplus, and recent orders. |
| `/consumer/bookings` | **Consumer Orders** | Status tabs (*All*, *Ready for Pickup*, *Completed*, *Cancelled*), counter pickup codes, **Mark as Picked Up** action, **Cancel Reservation** (restores inventory), and **Write a Review** modal. |
| `/business/dashboard` | **Business Dashboard** | Weekly surplus rescue trend & revenue chart (Recharts), pending counter pickups, shift-end listing shortcuts, and recent reservations table. |
| `/business/listings` | **Manage Food Listings** | Complete listing CRUD: Add new listing with local image preview/url, edit listing, delete with confirmation, and pause/activate visibility toggle. |
| `/charity/dashboard` | **Charity Portal** | Available free food metrics, active claim codes, community portions served, and quick donation claim shortcuts. |
| `/charity/available-food`| **Browse Free Donations** | Filter and claim wholesome surplus batches for **₹0** with instant verification codes. |
| `/charity/claims` | **NGO Claims & Handover** | Active claim tickets, counter pickup codes, and **Mark as Food Received** action. |

---

## 📂 Project Architecture

```
Deal Meal/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── DemoModeBanner.jsx      # Sticky 1-click evaluator role switcher & reset
│   │   │   ├── Navbar.jsx              # Responsive navigation with role-aware links & mobile drawer
│   │   │   ├── Footer.jsx              # Sustainability & academic prototype footer
│   │   │   ├── StatusBadge.jsx         # Status badges (active, ready_for_pickup, completed, etc.)
│   │   │   ├── VerifiedBadge.jsx       # Verified partner demonstration badge
│   │   │   ├── PriceDisplay.jsx        # INR (₹) formatting, strikethrough & discount tags
│   │   │   ├── NotificationPanel.jsx   # Interactive popover with unread counter & links
│   │   │   ├── ConfirmationModal.jsx   # Reusable confirmation dialog for delete/cancel
│   │   │   ├── ReviewModal.jsx         # 1-5 star rating and comment feedback modal
│   │   │   └── EmptyState.jsx          # Friendly empty state renderer
│   │   ├── dashboard/
│   │   │   ├── DashboardLayout.jsx     # Dashboard layout wrapper with sidebar
│   │   │   ├── DashboardSidebar.jsx    # Role-tailored sidebar menu & profile snippet
│   │   │   ├── DashboardHeader.jsx     # Top title, quick CTAs & notification bell
│   │   │   └── StatCard.jsx            # Metric summary card with icons and trends
│   │   └── food/
│   │       ├── FoodCard.jsx            # Dual-mode (grid & list) surplus food card
│   │       ├── FilterSidebar.jsx       # Category, Pune location, price slider, & expiry filters
│   │       └── ReserveModal.jsx        # Quantity stepper, cost breakdown, and code generator
│   ├── context/
│   │   └── AppContext.jsx              # Reactive state engine synced to LocalStorage
│   ├── data/
│   │   └── initialData.js              # Pre-seeded Pune listings, users, bookings & reviews
│   ├── pages/
│   │   ├── LandingPage.jsx             # Public home with interactive preview
│   │   ├── LoginPage.jsx               # 1-click demo login & evaluator shortcuts
│   │   ├── SignupPage.jsx              # Role-tailored onboarding
│   │   ├── ExplorePage.jsx             # Search, filter, and sort marketplace
│   │   ├── FoodDetailsPage.jsx         # Full portion details & counter pickup info
│   │   ├── consumer/
│   │   │   ├── ConsumerDashboard.jsx   # Savings & active pickup overview
│   │   │   └── ConsumerBookings.jsx    # Pickup code tickets & review system
│   │   ├── business/
│   │   │   ├── BusinessDashboard.jsx   # Revenue analytics & reservation verification
│   │   │   └── BusinessListings.jsx    # Complete listing management & image preview
│   │   └── charity/
│   │       ├── CharityDashboard.jsx    # Community meals & donation metrics
│   │       ├── CharityAvailableFood.jsx# Free food claiming engine (₹0)
│   │       └── CharityClaims.jsx       # Claim verification & handover tracking
│   ├── utils/
│   │   └── formatters.js               # INR currency, discount %, & unique code generator
│   ├── App.jsx                         # Main router & global toast notification system
│   ├── index.css                       # Tailwind CSS directives & custom styling
│   └── main.jsx                        # React root entry
├── index.html                          # HTML5 shell with Google Font Plus Jakarta Sans
├── package.json                        # Dependencies and scripts
├── tailwind.config.js                  # Forest green and lime brand color palette
└── vite.config.js                      # Vite bundler configuration
```

---

## 💡 Frontend-Only Demonstration Notes

- **Browser Storage Persistence**: All updates (creating a listing, reserving portions, cancelling orders, marking pickups, or leaving ratings) persist in your browser's `LocalStorage`.
- **Zero Real External Calls**: No real bank payments, external SMS/emails, or backend servers are used.
- **Data Reset**: Click **"Reset Demo Data"** in the top banner at any point to restore the original Pune sample listings.
