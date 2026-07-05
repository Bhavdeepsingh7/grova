# Backend API for Consultation Form

This repository contains a production-ready Express backend for receiving consultation form submissions and sending notification emails.

## Features

- ES Modules
- Request validation with Joi
- Centralized error handling
- Production logging with pino
- CORS allowlist support
- Rate limiting
- Helmet security headers
- Compression
- Health checks
- Graceful shutdown
- Simple SMTP email delivery using Nodemailer

## Environment Variables

Copy `.env.example` to `.env` and set the following values:

- `NODE_ENV`
- `PORT`
- `CORS_ALLOWLIST`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_SECURE`
- `EMAIL_USER`
- `EMAIL_PASS`
- `EMAIL_FROM`
- `EMAIL_TO`

## Scripts

- `npm run dev` - start development server with nodemon
- `npm start` - start production server

## Deployment on Render

1. Set `NODE_ENV=production`.
2. Set `PORT=10000` or leave default `5000`.
3. Add your allowed front-end origins to `CORS_ALLOWLIST`.
4. Configure email provider credentials.
5. Set the build command to `npm install`.
6. Set the start command to `npm start`.

## Endpoints

- `GET /` - application status
- `GET /health` - health check
- `POST /api/consultation` - submit consultation form

## Request example

```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "555-123-4567",
  "company": "Acme Co",
  "service": "Website Design",
  "budget": "$3k-$5k",
  "timeline": "Within 1 month",
  "message": "I need a new website for our product launch."
}
```
