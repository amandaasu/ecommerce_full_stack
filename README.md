# Live URL - [Click here](https://ecommercefrontend-amandaasu-arpitas-projects-7f37dd14.vercel.app)

## Project: Single-Page Ordering Website

### Objective:

Develop a single-page ordering website where users can:

- List items on the UI using data from data.json, including an "Image Src", "Title", "Variant
  SKU", and "Variant Price".
- Implement a search bar where users can search by "Variant SKU" or "Title".
- Allow users to add items to the cart.
- Display the cart with selected items.
- Provide an option to remove items from the cart.

### Tech Stack:

- Frontend: Next.js
- Backend: Node.js (Express)
- Database: MongoDB (NoSQL)
- Testing (Bonus): Jest
- Hosting: Deploy on Vercel, Netlify, or AWS

# Setup Guide

## Prerequisites

1. **GitHub Repository Access:**

   - Ensure the repository is public or you have the Personal Access Token (PAT) ready.
   - GitHub Repository Access:
     - Ensure you have a GitHub account.
     - Fork the repository:
     - Go to the original repository: https://github.com/amandaasu/ecommerce_full_stack
     - Click Fork to create a copy under your GitHub account.

2. **Render Account:**

   - [Sign up or log in to Render](https://dashboard.render.com/register).
   - Use Gmail for single sign or create a user
   - Skip suggestions (only on first login)

3. **MongoDB Atlas Account:**

   - [Sign up for MongoDB Atlas](https://www.mongodb.com/atlas/register).
   - Use Gmail for single sign or create a user
   - Skip personalization (only on first login)

4. **Vercel Account:**

   - [Sign up or log in to Vercel](https://vercel.com/).

5. **Node.js and npm Installed:**

   - Verify by running:

     ```bash
     node -v
     npm -v
     ```

---

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas).

2. **Create a New Cluster:**

   - Click **Build a Cluster or Deploy your cluster**.
   - Choose the **Free Shared Cluster**.
   - Choose the **AWS Provider**.
   - Choose the **us-east-1** region.
   - Name cluster `ecommerce`.
   - Start **Deployment**.
   - Select **Connect from anywhere if prompted, include current IP**.

3. **Connect to ecommerce:**

   - Select **Connect from anywhere if prompted, include current IP**.
   - Click **Add New Database User**.
   - Assign a username and password. (Store them securely).

4. **Double Check - Create a User:**

   - Go to **Database Access**.
   - Click **Add New Database User**.
   - Assign a username and password. (Store them securely).

5. **Double Check - Set Network Access:**

   - Go to **Network Access**.
   - Click **Add IP Address**.
   - Select **Allow Access from Anywhere**.

6. **Obtain the Connection String:**

   - Go to **Clusters > Connect >Drivers> Node version 6.7 or above > Connect your application**.
   - Copy the connection string and replace `<username>` and `<password>` with the user credentials.
   - You will get connection string like this

   ```
   mongodb+srv://<db_user>:<db_password>@ecommerce.effnayb.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce
   ```

   - Add `/ecommerce` in the url
   - **Example**

   ```
   mongodb+srv://admin:password@ecommerce-cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

---

## Step 2: Deploy Backend on Render

1. **Go to the Render Dashboard:**

   - [Render Dashboard](https://dashboard.render.com/).

2. **Create a New Web Service:**

   - Click **Add New > Web Service**.
   - Click on `Public GIT Repository`
   - Connect to the GitHub repository. Add [this](https://github.com/amandaasu/ecommerce_full_stack) url.

3. **Configure Backend Service - A New Webservice:**

   - Name: ecommerce_backend
   - Environment: Node
   - Branch: main
   - Region: Oregon
   - Root directory: backend
   - Build Command: `npm install -f`
   - Start Command: `node seed.js && node index.js`
   - Instance Type: Free

4. **Environment Variables:**
   Go to environment tab under the proect and update the variables

   - MONGO_URI: `<MongoDB Atlas connection string>`
   - NODE_ENV: `prod`

5. **Deploy the Web Service:**

   - Click **Deploy**.
   - Copy the backend URL (e.g., `https://ecommerce-backend.xxxx.onrender.com/dev`).

---

## Step 3: Deploy Frontend on Vercel

1. **Open up terminal and Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Navigate to the Frontend Directory:**

   ```bash
   cd frontend
   ```

3. **Log in to Vercel:**

- Login to vercel from browser - [Login](https://vercel.com/login) or [Signup](https://vercel.com/signup)
- Open up terminal to initiate login
  ```bash
  vercel login
  ```
- Link Vercel

```
vercel link
```

- Follow the prompts - Setup Project: Yes - Scope: Select {Owner}'s projects. - Link to existing project? Select No. - Project name: Enter frontend. - Directory of code location: Enter ./ (or simply press Enter to accept the default) - Modify settings? Select No.

5. **Deploy to Vercel:**

- Use the backend URL from Render as the value.

```
echo -e "https://ecommerce-backend-xxxx.onrender.com" | vercel env add NEXT_API_BASE_URL production
echo -e "dev" | vercel env add NEXT_ENV production
```

```bash
vercel --prod

```

### 🚀 Live url will be available in the console

## This link will be private, to make it public [follow the link](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links)

## Summary:

- MongoDB Atlas hosts the database.
- Render deploys the backend.
- Vercel hosts the frontend and communicates with the backend using NEXT_API_BASE_URL.
- Check environment variables in Render and Vercel if data is not being fetched correctly.

## Backend (Render) Environment Variables:

- MONGO_URI
  - Connection string for MongoDB Atlas.
  - Example: mongodb+srv://admin:password@ecommerce-cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
- NODE_ENV
  - Environment mode for the backend.
  - Example: dev

## Frontend (Vercel) Environment Variables:

- NEXT_API_BASE_URL
  - Backend URL deployed on Render.
  - Example: https://ecommerce-backend-xxxx.onrender.com
- NODE_ENV (same as backend)
  - Environment mode for the backend.
  - Example: dev
