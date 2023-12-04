[![Facebook-Page][facebook-shield]][facebook-url]
[![Twitter][twitter-shield]][twitter-url]
[![Instagram][instagram-shield]][instagram-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<p align="center">
  <h2 align="center">next-ecommerce-admin</h2>
  <div align="center"><h3>Project Link: <a href="https://github.com/rsshonjoydas/next-ecommerce-admin">GitHub</a></h3></div>
</p>

### Full Stack E-Commerce + Dashboard & CMS: Next.js 13 App Router, React, Tailwind, Prisma, MongoDB

![Store](./docs/images/banner.png)

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Key Features](#key-features)
- [Prerequisites](#prerequisites)
- [Start the app](#start-the-app)
- [How to setup the initial project](#how-to-setup-the-initial-project)
- [Contact](#contact)

This is a repository for a Full Stack E-Commerce + Dashboard & CMS: Next.js 13 App Router, React, Tailwind, Prisma, MongoDB

For DEMO, use [Stripe Testing Cards](https://stripe.com/docs/testing)

#### MAKE SURE YOU HAVE [STORE](https://github.com/rsshonjoydas/next-ecommerce-store) SETUP SECONDLY!

### Key Features:

- We will be using Shadcn UI for the Admin!
- Our admin dashboard is going to serve as both CMS, Admin and API!
- You will be able to control multiple vendors / stores through this single CMS! (For example you can have a "Shoe store" and a "Laptop store" and a "Suit store", and our CMS will generate API routes for all of those individually!)
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
- MongoDB + Prisma + PlanetScale

<!-- HOW TO RUN -->

### Prerequisites

**Node version 18.x.x**
**Yarn version 1.22.x**

### Start the app

Certainly, if you're working on a Node.js project and you have a development script, such as `yarn dev`, that you typically use to run your application during development, you can include that step in your workflow as well. Here's the updated order of commands:

1. **Clone this repository**:

   ```sh
   git clone git@github.com:rsshonjoydas/next-ecommerce-store.git
   ```

2. **Environment Variables Setup**:
   To rename the `.env.example` file to `.env` and add your environment-specific configuration, you can use the following command in a Unix-like shell (such as Linux or macOS):

   ```bash
   mv .env.example .env
   ```

   This command renames the `.env.example` file to `.env`.

   After renaming the file, you can open the `.env` file using a text editor and add your environment-specific configuration variables and their values. For example:

   ```
   DATABASE_URL=your_database_url_here
   API_KEY=your_api_key_here
   SECRET_KEY=your_secret_key_here
   ```

   Replace `"your_database_url_here"`, `"your_api_key_here"`, and `"your_secret_key_here"` with your actual configuration values. The `.env` file is commonly used to store sensitive or environment-specific configuration variables for your application.

3. **Install packages**

   ```shell
   yarn install
   ```

4. **Prisma Setup**:

   - Generate Prisma Client Code:

     ```bash
     npx prisma generate
     ```

   - Push Database Changes:

     ```bash
     npx prisma db push
     ```

   - Launch Prisma Studio: `optional`

     ```bash
     npx prisma studio
     ```

     Your `Prisma` database is accessible locally at the following address: [http://localhost:5555](http://localhost:5555)

5. **Seed the Database**:

   ```bash
   node ./scripts/seed.ts
   ```

6. **Run Your Application in Development Mode**:

   ```bash
   yarn dev
   ```

   Your `project` is accessible locally at the following address: [http://localhost:3000](http://localhost:3000)

### How to setup the initial project

1.  **Install Next JS**

    ```sh
    yarn create next-app --typescript --tailwind --eslint
    ```

2.  **Engine Locking configuration `optional`**

    - Create `.npmrc` file and add below the code

      ```sh
      engine-strict=true
      ```

    - Create `.nvmrc` file and add below the code

      ```sh
      lts/fermium
      ```

    - Add this configuration to your project `package.json`

      ```json
      "engines": {
         "node": ">=18.0.0",
         "yarn": ">=1.22.0",
         "npm": "please-use-yarn"
       }
      ```

3.  **Visual Studio Settings configuration `optional`**

    - ##### Get VSCode [Settings.json](https://github.com/rsshonjoydas/docs/blob/main/docs/vscode.md) file

4.  **Airbnb style guide setup**

    - ##### Get [eslintrc.json](https://github.com/rsshonjoydas/docs/blob/main/docs/airbnb-style-guide.md) file

5.  **Git Hooks for Husky**

    - ##### [How to use husky](https://github.com/rsshonjoydas/docs/blob/main/docs/husky.md)

6.  **Shadcn Ui Setup**
    - Initialize Shadcn ui
      ```bash
      npx shadcn-ui@latest init
      ```
    - How to use [Shadcn ui](https://ui.shadcn.com/) `optional`
      ```bash
      npx shadcn-ui@latest add button
      ```
    - Overwrite existing ui components `optional`
      ```bash
      npx shadcn-ui@latest add button --overwrite
      ```

## Contact

Shonjoy Das - [rsshonjoy@gmail.com](mailto:rsshonjoy@gmail.com)

<!-- MARKDOWN LINKS & IMAGES -->

[facebook-shield]: https://img.shields.io/badge/-Facebook-black.svg?style=flat-square&logo=facebook&color=555&logoColor
[facebook-url]: https://facebook.com/rsshonjoydas
[twitter-shield]: https://img.shields.io/badge/-Facebook-black.svg?style=flat-square&logo=twitter&color=555&logoColor
[twitter-url]: https://twitter.com/rsshonjoydas
[instagram-shield]: https://img.shields.io/badge/-Instagram-black.svg?style=flat-square&logo=instagram&color=555&logoColor
[instagram-url]: https://instagram.com/rsshonjoydas
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB
[linkedin-url]: https://linkedin.com/in/rsshonjoydas
