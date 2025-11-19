# **Hey-Gov Mini CRM**

A lightweight CRM for managing contacts efficiently. The app supports both **demo mode** (public, no auth) and **authenticated mode** (private, user-owned data), with AI-assisted contact creation and manual entry.

## **Project Structure**

* **`client/`** – Frontend built with React, Vite, and Tailwind CSS.
* **`server/`** – Backend built with Node.js, Express, MongoDB, and JWT authentication.

---

## **Features**

* Add contacts manually or using AI-assisted input.
* View, edit, and manage contacts and activities.
* Demo mode: explore public data without authentication.
* Auth mode: full CRM features with user-specific data.
* Mobile-friendly, responsive design with modern UI.

---

## **Setup & Installation**

### **Prerequisites**

* Node.js >= 18
* MongoDB (Atlas or local instance)
* Git

### **1. Clone the Repository**

```bash
git clone https://github.com/Asin-Junior-Honore/heygov-mini-crm-task.git
cd hey-gov-mini-crm
```

### **2. Backend Setup**

```bash
cd server
npm install
```

* Create a `.env` file:

```
PORT=4000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

* Start the server locally:

```bash
npm start
```

The backend will run at `http://localhost:4000`.

### **3. Frontend Setup**

```bash
cd ../client
npm install
npm run dev
```

* The frontend will run at `http://localhost:5173` (default Vite port).

---

## **Deployment**

Both frontend and backend are deployed on **Vercel**:

* **Client URL:** `https://heygov-mini-crm-task-client.vercel.app/`
* **API URL:** `https://heygov-mini-crm-task-server.vercel.app/`

---

## **Usage**

* Navigate to the app URL.
* Choose **Demo Mode** to explore public data.
* Choose **Auth Mode** to log in and manage your own data.
* Add contacts via AI or manually, edit them, and view activities.

---

## **Sample AI Prompts**

Here are a few examples of prompts you can pass to the AI to assist you in adding or updating contacts:

```text
Had a call with Sarah, remind me to follow up tomorrow.
```

```text
I met David Paul during a meeting about onboarding.
```

```text
Add a note that Alex prefers WhatsApp communication.
```

```text
Please save the email john@company.com and note that he asked for a product demo.
```

---


## **Technologies Used**

* **Frontend:** React, Vite, Tailwind CSS, React Icons
* **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
* **Deployment:** Vercel

---

