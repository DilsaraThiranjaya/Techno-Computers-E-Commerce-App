import express, { Express } from "express";
import productRouter from "./routes/product.route";
import contactRouter from "./routes/contact.route";
import cors from "cors";
import authRouters from "./routes/auth.routes";
import {authenticateToken} from "./middleware/auth.middleware";
import path from "path";

let app: Express = express();

app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
];

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Common Routers
app.use("/api/auth",authRouters);
app.use("/api/contacts", contactRouter);

// Admin Routers
// app.use("/api/customers", customerRouter);
app.use("/api/products", authenticateToken, productRouter);
// app.use('/api/categories', categoryRouter);
// app.use('/api/orders', orderRouter);

// Customer Routers
// app.use("/api/store", storeRouter);
// app.use('/api/cart', cartRouter);
// app.use('/api/my_orders',);

// Profile Routers
// app.use('/api/customer', customerRouter);
// app.use('/api/admin', adminRouter);

export default app;