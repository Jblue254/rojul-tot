# RojulTot

### *We Listen. Plan. Build.*

---

## About RojulTot

**RojulTot** is a modern Construction Company Management System built with React, Vite, and Tailwind CSS. The application provides a seamless platform where customers can hire construction machinery, purchase architectural drawings, browse completed projects in the gallary, and manage their accounts. It also includes a powerful administrative dashboard that enables administrators to manage equipment hires, architectural drawing sales, users, and project portfolios.

---

# Our Motto

## *We Listen. Plan. Build.*

Every successful construction project starts with understanding our clients' vision. At **RojulTot**, we listen carefully, develop strategic plans, and build quality solutions that exceed expectations.

---

#  Mission

To provide reliable construction services, machinery hire, and architectural solutions by combining innovation, professionalism, and customer-focused service.

---

# Problem Statement

Many construction companies still rely on manual methods to manage machinery rentals, architectural plan sales, customer requests, and project portfolios. These traditional approaches often result in:

- Poor record management
- Delayed communication
- Loss of customer information
- Difficulty tracking machinery availability
- Inefficient handling of hire requests
- Limited online visibility

RojulTot was developed to solve these challenges by providing a centralized digital platform for managing construction services efficiently.

##  Live Demo

 **Visit RojulTot:** 

Explore the application, browse construction equipment, purchase architectural drawings, and experience the user interface without installing anything locally.

https://rojul-tot.vercel.app/

---


# Objectives

## Main Objective

To develop a web-based Construction Company Management System that improves machinery hire management, architectural drawing sales, customer engagement, and administrative operations.

## Specific Objectives

- To provide an online platform for hiring construction machinery.
- To provide a marketplace for architectural drawings.
- To showcase completed construction projects through a gallery.
- To allow customers to submit and track requests online.
- To enable administrators to manage all business activities from a centralized dashboard.
- To generate business insights through real-time statistics and reporting.

---


#  Key Features

## Public Website Features

- Responsive landing page
- Hero section
- About page
- Products page
- Machinery catalog
- Architectural drawings catalog
- Completed projects gallery
- Testimonials section
- Contact page
- Responsive navigation

---

## User Features

- User Registration
- Secure Authentication
- Machinery Hiring
- Architectural Drawing Purchase Requests
- User Dashboard
- Wishlist Functionality
- Request Tracking
- Real-Time Notifications
- Profile Management
- Logout Functionality

---

## Admin Features

- Secure Admin Dashboard
- User Management
- Machinery Management
- Architectural Drawing Management
- Hire Request Management
- Plan Request Management
- Real-Time Statistics
- Revenue Monitoring
- Customer Activity Tracking
- Gallery Management

---
#  Pages

## Public Pages

* Home
* About
* Products
* Gallery
* Contact
* Login
* Register

---

## User Dashboard

* Dashboard
* User Profile
* My Orders
* Wishlist

---

## Admin Dashboard

* Dashboard
* Manage Hires
* Manage Drawings
* Manage Users

---

### Features

- Real-time updates using Firestore `onSnapshot()`
- Notification counter badge
- Recent request notifications
- Instant status updates

---

# Machine Hire

Customers can browse and hire various construction machinery including:

* Excavators
* Bulldozers
* Cranes
* Concrete Mixers
* Dump Trucks
* Rollers
* Scafolds
* Forklifts

Each machine includes:

* Name
* Image
* Description
* Rental price
* Hire duration
* Availability status

---

# Architectural Drawings

Customers can browse and purchase professional architectural plans including:

* Residential Houses
* Apartments
* Commercial Buildings
* Modern Villas

Each drawing includes:

* Preview image
* Description
* Category
* Price

---

# Project Gallery

The gallery showcases completed construction projects including:

* Residential Construction
* Commercial Construction
* Road Construction
* Renovation Projects
* Interior Design

---


# Customer Testimonials

The homepage features testimonials from satisfied clients, highlighting the quality, professionalism, and reliability of RojulTot's services.

---

# Authentication

The application implements role-based authentication.

### Client

Clients can:

* Browse products
* Hire machinery
* Purchase architectural drawings
* View order history

---

### Administrator

Administrators can:

* View dashboard statistics
* Manage hire requests
* Manage architectural drawings
* Manage registered users
* Approve hire requests
* Reject hire requests
*  Manage machinery
*  View system statistics
*  Monitor business performance

---

#  Tech Stack

| **Technology** |
|----------------|
| Firebase |
| React |
| Vite |
| Tailwind CSS |
| React Router DOM |
| APIs |
| JavaScript (ES6+) |
| Local Storage |
| Lucide React |
| shadcn/ui |

---

#  Project Structure

```text
ROJUL-TOT/
├── public/
│   ├── data/
│   │   ├── products.json
│   └── images/
│       ├── gallery/
│       ├── machines/
│       ├── drawings/
│       └── logo.png
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── MachineCard.jsx
│   │   ├── DrawingCard.jsx
│   │   ├── GalleryCard.jsx
│   │   ├── TestimonialCard.jsx
│   │   ├── BookingCard.jsx
│   │   ├── SearchBar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Gallery.jsx
│   │   ├── Products.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   │
│   │   ├── Dashboard/
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   └── Wishlist.jsx
│   │   │
│   │   └── Admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── ManageHires.jsx
│   │       ├── ManageDrawings.jsx
│   │       └── ManageUsers.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---


# Getting Started

## Clone the Repository

```bash
git clone https://github.com/Jblue254/rojul-tot
```

## Navigate to the Project

```bash
cd rojultot
```

## Install Dependencies

```bash
npm install
```

## Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

---

#  Screenshots

You can add screenshots here after completing the project.

### Home Page

<img width="959" height="449" alt="image" src="https://github.com/user-attachments/assets/fac2e53f-fbd0-4366-9e34-295d8c55cf1e" />

### Products

<img width="956" height="414" alt="image" src="https://github.com/user-attachments/assets/30f4d6fc-5d0c-4607-ae7f-3daf5ea6d6dd" />

### Gallery

<img width="947" height="389" alt="image" src="https://github.com/user-attachments/assets/52164b46-28c5-4a18-8b16-40b001d57998" />

---

#  Future Improvements

* M-Pesa Integration
* Online Card Payments
* PDF Invoice Generation
* Email Notifications
* Machine Maintenance live Tracking
* Customer Reviews & Ratings
* Live Chat Support


---

#  How to Contribute.

Contributions are always welcome! If you'd like to improve *RojulTot*, please follow these steps:

1. Fork the repository.
2. Clone your fork to your local machine.
3. Create a new feature or bug-fix branch.
4. Make your changes and test them thoroughly.
5. Commit your changes with a clear and descriptive commit message.
6. Push your branch to your GitHub repository.
7. Open a Pull Request describing the changes you've made.
8. I'll do the rest.Thank you

Please ensure your code follows the project's coding standards and does not introduce any breaking changes.

---

#  License

This project is licensed under the **MIT License**.

---

#  Author

**Japheth Kiprono**

GitHub: https://github.com/Jblue254



### **RojulTot**

### **We Listen. Plan. Build.**
