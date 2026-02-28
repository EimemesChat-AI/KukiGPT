
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.use('/api/chat', chatRoutes);

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});