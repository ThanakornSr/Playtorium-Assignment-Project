
# Playtorium Assignment Project

This project is a discount calculator. It calculates the final price of a cart after applying various types of discount campaigns, following business rules and order of application.

🔧 Features

- Apply Coupon discounts (fixed or percentage)
- Apply On Top discounts:
  - Percentage discount by item category
  - Customer points (1 point = 1 THB, capped at 20% of total)
- Apply Seasonal discounts (e.g., subtract 100 THB for every 1000 THB)
- Supports multiple discount types, applied in strict order: Coupon ➝ On Top ➝ Seasonal
- Supports item quantity (amount)
- Clean separation of logic (Coupon, OnTop, Seasonal modules)


Built with:
- 🖥️ React + TypeScript (Frontend)
- 🔙 Express + TypeScript (Backend)


🚀 How It Works

- User enters cart items, selects discount types, and parameters
- Discounts are applied in order, respecting the rules
- Each step uses the discounted result of the previous one
- Final price is returned with breakdown: before vs after

## Authors

- [Thanakorn Sriwannawit](https://github.com/ThanakornSr)


## Contacts

-  tananon203345@gmail.com
-  Tel: 0961080542


## Installation

To install this project, run

> Frontend
```bash
cd client
npm i
npm run start
```

> Backend
```bash
cd server
npm i
npm run dev
```

