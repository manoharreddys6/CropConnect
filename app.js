// app.js

import express from 'express';
import bodyParser from 'body-parser';
import registerRoutes from './routes/register.js';
import loginRoutes from './routes/login.js';
import indexRoutes from './routes/index.js';
import homeRoutes from './routes/home.js';
import rssRoutes from './routes/rss.js';
import ecommerceRoutes from './routes/ecommerce.js';
import displayQueriesRoutes from './routes/displayQueries.js'; // Import displayQueries routes
import { connectDB } from './config/db.js';
import http from 'http';
import { initializeSocket } from './controllers/rssController.js';
import farmerRoutes from './routes/farmerRoutes.js';

const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); // Serve static files from 'public' directory

// Use your ES module routes
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/', indexRoutes);
app.use('/home', homeRoutes);
app.use('/rss', rssRoutes);
app.use('/ecommerce', ecommerceRoutes);
app.use('/displayQueries', displayQueriesRoutes); // Use displayQueries routes
app.use('/farmers', farmerRoutes);

server.listen(port, async () => {
    try {
        await connectDB();
        console.log(`Database connected successfully`);
        console.log(`Server started on http://localhost:${port}`);
    } catch (error) {
        console.error('Database connection error:', error);
    }
});

initializeSocket(server);
