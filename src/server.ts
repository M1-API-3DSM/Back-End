import app from './app';
import { databaseConfig } from './config/database';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

mongoose.connect(databaseConfig.uri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
