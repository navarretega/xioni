import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;
const app = express();

// Home
app.get("/", (req, res) => {
  res.send("OK");
});

// Products
app.use("/api/products", productRoutes);

// 404 Responses and Error Handlers
app.use(notFound);
app.use(errorHandler);

// Start
app.listen(PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`));
