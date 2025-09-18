# Socialsect Website

A modern, responsive website for Socialsect digital marketing agency built with React and Vite.

## Features

-  Modern React 18 with Vite
-  Fully responsive design
-  Beautiful UI with custom CSS
-  Contact form with email integration
-  SEO optimized
-  Analytics ready
-  Vercel deployment ready

## Environment Variables

For the contact form to work, you need to set up the following environment variables in your Vercel dashboard:

### Required Environment Variables

1. **RESEND_API_KEY** - Your Resend API key for sending emails
   - Get it from [resend.com](https://resend.com)
   - Example: `re_1234567890abcdef`

2. **CONTACT_EMAIL** - Email address to receive contact form submissions
   - Example: `your-email@example.com`

3. **FROM_EMAIL** - Email address to send from (must be verified in Resend)
   - Example: `noreply@yourdomain.com`

### Setting up Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following variables:
   - `RESEND_API_KEY` = your_resend_api_key_here
   - `CONTACT_EMAIL` = rayanshofficial@gmail.com
   - `FROM_EMAIL` = onboarding@resend.dev

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The project is configured for Vercel deployment with:
- Static file serving
- API route handling
- Environment variable support
- Proper MIME type handling

## API Routes

- `/api/send-email` - Handles contact form submissions

## Tech Stack

- React 18
- Vite
- React Router
- Lucide React (icons)
- Resend (email service)
- Custom CSS

## License

Private - Socialsect
                                                            
