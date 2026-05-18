# ISKCON Mangalore - Sri Krishna Balaram Mandir

A premium, full-stack temple website platform for ISKCON Mangalore featuring dynamic seva donations, festival pages, Razorpay payment integration, and a divine Krishna-themed UI.

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Framer Motion
- React Router DOM v7
- Zustand (state management)
- TanStack Query (data fetching)
- React Hook Form + Zod (forms & validation)
- Lucide React (icons)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Razorpay payment gateway
- Express Validator
- Helmet, CORS, Rate Limiting

## Project Structure

```
iskconmangalore/
├── client/                    # React frontend
│   ├── src/
│   │   ├── assets/           # Static assets & placeholders
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/           # Base components (Button, Card, Input...)
│   │   │   ├── krishna/      # Krishna-themed components
│   │   │   ├── donations/    # Donation flow components
│   │   │   ├── festivals/    # Festival components
│   │   │   ├── gallery/      # Gallery components
│   │   │   ├── layout/       # Navbar, Footer, HeroBanner
│   │   │   └── placeholders/ # PlaceholderImage, PlaceholderVideo
│   │   ├── pages/            # Route page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API service layer
│   │   ├── store/            # Zustand stores
│   │   ├── constants/        # Static data & placeholders
│   │   ├── types/            # TypeScript interfaces
│   │   ├── utils/            # Utility functions
│   │   └── layouts/          # Layout wrappers
│   └── index.html
├── server/                    # Express backend
│   └── src/
│       ├── config/           # DB, Razorpay, env config
│       ├── models/           # Mongoose schemas
│       ├── controllers/      # Route handlers
│       ├── routes/           # Express routes
│       ├── services/         # Business logic
│       ├── middleware/       # Error handling, rate limiting
│       ├── validators/       # Input validation
│       └── utils/            # Helpers
└── vercel.json               # Vercel deployment config
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Razorpay account (test mode)

### Frontend Setup

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

### Backend Setup

```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and Razorpay credentials
npm install
npm run seed    # Seed sample data
npm run dev
```

The backend runs at `http://localhost:5000`.

### Environment Variables

**Client (`client/.env`):**
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL (default: `http://localhost:5000/api`) |
| `VITE_RAZORPAY_KEY_ID` | Razorpay key ID (public) |

**Server (`server/.env`):**
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `RAZORPAY_KEY_ID` | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret |
| `CLIENT_URL` | Frontend URL for CORS |
| `NODE_ENV` | Environment (development/production) |

## Features

### Dynamic Donation System
- Campaign-based donation pages (`/donate/:slug`)
- Razorpay payment integration with signature verification
- Suggested amounts (₹108, ₹501, ₹1,008, ₹5,008, ₹10,808)
- Custom amount support
- Donation receipts with 80G details
- MongoDB persistence

### Festival Pages
- Janmashtami, Gaura Purnima, Ratha Yatra, Govardhan Puja, Kartik Maas, Narsimha Chaturdashi
- Countdown timers, event schedules, galleries
- Linked donation campaigns

### Temple Features
- Daily darshan timings
- Live darshan (YouTube embed ready)
- Photo gallery with masonry layout
- Spiritual resources (books, lectures, bhajans)
- Contact & volunteer forms

## Deployment

### Frontend on Vercel

1. Push to GitHub
2. Import project in Vercel
3. Set root directory to `client` (or use the `vercel.json` at root)
4. Add environment variables in Vercel dashboard
5. Deploy

### Backend on Render / Railway

1. Create a new Web Service
2. Set root directory to `server`
3. Build command: `npm run build`
4. Start command: `npm run start`
5. Add environment variables
6. Update `vercel.json` rewrites with your backend URL

## Replacing Placeholder Media

All placeholder images are centralized in `client/src/constants/placeholders.ts`. To replace:

1. Upload your images to Cloudinary (or your CDN)
2. Update the URLs in `placeholders.ts`
3. Each `PlaceholderImage` component gracefully handles loading and errors

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/campaigns` | List all campaigns |
| GET | `/api/campaigns/:slug` | Get campaign by slug |
| POST | `/api/donations/create-order` | Create Razorpay order |
| POST | `/api/donations/verify-payment` | Verify & record payment |
| GET | `/api/donations/receipt/:id` | Get donation receipt |
| GET | `/api/festivals` | List all festivals |
| GET | `/api/festivals/featured` | Get featured festivals |
| POST | `/api/contact/contact` | Submit contact form |
| POST | `/api/contact/volunteer` | Submit volunteer application |

## License

This project is for ISKCON Mangalore temple use.
