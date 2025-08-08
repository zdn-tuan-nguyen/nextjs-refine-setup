# Admin Dashboard

A modern, full-featured admin dashboard built with Next.js, Refine, and Ant Design.

## 🚀 Features

- **Authentication**: Secure login with NextAuth.js
- **Modern UI**: Clean interface powered by Ant Design 5
- **Data Management**: CRUD operations with Refine framework
- **State Management**: Zustand for efficient state handling
- **Command Palette**: Quick navigation with Kbar
- **Type Safety**: Full TypeScript support
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Admin Framework**: Refine
- **UI Library**: Ant Design 5
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Language**: TypeScript
- **Styling**: Ant Design Components

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd admin-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
# Add your API endpoints and other environment variables
```

## 📁 Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable components
├── lib/             # Utilities and configurations
├── providers/       # Context providers
└── types/           # TypeScript type definitions
```
