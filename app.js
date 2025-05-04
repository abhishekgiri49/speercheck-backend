const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const engineerRoutes = require('./routes/engineerRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const bookedSlotRoutes = require('./routes/bookedSlotRoutes');

const cors = require('cors');

const app = express();
app.use(cors())
// Middleware
app.use(bodyParser.json());

// Routes

// Add this with other route uses
app.use('/api/slots', bookedSlotRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/engineers', engineerRoutes);

// Database connection and server start
sequelize.sync()
  .then(() => {
    
    console.log('Database connected');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;