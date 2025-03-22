const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());


// console.info(process.env.FRONTEND_URL);
const ALLOWED_LIST = ['http://localhost:3001', 'http://localhost:3000', "https://expense-tracker-frontend-v70j.onrender.com"];
app.use(cors({
  origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || ALLOWED_LIST.includes(origin)) {
          callback(null, true);
      } else {
          console.log(`Request from origin ${origin} blocked by CORS`);
          // Continue processing the request without setting headers
          callback(null, false);
      }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type',
}));

app.options('*', cors()); 




app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);




// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Expense Management API');
  });


  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  );