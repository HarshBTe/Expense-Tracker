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




app.use(cors({
  origin: 'https://expense-tracker-frontend-v70j.onrender.com', // Allow the frontend origin
  credentials: true,               // Allow credentials
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