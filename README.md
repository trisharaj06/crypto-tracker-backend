# **Crypto Tracker Backend Service**

This project is a backend service that tracks and analyzes cryptocurrency prices using **Node.js**, **Express.js**, and **MongoDB**. It includes a periodic background job to fetch the latest cryptocurrency data and APIs to retrieve and analyze stored records.

---

## **Features**
- Fetches real-time cryptocurrency data every 2 hours and stores it in MongoDB.
- Provides APIs to retrieve cryptocurrency statistics and calculate price deviations.
- Demonstrates robust integration of MongoDB for efficient data management.

---

## **Technologies Used**
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**

---

# **Endpoints**

## **1. Get Cryptocurrency Stats**
### **Endpoint:** `/stats/:coin`
- **Method:** `GET`
- **Description:** Retrieves the latest statistics for the specified cryptocurrency, including:
  - Current price
  - Market capitalization
  - 24-hour price change
- **Path Parameter:**
  - `coin`: The cryptocurrency name (e.g., `bitcoin`, `ethereum`, `matic-network`).
- **Example Request:**
  ```http
  GET /stats/bitcoin
-  **Example Response:**
  ```bash
  {
  "success": true,
  "data": {
    "price": 99569,
    "marketCap": 1972658186011,
    "price24hChange": 2424.62
  }
}
```
## **2. Calculate Price Deviation**
### **Endpoint:** `/deviation/:coin`
- **Method:** `GET`
- **Description:** Calculates and returns the **standard deviation** of the price of the specified cryptocurrency for the last 100 records stored in the database.

### **Path Parameter:**
- `coin` (string): The name of the cryptocurrency (e.g., `bitcoin`, `ethereum`, `matic-network`).

### **Example Request:**
```http
GET /deviation/bitcoin
```
-  **Example Response:**
  ```bash
  {
  "standardDeviation": "204.72",
  "totalRecords": 5
}
```

