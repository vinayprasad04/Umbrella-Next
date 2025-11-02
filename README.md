# IncomeGrow - Financial Planning Platform

IncomeGrow is a comprehensive financial planning and investment platform built with Next.js. It empowers users with the best tools, research, and knowledge to achieve their financial goals through intelligent planning, investing, and wealth management.

## 🚀 Features

### Core Functionality
- **Dashboard**: Centralized access to all financial tools and services
- **Recipe (Goal Planning)**: Create and manage financial goals with intelligent recommendations
- **Wealth Creation**: Comprehensive financial planning with asset allocation
- **User Management**: Complete authentication system with profile and settings

### Authentication & Security
- **Firebase Authentication**: Google Sign-in integration
- **Secure Login/Signup**: Email/password authentication with validation
- **Protected Routes**: Authentication guards for dashboard and user pages
- **User Profile Management**: Editable user profiles with account overview

### User Experience
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dynamic Navigation**: Context-aware header with user dropdown
- **Breadcrumb Navigation**: Clear navigation paths for dashboard pages
- **Loading States**: Smooth transitions with loading indicators

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth with Google OAuth
- **State Management**: React Hooks with localStorage
- **Icons**: Custom SVG icons and Heroicons
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Main navigation with dropdowns
│   └── Footer.tsx          # Footer with menu sections
├── pages/
│   ├── index.tsx           # Homepage with hero section
│   ├── login.tsx           # Login with Firebase Google Auth
│   ├── signup.tsx          # User registration
│   ├── forgot-password.tsx # Password reset
│   ├── dashboard.tsx       # Main dashboard
│   ├── profile.tsx         # User profile management
│   ├── settings.tsx        # Account settings
│   ├── privacy-policy.tsx  # Privacy policy page
│   ├── terms-of-service.tsx # Terms of service page
│   └── recipe/
│       ├── index.tsx       # Goals overview
│       └── wealth-creation.tsx # Wealth planning form
└── lib/
    └── firebase.ts         # Firebase configuration
```

## 🔥 Getting Started

### Prerequisites
- Node.js 16+ 
- npm/yarn/pnpm
- Firebase project with Google Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd umbrella/frontend/next-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure Firebase**
   - Copy `.env.example` to `.env.local`
   - Add your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   # ... other Firebase config
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Key Pages

### Public Pages
- **Homepage** (`/`): Hero section, features overview, testimonials
- **Login** (`/login`): Firebase Google Auth + email/password
- **Sign Up** (`/signup`): User registration with validation
- **Privacy Policy** (`/privacy-policy`): Data protection information
- **Terms of Service** (`/terms-of-service`): Usage agreement

### Protected Pages (Requires Authentication)
- **Dashboard** (`/dashboard`): Main hub with financial product cards
- **Recipe** (`/recipe`): Goal planning and management
- **Wealth Creation** (`/recipe/wealth-creation`): Detailed financial planning
- **Profile** (`/profile`): User account management
- **Settings** (`/settings`): Account preferences and security

## 🔐 Authentication Flow

1. **Unauthenticated users**: Redirected to login page when accessing protected routes
2. **Authenticated users**: Cannot access login/signup pages (redirected to dashboard)
3. **Google Authentication**: One-click sign-in with Firebase
4. **Session Management**: localStorage-based auth state with automatic cleanup

## 🎨 Design System

- **Primary Color**: `#FF6B2C` (Orange)
- **Typography**: System fonts with bold headings
- **Layout**: Max width 1600px with responsive grid system
- **Components**: Consistent button styles, form inputs, and card layouts
- **Responsive**: Mobile-first approach with Tailwind breakpoints

## 📱 Responsive Features

- **Mobile Navigation**: Hamburger menu for mobile devices
- **Flexible Layouts**: Grid systems that adapt to screen size
- **Touch-Friendly**: Appropriate button sizes and spacing
- **Performance**: Optimized images with Next.js Image component

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy** with automatic builds on git push

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:


## 📄 License

This project is proprietary software. All rights reserved.

---

Built with ❤️ by the IncomeGrow Financial Team