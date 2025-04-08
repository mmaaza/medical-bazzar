const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error.middleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/users.routes'));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MAX_PORT_ATTEMPTS = 10;

const startServer = (port) => {
    try {
        const server = app.listen(port, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
        });

        server.on('error', (e) => {
            if (e.code === 'EADDRINUSE') {
                console.log(`Port ${port} is busy, trying port ${port + 1}...`);
                if (port - PORT < MAX_PORT_ATTEMPTS) {
                    startServer(port + 1);
                } else {
                    console.error('Could not find an available port. Please free up some ports or specify a different port in .env');
                    process.exit(1);
                }
            } else {
                console.error('Server error:', e);
                process.exit(1);
            }
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer(PORT);