import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes';
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';


dotenv.config();

const app = express();
app.use(express.json())

app.use('/api/blogs', blogRoutes);


mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.log('❌ MongoDB connection error:', err));


app.get('/', (req, res) => {
    res.send('Hello Blog');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.use('/api/blogs', blogRoutes);

app.use(notFound);
app.use(errorHandler);



