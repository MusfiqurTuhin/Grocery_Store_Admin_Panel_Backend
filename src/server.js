import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import mainRoutes from './main.routes';
import userRoutes from './user.routes';
import rateLimit from "express-rate-limit";
import compression from "compression";

const app = express();
const port = 4000;

const rateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 100, // Limit each IP to 100 requests per `window` (here, per minute)
})

app.use(compression())


app.use(rateLimiter);

// Parse incoming JSON requests and add it in `req.body`
app.use(express.json());

app.use(helmet());
app.use(cors());

app.use('/v1', mainRoutes);
app.use('/v1/user', userRoutes);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
