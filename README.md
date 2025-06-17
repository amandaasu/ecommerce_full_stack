## Table of Contents

- [Project Statement](#project-statement)
- [Solution Overview](#solution-overview)
- [UX](#UX-and-Branding)
- [Backend Strategy and Architecture](#backend-strategy-and-architecture)
- [Frontend Strategy and Architecture](#frontend-strategy-and-architecture)
- [How to install](#setup-guide)

# Project Statement: Single-Page Ordering Website

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
- Hosting: Vercel

# Solution Overview

The E-commerce Full-Stack project is a comprehensive web application designed to simulate a fully functional online store. The architecture is divided into two main segments: the backend (Node.js, Express, MongoDB) and the frontend (React, Next.js). The project leverages MongoDB Atlas for data storage, Render for backend deployment, and Vercel for frontend deployment.

# UX and Branding

<img src="./UX.png" alt="UX" style="width:100%;"/>

# Backend Strategy and Architecture

- Architecture Overview
- Framework: Node.js with Express.js for server-side logic.
- Database: MongoDB Atlas for data persistence.
- API Structure: RESTful API endpoints for inventory management
- Websocket: For Chat connections
- Data Handling: JSON data format for all API communications.

## Handling Missing SKU and Title in E-commerce Systems

In e-commerce systems, product data integrity is crucial. Here’s how companies logically handle cases where SKU and/or Title are missing:

### 1. Missing SKU and Title:

**Scenario:** Both SKU and Title are missing. This is a critical issue since both fields are essential for identifying and displaying products.

**Action:**

- **Log the Data:** Flag these entries in a log file for further review.
- **Skip Insertion:** Do not insert these records into the database to avoid data inconsistencies.
- **Notify Data Source:** Notify the data provider or content team to correct the data.

### 2. Missing SKU Only:

**Scenario:** SKU is missing, but Title is present. SKU is vital for tracking and managing inventory.

**Action:**

- **Generate Temporary SKU:** Create a temporary SKU using a combination of Title and a unique identifier (e.g., timestamp or UUID).
- **Log the Issue:** Record the use of a temporary SKU for future data cleanup.

### 3. Missing Title Only:

**Scenario:** Title is missing, but SKU is present. The title is crucial for display purposes.

**Action:**

- **Fallback to SKU as Title:** Temporarily use empty string as the title.
- **Flag for Review:** Log this case for the content team to update.

### 4. Industry Practices:

- **Data Validation Pipelines:** Automated pipelines to flag inconsistencies before ingestion.
- **Data Quality Dashboards:** Monitor missing or duplicate SKUs, titles, or images.
- **Data Standardization:** Enforce strict data entry rules for essential fields like SKU, Title, and Price.

---

## Optimization Process in MongoDB

### 1. Indexing Strategy:

- Implement indexes to optimize search and sort operations.
- **Why Indexes?** Without indexes, MongoDB performs a full collection scan. Indexes reduce time complexity from O(n) to O(log n).

### 2. Compound Index:

- Index created on SKU, Title, and Image Source.
- This structure optimizes for multiple search criteria in a single query hence bringing down time complexity.

### 3. Query Optimization:

- Optimized query to leverage the index.

### 4. Handling Data Quality:

- In data seeding, handle missing or duplicate SKUs and titles:

```javascript
if (!sku) {
  sku = `${title ? title.substring(0, 5).toUpperCase() : "TEMP"}-${uuidv4().slice(0, 8)}`;
}

if (!title) {
  title = sku;
}
```

### 6. Sorting Strategy:

- Sorting by SKU, title, and image presence:
- Ensures that fully populated entries are prioritized.

### 7. Why Indexes Improve Performance:

- Reduce collection scans and access data directly.
- Lower disk I/O, improving read performance.
- Efficient memory usage by focusing only on relevant documents.

## RestAPI and Websocket

- **REST API**: Optimized for product management, CRUD operations, data validation, and caching.

- **WebSockets**: Implemented for chat functionality to enable real-time, persistent connections and event-driven data exchanges.

## Code Reusability

- Implemented a single filtering function to handle multiple query parameters (SKU, type, price, etc.).
- Reduces redundant logic and minimizes the number of entry points.
- Promotes reusability by dynamically constructing query objects based on provided parameters.
- Filtering logic is centralized, ensuring consistency across product search, category filtering, and chat.
- Chat, despite being a separate WebSocket, internally utilizes the unified filtering function for data processing.

## API Endpoints and Use Cases

### Products API : RestAPI

**Description:** Retrieve a list of products based on query parameters.

**Query Parameters:**

- `search` - Filter by SKU or Title (e.g., `search=DB123`)
- `type` - Filter by product type (e.g., `type=T-shirts`)
- `price` - Filter by price range (e.g., `price=<30`)
- `page` - Pagination control

**Example Request:**

```
GET /fetchItems?search=DB123&type=T-shirts&price=<30&page=1
```

**Use Cases:**

- User searches for specific terms from variantSKU or title.
- Filter products by type and price range.
- Display paginated product listings if page is sent else give back all data.

### Chat API - Websocket

**Description:** Process user queries related to products using various intents (SKU, Type, Title, Price).

**Request Body:**

```json
{
  "query": "Show T-shirts under $20"
}
```

**Response:**

```json
{
  "message": "Here are T-shirts under $20:",
  "items": [
    {
      "variantSKU": "TS001",
      "title": "Classic T-Shirt",
      "variantPrice": 18.99
    }
  ]
}
```

**Use Cases:**

- User queries for products by type and price.
- User queries for SKU and price combination.
- Fallback response for invalid queries.

---

### Optimization Strategies:

- Indexes on `variantSKU`, `type`, and `variantPrice` to improve query performance.
- Compound index for SKU, type, and price for multi-attribute searches.
- Dynamic query construction to handle varying intents and query structures.
- Error handling for missing SKU, title, and price in both seeding and query operations.
- Log tracking for analytics and error reporting.

# Frontend Strategy and Architecture

Frontend Documentation - E-commerce Full-Stack Project

The frontend application is built using React.js and Next.js, designed to provide a seamless user experience for e-commerce functionalities, including product search, filtering, and chat interactions. The application is deployed on Vercel, ensuring optimal performance and scalability.

## Key Strategies and Architecture

### Store Management

- State Management: The application utilizes Zustand for state management, allowing for a lightweight and intuitive store structure.
- Why Zustand?
  - Minimal boilerplate compared to Redux.
  - Simplifies global state management across components.
  - Directly integrates with async functions (e.g., fetching data, managing cart state).

### Router-Enabled App

- Next.js Router: The application leverages Next.js dynamic routing for cleaner and more efficient navigation.
- Dynamic Routes:
  - /: Displays the hero page
  - /shop?[searcparams]: Displays a list of products with filtering capabilities.
  - /cart: Displays cart items with add, update, and delete functionalities.
- Query Parameters:
  - Filters like search, type, and price are managed via query parameters for seamless navigation and data persistence.
  - Example: /shop?search=TS01&type=T-shirts&price=<30

### Loading States and Error Handling

- Global Loading State: A centralized loading state is implemented in the store to handle asynchronous data fetching.
- Loading Indicators:
  Product listings, cart updates, and chat queries are wrapped in loading states to provide visual feedback.
  - Users are notified of ongoing operations, such as product fetch or cart updates.
- Error Handling:
  - Error states are captured and displayed using conditional rendering.
  - Chat queries are validated, and the user is notified of invalid queries.
  - Product listings show fallback content when data is missing or when the server is unreachable.

### Handling Products with Missing Images

- Default Image Strategy:
  - Products without images are assigned a default placeholder image to maintain visual consistency.
  - The default image is centrally located in /public/assets/logo.svg.
- Dynamic Fallbacks:
  - When the imageSrc is empty or invalid, the fallback image is applied dynamically.
  - This approach ensures that product cards maintain a consistent layout even with missing data.

### Chat Interface and Intent Recognition

- WebSocket Integration:
  - The chat interface is implemented using WebSocket for real-time communication.
  - User queries are parsed to determine the intent (e.g., SKU-based search, price filtering).
  - Query Parsing and Error Handling:
  - The chat interface parses queries into structured objects using pre-defined intents.
  - If the query is invalid or incomplete, the user is notified with relevant feedback.

### Reusability and Modular Design

- Component Reusability: This approach eliminated redundant query logic and promoted code consistency across pages and chat.

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
