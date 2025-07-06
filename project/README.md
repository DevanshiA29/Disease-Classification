# 🔗 SnapLink – Smarter Links. Sharper Insights.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](#license)
[![Built with MERN](https://img.shields.io/badge/built%20with-MERN-brightgreen)](#tech-stack)
[![State Managed by Redux](https://img.shields.io/badge/state-Redux-blueviolet)](#features)

> **SnapLink** is a full-stack URL shortener that goes beyond shortening. It offers a powerful, real-time dashboard where users can manage, track, and analyze their links—with features like custom aliases, QR codes, click analytics, and expiration control.

---

## 🚀 Live Demo

🔗 [Try SnapLink](#)  
🎥 [Watch Demo Video](#)

---

## ✨ Features

- 🔗 **Shorten long URLs instantly**
- 🧾 **Custom slugs** (e.g., `snap.link/dev-resume`)
- 📊 **Real-time click analytics** (location, time, device)
- ⏰ **Link expiration & scheduling**
- 📱 **QR code generation**
- 🔒 **Public/private toggle & JWT auth**
- 📥 **Downloadable CSV reports**
- 🧠 **Redux-managed dashboard** with filters & search

---

## 🛠️ Tech Stack

| Layer      | Tools                             |
|------------|-----------------------------------|
| Frontend   | React, Tailwind CSS, Redux Toolkit |
| Backend    | Node.js, Express.js                |
| Database   | MongoDB (Mongoose)                 |
| Auth       | Firebase / JWT                     |
| Analytics  | MongoDB Logs or Redis (optional)   |
| QR Codes   | `qrcode.react`                     |
| Charts     | Chart.js / Recharts                |
| Hosting    |  Vercel / Render                   |

---


---

## 📸 Screenshots

| Dashboard | QR Generator | Analytics |
|-----------|--------------|-----------|
| ![Dashboard](./screenshots/dashboard.png) | ![QR](./screenshots/qr.png) | ![Analytics](./screenshots/analytics.png) |

---

## 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/snaplink.git
cd snaplink

# Install frontend
cd client
npm install
npm run dev

# Install backend
cd ../server
npm install
npm run start

✨ Future Enhancements
🌍 Multi-language support

📨 Email alerts for link milestones

📁 Campaign grouping for marketers

🙌 Contributors
Devanshi Awasthi – Full-Stack Developer & Designer

