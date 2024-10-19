const express = require('express');
const mongoose = require('mongoose');
const ruleRoutes = require('./routes/ruleRoutes');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors=require('cors')
const app = express();
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000' }));
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database is connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });


  app.use('/api/rules', ruleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
