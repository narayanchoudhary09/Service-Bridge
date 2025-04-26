  import mongoose from 'mongoose';
  import dotenv from 'dotenv';
  dotenv.config();

  const { MONGODB_URL } = process.env;

  export const connect = async () => {
    try {
      const c = await mongoose.connect(MONGODB_URL);
      console.log(`MongoDB Connected ${c.connection.host}`);
      await mongoose.connection.db.collection('jobs').createIndex({ location: '2dsphere' });
      console.log('Index creation on jobs collection successful');
    } catch (err) {
      console.error('MongoDB Connection Error:', err);
      process.exit(1);
    }
  };
