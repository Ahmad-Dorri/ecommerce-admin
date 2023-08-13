# Full Stack PERSIAN E-Commerce + Dashboard & CMS: Next.js 13 App Router, React, Tailwind, Prisma, MySQL, 2023

For DEMO, use [Stripe Testing Cards](https://stripe.com/docs/testing)

This is a repository for a Full Stack <strong>PERSIAN</strong> E-Commerce + Dashboard & CMS: Next.js 13 App Router, React, Tailwind, Prisma, MySQL

Key Features:

- We will be using <a href='https://www.bing.com/ck/a?!&&p=42a34e6cf0fc1fa0JmltdHM9MTY5MTc5ODQwMCZpZ3VpZD0zZGQzMjg3ZC03Mjk1LTZhMWQtMWYzZC0zYWQ0NzM0NzZiZmYmaW5zaWQ9NTE0MQ&ptn=3&hsh=3&fclid=3dd3287d-7295-6a1d-1f3d-3ad473476bff&psq=shadcn&u=a1aHR0cHM6Ly91aS5zaGFkY24uY29tLw&ntb=1' >shadcn-ui</a> for the Admin!
  <img/>
- Our admin dashboard is going to serve as both CMS, Admin and API!

- You will be able to control mulitple vendors / stores through this single CMS! (For example you can have a "Shoe store" and a "Laptop store" and a "Suit store", and our CMS will generate API routes for all of those individually!)
- You will be able to create, update and delete categories!
- You will be able to create, update and delete products!
- You will be able to upload multiple images for products, and change them whenever you want!
- You will be able to create, update and delete filters such as "Color" and "Size", and then match them in the "Product" creation form.
- You will be able to create, update and delete "Billboards" which are these big texts on top of the page. You will be able to attach them to a single category, or use them standalone (Our Admin generates API for all of those cases!)
- You will be able to Search through all categories, products, sizes, colors, billboards with included pagination!
- You will be able to control which products are "featured" so they show on the homepage!
- You will be able to see your orders, sales, etc.
- You will be able to see graphs of your revenue etc.
- You will learn Clerk Authentication!
- Order creation
- Stripe checkout
- Stripe webhooks
- MySQL + Prisma + PlanetScale

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/Ahmad-Dorri/ecommerce-admin.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
NEXTAUTH_SECRET=
GITHUB_ID=
GITHUB_SECRET=



# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=''
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
STRIPE_API_KEY=
FRONTEND_STORE_URL=http://localhost:3001
STRIPE_WEBHOOK_SECRET=
```

### Connect to PlanetScale and Push Prisma

```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |

## Technologies Used

The project utilizes the following technologies:

- Next.js 13 App Router
- React
- Shadcn UI + Tailwind CSS
- Prisma
- MySQL
- NEXT AUTH Authentication
- Stripe
- Typescript
- ZOD
- AXIOS
- ZUSTAND

For a complete list of dependencies, you can refer to the `package.json` file.

## Contributing

Contributions to the project are welcome! If you want to contribute, please follow the guidelines outlined in the [CONTRIBUTING.md](#insert_link_to_contributing_file) file.

## License

The project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the codebase as per the terms of the license.

## Documentation

For detailed documentation and usage guidelines, please refer to the [project wiki](#insert_link_to_wiki).

---
