# ImageKit Video Shop

A modern full-stack video sharing platform built with Next.js, featuring user authentication, video upload capabilities, and cloud storage integration with ImageKit.

## 🎯 Features

- **User Authentication** - Secure registration and login system with NextAuth.js
- **Video Upload & Management** - Upload videos and thumbnails with real-time progress tracking
- **Cloud Storage** - Integrated with ImageKit for optimized video delivery and transformation
- **Responsive Design** - Mobile-first UI built with Tailwind CSS and DaisyUI
- **Protected Routes** - Middleware-based route protection for authenticated users
- **Video Feed** - Responsive grid layout displaying all uploaded videos
- **Optimized Performance** - Server-side rendering and API route handlers

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling
- **NextAuth.js** - Authentication solution
- **bcryptjs** - Password hashing

### Cloud Services & Tools
- **ImageKit** - Media storage and transformation
- **Vercel** (deployment ready) - Hosting platform

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📦 Installation

1. **Clone the repository**
```bash
   git clone https://github.com/YOUR_USERNAME/imagekit-video-shop.git
   cd imagekit-video-shop
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
```env
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret

   # ImageKit
   NEXT_PUBLIC_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   NEXT_PUBLIC_URL_ENDPOINT=your_imagekit_url_endpoint
```

4. **Run the development server**
```bash
   npm run dev
```
