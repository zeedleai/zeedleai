# ZeedleAI Dashboard - Futuristic Backend Command Center

## 🚀 Overview

Welcome to **ZeedleAI** - a next-generation backend command center with an extraordinary cyber-futuristic design featuring neon pink/blue aesthetics, animated particle backgrounds, and real-time monitoring capabilities.

## 🎨 Design Features

### Visual Theme
- **Neon Pink/Blue Cyber Theme** with glowing effects
- **Animated Particle Background** with interconnected nodes
- **Scanline CRT Effect** for authentic cyber aesthetic
- **Cyber Grid Pattern** overlay
- **Glitch Text Effects** on headers
- **Pulsing Glow Animations** on interactive elements
- **Custom Orbitron & Rajdhani Fonts** for tech styling

### Key Components
- ✨ Particle background animation system
- 🎯 Real-time WebSocket simulation
- 📊 Interactive charts with Recharts
- 🤖 AI Agent management cards
- 📈 Performance analytics dashboard
- 👥 User management panel
- 🔀 Git integration simulator
- ⚙️ Settings and configuration

## 🔐 Demo Credentials

### Sign In Portal
Access the dashboard at `/signin` with:

```
Email: admin@zeedleai.com
Password: demo123
```

**Note:** Authentication uses JWT tokens stored in localStorage for the demo.

## 📁 Project Structure

```
src/
├── app/
│   ├── signin/page.tsx          # Demo sign-in page
│   ├── dashboard/
│   │   ├── page.tsx             # Main dashboard overview
│   │   ├── agents/page.tsx      # AI agents management
│   │   ├── analytics/page.tsx   # Analytics hub
│   │   ├── users/page.tsx       # User management
│   │   ├── git/page.tsx         # Git integration
│   │   └── settings/page.tsx    # Settings panel
│   ├── api/
│   │   ├── auth/signin/route.ts # Authentication endpoint
│   │   ├── users/route.ts       # User data API
│   │   └── git/
│   │       ├── commits/route.ts # Git commits API
│   │       └── pull-requests/route.ts
│   └── globals.css              # Cyber theme styles
├── components/
│   ├── ParticleBackground.tsx   # Animated particles
│   ├── DashboardSidebar.tsx     # Neon sidebar navigation
│   ├── DashboardHeader.tsx      # Header with search
│   ├── StatCard.tsx             # Metric cards
│   ├── AnalyticsChart.tsx       # Performance charts
│   ├── ActivityFeed.tsx         # Live activity feed
│   └── AIAgentCard.tsx          # AI agent status cards
└── lib/
    └── auth.ts                  # JWT authentication logic
```

## 🎯 Main Features

### 1. Sign-In Portal (`/signin`)
- Futuristic login form with neon glow effects
- Particle animation background
- Mock JWT authentication
- Responsive cyber-styled UI
- Demo credentials display

### 2. Dashboard Overview (`/dashboard`)
- Real-time statistics with 4 key metrics
- Performance analytics charts
- Live activity feed
- 6+ AI agent status cards
- System health monitoring
- Recent deployments tracker

### 3. AI Agents Management (`/dashboard/agents`)
- 9 pre-configured AI agents
- Real-time status monitoring (Active, Processing, Idle)
- Efficiency tracking and task completion stats
- Search and filter functionality
- Agent deployment interface

### 4. Analytics Hub (`/dashboard/analytics`)
- Performance trend line charts
- Task distribution pie chart
- Weekly activity bar charts
- Real-time system metrics (CPU, Memory, Network, Disk)
- Performance summary dashboard

### 5. User Management (`/dashboard/users`)
- 8 mock users with different roles
- Subscription tier tracking (Premium, Pro, Free)
- API call statistics
- Status monitoring (Active/Inactive)
- Search functionality

### 6. Git Integration (`/dashboard/git`)
- Recent commits viewer
- Pull request management
- Branch overview
- Sync functionality
- Status tracking (Success, Pending, Failed)

### 7. Settings Panel (`/dashboard/settings`)
- Profile settings
- Notification preferences
- Security and password management
- Appearance toggles
- API key management

## 🎨 Color Palette

```css
Neon Pink:   #ff2d95
Neon Blue:   #00f0ff
Neon Purple: #b026ff
Cyber Dark:  #0a0e27
Background:  #050814
```

