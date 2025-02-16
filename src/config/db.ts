import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL as string);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
