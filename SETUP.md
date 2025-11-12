# Co-Working Space Booking Platform - Setup Guide

A modern, full-featured co-working space booking platform built with Next.js, Supabase, and Razorpay.

## Features

- **Public Website**: Browse locations and spaces with search/filter
- **Email OTP Authentication**: Secure sign-in with Supabase Auth
- **Booking System**: Hour-by-hour space booking with calendar
- **Payment Integration**: Razorpay payment gateway integration
- **Admin Dashboard**: Complete CRUD for locations, spaces, and bookings
- **Real-time Updates**: Live booking status and availability
- **Responsive Design**: Mobile-first, modern UI with TailwindCSS

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 2. Supabase Setup

The database schema has been automatically created with the following tables:
- `profiles` - User profiles with role management
- `locations` - Co-working locations
- `spaces` - Individual workspace spaces
- `bookings` - Booking records
- `payments` - Payment transaction history

### 3. Razorpay Configuration

The Edge Functions for Razorpay have been deployed. Configure your Razorpay secrets in Supabase:

1. Go to Supabase Dashboard → Edge Functions → Secrets
2. Add the following secrets:
   - `RAZORPAY_KEY_ID` - Your Razorpay Key ID
   - `RAZORPAY_KEY_SECRET` - Your Razorpay Key Secret

### 4. Create Admin User

After signing in for the first time, update your profile role to admin:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

### 5. Install Dependencies & Run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see your application!

## Application Structure

### Public Routes
- `/` - Homepage with featured spaces
- `/spaces` - Browse all spaces with filters
- `/spaces/[id]` - Space detail and booking page
- `/auth/signin` - Email OTP authentication

### Protected Routes
- `/bookings` - View user's bookings
- `/profile` - User profile management

### Admin Routes (requires admin/manager role)
- `/admin` - Dashboard with stats
- `/admin/locations` - Manage locations
- `/admin/spaces` - Manage spaces
- `/admin/bookings` - View all bookings
- `/admin/payments` - Payment history

## Key Features

### Booking Flow
1. User signs in with email OTP
2. Selects location and space
3. Chooses date and time
4. Reviews booking summary
5. Completes payment via Razorpay
6. Receives confirmation

### Admin Features
- **Locations Management**: Add/edit/delete locations
- **Spaces Management**: Create different space types (hotdesk, meeting room, private office)
- **Bookings Overview**: View and manage all bookings
- **Revenue Tracking**: Monitor total revenue and occupancy

### Security
- Row Level Security (RLS) enabled on all tables
- Role-based access control for admin routes
- Secure payment verification with Razorpay signatures
- Environment-based configuration

## Payment Integration

The platform uses Razorpay for payment processing with two Edge Functions:

1. **razorpay-create-order**: Creates a Razorpay order for booking
2. **razorpay-verify-payment**: Verifies payment signature and updates booking status

## Tech Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: TailwindCSS, shadcn/ui components
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth (Email OTP)
- **Payments**: Razorpay
- **Serverless**: Supabase Edge Functions
- **Deployment**: Vercel (Frontend) + Supabase (Backend)

## Adding Sample Data

To test the application, add some sample locations and spaces through the admin dashboard:

1. Sign in and set your role to admin
2. Go to `/admin/locations`
3. Add locations (e.g., "Downtown Office - Mumbai")
4. Go to `/admin/spaces`
5. Add spaces (e.g., "Hot Desk 1", "Meeting Room A")

## Support

For issues or questions:
- Check Supabase logs for backend errors
- Review browser console for frontend issues
- Verify environment variables are set correctly
- Ensure Razorpay secrets are configured in Supabase

## License

MIT License - feel free to use this project for your own co-working space business!