## 🛠️ Technology Stack

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS v4 with custom cyber theme
- **UI Components:** Shadcn/UI
- **Charts:** Recharts
- **Animations:** GSAP & CSS animations
- **Authentication:** JWT (jsonwebtoken)
- **Icons:** Lucide React
- **Fonts:** Orbitron (cyber), Rajdhani (tech)

## 🚀 Getting Started

1. **Start the development server:**
   ```bash
   npm run dev
   # or
   bun dev
   ```

2. **Navigate to the homepage:**
   ```
   http://localhost:3000
   ```

3. **Access the sign-in page:**
   ```
   http://localhost:3000/signin
   ```

4. **Sign in with demo credentials:**
   ```
   Email: admin@zeedleai.com
   Password: demo123
   ```

## 📱 Page Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with features showcase |
| `/signin` | Demo authentication portal |
| `/dashboard` | Main command center dashboard |
| `/dashboard/agents` | AI agents management |
| `/dashboard/analytics` | Performance analytics |
| `/dashboard/users` | User management panel |
| `/dashboard/git` | Git integration simulator |
| `/dashboard/settings` | Configuration settings |

## 🎭 Mock Data & APIs

### Authentication API (`/api/auth/signin`)
- Validates demo credentials
- Returns JWT token
- User profile data

### Users API (`/api/users`)
- 8 mock users with various roles
- Subscription and status data
- API usage statistics

### Git Commits API (`/api/git/commits`)
- 8 recent commits
- Branch information
- Status indicators

### Git Pull Requests API (`/api/git/pull-requests`)
- 6 pull requests
- Open, merged, and closed states
- Commit counts and metadata

## 🎨 Custom CSS Classes

```css
.neon-text-pink      /* Pink neon glow text */
.neon-text-blue      /* Blue neon glow text */
.neon-border-pink    /* Pink neon border with glow */
.neon-border-blue    /* Blue neon border with glow */
.glow-pulse-pink     /* Pulsing pink glow animation */
.glow-pulse-blue     /* Pulsing blue glow animation */
.cyber-grid          /* Grid background pattern */
.scanline            /* CRT scanline effect */
.glitch              /* Glitch text effect */
.font-cyber          /* Orbitron font */
.font-tech           /* Rajdhani font */
```

## 🔒 Security Notes

**IMPORTANT:** This is a demo application with mock authentication. Do not use in production without implementing proper security measures:

- Replace JWT secret with secure environment variable
- Implement proper password hashing
- Add CSRF protection
- Use secure session management
- Implement rate limiting
- Add input validation and sanitization

## 📊 Dashboard Metrics

The dashboard displays various real-time metrics:

- **Active AI Agents:** 24 agents currently running
- **Code Generated:** 1.2K lines of code
- **Bugs Fixed:** 342 issues resolved
- **Deployments:** 89 successful deployments
- **System Uptime:** 99.8%
- **Average Efficiency:** 93.2%

## 🎮 Interactive Features

1. **Live Activity Feed** - Simulated real-time updates
2. **Agent Status Cards** - Interactive hover effects
3. **Analytics Charts** - Animated data visualizations
4. **Search Functionality** - Filter agents and users
5. **Git Sync** - Simulated repository synchronization
6. **Settings Toggles** - Customizable preferences

## 🌟 Design Highlights

- **Consistent Neon Aesthetic** throughout all pages
- **Smooth Transitions** between states
- **Responsive Grid Layouts** for all screen sizes
- **Loading States** with cyber-styled spinners
- **Hover Effects** on interactive elements
- **Animated Backgrounds** for visual depth
- **Custom Scrollbars** matching the theme

## 📝 Notes

- All data is mock/simulated for demonstration
- JWT tokens are stored in localStorage (not production-ready)
- WebSocket updates are simulated with mock data
- Charts display static data sets for demo purposes
- API calls are handled by Next.js Route Handlers

## 🎯 Future Enhancements (Demo Ideas)

- Real WebSocket integration
- Database connection for persistent data
- OAuth authentication providers
- Real-time collaboration features
- Advanced filtering and sorting
- Export functionality for reports
- Dark/light theme toggle
- Mobile-optimized views

---

**Powered by ZeedleAI Technology** 🚀

*Experience the future of backend management today!*
