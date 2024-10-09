This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Clone the repository to your local machine:

```bash
git clone https://github.com/Isuu1/asset-insights-technical-test.git .
```

Install packages:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## App structure

```bash
.
├── app
    ├── validations
        ├── form.ts //Zod form validation file
    ├── layout.tsx //Main layout
    ├── home.tsx //Home page
├── server
    ├── schemas //Database schema
    ├── index.js //Main backend file
    ├── routes.js //All Endpoints

```

## Reflections

This is first time when I used MongoDB and I think initial set up i much easier than Posgres which I used before.

Initial idea was to use NextJS server actions to send a form to add new user but I could not make it working with client side form validation.
